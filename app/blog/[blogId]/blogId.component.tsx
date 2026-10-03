'use client';

import type { HTMLReactParserOptions } from 'html-react-parser';
import parse, { attributesToProps, Element } from 'html-react-parser';
import Image from 'next/image';
import Script from 'next/script';
import { useEffect, useSyncExternalStore } from 'react';
import Card from '~/_components/Card';
import CardHeader from '~/_components/Card/CardHeader';
import Footer from '~/_components/Footer';
import MotionWrapper from '~/_components/MotionWrapper';
import ProgressBar from '~/_components/ProgressBar';
import { formatDate } from '~/_libs/formatDate';
import type { Blog } from '~/_libs/microcms';
import styles from './BlogPage.module.css';

const createOptions = (isClient: boolean): HTMLReactParserOptions => ({
  replace: (domNode) => {
    if (!(domNode instanceof Element)) return;
    const { attribs, name } = domNode;
    // embed.jsはNext Scriptで一度だけ読み込む。
    if (name === 'script' && attribs.src?.includes('cdn.iframe.ly/embed.js')) {
      return <></>;
    }
    if (!attribs || Object.keys(attribs).length === 0) return;

    // サーバーサイドでは iframely 関連の要素を削除
    if (!isClient) {
      if (name === 'div' && attribs.class?.includes('iframely')) {
        return <></>;
      }
      if (name === 'a' && attribs['data-iframely-url']) {
        return <></>;
      }
    }

    // imgにlazyloadを追加
    if (name === 'img') {
      // CMS本文には画像サイズがないため、ネイティブのimgを使う。
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...attributesToProps(attribs)}
          alt={attribs.alt ?? ''}
          loading="lazy"
        />
      );
    }
  },
});

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const loadEmbeds = () => {
  const iframely = (window as Window & { iframely?: { load: () => void } })
    .iframely;
  iframely?.load();
};

export const BlogIdComponent = ({
  content,
  title,
  publishedAt,
  category,
  eyecatch,
}: Blog) => {
  const isClient = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (isClient) loadEmbeds();
  }, [isClient, content]);

  const options = createOptions(isClient);

  return (
    <MotionWrapper>
      <Script
        src="https://cdn.iframe.ly/embed.js"
        strategy="lazyOnload"
        onReady={loadEmbeds}
      />
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
            {eyecatch && (
              <Image
                src={eyecatch.url + '?w=1200'}
                alt={title}
                width={eyecatch.width ?? 1200}
                height={eyecatch.height ?? 630}
                loading="eager"
              />
            )}
          </div>
          <div className={styles.content}>{parse(content, options)}</div>
        </div>
      </Card>
      <Footer />
    </MotionWrapper>
  );
};
