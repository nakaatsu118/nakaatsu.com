"""Capture owned sites at identical viewports for migration visual comparison."""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path('test-results/design')
OUT.mkdir(parents=True, exist_ok=True)
SITES = {'original': 'https://www.nakaatsu.com', 'astro': os.environ.get('PREVIEW_URL', 'https://nakaatsu-site.nakaatsu-world.workers.dev')}
PAGES = {'home': '/', 'blog': '/blog', 'page2': '/blog/page/2', 'article': '/blog/iplay-80-mini-ultra', 'profile': '/profile', 'privacy': '/privacyPolicy', 'tables': '/blog/3b_i-nidttj', 'code': '/blog/lip7se2gqm_y', 'headings': '/blog/e1yq1j97i'}
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for site, base in SITES.items():
        if os.environ.get('CAPTURE_SITE') and os.environ['CAPTURE_SITE'] != site:
            continue
        for width in map(int, os.environ.get('CAPTURE_WIDTHS', '1440,390').split(',')):
            context = browser.new_context(viewport={'width': width, 'height': 1000 if width == 1440 else 844}, device_scale_factor=1)
            context.route('**/*', lambda r: r.abort() if any(s in r.request.url for s in ['googletagmanager.com', 'google-analytics.com', 'doubleclick.net']) else r.continue_())
            for name, path in PAGES.items():
                if os.environ.get('CAPTURE_PAGES') and name not in os.environ['CAPTURE_PAGES'].split(','):
                    continue
                page = context.new_page()
                page.goto(base + path, wait_until='networkidle')
                page.evaluate('document.fonts.ready')
                page.wait_for_timeout(1500)
                page.screenshot(path=str(OUT / f'{site}-{name}-{width}-top.png'))
                # Trigger lazy images/embeds before the steady-state screenshot.
                height = page.evaluate('document.body.scrollHeight')
                for y in range(0, height, 650):
                    page.evaluate('(y) => window.scrollTo({top:y, behavior:"instant"})', y)
                    page.wait_for_timeout(80)
                page.wait_for_timeout(1500)
                page.evaluate('window.scrollTo({top:0, behavior:"instant"})')
                page.wait_for_timeout(1000)
                # Neutralise transient entrance transforms only; compare final layouts.
                page.add_style_tag(content='[style*="transform"], [style*="opacity"] { transform: none !important; opacity: 1 !important; }')
                page.screenshot(path=str(OUT / f'{site}-{name}-{width}.png'), full_page=True)
                metrics = page.evaluate('''() => ({height: document.body.scrollHeight, width:document.documentElement.scrollWidth, fonts:document.fonts.status,
                  elements: [...document.querySelectorAll('h1,h2,h3,nav,footer,main,img')].map(e => {
                    const r=e.getBoundingClientRect(),s=getComputedStyle(e);
                    return {tag:e.tagName, text:e.textContent.trim().slice(0,100),alt:e.getAttribute('alt'),x:r.x,y:r.y,w:r.width,h:r.height,font:s.fontFamily,size:s.fontSize,line:s.lineHeight,color:s.color,bg:s.backgroundColor,radius:s.borderRadius};
                  })})''')
                (OUT / f'{site}-{name}-{width}.json').write_text(json.dumps(metrics,ensure_ascii=False,indent=2),encoding='utf-8')
                print(f'{site} {name} {width}: height={metrics["height"]}', flush=True)
                page.close()
            context.close()
    browser.close()
