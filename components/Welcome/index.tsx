import type { NextPage } from 'next'

const Welcome: NextPage = () => {

  return (
    <div id='Welcome' className='flex flex-col justify-center items-center py-20 md:py-30'>
      <div className='mockup-window bg-slate-400 md:w-9/12 w-10/12 shadow-2xl max-w-5xl'>
        <div className='flex flex-col justify-center items-center gap-4 bg-slate-500 bg-opacity-90 py-10'>
          <div className='relative md:w-60 md:h-60 w-40 h-40'>
            <img className='mask mask-squircle' src="/images/nakaatsu_icon.png" />
          </div>
          <div className='md:block hidden mockup-code bg-opacity-30 border-base-content border-2 border-opacity-10 w-4/6'>
            <pre data-prefix="$"><code>Welcome to nakaatsu&apos;s site.</code></pre>
          </div>
          <div className='md:hidden text-white font-mono'>$ Welcome to<br />nakaatsu&apos;s site.</div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
