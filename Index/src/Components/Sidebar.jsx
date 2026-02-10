// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import {
// //   FiHome,
// //   FiGrid,
// //   FiBook,
// //   FiUsers,
// //   FiShoppingBag,
// //   FiSearch,
// //   FiHeart,
// //   FiChevronLeft,
// //   FiChevronRight,
// //   FiSettings,
// //   FiMenu,
// //   FiHelpCircle,
// //   FiInfo,
// //   FiShield,
// //   FiFileText,
// //   FiUserPlus,
// //   FiBookmark,
// // } from "react-icons/fi";
// // import { IoSparklesOutline } from "react-icons/io5";
// // import { MdOutlineBook, MdOutlineExplore, MdOutlineMoreVert} from "react-icons/md";
// // import { CiGrid42 } from "react-icons/ci";
// // import { IoMdGlobe } from "react-icons/io";
// // import { TbCategory2 } from "react-icons/tb";

// // const StickyNav = () => {
// //   const location = useLocation();
// //   const [activeItem, setActiveItem] = useState("");
// //   const [isSticky, setIsSticky] = useState(false);
// //   const [isCollapsed, setIsCollapsed] = useState(false);
// //   const [showMoreMenu, setShowMoreMenu] = useState(false);

// //   // Track current page
// //   useEffect(() => {
// //     const path = location.pathname.toLowerCase();
// //     if (path.includes("gallery")) setActiveItem("gallery");
// //     else if (path.includes("category")) setActiveItem("categories");
// //     else if (path.includes("journal")) setActiveItem("diary");
// //     else if (path.includes("community")) setActiveItem("community");
// //     else if (path.includes("artstore")) setActiveItem("artstore");
// //     else if (path.includes("favourite")) setActiveItem("favorites");
// //     else if (path.includes("moments") || path.includes("videos")) setActiveItem("moments");
// //     else if (path.includes("about")) setActiveItem("about");
// //     else if (path.includes("help")) setActiveItem("help");
// //     else if (path.includes("privacy")) setActiveItem("privacy");
// //     else if (path.includes("terms")) setActiveItem("terms");
// //     else setActiveItem("explore");
// //   }, [location]);

// //   // Stick when reaching hero bottom
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       const headerHeight = 80;
// //       const heroHeight = window.innerHeight;
// //       const scrollPos = window.scrollY;
// //       setIsSticky(scrollPos > heroHeight - headerHeight);
// //     };

// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   // Auto-collapse on smaller screens
// //   useEffect(() => {
// //     const handleResize = () => {
// //       if (window.innerWidth < 1024) {
// //         setIsCollapsed(true);
// //       } else {
// //         setIsCollapsed(false);
// //       }
// //     };

// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   // Close menu when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (showMoreMenu && !event.target.closest('.more-menu-container')) {
// //         setShowMoreMenu(false);
// //       }
// //     };

// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, [showMoreMenu]);

// //   // Main navigation items (most important - always visible)
// //   const mainNavItems = [
// //     { id: "explore", label: "Explore", icon: MdOutlineExplore, path: "/" },
// //     { id: "gallery", label: "Gallery", icon: FiGrid, path: "/gallery" },
// //     { id: "moments", label: "Moments", icon: IoSparklesOutline, path: "/moments" },
// //     { id: "artist", label: "Artist", icon: FiUserPlus, path: "/Artists/DiscoverUsers" }, 
// //     { id: "diary", label: "Diary", icon: MdOutlineBook, path: "/journal" },
// //     { id: "community", label: "Community", icon: FiUsers, path: "/community" },

// //   ];

// //   // Additional features for more menu
// //   const featureItems = [
// //     { id: "categories", label: "Categories", icon: TbCategory2, path: "/category" },
// //     { id: "artstore", label: "Art Store", icon: FiShoppingBag, path: "/Arteva/Artstore" },
// //     { id: "save", label: "Saved", icon: FiBookmark, path: "/saved" },

// //   ];

// //   // Legal & support items for more menu
// //   const supportItems = [
// //     { id: "about", label: "About", icon: FiInfo, path: "/About" },
// //     { id: "help", label: "Help & Support", icon: FiHelpCircle, path: "/Resources/Help" },
// //     { id: "privacy", label: "Privacy Policy", icon: FiShield, path: "/Legal/Privacy_Policy" },
// //     { id: "terms", label: "Terms & Conditions", icon: FiFileText, path: "/Legal/Terms_Conditions" },
// //     { id: "settings", label: "Settings", icon: FiSettings, path: "/Settings/Settings" },
// //   ];

// //   return (
// //     <>
// //       {/* Desktop/Tablet Sidebar */}
// //       <aside
// //         className={`hidden sm:block fixed top-[85px] xl:left-[18px] left-[0px] md:left-[7px] h-[calc(98vh-80px)] z-40 transition-all rounded-lg duration-500 ease-in-out  ${
// //           isSticky ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
// //         } ${isCollapsed ? "w-16" : "w-64"}`}
// //       >
// //         <div className="h-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-r border-gray-200/30 dark:border-gray-700/30 rounded-lg ">
// //           {/* Header with controls */}
// //           <div className="flex items-center justify-between p-4 border-b border-gray-200/30 dark:border-gray-700/30">
// //             {!isCollapsed && (
// //               <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
// //                 Navigation
// //               </h2>
// //             )}
// //             <div className="flex items-center gap-1">
// //               <button
// //                 onClick={() => setIsCollapsed(!isCollapsed)}
// //                 className="p-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200"
// //                 aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
// //               >
// //                 {isCollapsed ? (
// //                   <FiChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
// //                 ) : (
// //                   <FiChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
// //                 )}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Navigation Items */}
// //           <div className="flex flex-col p-2 space-y-1 more-menu-container">
// //             {mainNavItems.map((item) => (
// //               <NavItem 
// //                 key={item.id}
// //                 item={item}
// //                 activeItem={activeItem}
// //                 isCollapsed={isCollapsed}
// //                 onClick={() => setActiveItem(item.id)}
// //               />
// //             ))}
            
// //             {/* More Features Button with Unique Popup */}
// //             <div className="relative more-menu-container ">
// //               <button
// //                 onClick={() => setShowMoreMenu(!showMoreMenu)}
// //                 className={`group relative flex items-center rounded-xl transition-all duration-200 w-full hide-scrollbar ${
// //                   isCollapsed ? "p-3 justify-center" : "px-4 py-3"
// //                 } ${
// //                   showMoreMenu 
// //                     ? "bg-blue-50 dark:bg-zinc-950/50 text-blue-600 dark:text-blue-400" 
// //                     : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/30"
// //                 }`}
// //               >
// //                 <FiSettings className={`transition-all duration-200 ${
// //                   isCollapsed ? "w-5 h-5" : "w-5 h-5 mr-3"
// //                 } ${showMoreMenu ? "scale-110" : "group-hover:scale-105"}`} />
// //                 {!isCollapsed && (
// //                   <span className="font-medium text-sm truncate">More</span>
// //                 )}
                
// //                 {/* Tooltip for collapsed state */}
// //                 {isCollapsed && (
// //                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hide-scrollbar">
// //                     More Features
// //                     <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900 dark:border-r-gray-100" />
// //                   </div>
// //                 )}
// //               </button>

// //               {/* Unique Popup for Desktop */}
// //               {showMoreMenu && (
// //                 <div className={`absolute ${
// //                   isCollapsed ? "left-full ml-2 top-0" : "left-0 right-0 top-full mt-2 hide-scrollbar"
// //                 } bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 min-w-[240px] overflow-hidden `}>
// //                   {/* Popup Header */}
// //                   <div className="p-4 border-b border-gray-200/30 dark:border-gray-700/30">
// //                     <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
// //                       More Features & Settings
// //                     </h3>
// //                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
// //                       Additional tools and resources
// //                     </p>
// //                   </div>

// //                   <div className="max-h-96 overflow-y-auto">
// //                     {/* Features Section */}
// //                     <div className="p-3">
// //                       <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-2">
// //                         Features
// //                       </h4>
// //                       <div className="space-y-1">
// //                         {featureItems.map((item) => (
// //                           <NavItem 
// //                             key={item.id}
// //                             item={item}
// //                             activeItem={activeItem}
// //                             isCollapsed={false}
// //                             onClick={() => {
// //                               setActiveItem(item.id);
// //                               setShowMoreMenu(false);
// //                             }}
// //                             isPopup={true}
// //                           />
// //                         ))}
// //                       </div>
// //                     </div>

// //                     {/* Support & Legal Section */}
// //                     <div className="p-3 border-t border-gray-200/30 dark:border-gray-700/30">
// //                       <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-2">
// //                         Support & Legal
// //                       </h4>
// //                       <div className="space-y-1">
// //                         {supportItems.map((item) => (
// //                           <NavItem 
// //                             key={item.id}
// //                             item={item}
// //                             activeItem={activeItem}
// //                             isCollapsed={false}
// //                             onClick={() => {
// //                               setActiveItem(item.id);
// //                               setShowMoreMenu(false);
// //                             }}
// //                             isPopup={true}
// //                           />
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </aside>

// //       {/* Mobile Bottom Nav */}
// //       <nav className="sm:hidden fixed bottom-1 left-1/2 -translate-x-1/2 h-16 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 z-50 rounded-lg shadow-lg w-[98%] max-w-md more-menu-container">
// //         <div className="flex justify-around items-center h-full px-2">
// //           {mainNavItems.slice(0, 4).map((item) => (
// //             <Link
// //               key={item.id}
// //               to={item.path}
// //               onClick={() => setActiveItem(item.id)}
// //               className={`group relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 flex-1 ${
// //                 activeItem === item.id
// //                   ? "text-blue-600 dark:text-blue-400 scale-105"
// //                   : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:scale-105"
// //               } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
// //               aria-label={item.label}
// //             >
// //               <item.icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
// //               <span className="text-xs font-medium text-center truncate w-full mt-1">{item.label}</span>
              
// //               {/* Active indicator */}
// //               {activeItem === item.id && (
// //                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-blue-600 dark:bg-blue-400 rounded-b-full" />
// //               )}
// //             </Link>
// //           ))}
          
// //           {/* More button for mobile */}
// //           <button
// //             onClick={() => setShowMoreMenu(!showMoreMenu)}
// //             className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 flex-1 ${
// //               showMoreMenu
// //                 ? "text-blue-600 dark:text-blue-400 scale-105"
// //                 : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:scale-105"
// //             }`}
// //           >
// //             <MdOutlineMoreVert className="w-5 h-5" />
// //             <span className="text-xs font-medium text-center truncate w-full mt-1">More</span>
// //           </button>
// //         </div>

// //         {/* Mobile More Menu Popup */}
// //         {showMoreMenu && (
// //           <div className="absolute bottom-full left-2 right-2 mb-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 max-h-80 overflow-y-auto">
// //             <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
// //               More Features
// //             </h3>
            
// //             {/* Remaining main nav items */}
// //             {mainNavItems.slice(4).map((item) => (
// //               <Link
// //                 key={item.id}
// //                 to={item.path}
// //                 onClick={() => {
// //                   setActiveItem(item.id);
// //                   setShowMoreMenu(false);
// //                 }}
// //                 className={`flex items-center p-3 rounded-lg transition-colors text-sm mb-1 ${
// //                   activeItem === item.id
// //                     ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
// //                     : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
// //                 }`}
// //               >
// //                 <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
// //                 <span className="truncate">{item.label}</span>
// //               </Link>
// //             ))}

// //             {/* Feature items */}
// //             <div className="border-t border-gray-200/30 dark:border-gray-700/30 mt-2 pt-2">
// //               {featureItems.map((item) => (
// //                 <Link
// //                   key={item.id}
// //                   to={item.path}
// //                   onClick={() => {
// //                     setActiveItem(item.id);
// //                     setShowMoreMenu(false);
// //                   }}
// //                   className={`flex items-center p-3 rounded-lg transition-colors text-sm mb-1 ${
// //                     activeItem === item.id
// //                       ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
// //                       : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
// //                   }`}
// //                 >
// //                   <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
// //                   <span className="truncate">{item.label}</span>
// //                 </Link>
// //               ))}
// //             </div>

// //             {/* Support items */}
// //             <div className="border-t border-gray-200/30 dark:border-gray-700/30 mt-2 pt-2">
// //               {supportItems.map((item) => (
// //                 <Link
// //                   key={item.id}
// //                   to={item.path}
// //                   onClick={() => {
// //                     setActiveItem(item.id);
// //                     setShowMoreMenu(false);
// //                   }}
// //                   className={`flex items-center p-3 rounded-lg transition-colors text-sm mb-1 ${
// //                     activeItem === item.id
// //                       ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
// //                       : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
// //                   }`}
// //                 >
// //                   <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
// //                   <span className="truncate">{item.label}</span>
// //                 </Link>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </nav>

// //       {/* Backdrop for mobile popup */}
// //       {showMoreMenu && (
// //         <div 
// //           className="sm:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
// //           onClick={() => setShowMoreMenu(false)}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // // Reusable NavItem component
// // const NavItem = ({ item, activeItem, isCollapsed, onClick, isPopup = false }) => (
// //   <Link
// //     to={item.path}
// //     onClick={onClick}
// //     className={`group relative flex items-center rounded-xl transition-all duration-200 ${
// //       isCollapsed && !isPopup ? "p-3 justify-center" : "px-4 py-3"
// //     } ${
// //       activeItem === item.id
// //         ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
// //         : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/30"
// //     } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0`}
// //     title={isCollapsed && !isPopup ? item.label : undefined}
// //   >
// //     <item.icon
// //       className={`transition-all duration-200 ${
// //         isCollapsed && !isPopup ? "w-5 h-5" : "w-5 h-5 mr-3"
// //       } ${
// //         activeItem === item.id ? "scale-110" : "group-hover:scale-105"
// //       }`}
// //     />
// //     {(!isCollapsed || isPopup) && (
// //       <span className="font-medium text-sm truncate">{item.label}</span>
// //     )}
    
// //     {/* Active indicator */}
// //     {activeItem === item.id && !isPopup && (
// //       <div
// //         className={`absolute bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-200 ${
// //           isCollapsed
// //             ? "top-1 right-1 w-2 h-2"
// //             : "left-1 top-1/2 -translate-y-1/2 w-1 h-6"
// //         }`}
// //       />
// //     )}

// //     {/* Tooltip for collapsed state */}
// //     {isCollapsed && !isPopup && (
// //       <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
// //         {item.label}
// //         <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900 dark:border-r-gray-100" />
// //       </div>
// //     )}
// //   </Link>
// // );

// // export default StickyNav;                                                                                 




// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FiGrid,
//   FiUsers,
//   FiShoppingBag,
//   FiChevronLeft,
//   FiChevronRight,
//   FiSettings,
//   FiHelpCircle,
//   FiUserPlus,
//   FiBookmark,
//   FiMoon,
//   FiMenu
// } from "react-icons/fi";
// import { IoSparklesOutline } from "react-icons/io5";
// import { MdOutlineBook, MdOutlineExplore, MdOutlineMoreVert } from "react-icons/md";
// import { TbCategory2 } from "react-icons/tb";
// import { MessageCircle, Search, SquarePlay } from "lucide-react";

// const StickyNav = () => {
//   const location = useLocation();
//   const [activeItem, setActiveItem] = useState("explore");
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [showMobileDrawer, setShowMobileDrawer] = useState(false);
//   const [isSticky, setIsSticky] = useState(false);

//   // Refs
//   const drawerRef = useRef(null);

//   // --- CONFIGURATION ---
//   const SIDEBAR_EXPANDED_WIDTH = "w-64";
//   const SIDEBAR_COLLAPSED_WIDTH = "w-16"; // Slightly wider for better visual balance

//   // --- SCROLL & RESIZE LOGIC ---
//   useEffect(() => {
//     const handleScroll = () => {
//       // 80px header + some threshold
//       const scrollPos = window.scrollY;
//       const heroHeight = window.innerHeight * 0.5; // Trigger sticky sooner
//       setIsSticky(scrollPos > heroHeight);
//     };

//     const handleResize = () => {
//       // Auto-collapse on smaller desktop screens
//       if (window.innerWidth < 1280) {
//         setIsCollapsed(true);
//       } else {
//         setIsCollapsed(false);
//       }
//       // Close mobile drawer if resizing to desktop
//       if (window.innerWidth > 1024) setShowMobileDrawer(false);
//     };

//     window.addEventListener("scroll", handleScroll);
//     window.addEventListener("resize", handleResize);
//     handleResize(); // Init check

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // --- ACTIVE PATH LOGIC ---
//   const mainNavItems = [
//     { id: "explore", label: "Explore", icon: MdOutlineExplore, path: "/" },
//     { id: "search", label:"Search", icon:Search, path:"/search"},
//     { id: "moments", label: "Moments", icon: SquarePlay, path: "/moments" },
//     { id: "artist", label: "Artist", icon: FiUserPlus, path: "/Artists/DiscoverUsers" },
//     { id: "diary", label: "Diary", icon: MdOutlineBook, path: "/journal" },
//   ];

//   const featureItems = [
//     { id: "gallery", label: "Gallery", icon: FiGrid, path: "/gallery" },
//     { id: "community", label: "Community", icon: FiUsers, path: "/community" },
//     { id: "categories", label: "Categories", icon: TbCategory2, path: "/category" },
//     { id: "artstore", label: "Art Store", icon: FiShoppingBag, path: "/Arteva/Artstore" },
//     { id: "save", label: "Saved", icon: FiBookmark, path: "/saved" },
//   ];

//   const bottomItems = [
//     { id: "help", label: "Help", icon: FiHelpCircle, path: "/Resources/Help" },
//     { id: "settings", label: "Settings", icon: FiSettings, path: "/Settings/Settings" },
//     // {id: "chat" , label: "Chat", icon: MessageCircle, path:"/chat"},
//   ];

//   useEffect(() => {
//     const path = location.pathname.toLowerCase();
//     const allItems = [...mainNavItems, ...featureItems, ...bottomItems];
//     const match = allItems.find((item) => path.includes(item.path) && item.path !== "/");
    
//     if (match) {
//       setActiveItem(match.id);
//     } else if (path === "/" || path === "") {
//       setActiveItem("explore");
//     }
//   }, [location]);

//   // Click Outside for Mobile Drawer
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (drawerRef.current && !drawerRef.current.contains(event.target)) {
//         setShowMobileDrawer(false);
//       }
//     };
//     if (showMobileDrawer) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showMobileDrawer]);


//   return (
//     <>
//       {/* ==========================================================
//           DESKTOP SIDEBAR 
//       ========================================================== */}
//       <aside
//         className={`
//           hidden lg:block fixed top-[85px] left-4 z-40 h-[calc(98vh-90px)]
//           transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
//           ${isSticky ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0 pointer-events-none"}
//           ${isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH}
//         `}
//       >
//         <div className="flex flex-col h-full w-full bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 shadow-xl rounded-lg overflow-none">
          
//           {/* Header & Toggle */}
//           <div className={`flex items-center p-4 shrink-0 h-16 ${isCollapsed ? "justify-center" : "justify-between"}`}>
//             {!isCollapsed && (
//               <span className="text-xs font-bold text-gray-400 uppercase tracking-wider animate-in fade-in">
//                 Menu
//               </span>
//             )}
//             <button
//               onClick={() => setIsCollapsed(!isCollapsed)}
//               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 transition-colors"
//             >
//               {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
//             </button>
//           </div>

//           {/* Nav Items */}
//           <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 hide-scrollbar">
//             {mainNavItems.map((item) => (
//               <DesktopNavItem
//                 key={item.id}
//                 item={item}
//                 isActive={activeItem === item.id}
//                 isCollapsed={isCollapsed}
//                 onClick={() => setActiveItem(item.id)}
//               />
//             ))}

//             <div className="my-4 border-t border-gray-100 dark:border-zinc-800/80 mx-2" />

//             {featureItems.map((item) => (
//               <DesktopNavItem
//                 key={item.id}
//                 item={item}
//                 isActive={activeItem === item.id}
//                 isCollapsed={isCollapsed}
//                 onClick={() => setActiveItem(item.id)}
//               />
//             ))}
//           </div>

//           {/* Bottom Items */}
//           <div className="p-3 mt-auto bg-gray-50/50 dark:bg-zinc-900/50 border-t border-gray-100 dark:border-zinc-800 shrink-0 space-y-1">
//             {bottomItems.map((item) => (
//               <DesktopNavItem
//                 key={item.id}
//                 item={item}
//                 isActive={activeItem === item.id}
//                 isCollapsed={isCollapsed}
//                 onClick={() => setActiveItem(item.id)}
//               />
//             ))}
//           </div>
//         </div>
//       </aside>


//       {/* ==========================================================
//           MOBILE BOTTOM NAV
//           Fixes: 
//           - Used inset-x-0 mx-auto w-[92%] to perfectly center without fixed px
//           - Removed jumpy active animation
//       ========================================================== */}
//       <nav className="lg:hidden fixed bottom-1 inset-x-0 mx-auto w-[99%] max-w-md h-16 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-gray-200/50 dark:border-zinc-800 z-50 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex justify-between px-2 items-center">
      
//         {mainNavItems.slice(0, 4).map((item) => (
//             <Link
//               key={item.id}
//               to={item.path}
//               onClick={() => setActiveItem(item.id)}
//               className={`group relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 flex-1 ${
//                 activeItem === item.id
//                   ? "text-blue-600 dark:text-blue-400 scale-105"
//                   : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:scale-105"
//               } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
//               aria-label={item.label}
//             >
//               <item.icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
//               <span className="text-xs font-medium text-center truncate w-full mt-1">{item.label}</span>
              
//               {/* Active indicator */}
//               {activeItem === item.id && (
//                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-blue-600 dark:bg-blue-400 rounded-b-full" />
//               )}
//             </Link>
//           ))}

//         {/* More Button */}
//         <button
//           onClick={() => setShowMobileDrawer(true)}
//           className="relative flex-1 flex flex-col items-center justify-center h-full text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300"
//         >
//           <div className={`p-1 rounded-full ${showMobileDrawer ? "bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-white" : ""}`}>
//             <MdOutlineMoreVert className="w-6 h-6" />
//             <span className=" text-[12px] text-gray-500 dark:text-gray-400">More</span>
//           </div>
//         </button>
//       </nav>

//       {/* ==========================================================
//           MOBILE DRAWER
//           Fixes: Cleaner Grid, Better Typography
//       ========================================================== */}
//       {/* Backdrop */}
//       <div
//         className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
//           showMobileDrawer ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
//         }`}
//         onClick={() => setShowMobileDrawer(false)}
//       />

//       {/* Sheet */}
//       <div
//         ref={drawerRef}
//         className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 z-50 rounded-t-[32px] shadow-2xl transform transition-transform duration-300 cubic-bezier(0.32, 0.72, 0, 1) lg:hidden max-h-[85vh] flex flex-col ${
//           showMobileDrawer ? "translate-y-0" : "translate-y-full"
//         }`}
//       >
//         {/* Handle */}
//         <div 
//             className="shrink-0 flex justify-center pt-4 pb-2 w-full cursor-pointer"
//             onClick={() => setShowMobileDrawer(false)}
//         >
//           <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-zinc-700" />
//         </div>

//         {/* Content */}
//         <div className="overflow-y-auto p-6 pb-12 space-y-8">
          
//           {/* Section: Apps */}
//           <div className="animate-in slide-in-from-bottom-4 duration-300">
//             <h3 className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-5 px-1">
//               Apps & Features
//             </h3>
//             <div className="grid grid-cols-5 gap-y-6 gap-x-2">
//               {[...mainNavItems, ...featureItems].map((item) => (
//                 <Link
//                   key={item.id}
//                   to={item.path}
//                   onClick={() => {
//                     setActiveItem(item.id);
//                     setShowMobileDrawer(false);
//                   }}
//                   className="flex flex-col items-center gap-3 group"
//                 >
//                   <div
//                     className={`w-10 h-10 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 dark:border-zinc-800 transition-all duration-200 ${
//                       activeItem === item.id
//                         ? "bg-blue-600 text-white shadow-blue-500/30 ring-2 ring-blue-100 dark:ring-blue-900"
//                         : "bg-gray-50 dark:bg-zinc-900 text-gray-600 dark:text-gray-400 group-hover:scale-105"
//                     }`}
//                   >
//                     <item.icon />
//                   </div>
//                   <span className={`text-[11px] font-medium text-center leading-tight max-w-[64px] ${
//                       activeItem === item.id ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-zinc-400"
//                   }`}>
//                     {item.label}
//                   </span>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Section: System */}
//           <div className="bg-gray-50/80 dark:bg-zinc-900/50 rounded-2xl p-2 border border-gray-100 dark:border-zinc-800 animate-in slide-in-from-bottom-8 duration-500">
//             {bottomItems.map((item) => (
//               <Link
//                 key={item.id}
//                 to={item.path}
//                 onClick={() => {
//                   setActiveItem(item.id);
//                   setShowMobileDrawer(false);
//                 }}
//                 className="flex items-center justify-between p-3.5 hover:bg-white dark:hover:bg-zinc-800 rounded-xl transition-all group"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                     <item.icon size={18} />
//                   </div>
//                   <span className="font-medium text-sm text-gray-700 dark:text-gray-200">
//                     {item.label}
//                   </span>
//                 </div>
//                 <FiChevronRight className="text-gray-300 dark:text-zinc-600 group-hover:translate-x-1 transition-transform" />
//               </Link>
//             ))}

//             <div className="h-px bg-gray-200/50 dark:bg-zinc-800 my-1 mx-3" />

//             <div className="flex items-center justify-between p-3.5">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm text-gray-500 dark:text-gray-400">
//                   <FiMoon size={18} />
//                 </div>
//                 <span className="font-medium text-sm text-gray-700 dark:text-gray-200">
//                   Dark Mode
//                 </span>
//               </div>
//               {/* Simple Toggle Switch */}
//               <button className="w-11 h-6 bg-gray-200 dark:bg-blue-600 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                 <span className="absolute top-1 left-1 dark:left-6 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// // --- HELPER COMPONENT: DESKTOP NAV ITEM ---
// const DesktopNavItem = ({ item, isActive, isCollapsed, onClick }) => {
//   return (
//     <Link
//       to={item.path}
//       onClick={onClick}
//       className={`
//         group relative flex items-center h-11 rounded-xl transition-all duration-200 cursor-pointer outline-none
//         ${isCollapsed ? "justify-center px-0 w-12 mx-auto" : "px-3.5 w-full"}
//         ${
//           isActive
//             ? "bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400"
//             : "text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-zinc-100"
//         }
//       `}
//     >
//       <item.icon
//         size={isCollapsed ? 22 : 20}
//         className={`shrink-0 transition-transform duration-200 ${
//             isActive && !isCollapsed ? "scale-100" : "group-hover:scale-105"
//         }`}
//       />

//       {!isCollapsed && (
//         <span className="ml-3 text-sm font-medium whitespace-nowrap overflow-hidden animate-in fade-in duration-200">
//           {item.label}
//         </span>
//       )}

//       {/* Tooltip for Collapsed State */}
//       {isCollapsed && (
//         <div className="fixed left-[4.5rem] z-50 px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none">
//           {item.label}
//           {/* Arrow */}
//           <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 dark:bg-white rotate-45" />
//         </div>
//       )}

//       {/* Active Indicator Strip (Left) */}
//       {isActive && !isCollapsed && (
//         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-blue-600 dark:bg-blue-400" />
//       )}
//     </Link>
//   );
// };

// export default StickyNav;

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Grid,
  Users,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  UserPlus,
  Bookmark,
  Moon,
  Sparkles,
  BookOpen,
  Compass,
  LayoutGrid,
  Search,
  PlaySquare,
  MoreVertical,
  Blocks,
  Album
} from "lucide-react";

const StickyNav = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("explore");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const drawerRef = useRef(null);

  // --- CONFIGURATION ---
  const SIDEBAR_EXPANDED_WIDTH = "w-[240px]";
  const SIDEBAR_COLLAPSED_WIDTH = "w-[72px]"; // Kept for premium icon spacing

  // --- SCROLL & RESIZE LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > window.innerHeight * 0.5);
    };
    const handleResize = () => {
      if (window.innerWidth < 1280) setIsCollapsed(true);
      else setIsCollapsed(false);
      if (window.innerWidth > 1024) setShowMobileDrawer(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // --- NAV ITEMS (All using lucide-react icons) ---
  const mainNavItems = [
    { id: "explore", label: "Explore", icon: Compass, path: "/" },
    { id: "search", label: "Search", icon: Search, path: "/search" },
    { id: "moments", label: "Moments", icon: PlaySquare, path: "/moments" },
    { id: "artist", label: "Artist", icon: UserPlus, path: "/Artists/DiscoverUsers" },
    { id: "diary", label: "Diary", icon: Album, path: "/journal" },
  ];
  const featureItems = [
    { id: "gallery", label: "Gallery", icon: Grid, path: "/gallery" },
    { id: "community", label: "Community", icon: Users, path: "/community" },
    { id: "categories", label: "Categories", icon: LayoutGrid, path: "/category" },
    { id: "artstore", label: "Art Store", icon: ShoppingBag, path: "/Arteva/Artstore" },
    { id: "resources", label:"Resources", icon: Blocks, path:"/Community/Resources/Hub"},
    { id: "save", label: "Saved", icon: Bookmark, path: "/saved" },
  ];
  const bottomItems = [
    { id: "help", label: "Help", icon: HelpCircle, path: "/Resources/Help" },
    { id: "settings", label: "Settings", icon: Settings, path: "/Settings/Settings" },
  ];

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const allItems = [...mainNavItems, ...featureItems, ...bottomItems];
    const match = allItems.find((item) => path.includes(item.path.toLowerCase()) && item.path !== "/");
    if (match) setActiveItem(match.id);
    else if (path === "/" || path === "") setActiveItem("explore");
  }, [location]);

  // Click Outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) setShowMobileDrawer(false);
    };
    if (showMobileDrawer) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileDrawer]);

  return (
    <>
      {/* ==========================================================
          DESKTOP SIDEBAR - PREMIUM LIQUID GLASS (Reduced padding, tighter layout)
      ========================================================== */}
      <aside
        className={`
          hidden lg:block fixed top-[85px] left-4 z-40 h-[calc(98vh-90px)]
          transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          ${isSticky ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}
          ${isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH}
        `}
      >
        {/* THE GLASS CONTAINER */}
        <div className="relative flex flex-col h-full w-full rounded-2xl overflow-hidden
                        bg-white/30 dark:bg-black/30
                        backdrop-blur-3xl backdrop-saturate-150
                        border border-white/40 dark:border-white/10
                        shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">
          {/* Top Gloss Reflection (The "Liquid" Shine) */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-0" />

          {/* Inner Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header (Reduced padding) */}
            <div className={`flex items-center p-3 shrink-0 h-16 ${isCollapsed ? "justify-center" : "justify-between"}`}>
              {!isCollapsed && (
                <span className="text-xs font-bold text-gray-800 dark:text-white uppercase tracking-widest drop-shadow-sm ml-2">
                  Menu
                </span>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-10 h-10 flex items-center justify-center rounded-full
                           bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/20
                           border border-white/40 dark:border-white/10
                           text-gray-700 dark:text-gray-200 transition-all shadow-sm"
              >
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
            </div>

            {/* Scrollable Nav Area (Tighter padding, reduced space) */}
            <div className="flex-1 overflow-y-auto px-2 py-1 space-y-1 hide-scrollbar">
              {mainNavItems.map((item) => (
                <GlassNavItem
                  key={item.id}
                  item={item}
                  isActive={activeItem === item.id}
                  isCollapsed={isCollapsed}
                  onClick={() => setActiveItem(item.id)}
                  isPrimary
                />
              ))}
              {/* Divider (Reduced margin) */}
              <div className="my-4 mx-2 h-px bg-gradient-to-r from-transparent via-gray-400/30 to-transparent dark:via-white/20" />
              {featureItems.map((item) => (
                <GlassNavItem
                  key={item.id}
                  item={item}
                  isActive={activeItem === item.id}
                  isCollapsed={isCollapsed}
                  onClick={() => setActiveItem(item.id)}
                  isPrimary
                />
              ))}
            </div>

            {/* Bottom Section (Reduced padding) */}
            <div className="p-2 mt-auto">
              <div className="rounded-2xl bg-white/20 dark:bg-black/20 p-2 border border-white/20 dark:border-white/5 space-y-1 flex items-center justify-center flex-col">
                {bottomItems.map((item) => (
                  <GlassNavItem
                    key={item.id}
                    item={item}
                    isActive={activeItem === item.id}
                    isCollapsed={isCollapsed}
                    onClick={() => setActiveItem(item.id)}
                    isSmall
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ==========================================================
          MOBILE BOTTOM NAV - FLOATING LIQUID PILL (Added small labels below icons)
      ========================================================== */}
      <nav className="lg:hidden fixed bottom-1 inset-x-0 mx-auto w-[98%] max-w-[98%] h-16 z-50
                      bg-white/30 dark:bg-black/40
                      backdrop-blur-3xl backdrop-saturate-200
                      border border-white/40 dark:border-white/10
                      rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.25)]
                      flex justify-between px-1 items-center overflow-hidden">
        {/* Top Gloss */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

        {mainNavItems.slice(0, 4).map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => setActiveItem(item.id)}
            className="relative z-10 flex-1 flex flex-col items-center justify-center h-full group"
          >
            <div
              className={`
              relative flex items-center justify-center w-10 h-8 rounded-md transition-all duration-300
              ${activeItem === item.id
                ? "bg-gradient-to-br from-white/80 to-white/40 dark:from-white/20 dark:to-white/5 shadow-md shadow-black/5"
                : "hover:bg-white/20"}
            `}
            >
              <item.icon
                className={`w-5 h-5 transition-all duration-300 ${
                  activeItem === item.id
                    ? "text-black dark:text-white stroke-[2px]"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              />
            </div>
            <span className="text-[12px] mt-0 font-semibold text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white">
              {item.label}
            </span>
          </Link>
        ))}
        {/* More Button */}
        <button
          onClick={() => setShowMobileDrawer(true)}
          className="relative z-10 flex-1 flex flex-col items-center justify-center h-full group"
        >
          <div
            className={`
              relative flex items-center justify-center w-10 h-8 rounded-full transition-all duration-300
              ${showMobileDrawer ? "bg-white/40 dark:bg-white/10 rotate-90" : "hover:bg-white/20"}
          `}
          >
            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
          <span className="text-[12px] font-semibold mt-0 text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white">
            More
          </span>
        </button>
      </nav>

      {/* ==========================================================
          MOBILE DRAWER - FULL GLASS SHEET (Smaller icons, less shadow, tighter gaps)
      ========================================================== */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-[4px] z-50 transition-all duration-500 lg:hidden ${
          showMobileDrawer ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setShowMobileDrawer(false)}
      />
      <div
        ref={drawerRef}
        className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-[40px]
                    bg-white/70 dark:bg-black/70
                    backdrop-blur-3xl backdrop-saturate-200
                    border-t border-white/50 dark:border-white/10
                    shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)]
                    transform transition-transform duration-500 cubic-bezier(0.19, 1, 0.22, 1)
                    lg:hidden max-h-[85vh] flex flex-col
                    ${showMobileDrawer ? "translate-y-0" : "translate-y-full"}
        `}
      >
        {/* Handle */}
        <div className="shrink-0 flex justify-center pt-5 pb-3 w-full cursor-pointer" onClick={() => setShowMobileDrawer(false)}>
          <div className="w-16 h-1.5 rounded-full bg-black/10 dark:bg-white/20 backdrop-blur-md" />
        </div>
        <div className="overflow-y-auto p-6 pb-12 space-y-6">
          {/* Apps Grid (Tighter gaps) */}
          <div className="animate-in slide-in-from-bottom-8 duration-500 delay-75">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2 px-1">
              <Sparkles className="text-purple-500" /> Explore
            </h3>
            <div className="grid grid-cols-5 sm:grid-cols-5 gap-y-4 gap-x-2">
              {[...mainNavItems, ...featureItems].map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => {
                    setActiveItem(item.id);
                    setShowMobileDrawer(false);
                  }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div
                    className={`
                    w-12 h-12 rounded-[20px] flex items-center justify-center text-2xl relative overflow-hidden transition-all duration-300
                    ${activeItem === item.id
                      ? "bg-gradient-to-br from-white to-gray-100 dark:from-zinc-800 dark:to-black shadow-md scale-105 border border-white/60 dark:border-zinc-700"
                      : "bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/5 hover:bg-white/40"}
                  `}
                  >
                    {/* Inner sheen */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                    <item.icon className={activeItem === item.id ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-400"} />
                  </div>
                  <span
                    className={`text-[11px] font-medium text-center ${activeItem === item.id ? "text-black dark:text-white font-bold" : "text-gray-500 dark:text-gray-400"}`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* System Menu (Tighter padding) */}
          <div className="bg-white/30 dark:bg-white/5 rounded-3xl p-2 border border-white/40 dark:border-white/5 backdrop-blur-md shadow-sm">
            {bottomItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="flex items-center justify-between p-3 hover:bg-white/40 dark:hover:bg-white/10 rounded-2xl transition-all group"
                onClick={() => setShowMobileDrawer(false)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/50 dark:bg-black/40 rounded-xl shadow-sm">
                    <item.icon size={18} className="text-gray-600 dark:text-gray-300" />
                  </div>
                  <span className="font-semibold text-sm text-gray-800 dark:text-white">{item.label}</span>
                </div>
                <ChevronRight className="text-gray-400" />
              </Link>
            ))}
            <div className="h-px bg-black/5 dark:bg-white/10 my-1 mx-4" />
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/50 dark:bg-black/40 rounded-xl shadow-sm">
                  <Moon size={18} className="text-gray-600 dark:text-gray-300" />
                </div>
                <span className="font-semibold text-sm text-gray-800 dark:text-white">Dark Mode</span>
              </div>
              <div className="w-12 h-7 bg-black/10 dark:bg-black/60 rounded-full relative p-1 transition-colors">
                <div className="w-5 h-5 bg-white rounded-full shadow-md transition-all dark:translate-x-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- GLASS NAV ITEM COMPONENT (Tighter height, subtler active icon styles) ---
const GlassNavItem = ({
  item,
  isActive,
  isCollapsed,
  onClick,
  isSmall = false,
}) => {
  const ICON_SIZE = isCollapsed ? 22 : 20;

  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`
        group relative flex items-center transition-all duration-300 cursor-pointer
        outline-none overflow-hidden
        ${isSmall ? "h-8" : "h-10"}
        ${
          isCollapsed
            ? "w-12 h-12 grid place-items-center rounded-2xl"
            : "px-3 w-full rounded-2xl"
        }
        ${
          isActive
            ? "bg-white/60 dark:bg-white/10 text-black dark:text-white shadow-sm border border-white/50 dark:border-white/5"
            : "text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
        }
      `}
    >
      {/* Active Sheen */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent dark:from-white/10 pointer-events-none" />
      )}

      {/* Icon */}
      <div className="relative z-10 flex items-center justify-center">
        <item.icon
          size={ICON_SIZE}
          strokeWidth={isActive ? 2 : 1.6}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Label */}
      {!isCollapsed && (
        <span
          className={`
            ml-3 relative z-10 whitespace-nowrap
            ${
              isSmall
                ? "text-xs font-medium"
                : "text-sm font-semibold"
            }
            ${isActive ? "font-bold" : ""}
          `}
        >
          {item.label}
        </span>
      )}

      {/* Tooltip */}
      {isCollapsed && (
        <div
          className="fixed left-24 z-50 px-4 py-2
                     bg-white/80 dark:bg-black/80 backdrop-blur-xl
                     text-black dark:text-white font-semibold
                     border border-white/40 dark:border-white/20
                     text-xs rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.12)]
                     opacity-0 invisible group-hover:opacity-100 group-hover:visible
                     transition-all duration-200 translate-x-4 group-hover:translate-x-0
                     pointer-events-none"
        >
          {item.label}
        </div>
      )}
    </Link>
  );
};



export default StickyNav;
