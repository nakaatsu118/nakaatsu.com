import styles from './Navigation.module.css';
import { FormOutlined, HomeOutlined, SmileOutlined } from '@ant-design/icons';

const Navigation = () => {
  return (
    <div className={styles.NavigationContainer}>
      <img src={'/images/logo/naka_logo_trans.png'} alt="logo" className={styles.LogoImage} />
      <h2>
        <HomeOutlined style={{ fontSize: '0.24rem' }} /><p className={styles.text}>Home</p>
      </h2>
      <h2>
        <FormOutlined style={{ fontSize: '0.24rem' }} /><p className={styles.text}>Blog</p>
      </h2>
      <h2>
        <SmileOutlined style={{ fontSize: '0.24rem' }} /><p className={styles.text}>Bio</p>
      </h2>
    </div>
  );
}

export default Navigation;
