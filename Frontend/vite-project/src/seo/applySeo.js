import { getHeadTags, NOT_FOUND_SEO } from './seoConfig';

const MANAGED_ATTR = 'data-seo';

export const applySeo = (pathname, { notFound = false } = {}) => {
  const { title, tags, jsonLd } = getHeadTags(pathname, notFound ? NOT_FOUND_SEO : undefined);
  const head = document.head;
  document.title = title;

  const keep = new Set();
  tags.forEach(({ tag, key, attrs }) => {
    const selector = `${tag}[${key}="${attrs[key]}"]`;
    let el = head.querySelector(selector);
    if (!el) {
      el = document.createElement(tag);
      head.appendChild(el);
    }
    Object.entries(attrs).forEach(([name, value]) => el.setAttribute(name, value));
    el.setAttribute(MANAGED_ATTR, '');
    keep.add(el);
  });

  head.querySelectorAll(`[${MANAGED_ATTR}]`).forEach((el) => {
    if (!keep.has(el) && el.id !== 'seo-jsonld') el.remove();
  });

  let script = head.querySelector('#seo-jsonld');
  if (jsonLd) {
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'seo-jsonld';
      script.setAttribute(MANAGED_ATTR, '');
      head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  } else if (script) {
    script.remove();
  }
};
