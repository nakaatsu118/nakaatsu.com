import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { verifyHtml } from './verify-html.mjs';

if (existsSync('.env')) process.loadEnvFile('.env');
const fixture = process.env.SITE_TEST_FIXTURES === '1';
assert.ok(
  !process.argv.includes('--deploy') || !fixture,
  'Fixture builds cannot be deployed',
);
const directory = fixture ? 'dist-test' : 'dist';
const manifest = JSON.parse(
  await readFile(`.astro/manifest${fixture ? '-test' : ''}.json`, 'utf8'),
);
assert.equal(
  new Set(manifest.paths).size,
  manifest.paths.length,
  'Generated paths must be unique',
);
const production = process.env.SITE_PRODUCTION === 'true' && !fixture;
const site = process.env.SITE_URL || 'https://www.nakaatsu.com';
const allFiles = await readdir(directory, { recursive: true });
const paths = new Set([...manifest.paths, '/blog/page/1']);
const assets = new Set(
  allFiles.map((file) => `/${file.replaceAll('\\', '/')}`),
);
const sitemap = await readFile(`${directory}/sitemap.xml`, 'utf8');
for (const route of manifest.paths) {
  const file = `${directory}/${route === '/' ? 'index' : route.slice(1)}.html`;
  const html = await readFile(file, 'utf8');
  verifyHtml(html, { route, site, production, paths, assets });
  assert.ok(
    sitemap.includes(`<loc>${new URL(route, site).href}</loc>`),
    `${route} is in the sitemap`,
  );
}
assert.equal(
  allFiles.filter((file) => file.endsWith('.html')).length,
  manifest.paths.length + 1,
  'HTML count includes only expected pages and 404',
);
assert.ok(allFiles.includes('404.html'));
assert.ok(
  !allFiles.some(
    (file) =>
      file.endsWith('.map') ||
      file.includes('_next') ||
      file.includes('.prerender') ||
      file.includes('.server'),
  ),
  'No source maps, server build artifacts or Next.js runtime',
);
for (const file of allFiles.filter((name) =>
  /\.(html|js|json|xml|txt|css)$/.test(name),
)) {
  const text = await readFile(path.join(directory, file), 'utf8');
  for (const key of [
    'MICROCMS_API_KEY',
    'CLOUDFLARE_API_TOKEN',
    'DEPLOY_HOOK_URL',
  ]) {
    if (process.env[key])
      assert.ok(!text.includes(process.env[key]), `Secret leaked in ${file}`);
  }
  assert.doesNotMatch(text, /draftKey=/, `Draft key in ${file}`);
}
assert.match(
  await readFile(`${directory}/_redirects`, 'utf8'),
  /\/blog\/page\/1 \/blog 301/,
);
assert.match(
  await readFile(`${directory}/_headers`, 'utf8'),
  /X-Content-Type-Options: nosniff/,
);
console.log(
  `Verified ${manifest.paths.length} public routes, ${manifest.blogCount} articles and ${manifest.workCount} works (${fixture ? 'fixtures' : 'CMS'}).`,
);
