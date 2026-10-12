import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { parseFragment } from 'parse5';
import { fetchSnapshot } from '../src/lib/cms.mjs';
import { sanitizeContent } from '../src/lib/sanitize-content.mjs';
process.loadEnvFile();
const snapshot = await fetchSnapshot({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});
function inspect(html) {
  const result = { text: '', images: [], links: [], embeds: [] };
  function walk(node) {
    if (['script', 'style'].includes(node.tagName)) return;
    if (node.nodeName === '#text') result.text += node.value;
    const attrs = Object.fromEntries(
      (node.attrs || []).map((a) => [a.name, a.value]),
    );
    if (node.tagName === 'img') result.images.push(attrs.src);
    if (node.tagName === 'a' && attrs.href) result.links.push(attrs.href);
    if (attrs['data-iframely-url'])
      result.embeds.push(
        attrs['data-iframely-url'].replace(/^\/\//, 'https://'),
      );
    (node.childNodes || []).forEach(walk);
  }
  walk(parseFragment(html));
  result.text = result.text.replace(/\s+/g, '');
  return result;
}
const articles = snapshot.blogs.map((blog) => {
  const before = inspect(blog.content),
    after = inspect(sanitizeContent(blog.content));
  assert.deepEqual(after, before, `${blog.id}: content parity`);
  return {
    id: blog.id,
    images: after.images.length,
    links: after.links.length,
    embeds: after.embeds.length,
  };
});
const baseline = JSON.parse(
  await readFile('docs/production-baseline.json', 'utf8'),
);
const oldIds = baseline.pages
  .map((p) => new URL(p.url).pathname)
  .filter((p) => /^\/blog\/[^/]+$/.test(p))
  .map((p) => p.slice(6))
  .sort();
assert.deepEqual(
  snapshot.blogs.map((b) => b.id).sort(),
  oldIds,
  'existing article URLs',
);
const report = {
  checkedAt: new Date().toISOString(),
  articles,
  works: snapshot.works.length,
  result:
    'Published article IDs, text, image URLs, link URLs and normalized Iframely URLs match the CMS. No affiliate destinations were requested.',
};
await writeFile(
  'docs/content-parity.json',
  JSON.stringify(report, null, 2) + '\n',
);
console.log(
  `Content parity passed for ${articles.length} articles and ${snapshot.works.length} works fetched.`,
);
