import { fetchSnapshot } from './cms.mjs';
import { sanitizeContent } from './sanitize-content.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { blogPath, listingPages } from './urls.mjs';

export interface CmsImage {
  url: string;
  width?: number;
  height?: number;
}
export interface Category {
  id: string;
  name: string;
}
export interface Blog {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  eyecatch?: CmsImage;
  category?: Category;
}
export interface Work {
  id: string;
  title: string;
  description: string;
  skill: string;
  link: string;
  visual?: CmsImage;
  published: string;
  publishedAt: string;
  updatedAt: string;
}
export interface Snapshot {
  blogs: Blog[];
  works: Work[];
}

let snapshot: Promise<Snapshot> | undefined;
export function getContent(): Promise<Snapshot> {
  snapshot ??= (
    import.meta.env.SITE_TEST_FIXTURES === '1'
      ? import('../../tests/fixtures/content.mjs').then(
          ({ fixture }) => fixture,
        )
      : fetchSnapshot({
          serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
          apiKey: import.meta.env.MICROCMS_API_KEY,
        })
  ).then(async (data: Snapshot) => {
    if (import.meta.env.PROD) {
      await mkdir('.astro', { recursive: true });
      await writeFile(
        `.astro/manifest${import.meta.env.SITE_TEST_FIXTURES === '1' ? '-test' : ''}.json`,
        JSON.stringify({
          paths: [
            '/',
            '/profile',
            '/privacyPolicy',
            ...listingPages(data.blogs).map((page) => page.path),
            ...data.blogs.map((blog) => blogPath(blog.id)),
          ],
          blogCount: data.blogs.length,
          workCount: data.works.length,
        }),
      );
    }
    return {
      ...data,
      blogs: data.blogs.map((blog) => ({
        ...blog,
        content: sanitizeContent(blog.content),
      })),
    };
  });
  return snapshot;
}
