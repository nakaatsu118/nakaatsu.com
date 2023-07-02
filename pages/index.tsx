import type { GetStaticProps, NextPage } from 'next'
import About from '~/components/About'
import Footer from '~/components/Footer'
import History from '~/components/History'
import LatestBlog from '~/components/LatestBlogs'
import NavBar from '~/components/NavBar'
import Welcome from '~/components/Welcome'
import Who from '~/components/Who'
import Works from '~/components/Who'
import Meta from '~/components/_common/Meta'
import { BlogType } from '~/types/blog'
import client from '~/utils/microCMSClient'

export interface Props {
  blogs: BlogType[]
}

const Home = ({blogs}: Props) => {

  return (
    <div>
      <Meta pageTitle='' pageUrl='' pageOgImage='https://www.nakaatsu.com/images/og_image.png' />
      <div>
        <NavBar />
        <Welcome />
        <LatestBlog blogs={blogs} />
        <Who />
        <Footer />
      </div>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  // .envファイル未設定の場合nullを返す
  if (client == null) {
    return {
      props: {},
    };
  }

  const blogsData = await client.get({ endpoint: 'blogs', queries: { limit: 4, orders: '-date' } });

  return {
    props: {
      blogs: blogsData.contents,
    },
  };
};
