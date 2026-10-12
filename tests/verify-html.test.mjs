import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyHtml } from '../scripts/verify-html.mjs';

const html =
  '<html><head><link rel="canonical" href="https://www.nakaatsu.com/blog"><meta property="og:url" content="https://www.nakaatsu.com/blog"><meta property="og:image" content="https://www.nakaatsu.com/image.webp"><meta name="description" content="ブログ"><meta name="robots" content="noindex, nofollow"></head><body><main><h1>Blog</h1><a href="/blog?page=2">一覧</a><img src="/image.webp" alt=""></main></body></html>';
const options = {
  route: '/blog',
  site: 'https://www.nakaatsu.com',
  production: false,
  paths: new Set(['/blog']),
  assets: new Set(['/image.webp']),
};

test('validates exact canonical, OG, local targets and indexing state', () => {
  verifyHtml(html, options);
  assert.throws(
    () =>
      verifyHtml(
        html.replace(
          'rel="canonical" href="https://www.nakaatsu.com/blog"',
          'rel="canonical" href="https://www.nakaatsu.com/blog/wrong"',
        ),
        options,
      ),
    /canonical URL/,
  );
  assert.throws(
    () =>
      verifyHtml(
        html.replace('href="/blog?page=2"', 'href="/missing"'),
        options,
      ),
    /missing internal target/,
  );
  assert.throws(
    () =>
      verifyHtml(
        html.replace('src="/image.webp"', 'src="/missing.webp"'),
        options,
      ),
    /missing internal target/,
  );
  assert.throws(
    () => verifyHtml(html, { ...options, production: true }),
    /indexing mode/,
  );
});

test('allows harmless text resembling attributes and rejects real executable attributes', () => {
  verifyHtml(
    html.replace('<h1>Blog</h1>', '<h1>Blog</h1><p>Example: onerror=</p>'),
    options,
  );
  assert.throws(
    () =>
      verifyHtml(html.replace('alt=""', 'alt="" onerror="alert(1)"'), options),
    /unsafe attribute/,
  );
});
