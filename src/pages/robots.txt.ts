import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) =>
  new Response(
    import.meta.env.SITE_PRODUCTION === 'true' &&
      import.meta.env.SITE_TEST_FIXTURES !== '1'
      ? `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', site).href}\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
