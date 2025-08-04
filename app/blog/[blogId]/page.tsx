import { Metadata } from 'next';
import { getBlogDetail, getBlogList } from '~/_libs/microcms';
import { BlogIdComponent } from './blogId.component';

export type BlogIdProps = {
  params: Promise<{
    blogId: string;
  }>;
};
export const generateStaticParams = async () => {
  const allContents = [];
  let offset = 0;
  const limit = 100; // microCMSの上限値

  while (true) {
    const { contents, totalCount } = await getBlogList({
      limit,
      offset,
      orders: '-publishedAt',
    });

    allContents.push(...contents);

    // 全件取得完了したかチェック
    if (contents.length < limit || offset + limit >= totalCount) {
      break;
    }

    offset += limit;
  }

  const paths = allContents.map((blog) => {
    return {
      blogId: blog.id,
    };
  });

  return paths;
};

export const generateMetadata = async ({
  params,
}: BlogIdProps): Promise<Metadata> => {
  const { blogId } = await params;
  const res = await getBlogDetail(blogId);

  return {
    title: res.title + ' | nakaatsu World',
    openGraph: {
      title: res.title + ' | nakaatsu World',
      images: [
        {
          url: res.eyecatch?.url + '?w=1200',
          width: 1200,
          height: 630,
          alt: res.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: res.title + ' | nakaatsu World',
    },
  };
};
const BlogPage = async ({ params }: BlogIdProps) => {
  const { blogId } = await params;
  const res = await getBlogDetail(blogId);

  return <BlogIdComponent {...res} />;
};

export default BlogPage;
