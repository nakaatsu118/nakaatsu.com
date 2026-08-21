# nakaatsu`s World

nakaatsu の個人サイト＆ポートフォリオサイトです。

## 使ったもの

- Next.js
- App Router
- Framer Motion
- microCMS

## 使いかた

```sh
# setup
yarn install

# run local
yarn dev

# build static page
# /out
yarn build
```

## ブログ下書き（Cursor）

記事の口調と組み立ては `.cursor/rules` と `.cursor/skills/draft-blog-post` に定義してある。本文の取得はこれまでどおり `app/_libs/microcms.ts`（`blogs` の GET）。下書きの作成は **公式 [microCMS MCP](https://document.microcms.io/mcp-server/microcms-mcp-server)** 経由だけにする。

1. microCMS で **AI 専用の API キー**を作る（サイト用 GET キーとは分ける）。Content API の POST と、メディアアップロード・API 情報なら Management API も付ける
2. `.cursor/mcp.json.example` を `.cursor/mcp.json` にコピーし、`MICROCMS_SERVICE_ID`（サービスドメインと同じ値）と書き込みキーを入れる。`.cursor/mcp.json` は gitignore 済み
3. Cursor Settings → Tools & MCP で `microcms` を有効化する
4. Agent チャットで `/draft-blog-post` を呼び、テーマと所感を渡す。公開はしない（下書きのみ）

このサイトは静的エクスポートなので、下書きは管理画面にだけ残る。表に出すには microCMS で公開したあとビルドする。
