import React from "react"
import "./normalize.css"
import "./globals.css"

export const siteTitle = 'nakaatsu World'

export const metadata = {
  title: siteTitle,
  description: 'nakaatsuのポートフォリオサイトです。自身の経歴やスキルセット等をまとめています。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
