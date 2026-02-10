// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   MapPin, Link2, Calendar, BadgeCheck, Edit2, Plus, Camera, 
//   MoreHorizontal, X, Palette, Info, Mail,
//   EllipsisVertical
// } from 'lucide-react';
// import SocialIcons from './SocialIcons';
// import StatsSection from './StatsSection'; 
// import FollowButton from '../../../../Follow/FollowButton';

// const SidebarProfile = ({ 
//   profileData, 
//   isOwnProfile, 
//   currentUser, 
//   profileImage, 
//   handleProfileImageUpload,
//   stats,
//   viewedUserId
// }) => {
//   const [showDetails, setShowDetails] = useState(false);

//   return (
//     <>
//       <div className="flex flex-col relative px-2 md:px-0">
        
//         {/* 1. Avatar (Overlapping Cover) */}
//         {/* Negative margin pulls it up. Rounded-2xl matches screenshot square-ish look */}
//         <div className="relative -mt-16 md:-mt-24 mb-3 self-start group">
//           <div className="w-28 h-28 md:w-40 md:h-40 rounded-2xl border-4 border-white dark:border-zinc-950 bg-white dark:bg-zinc-900 overflow-hidden shadow-lg">
//             {profileImage ? (
//               <img 
//                 src={profileImage} 
//                 alt={profileData.username} 
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 text-4xl font-bold">
//                 {profileData.username?.charAt(0)}
//               </div>
//             )}
            
//             {/* Upload Overlay */}
//             {isOwnProfile && (
//               <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
//                  <Camera className="text-white" size={24} />
//                  <input type="file" className="hidden" accept="image/*" onChange={handleProfileImageUpload} />
//               </label>
//             )}
//           </div>
//         </div>

//         {/* 2. Username & Menu Row */}
//         <div className="flex items-start justify-between mb-1">
//            <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white leading-tight">
//                 {profileData.username}
//               </h1>
//               <div className="flex items-center gap-2 mt-1">
//                   <span className="text-sm text-zinc-500 font-medium">@{profileData.nickname}</span>
//                    <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />
//                    {/* {profileData.isVerified && */}
//               </div>
//            </div>
           
//            {/* THREE DOTS BUTTON */}
//            <button 
//              onClick={() => setShowDetails(true)}
//              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 transition-colors"
//            >
//               <EllipsisVertical size={20} />
//            </button>
//         </div>

//         {/* 3. Profession Tag (Only this stays outside) */}
//         {profileData.profession && (
//            <div className="mb-3">
//              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
//                {profileData.profession}
//              </span>
//            </div>
//         )}

//         {/* 4. Bio (Short) */}
//         {profileData.bio && (
//           <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4 line-clamp-3">
//               {profileData.bio}
//           </p>
//         )}

//         {/* 5. Stats Row (Text Based) */}
//         <div className="mb-6">
//            <StatsSection userId={isOwnProfile ? currentUser?.$id : viewedUserId} initialStats={stats} />
//         </div>

//         {/* 6. Action Buttons (Matching Screenshot) */}
//         <div className="flex flex-col gap-3">
//           {isOwnProfile ? (
//             // OWNER VIEW
//             <div className="grid grid-cols-2 gap-3">
//               <Link to="/account/edit_profile" className="w-full">
//                 <button className="w-full h-10 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
//                    <Edit2 size={14} /> Edit Profile
//                 </button>
//               </Link>
//               <Link to="/account/upload" className="w-full">
//                  <button className="w-full h-10 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-transparent text-zinc-900 dark:text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
//                   <Plus size={16} /> Post
//                 </button>
//               </Link>
//             </div>
//           ) : (
//              // VISITOR VIEW
//              <div className="flex flex-col gap-3">
//                <div className="grid grid-cols-2 gap-3">
//                  <button className="w-full h-10 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
//                     Message
//                  </button>
//                  <button onClick={() => setShowDetails(true)} className="w-full h-10 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
//                     More
//                  </button>
//                </div>
               
//                {/* Big Blue Follow Button */}
//                <FollowButton 
//                   targetUserId={viewedUserId} 
//                   className="w-full h-11 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
//                />
//              </div>
//           )}
//         </div>

//       </div>

//       {/* --- DETAILS POPUP (The "More" Section) --- */}
//       <AnimatePresence>
//         {showDetails && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//             <motion.div 
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//               onClick={() => setShowDetails(false)}
//             />
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.95, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
//             >
//               <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
//                  <h3 className="font-bold text-zinc-900 dark:text-white">Profile Details</h3>
//                  <button onClick={() => setShowDetails(false)}><X size={20} className="text-zinc-500" /></button>
//               </div>

//               <div className="p-6 space-y-6">
//                  {/* Socials moved here */}
//                  <div>
//                     <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Connect</h4>
//                     <SocialIcons profileData={profileData} />
//                  </div>

//                  <div className="space-y-4">
//                     {profileData.location && (
//                        <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
//                           <MapPin size={18} /> <span>{profileData.location}</span>
//                        </div>
//                     )}
//                     {profileData.portfolio && (
//                        <a href={profileData.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:underline">
//                           <Link2 size={18} /> <span>Website</span>
//                        </a>
//                     )}
//                     <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
//                         <Calendar size={18} /> 
//                         <span>Joined {new Date(profileData.$createdAt).toLocaleDateString()}</span>
//                     </div>
//                     {profileData.artStyle && (
//                        <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
//                           <Palette size={18} /> <span>{profileData.artStyle}</span>
//                        </div>
//                     )}
//                  </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default SidebarProfile;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Link2, Calendar, BadgeCheck, Edit2, Plus, Camera, 
  MoreHorizontal, X, Palette, Info, 
  EllipsisVertical,
  UserPen
} from 'lucide-react';
import SocialIcons from './SocialIcons';
import StatsSection from './StatsSection'; 
import FollowButton from '../../../../Follow/FollowButton';

const SidebarProfile = ({ 
  profileData, 
  isOwnProfile, 
  currentUser, 
  profileImage, 
  handleProfileImageUpload,
  stats,
  viewedUserId
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col relative px-2 md:px-0">
        
        {/* 1. AVATAR SECTION */}
        <div className="relative -mt-16 md:-mt-24 mb-3 self-start">
            
            {/* A. Profile Image (Click -> Lightbox) */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full lg:border-[5px] border-[3px] border-white dark:border-zinc-950 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden cursor-zoom-in relative z-10"
              onClick={() => setIsLightboxOpen(true)}
            >
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt={profileData.username} 
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 text-4xl font-bold">
                  {profileData.username?.charAt(0)}
                </div>
              )}
            </motion.div>

            {/* B. Edit Button (Bottom Right Corner, Always Visible) */}
            {isOwnProfile && (
              <label className="absolute bottom-1 right-1 z-20 cursor-pointer group">
                 {/* The Button Visuals */}
                 <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 lg:p-2.5 p-1.5 rounded-full lg:border-[4px] border-[2px] border-white dark:border-zinc-950 shadow-md transition-transform duration-200 group-hover:scale-110 group-active:scale-95 flex items-center justify-center">
                    <Camera size={18} />
                 </div>
                 {/* Hidden Input */}
                 <input 
                   type="file" 
                   className="hidden" 
                   accept="image/*" 
                   onChange={handleProfileImageUpload} 
                 />
              </label>
            )}
        </div>

        {/* 2. Username & Menu Row */}
        <div className="flex items-start justify-between mb-1">
           <div>
              <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white leading-tight">
                {profileData.username}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-zinc-500 font-medium">@{profileData.nickname}</span>
                   <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                   {/* {profileData.isVerified && */}
              </div>
           </div>
           
           {/* THREE DOTS BUTTON */}
           <button 
             onClick={() => setShowDetails(true)}
             className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 transition-colors"
           >
              <EllipsisVertical size={20} />
           </button>
        </div>

        {/* 3. Profession Tag */}
        {profileData.profession && (
           <div className="mb-3">
             <span className="text-xs font-semibold text-zinc-400 font-Quicksand border dark:border-gray-800 border-gray-400 px-1 py-0.5 rounded-md tracking-wider">
               {profileData.profession}
             </span>
           </div>
        )}

        {/* 4. Bio (Short) */}
        {profileData.bio && (
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4 line-clamp-3">
              {profileData.bio}
          </p>
        )}

        {/* 5. Stats Row */}
        <div className="mb-6">
           <StatsSection userId={isOwnProfile ? currentUser?.$id : viewedUserId} initialStats={stats} />
        </div>

        {/* 6. Action Buttons */}
        <div className="flex flex-col gap-3">
          {isOwnProfile ? (
            <div className="grid grid-cols-2 gap-3">
              <Link to="/account/edit_profile" className="w-full">
                <button className="w-full h-10 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                   <UserPen size={14} /> Edit Profile
                </button>
              </Link>
              <Link to="/account/upload" className="w-full">
                 <button className="w-full h-10 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-transparent text-zinc-900 dark:text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                  <Plus size={16} /> Post
                </button>
              </Link>
            </div>
          ) : (
             <div className="flex flex-col gap-3">
               <div className="grid grid-cols-2 gap-3">
                 <button className="w-full h-10 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    Message
                 </button>
                 <button onClick={() => setShowDetails(true)} className="w-full h-10 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    More
                 </button>
               </div>
               <FollowButton 
                  targetUserId={viewedUserId} 
                  className="w-full h-11 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
               />
             </div>
          )}
        </div>

      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {isLightboxOpen && profileImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl flex items-center justify-center  px-1 py-4 cursor-zoom-out "
            onClick={() => setIsLightboxOpen(false)}
          >
             <motion.img 
               initial={{ scale: 0.8, opacity: 0 }} 
               animate={{ scale: 1, opacity: 1 }} 
               exit={{ scale: 0.8, opacity: 0 }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               src={profileImage} 
               alt={profileData.username}
               className="max-w-full min-h-48 max-h-[90vh] object-contain md:rounded-2xl shadow-2xl border dark:border-zinc-600 border-zinc-600"
             />
             <button className="absolute top-6 right-6 p-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-700">
               <X size={24} />
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DETAILS POPUP (The "More" Section) --- */}
      <AnimatePresence>
        {showDetails && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowDetails(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
            >
              <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                 <h3 className="font-bold text-zinc-900 dark:text-white">Profile Details</h3>
                 <button onClick={() => setShowDetails(false)}><X size={20} className="text-zinc-500" /></button>
              </div>

              <div className="p-6 space-y-6">
                 <div>
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Connect</h4>
                    <SocialIcons profileData={profileData} />
                 </div>

                 <div className="space-y-4">
                    {profileData.location && (
                       <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                          <MapPin size={18} /> <span>{profileData.location}</span>
                       </div>
                    )}
                    {profileData.portfolio && (
                       <a href={profileData.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 hover:underline">
                          <Link2 size={18} /> <span>Website</span>
                       </a>
                    )}
                    <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                        <Calendar size={18} /> 
                        <span>Joined {new Date(profileData.$createdAt).toLocaleDateString()}</span>
                    </div>
                    {profileData.artStyle && (
                       <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                          <Palette size={18} /> <span>{profileData.artStyle}</span>
                       </div>
                    )}
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarProfile;