import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HoundHeartLogo from '../assets/images/Houndheart_logo.svg';
import apiService from '../services/apiService';
import useClientValue from '../hooks/useClientValue';

export const OPEN_PRE_REGISTER_EVENT = 'houndheart:open-preregister';

const GUEST_LINKS = [
  { name: 'About', to: '/about-us' },
  { name: 'Features', to: '/#transform-section', sectionId: 'transform-section' },
  { name: 'Online Pricing', to: '/#pricing-section', sectionId: 'pricing-section' },
  { name: 'Help Center', to: '/help-center' },
];

const MEMBER_LINKS = [
  { name: 'Dashboard', path: '/dashboard', key: 'dashboard' },
  { name: 'Journal', path: '/journal', key: 'journal' },
  { name: 'Community', path: '/community', key: 'community' },
  { name: 'Wellness Guide', path: '/wellness-guide', key: 'wellness-guide' },
  { name: 'Wellness Check', path: '/wellness-check', key: 'wellness-check' },
  { name: 'Ask Our Expert', path: '/ask-expert', key: 'ask-expert' },
  { name: 'Legacy Project', path: '/legacy-project', key: 'legacy-project' },
];

const COMING_SOON_LINKS = [
  { name: '🎓 Courses', path: '/courses', key: 'courses' },
  { name: '✈️ Partner Discounts & Deals', path: '/travel-club', key: 'travel-club' },
  { name: '⌚ View wearable marketplace', path: '/wearable-marketplace', key: 'wearable-marketplace' },
  { name: '🛍️ Purchase merchandise', path: '/store', key: 'store' },
];

const SITE_LINKS = [
  { name: 'About Us', path: '/about-us' },
  { name: 'Help Center', path: '/help-center' },
  { name: 'Community Guidelines', path: '/community-guidelines' },
];

let launchFlagsRequest = null;
const getLaunchFlags = () => {
  if (!launchFlagsRequest) launchFlagsRequest = apiService.getPublicLaunchFlags();
  return launchFlagsRequest;
};

const normalizeTier = (tier) => {
  const normalized = String(tier || 'free').toLowerCase().trim();
  return normalized === 'plus' || normalized === 'premium' ? normalized : 'free';
};

const getTierFromPlanName = (planName) => {
  const normalizedPlan = String(planName || '').toLowerCase();
  if (normalizedPlan.includes('premium')) return 'premium';
  if (normalizedPlan.includes('plus')) return 'plus';
  return 'free';
};

const isActiveSubscription = (subscription) => {
  if (!subscription) return false;
  const status = (subscription.status || subscription.Status || '').toString().toLowerCase();
  const periodEnd = subscription.currentPeriodEnd || subscription.CurrentPeriodEnd;
  const endDate = periodEnd ? new Date(periodEnd) : null;
  return (status === 'active' || status === 'trialing') && (!endDate || endDate >= new Date());
};

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}') || {};
  } catch {
    return {};
  }
};

const getStoredMode = () => {
  if (!apiService.isAuthenticated()) return 'guest';
  return sessionStorage.getItem('registrationInProgress') === 'true' ? 'setup' : 'member';
};

const isPathActive = (pathname, path) => pathname === path || pathname.startsWith(`${path}/`);

const guestLinkClass = 'text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 cursor-pointer relative group';

const ChevronIcon = ({ open, className = 'w-3.5 h-3.5' }) => (
  <svg className={`${className} transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const LockIcon = () => (
  <span className="text-gray-400" title="Premium Access Required">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  </span>
);

const StarIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const KeyIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const LogoutIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const SiteHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const storedMode = useClientValue(getStoredMode, 'guest');
  const mode = storedMode === 'member' && location.state?.from === 'signup' ? 'setup' : storedMode;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showUpcomingDropdown, setShowUpcomingDropdown] = useState(false);
  const [ctaLabel, setCtaLabel] = useState('Pre-Register');
  const [userData, setUserData] = useState({ name: '', email: '', initials: '' });
  const [membershipTier, setMembershipTier] = useState('free');
  const [currentSubscription, setCurrentSubscription] = useState(null);

  const headerRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const upcomingDropdownRef = useRef(null);

  const hasPaidAccess = membershipTier === 'plus' || membershipTier === 'premium';

  useEffect(() => {
    setMobileOpen(false);
    setShowProfileDropdown(false);
    setShowUpcomingDropdown(false);
  }, [location.key]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (upcomingDropdownRef.current && !upcomingDropdownRef.current.contains(event.target)) {
        setShowUpcomingDropdown(false);
      }
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        setShowProfileDropdown(false);
        setShowUpcomingDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (mode !== 'guest') return undefined;
    let cancelled = false;
    getLaunchFlags().then((data) => {
      if (cancelled) return;
      setCtaLabel(data?.ctaLabel || ((data?.enableTshirtSales ?? false) ? 'Buy T-Shirt' : 'Pre-Register'));
    });
    return () => { cancelled = true; };
  }, [mode]);

  useEffect(() => {
    if (mode === 'guest') return;
    const userObj = readStoredUser();
    const name = userObj.fullName || userObj.profileName || userObj.name || 'User';
    const initials = name.split(' ').map((word) => word.charAt(0)).join('').toUpperCase().slice(0, 2);
    setUserData({ name, email: userObj.email || '', initials });
  }, [mode, pathname]);

  useEffect(() => {
    if (mode !== 'member') return undefined;
    let cancelled = false;

    const fetchSubscription = async () => {
      const tierFromUser = normalizeTier(readStoredUser().tierLevel);
      try {
        const response = await apiService.makeRequest('/Subscription/current', { method: 'GET' });
        const subData = response && Object.prototype.hasOwnProperty.call(response, 'data') ? response.data : response;
        const tierFromPlan = isActiveSubscription(subData)
          ? getTierFromPlanName(subData?.planName || subData?.PlanName)
          : 'free';

        let resolvedTier = tierFromUser;
        if (tierFromPlan === 'premium' || (tierFromPlan === 'plus' && resolvedTier === 'free')) {
          resolvedTier = tierFromPlan;
        }
        if (cancelled) return;
        setCurrentSubscription(subData || null);
        setMembershipTier(resolvedTier);
      } catch {
        if (!cancelled) setMembershipTier(tierFromUser);
      }
    };

    setMembershipTier(normalizeTier(readStoredUser().tierLevel));
    fetchSubscription();

    const handleSubscriptionUpdated = (event) => {
      const { tier, isPremium } = event.detail || {};
      if (tier && (tier === 'premium' || tier === 'plus')) {
        setMembershipTier(tier);
      } else {
        const newTier = normalizeTier(readStoredUser().tierLevel);
        setMembershipTier(newTier !== 'free' ? newTier : isPremium ? 'premium' : 'free');
      }
      fetchSubscription();
    };

    window.addEventListener('subscription-updated', handleSubscriptionUpdated);
    return () => {
      cancelled = true;
      window.removeEventListener('subscription-updated', handleSubscriptionUpdated);
    };
  }, [mode]);

  const handleLogoClick = () => {
    if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (e, sectionId) => {
    if (pathname !== '/') return;
    const section = document.getElementById(sectionId);
    if (!section) return;
    e.preventDefault();
    setMobileOpen(false);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePreRegister = () => {
    setMobileOpen(false);
    if (pathname === '/') {
      window.dispatchEvent(new Event(OPEN_PRE_REGISTER_EVENT));
    } else {
      navigate('/', { state: { openPreRegister: true } });
    }
  };

  const handleChangePassword = () => {
    setShowProfileDropdown(false);
    setMobileOpen(false);
    navigate('/dashboard?action=change-password');
  };

  const handleLogout = () => {
    setShowProfileDropdown(false);
    setMobileOpen(false);
    try {
      apiService.logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
      window.location.href = '/';
    }
  };

  const memberLinkTarget = (item) =>
    item.key === 'legacy-project' && membershipTier !== 'premium' ? '/subscription' : item.path;

  const renderUpgrade = (extraClass = '') =>
    hasPaidAccess ? (
      <div className={`bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-lg ${extraClass.replace(/\bflex\b/g, 'block')}`}>
        <div className="text-sm font-semibold leading-tight">{membershipTier === 'premium' ? 'Premium Active' : 'Plus Active'}</div>
        {(currentSubscription?.currentPeriodEnd || currentSubscription?.CurrentPeriodEnd) && (
          <div className="text-[11px] leading-tight text-green-600">
            Valid till {new Date(currentSubscription.currentPeriodEnd || currentSubscription.CurrentPeriodEnd).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </div>
        )}
      </div>
    ) : (
      <Link
        to="/subscription"
        className={`bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-3 py-2 rounded-lg font-medium transition-colors items-center space-x-2 ${extraClass}`}
      >
        <StarIcon />
        <span>Upgrade</span>
      </Link>
    );

  const renderUserMenu = () => (
    <div className="relative" ref={profileDropdownRef}>
      <button
        type="button"
        onClick={() => setShowProfileDropdown((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={showProfileDropdown}
        className="flex items-center space-x-2 hover:bg-gray-50 p-1 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">{userData.initials}</span>
        </div>
        <span className="text-gray-700 font-medium hidden 2xl:block">{userData.name}</span>
        <ChevronIcon open={showProfileDropdown} className="w-4 h-4 text-gray-500" />
      </button>

      {showProfileDropdown && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50" role="menu">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900 truncate">{userData.name}</p>
            <p className="text-sm text-gray-500 truncate">{userData.email}</p>
          </div>

          {mode === 'member' && (
            <>
              <Link
                to="/profile-settings"
                className="w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700 transition-colors flex items-center space-x-3"
              >
                <UserIcon className="w-5 h-5 text-gray-500" />
                <span>Profile Settings</span>
              </Link>
              <button
                type="button"
                onClick={handleChangePassword}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700 transition-colors flex items-center space-x-3"
              >
                <KeyIcon className="w-5 h-5 text-gray-500" />
                <span>Change Password</span>
              </button>

              <div className="border-t border-gray-200 mt-1 pt-1">
                {SITE_LINKS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </>
          )}

          <div className="border-t border-gray-200 py-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left hover:bg-red-50 text-red-600 transition-colors flex items-center space-x-3"
            >
              <LogoutIcon className="w-5 h-5 text-red-500" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const hamburger = (breakpointClass) => (
    <button
      type="button"
      onClick={() => setMobileOpen((open) => !open)}
      aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={mobileOpen}
      aria-controls="site-mobile-menu"
      className={`${breakpointClass} p-2 rounded-lg text-gray-700 hover:text-purple-600 hover:bg-gray-50 transition-colors`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {mobileOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  );

  const mobileLinkClass = (active) =>
    `block px-3 py-3 rounded-lg font-medium transition-colors ${active ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'}`;

  return (
    <header ref={headerRef} className="bg-white shadow-sm border-b border-gray-100 py-4 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex justify-between items-center gap-2 sm:gap-3">
          <Link to="/" onClick={handleLogoClick} className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer shrink-0">
            <img
              src={HoundHeartLogo}
              alt="HoundHeart Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform duration-300"
            />
            <div className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">HoundHeart™</div>
          </Link>

          {mode === 'guest' && (
            <>
              <nav className="hidden md:flex space-x-4 lg:space-x-8" aria-label="Main">
                {GUEST_LINKS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={item.sectionId ? (e) => handleSectionClick(e, item.sectionId) : undefined}
                    className={`${guestLinkClass} ${!item.sectionId && isPathActive(pathname, item.to) ? 'text-purple-600' : ''}`}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
              </nav>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  type="button"
                  onClick={handlePreRegister}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-300 whitespace-nowrap"
                >
                  {ctaLabel}
                </button>

                <Link to="/login" className="hidden sm:flex items-center space-x-2 group">
                  <UserIcon className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors duration-300" />
                  <span className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap">
                    Login/Register
                  </span>
                </Link>

                {hamburger('md:hidden')}
              </div>
            </>
          )}

          {mode === 'member' && (
            <>
              <nav className="hidden xl:flex items-center space-x-4" aria-label="Main">
                {MEMBER_LINKS.map((item) => {
                  const isLocked = item.key === 'legacy-project' && membershipTier !== 'premium';
                  const active = isPathActive(pathname, item.path);
                  return (
                    <Link
                      key={item.key}
                      to={memberLinkTarget(item)}
                      aria-current={active ? 'page' : undefined}
                      className={`text-sm transition-colors flex items-center gap-1.5 whitespace-nowrap ${active
                        ? 'text-purple-600 font-semibold border-b-2 border-purple-600 pb-1'
                        : 'text-gray-600 hover:text-purple-600 font-medium'
                        }`}
                    >
                      {item.name}
                      {isLocked && <LockIcon />}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center space-x-2">
                <div className="relative hidden xl:block" ref={upcomingDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowUpcomingDropdown((open) => !open)}
                    aria-haspopup="menu"
                    aria-expanded={showUpcomingDropdown}
                    className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium px-2 py-1 rounded-lg hover:bg-gray-50"
                  >
                    <span>Upcoming</span>
                    <ChevronIcon open={showUpcomingDropdown} />
                  </button>

                  {showUpcomingDropdown && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50" role="menu">
                      <div className="px-4 py-2 border-b border-gray-100 mb-1">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Coming Soon</p>
                      </div>
                      {COMING_SOON_LINKS.map((item) => (
                        <Link
                          key={item.key}
                          to={item.path}
                          className="w-full px-4 py-2.5 text-left text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-between group"
                        >
                          <span>{item.name}</span>
                          <span className="text-[10px] bg-orange-100 text-orange-500 font-semibold px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            Soon
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {renderUpgrade('hidden sm:flex')}
                {renderUserMenu()}
                {hamburger('xl:hidden')}
              </div>
            </>
          )}

          {mode === 'setup' && renderUserMenu()}
        </div>
      </div>

      {mobileOpen && mode === 'guest' && (
        <div id="site-mobile-menu" className="md:hidden absolute inset-x-0 top-full bg-white border-b border-gray-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 space-y-1" aria-label="Mobile">
            {GUEST_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={item.sectionId ? (e) => handleSectionClick(e, item.sectionId) : undefined}
                className={mobileLinkClass(!item.sectionId && isPathActive(pathname, item.to))}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/login" className={`${mobileLinkClass(false)} flex items-center space-x-2 border-t border-gray-100 mt-2 pt-4`}>
              <UserIcon className="w-5 h-5 text-gray-600" />
              <span>Login/Register</span>
            </Link>
          </nav>
        </div>
      )}

      {mobileOpen && mode === 'member' && (
        <div id="site-mobile-menu" className="xl:hidden absolute inset-x-0 top-full bg-white border-b border-gray-100 shadow-lg max-h-[calc(100vh-73px)] overflow-y-auto">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 space-y-1" aria-label="Mobile">
            {MEMBER_LINKS.map((item) => {
              const isLocked = item.key === 'legacy-project' && membershipTier !== 'premium';
              const active = isPathActive(pathname, item.path);
              return (
                <Link
                  key={item.key}
                  to={memberLinkTarget(item)}
                  aria-current={active ? 'page' : undefined}
                  className={`${mobileLinkClass(active)} flex items-center gap-1.5`}
                >
                  {item.name}
                  {isLocked && <LockIcon />}
                </Link>
              );
            })}

            <div className="border-t border-gray-100 mt-2 pt-3">
              <p className="px-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">Coming Soon</p>
              {COMING_SOON_LINKS.map((item) => (
                <Link key={item.key} to={item.path} className={mobileLinkClass(isPathActive(pathname, item.path))}>
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="sm:hidden border-t border-gray-100 mt-2 pt-4 pb-1">
              {renderUpgrade('flex justify-center')}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
