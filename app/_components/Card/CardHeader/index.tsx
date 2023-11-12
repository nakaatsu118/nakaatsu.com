'use client';

import Link from 'next/link';
import styles from './CardHeader.module.css';
import { ShareAltOutlined, SwapRightOutlined } from '@ant-design/icons';
import { usePathname } from "next/navigation"

export type CardHeaderProps = {
  iconPath: string
  iconAlt: string
  title: string
  link: string
  isShare?: boolean
  shareTitle?: string
}

const CardHeader = ({ iconPath, iconAlt, title, link, isShare, shareTitle }: CardHeaderProps) => {
  const path = usePathname()
  const baseUrl = 'https://www.nakaatsu.com'
  const editedShareTitle = shareTitle ? shareTitle + ' - nakaatsu World' : 'nakaatsu World'

  return (
    <div className={styles.headContainer}>
      <div className={styles.contents}>
        <div className={styles.left}>
          <Link href={link}>
            <img className={styles.headIcon} src={iconPath} alt={iconAlt} />
            <div className={styles.title}>{title}</div>
          </Link>
        </div>
        <div className={styles.right}>
          {isShare ? <a href={`https://twitter.com/share?url=${baseUrl + path}&text=${editedShareTitle}`} rel="noopener noreferrer" target="_blank"><ShareAltOutlined className={styles.icon} /></a>
            :
            link ? <Link href={link}>
              MORE<SwapRightOutlined className={styles.icon} />
            </Link> : <></>}
        </div>
      </div>
    </div>
  )
}

export default CardHeader
