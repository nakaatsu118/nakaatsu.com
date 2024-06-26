import Footer from '@/_components/Footer';
import { getBlogList } from '~/_libs/microcms';
import Blogs from './_components/Blogs';
import MotionWrapper from '~/_components/MotionWrapper';
import ProgressBar from '~/_components/ProgressBar';
import { useMemo } from 'react';

const blogLimit = 9;

const Blog = async () => {
  const res = await useMemo(
    () => getBlogList({ limit: blogLimit, orders: '-publishedAt' }),
    [],
  );

  return (
    <MotionWrapper>
      <ProgressBar />
      <Blogs
        contents={res.contents}
        totalCount={res.totalCount}
        limit={0}
        offset={0}
      />
      <Footer />
    </MotionWrapper>
  );
};

export default Blog;
