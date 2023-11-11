import { MicroCMSListResponse } from "microcms-js-sdk";
import { Blog } from "~/_lib/microcms";
import styles from './Blogs.module.css';
import TopPageCardHeader from "../TopPageCardHeader";
import { formatDate } from "~/_lib/formatDate";

const Blogs = ({ contents }: MicroCMSListResponse<Blog>) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <TopPageCardHeader iconPath='/images/notebook.svg' iconAlt='blog' title='Blog' link="/blogs" />
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

export default Blogs
