import type { NextPage } from 'next'

const About: NextPage = () => {

  return (
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
  )
}

export default About
