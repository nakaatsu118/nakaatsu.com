import Footer from './_components/Footer';
import TopBlogs from './_components/TopPage/TopBlogs';
import WhatIs from './_components/TopPage/WhatIs';
import { getBlogList } from '~/_libs/microcms';
import 'animate.css';
import MotionWrapper from './_components/MotionWrapper';
import ProgressBar from './_components/ProgressBar';

const Home = async () => {
  const res = await getBlogList({ limit: 6, orders: '-publishedAt' });

  return (
    <MotionWrapper>
      <ProgressBar />
      <WhatIs />
      <TopBlogs contents={res.contents} totalCount={0} limit={0} offset={0} />
      <Footer />
    </MotionWrapper>
  );
};

export default Home;
