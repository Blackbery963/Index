import { useState, useEffect } from 'react';
// import { followService } from './followService';
import { followService } from './FollowService';
import { account } from '../appwriteConfig'; // ✅ Import Appwrite account

export default function FollowButton({ targetUserId, onFollowChange = () => {} }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch current user on mount
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await account.get();
        setCurrentUserId(user.$id);
      } catch (error) {
        console.error('Error getting current user:', error);
      }
    };
    getCurrentUser();
  }, []);

  // Check follow status
  useEffect(() => {
    if (!currentUserId || !targetUserId) return;

    const checkStatus = async () => {
      try {
        const status = await followService.checkFollowStatus(currentUserId, targetUserId);
        setIsFollowing(status);
      } catch (error) {
        console.error('Error checking follow status:', error);
      }
    };

    checkStatus();
  }, [currentUserId, targetUserId]);

  const handleFollow = async () => {
    if (!currentUserId || isLoading) return;

    setIsLoading(true);
    try {
      if (isFollowing) {
        await followService.unfollowUser(currentUserId, targetUserId);
      } else {
        await followService.followUser(currentUserId, targetUserId);
      }

      setIsFollowing(!isFollowing);
      onFollowChange(!isFollowing);
    } catch (error) {
      console.error('Error updating follow status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
  console.log('Current User ID:', currentUserId);
  console.log('Target User ID:', targetUserId);
  }, [currentUserId, targetUserId]);


//   if (!currentUserId || currentUserId === targetUserId) return null;
 if (!currentUserId) return <p>Loading user...</p>;

 if (currentUserId === targetUserId) {
  return <p className="text-sm text-gray-500">This is your profile</p>;
 }

  return (
    <button
      onClick={handleFollow}
      disabled={isLoading}
      className={`px-2 py-1 rounded-md ${
        isFollowing
          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      } transition-colors`}
    >
     {isLoading ? '...' : isFollowing ? 'Following' : 'Follow'}
    </button>
  );
}
