// // // src/hooks/useAppwrite.js
// // import { useState, useEffect } from 'react';
// // import { databases, storage, ID, Query, DATABASE_ID, STORIES_COLLECTION_ID, BUCKET_ID } from '../utils/appwrite.config';

// // export const useStories = () => {
// //   const [stories, setStories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Fetch all stories
// //   const fetchStories = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await databases.listDocuments(
// //         DATABASE_ID,
// //         STORIES_COLLECTION_ID,
// //         [Query.orderDesc('$createdAt')]
// //       );
// //       setStories(response.documents);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Create new story
// //   const createStory = async (storyData) => {
// //     try {
// //       const story = {
// //         ...storyData,
// //         expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
// //       };
      
// //       const response = await databases.createDocument(
// //         DATABASE_ID,
// //         STORIES_COLLECTION_ID,
// //         ID.unique(),
// //         story
// //       );
      
// //       setStories(prev => [response, ...prev]);
// //       return response;
// //     } catch (err) {
// //       setError(err.message);
// //       throw err;
// //     }
// //   };

// //   // Upload file to storage
// //   const uploadFile = async (file) => {
// //     try {
// //       const response = await storage.createFile(
// //         BUCKET_ID,
// //         ID.unique(),
// //         file
// //       );
      
// //       // Get file preview URL
// //       const fileUrl = storage.getFilePreview(BUCKET_ID, response.$id);
// //       return { fileId: response.$id, url: fileUrl };
// //     } catch (err) {
// //       throw err;
// //     }
// //   };

// //   // Delete expired stories (run this periodically)
// //   const cleanupExpiredStories = async () => {
// //     try {
// //       const now = new Date().toISOString();
// //       const expiredStories = await databases.listDocuments(
// //         DATABASE_ID,
// //         STORIES_COLLECTION_ID,
// //         [Query.lessThan('expiresAt', now)]
// //       );

// //       // Delete each expired story and its media
// //       for (const story of expiredStories.documents) {
// //         if (story.coverImageFileId) {
// //           await storage.deleteFile(BUCKET_ID, story.coverImageFileId);
// //         }
// //         await databases.deleteDocument(DATABASE_ID, STORIES_COLLECTION_ID, story.$id);
// //       }

// //       // Update local state
// //       setStories(prev => prev.filter(s => new Date(s.expiresAt) > new Date()));
// //     } catch (err) {
// //       console.error('Cleanup error:', err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchStories();
    
// //     // Cleanup every hour
// //     const interval = setInterval(cleanupExpiredStories, 60 * 60 * 1000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   return {
// //     stories,
// //     loading,
// //     error,
// //     createStory,
// //     uploadFile,
// //     fetchStories,
// //   };
// // };


// // src/hooks/useAppwrite.js
// import { useState, useEffect } from 'react';
// import { databases, storage, ID, Query, DATABASE_ID, STORIES_COLLECTION_ID, BUCKET_ID } from '../utils/appwrite.config';
// import { useAuth } from './useAuth';
// import { use } from 'react';

// export const useStories = () => {
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch all stories
//   const fetchStories = async () => {
//     try {
//       setLoading(true);
//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         STORIES_COLLECTION_ID,
//         [Query.orderDesc('$createdAt')]
//       );
//       setStories(response.documents);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create new story
//   const createStory = async (storyData) => {
//     try {
//       const story = {
//         ...storyData,
//         userId: user.$id, // Associate story with current user
//         expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
//       };
      
//       const response = await databases.createDocument(
//         DATABASE_ID,
//         STORIES_COLLECTION_ID,
//         ID.unique(),
//         story
//       );
      
//       setStories(prev => [response, ...prev]);
//       return response;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   // Upload file to storage
//   const uploadFile = async (file) => {
//     try {
//       const response = await storage.createFile(
//         BUCKET_ID,
//         ID.unique(),
//         file
//       );
      
//       // Get file preview URL
//       const fileUrl = storage.getFilePreview(BUCKET_ID, response.$id);
//       return { fileId: response.$id, url: fileUrl };
//     } catch (err) {
//       throw err;
//     }
//   };

//   // Delete expired stories (run this periodically)
//   const cleanupExpiredStories = async () => {
//     try {
//       const now = new Date().toISOString();
//       const expiredStories = await databases.listDocuments(
//         DATABASE_ID,
//         STORIES_COLLECTION_ID,
//         [Query.lessThan('expiresAt', now)]
//       );

//       // Delete each expired story and its media
//       for (const story of expiredStories.documents) {
//         if (story.coverImageFileId) {
//           await storage.deleteFile(BUCKET_ID, story.coverImageFileId);
//         }
//         await databases.deleteDocument(DATABASE_ID, STORIES_COLLECTION_ID, story.$id);
//       }

//       // Update local state
//       setStories(prev => prev.filter(s => new Date(s.expiresAt) > new Date()));
//     } catch (err) {
//       console.error('Cleanup error:', err);
//     }
//   };

//   useEffect(() => {
//     fetchStories();
    
//     // Cleanup every hour
//     const interval = setInterval(cleanupExpiredStories, 60 * 60 * 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return {
//     stories,
//     loading,
//     error,
//     createStory,
//     uploadFile,
//     fetchStories,
//   };
// };

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
        [Query.orderDesc('$createdAt')]
      );

      // Get unique userIds
      const userIds = [...new Set(response.documents.map(s => s.userId))];

      // Fetch user docs and their profile images
      const users = await Promise.all(
        userIds.map(async (id) => {
          try {
            const doc = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, id);
            
            let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name || doc.username || 'User')}&background=random`;
            
            // If user has a profile image file ID, get the preview URL
            if (doc.profileImageFileId) {
              try {
                avatarUrl = storage.getFilePreview(PROFILE_BUCKET_ID, doc.profileImageFileId);
              } catch (fileError) {
                console.warn(`Profile image not found for user ${id}:`, fileError);
                // Keep the default avatar URL
              }
            }
            // If profileImageUrl is already a full URL, use it directly
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
      const enrichedStories = response.documents.map(s => ({
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

      // Get current user's profile data
      let userAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
      
      if (user.profileImageFileId) {
        try {
          userAvatar = storage.getFilePreview(PROFILE_BUCKET_ID, user.profileImageFileId);
        } catch (error) {
          console.warn('Profile image not found, using default');
        }
      }

      const story = {
        ...storyData,
        userId: user.$id,
        author: 'You', // This will be overridden in fetchStories, but needed for immediate UI update
        avatar: userAvatar, // Same as above
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
      
      const response = await databases.createDocument(
        DATABASE_ID,
        STORIES_COLLECTION_ID,
        ID.unique(),
        story
      );
      
      // Enrich the new story before adding to state
      const enrichedResponse = {
        ...response,
        author: 'You',
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

  // Delete expired stories
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

      setStories(prev => prev.filter(s => new Date(s.expiresAt) > new Date()));
    } catch (err) {
      console.error('Cleanup error:', err);
    }
  };

  useEffect(() => {
    fetchStories();
    
    const interval = setInterval(cleanupExpiredStories, 60 * 60 * 1000);
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