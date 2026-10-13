import importlib.util
import unittest

spec = importlib.util.spec_from_file_location('capture', 'scripts/capture-baseline.py')
capture = importlib.util.module_from_spec(spec)
spec.loader.exec_module(capture)


class BaselineParserTest(unittest.TestCase):
    def test_collects_metadata_without_executing_scripts_or_following_links(self):
        page = capture.PageMetadata()
        page.feed('<title>記事 &amp; 写真</title><link rel="canonical" href="https://www.nakaatsu.com/blog/a"><img src="/photo.webp"><a href="https://amzn.to/example?a=1&amp;b=2">商品</a><a href="https://amazon.co.jp.evil.example/">除外</a><script>fetch("https://evil.example")</script><a data-iframely-url="https://cdn.iframe.ly/example">埋め込み</a>')
        self.assertEqual(page.title, '記事 & 写真')
        self.assertEqual(page.canonical, 'https://www.nakaatsu.com/blog/a')
        self.assertEqual(page.images, {'/photo.webp'})
        self.assertEqual(page.affiliate_links, {'https://amzn.to/example?a=1&b=2'})
        self.assertEqual(page.embed_hosts, {'cdn.iframe.ly'})


if __name__ == '__main__':
    unittest.main()
