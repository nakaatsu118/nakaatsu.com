import assert from 'node:assert/strict';
import test from 'node:test';
import {
  sanitizeContent,
  contentDescription,
} from '../src/lib/sanitize-content.mjs';
test('metadata decodes entities once and separates block text', () => {
  assert.equal(
    contentDescription(
      '<h2>A &amp; B</h2><p>&lt;code&gt; &quot;引用&quot;</p>',
    ),
    'A & B <code> "引用"',
  );
});

test('removes executable HTML, event attributes and dangerous URL schemes', () => {
  const result =
    sanitizeContent(`<script>alert(1)</script><style>body{display:none}</style>
    <img src="https://images.microcms-assets.io/a.png" onerror="alert(1)">
    <a href="jav&#x61;script:alert(1)" onclick="alert(1)">link</a>
    <svg onload="alert(1)"></svg><form action="https://evil.example"><input></form>`);
  assert.doesNotMatch(
    result,
    /script|onerror|onclick|onload|<svg|<form|<input|<style/,
  );
  assert.match(result, /loading="lazy"/);
  assert.match(result, />link<\/a>/);
});

test('preserves headings, tables, code and image dimensions', () => {
  const result = sanitizeContent(
    '<h1>見出し</h1><table><tr><th scope="col">列</th><td>値</td></tr></table><pre><code class="language-js">a &lt; b</code></pre><img src="https://images.microcms-assets.io/a.png" width="640" height="480" alt="写真">',
  );
  assert.match(result, /<h2>見出し<\/h2>/);
  assert.match(result, /<th scope="col">列<\/th>/);
  assert.match(result, /class="language-js">a &lt; b/);
  assert.match(result, /width="640" height="480"/);
});

test('only accepts exact HTTPS iframe hosts and removes srcdoc', () => {
  const result =
    sanitizeContent(`<iframe src="https://www.youtube-nocookie.com/embed/123" srcdoc="bad" onload="bad"></iframe>
    <iframe src="https://www.youtube.com.evil.example/embed/123"></iframe>
    <iframe src="http://www.youtube.com/embed/123"></iframe>
    <iframe src="//www.youtube.com/embed/123"></iframe>
    <iframe src="/local"></iframe><iframe src="https://user@www.youtube.com/embed/123"></iframe>`);
  assert.equal((result.match(/<iframe/g) || []).length, 1);
  assert.doesNotMatch(result, /srcdoc|onload|evil|user@/);
  assert.match(result, /title="埋め込みコンテンツ"/);
});

test('Iframely data attributes require an exact allowed host; scripts are never copied', () => {
  const result = sanitizeContent(
    '<div class="iframely-embed evil"><a href="https://example.com" data-iframely-url="https://cdn.iframe.ly/abc">記事</a><a data-iframely-url="https://cdn.iframe.ly.evil.example/abc">不正</a></div><script src="https://cdn.iframe.ly/embed.js"></script>',
  );
  assert.equal((result.match(/data-iframely-url=/g) || []).length, 1);
  assert.doesNotMatch(result, /evil|<script/);
  assert.match(result, /class="iframely-embed"/);
});

test('normalizes trusted legacy Iframely URLs and supports the current CDN', () => {
  const result = sanitizeContent(
    '<a data-iframely-url="//cdn.iframe.ly/abc?key=public">legacy</a><a data-iframely-url="https://iframely.net/def">current</a><a data-iframely-url="//cdn.iframe.ly.evil.example/abc">invalid</a><iframe src="https://iframely.net/def"></iframe>',
  );
  assert.equal((result.match(/data-iframely-url=/g) || []).length, 2);
  assert.match(
    result,
    /data-iframely-url="https:\/\/cdn.iframe.ly\/abc\?key=public"/,
  );
  assert.match(result, /<iframe src="https:\/\/iframely.net\/def"/);
  assert.doesNotMatch(result, /evil\.example/);
});

test('preserves affiliate query parameters and marks only allowed hosts sponsored', () => {
  const result = sanitizeContent(
    '<a href="https://www.amazon.co.jp/dp/123?tag=example-22&amp;ref=test" target="_blank">商品</a><a href="https://amazon.co.jp.evil.example/">別サイト</a>',
  );
  assert.match(result, /tag=example-22&amp;ref=test/);
  assert.equal((result.match(/sponsored/g) || []).length, 1);
  assert.match(result, /rel="sponsored noopener noreferrer"/);
});
