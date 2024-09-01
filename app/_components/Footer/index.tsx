import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div>©nakaatsu</div>
      <Link href="/privacyPolicy" className={styles.link}>
        <h2>
          <p className={styles.text}>PrivacyPolicy</p>
        </h2>
      </Link>
    </div>
  );
};

export default Footer;
