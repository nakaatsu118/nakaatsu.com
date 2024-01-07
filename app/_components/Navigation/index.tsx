import Image from 'next/image';
import styles from './Navigation.module.css';
import Link from 'next/link';

const Navigation = () => {
  return (
    <div className={styles.navigationContainer}>
      <Link href="/" className={styles.imageLink}>
        <h2 className={styles.imageContainer}>
          <Image src={'/images/logo/naka_.svg'} alt="logo" fill className={styles.image} />
        </h2>
      </Link>
      <div className={styles.linkContainer}>
        <Link href="/" className={styles.link}>
          <h2>
            <p className={styles.text}>Home</p>
          </h2>
        </Link>
        <Link href="/blog" className={styles.link}>
          <h2>
            <p className={styles.text}>Blog</p>
          </h2>
        </Link>
        {/* <Link href="/works" className={styles.link}>
          <h2>
            <p className={styles.text}>Works</p>
          </h2>
        </Link> */}
        <Link href="/profile" className={styles.link}>
          <h2>
            <p className={styles.text}>Profile</p>
          </h2>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
