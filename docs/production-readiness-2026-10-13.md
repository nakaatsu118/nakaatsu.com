# Workers本番準備（2026-10-13）

対象は本番切り替え前まで。`www.nakaatsu.com` の配信先はVercelのままにする。

## 確認済み

- DNS委任はCloudflareへ移行済み。DNSSECは1.1.1.1と8.8.8.8で署名検証成功。[DNS移行記録](dns-before-migration.md)
- 検証Workerの40公開URL、転送、404、配信ヘッダー、`noindex`、JSなしのモバイル表示を `tests/preview.py` で確認。
- 現行サイトと最新Workerの33ページ・画面幅条件、842個の見出し・画像の位置と寸法が1px以内で一致。`tests/capture-design.py` と `tests/compare-design.py` を使用。
- `tests/motion.py` でFramer Motionの登場、ホバー、押下、スクロール、reduced-motion、JSエラーなしを確認。
- `npm run check` 成功。`SITE_PRODUCTION=true`、`SITE_URL=https://www.nakaatsu.com` のローカルビルドは実CMSから25記事・3実績・40公開URLを生成し、`scripts/verify-build.mjs` に合格。
- 移行ブランチの `vercel.json` でVercelのGit自動デプロイを無効化。既存の成功済みVercel本番デプロイは残す。PR #26のVercel失敗チェックは消え、GitHub ActionsとWorkers Buildsは成功。

## 残る本番準備

- 実CMSの検証用下書き `blogs/m2cravpms5v` を一時公開し、公開・更新・停止がWorkers Buildsを起動して成果物に反映されることを確認する。終了後は下書き状態に戻す。既存公開記事は変更しない。
- CMS更新がビルド中に重なった場合と、意図的なビルド失敗時に旧版が維持され再実行で復旧することを確認する。
- PR #26をレビュー可能な状態にし、移行内容を本番ブランチへ統合する。Workers Buildsの対象ブランチとmicroCMSのDeploy Hookをそのブランチに合わせ、最終ビルドの成功を確認する。
- WorkerのプレビューURLは本番切り替えまで `SITE_PRODUCTION=false` を維持する。同じWorkerを `workers.dev` でも公開しているため、先に `true` にするとプレビューのクロール抑止が外れる。本番ビルド設定の切り替えとSEOの再確認はCustom Domain接続と同じ切り替え工程で行う。

## 切り替え時と復旧

切り替え時は既存のwww CNAMEと競合するため整理してからWorkerに `www.nakaatsu.com` のCustom Domainを接続する。apexはwwwへの転送を維持し、HTTPS・全URL・SEO・DNSSECを確認する。[移行計画](cloudflare-astro-migration-plan.md)

不具合でVercelへ戻す場合はWorkerのCustom Domainを解除し、Cloudflare DNSのapex Aを `76.76.21.21`、www CNAMEを `cname.vercel-dns.com` に戻す。Vercelプロジェクトと成功済みデプロイは安定確認まで保持する。
