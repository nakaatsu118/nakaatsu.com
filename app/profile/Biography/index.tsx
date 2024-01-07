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
          </div>
        </motion.div>
      </Card>
    </div>
  )
}

export default Biography
