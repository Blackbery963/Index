// import { useState, useEffect, useRef, useContext, createContext } from "react";
// import lightBackgroundImage from "./Header-Images/20005481_6218374.jpg";
// import darkBackgroundImage from "./Header-Images/pexels-eberhardgross-2098428.jpg";
// import { FaUserPlus, FaUser, FaImages, FaList, FaBlog, FaQuestionCircle, FaHandsHelping, FaComment, FaCartPlus, FaSun, FaMoon } from "react-icons/fa";
// import { FaHome, FaHeart,  FaUsers, FaCrown, FaCog } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { MdBook, MdGroups3, MdClose, MdHistory, MdOutlineFeedback } from "react-icons/md";
// import { IoMdHelpCircleOutline, IoMdNotifications, IoMdSearch } from "react-icons/io";
// import {ImBlog} from "react-icons/im"
// import Typewriter from "react-typewriter-effect";
// import { CiMenuFries } from "react-icons/ci";
// import { motion } from "framer-motion";
// import 'react-toastify';
// import { toast } from "react-hot-toast";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { BiCategoryAlt } from "react-icons/bi";

// export const DarkModeContext = createContext();

// export const DarkModeProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(() => {
//     const savedMode = localStorage.getItem('darkMode');
//     return savedMode !== null ? savedMode === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
//   });

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//     localStorage.setItem('darkMode', darkMode);
//   }, [darkMode]);

//   const toggleDarkMode = () => {
//     setDarkMode((prev) => {
//       const newMode = !prev;
//       toast.success(`Switched to ${newMode ? 'Dark' : 'Light'} Mode`, {
//         position: 'top-right',
//         autoClose: 2000,
//         hideProgressBar: true,
//         style: { background: newMode ? '#1F2937' : '#F9FAFB', color: newMode ? '#F9FAFB' : '#1F2937' },
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

// function Header() {
//   const context = useContext(DarkModeContext);
//   if (!context) {
//     console.error("Header must be used within a DarkModeProvider");
//     return (
//       <div className="w-full h-[12vh] bg-gray-100 dark:bg-gray-900 flex justify-between items-center px-4 md:px-8 text-red-600 dark:text-red-400">
//         <div>Error: Dark Mode Context is missing. Please contact support.</div>
//         <Link to="/Signup">
//           <button className="flex items-center gap-1 font-playfair font-semibold px-2 py-1 bg-white dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200">
//             <FaUserPlus />
//             <span className="hidden md:block">Sign up</span>
//           </button>
//         </Link>
//       </div>
//     );
//   }
//   const { darkMode, toggleDarkMode } = context;

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [query, setQuery] = useState("");
//   const [data, setData] = useState([]);
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [open, setOpen] = useState(false);

//   const toogleDropdown = () => {
//     setOpen(!open);
//   };

//   useEffect(() => {
//     setIsLoading(true);
//     fetch("/Dataset.json")
//       .then((res) => res.json())
//       .then((jsonData) => {
//         setData(jsonData);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error loading data:", error);
//         setError("Failed to load data. Please try again later.");
//         setIsLoading(false);
//       });
//   }, []);

//   const handleSearch = (searchQuery) => {
//     if (!searchQuery.trim()) {
//       setFilteredResults([]);
//       return;
//     }

//     const results = data.filter(
//       (item) =>
//         item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.description.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     setFilteredResults(results);
//   };

  // const [profile, setProfile] = useState({
  //   username: '',
  //   email: '',
  // });

  // useEffect(() => {
  //   const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
  //   const savedProfileImage = localStorage.getItem('profileImage');
  //   setProfile((prev) => ({
  //     ...prev,
  //     ...savedProfile
  //   }));
  //   if (savedProfileImage) {
  //     setProfileImage(savedProfileImage);
  //   }
  // }, []);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const backgroundImg = {
//     backgroundImage: `url(${darkMode ? darkBackgroundImage : lightBackgroundImage})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     backgroundAttachment: "fixed",
//   };

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
//     History:<MdHistory/>,
//     Community: <FaUsers />,
//     Blog: <ImBlog />,
//     FAQs: <IoMdHelpCircleOutline />,
//     Help: <FaHandsHelping />,
//     Feedback: <MdOutlineFeedback />,
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const menuVariants = {
//     open: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
//     closed: { x: '-100%', opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
//   };
//   const buttonVariants = {
//     hover: { scale: 1.1, transition: { duration: 0.3 } },
//     tap: { scale: 0.95 },
//   };

//   const bottomSectionStyle = `flex items-center justify-center gap-1 font-playfair text-slate-900 dark:text-gray-200 md:px-4 px-2 md:py-2 py-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg md:rounded-2xl rounded-lg font-semibold hover:border hover:border-sky-700 dark:hover:border-sky-400 hover:text-sky-700 dark:hover:text-sky-400 hover:bg-white/80 dark:hover:bg-gray-700/80`;

//   return (
//     <div className=" flex flex-col justify-between pb-4 overflow-y-auto min-h-screen w-screen" style={backgroundImg}>
//       <div className="w-full h-[12vh] flex justify-between items-center px-4 md:px-8">
//         <div
//           className="w-auto h-auto md:p-2 p-1 flex items-center justify-center bg-green-900 dark:bg-green-700 rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-all cursor-pointer hover:rotate-180 duration-300"
//           onClick={toggleMenu}
//         >
//           <CiMenuFries className="text-lg md:text-xl block text-white dark:text-gray-200" />
//         </div>

//         {/* Improved Title Section */}
//         <div className="flex-1 text-center flex flex-col items-center lg:ml-[13%]">
//           <Typewriter
//             textStyle={{
//               fontFamily: "Eagle Lake",
//               fontSize: "clamp(1.05rem, 2.5vw, 2.5rem)",
//               fontWeight: "500",
//               color: darkMode ? "#f87171" : "#c83e4d", // Adjusted for dark mode
//             }}
//             startDelay={100}
//             cursorColor="transparent"
//             multiText={["Painters' Diary"]}
//             typeSpeed={150}
//           />
//           <Typewriter
//             textStyle={{
//               fontFamily: "Cookie",
//               fontSize: "clamp(0.9rem, 1.5vw, 1.5rem)",
//               color: darkMode ? "#f9a8d4" : "#D91656", // Adjusted for dark mode
//               marginTop: "-0.4rem",
//             }}
//             startDelay={2400}
//             cursorColor="transparent"
//             multiText={["The Dairy of Every Artist"]}
//             typeSpeed={150}
//           />
//         </div>

//         {/* Sliding menu bar */}
//         <motion.div
//   className="fixed top-0 left-0 w-80 sm:w-96 h-full bg-white dark:bg-gray-900 shadow-2xl z-[9999] overflow-y-auto"
//   variants={menuVariants}
//   initial="closed"
//   animate={isMenuOpen ? 'open' : 'closed'}
// >
//   {/* Profile section - updated with dark mode classes */}
//   <div className="h-48 bg-slate-700 dark:bg-gray-800 p-4 flex items-center justify-between">
//     <div className="h-24 w-24 sm:h-28 sm:w-28 bg-white dark:bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
//       {profileImage ? (
//         <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
//       ) : (
//         <FaUser className="text-4xl text-gray-400 dark:text-gray-300" />
//       )}
//     </div>
//     <div className="flex-1 ml-4">
//       <h1 className="text-white dark:text-gray-200 font-playfair text-lg sm:text-xl">{profile.username || 'Username'}</h1>
//       <p className="text-white dark:text-gray-300 font-Playfair text-sm">{profile.email || 'xyz123@email.com'}</p>
//       <p className="text-white dark:text-gray-300 font-newsreader text-sm">Followers: 122</p>
//     </div>
//     <motion.button
//       className="absolute top-4 right-4 text-white dark:text-gray-200 text-xl font-Playfair"
//       onClick={() => setIsMenuOpen(false)}
//       variants={buttonVariants}
//       whileHover="hover"
//       whileTap="tap"
//     >
//       <MdClose />
//     </motion.button>
//   </div>
  
//   {/* Menu items section - updated with dark mode classes */}
//   <div className="p-4 bg-gray-100 dark:bg-gray-950 h-[calc(100%-12rem)]">
//     {Object.keys(routes).map((item) => (
//       <Link
//         to={routes[item]}
//         key={item}
//         className="flex items-center gap-3 px-4 py-3 text-gray-800 dark:text-gray-200 font-newsreader text-base hover:bg-slate-200 dark:hover:bg-gray-800 rounded-md font-Playfair"
//         onClick={() => setIsMenuOpen(false)}
//       >
//         {routeIcons[item]}
//         <span>{item}</span>
//       </Link>
//     ))}
//   </div>
// </motion.div>

//         <div className="flex gap-4 text-sm h-[4vh] items-center">
//           <Link to="/Signup">
//             <button className="flex items-center justify-center gap-1 font-playfair font-semibold md:px-4 px-2 md:py-2 py-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg md:rounded-2xl rounded-lg hover:border hover:border-green-600 dark:hover:border-green-400 hover:text-green-700 dark:hover:text-green-400 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-gray-200">
//               <FaUserPlus className="" />
//               <span className="hidden md:block">Sign up</span>
//             </button>
//           </Link>
//           <Link to="/Account">
//             <button className="flex items-center justify-center gap-1 font-playfair font-semibold md:px-4 px-2 md:py-2 py-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg md:rounded-2xl rounded-lg hover:border hover:border-green-600 dark:hover:border-green-400 hover:text-green-900 dark:hover:text-green-400 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-gray-200">
//               <FaUser className="" />
//               <span className="hidden md:block">My Profile</span>
//             </button>
//           </Link>
//           <Link to="/Journal">
//             <button className="flex items-center justify-center gap-1 font-playfair font-semibold md:px-4 px-2 md:py-2 py-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg md:rounded-2xl rounded-lg hover:border hover:border-green-600 dark:hover:border-green-400 hover:text-green-900 dark:hover:text-green-400 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-gray-200">
//               <MdBook className="" />
//               <span className="hidden md:block">My Diary</span>
//             </button>
//           </Link>
//         </div>
//       </div>

//       <div className="h-auto lg:w-[40%] sm:w-[80%] w-[90%] px-4 py-6 mx-auto backdrop-blur-md border hover:blur-none border-gray-600 dark:border-gray-400 rounded-lg hover:shadow-lg hover:shadow-slate-900 dark:hover:shadow-gray-700 hover:transition duration-500 text-center block animate-fadeIn">
//         <h1 className="font-Tapestary text-red-700 dark:text-red-400 text-2xl md:text-3xl lg:text-4xl font-bold animate-slideInUp">
//           IMMERSE YOURSELF IN ART
//         </h1>
//         <p className="font-markazi text-base md:text-lg lg:text-2xl font-semibold text-cyan-900 dark:text-cyan-300 mt-4 lg:px-12 px-4 leading-relaxed animate-slideInUp delay-150">
          // <span className="md:hidden block">
          //   Discover a curated collection of exceptional art from talented artists worldwide. Whether you're an artist or a collector, our platform connects creators and enthusiasts for browsing, buying, and exploring art.
          // </span>
          // <span className="hidden md:block">
          //   Explore a curated collection of exceptional paintings from talented artists worldwide. Our website is designed to bring art enthusiasts and creators together, providing a seamless experience for browsing, purchasing, and learning about art. Whether you're an artist seeking exposure or a collector looking for the perfect piece, our platform offers something special for everyone.
          // </span>
//         </p>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSearch(query);
//           }}
//           className="mt-6 flex items-center md:h-10 h-8 w-full md:w-[80%] mx-auto md:rounded-full rounded-lg bg-[#ffffff57] dark:bg-[#1f293757] backdrop-blur-md shadow-md overflow-hidden"
//         >
//           <input
//             type="search"
//             list="search"
//             placeholder="Explore The Gallery of Dreams..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="flex-grow h-full px-4 text-[12px] sm:text-[16px] border-none outline-none bg-transparent font-playfair text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
//           />
//           <datalist id="search">
//             <option value="helllo"></option>
//             <option value="he"></option>
//             <option value="hell"></option>
//             <option value="hello"></option>
//             <option value="lllo"></option>
//             <option value="o"></option>
//             <option value="helllo"></option>
//           </datalist>
//           <div className="h-[80%] w-[2px] bg-slate-800 dark:bg-gray-400 py-1"></div>
//           <button type="submit" className="p-3" aria-label="Search" onClick={() => handleSearch(query)}>
//             <IoMdSearch className="text-[20px] text-gray-800 dark:text-gray-200"/>
//           </button>
//         </form>

//         {isLoading && <p className="text-gray-600 dark:text-gray-400 mt-4">Loading...</p>}
//         {error && <p className="text-red-600 dark:text-red-400 mt-4">{error}</p>}
//         {!isLoading && !error && filteredResults.length === 0 && query && (
//           <p className="text-gray-600 dark:text-gray-400 mt-4">No results found for "{query}"</p>
//         )}
//         {!isLoading && !error && filteredResults.length > 0 && (
//           <div className="mt-4 w-full md:w-[80%] mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Search Results:</h2>
//             {filteredResults.map((item) => (
//               <div key={item.id} className="border-b py-2 border-gray-300 dark:border-gray-600">
//                 <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
//                 <p className="text-sm text-gray-700 dark:text-gray-300">By {item.artist}</p>
//                 <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="w-full flex justify-between items-center px-2 md:px-8 text-sm">
//         <div className="flex md:gap-8 gap-3">
//           <button className={bottomSectionStyle}>
//             <FaHome className="" />
//             <span className="hidden md:block">Home</span>
//           </button>
//           <Link to="/Favourite">
//             <button className={bottomSectionStyle}>
//               <FaHeart className="" />
//               <span className="hidden md:block">Favourite</span>
//             </button>
//           </Link>
//           <Link to="/cart">
//             <button className={bottomSectionStyle}>
//               <FaCartPlus/>
//               <span className="hidden md:block">Cart</span>
//             </button>
//           </Link>
//         </div>
//         <div className="flex md:gap-4 gap-3">
//           <Link to="/Community">
//             <button className={bottomSectionStyle}>
//               <MdGroups3 className="" />
//               <span className="hidden md:block">Communities</span>
//             </button>
//           </Link>
//           <button className={bottomSectionStyle}>
//             <FaCrown className="" />
//             <span className="hidden md:block">Premium</span>
//           </button>
//           <button className={bottomSectionStyle} onClick={toogleDropdown}>
//             <FaCog/>
//             <span className="hidden md:block">Settings</span>
//           </button>

//           {open && (
//             <ul className="absolute top-full right-6 mt-2 w-40 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-10 px-2">
//               <li
//                 onClick={() => {
//                   toggleDarkMode();
//                   setOpen(false);
//                 }}
//                 className="px-4 py-2 text-[16px] font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between text-gray-800 dark:text-gray-200 font-playfair rounded-md"
//               >
//                 <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
//                 {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700 dark:text-gray-300" />}
//               </li>
//               <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-100 cursor-pointer text-[16px] font-semibold font-Playfair rounded-md text-gray-800 flex items-center justify-center gap-2">
//                <span>Notification</span>
//                <IoMdNotifications className=" text-xl"/>
//               </li>
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // export default Header;


import { useState, useEffect, useRef, useContext, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUserPlus, FaUser, FaHeart, FaCartPlus, FaSun, FaMoon, FaHome, 
  FaImages, FaHandsHelping, FaCrown, FaSearch,FaBell, FaBullhorn
} from "react-icons/fa";
import { MdGroups3, MdClose, MdOutlineFeedback, MdBook, MdHistory } from "react-icons/md";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { ImBlog } from "react-icons/im";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";


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

const Header = () => {
  const backgroundImages = [
    'https://img.freepik.com/free-photo/warm-colors-vase-with-dark-flowers_23-2151843580.jpg?uid=R164504650&ga=GA1.1.955884625.1725872001&semt=ais_hybrid&w=740',
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://img.freepik.com/free-photo/nature-tranquil-scene-silhouette-pine-tree-generative-ai_188544-12777.jpg?uid=R164504650&ga=GA1.1.955884625.1725872001&semt=ais_hybrid&w=740',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  ];

  const routes = {
    Home: { path: "/", icon: <FaHome />, color: "text-blue-500" },
    Gallery: { path: "/gallery", icon: <FaImages />, color: "text-purple-500" },
    Category: { path: "/category", icon: <BiCategoryAlt />, color: "text-green-500" },
    "My Account": { path: "/account", icon: <FaUser />, color: "text-pink-500" },
    History: { path: "/history", icon: <MdHistory />, color: "text-yellow-500" },
    Community: { path: "/community", icon: <MdGroups3 />, color: "text-indigo-500" },
    Blog: { path: "/blog", icon: <ImBlog />, color: "text-red-500" },
    FAQs: { path: "/faqs", icon: <IoMdHelpCircleOutline />, color: "text-orange-500" },
    Help: { path: "/Resources/Help", icon: <FaHandsHelping />, color: "text-teal-500" },
    Feedback: { path: "/Resources/feedback", icon: <MdOutlineFeedback />, color: "text-amber-500" },
    Favorites: { path: "/Favourite", icon: <FaHeart />, color: "text-rose-500" },
  };

  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const [profileImage, setProfileImage] = useState(null);

  // Enhanced background transition effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Increased duration for better viewing
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  //For profile Images and the emails 
  const [profile, setProfile] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    const savedProfileImage = localStorage.getItem('profileImage');
    setProfile((prev) => ({
      ...prev,
      ...savedProfile
    }));
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
  }, []);

  // Enhanced animations
  const navbarVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
    scrolled: {
      height: 60,
      backgroundColor: darkMode ? "rgba(17, 24, 39, 0.8)" : "rgba(255, 255, 255, 0.8)",
      boxShadow: darkMode ? "0 4px 12px rgba(0, 0, 0, 0.3)" : "0 4px 12px rgba(0, 0, 0, 0.1)",
      transition: { 
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      },
    },
    unscrolled: {
      height: 80,
      backgroundColor: darkMode ? "rgba(17, 24, 39, 0.2)" : "rgba(255, 255, 255, 0.2)",
      boxShadow: "none",
      transition: { 
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      },
    },
  };


  const menuVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
    closed: { x: '-100%', opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  const menuItemVariants = {
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: i * 0.05, 
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      },
    }),
    closed: { 
      opacity: 0, 
      x: -20 
    },
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      backgroundColor: darkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.05)",
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      } 
    },
    tap: { 
      scale: 0.95,
      transition: { 
        duration: 0.1 
      } 
    },
  };

  const searchVariants = {
    collapsed: { 
      width: 40,
      transition: { 
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      } 
    },
    expanded: { 
      width: 200,
      transition: { 
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      } 
    },
  };

  const bgImageVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Enhanced Dynamic Background with Smooth Transitions */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
            variants={bgImageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced Fixed Navbar */}
      <motion.nav
  className={`fixed top-0 left-0 w-full z-[1000] backdrop-blur-md flex items-center ${darkMode ? 'bg-gray-900/95 text-gray-100' : 'bg-white/95 text-gray-900'} shadow-sm`}
  initial="initial"
  animate={isScrolled ? "scrolled" : ["animate", "unscrolled"]}
  variants={navbarVariants}
>
  {/* Container with max-width for larger screens */}
  <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      {/* Logo Section - Improved spacing and responsiveness */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center flex-shrink-0"
      >
        <Link
          to="/"
          className="flex flex-col items-center font-eagle hover:opacity-90 transition-opacity"
        >
          {/* Title - Better responsive sizing */}
          <div className="text-xl sm:text-3xl font-bold tracking-wider leading-tight">
            <span className="text-yellow-500 drop-shadow-sm">Painters'</span>
            <span className={`ml-1 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Diary</span>
          </div>
          
          {/* Subtitle - Only shown on larger screens */}
          <p className={`hidden md:block text-[16px] md:text-[21px]  ${darkMode ? 'text-red-300' : 'text-red-700'} font-cookie tracking-wide`}>
            The Diary of Every Artist
          </p>
        
        </Link>
      </motion.div>

      {/* Right Side Controls - Improved spacing and responsiveness */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Enhanced Search - Better mobile behavior */}
        <motion.div
          ref={searchRef}
          className="relative h-8 w-8 sm:h-9 sm:w-9"
          initial={false}
          animate={isSearchExpanded ? "expanded" : "collapsed"}
          variants={searchVariants}
        >
          <motion.div
            className={`absolute right-0 h-full ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md rounded-lg flex items-center overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            whileHover={{ backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)' }}
          >
            {isSearchExpanded && (
              <motion.input
                type="text"
                placeholder="Search..."
                className="w-full h-full px-2 bg-transparent placeholder-gray-400 dark:placeholder-gray-300 text-sm outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                autoFocus
              />
            )}
            <motion.button
              className={`p-1 ${isSearchExpanded ? 'pr-2' : 'px-2'}`}
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              whileTap={{ scale: 0.9 }}
              title="Search"
            >
              <FaSearch className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Desktop Buttons - Better spacing and visibility */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/signup">
            <motion.button
              className={`px-3 py-1.5 ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} backdrop-blur-md rounded-lg flex items-center gap-2 text-sm font-medium border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaUserPlus className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
              <span className={`text-[15px] font-Playfair ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Sign up</span>
            </motion.button>
          </Link>
          <Link to="/account">
            <motion.button
              className={`px-3 py-1.5 ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} backdrop-blur-md rounded-lg flex items-center gap-2 text-sm font-medium border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaUser className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
              <span className={`text-[15px] font-Playfair ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Profile</span>
            </motion.button>
          </Link>
          <Link to="/journal">
            <motion.button
              className={`px-3 py-1.5 ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} backdrop-blur-md rounded-lg flex items-center gap-2 text-sm font-medium border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <MdBook className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
              <span className={`text-[15px] font-Playfair ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>My Diary</span>
            </motion.button>
          </Link>
        </div>
        <div className="relative md:hidden">
  <motion.button
    onClick={() => setDropdownOpen(!dropdownOpen)}
    className={`p-2 rounded-full border shadow-md backdrop-blur-md ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-300'}`}
    whileTap={{ scale: 0.95 }}
    title="Menu"
  >
    <FaUser className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
  </motion.button>

  {dropdownOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg backdrop-blur-md z-20 p-2 flex flex-col gap-2
        ${darkMode ? 'bg-gray-900/90 border border-gray-700' : 'bg-white/90 border border-gray-300'}`}
    >
      <Link to="/signup">
        <button
          className={`w-full text-left px-3 py-2 rounded-md font-medium text-sm transition-colors  font-Playfair
            ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
        >
          <FaUserPlus className="inline mr-2" /> Sign Up
        </button>
      </Link>
      <Link to="/account">
        <button
          className={`w-full text-left px-3 py-2 rounded-md font-medium text-sm transition-colors font-Playfair
            ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
        >
          <FaUser className="inline mr-2" /> Profile
        </button>
      </Link>
      <Link to="/Journal">
        <button
          className={`w-full text-left px-3 py-2 rounded-md font-medium text-sm transition-colors font-Playfair
            ${darkMode ? 'text-gray-100 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
        >
          <MdBook className="inline mr-2" /> My Diary
        </button>
      </Link>
    </motion.div>
  )}
</div>


        {/* Menu Button - Improved visibility */}
        <motion.button
          className={`p-1.5 md:p-2 ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90' : 'bg-white/80 hover:bg-white/90'} backdrop-blur-md rounded-full lg:rounded-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}
          onClick={() => setIsMenuOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Menu"
        >
          <CiMenuFries className={`text-xl ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
        </motion.button>
      </div>
    </div>
  </div>
</motion.nav>

      {/* Enhanced Sliding Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Improved Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 z-[998] backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Enhanced Menu Panel */}
            <motion.div
              ref={menuRef}
              className="fixed top-0 left-0  w-80 sm:w-96 h-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 z-[9999] overflow-y-auto shadow-xl"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Enhanced Profile Section */}
              <div className="p-6 flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 bg-slate-700 dark:bg-gray-800 backdrop-blur-md">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full overflow-hidden flex items-center justify-center shadow-lg">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <FaUser className="text-3xl text-white" />
                  )}
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="flex-1">
                  <h1 className="text-white dark:text-gray-200 font-playfair text-lg sm:text-xl">
                    {profile.nickname}
                  </h1>
                  <p className="text-white dark:text-gray-300 font-Playfair text-sm">
                    {profile.email}
                  </p>
                </div>
                <motion.button
                  className="absolute top-5 right-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MdClose className="text-2xl" />
                </motion.button>
              </div>

              {/* Enhanced Menu Items */}
              <div className="px-2 space-y-1">
                {Object.entries(routes).map(([name, { path, icon, color }], index) => (
                  <motion.div
                    key={name}
                    custom={index}
                    initial="closed"
                    animate="open"
                    variants={menuItemVariants}
                  >
                    <Link
                      to={path}
                      className={`flex items-center gap-2 px-4 py-3 text-[16px] font-medium font-Playfair rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-200/50'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className={`text-xl ${color}`}>{icon}</span>
                      <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>{name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>            
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Enhanced Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-16">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight "
        >
          <p className="text-yellow-400 drop-shadow-lg font-Quicksand flex flex-row gap-2">Immerse <span className="text-yellow-50">Yourself</span>
          {/* <span className="font-Quicksand"> Yourself {''} </span> */}
          <span className=" font-Playfair text-white/90 drop-shadow-lg"> On Art</span></p> 
        </motion.h1>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mb-8 leading-relaxed font-Newsreader text-center"
        >
          {/* Discover a world where colors dance and emotions take shape. Explore curated collections from artists worldwide. */}
          <span className="md:hidden block">
          Discover unique artwork from global artists. Connect, explore, and support creativity in one vibrant space.          </span>
          <span className="hidden md:block">
          Dive into a curated world of stunning art. Whether you're a creator or collector, find inspiration, connection, and exceptional pieces all in one place.          </span>

        </motion.p>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/gallery">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold rounded-2xl shadow-lg text-sm sm:text-base flex items-center gap-2"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 20px rgba(255, 214, 0, 0.4)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaImages />
              Explore Gallery
            </motion.button>
          </Link>
          
          <Link to="/Arteva/Artstore">
            <motion.button
              className="px-8 py-3 border-2 border-white hover:border-yellow-300 text-white hover:text-yellow-300 font-semibold rounded-full text-sm sm:text-base flex items-center gap-2 backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBullhorn />
              Commercial Art
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Enhanced Floating Action Buttons */}
      <motion.div
        className="absolute bottom-4 left-4 z-10 flex flex-row gap-4 safe-area-inset-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          className={`p-1 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          whileHover={{ 
            scale: 1.1,
            backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleDarkMode}
          title={darkMode ? "Light Mode" : "Dark Mode"}
        >
          {darkMode ? (
            <FaSun className="text-xl text-yellow-400" />
          ) : (
            <FaMoon className="text-xl text-gray-700" />
          )}
        </motion.button>
        
        <Link to="/community">
          <motion.button
            className={`p-1 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)'
            }}
            whileTap={{ scale: 0.95 }}
            title="Community"
          >
            <MdGroups3 className="text-xl text-indigo-500" />
          </motion.button>
        </Link>
        
        <Link to="/premium">
          <motion.button
            className={`p-1 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)'
            }}
            whileTap={{ scale: 0.95 }}
            title="Premium"
          >
            <FaCrown className="text-xl text-blue-500" />
          </motion.button>
        </Link>
        <Link to="/cart">
        <motion.button
        className={`p-1 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
        whileHover={{ 
          scale: 1.1,
          backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)' }}
        whileTap={{ scale: 0.95 }}
        title="Cart"
        >
        <FaCartPlus className="text-xl text-blue-500" />
        </motion.button>
        </Link>
        <Link to="/Notifications">
        <motion.button
        className={`p-1 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md rounded-lg shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
        whileHover={{ scale: 1.1,
          backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)' }}
        whileTap={{ scale: 0.95 }}
        title="Cart"
        >
        <FaBell className="text-xl text-blue-500" />
        </motion.button>
        </Link>
      </motion.div>
      
    </div>
  );
};

export default Header;