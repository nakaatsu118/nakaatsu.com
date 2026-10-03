import Footer from '@/_components/Footer';
import MotionWrapper from '~/_components/MotionWrapper';
import ProgressBar from '~/_components/ProgressBar';
import { getAllBlogSummaries } from '~/_libs/microcms';
import Blogs from './_components/Blogs';

const Blog = async () => {
  const blogs = await getAllBlogSummaries();

  return (
    <MotionWrapper>
      <ProgressBar />
      <Blogs contents={blogs} />
      <Footer />
    </MotionWrapper>
  );
};

export default Blog;
