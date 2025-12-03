import { useState, useEffect, useRef, useContext, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUser,
  FaOpencart
} from "react-icons/fa";
import { 
  MdLogout,
  MdLogin,
  MdHistory,
  MdHelpOutline,
  MdNotificationsNone,
  MdOutlineDashboardCustomize,
  MdOutlineFeedback
} from "react-icons/md";
import { IoBookmarkOutline, IoCloudUploadOutline } from "react-icons/io5";
import { CiBookmark, CiDark, CiLight } from "react-icons/ci";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { databases, account, Query } from "../../appwriteConfig";
import { CubeIcon } from '@heroicons/react/24/outline';
import { FiBookmark, FiUpload, FiUser } from "react-icons/fi";
import bg from "../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg"

// Dark Mode Context
export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? savedMode === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      toast.success(`Switched to ${newMode ? 'Dark' : 'Light'} Mode`, {
        position: 'top-right',
        icon: newMode ? <CiDark className="text-gray-400" /> : <CiLight className="text-gray-600" />,
        style: { 
          background: newMode ? '#09090b' : '#F9FAFB',
          color: newMode ? '#F9FAFB' : '#1F2937',
          borderRadius: '12px',
          padding: '12px'
        }
      });
      return newMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
const DB_ID = import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID;
const ORDERS_COLLECTION = import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID;

const Header = () => {
  const routes = {
    Profile: { path: "/account", icon: <FiUser size={18} /> },
    Dashboard: {path: "/Account/Dashboard", icon: <MdOutlineDashboardCustomize size={18}/>},
    Saved: { path: "/Saved", icon: <FiBookmark size={18} /> },
    History: { path: "/history", icon: <MdHistory size={18} /> },
    Help: { path: "/Resources/Help", icon: <MdHelpOutline size={18} /> },
    Feedback: { path: "/Resources/feedback", icon: <MdOutlineFeedback size={18} /> },
  };

  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profile, setProfile] = useState({ 
    username: 'Guest', 
    email: 'Sign in to continue', 
    profileImage: null 
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch user profile and login status
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userSession = await account.get();
        const userId = userSession.$id;
        setIsLoggedIn(true);

        const userDoc = await databases.getDocument(
          DATABASE_ID,
          USER_COLLECTION_ID,
          userId
        );

        setProfile({
          username: userDoc.username || 'User',
          email: userDoc.email || 'No email',
          profileImage: userDoc.profileImageUrl || null,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch cart count
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const count = storedCart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, []);

  // Fetch order count
  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const user = await account.get();
        const res = await databases.listDocuments(DB_ID, ORDERS_COLLECTION, [
          Query.equal('sellerId', user.$id)
        ]);
        setOrderCount(res.total);
      } catch (err) {
        console.error('Failed to fetch order count:', err);
      }
    };

    if (isLoggedIn) {
      fetchOrderCount();
    }
  }, [isLoggedIn]);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };


const navbarVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
  scrolled: {
    background: darkMode 
      ? "linear-gradient(135deg, rgba(9, 9, 11, 0.95), rgba(9, 9, 11, 0.85))"
      : "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))",
    backdropFilter: "blur(20px) saturate(200%)",
    WebkitBackdropFilter: "blur(20px) saturate(200%)",
    borderBottom: darkMode 
      ? "1px solid rgba(255, 255, 255, 0.15)"
      : "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: darkMode
      ? "0 8px 32px rgba(0, 0, 0, 0.4)"
      : "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  unscrolled: {
    background: darkMode 
      ? "linear-gradient(135deg, rgba(9, 9, 11, 0.9), rgba(9, 9, 11, 0.7))"
      : "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))",
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    borderBottom: darkMode 
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
  },
};


  const totalNotifications = cartCount + orderCount + notificationCount;

  return (
    <div className="relative w-full">
      {/* Navbar */}
      <motion.nav
        ref={menuRef}
        className={`fixed top-2 left-[1%] right-0 z-50 max-w-[98%] transition-all rounded-lg duration-300 ${
          darkMode 
            ? 'text-gray-100 bg-zinc-950/60' 
            : 'text-gray-900 bg-white/40'
        }`}
        initial="hidden"
        animate={["visible", isScrolled ? "scrolled" : "unscrolled"]}
        variants={navbarVariants}
      >
        <div className="px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center flex-shrink-0"
            >
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="inset-0 flex items-center justify-center border-2 rounded-lg border-blue-500 dark:bg-blue-200"> 
                  <img src={bg} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className={`text-xl font-bold font-Eagle ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Painters' Diary
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Right Controls */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Upload Button */}
              <Link to="/account/upload">
                <motion.button
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300
                    ${darkMode 
                      ? 'bg-zinc-800 hover:bg-zinc-700 text-white' 
                      : 'bg-black/5 hover:bg-black/10 text-gray-700'
                    }
                  `}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IoCloudUploadOutline size={18} />
                  <span>Upload</span>
                </motion.button>
              </Link>

              {/* Icons Group */}
              <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <motion.button
                  className={`
                    p-2.5 rounded-lg transition-all duration-300 hover:scale-110
                    ${darkMode 
                      ? 'hover:bg-zinc-800 text-gray-300' 
                      : 'hover:bg-black/5 text-gray-600'
                    }
                  `}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDarkMode}
                >
                  {darkMode ? <CiLight size={20} /> : <CiDark size={20} />}
                </motion.button>

                {/* Cart */}
                <Link to="/settings/cart">
                  <motion.button
                    className={`
                      p-2.5 rounded-lg transition-all duration-300 hover:scale-110 relative
                      ${darkMode 
                        ? 'hover:bg-zinc-800 text-gray-300' 
                        : 'hover:bg-black/5 text-gray-600'
                      }
                    `}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaOpencart size={18} />
                    {cartCount > 0 && (
                      <span className={`absolute -top-1 -right-1 text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold ${
                        darkMode 
                          ? 'bg-red-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {cartCount}
                      </span>
                    )}
                  </motion.button>
                </Link>

                {/* Notifications */}
                <Link to="/Settings/Notification">
                  <motion.button
                    className={`
                      p-2.5 rounded-lg transition-all duration-300 hover:scale-110 relative
                      ${darkMode 
                        ? 'hover:bg-zinc-800 text-gray-300' 
                        : 'hover:bg-black/5 text-gray-600'
                      }
                    `}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MdNotificationsNone size={20} />
                    {notificationCount > 0 && (
                      <span className={`absolute -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold ${
                        darkMode 
                          ? 'bg-red-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {notificationCount}
                      </span>
                    )}
                  </motion.button>
                </Link>

                {/* Orders */}
                <Link to="/Settings/Order">
                  <motion.button
                    className={`
                      p-2.5 rounded-lg transition-all duration-300 hover:scale-110 relative
                      ${darkMode 
                        ? 'hover:bg-zinc-800 text-gray-300' 
                        : 'hover:bg-black/5 text-gray-600'
                      }
                    `}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CubeIcon className="w-5 h-5" />
                    {orderCount > 0 && (
                      <span className={`absolute -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold ${
                        darkMode 
                          ? 'bg-red-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {orderCount}
                      </span>
                    )}
                  </motion.button>
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <motion.button
                    className={`
                      flex items-center space-x-3 p-1 rounded-lg transition-all duration-300
                      ${darkMode 
                        ? 'hover:bg-zinc-800' 
                        : 'hover:bg-black/5'
                      }
                    `}
                    onClick={() => toggleDropdown('profile')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {profile.profileImage ? (
                      <img
                        src={profile.profileImage}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        darkMode ? 'bg-zinc-800' : 'bg-black/5'
                      }`}>
                        <FaUser className={darkMode ? 'text-gray-400' : 'text-gray-600'} size={16} />
                      </div>
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {activeDropdown === 'profile' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 mt-2 w-64 rounded-xl shadow-xl ${
                          darkMode 
                            ? 'bg-zinc-950/95 border border-zinc-800' 
                            : 'bg-white/95 border border-gray-200'
                        } backdrop-blur-xl z-50 overflow-hidden`}
                      >
                        {/* Profile Header */}
                        <div className="p-4 border-b border-zinc-800">
                          <div className="flex items-center space-x-3">
                            {profile.profileImage ? (
                              <img
                                src={profile.profileImage}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                darkMode ? 'bg-zinc-800' : 'bg-black/5'
                              }`}>
                                <FaUser className={darkMode ? 'text-gray-400' : 'text-gray-600'} size={18} />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-semibold truncate ${
                                darkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {profile.username}
                              </p>
                              <p className={`text-xs truncate ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {profile.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2 space-y-1">
                          {Object.entries(routes).map(([name, route]) => (
                            <Link
                              key={name}
                              to={route.path}
                              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                darkMode 
                                  ? 'text-gray-300 hover:bg-zinc-800' 
                                  : 'text-gray-600 hover:bg-black/5'
                              }`}
                              onClick={() => setActiveDropdown(null)}
                            >
                              {route.icon}
                              <span>{name}</span>
                            </Link>
                          ))}

                          {/* Auth Section */}
                          <div className="pt-2 mt-2 border-t border-zinc-800">
                            {isLoggedIn ? (
                              <button
                                className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  darkMode 
                                    ? 'text-gray-300 hover:bg-zinc-800' 
                                    : 'text-gray-600 hover:bg-black/5'
                                }`}
                                onClick={() => {
                                  // Add logout logic here
                                  setActiveDropdown(null);
                                }}
                              >
                                <MdLogout size={18} />
                                <span>Sign Out</span>
                              </button>
                            ) : (
                              <Link
                                to="/signup"
                                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  darkMode 
                                    ? 'text-gray-300 hover:bg-zinc-800' 
                                    : 'text-gray-600 hover:bg-black/5'
                                }`}
                                onClick={() => setActiveDropdown(null)}
                              >
                                <MdLogin size={18} />
                                <span>Sign In</span>
                              </Link>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center space-x-3">
              {/* Upload Button for Mobile */}
              <Link to="/account/upload">
                <motion.button
                  className={`
                    p-2.5 rounded-lg transition-all duration-300
                    ${darkMode 
                      ? 'hover:bg-zinc-800 text-gray-300' 
                      : 'hover:bg-black/5 text-gray-600'
                    }
                  `}
                  whileTap={{ scale: 0.95 }}
                >
                  <IoCloudUploadOutline size={18} />
                </motion.button>
              </Link>

              {/* Mobile Menu Toggle */}
              <motion.button
                className={`
                  p-2.5 rounded-lg transition-all duration-300 relative
                  ${darkMode 
                    ? 'hover:bg-zinc-800 text-gray-300' 
                    : 'hover:bg-black/5 text-gray-600'
                  }
                `}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
              {totalNotifications > 0 && (
                <span className="bg-red-500 absolute -top-1 -right-1 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {totalNotifications}
                </span>
              )}
                {mobileMenuOpen ? (
                  <HiX size={20} />
                ) : (
                  <HiMenuAlt3 size={20} />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`lg:hidden border-t ${
                darkMode ? 'border-zinc-800' : 'border-gray-200/20'
              } overflow-hidden`}
            >
              <div className="p-4 space-y-4 dark:bg-zinc-950 bg-gray-100">
                {/* User Info */}
                <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                  darkMode ? 'bg-zinc-800' : 'bg-black/5'
                }`}>
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-zinc-800' : 'bg-black/5'
                    }`}>
                      <FaUser className={darkMode ? 'text-gray-400' : 'text-gray-600'} size={18} />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {profile.username}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {profile.email}
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-4 gap-2">
                  <Link
                    to="/settings/cart"
                    className={`
                      flex flex-col items-center p-3 rounded-lg transition-all duration-200 relative
                      ${darkMode 
                        ? 'bg-zinc-800 hover:bg-zinc-700' 
                        : 'bg-black/5 hover:bg-black/10'
                      }
                    `}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaOpencart size={18} className="mb-1" />
                    <span className="text-xs font-medium">Cart</span>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/Settings/Notification"
                    className={`
                      flex flex-col items-center p-3 rounded-lg transition-all duration-200 relative
                      ${darkMode 
                        ? 'bg-zinc-800 hover:bg-zinc-700' 
                        : 'bg-black/5 hover:bg-black/10'
                      }
                    `}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MdNotificationsNone size={20} className="mb-1" />
                    <span className="text-xs font-medium">Alerts</span>
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/Settings/Order"
                    className={`
                      flex flex-col items-center p-3 rounded-lg transition-all duration-200 relative
                      ${darkMode 
                        ? 'bg-zinc-800 hover:bg-zinc-700' 
                        : 'bg-black/5 hover:bg-black/10'
                      }
                    `}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <CubeIcon className="w-4 h-4 mb-1" />
                    <span className="text-xs font-medium">Orders</span>
                    {orderCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {orderCount}
                      </span>
                    )}
                  </Link>

                  <button
                    onClick={toggleDarkMode}
                    className={`
                      flex flex-col items-center p-3 rounded-lg transition-all duration-200
                      ${darkMode 
                        ? 'bg-zinc-800 hover:bg-zinc-700' 
                        : 'bg-black/5 hover:bg-black/10'
                      }
                    `}
                  >
                    {darkMode ? <CiLight size={18} className="mb-1" /> : <CiDark size={18} className="mb-1" />}
                    <span className="text-xs font-medium">Theme</span>
                  </button>
                      
                </div>

                {/* Menu Routes */}
                <div className="space-y-1">
                  {Object.entries(routes).map(([name, route]) => (
                    <Link
                      key={name}
                      to={route.path}
                      className={`
                        flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-all duration-200
                        ${darkMode 
                          ? 'bg-zinc-800 hover:bg-zinc-700' 
                          : 'bg-black/5 hover:bg-black/10'
                        }
                      `}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {route.icon}
                      <span>{name}</span>
                    </Link>
                  ))}
                </div>

                {/* Auth Section */}
                <div className="pt-2 border-t border-zinc-800">
                  {isLoggedIn ? (
                    <button
                      className={`
                        w-full flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-all duration-200
                        ${darkMode 
                          ? 'bg-zinc-800 hover:bg-zinc-700' 
                          : 'bg-black/5 hover:bg-black/10'
                        }
                      `}
                      onClick={() => {
                        // Add logout logic here
                        setMobileMenuOpen(false);
                      }}
                    >
                      <MdLogout size={18} />
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <Link
                      to="/signup"
                      className={`
                        flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-all duration-200
                        ${darkMode 
                          ? 'bg-zinc-800 hover:bg-zinc-700' 
                          : 'bg-black/5 hover:bg-black/10'
                        }
                      `}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <MdLogin size={18} />
                      <span>Sign In</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      {/* <div className="h-20"></div> */}
    </div>
  );
};

export default Header;