import Footer from "@/_components/Footer"
import Header from "@/_components/Header"
import { getBlogList } from "~/_libs/microcms"
import Blogs from "@/blog/_components/Blogs"
import MotionWrapper from "~/_components/MotionWrapper"

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
    <MotionWrapper>
      <Header />
      <Blogs contents={data.contents} totalCount={data.totalCount} current={current} limit={0} offset={0} />
      <Footer />
    </MotionWrapper>
  )
}

export default Blog
