import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>nakaatsu Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <div className='sticky top-0 z-30 bg-opacity-90 backdrop-blur navbar font-raleway font-semibold text-neutral-content'>
          <div className='flex-1'>
            <ul className='menu menu-horizontal p-0'>
              <li><a>About</a></li>
              <li><a>History</a></li>
            </ul>
          </div>
          <div className='flex-none'>
            <ul className='menu menu-horizontal p-0 bg-opacity-0'>
              <li>
                <a href='https://twitter.com/nakaatsu' target='_blank' rel='noopener noreferrer'>
                  <img src='./images/logo/twitter.svg' width="30" />
                </a>
              </li>
              <li>
                <a href='https://zenn.dev/nakaatsu' target='_blank' rel='noopener noreferrer'>
                  <img src='./images/logo/zenn.svg' width="30" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.firstView}>
          <Image className='mask mask-squircle' src="/images/nakaatsu_icon.png" width={300} height={300} objectFit={'contain'} />
          <div className='mockup-code bg-opacity-30 border-base-content border-2 border-opacity-10'>
            <pre data-prefix="$"><code>Welcome to nakaatsu's site.</code></pre>
          </div>
        </div>
        <div className='text-white py-20 bg-slate-700/[.70]'>
          <div className='flex flex-1 flex-row gap-8 w-11/12 justify-center items-center m-auto'>
            <div className='text-4xl font-raleway font-semibold' >About</div>
            <div className='text-sm font-kosugimaru'>
              このサイトは nakaatsu のポートフォリオサイトです。<br />
              「ではみなさんは、そういうふうに川だと云いわれたり、乳の流れたあとだと云われたりしていたこのぼんやりと白いものがほんとうは何かご承知ですか。」<br />
              先生は、黒板に吊つるした大きな黒い星座の図の、上から下へ白くけぶった銀河帯のようなところを指さしながら、みんなに問といをかけました。
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center flex-col gap-6 bg-slate-200/[.7] py-14'>
          <div className='font-raleway font-semibold text-4xl'>History</div>
          <div className='w-10/12'>
            <div className='flex flex-row gap-4 items-baseline m-auto'>
              <div className='text-lg font-azeretmono font-bold'>2022.2</div>
              <div className='text-sm font-kosugimaru'>freee株式会社で働き始めました。</div>
            </div>
            <div className='flex flex-row gap-4 items-baseline m-auto'>
              <div className='text-lg font-azeretmono font-bold'>2018.9</div>
              <div className='text-sm font-kosugimaru'>いちから株式会社（現ANYCOLOR株式会社）で働き始めました。</div>
            </div>
            <div className='flex flex-row gap-4 items-baseline m-auto'>
              <div className='text-lg font-azeretmono font-bold'>2016.4</div>
              <div className='text-sm font-kosugimaru'>株式会社アルファシステムズで働き始めました。</div>
            </div>
            <div className='flex flex-row gap-4 items-baseline m-auto'>
              <div className='text-lg font-azeretmono font-bold'>2016.3</div>
              <div className='text-sm font-kosugimaru'>東京電機大学情報通信工学科を卒業しました。</div>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
            <img src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
