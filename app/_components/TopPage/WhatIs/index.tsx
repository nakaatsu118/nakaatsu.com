import styles from './WhatIs.module.css';
import ShareIcon from '@mui/icons-material/Share';
import IconGithub from "@/_components/Icon/GitHub";
import IconTwitter from "@/_components/Icon/Twitter";
import IconZenn from "@/_components/Icon/Zenn";
import IconInstagram from "@/_components/Icon/Instagram";
import IconHeart from "@/_components/Icon/Heart";

export default async function WhatIs() {
  return (
    <div className={styles.CardContainer}>
      <div className={styles.HeadContents}>
        <div className={styles.headContainer}>
          <img className={styles.headIcon} src={'/images/Icon_nakaatsu_.png'} alt="user icon" />
          <div>nakaatsu</div>
          <div className={styles.rightHead}>
            {/* <div>…</div> */}
            <ShareIcon className={styles.shareIcon} />
          </div>
        </div>
      </div>
      <img className={styles.mainImage} src={'/images/nakaatsu_top.png'} alt="main Image" />
      <div className={styles.mainContent}>
        <div className={styles.actionContents}>
          <div className={styles.actionContainer}>
            <div className={styles.leftAction}>
              <IconTwitter className={styles.actionIcon} />
              <IconInstagram className={styles.actionIcon} />
              <IconGithub className={styles.actionIcon} />
              <IconZenn className={styles.actionIcon} />
            </div>
            <div className={styles.rightAction}>
              <IconHeart className={styles.actionIcon} />
            </div>
          </div>
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>nakaatsu</div>
          <div className={styles.subTitle}>このサイトについて</div>
        </div>
        <div className={styles.bodyContainer}>
          こんにちは。なかあつです。このサイトは <a className='link' href='https://twitter.com/nakaatsu' target='_blank' rel='noopener noreferrer'>@nakaatsu</a> のポートフォリオサイトです。<br /><br />
          熱帯魚を飼ったりオタクだったりエンジニアだったりします。
          <br />
          🔥Next.js / React / TypeScript
          <br />
        </div>
      </div>
    </div>
  )
}
