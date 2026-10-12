import { setTimeout as delay } from 'node:timers/promises';

const fields = {
  blogs: 'id,title,content,eyecatch,category,publishedAt,updatedAt',
  works:
    'id,title,link,visual,description,skill,published,publishedAt,updatedAt',
};

function requireString(value, name) {
  if (typeof value !== 'string' || !value.trim())
    throw new Error(`Invalid CMS ${name}`);
  return value;
}

function validateIdentity(item) {
  if (!item || typeof item !== 'object') throw new Error('Invalid CMS content');
  if (!/^[a-zA-Z0-9_-]+$/.test(requireString(item.id, 'id')))
    throw new Error('Unsafe CMS id');
  for (const key of ['publishedAt', 'updatedAt']) {
    if (!Number.isFinite(Date.parse(requireString(item[key], key))))
      throw new Error(`Invalid CMS ${key}`);
  }
}

function validateImage(image) {
  if (!image) return;
  const url = new URL(requireString(image.url, 'image URL'));
  if (url.protocol !== 'https:' || url.username || url.password)
    throw new Error('Unsafe CMS image URL');
  for (const key of ['width', 'height']) {
    if (
      image[key] !== undefined &&
      (!Number.isFinite(image[key]) || image[key] <= 0)
    )
      throw new Error(`Invalid image ${key}`);
  }
}

export function validateContent(item, endpoint) {
  validateIdentity(item);
  requireString(item.title, 'title');
  if (endpoint === 'blogs') {
    if (typeof item.content !== 'string')
      throw new Error('Invalid CMS content');
    validateImage(item.eyecatch);
    if (item.category) {
      if (
        !/^[a-zA-Z0-9_-]+$/.test(requireString(item.category.id, 'category id'))
      )
        throw new Error('Unsafe category id');
      requireString(item.category.name, 'category name');
    }
  } else {
    requireString(item.description, 'description');
    requireString(item.skill, 'skill');
    if (
      !Number.isFinite(Date.parse(requireString(item.published, 'published')))
    )
      throw new Error('Invalid work date');
    validateImage(item.visual);
    const url = new URL(requireString(item.link, 'work link'));
    if (
      !['https:', 'http:'].includes(url.protocol) ||
      url.username ||
      url.password
    )
      throw new Error('Unsafe work link');
  }
  return item;
}

/**
 * API keys stay in build-time requests, never in rendered props.
 * @returns {Promise<import('./content').Snapshot>}
 */
export async function fetchSnapshot({
  serviceDomain,
  apiKey,
  fetchImpl = fetch,
  wait = delay,
  timeoutMs = 10000,
}) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(serviceDomain || '') || !apiKey) {
    throw new Error(
      'Set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY before building',
    );
  }
  async function request(endpoint, queries) {
    const url = new URL(
      `https://${serviceDomain}.microcms.io/api/v1/${endpoint}`,
    );
    url.search = new URLSearchParams(queries).toString();
    for (let attempt = 0; attempt < 3; attempt++) {
      let response;
      try {
        response = await fetchImpl(url, {
          headers: { 'X-MICROCMS-API-KEY': apiKey },
          signal: AbortSignal.timeout(timeoutMs),
          redirect: 'error',
        });
        if (response.ok) return await response.json();
      } catch {
        if (attempt === 2)
          throw new Error(`CMS ${endpoint} request failed after 3 attempts`);
        await wait(250 * 2 ** attempt);
        continue;
      }
      if ((response.status === 429 || response.status >= 500) && attempt < 2) {
        await wait(250 * 2 ** attempt);
        continue;
      }
      throw new Error(`CMS ${endpoint} returned HTTP ${response.status}`);
    }
  }
  async function readAll(endpoint, selection) {
    const items = [];
    let total;
    do {
      const page = await request(endpoint, {
        limit: '100',
        offset: String(items.length),
        orders: 'id',
        fields: selection,
      });
      if (
        !page ||
        !Array.isArray(page.contents) ||
        !Number.isSafeInteger(page.totalCount) ||
        page.totalCount < 0
      ) {
        throw new Error(`Invalid CMS ${endpoint} response`);
      }
      total ??= page.totalCount;
      if (
        page.totalCount !== total ||
        page.contents.length > 100 ||
        (!page.contents.length && items.length < total)
      ) {
        throw new Error(
          `CMS ${endpoint} changed or returned incomplete results; rebuild`,
        );
      }
      page.contents.forEach(validateIdentity);
      items.push(...page.contents);
      if (items.length > total)
        throw new Error(`CMS ${endpoint} count mismatch`);
    } while (items.length < total);
    if (new Set(items.map((item) => item.id)).size !== total)
      throw new Error(`CMS ${endpoint} duplicate ids`);
    return items;
  }
  const snapshot = {};
  for (const endpoint of ['blogs', 'works']) {
    snapshot[endpoint] = await readAll(endpoint, fields[endpoint]);
    snapshot[endpoint].forEach((item) => validateContent(item, endpoint));
  }
  // A second lightweight pass catches publication changes during pagination.
  for (const endpoint of ['blogs', 'works']) {
    const current = await readAll(endpoint, 'id,publishedAt,updatedAt');
    const signature = (items) =>
      JSON.stringify(
        items.map(({ id, publishedAt, updatedAt }) => [
          id,
          publishedAt,
          updatedAt,
        ]),
      );
    if (signature(current) !== signature(snapshot[endpoint]))
      throw new Error(`CMS ${endpoint} changed during build; rebuild`);
  }
  snapshot.blogs.sort(
    (a, b) =>
      Date.parse(b.publishedAt) - Date.parse(a.publishedAt) ||
      a.id.localeCompare(b.id),
  );
  snapshot.works.sort(
    (a, b) =>
      Date.parse(b.published) - Date.parse(a.published) ||
      a.id.localeCompare(b.id),
  );
  return snapshot;
}
