import LeftNav from "../LeftNav";

import styles from './TopPage.module.css';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IconGithub from "../../app/_components/Icon/GitHub";
import IconTwitter from "../../app/_components/Icon/Twitter";
import IconZenn from "../../app/_components/Icon/Zenn";
import IconInstagram from "../../app/_components/Icon/Instagram";
import IconHeart from "../../app/_components/Icon/Heart";
import IconRightOpen from "../../app/_components/Icon/RightOpen";
import React from "react";
import { BlogType } from "~/types/blog";

export type Props = {
  latestBlog: BlogType;
}

export type ViewProps = {
  latestBlog: BlogType;
}

export const TopPageView = ({ latestBlog }: ViewProps) => {
  return (
    <div className={styles.TopPageContainer}>
      <LeftNav />
      <div className={styles.RightContainer}>
        <div className={styles.CardContainer}>
          <div className={styles.HeadContents}>
            <div className={styles.headContainer}>
              <img className={styles.headIcon} src={'/images/Icon_nakaatsu_.png'} alt="user icon" />
              <div>nakaatsu</div>
              <div className={styles.rightHead}>
                {/* <div>…</div> */}
                <ShareIcon className={styles.shareIcon} />
              </div>
            </div>
          </div>
          <img className={styles.mainImage} src={'/images/nakaatsu_top.png'} alt="main Image" />
          <div className={styles.actionContents}>
            <div className={styles.actionContainer}>
              <div className={styles.leftAction}>
                {/* <FavoriteBorderIcon className={styles.actionIcon} />
                <ChatBubbleOutlineIcon className={styles.actionIcon} />
                <MailOutlineIcon className={styles.actionIcon} /> */}
                <IconTwitter className={styles.actionIcon} />
                <IconInstagram className={styles.actionIcon} />
                <IconGithub className={styles.actionIcon} />
                <IconZenn className={styles.actionIcon} />
              </div>
              <div className={styles.rightAction}>
                {/* <BookmarkBorderIcon className={styles.actionIcon} /> */}
                <IconHeart className={styles.actionIcon} />
              </div>
            </div>
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.title}>nakaatsu</div>
            <div className={styles.subTitle}>このサイトについて</div>
          </div>
          <div className={styles.bodyContainer}>
            こんにちは。なかあつです。
            熱帯魚を飼ったりオタクだったりエンジニアだったりします。
            <br />
            🔥Next.js / React / TypeScript
            <br />
            <br />
            このサイトは <a className='link' href='https://twitter.com/nakaatsu' target='_blank' rel='noopener noreferrer'>nakaatsu</a> のポートフォリオサイトです。
          </div>
        </div>
        <div className={styles.CardContainer}>
          <div className={styles.HeadContents}>
            <div className={styles.headContainer}>
              <img className={styles.headIcon} src={'/images/notebook.svg'} alt="user icon" />
              <div>#Blog</div>
              <div className={styles.rightHead}>
                <IconRightOpen className={styles.shareIcon} />
              </div>
            </div>
          </div>
          <img className={styles.mainImage} src={'/images/nakaatsu_top.png'} alt="main Image" />
          <div className={styles.actionContents}>
            <div className={styles.actionContainer}>
              <div className={styles.leftAction}>
                <IconTwitter className={styles.actionIcon} />
                <IconInstagram className={styles.actionIcon} />
                <IconGithub className={styles.actionIcon} />
                <IconZenn className={styles.actionIcon} />
              </div>
              <div className={styles.rightAction}>
                {/* <BookmarkBorderIcon className={styles.actionIcon} /> */}
                <IconHeart className={styles.actionIcon} />
              </div>
            </div>
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.title}>nakaatsu</div>
            <div className={styles.subTitle}>このサイトについて</div>
          </div>
          <div className={styles.bodyContainer}>
            こんにちは。なかあつです。
            熱帯魚を飼ったりオタクだったりエンジニアだったりします。
            <br />
            🔥Next.js / React / TypeScript
            <br />
            <br />
            このサイトは <a className='link' href='https://twitter.com/nakaatsu' target='_blank' rel='noopener noreferrer'>nakaatsu</a> のポートフォリオサイトです。<br />
            自身の経歴やスキルセット等をまとめています。
          </div>
        </div>
      </div>
    </div>
  );
}

export const TopPage = ({ latestBlog }: Props) => {
  return (
    <TopPageView {...latestBlog} />
  );
}
