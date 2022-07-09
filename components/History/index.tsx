import type { NextPage } from 'next'

const History: NextPage = () => {

  return (
    <div id='History' className='bg-slate-200/[.7] py-20 px-6 md:min-h-screen min-h-[500px] flex justify-center'>
      <div className='flex justify-center items-center flex-col gap-6 max-w-2xl m-auto'>
        <div className='font-raleway font-semibold text-4xl'>History</div>
        <div className='font-kosugimaru text-sm'>簡単な経歴と身につけたスキルをまとめました。</div>
        <div className=''>
          <div className='flex flex-row items-baseline m-auto py-3 gap-4'>
            <div className='md:text-lg text-sm font-raleway font-bold'>2022.2~</div>
            <div className='text-sm font-kosugimaru'>freee株式会社で働き始めました。</div>
          </div>
          <div className='flex flex-row items-baseline m-auto py-3 gap-4'>
            <div className='md:text-lg text-sm font-raleway font-bold'>2018.9<br />~2022.1</div>
            <div className='flex flex-col gap-2 font-kosugimaru'>
              <div className='text-sm'>ANYCOLOR株式会社（旧いちから株式会社）で働き始めました。</div>
              <div className='text-xs flex flex-col gap-1 prose'>
                <blockquote>
                  WEBフロント、サーバーサイド、社内システム、LP監修など色々担当。<br />
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
                      <li>Pardot</li>
                      <li>microCMS</li>
                      <li>WordPress</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-row items-baseline m-auto py-3 gap-4'>
            <div className='md:text-lg text-sm font-raleway font-bold'>2016.4<br />~2018.9</div>
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
            <div className='md:text-lg text-sm font-raleway font-bold'>~2016.3</div>
            <div className='text-sm font-kosugimaru'>東京電機大学情報通信工学科を卒業しました。</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default History
