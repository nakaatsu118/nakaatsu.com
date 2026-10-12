export const PAGE_SIZE = 9;
export const canonicalPath = (pathname) =>
  pathname === '/index.html'
    ? '/'
    : pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
export const blogPath = (id) => `/blog/${encodeURIComponent(id)}`;
export const categoryPath = (id) => `/blog/category/${encodeURIComponent(id)}`;
export function pagePath(base, page) {
  if (!Number.isSafeInteger(page) || page < 1)
    throw new Error('Invalid page number');
  return page === 1 ? base : `${base}/page/${page}`;
}

export function listingPages(blogs) {
  const categories = [
    ...new Map(
      blogs
        .filter((blog) => blog.category)
        .map((blog) => [blog.category.id, blog.category]),
    ).values(),
  ];
  const groups = [
    { category: undefined, blogs },
    ...categories.map((category) => ({
      category,
      blogs: blogs.filter((blog) => blog.category?.id === category.id),
    })),
  ];
  return groups.flatMap(({ category, blogs: matching }) => {
    const count = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
    const base = category ? categoryPath(category.id) : '/blog';
    return Array.from({ length: count }, (_, index) => ({
      path: pagePath(base, index + 1),
      category,
      categories,
      current: index + 1,
      count,
      total: matching.length,
      base,
      blogs: matching.slice(index * PAGE_SIZE, (index + 1) * PAGE_SIZE),
    }));
  });
}

export function imageUrl(image, width, height) {
  if (!image) return '/images/og_image.png';
  const url = new URL(image.url);
  if (url.hostname === 'images.microcms-assets.io') {
    url.searchParams.set('w', String(width));
    url.searchParams.set('auto', 'format');
    if (height) {
      url.searchParams.set('h', String(height));
      url.searchParams.set('fit', 'crop');
    }
  }
  return url.href;
}

export const formatDate = (date) =>
  new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Tokyo',
  }).format(new Date(date));
