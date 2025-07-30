'use client';

import parse, { HTMLReactParserOptions } from 'html-react-parser';
import { useEffect, useState } from 'react';
import Card from '~/_components/Card';
import CardHeader from '~/_components/Card/CardHeader';
import Footer from '~/_components/Footer';
import MotionWrapper from '~/_components/MotionWrapper';
import ProgressBar from '~/_components/ProgressBar';
import { formatDate } from '~/_libs/formatDate';
import { Blog } from '~/_libs/microcms';
import styles from './BlogPage.module.css';

const createOptions = (isClient: boolean): HTMLReactParserOptions => ({
  replace: (domNode) => {
    if (domNode.type !== 'tag') return;
    const { attribs, name } = domNode as {
      attribs?: Record<string, string>;
      name: string;
    };
    if (!attribs || Object.keys(attribs).length === 0) return;

    // サーバーサイドでは iframely 関連の要素を削除
    if (!isClient) {
      if (name === 'script' && attribs.src === '//cdn.iframe.ly/embed.js') {
        return <></>;
      }
      if (name === 'div' && attribs.className?.includes('iframely')) {
        return <></>;
      }
      if (name === 'a' && attribs['data-iframely-url']) {
        return <></>;
      }
    }

    // imgにlazyloadを追加
    if (name === 'img') {
      return <img {...attribs} loading="lazy" />;
    }
  },
});

export const BlogIdComponent = ({
  content,
  title,
  publishedAt,
  category,
  eyecatch,
}: Blog) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // scriptを読み込み
    const script = document.createElement('script');
    script.src = '//cdn.iframe.ly/embed.js';
    document.body.appendChild(script);
    // アンマウント時に一応scriptタグを消しておく
    return () => {
      const existingScript = document.querySelector(
        'script[src="//cdn.iframe.ly/embed.js"]',
      );
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  const options = createOptions(isClient);

  return (
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
            <img src={eyecatch?.url + '?w=1200'} />
          </div>
          <div className={styles.content}>{parse(content, options)}</div>
        </div>
      </Card>
      <Footer />
    </MotionWrapper>
  );
};
