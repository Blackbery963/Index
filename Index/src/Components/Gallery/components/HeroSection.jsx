// import { motion, AnimatePresence } from 'framer-motion';
// import { FaSearch } from 'react-icons/fa';
// import bg from '../pexels-scottwebb-305821.jpg';

// const HeroSection = ({
//   searchTerm,
//   setSearchTerm,
//   suggestions,
//   handleSuggestionClick,
//   filteredMedia
// }) => {
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
//               placeholder="Search paintings, videos, or tags..."
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
//             <motion.div 
//               className="text-sm text-gray-700 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//             >
//               Found <span className="font-medium text-green-600">{filteredMedia.length}</span> {filteredMedia.length === 1 ? 'result' : 'results'}
//             </motion.div>
//           )}
//         </div>

//         {/* Quick Stats - Simplified */}
//         {!searchTerm && (
//           <motion.div 
//             className="mt-6 grid grid-cols-3 gap-4 text-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             <div>
//               <div className="text-lg font-bold text-green-600 dark:text-green-400">
//                 {filteredMedia.length.toLocaleString()}
//               </div>
//               <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
//                 Total Items
//               </div>
//             </div>
//             <div>
//               <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
//                 {filteredMedia.filter(item => item.type === 'video').length.toLocaleString()}
//               </div>
//               <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
//                 Videos
//               </div>
//             </div>
//             <div>
//               <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
//                 {filteredMedia.filter(item => item.isFeatured).length.toLocaleString()}
//               </div>
//               <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
//                 Featured
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Image as ImageIcon, Video, Star, Sparkles } from 'lucide-react';
import bg from '../pexels-scottwebb-305821.jpg'; // Ensure this path matches your file structure

const HeroSection = ({
  searchTerm,
  setSearchTerm,
  suggestions,
  handleSuggestionClick,
  filteredMedia = [] 
}) => {
  
  // Calculate stats dynamically
  const totalItems = filteredMedia.length;
  const videoCount = filteredMedia.filter(item => item.type === 'video').length;
  const featuredCount = filteredMedia.filter(item => item.isFeatured).length;

  return (
    <section className="relative w-full h-[60vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background with Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Gradient that fades from dark to the page background color at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-zinc-50 dark:to-zinc-950" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center space-y-10">
        
        {/* Heading Group */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium shadow-lg">
            <Sparkles size={14} className="text-amber-400" />
            <span>Discover Artistic Brilliance</span>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight drop-shadow-sm font-Quicksand">
            Palette of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Dreams</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light">
            Explore a universe of colors and stories. From abstract wonders to stunning landscapes, find the art that speaks to your soul.
          </p>
        </motion.div>

        {/* Search Interface */}
        <motion.div 
          className="w-full max-w-2xl relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Input Field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="text-zinc-400 group-focus-within:text-emerald-400 transition-colors" size={22} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, artist, or tag..."
              className="w-full py-2 pl-14 pr-6 rounded-2xl dark:bg-white/10 bg-black/40 backdrop-blur-xl border border-white/20 dark:text-white text-gray-950 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-black/40 transition-all shadow-2xl text-lg"
            />
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-3 bg-white/90 dark:bg-zinc-900/95 backdrop-blur-xl rounded-xl border border-white/20 dark:border-zinc-700 shadow-2xl overflow-hidden z-50 text-left"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-6 py-3.5 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                  >
                    <Search size={14} className="opacity-50" />
                    {suggestion}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats Pills */}
        {!searchTerm && (
          <motion.div 
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* <StatBadge icon={ImageIcon} count={totalItems} label="Artworks" color="text-purple-400" />
            <StatBadge icon={Video} count={videoCount} label="Videos" color="text-blue-400" />
            <StatBadge icon={Star} count={featuredCount} label="Featured" color="text-amber-400" /> */}
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Sub-component for clean stat pills
const StatBadge = ({ icon: Icon, count, label, color }) => (
  <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-md border border-white/5 hover:bg-black/50 hover:border-white/20 transition-all cursor-default group">
    <div className={`p-1.5 rounded-full bg-white/10 ${color} group-hover:scale-110 transition-transform`}>
      <Icon size={16} />
    </div>
    <div className="text-left flex flex-col">
      <span className="text-sm font-bold text-white leading-none mb-0.5">{count.toLocaleString()}</span>
      <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">{label}</span>
    </div>
  </div>
);

export default HeroSection;