import React, { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

export {
  SITE_URL, PUBLIC_PAGES, NOT_FOUND_SEO, SITE_SUMMARY, SUPPORT_EMAIL, FEATURES, getHeadTags,
} from './seo/seoConfig';
export { APP_ROUTES } from './seo/routes';

// Same tree as main.jsx, so the browser can hydrate the HTML instead of re-rendering it.
export const render = (path) => renderToString(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App RouterComponent={StaticRouter} routerProps={{ location: path }} />
    </GoogleOAuthProvider>
  </StrictMode>,
);
