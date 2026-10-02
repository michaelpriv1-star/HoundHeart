import React, { Suspense, lazy, useEffect } from 'react';
import './index.css';
import apiService from './services/apiService';
import HoundHeartLandingPage from './Pages/HoundHeartLandingPage';
import PrivacyPolicyPage from './Pages/PrivacyPolicyPage';
import CommunityGuidelinesPage from './Pages/CommunityGuidelinesPage';
import HelpCenterPage from './Pages/HelpCenterPage';
import AboutUsPage from './Pages/AboutUsPage';
import ProtectedRoute from './components/ProtectedRoute';
import SiteHeader from './components/SiteHeader';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, matchRoutes } from 'react-router-dom';
import NotFoundPage from './Pages/NotFoundPage';
import { PUBLIC_PAGES } from './seo/seoConfig';
import { APP_ROUTES } from './seo/routes';
import { applySeo } from './seo/applySeo';
import { NotificationPopupProvider } from './hooks/useNotificationPopup';
import NotificationPopup from './components/NotificationPopup';
import ExpertSessionNotificationPoller from './components/ExpertSessionNotificationPoller';

const LoginPage = lazy(() => import('./Pages/LoginPage'));
const SignupPage = lazy(() => import('./Pages/SignupPage'));
const EmailVerificationPage = lazy(() => import('./Pages/EmailVerificationPage'));
const ProfileSetupPage = lazy(() => import('./Pages/ProfileSetupPage'));
const ProfileSettingsPage = lazy(() => import('./Pages/ProfileSettingsPage'));
const DashboardPage = lazy(() => import('./Pages/DashboardPage'));
const ChakraRitualsPage = lazy(() => import('./Pages/ChakraRitualsPage'));
const JournalPage = lazy(() => import('./Pages/JournalPage'));
const CommunityPage = lazy(() => import('./Pages/CommunityPage'));
const AskExpertPage = lazy(() => import('./Pages/AskExpertPage'));
const CoursesPage = lazy(() => import('./Pages/CoursesPage'));
const WellnessGuidePage = lazy(() => import('./Pages/WellnessGuidePage'));
const WellnessCheckPage = lazy(() => import('./Pages/WellnessCheckPage'));
const DetailedAnalysisPage = lazy(() => import('./Pages/DetailedAnalysisPage'));
const SubscriptionPage = lazy(() => import('./Pages/SubscriptionPage'));
const SubscriptionSuccessPage = lazy(() => import('./Pages/SubscriptionSuccessPage'));
const SubscriptionCancelPage = lazy(() => import('./Pages/SubscriptionCancelPage'));
const SubscriptionPortalReturnPage = lazy(() => import('./Pages/SubscriptionPortalReturnPage'));
const BondAnalyticsPage = lazy(() => import('./Pages/BondAnalyticsPage'));
const WearableIntegrationPage = lazy(() => import('./Pages/WearableIntegrationPage'));
const WelcomePage = lazy(() => import('./Pages/WelcomePage'));
const TravelClubPage = lazy(() => import('./Pages/TravelClubPage'));
const WearableMarketplacePage = lazy(() => import('./Pages/WearableMarketplacePage'));
const OnlineStorePage = lazy(() => import('./Pages/OnlineStorePage'));
const BooksLibraryPage = lazy(() => import('./Pages/BooksLibraryPage'));
const LegacyProjectPage = lazy(() => import('./Pages/LegacyProjectPage'));
const GriefSupportPage = lazy(() => import('./Pages/GriefSupportPage'));
const BookSession = lazy(() => import('./Pages/BookSession'));
const VideoCall = lazy(() => import('./Pages/VideoCall'));
const SessionEnded = lazy(() => import('./Pages/SessionEnded'));
const ExpertBookSessionPage = lazy(() => import('./Pages/ExpertBookSessionPage'));
const ExpertSessionSlotsPage = lazy(() => import('./Pages/ExpertSessionSlotsPage'));
const ExpertMySessionsPage = lazy(() => import('./Pages/ExpertMySessionsPage'));
const ExpertVideoCallPage = lazy(() => import('./Pages/ExpertVideoCallPage'));

const SiteLayout = () => (
  <>
    <SiteHeader />
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  </>
);

const KNOWN_ROUTES = [...Object.keys(PUBLIC_PAGES), ...APP_ROUTES].map((path) => ({ path }));

const prefetchAuthPages = () => {
  import('./Pages/LoginPage');
  import('./Pages/SignupPage');
};

const AppContent = () => {
  const location = useLocation();
  const isAuthenticated = apiService.isAuthenticated();
  const isNotFound = !matchRoutes(KNOWN_ROUTES, location);

  useEffect(() => {
    applySeo(location.pathname, { notFound: isNotFound });
  }, [location.pathname, isNotFound]);

  useEffect(() => {
    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 2000));
    const onLoad = () => schedule(prefetchAuthPages);
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });
    return () => window.removeEventListener('load', onLoad);
  }, []);
  
  // Check if user is in registration flow
  const inRegistrationFlow = 
    location.state?.from === 'signup' || 
    sessionStorage.getItem('registrationInProgress') === 'true';

  // Effective authentication for UI purposes
  const isEffectivelyAuthenticated = isAuthenticated && !inRegistrationFlow;

  return (
    <>
      {isEffectivelyAuthenticated && <ExpertSessionNotificationPoller />}
      <Suspense fallback={null}>
      <Routes>
        {/* Popup-style and full-screen pages without the site header */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/video-call" element={<ProtectedRoute><VideoCall /></ProtectedRoute>} />
        <Route path="/expert-video-call" element={<ProtectedRoute><ExpertVideoCallPage /></ProtectedRoute>} />

        <Route element={<SiteLayout />}>
        {/* Not under protected routing */}
        <Route path="/" element={<HoundHeartLandingPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />

        {/* under protected routing */}
        <Route path="/welcome" element={<ProtectedRoute><WelcomePage /></ProtectedRoute>} />
        <Route path="/profile-setup" element={<ProtectedRoute><ProfileSetupPage /></ProtectedRoute>} />
        <Route path="/profile-settings" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/rituals" element={<ProtectedRoute requiredTier="plus"><ChakraRitualsPage /></ProtectedRoute>} />
        <Route path="/journal" element={<ProtectedRoute><JournalPage /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
        <Route path="/ask-expert" element={<ProtectedRoute><AskExpertPage /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
        <Route path="/wellness-guide" element={<ProtectedRoute><WellnessGuidePage /></ProtectedRoute>} />
        <Route path="/wellness-check" element={<ProtectedRoute><WellnessCheckPage /></ProtectedRoute>} />
        <Route path="/wellness-check/detailed-analysis" element={<ProtectedRoute><DetailedAnalysisPage /></ProtectedRoute>} />
        <Route path="/subscription" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />
        <Route path="/subscription/success" element={<ProtectedRoute><SubscriptionSuccessPage /></ProtectedRoute>} />
        <Route path="/subscription/cancel" element={<ProtectedRoute><SubscriptionCancelPage /></ProtectedRoute>} />
        <Route path="/subscription/portal-return" element={<ProtectedRoute><SubscriptionPortalReturnPage /></ProtectedRoute>} />
        <Route path="/sync-score" element={<ProtectedRoute requiredTier="plus"><BondAnalyticsPage /></ProtectedRoute>} />
        <Route path="/integrations" element={<ProtectedRoute requiredTier="plus"><WearableIntegrationPage /></ProtectedRoute>} />
        <Route path="/community-guidelines" element={<CommunityGuidelinesPage />} />

        {/* Coming Soon / Phase 2 Features */}
        <Route path="/travel-club" element={<ProtectedRoute><TravelClubPage /></ProtectedRoute>} />
        <Route path="/wearable-marketplace" element={<ProtectedRoute><WearableMarketplacePage /></ProtectedRoute>} />
        <Route path="/store" element={<ProtectedRoute><OnlineStorePage /></ProtectedRoute>} />
        <Route path="/books" element={<ProtectedRoute><BooksLibraryPage /></ProtectedRoute>} />
        <Route path="/legacy-project" element={<ProtectedRoute><LegacyProjectPage /></ProtectedRoute>} />
        <Route path="/grief-support" element={<ProtectedRoute><GriefSupportPage /></ProtectedRoute>} />

        {/* Video Consultation */}
        <Route path="/book-session" element={<ProtectedRoute><BookSession /></ProtectedRoute>} />
        <Route path="/session-ended" element={<ProtectedRoute><SessionEnded /></ProtectedRoute>} />

        {/* Expert Session Booking Feature */}
        <Route path="/expert-book-session" element={<ProtectedRoute><ExpertBookSessionPage /></ProtectedRoute>} />
        <Route path="/expert-session-slots/:id" element={<ProtectedRoute><ExpertSessionSlotsPage /></ProtectedRoute>} />
        <Route path="/my-expert-sessions" element={<ProtectedRoute><ExpertMySessionsPage /></ProtectedRoute>} />

        {/* Public or informational pages */}
        <Route path="/help-center" element={<HelpCenterPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage key="privacy-policy" showFooter />} />
        <Route path="/privacy-policy-full" element={<PrivacyPolicyPage showFooter={false} />} />
        <Route path="/terms-of-use" element={<PrivacyPolicyPage key="terms-of-use" showFooter initialTab="houndheart" />} />

        <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      </Suspense>
    </>
  );
};

// The prerender build passes a StaticRouter so the server HTML matches what the client hydrates.
const App = (props) => {
  const { RouterComponent = Router, routerProps } = props;
  return (
    <NotificationPopupProvider>
      <div>
        <RouterComponent {...routerProps}>
          <AppContent />
        </RouterComponent>
        <NotificationPopup />
      </div>
    </NotificationPopupProvider>
  );
};

export default App;
