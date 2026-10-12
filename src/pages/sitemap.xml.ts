import type { APIRoute } from 'astro';
import { getContent } from '../lib/content';
import { blogPath, listingPages } from '../lib/urls.mjs';
export const GET: APIRoute = async ({ site }) => {
  const { blogs } = await getContent();
  const escape = (value: string) =>
    value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  const urls = [
    ...[
      '/',
      '/profile',
      '/privacyPolicy',
      ...listingPages(blogs).map((page) => page.path),
    ].map(
      (path) => `<url><loc>${escape(new URL(path, site).href)}</loc></url>`,
    ),
    ...blogs.map(
      (blog) =>
        `<url><loc>${escape(new URL(blogPath(blog.id), site).href)}</loc><lastmod>${escape(blog.updatedAt)}</lastmod></url>`,
    ),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
