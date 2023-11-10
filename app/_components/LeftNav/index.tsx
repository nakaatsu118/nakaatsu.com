import { Laptop } from '@mui/icons-material';
import IconArticleLine from '../Icon/Article';
import IconHistory from '../Icon/History';
import IconHome from '../Icon/Home';
import IconUser from '../Icon/User';
import styles from './LeftNav.module.css';
import IconLaptop from '../Icon/Laptop';

const LeftNav = () => {
  return (
    <div className={styles.LeftNavContainer}>
      <img src={'/images/logo/naka_logo_trans.png'} alt="logo" className={styles.LogoImage} />
      <h2>
        <IconHome className={styles.icon} /><p className={styles.text}>Home</p>
      </h2>
      <h2>
        <IconArticleLine className={styles.icon} /><p className={styles.text}>Blog</p>
      </h2>
      <h2>
        <IconLaptop className={styles.icon} /><p className={styles.text}>Works</p>
      </h2>
      <h2>
        <IconHistory className={styles.icon} /><p className={styles.text}>History</p>
      </h2>
      {/* <h2>
        <IconUser className={styles.icon} />
        Who?</h2> */}
      <div className={styles.copyRight}>©nakaatsu</div>
    </div>
  );
}

export default LeftNav;
