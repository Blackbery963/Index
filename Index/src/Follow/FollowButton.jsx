import { useState, useEffect } from 'react';
// import { followService } from './followService';
import { followService } from './FollowService';
import { account } from '../appwriteConfig'; // ✅ Import Appwrite account
import { FiUserPlus, FiCheck } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';

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

  // const handleFollow = async () => {
  //   if (!currentUserId || isLoading) return;

  //   setIsLoading(true);
  //   try {
  //     if (isFollowing) {
  //       await followService.unfollowUser(currentUserId, targetUserId);
  //     } else {
  //       await followService.followUser(currentUserId, targetUserId);
  //     }

  //     setIsFollowing(!isFollowing);
  //     onFollowChange(!isFollowing);
  //   } catch (error) {
  //     console.error('Error updating follow status:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleFollow = async () => {
  if (!currentUserId || isLoading) return;

  setIsLoading(true);
  try {
    if (isFollowing) {
      await followService.unfollowUser(currentUserId, targetUserId);
    } else {
      await followService.followUser(currentUserId, targetUserId);
    }

    // ✅ Always re-fetch to reflect backend state
    const updatedStatus = await followService.checkFollowStatus(currentUserId, targetUserId);
    setIsFollowing(updatedStatus);
    onFollowChange(updatedStatus);
  } catch (error) {
    console.error('Error updating follow status:', error);
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
  // console.log('Current User ID:', currentUserId);
  // console.log('Target User ID:', targetUserId);
  }, [currentUserId, targetUserId]);


//   if (!currentUserId || currentUserId === targetUserId) return null;
 if (!currentUserId) return <p>Loading user...</p>;

 if (currentUserId === targetUserId) {
  return <p className="text-sm text-gray-500">This is your profile</p>;
 }

  return (
    <button
  onClick={handleFollow}
  // disabled={isLoading}
  className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 shadow-sm border font-Quicksand
    ${
      isFollowing
        ? 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
        : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
    } 
    // ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
  `}
>
  {isLoading ? (
    <ImSpinner2 className="animate-spin text-lg" />
  ) : isFollowing ? (
    <>
      <FiCheck className="text-lg" />
      Following
    </>
  ) : (
    <>
      <FiUserPlus className="text-lg" />
      Follow
    </>
  )}
</button>
  );
}
