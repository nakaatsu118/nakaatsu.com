'use client';

import Card from '~/_components/Card';
import CardHeader from '~/_components/Card/CardHeader';
import Footer from '~/_components/Footer';
import MotionWrapper from '~/_components/MotionWrapper';
import ProgressBar from '~/_components/ProgressBar';
import { formatDate } from '~/_libs/formatDate';
import { BlogIdProps } from './page';
import { Category, getBlogDetail } from '~/_libs/microcms';
import styles from './BlogPage.module.css';
import { useEffect, useState } from 'react';
import {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSImage,
} from 'microcms-js-sdk';
import Loading from '~/_components/Loading';
import Script from 'next/script';

const fetchBlogDetail = async (blogId: string) => {
  const res = await getBlogDetail(blogId);
  return res;
};

export const BlogIdComponent = async ({ params }: BlogIdProps) => {
  const { blogId } = params;
  const [blogData, setBlogData] = useState<
    | ({
        id: string;
        title: string;
        content: string;
        eyecatch?: MicroCMSImage | undefined;
        category?: Category | undefined;
      } & MicroCMSDate &
        MicroCMSContentId)
    | null
  >(null);

  useEffect(() => {
    fetchBlogDetail(blogId).then((res) => {
      setBlogData(res);
    });
    const script = document.createElement('script');
    script.src = '//cdn.iframe.ly/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!blogData) {
    return <Loading />;
  }

  return (
    <>
      <Script src="//cdn.iframe.ly/embed.js" strategy="lazyOnload" />
      <MotionWrapper>
        <ProgressBar />
        <Card>
          <CardHeader
            iconPath="/images/notebook.svg"
            iconAlt="blog"
            title={blogData.title}
            link={''}
            isShare
            shareTitle={blogData.title}
          />
          <div className={styles.blogPageContainer}>
            <div className={styles.infoContainer}>
              <time>
                {blogData.publishedAt ? formatDate(blogData.publishedAt) : ''}
              </time>
              <div className={styles.category}>{blogData.category?.name}</div>
            </div>
            <div className={styles.imageContainer}>
              <img src={blogData.eyecatch?.url + '?w=960'} />
            </div>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: `${blogData.content}` }}
            />
          </div>
        </Card>
        <Footer />
      </MotionWrapper>
    </>
  );
};
