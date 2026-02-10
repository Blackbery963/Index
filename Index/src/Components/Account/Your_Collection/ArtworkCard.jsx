// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { AppwriteMedia } from "./MediaComponents";
// import { Award, Tag, Layers, ChevronLeft, ChevronRight, IndianRupee } from "lucide-react"; 
// import { YourCollectionsService } from "./YourCollectionsService";

// export const ArtworkCard = ({ upload, onImageClick }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
  
//   const allUrls = YourCollectionsService.getAllImageUrls(upload);
//   const hasMultipleImages = allUrls.length > 1;

//   // Stop propagation to prevent opening lightbox when clicking arrows
//   const handlePrev = (e) => {
//     e.stopPropagation(); 
//     setCurrentIndex((prev) => (prev === 0 ? allUrls.length - 1 : prev - 1));
//   };

//   const handleNext = (e) => {
//     e.stopPropagation(); 
//     setCurrentIndex((prev) => (prev === allUrls.length - 1 ? 0 : prev + 1));
//   };

//   // Clicking the card opens lightbox at the CURRENT visible image index
//   const handleCardClick = () => {
//     onImageClick(currentIndex);
//   };

//   return (
//     <motion.div
//       className="relative group rounded-lg overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.3 }}
//       onClick={handleCardClick}
//     >
//       <div className="relative w-full">
        
//         {/* --- MEDIA RENDERER --- */}
//         {upload.isVideo ? (
//            <AppwriteMedia
//             upload={upload}
//             className="w-full h-auto object-cover block min-h-[240px]"
//             // For video, we just pass 0 index
//             onImageClick={() => onImageClick(0)}
//           />
//         ) : (
//           <div className="relative overflow-hidden">
//              {/* Main Image */}
//              <img 
//                src={allUrls[currentIndex]}
//                alt={upload.title}
//                className="w-full h-auto object-cover block transition-transform duration-700 hover:scale-105 min-h-[240px]"
//                loading="lazy"
//              />

//              {/* --- MULTI-IMAGE CONTROLS --- */}
//              {hasMultipleImages && (
//                <>
//                  {/* Left Arrow */}
//                  <button
//                    onClick={handlePrev}
//                    // FIX: 'opacity-100' (visible on mobile) -> 'lg:opacity-0' (hidden on desktop) -> 'lg:group-hover:opacity-100' (visible on desktop hover)
//                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md text-white p-1.5 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity hover:bg-black/80 z-20"
//                  >
//                    <ChevronLeft size={16} />
//                  </button>
                 
//                  {/* Right Arrow */}
//                  <button
//                    onClick={handleNext}
//                    // FIX: Same logic here. Always visible on touch devices.
//                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md text-white p-1.5 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity hover:bg-black/80 z-20"
//                  >
//                    <ChevronRight size={16} />
//                  </button>

//                  {/* Dots Indicator (Always Visible) */}
//                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-none">
//                     {allUrls.map((_, idx) => (
//                       <div 
//                         key={idx} 
//                         className={`h-1.5 rounded-full shadow-sm transition-all duration-300 ${
//                           idx === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
//                         }`}
//                       />
//                     ))}
//                  </div>
//                </>
//              )}
//           </div>
//         )}

//         {/* --- PERMANENT MOBILE OVERLAY / HOVER DESKTOP OVERLAY --- */}
//         {/* On mobile, gradient is always there to support the text visibility */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

//         {/* --- BADGES (Top Left) --- */}
//         <div className="absolute top-2 left-2 flex gap-1 z-20">
//            {upload.isAward && (
//               <div className="bg-black/60 text-white p-1.5 rounded-md backdrop-blur-md">
//                   <Award size={12} />
//               </div>
//            )}
//            {upload.forSale && (
//               <div className="bg-emerald-600/90 text-white px-2 py-1 rounded-md backdrop-blur-md text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
//                   <Tag size={10} />
//               </div>
//            )}
//            {hasMultipleImages && (
//               <div className="bg-black/60 text-white p-1.5 rounded-md backdrop-blur-md">
//                   <Layers size={12} />
//               </div>
//            )}
//         </div>

//         {/* --- METADATA (Bottom) --- */}
//         {/* Visible by default on mobile, Hover on desktop */}
//         <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-0 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 z-20">
//            <h3 className="text-white font-bold text-sm truncate drop-shadow-md">{upload.title || "Untitled"}</h3>
//            <div className="flex justify-between items-end mt-1">
//               <p className="text-zinc-300 text-xs line-clamp-1 flex-1 mr-2 lg:block hidden">{upload.description}</p>
//               {upload.price > 0 && (
//                   <div className="text-xs font-mono bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded text-white font-semibold flex items-center justify-center">
//                     <IndianRupee size={12}/>
//                       <span className="pt-1">{upload.price}</span>
//                   </div>
//               )}
//            </div>
//         </div>

//       </div>
//     </motion.div>
//   );
// };




import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Tag, 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  IndianRupee, 
  Heart,
  Play
} from 'lucide-react'; 
import { AppwriteMedia } from "./MediaComponents";
import { YourCollectionsService } from "./YourCollectionsService";

export const ArtworkCard = ({ upload, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  const allUrls = YourCollectionsService.getAllImageUrls(upload);
  const hasMultipleImages = allUrls.length > 1;

  // Navigation handlers
  const handlePrev = (e) => {
    e.stopPropagation(); 
    setCurrentIndex((prev) => (prev === 0 ? allUrls.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation(); 
    setCurrentIndex((prev) => (prev === allUrls.length - 1 ? 0 : prev + 1));
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    // Add your backend like logic here if needed
  };

  return (
    <motion.div
      className="relative group h-full w-full overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900 rounded-sm border border-zinc-200 dark:border-zinc-800"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => onImageClick(currentIndex)}
    >
      <div className="relative w-full h-full">
        
        {/* --- MEDIA RENDERER --- */}
        <div className="w-full h-full relative">
          {upload.isVideo ? (
             <div className="relative w-full h-full">
                <AppwriteMedia
                  upload={upload}
                  className="w-full h-full object-cover block"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-black/20 backdrop-blur-sm p-3 rounded-full text-white">
                    <Play size={20} fill="currentColor" />
                  </div>
                </div>
             </div>
          ) : (
            <div className="relative w-full h-full overflow-hidden">
               <img 
                 src={allUrls[currentIndex]}
                 alt={upload.title}
                 className="w-full h-full object-cover block transition-transform duration-1000 group-hover:scale-110"
                 loading="lazy"
               />

               {/* --- MULTI-IMAGE NAVIGATION --- */}
               {hasMultipleImages && (
                 <>
                   <button
                     onClick={handlePrev}
                     className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md text-white p-1.5 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all hover:bg-black/70 z-30"
                   >
                     <ChevronLeft size={16} />
                   </button>
                   
                   <button
                     onClick={handleNext}
                     className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md text-white p-1.5 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all hover:bg-black/70 z-30"
                   >
                     <ChevronRight size={16} />
                   </button>

                   {/* Dots Indicator */}
                   <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-30 pointer-events-none">
                      {allUrls.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`h-1 rounded-full transition-all duration-300 ${
                            idx === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                          }`}
                        />
                      ))}
                   </div>
                 </>
               )}
            </div>
          )}
        </div>

        {/* --- SMART OVERLAY --- */}
        {/* Always visible on mobile (bottom-heavy gradient), hover-only on large screens */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

        {/* --- TOP BADGES --- */}
        <div className="absolute top-2 left-2 flex gap-1.5 z-20">
           {upload.isAward && (
              <div className="bg-amber-500 text-black p-1.5 rounded-md shadow-lg">
                  <Award size={12} strokeWidth={3} />
              </div>
           )}
           {upload.forSale && (
              <div className="bg-emerald-500 text-white px-2 py-1 rounded-md shadow-lg text-[9px] font-black uppercase tracking-widest flex items-center">
                  <Tag size={12} />
              </div>
           )}
           {hasMultipleImages && !upload.isVideo && (
              <div className="bg-white/20 backdrop-blur-md text-white p-1.5 rounded-md border border-white/20">
                  <Layers size={12} />
              </div>
           )}
        </div>

        {/* --- LIKE BUTTON (Top Right) --- */}
        {/* <button 
          onClick={handleLike}
          className="absolute top-2 right-2 z-30 p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white transition-all active:scale-90 lg:opacity-0 lg:group-hover:opacity-100"
        >
          <Heart size={16} className={isLiked ? "fill-red-500 text-red-500" : "text-white"} />
        </button> */}

        {/* --- METADATA PANEL --- */}
        {/* Permanent on mobile, pops up on desktop hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex flex-col translate-y-0 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300">
           <div className="flex justify-between items-end gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-black text-sm  tracking-tight truncate leading-tight">
                  {upload.title || "Untitled Art"}
                </h3>
                <p className="text-zinc-300 text-[10px] font-medium  tracking-wider line-clamp-1 mt-0.5">
                  {upload.description || "Digital Creation"}
                </p>
              </div>

              {upload.price > 0 && (
                  <div className="bg-white text-black px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-0.5 shadow-xl">
                    <IndianRupee size={10} strokeWidth={3}/>
                    <span>{upload.price}</span>
                  </div>
              )}
           </div>
        </div>

      </div>
    </motion.div>
  );
};