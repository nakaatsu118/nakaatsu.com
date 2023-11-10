import { MicroCMSListResponse } from "microcms-js-sdk";
import { Blog } from "~/_lib/microcms";
import IconGithub from "@/_components/Icon/GitHub";
import IconTwitter from "@/_components/Icon/Twitter";
import IconZenn from "@/_components/Icon/Zenn";
import IconInstagram from "@/_components/Icon/Instagram";
import IconHeart from "@/_components/Icon/Heart";
import IconRightOpen from "@/_components/Icon/RightOpen";
import styles from './Blogs.module.css';
import TopPageCardHeader from "../TopPageCardHeader";

export default function Blogs({ contents }: MicroCMSListResponse<Blog>) {
  return (
    <div className={styles.CardContainer}>
      <TopPageCardHeader iconPath='/images/notebook.svg' iconAlt='blog' title='Blog' link="/blogs" />
    </div>
  )
}
