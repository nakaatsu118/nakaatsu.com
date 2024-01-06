import Footer from "@/_components/Footer"
import { getBlogList } from "~/_libs/microcms"
import Blogs from "@/blog/_components/Blogs"
import MotionWrapper from "~/_components/MotionWrapper"

const blogLimit = 9

type Props = {
  params: {
    current: string;
  }
}

const Blog = async ({ params }: Props) => {
  const current = parseInt(params.current as string, 10)
  const res = await getBlogList({ limit: blogLimit, offset: blogLimit * (current - 1) })

  return (
    <MotionWrapper>
      <Blogs contents={res.contents} totalCount={res.totalCount} current={current} limit={0} offset={0} />
      <Footer />
    </MotionWrapper>
  )
}

export default Blog
