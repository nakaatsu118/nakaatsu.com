import Image from 'next/image'
import styles from './Header.module.css'

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <Image src={'/images/logo/naka_logo_trans.png'} alt="logo" fill className={styles.image} />
    </div>
  )
}

export default Header
