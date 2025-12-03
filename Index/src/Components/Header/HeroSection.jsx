// // // import React, { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { Link } from "react-router-dom";
// // // import { useAuth } from "../Authentication/AuthContext";
// // // import { account } from "../../appwriteConfig";
// // // import { RiBubbleChartLine } from "react-icons/ri";
// // // import { LuUsers } from "react-icons/lu";

// // // function HeroSection() {
// // //   const { user, isAuthenticated } = useAuth();
// // //   const [currentSlide, setCurrentSlide] = useState(0);
// // //   const [userName, setUserName] = useState(null);
// // //   const [displayText, setDisplayText] = useState("");
// // //   const [isDeleting, setIsDeleting] = useState(false);

// // //   const emotionalSlides = [
// // //     {
// // //       text: "Your story deserves to be told.",
// // //       subtext: "In a world of noise, your art speaks the truth.",
// // //       emoji: "💫",
// // //     },
// // //     {
// // //       text: "Create what only you can create.",
// // //       subtext: "Your imagination is a world waiting to be seen.",
// // //       emoji: "🎨",
// // //     },
// // //     {
// // //       text: "Where silence finds its voice.",
// // //       subtext: "Express what words cannot capture.",
// // //       emoji: "🌌",
// // //     },
// // //   ];

// // //   useEffect(() => {
// // //     const fetchUser = async () => {
// // //       try {
// // //         const user = await account.get();
// // //         setUserName(user.name || user.email?.split("@")[0]);
// // //       } catch {
// // //         setUserName(null);
// // //       }
// // //     };
// // //     fetchUser();
// // //   }, []);

// // //   // Smooth text animation
// // //   useEffect(() => {
// // //     const currentText = emotionalSlides[currentSlide].text;
// // //     let timeout;

// // //     if (!isDeleting && displayText !== currentText) {
// // //       // Typing effect
// // //       timeout = setTimeout(() => {
// // //         setDisplayText(currentText.slice(0, displayText.length + 1));
// // //       }, 80);
// // //     } else if (isDeleting && displayText !== "") {
// // //       // Deleting effect
// // //       timeout = setTimeout(() => {
// // //         setDisplayText(currentText.slice(0, displayText.length - 1));
// // //       }, 40);
// // //     } else if (!isDeleting && displayText === currentText) {
// // //       // Pause before deleting
// // //       timeout = setTimeout(() => setIsDeleting(true), 2000);
// // //     } else if (isDeleting && displayText === "") {
// // //       // Move to next slide
// // //       setIsDeleting(false);
// // //       setCurrentSlide((prev) => (prev + 1) % emotionalSlides.length);
// // //     }

// // //     return () => clearTimeout(timeout);
// // //   }, [displayText, isDeleting, currentSlide]);

// // //   // Auto-advance slides as backup
// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       if (!isDeleting && displayText === emotionalSlides[currentSlide].text) {
// // //         setIsDeleting(true);
// // //       }
// // //     }, 6000);
// // //     return () => clearInterval(interval);
// // //   }, [currentSlide, displayText, isDeleting]);

// // //   const greeting = isAuthenticated && userName 
// // //     ? `Hello, ${userName}`
// // //     : "Welcome, storyteller";

// // //   return (
// // //     <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden transition-all duration-700">
// // //       {/* Enhanced Background with Floating Particles */}
// // //       <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-gray-100 to-purple-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-700">
// // //         {/* Floating Particles */}
// // //         {[...Array(15)].map((_, i) => (
// // //           <motion.div
// // //             key={i}
// // //             className="absolute w-1 h-1 bg-blue-300/30 dark:bg-blue-400/20 rounded-full"
// // //             initial={{
// // //               x: Math.random() * window.innerWidth,
// // //               y: Math.random() * window.innerHeight,
// // //             }}
// // //             animate={{
// // //               y: [null, -20, 0],
// // //               opacity: [0.3, 0.8, 0.3],
// // //             }}
// // //             transition={{
// // //               duration: 3 + Math.random() * 2,
// // //               repeat: Infinity,
// // //               delay: Math.random() * 2,
// // //             }}
// // //           />
// // //         ))}
// // //       </div>

// // //       {/* Enhanced Floating Glass Panels */}
// // //       <div className="absolute inset-0 pointer-events-none overflow-hidden">
// // //         <motion.div
// // //           animate={{ 
// // //             y: [0, -20, 0],
// // //             rotate: [0, 2, 0],
// // //             opacity: [0.7, 1, 0.7]
// // //           }}
// // //           transition={{ 
// // //             duration: 8, 
// // //             repeat: Infinity, 
// // //             ease: "easeInOut" 
// // //           }}
// // //           className="absolute top-20 right-16 w-64 h-64 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl"
// // //         />
// // //         <motion.div
// // //           animate={{ 
// // //             y: [0, 15, 0],
// // //             rotate: [0, -1, 0],
// // //             opacity: [0.6, 0.9, 0.6]
// // //           }}
// // //           transition={{ 
// // //             duration: 7, 
// // //             repeat: Infinity, 
// // //             ease: "easeInOut", 
// // //             delay: 1 
// // //           }}
// // //           className="absolute bottom-32 left-12 w-48 h-48 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
// // //         />
// // //       </div>

// // //       {/* Hero Content */}
// // //       <div className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto">
// // //         {/* Enhanced Greeting with Smooth Animation */}
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 1 }}
// // //           className="mb-12"
// // //         >
// // //           <h1 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
// // //             {greeting}
// // //           </h1>
// // //           <motion.div
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             transition={{ delay: 0.5 }}
// // //             className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"
// // //           />
// // //         </motion.div>

// // //         {/* Enhanced Emotional Text Slide with Typewriter Effect */}
// // //         <div className="relative h-48 mb-16">
// // //           <AnimatePresence mode="wait">
// // //             <motion.div
// // //               key={currentSlide}
// // //               initial={{ opacity: 0, scale: 0.95 }}
// // //               animate={{ opacity: 1, scale: 1 }}
// // //               exit={{ opacity: 0, scale: 1.05 }}
// // //               transition={{ duration: 0.8, ease: "easeInOut" }}
// // //               className="absolute inset-0 flex flex-col items-center justify-center"
// // //             >
// // //               <div className="bg-white/20 dark:bg-white/10 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl mx-auto max-w-2xl transform transition-all duration-500 hover:scale-[1.02]">
// // //                 {/* Animated Emoji */}
// // //                 <motion.div
// // //                   key={emotionalSlides[currentSlide].emoji}
// // //                   initial={{ scale: 0, rotate: -180 }}
// // //                   animate={{ scale: 1, rotate: 0 }}
// // //                   transition={{ type: "spring", stiffness: 200, damping: 10 }}
// // //                   className="text-5xl mb-6"
// // //                 >
// // //                   {emotionalSlides[currentSlide].emoji}
// // //                 </motion.div>
                
// // //                 {/* Typewriter Text */}
// // //                 <h2 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-gray-100 mb-4 min-h-[4rem] flex items-center justify-center">
// // //                   {displayText}
// // //                   <motion.span
// // //                     animate={{ opacity: [1, 0, 1] }}
// // //                     transition={{ duration: 1, repeat: Infinity }}
// // //                     className="ml-1"
// // //                   >
// // //                     |
// // //                   </motion.span>
// // //                 </h2>
                
// // //                 {/* Subtext with Fade Animation */}
// // //                 <motion.p
// // //                   key={emotionalSlides[currentSlide].subtext}
// // //                   initial={{ opacity: 0, y: 10 }}
// // //                   animate={{ opacity: 1, y: 0 }}
// // //                   transition={{ delay: 0.5 }}
// // //                   className="text-lg text-gray-600 dark:text-gray-300 font-light"
// // //                 >
// // //                   {emotionalSlides[currentSlide].subtext}
// // //                 </motion.p>
// // //               </div>
// // //             </motion.div>
// // //           </AnimatePresence>
// // //         </div>

// // //         {/* Enhanced CTA Buttons with Hover Effects */}
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ delay: 1.2 }}
// // //           className="flex flex-row items-center justify-center gap-4 mt-8"
// // //         >
// // //           {/* Art Store Button */}
// // //           <Link to="/Arteva/Artstore" className="group relative">
// // //             <motion.div
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               className="relative"
// // //             >
// // //               <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-500" />
// // //               <button className="relative px-4 py-2 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 border border-white/40 dark:border-white/20 rounded-lg backdrop-blur-xl font-medium shadow-xl
// // //               flex items-center justify-center group-hover:shadow-2xl transition-all duration-500 whitespace-nowrap text-lg">
// // //                <RiBubbleChartLine />
// // //                <span className=" flex items-center justify-center gap-x-2"> <span className=" md:block hidden">Explore</span>  ArtStore</span>
// // //               </button>
// // //             </motion.div>
// // //           </Link>

// // //           {/* Community Button */}
// // //           <Link to="/community" className="group relative">
// // //             <motion.div
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               className="relative"
// // //             >
// // //               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-500" />
// // //               <button className="relative px-4 py-2 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 border border-white/40 dark:border-white/20 rounded-lg backdrop-blur-xl font-medium
// // //               flex items-center gap-x-1 justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 whitespace-nowrap text-lg">
// // //                 <LuUsers />
// // //               <p className=" flex items-center justify-center gap-x-2"> <span className=" md:block hidden">Join</span>Community</p>
// // //               </button>
// // //             </motion.div>
// // //           </Link>
// // //         </motion.div>

// // //         {/* Enhanced Footer Line */}
// // //         <motion.div
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1 }}
// // //           transition={{ delay: 1.8 }}
// // //           className="mt-16"
// // //         >
// // //           <p className="text-gray-500 dark:text-gray-400 text-sm italic mb-2">
// // //             "Your canvas is waiting — start painting your story."
// // //           </p>
// // //           <motion.div
// // //             animate={{ width: [0, 100, 0] }}
// // //             transition={{ duration: 3, repeat: Infinity }}
// // //             className="h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto w-32"
// // //           />
// // //         </motion.div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // // export default HeroSection;


// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { useAuth } from "../Authentication/AuthContext";
// import { Palette, Users, ArrowRight, Sparkles, Paintbrush } from "lucide-react";
// import { account } from "../../appwriteConfig";

// // Sample art images
// const artImages = [
//   "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=300&q=80",
//   "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&q=80",
//   "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=300&q=80",
//   "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300&q=80",
//   "https://images.unsplash.com/photo-1543857778-c4a1a569e388?w=300&q=80",
//   "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=300&q=80",
//   "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=300&q=80",
//   "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=300&q=80",
//   "https://images.pexels.com/photos/669986/pexels-photo-669986.jpeg",
//   "https://images.pexels.com/photos/1151300/pexels-photo-1151300.jpeg",
//   "https://images.pexels.com/photos/5033989/pexels-photo-5033989.jpeg",
//   ""
// ];

// // Infinite Marquee Component
// const InfiniteMarquee = ({ images, direction = "left", speed = 30, className = "" }) => {
//   return (
//     <div className={`flex gap-4 w-full overflow-hidden ${className}`}>
//       <motion.div
//         className="flex gap-4 shrink-0"
//         initial={{ x: direction === "left" ? "0%" : "-50%" }}
//         animate={{ x: direction === "left" ? "-50%" : "0%" }}
//         transition={{
//           duration: speed,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//       >
//         {[...images, ...images, ...images, ...images].map((src, i) => (
//           <div
//             key={i}
//             className="relative w-40 h-28 md:w-56 md:h-36 lg:w-64 lg:h-44 rounded-lg md:rounded-xl overflow-hidden shrink-0 group"
//           >
//             <img
//               src={src}
//               alt="Art"
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//             <div className="absolute inset-0 bg-black/5 dark:bg-black/10" />
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// // Stats Component
// const StatItem = ({ value, label, icon: Icon, delay }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 10 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay }}
//     className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-sm border border-gray-200/50 dark:border-white/10"
//   >
//     <Icon className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
//     <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{value}</span>
//     <span className="text-xs text-gray-500 dark:text-gray-500">{label}</span>
//   </motion.div>
// );

// const HeroSection = () => {
//   const { user: authUser, isAuthenticated } = useAuth();
//   const [userName, setUserName] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);

//   // Check system preference
//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     setDarkMode(mediaQuery.matches);
//     const handler = (e) => setDarkMode(e.matches);
//     mediaQuery.addEventListener('change', handler);
//     return () => mediaQuery.removeEventListener('change', handler);
//   }, []);

//   // Fetch user data
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         if (isAuthenticated && authUser) {
//           setUserName(authUser.name || authUser.email?.split("@")[0]);
//         } else {
//           const userData = await account.get();
//           setUserName(userData.name || userData.email?.split("@")[0] || "Creator");
//         }
//       } catch (error) {
//         console.log("No active session");
//         setUserName(null);
//       }
//     };
//     fetchUser();
//   }, [isAuthenticated, authUser]);

//   const greeting = isAuthenticated && userName 
//     ? `Welcome back, ${userName.split(' ')[0]}`
//     : "Where Creativity Thrives";

//   return (
//     <div className="relative w-full min-h-[70vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-200 to-gray-100 dark:from-black dark:to-zinc-950 transition-colors duration-300">
      
//       {/* Background Grid with Diagonal Movement */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div 
//             className="w-[200vw] h-[200vh] flex flex-col gap-4 md:gap-6 items-center justify-center opacity-40 dark:opacity-30"
//             style={{ 
//                 transform: "rotate(-15deg) scale(1.2)",
//             }}
//         >
//             <InfiniteMarquee images={artImages} speed={40} />
//             <InfiniteMarquee images={[...artImages].reverse()} speed={80} />
//             <InfiniteMarquee images={artImages} speed={55} />
//             <InfiniteMarquee images={[...artImages].reverse()} speed={90} />
//             <InfiniteMarquee images={artImages} speed={80} />
//             <InfiniteMarquee images={[...artImages].reverse()} speed={95} />
//         </div>
//       </div>

//       {/* Gradient Overlays */}
//       <div className="absolute inset-0 bg-radial-gradient(circle at 50% 50%, transparent 0%, var(--tw-gradient-from) 70%) from-gray-50/90 via-gray-50/60 to-transparent dark:from-black/90 dark:via-black/60 dark:to-transparent z-10" />
//       <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-gray-50 dark:from-black to-transparent z-10" />
//       <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-50 dark:from-black to-transparent z-10" />

//       {/* Main Content */}
//       <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center pt-8 pb-12">
        
//         {/* Top Stats Bar */}

//         {/* Premium Badge */}
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-gray-300/50 dark:border-gray-700/50 bg-white/80 dark:bg-black/60 backdrop-blur-md mb-6 md:mb-8"
//         >
//             <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500" />
//             <span className="text-xs md:text-sm font-medium tracking-wider uppercase text-gray-700 dark:text-gray-300">
//                 {isAuthenticated ? "Your Creative Space" : "The Creative Hub"}
//             </span>
//         </motion.div>

//         {/* Main Heading */}
//         <motion.h1 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-white mb-4 md:mb-6 px-4"
//         >
//           {greeting}
//           <span className="block text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 font-normal mt-3 md:mt-4">
//             {isAuthenticated 
//               ? "Your art journey continues here" 
//               : "Discover, create, and share with artists worldwide"}
//           </span>
//         </motion.h1>

//         {/* Subtext */}
//         <motion.p 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 md:mb-10 max-w-lg md:max-w-2xl font-light leading-relaxed px-4"
//         >
//           {isAuthenticated 
//             ? "Explore new collections, connect with fellow artists, and showcase your latest work."
//             : "Join a minimalist space designed for creative minds to explore, share, and inspire."
//           }
//         </motion.p>

//         {/* CTA Buttons - Mobile Optimized */}
//         {/* <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full max-w-md px-4"
//         >
//           <Link to="/Arteva/Artstore" className="w-full sm:w-auto">
//             <motion.button 
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="w-full flex items-center justify-center gap-2 md:gap-3 px-5 md:px-8 py-3 md:py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl md:rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
//             >
//               <Palette className="w-4 h-4 md:w-5 md:h-5" />
//               <span className="text-sm md:text-base">Explore ArtStore</span>
//               <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1" />
//             </motion.button>
//           </Link>

//           <Link to="/community" className="w-full sm:w-auto">
//             <motion.button 
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="w-full flex items-center justify-center gap-2 md:gap-3 px-5 md:px-8 py-3 md:py-4 bg-white/90 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/20 rounded-xl md:rounded-full font-medium hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-300 active:scale-95 backdrop-blur-sm"
//             >
//               <Users className="w-4 h-4 md:w-5 md:h-5" />
//               <span className="text-sm md:text-base">Join Community</span>
//             </motion.button>
//           </Link>
//         </motion.div> */}
//         {/* <motion.div 
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.6, delay: 0.3 }}
//   className="w-full flex justify-center px-4"
// >
//   <Link to="/Arteva/Artstore" className="w-full sm:w-auto">
//     <motion.button 
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.97 }}
//       className="
//         w-full sm:w-auto 
//         flex items-center justify-center gap-3
//         px-7 py-3.5
//         rounded-2xl md:rounded-full
//         font-medium tracking-wide
//         backdrop-blur-xl
//         bg-white/20 dark:bg-white/10
//         border border-white/30 dark:border-white/20
//         text-gray-900 dark:text-white
//         shadow-lg hover:shadow-2xl
//         transition-all duration-300
//       "
//     >
//       <Palette className="w-5 h-5" />
//       <span className="text-base">Explore ArtStore</span>
//       <ArrowRight className="w-4 h-4" />
//     </motion.button>
//   </Link>
// </motion.div> */}


        
//       </div>
//     </div>
//   );
// };

// export default HeroSection;



import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { Palette, Users, ArrowRight, Sparkles, Paintbrush } from "lucide-react";
import { account } from "../../appwriteConfig";

// Pexels Hook for Dynamic Art Images
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY; // Get from https://www.pexels.com/api/
const useArtImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        // Cache check (24h TTL)
        const cached = localStorage.getItem('pexels_art_cache');
        const cachedTime = localStorage.getItem('pexels_art_cache_time');
        if (cached && cachedTime && Date.now() - parseInt(cachedTime) < 24 * 60 * 60 * 1000) {
          setImages(JSON.parse(cached));
          setLoading(false);
          return;
        }

        // Fetch from Pexels
        const response = await fetch(
          'https://api.pexels.com/v1/search?query=art+painting&per_page=12&orientation=landscape',
          {
            headers: { Authorization: PEXELS_API_KEY },
          }
        );

        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const data = await response.json();
        const imageUrls = data.photos.map(photo => photo.src.medium);

        // Cache results
        localStorage.setItem('pexels_art_cache', JSON.stringify(imageUrls));
        localStorage.setItem('pexels_art_cache_time', Date.now().toString());
        setImages(imageUrls);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError(err.message);
        // Fallback to static Pexels images (no API key needed)
        setImages([
          "https://images.pexels.com/photos/1174932/pexels-photo-1174932.jpeg?auto=compress&cs=tinysrgb&w=300",
          "https://images.pexels.com/photos/270308/pexels-photo-270308.jpeg?auto=compress&cs=tinysrgb&w=300",
          "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=300",
          "https://images.pexels.com/photos/247676/pexels-photo-247676.jpeg?auto=compress&cs=tinysrgb&w=300",
          "https://images.pexels.com/photos/235648/pexels-photo-235648.jpeg?auto=compress&cs=tinysrgb&w=300",
          "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=300",
          "https://images.pexels.com/photos/137513/pexels-photo-137513.jpeg?auto=compress&cs=tinysrgb&w=300",
          "https://images.pexels.com/photos/63638/pexels-photo-63638.jpeg?auto=compress&cs=tinysrgb&w=300",
          "https://images.pexels.com/photos/669986/pexels-photo-669986.jpeg?auto=compress&cs=tinysrgb&w=300",
          "https://images.pexels.com/photos/1151300/pexels-photo-1151300.jpeg?auto=compress&cs=tinysrgb&w=300",
          "https://images.pexels.com/photos/5033989/pexels-photo-5033989.jpeg?auto=compress&cs=tinysrgb&w=300",
          "https://images.pexels.com/photos/1166758/pexels-photo-1166758.jpeg?auto=compress&cs=tinysrgb&w=300",
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return { images, loading, error };
};

// Infinite Marquee Component (Horizontal Scroll)
const InfiniteMarquee = ({ images, direction = "left", speed = 30, className = "" }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className={`flex gap-4 w-full overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-4 shrink-0"
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...images, ...images, ...images].map((src, i) => (
          <div
            key={`${direction}-${i}`}
            className="relative w-40 h-28 md:w-56 md:h-36 lg:w-64 lg:h-44 rounded-lg md:rounded-xl overflow-hidden shrink-0 group cursor-pointer"
          >
            <img
              src={src || "/fallback-art.jpg"} // Fallback if empty
              alt="Art piece"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => { e.target.src = "/fallback-art.jpg"; }} // Graceful error handling
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-black/5 dark:bg-black/10" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const HeroSection = () => {
  const { user: authUser, isAuthenticated } = useAuth();
  const [userName, setUserName] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const { images, loading, error } = useArtImages();

  // System dark mode detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);
    const handler = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Fetch/set user name
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (isAuthenticated && authUser) {
          setUserName(authUser.name || authUser.email?.split("@")[0]);
        } else {
          const userData = await account.get();
          setUserName(userData.name || userData.email?.split("@")[0] || "Creator");
        }
      } catch (error) {
        console.log("No active session");
        setUserName(null);
      }
    };
    fetchUser();
  }, [isAuthenticated, authUser]);

  const greeting = isAuthenticated && userName
    ? `Welcome back, ${userName.split(' ')[0]}`
    : "Where Creativity Thrives";

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-gray-200 to-gray-100 dark:from-black dark:to-zinc-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
        />
      </div>
    );
  }

  // Error state (brief)
  if (error) {
    console.warn("Art images failed to load:", error);
  }

  return (
    <div className="relative w-full min-h-[55vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-200 to-gray-100 dark:from-black dark:to-zinc-950 transition-colors duration-300">
      {/* Background Grid with Diagonal Movement */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[200vw] h-[200vh] flex flex-col gap-4 md:gap-6 items-center justify-center opacity-40 dark:opacity-30"
          style={{
            transform: "rotate(-15deg) scale(1.2)",
          }}
        >
          <InfiniteMarquee images={images} speed={60} />
          <InfiniteMarquee images={images.reverse()} direction="right" speed={80} />
          <InfiniteMarquee images={images} speed={75} />
          <InfiniteMarquee images={images.reverse()} direction="right" speed={90} />
          <InfiniteMarquee images={images} speed={100} />
          <InfiniteMarquee images={images.reverse()} direction="right" speed={95} />
        </div>
      </div>

      {/* Gradient Overlays (Fixed Tailwind syntax) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-black/20 to-transparent z-10" />
      <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-gray-50 dark:from-black to-transparent z-10" />
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-50 dark:from-black to-transparent z-10" />

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center pt-8 pb-12">
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-gray-300/50 dark:border-gray-700/50 bg-white/80 dark:bg-black/60 backdrop-blur-md mb-6 md:mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500" />
          <span className="text-xs md:text-sm font-medium tracking-wider uppercase text-gray-700 dark:text-gray-300">
            {isAuthenticated ? "Your Creative Space" : "The Creative Hub"}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-white mb-4 md:mb-6 px-4"
        >
          {greeting}
          <span className="block text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 font-normal mt-3 md:mt-4">
            {isAuthenticated
              ? "Your art journey continues here"
              : "Discover, create, and share with artists worldwide"}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 md:mb-10 max-w-lg md:max-w-2xl font-light leading-relaxed px-4"
        >
          {isAuthenticated
            ? "Explore new collections, connect with fellow artists, and showcase your latest work."
            : "Join a minimalist space designed for creative minds to explore, share, and inspire."
          }
        </motion.p>

        {/* CTA Buttons (Uncommented & Mobile-Optimized) */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full max-w-md px-4"
        >
          <Link to="/Arteva/Artstore" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 md:gap-3 px-5 md:px-8 py-3 md:py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl md:rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              <Palette className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Explore ArtStore</span>
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1" />
            </motion.button>
          </Link>
          <Link to="/community" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 md:gap-3 px-5 md:px-8 py-3 md:py-4 bg-white/90 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/20 rounded-xl md:rounded-full font-medium hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-300 active:scale-95 backdrop-blur-sm"
            >
              <Users className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Join Community</span>
            </motion.button>
          </Link>
        </motion.div> */}
      </div>
    </div>
  );
};

export default HeroSection;