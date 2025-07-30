'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Card from '~/_components/Card';
import CardHeader from '~/_components/Card/CardHeader';
import styles from './WhoIs.module.css';

const WhoIs = () => {
  return (
    <div className={styles.whoIsWrapper}>
      <Card>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <CardHeader
            iconPath="/images/whoIs.png"
            iconAlt="profile"
            title="Profile"
            link="/profile"
            isShare
            shareTitle="Profile"
          />
          <div className={styles.profileContainer}>
            <motion.div
              className={styles.imageContainer}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.3,
                duration: 0.4,
              }}
            >
              <Image
                src="/images/Icon_nakaatsu_.png"
                alt="nakaatsu"
                width={480}
                height={480}
                priority
              />
            </motion.div>
            <div className={styles.description}>
              <h1>なかあつ / nakaatsu</h1>
              <p>1993年生まれ。東京都在住。</p>
              <p>Webフロントエンドエンジニア寄りのフルスタックエンジニア。</p>
              <p>📧 nakaatsu0118@gmail.com</p>
              <h2>スキル</h2>
              <ul>
                <li>React / Next.js / TypeScript / JavaScript / HTML / CSS</li>
                <li>Ruby / Ruby on Rails / Node.js / Golang / PHP</li>
                <li>
                  Firebase / AWS / GCP / microCMS / Salesforce / GTM / GA / GSC
                  / Google App Script
                </li>
                <li>Figma / Adobe XD</li>
              </ul>
              <h2>趣味</h2>
              <p>
                趣味はアクアリウム、アクアテラリウム、植物、料理、お菓子作り、ゲーム、ポケモンカード、ガジェット、インテリア、プログラミング、散歩などなど…
              </p>
            </div>
          </div>
        </motion.div>
      </Card>
    </div>
  );
};

export default WhoIs;
