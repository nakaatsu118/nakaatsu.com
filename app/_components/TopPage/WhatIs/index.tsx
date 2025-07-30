'use client';

import {
  GithubOutlined,
  InstagramOutlined,
  XOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Card from '~/_components/Card';
import CardHeader from '../../Card/CardHeader';
import styles from './WhatIs.module.css';

const WhatIs = () => {
  return (
    <div className={styles.whatIsWrapper}>
      <Card>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          <CardHeader
            iconPath="/images/Icon_nakaatsu_.webp"
            iconAlt="nakaatsu icon"
            title="Welcome!"
            link="/"
            isShare
          />
          <motion.div
            className={`${styles.imageContainer}`}
            initial={{ x: 400, y: 200, scale: 0 }}
            animate={{ x: 0, y: 0, scale: 1 }}
            transition={{
              type: 'spring',
              duration: 0.48,
              delay: 0.6,
              bounce: 0.3,
            }}
          >
            <Image
              src="/images/nakaatsu_top.webp"
              alt="main Image"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </motion.div>
          <div className={styles.mainContent}>
            <div className={styles.actionContainer}>
              <div className={styles.leftAction}>
                <Link
                  href={'https://x.com/nakaatsu'}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <XOutlined className={`${styles.actionIcon} ${styles.x}`} />
                  </motion.div>
                </Link>
                <Link
                  href={'https://www.instagram.com/nakaatsu_world/'}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <InstagramOutlined
                      className={`${styles.actionIcon} ${styles.instagram}`}
                    />
                  </motion.div>
                </Link>
                <Link
                  href={'https://github.com/nakaatsu118'}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <GithubOutlined
                      className={`${styles.actionIcon} ${styles.github}`}
                    />
                  </motion.div>
                </Link>
              </div>
            </div>
            <div className={styles.titleContainer}>
              <h3 className={styles.title}>このサイトについて</h3>
            </div>
            <div className={styles.bodyContainer}>
              こんにちは。なかあつです。このサイトは
              <Link href="/profile" className={styles.link}>
                @nakaatsu
              </Link>
              の日々をしたためています。
              <br />
              多趣味でごっちゃにななかあつの世界がここにあります。
              <br />
              <br />
              🔥Next.js / React / TypeScript
              <br />
              🐠Aquarium / 🌿Plants / 👨‍🍳Cooking / 📸Gadget
              <br />
            </div>
          </div>
        </motion.div>
      </Card>
    </div>
  );
};

export default WhatIs;
