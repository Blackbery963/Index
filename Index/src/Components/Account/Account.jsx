import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { account, databases,storage,ID } from '../../appwriteConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Query } from 'appwrite';
import { followService } from '../../Follow/FollowService';
import { getCollectionCount } from './getUploadArt';
import Your_Collections from './Your_Collection/Your_Collections';
import FollowButton from '../../Follow/FollowButton';
import { uploadImage } from './uploadImage';
import { updateUserImages } from './uploadImage';
// Icons
import { FaUserEdit, FaFacebook, FaInstagram, FaPalette, FaGlobe, FaLinkedin, } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { CiEdit } from 'react-icons/ci';
import { FiUpload, FiEdit, FiMenu } from 'react-icons/fi';
import { IoIosLogOut } from 'react-icons/io';
import { ImBlog } from 'react-icons/im';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { MdOutlineFeedback, MdHistory, MdOutlinePhotoCameraBack, MdLocationOn, MdClose, MdOutlineDashboardCustomize } from 'react-icons/md';
import { FaHome, FaUsers, FaUser, FaImages, FaHandsHelping } from 'react-icons/fa';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
const PROFILE_BUCKET = import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID;
const COVER_BUCKET = import.meta.env.VITE_APPWRITE_COVER_BUCKET_ID;


function Account({ isOwnProfile = true }) {
  const { userId: viewedUserId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('collections');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  
  // Images
  const [coverImage, setCoverImage] = useState(null);
  const [showCoverButton, setShowCoverButton] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  
  // Social stats
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [collectionCount, setCollectionCount] = useState(0);

  //navigation
    const navigate = useNavigate(); 
  
  // Refs
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Fetch user data

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const userSession = await account.get();
        setCurrentUser(userSession);
        const targetUserId = isOwnProfile ? userSession.$id : viewedUserId;
        
        if (!targetUserId) throw new Error('User not found');
        
        const userDoc = await databases.getDocument(
          DATABASE_ID,
          USER_COLLECTION_ID,
          targetUserId
        );
        
        setProfileData({
          ...userDoc,
          nickname: userDoc.nickname || userDoc.name || '',
          username: userDoc.username || userDoc.name || '',
          bio: userDoc.bio || '',
          artStyle: userDoc.artStyle || '',
          location: userDoc.location || '',
          portfolio: userDoc.portfolio || '',
          facebook: userDoc.facebook || '',
          instagram: userDoc.instagram || '',
          twitter: userDoc.twitter || '',
          linkedin: userDoc.linkedin || ''
        });

        // Load images from database for all users
        if (userDoc.profileImageUrl) setProfileImage(userDoc.profileImageUrl);
        if (userDoc.coverImageUrl) {
          setCoverImage(userDoc.coverImageUrl);
          setShowCoverButton(false);
        }
        
        // Load social stats
        const [followers, following, collections] = await Promise.all([
          followService.getFollowerCount(targetUserId),
          followService.getFollowingCount(targetUserId),
          getCollectionCount(targetUserId)
        ]);
        
        setFollowerCount(followers);
        setFollowingCount(following);
        setCollectionCount(collections);
        
      } catch (err) {
        setError(err.message);
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isOwnProfile, viewedUserId]);

  // checkinl authentication 
    useEffect(() => {
    const checkUser = async () => {
      try {
        await account.get(); // Tries to get current session
        setLoading(false);   // If successful, stop loading
      } catch (err) {
        setError('User not logged in. Redirecting...');
        setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        await account.deleteSession('current');
        localStorage.clear();
        window.location.href = '/login';
        toast.success('Logged out successfully');
      } catch (error) {
        toast.error('Logout failed');
        console.error('Logout error:', error);
      }
    }
  };

  const handleCoverImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed');
      return;
    }

    if (file.size >= 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    try {
      toast.info('Uploading cover image...');
      const coverUrl = await uploadImage(file, COVER_BUCKET);
      await updateUserImages(currentUser.$id, { coverImageUrl: coverUrl });
      setCoverImage(coverUrl);
      setShowCoverButton(false);
      toast.success('Cover image updated!');
    } catch (error) {
      toast.error(error.message || 'Failed to update cover image');
      console.error(error);
    }
  };


//   const handleCoverImage = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   if (!file.type.startsWith('image/')) return toast.error('Only image files are allowed');
//   if (file.size >= 5 * 1024 * 1024) return toast.error('File size must be less than 5MB');

//   try {
//     toast.info('Uploading cover image...');
//     const coverUrl = await uploadImage(file, COVER_BUCKET);
//     await updateUserImages(currentUser.$id, { coverImageUrl: coverUrl });

//     // Prevent cache issues
//     setCoverImage(`${coverUrl}?t=${Date.now()}`);
//     setShowCoverButton(false);

//     toast.success('Cover image updated!');
//   } catch (error) {
//     toast.error(error.message || 'Failed to update cover image');
//   }
// };


  const handleProfileImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed');
      return;
    }

    if (file.size >= 2 * 1024 * 1024) {
      toast.error('File size must be less than 2MB');
      return;
    }

    try {
      toast.info('Uploading profile image...');
      const profileUrl = await uploadImage(file, PROFILE_BUCKET);
      await updateUserImages(currentUser.$id, { profileImageUrl: profileUrl });
      setProfileImage(profileUrl);
      toast.success('Profile picture updated!');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile picture');
      console.error(error);
    }
  };
  
  // Responsive handlers
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !isLargeScreen) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isLargeScreen]);

  const handleMouseEnter = () => {
    if (isLargeScreen) {
      clearTimeout(timeoutRef.current);
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isLargeScreen) {
      timeoutRef.current = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 300);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  // Navigation routes
  const routes = {
    Home: "/",
    Gallery: "/gallery",
    Category: "/category",
    "My Account": "/account",
    History: "/History",
    Community: "/community",
    Blog: "/blog",
    FAQs: "/FAQs",
    Help: "/Resources/Help",
    Feedback: "/Resources/Feedback",
  };

  const routeIcons = {
    Home: <FaHome />,
    Gallery: <FaImages />,
    Category: <BiCategoryAlt />,
    "My Account": <FaUser />,
    History: <MdHistory />,
    Community: <FaUsers />,
    Blog: <ImBlog />,
    FAQs: <IoMdHelpCircleOutline />,
    Help: <FaHandsHelping />,
    Feedback: <MdOutlineFeedback />,
  };

  // Animation variants
  const menuVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
    closed: { x: '-100%', opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const coverVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };
 if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 animate-fade-in">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 animate-fade-in">
        <p className="text-red-500 font-medium">⚠ Failed to load profile</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 animate-fade-in">
        <p className="text-gray-700 dark:text-gray-200 font-medium">No profile found</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Please check your account or try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col pb-6 overflow-x-hidden bg-gray-50 dark:bg-gray-900">
      <ToastContainer position='top-left' />

      {/* Floating Header */}
      <header className="w-full h-[80px] bg-white/40 dark:bg-gray-800/80 backdrop-blur-md flex items-center justify-between px-6 z-50 fixed border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMenu className="text-xl text-gray-800 dark:text-gray-200" />
          </button>
          <Link to={'/'}>
          <h1 className="font-Eagle font-bold lg:text-[32px] md:text-[28px] sm:text-[22px] text-[18px] text-[#001F3F] dark:text-white">
            Painters' Diary
          </h1>
          </Link>        
        </div>

        {isOwnProfile && (
          <div
            className="relative group"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleDropdown}
            >
              {/* <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                {profileData.username?.charAt(0) || 'U'}
              </div>
              <span className="hidden md:inline text-gray-800 dark:text-gray-200 font-medium font-Playfair">
                {profileData.username || 'User'}
              </span> */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
  {profileData?.username?.charAt(0) || 'U'}
</div>
<span className="hidden md:inline text-gray-800 dark:text-gray-200 font-medium font-Playfair">
  {profileData?.username || 'User'}
</span>

            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-6 w-48 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  <Link to={'/account/edit_profile'}>
                    <button
                      className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <CiEdit className="text-lg" />
                      Edit Profile
                    </button>
                  </Link>

                  <Link to={'/account/dashboard'}>
                    <button
                      className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <MdOutlineDashboardCustomize className="text-lg" />
                      Dashboard
                    </button>
                  </Link>

                  <button
                    className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm transition-colors"
                    onClick={handleLogout}
                  >
                    <IoIosLogOut className="text-lg" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </header>

      {/* Sliding Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-80 sm:w-96 h-full bg-white dark:bg-gray-900 shadow-2xl z-[9999] overflow-y-auto"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="h-48 bg-slate-700 dark:bg-gray-800 p-6 flex items-start justify-between">
              <div className="flex items-center gap-4 w-full">
                <div className="h-24 w-24 sm:h-28 sm:w-28 bg-white dark:bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <FaUser className="text-4xl text-gray-400 dark:text-gray-300" />
                  )}
                </div>
                <div>
                  <h1 className="text-white font-medium">{profileData.nickname || 'Username'}</h1>
                  <p className="text-white/80 text-sm">{profileData.email || 'user@example.com'}</p>
                  <p className="text-white/80 text-sm mt-1">Followers: {followerCount}</p>
                </div>
              </div>
              <button
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <MdClose className="text-xl" />
              </button>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-950 h-[calc(100%-12rem)]">
              {Object.keys(routes).map((item) => (
                <Link
                  to={routes[item]}
                  key={item}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors mb-1 font-Playfair"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg">{routeIcons[item]}</span>
                  <span className="font-medium">{item}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="pt-[80px] w-full">
        {/* Cover Image Section */}
         <motion.div
  className="w-full md:w-[80%] mx-auto h-80 md:h-96 relative overflow-hidden rounded-b-md"
  variants={coverVariants}
  initial="hidden"
  animate="visible"
>
  {showCoverButton && isOwnProfile ? (
    <label
      htmlFor="cover-upload"
      className="w-full h-full flex items-center justify-center cursor-pointer bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 hover:opacity-90 transition-opacity"
    >
      <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm">
        <MdOutlinePhotoCameraBack className="mx-auto text-3xl text-gray-600 dark:text-gray-300" />
        <p className="mt-2 text-gray-700 dark:text-gray-200 font-medium">Add a Cover Image</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload (max 5MB)</p>
      </div>
    </label>
  ) : (
    <div className="relative w-full h-full">
      {coverImage ? (
        <>
          <motion.img
            key={coverImage}
            className="h-full w-full object-cover"
            src={coverImage}
            alt="Cover"
            loading="lazy"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          {isOwnProfile && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <label
                htmlFor="cover-upload"
                className="absolute bottom-4 right-4 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-[60]"
              >
                <FiEdit className="text-gray-700 dark:text-gray-300" />
              </label>
            </>
          )}
        </>
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800"></div>
      )}
    </div>
  )}
  
  <input
    type="file"
    id="cover-upload"
    accept="image/*"
    className="hidden"
    onChange={handleCoverImage}
  />
</motion.div>

        {/* Profile Section */}
        <div className="px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 -mt-16 relative">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white">
                    <FaUser className="text-4xl" />
                  </div>
                )}
              </div>
              {isOwnProfile && (
                <>
                  <label
                    htmlFor="upload"
                    className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiEdit className="text-gray-700 dark:text-gray-300" />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                    id="upload"
                  />
                </>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 pt-4 md:pt-16">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white font-Quicksand">
                    {profileData.username || 'Username'}
                  </h1>
                  <h3 className="text-lg text-gray-600 dark:text-gray-300 font-Playfair">
                    {profileData.nickname || 'Nickname'}
                  </h3>
                </div>

                <div className="flex gap-3">
                  {!isOwnProfile && currentUser && (
                    <FollowButton
                      currentUserId={currentUser.$id}
                      targetUserId={viewedUserId}
                      onFollowChange={(isFollowing) => {
                        setFollowerCount(prev => isFollowing ? prev + 1 : prev - 1);
                      }}
                    />
                  )}
                  
                  {isOwnProfile && (
                    <>
                      <Link to={'/account/upload'}>
                        <motion.button
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className='font-medium font-Playfair'>Upload Art</span>
                          <FiUpload />
                        </motion.button>
                      </Link>

                      <Link to={'/account/Edit_profile'}>
                        <motion.button
                          className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className='font-medium font-Playfair'>Edit Profile</span>
                          <FiEdit />
                        </motion.button>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {profileData.artStyle && (
                <div className=' flex items-center gap-2'>
                <div className="mt-2 inline-flex shadow-inner items-center px-3 py-1 bg-purple-100 dark:bg-purple-800/30 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-700">
                  <FaPalette className="mr-2" />
                  {profileData.artStyle}
                </div>
                <div className="mt-2 shadow-inner inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-800/30 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-700">
                  <FaPalette className="mr-2" />
                  {profileData.profession}
                </div>
                </div>
              )}

              <p className="mt-2 text-gray-600 dark:text-gray-400 font-dmserif">
                {profileData.bio || 'No bio yet. Add one in your profile settings!'}
              </p>

              {/* Additional Info */}
              <div className="flex flex-wrap gap-3 mt-3">
                {profileData.location && (
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <MdLocationOn className="mr-1 text-sm text-purple-600 dark:text-purple-400" />
                    <span>{profileData.location}</span>
                  </div>
                )}
                {profileData.portfolio && (
                  <a
                    href={profileData.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    <FaGlobe className="mr-1 text-sm" />
                    <span>Portfolio</span>
                  </a>
                )}
              </div>

              {/* Social Media Links */}
              <div className="flex gap-2 mt-3 font-Playfair">
                {[
                  {
                    platform: 'facebook',
                    icon: <FaFacebook className="text-lg" />,
                    url: profileData.facebook ? `https://www.facebook.com/${profileData.facebook}` : null
                  },
                  {
                    platform: 'instagram',
                    icon: <FaInstagram className="text-lg" />,
                    url: profileData.instagram ? `https://www.instagram.com/${profileData.instagram}` : null
                  },
                  {
                    platform: 'twitter',
                    icon: <FaXTwitter className="text-lg" />,
                    url: profileData.twitter ? `https://twitter.com/${profileData.twitter}` : null
                  },
                  {
                    platform: 'linkedin',
                    icon: <FaLinkedin className="text-lg" />,
                    url: profileData.linkedin ? `https://www.linkedin.com/${profileData.linkedin}` : null
                  }
                ].map((social) => (
                  <a
                    key={social.platform}
                    href={social.url || '#'}
                    target={social.url ? "_blank" : "_self"}
                    rel={social.url ? "noopener" : ""}
                    className={`flex w-8 h-8 items-center justify-center rounded-md ${social.url ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'} transition-colors`}
                    title={social.url ? `${social.platform}` : `No ${social.platform} linked`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-4 flex flex-wrap items-center gap-3 font-Playfair">
            {[
              { label: 'Followers', value: followerCount },
              { label: 'Following', value: followingCount },
              // { label: 'Artworks', value: '48' },
              { label: 'Collections', value: collectionCount }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="flex items-center px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 gap-1"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-[16px] text-gray-600 dark:text-gray-400">{stat.label}:</span>
                <span className="ml-auto text-sm font-semibold text-purple-600 dark:text-purple-400">{stat.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab('collections')}
                className={`pb-4 text-sm font-semibold ${activeTab === 'collections' ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400 font-Quicksand'}`}
              >
                Collections
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`pb-4 text-sm font-semibold ${activeTab === 'about' ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400 font-Quicksand'}`}
              >
                About
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {activeTab === 'collections' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 font-Eagle">
                      {isOwnProfile ? 'Your Collections' : 'Collections'}
                    </h3>
                    <Your_Collections userId={isOwnProfile ? currentUser?.$id : viewedUserId} />
                  </div>
                )}

                {activeTab === 'about' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 dark:text-white font-Quicksand">About</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-Playfair text-[17px]">
                        {profileData.bio || 'No bio information available.'}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 dark:text-white font-Quicksand">Details</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="w-24 text-sm text-gray-500 dark:text-gray-400 font-semibold">Location:</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {profileData.location || 'Not specified'}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-24 text-sm text-gray-500 dark:text-gray-400 font-semibold">Art Style:</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {profileData.artStyle || 'Not specified'}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-24 text-sm text-gray-500 dark:text-gray-400 font-semibold">Portfolio:</span>
                          {profileData.portfolio ? (
                            <a
                              href={profileData.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                            >
                              View Portfolio
                            </a>
                          ) : (
                            <span className="text-sm text-gray-700 dark:text-gray-300">Not specified</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;








// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { account, databases,storage,ID } from '../../appwriteConfig';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Query } from 'appwrite';
// import { followService } from '../../Follow/FollowService';
// import { getCollectionCount } from './getUploadArt';
// import Your_Collections from './Your_Collection/Your_Collections';
// import FollowButton from '../../Follow/FollowButton';
// import { uploadImage } from './uploadImage';
// import { updateUserImages } from './uploadImage';
// // Icons
// import { FaUserEdit, FaFacebook, FaInstagram, FaPalette, FaGlobe, FaLinkedin, } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';
// import { CiEdit } from 'react-icons/ci';
// import { FiUpload, FiEdit, FiMenu } from 'react-icons/fi';
// import { IoIosLogOut } from 'react-icons/io';
// import { ImBlog } from 'react-icons/im';
// import { BiCategoryAlt } from 'react-icons/bi';
// import { IoMdHelpCircleOutline } from 'react-icons/io';
// import { MdOutlineFeedback, MdHistory, MdOutlinePhotoCameraBack, MdLocationOn, MdClose, MdOutlineDashboardCustomize } from 'react-icons/md';
// import { FaHome, FaUsers, FaUser, FaImages, FaHandsHelping } from 'react-icons/fa';

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
// const PROFILE_BUCKET = import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID;
// const COVER_BUCKET = import.meta.env.VITE_APPWRITE_COVER_BUCKET_ID;


// function Account({ isOwnProfile = true }) {
//   const { userId: viewedUserId } = useParams();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // UI states
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('collections');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  
//   // Images
//   const [coverImage, setCoverImage] = useState(null);
//   const [profileImage, setProfileImage] = useState(null);
  
//   // Social stats
//   const [followerCount, setFollowerCount] = useState(0);
//   const [followingCount, setFollowingCount] = useState(0);
//   const [collectionCount, setCollectionCount] = useState(0);

//   //navigation
//     const navigate = useNavigate(); 
  
//   // Refs
//   const dropdownRef = useRef(null);
//   const timeoutRef = useRef(null);

//   // Fetch user data

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         const userSession = await account.get();
//         setCurrentUser(userSession);
//         const targetUserId = isOwnProfile ? userSession.$id : viewedUserId;
        
//         if (!targetUserId) throw new Error('User not found');
        
//         const userDoc = await databases.getDocument(
//           DATABASE_ID,
//           USER_COLLECTION_ID,
//           targetUserId
//         );
        
//         setProfileData({
//           ...userDoc,
//           nickname: userDoc.nickname || userDoc.name || '',
//           username: userDoc.username || userDoc.name || '',
//           bio: userDoc.bio || '',
//           artStyle: userDoc.artStyle || '',
//           location: userDoc.location || '',
//           portfolio: userDoc.portfolio || '',
//           facebook: userDoc.facebook || '',
//           instagram: userDoc.instagram || '',
//           twitter: userDoc.twitter || '',
//           linkedin: userDoc.linkedin || ''
//         });

//         // Load images from database for all users
//         if (userDoc.profileImageUrl) setProfileImage(userDoc.profileImageUrl);
//         if (userDoc.coverImageUrl) {
//           setCoverImage(userDoc.coverImageUrl);
//         }
        
//         // Load social stats
//         const [followers, following, collections] = await Promise.all([
//           followService.getFollowerCount(targetUserId),
//           followService.getFollowingCount(targetUserId),
//           getCollectionCount(targetUserId)
//         ]);
        
//         setFollowerCount(followers);
//         setFollowingCount(following);
//         setCollectionCount(collections);
        
//       } catch (err) {
//         setError(err.message);
//         console.error("Error loading profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchData();
//   }, [isOwnProfile, viewedUserId]);

//   // checkinl authentication 
//     useEffect(() => {
//     const checkUser = async () => {
//       try {
//         await account.get(); // Tries to get current session
//         setLoading(false);   // If successful, stop loading
//       } catch (err) {
//         setError('User not logged in. Redirecting...');
//         setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
//       }
//     };

//     checkUser();
//   }, [navigate]);

//   const handleLogout = async () => {
//     if (window.confirm('Are you sure you want to log out?')) {
//       try {
//         await account.deleteSession('current');
//         localStorage.clear();
//         window.location.href = '/login';
//         toast.success('Logged out successfully');
//       } catch (error) {
//         toast.error('Logout failed');
//         console.error('Logout error:', error);
//       }
//     }
//   };

// //   const handleCoverImage = async (e) => {
// //   const file = e.target.files[0];
// //   if (!file) return;

// //   if (!file.type.startsWith('image/')) return toast.error('Only image files are allowed');
// //   if (file.size >= 5 * 1024 * 1024) return toast.error('File size must be less than 5MB');

// //   try {
// //     toast.info('Uploading cover image...');
// //     const coverUrl = await uploadImage(file, COVER_BUCKET);
// //     await updateUserImages(currentUser.$id, { coverImageUrl: coverUrl });

// //     // Prevent cache issues
// //     setCoverImage(`${coverUrl}?t=${Date.now()}`);

// //     toast.success('Cover image updated!');
// //   } catch (error) {
// //     toast.error(error.message || 'Failed to update cover image');
// //   }
// // };

//   const handleCoverImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       toast.error('Only image files are allowed');
//       return;
//     }

//     if (file.size >= 5 * 1024 * 1024) {
//       toast.error('File size must be less than 5MB');
//       return;
//     }

//     try {
//       toast.info('Uploading cover image...');
//       const coverUrl = await uploadImage(file, COVER_BUCKET);
//       await updateUserImages(currentUser.$id, { coverImageUrl: coverUrl });
//       setCoverImage(`${coverUrl}?t=${Date.now()}`);
//       toast.success('Cover image updated!');
//     } catch (error) {
//       toast.error(error.message || 'Failed to update cover image');
//     }
//   };




//   const handleProfileImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       toast.error('Only image files are allowed');
//       return;
//     }

//     if (file.size >= 2 * 1024 * 1024) {
//       toast.error('File size must be less than 2MB');
//       return;
//     }

//     try {
//       toast.info('Uploading profile image...');
//       const profileUrl = await uploadImage(file, PROFILE_BUCKET);
//       await updateUserImages(currentUser.$id, { profileImageUrl: profileUrl });
//       setProfileImage(profileUrl);
//       toast.success('Profile picture updated!');
//     } catch (error) {
//       toast.error(error.message || 'Failed to update profile picture');
//       console.error(error);
//     }
//   };
  
//   // Responsive handlers
//   useEffect(() => {
//     const handleResize = () => {
//       setIsLargeScreen(window.innerWidth >= 1024);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !isLargeScreen) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener('click', handleOutsideClick);
//     return () => document.removeEventListener('click', handleOutsideClick);
//   }, [isLargeScreen]);

//   const handleMouseEnter = () => {
//     if (isLargeScreen) {
//       clearTimeout(timeoutRef.current);
//       setIsDropdownOpen(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (isLargeScreen) {
//       timeoutRef.current = setTimeout(() => {
//         setIsDropdownOpen(false);
//       }, 300);
//     }
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   useEffect(() => {
//     return () => clearTimeout(timeoutRef.current);
//   }, []);

//   // Navigation routes
//   const routes = {
//     Home: "/",
//     Gallery: "/gallery",
//     Category: "/category",
//     "My Account": "/account",
//     History: "/History",
//     Community: "/community",
//     Blog: "/blog",
//     FAQs: "/FAQs",
//     Help: "/Resources/Help",
//     Feedback: "/Resources/Feedback",
//   };

//   const routeIcons = {
//     Home: <FaHome />,
//     Gallery: <FaImages />,
//     Category: <BiCategoryAlt />,
//     "My Account": <FaUser />,
//     History: <MdHistory />,
//     Community: <FaUsers />,
//     Blog: <ImBlog />,
//     FAQs: <IoMdHelpCircleOutline />,
//     Help: <FaHandsHelping />,
//     Feedback: <MdOutlineFeedback />,
//   };

//   // Animation variants
//   const menuVariants = {
//     open: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
//     closed: { x: '-100%', opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
//   };

//   const buttonVariants = {
//     hover: { scale: 1.05, transition: { duration: 0.2 } },
//     tap: { scale: 0.95 },
//   };

//   const coverVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.8 } },
//   };

//   const tabVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
//   };

//   if (loading) return (
//     <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
//     </div>
//   );

//   if (error) return (
//     // <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//     //   <div className="text-center p-6 max-w-md">
//     //     <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Error loading profile</h2>
//     //     <p className="text-gray-600 dark:text-gray-300">{error}</p>
//     //     <Link 
//     //       to="/" 
//     //       className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
//     //     >
//     //       Go Home
//     //     </Link>
//     //   </div>
//     // </div>
//      <div className="min-h-screen flex justify-center items-center text-gray-700 dark:text-gray-200">Checking session...</div>
//   );

//   if (!profileData) return (
//     <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//       <div className="text-center p-6 max-w-md">
//         <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Profile not found</h2>
//         <p className="text-gray-600 dark:text-gray-300 mt-2">The requested profile could not be loaded.</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="w-full min-h-screen flex flex-col pb-6 overflow-x-hidden bg-gray-50 dark:bg-gray-900">
//       <ToastContainer position='top-left' />

//       {/* Floating Header */}
//       <header className="w-full h-[80px] bg-white/40 dark:bg-gray-800/80 backdrop-blur-md flex items-center justify-between px-6 z-50 fixed border-b border-gray-200 dark:border-gray-700">
//         <div className="flex items-center gap-4">
//           <button
//             className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <FiMenu className="text-xl text-gray-800 dark:text-gray-200" />
//           </button>
//           <Link to={'/'}>
//           <h1 className="font-Eagle font-bold lg:text-[32px] md:text-[28px] sm:text-[22px] text-[18px] text-[#001F3F] dark:text-white">
//             Painters' Diary
//           </h1>
//           </Link>        
//         </div>

//         {isOwnProfile && (
//           <div
//             className="relative group"
//             ref={dropdownRef}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             <button
//               className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//               onClick={toggleDropdown}
//             >
//               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
//                 {profileData.username?.charAt(0) || 'U'}
//               </div>
//               <span className="hidden md:inline text-gray-800 dark:text-gray-200 font-medium font-Playfair">
//                 {profileData.username || 'User'}
//               </span>
//             </button>

//             <AnimatePresence>
//               {isDropdownOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                   className="absolute top-full right-0 mt-6 w-48 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden"
//                 >
//                   <Link to={'/account/edit_profile'}>
//                     <button
//                       className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm transition-colors"
//                       onClick={() => setIsDropdownOpen(false)}
//                     >
//                       <CiEdit className="text-lg" />
//                       Edit Profile
//                     </button>
//                   </Link>

//                   <Link to={'/account/dashboard'}>
//                     <button
//                       className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm transition-colors"
//                       onClick={() => setIsDropdownOpen(false)}
//                     >
//                       <MdOutlineDashboardCustomize className="text-lg" />
//                       Dashboard
//                     </button>
//                   </Link>

//                   <button
//                     className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm transition-colors"
//                     onClick={handleLogout}
//                   >
//                     <IoIosLogOut className="text-lg" />
//                     Logout
//                   </button>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         )}
//       </header>

//       {/* Sliding Menu */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             className="fixed top-0 left-0 w-80 sm:w-96 h-full bg-white dark:bg-gray-900 shadow-2xl z-[9999] overflow-y-auto"
//             variants={menuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             <div className="h-48 bg-slate-700 dark:bg-gray-800 p-6 flex items-start justify-between">
//               <div className="flex items-center gap-4 w-full">
//                 <div className="h-24 w-24 sm:h-28 sm:w-28 bg-white dark:bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
//                   {profileImage ? (
//                     <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
//                   ) : (
//                     <FaUser className="text-4xl text-gray-400 dark:text-gray-300" />
//                   )}
//                 </div>
//                 <div>
//                   <h1 className="text-white font-medium">{profileData.nickname || 'Username'}</h1>
//                   <p className="text-white/80 text-sm">{profileData.email || 'user@example.com'}</p>
//                   <p className="text-white/80 text-sm mt-1">Followers: {followerCount}</p>
//                 </div>
//               </div>
//               <button
//                 className="text-white/80 hover:text-white transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <MdClose className="text-xl" />
//               </button>
//             </div>

//             <div className="p-4 bg-gray-50 dark:bg-gray-950 h-[calc(100%-12rem)]">
//               {Object.keys(routes).map((item) => (
//                 <Link
//                   to={routes[item]}
//                   key={item}
//                   className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors mb-1 font-Playfair"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <span className="text-lg">{routeIcons[item]}</span>
//                   <span className="font-medium">{item}</span>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main Content */}
//       <div className="pt-[80px] w-full">
//         {/* Cover Image Section */}
//         {/* <motion.div
//           className="w-full md:w-[80%] mx-auto h-80 md:h-96 relative overflow-hidden rounded-b-md"
//           variants={coverVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <div className="relative w-full h-full">
//             {coverImage ? (
//               <>
//                 <img
//                   className="h-full w-full object-cover"
//                   src={coverImage}
//                   alt="Cover"
//                   loading="lazy"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
//               </>
//             ) : (
//               <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
//                 <MdOutlinePhotoCameraBack className="text-6xl text-gray-400 dark:text-gray-500" />
//               </div>
//             )}
//             {isOwnProfile && (
//               <label
//                 htmlFor="cover-upload"
//                 className="absolute bottom-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full shadow-md cursor-pointer transition-all"
//               >
//                 <FiEdit className="text-lg" />
//                 <input
//                   type="file"
//                   id="cover-upload"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleCoverImage}
//                 />
//               </label>
//             )}
//           </div>
//         </motion.div> */}
//         <motion.div
//   className="w-full md:w-[80%] mx-auto h-80 md:h-96 relative overflow-hidden rounded-b-md"
//   variants={coverVariants}
//   initial="hidden"
//   animate="visible"
// >
//   {showCoverButton && isOwnProfile ? (
//     <label
//       htmlFor="cover-upload"
//       className="w-full h-full flex items-center justify-center cursor-pointer bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 hover:opacity-90 transition-opacity"
//     >
//       <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm">
//         <MdOutlinePhotoCameraBack className="mx-auto text-3xl text-gray-600 dark:text-gray-300" />
//         <p className="mt-2 text-gray-700 dark:text-gray-200 font-medium">Add a Cover Image</p>
//         <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload (max 5MB)</p>
//       </div>
//     </label>
//   ) : (
//     <div className="relative w-full h-full">
//       {coverImage ? (
//         <>
//           <motion.img
//             key={coverImage}
//             className="h-full w-full object-cover"
//             src={coverImage}
//             alt="Cover"
//             loading="lazy"
//             initial={{ opacity: 0, scale: 1.05 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6 }}
//           />
//           {isOwnProfile && (
//             <>
//               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
//               <label
//                 htmlFor="cover-upload"
//                 className="absolute bottom-4 right-4 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-[60]"
//               >
//                 <FiEdit className="text-gray-700 dark:text-gray-300" />
//               </label>
//             </>
//           )}
//         </>
//       ) : (
//         <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800"></div>
//       )}
//     </div>
//   )}
  
//   <input
//     type="file"
//     id="cover-upload"
//     accept="image/*"
//     className="hidden"
//     onChange={handleCoverImage}
//   />
// </motion.div>


//         {/* Profile Section */}
//         <div className="px-4 md:px-6 max-w-6xl mx-auto">
//           <div className="flex flex-col md:flex-row gap-6 -mt-16 relative">
//             {/* Profile Picture */}
//             <div className="relative">
//               <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
//                 {profileImage ? (
//                   <img
//                     src={profileImage}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white">
//                     <FaUser className="text-4xl" />
//                   </div>
//                 )}
//               </div>
//               {isOwnProfile && (
//                 <>
//                   <label
//                     htmlFor="upload"
//                     className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     <FiEdit className="text-gray-700 dark:text-gray-300" />
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleProfileImageUpload}
//                     className="hidden"
//                     id="upload"
//                   />
//                 </>
//               )}
//             </div>

//             {/* User Info */}
//             <div className="flex-1 pt-4 md:pt-16">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                 <div>
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white font-Quicksand">
//                     {profileData.username || 'Username'}
//                   </h1>
//                   <h3 className="text-lg text-gray-600 dark:text-gray-300 font-Playfair">
//                     {profileData.nickname || 'Nickname'}
//                   </h3>
//                 </div>

//                 <div className="flex gap-3">
//                   {!isOwnProfile && currentUser && (
//                     <FollowButton
//                       currentUserId={currentUser.$id}
//                       targetUserId={viewedUserId}
//                       onFollowChange={(isFollowing) => {
//                         setFollowerCount(prev => isFollowing ? prev + 1 : prev - 1);
//                       }}
//                     />
//                   )}
                  
//                   {isOwnProfile && (
//                     <>
//                       <Link to={'/account/upload'}>
//                         <motion.button
//                           className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2"
//                           whileHover={{ scale: 1.03 }}
//                           whileTap={{ scale: 0.98 }}
//                         >
//                           <span className='font-medium font-Playfair'>Upload Art</span>
//                           <FiUpload />
//                         </motion.button>
//                       </Link>

//                       <Link to={'/account/Edit_profile'}>
//                         <motion.button
//                           className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md transition-all flex items-center gap-2"
//                           whileHover={{ scale: 1.03 }}
//                           whileTap={{ scale: 0.98 }}
//                         >
//                           <span className='font-medium font-Playfair'>Edit Profile</span>
//                           <FiEdit />
//                         </motion.button>
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {profileData.artStyle && (
//                 <div className="mt-2 inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-800/30 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-700">
//                   <FaPalette className="mr-2" />
//                   {profileData.artStyle}
//                 </div>
//               )}

//               <p className="mt-2 text-gray-600 dark:text-gray-400 font-dmserif">
//                 {profileData.bio || 'No bio yet. Add one in your profile settings!'}
//               </p>

//               {/* Additional Info */}
//               <div className="flex flex-wrap gap-3 mt-3">
//                 {profileData.location && (
//                   <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
//                     <MdLocationOn className="mr-1 text-sm text-purple-600 dark:text-purple-400" />
//                     <span>{profileData.location}</span>
//                   </div>
//                 )}
//                 {profileData.portfolio && (
//                   <a
//                     href={profileData.portfolio}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline"
//                   >
//                     <FaGlobe className="mr-1 text-sm" />
//                     <span>Portfolio</span>
//                   </a>
//                 )}
//               </div>

//               {/* Social Media Links */}
//               <div className="flex gap-2 mt-3 font-Playfair">
//                 {[
//                   {
//                     platform: 'facebook',
//                     icon: <FaFacebook className="text-lg" />,
//                     url: profileData.facebook ? `https://www.facebook.com/${profileData.facebook}` : null
//                   },
//                   {
//                     platform: 'instagram',
//                     icon: <FaInstagram className="text-lg" />,
//                     url: profileData.instagram ? `https://www.instagram.com/${profileData.instagram}` : null
//                   },
//                   {
//                     platform: 'twitter',
//                     icon: <FaXTwitter className="text-lg" />,
//                     url: profileData.twitter ? `https://twitter.com/${profileData.twitter}` : null
//                   },
//                   {
//                     platform: 'linkedin',
//                     icon: <FaLinkedin className="text-lg" />,
//                     url: profileData.linkedin ? `https://www.linkedin.com/${profileData.linkedin}` : null
//                   }
//                 ].map((social) => (
//                   <a
//                     key={social.platform}
//                     href={social.url || '#'}
//                     target={social.url ? "_blank" : "_self"}
//                     rel={social.url ? "noopener" : ""}
//                     className={`flex w-8 h-8 items-center justify-center rounded-md ${social.url ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'} transition-colors`}
//                     title={social.url ? `${social.platform}` : `No ${social.platform} linked`}
//                   >
//                     {social.icon}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Stats Section */}
//           <div className="mt-4 flex flex-wrap items-center gap-3 font-Playfair">
//             {[
//               { label: 'Followers', value: followerCount },
//               { label: 'Following', value: followingCount },
//               // { label: 'Artworks', value: '48' },
//               { label: 'Collections', value: collectionCount }
//             ].map((stat) => (
//               <motion.div
//                 key={stat.label}
//                 className="flex items-center px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 gap-1"
//                 whileHover={{ y: -2 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <span className="text-[16px] text-gray-600 dark:text-gray-400">{stat.label}:</span>
//                 <span className="ml-auto text-sm font-semibold text-purple-600 dark:text-purple-400">{stat.value}</span>
//               </motion.div>
//             ))}
//           </div>

//           {/* Tabs */}
//           <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex space-x-6">
//               <button
//                 onClick={() => setActiveTab('collections')}
//                 className={`pb-4 text-sm font-semibold ${activeTab === 'collections' ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400 font-Quicksand'}`}
//               >
//                 Collections
//               </button>
//               <button
//                 onClick={() => setActiveTab('about')}
//                 className={`pb-4 text-sm font-semibold ${activeTab === 'about' ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400 font-Quicksand'}`}
//               >
//                 About
//               </button>
//             </div>
//           </div>

//           {/* Tab Content */}
//           <div className="mt-6">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeTab}
//                 variants={tabVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="hidden"
//               >
//                 {activeTab === 'collections' && (
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 font-Eagle">
//                       {isOwnProfile ? 'Your Collections' : 'Collections'}
//                     </h3>
//                     <Your_Collections userId={isOwnProfile ? currentUser?.$id : viewedUserId} />
//                   </div>
//                 )}

//                 {activeTab === 'about' && (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3 dark:text-white font-Quicksand">About</h3>
//                       <p className="text-gray-600 dark:text-gray-400 font-Playfair text-[17px]">
//                         {profileData.bio || 'No bio information available.'}
//                       </p>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3 dark:text-white font-Quicksand">Details</h3>
//                       <div className="space-y-2">
//                         <div className="flex items-center">
//                           <span className="w-24 text-sm text-gray-500 dark:text-gray-400 font-semibold">Location:</span>
//                           <span className="text-sm text-gray-700 dark:text-gray-300">
//                             {profileData.location || 'Not specified'}
//                           </span>
//                         </div>
//                         <div className="flex items-center">
//                           <span className="w-24 text-sm text-gray-500 dark:text-gray-400 font-semibold">Art Style:</span>
//                           <span className="text-sm text-gray-700 dark:text-gray-300">
//                             {profileData.artStyle || 'Not specified'}
//                           </span>
//                         </div>
//                         <div className="flex items-center">
//                           <span className="w-24 text-sm text-gray-500 dark:text-gray-400 font-semibold">Portfolio:</span>
//                           {profileData.portfolio ? (
//                             <a
//                               href={profileData.portfolio}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
//                             >
//                               View Portfolio
//                             </a>
//                           ) : (
//                             <span className="text-sm text-gray-700 dark:text-gray-300">Not specified</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Account;