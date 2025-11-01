// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";

// function HeroSection() {
//   const [currentImages, setCurrentImages] = useState([]);
//   const [loaded, setLoaded] = useState(false);
//   const [imageStatus, setImageStatus] = useState({});
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const preloadRef = useRef(false);

//   // Pexels API configuration
//   const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY; // Replace with your actual key
//   const query = "abstract art colorful painting digital art";
//   const fallbackImages = Array.from({ length: 9 }, (_, i) =>
//     `https://picsum.photos/seed/artfallback-${i + 1}/800/600`
//   );

//   // Rotation every 3 days
//   const rotationKey = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 3));

//   // Fetch images from Pexels with fallback
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await fetch(
//           `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=9&orientation=landscape`,
//           {
//             headers: {
//               Authorization: PEXELS_API_KEY,
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           const pexelsImages = data.photos.map(photo => photo.src.large2x || photo.src.large);
//           setCurrentImages(pexelsImages);
//         } else {
//           throw new Error('Pexels API failed');
//         }
//       } catch (error) {
//         console.log('Using fallback images:', error);
//         setCurrentImages(fallbackImages);
//       }
//     };

//     fetchImages();
//   }, [rotationKey]);

//   // Preload images with better loading strategy
//   useEffect(() => {
//     if (currentImages.length === 0 || preloadRef.current) return;

//     preloadRef.current = true;
//     let loadedCount = 0;
//     const totalImages = currentImages.length;

//     const loadImage = (src, index) => {
//       return new Promise((resolve) => {
//         const img = new Image();
//         img.src = src;
        
//         img.onload = () => {
//           loadedCount++;
//           setImageStatus(prev => ({ ...prev, [index]: 'loaded' }));
//           if (loadedCount === totalImages) {
//             setLoaded(true);
//           }
//           resolve();
//         };

//         img.onerror = () => {
//           loadedCount++;
//           setImageStatus(prev => ({ ...prev, [index]: 'error' }));
//           if (loadedCount === totalImages) {
//             setLoaded(true);
//           }
//           resolve();
//         };
//       });
//     };

//     // Load images sequentially for better performance
//     const loadSequentially = async () => {
//       for (let i = 0; i < currentImages.length; i++) {
//         await loadImage(currentImages[i], i);
//         // Small delay between loads to prevent overwhelming the network
//         await new Promise(resolve => setTimeout(resolve, 100));
//       }
//     };

//     loadSequentially();

//     // Fallback timeout
//     const timeout = setTimeout(() => {
//       setLoaded(true);
//     }, 5000);

//     return () => clearTimeout(timeout);
//   }, [currentImages]);

//   // Reset on unmount
//   useEffect(() => {
//     return () => {
//       setLoaded(false);
//       preloadRef.current = false;
//     };
//   }, []);

//   // Check if image is loaded
//   const isImageReady = (index) => imageStatus[index] === 'loaded';

//   // Get appropriate images for different screen sizes
//   const mobileImage = currentImages[0] || fallbackImages[0];
//   const tabletImages = currentImages.slice(0, 4) || fallbackImages.slice(0, 4);
//   const desktopImages = currentImages.slice(0, 9) || fallbackImages.slice(0, 9);

//   return (
//     <section className="relative lg:h-[100vh] h-[80vh] w-full overflow-hidden flex items-center justify-center">
//       {/* Background Image Grid */}
//       <div className="absolute inset-0 z-0">
//         {/* Mobile: Single Image */}
//         <div className="sm:hidden absolute inset-0">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={`mobile-${rotationKey}`}
//               className="absolute inset-0"
//               initial={{ opacity: 0, scale: 1.1 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
//             >
//               <div
//                 className={`w-full h-full bg-cover bg-center transition-all duration-1000 ${
//                   isImageReady(0) ? "opacity-100" : "opacity-0"
//                 }`}
//                 style={{ 
//                   backgroundImage: `url(${mobileImage})`,
//                   backgroundPosition: 'center',
//                   backgroundSize: 'cover'
//                 }}
//               />
//               <div className="absolute inset-0 bg-black/40" />
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Tablet: 2x2 Grid */}
//         <div className="hidden sm:grid md:hidden grid-cols-2 grid-rows-2 h-full gap-[1px]">
//           {tabletImages.map((img, index) => (
//             <motion.div
//               key={`tablet-${index}-${rotationKey}`}
//               className="relative overflow-hidden"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: isImageReady(index) ? 1 : 0 }}
//               transition={{ duration: 1, delay: index * 0.1 }}
//             >
//               <div
//                 className={`w-full h-full bg-cover bg-center transition-all duration-1000 ${
//                   isImageReady(index) ? "opacity-100 scale-100" : "opacity-0 scale-110"
//                 }`}
//                 style={{ 
//                   backgroundImage: `url(${img})`,
//                   backgroundPosition: 'center',
//                   backgroundSize: 'cover'
//                 }}
//               />
//               <div className="absolute inset-0 bg-black/30" />
//             </motion.div>
//           ))}
//         </div>

//         {/* Desktop: 3x3 Grid */}
//         <div className="hidden md:grid grid-cols-3 grid-rows-3 h-full gap-[1px]">
//           {desktopImages.map((img, index) => (
//             <motion.div
//               key={`desktop-${index}-${rotationKey}`}
//               className="relative overflow-hidden group"
//               initial={{ opacity: 0, scale: 1.1 }}
//               animate={{ 
//                 opacity: isImageReady(index) ? 1 : 0,
//                 scale: isImageReady(index) ? 1 : 1.1
//               }}
//               transition={{ 
//                 duration: 1.2, 
//                 delay: index * 0.05,
//                 ease: [0.25, 0.46, 0.45, 0.94]
//               }}
//               // whileHover={{ scale: 1.02 }}
//             >
//               <motion.div
//                 className="w-full h-full bg-cover bg-center"
//                 style={{ 
//                   backgroundImage: `url(${img})`,
//                   backgroundPosition: 'center',
//                   backgroundSize: 'cover'
//                 }}
//                 // transition={{ duration: 0.4 }}
//               />
//               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Content Overlay */}
//       <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 pt-24 pb-16 max-w-4xl mx-auto">
//         <motion.h1
//           initial={{ y: 60, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ 
//             duration: 1, 
//             delay: 0.3, 
//             ease: [0.25, 0.46, 0.45, 0.94] 
//           }}
//           className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
//         >
//           Where Art Meets{" "}
//           <motion.span
//             className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8, duration: 1 }}
//           >
//             Soul
//           </motion.span>
//         </motion.h1>

//         <motion.p
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ 
//             duration: 0.8, 
//             delay: 0.6, 
//             ease: [0.25, 0.46, 0.45, 0.94] 
//           }}
//           className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mb-8 leading-relaxed font-light"
//         >
//           Discover extraordinary artwork from visionary creators worldwide. 
//           Connect, collect, and create in our vibrant artistic ecosystem.
//         </motion.p>

//         <motion.div
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ 
//             duration: 0.8, 
//             delay: 0.9, 
//             ease: [0.25, 0.46, 0.45, 0.94] 
//           }}
//           className="flex flex-row gap-4"
//         >
//           <Link to="/community">
//             <motion.button
//               className="px-6 py-3 bg-yellow-400 border-2 border-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg text-sm sm:text-base transition-colors duration-300"
//               whileHover={{ 
//                 scale: 1.05,
//                 transition: { duration: 0.2 }
//               }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Join Community
//             </motion.button>
//           </Link>

//           <Link to="/arteva/artstore">
//             <motion.button
//               className="px-6 py-3 border-2 border-white hover:border-yellow-300 hover:text-yellow-300 text-white font-medium rounded-lg text-sm sm:text-base transition-colors duration-300"
//               whileHover={{ 
//                 scale: 1.05,
//                 transition: { duration: 0.2 }
//               }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Explore Art Store
//             </motion.button>
//           </Link>
//         </motion.div>
//       </div>

//       {/* Enhanced Decorative Elements */}
//       <motion.div
//         className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-white/20"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.2 }}
//       />
//       <motion.div
//         className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/20"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.2 }}
//       />
//       <motion.div
//         className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/20"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.2 }}
//       />
//       <motion.div
//         className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white/20"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.2 }}
//       />
//     </section>
//   );
// }



import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { account } from "../../appwriteConfig";
import { RiBubbleChartLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";

function HeroSection() {
  const { user, isAuthenticated } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userName, setUserName] = useState(null);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const emotionalSlides = [
    {
      text: "Your story deserves to be told.",
      subtext: "In a world of noise, your art speaks the truth.",
      emoji: "💫",
    },
    {
      text: "Create what only you can create.",
      subtext: "Your imagination is a world waiting to be seen.",
      emoji: "🎨",
    },
    {
      text: "Where silence finds its voice.",
      subtext: "Express what words cannot capture.",
      emoji: "🌌",
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserName(user.name || user.email?.split("@")[0]);
      } catch {
        setUserName(null);
      }
    };
    fetchUser();
  }, []);

  // Smooth text animation
  useEffect(() => {
    const currentText = emotionalSlides[currentSlide].text;
    let timeout;

    if (!isDeleting && displayText !== currentText) {
      // Typing effect
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, 80);
    } else if (isDeleting && displayText !== "") {
      // Deleting effect
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      }, 40);
    } else if (!isDeleting && displayText === currentText) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      // Move to next slide
      setIsDeleting(false);
      setCurrentSlide((prev) => (prev + 1) % emotionalSlides.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentSlide]);

  // Auto-advance slides as backup
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDeleting && displayText === emotionalSlides[currentSlide].text) {
        setIsDeleting(true);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide, displayText, isDeleting]);

  const greeting = isAuthenticated && userName 
    ? `Hello, ${userName}`
    : "Welcome, storyteller";

  return (
    <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden transition-all duration-700">
      {/* Enhanced Background with Floating Particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-gray-100 to-purple-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-700">
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/30 dark:bg-blue-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Enhanced Floating Glass Panels */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 2, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 right-16 w-64 h-64 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -1, 0],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: 1 
          }}
          className="absolute bottom-32 left-12 w-48 h-48 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto">
        {/* Enhanced Greeting with Smooth Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
            {greeting}
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"
          />
        </motion.div>

        {/* Enhanced Emotional Text Slide with Typewriter Effect */}
        <div className="relative h-48 mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="bg-white/20 dark:bg-white/10 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl mx-auto max-w-2xl transform transition-all duration-500 hover:scale-[1.02]">
                {/* Animated Emoji */}
                <motion.div
                  key={emotionalSlides[currentSlide].emoji}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="text-5xl mb-6"
                >
                  {emotionalSlides[currentSlide].emoji}
                </motion.div>
                
                {/* Typewriter Text */}
                <h2 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-gray-100 mb-4 min-h-[4rem] flex items-center justify-center">
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="ml-1"
                  >
                    |
                  </motion.span>
                </h2>
                
                {/* Subtext with Fade Animation */}
                <motion.p
                  key={emotionalSlides[currentSlide].subtext}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg text-gray-600 dark:text-gray-300 font-light"
                >
                  {emotionalSlides[currentSlide].subtext}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced CTA Buttons with Hover Effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-row items-center justify-center gap-4 mt-8"
        >
          {/* Art Store Button */}
          <Link to="/Arteva/Artstore" className="group relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-500" />
              <button className="relative px-4 py-2 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 border border-white/40 dark:border-white/20 rounded-lg backdrop-blur-xl font-medium shadow-xl
              flex items-center justify-center group-hover:shadow-2xl transition-all duration-500 whitespace-nowrap text-lg">
               <RiBubbleChartLine />
               <span className=" flex items-center justify-center gap-x-2"> <span className=" md:block hidden">Explore</span>  ArtStore</span>
              </button>
            </motion.div>
          </Link>

          {/* Community Button */}
          <Link to="/community" className="group relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-500" />
              <button className="relative px-4 py-2 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 border border-white/40 dark:border-white/20 rounded-lg backdrop-blur-xl font-medium
              flex items-center gap-x-1 justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 whitespace-nowrap text-lg">
                <LuUsers />
              <p className=" flex items-center justify-center gap-x-2"> <span className=" md:block hidden">Join</span>Community</p>
              </button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Enhanced Footer Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-16"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm italic mb-2">
            "Your canvas is waiting — start painting your story."
          </p>
          <motion.div
            animate={{ width: [0, 100, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto w-32"
          />
        </motion.div>
      </div>

      {/* Enhanced Bottom Gradient */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/80 dark:from-gray-950/80 to-transparent backdrop-blur-sm" /> */}
    </section>
  );
}

export default HeroSection;
