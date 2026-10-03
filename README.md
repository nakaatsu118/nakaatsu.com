# nakaatsu`s World

nakaatsu の個人サイト＆ポートフォリオサイトです。

Next.js 16のApp Router、React 19、Framer Motionを使用しています。

## セットアップ

Node.js 24.21.0とnpm 11.19.0を使用します。asdfを使う場合は`asdf install`で`.tool-versions`のバージョンをインストールしてください。依存関係はnpmと`package-lock.json`で管理します。

```sh
npm ci
cp .env.sample .env
```

`.env`に`MICROCMS_SERVICE_DOMAIN`と`MICROCMS_API_KEY`を設定してください。APIキーはサーバー側でのみ使用します。`NEXT_PUBLIC_`を付けたり、`next.config.mjs`の`env`に追加したりしないでください。

```sh
npm run dev
```

## 検証とビルド

```sh
# Lint・型チェック・整形チェック
npm run check

# 静的サイトをout/に生成（microCMSへの接続が必要）
npm run build

# 生成済みの静的サイトをhttp://localhost:3000で確認
npm start
```

`npm run fix:lint`でLintの自動修正、`npm run format`でPrettierによる整形を実行できます。Next.js 16のビルドではLintが実行されないため、ビルド前に`npm run check`を実行してください。

## 公開とCMSの更新

ホスティング先には`out/`の内容のみを配信します。`next start`は使用しません。HTMLの拡張子を省いたURL（例：`/profile`）と、存在しないURLへの`404.html`の配信に対応する必要があります。

静的出力ではISRによる自動再生成は行われません。microCMSの記事・制作実績を更新した際は、ビルドとデプロイを再実行してください。ブログ本文のIframely埋め込みは、ブラウザーで外部スクリプトを読み込んで表示します。

## 更新を保留しているもの

- TypeScriptは5.9.3、ESLintは9系を使用します。typescript-eslintのTypeScript対応範囲と、eslint-plugin-reactのESLint対応範囲を確認してからメジャー更新してください。
- 2026年10月3日時点で、開発用の`eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`に[CVE-2026-93687](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)が残っています。`braces`の修正版は未公開です。Next.jsのLint設定の`settings.next.rootDir`で指定するglobに影響するため、外部入力を設定値に使用しないでください。本プロジェクトではこの設定を指定していません。本番用依存関係の監査は`npm audit --omit=dev`、全依存関係の監査は`npm audit`で行います。修正版が公開されたらロックファイルを更新してください。`npm audit fix --force`によるNext.jsのLint設定のダウングレードは避けてください。
