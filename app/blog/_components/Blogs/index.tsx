import { MicroCMSListResponse } from "microcms-js-sdk";
import Card from "~/_components/Card";
import CardHeader from "~/_components/Card/CardHeader";
import { Blog } from "~/_libs/microcms";
import styles from './Blogs.module.css';
import { formatDate } from "~/_libs/formatDate";
import Pagination from "../Pagination";

type Props = {
  current?: number;
} & MicroCMSListResponse<Blog>

const Blogs = ({ contents, totalCount, current }: Props) => {
  return (
    <Card>
      <CardHeader iconPath='/images/notebook.svg' iconAlt='blog' title='Blog' />
      <div className={styles.blogsContainer}>
        {contents.map((blog) => (
          <div className={styles.blog} key={blog.id}>
            <img src={blog.eyecatch?.url + '?fit=crop&w=960&h=540'} />
            <div className={styles.text}>
              <h2>{blog.title}</h2>
              <time>{blog.publishedAt ? formatDate(blog.publishedAt) : ''}</time>
              {blog.category &&
                <span key={blog.category.id} className={styles.category}>{blog.category.name}</span>
              }
            </div>
          </div>
        ))}
      </div>
      <Pagination totalCount={totalCount} current={current} basePath="/blog" />
    </Card>
  )
}

export default Blogs
