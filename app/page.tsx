import Footer from "./_components/Footer"
import Header from "./_components/Header"
import TopBlogs from "./_components/TopPage/TopBlogs"
import WhatIs from "./_components/TopPage/WhatIs"
import { getBlogList } from "~/_libs/microcms"
import 'animate.css'
import MotionWrapper from "./_components/MotionWrapper"

const Home = async () => {
  const res = await getBlogList({ limit: 5 })

  return (
    <MotionWrapper>
      <Header />
      <WhatIs />
      <TopBlogs contents={res.contents} totalCount={0} limit={0} offset={0} />
      <Footer />
    </MotionWrapper>
  )
}

export default Home
