'use client';

import { motion } from 'framer-motion';
import { MicroCMSListResponse } from 'microcms-js-sdk';
import Link from 'next/link';
import Card from '~/_components/Card';
import CardHeader from '~/_components/Card/CardHeader';
import { formatDate } from '~/_libs/formatDate';
import { Work } from '~/_libs/microcms';
import styles from './Works.module.css';

const Works = ({ contents }: MicroCMSListResponse<Work>) => {
  return (
    <div className={styles.worksWrapper}>
      <Card>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <CardHeader
            iconPath="/images/works.png"
            iconAlt="works"
            title="Works"
          />
          <ul className={styles.worksContainer}>
            {contents.map((work, i) => (
              <li key={work.id} className={styles.workContainer}>
                <motion.div
                  initial={{ x: 48, y: 48, scale: 0 }}
                  whileInView={{ x: 0, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 * i,
                    type: 'spring',
                    bounce: 0.3,
                  }}
                  viewport={{ margin: '120px' }}
                >
                  <motion.div
                    className={styles.work}
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    transition={{ type: 'spring', stiffness: 400, damping: 11 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className={styles.imageContainer}>
                      <img src={work.visual?.url + '?fit=crop&w=1280&h=1080'} />
                    </div>
                    <div className={styles.description}>
                      <h2>{work.title}</h2>
                      <Link
                        href={work.link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {work.link}
                      </Link>
                      <p>{work.description}</p>
                      <p className={styles.skill}>{work.skill}</p>
                      <div className={styles.time}>
                        <time>
                          {work.published ? formatDate(work.published) : ''}
                        </time>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </li>
            ))}
          </ul>
        </motion.div>
      </Card>
    </div>
  );
};

export default Works;
