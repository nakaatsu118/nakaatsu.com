import TopPage from "../app/_components/TopPage"
import { getBlogList } from "./_lib/microcms"

export default async function Home() {
  const contents = await getBlogList()
  const latestContent = contents.contents[0]

  return (
    <TopPage blog={latestContent} />
  )
}
