import { useState, useEffect } from 'react';
import { account, databases } from '../../../../appwriteConfig';
// import { followService } from '../../Follow/FollowService';
import { followService } from '../../../../Follow/FollowService';
// import { getCollectionCount } from './getUploadArt';
import { getCollectionCount } from '../../getUploadArt';
import { Query } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

export const useAccountData = (isOwnProfile, viewedUserId) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [collectionCount, setCollectionCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const userSession = await account.get();
        setCurrentUser(userSession);
        const targetUserId = isOwnProfile ? userSession.$id : viewedUserId;
        
        if (!targetUserId) throw new Error('User not found');
        
        const userDoc = await databases.getDocument(
          DATABASE_ID,
          USER_COLLECTION_ID,
          targetUserId
        );
        
        setProfileData({
          ...userDoc,
          nickname: userDoc.nickname || userDoc.name || '',
          username: userDoc.username || userDoc.name || '',
          bio: userDoc.bio || '',
          artStyle: userDoc.artStyle || '',
          location: userDoc.location || '',
          portfolio: userDoc.portfolio || '',
          facebook: userDoc.facebook || '',
          instagram: userDoc.instagram || '',
          twitter: userDoc.twitter || '',
          linkedin: userDoc.linkedin || ''
        });

        // Load social stats in parallel
        const [followers, following, collections] = await Promise.all([
          followService.getFollowerCount(targetUserId),
          followService.getFollowingCount(targetUserId),
          getCollectionCount(targetUserId)
        ]);
        
        setFollowerCount(followers);
        setFollowingCount(following);
        setCollectionCount(collections);
        
      } catch (err) {
        setError(err.message);
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isOwnProfile, viewedUserId]);

  return {
    currentUser,
    profileData,
    loading,
    error,
    followerCount,
    followingCount,
    collectionCount,
    setFollowerCount
  };
};