import Footer from '@/_components/Footer';
import Blogs from '@/blog/_components/Blogs';
import MotionWrapper from '~/_components/MotionWrapper';
import ProgressBar from '~/_components/ProgressBar';
import { getAllBlogSummaries } from '~/_libs/microcms';
import { BLOG_PAGE_SIZE } from '../../_constants';

type Props = {
  params: Promise<{
    current: string;
  }>;
};

export const generateStaticParams = async () => {
  const blogs = await getAllBlogSummaries();
  const pages = Array.from({
    length: Math.ceil(blogs.length / BLOG_PAGE_SIZE),
  }).map((_, i) => i + 1);
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
  const blogs = await getAllBlogSummaries();

  return (
    <MotionWrapper>
      <ProgressBar />
      <Blogs contents={blogs} current={current} />
      <Footer />
    </MotionWrapper>
  );
};

export default Blog;
