// import { motion } from 'framer-motion';

// const FilterButtons = ({ filter, setFilter, filteredMedia }) => {
//   const filterOptions = [
//     { 
//       key: 'all', 
//       label: 'All', 
//       description: 'All content',
//       icon: '🔄'
//     },
//     { 
//       key: 'user', 
//       label: 'Users', 
//       description: 'User uploads only',
//       icon: '👤'
//     },
//     { 
//       key: 'featured', 
//       label: 'Featured', 
//       description: 'Pexels content',
//       icon: '⭐'
//     },
//     { 
//       key: 'videos', 
//       label: 'Videos', 
//       description: 'Videos only',
//       icon: '🎥'
//     }
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.4,
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1 }
//   };

//   return (
//     <motion.div 
//       className="w-full bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-gray-700 py-4 shadow-sm"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Filter Buttons */}
//         <div className="flex flex-wrap justify-center gap-3 mb-3">
//           {filterOptions.map((option) => (
//             <motion.button
//               key={option.key}
//               onClick={() => setFilter(option.key)}
//               className={`
//                 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
//                 transition-all duration-200 border transform hover:scale-105
//                 ${filter === option.key
//                   ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25'
//                   : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
//                 }
//               `}
//               variants={itemVariants}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <span className="text-base">{option.icon}</span>
//               <span>{option.label}</span>
//             </motion.button>
//           ))}
//         </div>

//         {/* Active Filter Info and Stats */}
//         <motion.div 
//           className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600 dark:text-gray-400"
//           variants={itemVariants}
//         >
//           <div className="text-center">
//             <span className="font-semibold text-green-600 dark:text-green-400">
//               {filteredMedia.length}
//             </span>{' '}
//             items total
//           </div>
          
//           <div className="text-center">
//             <span className="font-semibold text-blue-600 dark:text-blue-400">
//               {filteredMedia.filter(item => item.type === 'video').length}
//             </span>{' '}
//             videos
//           </div>
          
//           <div className="text-center">
//             <span className="font-semibold text-purple-600 dark:text-purple-400">
//               {filteredMedia.filter(item => item.isFeatured).length}
//             </span>{' '}
//             featured
//           </div>
          
//           <div className="text-center">
//             <span className="font-semibold text-orange-600 dark:text-orange-400">
//               {filteredMedia.filter(item => !item.isFeatured).length}
//             </span>{' '}
//             user uploads
//           </div>

//           {/* Active Filter Description */}
//           <div className="text-center px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
//             {filterOptions.find(opt => opt.key === filter)?.description}
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default FilterButtons;



import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, User, Star, Video, CheckCircle2 } from 'lucide-react';

const FilterButtons = ({ filter, setFilter, filteredMedia }) => {
  const filterOptions = [
    { key: 'all', label: 'All', icon: LayoutGrid },
    { key: 'user', label: 'Users', icon: User },
    { key: 'featured', label: 'Featured', icon: Star },
    { key: 'videos', label: 'Videos', icon: Video },
  ];

  return (
    <div className="w-full bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-gray-800 top-0 z-10">
      <div className="sm:max-w-7xl max-w-[98%] mx-auto px-1 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Filter Pills */}
        <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-x-auto scrollbar-hide w-full sm:w-auto">
          {filterOptions.map((option) => {
            const isActive = filter === option.key;
            const Icon = option.icon;

            return (
              <button
                key={option.key}
                onClick={() => setFilter(option.key)}
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
                  ${isActive 
                    ? 'text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-zinc-800'
                  }
                `}
              >
                {/* Active Background Slide Animation */}
                {isActive && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-blue-600 dark:bg-blue-600 rounded-lg shadow-sm"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Content (z-index ensures it sits on top of the motion div) */}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={16} strokeWidth={2.5} />
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Compact Stats / Context */}
        <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
           <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2"
            >
              <span className="flex items-center justify-center w-6 h-6 bg-gray-100 dark:bg-zinc-800 rounded-full text-gray-900 dark:text-white">
                {filteredMedia.length}
              </span>
              <span>
                {filter === 'all' && 'Total Items'}
                {filter === 'user' && 'User Uploads'}
                {filter === 'featured' && 'Featured Items'}
                {filter === 'videos' && 'Videos Found'}
              </span>
            </motion.div>
          </AnimatePresence>
          
          <div className="hidden sm:block h-4 w-px bg-gray-300 dark:bg-zinc-700 mx-2" />
          
          {/* <div className="hidden sm:flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
            <CheckCircle2 size={14} />
            <span>Live Sync</span>
          </div> */}
        </div>

      </div>
    </div>
  );
};

export default FilterButtons;