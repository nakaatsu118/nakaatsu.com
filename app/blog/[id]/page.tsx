import Card from "~/_components/Card";
import CardHeader from "~/_components/Card/CardHeader";
import MotionWrapper from "~/_components/MotionWrapper"
import { getBlogDetail } from "~/_libs/microcms";
import styles from './BlogPage.module.css';
import { formatDate } from "~/_libs/formatDate";
import Footer from "~/_components/Footer";

type Props = {
  params: {
    id: string;
  }
}

const BlogPage = async ({ params }: Props) => {
  const data = await getBlogDetail(params.id)

  return (
    <MotionWrapper>
      <Card>
        <CardHeader iconPath='/images/notebook.svg' iconAlt='blog' title={data.title} link={''} isShare shareTitle={data.title} />
        <div className={styles.blogPageContainer}>
          <div className={styles.infoContainer}>
            <time>{data.publishedAt ? formatDate(data.publishedAt) : ''}</time>
            <div>#{data.category?.name}</div>
          </div>
          <div className={styles.imageContainer}>
            <img src={data.eyecatch?.url + '?fit=crop&w=960&h=540'} />
          </div>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: `${data.content}` }} />
        </div>
      </Card>
      <Footer />
    </MotionWrapper>
  )
}

export default BlogPage
