import type { NextPage } from 'next'
import About from '~/components/About'
import Footer from '~/components/Footer'
import History from '~/components/History'
import NavBar from '~/components/NavBar'
import Welcome from '~/components/Welcome'
import Works from '~/components/Works'
import Meta from '~/components/_common/Meta'

const Home: NextPage = () => {

  return (
    <div>
      <Meta pageTitle='' pageUrl='' pageOgImage='https://www.nakaatsu.com/images/og_image.png' />
      <div>
        <NavBar />
        <Welcome />
        <About />
        <Works />
        <History />
        <Footer />
      </div>
    </div>
  )
}

export default Home
