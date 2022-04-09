import type { NextPage } from 'next'
import About from '~/components/About'
import History from '~/components/History'
import NavBar from '~/components/NavBar'
import Welcome from '~/components/Welcome'
import Meta from '~/components/_common/Meta'

const Home: NextPage = () => {

  return (
    <div>
      <Meta pageTitle='' pageUrl='' pageOgImage='https://www.nakaatsu.com/images/og_image.png' />
      <div className='bg-gradient-to-br from-lime-600 via-teal-100 to-cyan-300'>
        <NavBar />
        <Welcome />
        <About />
        <History />
      </div>
    </div>
  )
}

export default Home
