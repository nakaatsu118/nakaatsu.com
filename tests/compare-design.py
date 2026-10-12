"""Compare steady-state geometry captured by capture-design.py on both sites."""
import json
from pathlib import Path

root = Path('test-results/design')
results = []
for original in sorted(root.glob('original-*.json')):
    migrated = original.with_name(original.name.replace('original-', 'astro-', 1))
    if not migrated.exists():
        continue
    before = json.loads(original.read_text(encoding='utf-8'))
    after = json.loads(migrated.read_text(encoding='utf-8'))
    # Semantic nav/footer and heading levels differ; compare the visible content.
    left = [e for e in before['elements'] if e['tag'] not in ['NAV', 'MAIN', 'FOOTER']]
    right = [e for e in after['elements'] if e['tag'] not in ['NAV', 'MAIN', 'FOOTER']]
    differences = []
    for key in ['width', 'height']:
        if abs(before[key] - after[key]) > 1:
            differences.append({'page': key, 'before': before[key], 'after': after[key]})
    if len(left) != len(right):
        differences.append({'count': [len(left), len(right)]})
    for index, (a, b) in enumerate(zip(left, right)):
        for key in ['x', 'y', 'w', 'h', 'font', 'size', 'line', 'bg', 'radius']:
            different = abs(a[key] - b[key]) > 1 if isinstance(a[key], (int, float)) else a[key] != b[key]
            if different:
                differences.append({'element': index, 'property': key, 'before': a[key], 'after': b[key]})
        if a['tag'] != 'IMG' and a['color'] != b['color']:
            differences.append({'element': index, 'property': 'color'})
    results.append({'capture': original.stem.removeprefix('original-'), 'elements': len(left), 'differences': differences})
(root / 'comparison.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
assert results, 'Capture both sites first'
failures = [r for r in results if r['differences']]
assert not failures, json.dumps(failures, ensure_ascii=True)
print(f'Design geometry matched: {len(results)} page/viewports, {sum(r["elements"] for r in results)} headings/images (1px tolerance).')
