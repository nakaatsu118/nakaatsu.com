import Footer from "@/_components/Footer"
import Header from "@/_components/Header"
import { getBlogList } from "~/_libs/microcms"
import Blogs from "./_components/Blogs"

const blogLimit = 5

const Blog = async () => {
  const data = await getBlogList({ limit: blogLimit })

  return (
    <>
      <Header />
      <Blogs contents={data.contents} totalCount={data.totalCount} limit={0} offset={0} />
      <Footer />
    </>
  )
}

export default Blog
