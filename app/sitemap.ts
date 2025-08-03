import type { MetadataRoute } from 'next';
import { getBlogList } from '@/_libs/microcms';

// 静的エクスポート用の設定
export const dynamic = 'force-static';
export const revalidate = 3600; // 1時間ごとに再生成

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.nakaatsu.com';

  // 静的ページのsitemap
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacyPolicy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // ブログ記事の動的sitemap（100件ずつ分割取得）
  try {
    const allBlogPages: MetadataRoute.Sitemap = [];
    let offset = 0;
    const limit = 100; // microCMSの上限値

    while (true) {
      const blogList = await getBlogList({ limit, offset });

      // 取得したブログ記事をsitemapに追加
      const blogPages = blogList.contents.map((blog) => ({
        url: `${baseUrl}/blog/${blog.id}`,
        lastModified: new Date(blog.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));

      allBlogPages.push(...blogPages);

      // 全件取得完了したかチェック
      if (
        blogList.contents.length < limit ||
        offset + limit >= blogList.totalCount
      ) {
        break;
      }

      offset += limit;
    }

    return [...staticPages, ...allBlogPages];
  } catch (error) {
    console.error('ブログ記事の取得に失敗しました:', error);
    // エラーが発生した場合は静的ページのみを返す
    return staticPages;
  }
}
