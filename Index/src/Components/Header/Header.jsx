// // import { useState, useEffect, useRef, useContext, createContext } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { 
// //   FaHome, FaImages, FaHeart, FaCartPlus, FaSun, FaMoon, 
// //   FaHandsHelping, FaUser, FaUserPlus, FaRegBell, FaBullhorn, FaBars 
// // } from "react-icons/fa";
// // import { MdGroups3, MdClose, MdOutlineFeedback, MdBook, MdHistory, MdMenu, MdOutlineAccountCircle } from "react-icons/md";
// // import { IoMdHelpCircleOutline, IoMdMore, IoMdSettings } from "react-icons/io";
// // import { BiCategoryAlt } from "react-icons/bi";
// // import { Im500Px, ImBlog } from "react-icons/im";
// // import { Link } from "react-router-dom";
// // import { toast } from "react-hot-toast";
// // import { databases, account, Query } from "../../appwriteConfig";
// // import { CubeIcon } from '@heroicons/react/24/outline';
// // import { FiMenu } from "react-icons/fi";
// //  import image1 from './Header-Images/no1.jpg'
// //  import image2 from './Header-Images/no2.jpeg'
// //  import image3 from './Header-Images/no3.webp'
// //  import image4 from './Header-Images/no4.jpeg'
// //  import image5 from './Header-Images/no5.jpg'
// //  import image6 from './Header-Images/no6.jpeg'
// //  import image7 from './Header-Images/no7.jpeg'
// //  import image8 from './Header-Images/no8.jpeg'
// //  import image9 from './Header-Images/no9.jpg'
// // // import Sidebar from "../Sidebar";

// // // Dark Mode Context
// // export const DarkModeContext = createContext();

// // export const DarkModeProvider = ({ children }) => {
// //   const [darkMode, setDarkMode] = useState(() => {
// //     const savedMode = localStorage.getItem('darkMode');
// //     return savedMode !== null ? savedMode === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
// //   });

// //   useEffect(() => {
// //     document.documentElement.classList.toggle('dark', darkMode);
// //     localStorage.setItem('darkMode', darkMode);
// //   }, [darkMode]);

// //   const toggleDarkMode = () => {
// //     setDarkMode(prev => {
// //       const newMode = !prev;
// //       toast.success(`Switched to ${newMode ? 'Dark' : 'Light'} Mode`, {
// //         position: 'top-right',
// //         icon: newMode ? <FaMoon className="text-blue-300" /> : <FaSun className="text-yellow-400" />,
// //         style: { 
// //           background: newMode ? '#1F2937' : '#F9FAFB',
// //           color: newMode ? '#F9FAFB' : '#1F2937',
// //           borderRadius: '12px',
// //           padding: '12px'
// //         }
// //       });
// //       return newMode;
// //     });
// //   };

// //   return (
// //     <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
// //       {children}
// //     </DarkModeContext.Provider>
// //   );
// // };

// // const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// // const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
// // const DB_ID = import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID;
// // const ORDERS_COLLECTION = import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID;

// // const Header = () => {

// // const backgroundImages = [
// // image1,image2,image3,image4,image5,image6,image7,image8,image9
// // ];

// //   const routes = {
// //     Home: { path: "/", icon: <FaHome />, color: "text-blue-500" },
// //     Gallery: { path: "/gallery", icon: <FaImages />, color: "text-purple-500" },
// //     Category: { path: "/category", icon: <BiCategoryAlt />, color: "text-green-500" },
// //     Community: { path: "/community", icon: <MdGroups3 />, color: "text-indigo-500" },
// //     Blog: { path: "/blog", icon: <ImBlog />, color: "text-red-500" },
// //     FAQs: { path: "/faqs", icon: <IoMdHelpCircleOutline />, color: "text-orange-500" },
// //     Help: { path: "/Resources/Help", icon: <FaHandsHelping />, color: "text-teal-500" },
// //     Feedback: { path: "/Resources/feedback", icon: <MdOutlineFeedback />, color: "text-amber-500" },
// //     Favorites: { path: "/Favourite", icon: <FaHeart />, color: "text-rose-500" },
// //     History: { path: "/history", icon: <MdHistory />, color: "text-yellow-500" },
// //     Profile: { path: "/account", icon: <FaUser />, color: "text-pink-500" },
// //     'My Diary': { path: "/journal", icon: <MdBook />, color: "text-yellow-500" },
// //     'Sign Up': { path: "/signup", icon: <FaUserPlus />, color: "text-pink-500" },
// //     'Art Store': { path: "/Arteva/Artstore", icon: <FaBullhorn />, color: "text-red-500" },
// //   };

// //   const primaryRoutes = ['Gallery', 'Profile', 'My Diary', 'Sign Up', 'Community'];
// //   const userRoutes = ['Cart', 'Notification', 'Orders'];
// //   const otherRoutes = ['Home', 'Category', 'Blog', 'FAQs', 'Help', 'Feedback', 'Favorites', 'History'];

// //   const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [activeDropdown, setActiveDropdown] = useState(null);
// //   const [profile, setProfile] = useState({ username: '', email: '', profileImage: null });
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [cartCount, setCartCount] = useState(0);
// //   const [orderCount, setOrderCount] = useState(0);
// //   const [notificationCount, setNotificationCount] = useState(0);
// //   const menuRef = useRef(null);

// // const useScrollDirection = () => {
// //   const [scrollDir, setScrollDir] = useState("up");

// //   useEffect(() => {
// //     let lastScrollY = window.scrollY;

// //     const updateScrollDir = () => {
// //       const currentScrollY = window.scrollY;
// //       if (Math.abs(currentScrollY - lastScrollY) < 4) return;

// //       setScrollDir(currentScrollY > lastScrollY ? "down" : "up");
// //       lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
// //     };

// //     window.addEventListener("scroll", updateScrollDir);
// //     return () => window.removeEventListener("scroll", updateScrollDir);
// //   }, []);

// //   return scrollDir;
// // };

// // const scrollDirection = useScrollDirection();




// //   // Close dropdowns when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (menuRef.current && !menuRef.current.contains(event.target)) {
// //         setActiveDropdown(null);
// //       }
// //     };
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, []);

// //   // Background image transition
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setCurrentImageIndex((prevIndex) => 
// //         prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
// //       );
// //     }, 8000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   // Scroll effect for navbar
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setIsScrolled(window.scrollY > 50);
// //     };
// //     window.addEventListener('scroll', handleScroll);
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   // Fetch user profile and login status
// //   useEffect(() => {
// //     const fetchUserProfile = async () => {
// //       try {
// //         const userSession = await account.get();
// //         const userId = userSession.$id;
// //         setIsLoggedIn(true);

// //         const userDoc = await databases.getDocument(
// //           DATABASE_ID,
// //           USER_COLLECTION_ID,
// //           userId
// //         );

// //         setProfile({
// //           username: userDoc.username || 'Guest',
// //           email: userDoc.email || 'No email',
// //           profileImage: userDoc.profileImageUrl || null,
// //         });
// //       } catch (error) {
// //         console.error("Error fetching user profile:", error);
// //         setIsLoggedIn(false);
// //       }
// //     };

// //     fetchUserProfile();
// //   }, []);

// //   // Fetch cart count
// //   useEffect(() => {
// //     const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
// //     const count = storedCart.reduce((total, item) => total + item.quantity, 0);
// //     setCartCount(count);
// //   }, []);

// //   // Fetch order count
// //   useEffect(() => {
// //     const fetchOrderCount = async () => {
// //       try {
// //         const user = await account.get();
// //         const res = await databases.listDocuments(DB_ID, ORDERS_COLLECTION, [
// //           Query.equal('sellerId', user.$id)
// //         ]);
// //         setOrderCount(res.total);
// //       } catch (err) {
// //         console.error('Failed to fetch order count:', err);
// //       }
// //     };

// //     if (isLoggedIn) {
// //       fetchOrderCount();
// //     }
// //   }, [isLoggedIn]);

// //   const toggleDropdown = (dropdownName) => {
// //     setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
// //   };

// //   const navbarVariants = {
// //   initial: { y: -100, opacity: 0 },
// //   animate: { 
// //     y: 0, 
// //     opacity: 1, 
// //     transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
// //   },
// //   scrolled: {
// //     // height: 64,
// //     backgroundColor: darkMode ? "rgba(17, 24, 39, 0.6)" : "rgba(255, 255, 255, 0.4)", // <—
// //     boxShadow: darkMode
// //       ? "0 4px 12px rgba(0, 0, 0, 0.3)"
// //       : "0 4px 12px rgba(0, 0, 0, 0.1)",
// //     transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
// //   },
// //   unscrolled: {
// //     // height: 80,
// //     backgroundColor: darkMode ? "rgba(17, 24, 39, 0.4)" : "rgba(255, 255, 255, 0.2)", // <—
// //     boxShadow: "none",
// //     transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
// //   },
// // };


// //   const menuItemVariants = {
// //     open: (i) => ({
// //       opacity: 1,
// //       y: 0,
// //       transition: { delay: i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] },
// //     }),
// //     closed: { opacity: 0, y: -10 },
// //   };

// //   const bgImageVariants = {
// //     enter: { opacity: 0 },
// //     center: { opacity: 1 },
// //     exit: { opacity: 0 },
// //   };

// //   // Calculate total notifications count for mobile
// //   const totalNotifications = cartCount + orderCount + notificationCount;


// //   return (
// //     <div className="relative  w-full flex items-center justify-center">
// //       {/* Dynamic Background */}
// //  {/* <div className="absolute inset-0 z-0 grid grid-cols-3 grid-rows-3 rounded-lg gap-1 overflow-hidden">
// //   {backgroundImages.map((img, index) => (
// //     <motion.div
// //       key={index}
// //       className="w-full h-full bg-cover bg-center rounded-lg"
// //       style={{ backgroundImage: `url(${img})` }}
// //     />
// //   ))}
// //   // Dark overlay for readability
// //   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-10" />
// // </div> */}

// // {/* lg:h-[100vh] h-[80vh] */}


// //       {/* Navbar */}
// //       <motion.nav
// //         className={` fixed lg:top-2 top-0 rounded-lg lg:w-[99%] w-full mx-auto ml-[0.5%] z-[1000] py-2 backdrop-blur-lg ${darkMode ? 'bg-gray-900/95 text-gray-100' : 'bg-white/40 text-gray-900'}`}
// //         initial= {true}
// //         animate={isScrolled ? "scrolled" : ["animate", "unscrolled"]}
// //         variants={navbarVariants}
// //       >
// //         <div className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8">
// //           <div className="flex h-16 items-center justify-between">
// //             {/* Logo */}
// //             <motion.div
// //               initial={{ y: -20, opacity: 0 }}
// //               animate={{ y: 0, opacity: 1 }}
// //               transition={{ duration: 0.6, delay: 0.2 }}
// //               className="flex items-center flex-shrink-0"
// //             >
// //               <Link to="/" className="flex flex-col items-center font-eagle">
// //                 <div className="text-xl sm:text-2xl font-bold tracking-wider">
// //                   <span className="text-yellow-500">Painters'</span>
// //                   <span className={darkMode ? 'text-gray-100' : 'text-gray-800'}>Diary</span>
// //                 </div>
// //                 {/* <p className={`hidden md:block text-sm ${darkMode ? 'text-red-300' : 'text-red-700'} font-cookie`}>
// //                   The Diary of Every Artist
// //                 </p> */}
// //               </Link>
// //             </motion.div>

// //             {/* Center Buttons (Large Screens) */}
// //             <div className="hidden lg:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
// //               {primaryRoutes.map((name, index) => {
// //                 if (name === 'Sign Up' && isLoggedIn) return null;
// //                 if (name === 'My Diary' && !isLoggedIn) return null;
// //                 return (

// // <Link key={name} to={routes[name].path}>
// //   <motion.button
// //     className={`
// //       relative group px-3 py-1.5 text-sm font-medium
// //       ${darkMode ? 'text-gray-100' : 'text-gray-900'}
// //       transition-colors duration-300 font-semibold 
// //     `}
// //     whileTap={{ scale: 0.97 }}
// //     custom={index}
// //     variants={menuItemVariants}
// //     initial="closed"
// //     animate="open"
// //   >
// //     {name}
// //     <span
// //       className={`
// //         absolute bottom-0 left-0 h-0.5 w-0
// //         ${darkMode ? 'bg-gray-100' : 'bg-gray-800'}
// //         group-hover:w-full
// //         transition-all duration-500 ease-in-out origin-left
// //       `}
// //     />
// //   </motion.button>
// // </Link>


// //                 );
// //               })}
// //             </div>
 
// //             {/* Right Side Controls */}
// //             <div className="flex items-center gap-2 sm:gap-3" ref={menuRef}>
// //               {/* Desktop Right Buttons */}
// //               <div className="hidden lg:flex items-center gap-2">
// //                 <motion.button
// //                   // className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : ' bg-gray-300 hover:bg-white/90'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
// //                    className="  border p-2 rounded-lg relative"                    

// //                   whileHover={{ scale: 1.1 }}
// //                   whileTap={{ scale: 0.95 }}
// //                   onClick={toggleDarkMode}
// //                   title={darkMode ? "Light Mode" : "Dark Mode"}
// //                 >
// //                   {darkMode ? (
// //                     <FaSun className="text-lg text-yellow-400" />
// //                   ) : (
// //                     <FaMoon className="text-lg text-blue-600" />
// //                   )}
// //                 </motion.button>
                
// //                 <Link to="/settings/cart">
// //                   <motion.button
// //                     // className={`p-2 relative ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
// //                    className="  border p-2 rounded-lg relative"                    

// //                     whileHover={{ scale: 1.1 }}
// //                     whileTap={{ scale: 0.95 }}
// //                   >
// //                     <FaCartPlus className="text-lg text-blue-500" />
// //                     {cartCount > 0 && (
// //                       <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
// //                         {cartCount}
// //                       </span>
// //                     )}
// //                   </motion.button>
// //                 </Link>
                
// //                 <Link to="/Settings/Notification">
// //                   <motion.button
// //                   // className={`p-2 relative ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
// //                     className="  border p-2 rounded-lg relative"                    

// //                     whileHover={{ scale: 1.1 }}
// //                     whileTap={{ scale: 0.95 }}
// //                   >
// //                     <FaRegBell className="text-lg text-blue-500" />
// //                     {notificationCount > 0 && (
// //                       <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
// //                         {notificationCount}
// //                       </span>
// //                     )}
// //                   </motion.button>
// //                 </Link>
                
// //                 <Link to="/Settings/Order">
// //                   <motion.button
// //                     // className={`p-2 relative ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
// //                     className="  border p-2 rounded-lg relative"                    

// //                     whileHover={{ scale: 1.1 }}
// //                     whileTap={{ scale: 0.95 }}
// //                   >
// //                     <CubeIcon className="text-lg text-blue-500" />
// //                     {orderCount > 0 && (
// //                       <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
// //                         {orderCount}
// //                       </span>
// //                     )}
// //                   </motion.button>
// //                 </Link>
                
// //                 <div className="relative">
// //                   <motion.button
// //                     // className={`p-2 rounded-full ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
// //                    className="  border p-2 rounded-lg"                    

// //                     onClick={() => toggleDropdown('profile')}
// //                     whileHover={{ scale: 1.1 }}
// //                     whileTap={{ scale: 0.95 }}
// //                   >
// //                     {profile.profileImage ? (
// //                       <img
// //                         src={profile.profileImage}
// //                         alt="Profile"
// //                         className="w-6 h-6 rounded-full object-cover"
// //                       />
// //                     ) : (
// //                       <FaUser className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-200'}`} />
// //                     )}
// //                   </motion.button>
                  
// //                   <AnimatePresence>
// //                     {activeDropdown === 'profile' && (
// //                       <motion.div
// //                         initial={{ opacity: 0, y: -10 }}
// //                         animate={{ opacity: 1, y: 0 }}
// //                         exit={{ opacity: 0, y: -10 }}
// //                         transition={{ duration: 0.2 }}
// //                         className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/60 border-gray-200'} border p-2 z-20 backdrop-blur-lg`}
// //                       >
// //                         <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
// //                           <p className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
// //                             {profile.username}
// //                           </p>
// //                           <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
// //                             {profile.email}
// //                           </p>
// //                         </div>
// //                         {otherRoutes.map((name, index) => (
// //                           <Link
// //                             key={name}
// //                             to={routes[name].path}
// //                             className={`block px-3 py-2 text-sm font-medium rounded-lg ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'} transition-colors duration-200`}
// //                             onClick={() => setActiveDropdown(null)}
// //                           >
// //                             <div className="flex items-center gap-2">
// //                               <span className={routes[name].color}>{routes[name].icon}</span>
// //                               {name}
// //                             </div>
// //                           </Link>
// //                         ))}
// //                       </motion.div>
// //                     )}
// //                   </AnimatePresence>
// //                 </div>
// //               </div>

// //               {/* Mobile Dropdowns */}
// //               <div className="flex lg:hidden items-center gap-2">
// //                 {/* Primary Menu Dropdown */}
// //                 <div className="relative">
// //                   <motion.button
// //                   //  className={`p-2 ${darkMode ? 'bg-gray-800/90 hover:bg-gray-700/90' : 'bg-white/60 hover:bg-white/90'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
// //                     className={`border p-1 rounded-lg ${darkMode ? 'border-gray-200' : 'border-gray-800'}`}
// //                     onClick={() => toggleDropdown('primary')}
// //                     whileHover={{ scale: 1.1 }}
// //                     whileTap={{ scale: 0.95 }}
// //                   >
// //                     <MdOutlineAccountCircle className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`} />
// //                   </motion.button>
                  
// //                   <AnimatePresence>
// //                     {activeDropdown === 'primary' && (
// //                       <motion.div
// //                         initial={{ opacity: 0, y: -10 }}
// //                         animate={{ opacity: 1, y: 0 }}
// //                         exit={{ opacity: 0, y: -10 }}
// //                         transition={{ duration: 0.2 }}
// //                         className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900/70 border-gray-700' : 'bg-white/70 border-gray-200'} border p-2 z-20 backdrop-blur-lg`}
// //                       >
// //                         <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
// //                           <div className="flex items-center gap-2">
// //                             {profile.profileImage ? (
// //                               <img
// //                                 src={profile.profileImage}
// //                                 alt="Profile"
// //                                 className="w-8 h-8 rounded-full object-cover"
// //                               />
// //                             ) : (
// //                               <FaUser className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
// //                             )}
// //                             <div>
// //                               <p className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
// //                                 {profile.username}
// //                               </p>
// //                               <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
// //                                 {profile.email}
// //                               </p>
// //                             </div>
// //                           </div>
// //                         </div>
// //                         {primaryRoutes.map((name, index) => {
// //                           if (name === 'Sign Up' && isLoggedIn) return null;
// //                           if (name === 'My Diary' && !isLoggedIn) return null;
// //                           return (
// //                             <motion.div
// //                               key={name}
// //                               custom={index}
// //                               variants={menuItemVariants}
// //                               initial="closed"
// //                               animate="open"
// //                             >
// //                               <Link
// //                                 to={routes[name].path}
// //                                 className={`block px-3 py-2 text-sm font-medium rounded-lg ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'} transition-colors duration-200`}
// //                                 onClick={() => setActiveDropdown(null)}
// //                               >
// //                                 <div className="flex items-center gap-2">
// //                                   <span className={routes[name].color}>{routes[name].icon}</span>
// //                                   {name}
// //                                 </div>
// //                               </Link>
// //                             </motion.div>
// //                           );
// //                         })}
// //                       </motion.div>
// //                     )}
// //                   </AnimatePresence>
// //                 </div>

// //                 {/* User Actions Dropdown */}
// //                 <div className="relative">
// //                   <motion.button
// //                     // className={`p-2 ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 relative`}
// //                     className={`border p-1 rounded-lg ${darkMode ? 'border-gray-200' : 'border-gray-800'}`}                    

// //                     onClick={() => toggleDropdown('user')}
// //                     whileHover={{ scale: 1.1 }}
// //                     whileTap={{ scale: 0.95 }}
// //                   >
// //                     <IoMdSettings className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`} />
// //                     {totalNotifications > 0 && (
// //                       <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
// //                         {totalNotifications}
// //                       </span>
// //                     )}
// //                   </motion.button>
                  
// //                   <AnimatePresence>
// //                     {activeDropdown === 'user' && (
// //                       <motion.div
// //                         initial={{ opacity: 0, y: -10 }}
// //                         animate={{ opacity: 1, y: 0 }}
// //                         exit={{ opacity: 0, y: -10 }}
// //                         transition={{ duration: 0.2 }}
// //                         className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900/90 border-gray-700' : 'bg-white/70 border-gray-200'} border p-2 z-20 backdrop-blur-lg`}
// //                       >
// //                         <Link
// //                           to="/settings/cart"
// //                           className={`block px-3 py-2 text-sm font-medium rounded-lg ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'} transition-colors duration-200 relative`}
// //                           onClick={() => setActiveDropdown(null)}
// //                         >
// //                           <div className="flex items-center justify-between">
// //                             <div className="flex items-center gap-2">
// //                               <FaCartPlus className="text-blue-500" />
// //                               Cart
// //                             </div>
// //                             {cartCount > 0 && (
// //                               <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1">
// //                                 {cartCount}
// //                               </span>
// //                             )}
// //                           </div>
// //                         </Link>
                        
// //                         <Link
// //                           to="/Settings/Notification"
// //                           className={`block px-3 py-2 text-sm font-medium rounded-lg ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'} transition-colors duration-200 relative`}
// //                           onClick={() => setActiveDropdown(null)}
// //                         >
// //                           <div className="flex items-center justify-between">
// //                             <div className="flex items-center gap-2">
// //                               <FaRegBell className="text-blue-500" />
// //                               Notification
// //                             </div>
// //                             {notificationCount > 0 && (
// //                               <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1">
// //                                 {notificationCount}
// //                               </span>
// //                             )}
// //                           </div>
// //                         </Link>
                        
// //                         <Link
// //                           to="/Settings/Order"
// //                           className={`block px-3 py-2 text-sm font-medium rounded-lg ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'} transition-colors duration-200 relative`}
// //                           onClick={() => setActiveDropdown(null)}
// //                         >
// //                           <div className="flex items-center justify-between">
// //                             <div className="flex items-center gap-2">
// //                               <CubeIcon className="text-blue-500 w-4 h-4" />
// //                               Orders
// //                             </div>
// //                             {orderCount > 0 && (
// //                               <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1">
// //                                 {orderCount}
// //                               </span>
// //                             )}
// //                           </div>
// //                         </Link>
                        
// //                         <motion.button
// //                           className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'} transition-colors duration-200`}
// //                           onClick={() => {
// //                             toggleDarkMode();
// //                             setActiveDropdown(null);
// //                           }}
// //                         >
// //                           <div className="flex items-center gap-2">
// //                             {darkMode ? (
// //                               <FaSun className="text-yellow-400" />
// //                             ) : (
// //                               <FaMoon className="text-gray-700" />
// //                             )}
// //                             {darkMode ? 'Light Mode' : 'Dark Mode'}
// //                           </div>
// //                         </motion.button>
// //                       </motion.div>
// //                     )}
// //                   </AnimatePresence>
// //                 </div>

// //                 {/* More Options Dropdown */}
// //                 <div className="relative">
// //                   <motion.button
// //                     // className={`p-2 ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
// //                    className={`border p-1 rounded-lg ${darkMode ? 'border-gray-200' : 'border-gray-800'}`}                    

// //                     onClick={() => toggleDropdown('more')}
// //                     whileHover={{ scale: 1.1 }}
// //                     whileTap={{ scale: 0.95 }}
// //                   >
// //                     <FiMenu className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`} />
// //                   </motion.button>
                  
// //                   <AnimatePresence>
// //                     {activeDropdown === 'more' && (
// //                       <motion.div
// //                         initial={{ opacity: 0, y: -10 }}
// //                         animate={{ opacity: 1, y: 0 }}
// //                         exit={{ opacity: 0, y: -10 }}
// //                         transition={{ duration: 0.2 }}
// //                         className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900/90 border-gray-700' : 'bg-white/70 border-gray-200'} border p-2 z-20 backdrop-blur-lg`}
// //                       >
// //                         {otherRoutes.map((name, index) => (
// //                           <motion.div
// //                             key={name}
// //                             custom={index}
// //                             variants={menuItemVariants}
// //                             initial="closed"
// //                             animate="open"
// //                           >
// //                             <Link
// //                               to={routes[name].path}
// //                               className={`block px-3 py-2 text-sm font-medium rounded-lg ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'} transition-colors duration-200`}
// //                               onClick={() => setActiveDropdown(null)}
// //                             >
// //                               <div className="flex items-center gap-2">
// //                                 <span className={routes[name].color}>{routes[name].icon}</span>
// //                                 {name}
// //                               </div>
// //                             </Link>
// //                           </motion.div>
// //                         ))}
// //                       </motion.div>
// //                     )}
// //                   </AnimatePresence>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         {/* </div> */}
// //       </motion.nav>

// //       {/* Hero Section */}
      
// //     </div>
// //   );
// // };

// // export default Header;



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
import { FiUpload, FiUser } from "react-icons/fi";
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
          background: newMode ? '#1F2937' : '#F9FAFB',
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
    // Dashboard: { path: ", icon: <MdOutlineDashboardCustomize size={18} /> },
    Dashboard: {path: "/Account/Dashboard", icon: <MdOutlineDashboardCustomize size={18}/>},
    Favorites: { path: "/Favourite", icon: <IoBookmarkOutline size={18} /> },
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
      ? "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.7))"
      : "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))",
    backdropFilter: "blur(20px) saturate(200%)",
    WebkitBackdropFilter: "blur(20px) saturate(200%)",
    borderBottom: darkMode 
      ? "1px solid rgba(255, 255, 255, 0.15)"
      : "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: darkMode
      ? "0 8px 32px rgba(0, 0, 0, 0.3)"
      : "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  unscrolled: {
    background: darkMode 
      ? "linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.5))"
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
            ? 'text-gray-100 bg-black/40' 
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
                      ? 'bg-white/10 hover:bg-white/20 text-white' 
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
                      ? 'hover:bg-white/10 text-gray-300' 
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
                        ? 'hover:bg-white/10 text-gray-300' 
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
                        ? 'hover:bg-white/10 text-gray-300' 
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
                        ? 'hover:bg-white/10 text-gray-300' 
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
                        ? 'hover:bg-white/10' 
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
                        darkMode ? 'bg-white/10' : 'bg-black/5'
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
                            ? 'bg-slate-900/95 border border-white/10' 
                            : 'bg-white/95 border border-gray-200'
                        } backdrop-blur-xl z-50 overflow-hidden`}
                      >
                        {/* Profile Header */}
                        <div className="p-4 border-b border-white/10 dark:border-gray-200/20">
                          <div className="flex items-center space-x-3">
                            {profile.profileImage ? (
                              <img
                                src={profile.profileImage}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                darkMode ? 'bg-white/10' : 'bg-black/5'
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
                                  ? 'text-gray-300 hover:bg-white/10' 
                                  : 'text-gray-600 hover:bg-black/5'
                              }`}
                              onClick={() => setActiveDropdown(null)}
                            >
                              {route.icon}
                              <span>{name}</span>
                            </Link>
                          ))}

                          {/* Auth Section */}
                          <div className="pt-2 mt-2 border-t border-white/10 dark:border-gray-200/20">
                            {isLoggedIn ? (
                              <button
                                className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  darkMode 
                                    ? 'text-gray-300 hover:bg-white/10' 
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
                                    ? 'text-gray-300 hover:bg-white/10' 
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
                      ? 'hover:bg-white/10 text-gray-300' 
                      : 'hover:bg-black/5 text-gray-600'
                    }
                  `}
                  whileTap={{ scale: 0.95 }}
                >
                  <IoCloudUploadOutline size={18} />
                </motion.button>
              </Link>

              {/* Notification Badge */}
             

              {/* Mobile Menu Toggle */}
              <motion.button
                className={`
                  p-2.5 rounded-lg transition-all duration-300 relative
                  ${darkMode 
                    ? 'hover:bg-white/10 text-gray-300' 
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
                darkMode ? 'border-white/10' : 'border-gray-200/20'
              } overflow-hidden`}
            >
              <div className="p-4 space-y-4">
                {/* User Info */}
                <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                  darkMode ? 'bg-white/10' : 'bg-black/5'
                }`}>
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-white/10' : 'bg-black/5'
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
                        ? 'bg-white/10 hover:bg-white/20' 
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
                        ? 'bg-white/10 hover:bg-white/20' 
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
                        ? 'bg-white/10 hover:bg-white/20' 
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
                        ? 'bg-white/10 hover:bg-white/20' 
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
                          ? 'bg-white/10 hover:bg-white/20' 
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
                <div className="pt-2 border-t border-white/10 dark:border-gray-200/20">
                  {isLoggedIn ? (
                    <button
                      className={`
                        w-full flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-all duration-200
                        ${darkMode 
                          ? 'bg-white/10 hover:bg-white/20' 
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
                          ? 'bg-white/10 hover:bg-white/20' 
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
    </div>
  );
};

export default Header;