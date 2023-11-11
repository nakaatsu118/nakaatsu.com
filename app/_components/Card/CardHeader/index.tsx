import styles from './CardHeader.module.css';
import { ShareAltOutlined, SwapRightOutlined } from '@ant-design/icons';

export type CardHeaderProps = {
  iconPath: string
  iconAlt: string
  title: string
  link?: string
}

const CardHeader = ({ iconPath, iconAlt, title, link }: CardHeaderProps) => {
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

export default CardHeader
