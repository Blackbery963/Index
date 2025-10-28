// // src/hooks/useStoryLikes.js
// import { useState } from 'react';
// import { databases, DATABASE_ID, STORIES_COLLECTION_ID } from '../utils/appwrite.config';

// export const useStoryLikes = () => {
//   const [likingStories, setLikingStories] = useState(new Set());

//   const toggleLike = async (storyId, currentLikes, currentIsLiked) => {
//     // Prevent multiple rapid clicks
//     if (likingStories.has(storyId)) return;
    
//     setLikingStories(prev => new Set([...prev, storyId]));

//     try {
//       const newIsLiked = !currentIsLiked;
//       const newLikes = currentIsLiked ? currentLikes - 1 : currentLikes + 1;

//       // Update in database
//       await databases.updateDocument(
//         DATABASE_ID,
//         STORIES_COLLECTION_ID,
//         storyId,
//         {
//           isLiked: newIsLiked,
//           likes: newLikes
//         }
//       );

//       return { newIsLiked, newLikes };
//     } catch (error) {
//       console.error('Error updating like:', error);
//       throw error;
//     } finally {
//       setLikingStories(prev => {
//         const newSet = new Set([...prev]);
//         newSet.delete(storyId);
//         return newSet;
//       });
//     }
//   };

//   const addReaction = async (storyId, currentLikes, emoji) => {
//     // For emoji reactions, we'll treat them as "super likes" and add 2 likes
//     if (likingStories.has(storyId)) return;
    
//     setLikingStories(prev => new Set([...prev, storyId]));

//     try {
//       const newLikes = currentLikes + 2; // Emoji reaction gives 2 likes

//       await databases.updateDocument(
//         DATABASE_ID,
//         STORIES_COLLECTION_ID,
//         storyId,
//         {
//           likes: newLikes,
//           isLiked: true // Also mark as liked
//         }
//       );

//       return { newIsLiked: true, newLikes };
//     } catch (error) {
//       console.error('Error adding reaction:', error);
//       throw error;
//     } finally {
//       setLikingStories(prev => {
//         const newSet = new Set([...prev]);
//         newSet.delete(storyId);
//         return newSet;
//       });
//     }
//   };

//   return {
//     toggleLike,
//     addReaction,
//     likingStories
//   };
// };

import { useState } from 'react';
import { databases, DATABASE_ID, STORIES_COLLECTION_ID } from '../utils/appwrite.config';

export const useStoryLikes = () => {
  const [likingStories, setLikingStories] = useState(new Set());

  const toggleLike = async (storyId, currentLikes, currentIsLiked) => {
    if (likingStories.has(storyId)) return;

    setLikingStories((prev) => new Set([...prev, storyId]));

    try {
      const newIsLiked = !currentIsLiked;
      const newLikes = newIsLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1);

      await databases.updateDocument(DATABASE_ID, STORIES_COLLECTION_ID, storyId, {
        likes: newLikes,
      });

      return { newIsLiked, newLikes };
    } catch (error) {
      console.error('Error updating like:', error);
      throw error;
    } finally {
      setLikingStories((prev) => {
        const newSet = new Set(prev);
        newSet.delete(storyId);
        return newSet;
      });
    }
  };

  const addReaction = async (storyId, currentLikes, emoji) => {
    if (likingStories.has(storyId)) return;
    setLikingStories((prev) => new Set([...prev, storyId]));

    try {
      const newLikes = currentLikes + 1;
      await databases.updateDocument(DATABASE_ID, STORIES_COLLECTION_ID, storyId, {
        likes: newLikes,
        reaction: emoji,
      });

      return { newIsLiked: true, newLikes };
    } catch (error) {
      console.error('Error adding reaction:', error);
      throw error;
    } finally {
      setLikingStories((prev) => {
        const newSet = new Set(prev);
        newSet.delete(storyId);
        return newSet;
      });
    }
  };

  return { toggleLike, addReaction, likingStories };
};
