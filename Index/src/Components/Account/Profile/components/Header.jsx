// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Menu, Edit3, LayoutDashboard, LogOut } from 'lucide-react';

// // const Header = ({ 
// //   isOwnProfile, 
// //   profileData, 
// //   isDropdownOpen, 
// //   setIsDropdownOpen, 
// //   dropdownRef, 
// //   handleMouseEnter, 
// //   handleMouseLeave, 
// //   toggleDropdown, 
// //   handleLogout,
// //   isMenuOpen,
// //   setIsMenuOpen 
// // }) => {
// //   return (
// //     <header className="w-full py-2 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-lg flex items-center justify-between px-6 z-50 fixed border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm">
// //       <div className="flex items-center gap-3">
// //         {/* <button
// //           className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-all duration-200"
// //           onClick={() => setIsMenuOpen(!isMenuOpen)}
// //         >
// //           <Menu className="text-xl text-gray-700 dark:text-gray-300" />
// //         </button> */}
// //         <Link to={'/'}>
// //           <h1 className="font-Eagle font-bold lg:text-2xl text-xl text-[#001F3F] dark:text-white tracking-tight">
// //             Painters' Diary
// //           </h1>
// //         </Link>        
// //       </div>

// //       {isOwnProfile && (
// //         <div
// //           className="relative group"
// //           ref={dropdownRef}
// //           onMouseEnter={handleMouseEnter}
// //           onMouseLeave={handleMouseLeave}
// //         >
// //           <button
// //             className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
// //             onClick={toggleDropdown}
// //           >
// //             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium shadow-sm">
// //               {profileData?.username?.charAt(0)?.toUpperCase() || 'U'}
// //             </div>
// //             <span className="hidden md:inline text-gray-700 dark:text-gray-300 font-medium font-Playfair text-sm">
// //               {profileData?.username || 'User'}
// //             </span>
// //           </button>

// //           <AnimatePresence>
// //             {isDropdownOpen && (
// //               <motion.div
// //                 initial={{ opacity: 0, y: 8, scale: 0.95 }}
// //                 animate={{ opacity: 1, y: 0, scale: 1 }}
// //                 exit={{ opacity: 0, y: 8, scale: 0.95 }}
// //                 className="absolute top-full right-0 mt-2 w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-lg z-50 overflow-hidden"
// //               >
// //                 <Link to={'/account/edit_profile'}>
// //                   <button
// //                     className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 flex items-center gap-3 text-sm transition-all duration-200 border-b border-gray-100 dark:border-gray-700/60"
// //                     onClick={() => setIsDropdownOpen(false)}
// //                   >
// //                     <Edit3 size={16} />
// //                     Edit Profile
// //                   </button>
// //                 </Link>

// //                 <Link to={'/account/dashboard'}>
// //                   <button
// //                     className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 flex items-center gap-3 text-sm transition-all duration-200 border-b border-gray-100 dark:border-gray-700/60"
// //                     onClick={() => setIsDropdownOpen(false)}
// //                   >
// //                     <LayoutDashboard size={16} />
// //                     Dashboard
// //                   </button>
// //                 </Link>

// //                 <button
// //                   className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/80 text-red-600 dark:text-red-400 flex items-center gap-3 text-sm transition-all duration-200"
// //                   onClick={handleLogout}
// //                 >
// //                   <LogOut size={16} />
// //                   Logout
// //                 </button>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //         </div>
// //       )}
// //     </header>
// //   );
// // };

// // export default Header;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, Edit3, LayoutDashboard, LogOut, ChevronDown, User, ChartColumnIncreasing, UserPen, SlidersHorizontal } from 'lucide-react';

// const Header = ({ 
//   isOwnProfile, 
//   profileData, 
//   isDropdownOpen, 
//   setIsDropdownOpen, 
//   dropdownRef, 
//   handleMouseEnter, 
//   handleMouseLeave, 
//   toggleDropdown, 
//   handleLogout,
//   isMenuOpen,
//   setIsMenuOpen 
// }) => {
//   return (
//     <header 
//       className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20
//                  bg-white/70 dark:bg-zinc-950/70 
//                  backdrop-blur-2xl backdrop-saturate-150
//                  border-b border-white/20 dark:border-white/5
//                  shadow-sm dark:shadow-none transition-all duration-300"
//     >
//       <div className="max-w-[1920px] mx-auto px-4 md:px-8 h-full flex items-center justify-between relative">
        
//         {/* Top Gloss Highlight (Subtle) */}
//         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />

//         {/* --- LEFT: LOGO --- */}
//         <div className="flex items-center gap-4">
//           {/* Mobile Menu Toggle (Optional if you need it) */}
//           {/* <button
//             className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <Menu size={22} />
//           </button> */}

//           <Link to={'/'} className="group flex items-center gap-2">
//              {/* Optional: Add a small logo icon here if you have one */}
//             <h1 className="font-Eagle font-bold text-xl md:text-2xl tracking-tight 
//                            text-zinc-900 dark:text-white 
//                            group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600
//                            transition-all duration-300 cursor-pointer">
//               Painters' Diary
//             </h1>
//           </Link>        
//         </div>

//         {/* --- RIGHT: PROFILE DROPDOWN --- */}
//         {isOwnProfile && (
//           <div
//             className="relative"
//             ref={dropdownRef}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             {/* Trigger Pill */}
//             <button
//               className={`
//                 flex items-center gap-3 pl-1 pr-3 py-1 rounded-full border transition-all duration-300
//                 ${isDropdownOpen 
//                   ? "bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/20" 
//                   : "bg-transparent border-transparent hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/5 dark:hover:border-white/10"
//                 }
//               `}
//               onClick={toggleDropdown}
//             >
//               {/* Avatar Circle */}
//               <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px] shadow-sm">
//                 {profileData?.profileImage ? (
//                    <img 
//                     src={profileData.profileImage} 
//                     alt="User" 
//                     className="w-full h-full rounded-full object-cover bg-white dark:bg-zinc-900"
//                    />
//                 ) : (
//                   <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-700 dark:text-zinc-200 text-sm font-bold">
//                     {profileData?.username?.charAt(0)?.toUpperCase() || <User size={14}/>}
//                   </div>
//                 )}
//               </div>

//               {/* Name & Icon */}
//               <div className="hidden md:flex items-center gap-2">
//                 <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 max-w-[100px] truncate">
//                   {profileData?.username || 'Artist'}
//                 </span>
//                 <ChevronDown 
//                   size={14} 
//                   className={`text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
//                 />
//               </div>
//             </button>

//             {/* Dropdown Menu */}
//             <AnimatePresence>
//               {isDropdownOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' }}
//                   animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
//                   exit={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' }}
//                   transition={{ duration: 0.2, ease: "easeOut" }}
//                   className="absolute top-full right-0 mt-2 w-64 p-2
//                              bg-white/80 dark:bg-zinc-900/90 
//                              backdrop-blur-2xl backdrop-saturate-150 
//                              border border-white/40 dark:border-white/10 
//                              rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden origin-top-right"
//                 >
//                   {/* Dropdown Header Info (Mobile Mostly) */}
//                   <div className="px-3 py-2 mb-2 border-b border-gray-100 dark:border-white/5 md:hidden">
//                     <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
//                       {profileData?.username || 'User'}
//                     </p>
//                     <p className="text-xs text-zinc-500 truncate">
//                       {profileData?.email || 'Logged in'}
//                     </p>
//                   </div>

//                   {/* Menu Items */}
//                   <div className="space-y-1">
//                     <Link to={'/account/edit_profile'}>
//                       <MenuItem icon={UserPen} label="Edit Profile" onClick={() => setIsDropdownOpen(false)} />
//                     </Link>

//                     <Link to={'/account/dashboard'}>
//                       <MenuItem icon={ChartColumnIncreasing} label="Dashboard" onClick={() => setIsDropdownOpen(false)} />
//                     </Link>

//                     <Link to={'/studio-manager'}>
//                       <MenuItem icon={SlidersHorizontal} label="Studio-Manager" onClick={() => setIsDropdownOpen(false)} />
//                     </Link>

//                     <div className="my-1 h-px bg-gray-200 dark:bg-white/10 mx-2" />

//                     <button
//                       className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
//                                  text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:text-red-400"
//                       onClick={handleLogout}
//                     >
//                       <LogOut size={16} />
//                       Logout
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// // --- Helper Component for Menu Items ---
// const MenuItem = ({ icon: Icon, label, onClick }) => (
//   <button
//     className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
//                text-zinc-700 dark:text-zinc-300 
//                hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
//     onClick={onClick}
//   >
//     <Icon size={16} className="opacity-70" />
//     {label}
//   </button>
// );

// export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, ChevronDown, User, ChartBar, 
  Settings, PenTool, LayoutGrid, 
  UserPen,
  ChartColumnIncreasing,
  SlidersHorizontalIcon
} from 'lucide-react';
import Logo from "../../../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg"

const Header = ({ 
  isOwnProfile, 
  profileData, 
  isDropdownOpen, 
  setIsDropdownOpen, 
  dropdownRef, 
  toggleDropdown, 
  handleLogout 
}) => {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 h-16 
                 bg-white/80 dark:bg-zinc-950/80 
                 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800
                 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        
        {/* --- LEFT: LOGO --- */}
        <Link to={'/'} className="group flex items-center gap-2 select-none">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-bold font-serif text-lg overflow-hidden">
                <img src={Logo} alt="" />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white font-Eagle">
              Painters'Diary
            </h1>
        </Link>

        {/* --- RIGHT: PROFILE MENU --- */}
        {isOwnProfile && (
          <div className="relative" ref={dropdownRef}>
            <button
              className={`
                flex items-center gap-3 pl-1.5 pr-3 py-1.5 rounded-full border transition-all duration-200
                ${isDropdownOpen 
                  ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700" 
                  : "bg-transparent border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900"
                }
              `}
              onClick={toggleDropdown}
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-zinc-900 overflow-hidden shadow-sm">
                {profileData?.profileImage ? (
                   <img src={profileData.profileImage} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <User size={14} className="text-zinc-400"/>
                  </div>
                )}
              </div>

              {/* Name & Icon */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 max-w-[120px] truncate md:block hidden">
                  {profileData?.username || 'Artist'}
                </span>
                <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Dropdown Panel */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }} // smooth bezier
                  className="absolute top-full right-0 mt-2 w-64 p-1.5
                             bg-white dark:bg-zinc-900 
                             border border-zinc-200 dark:border-zinc-800 
                             rounded-2xl shadow-xl shadow-zinc-200/50 dark:shadow-black/50 overflow-hidden origin-top-right"
                >
                  <div className="px-3 py-3 mb-1 border-b border-zinc-100 dark:border-zinc-800">
                    <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                      {profileData?.username}
                    </p>
                    <p className="text-xs text-zinc-500 truncate mt-0.5">
                      {profileData?.email || 'Logged in'}
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <DropdownItem to="/account/dashboard" icon={ChartColumnIncreasing} label="Dashboard" onClick={() => setIsDropdownOpen(false)} />
                    <DropdownItem to="/studio-manager" icon={SlidersHorizontalIcon} label="Studio Manager" onClick={() => setIsDropdownOpen(false)} />
                    <DropdownItem to="/account/edit_profile" icon={UserPen} label="Edit Profile" onClick={() => setIsDropdownOpen(false)} />
                    
                    <div className="my-1.5 h-px bg-zinc-100 dark:bg-zinc-800 mx-2" />
                    
                    <button
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />
                      Log Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </header>
  );
};

const DropdownItem = ({ to, icon: Icon, label, onClick }) => (
  <Link to={to} onClick={onClick}>
    <div className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
      <Icon size={16} className="text-zinc-400 group-hover:text-zinc-600" />
      {label}
    </div>
  </Link>
);

export default Header;