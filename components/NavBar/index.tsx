import type { NextPage } from 'next'
import NavIcon from './NavIcon'

const NavBar: NextPage = () => {

  return (
    <div id='NavBar' className='sticky top-0 z-30 bg-opacity-90 backdrop-blur navbar font-raleway font-semibold text-neutral-content'>
      <div className='flex-1 md:text-base text-xs'>
        <ul className='hidden md:flex menu menu-horizontal p-0'>
          <li><a href='#About'>About</a></li>
          <li><a href='#History'>History</a></li>
        </ul>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal p-0 bg-opacity-0'>
          <li>
            <NavIcon link='https://twitter.com/nakaatsu' imgPath='./images/logo/twitter.svg' />
          </li>
          <li>
            <NavIcon link='https://zenn.dev/nakaatsu' imgPath='./images/logo/zenn.svg' />
          </li>
          <li>
            <NavIcon link='https://github.com/nakaatsu118' imgPath='./images/logo/github.png' />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
