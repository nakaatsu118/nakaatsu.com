'use client'

import CardHeader from '~/_components/Card/CardHeader';
import styles from './Biography.module.css';
import Card from '~/_components/Card';
import { motion } from 'framer-motion';

const Biography = () => {
  return (
    <div className={styles.biographyWrapper}>
      <Card>
        <motion.div>
          <CardHeader iconPath='/images/biography.png' iconAlt='biography' title='Biography' />
          <div className={styles.biographyContainer}>
            <motion.div className={styles.historyContainer} initial={{ x: '100%', opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.1, type: 'tween' }} viewport={{ margin: '80px' }}>
              <div className={styles.history}>
                <p className={styles.date}>2016/4</p>
                <p className={styles.description}>SIer企業に入社。インターネット決済システムの設計、試験を担当。</p>
              </div>
            </motion.div>
            <motion.div className={styles.historyContainer} initial={{ x: '-100%', opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.1, type: 'tween' }} viewport={{ margin: '80px' }}>
              <div className={styles.history}>
                <p className={styles.date}>2018/9</p>
                <p className={styles.description}>いちから株式会社（現ANYCOLOR株式会社）に入社。WEBフロント開発、サーバーサイド、社内システム、LP制作・監修、PMなどを担当。</p>
              </div>
            </motion.div>
            <motion.div className={styles.historyContainer} initial={{ x: '100%', opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.2, delay: 0.1, type: 'tween' }} viewport={{ margin: '80px' }}>
              <div className={styles.history}>
                <p className={styles.date}>2022/2</p>
                <p className={styles.description}>freee株式会社に入社。申告システムの機能追加や改修をフルスタックで担当。</p>
              </div>
            </motion.div>
            <motion.div className={styles.historyContainer} initial={{ x: '-100%', opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.1, delay: 0.1, type: 'tween' }} viewport={{ margin: '80px' }}>
              <div className={styles.history}>
                <p className={styles.date}>2022/11</p>
                <p className={styles.description}>株式会社microCMSに入社。</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Card>
    </div>
  )
}

export default Biography
