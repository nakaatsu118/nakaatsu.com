import sanitizeHtml from 'sanitize-html';
import { parseFragment } from 'parse5';

/** Decode HTML entities once when deriving text-only metadata from sanitized HTML. */
export function contentDescription(html) {
  const text = (node) =>
    node.nodeName === '#text'
      ? node.value
      : (node.childNodes || []).map(text).join(' ');
  return text(parseFragment(html)).replace(/\s+/g, ' ').trim().slice(0, 160);
}

const embedHosts = [
  'www.youtube.com',
  'www.youtube-nocookie.com',
  'player.vimeo.com',
  'cdn.iframe.ly',
  'iframe.ly',
  'iframely.net',
];
const amazonHosts = ['amazon.co.jp', 'www.amazon.co.jp', 'amzn.to'];

function isHttpsHost(value, hosts) {
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      (!url.port || url.port === '443') &&
      hosts.includes(url.hostname)
    );
  } catch {
    return false;
  }
}

/** Sanitize CMS HTML at build time, before passing it to a template. */
export function sanitizeContent(html) {
  return sanitizeHtml(html, {
    allowedTags: [
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'br',
      'hr',
      'div',
      'span',
      'strong',
      'b',
      'em',
      'i',
      'u',
      's',
      'small',
      'sub',
      'sup',
      'blockquote',
      'pre',
      'code',
      'ul',
      'ol',
      'li',
      'a',
      'img',
      'figure',
      'figcaption',
      'table',
      'caption',
      'thead',
      'tbody',
      'tfoot',
      'tr',
      'th',
      'td',
      'iframe',
      'ruby',
      'rt',
      'rp',
    ],
    allowedAttributes: {
      h2: ['class'],
      a: ['href', 'title', 'target', 'rel', 'data-iframely-url'],
      img: ['src', 'alt', 'width', 'height', 'loading', 'decoding'],
      iframe: [
        'src',
        'title',
        'width',
        'height',
        'loading',
        'allowfullscreen',
        'referrerpolicy',
      ],
      div: ['class'],
      code: ['class'],
      th: ['colspan', 'rowspan', 'scope'],
      td: ['colspan', 'rowspan'],
      ol: ['start'],
    },
    allowedClasses: {
      h2: ['cms-title'],
      div: ['iframely-embed', 'iframely-responsive'],
      code: ['language-*'],
    },
    allowedSchemes: ['https', 'http', 'mailto'],
    allowedSchemesByTag: { img: ['https'], iframe: ['https'] },
    allowProtocolRelative: false,
    allowedIframeHostnames: embedHosts,
    allowIframeRelativeUrls: false,
    transformTags: {
      // Preserve the original title appearance while keeping one page-level h1.
      h1: () => ({ tagName: 'h2', attribs: { class: 'cms-title' } }),
      a(tagName, attribs) {
        const attrs = { ...attribs };
        if (attrs['data-iframely-url']?.startsWith('//')) {
          attrs['data-iframely-url'] = `https:${attrs['data-iframely-url']}`;
        }
        if (
          !isHttpsHost(attrs['data-iframely-url'], [
            'cdn.iframe.ly',
            'iframe.ly',
            'iframely.net',
          ])
        ) {
          delete attrs['data-iframely-url'];
        }
        attrs.rel = isHttpsHost(attrs.href, amazonHosts)
          ? 'sponsored noopener noreferrer'
          : 'noopener noreferrer';
        if (attrs.target !== '_blank') delete attrs.target;
        return { tagName, attribs: attrs };
      },
      img: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          alt: attribs.alt || '',
          loading: 'lazy',
          decoding: 'async',
        },
      }),
      iframe(tagName, attribs) {
        const attrs = {
          ...attribs,
          loading: 'lazy',
          referrerpolicy: 'strict-origin-when-cross-origin',
        };
        if (!isHttpsHost(attrs.src, embedHosts)) delete attrs.src;
        if (!attrs.title) attrs.title = '埋め込みコンテンツ';
        return { tagName, attribs: attrs };
      },
    },
    exclusiveFilter: (frame) => frame.tag === 'iframe' && !frame.attribs.src,
  });
}
