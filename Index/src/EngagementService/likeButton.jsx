// import { useState, useEffect } from 'react';
// import { engagementService } from './engagementService';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { account } from '../appwriteConfig';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function LikeButton({ targetId, targetType = 'artwork' }) {
//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false); // Added: Loading state

//   useEffect(() => {
//     // Get current user
//     const getCurrentUser = async () => {
//       try {
//         const user = await account.get();
//         setCurrentUserId(user.$id);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//         setCurrentUserId(null); // Fixed: Handle error by setting to null
//       }
//     };
//     getCurrentUser();
//   }, []);

//   useEffect(() => {
//     if (!currentUserId) return;
    
//     // Check initial like status
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
//   }, [currentUserId, targetId, engagementService]); // Fixed: Added engagementService to dependencies

//   const handleLike = async () => {
//     if (!currentUserId) {
//       alert('Please log in to like this artwork.');
//       return;
//     }
    
//     if (isLoading) return; // Prevent multiple clicks
//     setIsLoading(true); // Set loading state

//     try {
//       const result = await engagementService.toggleLike(currentUserId, targetId); // Fixed: Use toggleLike
//       setIsLiked(result.liked);
//       setLikeCount(prev => prev + result.countChange);
//     } catch (error) {
//       console.error('Error updating like:', error);
//       // Optionally revert state or notify user
//     } finally {
//       setIsLoading(false); // Reset loading state
//     }
//   };

//   return (
// <motion.button
//   onClick={handleLike}
//   disabled={isLoading || !currentUserId}
//   className={`flex items-center space-x-1 ${
//     isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
//   } hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
//   aria-label={isLiked ? 'Unlike' : 'Like'}
//   whileTap={{ scale: 1.3 }}
// >
//   <AnimatePresence mode="wait" initial={false}>
//     <motion.span
//       key={isLiked ? 'liked' : 'unliked'}
//       initial={{ scale: 0.5, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       exit={{ scale: 0.5, opacity: 0 }}
//       transition={{ duration: 0.2 }}
//     >
//       {isLiked ? <FaHeart /> : <FaRegHeart />}
//     </motion.span>
//   </AnimatePresence>

//   <motion.span
//     key={likeCount}
//     initial={{ y: -5, opacity: 0 }}
//     animate={{ y: 0, opacity: 1 }}
//     transition={{ duration: 0.2 }}
//     className="text-sm"
//   >
//     {likeCount}
//   </motion.span>
// </motion.button>
//   );
// }

import { useState, useEffect } from 'react';
import { engagementService } from './engagementService';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { account } from '../appwriteConfig';
import { motion, AnimatePresence } from 'framer-motion';

export default function LikeButton({ targetId, targetType = 'artwork' }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [burstHearts, setBurstHearts] = useState([]);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await account.get();
        setCurrentUserId(user.$id);
      } catch (error) {
        console.error('Error fetching user:', error);
        setCurrentUserId(null);
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!currentUserId) return;
    const checkLikeStatus = async () => {
      try {
        const [liked, count] = await Promise.all([
          engagementService.checkEngagement(currentUserId, targetId, 'like'),
          engagementService.getEngagementCount(targetId, 'like')
        ]);
        setIsLiked(liked);
        setLikeCount(count);
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };
    checkLikeStatus();
  }, [currentUserId, targetId, engagementService]);

  const handleLike = async () => {
    if (!currentUserId) {
      alert('Please log in to like this artwork.');
      return;
    }
    if (isLoading) return;
    setIsLoading(true);

    try {
      const result = await engagementService.toggleLike(currentUserId, targetId);
      setIsLiked(result.liked);
      setLikeCount(prev => prev + result.countChange);

      // Trigger floating heart only on LIKE, not unlike
      if (!isLiked) {
        // Create multiple hearts for a more dramatic effect
        const heartIds = Array.from({ length: 5 }, (_, i) => Date.now() + i);
        setBurstHearts(prev => [...prev, ...heartIds]);

        // Remove after animation
        setTimeout(() => {
          setBurstHearts(prev => prev.filter(h => !heartIds.includes(h)));
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Floating burst hearts */}
      <AnimatePresence>
        {burstHearts.map((id, index) => {
          // Different trajectories for each heart
          const angle = (index % 5) * 72 - 36; // -36° to 36° spread
          const distance = 80 + (index % 3) * 20; // 80px to 120px distance
          
          return (
            <motion.div
              key={id}
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 1, 
                scale: 0.8,
                rotate: angle
              }}
              animate={{ 
                x: Math.cos(angle * Math.PI / 180) * distance,
                y: -distance, // Much higher movement
                opacity: 0,
                scale: 1.2,
                rotate: angle + 45
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.5, 
                ease: "easeOut",
                delay: index * 0.1 // Stagger the hearts
              }}
              className="absolute pointer-events-none"
              style={{
                color: `hsl(${index * 72}, 100%, 65%)`, // Different colors for each heart
                filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8))'
              }}
            >
              <FaHeart className="text-xl" />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={handleLike}
        disabled={isLoading || !currentUserId}
        className={`flex items-center space-x-1 ${
          isLiked 
            ? 'text-red-500 hover:text-red-600' 
            : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
        } transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative z-10`}
        aria-label={isLiked ? 'Unlike' : 'Like'}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
      >
        {/* Heart icon with more dramatic animation */}
        <motion.div
          animate={{
            scale: isLiked ? [1, 1.3, 1] : 1,
            color: isLiked ? "#ef4444" : "currentColor"
          }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isLiked ? 'liked' : 'unliked'}
              initial={{ scale: 0.8, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isLiked ? (
                <FaHeart className="text-red-500 drop-shadow-sm" />
              ) : (
                <FaRegHeart />
              )}
            </motion.span>
          </AnimatePresence>
          
          {/* Subtle glow effect when liked */}
          {isLiked && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.3 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </motion.div>

        {/* Like count with bounce animation */}
        <motion.span
          key={likeCount}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 15 
          }}
          className="text-sm font-medium min-w-[1rem] text-center"
        >
          {likeCount}
        </motion.span>
      </motion.button>

      {/* Particle effect container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" />
    </div>
  );
}