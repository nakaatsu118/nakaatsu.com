# microCMS スキーマと MCP

サイトの読み取りは `app/_libs/microcms.ts`。書き込みは公式 MCP のみ。SDK で POST しない。

## エンドポイント

| API | 用途 |
| --- | --- |
| `blogs` | 記事。Skill の対象 |
| `works` | プロフィール実績。触らない |

`blogs` のアプリ側の型:

| フィールド | 型 | 入稿 |
| --- | --- | --- |
| `id` | 文字列 | create 時は `contentId`（ケバブケース。例: `airpods-pro-3`） |
| `title` | 文字列 | 必須 |
| `content` | リッチエディタ HTML | 必須 |
| `eyecatch` | 画像 | 任意。メディアライブラリの URL |
| `category` | コンテンツ参照（単一） | 任意。**表示名ではなく参照先 contentId** |

カテゴリの API 名はフロントに無い。初回は `microcms_get_api_list` で特定する。公開サイト上の表示名は ガジェット / フィギュア / 生活雑貨 / グッズ。

## 使う MCP ツール

取得:

- `microcms_get_api_list` / `microcms_get_api_info`
- `microcms_get_list` / `microcms_get_content`
- `microcms_get_media`

書き込み（下書きのみ）:

- `microcms_upload_media`
- `microcms_create_content_draft`
- `microcms_update_content_draft`

禁止:

- `microcms_create_content_published`
- `microcms_create_contents_bulk_published`
- `microcms_update_content_published`
- `microcms_patch_content_status`（公開にも下書き戻しにも使わない）
- `microcms_delete_content` / `microcms_delete_media`（依頼がない限り）

## create 時の content

MCP のフィールド仕様に従う。画像は URL 文字列、参照は contentId 文字列、リッチエディタは HTML 文字列。

カスタムフィールドや iframe 拡張を `blogs` が持つかは `get_api_info` で確認する。アプリは `title` / `content` / `eyecatch` / `category` しか使っていない。

## キー

- サイトの `MICROCMS_API_KEY` は GET 想定。MCP に使い回さない
- MCP は AI 専用の書き込みキー（Content API の POST と、メディア・API 情報なら Management API）
- 設定例: `.cursor/mcp.json.example`

## 公開との関係

このサイトは `output: 'export'`。下書きは管理画面にだけ残り、公開＋ビルドするまで `/blog` に出ない。Skill は再ビルドや公開を行わない。
