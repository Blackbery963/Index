// hooks/useAccount.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { accountService } from './accountService';
import { toast } from 'react-toastify';

export const useAccount = (isOwnProfile = true) => {
  const { userId: viewedUserId } = useParams();
  const navigate = useNavigate();
  
  const [state, setState] = useState({
    currentUser: null,
    profileData: null,
    loading: true,
    error: null,
    coverImage: null,
    profileImage: null,
    showCoverButton: true,
    followerCount: 0,
    followingCount: 0,
    collectionCount: 0
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await accountService.getCurrentUser();
      } catch (err) {
        setState(prev => ({ ...prev, error: 'User not logged in', loading: false }));
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        const userSession = await accountService.getCurrentUser();
        const targetUserId = isOwnProfile ? userSession.$id : viewedUserId;
        
        if (!targetUserId) throw new Error('User not found');
        
        const userDoc = await accountService.getUserProfile(targetUserId);
        const socialStats = await accountService.getSocialStats(targetUserId);

        const profileData = {
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
        };

        setState(prev => ({
          ...prev,
          currentUser: userSession,
          profileData,
          coverImage: userDoc.coverImageUrl || null,
          profileImage: userDoc.profileImageUrl || null,
          showCoverButton: !userDoc.coverImageUrl,
          ...socialStats,
          loading: false
        }));

      } catch (err) {
        setState(prev => ({ 
          ...prev, 
          error: err.message, 
          loading: false 
        }));
      }
    };

    if (!state.error) {
      fetchProfileData();
    }
  }, [isOwnProfile, viewedUserId, state.error]);

  const handleImageUpload = async (file, imageType) => {
    try {
      accountService.validateImage(file, imageType === 'cover' ? 5 : 2);
      
      toast.info(`Uploading ${imageType} image...`);
      const bucketId = imageType === 'cover' ? COVER_BUCKET : PROFILE_BUCKET;
      const imageUrl = await accountService.uploadImage(file, bucketId);
      
      await accountService.updateUserImages(state.currentUser.$id, {
        [`${imageType}ImageUrl`]: imageUrl
      });

      setState(prev => ({
        ...prev,
        [imageType === 'cover' ? 'coverImage' : 'profileImage']: imageUrl,
        showCoverButton: imageType !== 'cover'
      }));

      toast.success(`${imageType.charAt(0).toUpperCase() + imageType.slice(1)} image updated!`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        await accountService.logout();
        window.location.href = '/login';
        toast.success('Logged out successfully');
      } catch (error) {
        toast.error('Logout failed');
      }
    }
  };

  return {
    ...state,
    handleImageUpload,
    handleLogout,
    setState: (updates) => setState(prev => ({ ...prev, ...updates }))
  };
};