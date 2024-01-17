import React from "react"
import "@/_styles/normalize.css"
import "@/_styles/globals.css"
import styles from '@/Root.module.css'
import Navigation from "@/_components/Navigation"
import { Metadata } from "next"
import { GoogleTagManager } from '@next/third-parties/google'

const siteName = 'nakaatsu World'
const description = 'nakaatsuの個人サイトです。趣味のブログやポートフォリオをまとめています。'
const url = 'https://nakaatsu.com'

export const metadata: Metadata = {
  title: siteName,
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: siteName,
    description,
    site: '@nakaatsu',
    creator: '@nakaatsu',
  }
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
      <GoogleTagManager gtmId="GTM-PR49LG4" />
    </html>
  )
};

export default RootLayout;
