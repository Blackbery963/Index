// import { lazy, Suspense, useEffect, useState, } from 'react';
// import { useParams, Navigate } from 'react-router-dom';
// import './App.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { trackPageview, initGA } from '../Analytics.js';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { account,databases } from './appwriteConfig.js';
// import Header from './Components/Header/Header';
// import Footer from './Components/Footer/Footer';
// // Lazy load components
// const Style = lazy(() => import('./Components/Style/Style'));
// const Collection = lazy(() => import('./Components/Collections/Collection'));
// const Diarytemp = lazy(() => import('./Components/Diarytemp/Diarytemp'));
// const Connecting = lazy(() => import('./Components/Connecting/Connecting'));
// const Creativity = lazy(() => import('./Components/Creativity/Creativity'));
// const Commerce = lazy(() => import('./Components/Commerce/Commerce'))
// const Visual = lazy(() => import('./Components/Visual/Visual'));
// const Review = lazy(() => import('./Components/Review/Review'));

// import InstallPrompt from './MainApp.jsx'
// // Other imports remain the same...
// import Account from './Components/Account/Account';
// // import Profile from './Components/Account/Profile.jsx';
// import Upload from './Components/Upload/Upload.jsx';

// // Authentication Service 
// import Signup from './Components/Authentication/Signup/Signup.jsx';
// import Login from './Components/Authentication/Login/Login.jsx';
// import ResetPassword from './Components/Authentication/Login/ResetPassword.jsx';
// import EmailVerification from './Components/Authentication/Verification/EmailVerification.jsx';




// import Gallery from './Components/Gallery/Gallery';
// import Category from './Components/Category/Category';
// import Landscape from './Sub-Components/Landscape';
// import Still_life from './Sub-Components/Still_life';
// import Oil_paint from './Sub-Components/Oil_paint';
// import Water_color from './Sub-Components/Water_color';
// import Abstract from './Sub-Components/Abstract';
// import Modern from './Sub-Components/Modern';
// import Diaryland from './Components/Diaryland/Diaryland';
// import January from './DiaryService/January.jsx';
// import About from './Company/About/About';
// import Favourite from './Settings/Favourite.jsx';
// import FAQs from './Resources/FAQs/FAQs';
// import Feedback from './Resources/Feedback/Feedback';
// import Edit_Profile from './Components/Account/Edit_Profile/Edit_Profile';
// import Dashboard from './Components/Account/Dashboard/Dashboard';
// import Your_Collections from './Components/Account/Your_Collection/Your_Collections';
// import Journal from './Components/Journal/Journal';
// import Privacy_Policy from './Legal/Privacy_Policy/Privacy_Policy';
// import Terms_Conditions from './Legal/Terms&Conditipons/Terms_Conditions.jsx';
// import License from './Legal/License.jsx';
// import Help from './Resources/Help/Help.jsx';
// import Artisan from './Components/Artisian/Artisian.jsx';
// import Security from './Product/Security.jsx';
// // the community section
// import Community from './Community/Community.jsx';
// import CreateCommunityPage from './Community/Create-Community.jsx';
// import ExploreCommunity from './Community/ExploreCommunity.jsx';
// import CommunityDashboard from './Community/CommunityDashboard.jsx';
// import WeeklyChallenge from './Community/CommunityChallenges/WeeklyChallenge.jsx';
// import MonthlyChallenge from './Community/CommunityChallenges/MonthlyChallenge.jsx';
// import VotingGallery from './Community/CommunityChallenges/VotingGallery.jsx';
// import ResourceHub from './Community/Resources/ResourceHub.jsx';
// import ResourceUpload from './Community/Resources/ResourceUpload.jsx';
// import ChallengeUpload from './Community/CommunityChallenges/ChallengeUpload.jsx';



// import Nature from './Sub-Components/Nature.jsx';
// import Traditional from './Sub-Components/Traditional.jsx';
// import Photography from './Sub-Components/Photography.jsx';
// import Realism from './Sub-Components/Realism.jsx';
// import Minimalism from './Sub-Components/Minimalism.jsx';
// import Impression from './Sub-Components/Impression.jsx';
// import Surrealism from './Sub-Components/Surrealism.jsx';
// import Digital from './Sub-Components/Digital.jsx';
// import Pop from './Sub-Components/Pop.jsx';
// import Portrait from './Sub-Components/Portrait.jsx';
// import Historical from './Sub-Components/Histoirical';
// import Express from './Sub-Components/Express.jsx';
// // import UserDiscoveryPage from './Components/Artisian/userDiscoveryPage.jsx';
// import UserDiscoveryPage from './Components/Artisian/userDiscoveryPage.jsx';
// import DiscoverUsers from './Components/Artisian/DiscoverArtists.jsx';
// import ArtistDiscovery from './Components/ArtistDiscovery.jsx';
// import DiaryCollection from './Components/Diaryland/DiaryCollection.jsx';
// import Notification from './Settings/Notification.jsx';


// // The commecial part starts from here 
// import Artstore from './Arteva/Artstore.jsx';
// import OrderHistory from './Arteva/Commercial/OrderHistory.jsx';
// import Cart from './Settings/Cart.jsx';
// import Order from './Settings/Order.jsx';
// import ArtMarketplace from './Arteva/ArtMarketPlace.jsx';

// // the community section
// import MyCommunity from './Community/MyCommunity.jsx';
// import DailyChallenge from './Components/DialyChallenge.jsx';
// import ResearchPapersPage from './Components/ResearchPaperPage.jsx';
// import AboutHandmade from './Company/About/AboutHandmade.jsx';
// import CreateNewChallenge from './Community/CommunityDashboard/CreateNewChallenge.jsx';
// import MemberDiscoveryPage from './Community/DiscoverNewMember/MemberDiscoveryPage.jsx';



// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
// const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
// const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;


// function App() {
// const { userId } = useParams();
// const [isOnline, setIsOnline] = useState(navigator.onLine);

//   // Add online/offline status detection
//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);

//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, []);


//   useEffect(() => {
//     AOS.init({
//       duration: 600,
//       once: true,
//       disable: 'mobile',
//       easing: 'ease-out',
//       offset: 100,
//     });
//   }, []);


//     useEffect(() => {
//       initGA();
//     trackPageview(window.location.pathname);
//   }, []);

// // const [diaryEntries, setDiaryEntries] = useState([]);

// useEffect(() => {
//   const checkAuth = async () => {
//     try {
//       const currentUser = await account.get();
//       // console.log('Logged in user:', currentUser);
//       // Save to state or context
//     } catch {
//       console.log('No active session');
//       Navigate('/login'); // Or show a guest view
//     }
//   };

//   checkAuth();
// }, []);

//   const [profileData, setProfileData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//     const fetchProfile = async () => {
//       setIsLoading(true);
//       try {
//         if (userId) {
//           // Load another user's profile from your database
//           const userDoc = await databases.getDocument(
//             DATABASE_ID,
//             USER_COLLECTION_ID,
//             userId
//           );
//           setProfileData(userDoc);
//         } else {
//           // Load your own profile from Appwrite account
//           const currentUser = await account.get();
//           const userDoc = await databases.getDocument(
//             DATABASE_ID,
//             USER_COLLECTION_ID,
//             currentUser.$id
//           );
//           setProfileData(userDoc);
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [userId]);
  
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <div className="flex items-center justify-center flex-col gap-y-4 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-[#000705] min-h-screen">
//               <Header />
//               <Suspense fallback={<div className="text-center py-6 text-blue-600">Loading...</div>}>
//                {/* // In your Header component or somewhere in your App return */}

//                 <div data-aos="fade-left" data-aos-delay="100" className="w-full will-change-transform will-change-opacity">
//                   <Style />
//                 </div>
//                 <div data-aos="fade-right" data-aos-delay="200" className="w-full will-change-transform will-change-opacity">
//                   < ArtistDiscovery />
//                 </div>
//                 <div data-aos="fade-right" data-aos-delay="200" className="w-full will-change-transform will-change-opacity">
//                   <Collection />
//                 </div>
//                 <div data-aos="fade-left" data-aos-delay="300" className="w-full will-change-transform will-change-opacity">
//                   <Diarytemp />
//                 </div>
//                 <div data-aos="fade-right" data-aos-delay="400" className="w-full will-change-transform will-change-opacity">
//                   <Connecting />
//                 </div>
//                 <div data-aos="fade-left" data-aos-delay="300" className="w-full will-change-transform will-change-opacity">
//                   <ResearchPapersPage />
//                 </div>
//                  <div data-aos="fade-right" data-aos-delay="400" className="w-full will-change-transform will-change-opacity">
//                   <DailyChallenge />
//                 </div>
//                 {/* <div data-aos="fade-left" data-aos-delay="400" className="w-full will-change-transform will-change-opacity">
//                   <Creativity />
//                 </div> */}
//                 <div data-aos="fade-right" data-aos-delay="600" className="w-full will-change-transform will-change-opacity">
//                   <Commerce />
//                 </div>
//                 <div data-aos="fade-left" data-aos-delay="700" className="w-full will-change-transform will-change-opacity">
//                   <Visual />
//                 </div>
//                 <div data-aos="fade-right" data-aos-delay="800" className="w-full will-change-transform will-change-opacity">
//                 <Artisan />
//                 </div>
//                 <div data-aos="fade-left" data-aos-delay="900" className="w-full flex items-center justify-center flex-col gap-y-2">
//                   <Review />
//                 </div>
//                 <div data-aos="fade-right" data-aos-delay="1000" className="w-full will-change-transform will-change-opacity">
//                   <Footer />
//                 </div>
//               </Suspense>
//             </div>
//           }
//         />
//         {/* Other routes remain the same */}
//         <Route path='/Account' element={<Account isOwnProfile={true}/>}/>
//         {/* <Route path="/profile/:userId" element={<Profile />} /> */}
//         <Route path='/Account/:userId' element={<Account isOwnProfile={false}/>}/>

//         {/* Authentication Routes */}
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />  
//         <Route path="/Login/ResetPassword" element={<ResetPassword />} />
//         <Route path="/Authentication/Verification/EmailVerification" element={<EmailVerification />} />


//         <Route path="/category" element={<Category />} />
//         <Route path="/diaryland" element={<Diaryland />} />
//         <Route path="/january" element={<January />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/favourite" element={<Favourite />} />
//         <Route path="/faqs" element={<FAQs />} />
//         <Route path='/settings/notification' element={<Notification/>}/>
//         <Route path='/settings/cart' element={<Cart/>}/>
//         <Route path='Settings/Order' element={<Order/>}/>
//         <Route path="/resources/feedback" element={<Feedback />} />
//         <Route path="/Account/Edit_profile" element={<Edit_Profile />} />
//         <Route path="/Account/dashboard" element={<Dashboard />} />
//         <Route path="/Account/Upload" element={<Upload />} />
//         {/* <Route path='/Account/Upload/Masterpiece' element={<UploadMasterpiece/>}/> */}
//         <Route path="/collections" element={<Your_Collections />} />
//         <Route path="/Journal" element={<Journal />} />
//         <Route path="/Legal/Privacy_Policy" element={<Privacy_Policy />} />
//         <Route path="/Legal/Terms_Conditions" element={<Terms_Conditions />} />
//         <Route path="/Legal/License" element={<License />} />
//         <Route path='/Product/Security' element={<Security/>}/>
  
//         <Route path="/cart" element={<Cart />} />
//         <Route path='/History' element={<History/>}/>
//         <Route path='/Resources/Help' element={<Help/>}/>
//         <Route path='/Company/About/AboutHandmade' element={<AboutHandmade/>}/>
//         {/* the community  section  */}
//         <Route path="/community" element={<Community />} />
//         <Route path="/community/CreateCommunity" element={<CreateCommunityPage />} />
//         <Route path='/community/ExploreCommunity' element={<ExploreCommunity/>}/>
//         <Route path='/community/:slug' element={<CommunityDashboard/>}/>
//         {/* <Route path="/community/:communityId" element={<CommunityDashboard />} /> */}
//         <Route path='/community/communitychallenges/weeklychallenge' element={<WeeklyChallenge/>}/>
//         <Route path='/community/communitychallenges/monthlychallenge' element={<MonthlyChallenge/>}/>
//         <Route path='/community/communitychallenges/votinggallery' element={<VotingGallery/>}/>
//         <Route path='/Community/Resources/ResourceHub' element={<ResourceHub/>}/>
//         <Route path='/Community/Resources/ResourceUpload' element={<ResourceUpload/>}/>
//         <Route path='/Community/CommunityChallenges/ChallengeUpload' element={<ChallengeUpload/>}/>
//         <Route path='/community/MyCommunity' element={<MyCommunity/>}/>
//         <Route path='/Community/CommunityDashboard/CreateNewChallenge' element={<CreateNewChallenge/>}/>
//         <Route path='/Community/DiscoverNewMember/MemberDiscoveryPage' element={<MemberDiscoveryPage/>}/>
        

      

//         {/* The routing of the sub-components */}
//         <Route path="/gallery" element={<Gallery />} />
//         <Route path='/gallery/:id' element={<Gallery />} />
//         <Route path='/Nature' element={<Nature/>}/>
//         <Route path='/Traditional' element={<Traditional/>}/>
//         <Route path='/Realism' element={<Realism/>}/>
//         <Route path='/Minimalism' element={<Minimalism/>}/>
//         <Route path='/Impressionism' element={<Impression/>}/>
//         <Route path='/Surrealism' element={<Surrealism/>}/>       
//         <Route path='/Digital' element={<Digital/>}/>
//         <Route path='/Pop-Art' element={<Pop/>}/>
//         <Route path='/Expressionism' element={<Express/>}/>
//         <Route path="/landscape" element={<Landscape />} />
//         <Route path="/portrait" element={<Portrait />} />
//         <Route path="/still-life" element={<Still_life />} />
//         <Route path="/oil_paint" element={<Oil_paint />} />
//         <Route path='/Photography' element={<Photography/>}/>
//         <Route path="/watercolor" element={<Water_color />} />
//         <Route path="/abstract" element={<Abstract />} />
//         <Route path="/historical" element={<Historical />} />
//         <Route path="/modern" element={<Modern />} />

//         {/* discovering artists  */}
//         <Route path='/Artist/discoverartists' element={<UserDiscoveryPage/>}/>
//         <Route path='/Artists/DiscoverUsers' element={<DiscoverUsers/>}/>


//         {/* Diary */}
//         <Route path='/Diaries/Diary-Collection' element={<DiaryCollection/>}/>
//         <Route path='/diary/:id' element = {<January/>}/>

//         {/* the routing of commercial section */}
//         <Route path='/Arteva/ArtStore' element = {<Artstore/>}/>
//         <Route path='/Arteva/Commercial/OrderHistory' element = {<OrderHistory/>}/>
//         <Route path='/Arteva/ArtMarketplace' element={<ArtMarketplace />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;



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
const Style = lazy(() => import('./Components/Style/Style'));
const Collection = lazy(() => import('./Components/Collections/Collection'));
const Diarytemp = lazy(() => import('./Components/Diarytemp/Diarytemp'));
const Connecting = lazy(() => import('./Components/Connecting/Connecting'));
const Creativity = lazy(() => import('./Components/Creativity/Creativity'));
const Commerce = lazy(() => import('./Components/Commerce/Commerce'))
const Visual = lazy(() => import('./Components/Visual/Visual'));
const Review = lazy(() => import('./Components/Review/Review'));

// Import your InstallPrompt component
import InstallPrompt from './MainApp.jsx'
// Other imports remain the same...
import Account from './Components/Account/Account';
import Upload from './Components/Upload/Upload.jsx';

// Authentication Service 
import Signup from './Components/Authentication/Signup/Signup.jsx';
import Login from './Components/Authentication/Login/Login.jsx';
import ResetPassword from './Components/Authentication/Login/ResetPassword.jsx';
import EmailVerification from './Components/Authentication/Verification/EmailVerification.jsx';

import Gallery from './Components/Gallery/Gallery';
import Category from './Components/Category/Category';
import Landscape from './Sub-Components/Landscape';
import Still_life from './Sub-Components/Still_life';
import Oil_paint from './Sub-Components/Oil_paint';
import Water_color from './Sub-Components/Water_color';
import Abstract from './Sub-Components/Abstract';
import Modern from './Sub-Components/Modern';
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
import Privacy_Policy from './Legal/Privacy_Policy/Privacy_Policy';
import Terms_Conditions from './Legal/Terms&Conditipons/Terms_Conditions.jsx';
import License from './Legal/License.jsx';
import Help from './Resources/Help/Help.jsx';
import Artisan from './Components/Artisian/Artisian.jsx';
import Security from './Product/Security.jsx';

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

import Nature from './Sub-Components/Nature.jsx';
import Traditional from './Sub-Components/Traditional.jsx';
import Photography from './Sub-Components/Photography.jsx';
import Realism from './Sub-Components/Realism.jsx';
import Minimalism from './Sub-Components/Minimalism.jsx';
import Impression from './Sub-Components/Impression.jsx';
import Surrealism from './Sub-Components/Surrealism.jsx';
import Digital from './Sub-Components/Digital.jsx';
import Pop from './Sub-Components/Pop.jsx';
import Portrait from './Sub-Components/Portrait.jsx';
import Historical from './Sub-Components/Histoirical';
import Express from './Sub-Components/Express.jsx';
import UserDiscoveryPage from './Components/Artisian/userDiscoveryPage.jsx';
import DiscoverUsers from './Components/Artisian/DiscoverArtists.jsx';
import ArtistDiscovery from './Components/ArtistDiscovery.jsx';
import DiaryCollection from './Components/Diaryland/DiaryCollection.jsx';
import Notification from './Settings/Notification.jsx';

// The commecial part starts from here 
import Artstore from './Arteva/Artstore.jsx';
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
      disable: 'mobile',
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

  return (
    <Router>
      {/* Online Status Indicator
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '5px 10px',
        borderRadius: '15px',
        backgroundColor: isOnline ? '#4CAF50' : '#F44336',
        color: 'white',
        fontSize: '12px',
        zIndex: 1000
      }}>
        {isOnline ? 'Online' : 'Offline'}
      </div> */}
      
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center flex-col gap-y-4 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-[#000705] min-h-screen">
              <Header />
              <Suspense fallback={<div className="text-center py-6 text-blue-600">Loading...</div>}>
                {/* Install Prompt Component */}
                <InstallPrompt />
                
                <div data-aos="fade-left" data-aos-delay="100" className="w-full will-change-transform will-change-opacity">
                  <Style />
                </div>
                <div data-aos="fade-right" data-aos-delay="200" className="w-full will-change-transform will-change-opacity">
                  < ArtistDiscovery />
                </div>
                <div data-aos="fade-right" data-aos-delay="200" className="w-full will-change-transform will-change-opacity">
                  <Collection />
                </div>
                <div data-aos="fade-left" data-aos-delay="300" className="w-full will-change-transform will-change-opacity">
                  <Diarytemp />
                </div>
                <div data-aos="fade-right" data-aos-delay="400" className="w-full will-change-transform will-change-opacity">
                  <Connecting />
                </div>
                <div data-aos="fade-left" data-aos-delay="300" className="w-full will-change-transform will-change-opacity">
                  <ResearchPapersPage />
                </div>
                 <div data-aos="fade-right" data-aos-delay="400" className="w-full will-change-transform will-change-opacity">
                  <DailyChallenge />
                </div>
                <div data-aos="fade-right" data-aos-delay="600" className="w-full will-change-transform will-change-opacity">
                  <Commerce />
                </div>
                <div data-aos="fade-left" data-aos-delay="700" className="w-full will-change-transform will-change-opacity">
                  <Visual />
                </div>
                <div data-aos="fade-right" data-aos-delay="800" className="w-full will-change-transform will-change-opacity">
                <Artisan />
                </div>
                <div data-aos="fade-left" data-aos-delay="900" className="w-full flex items-center justify-center flex-col gap-y-2">
                  <Review />
                </div>
                <div data-aos="fade-right" data-aos-delay="1000" className="w-full will-change-transform will-change-opacity">
                  <Footer />
                </div>
              </Suspense>
            </div>
          }
        />
        {/* Other routes remain the same */}
        <Route path='/Account' element={<Account isOwnProfile={true}/>}/>
        <Route path='/Account/:userId' element={<Account isOwnProfile={false}/>}/>

        {/* Authentication Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />  
        <Route path="/Login/ResetPassword" element={<ResetPassword />} />
        <Route path="/Authentication/Verification/EmailVerification" element={<EmailVerification />} />

        <Route path="/category" element={<Category />} />
        <Route path="/diaryland" element={<Diaryland />} />
        <Route path="/january" element={<January />} />
        <Route path="/about" element={<About />} />
        <Route path="/favourite" element={<Favourite />} />
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
        <Route path="/Legal/Privacy_Policy" element={<Privacy_Policy />} />
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
        <Route path='/Nature' element={<Nature/>}/>
        <Route path='/Traditional' element={<Traditional/>}/>
        <Route path='/Realism' element={<Realism/>}/>
        <Route path='/Minimalism' element={<Minimalism/>}/>
        <Route path='/Impressionism' element={<Impression/>}/>
        <Route path='/Surrealism' element={<Surrealism/>}/>       
        <Route path='/Digital' element={<Digital/>}/>
        <Route path='/Pop-Art' element={<Pop/>}/>
        <Route path='/Expressionism' element={<Express/>}/>
        <Route path="/landscape" element={<Landscape />} />
        <Route path="/portrait" element={<Portrait />} />
        <Route path="/still-life" element={<Still_life />} />
        <Route path="/oil_paint" element={<Oil_paint />} />
        <Route path='/Photography' element={<Photography/>}/>
        <Route path="/watercolor" element={<Water_color />} />
        <Route path="/abstract" element={<Abstract />} />
        <Route path="/historical" element={<Historical />} />
        <Route path="/modern" element={<Modern />} />

        {/* discovering artists  */}
        <Route path='/Artist/discoverartists' element={<UserDiscoveryPage/>}/>
        <Route path='/Artists/DiscoverUsers' element={<DiscoverUsers/>}/>

        {/* Diary */}
        <Route path='/Diaries/Diary-Collection' element={<DiaryCollection/>}/>
        <Route path='/diary/:id' element = {<January/>}/>

        {/* the routing of commercial section */}
        <Route path='/Arteva/ArtStore' element = {<Artstore/>}/>
        <Route path='/Arteva/Commercial/OrderHistory' element = {<OrderHistory/>}/>
        <Route path='/Arteva/ArtMarketplace' element={<ArtMarketplace />} />

      </Routes>
    </Router>
  );
}

export default App;