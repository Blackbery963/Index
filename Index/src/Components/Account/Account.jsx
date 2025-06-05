import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUserEdit, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Your_Collections from './Your_Collection/Your_Collections';
import { MdClose, MdOutlineDashboardCustomize, MdOutlinePhotoCameraBack, MdSettings, MdHistory } from "react-icons/md";
import { FiUpload, FiEdit } from 'react-icons/fi';
import { IoIosLogOut } from 'react-icons/io';
import { CiEdit, CiMenuFries } from 'react-icons/ci';
import { FaXTwitter } from 'react-icons/fa6';
import { ImBlog } from 'react-icons/im';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { MdOutlineFeedback } from 'react-icons/md';
import { FaHome, FaUsers, FaUser, FaImages, FaHandsHelping, } from "react-icons/fa";
import { motion } from 'framer-motion';
import { Query } from 'appwrite';
import { account, databases } from '../../appwriteConfig';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID

function Account() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [followerCount, setFollowerCount] = useState(null);
  const [profileUserId, setProfileUserId] = useState('')
  const [user, setUser] = useState (null)
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
  });
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // storing userId in localhost
  useEffect ( () => {
    const getAndStoreUser = async () => {
      try {
        const userData = await account.get();
        localStorage.setItem("userProfile", JSON.stringify(userData));
        setUser(userData);
      } catch (err) {
        console.error("User not logged in", err);
      }
    };

    getAndStoreUser();
  }, []);

  // Load profile data, profile image, and cover image from localStorage on mount
  useEffect(() => {
  const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
  const savedProfileImage = localStorage.getItem('profileImage');
  const savedCoverImage = localStorage.getItem('coverImage');
  
  setProfile((prev) => ({
    ...prev,
    ...savedProfile
  }));
  
  // Add this line to set the profile user ID
  if (savedProfile?.$id) {
    setProfileUserId(savedProfile.$id);
  }
  
  if (savedProfileImage) {
    setProfileImage(savedProfileImage);
  }
  if (savedCoverImage) {
    setImage(savedCoverImage);
    setShowButton(false);
  }
}, []);

  useEffect(() => {
    const handleResize = () => {
      console.log('Window width:', window.innerWidth, 'isLargeScreen:', window.innerWidth >= 1024);
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
      console.log('Mouse enter, opening dropdown');
      clearTimeout(timeoutRef.current);
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isLargeScreen) {
      console.log('Mouse leave, closing dropdown');
      timeoutRef.current = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 300);
    }
  };

  const toggleDropdown = () => {
    console.log('Toggling dropdown, isLargeScreen:', isLargeScreen, 'isDropdownOpen:', !isDropdownOpen);
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const routes = {
    Home: "/",
    Gallery: "/gallery",
    Category: "/category",
    "My Account": "/account",
    History:"/History",
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
       History:<MdHistory/>,
       Community: <FaUsers />,
       Blog: <ImBlog />,
       FAQs: <IoMdHelpCircleOutline />,
       Help: <FaHandsHelping />,
       Feedback: <MdOutlineFeedback />,
     };
   

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size >= 5 * 1024 * 1024) {
        alert('File size must be less than 5MB. Please upload a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        try {
          setImage(base64String);
          localStorage.setItem('coverImage', base64String);
          setShowButton(false);
        } catch (error) {
          console.error('Error saving cover image:', error);
          alert('Failed to save the image. It may be too large for local storage.');
        }
      };
      reader.onerror = () => {
        alert('Failed to process the image. Please try another file.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size >= 5 * 1024 * 1024) {
        alert('File size must be less than 5MB. Please upload a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        try {
          setProfileImage(base64String);
          localStorage.setItem('profileImage', base64String);
        } catch (error) {
          console.error('Error saving profile image:', error);
          alert('Failed to save the image. It may be too large for local storage.');
        }
      };
      reader.onerror = () => {
        alert('Failed to process the image. Please try another file.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out and clear all data?')) {
      localStorage.removeItem('userProfile');
      localStorage.removeItem('profileImage');
      localStorage.removeItem('coverImage');
      setProfile({
        username: '',
        email: '',
        bio: '',
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: ''
      });
      setImage(null);
      setProfileImage(null);
      setShowButton(true);
      setIsDropdownOpen(false);
    }
  };

  const menuVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
    closed: { x: '-100%', opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const coverVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  // getting followers
const getFollowerCount = async () => {
  if (!profileUserId) return; // Don't try if no user ID
  
  try {
    const res = await databases.listDocuments(
      DATABASE_ID, 
      USER_COLLECTION_ID, 
      [Query.equal("followingId", profileUserId)]
    );
    setFollowerCount(res.total); // or res.documents.length
  } catch (error) {
    console.error("Error fetching followers:", error);
    setFollowerCount(0); // Default to 0 on error
  }
};
// 
useEffect(() => {
  if (profileUserId) {
    getFollowerCount();
  }
}, [profileUserId]); // This will run whenever profileUserId changes


  return (
    <div className="w-full min-h-screen flex flex-col pb-6 overflow-x-hidden bg-gray-100 dark:bg-[#040d12f5]">
      {/* Header */}
        <header className="w-full  h-[80px] bg-gradient-to-l from-[#0f172acc] via-[#1e293bcc] to-[#334155cc] dark:from-[#020617cc] dark:via-[#0f172acc] dark:to-[#1e293bcc] flex items-center justify-between px-6 z-50 fixed">
  <div
    className="sm:py-2 sm:px-2 px-1 py-1 bg-slate-700/60 hover:bg-slate-600/80 dark:bg-slate-800/60 dark:hover:bg-slate-700/80 rounded-md flex items-center justify-center cursor-pointer border border-slate-300 dark:border-slate-600 transition-all hover:rotate-180 duration-300"
    onClick={() => setIsMenuOpen(!isMenuOpen)}
  >
    <button className="h-full w-full flex items-center justify-center">
      <CiMenuFries className="text-xl block text-white" />
    </button>
  </div>

  <div
    className="relative group"
    ref={dropdownRef}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <button
      className="sm:px-2 px-1 md:px-3 sm:py-2 py-1 border border-gray-400 dark:border-gray-600 rounded-md flex items-center gap-2 transition-all duration-200 bg-slate-700/60 hover:bg-slate-600/80 dark:bg-slate-800/60 dark:hover:bg-slate-700/80 text-slate-100 "
      onClick={toggleDropdown}
    >
      <span className="text-sm md:text-base md:block hidden text-white font-Playfair">Settings</span>
      <MdSettings className="text-xl md:text-2xl block text-white" />
    </button>

    <div
      className={`absolute top-full right-0 mt-2 w-[180px] bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-md shadow-lg transition-all duration-200 z-50 sm:p-2 font-Playfair
        ${isDropdownOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}
    >
      <Link to={'/Account/Edit_Profile'}>
        <button
          className="w-full px-4 py-3 text-left hover:bg-violet-100 dark:hover:bg-violet-900 text-gray-800 dark:text-gray-100 flex items-center gap-2 text-sm"
          onClick={() => setIsDropdownOpen(false)}
        >
          <CiEdit className="text-lg" />
          Edit Profile
        </button>
      </Link>

      <Link to={'/Account/Dashboard'}>
        <button
          className="w-full px-4 py-3 text-left hover:bg-violet-100 dark:hover:bg-violet-900 text-gray-800 dark:text-gray-100 flex items-center gap-2 text-sm"
          onClick={() => setIsDropdownOpen(false)}
        >
          <MdOutlineDashboardCustomize className="text-lg" />
          Dashboard
        </button>
      </Link>

      <button
        className="w-full px-4 py-3 text-left hover:bg-violet-100 dark:hover:bg-violet-900 text-gray-800 dark:text-gray-100 flex items-center gap-2 text-sm"
        onClick={handleLogout}
      >
        <IoIosLogOut className="text-lg" />
        Logout
      </button>
    </div>
  </div>
</header>

      {/* Sliding Menu */}

       <motion.div
  className="fixed top-0 left-0 w-80 sm:w-96 h-full bg-white dark:bg-gray-900 shadow-2xl z-[9999] overflow-y-auto"
  variants={menuVariants}
  initial="closed"
  animate={isMenuOpen ? 'open' : 'closed'}
>
  {/* Profile section - updated with dark mode classes */}
  <div className="h-48 bg-slate-700 dark:bg-gray-800 p-4 flex items-center justify-between">
    <div className="h-24 w-24 sm:h-28 sm:w-28 bg-white dark:bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
      {profileImage ? (
        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        <FaUser className="text-4xl text-gray-400 dark:text-gray-300" />
      )}
    </div>
    <div className="flex-1 ml-4">
      <h1 className="text-white dark:text-gray-200 font-playfair text-lg sm:text-xl">{profile.username || 'Username'}</h1>
      <p className="text-white dark:text-gray-300 font-Playfair text-sm">{profile.email || 'xyz123@email.com'}</p>
      <p className="text-white dark:text-gray-300 font-newsreader text-sm">Followers: 122</p>
    </div>
    <motion.button
      className="absolute top-4 right-4 text-white dark:text-gray-200 text-xl font-Playfair"
      onClick={() => setIsMenuOpen(false)}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <MdClose />
    </motion.button>
  </div>
  
  {/* Menu items section - updated with dark mode classes */}
  <div className="p-4 bg-gray-100 dark:bg-gray-950 h-[calc(100%-12rem)]">
    {Object.keys(routes).map((item) => (
      <Link
        to={routes[item]}
        key={item}
        className="flex items-center gap-3 px-4 py-3 text-gray-800 dark:text-gray-200 font-newsreader text-base hover:bg-slate-200 dark:hover:bg-gray-800 rounded-md font-Playfair"
        onClick={() => setIsMenuOpen(false)}
      >
        {routeIcons[item]}
        <span>{item}</span>
      </Link>
    ))}
  </div>
</motion.div>

       {/* Cover Image Section */}
     


       <motion.div
              className="lg:w-[80%] w-[98%] mx-auto h-[400px] md:h-[500px] relative mt-[85px] overflow-hidden rounded-b-xl"
              variants={coverVariants}
              initial="hidden"
              animate="visible"
            >
              {showButton ? (
                <label
                  htmlFor="file-upload"
                  className="w-full h-full flex items-center justify-center cursor-pointer bg-gradient-to-t from-slate-200 to-slate-700 dark:from-slate-700 dark:to-gray-800 text-lg font-playfair font-semibold hover:bg-rose-500 transition"
                >
                  Add a Cover Image
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImage}
                  />
                </label>
              ) : (
                <div className="relative w-full h-full">
                  <img className="h-full w-full object-cover" src={image} alt="Cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <motion.button
                    className="absolute bottom-4 right-4 bg-white/80 text-rose-700 p-2 rounded-full shadow hover:bg-white"
                    onClick={() => {
                      setImage(null);
                      localStorage.removeItem('coverImage');
                      setShowButton(true);
                    }}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <FiEdit className="text-lg" />
                  </motion.button>
                </div>
              )}
            </motion.div>
      
            {/* Profile Image and Username/Bio */}
            <div className="relative w-full flex flex-col items-center justify-center mt-[100px]">
              <div
                className="absolute flex items-start justify-center"
                style={{
                  width: "clamp(180px, 250px, 280px)",
                  height: "clamp(180px, 250px, 280px)",
                  top: "-90%",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="rounded-full border-[5px] dark:border-white border-gray-900  flex items-center justify-center bg-black overflow-hidden w-full h-full">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-serif">No Image</span>
                  )}
                </div>
                <label
                  htmlFor="upload"
                  className="absolute bottom-1 right-12 bg-[#0c080a70] text-white hover:text-[#ffffff] rounded-2xl cursor-pointer hover:bg-[#74626859] px-2 py-2"
                  style={{ backdropFilter: "blur(5px)", opacity: 1 }}
                >
                  {profileImage ? <FaUserEdit size={22} /> : <MdOutlinePhotoCameraBack size={22} />}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="hidden"
                  id="upload"
                />
              </div>
      
              <div className="flex flex-col items-center mt-[110px]">
                <p className="text-red-700 text-[35px] font-Playfair">{profile.username || 'Username'}</p>
                <p className="text-red-700 text-[25px] mt-[-5px] font-Markazi">{profile.bio || 'Bio'}</p>
              </div>
            </div>

      {/* Social Media Buttons */}
      <div className="flex gap-4 mx-auto mt-4">
        {[
          {
            platform: 'facebook',
            icon: <FaFacebook className="hover:text-blue-600" />,
            url: profile.facebook ? `https://www.facebook.com/${profile.facebook}` : null
          },
          {
            platform: 'instagram',
            icon: <FaInstagram className="hover:text-pink-900" />,
            url: profile.instagram ? `https://www.instagram.com/${profile.instagram}` : null
          },
          {
            platform: 'twitter',
            icon: <FaXTwitter className="hover:text-blue-400" />,
            url: profile.twitter ? `https://twitter.com/${profile.twitter}` : null
          },
          {
            platform: 'linkedin',
            icon: <FaLinkedin className="hover:text-blue-300" />,
            url: profile.linkedin ? `https://www.linkedin.com/${profile.linkedin}` : null
          }
        ].map((social) => (
          <a
            key={social.platform}
            href={social.url || '#'}
            target={social.url ? "_blank" : "_self"}
            rel={social.url ? "noopener noreferrer" : ""}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-white bg-gray-700 hover:bg-gray-900 transition ${!social.url ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Follow, Following, Upload Buttons */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 px-4 mt-4">
  {/* Followers Button */}
  <button className="px-3 py-1.5 font-serif rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">
    <span>Followers:</span>
<span className="font-semibold text-blue-600 dark:text-blue-400">
  {followerCount !== null ? followerCount : 'Loading...'}
</span>  </button>

  {/* Following Button */}
  <button className="px-3 py-1.5 font-serif rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">
    <span>Following:</span>
    <span className="font-semibold text-blue-600 dark:text-blue-400">1.2M</span>
  </button>

  {/* Upload Button */}
  <Link to={'/Account/Upload'}>
    <button className="px-3 py-1.5 font-serif rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-sm sm:text-base font-medium">
      <span>Upload</span>
      <FiUpload className="text-sm" />
    </button>
  </Link>
</div>
         

      <div className="mt-8">
        <Your_Collections />
      </div>
    </div>
  );
}

export default Account;
