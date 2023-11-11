import Footer from "./_components/Footer"
import Header from "./_components/Header"
import TopBlogs from "./_components/TopPage/TopBlogs"
import WhatIs from "./_components/TopPage/WhatIs"
import { getBlogList } from "~/_libs/microcms"

const Home = async () => {
  const res = await getBlogList({ limit: 5 })

  return (
    <>
      <Header />
      <WhatIs />
      <TopBlogs contents={res.contents} totalCount={0} limit={0} offset={0} />
      <Footer />
    </>
  )
}

export default Home
