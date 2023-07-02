import type { NextPage } from 'next'
import styles from './NavBar.module.css'

const NavBar: NextPage = () => {

  return (
    <div id='NavBar' className={styles.navbarContainer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={'/images/logo/naka_logo_trans.png'} alt='logo' />
        </div>
      </div>
      <div className={styles.container}>
        <ul className={styles.menu}>
          <li><a>Blog</a></li>
          <li><a href='#Works'>Works</a></li>
          <li><a href='#History'>History</a></li>
          <li><a href='#Who'>Who?</a></li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
