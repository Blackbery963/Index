// // import React, { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import { Link } from "react-router-dom";
// // import { useAuth } from "../Authentication/AuthContext";
// // import { Palette, Users, ArrowRight, Sparkles, Paintbrush } from "lucide-react";
// // import { account } from "../../appwriteConfig";

// // // Pexels Hook for Dynamic Art Images
// // const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY; // Get from https://www.pexels.com/api/
// // const useArtImages = () => {
// //   const [images, setImages] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchImages = async () => {
// //       try {
// //         setLoading(true);
// //         // Cache check (24h TTL)
// //         const cached = localStorage.getItem('pexels_art_cache');
// //         const cachedTime = localStorage.getItem('pexels_art_cache_time');
// //         if (cached && cachedTime && Date.now() - parseInt(cachedTime) < 24 * 60 * 60 * 1000) {
// //           setImages(JSON.parse(cached));
// //           setLoading(false);
// //           return;
// //         }

// //         // Fetch from Pexels
// //         const response = await fetch(
// //           'https://api.pexels.com/v1/search?query=art+painting&per_page=12&orientation=landscape',
// //           {
// //             headers: { Authorization: PEXELS_API_KEY },
// //           }
// //         );

// //         if (!response.ok) throw new Error(`API Error: ${response.status}`);
// //         const data = await response.json();
// //         const imageUrls = data.photos.map(photo => photo.src.medium);

// //         // Cache results
// //         localStorage.setItem('pexels_art_cache', JSON.stringify(imageUrls));
// //         localStorage.setItem('pexels_art_cache_time', Date.now().toString());
// //         setImages(imageUrls);
// //       } catch (err) {
// //         console.error('Error fetching images:', err);
// //         setError(err.message);
// //         // Fallback to static Pexels images (no API key needed)
// //         setImages([
// //           "https://images.pexels.com/photos/1174932/pexels-photo-1174932.jpeg?auto=compress&cs=tinysrgb&w=300",
// //           "https://images.pexels.com/photos/270308/pexels-photo-270308.jpeg?auto=compress&cs=tinysrgb&w=300",
// //           "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=300",
// //           "https://images.pexels.com/photos/247676/pexels-photo-247676.jpeg?auto=compress&cs=tinysrgb&w=300",
// //           "https://images.pexels.com/photos/235648/pexels-photo-235648.jpeg?auto=compress&cs=tinysrgb&w=300",
// //           "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=300",
// //           "https://images.pexels.com/photos/137513/pexels-photo-137513.jpeg?auto=compress&cs=tinysrgb&w=300",
// //           "https://images.pexels.com/photos/63638/pexels-photo-63638.jpeg?auto=compress&cs=tinysrgb&w=300",
// //           "https://images.pexels.com/photos/669986/pexels-photo-669986.jpeg?auto=compress&cs=tinysrgb&w=300",
// //           "https://images.pexels.com/photos/1151300/pexels-photo-1151300.jpeg?auto=compress&cs=tinysrgb&w=300",
// //           "https://images.pexels.com/photos/5033989/pexels-photo-5033989.jpeg?auto=compress&cs=tinysrgb&w=300",
// //           "https://images.pexels.com/photos/1166758/pexels-photo-1166758.jpeg?auto=compress&cs=tinysrgb&w=300",
// //         ]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchImages();
// //   }, []);

// //   return { images, loading, error };
// // };

// // // Infinite Marquee Component (Horizontal Scroll)
// // const InfiniteMarquee = ({ images, direction = "left", speed = 30, className = "" }) => {
// //   if (!images || images.length === 0) return null;

// //   return (
// //     <div className={`flex gap-4 w-full overflow-hidden ${className}`}>
// //       <motion.div
// //         className="flex gap-4 shrink-0"
// //         initial={{ x: direction === "left" ? "0%" : "-50%" }}
// //         animate={{ x: direction === "left" ? "-50%" : "0%" }}
// //         transition={{
// //           duration: speed,
// //           repeat: Infinity,
// //           ease: "linear",
// //         }}
// //       >
// //         {[...images, ...images, ...images].map((src, i) => (
// //           <div
// //             key={`${direction}-${i}`}
// //             className="relative w-40 h-28 md:w-56 md:h-36 lg:w-64 lg:h-44 rounded-lg md:rounded-xl overflow-hidden shrink-0 group cursor-pointer"
// //           >
// //             <img
// //               src={src || "/fallback-art.jpg"} // Fallback if empty
// //               alt="Art piece"
// //               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
// //               onError={(e) => { e.target.src = "/fallback-art.jpg"; }} // Graceful error handling
// //             />
// //             <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
// //             <div className="absolute inset-0 bg-black/5 dark:bg-black/10" />
// //           </div>
// //         ))}
// //       </motion.div>
// //     </div>
// //   );
// // };

// // const HeroSection = () => {
// //   const { user: authUser, isAuthenticated } = useAuth();
// //   const [userName, setUserName] = useState(null);
// //   const [darkMode, setDarkMode] = useState(false);
// //   const { images, loading, error } = useArtImages();

// //   // System dark mode detection
// //   useEffect(() => {
// //     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
// //     setDarkMode(mediaQuery.matches);
// //     const handler = (e) => setDarkMode(e.matches);
// //     mediaQuery.addEventListener('change', handler);
// //     return () => mediaQuery.removeEventListener('change', handler);
// //   }, []);

// //   // Fetch/set user name
// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         if (isAuthenticated && authUser) {
// //           setUserName(authUser.name || authUser.email?.split("@")[0]);
// //         } else {
// //           const userData = await account.get();
// //           setUserName(userData.name || userData.email?.split("@")[0] || "Creator");
// //         }
// //       } catch (error) {
// //         console.log("No active session");
// //         setUserName(null);
// //       }
// //     };
// //     fetchUser();
// //   }, [isAuthenticated, authUser]);

// //   const greeting = isAuthenticated && userName
// //     ? `Welcome back, ${userName.split(' ')[0]}`
// //     : "Where Creativity Thrives";

// //   // Loading state
// //   if (loading) {
// //     return (
// //       <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-gray-200 to-gray-100 dark:from-black dark:to-zinc-950">
// //         <motion.div
// //           animate={{ rotate: 360 }}
// //           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
// //           className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
// //         />
// //       </div>
// //     );
// //   }

// //   // Error state (brief)
// //   if (error) {
// //     console.warn("Art images failed to load:", error);
// //   }

// //   return (
// //     <div className="relative w-full min-h-[55vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-200 to-gray-100 dark:from-black dark:to-zinc-950 transition-colors duration-300">
// //       {/* Background Grid with Diagonal Movement */}
// //       <div className="absolute inset-0 flex items-center justify-center">
// //         <div
// //           className="w-[200vw] h-[200vh] flex flex-col gap-4 md:gap-6 items-center justify-center opacity-40 dark:opacity-30"
// //           style={{
// //             transform: "rotate(-15deg) scale(1.2)",
// //           }}
// //         >
// //           <InfiniteMarquee images={images} speed={60} />
// //           <InfiniteMarquee images={images.reverse()} direction="right" speed={80} />
// //           <InfiniteMarquee images={images} speed={75} />
// //           <InfiniteMarquee images={images.reverse()} direction="right" speed={90} />
// //           <InfiniteMarquee images={images} speed={100} />
// //           <InfiniteMarquee images={images.reverse()} direction="right" speed={95} />
// //         </div>
// //       </div>

// //       {/* Gradient Overlays (Fixed Tailwind syntax) */}
// //       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-black/20 to-transparent z-10" />
// //       <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-gray-50 dark:from-black to-transparent z-10" />
// //       <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-50 dark:from-black to-transparent z-10" />

// //       {/* Main Content */}
// //       <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center pt-8 pb-12">
// //         {/* Premium Badge */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6 }}
// //           className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-gray-300/50 dark:border-gray-700/50 bg-white/80 dark:bg-black/60 backdrop-blur-md mb-6 md:mb-8"
// //         >
// //           <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500" />
// //           <span className="text-xs md:text-sm font-medium tracking-wider uppercase text-gray-700 dark:text-gray-300">
// //             {isAuthenticated ? "Your Creative Space" : "The Creative Hub"}
// //           </span>
// //         </motion.div>

// //         {/* Main Heading */}
// //         <motion.h1
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6, delay: 0.1 }}
// //           className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-white mb-4 md:mb-6 px-4"
// //         >
// //           {greeting}
// //           <span className="block text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 font-normal mt-3 md:mt-4">
// //             {isAuthenticated
// //               ? "Your art journey continues here"
// //               : "Discover, create, and share with artists worldwide"}
// //           </span>
// //         </motion.h1>

// //         {/* Subtext */}
// //         <motion.p
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6, delay: 0.2 }}
// //           className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 md:mb-10 max-w-lg md:max-w-2xl font-light leading-relaxed px-4"
// //         >
// //           {isAuthenticated
// //             ? "Explore new collections, connect with fellow artists, and showcase your latest work."
// //             : "Join a minimalist space designed for creative minds to explore, share, and inspire."
// //           }
// //         </motion.p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HeroSection;



import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../Authentication/AuthContext";
import { Sparkles } from "lucide-react";
import { account } from "../../appwriteConfig";

// --- CONFIG ---
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

// --- HOOKS ---
const useArtImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const cached = localStorage.getItem('pexels_art_cache');
        const cachedTime = localStorage.getItem('pexels_art_cache_time');
        
        // 24h Cache validity
        if (cached && cachedTime && Date.now() - parseInt(cachedTime) < 24 * 60 * 60 * 1000) {
          setImages(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const response = await fetch(
          'https://api.pexels.com/v1/search?query=abstract+oil+painting&per_page=15&orientation=landscape', 
          { headers: { Authorization: PEXELS_API_KEY } }
        );

        if (!response.ok) throw new Error("API Fail");
        
        const data = await response.json();
        const imageUrls = data.photos.map(photo => photo.src.large2x); // Higher quality images

        localStorage.setItem('pexels_art_cache', JSON.stringify(imageUrls));
        localStorage.setItem('pexels_art_cache_time', Date.now().toString());
        setImages(imageUrls);
      } catch (err) {
        // High quality fallbacks
        setImages([
           "https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=800",
           "https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=800",
           "https://images.pexels.com/photos/1570779/pexels-photo-1570779.jpeg?auto=compress&cs=tinysrgb&w=800",
           "https://images.pexels.com/photos/2123337/pexels-photo-2123337.jpeg?auto=compress&cs=tinysrgb&w=800",
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return { images, loading };
};

// --- LOGIC: Dynamic Greetings ---
const getGreeting = (name) => {
  const hour = new Date().getHours();
  let timeMsg = "Good morning";
  if (hour >= 12 && hour < 17) timeMsg = "Good afternoon";
  else if (hour >= 17) timeMsg = "Good evening";

  // Array of varied templates
  const templates = [
    `${timeMsg}, ${name}`,
    `Welcome back, ${name}`,
    `Ready to create, ${name}?`,
    `Great to see you, ${name}`,
    `${timeMsg}, let's design something new`,
  ];

  // Pick a random template based on the day (so it stays consistent for the session) or just random
  // For now, let's just pick the first one (Time based) + name for consistency, or random:
  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex];
};

// --- COMPONENTS ---
const InfiniteMarquee = ({ images, direction = "left", speed = 40 }) => {
  const marqueeContent = useMemo(() => [...images, ...images, ...images, ...images], [images]);

  return (
    <div className="flex w-full overflow-hidden select-none pointer-events-none">
      <motion.div
        className="flex gap-4 min-w-full shrink-0" 
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }} 
      >
        {marqueeContent.map((src, i) => (
          <div
            key={i}
            // Increased size for better visibility
            className="relative w-64 h-40 md:w-80 md:h-52 rounded-xl overflow-hidden shrink-0 shadow-lg"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transform scale-105" 
            />
            {/* Very subtle overlay - REMOVED dark tint in Dark Mode so images pop */}
            <div className="absolute inset-0 bg-white/10 dark:bg-transparent" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const HeroSection = () => {
  const { user: authUser, isAuthenticated } = useAuth();
  const [greetingText, setGreetingText] = useState("Where Creativity Thrives");
  const { images, loading } = useArtImages();
  const [isGridReady, setIsGridReady] = useState(false);

  // User Name & Greeting Logic
  useEffect(() => {
    const fetchUserAndSetGreeting = async () => {
      let name = null;
      try {
        if (isAuthenticated && authUser) {
          name = authUser.name || authUser.email?.split("@")[0];
        } else {
          const userData = await account.get();
          name = userData.name || userData.email?.split("@")[0];
        }
      } catch {
        name = null;
      }

      if (name) {
        // Capitalize first letter
        const cleanName = name.split(' ')[0];
        const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
        setGreetingText(getGreeting(formattedName));
      } else {
        setGreetingText("Where Creativity Thrives");
      }
    };
    
    fetchUserAndSetGreeting();
  }, [isAuthenticated, authUser]);

  // Prevent initial layout shift
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setIsGridReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return <div className="h-[80vh] w-full bg-gray-50 dark:bg-black" />;
  }

  return (
    <div className="relative w-full min-h-[58vh] md:min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-gray-50 dark:bg-black transition-colors duration-300">
      
      {/* --- BACKGROUND ART GRID --- */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${isGridReady ? 'opacity-100' : 'opacity-0'}`}
      >
        <div
          // 1. Reduced opacity slightly in light mode (30) so text is readable
          // 2. INCREASED opacity in Dark Mode (50) so images are clearly visible against black
          className="flex flex-col gap-6 items-center justify-center opacity-30 dark:opacity-50 blur-[0.5px]"
          style={{
            transform: "rotate(-12deg) scale(1.25)", 
            width: "200vw", 
            height: "200vh" 
          }}
        >
          <InfiniteMarquee images={images} speed={140} />
          <InfiniteMarquee images={images} direction="right" speed={160} />
          <InfiniteMarquee images={images} speed={120} />
          <InfiniteMarquee images={images} direction="right" speed={180} />
          <InfiniteMarquee images={images} speed={130} />
        </div>
      </div>

      {/* --- VISIBILITY FIX: GRADIENTS --- */}
      {/* Old issue: Gradients were too strong in the center. 
         Fix: Use 'via-transparent' extensively and only fade edges. 
      */}
      
      {/* Top fade */}
      <div className="pointer-events-none absolute top-0 w-full h-32 bg-gradient-to-b from-gray-50 via-transparent to-transparent dark:from-black" />
      
      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-50 via-transparent to-transparent dark:from-black" />

      {/* Side fades (Subtle vignette) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gray-50/80 via-transparent to-gray-50/80 dark:from-black/80 dark:via-transparent dark:to-black/80" />

      {/* Text readability layer - Only directly behind text, not whole screen */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
         <div className="w-full max-w-4xl h-96 bg-gray-50/60 dark:bg-black/60 blur-3xl rounded-full" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center ">
        
        {/* Badge */}
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-4"
        >
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
          <span className="text-sm font-medium tracking-wider text-gray-600 dark:text-gray-400 uppercase">
            {isAuthenticated ? "Creator Studio" : "Creative Space"}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-6 drop-shadow-sm">
            {greetingText}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            {isAuthenticated
              ? "Your digital canvas awaits. Explore, collect, and design."
              : "A minimalist space designed for creative minds to explore, share, and inspire."
            }
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default HeroSection;
