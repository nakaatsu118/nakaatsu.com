'use client'

import { MicroCMSListResponse } from "microcms-js-sdk";
import Card from "~/_components/Card";
import CardHeader from "~/_components/Card/CardHeader";
import { Blog } from "~/_libs/microcms";
import styles from './Blogs.module.css';
import { formatDate } from "~/_libs/formatDate";
import Pagination from "../Pagination";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  current?: number;
} & MicroCMSListResponse<Blog>

const Blogs = ({ contents, totalCount, current }: Props) => {
  return (
    <Card>
      <CardHeader iconPath='/images/notebook.svg' iconAlt='blog' title='Blog' link="/blog" isShare shareTitle="Blog" />
      <div className={styles.blogsContainer}>
        {contents.map((blog, i) => (
          <Link href={`/blog/${blog.id}`} key={blog.id}>
            <motion.div className={styles.blog} key={blog.id} initial={{ opacity: 0, y: 400 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: i * 0.1 }}>
              <div className={styles.imageContainer}>
                <img src={blog.eyecatch?.url + '?fit=crop&w=960&h=540'} />
              </div>
              <div className={styles.text}>
                <time>{blog.publishedAt ? formatDate(blog.publishedAt) : ''}</time>
                <h2>{blog.title}</h2>
                {blog.category &&
                  <span key={blog.category.id} className={styles.category}>#{blog.category.name}</span>
                }
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      <Pagination totalCount={totalCount} current={current} basePath="/blog" />
    </Card>
  )
}

export default Blogs
