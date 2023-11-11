import styles from './TopPageCardHeader.module.css';
import { ShareAltOutlined, SwapRightOutlined } from '@ant-design/icons';

export type TopPageCardHeaderProps = {
  iconPath: string
  iconAlt: string
  title: string
  link?: string
}

export default function TopPageCardHeader({ iconPath, iconAlt, title, link }: TopPageCardHeaderProps) {
  return (
    <div className={styles.headContainer}>
      <div className={styles.contents}>
        <img className={styles.headIcon} src={iconPath} alt={iconAlt} />
        <div>{title}</div>
        <div className={styles.right}>
          {link ? <>
            MORE<SwapRightOutlined className={styles.icon} />
          </> : <ShareAltOutlined className={styles.icon} />}
        </div>
      </div>
    </div>
  )
}
