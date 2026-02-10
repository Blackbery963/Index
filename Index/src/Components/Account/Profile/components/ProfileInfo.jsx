// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { MapPin, Edit2, Upload, User, Palette, Briefcase, Globe, X, MessageCircle } from 'lucide-react';
// // import SocialIcons from './SocialIcons';
// // import FollowButton from '../../../../Follow/FollowButton';

// // const ProfileInfo = ({ 
// //   profileData, 
// //   isOwnProfile, 
// //   currentUser, 
// //   viewedUserId, 
// //   profileImage, 
// //   handleProfileImageUpload 
// // }) => {
// //   const [isLightboxOpen, setIsLightboxOpen] = useState(false);

// //   return (
// //     <div className="relative max-w-6xl mx-auto px-2">
      
// //       {/* Container: Stacks on mobile, Row on Desktop */}
// //       <div className="flex flex-col md:flex-row gap-6 md:gap-8 -mt-16 md:-mt-20">
        
// //         {/* --- 1. PROFILE PICTURE (Left Aligned) --- */}
// //         <div className="flex-shrink-0 relative z-10">
// //           <div className="relative group inline-block">
// //             {/* Image Container */}
// //             <div className="w-28 h-28 md:w-40 md:h-40 rounded-2xl border-4 border-white dark:border-zinc-900 bg-white dark:bg-zinc-800 shadow-xl overflow-hidden relative">
// //               {profileImage ? (
// //                 <img
// //                   src={profileImage}
// //                   alt="Profile"
// //                   className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
// //                   onClick={() => setIsLightboxOpen(true)}
// //                 />
// //               ) : (
// //                 <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white">
// //                   <User className="text-4xl md:text-5xl" />
// //                 </div>
// //               )}
// //             </div>

// //             {/* Edit Button (Own Profile Only) */}
// //             {isOwnProfile && (
// //               <>
// //                 <label
// //                   htmlFor="upload"
// //                   className="absolute bottom-0 right-0 translate-x-2 translate-y-2 
// //                              bg-white dark:bg-zinc-700 p-2 rounded-full shadow-lg 
// //                              border border-gray-100 dark:border-zinc-600 cursor-pointer 
// //                              hover:bg-gray-50 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-200
// //                              transition-all duration-200 hover:scale-110 z-20"
// //                 >
// //                   <Edit2 size={14} />
// //                 </label>
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={handleProfileImageUpload}
// //                   className="hidden"
// //                   id="upload"
// //                 />
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* --- 2. INFO SECTION (Left Aligned) --- */}
// //         <div className="flex-1 pt-2 md:pt-20 pb-4">
          
// //           {/* Header Row: Name & Action Buttons */}
// //           <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            
// //             {/* User Identity */}
// //             <div className="text-left min-w-0">
// //               <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white font-Quicksand truncate">
// //                 {profileData.username || 'Username'}
// //               </h1>
// //               <h3 className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-medium mt-0.5">
// //                 @{profileData.nickname || 'nickname'}
// //               </h3>
// //             </div>

// //             {/* Action Buttons */}
// //             <div className="flex flex-wrap items-center gap-3 mt-2 lg:mt-0">
              
// //               {/* VISITOR VIEW: Follow + Message */}
// //               {!isOwnProfile && currentUser && (
// //                 <>
// //                   <FollowButton
// //                     currentUserId={currentUser.$id}
// //                     targetUserId={viewedUserId}
// //                     onFollowChange={(isFollowing) => console.log("Follow update", isFollowing)}
// //                   />
                  
// //                   {/* Message Button */}
// //                   <motion.button
// //                     className="px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 
// //                                bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 
// //                                hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors 
// //                                flex items-center gap-2 text-sm font-medium shadow-sm"
// //                     whileHover={{ scale: 1.02 }}
// //                     whileTap={{ scale: 0.98 }}
// //                     onClick={() => console.log("Navigate to chat")}
// //                   >
// //                     <MessageCircle size={16} />
// //                     <span>Message</span>
// //                   </motion.button>
// //                 </>
// //               )}

// //               {/* OWNER VIEW: Upload + Edit */}
// //               {isOwnProfile && (
// //                 <>
// //                   <Link to={'/account/upload'}>
// //                     <motion.button
// //                       className="px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black
// //                                  hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors
// //                                  flex items-center gap-2 text-sm font-bold shadow-sm"
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                     >
// //                       <Upload size={16} />
// //                       <span>Upload Art</span>
// //                     </motion.button>
// //                   </Link>

// //                   <Link to={'/account/Edit_profile'}>
// //                     <motion.button
// //                       className="px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-600 
// //                                  text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 
// //                                  transition-colors flex items-center gap-2 text-sm font-medium"
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                     >
// //                       <Edit2 size={16} />
// //                       <span>Edit Profile</span>
// //                     </motion.button>
// //                   </Link>
// //                 </>
// //               )}
// //             </div>
// //           </div>

// //           {/* Tags (Art Style / Profession) */}
// //           {(profileData.artStyle || profileData.profession) && (
// //             <div className="flex flex-wrap items-center gap-2 mt-4">
// //               {profileData.artStyle && (
// //                 <div className="inline-flex items-center px-2.5 py-1 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 rounded-md text-xs font-semibold border border-purple-100 dark:border-purple-500/20">
// //                   <Palette size={12} className="mr-1.5" />
// //                   {profileData.artStyle}
// //                 </div>
// //               )}
// //               {profileData.profession && (
// //                 <div className="inline-flex items-center px-2.5 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-md text-xs font-semibold border border-blue-100 dark:border-blue-500/20">
// //                   <Briefcase size={12} className="mr-1.5" />
// //                   {profileData.profession}
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* Bio */}
// //           <div className="mt-4 max-w-2xl text-left">
// //             <p className="text-gray-600 dark:text-zinc-400 text-[15px] leading-relaxed font-sans">
// //               {profileData.bio || 'This user has not added a bio yet.'}
// //             </p>
// //           </div>

// //           {/* Location & Portfolio Links */}
// //           <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
// //             {profileData.location && (
// //               <div className="flex items-center">
// //                 <MapPin size={14} className="mr-1.5 opacity-70" />
// //                 <span>{profileData.location}</span>
// //               </div>
// //             )}
// //             {profileData.portfolio && (
// //               <a
// //                 href={profileData.portfolio}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
// //               >
// //                 <Globe size={14} className="mr-1.5 opacity-70 group-hover:opacity-100" />
// //                 <span className="group-hover:underline">Portfolio</span>
// //               </a>
// //             )}
// //           </div>

// //           {/* Social Icons */}
// //           <div className="mt-5 flex justify-start">
// //             <SocialIcons profileData={profileData} />
// //           </div>
// //         </div>
// //       </div>

// //       {/* --- LIGHTBOX MODAL --- */}
// //       <AnimatePresence>
// //         {isLightboxOpen && profileImage && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             transition={{ duration: 0.2 }}
// //             className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[60] py-4 "
// //             onClick={() => setIsLightboxOpen(false)}
// //           >
// //             <motion.div
// //               initial={{ scale: 0.95, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               exit={{ scale: 0.95, opacity: 0 }}
// //               className="relative max-w-3xl w-full max-h-[90vh] flex justify-center items-center border border-gray-800 dark:border-gray-600"
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               <img
// //                 src={profileImage}
// //                 alt="Enlarged Profile"
// //                 className="w-auto h-auto max-w-full min-h-[400px] max-h-[85vh] object-cover rounded-lg shadow-2xl"
// //               />
// //               <button
// //                 onClick={() => setIsLightboxOpen(false)}
// //                 className="absolute -top-12 right-0 md:-right-12 p-2 text-white/70 hover:text-white transition-colors"
// //               >
// //                 <X size={32} />
// //               </button>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // };

// // export default ProfileInfo;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   MapPin, Edit2, Upload, User, Palette, Briefcase, Globe, X, MessageCircle, 
//   BadgeCheck, // Imported Verified Icon
//   UserPen
// } from 'lucide-react';
// import SocialIcons from './SocialIcons';
// import FollowButton from '../../../../Follow/FollowButton';

// const ProfileInfo = ({ 
//   profileData, 
//   isOwnProfile, 
//   currentUser, 
//   viewedUserId, 
//   profileImage, 
//   handleProfileImageUpload 
// }) => {
//   const [isLightboxOpen, setIsLightboxOpen] = useState(false);

//   return (
//     <div className="relative max-w-6xl mx-auto px-2">
      
//       {/* Container: Stacks on mobile, Row on Desktop */}
//       <div className="flex flex-col md:flex-row gap-6 md:gap-8 -mt-16 md:-mt-20">
        
//         {/* --- 1. PROFILE PICTURE (Left Aligned) --- */}
//         <div className="flex-shrink-0 relative z-10">
//           <div className="relative group inline-block">
//             {/* Image Container */}
//             <div className="w-28 h-28 md:w-40 md:h-40 rounded-2xl border-4 border-white dark:border-zinc-900 bg-white dark:bg-zinc-800 shadow-xl overflow-hidden relative">
//               {profileImage ? (
//                 <img
//                   src={profileImage}
//                   alt="Profile"
//                   className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
//                   onClick={() => setIsLightboxOpen(true)}
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white">
//                   <User className="text-4xl md:text-5xl" />
//                 </div>
//               )}
//             </div>

//             {/* Edit Button (Own Profile Only) */}
//             {isOwnProfile && (
//               <>
//                 <label
//                   htmlFor="upload"
//                   className="absolute bottom-0 right-0 translate-x-2 translate-y-2 
//                              bg-white dark:bg-zinc-700 p-2 rounded-full shadow-lg 
//                              border border-gray-100 dark:border-zinc-600 cursor-pointer 
//                              hover:bg-gray-50 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-200
//                              transition-all duration-200 hover:scale-110 z-20"
//                 >
//                 <Edit2 size={14} />
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleProfileImageUpload}
//                   className="hidden"
//                   id="upload"
//                 />
//               </>
//             )}
//           </div>
//         </div>

//         {/* --- 2. INFO SECTION (Left Aligned) --- */}
//         <div className="flex-1 pt-2 md:pt-20 pb-4">
          
//           {/* Header Row: Name & Action Buttons */}
//           <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            
//             {/* User Identity */}
//             <div className="text-left min-w-0">
              
//               {/* Username + Verified Badge Row */}
//               <div className="flex items-center gap-2">
//                 <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white font-Quicksand truncate max-w-[85%]">
//                   {profileData.username || 'Username'}
//                 </h1>
                
//                 {/* VERIFIED ICON */}
//                 {/* fill-blue-500 makes the body blue, text-white makes the checkmark white */}
//                 <BadgeCheck 
//                   className="w-6 h-6 md:w-7 md:h-7 text-white fill-blue-500 flex-shrink-0" 
//                 />
//               </div>

//               <h3 className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-medium mt-0.5">
//                 @{profileData.nickname || 'nickname'}
//               </h3>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-wrap items-center gap-3 mt-2 lg:mt-0">
              
//               {/* VISITOR VIEW: Follow + Message */}
//               {!isOwnProfile && currentUser && (
//                 <>
//                   <FollowButton
//                     currentUserId={currentUser.$id}
//                     targetUserId={viewedUserId}
//                     onFollowChange={(isFollowing) => console.log("Follow update", isFollowing)}
//                   />
                  
//                   {/* Message Button */}
//                   <motion.button
//                     className="px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 
//                                bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 
//                                hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors 
//                                flex items-center gap-2 text-sm font-medium shadow-sm"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => console.log("Navigate to chat")}
//                   >
//                     <MessageCircle size={16} />
//                     <span>Message</span>
//                   </motion.button>
//                 </>
//               )}

//               {/* OWNER VIEW: Upload + Edit */}
//               {isOwnProfile && (
//                 <>
//                   <Link to={'/account/upload'}>
//                     <motion.button
//                       className="px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black
//                                  hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors
//                                  flex items-center gap-2 text-sm font-bold shadow-sm"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <Upload size={16} />
//                       <span>Upload Art</span>
//                     </motion.button>
//                   </Link>

//                   <Link to={'/account/Edit_profile'}>
//                     <motion.button
//                       className="px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-600 
//                                  text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 
//                                  transition-colors flex items-center gap-2 text-sm font-medium"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <UserPen size={16} />
//                       <span>Edit Profile</span>
//                     </motion.button>
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Tags (Art Style / Profession) */}
//           {(profileData.artStyle || profileData.profession) && (
//             <div className="flex flex-wrap items-center gap-2 mt-4">
//               {profileData.artStyle && (
//                 <div className="inline-flex items-center px-2.5 py-1 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 rounded-md text-xs font-semibold border border-purple-100 dark:border-purple-500/20">
//                   <Palette size={12} className="mr-1.5" />
//                   {profileData.artStyle}
//                 </div>
//               )}
//               {profileData.profession && (
//                 <div className="inline-flex items-center px-2.5 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-md text-xs font-semibold border border-blue-100 dark:border-blue-500/20">
//                   <Briefcase size={12} className="mr-1.5" />
//                   {profileData.profession}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Bio */}
//           <div className="mt-4 max-w-2xl text-left">
//             <p className="text-gray-600 dark:text-zinc-400 text-[15px] leading-relaxed font-sans">
//               {profileData.bio || 'This user has not added a bio yet.'}
//             </p>
//           </div>

//           {/* Location & Portfolio Links */}
//           <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
//             {profileData.location && (
//               <div className="flex items-center">
//                 <MapPin size={14} className="mr-1.5 opacity-70" />
//                 <span>{profileData.location}</span>
//               </div>
//             )}
//             {profileData.portfolio && (
//               <a
//                 href={profileData.portfolio}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
//               >
//                 <Globe size={14} className="mr-1.5 opacity-70 group-hover:opacity-100" />
//                 <span className="group-hover:underline">Portfolio</span>
//               </a>
//             )}
//           </div>

//           {/* Social Icons */}
//           <div className="mt-5 flex justify-start">
//             <SocialIcons profileData={profileData} />
//           </div>
//         </div>
//       </div>

//       {/* --- LIGHTBOX MODAL --- */}
//       <AnimatePresence>
//         {isLightboxOpen && profileImage && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[60] py-4 "
//             onClick={() => setIsLightboxOpen(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className="relative max-w-3xl w-full max-h-[90vh] flex justify-center items-center border border-gray-800 dark:border-gray-600"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={profileImage}
//                 alt="Enlarged Profile"
//                 className="w-auto h-auto max-w-full min-h-[400px] max-h-[85vh] object-cover rounded-lg shadow-2xl"
//               />
//               <button
//                 onClick={() => setIsLightboxOpen(false)}
//                 className="absolute -top-12 right-0 md:-right-12 p-2 text-white/70 hover:text-white transition-colors"
//               >
//                 <X size={32} />
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ProfileInfo;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Globe, CheckCircle2, MessageCircle, Plus, PenSquare, 
  Link2, Briefcase, Sparkles, X, Camera 
} from 'lucide-react';
import SocialIcons from './SocialIcons'; // Assuming this exists
import FollowButton from '../../../../Follow/FollowButton';

const ProfileInfo = ({ 
  profileData, 
  isOwnProfile, 
  currentUser, 
  viewedUserId, 
  profileImage, 
  handleProfileImageUpload 
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div className="relative -mt-[60px] md:-mt-[80px] mb-6 flex flex-col md:flex-row items-end md:items-start gap-6">
        
        {/* --- 1. AVATAR SECTION --- */}
        <div className="relative group shrink-0 mx-auto md:mx-0">
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2rem] p-1 bg-white dark:bg-zinc-950 shadow-2xl">
            <div className="w-full h-full rounded-[1.7rem] overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
               {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                  onClick={() => setIsLightboxOpen(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-4xl font-bold">
                  {profileData?.username?.charAt(0) || "U"}
                </div>
              )}
              
              {/* Profile Hover Overlay (Desktop) */}
              {isOwnProfile && (
                 <label htmlFor="profile-upload" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="text-white" size={24} />
                 </label>
              )}
            </div>
          </div>
          
          {/* Mobile Upload Button (Visible only on mobile/touch) */}
          {isOwnProfile && (
            <label htmlFor="profile-upload" className="md:hidden absolute bottom-0 right-0 bg-zinc-900 dark:bg-white text-white dark:text-black p-2 rounded-full shadow-lg border-4 border-white dark:border-zinc-950 cursor-pointer">
              <Camera size={16} />
            </label>
          )}
          <input type="file" id="profile-upload" className="hidden" accept="image/*" onChange={handleProfileImageUpload} />
        </div>

        {/* --- 2. IDENTITY & ACTIONS --- */}
        <div className="flex-1 w-full text-center md:text-left pt-2 md:pt-[90px]">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            
            {/* Name Block */}
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  {profileData.username}
                </h1>
                {/* Verified Badge */}
                <CheckCircle2 size={22} className="text-blue-500 fill-blue-500/10" />
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg">@{profileData.nickname || 'username'}</p>
            </div>

            {/* Action Buttons Block */}
            <div className="flex items-center justify-center gap-3">
              {!isOwnProfile && currentUser ? (
                <>
                  <FollowButton 
                    currentUserId={currentUser.$id} 
                    targetUserId={viewedUserId} 
                    // Pass a custom class if your FollowButton supports it to match the theme
                  />
                  <button className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2">
                    <MessageCircle size={18} />
                    Message
                  </button>
                </>
              ) : isOwnProfile ? (
                 <>
                   <Link to="/account/upload" className="hidden sm:block">
                     <button className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-zinc-500/20">
                       <Plus size={18} /> Create
                     </button>
                   </Link>
                   <Link to="/account/edit_profile">
                     <button className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2">
                       <PenSquare size={18} /> Edit Profile
                     </button>
                   </Link>
                 </>
              ) : null}
            </div>
          </div>

          {/* --- 3. BIO & METADATA --- */}
          <div className="mt-6 max-w-2xl">
             {/* Profession Tags */}
             {(profileData.artStyle || profileData.profession) && (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
                  {profileData.profession && (
                    <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
                      <Briefcase size={12} /> {profileData.profession}
                    </span>
                  )}
                  {profileData.artStyle && (
                    <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-xs font-semibold text-purple-600 dark:text-purple-300 flex items-center gap-1.5">
                      <Sparkles size={12} /> {profileData.artStyle}
                    </span>
                  )}
                </div>
             )}

             {/* Bio Text */}
             <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed whitespace-pre-wrap">
               {profileData.bio || "No bio yet."}
             </p>

             {/* Links Row */}
             <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
               {profileData.location && (
                 <div className="flex items-center gap-1.5">
                   <MapPin size={16} className="text-zinc-400" />
                   {profileData.location}
                 </div>
               )}
               {profileData.portfolio && (
                 <a href={profileData.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                   <Link2 size={16} className="text-zinc-400" />
                   {new URL(profileData.portfolio).hostname}
                 </a>
               )}
               {/* Insert Social Icons Here - We keep them inline */}
               <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 mx-2 hidden sm:block"></div>
               <SocialIcons profileData={profileData} />
             </div>
          </div>
        </div>
      </div>

      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {isLightboxOpen && profileImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={profileImage}
              alt="Full Size"
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
            />
            <button className="absolute top-5 right-5 p-2 bg-zinc-800 rounded-full text-white hover:bg-zinc-700">
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileInfo;