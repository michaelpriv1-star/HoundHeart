import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HoundHeartLogo from '../assets/images/Houndheart_logo.svg';
import aboutHero640 from '../assets/images/about/about-hero-640.webp';
import aboutHero1080 from '../assets/images/about/about-hero-1080.webp';
import aboutHero1600 from '../assets/images/about/about-hero-1600.webp';
import aboutHero2070 from '../assets/images/about/about-hero-2070.webp';
import aboutStory480 from '../assets/images/about/about-story-480.webp';
import aboutStory768 from '../assets/images/about/about-story-768.webp';
import aboutStory1000 from '../assets/images/about/about-story-1000.webp';

const ABOUT_HERO_SRCSET = `${aboutHero640} 640w, ${aboutHero1080} 1080w, ${aboutHero1600} 1600w, ${aboutHero2070} 2070w`;
const ABOUT_STORY_SRCSET = `${aboutStory480} 480w, ${aboutStory768} 768w, ${aboutStory1000} 1000w`;

const AboutUsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('aboutus');

  const handleFooterNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Banner */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <img 
          src={aboutHero1600}
          srcSet={ABOUT_HERO_SRCSET}
          sizes="100vw"
          width="2070"
          height="1380"
          fetchPriority="high"
          alt="Man with dog in nature" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Title Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-800">About HoundHeart™</h1>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-purple-600 max-w-4xl mx-auto">
            {activeTab === 'aboutus' 
              ? "Your dog's best friend's companion - your dog is in safe, loving hands."
              : "Discover the power of energetic harmony with your dog."
            }
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('aboutus')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'aboutus'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About Us
            </button>
            {/* <button
              onClick={() => setActiveTab('about')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'about'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </button> */}
          </div>
        </div>

        {/* About Us Tab Content */}
        {activeTab === 'aboutus' && (
          <>
            {/* Our Story Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <div className="relative flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <div className="absolute -left-2 top-0 w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="absolute -left-3 top-2 w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Story</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                HoundHeart™ is a first-of-its-kind companion focused on healing the bond and spiritual connection between humans and their dogs. 
                Born from our founder's personal journey with their beloved dog Misha, we understand the profound impact that a deep, 
                meaningful relationship with your canine companion can have on both your lives. Our mission is to help you and your dog 
                thrive together through innovative wellness practices and mindful connection.
              </p>
            </div>
            <div className="w-full lg:w-96 flex-shrink-0">
              <img 
                src={aboutStory1000}
                srcSet={ABOUT_STORY_SRCSET}
                sizes="(min-width: 1024px) 384px, 100vw"
                width="1000"
                height="1250"
                loading="lazy"
                decoding="async"
                alt="Hand touching dog's head" 
                className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Mission, Vision, Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Our Mission Card */}
          <div className="bg-purple-50 rounded-xl p-6 sm:p-8 border border-purple-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base">To help humans and dogs develop deeper, more meaningful connections through wellness practices</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base">Through intuitive technology and mindful practices, we enhance the bond between you and your canine companion</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base">Although animal-assisted therapy is not a substitute for professional medical care, we believe in the healing power of the human-animal bond</span>
              </li>
            </ul>
          </div>

          {/* Our Vision Card */}
          <div className="bg-pink-50 rounded-xl p-6 sm:p-8 border border-pink-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base">We aspire to create a world where every human-dog relationship is nurtured and celebrated</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base">To be the leading platform for canine wellness and human-animal connection</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base">To foster a world where the bond between humans and dogs is recognized as a source of healing and joy</span>
              </li>
            </ul>
          </div>

          {/* Our Philosophy Card */}
          <div className="bg-orange-50 rounded-xl p-6 sm:p-8 border border-orange-200">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Our Philosophy</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base">We believe in the transformative power of the human-animal bond</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base">Every interaction with your dog is an opportunity for mutual growth and healing</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base">Our approach is holistic, combining technology with mindfulness and compassion</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 sm:p-12 text-center mb-8 sm:mb-12">
          <p className="text-white text-lg sm:text-xl lg:text-2xl font-bold leading-relaxed max-w-4xl mx-auto">
            HoundHeart™ is not just an app - it is a pathway to an enduring, co-evolving, and co-creating a field of love strong enough to transform both your lives.
          </p>
        </div>

        {/* Join the Movement Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 lg:p-12 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                <path d="M20 7a4 4 0 11-8 0 4 4 0 018 0zM16 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" transform="translate(4, 0)"/>
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Join the HoundHeart™ Movement!</h2>
          </div>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
            Step into this journey, to bring forth your dog's natural vibrancy, to deepen your mutual spiritual connection, 
            and to help others cultivate more love in their lives. Together, we can create a world where every human-dog 
            relationship is a source of healing, joy, and transformation.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 sm:py-4 sm:px-12 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
        Being Your Journey
          </button>
        </div>
          </>
        )}

        {/* About Tab Content */}
        {activeTab === 'about' && (
          <div className="mb-8 sm:mb-12">
            {/* Sub-tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button className="px-4 py-2 rounded-lg font-medium bg-purple-600 text-white text-sm">
                  Our Philosophy
                </button>
                <button className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-900 text-sm">
                  Energy Healing
                </button>
                <button className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-900 text-sm">
                  The Science
                </button>
                <button className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-900 text-sm">
                  Your Journey
                </button>
              </div>
            </div>

            {/* Our Philosophy Content */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-teal-400 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-center mt-3 font-semibold text-gray-900">More Than Companions</p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    At HoundHeart™, we believe your dog is more than a companion. Dogs are naturally energetic healers who feel each moment in the raw, full-bodied joy of now and radiate the highest vibrations of love, trust, gratitude, duty, and loyalty. Your dog's natural gift gives you access to energetic harmony, the root of a power to synergistically heal you inside. That synergy benefits you both in ways science is only beginning to understand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start mb-6 sm:mb-8 space-y-8 lg:space-y-0">
            {/* Left Section - Branding and Social */}
            <div className="space-y-4 w-full lg:w-auto">
              {/* Logo and Brand */}
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center flex-shrink-0">
                  <img src={HoundHeartLogo} alt="HoundHeart Logo" className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-white">HoundHeart™</div>
                  <p className="text-gray-300 text-xs sm:text-sm">Heal the Bond, Not Just the Bark</p>
                </div>
              </Link>

            </div>

            {/* Right Side - Company and Support Links */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row space-y-6 sm:space-y-0 sm:space-x-8 lg:space-x-0 lg:space-y-6 xl:space-y-0 xl:space-x-12 w-full lg:w-auto">
              {/* Company Links */}
              <div className="w-full sm:w-auto">
                <h4 className="font-semibold mb-3 sm:mb-4 text-white text-sm sm:text-base">Company</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><Link to="/about-us" onClick={(e) => { e.preventDefault(); handleFooterNavigation('/about-us'); }} className="hover:text-white transition-colors text-sm sm:text-base">About Us</Link></li>
                  <li><Link to="/privacy-policy" onClick={(e) => { e.preventDefault(); handleFooterNavigation('/privacy-policy'); }} className="hover:text-white transition-colors text-sm sm:text-base">Privacy Policy</Link></li>
                  <li><Link to="/terms-of-use" onClick={(e) => { e.preventDefault(); handleFooterNavigation('/terms-of-use'); }} className="hover:text-white transition-colors text-sm sm:text-base">Terms of Service</Link></li>
                </ul>
              </div>

              {/* Support Links */}
              <div className="w-full sm:w-auto">
                <h4 className="font-semibold mb-3 sm:mb-4 text-white text-sm sm:text-base">Support</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><Link to="/help-center" onClick={(e) => { e.preventDefault(); handleFooterNavigation('/help-center'); }} className="hover:text-white transition-colors text-sm sm:text-base">Help Center</Link></li>
                  <li><Link to="/community" onClick={(e) => { e.preventDefault(); handleFooterNavigation('/community'); }} className="hover:text-white transition-colors text-sm sm:text-base">Healing Circles</Link></li>
                  <li><Link to="/community-guidelines" onClick={(e) => { e.preventDefault(); handleFooterNavigation('/community-guidelines'); }} className="hover:text-white transition-colors text-sm sm:text-base">Community Guidelines</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="border-t border-gray-600 mb-6 sm:mb-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-300 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} HoundHeart™. All rights reserved. Heal the Bond, Not Just the Bark.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
              <Link to="/privacy-policy" onClick={(e) => { e.preventDefault(); handleFooterNavigation('/privacy-policy'); }} className="text-gray-300 hover:text-white text-xs sm:text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;
