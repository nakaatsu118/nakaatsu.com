# Cloudflare Workers 本番切り替え記録（2026-10-13）

## 結果

`www.nakaatsu.com` の配信先を Vercel から Cloudflare Workers の `nakaatsu-site` に切り替えた。`nakaatsu.com` は Cloudflare の Single Redirect で www に 301 転送する。ドメイン登録は Squarespace Domains、DNS と DNSSEC は Cloudflare のまま。

切り替え対象の Workers Builds は main の `fc53f85`（ビルド `03095306-04c9-4a70-8a2b-9d5de25367e8`、成功）。Cloudflare のビルド変数 `SITE_PRODUCTION=true` と `SITE_URL=https://www.nakaatsu.com` により本番用の sitemap/robots/canonical を生成する。`wrangler.jsonc` の `workers_dev=false` により共通の workers.dev URL は 404。バージョン URL には `X-Robots-Tag: noindex` を設定した。

## 実施内容

1. 旧 www CNAME `cname.vercel-dns.com` を削除し、Worker `nakaatsu-site` の本番 Custom Domain に `www.nakaatsu.com` を接続。Cloudflare DNS に Worker 管理のプロキシ済みレコードが作成された。
2. Cloudflare Single Redirect `Apex to www (Workers production)` を有効化。`http*://nakaatsu.com/*` → `https://www.nakaatsu.com/${2}`、301、クエリ文字列保持。ルール ID は `8b4773a91c2a4386bad2b96172eee003`。
3. apex A `76.76.21.21` を DNS のみからプロキシ済みに変更し、Cloudflare の転送ルールを通した。A の値は短期の切り戻し用に保持。通常の apex リクエストは転送ルールで終了し、Vercel には到達しない。
4. Google Search Console の既存ドメインプロパティで `https://www.nakaatsu.com/sitemap.xml` を再送信。2026-10-13 に成功し、40ページを検出した。

## 切り替え後の確認

- `https://www.nakaatsu.com/` は HTTPS 200、`Server: cloudflare`、`CF-RAY` あり。証明書エラーなし。
- sitemap の40 URLすべて HTTP 200。各HTMLの canonical は自身の www URL と一致し、`noindex` なし。
- `robots.txt` は `Allow: /` と www の sitemap を返す。sitemap は40 URL。
- `http://nakaatsu.com/about?cutover=1` と HTTPS の同URLはともに301で `https://www.nakaatsu.com/about?cutover=1` へ転送。
- `/blog/page/1?source=cutover` は `/blog?source=cutover` へ301。存在しないページと公開終了した検証記事 `/blog/m2cravpms5v` は404。
- Cloudflare DNS と Google DNS の DoH で apex A 応答の DNSSEC `AD=true`。Google 所有権確認 CNAME と Squarespace Domain Connect CNAME は維持。移行前から MX レコードは存在しない。
- microCMS の公開・更新・公開終了に伴う Deploy Hook と Workers Builds は本番準備時に実地確認済み。切り替えで hook の対象ブランチ `main` や CMS キーは変更していない。依頼者の判断により「ビルド中に重なるCMS更新」の実地試験は対象外。

## 運用と切り戻し

CMS 変更後は Cloudflare Workers Builds の `main` 最新ビルド成功を確認し、該当する本番 URL と sitemap の反映を確認する。Webhook 失敗時は原因修正後にビルドを再実行する。Vercel の旧Webhook は短期の切り戻し用に残している。

重大な不具合で Vercel に戻す場合は、まず Worker の `www.nakaatsu.com` Custom Domain を解除し、Cloudflare DNS に www CNAME `cname.vercel-dns.com`（DNS のみ）を作成する。次に `Apex to www (Workers production)` を無効化し、apex A `76.76.21.21` を DNS のみに戻す。www と apex の HTTPS、主要 URL、SEO、DNSSEC を確認する。DNS のみへの変更と旧 CNAME の復旧にはキャッシュ時間があり得るため、Vercel の成功済み本番デプロイとドメイン設定を安定確認まで保持する。

Vercel プロジェクト、旧Webhook、旧デプロイの撤去は数日間のアクセス・404・更新の観測後に別途判断する。
