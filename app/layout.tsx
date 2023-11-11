import React from "react"
import "@/_styles/normalize.css"
import "@/_styles/globals.css"
import styles from '@/Root.module.css'
import Navigation from "@/_components/Navigation"

export const siteTitle = 'nakaatsu World'

export const metadata = {
  title: siteTitle,
  description: 'nakaatsuのポートフォリオサイトです。自身の経歴やスキルセット等をまとめています。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
}
