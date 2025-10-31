// src/hooks/useStories.js
import { useState, useEffect } from 'react';
import { databases, storage, ID, Query, DATABASE_ID, STORIES_COLLECTION_ID, BUCKET_ID, USERS_COLLECTION_ID, PROFILE_BUCKET_ID } from '../utils/appwrite.config';
import { useAuth } from './useAuth';

export const useStories = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all stories and enrich with user data
  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        DATABASE_ID,
        STORIES_COLLECTION_ID,
        [Query.select(
          'mediaUrl',
          'coverImage',
          
        )]
        [Query.orderDesc('$createdAt')]
      );

      // Filter out expired stories on client side
      const now = new Date();
      const validStories = response.documents.filter(story => 
        new Date(story.expiresAt) > now
      );

      // Get unique userIds from valid stories only
      const userIds = [...new Set(validStories.map(s => s.userId))];

      // Fetch user docs and their profile images
      const users = await Promise.all(
        userIds.map(async (id) => {
          try {
            const doc = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, id);
            
            let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name || doc.username || 'User')}&background=random`;
            
            if (doc.profileImageFileId) {
              try {
                avatarUrl = storage.getFilePreview(PROFILE_BUCKET_ID, doc.profileImageFileId);
              } catch (fileError) {
                console.warn(`Profile image not found for user ${id}:`, fileError);
              }
            }
            else if (doc.profileImageUrl && doc.profileImageUrl.startsWith('http')) {
              avatarUrl = doc.profileImageUrl;
            }

            return { 
              userId: id, 
              name: doc.name || doc.username || 'Anonymous', 
              avatarUrl 
            };
          } catch (err) {
            console.error(`Failed to fetch user ${id}:`, err);
            return { 
              userId: id, 
              name: 'Anonymous', 
              avatarUrl: `https://ui-avatars.com/api/?name=Anonymous&background=random` 
            };
          }
        })
      );

      const userMap = new Map(users.map(u => [u.userId, u]));

      // Enrich stories with author and avatar from userMap
      const enrichedStories = validStories.map(s => ({
        ...s,
        author: (s.userId === user?.$id ? 'You' : userMap.get(s.userId)?.name || 'Anonymous'),
        avatar: userMap.get(s.userId)?.avatarUrl
      }));

      setStories(enrichedStories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create new story
  const createStory = async (storyData) => {
    try {
      if (!user) throw new Error('User not authenticated');

      let userAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
      
      if (user.profileImageFileId) {
        try {
          userAvatar = storage.getFilePreview(PROFILE_BUCKET_ID, user.profileImageFileId);
        } catch (error) {
          console.warn('Profile image not found, using default');
        }
      }

      // Calculate expiration time - 24 hours from now
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      const story = {
        ...storyData,
        userId: user.$id,
        author: user.name, // Store actual name for server-side use
        avatar: userAvatar,
        expiresAt: expiresAt.toISOString(),
        likes: 0,
        isLiked: false
      };
      
      const response = await databases.createDocument(
        DATABASE_ID,
        STORIES_COLLECTION_ID,
        ID.unique(),
        story
      );
      
      // Enrich the new story for immediate UI update
      const enrichedResponse = {
        ...response,
        author: 'You', // Show "You" for current user
        avatar: userAvatar
      };
      
      setStories(prev => [enrichedResponse, ...prev]);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Upload file to storage
  const uploadFile = async (file) => {
    try {
      const response = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file
      );
      
      const fileUrl = storage.getFilePreview(BUCKET_ID, response.$id);
      return { fileId: response.$id, url: fileUrl };
    } catch (err) {
      throw err;
    }
  };

  // Client-side cleanup (optional, for immediate removal)
  const cleanupExpiredStories = async () => {
    try {
      const now = new Date().toISOString();
      const expiredStories = await databases.listDocuments(
        DATABASE_ID,
        STORIES_COLLECTION_ID,
        [Query.lessThan('expiresAt', now)]
      );

      for (const story of expiredStories.documents) {
        if (story.coverImageFileId) {
          await storage.deleteFile(BUCKET_ID, story.coverImageFileId);
        }
        await databases.deleteDocument(DATABASE_ID, STORIES_COLLECTION_ID, story.$id);
      }

      // Update local state
      setStories(prev => prev.filter(s => new Date(s.expiresAt) > new Date()));
    } catch (err) {
      console.error('Cleanup error:', err);
    }
  };

  useEffect(() => {
    fetchStories();
    
    // Optional: Run client-side cleanup every 5 minutes
    const interval = setInterval(cleanupExpiredStories, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  return {
    stories,
    loading,
    error,
    createStory,
    uploadFile,
    fetchStories,
  };
};

