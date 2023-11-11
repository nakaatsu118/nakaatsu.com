import styles from './WhatIs.module.css';
import TopPageCardHeader from '../TopPageCardHeader';
import { GithubOutlined, HeartOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';

export default function WhatIs() {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <TopPageCardHeader iconPath='/images/Icon_nakaatsu_.png' iconAlt='user icon' title='nakaatsu' />
        <img className={styles.mainImage} src={'/images/nakaatsu_top.png'} alt="main Image" />
        <div className={styles.mainContent}>
          <div className={styles.actionContainer}>
            <div className={styles.leftAction}>
              <TwitterOutlined className={styles.actionIcon} />
              <InstagramOutlined className={styles.actionIcon} />
              <GithubOutlined className={styles.actionIcon} />
            </div>
            <div className={styles.rightAction}>
              <HeartOutlined className={styles.actionIcon} />
            </div>
          </div>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>このサイトについて</h3>
          </div>
          <div className={styles.bodyContainer}>
            こんにちは。なかあつです。このサイトは <a className='link' href='https://twitter.com/nakaatsu' target='_blank' rel='noopener noreferrer'>@nakaatsu</a> の日々をしたためています。<br />
            多趣味でごっちゃにな自分の世界がここにあります。<br />
            <br />
            🔥Next.js / React / TypeScript<br />
            🐠Aquarium / 🌿Plants / 👨‍🍳Cooking / 📸Gadget
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}
