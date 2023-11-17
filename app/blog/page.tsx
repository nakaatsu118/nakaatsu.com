import Footer from "@/_components/Footer"
import Header from "@/_components/Header"
import { getBlogList } from "~/_libs/microcms"
import Blogs from "./_components/Blogs"
import MotionWrapper from "~/_components/MotionWrapper"

const blogLimit = 5

const Blog = async () => {
  const data = await getBlogList({ limit: blogLimit })

  return (
    <MotionWrapper>
      <Header />
      <Blogs contents={data.contents} totalCount={data.totalCount} limit={0} offset={0} />
      <Footer />
    </MotionWrapper>
  )
}

export default Blog
