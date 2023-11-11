import React from "react"
import "@/_styles/normalize.css"
import "@/_styles/globals.css"
import styles from '@/Root.module.css'
import Navigation from "@/_components/Navigation"
import { Metadata } from "next"

const siteTitle = 'nakaatsu World'

export const metadata: Metadata = {
  title: siteTitle,
  description: 'nakaatsuのポートフォリオサイトです。自身の経歴やスキルセット等をまとめています。',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <div className={styles.rootContainer}>
          <Navigation />
          <main className={styles.main}>{children}</main>
        </div>
      </body>
    </html>
  )
};

export default RootLayout;
