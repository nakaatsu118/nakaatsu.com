# nakaatsu World

nakaatsuの個人サイト・ブログ・ポートフォリオです。AstroでmicroCMSの公開コンテンツを静的生成し、Cloudflare Workers Static Assetsで配信します。

## セットアップ

Node.js 24.21.0 / npm 11.19.0を使用します（`.tool-versions`参照）。

```sh
npm ci
cp .env.sample .env
npm run dev
```

`.env`に`MICROCMS_SERVICE_DOMAIN`と`MICROCMS_API_KEY`を設定します。キーはビルド時だけ使用し、`PUBLIC_`を付けません。既存CMSのblogs・worksのID、本文、公開日時をそのまま使います。

`SITE_URL=https://www.nakaatsu.com`は既存の転送先に合わせています。2026-10-12のHTTP確認ではapexがwwwへ308、wwwが200でした。Search Consoleの登録ホストとの照合は未実施です。

## 検証・ビルド

```sh
npm run check
npm run build
npm start
```

`check`はESLint・Astro型チェック・単体テスト・Prettierを実行します。`build`は実CMSへ接続し、取得件数・重複ID・更新日時を検証して`dist/`を生成した後、URL数・HTML・sitemap・秘密情報混入を検証します。不完全な取得結果は成功扱いしません。CMSリクエストは10秒タイムアウト、通信障害・429・5xxは最大3回試行します。取得後のID・公開日時・更新日時照合は更新競合の検知であり、CMSのトランザクションを保証するものではありません。

`npm start`はWranglerのローカル環境で配信設定・301・404を確認します。公開対象は`dist/`だけです。

### CMS認証なしの自動検証

```sh
npm run build:fixtures
python -m pip install -r tests/requirements.txt
python -m playwright install chromium
npx wrangler dev --assets dist-test --port 8787 --local --show-interactive-dev-session=false
# 別ターミナル
python tests/browser.py
```

検証専用の記事20件と制作実績1件から、28公開URL＋404を生成します。`dist-test/`へ隔離し、noindex・計測無効を強制します。`dist-test/`を本番へデプロイしないでください。ブラウザ検証はJS無効でカテゴリ・ページ・履歴・再読み込み、モバイル表示、本文サニタイズ、301・404、メタデータを確認します。外部埋め込みの通信は遮断するため、その表示は実データ検証が別途必要です。

GitHub Actionsでは認証情報なしで同じ検証を行います。外部PRにCMSキーを渡しません。

公開サイトの移行前比較データは`docs/production-baseline.json`に保存しています（記事25件を含む32 URL）。`python scripts/capture-baseline.py`で更新できます。公開HTMLの情報だけであり、CMSスナップショットやDNSの復旧設定の代わりにはなりません。Amazonリンク先へのアクセスは行いません。

## Cloudflareへの切り替え

詳細は[移行計画](docs/cloudflare-astro-migration-plan.md)と[調査結果](docs/project-review-2026-10-12.md)を参照してください。初期構成にSSR・Hono・Cloudflareアダプターは不要です。

1. `wrangler login`で使用アカウントを確認し、Workers Buildsにリポジトリを接続します。Worker名は`nakaatsu-site`です。
2. ビルド環境にCMSの2変数と`SITE_URL`を登録します。検証環境は`SITE_PRODUCTION=false`にします。
3. ビルドコマンドを`npm run check && npm run build`、デプロイコマンドを`npm run deploy`に設定します。デプロイ前にも成果物を検証し、失敗したビルドをデプロイしません。`SITE_TEST_FIXTURES`は設定しません。
4. main用Deploy Hookを作成し、microCMSの公開・公開中更新・公開停止・削除からHTTP POSTするカスタムWebhookを設定します。Hook URLは秘密情報として扱います。
5. 実記事の全URL・画像・埋め込み・Amazonタグ・更新反映を確認します。連続更新、ビルド失敗時の旧版維持と再実行も検証します。
6. DNSのA/AAAA/CNAME/MX/TXT/CAA、DNSSEC、メール、Vercelの復旧設定を控えます。Cloudflare zoneへ移行しても、Webの参照先はサイト切り替えまでVercelを維持します。
7. 検証済みの本番ビルドで`SITE_PRODUCTION=true`にし、wwwのCustom Domainを接続します。apexからwwwへパスとクエリを保った301をRedirect Rulesで設定します。
8. SSL・メール・robots・canonical・sitemap・全URLとWebhookを本番で確認し、7〜14日の監視後にVercelの旧Webhook・不要な契約を整理します。

既存GTM（GTM-PR49LG4）は本番ビルドだけで読み込みます。Amazonリンクは直接遷移を維持し、`affiliate_click`に記事ID・掲載位置・取得可能なASINを付けます。GTM側の重複タグと既存計測設定の照合は必要です。CSPは`public/_headers`でReport-Onlyから開始し、実埋め込み・計測の検証後に強制へ切り替えます。

ロールバックは直近正常なCloudflareデプロイへの復元を基本とし、移行自体の問題ならCustom Domainの競合設定を解除して保存済みVercel用DNSへ戻します。Cloudflare DNSは維持し、ネームサーバーの再変更を通常の復旧手順にはしません。

## 移行状況（2026-10-12）

- `migration/astro-cloudflare`でトップ・ブログ・カテゴリ・記事・プロフィール・ポリシー・404・sitemap・robotsを移植しました。Next.js／React／Framer Motionと旧コードを削除しました。
- サニタイズ、CMSの全件取得・再試行・整合性、ページURL・画像フォールバックを単体テストで検証しています。
- 検証用ビルドとWranglerローカル配信でJSなしの遷移・301・404を確認しました。実CMS25記事の本文・画像URL・リンク先・埋め込みURLを照合し、制作実績3件もビルドしました。`node scripts/verify-content-parity.mjs`で再照合できます。
- Cloudflare CLI認証・CMS環境変数の設定を完了し、[検証サイト](https://nakaatsu-site.nakaatsu-world.workers.dev)へデプロイ済みです。検索登録とGTMは無効です。`python tests/preview.py`で全40URL・301・404・ヘッダー・モバイル表示を確認しました。
- CloudflareのDNSゾーンを無料プランで準備し、既存4レコードをDNSのみで設定しました。元の設定は[DNS移行前記録](docs/dns-before-migration.md)に保存しています。DNSSECは承認を受けて一時解除済みで、旧DSのキャッシュ失効待ちです。ネームサーバー変更は2026-10-13 10:51 JST以降に再確認して実施します。本番切り替え、Vercel停止は未実施です。
- Workers BuildsをGitHubへ接続し、対象ブランチを`migration/astro-cloudflare`に設定しました。Node 24.21.0、検証用環境変数、暗号化したCMSキーを登録済みです。実ビルドとWebhookの検証は進行中です。mainへマージ後、ビルド対象ブランチもmainへ切り替えます。
- Amazon登録・契約・費用・PV・DNSSEC・メール・Search Console・実ユーザー速度の確認、切り替え後の監視は残っています。

全体の移行ゴールは継続中です。検証用ビルドの成功は本番移行の完了を示しません。
