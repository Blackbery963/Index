import { lazy, Suspense, useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { trackPageview, initGA } from '../Analytics.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { account, databases } from './appwriteConfig.js';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

// Lazy load components
const ArtCategories = lazy(() => import('./Components/Style/ArtCategories'));
// const Collection = lazy(() => import('./Components/Collections/Collection'));
const Diarytemp = lazy(() => import('./Components/Diarytemp/Diarytemp'));
const Connecting = lazy(() => import('./Components/Connecting/Connecting'));
// const Commerce = lazy(() => import('./Components/Commerce/Commerce'))
const Visual = lazy(() => import('./Components/Visual/Visual'));
const Review = lazy(() => import('./Components/Review/Review'));


import Category from './Components/Category/Category.jsx'
import Sidebar from './Components/Sidebar.jsx';
// Import your InstallPrompt component
import InstallPrompt from './MainApp.jsx'
// Other imports remain the same...
import Account from './Components/Account/Profile/Account.jsx';
import Upload from './Components/Upload/Upload.jsx';
// Authentication Service 
import Signup from './Components/Authentication/Signup/Signup.jsx';
import Login from './Components/Authentication/Login/Login.jsx';
import ResetPassword from './Components/Authentication/Login/ResetPassword.jsx';
import EmailVerification from './Components/Authentication/Verification/EmailVerification.jsx';
import ImprovedCollection from './Components/Collections/ImprovedCollection/ImprovedCollection.jsx';
import Gallery from './Components/Gallery/Gallery';
import Diaryland from './Components/Diaryland/Diaryland';
import January from './DiaryService/January.jsx';
import About from './Company/About/About';
import Favourite from './Settings/Favourite.jsx';
import FAQs from './Resources/FAQs/FAQs';
import Feedback from './Resources/Feedback/Feedback';
import Edit_Profile from './Components/Account/Edit_Profile/Edit_Profile';
import Dashboard from './Components/Account/Dashboard/Dashboard';
import Your_Collections from './Components/Account/Your_Collection/Your_Collections';
import Journal from './Components/Journal/Journal';
import Diary from './Components/Journal/Diary.jsx';
// import PrivacyPolicy from './Legal/Privacy_Policy/Privacy_Policy.jsx';
// import PrivacyPolicy from '../PrivacyPolicy.jsx';
import Legal from './Legal/Privacy_Policy/Legal.jsx';
import Terms_Conditions from './Legal/Terms&Conditipons/Terms_Conditions.jsx';
import License from './Legal/License.jsx';
import Help from './Resources/Help/Help.jsx';
import Artisan from './Components/Artisian/Artisian.jsx';
import Security from './Product/Security.jsx';
import FeedbackPrompt from './Resources/Feedback/FeedBackPrompt.jsx';
// the community section
import Community from './Community/Community.jsx';
import CreateCommunityPage from './Community/Create-Community.jsx';
import ExploreCommunity from './Community/ExploreCommunity.jsx';
import CommunityDashboard from './Community/CommunityDashboard.jsx';
import WeeklyChallenge from './Community/CommunityChallenges/WeeklyChallenge.jsx';
import MonthlyChallenge from './Community/CommunityChallenges/MonthlyChallenge.jsx';
import VotingGallery from './Community/CommunityChallenges/VotingGallery.jsx';
import ResourceHub from './Community/Resources/ResourceHub.jsx';
import ResourceUpload from './Community/Resources/ResourceUpload.jsx';
import ChallengeUpload from './Community/CommunityChallenges/ChallengeUpload.jsx';
import UserDiscoveryPage from './Components/Artisian/userDiscoveryPage.jsx';
import DiscoverUsers from './Components/Artisian/DiscoverArtists.jsx';
import ArtistDiscovery from './Components/ArtistDiscovery.jsx';
import DiaryCollection from './Components/Diaryland/DiaryCollection.jsx';
import Notification from './Settings/Notification.jsx';

import ChatbotUI from './Chatbot/ChatbotUI.jsx';


// The commecial part starts from here 
import ArtStore from './Arteva/ArtStore/ArtStore.jsx';
import OrderHistory from './Arteva/Commercial/OrderHistory.jsx';
import Cart from './Settings/Cart.jsx';
import Order from './Settings/Order.jsx';
import ArtMarketplace from './Arteva/ArtMarketPlace.jsx';

// the community section
import MyCommunity from './Community/MyCommunity.jsx';
import DailyChallenge from './Components/DialyChallenge.jsx';
import ResearchPapersPage from './Components/ResearchPaperPage.jsx';
import AboutHandmade from './Company/About/AboutHandmade.jsx';
import CreateNewChallenge from './Community/CommunityDashboard/CreateNewChallenge.jsx';
import MemberDiscoveryPage from './Community/DiscoverNewMember/MemberDiscoveryPage.jsx';
// Temporary Share View
import TemporaryShareView from './Share/TemporaryShareView.jsx';

// Homemade Online Status Indicator
import HandmadePaintingsGallery from './Components/Homemade_Crafts/HandmadePaintingsGallery.jsx';
import DecorCraftsGallery from './Components/Homemade_Crafts/DecorCraftsGallery.jsx';
import CulturalCreationsGallery from './Components/Homemade_Crafts/CulturalCreationsGallery.jsx';
// Games

// import PixelPainter from './Games/PixelPainter.jsx';
import PixelPainter from '../Games/PixelPainter.jsx';
import HeroSection from './Components/Header/HeroSection.jsx';
import StickyNav from './Components/Sidebar.jsx';
// Short videos page
import ShortVideos from './Videos/ShortVideos.jsx';
// Invite System
import InviteAcceptance from './InviteSystem/InviteAcceptance.jsx';
import InviteSystem from './InviteSystem/InviteSystem.jsx';
// Notification Service Imports

// Authentication Service Imports
import SimpleSignupPrompt from './Components/Authentication/SimpleSignupPrompt.jsx';
import { AuthProvider } from './Components/Authentication/AuthContext.jsx';
// Echo
import EchoApp from './Echos/Components/EchoApp.jsx';
// front gallery
// import MainGalleryPage from './FrontGallery/MainGalleryPage.jsx';

import GalleryPage from './Sub-Components/GalleryPage.jsx';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

function App() {
  const { userId } = useParams();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      disable: false,
      easing: 'ease-out',
      offset: 100,
    });
  }, []);

  useEffect(() => {
    initGA();
    trackPageview(window.location.pathname);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await account.get();
      } catch {
        console.log('No active session');
        Navigate('/login');
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        if (userId) {
          const userDoc = await databases.getDocument(
            DATABASE_ID,
            USER_COLLECTION_ID,
            userId
          );
          setProfileData(userDoc);
        } else {
          const currentUser = await account.get();
          const userDoc = await databases.getDocument(
            DATABASE_ID,
            USER_COLLECTION_ID,
            currentUser.$id
          );
          setProfileData(userDoc);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // Online/offline status detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);


const [headerHeight, setHeaderHeight] = useState(80); // fallback
const [navHeight, setNavHeight] = useState(56); // fallback, not 1400!

  useEffect(() => {
    const measure = () => {
      // try common header selectors — falls back to 80
      const headerEl =
        document.querySelector("header") ||
        document.querySelector("#site-header") ||
        document.querySelector(".header") ||
        null;
      const measuredHeader = headerEl
        ? Math.ceil(headerEl.getBoundingClientRect().height)
        : 80;

      const navEl = document.getElementById("top-nav");
      const measuredNav = navEl
        ? Math.ceil(navEl.getBoundingClientRect().height)
        : 56;

      setHeaderHeight(measuredHeader);
      setNavHeight(measuredNav);
    };

    // measure on mount and on resize
    measure();
    window.addEventListener("resize", measure);

    // a small delayed re-measure (fonts, dynamic content)
    const t = setTimeout(measure, 600);

    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  // combined top offset for content (header + nav)
  const totalTop = headerHeight + navHeight;






  // Invite system
    const [activeInviteCode, setActiveInviteCode] = useState(null);

  // Check URL for invite code on app load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('invite');
    if (inviteCode) {
      setActiveInviteCode(inviteCode);
    }
  }, []);

  const handleInviteSuccess = (result) => {
    console.log('Invite accepted!', result);
    setActiveInviteCode(null);
    // Redirect to onboarding or show success message
  };


  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative flex items-center justify-center flex-col overflow-x-hidden bg-gray-100 dark:bg-[#000705]">
              <ChatbotUI/>
              <Header />
              <HeroSection/>
              <div className='w-full'>
              <StickyNav/>
              </div>
              <SimpleSignupPrompt />
              <Suspense fallback={<div className="text-center py-6 text-blue-600">Loading...</div>}>
                {/* Install Prompt Component */}
                <div>
                <InstallPrompt />
                <FeedbackPrompt />
                </div>
              <EchoApp/>

                {/* <TopNav/> */}
                <main className="w-full flex flex-col gap-y-4">
                  {/* <MainGalleryPage/> */}
                <div data-aos="fade-right" data-aos-delay="200" className="w-full will-change-transform will-change-opacity">
                  {/* <Collection/> */}
                 {/* <ImageCollectionUI/> */}
                 <ImprovedCollection/>
                 {/* <MainGalleryPage/> */}
                </div>
                
                {/* <UnifiedFeed/> */}
                {/* Landing page components */}
                {/* <div data-aos="fade-left" data-aos-delay="100" className="w-full will-change-transform will-change-opacity top-4">
                  <ArtCategories />
                </div> */}

                {/* <div data-aos="fade-right" data-aos-delay="200" className="w-full will-change-transform will-change-opacity">
                  < ArtistDiscovery />
                </div> */}

                {/* <div data-aos="fade-left" data-aos-delay="300" className="w-full will-change-transform will-change-opacity">
                  <Diarytemp />
                </div> */}
                {/* <div data-aos="fade-right" data-aos-delay="400" className="w-full will-change-transform will-change-opacity">
                  <Connecting />
                </div>
                <div data-aos="fade-left" data-aos-delay="300" className="w-full will-change-transform will-change-opacity">
                  <ResearchPapersPage />
                </div> */}
                 {/* <div data-aos="fade-right" data-aos-delay="400" className="w-full will-change-transform will-change-opacity">
                  <DailyChallenge />
                </div> */}
                {/* <div data-aos="fade-right" data-aos-delay="600" className="w-full will-change-transform will-change-opacity">
                  <Commerce />
                </div> */}
                {/* <div data-aos="fade-left" data-aos-delay="700" className="w-full will-change-transform will-change-opacity">
                  <Visual />
                </div> */}

                {/* <div data-aos="fade-right" data-aos-delay="800" className="w-full will-change-transform will-change-opacity">
                <Artisan />
                </div> */}
                {/* <div data-aos="fade-left" data-aos-delay="900" className="w-full flex items-center justify-center flex-col gap-y-2">
                  <Review />
                </div> */}
                {/* <MixedMediaLanding/> */}
                <div data-aos="fade-right" data-aos-delay="1000" className="w-full will-change-transform will-change-opacity">
                  <Footer />
                </div>
                </main>
              </Suspense>
            </div>
          }
        />
        <Route path='/Account' element={<Account isOwnProfile={true}/>}/>
        <Route path='/Account/:userId' element={<Account isOwnProfile={false}/>}/>

        {/* Authentication Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />  
        <Route path="/Login/ResetPassword" element={<ResetPassword />} />  
        <Route path="/Authentication/Verification/EmailVerification" element={<EmailVerification />} />
        
        
        <Route path="/category/:categoryName" element={<GalleryPage />} />
        <Route path="/category" element={<Category />} />

        <Route path="/diaryland" element={<Diaryland />} />
        <Route path="/january" element={<January />} />
        <Route path='/diary' element={<Diary/>}/>
        {/* <Route path="/january" element={<ArtistDiary />} /> */}

        <Route path="/about" element={<About />} />
        <Route path="/saved" element={<Favourite />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path='/settings/notification' element={<Notification/>}/>
        <Route path='/settings/cart' element={<Cart/>}/>
        <Route path='Settings/Order' element={<Order/>}/>
        <Route path="/resources/feedback" element={<Feedback />} />
        <Route path="/Account/Edit_profile" element={<Edit_Profile />} />

        <Route path="/Account/dashboard" element={<Dashboard />} />
        <Route path="/Account/Upload" element={<Upload />} />
        <Route path="/collections" element={<Your_Collections />} />
        <Route path="/Journal" element={<Journal />} />
        <Route path="/Legal/Privacy_Policy" element={<Legal />} />
        {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
        <Route path="/Legal/Terms_Conditions" element={<Terms_Conditions />} />
        <Route path="/Legal/License" element={<License />} />
        <Route path='/Product/Security' element={<Security/>}/>
  
        <Route path="/cart" element={<Cart />} />
        <Route path='/History' element={<History/>}/>
        <Route path='/Resources/Help' element={<Help/>}/>
        <Route path='/Company/About/AboutHandmade' element={<AboutHandmade/>}/>
        
        {/* the community  section  */}
        <Route path="/community" element={<Community />} />
        <Route path="/community/CreateCommunity" element={<CreateCommunityPage />} />
        <Route path='/community/ExploreCommunity' element={<ExploreCommunity/>}/>
        <Route path='/community/:slug' element={<CommunityDashboard/>}/>
        <Route path='/community/communitychallenges/weeklychallenge' element={<WeeklyChallenge/>}/>
        <Route path='/community/communitychallenges/monthlychallenge' element={<MonthlyChallenge/>}/>
        <Route path='/community/communitychallenges/votinggallery' element={<VotingGallery/>}/>
        <Route path='/Community/Resources/ResourceHub' element={<ResourceHub/>}/>
        <Route path='/Community/Resources/ResourceUpload' element={<ResourceUpload/>}/>
        <Route path='/Community/CommunityChallenges/ChallengeUpload' element={<ChallengeUpload/>}/>
        <Route path='/community/MyCommunity' element={<MyCommunity/>}/>
        <Route path='/Community/CommunityDashboard/CreateNewChallenge' element={<CreateNewChallenge/>}/>
        <Route path='/Community/DiscoverNewMember/MemberDiscoveryPage' element={<MemberDiscoveryPage/>}/>
        
        {/* The routing of the sub-components */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path='/gallery/:id' element={<Gallery />} />

        {/* Homemade Crafts Gallery */}
        <Route path="/Components/Homemade_Crafts/HandmadePaintingsGallery" element={<HandmadePaintingsGallery />} />
        <Route path='/Components/Homemade_Crafts/DecorCraftsGallery' element={<DecorCraftsGallery/>}/>
        <Route path='/Components/Homemade_Crafts/CulturalCreationGallery' element={<CulturalCreationsGallery/>}/>
        {/* discovering artists  */}
        <Route path='/Artist/discoverartists' element={<UserDiscoveryPage/>}/>
        <Route path='/Artists/DiscoverUsers' element={<DiscoverUsers/>}/>

        {/* Diary */}
        <Route path='/Diaries/Diary-Collection' element={<DiaryCollection/>}/>
        <Route path='/diary/:id' element = {<January/>}/>

        {/* the routing of commercial section */}
        <Route path='/Arteva/ArtStore' element = {<ArtStore/>}/>
        <Route path='/Arteva/Commercial/OrderHistory' element = {<OrderHistory/>}/>
        <Route path='/Arteva/ArtMarketplace' element={<ArtMarketplace />} />
        {/* Temporary Share View */}
        <Route path="/share/:token" element={<TemporaryShareView />} />
        {/* Games */}
        <Route path="/Games/PixelPainter" element={<PixelPainter />} />
        <Route path="/invite" element={<InviteSystem />} />
              {activeInviteCode && (
        <InviteAcceptance
          inviteCode={activeInviteCode}
          onSuccess={handleInviteSuccess}
          onClose={() => setActiveInviteCode(null)}
        />
        )}
        {/* for short videos */}
        <Route path='/moments' element={<ShortVideos/>}/>

      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;




// // 097549
