import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HoundHeartLogo from '../assets/images/Houndheart_logo.svg';

const CommunityGuidelinesPage = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleFooterNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 border-2 border-purple-500">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="8" cy="6" r="2"/>
                <path d="M8 9c-1.5 0-3 0.5-3 2.5v3h6v-3c0-2-1.5-2.5-3-2.5z"/>
                <circle cx="16" cy="6" r="2"/>
                <path d="M16 9c-1.5 0-3 0.5-3 2.5v3h6v-3c0-2-1.5-2.5-3-2.5z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Community Guidelines</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Welcome to the HoundHeart™ community! Our intention is to deepen the bond between humans and their dogs through connection, energy awareness, and wellness tools.
          </p>
        </div>

        {/* Guidelines Cards */}
        <div className="space-y-6">
          {/* Creating a Safe & Supportive Community */}
          <div className="bg-pink-50 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Creating a Safe & Supportive Community</h2>
            <p className="text-gray-700 leading-relaxed">
              To keep this community safe and supportive for all members on their spiritual journey with their dogs, we ask that all users follow these simple guidelines.
            </p>
          </div>

          {/* Guideline 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0 break-words">
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Be Kind & Respectful</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Treat fellow users, their dogs, and our team with respect.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    No bullying, harassment, or hate speech - treat people as pets.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Constructive discussion is encouraged, personal attacks are not.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Guideline 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0 break-words">
                <h3 className="text-xl font-bold text-gray-900 mb-4">2. Keep it Safe</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Do not post or share harmful, unsafe, or illegal content.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    No promotion of pirated drugs, neglect, or unsafe training practices.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Respect privacy - don't share someone else's personal information without permission.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Guideline 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0 break-words">
                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Stay Honest</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Share genuine experience and stay true to the best of your ability.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Do not impersonate others or provide false information that could harm pets or people.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Be authentic in your spiritual journey and energy work practices.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Guideline 4 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="8" cy="6" r="2"/>
                  <path d="M8 9c-1.5 0-3 0.5-3 2.5v3h6v-3c0-2-1.5-2.5-3-2.5z"/>
                  <circle cx="16" cy="6" r="2"/>
                  <path d="M16 9c-1.5 0-3 0.5-3 2.5v3h6v-3c0-2-1.5-2.5-3-2.5z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0 break-words">
                <h3 className="text-xl font-bold text-gray-900 mb-4">4. Respect the Spirit of HoundHeart™</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    This is a wellness and connection platform - not a place for spam, unsolicited ads, or disruptive behavior.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    No unauthorized marketing, self-promotion, or solicitation without our written permission.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Honor the sacred bond between humans and dogs in all interactions.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Guideline 5 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0 break-words">
                <h3 className="text-xl font-bold text-gray-900 mb-4">5. Be Mindful of Wellness Content</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Remember HoundHeart™ insights are for wellness support, not a substitute for veterinary or medical care.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Encourage others to consult a vet or doctor when appropriate.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Share energy practices and spiritual insights responsibly.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Guideline 6 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                  <line x1="4" y1="22" x2="4" y2="15"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0 break-words">
                <h3 className="text-xl font-bold text-gray-900 mb-4">6. Report Violations</h3>
                <p className="text-gray-700 mb-4">
                  If you see harmful behavior, unsafe content, or anything that goes against these guidelines, please report it to us immediately.
                </p>
                <p className="text-purple-600 font-bold mb-4">Report via: <a href="mailto:community@houndheartwellness.com">community@houndheartwellness.com</a></p>
                <p className="text-gray-700">
                  Include as much detail as possible to help us address the issue quickly and effectively.
                </p>
              </div>
            </div>
          </div>

          {/* Guidelines 7 & 8 - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guideline 7 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">7. Consequences</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Users who violate these guidelines may have their content removed, accounts suspended, or access revoked.
              </p>
              <p className="text-gray-700">
                We believe in second chances, but the safety of our community comes first.
              </p>
            </div>

            {/* Guideline 8 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">8. Our Commitment</h3>
              </div>
              <p className="text-gray-700 mb-4">
                We are committed to creating a safe, positive space for humans and dogs to thrive together.
              </p>
              <p className="text-gray-700">
                These guidelines help make that possible for everyone in our community.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Thank You for Being Part of HoundHeart™</h2>
          <p className="text-lg mb-6 leading-relaxed">
            Together, we're building a community where the sacred bond between humans and dogs can flourish. Your mindful participation helps create a space of healing, growth, and unconditional love.
          </p>
          <p className="text-pink-100">
            Questions about these guidelines? Email us at{' '}
            <a href="mailto:community@houndheartwellness.com" className="text-white font-semibold hover:underline">
              community@houndheartwellness.com
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 mb-8">
            {/* Left Section - Branding and Social */}
            <div className="space-y-4">
              {/* Logo and Brand */}
              <Link to="/" onClick={(e) => { e.preventDefault(); handleBackToHome(); }} className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-18 h-18  rounded-full flex items-center justify-center">
                  <img src={HoundHeartLogo} alt="HoundHeart Logo" className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">HoundHeart™</div>
                  <p className="text-gray-300 text-sm">Heal the Bond, Not Just the Bark</p>
                </div>
              </Link>

            </div>

            {/* Right Side - Company and Support Links */}
            <div className="flex space-x-12">
              {/* Company Links */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Company</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><Link to="/about-us" onClick={(e) => { e.preventDefault(); handleFooterNavigation('/about-us'); }} className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/privacy-policy" onClick={(e) => { e.preventDefault(); handleFooterNavigation('/privacy-policy'); }} className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms-of-use" onClick={(e) => { e.preventDefault(); handleFooterNavigation('/terms-of-use'); }} className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h4 className="font-semibold mb-4 text-white">Support</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><Link to="/help-center" onClick={(e) => { e.preventDefault(); handleFooterNavigation('/help-center'); }} className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link to="/community" onClick={(e) => { e.preventDefault(); handleFooterNavigation('/community'); }} className="hover:text-white transition-colors">Healing Circles</Link></li>
                  <li><Link to="/community-guidelines" onClick={(e) => { e.preventDefault(); handleFooterNavigation('/community-guidelines'); }} className="hover:text-white transition-colors">Community Guidelines</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="border-t border-gray-600 mb-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} HoundHeart™. All rights reserved. Heal the Bond, Not Just the Bark.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" onClick={(e) => { e.preventDefault(); handleFooterNavigation('/privacy-policy'); }} className="text-gray-300 hover:text-white text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommunityGuidelinesPage;
