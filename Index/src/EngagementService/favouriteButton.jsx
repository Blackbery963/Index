import { useState, useEffect } from 'react';
import { engagementService } from './engagementService';
import { FaRegHeart} from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa';

export default function favouriteButton({ targetId, targetType = 'artwork' }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteCount, setFavouriteCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      const user = await account.get();
      setCurrentUserId(user.$id);
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!currentUserId) return;
    
    // Check initial like status
    const checkFavouriteStatus = async () => {
      const [favourited, count] = await Promise.all([
        engagementService.checkEngagement(currentUserId, targetId, 'favourite'),
        engagementService.getEngagementCount(targetId, 'favourite')
      ]);
      setIsLiked(liked);
      setLikeCount(count);
    };
    
    checkFavouriteStatus();
  }, [currentUserId, targetId]);

  const handleFavourite = async () => {
    if (!currentUserId) return;
    
    try {
      if (isFavourite) {
        await engagementService.removeEngagement(currentUserId, targetId, 'favourite');
        setFavouriteCount(prev => prev - 1);
      } else {
        await engagementService.recordEngagement(
          currentUserId, 
          targetType, 
          targetId, 
          'favourite'
        );
        setFavouriteCount(prev => prev + 1);
      }
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  return (
    <button onClick={handleFavourite} className="flex items-center gap-1">
      {/* {isLiked ? '❤️' : '🤍'} {likeCount} */}
      {isLiked ? <FaRegHeart/> : <FaHeart/>}{favouriteCount}
    </button>
  );
}