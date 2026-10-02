// Post-build step: renders the public pages to static HTML and writes the
// server config (serve.json), sitemap.xml, robots.txt and llms.txt into dist/.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, '.prerender');

// Browser globals the page components read during render (storage, window size, etc.).
const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
  url: 'https://www.houndheartwellness.com/',
  pretendToBeVisual: true,
});
const { window } = dom;
window.matchMedia = window.matchMedia || (() => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));
window.IntersectionObserver = window.IntersectionObserver || class { observe() {} unobserve() {} disconnect() {} };
window.scrollTo = () => {};
const globals = ['window', 'document', 'navigator', 'localStorage', 'sessionStorage', 'location', 'HTMLElement', 'Element', 'Node', 'getComputedStyle', 'matchMedia', 'IntersectionObserver', 'requestAnimationFrame', 'cancelAnimationFrame'];
for (const key of globals) {
  const value = key === 'window' ? window : window[key];
  Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
}

const {
  render, getHeadTags, SITE_URL, PUBLIC_PAGES, NOT_FOUND_SEO, APP_ROUTES, SITE_SUMMARY, SUPPORT_EMAIL, FEATURES,
} = await import(pathToFileURL(path.join(ssrDir, 'entry-prerender.js')).href);

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const headHtml = ({ tags, jsonLd }) => {
  const lines = tags.map(({ tag, attrs }) => {
    const attrString = Object.entries(attrs).map(([k, v]) => `${k}="${escapeHtml(v)}"`).join(' ');
    return `<${tag} ${attrString} data-seo />`;
  });
  if (jsonLd) {
    const json = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
    lines.push(`<script type="application/ld+json" id="seo-jsonld" data-seo>${json}</script>`);
  }
  return lines.map((l) => `    ${l}`).join('\n');
};

// Clears prerendered markup if this file is ever served for a different URL
// (e.g. an SPA fallback), so the client doesn't flash the wrong page.
const guardScript = (pagePath) => `<script>(function(){var p=location.pathname.replace(/\\/+$/,'')||'/';if(p!==${JSON.stringify(pagePath)}){document.getElementById('root').innerHTML='';}})();</script>`;

const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('dist/index.html is missing <div id="root"></div>');

const buildPage = ({ head, body = '', guardPath }) => template
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(head.title)}</title>\n${headHtml(head)}`)
  .replace('<div id="root"></div>', `<div id="root">${body}</div>${guardPath ? guardScript(guardPath) : ''}`);

const fileFor = (pagePath) => (pagePath === '/' ? 'index.html' : `${pagePath.slice(1)}.html`);

for (const pagePath of Object.keys(PUBLIC_PAGES)) {
  const html = buildPage({ head: getHeadTags(pagePath), body: render(pagePath), guardPath: pagePath });
  await fs.writeFile(path.join(distDir, fileFor(pagePath)), html);
  console.log(`prerendered ${pagePath} -> ${fileFor(pagePath)}`);
}

await fs.writeFile(path.join(distDir, 'app.html'), buildPage({ head: getHeadTags('/app') }));
await fs.writeFile(path.join(distDir, '404.html'), buildPage({ head: getHeadTags('/404', NOT_FOUND_SEO), body: render('/404') }));

const serveConfig = {
  cleanUrls: true,
  trailingSlash: false,
  redirects: [{ source: '/index', destination: '/', type: 301 }],
  rewrites: APP_ROUTES.map((route) => ({ source: route, destination: '/app.html' })),
  headers: [
    { source: 'assets/**', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    { source: '**/*.@(mp4|webp|jpg|png|svg)', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }] },
  ],
};
await fs.writeFile(path.join(distDir, 'serve.json'), `${JSON.stringify(serveConfig, null, 2)}\n`);

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.entries(PUBLIC_PAGES).map(([p, page]) => `  <url>
    <loc>${SITE_URL}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemap);

// AI search and assistant crawlers are named explicitly so the site's intent to be
// cited by them is unambiguous; the wildcard group already allows everyone else.
const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot',
];
await fs.writeFile(path.join(distDir, 'robots.txt'), `User-agent: *
Allow: /

${AI_CRAWLERS.map((bot) => `User-agent: ${bot}`).join('\n')}
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);

const llms = `# HoundHeart™

> ${SITE_SUMMARY} Tagline: "Heal the Bond, Not Just the Bark."

HoundHeart™ is a web app (houndheartwellness.com). Members create a profile for themselves and their dog(s), then use guided practices, tracking and community features together.

## Main pages

${Object.entries(PUBLIC_PAGES).map(([p, page]) => `- [${page.title}](${SITE_URL}${p}): ${page.description}`).join('\n')}

## Features

${FEATURES.map(({ name, description }) => `- ${name}: ${description}`).join('\n')}

## Membership

- Free Member: account, dog profiles, basic platform access, newsletters and announcements, purchase books and merchandise.
- HoundHeart Plus: everything in Free, plus full platform access, full Bonded Score access, mind-body health tracking tools, a free digital book and audiobook, travel directory access, partner discounts and wearable connection. Monthly or yearly.
- HoundHeart Premium: everything in Plus, plus an autographed paperback HoundHeart book, an official HoundHeart T-shirt, partner discounts on travel, hotels and vacations, and a Premium Member badge. Yearly only.
- Founding Members: the first 1,000 members lock in a discounted price for life while subscribed and receive a permanent Founding Member badge.

Current pricing: ${SITE_URL}/#pricing-section

## Science and sources

The Help Center summarises research and public guidance on the health benefits of dog ownership, including work by Mayo Clinic physicians (Dr. Edward T. Creagan, Dr. Francisco Lopez-Jimenez, Dr. Nicholas Breiten and Dr. Mohamed Gouda) and statements from the American Heart Association, Mayo Clinic and Harvard Health: ${SITE_URL}/help-center

HoundHeart™ insights are for wellness support and are not a substitute for veterinary or medical care.

## Contact

- Support: ${SUPPORT_EMAIL}
- Help Center: ${SITE_URL}/help-center
`;
await fs.writeFile(path.join(distDir, 'llms.txt'), llms);

await fs.rm(ssrDir, { recursive: true, force: true });
console.log('prerender complete');
