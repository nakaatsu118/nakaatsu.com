import assert from 'node:assert/strict';
import test from 'node:test';
import {
  listingPages,
  pagePath,
  imageUrl,
  canonicalPath,
} from '../src/lib/urls.mjs';
test('canonical URLs use public routes rather than generated HTML filenames', () => {
  assert.equal(canonicalPath('/index.html'), '/');
  assert.equal(canonicalPath('/blog.html'), '/blog');
  assert.equal(canonicalPath('/blog/index.html'), '/blog/index');
  assert.equal(canonicalPath('/blog/page/2.html'), '/blog/page/2');
  assert.equal(canonicalPath('/profile/'), '/profile');
  assert.equal(canonicalPath('/'), '/');
});
test('generates URL-driven pagination and category pages with no page/1 duplicates', () => {
  const blogs = Array.from({ length: 20 }, (_, i) => ({
    id: String(i),
    category: i < 10 ? { id: 'plants', name: '植物' } : undefined,
  }));
  const pages = listingPages(blogs);
  assert.deepEqual(
    pages.map((p) => p.path),
    [
      '/blog',
      '/blog/page/2',
      '/blog/page/3',
      '/blog/category/plants',
      '/blog/category/plants/page/2',
    ],
  );
  assert.equal(pages[2].blogs.length, 2);
  assert.equal(pages[4].blogs.length, 1);
  assert.equal(pages[3].total, 10);
  assert.equal(pagePath('/blog', 1), '/blog');
  for (const number of [0, -1, 1.5, NaN])
    assert.throws(() => pagePath('/blog', number));
  assert.equal(listingPages([]).length, 1);
});
test('image fallback is valid and CMS transforms preserve existing parameters', () => {
  assert.equal(imageUrl(undefined, 1200), '/images/og_image.png');
  const url = new URL(
    imageUrl(
      { url: 'https://images.microcms-assets.io/image?w=100&q=80' },
      480,
      480,
    ),
  );
  assert.equal(url.searchParams.get('w'), '480');
  assert.equal(url.searchParams.get('q'), '80');
  assert.equal(url.searchParams.get('fit'), 'crop');
});
