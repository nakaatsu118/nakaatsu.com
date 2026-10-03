'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Card from '~/_components/Card';
import CardHeader from '~/_components/Card/CardHeader';
import { formatDate } from '~/_libs/formatDate';
import type { BlogSummary } from '~/_libs/microcms';
import { BLOG_PAGE_SIZE } from '../../_constants';
import Pagination from '../Pagination';
import styles from './Blogs.module.css';

type Props = {
  current?: number;
  contents: BlogSummary[];
};

const Blogs = ({ contents, current = 1 }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(current);
  const categories = Array.from(
    new Map(
      contents.flatMap(({ category }) =>
        category ? [[category.id, category] as const] : [],
      ),
    ).values(),
  );
  const filteredBlogs =
    selectedCategory === null
      ? contents
      : contents.filter((blog) => blog.category?.id === selectedCategory);
  const visibleBlogs = filteredBlogs.slice(
    (page - 1) * BLOG_PAGE_SIZE,
    page * BLOG_PAGE_SIZE,
  );

  const selectCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  return (
    <div className={styles.blogsWrapper}>
      <Card>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <CardHeader
            iconPath="/images/blog.webp"
            iconAlt="blog"
            title="Blog"
            link="/blog"
            isShare
            shareTitle="Blog"
          />
          <div
            className={styles.filters}
            role="group"
            aria-label="カテゴリで絞り込み"
          >
            <button
              type="button"
              className={styles.filterButton}
              aria-pressed={selectedCategory === null}
              onClick={() => selectCategory(null)}
            >
              すべて
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={styles.filterButton}
                aria-pressed={selectedCategory === category.id}
                onClick={() => selectCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          <p className={styles.resultCount} role="status">
            {filteredBlogs.length}件の記事
          </p>
          <ul className={styles.blogsContainer}>
            {visibleBlogs.map((blog, i) => (
              <li key={blog.id} className={styles.blog}>
                <Link href={`/blog/${blog.id}`}>
                  <motion.div
                    initial={{ x: 48, y: 48, scale: 0 }}
                    whileInView={{ x: 0, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 * i,
                      type: 'spring',
                      bounce: 0.3,
                    }}
                    viewport={{ margin: '120px', once: true }}
                  >
                    <motion.div
                      className={styles.blog}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 11,
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className={styles.imageContainer}>
                        {blog.eyecatch && (
                          <Image
                            src={blog.eyecatch.url + '?fit=crop&w=480&h=480'}
                            alt={blog.title}
                            width={480}
                            height={480}
                            loading={i < 3 ? 'eager' : 'lazy'}
                          />
                        )}
                        {blog.category && (
                          <span
                            key={blog.category.id}
                            className={styles.category}
                          >
                            {blog.category.name}
                          </span>
                        )}
                      </div>
                      <div className={styles.text}>
                        <time>
                          {blog.publishedAt ? formatDate(blog.publishedAt) : ''}
                        </time>
                        <h2>{blog.title}</h2>
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              </li>
            ))}
          </ul>
          {filteredBlogs.length === 0 && (
            <p className={styles.emptyMessage}>記事がありません。</p>
          )}
        </motion.div>
        <Pagination
          totalCount={filteredBlogs.length}
          current={page}
          basePath="/blog"
          onPageChange={selectedCategory === null ? undefined : setPage}
        />
      </Card>
    </div>
  );
};

export default Blogs;
