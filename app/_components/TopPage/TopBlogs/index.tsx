import { MicroCMSListResponse } from "microcms-js-sdk";
import { Blog } from "~/_libs/microcms";
import styles from './TopBlogs.module.css';
import CardHeader from "~/_components/Card/CardHeader";
import { formatDate } from "~/_libs/formatDate";

const TopBlogs = ({ contents }: MicroCMSListResponse<Blog>) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <CardHeader iconPath='/images/notebook.svg' iconAlt='blog' title='Blog' link="/blogs" />
      </div>
      <ul className={styles.blogContainer}>
        {contents.length && contents.map((blog) => (
          <li key={blog.id}>
            <a>
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
            </a>
          </li>))
        }
      </ul>
    </div>
  )
}

export default TopBlogs
