// // // import { useState, useEffect } from 'react';
// // // import { engagementService } from './engagementService';
// // // import { FaHeart, FaRegHeart } from 'react-icons/fa';
// // // import { account } from '../appwriteConfig';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { Heart } from 'lucide-react';

// // // export default function LikeButton({ targetId, targetType = 'artwork' }) {
// // //   const [isLiked, setIsLiked] = useState(false);
// // //   const [likeCount, setLikeCount] = useState(0);
// // //   const [currentUserId, setCurrentUserId] = useState(null);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [burstHearts, setBurstHearts] = useState([]);

// // //   useEffect(() => {
// // //     const getCurrentUser = async () => {
// // //       try {
// // //         const user = await account.get();
// // //         setCurrentUserId(user.$id);
// // //       } catch (error) {
// // //         console.error('Error fetching user:', error);
// // //         setCurrentUserId(null);
// // //       }
// // //     };
// // //     getCurrentUser();
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!currentUserId) return;
// // //     const checkLikeStatus = async () => {
// // //       try {
// // //         const [liked, count] = await Promise.all([
// // //           engagementService.checkEngagement(currentUserId, targetId, 'like'),
// // //           engagementService.getEngagementCount(targetId, 'like')
// // //         ]);
// // //         setIsLiked(liked);
// // //         setLikeCount(count);
// // //       } catch (error) {
// // //         console.error('Error checking like status:', error);
// // //       }
// // //     };
// // //     checkLikeStatus();
// // //   }, [currentUserId, targetId, engagementService]);

// // //   const handleLike = async () => {
// // //     if (!currentUserId) {
// // //       alert('Please log in to like this artwork.');
// // //       return;
// // //     }
// // //     if (isLoading) return;
// // //     setIsLoading(true);

// // //     try {
// // //       const result = await engagementService.toggleLike(currentUserId, targetId);
// // //       setIsLiked(result.liked);
// // //       setLikeCount(prev => prev + result.countChange);

// // //       // Trigger floating heart only on LIKE, not unlike
// // //       if (!isLiked) {
// // //         // Create multiple hearts for a more dramatic effect
// // //         const heartIds = Array.from({ length: 5 }, (_, i) => Date.now() + i);
// // //         setBurstHearts(prev => [...prev, ...heartIds]);

// // //         // Remove after animation
// // //         setTimeout(() => {
// // //           setBurstHearts(prev => prev.filter(h => !heartIds.includes(h)));
// // //         }, 2000);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error updating like:', error);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="relative inline-flex items-center">
// // //       {/* Floating burst hearts */}
// // //       <AnimatePresence>
// // //         {burstHearts.map((id, index) => {
// // //           // Different trajectories for each heart
// // //           const angle = (index % 5) * 72 - 36; // -36° to 36° spread
// // //           const distance = 80 + (index % 3) * 20; // 80px to 120px distance
          
// // //           return (
// // //             <motion.div
// // //               key={id}
// // //               initial={{ 
// // //                 x: 0, 
// // //                 y: 0, 
// // //                 opacity: 1, 
// // //                 scale: 0.8,
// // //                 rotate: angle
// // //               }}
// // //               animate={{ 
// // //                 x: Math.cos(angle * Math.PI / 180) * distance,
// // //                 y: -distance, // Much higher movement
// // //                 opacity: 0,
// // //                 scale: 1.2,
// // //                 rotate: angle + 45
// // //               }}
// // //               exit={{ opacity: 0 }}
// // //               transition={{ 
// // //                 duration: 1.5, 
// // //                 ease: "easeOut",
// // //                 delay: index * 0.1 // Stagger the hearts
// // //               }}
// // //               className="absolute pointer-events-none"
// // //               style={{
// // //                 color: `hsl(${index * 72}, 100%, 65%)`, // Different colors for each heart
// // //                 filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8))'
// // //               }}
// // //             >
// // //               <Heart size={18}/>
// // //             </motion.div>
// // //           );
// // //         })}
// // //       </AnimatePresence>

// // //       {/* Main button */}
// // //       <motion.button
// // //         onClick={handleLike}
// // //         disabled={isLoading || !currentUserId}
// // //         className={`flex items-center space-x-1 ${
// // //           isLiked 
// // //             ? 'text-red-500 hover:text-red-600' 
// // //             : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
// // //         } transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative z-10`}
// // //         aria-label={isLiked ? 'Unlike' : 'Like'}
// // //         whileTap={{ scale: 0.9 }}
// // //         whileHover={{ scale: 1.1 }}
// // //       >
// // //         {/* Heart icon with more dramatic animation */}
// // //         <motion.div
// // //           animate={{
// // //             scale: isLiked ? [1, 1.3, 1] : 1,
// // //             color: isLiked ? "#ef4444" : "currentColor"
// // //           }}
// // //           transition={{ duration: 0.3 }}
// // //           className="relative"
// // //         >
// // //           <AnimatePresence mode="wait">
// // //             <motion.span
// // //               key={isLiked ? 'liked' : 'unliked'}
// // //               initial={{ scale: 0.8, opacity: 0.7 }}
// // //               animate={{ scale: 1, opacity: 1 }}
// // //               exit={{ scale: 1.2, opacity: 0 }}
// // //               transition={{ duration: 0.2 }}
// // //             >
// // //               {isLiked ? (
// // //                 <FaHeart className="text-red-500 drop-shadow-sm" />
// // //               ) : (
// // //                 <FaRegHeart />
// // //               )}
// // //             </motion.span>
// // //           </AnimatePresence>
          
// // //           {/* Subtle glow effect when liked */}
// // //           {isLiked && (
// // //             <motion.div
// // //               initial={{ scale: 0.8, opacity: 0 }}
// // //               animate={{ scale: 1.5, opacity: 0.3 }}
// // //               transition={{ duration: 0.5 }}
// // //             />
// // //           )}
// // //         </motion.div>

// // //         {/* Like count with bounce animation */}
// // //         <motion.span
// // //           key={likeCount}
// // //           initial={{ y: -10, opacity: 0 }}
// // //           animate={{ y: 0, opacity: 1 }}
// // //           transition={{ 
// // //             type: "spring", 
// // //             stiffness: 500, 
// // //             damping: 15 
// // //           }}
// // //           className="text-sm font-medium min-w-[1rem] text-center"
// // //         >
// // //           {likeCount}
// // //         </motion.span>
// // //       </motion.button>

// // //       {/* Particle effect container */}
// // //       <div className="absolute inset-0 overflow-hidden pointer-events-none" />
// // //     </div>
// // //   );
// // // }



// import { useState, useEffect } from 'react';
// import { engagementService } from './engagementService'; // Keep your existing service
// import { account } from '../appwriteConfig'; // Keep your existing config
// import { motion, AnimatePresence } from 'framer-motion';

// export default function LikeButton({ targetId, targetType = 'artwork' }) {
//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // --- 1. Fetch User & Status (Kept same as your logic) ---
//   useEffect(() => {
//     const getCurrentUser = async () => {
//       try {
//         const user = await account.get();
//         setCurrentUserId(user.$id);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       }
//     };
//     getCurrentUser();
//   }, []);

//   useEffect(() => {
//     if (!currentUserId) return;
//     const checkLikeStatus = async () => {
//       try {
//         const [liked, count] = await Promise.all([
//           engagementService.checkEngagement(currentUserId, targetId, 'like'),
//           engagementService.getEngagementCount(targetId, 'like')
//         ]);
//         setIsLiked(liked);
//         setLikeCount(count);
//       } catch (error) {
//         console.error('Error checking like status:', error);
//       }
//     };
//     checkLikeStatus();
//   }, [currentUserId, targetId]);

//   // --- 2. Simplified Handler ---
//   const handleLike = async () => {
//     if (!currentUserId) {
//       alert('Please log in to like this artwork.');
//       return;
//     }
//     if (isLoading) return;

//     // Optimistic UI Update (Instant feedback before server response)
//     const previousState = isLiked;
//     const previousCount = likeCount;
    
//     setIsLiked(!isLiked);
//     setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
//     setIsLoading(true);

//     try {
//       const result = await engagementService.toggleLike(currentUserId, targetId);
//       // Sync with server result to be safe
//       setIsLiked(result.liked);
//       setLikeCount(prev => prev + (result.liked ? 0 : 0)); // Adjust if needed based on your API return
//     } catch (error) {
//       // Revert on error
//       setIsLiked(previousState);
//       setLikeCount(previousCount);
//       console.error('Error updating like:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- 3. Animation Variants ---
//   const heartVariants = {
//     idle: { 
//       scale: 1,
//       fill: "transparent",
//       stroke: "currentColor",
//       strokeWidth: 2
//     },
//     liked: { 
//       scale: 1,
//       fill: "#e11d48", // Rose-600
//       stroke: "#e11d48",
//       strokeWidth: 0,
//       transition: { 
//         type: "spring", 
//         stiffness: 400, 
//         damping: 15,
//         mass: 0.8 
//       }
//     },
//     tap: { scale: 0.7 },
//     hover: { scale: 1.1 }
//   };

//   const haloVariants = {
//     initial: { opacity: 0.6, scale: 0.5 },
//     animate: { 
//       opacity: 0, 
//       scale: 2, 
//       transition: { duration: 0.4, ease: "easeOut" } 
//     }
//   };

//   return (
//     <motion.button
//       onClick={handleLike}
//       disabled={isLoading || !currentUserId}
//       className=" relative flex items-center gap-1.5 focus:outline-none"
//       initial="idle"
//       whileHover="hover"
//       whileTap="tap"
//       animate={isLiked ? "liked" : "idle"}
//     >
//       {/* Container for Heart & Halo */}
//       <div className="relative flex items-center justify-center w-8 h-8">
        
//         {/* The Halo Ripple (Only triggers on Like) */}
//         <AnimatePresence>
//           {isLiked && (
//             <motion.div
//               key="halo"
//               variants={haloVariants}
//               initial="initial"
//               animate="animate"
//               exit="initial"
//               className="absolute inset-0 rounded-full bg-rose-500/20"
//             />
//           )}
//         </AnimatePresence>

//         {/* The Sparkles (Subtle dots) */}
//         <AnimatePresence>
//           {isLiked && (
//             <>
//               {[0, 1, 2, 3].map((i) => (
//                 <motion.div
//                   key={`sparkle-${i}`}
//                   initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
//                   animate={{ 
//                     opacity: 0, 
//                     scale: 1, 
//                     x: (i % 2 === 0 ? 1 : -1) * 12, 
//                     y: (i < 2 ? -1 : 1) * 12 
//                   }}
//                   transition={{ duration: 0.4, ease: "easeOut" }}
//                   className="absolute w-1 h-1 rounded-full bg-rose-400"
//                 />
//               ))}
//             </>
//           )}
//         </AnimatePresence>

//         {/* The Heart SVG */}
//         <motion.svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           className={`w-6 h-6 overflow-visible ${isLiked ? 'text-rose-600' : 'text-gray-500 dark:text-gray-400 group-hover:text-rose-500'}`}
//           variants={heartVariants}
//         >
//           <motion.path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
//           />
//         </motion.svg>
//       </div>

//       {/* The Count (Rolling Number Effect) */}
//       <div className="relative h-5 overflow-hidden flex flex-col justify-center min-w-[12px]">
//         <AnimatePresence mode="popLayout" initial={false}>
//           <motion.span
//             key={likeCount}
//             initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
//             animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
//             exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
//             transition={{ type: "spring", stiffness: 300, damping: 20 }}
//             className={`text-sm font-semibold tabular-nums leading-none ${
//               isLiked ? 'text-rose-600' : 'text-gray-500 dark:text-gray-400'
//             }`}
//           >
//             {likeCount}
//           </motion.span>
//         </AnimatePresence>
//       </div>
//     </motion.button>
//   );
// }



import { useState, useEffect } from 'react';
import { engagementService } from './engagementService';
import { account } from '../appwriteConfig';
import { motion, AnimatePresence } from 'framer-motion';

export default function LikeButton({ targetId, targetType = 'artwork' }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- OPTIMIZATION STARTS HERE ---

  // 1. Fetch Public Data Immediately (Like Count)
  // This runs instantly on mount, no waiting for user auth.
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const count = await engagementService.getEngagementCount(targetId, 'like');
        setLikeCount(count);
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    };
    fetchCount();
  }, [targetId]);

  // 2. Fetch User & Liked Status (Private Data)
  useEffect(() => {
    const checkUserAndStatus = async () => {
      try {
        // A. Get User
        const user = await account.get();
        setCurrentUserId(user.$id);

        // B. If user exists, check if they liked this specific item
        const liked = await engagementService.checkEngagement(user.$id, targetId, 'like');
        setIsLiked(liked);
      } catch (error) {
        // User not logged in, just ignore
        setCurrentUserId(null);
      }
    };
    checkUserAndStatus();
  }, [targetId]);

  // --- OPTIMIZATION ENDS HERE ---

  const handleLike = async () => {
    if (!currentUserId) {
      alert('Please log in to like this artwork.');
      return;
    }
    if (isLoading) return;

    const previousState = isLiked;
    const previousCount = likeCount;
    
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    setIsLoading(true);

    try {
      const result = await engagementService.toggleLike(currentUserId, targetId);
      setIsLiked(result.liked);
      setLikeCount(prev => prev + (result.liked ? 0 : 0));
    } catch (error) {
      setIsLiked(previousState);
      setLikeCount(previousCount);
      console.error('Error updating like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ... (Your Animation Variants & Return Statement stay exactly the same)
  // Copied below for completeness of the component structure
  
  const heartVariants = {
    idle: { 
      scale: 1,
      fill: "transparent",
      stroke: "currentColor",
      strokeWidth: 2
    },
    liked: { 
      scale: 1,
      fill: "#e11d48",
      stroke: "#e11d48",
      strokeWidth: 0,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 15,
        mass: 0.8 
      }
    },
    tap: { scale: 0.7 },
    hover: { scale: 1.1 }
  };

  const haloVariants = {
    initial: { opacity: 0.6, scale: 0.5 },
    animate: { 
      opacity: 0, 
      scale: 2, 
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  return (
    <motion.button
      onClick={handleLike}
      disabled={isLoading || !currentUserId}
      className="group relative flex items-center gap-1.5 focus:outline-none"
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      animate={isLiked ? "liked" : "idle"}
    >
      <div className="relative flex items-center justify-center w-8 h-8">
        <AnimatePresence>
          {isLiked && (
            <motion.div
              key="halo"
              variants={haloVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              className="absolute inset-0 rounded-full bg-rose-500/20"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isLiked && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: 0, 
                    scale: 1, 
                    x: (i % 2 === 0 ? 1 : -1) * 12, 
                    y: (i < 2 ? -1 : 1) * 12 
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute w-1 h-1 rounded-full bg-rose-400"
                />
              ))}
            </>
          )}
        </AnimatePresence>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-6 h-6 overflow-visible ${isLiked ? 'text-rose-600' : 'text-gray-500 dark:text-gray-400 group-hover:text-rose-500'}`}
        >
          <motion.path
            variants={heartVariants}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
          />
        </svg>
      </div>

      <div className="relative h-5 overflow-hidden flex flex-col justify-center min-w-[12px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={likeCount}
            initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`text-sm font-semibold tabular-nums leading-none ${
              isLiked ? 'text-rose-600' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {likeCount}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.button>
  );
}