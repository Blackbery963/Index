// import { Query } from 'appwrite';
// import { storage, databases } from '../../../appwriteConfig';
// import { fetchUserProfile } from './galleryService';

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
// const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

// export const fetchAppwriteMedia = async (filter, lastId = null) => {
//   try {
//     const queries = [
//       Query.orderDesc('uploadDate'),
//       Query.limit(20),
//       Query.select(['$id', 'fileId', 'title', 'description', 'tag', 'userId', 'uploadDate', 'viewCount', 'fileType'])
//     ];

//     if (lastId) {
//       queries.push(Query.cursorAfter(lastId));
//     }

//     const response = await databases.listDocuments(
//       DATABASE_ID,
//       COLLECTION_ID,
//       queries
//     );

//     const mediaWithUrls = await Promise.all(
//       response.documents.map(async (doc) => {
//         try {
//           const url = storage.getFileView(BUCKET_ID, doc.fileId);
//           return { 
//             ...doc, 
//             url, 
//             isFeatured: false,
//             type: doc.type || 'image' // Default to image if type not specified
//           };
//         } catch (err) {
//           console.error(`Error getting URL for ${doc.fileId}:`, err);
//           return null;
//         }
//       })
//     );

//     const validMedia = mediaWithUrls.filter(item => item !== null);
    
//     // Filter by type if needed
//     let filteredMedia = validMedia;
//     if (filter === 'videos') {
//       filteredMedia = validMedia.filter(item => item.type === 'video');
//     }

//     // Fetch user profiles
//     const uniqueUserIds = [...new Set(filteredMedia.map(item => item.userId))];
//     const profiles = {};
//     await Promise.all(
//       uniqueUserIds.map(async userId => {
//         profiles[userId] = await fetchUserProfile(userId);
//       })
//     );

//     return {
//       media: filteredMedia,
//       profiles,
//       lastId: filteredMedia.length > 0 ? filteredMedia[filteredMedia.length - 1].$id : null
//     };
//   } catch (error) {
//     console.error('Error fetching Appwrite media:', error);
//     throw error;
//   }
// };



import { Query } from 'appwrite';
import { storage, databases } from '../../../appwriteConfig';
import { fetchUserProfile } from './galleryService';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

// Cache for user profiles to avoid duplicate requests
const userProfileCache = new Map();

export const fetchAppwriteMedia = async (filter, lastId = null, options = {}) => {
  const {
    pageSize = 20,
    enableCache = true,
    retryCount = 3
  } = options;

  try {
    // Build queries dynamically based on filter and pagination
    const queries = [
      Query.orderDesc('uploadDate'),
      Query.limit(pageSize),
      Query.select([
        '$id', 
        'fileId', 
        'title', 
        'description', 
        'tag', 
        'userId', 
        'uploadDate', 
        'viewCount', 
        'fileType',
      ])
    ];

    // Add cursor for pagination
    if (lastId) {
      queries.push(Query.cursorAfter(lastId));
    }

    // Add filter conditions
    if (filter === 'videos') {
      queries.push(Query.equal('fileType', 'video'));
    } else if (filter === 'images') {
      queries.push(Query.equal('fileType', 'image'));
    }

    console.log(`Fetching Appwrite media: filter=${filter}, lastId=${lastId}, pageSize=${pageSize}`);

    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      queries
    );

    // Process media items in parallel with better error handling
    const mediaProcessing = response.documents.map(async (doc) => {
      try {
        // Get file URL with error handling
        let url;
        try {
          url = storage.getFileView(BUCKET_ID, doc.fileId);
          
          // For videos, try to get a preview thumbnail if available
          if (doc.fileType === 'video') {
            // You can add video thumbnail logic here if you store thumbnails separately
          }
        } catch (urlError) {
          console.warn(`Failed to get URL for file ${doc.fileId}:`, urlError);
          return null; // Skip this item if we can't get the URL
        }

        // Determine media type
        const type = determineMediaType(doc.fileType, doc.fileId);
        
        // Parse tags if they're stored as string
        const tags = parseTags(doc.tag);

        return {
          ...doc,
          url,
          isFeatured: false,
          type,
          tag: tags,
          source: 'appwrite',
          // Add additional metadata
          aspectRatio: calculateAspectRatio(doc.dimensions),
          fileInfo: {
            size: doc.fileSize,
            dimensions: doc.dimensions,
            type: doc.fileType
          }
        };
      } catch (err) {
        console.error(`Error processing document ${doc.$id}:`, err);
        return null;
      }
    });

    const mediaResults = await Promise.allSettled(mediaProcessing);
    const validMedia = mediaResults
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(result => result.value);

    console.log(`Successfully processed ${validMedia.length}/${response.documents.length} media items`);

    // Enhanced user profile fetching with caching
    const uniqueUserIds = [...new Set(validMedia.map(item => item.userId))];
    const profiles = await fetchUserProfilesWithCache(uniqueUserIds, enableCache);

    // Determine if there's more data
    const hasMore = validMedia.length === pageSize;

    return {
      media: validMedia,
      profiles,
      lastId: validMedia.length > 0 ? validMedia[validMedia.length - 1].$id : null,
      hasMore,
      total: response.total,
      stats: {
        requested: response.documents.length,
        processed: validMedia.length,
        failed: response.documents.length - validMedia.length
      }
    };
  } catch (error) {
    console.error('Error fetching Appwrite media:', error);
    
    // Retry logic
    if (retryCount > 0) {
      console.log(`Retrying fetch... (${retryCount} attempts left)`);
      return fetchAppwriteMedia(filter, lastId, {
        ...options,
        retryCount: retryCount - 1
      });
    }
    
    throw new Error(`Failed to fetch Appwrite media after retries: ${error.message}`);
  }
};

// Enhanced user profile fetching with caching
const fetchUserProfilesWithCache = async (userIds, enableCache = true) => {
  const profiles = {};
  const uncachedUserIds = [];

  // Check cache first
  if (enableCache) {
    userIds.forEach(userId => {
      if (userProfileCache.has(userId)) {
        profiles[userId] = userProfileCache.get(userId);
      } else {
        uncachedUserIds.push(userId);
      }
    });
  } else {
    uncachedUserIds.push(...userIds);
  }

  // Fetch uncached profiles
  if (uncachedUserIds.length > 0) {
    const profilePromises = uncachedUserIds.map(async (userId) => {
      try {
        const profile = await fetchUserProfile(userId);
        if (enableCache) {
          userProfileCache.set(userId, profile);
        }
        return { userId, profile };
      } catch (error) {
        console.error(`Failed to fetch profile for user ${userId}:`, error);
        return {
          userId,
          profile: {
            name: 'Unknown Artist',
            profileImage: null,
            title: '',
            isFallback: true
          }
        };
      }
    });

    const profileResults = await Promise.allSettled(profilePromises);
    
    profileResults.forEach(result => {
      if (result.status === 'fulfilled') {
        profiles[result.value.userId] = result.value.profile;
      }
    });
  }

  return profiles;
};

// Helper function to determine media type
const determineMediaType = (fileType, fileId) => {
  if (fileType) {
    return fileType.toLowerCase();
  }
  
  // Fallback: determine from file extension
  const extension = fileId.split('.').pop()?.toLowerCase();
  const videoExtensions = ['mp4', 'mov', 'avi', 'webm', 'mkv'];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];
  
  if (videoExtensions.includes(extension)) return 'video';
  if (imageExtensions.includes(extension)) return 'image';
  
  return 'image'; // Default to image
};

// Helper function to parse tags
const parseTags = (tagData) => {
  if (!tagData) return ['art'];
  
  if (Array.isArray(tagData)) {
    return tagData.slice(0, 5); // Limit to 5 tags
  }
  
  if (typeof tagData === 'string') {
    return tagData.split(',').map(tag => tag.trim()).slice(0, 5);
  }
  
  return ['art'];
};

// Helper function to calculate aspect ratio
const calculateAspectRatio = (dimensions) => {
  if (!dimensions) return null;
  
  try {
    const [width, height] = dimensions.split('x').map(Number);
    if (width && height) {
      return width / height;
    }
  } catch (error) {
    console.warn('Failed to parse dimensions:', dimensions);
  }
  
  return null;
};

// Clear user profile cache (useful for logout or profile updates)
export const clearUserProfileCache = (userId = null) => {
  if (userId) {
    userProfileCache.delete(userId);
  } else {
    userProfileCache.clear();
  }
};

// Get cache statistics (for debugging)
export const getCacheStats = () => {
  return {
    size: userProfileCache.size,
    keys: Array.from(userProfileCache.keys())
  };
};

// Batch fetch media by IDs (useful for similar content or featured items)
export const fetchMediaByIds = async (mediaIds) => {
  try {
    const queries = [
      Query.select(['$id', 'fileId', 'title', 'description', 'tag', 'userId', 'uploadDate', 'viewCount', 'fileType'])
    ];

    // Appwrite doesn't support OR queries natively, so we fetch one by one
    // For better performance, consider storing related media in a separate collection
    const mediaPromises = mediaIds.map(async (mediaId) => {
      try {
        const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, mediaId);
        const url = storage.getFileView(BUCKET_ID, doc.fileId);
        
        return {
          ...doc,
          url,
          isFeatured: false,
          type: determineMediaType(doc.fileType, doc.fileId),
          tag: parseTags(doc.tag),
          source: 'appwrite'
        };
      } catch (error) {
        console.error(`Failed to fetch media ${mediaId}:`, error);
        return null;
      }
    });

    const mediaResults = await Promise.allSettled(mediaPromises);
    return mediaResults
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(result => result.value);

  } catch (error) {
    console.error('Error fetching media by IDs:', error);
    return [];
  }
};