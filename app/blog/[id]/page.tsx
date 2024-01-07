import Card from "~/_components/Card";
import CardHeader from "~/_components/Card/CardHeader";
import MotionWrapper from "~/_components/MotionWrapper"
import { getBlogDetail } from "~/_libs/microcms";
import styles from './BlogPage.module.css';
import { formatDate } from "~/_libs/formatDate";
import Footer from "~/_components/Footer";
import ProgressBar from "~/_components/ProgressBar";

type Props = {
  params: {
    id: string;
  }
}

const BlogPage = async ({ params }: Props) => {
  const res = await getBlogDetail(params.id)

  return (
    <MotionWrapper>
      <ProgressBar />
      <Card>
        <CardHeader iconPath='/images/notebook.svg' iconAlt='blog' title={res.title} link={''} isShare shareTitle={res.title} />
        <div className={styles.blogPageContainer}>
          <div className={styles.infoContainer}>
            <time>{res.publishedAt ? formatDate(res.publishedAt) : ''}</time>
            <div className={styles.category}>{res.category?.name}</div>
          </div>
          <div className={styles.imageContainer}>
            <img src={res.eyecatch?.url + '?w=960'} />
          </div>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: `${res.content}` }} />
        </div>
      </Card>
      <Footer />
    </MotionWrapper>
  )
}

export default BlogPage
