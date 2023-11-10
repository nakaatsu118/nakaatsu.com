import LeftNav from "../LeftNav";

import styles from './TopPage.module.css';
import IconGithub from "../Icon/GitHub";
import IconTwitter from "../Icon/Twitter";
import IconZenn from "../Icon/Zenn";
import IconInstagram from "../Icon/Instagram";
import IconHeart from "../Icon/Heart";
import IconRightOpen from "../Icon/RightOpen";
import React from "react";
import { Blog } from "@/_lib/microcms";
import WhatIs from "./WhatIs";
import Footer from "../Footer";
import Header from "../Header";

interface TopPageProps {
  blog: Blog
}

export default async function TopPage({ blog }: TopPageProps) {
  return (
    <div className={styles.TopPageContainer}>
      <LeftNav />
      <div className={styles.RightContainer}>
        <Header />
        <WhatIs />
        <div className={styles.CardContainer}>
          <div className={styles.HeadContents}>
            <div className={styles.headContainer}>
              <img className={styles.headIcon} src={'/images/notebook.svg'} alt="user icon" />
              <div>#Blog</div>
              <div className={styles.rightHead}>
                MORE
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
                <IconHeart className={styles.actionIcon} />
              </div>
            </div>
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.title}>nakaatsu</div>
            <div className={styles.subTitle}>{blog.title}</div>
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
        <Footer />
      </div>
    </div>
  )
}
