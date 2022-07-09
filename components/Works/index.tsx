import type { NextPage } from 'next'

const Works: NextPage = () => {
  return (
    <div id='Works' className='py-20 px-6 md:h-screen min-h-[800px] flex justify-center items-center'>
      <div className='flex flex-1 flex-col gap-8 w-11/12 justify-center items-center m-auto max-w-2xl'>
        <div className='text-4xl font-raleway font-semibold' >Works</div>
        <div className='text-sm font-kosugimaru'>制作した作品をまとめました。</div>
        <div className='font-kosugimaru card md:w-3/5 w-5/6 bg-base-100 text-gray-900 shadow-xl'>
          <ul className='font-kosugimaru card-body flex flex-col gap-2 text-left'>
            <figure><img src='images/works/denonbu-info.png' /></figure>
            <div className='card-title md:text-xl text-lg font-semibold'>電音部配信楽曲一覧サイト</div>
            <p className='text-sm'>
              電音部の配信されている楽曲情報＆YouTubeリンクをまとめたサイトです。<br />
              データ管理にmicroCMSを使っています。
            </p>
            <a className="link font-raleway" href="https://www.denonbu.info/" target="_blank" rel='noopener noreferrer'>www.denonbu.info</a>
            <li><a className="link font-raleway" href="https://github.com/nakaatsu118/denonbu-info" target="_blank" rel='noopener noreferrer'>GitHub</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Works
