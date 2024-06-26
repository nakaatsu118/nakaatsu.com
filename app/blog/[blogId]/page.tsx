import { getBlogDetail, getBlogList } from '~/_libs/microcms';
import { Metadata } from 'next';
import { BlogIdComponent } from './blogId.component';
import { useMemo } from 'react';

export type BlogIdProps = {
  params: {
    blogId: string;
  };
};
export const generateStaticParams = async () => {
  const { contents } = await getBlogList();

  const paths = contents.map((blog) => {
    return {
      blogId: blog.id,
    };
  });

  return [...paths];
};

export const generateMetadata = async ({
  params,
}: BlogIdProps): Promise<Metadata> => {
  const { blogId } = params;
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
  const res = await useMemo(() => getBlogDetail(params.blogId), []);

  return <BlogIdComponent {...res} />;
};

export default BlogPage;
