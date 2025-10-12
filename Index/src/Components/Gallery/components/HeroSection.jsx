// import { motion, AnimatePresence } from 'framer-motion';
// import { FaSearch } from 'react-icons/fa';
// import bg from '../pexels-scottwebb-305821.jpg'; // Adjust path as needed

// const HeroSection = ({
//   searchTerm,
//   setSearchTerm,
//   suggestions,
//   handleSuggestionClick,
//   filteredMedia,
//   filter,
//   setFilter
// }) => {
//   const filterOptions = [
//     { key: 'all', label: 'All', description: 'All content' },
//     { key: 'user', label: 'Users', description: 'User uploads only' },
//     { key: 'featured', label: 'Featured', description: 'Pexels content' },
//     { key: 'videos', label: 'Videos', description: 'Videos only' }
//   ];

//   const dropdownVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
//   };

//   return (
//     <section
//       className="relative flex items-center justify-center min-h-screen bg-center bg-cover px-4 py-20"
//       style={{ backgroundImage: `url(${bg})` }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/20"></div>
      
//       {/* Content */}
//       <div className="relative max-w-3xl w-full text-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 shadow-xl">
//         {/* Main Heading */}
//         <h1 className="font-Quicksand text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
//           Palette of Dreams: 
//           <span className="block mt-1 text-green-600 dark:text-green-400">
//             A Showcase of Artistic Brilliance
//           </span>
//         </h1>
        
//         {/* Subtitle */}
//         <p className="mt-5 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
//           From stunning landscapes to abstract wonders, each brushstroke tells a story—
//           a celebration of art's beauty and deep connection to the human spirit.
//         </p>

//         {/* Search Section */}
//         <div className="mt-8 flex flex-col items-center gap-3">
//           {/* Search Input */}
//           <div className="relative w-full max-w-md group">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search paintings, artists, videos, or tags..."
//               className="w-full rounded-full px-5 py-3 border border-gray-300 dark:border-gray-600 
//                 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white 
//                 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200
//                 placeholder-gray-500 dark:placeholder-gray-400"
//             />
//             <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-green-500 transition-colors" />
            
//             {/* Search Suggestions */}
//             <AnimatePresence>
//               {suggestions.length > 0 && (
//                 <motion.ul
//                   className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border 
//                     border-gray-300 dark:border-gray-600 rounded-xl shadow-lg mt-2 z-50 overflow-hidden"
//                   variants={dropdownVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="hidden"
//                 >
//                   {suggestions.map((suggestion, index) => (
//                     <li
//                       key={index}
//                       className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
//                       onClick={() => handleSuggestionClick(suggestion)}
//                     >
//                       {suggestion}
//                     </li>
//                   ))}
//                 </motion.ul>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Search Results Count */}
//           {searchTerm && (
//             <div className="text-sm text-gray-700 dark:text-gray-400">
//               Found <span className="font-medium text-green-600">{filteredMedia.length}</span> {filteredMedia.length === 1 ? 'result' : 'results'}
//             </div>
//           )}

//           {/* Filter Buttons */}
//           <div className="mt-4 flex flex-wrap justify-center gap-2">
//             {filterOptions.map((option) => (
//               <button
//                 key={option.key}
//                 onClick={() => setFilter(option.key)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//                   filter === option.key
//                     ? 'bg-blue-500 text-white shadow-md'
//                     : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
//                 }`}
//                 title={option.description}
//               >
//                 {option.label}
//               </button>
//             ))}
//           </div>

//           {/* Active Filter Info */}
//           <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
//             {filterOptions.find(opt => opt.key === filter)?.description}
//           </div>
//         </div>

//         {/* Stats Section (Optional) */}
//         <div className="mt-8 grid grid-cols-3 gap-4 text-center">
//           <div>
//             <div className="text-2xl font-bold text-green-600 dark:text-green-400">
//               {filteredMedia.length}
//             </div>
//             <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
//               Items
//             </div>
//           </div>
//           <div>
//             <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//               {filteredMedia.filter(item => item.type === 'video').length}
//             </div>
//             <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
//               Videos
//             </div>
//           </div>
//           <div>
//             <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
//               {filteredMedia.filter(item => item.isFeatured).length}
//             </div>
//             <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
//               Featured
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import bg from '../pexels-scottwebb-305821.jpg';

const HeroSection = ({
  searchTerm,
  setSearchTerm,
  suggestions,
  handleSuggestionClick,
  filteredMedia
}) => {
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-center bg-cover px-4 py-20"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative max-w-3xl w-full text-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 shadow-xl">
        {/* Main Heading */}
        <h1 className="font-Quicksand text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Palette of Dreams: 
          <span className="block mt-1 text-green-600 dark:text-green-400">
            A Showcase of Artistic Brilliance
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          From stunning landscapes to abstract wonders, each brushstroke tells a story—
          a celebration of art's beauty and deep connection to the human spirit.
        </p>

        {/* Search Section */}
        <div className="mt-8 flex flex-col items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full max-w-md group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search paintings, videos, or tags..."
              className="w-full rounded-full px-5 py-3 border border-gray-300 dark:border-gray-600 
                bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white 
                focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200
                placeholder-gray-500 dark:placeholder-gray-400"
            />
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-green-500 transition-colors" />
            
            {/* Search Suggestions */}
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.ul
                  className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border 
                    border-gray-300 dark:border-gray-600 rounded-xl shadow-lg mt-2 z-50 overflow-hidden"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Search Results Count */}
          {searchTerm && (
            <motion.div 
              className="text-sm text-gray-700 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              Found <span className="font-medium text-green-600">{filteredMedia.length}</span> {filteredMedia.length === 1 ? 'result' : 'results'}
            </motion.div>
          )}
        </div>

        {/* Quick Stats - Simplified */}
        {!searchTerm && (
          <motion.div 
            className="mt-6 grid grid-cols-3 gap-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {filteredMedia.length.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Total Items
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {filteredMedia.filter(item => item.type === 'video').length.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Videos
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {filteredMedia.filter(item => item.isFeatured).length.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Featured
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;