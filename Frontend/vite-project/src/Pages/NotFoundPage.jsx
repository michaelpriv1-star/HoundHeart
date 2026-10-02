import React from 'react';
import { Link } from 'react-router-dom';

const HELPFUL_LINKS = [
  { to: '/#about-section', label: 'About HoundHeart™' },
  { to: '/#pricing-section', label: 'Pricing' },
  { to: '/about-us', label: 'About Us' },
  { to: '/help-center', label: 'Help Center' },
  { to: '/community-guidelines', label: 'Community Guidelines' },
  { to: '/login', label: 'Login/Register' },
];

const NotFoundPage = () => (
  <div className="min-h-[calc(100vh-73px)] bg-gray-50 flex flex-col">
    <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-2xl">
        <p className="text-6xl font-bold text-purple-600 mb-4">404</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page not found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn’t find the page you’re looking for. It may have moved, or the link may be incorrect.
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
        >
          Back to Home
        </Link>
        <nav aria-label="Helpful links" className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {HELPFUL_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </main>

    <footer className="bg-black text-white py-8">
      <p className="text-gray-300 text-sm text-center px-4">
        © {new Date().getFullYear()} HoundHeart™. All rights reserved. Heal the Bond, Not Just the Bark.
      </p>
    </footer>
  </div>
);

export default NotFoundPage;
