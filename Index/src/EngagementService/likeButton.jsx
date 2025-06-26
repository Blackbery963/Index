// import { useState, useEffect } from 'react';
// import { engagementService } from './engagementService';
// import {FaRegThumbsUp, FaThumbsUp} from 'react-icons/fa'


// export default function LikeButton({ targetId, targetType = 'artwork' }) {
//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [currentUserId, setCurrentUserId] = useState(null);

//   useEffect(() => {
//     // Get current user
//     const getCurrentUser = async () => {
//       const user = await account.get();
//       setCurrentUserId(user.$id);
//     };
//     getCurrentUser();
//   }, []);

//   useEffect(() => {
//     if (!currentUserId) return;
    
//     // Check initial like status
//     const checkLikeStatus = async () => {
//       const [liked, count] = await Promise.all([
//         engagementService.checkEngagement(currentUserId, targetId, 'like'),
//         engagementService.getEngagementCount(targetId, 'like')
//       ]);
//       setIsLiked(liked);
//       setLikeCount(count);
//     };
    
//     checkLikeStatus();
//   }, [currentUserId, targetId]);

//   const handleLike = async () => {
//     if (!currentUserId) return;
    
//     try {
//       if (isLiked) {
//         await engagementService.removeEngagement(currentUserId, targetId, 'like');
//         setLikeCount(prev => prev - 1);
//       } else {
//         await engagementService.recordEngagement(
//           currentUserId, 
//           targetType, 
//           targetId, 
//           'like'
//         );
//         setLikeCount(prev => prev + 1);
//       }
//       setIsLiked(!isLiked);
//     } catch (error) {
//       console.error('Error updating like:', error);
//     }
//   };

//   return (
//     <button 
//       onClick={handleLike}
//       className={`flex items-center space-x-1 ${
//         isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
//       } hover:text-red-500 transition-colors`}
//       aria-label={isLiked ? 'Unlike' : 'Like'}
//     >
//       {isLiked ? <FaThumbsUp/> : <FaRegThumbsUp/>}
//       <span className="text-sm">{likeCount}</span>
//     </button>
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
  const [isLoading, setIsLoading] = useState(false); // Added: Loading state

  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      try {
        const user = await account.get();
        setCurrentUserId(user.$id);
      } catch (error) {
        console.error('Error fetching user:', error);
        setCurrentUserId(null); // Fixed: Handle error by setting to null
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!currentUserId) return;
    
    // Check initial like status
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
  }, [currentUserId, targetId, engagementService]); // Fixed: Added engagementService to dependencies

  const handleLike = async () => {
    if (!currentUserId) {
      alert('Please log in to like this artwork.');
      return;
    }
    
    if (isLoading) return; // Prevent multiple clicks
    setIsLoading(true); // Set loading state

    try {
      const result = await engagementService.toggleLike(currentUserId, targetId); // Fixed: Use toggleLike
      setIsLiked(result.liked);
      setLikeCount(prev => prev + result.countChange);
    } catch (error) {
      console.error('Error updating like:', error);
      // Optionally revert state or notify user
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
<motion.button
  onClick={handleLike}
  disabled={isLoading || !currentUserId}
  className={`flex items-center space-x-1 ${
    isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
  } hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
  aria-label={isLiked ? 'Unlike' : 'Like'}
  whileTap={{ scale: 1.3 }}
>
  <AnimatePresence mode="wait" initial={false}>
    <motion.span
      key={isLiked ? 'liked' : 'unliked'}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {isLiked ? <FaHeart /> : <FaRegHeart />}
    </motion.span>
  </AnimatePresence>

  <motion.span
    key={likeCount}
    initial={{ y: -5, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.2 }}
    className="text-sm"
  >
    {likeCount}
  </motion.span>
</motion.button>
  );
}