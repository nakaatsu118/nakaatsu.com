import TopPage from "../app/_components/TopPage"
import { getBlogList } from "./_lib/microcms"

export default async function Home() {
  const contents = await getBlogList({ limit: 5 })

  return (
    <TopPage {...contents} />
  )
}
