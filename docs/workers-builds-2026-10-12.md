# Workers Builds・microCMS接続記録

2026-10-12に検証環境へ接続した。本番DNSとVercelの配信先は変更していない。

## 保存した設定

- Worker: `nakaatsu-site`
- GitHub: `nakaatsu118/nakaatsu.com`、対象ブランチ: `migration/astro-cloudflare`
- ビルド: `npm run check && npm run build`
- デプロイ: `npm run deploy`、ルート: `/`
- Node.js 24.21.0 / npm 11.19.0（実ビルドの検出ログで確認）
- ビルド変数: `MICROCMS_SERVICE_DOMAIN=nakaatsu`、`NODE_VERSION=24.21.0`、`SITE_URL=https://www.nakaatsu.com`、`SITE_PRODUCTION=false`
- `MICROCMS_API_KEY`はビルド専用シークレットとして暗号化保存。
- Deploy Hook名: `microcms-content-update`、対象ブランチ: `migration/astro-cloudflare`。URLはリポジトリへ保存しない。

microCMSのblogs・works・categoriesに「Cloudflare Workers Builds」カスタム通知を有効で登録した。公開・公開中更新（管理画面/API/レビュー/予約）、公開中の並び替え・ID/公開日時変更、公開終了（管理画面/予約）、公開中削除（管理画面/API）を通知する。下書き保存は通知しない。既存blogsのVercel Webhookは維持した。

## 確認したこと

Git pushによるビルド`0544ab66-5265-496f-9be8-ebb9311f0053`は成功。lint・型チェック・単体テスト・整形検証、実CMS25記事と制作実績3件、40公開URLの成果物検証を経て、バージョン`70449678-a7f1-46d1-a48c-d4d2dbdfa3e8`を配信した。

Webhookの接続確認では、categoriesの「APIの設定変更時」を一時的に有効化し、管理用API名を変更・復元した。2回のDeploy Hookビルドが起動し、後続が待ち行列へ入ることを確認した。API名・説明・通知条件は元へ復元済み。公開コンテンツやエンドポイントは変更していない。

Webhookビルド`e59d2f09-7820-4ddf-8e5d-c7a3ab76307e`と`6ac0f8b7-16f4-47df-b21d-9a4d631cef62`はどちらも成功した。`python tests/preview.py`も成功し、40 URL、301・404、noindex・配信ヘッダー、JSなしのモバイル表示、代表3記事の埋め込みとページエラーを確認した。

このテストは通知経路の確認であり、記事の公開・更新・停止・削除による成果物変更や、CMSの同時更新の検証を代替しない。これらと意図的な失敗時の旧版維持・復旧の実地確認は、本番切り替え前に残っている。

## 運用・切り替え

microCMSはWebhook送信失敗時に自動再送しないため、更新後はCloudflareのビルド成功を確認する。失敗時は原因を修正して該当ビルドを再試行し、公開内容とサイトの一致を確認する。[microCMS公式仕様](https://document.microcms.io/manual/webhook-setting)

PR #26のmainマージ後は、Workers BuildsとDeploy Hookの対象ブランチをmainへ変更する。DNS切り替えまで`SITE_PRODUCTION=false`を維持する。DNS変更の待機時刻と復旧用レコードは[DNS移行前記録](dns-before-migration.md)を参照。

検証サイト: https://nakaatsu-site.nakaatsu-world.workers.dev

GitHub ActionsとWorkers Buildsは成功。既存Vercel PreviewはNext.jsのプリセットが残るため失敗する。本番Vercelを停止したことを意味しない。
