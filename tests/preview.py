import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright
BASE = os.environ.get('PREVIEW_URL', 'https://nakaatsu-site.nakaatsu-world.workers.dev')
paths = json.loads(Path('.astro/manifest.json').read_text())['paths']
with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(viewport={'width':390,'height':844}, java_script_enabled=False)
    for path in paths:
        response = context.request.get(BASE + path)
        assert response.status == 200, (path, response.status)
        assert 'noindex, nofollow' in response.text(), path
        assert response.headers.get('x-content-type-options') == 'nosniff', path
    for path in ['/missing', '/blog/page/0', '/blog/page/999', '/blog/category/missing']:
        assert context.request.get(BASE + path).status == 404, path
    response = context.request.get(BASE + '/blog/page/1?source=test', max_redirects=0)
    assert response.status == 301 and '/blog?source=test' in response.headers['location']
    assert 'Disallow: /' in context.request.get(BASE + '/robots.txt').text()
    page = context.new_page()
    for path in ['/', '/profile', '/blog', '/blog/iplay-80-mini-ultra']:
        page.goto(BASE + path)
        assert page.locator('main').is_visible()
        assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), path
    page.screenshot(path='test-results/real-article-mobile.png', full_page=True)
    context.close()
    context = browser.new_context(viewport={'width':1280,'height':900})
    page = context.new_page()
    failures=[]
    page.on('pageerror', lambda e: failures.append(str(e)))
    for slug in ['iplay-80-mini-ultra','3b_i-nidttj','89379q03zqnb']:
        page.goto(BASE + '/blog/' + slug)
        page.locator('.content').scroll_into_view_if_needed()
        for embed in page.locator('.iframely-embed').all():
            embed.scroll_into_view_if_needed()
            page.wait_for_timeout(1500)
        page.wait_for_timeout(3000)
        cards = page.locator('.iframely-embed')
        assert cards.count() > 0, slug
        assert all(h > 50 for h in cards.evaluate_all('(es)=>es.map(e=>e.getBoundingClientRect().height)')), slug
        assert not failures, failures
        frames = page.locator('.content iframe')
        print(json.dumps({'article':slug,'iframes':frames.count(),'heights':frames.evaluate_all('(es)=>es.map(e=>Math.round(e.getBoundingClientRect().height))'),'errors':failures}, ensure_ascii=True))
        page.screenshot(path='test-results/real-' + slug + '.png', full_page=True)
    browser.close()
print('Serving checks passed at ' + BASE + ': 40 routes, noindex, headers, redirects, 404 and no-JS mobile layout.')
