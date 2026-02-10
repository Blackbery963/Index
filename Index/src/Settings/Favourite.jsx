
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaBook, FaInfoCircle, FaHome, FaUser } from "react-icons/fa";
// import { MdBook } from "react-icons/md";
// import {motion} from "framer-motion"

// const Favourite = () => {
//   const [favoriteImages, setFavoriteImages] = useState([]);

//   useEffect(() => {
//     // Fetch favorite images from local storage when the page loads
//     const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
//     setFavoriteImages(storedFavorites);
//   }, []);

//   // Function to remove image from favorites
//   const removeFromFavorites = (imageSrc) => {
//     const updatedFavorites = favoriteImages.filter(img => img !== imageSrc);
    
//     // Update local storage
//     localStorage.setItem("favoriteImages", JSON.stringify(updatedFavorites));
    
//     // Update state
//     setFavoriteImages(updatedFavorites);
//   };

//   const buttonVariants = {
//     hover: { scale: 1.1, backgroundColor: '#A4C6EB', transition: { duration: 0.3 } },
//     tap: { scale: 0.95 },
//   };

//   return (
//     <div className=" h-screen w-screen overflow-hidden max-w-full bg-slate-300">
//       <header className='h-[80px] w-full bg-gradient-to-l from-[#3c25267c] via-[#5e3b4d75] to-[#d9a1bf80] backdrop-blur-md flex items-center justify-between px-4 md:px-6 shadow-lg text-white fixed top-0 z-50'>
//             {/* Logo */}
//              <h1 className='lg:text-[35px] md:text-[30px] sm:text-[25px] text-[20px] font-bold font-Eagle text-[#190909]'>Painters' Diary</h1>
//              {/* Navigation */}
//             <div className="flex gap-x-2 sm:gap-x-4 text-gray-800 font-playfair font-semibold">
//             <Link to="/">
//               <motion.button
//                 className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-rose-100 flex items-center gap-2"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 <FaHome className="text-lg sm:text-xl" />
//                 <span className="hidden sm:inline">Home</span>
//               </motion.button>
//             </Link>
//             <Link to="/About">
//               <motion.button
//                 className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-rose-100 flex items-center gap-2"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 <FaInfoCircle className="text-lg sm:text-xl" />
//                 <span className="hidden sm:inline">About</span>
//               </motion.button>
//             </Link>
//             <Link to="/Account">
//               <motion.button
//                 className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-rose-100 flex items-center gap-2"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 <FaUser className="text-lg sm:text-xl" />
//                 <span className="hidden sm:inline">Account</span>
//               </motion.button>
//             </Link>
//             <Link to="/Journal">
//               <motion.button
//                 className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-rose-100 flex items-center gap-2"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 <MdBook className="text-lg sm:text-xl" />
//                 <span className="hidden sm:inline">Diary</span>
//               </motion.button>
//             </Link>
           
//           </div>
//              </header>
//            <div className="p-4 mt-[120px]">
//       <h1 className="text-2xl font-bold mb-4 font-serif">Favourite Images</h1>
//       {favoriteImages.length === 0 ? (
//         <p className=" font-GreatVibes">No favorite images saved yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {favoriteImages.map((src, index) => (
//             <div key={index} className="relative">
//               <img src={src} alt="Favorite" className="w-full h-auto rounded-lg shadow-lg" />
              
//               {/* Favourite Icon (Click to Remove) */}
//               <button
//                 onClick={() => removeFromFavorites(src)}
//                 className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg shadow-md"
//               >
//                 ❌ {/* You can replace this with an actual Favorite icon */}
//               </button>

//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };

// export default Favourite;




import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, LayoutGrid, Trash2, Play, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Data (Images & Videos) ---
const DUMMY_MEDIA = [
  { type: "image", src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1000&auto=format&fit=crop" },
  { type: "video", src: "https://assets.mixkit.co/videos/preview/mixkit-white-paint-on-black-surface-331-large.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?q=80&w=1000&auto=format&fit=crop" },
  { type: "image", src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop" },
  { type: "image", src: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=1000&auto=format&fit=crop" },
  { type: "video", src: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-326-large.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1000&auto=format&fit=crop" },
];

const Favourite = () => {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    // 1. Load LocalStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
    // 2. Format LocalStorage strings to objects
    const formattedStored = storedFavorites.map(src => ({ type: "image", src }));
    // 3. Merge with Dummy Data for UI demo
    setMediaItems([...formattedStored, ...DUMMY_MEDIA]);
  }, []);

  const removeItem = (srcToRemove) => {
    setMediaItems(prev => prev.filter(item => item.src !== srcToRemove));
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
    const newLocalStorage = storedFavorites.filter(img => img !== srcToRemove);
    localStorage.setItem("favoriteImages", JSON.stringify(newLocalStorage));
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans">
      
      {/* --- Header: Clean, Glass, Monochromatic --- */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 px-6 lg:px-10 flex items-center justify-between 
        bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md 
        border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
        
        {/* Left: Logo (Acts as Home) */}
        <Link to="/" className="group">
          <h1 className="text-xl md:text-2xl font-bold font-Eagle tracking-tighter text-zinc-900 dark:text-white  group-hover:opacity-70 transition-opacity">
            Painters' Diary
          </h1>
        </Link>

        {/* Right: Only Essential Icons */}
        <div className="flex items-center gap-6">
          <Link to="/Journal">
            <LayoutGrid className="w-5 h-5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer" />
          </Link>
          <Link to="/Account">
            <User className="w-5 h-5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer" />
          </Link>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="pt-24 px-4 md:px-8 pb-12 max-w-[1400px] mx-auto">
        
        {/* Title Section */}
        <div className="flex items-end justify-between mb-8 px-1">
          <div>
            <h2 className="text-3xl font-light tracking-tight text-zinc-900 dark:text-white">Saved</h2>
            <p className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-widest">
              {mediaItems.length} Collections
            </p>
          </div>
          {/* Optional Search Icon trigger */}
          <button className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-colors">
            <Search className="w-4 h-4 text-zinc-500" />
          </button>
        </div>

        {/* Empty State */}
        {mediaItems.length === 0 ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600">
            <LayoutGrid className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm tracking-wide">Your canvas is blank.</p>
          </div>
        ) : (
          /* --- Masonry Grid --- */
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {mediaItems.map((item, index) => (
                <MediaCard key={item.src + index} item={item} onRemove={removeItem} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

// --- Minimalist Media Card ---
const MediaCard = ({ item, onRemove }) => {
  const isVideo = item.type === "video";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      className="relative group break-inside-avoid overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-900"
    >
      {/* Media Content */}
      {isVideo ? (
        <div className="relative">
             <video
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
            {/* Tiny video indicator */}
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm p-1.5 rounded-full">
                <Play className="w-3 h-3 text-white fill-current" />
            </div>
        </div>
      ) : (
        <img
          src={item.src}
          alt="Saved Content"
          className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
          loading="lazy"
        />
      )}

      {/* Hover Overlay - Minimalist Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
        <span className="text-[10px] text-zinc-300 font-mono uppercase tracking-wider">
            {isVideo ? '00:15' : 'IMG'}
        </span>
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
             e.preventDefault();
             onRemove(item.src);
          }}
          className="text-white hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Favourite;