import Image from 'next/image'
import styles from './Header.module.css'
import Link from 'next/link'

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <Link href="/">
        <Image src={'/images/logo/naka_logo_trans.png'} alt="logo" fill className={styles.image} />
      </Link>
    </div>
  )
}

export default Header
