// src/hooks/useAppwrite.js
import { useState, useEffect } from 'react';
import { databases, storage, ID, Query, DATABASE_ID, STORIES_COLLECTION_ID, BUCKET_ID } from '../utils/appwrite.config';

export const useStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Add this

  // Fetch all stories
  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        DATABASE_ID,
        STORIES_COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
      );
      setStories(response.documents);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create new story
  const createStory = async (storyData) => {
    try {
      const story = {
        ...storyData,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      };
      
      const response = await databases.createDocument(
        DATABASE_ID,
        STORIES_COLLECTION_ID,
        ID.unique(),
        story
      );
      
      setStories(prev => [response, ...prev]);
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
      
      // Get file preview URL
      const fileUrl = storage.getFilePreview(BUCKET_ID, response.$id);
      return { fileId: response.$id, url: fileUrl };
    } catch (err) {
      throw err;
    }
  };

  // Delete expired stories (run this periodically)
  const cleanupExpiredStories = async () => {
    try {
      const now = new Date().toISOString();
      const expiredStories = await databases.listDocuments(
        DATABASE_ID,
        STORIES_COLLECTION_ID,
        [Query.lessThan('expiresAt', now)]
      );

      // Delete each expired story and its media
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
    
    // Cleanup every hour
    const interval = setInterval(cleanupExpiredStories, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    stories,
    loading,
    error,
    createStory,
    uploadFile,
    fetchStories,
  };
};
