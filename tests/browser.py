"""Run after npm run build:fixtures and a local Wrangler server on port 8787."""
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:8787'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(java_script_enabled=False, viewport={"width": 390, "height": 844}, reduced_motion='reduce')
    # External content is not needed to test routing and HTML; no analytics requests.
    context.route('**/*', lambda route: route.continue_() if route.request.url.startswith(BASE) else route.abort())
    page = context.new_page()
    assert page.goto(BASE + '/blog/page/3').status == 200
    assert page.locator('.blog-card').count() == 2
    page.get_by_role('link', name='植物', exact=True).click()
    assert page.url == BASE + '/blog/category/plants'
    assert page.locator('.blog-card').count() == 9
    page.get_by_role('link', name='2ページ目', exact=True).click()
    assert page.locator('.blog-card').count() == 1
    page.reload()
    assert page.locator('.blog-card').count() == 1
    page.get_by_role('link', name='すべて', exact=True).click()
    assert page.url == BASE + '/blog'
    assert page.locator('.blog-card').count() == 9
    page.go_back()
    assert page.url == BASE + '/blog/category/plants/page/2'
    page.go_forward()
    assert page.url == BASE + '/blog'

    for path in ['/', '/profile', '/privacyPolicy', '/blog/fixture-1']:
        assert page.goto(BASE + path).status == 200
        assert page.locator('h1').count() == 1
        assert page.locator('main').is_visible()
        assert page.locator('meta[name="robots"]').get_attribute('content') == 'noindex, nofollow'
        assert page.locator('body').bounding_box()['width'] <= 390
    assert page.locator('.content h2').inner_text() == '本文の見出し'
    assert page.locator('.content script').count() == 0
    assert page.locator('[onerror]').count() == 0
    assert 'tag=fixture-22' in page.get_by_role('link', name='Amazonで確認する').get_attribute('href')
    assert page.locator('.disclosure').is_visible()
    assert 'undefined' not in page.locator('meta[property="og:image"]').get_attribute('content')
    Path('test-results').mkdir(exist_ok=True)
    page.screenshot(path='test-results/article-mobile.png', full_page=True)
    page.goto(BASE + '/blog')
    page.screenshot(path='test-results/blog-mobile.png', full_page=True)
    page.keyboard.press('Tab')
    assert page.get_by_role('link', name='本文へスキップ').evaluate('(e) => e === document.activeElement')
    page.set_viewport_size({"width": 1440, "height": 1000})
    page.screenshot(path='test-results/blog-desktop.png', full_page=True)

    for path in ['/missing', '/blog/page/0', '/blog/page/999', '/blog/category/missing', '/blog/fixture-missing']:
        assert page.goto(BASE + path).status == 404, path
    redirect = context.request.get(BASE + '/blog/page/1?source=test', max_redirects=0)
    assert redirect.status == 301
    assert '/blog' in redirect.headers['location']
    assert 'source=test' in redirect.headers['location']
    assert context.request.get(BASE + '/blog').headers['x-content-type-options'] == 'nosniff'
    assert 'Disallow: /' in context.request.get(BASE + '/robots.txt').text()
    context.close()
    browser.close()
print('Browser checks passed: no-JS navigation, history, mobile, metadata, sanitization, 301 and 404')
