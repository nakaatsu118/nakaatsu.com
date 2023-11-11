import Footer from "./_components/Footer"
import Header from "./_components/Header"
import Blogs from "./_components/TopPage/_components/Blogs"
import WhatIs from "./_components/TopPage/_components/WhatIs"
import { getBlogList } from "@/_lib/microcms"

export default async function Home() {
  const res = await getBlogList({ limit: 5 })

  return (
    <>
      <Header />
      <WhatIs />
      <Blogs contents={res.contents} />
      <Footer />
    </>
  )
}
