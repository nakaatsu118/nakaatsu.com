import Image from 'next/image';
import styles from './Navigation.module.css';
import { FormOutlined, HomeOutlined, SmileOutlined } from '@ant-design/icons';
import Link from 'next/link';

const Navigation = () => {
  return (
    <div className={styles.navigationContainer}>
      <Link href="/" className={styles.imageLink}>
        <h2 className={styles.imageContainer}>
          <Image src={'/images/logo/naka_logo_trans.png'} alt="logo" fill className={styles.image} />
        </h2>
      </Link>
      <Link href="/" className={styles.link}>
        <h2>
          <HomeOutlined style={{ fontSize: '0.24rem' }} /><p className={styles.text}>Home</p>
        </h2>
      </Link>
      <Link href="/blog" className={styles.link}>
        <h2>
          <FormOutlined style={{ fontSize: '0.24rem' }} /><p className={styles.text}>Blog</p>
        </h2>
      </Link>
      <Link href="/bio" className={styles.link}>
        <h2>
          <SmileOutlined style={{ fontSize: '0.24rem' }} /><p className={styles.text}>Bio</p>
        </h2>
      </Link>
    </div>
  );
}

export default Navigation;
