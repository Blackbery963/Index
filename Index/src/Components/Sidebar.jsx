// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   FiHome, 
//   FiGrid, 
//   FiBook, 
//   FiUsers, 
//   FiShoppingBag,
//   FiSearch,
//   FiHeart
// } from 'react-icons/fi';

// // // const StickyNav = () => {
//   const [isSticky, setIsSticky] = useState(false);
//   const location = useLocation();
//   const [activeItem, setActiveItem] = useState('');

//   // Update active item based on current route
//   useEffect(() => {
//     const path = location.pathname;
//     if (path.includes('gallery')) setActiveItem('gallery');
//     else if (path.includes('category')) setActiveItem('categories');
//     else if (path.includes('journal')) setActiveItem('diary');
//     else if (path.includes('community')) setActiveItem('community');
//     else if (path.includes('artstore')) setActiveItem('artstore');
//     else setActiveItem('discover');
//   }, [location]);

//   // Make navbar sticky when it reaches top
//   useEffect(() => {
//     const handleScroll = () => {
//       const headerHeight = 80; // Adjust based on your header height
//       const heroHeight = window.innerHeight; // Hero section is full viewport height
//       const scrollPosition = window.scrollY;
      
//       // Become sticky when we scroll past the hero section
//       setIsSticky(scrollPosition > heroHeight - headerHeight);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { id: 'discover', label: 'Discover', icon: <FiSearch />, path: '/' },
//     { id: 'gallery', label: 'Gallery', icon: <FiGrid />, path: '/gallery' },
//     { id: 'categories', label: 'Categories', icon: <FiHome />, path: '/category' },
//     { id: 'diary', label: 'My Diary', icon: <FiBook />, path: '/journal' },
//     { id: 'community', label: 'Community', icon: <FiUsers />, path: '/community' },
//     { id: 'artstore', label: 'Art Store', icon: <FiShoppingBag />, path: '/Arteva/Artstore' },
//     { id: 'favorites', label: 'Favorites', icon: <FiHeart />, path: '/favourite' },
//   ];

//   return (
    // <motion.nav
    //   className={` max-w-7xl mx-auto fixed left-2 mt-[89px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-40 transition-all duration-300 ${
    //     isSticky 
    //       ? 'fixed top-0 left-0 shadow-lg' 
    //       : 'relative'
    //   }`}
    //   initial={false}
    //   animate={isSticky ? { y: 0 } : { y: 0 }}
    // >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-col">
//         <div className="flex justify-between flex-col items-center h-16">

//           {/* Navigation Items */}
//           <div className="flex-1 flex items-center justify-center md:justify-start overflow-x-auto">
//             <div className="flex space-x-1 md:space-x-2">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.id}
//                   to={item.path}
//                   onClick={() => setActiveItem(item.id)}
//                   className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
//                     activeItem === item.id
//                       ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
//                       : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
//                   }`}
//                 >
//                   <span className="mr-2">{item.icon}</span>
//                   <span className="hidden sm:block">{item.label}</span>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Search/Additional actions */}
//           <div className="hidden md:block">
//             <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
//               <FiSearch className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </motion.nav>
//   );
// };

// export default StickyNav;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FiHome,
//   FiGrid,
//   FiBook,
//   FiUsers,
//   FiShoppingBag,
//   FiSearch,
//   FiHeart,
//   FiMenu,
//   FiX,
//   FiChevronRight
// } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";

// const StickyNav = () => {
//   const location = useLocation();
//   const [activeItem, setActiveItem] = useState("");
//   const [isSticky, setIsSticky] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   // Update active item based on current route
//   useEffect(() => {
//     const path = location.pathname;
//     if (path.includes("gallery")) setActiveItem("gallery");
//     else if (path.includes("category")) setActiveItem("categories");
//     else if (path.includes("journal")) setActiveItem("diary");
//     else if (path.includes("community")) setActiveItem("community");
//     else if (path.includes("artstore")) setActiveItem("artstore");
//     else if (path.includes("favourite")) setActiveItem("favorites");
//     else setActiveItem("discover");
//   }, [location]);

//   // Make sidebar sticky when scrolling
//   useEffect(() => {
//     const handleScroll = () => {
//       const headerHeight = 80;
//       const scrollPosition = window.scrollY;
//       setIsSticky(scrollPosition > headerHeight);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navItems = [
//     { id: "discover", label: "Discover", icon: <FiSearch />, path: "/" },
//     { id: "gallery", label: "Gallery", icon: <FiGrid />, path: "/gallery" },
//     { id: "categories", label: "Categories", icon: <FiHome />, path: "/category" },
//     { id: "diary", label: "My Diary", icon: <FiBook />, path: "/journal" },
//     { id: "community", label: "Community", icon: <FiUsers />, path: "/community" },
//     { id: "artstore", label: "Art Store", icon: <FiShoppingBag />, path: "/Arteva/Artstore" },
//     { id: "favorites", label: "Favorites", icon: <FiHeart />, path: "/favourite" },
//   ];

//   // Desktop Sidebar Variants
//   const sidebarVariants = {
//     expanded: { width: "256px", transition: { duration: 0.3 } },
//     collapsed: { width: "72px", transition: { duration: 0.3 } }
//   };

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <motion.nav
//         className={`hidden lg:flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 z-40 overflow-hidden ${
//           isSticky ? "pt-0" : "pt-4"
//         }`}
//         initial={false}
//         animate={isCollapsed ? "collapsed" : "expanded"}
//         variants={sidebarVariants}
//       >
//         {/* Collapse Toggle */}
//         <button
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="absolute top-4 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//           aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
//         >
//           <FiChevronRight 
//             className={`text-gray-600 dark:text-gray-400 transition-transform ${
//               isCollapsed ? "rotate-180" : ""
//             }`} 
//           />
//         </button>

//         {/* Logo */}
//         <div className="px-4 py-4 mb-2">
//           {!isCollapsed ? (
//             <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 truncate">
//               Painters' Diary
//             </h1>
//           ) : (
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
//               <span className="text-white font-bold text-sm">PD</span>
//             </div>
//           )}
//         </div>

//         {/* Navigation Items */}
//         <div className="flex-1 flex flex-col space-y-1 px-2">
//           {navItems.map((item) => (
//             <Link
//               key={item.id}
//               to={item.path}
//               onClick={() => setActiveItem(item.id)}
//               className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
//                 activeItem === item.id
//                   ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm"
//                   : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
//               }`}
//             >
//               <span className="text-xl flex-shrink-0">{item.icon}</span>
//               {!isCollapsed && (
//                 <span className="ml-3 font-medium truncate">{item.label}</span>
//               )}
//               {isCollapsed && (
//                 <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                   {item.label}
//                 </div>
//               )}
//             </Link>
//           ))}
//         </div>

//         {/* User Profile/Additional Space */}
//         {!isCollapsed && (
//           <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
//                   Artist Name
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                   @username
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </motion.nav>

//       {/* Mobile Top Bar for Medium Screens (Tablets) */}
//       <nav className="hidden md:flex lg:hidden fixed top-16 left-0 right-0 h-14 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-40 px-4">
//         <div className="flex items-center justify-between w-full overflow-x-auto">
//           {navItems.map((item) => (
//             <Link
//               key={item.id}
//               to={item.path}
//               onClick={() => setActiveItem(item.id)}
//               className={`flex flex-col items-center px-3 py-2 min-w-max ${
//                 activeItem === item.id
//                   ? "text-blue-600 dark:text-blue-400"
//                   : "text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
//               }`}
//             >
//               <span className="text-lg">{item.icon}</span>
//               <span className="text-xs mt-1">{item.label}</span>
//             </Link>
//           ))}
//         </div>
//       </nav>

//       {/* Mobile Menu Button for Small Screens */}
//       <button
//         onClick={() => setIsMobileMenuOpen(true)}
//         className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
//         aria-label="Open menu"
//       >
//         <FiMenu className="text-xl text-gray-700 dark:text-gray-300" />
//       </button>

//       {/* Mobile Bottom Nav for Small Screens */}
//       <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 z-50 flex justify-around items-center px-2">
//         {navItems.slice(0, 5).map((item) => (
//           <Link
//             key={item.id}
//             to={item.path}
//             onClick={() => setActiveItem(item.id)}
//             className={`flex flex-col items-center justify-center flex-1 min-w-0 px-1 ${
//               activeItem === item.id
//                 ? "text-blue-600 dark:text-blue-400"
//                 : "text-gray-500 dark:text-gray-300"
//             }`}
//           >
//             <span className="text-lg">{item.icon}</span>
//             <span className="text-xs mt-1 truncate">{item.label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Mobile Full-Screen Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <motion.div
//               initial={{ x: -300 }}
//               animate={{ x: 0 }}
//               exit={{ x: -300 }}
//               transition={{ type: "spring", damping: 25 }}
//               className="w-80 h-full bg-white dark:bg-gray-900 shadow-xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//                 <div className="flex items-center justify-between">
//                   <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
//                     Painters' Diary
//                   </h1>
//                   <button
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
//                   >
//                     <FiX className="text-lg" />
//                   </button>
//                 </div>
//               </div>

//               <div className="p-4 space-y-2">
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.id}
//                     to={item.path}
//                     onClick={() => {
//                       setActiveItem(item.id);
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className={`flex items-center p-3 rounded-lg transition-colors ${
//                       activeItem === item.id
//                         ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
//                         : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
//                     }`}
//                   >
//                     <span className="text-xl mr-3">{item.icon}</span>
//                     <span className="font-medium">{item.label}</span>
//                   </Link>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Content Padding for Desktop Sidebar */}
//       {!isCollapsed && (
//         <div className="hidden lg:block" style={{ marginLeft: "256px" }}></div>
//       )}
//       {isCollapsed && (
//         <div className="hidden lg:block" style={{ marginLeft: "72px" }}></div>
//       )}
//     </>
//   );
// };

// export default StickyNav;
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiBook,
  FiUsers,
  FiShoppingBag,
  FiSearch,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
  FiMinus,
  FiMaximize2,
} from "react-icons/fi";

const StickyNav = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Track current page
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("gallery")) setActiveItem("gallery");
    else if (path.includes("category")) setActiveItem("categories");
    else if (path.includes("journal")) setActiveItem("diary");
    else if (path.includes("community")) setActiveItem("community");
    else if (path.includes("artstore")) setActiveItem("artstore");
    else if (path.includes("favourite")) setActiveItem("favorites");
    else setActiveItem("discover");
  }, [location]);

  // Stick when reaching hero bottom
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 80;
      const heroHeight = window.innerHeight;
      const scrollPos = window.scrollY;
      setIsSticky(scrollPos > heroHeight - headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-collapse on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { id: "discover", label: "Discover", icon: FiSearch, path: "/" },
    { id: "gallery", label: "Gallery", icon: FiGrid, path: "/gallery" },
    { id: "categories", label: "Categories", icon: FiHome, path: "/category" },
    { id: "diary", label: "My Diary", icon: FiBook, path: "/journal" },
    { id: "community", label: "Community", icon: FiUsers, path: "/community" },
    { id: "artstore", label: "Art Store", icon: FiShoppingBag, path: "/Arteva/Artstore" },
    { id: "favorites", label: "Favorites", icon: FiHeart, path: "/favourite" },
  ];

  if (isMinimized) {
    return (
      <div className="fixed top-1/2 left-4 -translate-y-1/2 z-50 hidden sm:block">
        <button
          onClick={() => setIsMinimized(false)}
          className="group p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Expand navigation"
        >
          <FiMaximize2 className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Desktop/Tablet Sidebar */}
      <aside
        className={`hidden sm:block fixed top-[90px] xl:left-[15px] left-[0px] md:left-[7px] h-[calc(100vh-80px)] z-40 transition-all rounded-xl overflow-hidden duration-500 ease-in-out ${
          isSticky ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        } ${isCollapsed ? "w-16" : "w-64"}`}
      >
        <div className="h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/30 dark:border-gray-700/30">
          {/* Header with controls */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200/30 dark:border-gray-700/30">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Navigation
              </h2>
            )}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <FiChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <FiChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
              {!isCollapsed && (
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200"
                  aria-label="Minimize navigation"
                >
                  <FiMinus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col p-2 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setActiveItem(item.id)}
                className={`group relative flex items-center rounded-xl transition-all duration-200 ${
                  isCollapsed ? "p-3 justify-center" : "px-4 py-3"
                } ${
                  activeItem === item.id
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/30"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0`}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon
                  className={`transition-all duration-200 ${
                    isCollapsed ? "w-5 h-5" : "w-5 h-5 mr-3"
                  } ${
                    activeItem === item.id ? "scale-110" : "group-hover:scale-105"
                  }`}
                />
                {!isCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
                
                {/* Active indicator */}
                {activeItem === item.id && (
                  <div
                    className={`absolute bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-200 ${
                      isCollapsed
                        ? "top-1 right-1 w-2 h-2"
                        : "left-1 top-1/2 -translate-y-1/2 w-1 h-6"
                    }`}
                  />
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900 dark:border-r-gray-100" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200/30 dark:border-gray-700/30 z-50">
        <div className="flex justify-around items-center h-full px-2">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setActiveItem(item.id)}
              className={`group relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 ${
                activeItem === item.id
                  ? "text-blue-600 dark:text-blue-400 scale-105"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:scale-105"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              aria-label={item.label}
            >
              <item.icon className="w-5 h-5 mb-1 transition-transform duration-200 group-hover:scale-110" />
              <span className="text-xs font-medium">{item.label}</span>
              
              {/* Active indicator */}
              {activeItem === item.id && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 dark:bg-blue-400 rounded-b-full" />
              )}
            </Link>
          ))}
          
          {/* More button for additional items */}
          <div className="relative group">
            <button className="flex flex-col items-center justify-center p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-200 hover:scale-105">
              <FiGrid className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">More</span>
            </button>
            
            {/* Dropdown for additional items */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {navItems.slice(5).map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setActiveItem(item.id)}
                  className={`flex items-center px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    activeItem === item.id
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop for collapsed state on mobile */}
      {isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 sm:hidden"
          onClick={() => setIsCollapsed(false)}
        />
      )}
    </>
  );
};

export default StickyNav;