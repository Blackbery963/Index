// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// function HeroSection() {
//   const [loaded, setLoaded] = useState(false);
//   const [imagesLoaded, setImagesLoaded] = useState({});
//   const preloadRef = useRef(false);

//   // 🌈 Change every 5 days
//   const rotationIntervalDays = 5;
//   const rotationKey = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * rotationIntervalDays));

//   // Generate Picsum images with rotation key - USE CONSISTENTLY
//   const backgroundImages = Array.from({ length: 9 }, (_, i) =>
//     `https://picsum.photos/seed/art-${rotationKey}-${i + 1}/800/600`
//   );

//   // Get appropriate image for mobile (use first image consistently)
//   const mobileImage = backgroundImages[0];

//   // Improved preload function
//   useEffect(() => {
//     // Prevent duplicate preloading
//     if (preloadRef.current) return;
//     preloadRef.current = true;

//     let loadedCount = 0;
//     const totalImages = backgroundImages.length;
//     const loadStates = {};

//     backgroundImages.forEach((src, index) => {
//       const img = new Image();
//       img.src = src;
      
//       img.onload = () => {
//         loadedCount++;
//         loadStates[index] = true;
//         setImagesLoaded(prev => ({ ...prev, [index]: true }));
        
//         // Set loaded to true when all images are loaded
//         if (loadedCount === totalImages) {
//           setLoaded(true);
//         }
//       };

//       img.onerror = () => {
//         loadedCount++;
//         loadStates[index] = false;
//         setImagesLoaded(prev => ({ ...prev, [index]: false }));
        
//         // Still mark as loaded even if some fail
//         if (loadedCount === totalImages) {
//           setLoaded(true);
//         }
//       };
//     });

//     // Fallback: if images take too long, still show content
//     const timeout = setTimeout(() => {
//       setLoaded(true);
//     }, 3000);

//     return () => clearTimeout(timeout);
//   }, [rotationKey]);

//   // Reset loaded state when component unmounts (for navigation)
//   useEffect(() => {
//     return () => {
//       setLoaded(false);
//       preloadRef.current = false;
//     };
//   }, []);

//   // Helper function to check if specific images are loaded
//   const isImageLoaded = (index) => imagesLoaded[index] || loaded;

//   return (
//     <section className="relative lg:h-[100vh] h-[80vh] w-full overflow-hidden flex items-center justify-center top-0">
//       {/* 🔳 Background Image Grid */}
//       <div className="absolute inset-0 z-0">
//         {/* Mobile: single image with better loading */}
//         <div className="sm:hidden absolute inset-0">
//           <div
//             className={`w-full h-full bg-cover bg-center transition-all duration-1000 ${
//               isImageLoaded(0) ? "opacity-100 blur-0" : "opacity-0 blur-md"
//             }`}
//             style={{ 
//               backgroundImage: `url(${mobileImage})`,
//               backgroundPosition: 'center',
//               backgroundSize: 'cover',
//               backgroundRepeat: 'no-repeat'
//             }}
//           />
//           <div className="absolute inset-0 bg-black/50" />
//         </div>

//         {/* Tablet: 2x2 grid */}
//         <div className="hidden sm:grid md:hidden grid-cols-2 grid-rows-2 h-full gap-[2px]">
//           {backgroundImages.slice(0, 4).map((img, index) => (
//             <div
//               key={index}
//               className={`w-full h-full bg-cover bg-center transition-all duration-1000 ${
//                 isImageLoaded(index) ? "opacity-100 blur-0" : "opacity-0 blur-md"
//               }`}
//               style={{ 
//                 backgroundImage: `url(${img})`,
//                 backgroundPosition: 'center',
//                 backgroundSize: 'cover'
//               }}
//             />
//           ))}
//           <div className="absolute inset-0 bg-black/40" />
//         </div>

//         {/* Desktop: 3x3 grid */}
//         <div className="hidden md:grid grid-cols-3 grid-rows-3 h-full gap-[2px]">
//           {backgroundImages.map((img, index) => (
//             <motion.div
//               key={index}
//               className={`w-full h-full bg-cover bg-center transition-all duration-1000 ${
//                 isImageLoaded(index) ? "opacity-100 blur-0" : "opacity-0 blur-md"
//               }`}
//               style={{ 
//                 backgroundImage: `url(${img})`,
//                 backgroundPosition: 'center',
//                 backgroundSize: 'cover'
//               }}
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.4 }}
//             />
//           ))}
//           <div className="absolute inset-0 bg-black/30" />
//         </div>

//         {/* Fallback background color while loading */}
//         {!loaded && (
//           <div className="absolute inset-0 bg-gray-800 animate-pulse" />
//         )}
//       </div>

//       {/* 🎯 Content Overlay - Always visible but with loading state */}
//       <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 pt-24 pb-16">
//         <motion.h1
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
//           className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-Roboto"
//         >
//           A Journey Through Colors & Imagination
//         </motion.h1>

//         <motion.p
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
//           className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl mb-8"
//         >
//           <span className="md:hidden block">
//             Discover unique artwork from global artists. Connect, explore, and support creativity in one vibrant space.
//           </span>
//           <span className="hidden md:block">
//             Dive into a curated world of stunning art. Whether you're a creator or collector, find inspiration, connection, and exceptional pieces all in one place.
//           </span>
//         </motion.p>

//         <motion.div
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
//           className="flex flex-row gap-4"
//         >
//           <Link to="/community">
//             <motion.button
//               className="px-6 py-3 bg-yellow-400 border-2 border-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg text-sm sm:text-base transition-colors duration-300"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Join Community
//             </motion.button>
//           </Link>

//           <Link to="/Arteva/Artstore">
//             <motion.button
//               className="px-6 py-3 border-2 border-white hover:border-yellow-300 hover:text-yellow-300 text-white font-medium rounded-lg text-sm sm:text-base transition-colors duration-300"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Artstore
//             </motion.button>
//           </Link>
//         </motion.div>
//       </div>

//       {/* Decorative Corners */}
//       <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-white/20" />
//       <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-white/20" />
//       <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-white/20" />
//       <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-white/20" />
//     </section>
//   );
// }

// export default HeroSection;


import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function HeroSection() {
  const [currentImages, setCurrentImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [imageStatus, setImageStatus] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const preloadRef = useRef(false);

  // Pexels API configuration
  const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY; // Replace with your actual key
  const query = "abstract art colorful painting digital art";
  const fallbackImages = Array.from({ length: 9 }, (_, i) =>
    `https://picsum.photos/seed/artfallback-${i + 1}/800/600`
  );

  // Rotation every 3 days
  const rotationKey = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 3));

  // Fetch images from Pexels with fallback
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=9&orientation=landscape`,
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const pexelsImages = data.photos.map(photo => photo.src.large2x || photo.src.large);
          setCurrentImages(pexelsImages);
        } else {
          throw new Error('Pexels API failed');
        }
      } catch (error) {
        console.log('Using fallback images:', error);
        setCurrentImages(fallbackImages);
      }
    };

    fetchImages();
  }, [rotationKey]);

  // Preload images with better loading strategy
  useEffect(() => {
    if (currentImages.length === 0 || preloadRef.current) return;

    preloadRef.current = true;
    let loadedCount = 0;
    const totalImages = currentImages.length;

    const loadImage = (src, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        
        img.onload = () => {
          loadedCount++;
          setImageStatus(prev => ({ ...prev, [index]: 'loaded' }));
          if (loadedCount === totalImages) {
            setLoaded(true);
          }
          resolve();
        };

        img.onerror = () => {
          loadedCount++;
          setImageStatus(prev => ({ ...prev, [index]: 'error' }));
          if (loadedCount === totalImages) {
            setLoaded(true);
          }
          resolve();
        };
      });
    };

    // Load images sequentially for better performance
    const loadSequentially = async () => {
      for (let i = 0; i < currentImages.length; i++) {
        await loadImage(currentImages[i], i);
        // Small delay between loads to prevent overwhelming the network
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    };

    loadSequentially();

    // Fallback timeout
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [currentImages]);

  // Reset on unmount
  useEffect(() => {
    return () => {
      setLoaded(false);
      preloadRef.current = false;
    };
  }, []);

  // Check if image is loaded
  const isImageReady = (index) => imageStatus[index] === 'loaded';

  // Get appropriate images for different screen sizes
  const mobileImage = currentImages[0] || fallbackImages[0];
  const tabletImages = currentImages.slice(0, 4) || fallbackImages.slice(0, 4);
  const desktopImages = currentImages.slice(0, 9) || fallbackImages.slice(0, 9);

  return (
    <section className="relative lg:h-[100vh] h-[80vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image Grid */}
      <div className="absolute inset-0 z-0">
        {/* Mobile: Single Image */}
        <div className="sm:hidden absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-${rotationKey}`}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div
                className={`w-full h-full bg-cover bg-center transition-all duration-1000 ${
                  isImageReady(0) ? "opacity-100" : "opacity-0"
                }`}
                style={{ 
                  backgroundImage: `url(${mobileImage})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tablet: 2x2 Grid */}
        <div className="hidden sm:grid md:hidden grid-cols-2 grid-rows-2 h-full gap-[1px]">
          {tabletImages.map((img, index) => (
            <motion.div
              key={`tablet-${index}-${rotationKey}`}
              className="relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: isImageReady(index) ? 1 : 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
            >
              <div
                className={`w-full h-full bg-cover bg-center transition-all duration-1000 ${
                  isImageReady(index) ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
                style={{ 
                  backgroundImage: `url(${img})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>
          ))}
        </div>

        {/* Desktop: 3x3 Grid */}
        <div className="hidden md:grid grid-cols-3 grid-rows-3 h-full gap-[1px]">
          {desktopImages.map((img, index) => (
            <motion.div
              key={`desktop-${index}-${rotationKey}`}
              className="relative overflow-hidden group"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: isImageReady(index) ? 1 : 0,
                scale: isImageReady(index) ? 1 : 1.1
              }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              // whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="w-full h-full bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${img})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
                // transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 pt-24 pb-16 max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 1, 
            delay: 0.3, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Where Art Meets{" "}
          <motion.span
            className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Soul
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.6, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mb-8 leading-relaxed font-light"
        >
          Discover extraordinary artwork from visionary creators worldwide. 
          Connect, collect, and create in our vibrant artistic ecosystem.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.9, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="flex flex-row gap-4"
        >
          <Link to="/community">
            <motion.button
              className="px-6 py-3 bg-yellow-400 border-2 border-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg text-sm sm:text-base transition-colors duration-300"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Join Community
            </motion.button>
          </Link>

          <Link to="/arteva/artstore">
            <motion.button
              className="px-6 py-3 border-2 border-white hover:border-yellow-300 hover:text-yellow-300 text-white font-medium rounded-lg text-sm sm:text-base transition-colors duration-300"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Art Store
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Enhanced Decorative Elements */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      />
      <motion.div
        className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      />
    </section>
  );
}

export default HeroSection;

