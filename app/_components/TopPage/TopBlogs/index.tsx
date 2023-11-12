import { MicroCMSListResponse } from "microcms-js-sdk";
import { Blog } from "~/_libs/microcms";
import styles from './TopBlogs.module.css';
import CardHeader from "~/_components/Card/CardHeader";
import { formatDate } from "~/_libs/formatDate";
import Card from "~/_components/Card";
import Link from "next/link";

const TopBlogs = ({ contents }: MicroCMSListResponse<Blog>) => {
  return (
    <Card>
      <CardHeader iconPath='/images/notebook.svg' iconAlt='blog' title='Blog' link="/blog" />
      <ul className={styles.blogContainer}>
        {contents.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`} >
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
            </Link>
          </li>
        ))
        }
      </ul>
    </Card>
  )
}

export default TopBlogs
