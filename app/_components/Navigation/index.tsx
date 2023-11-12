import Image from 'next/image';
import styles from './Navigation.module.css';
import { FormOutlined, HomeOutlined, SmileOutlined } from '@ant-design/icons';
import Link from 'next/link';

const Navigation = () => {
  return (
    <div className={styles.navigationContainer}>
      <Link href="/" className={styles.imageLink}>
        <Image src={'/images/logo/naka_logo_trans.png'} alt="logo" fill className={styles.image} />
      </Link>
      <Link href="/">
        <h2>
          <HomeOutlined style={{ fontSize: '0.24rem' }} /><p className={styles.text}>Home</p>
        </h2>
      </Link>
      <Link href="/blog">
        <h2>
          <FormOutlined style={{ fontSize: '0.24rem' }} /><p className={styles.text}>Blog</p>
        </h2>
      </Link>
      <Link href="/bio">
        <h2>
          <SmileOutlined style={{ fontSize: '0.24rem' }} /><p className={styles.text}>Bio</p>
        </h2>
      </Link>
    </div>
  );
}

export default Navigation;
