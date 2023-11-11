import Footer from "@/_components/Footer"
import Header from "@/_components/Header"
import { getBlogList } from "~/_libs/microcms"
import Blogs from "@/blog/_components/Blogs"

const blogLimit = 5

type Props = {
  params: {
    current: string;
  }
}

const Blog = async ({ params }: Props) => {
  const current = parseInt(params.current as string, 10)
  const data = await getBlogList({ limit: blogLimit, offset: blogLimit * (current - 1) })

  return (
    <>
      <Header />
      <Blogs contents={data.contents} totalCount={data.totalCount} current={current} />
      <Footer />
    </>
  )
}

export default Blog
