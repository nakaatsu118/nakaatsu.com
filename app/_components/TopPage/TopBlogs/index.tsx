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
    <Card>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.4 }}>
        <CardHeader iconPath='/images/notebook.svg' iconAlt='blog' title='Blog' link="/blog" />
        <ul className={styles.blogContainer} ref={ref}>
          {inView && contents.map((blog, i) => (
            <li key={blog.id} className={styles.blog}>
              <Link href={`/blog/${blog.id}`} >
                <motion.div initial={{ opacity: 0, x: 400 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: i * 0.2 }}>
                  <div className={styles.imageContainer}>
                    <img src={blog.eyecatch?.url + '?fit=crop&w=480&h=480'} />
                  </div>
                  <div className={styles.text}>
                    <time>{blog.publishedAt ? formatDate(blog.publishedAt) : ''}</time>
                    <h3>{blog.title}</h3>
                    {blog.category &&
                      <span key={blog.category.id} className={styles.category}>#{blog.category.name}</span>
                    }
                  </div>
                </motion.div>
              </Link>
            </li>
          ))
          }
        </ul>
      </motion.div>
    </Card>
  )
}

export default TopBlogs
