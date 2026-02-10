// // StatsSection.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { UserPlus, UserCheck, LayoutGrid } from 'lucide-react';
// import FollowersList from './FollowerList';
// import { followService } from '../../../../Follow/FollowService';

// const StatsSection = ({ userId, collectionCount, onCountsUpdate = () => {} }) => {
//   const [stats, setStats] = useState({
//     followers: 0,
//     following: 0,
//     collections: collectionCount || 0,
//   });

//   const [showFollowers, setShowFollowers] = useState(false);
//   const [showFollowing, setShowFollowing] = useState(false);

//   useEffect(() => {
//     const loadStats = async () => {
//       if (!userId) return;

//       try {
//         const followCounts = await followService.getUserCounts(userId);

//         const newStats = {
//           followers: followCounts?.followers ?? 0,
//           following: followCounts?.following ?? 0,
//           collections: collectionCount || 0,
//         };

//         setStats(newStats);
//         onCountsUpdate(newStats);
//       } catch (err) {
//         console.error("Error loading stats:", err);
//       }
//     };

//     loadStats();
//   }, [userId, collectionCount, onCountsUpdate]);

//   const statItems = [
//     {
//       key: "followers",
//       label: "Followers",
//       value: stats.followers,
//       icon: UserPlus,
//       onClick: () => setShowFollowers(true),
//       showLabel: true,
//     },
//     {
//       key: "following",
//       label: "Following",
//       value: stats.following,
//       icon: UserCheck,
//       onClick: () => setShowFollowing(true),
//       showLabel: true,
//     },
//     {
//       key: "collections",
//       label: "Collections",
//       value: stats.collections,
//       icon: LayoutGrid,
//       onClick: null,
//       showLabel: false, // only icon + value
//     },
//   ];

//   return (
//     <>
//       <div className="mt-3 flex items-center gap-3 flex-wrap">
//         {statItems.map((stat) => {
//           const Icon = stat.icon;

//           return (
//             <motion.button
//               key={stat.key}
//               onClick={stat.onClick}
//               disabled={!stat.onClick}
//               whileHover={stat.onClick ? { scale: 1.03 } : {}}
//               whileTap={stat.onClick ? { scale: 0.97 } : {}}
//               className={`
//                 flex items-center gap-2 lg:px-3 lg:py-2 px-2 py-2
//                 rounded-lg
//                 bg-white/20 dark:bg-white/10
//                 border border-gray-300/40 dark:border-white/20
//                 backdrop-blur-md
//                 ${
//                   stat.onClick
//                     ? "cursor-pointer hover:bg-white/30 dark:hover:bg-white/20"
//                     : "cursor-default opacity-90"
//                 }
//                 transition-all duration-150
//               `}
//             >
//               <Icon
//                 size={12}
//                 className="text-gray-900 dark:text-gray-100"
//               />

//               <span className="text-sm font-semibold text-gray-900 dark:text-white">
//                 {stat.value}
//               </span>

//               {stat.showLabel && (
//                 <span className="text-xs text-gray-600 dark:text-gray-300">
//                   {stat.label}
//                 </span>
//               )}
//             </motion.button>
//           );
//         })}
//       </div>

//       {/* Modals */}
//       <FollowersList
//         userId={userId}
//         isOpen={showFollowers}
//         onClose={() => setShowFollowers(false)}
//         type="followers"
//       />

//       <FollowersList
//         userId={userId}
//         isOpen={showFollowing}
//         onClose={() => setShowFollowing(false)}
//         type="following"
//       />
//     </>
//   );
// };

// export default StatsSection;




import React, { useState } from 'react';
import FollowersList from './FollowerList';

const StatsSection = ({ userId, initialStats }) => {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  // Use props stats directly if available, fallback to 0
  const stats = initialStats || { followers: 0, following: 0, collections: 0 };

  return (
    <>
      <div className="flex items-center gap-6 py-2 border-y border-zinc-100 dark:border-zinc-800/50 my-2">
        
        {/* Following */}
        <button 
          onClick={() => setShowFollowing(true)}
          className="flex items-center gap-1.5 hover:opacity-70 transition-opacity group"
        >
          <span className="font-bold text-zinc-900 dark:text-white text-sm">
            {stats.following}
          </span>
          <span className="text-zinc-500 dark:text-zinc-400 text-sm">Following</span>
        </button>

        {/* Followers */}
        <button 
          onClick={() => setShowFollowers(true)}
          className="flex items-center gap-1.5 hover:opacity-70 transition-opacity group"
        >
          <span className="font-bold text-zinc-900 dark:text-white text-sm">
            {stats.followers}
          </span>
          <span className="text-zinc-500 dark:text-zinc-400 text-sm">Followers</span>
        </button>

        {/* Collections (Static) */}
        <div className="flex items-center gap-1.5">
           <span className="font-bold text-zinc-900 dark:text-white text-sm">
             {stats.collections}
           </span>
           <span className="text-zinc-500 dark:text-zinc-400 text-sm">Posts</span>
        </div>

      </div>

      {/* Modals */}
      <FollowersList
        userId={userId}
        isOpen={showFollowers}
        onClose={() => setShowFollowers(false)}
        type="followers"
      />

      <FollowersList
        userId={userId}
        isOpen={showFollowing}
        onClose={() => setShowFollowing(false)}
        type="following"
      />
    </>
  );
};

export default StatsSection;