import LeftNav from "../LeftNav";
import styles from './TopPage.module.css';
import React from "react";
import { Blog } from "@/_lib/microcms";
import WhatIs from "./_components/WhatIs";
import Footer from "../Footer";
import Header from "../Header";
import { MicroCMSListResponse } from "microcms-js-sdk";
import Blogs from "./_components/Blogs";

export default async function TopPage({ contents }: MicroCMSListResponse<Blog>) {
  return (
    <div className={styles.TopPageContainer}>
      <LeftNav />
      <div className={styles.RightContainer}>
        <Header />
        <WhatIs />
        <Blogs contents={contents} />
        <Footer />
      </div>
    </div>
  )
}
