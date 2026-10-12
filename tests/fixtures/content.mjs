const date = '2026-10-01T00:00:00.000Z';
export const fixture = {
  blogs: Array.from({ length: 20 }, (_, i) => ({
    id: `fixture-${i + 1}`,
    title:
      i === 0
        ? '長い記事タイトル & # / 写真・表・コード・埋め込みの表示を確認するための記事'
        : `検証記事 ${i + 1}`,
    content: `<h2>本文の見出し</h2><p>これは自動検証用の記事です。</p><table><tr><th>項目</th><td>値</td></tr></table><pre><code class="language-js">const a = 1;</code></pre><a href="https://www.amazon.co.jp/dp/EXAMPLE?tag=fixture-22&amp;ref=test">Amazonで確認する</a><script>window.UNSAFE = true</script><img src="https://images.microcms-assets.io/test.png" width="640" height="480" onerror="alert(1)" alt="検証画像"><iframe src="https://www.youtube-nocookie.com/embed/example" title="検証動画"></iframe>`,
    publishedAt: date,
    updatedAt: date,
    category: i < 10 ? { id: 'plants', name: '植物' } : undefined,
  })),
  works: [
    {
      id: 'fixture-work',
      title: '検証用制作実績',
      description: '制作実績の説明',
      skill: 'TypeScript',
      link: 'https://example.com',
      published: date,
      publishedAt: date,
      updatedAt: date,
    },
  ],
};
