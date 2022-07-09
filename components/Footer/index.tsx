import { NextPage } from "next";

const Footer: NextPage = () => {
  return (
    <div id="Footer" className="bg-slate-800 py-8 px-6 flex justify-center">
      <div className="font-raleway text-sm">
        <a className="link text-white" href="https://twitter.com/nakaatsu" target="_blank" rel='noopener noreferrer'>@nakaatsu</a>
      </div>
    </div>
  )
}

export default Footer
