# リッチエディタ HTML

microCMS の WRITE API が受け付ける範囲だけ使う。サイトの本文は `html-react-parser` で描画する。

## 使ってよい

- `h1`〜`h5`（このブログのセクションは **h1**）
- `p`, `br`, `strong`, `em`, `a`, `ul`, `ol`, `li`
- `blockquote`, `pre`, `code`, `table`, `thead`, `tbody`, `tr`, `th`, `td`
- `figure`, `img`, `figcaption`
- 水平線 `hr`

このサイトの CSS は本文 `h1` を塗りバッジ、`h2`/`h3` を枠付きバッジとして出す。普段のレビュー見出しは h1。

## 画像

`src` は `https://images.microcms-assets.io/...` のみ。先に `microcms_upload_media`。

```html
<figure>
  <img src="https://images.microcms-assets.io/assets/.../photo.jpg" alt="" width="1200" height="800" />
  <figcaption>外箱。シンプルなデザインでいつものAlldocubeらしさを感じます。</figcaption>
</figure>
```

- `width` / `height` を付ける
- 配置を変えるなら `figure` の `style="text-align: center;"` 程度まで
- アイキャッチ（`eyecatch`）は本文 HTML に含めない。フィールド側

## リンク

```html
<p><a href="https://example.com">AliExpressでの購入はこちら</a></p>
```

## 埋め込み（Iframely）

正面記事に埋め込みがあるときだけ、その HTML 形をコピーする。自前で script タグを足さない（サイト側が `cdn.iframe.ly/embed.js` を読む）。

## 使わない

- 外部ドメインの `img src`
- 本文先頭のタイトル繰り返し
- 巨大なインライン CSS、未登録 class
- Markdown（`##` や `**`）のまま入稿
