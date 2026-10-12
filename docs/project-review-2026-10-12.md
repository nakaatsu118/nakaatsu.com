# プロジェクト調査結果

調査日: 2026-10-12  
対象: nakaatsu.comのリポジトリ（調査時HEAD: `141c043`）  
関連文書: [Cloudflare・Astro移行計画](./cloudflare-astro-migration-plan.md)

## 概要

Next.js 16.3.8、React 19.3、TypeScript、microCMS、Framer Motionで構成された個人サイト・ブログ・ポートフォリオ。`output: 'export'` を使用し、CMSデータをビルド時に取得して静的サイトを出力する。アプリケーション用の常時稼働サーバーを必須とする構成ではない。

優先して対応するのはCMS本文のサニタイズ、カテゴリ・ページ番号・URLの整合性、開発用依存関係の脆弱性。Astroへ移行する場合、Next.js固有の改善に多くの工数を使わず、問題の原因と受け入れ条件を新実装へ引き継ぐ。

## 既に適切に実装されている点

- microCMSアクセスを `server-only` で保護し、APIキーを公開用環境変数にしていない。
- TypeScriptのstrict設定、Lint・型・整形チェック用スクリプトがある。
- ブログ一覧用の `BlogSummary` と取得フィールド制限がある。
- カテゴリ選択ボタンに `aria-pressed`、フォーカス表示、結果件数の通知がある。
- 外部リンクの多くに `noopener noreferrer` が設定されている。
- READMEに静的ホスティングの条件とCMS更新時の再ビルドが記載されている。

## 改善事項

### 1. CMS本文のサニタイズ【高／セキュリティ】

対象: [本文表示](../app/blog/[blogId]/blogId.component.tsx)

`html-react-parser` への入力にHTMLの安全性検証がない。除外するのは特定のIframelyスクリプトで、任意のscript・iframeなどに対する包括的な許可リストはない。無害な検証用入力を用い、ライブラリのサーバーレンダリング結果にscriptおよびiframe srcdocが残ることを確認した。実サイトに攻撃を行ったわけではなく、CMS権限侵害などで不正HTMLが入る場合のリスクである。

ビルド時に許可タグ・属性・URLプロトコルを制限し、iframe・埋め込みURLのホストを検証する。Iframelyは独立した埋め込み部品で扱う。サニタイズ済みデータだけをHTMLとして出力し、CSPは配信側で追加する。

受け入れ条件: 不正なscript、イベント属性、srcdoc、不正URLを除去し、通常の見出し・表・コード・許可した埋め込みが表示できる。

参考: [html-react-parser公式FAQ](https://github.com/remarkablemark/html-react-parser#is-this-xss-safe)

### 2. カテゴリとページ番号の状態管理【高／機能・UX】

対象: [Blogs](../app/blog/_components/Blogs/index.tsx)、[Pagination](../app/blog/_components/Pagination/index.tsx)

`current` と `useState(current)` でページ番号を二重管理している。`/blog/page/3` でカテゴリを選択し「すべて」を押すと、stateは1ページ目になるがURLは3ページ目のままになる。再読み込みで表示が変わる。カテゴリ選択もURLに保存されない。これはコードから確認した状態遷移で、ブラウザーE2Eは未実施。

カテゴリ・ページの状態をURLと同期させる。全件表示のページ番号はURLから導出し、カテゴリ解除時は `/blog` に遷移させる。無効なページ番号と絞り込み後の範囲外ページも扱う。

受け入れ条件: 共有・再読み込み・戻る／進むで同じ内容を復元できる。

### 3. 開発用依存関係の脆弱性【高〜中／依存関係】

`npm audit` はhigh 7件。依存元への波及を含む7パッケージであり、独立した原因は2種類。

| 経路                                                 | 検出バージョン | 内容                              | 対応                                         |
| ---------------------------------------------------- | -------------- | --------------------------------- | -------------------------------------------- |
| serve → compression                                  | 1.8.1          | 接続切断時のメモリリークによるDoS | 互換性を確認し1.8.2以降へ更新                |
| eslint-config-next → fast-glob → micromatch → braces | 3.0.3          | 深いパターンによるスタック枯渇DoS | 修正版を監視し、外部入力をglob設定へ渡さない |

どちらも開発用依存関係だが `npm start` はserveを起動する。公開サーバーとして使っている場合はcompressionの対応を優先する。`npm audit --omit=dev` は0件。静的ファイルだけを配信する環境への影響と、開発・ビルド・プレビューへの影響を分けて評価する。`npm audit fix --force` が提案する旧メジャーへの変更を無条件に適用しない。

参考: [compressionアドバイザリ](https://github.com/advisories/GHSA-vc2v-76pw-4v95)、[bracesアドバイザリ](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)

### 4. 改行コードと整形チェック【中／開発環境】

対象: `.prettierrc`、Git設定、今後の `.gitattributes`

Prettierが55ファイルで失敗。全件がCRLF／LFの違いだけで、改行を正規化すると整形結果と一致した。ローカルの `core.autocrlf=true` とPrettierの既定値が衝突している。

`.gitattributes` とPrettierでLFに統一するなど、OSに依存しない改行方針を設定する。改行だけの変更は機能変更と分ける。

### 5. SEO・メタデータ・共有URL【中／SEO】

対象: [layout](../app/layout.tsx)、[記事metadata](../app/blog/[blogId]/page.tsx)、[sitemap](../app/sitemap.ts)、[CardHeader](../app/_components/Card/CardHeader/index.tsx)

- metadataは `nakaatsu.com`、サイトマップと共有は `www.nakaatsu.com`。本番の正規ホストを確認して統一する。
- 画像なしの記事で `undefined?w=1200` を組み立てる。条件分岐と代替画像を設定する。
- canonical・記事別description・記事用OGを整備する。ファイルベースOG画像とmetadata設定の優先順位は出力HTMLで検証する。
- 共有タイトルを直接クエリへ連結している。`URLSearchParams` で `&` や `#` を正しく扱う。
- `/blog` と `/blog/page/1` の重複を正規化する。
- 静的ページのlastModifiedにビルド日時を使う運用は、実際の更新日との一致を見直す。

### 6. 画像とクライアント配信データ【中／性能】

対象: [WhoIs](../app/profile/WhoIs/index.tsx)、[トップページ](../app/page.tsx)、[画像設定](../next.config.mjs)

プロフィールで約913KBのPNGを使用。同名のWebPは約54KBなので、画質確認後の切り替えに効果がある。約10.5MBのPNGなど未使用候補もあるが、配置されているだけで閲覧時に取得されるわけではない。

`images.unoptimized: true` によりNext.jsの画像最適化・レスポンシブ候補生成は無効。CMSの画像URL生成を共通化し、適切な幅・形式・品質を指定する。本文画像は寸法不足によるレイアウト移動を計測し、寸法やaspect-ratioを付ける。

トップページは本文を含むブログ取得結果をClient Componentに渡す。必要なサマリーフィールドだけにする。表示に不要なデータとJSを減らす。

### 7. モーションとアクセシビリティ【中／UX】

対象: [MotionWrapper](../app/_components/MotionWrapper/index.tsx)、CardHeader、Navigation、Footer、SNSリンク

ページ全体の初期opacityが0で、JSが動かない場合の可読性に課題がある。本文は初期HTMLで読めるようにする。動きを減らす設定をFramer MotionとCSS全体へ適用する。現在のreduced-motion対応はカテゴリボタンのtransitionに限られる。

アイコンリンクにアクセス可能な名前を付け、nav・footerのランドマーク、見出し階層、timeのdateTimeを整える。CardHeaderは固定h1ではなく見出しレベルを指定できる設計にする。rootの100px固定フォントサイズは、ユーザーの文字サイズ設定も考慮して見直す。

### 8. 重複と責務の整理【中／保守性】

- 記事URL生成とsitemapの全件取得ループを共通化する。ID・updatedAtだけでよい処理では本文を取得しない。
- CMSクライアントを必要以上に公開せず、用途別の取得関数と型を公開する。
- TopBlogsとBlogsのカード表示、各ページのFooter・ProgressBar、画像URL処理を共通化する。
- TopBlogs・Worksのpropsを実際に使うcontentsに限定する。呼び出し側のダミー `totalCount=0` などをなくす。
- `@/` と `~/` の二重エイリアス、未使用CSS、重複したLoading CSSを整理する。
- インストール済みNext.jsのガイドではImageのpriorityが非推奨。Next.jsを継続する場合は適切なpreload等へ移行する。

### 9. テスト・CI・障害対応【中／運用】

リポジトリ内に自動テスト・CI設定は見当たらない。カテゴリ解除、ページ遷移、画像なし、HTML除去、404を重点的に自動検証する。

CMS通信に明示的なタイムアウト・再試行方針がない。サイトマップは取得エラーを握り、静的ページだけで出力を継続する。不完全な成果物を検知する件数検証と通知を加える。CMS更新時のビルド・デプロイ、失敗時の旧成果物維持を実運用で確認する。

### 10. 外部サービスとプライバシー【中／運用】

GTM、Google Fonts、Iframelyへの外部通信がある。実際のGTM配信内容、必要な埋め込み、プライバシーポリシーの記述を照合する。移行時に計測方式と外部依存を選び直す。法的な違反や同意の要否を、このリポジトリだけから断定するものではない。

## 検証結果と限界

| 項目                          | 結果                                                      |
| ----------------------------- | --------------------------------------------------------- |
| 依存関係導入                  | `npm ci --ignore-scripts --no-audit --no-fund` 完了       |
| ESLint                        | 成功                                                      |
| 型チェック                    | `next typegen && tsc --noEmit` 成功                       |
| Prettier                      | 55件失敗、すべて改行コードのみ                            |
| 全依存関係監査                | high 7パッケージ、原因2種類                               |
| 本番依存関係監査              | 0件                                                       |
| 実行環境                      | Node 22.23.3／npm 10.9.9。指定はNode 24.21.0／npm 11.19.0 |
| 本番ビルド・実記事検証        | 未実施。CMS環境変数がローカルにない                       |
| 本番DNS・ヘッダー・Vercel契約 | 未確認                                                    |

調査時はソース・ロックファイルを変更していない。依存関係と型生成のローカル成果物のみ生成した。本書は指摘の記録であり、修正完了を示すものではない。
