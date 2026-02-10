// // import React, { useState, useEffect, useRef } from 'react';
// // import { useParams, Link, useNavigate } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // // Custom hooks and components
// // import { useAccountData } from './hooks/useAccountData';
// // import Header from './components/Header';
// // // import SidebarMenu from './components/SidebarMenu';
// // import CoverSection from './components/CoverSection';
// // import ProfileInfo from './components/ProfileInfo';
// // import StatsSection from './components/StatsSection';
// // import TabContent from './components/TabContent';

// // // Services
// // import { account } from '../../../appwriteConfig';
// // import { uploadImage, updateUserImages } from '../uploadImage';

// // const PROFILE_BUCKET = import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID;
// // const COVER_BUCKET = import.meta.env.VITE_APPWRITE_COVER_BUCKET_ID;

// // function Account({ isOwnProfile = true }) {
// //   const { userId: viewedUserId } = useParams();
// //   const navigate = useNavigate();
  
// //   // Custom hook for data management
// //   const {
// //     currentUser,
// //     profileData,
// //     loading,
// //     error,
// //     followerCount,
// //     followingCount,
// //     collectionCount,
// //     setFollowerCount,
// //     setFollowingCount
// //   } = useAccountData(isOwnProfile, viewedUserId);

// //   // UI states
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [activeTab, setActiveTab] = useState('collections');
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// //   const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  
// //   // Images
// //   const [coverImage, setCoverImage] = useState(null);
// //   const [showCoverButton, setShowCoverButton] = useState(true);
// //   const [profileImage, setProfileImage] = useState(null);
  
// //   // Refs
// //   const dropdownRef = useRef(null);
// //   const timeoutRef = useRef(null);

// //   // Authentication check
// //   useEffect(() => {
// //     const checkUser = async () => {
// //       try {
// //         await account.get();
// //       } catch (err) {
// //         setError('User not logged in. Redirecting...');
// //         setTimeout(() => navigate('/login'), 1000);
// //       }
// //     };

// //     checkUser();
// //   }, [navigate]);

// //   // Load images from profile data
// //   useEffect(() => {
// //     if (profileData) {
// //       if (profileData.profileImageUrl) setProfileImage(profileData.profileImageUrl);
// //       if (profileData.coverImageUrl) {
// //         setCoverImage(profileData.coverImageUrl);
// //         setShowCoverButton(false);
// //       }
// //     }
// //   }, [profileData]);

// //   // Responsive handlers
// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsLargeScreen(window.innerWidth >= 1024);
// //     };
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   useEffect(() => {
// //     const handleOutsideClick = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !isLargeScreen) {
// //         setIsDropdownOpen(false);
// //       }
// //     };
// //     document.addEventListener('click', handleOutsideClick);
// //     return () => document.removeEventListener('click', handleOutsideClick);
// //   }, [isLargeScreen]);

// //   const handleMouseEnter = () => {
// //     if (isLargeScreen) {
// //       clearTimeout(timeoutRef.current);
// //       setIsDropdownOpen(true);
// //     }
// //   };

// //   const handleMouseLeave = () => {
// //     if (isLargeScreen) {
// //       timeoutRef.current = setTimeout(() => {
// //         setIsDropdownOpen(false);
// //       }, 300);
// //     }
// //   };

// //   const toggleDropdown = () => {
// //     setIsDropdownOpen(!isDropdownOpen);
// //   };

// //   useEffect(() => {
// //     return () => clearTimeout(timeoutRef.current);
// //   }, []);

// //   // Handlers
// //   const handleLogout = async () => {
// //     if (window.confirm('Are you sure you want to log out?')) {
// //       try {
// //         await account.deleteSession('current');
// //         localStorage.clear();
// //         window.location.href = '/login';
// //         toast.success('Logged out successfully');
// //       } catch (error) {
// //         toast.error('Logout failed');
// //         console.error('Logout error:', error);
// //       }
// //     }
// //   };

// //   const handleCoverImage = async (input) => {
// //     try {
// //       let coverUrl = null;

// //       // CASE 1: User selected a FILE
// //       if (input.target && input.target.files?.[0]) {
// //         const file = input.target.files[0];

// //         // File validations
// //         if (!file.type.startsWith('image/')) {
// //           toast.error('Only image files are allowed');
// //           return;
// //         }

// //         if (file.size >= 5 * 1024 * 1024) {
// //           toast.error('File size must be less than 5MB');
// //           return;
// //         }

// //         toast.info("Uploading cover image...");
// //         coverUrl = await uploadImage(file, COVER_BUCKET);
// //       }

// //       // CASE 2: User selected an EXTERNAL IMAGE URL (predefined image)
// //       else if (typeof input === "string") {
// //         if (!input.startsWith("http")) {
// //           toast.error("Invalid image URL");
// //           return;
// //         }

// //         coverUrl = input; // Use the URL directly, no upload needed
// //         toast.info("Applying selected cover...");
// //       }

// //       // CASE 3: Invalid input
// //       else {
// //         toast.error("Invalid cover image");
// //         return;
// //       }

// //       // Update in Appwrite
// //       await updateUserImages(currentUser.$id, { coverImageUrl: coverUrl });

// //       // Update UI
// //       setCoverImage(coverUrl);
// //       setShowCoverButton(false);

// //       toast.success("Cover image updated!");
      
// //     } catch (error) {
// //       toast.error(error.message || "Failed to update cover image");
// //       console.error(error);
// //     }
// //   };

// //   const handleProfileImageUpload = async (event) => {
// //     const file = event.target.files[0];
// //     if (!file) return;

// //     if (!file.type.startsWith('image/')) {
// //       toast.error('Only image files are allowed');
// //       return;
// //     }

// //     if (file.size >= 2 * 1024 * 1024) {
// //       toast.error('File size must be less than 2MB');
// //       return;
// //     }

// //     try {
// //       toast.info('Uploading profile image...');
// //       const profileUrl = await uploadImage(file, PROFILE_BUCKET);
// //       await updateUserImages(currentUser.$id, { profileImageUrl: profileUrl });
// //       setProfileImage(profileUrl);
// //       toast.success('Profile picture updated!');
// //     } catch (error) {
// //       toast.error(error.message || 'Failed to update profile picture');
// //       console.error(error);
// //     }
// //   };

// //   // Loading and error states
// //   if (loading) {
// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-950">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
// //         <p className="mt-4 text-gray-600 dark:text-gray-300 font-Playfair">Loading your profile...</p>
// //       </div>
// //     );
// //   }

// //   if (error && !profileData) {
// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
// //         <p className="text-red-500 font-medium font-Quicksand">⚠ Failed to load profile</p>
// //         <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 font-Playfair">{error}</p>
// //         <button 
// //           onClick={() => window.location.reload()}
// //           className="mt-4 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-200 font-Playfair"
// //         >
// //           Retry
// //         </button>
// //       </div>
// //     );
// //   }

// //   if (!profileData) {
// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
// //         <p className="text-gray-700 dark:text-gray-200 font-medium font-Quicksand">No profile found</p>
// //         <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-Playfair">
// //           Please check your account or try again later.
// //         </p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="w-full min-h-screen flex flex-col pb-6 overflow-x-hidden bg-gray-50 dark:bg-zinc-950">
// //       <ToastContainer position='top-left' />

// //       <Header
// //         isOwnProfile={isOwnProfile}
// //         profileData={profileData}
// //         isDropdownOpen={isDropdownOpen}
// //         setIsDropdownOpen={setIsDropdownOpen}
// //         dropdownRef={dropdownRef}
// //         handleMouseEnter={handleMouseEnter}
// //         handleMouseLeave={handleMouseLeave}
// //         toggleDropdown={toggleDropdown}
// //         handleLogout={handleLogout}
// //         isMenuOpen={isMenuOpen}
// //         setIsMenuOpen={setIsMenuOpen}
// //       />

// //       {/* <SidebarMenu
// //         isMenuOpen={isMenuOpen}
// //         setIsMenuOpen={setIsMenuOpen}
// //         profileData={profileData}
// //         profileImage={profileImage}
// //         followerCount={followerCount}
// //       /> */}

// //       {/* Main Content */}
// //       <div className="pt-[64px] w-full">
// //         <CoverSection
// //           coverImage={coverImage}
// //           showCoverButton={showCoverButton}
// //           isOwnProfile={isOwnProfile}
// //           handleCoverImage={handleCoverImage}
// //         />

// //         <div className="p-4 md:px-6 w-full md:w-[72%] mx-auto">
// //           <ProfileInfo
// //             profileData={profileData}
// //             isOwnProfile={isOwnProfile}
// //             currentUser={currentUser}
// //             viewedUserId={viewedUserId}
// //             profileImage={profileImage}
// //             handleProfileImageUpload={handleProfileImageUpload}
// //             setFollowerCount={setFollowerCount}
// //             setFollowingCount={setFollowingCount}
// //           />

// //           {/* Stats Section */}
// //           <StatsSection
// //             userId={isOwnProfile ? currentUser?.$id : viewedUserId}
// //             collectionCount={collectionCount}
// //             onCountsUpdate={(counts) => {
// //               setFollowerCount(counts.followers);
// //               setFollowingCount(counts.following);
// //             }}
// //             // showRefresh={isOwnProfile}
// //           />

// //           {/* Tabs */}
// //           {/* <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
// //             <div className="flex space-x-6">
// //               {['collections', 'about'].map((tab) => (
// //                 <button
// //                   key={tab}
// //                   onClick={() => setActiveTab(tab)}
// //                   className={`pb-3 text-sm font-semibold capitalize transition-all duration-200 ${
// //                     activeTab === tab 
// //                       ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' 
// //                       : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400'
// //                   } font-Quicksand`}
// //                 >
// //                   {tab}
// //                 </button>
// //               ))}
// //             </div>
// //           </div> */}
// //           </div>

// //           <div className='w-full md:w-[72%] mx-auto'>
// //           {/* Tab Content */}
// //           <TabContent
// //             activeTab={activeTab}
// //             isOwnProfile={isOwnProfile}
// //             currentUser={currentUser}
// //             viewedUserId={viewedUserId}
// //             profileData={profileData}
// //           />
          
// //           </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Account;



// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Hooks & Services
// import { useAccountData } from './hooks/useAccountData';
// import { account } from '../../../appwriteConfig';
// import { uploadImage, updateUserImages } from '../uploadImage';

// // Components
// import Header from './components/Header';
// import CoverSection from './components/CoverSection';
// import SidebarProfile from './components/SidebarProfile'; // NEW: Replaces ProfileInfo
// import TabContent from './components/TabContent';

// const COVER_BUCKET = import.meta.env.VITE_APPWRITE_COVER_BUCKET_ID;
// const PROFILE_BUCKET = import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID;

// function Account({ isOwnProfile = true }) {
//   const { userId: viewedUserId } = useParams();
//   const navigate = useNavigate();
  
//   // Data Hook
//   const {
//     currentUser,
//     profileData,
//     loading,
//     error,
//     followerCount,
//     followingCount,
//     collectionCount,
//     setFollowerCount,
//     setFollowingCount
//   } = useAccountData(isOwnProfile, viewedUserId);

//   // Local State
//   const [activeTab, setActiveTab] = useState('collections');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [coverImage, setCoverImage] = useState(null);
//   const [profileImage, setProfileImage] = useState(null);
  
//   const dropdownRef = useRef(null);

//   // Auth Check
//   useEffect(() => {
//     const checkUser = async () => {
//       try { await account.get(); } 
//       catch (err) { navigate('/login'); }
//     };
//     checkUser();
//   }, [navigate]);

//   // Sync Images
//   useEffect(() => {
//     if (profileData) {
//       if (profileData.profileImageUrl) setProfileImage(profileData.profileImageUrl);
//       if (profileData.coverImageUrl) setCoverImage(profileData.coverImageUrl);
//     }
//   }, [profileData]);

//   // --- HANDLERS (Kept exactly the same logic as before) ---
//   const handleLogout = async () => {
//     if (window.confirm('Log out?')) {
//       await account.deleteSession('current');
//       localStorage.clear();
//       window.location.href = '/login';
//     }
//   };

//   const handleCoverImage = async (input) => {
//     try {
//       let coverUrl = null;
//       if (input.target?.files?.[0]) {
//         const file = input.target.files[0];
//         coverUrl = await uploadImage(file, COVER_BUCKET);
//       } else if (typeof input === "string") {
//         coverUrl = input;
//       } else return;
      
//       await updateUserImages(currentUser.$id, { coverImageUrl: coverUrl });
//       setCoverImage(coverUrl);
//       toast.success("Cover updated");
//     } catch (error) { toast.error("Failed to update cover"); }
//   };

//   const handleProfileImageUpload = async (event) => {
//     try {
//       const file = event.target.files[0];
//       if (!file) return;
//       toast.info("Uploading...");
//       const profileUrl = await uploadImage(file, PROFILE_BUCKET);
//       await updateUserImages(currentUser.$id, { profileImageUrl: profileUrl });
//       setProfileImage(profileUrl);
//       toast.success("Avatar updated");
//     } catch (error) { toast.error("Failed to update avatar"); }
//   };

//   if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div></div>;
//   if (!profileData) return null;

//   return (
//     <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">
//       <ToastContainer position='bottom-right' theme="dark" />

//       {/* 1. Header */}
//       <Header
//         isOwnProfile={isOwnProfile}
//         profileData={profileData}
//         isDropdownOpen={isDropdownOpen}
//         setIsDropdownOpen={setIsDropdownOpen}
//         dropdownRef={dropdownRef}
//         toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
//         handleLogout={handleLogout}
//       />

//       <div className="pt-16 pb-20">
        
//         {/* 2. Full Width Cover */}
//         <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
//           <CoverSection
//             coverImage={coverImage}
//             isOwnProfile={isOwnProfile}
//             handleCoverImage={handleCoverImage}
//             showCoverButton={true}
//           />
//         </div>

//         {/* 3. The Professional Grid Layout */}
//         <main className="max-w-[1100px] mx-auto px-4 sm:px-6 mt-4">
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
//             {/* LEFT SIDEBAR (Identity) - Spans 4 cols on desktop */}
//             <div className="md:col-span-4 lg:col-span-4 relative">
//               {/* Negative margin pulls it up over the cover */}
//               <div className="-mt-16 md:-mt-20 relative z-20">
//                 <SidebarProfile 
//                   profileData={profileData}
//                   isOwnProfile={isOwnProfile}
//                   currentUser={currentUser}
//                   profileImage={profileImage}
//                   handleProfileImageUpload={handleProfileImageUpload}
//                   // Pass stats down
//                   stats={{ followers: followerCount, following: followingCount, collections: collectionCount }}
//                   viewedUserId={viewedUserId}
//                 />
//               </div>
//             </div>

//             {/* RIGHT CONTENT (Feed) - Spans 8 cols on desktop */}
//             <div className="md:col-span-8 lg:col-span-8">
//               {/* Sticky Tabs */}
//               <div className="sticky top-16 z-30 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 mb-6 -mx-4 px-4 md:mx-0 md:px-0">
//                 <nav className="flex gap-8">
//                    {['collections', 'about'].map((tab) => (
//                      <button
//                        key={tab}
//                        onClick={() => setActiveTab(tab)}
//                        className={`
//                          py-4 text-sm font-semibold capitalize border-b-2 transition-colors
//                          ${activeTab === tab 
//                            ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white' 
//                            : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'}
//                        `}
//                      >
//                        {tab}
//                      </button>
//                    ))}
//                 </nav>
//               </div>

//               {/* Dynamic Content */}
//               <TabContent 
//                 activeTab={activeTab} 
//                 isOwnProfile={isOwnProfile} 
//                 profileData={profileData} 
//                 currentUser={currentUser}
//                 viewedUserId={viewedUserId}
//               />
//             </div>

//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Account;




import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAccountData } from './hooks/useAccountData';
import { account } from '../../../appwriteConfig';
import { uploadImage, updateUserImages } from '../uploadImage';

import Header from './components/Header';
import CoverSection from './components/CoverSection';
import SidebarProfile from './components/SidebarProfile';
import Your_Collections from '../Your_Collection/Your_Collections';

const COVER_BUCKET = import.meta.env.VITE_APPWRITE_COVER_BUCKET_ID;
const PROFILE_BUCKET = import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID;

function Account({ isOwnProfile = true }) {
  const { userId: viewedUserId } = useParams();
  const navigate = useNavigate();
  
  const {
    currentUser,
    profileData,
    loading,
    followerCount,
    followingCount,
    collectionCount,
  } = useAccountData(isOwnProfile, viewedUserId);

  const [activeTab, setActiveTab] = useState('collections');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkUser = async () => {
      try { await account.get(); } 
      catch (err) { navigate('/login'); }
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    if (profileData) {
      if (profileData.profileImageUrl) setProfileImage(profileData.profileImageUrl);
      if (profileData.coverImageUrl) setCoverImage(profileData.coverImageUrl);
    }
  }, [profileData]);

  // Handlers (Logout, Cover Upload, Profile Upload - kept same)
  const handleLogout = async () => {
    if (window.confirm('Log out?')) {
      await account.deleteSession('current');
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  const handleCoverImage = async (input) => {
    try {
      let coverUrl = null;
      if (input.target?.files?.[0]) {
        const file = input.target.files[0];
        coverUrl = await uploadImage(file, COVER_BUCKET);
      } else if (typeof input === "string") {
        coverUrl = input;
      } else return;
      await updateUserImages(currentUser.$id, { coverImageUrl: coverUrl });
      setCoverImage(coverUrl);
      toast.success("Cover updated");
    } catch (error) { toast.error("Failed to update cover"); }
  };

  const handleProfileImageUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;
      toast.info("Uploading...");
      const profileUrl = await uploadImage(file, PROFILE_BUCKET);
      await updateUserImages(currentUser.$id, { profileImageUrl: profileUrl });
      setProfileImage(profileUrl);
      toast.success("Avatar updated");
    } catch (error) { toast.error("Failed to update avatar"); }
  };

  if (loading) return <div className="h-screen flex items-center justify-center dark:bg-zinc-950 bg-zinc-100"><div className="animate-spin rounded-full h-8 w-8 border-b-2 dark:border-white border-zinc-900"></div></div>;
  if (!profileData) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      <ToastContainer position='bottom-right' theme="dark" />

      {/* 1. Header (Fixed) */}
      <Header
        isOwnProfile={isOwnProfile}
        profileData={profileData}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        dropdownRef={dropdownRef}
        toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
        handleLogout={handleLogout}
      />

      <div className="pt-16 pb-20">
        
        {/* 2. Cover Section (Full Width Desktop) */}
        <div className="w-full max-w-[1600px] mx-auto md:px-6">
          <CoverSection
            coverImage={coverImage}
            isOwnProfile={isOwnProfile}
            handleCoverImage={handleCoverImage}
            showCoverButton={true}
          />
        </div>

        {/* 3. Main Grid Layout */}
        <main className="max-w-[1400px] mx-auto px-1 sm:px-4 md:px-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT SIDEBAR: Identity */}
            <div className="lg:col-span-3 relative">
               <SidebarProfile 
                 profileData={profileData}
                 isOwnProfile={isOwnProfile}
                 currentUser={currentUser}
                 profileImage={profileImage}
                 handleProfileImageUpload={handleProfileImageUpload}
                 stats={{ followers: followerCount, following: followingCount, collections: collectionCount }}
                 viewedUserId={viewedUserId}
               />
            </div>

            {/* RIGHT CONTENT: Tabs + Feed */}
            <div className="lg:col-span-9">
               {/* New Tab Navigation */}
               {/* <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} /> */}
               
               {/* Content Feed */}
               <div className="min-h-[500px]">
                  {activeTab === 'collections' && (
                    <Your_Collections userId={isOwnProfile ? currentUser?.$id : viewedUserId} />
                  )}
                  {activeTab !== 'collections' && (
                    <div className="py-20 text-center text-zinc-500">
                      <p>Content for {activeTab} coming soon...</p>
                    </div>
                  )}
               </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Account;