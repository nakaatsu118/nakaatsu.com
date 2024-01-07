'use client'

import Image from 'next/image';
import styles from './WhatIs.module.css';
import CardHeader from '../../Card/CardHeader';
import { GithubOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import Card from '~/_components/Card';
import Link from 'next/link';
import { motion } from 'framer-motion';

const WhatIs = () => {
  return (
    <div className={styles.whatIsWrapper}>
      <Card>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay: 0.3 }}>
          <CardHeader iconPath='/images/Icon_nakaatsu_.png' iconAlt='nakaatsu icon' title='Welcome!' link='/' isShare />
          <motion.div className={`${styles.imageContainer}`} initial={{ x: 400, y: 200, scale: 0 }} animate={{ x: 0, y: 0, scale: 1 }} transition={{ type: 'spring', duration: 0.48, delay: 0.6, bounce: 0.3 }}>
            <Image src='https://images.microcms-assets.io/assets/af60901723f5492a9a451bcfbe5ace1c/f5eb79b485a54f5b9a550bbf0a440121/nakaatsu_top.png?fit=crop&w=1200' alt="main Image" fill style={{ objectFit: 'cover' }} />
          </motion.div>
          <div className={styles.mainContent}>
            <div className={styles.actionContainer}>
              <div className={styles.leftAction}>
                <Link href={'https://twitter.com/nakaatsu'} rel="noopener noreferrer" target="_blank">
                  <motion.div whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.3 } }} whileTap={{ scale: 0.8 }}>
                    <TwitterOutlined className={`${styles.actionIcon} ${styles.twitter}`} />
                  </motion.div>
                </Link>
                <Link href={'https://www.instagram.com/nakaatsu_world/'} rel="noopener noreferrer" target="_blank">
                  <motion.div whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.3 } }} whileTap={{ scale: 0.8 }}>
                    <InstagramOutlined className={`${styles.actionIcon} ${styles.instagram}`} />
                  </motion.div>
                </Link>
                <Link href={'https://github.com/nakaatsu118'} rel="noopener noreferrer" target="_blank">
                  <motion.div whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.3 } }} whileTap={{ scale: 0.8 }}>
                    <GithubOutlined className={`${styles.actionIcon} ${styles.github}`} />
                  </motion.div>
                </Link>
              </div>
            </div>
            <div className={styles.titleContainer}>
              <h3 className={styles.title}>このサイトについて</h3>
            </div>
            <div className={styles.bodyContainer}>
              こんにちは。なかあつです。このサイトは <Link href='/profile' className={styles.link}>@nakaatsu</Link> の日々をしたためています。<br />
              多趣味でごっちゃにななかあつの世界がここにあります。<br />
              <br />
              🔥Next.js / React / TypeScript<br />
              🐠Aquarium / 🌿Plants / 👨‍🍳Cooking / 📸Gadget
              <br />
            </div>
          </div>
        </motion.div >
      </Card >
    </div>

  )
}

export default WhatIs
