// import React, { useMemo } from 'react';
// import { 
//   TrendingUp, 
//   Sparkles, 
//   Filter,
//   Clock,
//   BarChart3,
//   Layers,
//   Plus,
// } from 'lucide-react';

// const CollectionHeader = ({ 
//   viewMode, 
//   setViewMode, 
//   feedType, 
//   setFeedType, 
//   showFilters, 
//   setShowFilters, 
//   categories, 
//   selectedCategories, 
//   setSelectedCategories 
// }) => {
//   const feedTypes = useMemo(() => [
//     { id: 'personalized', label: 'For You', icon: Sparkles },
//     { id: 'trending', label: 'Trending', icon: TrendingUp },
//     { id: 'recent', label: 'Latest', icon: Clock }
//   ], []);

//   const viewModes = useMemo(() => [
//     { id: 'feed', label: 'Feed', icon: BarChart3, description: 'Personalized art stream' },
//     { id: 'collage', label: 'Discover', icon: Layers, description: 'Smart visual collections' }
//   ], []);

//   const filterPanel = useMemo(() => {
//     if (!showFilters) return null;

//     return (
//       <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mt-3 shadow-xl">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">Filter Content</h3>
//             <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
//               Curate your discovery experience
//             </p>
//           </div>
//           <button 
//             onClick={() => setShowFilters(false)}
//             className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
//           >
//             <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 rotate-45" />
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-2 sm:gap-3">
//           {categories.map(category => (
//             <button
//               key={category.id}
//               onClick={() => {
//                 if (category.id === 'all') {
//                   setSelectedCategories(['all']);
//                 } else if (selectedCategories.includes(category.id)) {
//                   setSelectedCategories(prev => prev.length > 1 ? prev.filter(id => id !== category.id) : ['all']);
//                 } else {
//                   setSelectedCategories(prev => [...prev.filter(id => id !== 'all'), category.id]);
//                 }
//               }}
//               className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
//                 selectedCategories.includes(category.id) 
//                   ? `${category.color} text-white shadow-lg transform scale-105` 
//                   : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md'
//               }`}
//             >
//               {category.name}
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   }, [showFilters, categories, selectedCategories, setSelectedCategories]);

//   return (
//     <div className="sticky top-0 z-40 bg-white/95 dark:bg-[#000705]/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
//       <div className="px-3 sm:px-4 py-3 sm:py-4">
//         {/* Header Row */}
//         <div className="flex items-center justify-between mb-3 sm:mb-4">
//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
//               <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-600 dark:from-white dark:to-purple-400 bg-clip-text text-transparent">
//                 Discover
//               </h1>
//               <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
//                 {viewMode === 'collage' ? 'Smart visual collections' : 'Personalized art feed'}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 sm:gap-3">
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all duration-300 ${
//                 showFilters 
//                   ? 'bg-purple-500 text-white border-purple-500 shadow-lg' 
//                   : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:shadow-md'
//               }`}
//             >
//               <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
//             </button>
//           </div>
//         </div>

//         {/* View Mode Toggle */}
//         <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl p-1 shadow-inner mb-2">
//           {viewModes.map(mode => {
//             const Icon = mode.icon;
//             return (
//               <button
//                 key={mode.id}
//                 onClick={() => setViewMode(mode.id)}
//                 className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 flex-1 ${
//                   viewMode === mode.id 
//                     ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md' 
//                     : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
//                 }`}
//               >
//                 <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
//                 <span className="hidden xs:inline">{mode.label}</span>
//                 <span className="xs:hidden">{mode.label.charAt(0)}</span>
//               </button>
//             );
//           })}
//         </div>

//         {/* Feed Type Selector */}
//         <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
//           {feedTypes.map(feed => {
//             const Icon = feed.icon;
//             return (
//               <button
//                 key={feed.id}
//                 onClick={() => setFeedType(feed.id)}
//                 className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
//                   feedType === feed.id 
//                     ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105' 
//                     : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md'
//                 }`}
//               >
//                 <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
//                 {feed.label}
//               </button>
//             );
//           })}
//         </div>

//         {/* Filter Panel */}
//         {filterPanel}
//       </div>
//     </div>
//   );
// };

// export default CollectionHeader;


import React from 'react';
import { List, Grid3X3, Sparkles } from 'lucide-react';
import { MdGridView } from 'react-icons/md';
import { FiSlack } from 'react-icons/fi';

const CollectionHeader = ({ viewMode, setViewMode }) => {
  return (
    <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-80 mb-6">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Title */}
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Discover
            </h1>
          </div>

          {/* Simple Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('feed')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'feed'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {/* <List className="w-4 h-4" /> */}
              <MdGridView className=" w-4 h-4"/>
              Feed
            </button>
            <button
              onClick={() => setViewMode('collage')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'collage'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <FiSlack className="w-4 h-4" />
              Discover
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CollectionHeader;