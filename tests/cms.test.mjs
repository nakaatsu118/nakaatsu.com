import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchSnapshot } from '../src/lib/cms.mjs';

const date = '2026-10-01T00:00:00.000Z';
const blog = (id) => ({
  id,
  title: '記事',
  content: '<p>本文</p>',
  publishedAt: date,
  updatedAt: date,
});
const options = {
  serviceDomain: 'example',
  apiKey: 'test-secret',
  wait: async () => {},
};
const response = (contents, totalCount = contents.length) =>
  Response.json({ contents, totalCount });

test('paginates all content and checks ids/timestamps without refetching bodies', async () => {
  const blogs = Array.from({ length: 101 }, (_, i) =>
    blog(`post-${String(i).padStart(3, '0')}`),
  );
  const requests = [];
  const result = await fetchSnapshot({
    ...options,
    fetchImpl: async (url, init) => {
      assert.equal(init.headers['X-MICROCMS-API-KEY'], 'test-secret');
      assert.equal(init.redirect, 'error');
      assert.ok(init.signal);
      requests.push(url);
      if (url.pathname.endsWith('/works')) return response([]);
      const offset = Number(url.searchParams.get('offset'));
      return response(blogs.slice(offset, offset + 100), blogs.length);
    },
  });
  assert.equal(result.blogs.length, 101);
  assert.equal(requests.length, 6);
  assert.equal(
    requests[3].searchParams.get('fields'),
    'id,publishedAt,updatedAt',
  );
});

test('retries transient failures and fails on persistent errors without leaking keys', async () => {
  let attempts = 0;
  await assert.rejects(
    fetchSnapshot({
      ...options,
      fetchImpl: async () => {
        attempts++;
        throw new Error('test-secret');
      },
    }),
    /after 3 attempts/,
  );
  assert.equal(attempts, 3);
  attempts = 0;
  await assert.rejects(
    fetchSnapshot({
      ...options,
      fetchImpl: async () => {
        attempts++;
        return new Response('', { status: 401 });
      },
    }),
    /HTTP 401/,
  );
  assert.equal(attempts, 1);
  attempts = 0;
  const result = await fetchSnapshot({
    ...options,
    fetchImpl: async () =>
      ++attempts < 3 ? new Response('', { status: 503 }) : response([]),
  });
  assert.equal(result.blogs.length, 0);
  assert.equal(attempts, 6);
});

test('rejects partial results, duplicate ids and invalid public content', async () => {
  for (const contents of [
    [blog('same'), blog('same')],
    [{ ...blog('one'), publishedAt: undefined }],
    [{ ...blog('../escape') }],
    [{ ...blog('one'), content: null }],
  ]) {
    await assert.rejects(
      fetchSnapshot({ ...options, fetchImpl: async () => response(contents) }),
    );
  }
  await assert.rejects(
    fetchSnapshot({ ...options, fetchImpl: async () => response([], 2) }),
    /incomplete/,
  );
});

test('detects a publication update between the full and verification passes', async () => {
  await assert.rejects(
    fetchSnapshot({
      ...options,
      fetchImpl: async (url) => {
        if (url.pathname.endsWith('/works')) return response([]);
        return response([
          {
            ...blog('one'),
            updatedAt: url.searchParams.get('fields').includes('content')
              ? date
              : '2026-10-02T00:00:00.000Z',
          },
        ]);
      },
    }),
    /changed during build/,
  );
});

test('requires build credentials and prevents credential forwarding to arbitrary domains', async () => {
  for (const serviceDomain of ['', 'example.evil.test', 'example/path']) {
    await assert.rejects(
      fetchSnapshot({ ...options, serviceDomain }),
      /Set MICROCMS/,
    );
  }
});
