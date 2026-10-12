import assert from 'node:assert/strict';
import { parse } from 'parse5';

function elements(node) {
  return [
    ...(node.tagName ? [node] : []),
    ...(node.childNodes || []).flatMap(elements),
  ];
}

export function verifyHtml(html, { route, site, production, paths, assets }) {
  const nodes = elements(parse(html));
  const attrs = (node) =>
    Object.fromEntries(node.attrs.map(({ name, value }) => [name, value]));
  const expectedUrl = new URL(route, site).href;
  const canonical = nodes.filter(
    (node) => node.tagName === 'link' && attrs(node).rel === 'canonical',
  );
  assert.equal(canonical.length, 1, `${route}: exactly one canonical`);
  assert.equal(
    attrs(canonical[0]).href,
    expectedUrl,
    `${route}: canonical URL`,
  );
  const metas = nodes.filter((node) => node.tagName === 'meta').map(attrs);
  assert.equal(
    metas.find((meta) => meta.property === 'og:url')?.content,
    expectedUrl,
    `${route}: OG URL`,
  );
  assert.equal(
    metas.find((meta) => meta.name === 'robots')?.content,
    production ? undefined : 'noindex, nofollow',
    `${route}: indexing mode`,
  );
  assert.ok(
    metas.find((meta) => meta.name === 'description')?.content,
    `${route}: description`,
  );
  assert.equal(
    nodes.filter((node) => node.tagName === 'h1').length,
    1,
    `${route}: one primary heading`,
  );
  assert.equal(
    nodes.filter((node) => node.tagName === 'main').length,
    1,
    `${route}: one main landmark`,
  );

  function localTarget(value) {
    const url = new URL(value, expectedUrl);
    if (url.origin !== new URL(site).origin) return;
    const target = decodeURIComponent(url.pathname);
    assert.ok(
      paths.has(target) || assets.has(target),
      `${route}: missing internal target ${target}`,
    );
  }
  for (const node of nodes) {
    const attributes = attrs(node);
    for (const name of Object.keys(attributes)) {
      assert.ok(
        !/^on/i.test(name) && name !== 'srcdoc',
        `${route}: unsafe attribute ${name}`,
      );
    }
    if (node.tagName === 'a' && attributes.href) localTarget(attributes.href);
    if (['img', 'script'].includes(node.tagName) && attributes.src)
      localTarget(attributes.src);
    if (
      node.tagName === 'link' &&
      ['stylesheet', 'icon', 'apple-touch-icon'].includes(attributes.rel)
    )
      localTarget(attributes.href);
    if (node.tagName === 'img')
      assert.ok('alt' in attributes, `${route}: image alt attribute`);
  }
  const image = metas.find((meta) => meta.property === 'og:image')?.content;
  assert.ok(image && !image.includes('undefined'), `${route}: valid OG image`);
  assert.equal(new URL(image).protocol, 'https:', `${route}: HTTPS OG image`);
  localTarget(image);
}
