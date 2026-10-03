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

記事の口調と組み立ては `.cursor/rules` と `.cursor/skills/draft-blog-post` に定義してある。本文の取得はこれまでどおり `app/_libs/microcms.ts`（`blogs` の GET）。下書きの作成は **公式リモート MCP**（`https://mcp.microcms.io/mcp/nakaatsu`）だけにする。手順は [microCMS MCP](https://document.microcms.io/mcp-server/microcms-mcp) に従う。

1. microCMS で **AI 専用の API キー**を作る（サイト用 GET キーとは分ける）。GET・下書き POST、メディアと API 情報なら Management API も付ける。公開作成・ステータス変更・DELETE は付けない
2. 環境変数 `MICROCMS_MCP_API_KEY` にそのキーを入れる。`.cursor/mcp.json.example` を `.cursor/mcp.json` にコピーする（サービスID `nakaatsu` は URL に入済み）。キーをファイルに直書きしてもよいが、`.cursor/mcp.json` は gitignore 済み
3. Cursor Settings → Tools & MCP で `microcms` を有効化する。公開系ツールはオフにする
4. Agent チャットで `/draft-blog-post` を呼び、テーマと所感を渡す。公開はしない（下書きのみ）

API の IP 制限を付けていると、リモート MCP の送信元が固定でないため繋がらないことがある。

このサイトは静的エクスポートなので、下書きは管理画面にだけ残る。表に出すには microCMS で公開したあとビルドする。

## Cloud Agent からブログ下書き

ローカルの `.cursor/mcp.json` は gitignore 済みなので、Cloud Agent の VM には載らない。同じリモート MCP を Cloud 側へ別途登録する。stdio / ローカル `npx` は使わない。

1. [cursor.com/agents](https://cursor.com/agents) の MCP ドロップダウン（Team なら [Dashboard → Integrations & MCP](https://cursor.com/dashboard/integrations)）から **HTTP（Streamable HTTP）** で追加する
   - URL: `https://mcp.microcms.io/mcp/nakaatsu`
   - ヘッダー: `Authorization: Bearer <AI専用APIキー>`
2. キー権限はローカルと同じ（GET・下書き POST、メディア、API 情報。公開作成・ステータス変更・DELETE は付けない）。Cloud 側でも公開・削除ツールはオフにする
3. egress を Allowlist にしている場合は `mcp.microcms.io` と `images.microcms-assets.io` を許可する
4. 設定後は **新しい Agent を起動**する（既存 run には MCP が増えない）
5. 最初の run で `microcms_get_api_list` の疎通を確認する

スキル `draft-blog-post` は `disable-model-invocation` のため自動では選ばれない。プロンプトで明示する。Cloud の VM にローカル写真は無いので、画像はチャット添付・公開 URL、または画像なし本文のみにする。

依頼例:

```text
/draft-blog-post に従って microCMS に下書きだけ作る。
公開しない。コード変更・ブランチ・PR は不要。
テーマ: （製品名）
種類: 開封レビュー
所感: …
```
