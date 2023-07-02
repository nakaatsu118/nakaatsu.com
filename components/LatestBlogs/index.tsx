import { BlogType } from "~/types/blog"
import styles from './LatestBlogs.module.css'

export interface LatestBlogProps {
  blogs: BlogType[]
}

const LatestBlog = ({blogs}: LatestBlogProps) => {
  return (
    <div className={styles.latestBlogWrapper}>
      <div className={styles.latestBlogContainer}>
        {blogs ? (
          blogs.map((blog) => (
            <div className={styles.latestBlog} key={blog.id}>
              <div className={styles.latestBlogCategory}>{blog.category.name}</div>
              <div className={styles.eyecatch}>
                <img src={blog.eyecatch.url} alt={blog.title} />
              </div>
              <h3>{blog.title}</h3>
            </div>
          ))
        ) : (
          <>no blog</>
        )}
      </div>
      <div className={styles.scrollDownContainer}>
        <div className={styles.scrollDown} />
        <p>Scroll</p>
      </div>
    </div>
  )
}

export default LatestBlog
