import { Laptop } from '@mui/icons-material';
import IconArticleLine from '../../app/_components/Icon/Article';
import IconHistory from '../../app/_components/Icon/History';
import IconHome from '../../app/_components/Icon/Home';
import IconUser from '../../app/_components/Icon/User';
import styles from './LeftNav.module.css';
import IconLaptop from '../../app/_components/Icon/Laptop';

const LeftNav = () => {
  return (
    <div className={styles.LeftNavContainer}>
      <h1><img src={'/images/logo/naka_logo_trans.png'} alt="logo" className={styles.LogoImage} /></h1>
      <h2>
        <IconHome className={styles.icon} />
        Home
      </h2>
      <h2>
        <IconArticleLine className={styles.icon} />
        Blog</h2>
      <h2>
        <IconLaptop className={styles.icon} />
        Works</h2>
      <h2>
        <IconHistory className={styles.icon} />
        History</h2>
      {/* <h2>
        <IconUser className={styles.icon} />
        Who?</h2> */}
      <div className={styles.copyRight}>©nakaatsu</div>
    </div>
  );
}

export default LeftNav;
