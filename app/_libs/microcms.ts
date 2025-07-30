import type {
  MicroCMSDate,
  MicroCMSImage,
  MicroCMSQueries,
} from 'microcms-js-sdk';
import { createClient } from 'microcms-js-sdk';

export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
  category?: Category;
} & MicroCMSDate;

export type Category = {
  id: string;
  name: string;
} & MicroCMSDate;

export type Work = {
  id: string;
  title: string;
  link: string;
  visual: MicroCMSImage;
  description: string;
  skill: string;
  published: string;
} & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('Please set MICROCMS_SERVICE_DOMAIN');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('Please set MICROCMS_API_KEY');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getBlogList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Blog>({ endpoint: 'blogs', queries });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return listData;
};

export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  const detailData = await client.getListDetail<Blog>({
    endpoint: 'blogs',
    contentId,
    queries,
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return detailData;
};

export const getWorksList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Work>({ endpoint: 'works', queries });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return listData;
};
