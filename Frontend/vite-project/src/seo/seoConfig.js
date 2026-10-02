export const SITE_URL = 'https://www.houndheartwellness.com';
export const SITE_NAME = 'HoundHeart™';
export const OG_IMAGE = { url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 675 };
export const LOGO_URL = `${SITE_URL}/houndheart-logo.png`;

export const HERO_VIDEO = {
  name: 'HoundHeart™ – Heal the Bond, Not Just the Bark',
  description: 'An introduction to HoundHeart™ and the emotional and physical health benefits of the human–dog bond.',
  contentUrl: `${SITE_URL}/houndheart-video.mp4`,
  thumbnailUrl: `${SITE_URL}/og-image.jpg`,
  uploadDate: '2026-08-04T12:56:23+05:30',
  duration: 'PT2M13S',
};

// Indexable public pages. Order is used for the sitemap.
export const PUBLIC_PAGES = {
  '/': {
    title: 'HoundHeart™ | Human–Dog Bond Wellness App & Community',
    description: 'Unlock the health benefits of the human–dog bond with guided Nerve Center practices, Bonded Score tracking, personalized insights and a supportive community.',
    changefreq: 'weekly',
    priority: '1.0',
  },
  '/about-us': {
    title: 'About HoundHeart™ | Our Mission for the Human–Dog Bond',
    breadcrumb: 'About Us',
    description: 'Learn about HoundHeart™, our philosophy and our mission to help people and their dogs thrive together through science, mindful practices and shared experiences.',
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/help-center': {
    title: 'Help Center & FAQs | HoundHeart™',
    breadcrumb: 'Help Center',
    description: 'Find answers, get support and learn more about HoundHeart™, including membership, account questions and guidance for you and your dog.',
    changefreq: 'monthly',
    priority: '0.7',
  },
  '/community-guidelines': {
    title: 'Community Guidelines | HoundHeart™',
    breadcrumb: 'Community Guidelines',
    description: 'How we keep the HoundHeart™ community safe, kind and supportive: the guidelines every member follows when connecting with other dog lovers.',
    changefreq: 'yearly',
    priority: '0.5',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | HoundHeart™',
    breadcrumb: 'Privacy Policy',
    description: 'How HoundHeart™ collects, uses, shares and protects your personal information, and the choices and rights you have over your data.',
    changefreq: 'yearly',
    priority: '0.3',
  },
  '/terms-of-use': {
    title: 'Terms of Use | HoundHeart™',
    breadcrumb: 'Terms of Use',
    description: 'The terms that govern your use of HoundHeart™, including eligibility, accounts, subscriptions and payments, intellectual property and termination.',
    changefreq: 'yearly',
    priority: '0.3',
  },
};

const APP_SEO = {
  title: SITE_NAME,
  description: PUBLIC_PAGES['/'].description,
  robots: 'noindex, nofollow',
};

export const NOT_FOUND_SEO = {
  title: `Page Not Found | ${SITE_NAME}`,
  description: 'The page you are looking for could not be found.',
  robots: 'noindex, follow',
};

export const normalizePath = (pathname) => (pathname.replace(/\/+$/, '') || '/');

export const getSeo = (pathname) => {
  const path = normalizePath(pathname);
  const page = PUBLIC_PAGES[path];
  if (!page) return { path, ...APP_SEO };
  return {
    path,
    ...page,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    canonical: `${SITE_URL}${path === '/' ? '/' : path}`,
  };
};

export const SITE_SUMMARY = 'HoundHeart™ is a wellness platform for people and their dogs. It helps members unlock the emotional and physical health benefits of the human–dog bond through guided Nerve Center practices, Bonded Score tracking, personalized insights and a supportive community.';

export const SUPPORT_EMAIL = 'support@houndheartwellness.com';

// Feature names and descriptions as shown on the home page.
export const FEATURES = [
  { name: 'Bonded Score™', description: 'Measure and strengthen the connection you share with your dog through guided activities, health tracking, and personalized insights.' },
  { name: 'Nerve Center Exercises', description: 'Practice guided breathing, mindfulness, and co-regulation exercises designed to help calm both you and your dog.' },
  { name: 'Legacy Journal', description: 'Capture special moments, write letters to your dog, and preserve the story of your journey together for years to come.' },
  { name: 'Community Center', description: 'Connect with fellow HoundHeart™ members, share experiences, learn from others, and participate in live discussions and events.' },
  { name: 'Health Insights', description: 'Receive personalized insights that identify health patterns, track progress, and recommend activities to strengthen the human–dog bond.' },
  { name: 'Science Center', description: 'Explore the latest research on nervous system co-regulation, oxytocin, cortisol, heart rate variability, and the growing science behind the health benefits of the human–dog bond.' },
];

const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'HoundHeart',
  alternateName: ['HoundHeart™', 'HoundHeart Wellness'],
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: LOGO_URL, width: 512, height: 512 },
  slogan: 'Heal the Bond, Not Just the Bark',
  description: SITE_SUMMARY,
  email: SUPPORT_EMAIL,
  contactPoint: [{
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: SUPPORT_EMAIL,
    url: `${SITE_URL}/help-center`,
    availableLanguage: ['English'],
  }],
  knowsAbout: [
    'Human–dog bond',
    'Dog wellness',
    'Animal-assisted therapy',
    'Nervous system co-regulation',
    'Mindfulness and breathing practices with dogs',
    'Health benefits of dog ownership',
  ],
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'HoundHeart™',
  url: `${SITE_URL}/`,
  inLanguage: 'en-US',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export const getStructuredData = (pathname) => {
  const seo = getSeo(pathname);
  if (!seo.canonical) return null;

  const webPage = {
    '@type': seo.path === '/about-us' ? ['WebPage', 'AboutPage'] : 'WebPage',
    '@id': `${seo.canonical}#webpage`,
    url: seo.canonical,
    name: seo.title,
    description: seo.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE.url },
  };

  const graph = [organization, website, webPage];

  if (seo.breadcrumb) {
    webPage.breadcrumb = { '@id': `${seo.canonical}#breadcrumb` };
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${seo.canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: seo.breadcrumb, item: seo.canonical },
      ],
    });
  }

  if (seo.path === '/') {
    graph.push({
      '@type': 'VideoObject',
      '@id': `${SITE_URL}/#video`,
      ...HERO_VIDEO,
      publisher: { '@id': `${SITE_URL}/#organization` },
    });
    graph.push({
      '@type': 'WebApplication',
      '@id': `${SITE_URL}/#app`,
      name: 'HoundHeart™',
      url: `${SITE_URL}/`,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Web',
      description: seo.description,
      featureList: FEATURES.map(({ name, description }) => `${name}: ${description}`),
      publisher: { '@id': `${SITE_URL}/#organization` },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '0',
        highPrice: '149.99',
        offerCount: 3,
      },
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};

// Tag list shared by the build-time prerender and client-side navigation.
export const getHeadTags = (pathname, seoOverride) => {
  const seo = seoOverride || getSeo(pathname);
  const url = seo.canonical;
  const tags = [
    { tag: 'meta', key: 'name', attrs: { name: 'description', content: seo.description } },
    { tag: 'meta', key: 'name', attrs: { name: 'robots', content: seo.robots } },
  ];
  if (url) {
    tags.push(
      { tag: 'link', key: 'rel', attrs: { rel: 'canonical', href: url } },
      { tag: 'meta', key: 'property', attrs: { property: 'og:type', content: 'website' } },
      { tag: 'meta', key: 'property', attrs: { property: 'og:site_name', content: SITE_NAME } },
      { tag: 'meta', key: 'property', attrs: { property: 'og:locale', content: 'en_US' } },
      { tag: 'meta', key: 'property', attrs: { property: 'og:title', content: seo.title } },
      { tag: 'meta', key: 'property', attrs: { property: 'og:description', content: seo.description } },
      { tag: 'meta', key: 'property', attrs: { property: 'og:url', content: url } },
      { tag: 'meta', key: 'property', attrs: { property: 'og:image', content: OG_IMAGE.url } },
      { tag: 'meta', key: 'property', attrs: { property: 'og:image:width', content: String(OG_IMAGE.width) } },
      { tag: 'meta', key: 'property', attrs: { property: 'og:image:height', content: String(OG_IMAGE.height) } },
      { tag: 'meta', key: 'property', attrs: { property: 'og:image:alt', content: 'HoundHeart™ – Heal the Bond, Not Just the Bark' } },
      { tag: 'meta', key: 'name', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      { tag: 'meta', key: 'name', attrs: { name: 'twitter:title', content: seo.title } },
      { tag: 'meta', key: 'name', attrs: { name: 'twitter:description', content: seo.description } },
      { tag: 'meta', key: 'name', attrs: { name: 'twitter:image', content: OG_IMAGE.url } },
    );
  }
  return { title: seo.title, tags, jsonLd: seoOverride ? null : getStructuredData(pathname) };
};
