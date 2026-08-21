---
name: draft-blog-post
description: nakaatsu Worldのブログ下書きをmicroCMSに作る。レビュー・開封・ベストバイの新規執筆や既存下書き更新で使う。公開はしない。
disable-model-invocation: true
---

# ブログ下書き（microCMS）

このスキルは **下書き作成まで** 行う。公開しない。

- 使ってよい: `microcms_create_content_draft` / `microcms_update_content_draft` / 取得・メディア系
- 使ってはいけない: `microcms_create_content_published` / `microcms_create_contents_bulk_published` / `microcms_update_content_published` / `microcms_patch_content_status`

MCP が無い・キーが書き込み不可なら、そこで止めて設定方法（リポジトリの `.cursor/mcp.json.example`）を案内する。推測で公開相当の投稿はしない。

口調はプロジェクトルールと `references/voice.md` に従う。

## When to Use

- `/draft-blog-post` で明示起動されたとき
- 新規記事の下書き、既存下書きの更新

## 入力

利用者がチャットで渡す。欠けていてもテーマがあれば進めてよいが、**POST の前に確認**する。

| 項目 | 必須 | 備考 |
| --- | --- | --- |
| テーマ / 対象 | 必須 | 製品名・何の記事か |
| 記事の種類 | 推奨 | 開封レビュー / 比較レビュー / ベストバイ / その他。未指定なら推定して確認 |
| 伝えたいこと | 推奨 | 所感・推し・不満・比較対象。無いと薄い一般論になるので聞く |
| スペック・事実 | 種別による | 価格・発売日・付属品。不明は書かない |
| カテゴリ | 任意 | 表示名。未指定なら既存から推定して確認 |
| タイトル | 任意 | 未指定なら既存パターンで草案 |
| contentId | 任意 | ケバブケース。未指定なら草案。衝突したら取り直す |
| アイキャッチ | 任意 | ローカルパス / URL / 「後で」 |
| 本文画像 | 任意 | 先にメディアへ上げる |
| 参考リンク | 任意 | 公式・通販・前回記事 ID |
| 長さ | 任意 | 未指定はいつものレビュー相当 |
| 書いてはいけないこと | 任意 | 制約として守る |
| 更新対象の contentId | 任意 | あるときは update、なければ create |

最低限の例: `Nothing Headphone (1) の開封レビュー。見た目重視。ノイキャンは普通。`

詳細は `references/microcms-schema.md`。

## Instructions

1. **入力を表に当てはめる。** テーマが無い、または事実が足りず誤情報になりそうなら質問して止める。
2. **MCP でスキーマを取る（未確認のときだけ）。** `microcms_get_api_list` → `blogs` の `microcms_get_api_info`。カテゴリ API 名はコードに無いので一覧から特定し、`microcms_get_list` で contentId と表示名を取る。結果の要点は `references/microcms-schema.md` と突き合わせる。
3. **正本を読む。** `references/canonical-posts.md` の近い記事を `microcms_get_content`。同カテゴリや同一メーカーの前回記事があれば 1 本足す。
4. **草案を出す。** タイトル、contentId、カテゴリ、見出し（`assets/outline-template.md` と `references/structure.md`）。利用者が未確定ならここで確認してから本文に進む。contentId は既存と衝突しないケバブケース。
5. **画像。** アイキャッチ・本文画像があれば `microcms_upload_media`。失敗したら画像なしで本文だけ下書きし、欠落として報告する。外部 URL を `eyecatch` や `img src` に直接入れない。
6. **HTML を組む。** `references/voice.md` と `references/rich-editor.md`。導入の挨拶を忘れない。
7. **下書きのみ POST。**
   - 新規: `microcms_create_content_draft`（endpoint: `blogs`、可能なら `contentId`）
   - 更新: `microcms_update_content_draft`
   - フィールドは最低 `title` と `content`。分かっていれば `category`（参照 ID）と `eyecatch`（メディア URL）
8. **結果を返す。** contentId、管理画面で開く手順、入れたフィールド、入れられなかったもの（画像なし、カテゴリ未設定など）。公開やサイト再ビルドは案内しない（このサイトは静的エクスポートで、下書きは表に出ない）。

## 確認の目安

次は POST 前に止める。

- タイトル / contentId / カテゴリが未確定
- 価格・スペックを本文に書くが根拠が無い
- 画像のアップロード先が microCMS メディアでない
