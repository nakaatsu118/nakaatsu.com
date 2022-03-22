import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  const title = "nakaatsu's Portfolio"
  const url = 'https://www.nakaatsu.com'
  const description = 'nakaatsuのポートフォリオサイトです。簡単な経歴と身につけたスキルをまとめています。'
  const ogImage = 'https://www.nakaatsu.com/images/og_image.png'
  const siteName = "nakaatsu's Portfolio"

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="ja_JP" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@nakaatsu" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="viewport" content="width=device-width" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#65a30d" />
      </Head>

      <div className='bg-gradient-to-br from-lime-600 via-teal-100 to-cyan-300'>

        <div className='sticky top-0 z-30 bg-opacity-90 backdrop-blur navbar font-raleway font-semibold text-neutral-content'>
          <div className='flex-1 md:text-base text-xs'>
            <ul className='hidden md:flex menu menu-horizontal p-0'>
              <li><a href='#About'>About</a></li>
              <li><a href='#History'>History</a></li>
            </ul>
          </div>
          <div className='flex-none'>
            <ul className='menu menu-horizontal p-0 bg-opacity-0'>
              <li>
                <a href='https://twitter.com/nakaatsu' target='_blank' rel='noopener noreferrer'>
                  <div className='md:w-7 w-5'>
                    <img src='./images/logo/twitter.svg' />
                  </div>
                </a>
              </li>
              <li>
                <a href='https://zenn.dev/nakaatsu' target='_blank' rel='noopener noreferrer'>
                  <div className='md:w-7 w-5'>
                    <img src='./images/logo/zenn.svg' />
                  </div>
                </a>
              </li>
              <li>
                <a href='https://github.com/nakaatsu118' target='_blank' rel='noopener noreferrer'>
                  <div className='md:w-7 w-5'>
                    <img src='./images/logo/github.png' />
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center py-20 md:py-30'>
          <div className='mockup-window bg-slate-400 md:w-9/12 w-10/12 shadow-2xl max-w-5xl'>
            <div className='flex flex-col justify-center items-center gap-4 bg-slate-500 bg-opacity-90 py-10'>
              <div className='relative md:w-60 md:h-60 w-40 h-40'>
                <Image className='mask mask-squircle' src="/images/nakaatsu_icon.png" layout='fill' objectFit={'contain'} />
              </div>
              <div className='md:block hidden mockup-code bg-opacity-30 border-base-content border-2 border-opacity-10 w-4/6'>
                <pre data-prefix="$"><code>Welcome to nakaatsu's site.</code></pre>
              </div>
              <div className='md:hidden text-white font-mono'>$ Welcome to<br />nakaatsu's site.</div>
            </div>
          </div>
        </div>

        <div id='About' className='text-white py-20 px-6 bg-slate-700/[.70] md:h-screen min-h-[800px] flex justify-center items-center'>
          <div className='flex flex-1 flex-col gap-8 w-11/12 justify-center items-center m-auto max-w-2xl'>
            <div className='text-4xl font-raleway font-semibold' >About</div>
            <div className='text-sm font-kosugimaru'>
              このサイトは <a className='link' href='https://twitter.com/nakaatsu' target='_blank' rel='noopener noreferrer'>nakaatsu</a> のポートフォリオサイトです。<br />
              自身の経歴やスキルセット等をまとめています。<br />
            </div>
            <div className='font-kosugimaru card md:w-96 w-60 bg-base-100 text-gray-900 shadow-xl'>
              <ul className='card-body flex flex-col gap-2 text-left font-raleway'>
                <div className='card-title md:text-xl text-lg font-raleway font-semibold'>Items used</div>
                <li className='flex gap-2 md:text-base text-sm'><img src='./images/check-o.svg' />Framework: <a className='link' href='https://nextjs.org/' target={'_blank'} rel='noopener noreferrer'>Next.js</a></li>
                <li className='flex gap-2 md:text-base text-sm'><img src='./images/check-o.svg' />CSS component: <a className='link' href='https://daisyui.com/' target={'_blank'} rel='noopener noreferrer'>daisyUI</a></li>
                <li className='flex gap-2 md:text-base text-sm'><img src='./images/check-o.svg' />Hosted by: <a className='link' href='https://vercel.com/' target={'_blank'} rel='noopener noreferrer'>Vercel</a></li>
              </ul>
            </div>
            <div className='md:block hidden mockup-code bg-opacity-60 border-base-content border-2 border-opacity-10 w-4/6'>
              <pre data-prefix="$"><code>Code is <a className='link' href='https://github.com/nakaatsu118/nakaatsu.com' target={'_blank'} rel='noopener noreferrer'>here</a>.</code></pre>
            </div>
            <div className='md:hidden text-white font-monoa bg-slate-600 px-8 py-6 rounded-lg'>
              <div className=''>
                $ Code is <a className='link' href='https://github.com/nakaatsu118/nakaatsu.com' target={'_blank'} rel='noopener noreferrer'>here</a>.
              </div>
            </div>
          </div>
        </div>

        <div id='History' className='bg-slate-200/[.7] py-20 px-6 md:min-h-screen min-h-[500px] flex justify-center'>
          <div className='flex justify-center items-center flex-col gap-6 max-w-2xl m-auto'>
            <div className='font-raleway font-semibold text-4xl'>History</div>
            <div className='font-kosugimaru text-sm'>簡単な経歴と身につけたスキルをまとめました。</div>
            <div className=''>
              <div className='flex flex-row items-baseline m-auto py-3 gap-4'>
                <div className='md:text-lg text-sm font-raleway font-bold'>2022.2</div>
                <div className='text-sm font-kosugimaru'>freee株式会社で働き始めました。</div>
              </div>
              <div className='flex flex-row items-baseline m-auto py-3 gap-4'>
                <div className='md:text-lg text-sm font-raleway font-bold'>2018.9</div>
                <div className='flex flex-col gap-2 font-kosugimaru'>
                  <div className='text-sm'>いちから株式会社（現ANYCOLOR株式会社）で働き始めました。</div>
                  <div className='text-xs flex flex-col gap-1 prose'>
                    <blockquote>
                      フロント、サーバーサイド、社内システム、LP監修など色々担当。<br />
                      開発経験ほぼ0からの状態でいろいろなプロダクトを担当させていただき、多くのスキルを身につけることができました。
                    </blockquote>
                  </div>
                  <div className='flex gap-3 md:flex-row flex-col'>
                    <div className='card w-40 bg-base-100 shadow-lg font-raleway'>
                      <div className='card-body'>
                        <h2 className='card-title text-lg'>FrontEnd</h2>
                        <ul className='list-disc text-sm'>
                          <li>React</li>
                          <li>Next.js</li>
                          <li>Javascript, Typescript</li>
                          <li>HTML, CSS</li>
                        </ul>
                      </div>
                    </div>
                    <div className='card w-40 bg-base-100 shadow-lg font-raleway'>
                      <div className='card-body'>
                        <h2 className='card-title text-lg'>BackEnd</h2>
                        <ul className='list-disc text-sm'>
                          <li>Ruby</li>
                          <li>Ruby on Rails</li>
                          <li>PHP</li>
                          <li>Google App Script</li>
                          <li>MySQL</li>
                        </ul>
                      </div>
                    </div>
                    <div className='card w-40 bg-base-100 shadow-lg font-raleway'>
                      <div className='card-body'>
                        <h2 className='card-title text-lg'>Other</h2>
                        <ul className='list-disc text-sm'>
                          <li>AWS</li>
                          <li>Google Cloud Platform</li>
                          <li>Google Search Console</li>
                          <li>GTM, GA</li>
                          <li>Salesforce</li>
                          <li>microCMS</li>
                          <li>WordPress</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-row items-baseline m-auto py-3 gap-4'>
                <div className='md:text-lg text-sm font-raleway font-bold'>2016.4</div>
                <div className='flex flex-col gap-2 font-kosugimaru'>
                  <div className='text-sm'>株式会社アルファシステムズで働き始めました。</div>
                  <div className='text-xs flex flex-col gap-1 prose'>
                    <blockquote>
                      SIer。インターネット決済システムの設計、試験を担当。<br />
                    </blockquote>
                  </div>
                  <div className='flex gap-3'>
                    <div className='card w-40 bg-base-100 shadow-lg font-raleway'>
                      <div className='card-body'>
                        <h2 className='card-title text-lg'>Skill</h2>
                        <ul className='list-disc text-sm'>
                          <li>C</li>
                          <li>Java</li>
                          <li>VBA</li>
                          <li>Oracle DB</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-row items-baseline m-auto py-3 gap-4'>
                <div className='md:text-lg text-sm font-raleway font-bold'>2016.3</div>
                <div className='text-sm font-kosugimaru'>東京電機大学情報通信工学科を卒業しました。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
