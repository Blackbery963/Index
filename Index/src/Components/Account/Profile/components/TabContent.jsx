// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MapPin, Palette, Globe } from 'lucide-react';
// import Your_Collections from '../../Your_Collection/Your_Collections';

// const TabContent = ({ activeTab, isOwnProfile, currentUser, viewedUserId, profileData }) => {
//   const tabVariants = {
//     hidden: { opacity: 0, y: 8 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
//   };

//   return (
//     <div className="mt-4">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={activeTab}
//           variants={tabVariants}
//           initial="hidden"
//           animate="visible"
//           exit="hidden"
//         >
//           {activeTab === 'collections' && (
//             <div>
//               {/* <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 font-Eagle">
//                 {isOwnProfile ? 'Your Collections' : 'Collections'}
//               </h3> */}
//               <Your_Collections userId={isOwnProfile ? currentUser?.$id : viewedUserId} />
//             </div>
//           )}

//           {activeTab === 'about' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white font-Quicksand">About</h3>
//                 <p className="text-gray-600 dark:text-gray-400 font-Playfair text-[15px] leading-relaxed">
//                   {profileData.bio || 'No bio information available.'}
//                 </p>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white font-Quicksand">Details</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/60 dark:border-gray-700/60">
//                     <MapPin size={16} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
//                     <div>
//                       <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Location</span>
//                       <p className="text-sm text-gray-700 dark:text-gray-300">
//                         {profileData.location || 'Not specified'}
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/60 dark:border-gray-700/60">
//                     <Palette size={16} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
//                     <div>
//                       <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Art Style</span>
//                       <p className="text-sm text-gray-700 dark:text-gray-300">
//                         {profileData.artStyle || 'Not specified'}
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/60 dark:border-gray-700/60">
//                     <Globe size={16} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
//                     <div>
//                       <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Portfolio</span>
//                       {profileData.portfolio ? (
//                         <a
//                           href={profileData.portfolio}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-sm text-purple-600 dark:text-purple-400 hover:underline block"
//                         >
//                           View Portfolio
//                         </a>
//                       ) : (
//                         <p className="text-sm text-gray-700 dark:text-gray-300">Not specified</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default TabContent;





import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Palette, Globe, Info } from 'lucide-react';
import Your_Collections from '../../Your_Collection/Your_Collections';

const TabContent = ({ activeTab, isOwnProfile, currentUser, viewedUserId, profileData }) => {
  return (
    <div className="min-h-[400px]">
      <AnimatePresence mode="wait">
        
        {/* COLLECTIONS GRID */}
        {activeTab === 'collections' && (
          <motion.div
            key="collections"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
             <Your_Collections userId={isOwnProfile ? currentUser?.$id : viewedUserId} />
          </motion.div>
        )}

        {/* ABOUT CARD */}
        {activeTab === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6"
          >
            <div className="flex items-center gap-2 mb-4 text-zinc-900 dark:text-white font-bold text-lg">
                <Info size={20} className="text-blue-500" />
                <h3>Profile Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Extended Bio</span>
                   <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-7 whitespace-pre-wrap">
                     {profileData.bio || "No additional information provided."}
                   </p>
                </div>

                <div className="space-y-3">
                   <DetailRow icon={Palette} label="Art Style" value={profileData.artStyle} />
                   <DetailRow icon={MapPin} label="Location" value={profileData.location} />
                   <DetailRow icon={Globe} label="Website" value={profileData.portfolio} isLink />
                </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DetailRow = ({ icon: Icon, label, value, isLink }) => {
    if (!value) return null;
    return (
        <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
                <Icon size={16} className="text-zinc-400" />
                <span className="text-sm font-medium text-zinc-500">{label}</span>
            </div>
            {isLink ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 hover:underline truncate max-w-[150px]">
                    Link ↗
                </a>
            ) : (
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{value}</span>
            )}
        </div>
    )
}

export default TabContent;