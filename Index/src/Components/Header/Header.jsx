// import { useState, useEffect, useRef, useContext, createContext } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   FaUserPlus, FaUser, FaHeart, FaCartPlus, FaSun, FaMoon, FaHome, 
//   FaImages, FaHandsHelping, FaCrown, FaSearch,FaBell, FaBullhorn,
//   FaRegBell
// } from "react-icons/fa";
// import { MdGroups3, MdClose, MdOutlineFeedback, MdBook, MdHistory } from "react-icons/md";
// import { IoMdHelpCircleOutline } from "react-icons/io";
// import { CiBellOn, CiMenuFries } from "react-icons/ci";
// import { BiCategoryAlt } from "react-icons/bi";
// import { ImBlog } from "react-icons/im";
// import { Link } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { databases, account, Query } from "../../appwriteConfig";
// import { CubeIcon, } from '@heroicons/react/24/outline';
// // Dark Mode Context
//  export const DarkModeContext = createContext();

// export const DarkModeProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(() => {
//     const savedMode = localStorage.getItem('darkMode');
//     return savedMode !== null ? savedMode === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
//   });

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', darkMode);
//     localStorage.setItem('darkMode', darkMode);
//   }, [darkMode]);

//   const toggleDarkMode = () => {
//     setDarkMode(prev => {
//       const newMode = !prev;
//       toast.success(`Switched to ${newMode ? 'Dark' : 'Light'} Mode`, {
//         position: 'top-right',
//         icon: newMode ? <FaMoon className="text-blue-300" /> : <FaSun className="text-yellow-400" />,
//         style: { 
//           background: newMode ? '#1F2937' : '#F9FAFB',
//           color: newMode ? '#F9FAFB' : '#1F2937',
//           borderRadius: '12px',
//           padding: '12px'
//         }
//       });
//       return newMode;
//     });
//   };

//   return (
//     <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
// const DB_ID = import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID;
// const ORDERS_COLLECTION = import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID;


// const Header = () => {
//   const backgroundImages = [
//     'https://img.freepik.com/free-photo/warm-colors-vase-with-dark-flowers_23-2151843580.jpg?uid=R164504650&ga=GA1.1.955884625.1725872001&semt=ais_hybrid&w=740',
//     'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
//     'https://img.freepik.com/free-photo/nature-tranquil-scene-silhouette-pine-tree-generative-ai_188544-12777.jpg?uid=R164504650&ga=GA1.1.955884625.1725872001&semt=ais_hybrid&w=740',
//     'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
//     'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
//   ];

//   const routes = {
//     Home: { path: "/", icon: <FaHome />, color: "text-blue-500" },
//     Gallery: { path: "/gallery", icon: <FaImages />, color: "text-purple-500" },
//     Category: { path: "/category", icon: <BiCategoryAlt />, color: "text-green-500" },
//     "My Account": { path: "/account", icon: <FaUser />, color: "text-pink-500" },
//     History: { path: "/history", icon: <MdHistory />, color: "text-yellow-500" },
//     Community: { path: "/community", icon: <MdGroups3 />, color: "text-indigo-500" },
//     Blog: { path: "/blog", icon: <ImBlog />, color: "text-red-500" },
//     FAQs: { path: "/faqs", icon: <IoMdHelpCircleOutline />, color: "text-orange-500" },
//     Help: { path: "/Resources/Help", icon: <FaHandsHelping />, color: "text-teal-500" },
//     Feedback: { path: "/Resources/feedback", icon: <MdOutlineFeedback />, color: "text-amber-500" },
//     Favorites: { path: "/Favourite", icon: <FaHeart />, color: "text-rose-500" },
//   };

//   const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchExpanded, setIsSearchExpanded] = useState(false);
//   const [query, setQuery] = useState("");
//   const [isScrolled, setIsScrolled] = useState(false);
//   const searchRef = useRef(null);
//   const menuRef = useRef(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false)
//   const [profileImage, setProfileImage] = useState(null);
//   const [cartCount, setCartCount] = useState(0);
//   const [orderCount, setOrderCount] = useState();
//   const [loading, setLoading] = useState(null)
//   // Enhanced background transition effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => 
//         prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 8000); // Increased duration for better viewing
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setIsSearchExpanded(false);
//       }
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsMenuOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);


//   //For profile Images and the emails 
//   const [profile, setProfile] = useState({
//     username: '',
//     email: '',
//     profileImage:null
//   });

// useEffect(() => {
//   const fetchUserProfile = async () => {
//     try {
//       // Get current user session
//       const userSession = await account.get();
//       const userId = userSession.$id;

//       // Fetch profile data from database
//       const userDoc = await databases.getDocument(
//         DATABASE_ID,
//         USER_COLLECTION_ID,
//         userId
//       );

//       // Set profile state from database
//       setProfile(prev => ({
//         ...prev,
//         ...userDoc,
//         nickname: userDoc.nickname || '',
//         username: userDoc.username || '',
//         bio: userDoc.bio || '',
//         // Add other fields as needed
//       }));

//       // Set profile image from database if available
//       if (userDoc.profileImageUrl) {
//         setProfileImage(userDoc.profileImageUrl);
//       }

//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//       // Fallback to localStorage if database fetch fails
//       const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
//       const savedProfileImage = localStorage.getItem('profileImage');
//       setProfile(prev => ({ ...prev, ...savedProfile }));
//       if (savedProfileImage) setProfileImage(savedProfileImage);
//     }
//   };

//   fetchUserProfile();
// }, []);


//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
//     const count = storedCart.reduce((total, item) => total + item.quantity, 0);
//     setCartCount(count);
//   }, []);


//   // fetching the order number 
//     useEffect(() => {
//     const fetchOrderCount = async () => {
//       try {
//         const user = await account.get();
//         const res = await databases.listDocuments(DB_ID, ORDERS_COLLECTION, [
//           Query.equal('sellerId', user.$id)
//         ]);
//         setOrderCount(res.total); // Appwrite returns total in pagination
//       } catch (err) {
//         console.error('Failed to fetch order count:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderCount();
//   }, []);


//   // Enhanced animations
//   const navbarVariants = {
//     initial: { y: -100, opacity: 0 },
//     animate: { 
//       y: 0, 
//       opacity: 1, 
//       transition: { 
//         duration: 0.6, 
//         ease: [0.16, 1, 0.3, 1] 
//       } 
//     },
//     scrolled: {
//       height: 60,
//       backgroundColor: darkMode ? "rgba(17, 24, 39, 0.8)" : "rgba(255, 255, 255, 0.8)",
//       boxShadow: darkMode ? "0 4px 12px rgba(0, 0, 0, 0.3)" : "0 4px 12px rgba(0, 0, 0, 0.1)",
//       transition: { 
//         duration: 0.4,
//         ease: [0.16, 1, 0.3, 1]
//       },
//     },
//     unscrolled: {
//       height: 80,
//       backgroundColor: darkMode ? "rgba(17, 24, 39, 0.2)" : "rgba(255, 255, 255, 0.2)",
//       boxShadow: "none",
//       transition: { 
//         duration: 0.4,
//         ease: [0.16, 1, 0.3, 1]
//       },
//     },
//   };


//   const menuVariants = {
//     open: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
//     closed: { x: '-100%', opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
//   };

//   const menuItemVariants = {
//     open: (i) => ({
//       opacity: 1,
//       x: 0,
//       transition: { 
//         delay: i * 0.05, 
//         duration: 0.3,
//         ease: [0.16, 1, 0.3, 1]
//       },
//     }),
//     closed: { 
//       opacity: 0, 
//       x: -20 
//     },
//   };

//   // const buttonVariants = {
//   //   hover: { 
//   //     scale: 1.05, 
//   //     backgroundColor: darkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.05)",
//   //     transition: { 
//   //       duration: 0.2,
//   //       ease: "easeOut"
//   //     } 
//   //   },
//   //   tap: { 
//   //     scale: 0.95,
//   //     transition: { 
//   //       duration: 0.1 
//   //     } 
//   //   },
//   // };

//   // const searchVariants = {
//   //   collapsed: { 
//   //     width: 40,
//   //     transition: { 
//   //       duration: 0.3,
//   //       ease: [0.16, 1, 0.3, 1]
//   //     } 
//   //   },
//   //   expanded: { 
//   //     width: 200,
//   //     transition: { 
//   //       duration: 0.3,
//   //       ease: [0.16, 1, 0.3, 1]
//   //     } 
//   //   },
//   // };

//   const bgImageVariants = {
//     enter: { opacity: 0 },
//     center: { opacity: 1 },
//     exit: { opacity: 0 }
//   };

//   return (
//     <div className="relative min-h-screen w-full overflow-x-hidden">
//       {/* Enhanced Dynamic Background with Smooth Transitions */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentImageIndex}
//             className="absolute inset-0 bg-cover bg-center"
//             style={{ 
//               backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
//               backgroundPosition: 'center',
//               backgroundSize: 'cover'
//             }}
//             variants={bgImageVariants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{ duration: 1.5, ease: "easeInOut" }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10"></div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Enhanced Fixed Navbar */}
//       <motion.nav
//   className={`fixed top-0 left-0 w-full z-[1000] backdrop-blur-md flex items-center ${darkMode ? 'bg-gray-900/95 text-gray-100' : 'bg-white/95 text-gray-900'} shadow-sm`}
//   initial="initial"
//   animate={isScrolled ? "scrolled" : ["animate", "unscrolled"]}
//   variants={navbarVariants}
// >
//   {/* Container with max-width for larger screens */}
//   <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
//     <div className="flex h-16 items-center justify-between">
//       {/* Logo Section - Improved spacing and responsiveness */}
//       <motion.div
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         className="flex items-center flex-shrink-0"
//       >
//         <Link
//           to="/"
//           className="flex flex-col items-center font-eagle hover:opacity-90 transition-opacity"
//         >
//           {/* Title - Better responsive sizing */}
//           <div className="text-xl sm:text-3xl font-bold tracking-wider leading-tight">
//             <span className="text-yellow-500 drop-shadow-sm">Painters'</span>
//             <span className={`ml-1 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Diary</span>
//           </div>
          
//           {/* Subtitle - Only shown on larger screens */}
//           <p className={`hidden md:block text-[16px] md:text-[21px]  ${darkMode ? 'text-red-300' : 'text-red-700'} font-cookie tracking-wide`}>
//             The Diary of Every Artist
//           </p>
        
//         </Link>
//       </motion.div>

//       {/* Right Side Controls - Improved spacing and responsiveness */}
//       <div className="flex items-center gap-2 sm:gap-4">
//         {/* Enhanced Search - Better mobile behavior */}
//         {/* <motion.div
//           ref={searchRef}
//           className="relative h-8 w-8 sm:h-9 sm:w-9"
//           initial={false}
//           animate={isSearchExpanded ? "expanded" : "collapsed"}
//           variants={searchVariants}
//         >
//           <motion.div
//             className={`absolute right-0 h-full ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md rounded-lg flex items-center overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
//             whileHover={{ backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)' }}
//           >
//             {isSearchExpanded && (
//               <motion.input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-full h-full px-2 bg-transparent placeholder-gray-400 dark:placeholder-gray-300 text-sm outline-none"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.1 }}
//                 autoFocus
//               />
//             )}
//             <motion.button
//               className={`p-1 ${isSearchExpanded ? 'pr-2' : 'px-2'}`}
//               onClick={() => setIsSearchExpanded(!isSearchExpanded)}
//               whileTap={{ scale: 0.9 }}
//               title="Search"
//             >
//               <FaSearch className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
//             </motion.button>
//           </motion.div>
//         </motion.div> */}

//         {/* Desktop Buttons - Better spacing and visibility */}
//         <div className="hidden md:flex items-center gap-2">
//           <Link to="/signup">
//             <motion.button
//               className={`px-3 py-1.5 ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} backdrop-blur-md rounded-lg flex items-center gap-2 text-sm font-medium border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//             >
//               <FaUserPlus className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
//               <span className={`text-[15px] font-Playfair ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Sign up</span>
//             </motion.button>
//           </Link>
//           <Link to="/account">
//             <motion.button
//               className={`px-3 py-1.5 ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} backdrop-blur-md rounded-lg flex items-center gap-2 text-sm font-medium border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//             >
//               <FaUser className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
//               <span className={`text-[15px] font-Playfair ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Profile</span>
//             </motion.button>
//           </Link>
//           <Link to="/journal">
//             <motion.button
//               className={`px-3 py-1.5 ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} backdrop-blur-md rounded-lg flex items-center gap-2 text-sm font-medium border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//             >
//               <MdBook className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
//               <span className={`text-[15px] font-Playfair ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>My Diary</span>
//             </motion.button>
//           </Link>
//         </div>
//         <div className="relative md:hidden">
//   <motion.button
//     onClick={() => setDropdownOpen(!dropdownOpen)}
//     className={`p-2 rounded-full border shadow-md backdrop-blur-md ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-300'}`}
//     whileTap={{ scale: 0.95 }}
//     title="Menu"
//   >
//     <FaUser className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
//   </motion.button>

//   {dropdownOpen && (
//     <motion.div
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.2 }}
//       className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg backdrop-blur-md z-20 p-2 flex flex-col gap-2
//         ${darkMode ? 'bg-gray-900/90 border border-gray-700' : 'bg-white/90 border border-gray-300'}`}
//     >
//       <Link to="/signup">
//         <button
//           className={`w-full text-left px-3 py-2 rounded-md font-medium text-sm transition-colors  font-Playfair
//             ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
//         >
//           <FaUserPlus className="inline mr-2" /> Sign Up
//         </button>
//       </Link>
//       <Link to="/account">
//         <button
//           className={`w-full text-left px-3 py-2 rounded-md font-medium text-sm transition-colors font-Playfair
//             ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
//         >
//           <FaUser className="inline mr-2" /> Profile
//         </button>
//       </Link>
//       <Link to="/Journal">
//         <button
//           className={`w-full text-left px-3 py-2 rounded-md font-medium text-sm transition-colors font-Playfair
//             ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
//         >
//           <MdBook className="inline mr-2" /> My Diary
//         </button>
//       </Link>
//     </motion.div>
//   )}
// </div>


//         {/* Menu Button - Improved visibility */}
//         <motion.button
//           className={`p-1.5 md:p-2 ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} backdrop-blur-md rounded-full lg:rounded-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}
//           onClick={() => setIsMenuOpen(true)}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           title="Menu"
//         >
//           <CiMenuFries className={`text-xl ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
//         </motion.button>
//       </div>
//     </div>
//   </div>
// </motion.nav>

//       {/* Enhanced Sliding Menu */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <>
//             {/* Improved Backdrop */}
//             <motion.div
//               className="fixed inset-0 bg-black/70 z-[998] backdrop-blur-sm"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               onClick={() => setIsMenuOpen(false)}
//             />
            
//             {/* Enhanced Menu Panel */}
//             <motion.div
//               ref={menuRef}
//               className="fixed top-0 left-0  w-80 sm:w-96 h-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 z-[9999] overflow-y-auto shadow-xl"
//               variants={menuVariants}
//               initial="closed"
//               animate="open"
//               exit="closed"
//             >
//               {/* Enhanced Profile Section */}
//               <div className="p-6 flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 bg-slate-700 dark:bg-gray-800 backdrop-blur-md">
//                 <div className="relative h-24 w-24 sm:h-28 sm:w-28 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full overflow-hidden flex items-center justify-center shadow-lg">
//                   {profileImage ? (
//                     <img 
//                       src={profileImage} 
//                       alt="Profile" 
//                       className="w-full h-full object-cover" 
//                     />
//                   ) : (
//                     <FaUser className="text-3xl text-white" />
//                   )}
//                   <div className="absolute inset-0 bg-black/20"></div>
//                 </div>
//                 <div className="flex-1">
//                   <h1 className="text-white dark:text-gray-200 font-playfair text-lg sm:text-xl">
//                     {profile.nickname}
//                   </h1>
//                   <p className="text-white dark:text-gray-300 font-Playfair text-sm">
//                     {profile.email}
//                   </p>
//                 </div>
//                 <motion.button
//                   className="absolute top-5 right-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
//                   onClick={() => setIsMenuOpen(false)}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <MdClose className="text-2xl" />
//                 </motion.button>
//               </div>

//               {/* Enhanced Menu Items */}
//               <div className="px-2 space-y-1">
//                 {Object.entries(routes).map(([name, { path, icon, color }], index) => (
//                   <motion.div
//                     key={name}
//                     custom={index}
//                     initial="closed"
//                     animate="open"
//                     variants={menuItemVariants}
//                   >
//                     <Link
//                       to={path}
//                       className={`flex items-center gap-2 px-4 py-3 text-[16px] font-medium font-Playfair rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-200/50'}`}
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       <span className={`text-xl ${color}`}>{icon}</span>
//                       <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>{name}</span>
//                     </Link>
//                   </motion.div>
//                 ))}
//               </div>            
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Enhanced Hero Section */}
      // <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-16">
      //   <motion.h1
      //     initial={{ y: 50, opacity: 0 }}
      //     animate={{ y: 0, opacity: 1 }}
      //     transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      //     className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight "
      //   >
      //     <p className="text-yellow-400 drop-shadow-lg font-Quicksand flex flex-row gap-2">Immerse <span className="text-yellow-50">Yourself</span>
      //     {/* <span className="font-Quicksand"> Yourself {''} </span> */}
      //     <span className=" font-Playfair text-white/90 drop-shadow-lg"> On Art</span></p> 
      //   </motion.h1>
        
      //   <motion.p
      //     initial={{ y: 50, opacity: 0 }}
      //     animate={{ y: 0, opacity: 1 }}
      //     transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      //     className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mb-8 leading-relaxed font-Newsreader text-center"
      //   >
      //     {/* Discover a world where colors dance and emotions take shape. Explore curated collections from artists worldwide. */}
          // <span className="md:hidden block">
          // Discover unique artwork from global artists. Connect, explore, and support creativity in one vibrant space.          </span>
          // <span className="hidden md:block">
          // Dive into a curated world of stunning art. Whether you're a creator or collector, find inspiration, connection, and exceptional pieces all in one place.          </span>

      //   </motion.p>
        
      //   <motion.div
      //     initial={{ y: 50, opacity: 0 }}
      //     animate={{ y: 0, opacity: 1 }}
      //     transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      //     className="flex flex-col sm:flex-row gap-4"
      //   >
      //     <Link to="/gallery">
      //       <motion.button
      //         className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold rounded-2xl shadow-lg text-sm sm:text-base flex items-center gap-2"
      //         whileHover={{ 
      //           scale: 1.05, 
      //           boxShadow: "0 0 20px rgba(255, 214, 0, 0.4)",
      //           transition: { duration: 0.3 }
      //         }}
      //         whileTap={{ scale: 0.95 }}
      //       >
      //         <FaImages />
      //         Explore Gallery
      //       </motion.button>
      //     </Link>
          
      //     <Link to="/Arteva/Artstore">
      //       <motion.button
      //         className="px-8 py-3 border-2 border-white hover:border-yellow-300 text-white hover:text-yellow-300 font-semibold rounded-full text-sm sm:text-base flex items-center gap-2 backdrop-blur-sm"
      //         whileHover={{ 
      //           scale: 1.05, 
      //           boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
      //           backgroundColor: "rgba(255, 255, 255, 0.1)",
      //           transition: { duration: 0.3 }
      //         }}
      //         whileTap={{ scale: 0.95 }}
      //       >
      //         <FaBullhorn />
      //         Commercial Art
      //       </motion.button>
      //     </Link>
      //   </motion.div>
      // </div>

//       {/* Enhanced Floating Action Buttons */}
//       <motion.div
//         className="absolute bottom-4 left-4 z-10 flex flex-row gap-4 safe-area-inset-bottom"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.8 }}
//       >
//         <motion.button
//           className={`p-1 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
//           whileHover={{ 
//             scale: 1.1,
//             backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)'
//           }}
//           whileTap={{ scale: 0.95 }}
//           onClick={toggleDarkMode}
//           title={darkMode ? "Light Mode" : "Dark Mode"}
//         >
//           {darkMode ? (
//             <FaSun className="text-xl text-yellow-400" />
//           ) : (
//             <FaMoon className="text-xl text-gray-700" />
//           )}
//         </motion.button>
        
//         <Link to="/community">
//           <motion.button
//             className={`p-1 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
//             whileHover={{ 
//               scale: 1.1,
//               backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)'
//             }}
//             whileTap={{ scale: 0.95 }}
//             title="Community"
//           >
//             <MdGroups3 className="text-xl text-indigo-500" />
//           </motion.button>
//         </Link>
        
//         <Link to="/premium">
//           <motion.button
//             className={`p-1 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
//             whileHover={{ 
//               scale: 1.1,
//               backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)'
//             }}
//             whileTap={{ scale: 0.95 }}
//             title="Premium"
//           >
//             <FaCrown className="text-xl text-blue-500" />
//           </motion.button>
//         </Link>
//         <Link to="settings/cart">
//         <motion.button
//         className={`p-1 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
//         whileHover={{ 
//           scale: 1.1,
//           backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)' }}
//         whileTap={{ scale: 0.95 }}
//         title="Cart"
//         >
//         <FaCartPlus className="text-xl text-blue-500" />
//         {/* <div className="px-1 text-sm bg-red-600 text-white rounded-full absolute top-[-10px] right-[-10px]">{cartItemCount}</div> */}
//         {cartCount > 0 && (
//           <span className="px-1 text-sm bg-red-600 text-white rounded-full absolute -top-2 -right-1 font-Playfair">
//             {cartCount}
//           </span>
//         )}
//         </motion.button>
//         </Link>
//         <Link to="/Settings/Notification">
//         <motion.button
//         className={`p-1 relative ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
//         whileHover={{ scale: 1.1,
//           backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)' }}
//         whileTap={{ scale: 0.95 }}
//         title="Cart"
//         >
//         <FaRegBell className="text-xl font-semibold text-blue-500" />
//         <div className="px-1 text-sm bg-red-600 text-white rounded-full absolute top-[-10px] right-[-10px]">0</div>
//         </motion.button>
//         </Link>
//         {/* </Link> */}

//         <Link to="/Settings/Order">
//         <motion.button
//         className={`p-1 relative ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
//         whileHover={{ scale: 1.1,
//           backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)' }}
//         whileTap={{ scale: 0.95 }}
//         title="Cart"
//         >
//         {/* < className="text-xl text-blue-500" /> */}
//         <CubeIcon className="text-xl text-blue-500" />
//         <div className="px-1 text-sm bg-red-600 text-white rounded-full absolute top-[-10px] right-[-10px]">{orderCount}</div>
//         </motion.button>
//         </Link>
//       </motion.div>
      
//     </div>
//   );
// };

// export default Header;



import { useState, useEffect, useRef, useContext, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHome, FaImages, FaHeart, FaCartPlus, FaSun, FaMoon, 
  FaHandsHelping, FaUser, FaUserPlus, FaRegBell, FaBullhorn, FaBars 
} from "react-icons/fa";
import { MdGroups3, MdClose, MdOutlineFeedback, MdBook, MdHistory, MdMenu, MdOutlineAccountCircle } from "react-icons/md";
import { IoMdHelpCircleOutline, IoMdMore, IoMdSettings } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { ImBlog } from "react-icons/im";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { databases, account, Query } from "../../appwriteConfig";
import { CubeIcon } from '@heroicons/react/24/outline';
import { FiMenu } from "react-icons/fi";

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
        icon: newMode ? <FaMoon className="text-blue-300" /> : <FaSun className="text-yellow-400" />,
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
  const backgroundImages = [
    'https://img.freepik.com/free-photo/warm-colors-vase-with-dark-flowers_23-2151843580.jpg',
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262',
    'https://img.freepik.com/free-photo/nature-tranquil-scene-silhouette-pine-tree-generative-ai_188544-12777.jpg',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
    'https://images.unsplash.com/photo-1531913764164-f85c52e6e654',
  ];

  const routes = {
    Home: { path: "/", icon: <FaHome />, color: "text-blue-500" },
    Gallery: { path: "/gallery", icon: <FaImages />, color: "text-purple-500" },
    Category: { path: "/category", icon: <BiCategoryAlt />, color: "text-green-500" },
    Community: { path: "/community", icon: <MdGroups3 />, color: "text-indigo-500" },
    Blog: { path: "/blog", icon: <ImBlog />, color: "text-red-500" },
    FAQs: { path: "/faqs", icon: <IoMdHelpCircleOutline />, color: "text-orange-500" },
    Help: { path: "/Resources/Help", icon: <FaHandsHelping />, color: "text-teal-500" },
    Feedback: { path: "/Resources/feedback", icon: <MdOutlineFeedback />, color: "text-amber-500" },
    Favorites: { path: "/Favourite", icon: <FaHeart />, color: "text-rose-500" },
    History: { path: "/history", icon: <MdHistory />, color: "text-yellow-500" },
    Profile: { path: "/account", icon: <FaUser />, color: "text-pink-500" },
    'My Diary': { path: "/journal", icon: <MdBook />, color: "text-yellow-500" },
    'Sign Up': { path: "/signup", icon: <FaUserPlus />, color: "text-pink-500" },
    'Art Store': { path: "/Arteva/Artstore", icon: <FaBullhorn />, color: "text-red-500" },
  };

  const primaryRoutes = ['Gallery', 'Profile', 'My Diary', 'Sign Up', 'Community'];
  const userRoutes = ['Cart', 'Notification', 'Orders'];
  const otherRoutes = ['Home', 'Category', 'Blog', 'FAQs', 'Help', 'Feedback', 'Favorites', 'History'];

  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profile, setProfile] = useState({ username: '', email: '', profileImage: null });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const menuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Background image transition
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
          username: userDoc.username || 'Guest',
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
  initial: { y: -100, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
  scrolled: {
    // height: 64,
    backgroundColor: darkMode ? "rgba(17, 24, 39, 0.6)" : "rgba(255, 255, 255, 0.4)", // <—
    boxShadow: darkMode
      ? "0 4px 12px rgba(0, 0, 0, 0.3)"
      : "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  unscrolled: {
    // height: 80,
    backgroundColor: darkMode ? "rgba(17, 24, 39, 0.4)" : "rgba(255, 255, 255, 0.2)", // <—
    boxShadow: "none",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};


  const menuItemVariants = {
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    }),
    closed: { opacity: 0, y: -10 },
  };

  const bgImageVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Calculate total notifications count for mobile
  const totalNotifications = cartCount + orderCount + notificationCount;

  return (
    <div className="relative max-h-screen w-full">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
            variants={bgImageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 w-full z-[1000] py-2 backdrop-blur-lg ${darkMode ? 'bg-gray-900/95 text-gray-100' : 'bg-white/95 text-gray-900'}`}
        initial="initial"
        animate={isScrolled ? "scrolled" : ["animate", "unscrolled"]}
        variants={navbarVariants}
      >
        <div className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center flex-shrink-0"
            >
              <Link to="/" className="flex flex-col items-center font-eagle">
                <div className="text-xl sm:text-2xl font-bold tracking-wider">
                  <span className="text-yellow-500">Painters'</span>
                  <span className={darkMode ? 'text-gray-100' : 'text-gray-800'}>Diary</span>
                </div>
                {/* <p className={`hidden md:block text-sm ${darkMode ? 'text-red-300' : 'text-red-700'} font-cookie`}>
                  The Diary of Every Artist
                </p> */}
              </Link>
            </motion.div>

            {/* Center Buttons (Large Screens) */}
            <div className="hidden lg:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
              {primaryRoutes.map((name, index) => {
                if (name === 'Sign Up' && isLoggedIn) return null;
                if (name === 'My Diary' && !isLoggedIn) return null;
                return (

<Link key={name} to={routes[name].path}>
  <motion.button
    className={`
      relative group px-3 py-1.5 text-sm font-medium
      ${darkMode ? 'text-gray-100' : 'text-gray-300'}
      transition-colors duration-300 font-semibold 
    `}
    whileTap={{ scale: 0.97 }}
    custom={index}
    variants={menuItemVariants}
    initial="closed"
    animate="open"
  >
    {name}
    <span
      className={`
        absolute bottom-0 left-0 h-0.5 w-0
        ${darkMode ? 'bg-gray-100' : 'bg-gray-800'}
        group-hover:w-full
        transition-all duration-500 ease-in-out origin-left
      `}
    />
  </motion.button>
</Link>


                );
              })}
            </div>
 
            {/* Right Side Controls */}
            <div className="flex items-center gap-2 sm:gap-3" ref={menuRef}>
              {/* Desktop Right Buttons */}
              <div className="hidden lg:flex items-center gap-2">
                <motion.button
                  // className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : ' bg-gray-300 hover:bg-white/90'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
                   className="  border p-2 rounded-lg relative"                    

                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDarkMode}
                  title={darkMode ? "Light Mode" : "Dark Mode"}
                >
                  {darkMode ? (
                    <FaSun className="text-lg text-yellow-400" />
                  ) : (
                    <FaMoon className="text-lg text-blue-600" />
                  )}
                </motion.button>
                
                <Link to="/settings/cart">
                  <motion.button
                    // className={`p-2 relative ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
                   className="  border p-2 rounded-lg relative"                    

                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaCartPlus className="text-lg text-blue-500" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </motion.button>
                </Link>
                
                <Link to="/Settings/Notification">
                  <motion.button
                  // className={`p-2 relative ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
                    className="  border p-2 rounded-lg relative"                    

                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaRegBell className="text-lg text-blue-500" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </motion.button>
                </Link>
                
                <Link to="/Settings/Order">
                  <motion.button
                    // className={`p-2 relative ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
                    className="  border p-2 rounded-lg relative"                    

                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CubeIcon className="text-lg text-blue-500" />
                    {orderCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {orderCount}
                      </span>
                    )}
                  </motion.button>
                </Link>
                
                <div className="relative">
                  <motion.button
                    // className={`p-2 rounded-full ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
                   className="  border p-2 rounded-lg"                    

                    onClick={() => toggleDropdown('profile')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {profile.profileImage ? (
                      <img
                        src={profile.profileImage}
                        alt="Profile"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <FaUser className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-200'}`} />
                    )}
                  </motion.button>
                  
                  <AnimatePresence>
                    {activeDropdown === 'profile' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/60 border-gray-200'} border p-2 z-20 backdrop-blur-lg`}
                      >
                        <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                            {profile.username}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {profile.email}
                          </p>
                        </div>
                        {otherRoutes.map((name, index) => (
                          <Link
                            key={name}
                            to={routes[name].path}
                            className={`block px-3 py-2 text-sm font-medium rounded-lg ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'} transition-colors duration-200`}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="flex items-center gap-2">
                              <span className={routes[name].color}>{routes[name].icon}</span>
                              {name}
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Mobile Dropdowns */}
              <div className="flex lg:hidden items-center gap-2">
                {/* Primary Menu Dropdown */}
                <div className="relative">
                  <motion.button
                   // className={`p-2 ${darkMode ? 'bg-gray-800/90 hover:bg-gray-700/90' : 'bg-white/60 hover:bg-white/90'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
                                      className="  border p-1 rounded-lg"                    

                   onClick={() => toggleDropdown('primary')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MdOutlineAccountCircle className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-200'}`} />
                  </motion.button>
                  
                  <AnimatePresence>
                    {activeDropdown === 'primary' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900/70 border-gray-700' : 'bg-white/70 border-gray-200'} border p-2 z-20 backdrop-blur-lg`}
                      >
                        <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-2">
                            {profile.profileImage ? (
                              <img
                                src={profile.profileImage}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <FaUser className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
                            )}
                            <div>
                              <p className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                {profile.username}
                              </p>
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {profile.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        {primaryRoutes.map((name, index) => {
                          if (name === 'Sign Up' && isLoggedIn) return null;
                          if (name === 'My Diary' && !isLoggedIn) return null;
                          return (
                            <motion.div
                              key={name}
                              custom={index}
                              variants={menuItemVariants}
                              initial="closed"
                              animate="open"
                            >
                              <Link
                                to={routes[name].path}
                                className={`block px-3 py-2 text-sm font-medium rounded-lg ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'} transition-colors duration-200`}
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="flex items-center gap-2">
                                  <span className={routes[name].color}>{routes[name].icon}</span>
                                  {name}
                                </div>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* User Actions Dropdown */}
                <div className="relative">
                  <motion.button
                    // className={`p-2 ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 relative`}
                    className="  border p-1 rounded-lg"                    

                    onClick={() => toggleDropdown('user')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IoMdSettings className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-200'}`} />
                    {totalNotifications > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {totalNotifications}
                      </span>
                    )}
                  </motion.button>
                  
                  <AnimatePresence>
                    {activeDropdown === 'user' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900/90 border-gray-700' : 'bg-white/70 border-gray-200'} border p-2 z-20 backdrop-blur-lg`}
                      >
                        <Link
                          to="/settings/cart"
                          className={`block px-3 py-2 text-sm font-medium rounded-lg ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'} transition-colors duration-200 relative`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FaCartPlus className="text-blue-500" />
                              Cart
                            </div>
                            {cartCount > 0 && (
                              <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1">
                                {cartCount}
                              </span>
                            )}
                          </div>
                        </Link>
                        
                        <Link
                          to="/Settings/Notification"
                          className={`block px-3 py-2 text-sm font-medium rounded-lg ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'} transition-colors duration-200 relative`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FaRegBell className="text-blue-500" />
                              Notification
                            </div>
                            {notificationCount > 0 && (
                              <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1">
                                {notificationCount}
                              </span>
                            )}
                          </div>
                        </Link>
                        
                        <Link
                          to="/Settings/Order"
                          className={`block px-3 py-2 text-sm font-medium rounded-lg ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'} transition-colors duration-200 relative`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CubeIcon className="text-blue-500 w-4 h-4" />
                              Orders
                            </div>
                            {orderCount > 0 && (
                              <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1">
                                {orderCount}
                              </span>
                            )}
                          </div>
                        </Link>
                        
                        <motion.button
                          className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'} transition-colors duration-200`}
                          onClick={() => {
                            toggleDarkMode();
                            setActiveDropdown(null);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            {darkMode ? (
                              <FaSun className="text-yellow-400" />
                            ) : (
                              <FaMoon className="text-gray-700" />
                            )}
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                          </div>
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* More Options Dropdown */}
                <div className="relative">
                  <motion.button
                    // className={`p-2 ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
                   className="  border p-1 rounded-lg"                    

                    onClick={() => toggleDropdown('more')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiMenu className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-200'}`} />
                  </motion.button>
                  
                  <AnimatePresence>
                    {activeDropdown === 'more' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900/90 border-gray-700' : 'bg-white/70 border-gray-200'} border p-2 z-20 backdrop-blur-lg`}
                      >
                        {otherRoutes.map((name, index) => (
                          <motion.div
                            key={name}
                            custom={index}
                            variants={menuItemVariants}
                            initial="closed"
                            animate="open"
                          >
                            <Link
                              to={routes[name].path}
                              className={`block px-3 py-2 text-sm font-medium rounded-lg ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'} transition-colors duration-200`}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="flex items-center gap-2">
                                <span className={routes[name].color}>{routes[name].icon}</span>
                                {name}
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-16">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Immerse Yourself in <span className="text-yellow-400">Art</span>
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl mb-8"
        >
           <span className="md:hidden block">
          Discover unique artwork from global artists. Connect, explore, and support creativity in one vibrant space.          </span>
          <span className="hidden md:block">
          Dive into a curated world of stunning art. Whether you're a creator or collector, find inspiration, connection, and exceptional pieces all in one place.          </span>
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-row gap-4"
        >
          <Link to="/gallery">
            <motion.button
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg text-sm sm:text-base transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Gallery
            </motion.button>
          </Link>
          <Link to="/Arteva/Artstore">
            <motion.button
              className="px-6 py-3 border-2 border-white hover:border-yellow-300 hover:text-yellow-300 text-white font-medium rounded-lg text-sm sm:text-base transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Artstore
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;