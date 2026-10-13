"""Capture public URL evidence before migration; never follows affiliate links."""
import concurrent.futures
import json
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
from xml.etree import ElementTree

ORIGIN = 'https://www.nakaatsu.com'


class PageMetadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.images = set()
        self.affiliate_links = set()
        self.embed_hosts = set()
        self.canonical = None
        self.title = ''
        self.in_title = False

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        self.in_title = self.in_title or tag == 'title'
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href')
        if tag == 'img' and attrs.get('src'):
            self.images.add(attrs['src'])
        if tag == 'a' and attrs.get('href'):
            if urlparse(attrs['href']).hostname in ('amazon.co.jp', 'www.amazon.co.jp', 'amzn.to'):
                self.affiliate_links.add(attrs['href'])
        source = attrs.get('data-iframely-url') or (attrs.get('src') if tag == 'iframe' else None)
        if source:
            self.embed_hosts.add(urlparse(urljoin(ORIGIN, source)).hostname)

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data


def capture(url):
    request = Request(url, headers={'User-Agent': 'nakaatsu-migration-verification/1.0'})
    with urlopen(request, timeout=20) as response:
        body = response.read()
        page = PageMetadata()
        page.feed(body.decode('utf-8'))
        return {
            'url': url,
            'resolved_url': response.url,
            'status': response.status,
            'html_bytes': len(body),
            'server': response.headers.get('Server'),
            'title': page.title,
            'canonical': page.canonical,
            'images': sorted(page.images),
            'affiliate_links': sorted(page.affiliate_links),
            'embed_hosts': sorted(page.embed_hosts),
        }


def main():
    with urlopen(ORIGIN + '/sitemap.xml', timeout=20) as response:
        tree = ElementTree.fromstring(response.read())
    urls = [element.text for element in tree.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    assert urls and all(urlparse(url).netloc == 'www.nakaatsu.com' for url in urls)
    article_count = sum('/blog/' in url for url in urls)
    urls += [f'{ORIGIN}/blog/page/{page}' for page in range(1, (article_count + 8) // 9 + 1)]
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        pages = list(executor.map(capture, sorted(set(urls))))
    report = {
        'captured_at': datetime.now(timezone.utc).isoformat(),
        'source': ORIGIN + '/sitemap.xml',
        'article_count': article_count,
        'limits': 'Public HTML only; not a CMS snapshot or DNS/account backup. Affiliate destinations were not requested.',
        'pages': pages,
    }
    Path('docs/production-baseline.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Captured {len(pages)} URLs, including {article_count} articles')


if __name__ == '__main__':
    main()
