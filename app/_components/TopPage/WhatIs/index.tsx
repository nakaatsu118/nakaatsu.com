import Image from 'next/image';
import styles from './WhatIs.module.css';
import CardHeader from '../../Card/CardHeader';
import { GithubOutlined, HeartOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import Card from '~/_components/Card';
import Link from 'next/link';

const WhatIs = () => {
  return (
    <Card>
      <CardHeader iconPath='/images/Icon_nakaatsu_.png' iconAlt='user icon' title='nakaatsu' link='/' isShare />
      <div className={styles.imageContainer} ><Image src={'/images/nakaatsu_top.png'} alt="main Image" fill style={{ objectFit: 'cover' }} /></div>
      <div className={styles.mainContent}>
        <div className={styles.actionContainer}>
          <div className={styles.leftAction}>
            <Link href={'https://twitter.com/nakaatsu'} rel="noopener noreferrer" target="_blank"><TwitterOutlined className={styles.actionIcon} /></Link>
            <Link href={'https://www.instagram.com/nakaatsu_world/'} rel="noopener noreferrer" target="_blank">
              <InstagramOutlined className={styles.actionIcon} />
            </Link>
            <Link href={'https://github.com/nakaatsu118'} rel="noopener noreferrer" target="_blank">
              <GithubOutlined className={styles.actionIcon} />
            </Link>
          </div>
          <div className={styles.rightAction}>
            <HeartOutlined className={styles.actionIcon} />
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>このサイトについて</h3>
        </div>
        <div className={styles.bodyContainer}>
          こんにちは。なかあつですわ。このサイトは <a className='link' href='https://twitter.com/nakaatsu' target='_blank' rel='noopener noreferrer'>@nakaatsu</a> の日々をしたためています。<br />
          多趣味でごっちゃにな自分の世界がここにあります。<br />
          <br />
          🔥Next.js / React / TypeScript<br />
          🐠Aquarium / 🌿Plants / 👨‍🍳Cooking / 📸Gadget
          <br />
        </div>
      </div>
    </Card>
  )
}

export default WhatIs
