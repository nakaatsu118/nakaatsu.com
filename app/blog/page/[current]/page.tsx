import Footer from '@/_components/Footer';
import Blogs from '@/blog/_components/Blogs';
import MotionWrapper from '~/_components/MotionWrapper';
import ProgressBar from '~/_components/ProgressBar';
import { getBlogList } from '~/_libs/microcms';

const blogLimit = 9;

type Props = {
  params: Promise<{
    current: string;
  }>;
};

export const generateStaticParams = async () => {
  const { totalCount } = await getBlogList();
  const pages = Array.from({ length: Math.ceil(totalCount / blogLimit) }).map(
    (_, i) => i + 1,
  );
  const paths = pages.map((page) => {
    return {
      current: page.toString(),
    };
  });

  return [...paths];
};

const Blog = async ({ params }: Props) => {
  const { current: currentParam } = await params;
  const current = parseInt(currentParam as string, 10);
  const res = await getBlogList({
    limit: blogLimit,
    offset: blogLimit * (current - 1),
  });

  return (
    <MotionWrapper>
      <ProgressBar />
      <Blogs
        contents={res.contents}
        totalCount={res.totalCount}
        current={current}
        limit={0}
        offset={0}
      />
      <Footer />
    </MotionWrapper>
  );
};

export default Blog;
