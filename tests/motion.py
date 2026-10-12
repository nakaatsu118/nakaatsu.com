"""Motion regressions against fixture or deployed HTML with JS enabled."""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ.get('PREVIEW_URL', 'http://127.0.0.1:8787').rstrip('/')

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1280, 'height': 900}, reduced_motion='no-preference')
    context.route('**/*', lambda route: route.continue_() if route.request.url.startswith(BASE) else route.abort())
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    # Record real animation frames, including animations shorter than navigation waits.
    page.add_init_script("""window.motionFrames = [];
      function sample() {
        for (const selector of ['.hero', '.profile img', '.blog-grid > li', '.history > div', '.works > li']) {
          const element = document.querySelector(selector);
          if (element && getComputedStyle(element).transform !== 'none') {
            window.motionFrames.push({selector, transform: getComputedStyle(element).transform});
          }
        }
        requestAnimationFrame(sample);
      }
      requestAnimationFrame(sample);""")
    page.goto(BASE + '/')
    page.wait_for_function("window.motionFrames.some(f => f.selector === '.hero' && f.transform !== 'matrix(1, 0, 0, 1, 0, 0)')")
    page.wait_for_timeout(1500)
    social = page.locator('.social a').first
    social.hover()
    page.wait_for_function("new DOMMatrix(getComputedStyle(document.querySelector('.social a')).transform).a > 1.15")
    page.mouse.move(0, 0)
    page.locator('.share-link').hover()
    page.wait_for_function("new DOMMatrix(getComputedStyle(document.querySelector('.share-link')).transform).a > 1.08")
    page.mouse.move(0, 0)
    card = page.locator('.blog-card').first
    card.scroll_into_view_if_needed()
    page.wait_for_function("window.motionFrames.some(f => f.selector === '.blog-grid > li')")
    page.wait_for_timeout(1500)
    card.hover()
    page.wait_for_function("new DOMMatrix(getComputedStyle(document.querySelector('.blog-card')).transform).a > 1.03")
    page.mouse.down()
    page.wait_for_function("new DOMMatrix(getComputedStyle(document.querySelector('.blog-card')).transform).a < 0.95")
    page.mouse.move(0, 0)
    page.mouse.up()
    page.wait_for_timeout(500)
    page.goto(BASE + page.locator(".blog-card").first.get_attribute("href"))
    page.evaluate("window.scrollTo({top: document.body.scrollHeight, behavior: 'instant'})")
    page.wait_for_function("new DOMMatrix(getComputedStyle(document.querySelector('.scroll-progress')).transform).a > 0.95")
    page.goto(BASE + '/profile')
    page.wait_for_function("window.motionFrames.some(f => f.selector === '.profile img')")
    page.locator('.history').scroll_into_view_if_needed()
    page.wait_for_function("window.motionFrames.some(f => f.selector === '.history > div')")
    page.locator('.works').scroll_into_view_if_needed()
    page.wait_for_function("window.motionFrames.some(f => f.selector === '.works > li')")
    page.wait_for_timeout(1500)
    page.locator('.work-card').first.hover()
    page.wait_for_function("new DOMMatrix(getComputedStyle(document.querySelector('.work-card')).transform).a > 1.03")
    Path('test-results').mkdir(exist_ok=True)
    page.screenshot(path='test-results/motion-profile.png', full_page=True)
    # Preference changes must stop JS-driven animations too, not merely CSS transitions.
    page.emulate_media(reduced_motion='reduce')
    page.wait_for_function("document.querySelector('.scroll-progress').hidden")
    assert page.locator('.profile img').evaluate("e => getComputedStyle(e).transform") == 'none'
    page.goto(BASE + '/')
    page.wait_for_load_state('networkidle')
    assert page.locator('.hero').evaluate("e => getComputedStyle(e).transform") == 'none'
    assert page.locator('main').evaluate("e => getComputedStyle(e).opacity") == '1'
    page.locator('.social a').first.hover()
    page.wait_for_timeout(300)
    assert page.locator('.social a').first.evaluate("e => getComputedStyle(e).transform") == 'none'
    page.emulate_media(reduced_motion='no-preference')
    page.set_viewport_size({'width': 390, 'height': 844})
    page.goto(BASE + '/')
    page.wait_for_function("window.motionFrames.some(f => f.selector === '.hero')")
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    page.wait_for_timeout(1500)
    page.locator('.blog-card').first.scroll_into_view_if_needed()
    page.wait_for_timeout(1500)
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    page.screenshot(path='test-results/motion-mobile.png', full_page=True)
    assert not errors, errors
    context.close()
    browser.close()
print('Framer Motion checks passed: entrances, hover/press, scroll progress, reduced motion, no JS errors')
