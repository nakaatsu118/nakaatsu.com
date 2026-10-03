# microCMS スキーマと MCP

サイトの読み取りは `app/_libs/microcms.ts`。書き込みは公式リモート MCP（`https://mcp.microcms.io/mcp/nakaatsu`）のみ。SDK で POST しない。

Cloud Agent から使う手順はリポジトリの `README.md`（「Cloud Agent からブログ下書き」）に書く。`.cursor/mcp.json` は gitignore 済みで VM には載らない。

## エンドポイント

| API | endpoint | 用途 |
| --- | --- | --- |
| ブログ | `blogs` | 記事。Skill の対象 |
| カテゴリ | `categories` | `blogs.category` の参照先 |
| Works | `works` | プロフィール実績。触らない |

`blogs` のフィールド（`microcms_get_api_info`、2026-09-10 確認。必須指定はなし。カスタムフィールドなし）:

| fieldId | 表示名 | kind | 入稿 |
| --- | --- | --- | --- |
| `title` | タイトル | text | 必須扱い。文字列 |
| `content` | 内容 | richEditorV2 | 必須扱い。HTML 文字列 |
| `eyecatch` | アイキャッチ | media | 任意。メディアライブラリの URL |
| `category` | カテゴリ | relation | 任意。`categories` の **contentId** |

リッチエディタで有効なオプション: headerOne〜Five、paragraph、bold、italic、underline、strike、code、blockquote、codeBlock、listBullet、listOrdered、link、image、file、table、horizontalRule、textAlign、customClass、oembedly、color、size。本文 HTML の制約は `rich-editor.md`。

`categories` は `name`（テキスト）のみ。

### カテゴリ contentId

入稿の `category` は表示名ではなく下表の ID。サイトでよく使う 4 件を先に書く。

| 表示名 | contentId |
| --- | --- |
| ガジェット | `mi4n56k224a` |
| フィギュア | `6qwi3w-e3u` |
| 生活雑貨 | `ovqx2b057cnn` |
| グッズ | `p1jv685y72j6` |
| カメラ | `zmjg7z90vg00` |
| ペット | `1mgugv1g4ly` |
| イベント | `ufi27r_8p` |
| インテリア | `a1q5gw4wqy_0` |
| 料理 | `etvpyyyuh8` |
| アクアリウム | `k3imdgose` |
| テクノロジー | `chmgzfunz3tt` |
| 更新情報 | `xl31n6bp0z` |

増減したら `microcms_get_list`（endpoint: `categories`、fields: `id,name`）で取り直す。

## 使う MCP ツール

取得:

- `microcms_get_api_list` / `microcms_get_api_info`
- `microcms_get_list` / `microcms_get_content`
- `microcms_get_media`

書き込み（下書きのみ）:

- `microcms_upload_media`
- `microcms_create_content_draft`
- `microcms_update_content_draft_only`

禁止:

- `microcms_create_content_published`
- `microcms_create_contents_bulk_published`
- `microcms_update_content`（公開済みの更新）
- `microcms_patch_content_status`（公開にも下書き戻しにも使わない）
- `microcms_delete_content` / `microcms_delete_media`（依頼がない限り）

## create 時の content

MCP のフィールド仕様に従う。画像は URL 文字列、参照は contentId 文字列、リッチエディタは HTML 文字列。

アプリは `title` / `content` / `eyecatch` / `category` しか使っていない。

## キー

- サービスIDは `nakaatsu`
- サイトの `MICROCMS_API_KEY` は GET 想定。MCP に使い回さない
- MCP は `MICROCMS_MCP_API_KEY`（AI 専用。下書き POST と、メディア・API 情報なら Management API）
- 設定例: `.cursor/mcp.json.example`（`Authorization: Bearer`）
- API の IP 制限があるとリモート MCP から届かないことがある

## 公開との関係

このサイトは `output: 'export'`。下書きは管理画面にだけ残り、公開＋ビルドするまで `/blog` に出ない。Skill は再ビルドや公開を行わない。
