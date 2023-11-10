import styles from './TopPageCardHeader.module.css';
import ShareIcon from '@mui/icons-material/Share';
import IconRightOpen from "@/_components/Icon/RightOpen";

export type TopPageCardHeaderProps = {
  iconPath: string
  iconAlt: string
  title: string
  link?: string
}

export default function TopPageCardHeader({ iconPath, iconAlt, title, link }: TopPageCardHeaderProps) {
  return (
    <div className={styles.HeadContents}>
      <div className={styles.headContainer}>
        <img className={styles.headIcon} src={iconPath} alt={iconAlt} />
        <div>{title}</div>
        <div className={styles.rightHead}>
          {link ? <>
            MORE
            <IconRightOpen className={styles.shareIcon} />
          </> : <ShareIcon className={styles.shareIcon} />}
        </div>
      </div>
    </div>
  )
}
