import Card from '~/_components/Card';
import CardHeader from '~/_components/Card/CardHeader';
import Footer from '~/_components/Footer';
import MotionWrapper from '~/_components/MotionWrapper';
import ProgressBar from '~/_components/ProgressBar';
import { formatDate } from '~/_libs/formatDate';
import { Blog } from '~/_libs/microcms';
import styles from './BlogPage.module.css';
import Script from 'next/script';
import parse, { HTMLReactParserOptions } from 'html-react-parser';

const options: HTMLReactParserOptions = {
  replace: ({ attribs, name }: any) => {
    if (!attribs || Object.keys(attribs).length === 0) return;

    // ハイドレーションエラーが生じるため、悪さをしているscriptタグを削除
    if (name === 'script' && attribs.src === '//cdn.iframe.ly/embed.js') {
      return <></>;
    }
  },
};

export const BlogIdComponent = async ({
  content,
  title,
  publishedAt,
  category,
  eyecatch,
}: Blog) => {
  return (
    <>
      <MotionWrapper>
        <ProgressBar />
        <Card>
          <CardHeader
            iconPath="/images/notebook.svg"
            iconAlt="blog"
            title={title}
            link={''}
            isShare
            shareTitle={title}
          />
          <div className={styles.blogPageContainer}>
            <div className={styles.infoContainer}>
              <time>{publishedAt ? formatDate(publishedAt) : ''}</time>
              <div className={styles.category}>{category?.name}</div>
            </div>
            <div className={styles.imageContainer}>
              <img src={eyecatch?.url + '?w=960'} />
            </div>
            <div className={styles.content}>{parse(content, options)}</div>
          </div>
        </Card>
        <Footer />
      </MotionWrapper>
    </>
  );
};
