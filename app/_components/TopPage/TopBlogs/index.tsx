'use client'

import { MicroCMSListResponse } from "microcms-js-sdk";
import { Blog } from "~/_libs/microcms";
import styles from './TopBlogs.module.css';
import CardHeader from "~/_components/Card/CardHeader";
import { formatDate } from "~/_libs/formatDate";
import Card from "~/_components/Card";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const TopBlogs = ({ contents }: MicroCMSListResponse<Blog>) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div className={styles.topBlogsWrapper}>
      <Card>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.4 }}>
          <CardHeader iconPath='/images/notebook.svg' iconAlt='blog' title='Blog' link="/blog" />
          <ul className={styles.blogContainer} ref={ref}>
            {inView && contents.map((blog, i) => (
              <li key={blog.id} className={styles.blog}>
                <Link href={`/blog/${blog.id}`} >
                  <motion.div initial={{ opacity: 0, x: 400 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: i * 0.2 }}>
                    <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} transition={{ type: "spring", stiffness: 400, damping: 11 }} whileTap={{ scale: 0.9 }}>
                      <div className={styles.imageContainer}>
                        <img src={blog.eyecatch?.url + '?fit=crop&w=480&h=480'} />
                        {blog.category &&
                          <div key={blog.category.id} className={styles.category}>{blog.category.name}</div>
                        }
                      </div>
                      <div className={styles.text}>
                        <time>{blog.publishedAt ? formatDate(blog.publishedAt) : ''}</time>
                        <h2>{blog.title}</h2>
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              </li>
            ))
            }
          </ul>
        </motion.div>
      </Card>
    </div>
  )
}

export default TopBlogs
