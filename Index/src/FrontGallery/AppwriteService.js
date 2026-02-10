import { Query, ID } from 'appwrite';
import { databases, storage } from '../appwriteConfig';
import { fetchUserProfile } from '../Components/Account/ProfileServixe';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

// Cache for user profiles
const userProfileCache = new Map();

/**
 * Fetches media from Appwrite with unrestricted file type support.
 */
export const fetchAppwriteMedia = async (filter = 'all', page = 1, options = {}) => {
  const {
    pageSize = 20,
    enableCache = true
  } = options;

  try {
    const offset = (page - 1) * pageSize;

    // Build base queries
    const queries = [
      Query.orderDesc('$createdAt'),
      Query.limit(pageSize),
      Query.offset(offset),
      Query.select([
        '$id', 'userId', 'title', 'description', 'fileId', 'fileType',
        'medium', 'tag', 'uploadDate', 'viewCount', 'price', 'isForSale',
        'additionalImageIds', 'originalFileName', 'status', 'awards',
        'artworkId', 'downloads', '$createdAt', '$updatedAt'
      ])
    ];

    // Apply Filters
    if (filter === 'videos') {
      queries.push(Query.equal('fileType', 'video'));
    } else if (filter === 'images') {
      // Logic: If it's not a video, it's an image/artwork.
      // Note: Ensure you have an index for 'fileType' in Appwrite.
      queries.push(Query.notEqual('fileType', 'video'));
    } else if (filter === 'for-sale') {
      queries.push(Query.equal('isForSale', true));
    }

    console.log(`Fetching Appwrite media: filter=${filter}, page=${page}`);

    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      queries
    );

    // Process media items in parallel
    const mediaProcessing = response.documents.map(async (doc) => {
      try {
        return await processMediaDocument(doc);
      } catch (err) {
        console.error(`Error processing document ${doc.$id}:`, err);
        return null;
      }
    });

    const mediaResults = await Promise.allSettled(mediaProcessing);
    const validMedia = mediaResults
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(result => result.value);

    // Fetch user profiles for the authors
    const uniqueUserIds = [...new Set(validMedia.map(item => item.userId))];
    const profiles = await fetchUserProfilesWithCache(uniqueUserIds, enableCache);

    // Pagination calculations
    const totalPages = Math.ceil(response.total / pageSize);
    const hasMore = page < totalPages;

    return {
      media: validMedia,
      profiles,
      pagination: {
        currentPage: page,
        totalPages,
        pageSize,
        totalItems: response.total,
        hasMore
      },
      stats: {
        requested: response.documents.length,
        processed: validMedia.length,
        failed: response.documents.length - validMedia.length
      }
    };
  } catch (error) {
    console.error('Error fetching Appwrite media:', error);
    throw new Error(`Failed to fetch Appwrite media: ${error.message}`);
  }
};

/**
 * Processes a single document into a usable Media Object.
 *//**
 * Processes a single document into a usable Media Object.
 */
const processMediaDocument = async (doc) => {
  let mainUrl;
  let additionalUrls = [];
  
  // 1. Determine type FIRST so we know which URL method to use
  const mediaType = determineMediaType(doc.fileType, doc.fileId);
  
  try {
    if (mediaType === 'video') {
      // VIDEOS: Use getFileView to get the raw stream
      mainUrl = storage.getFileView(BUCKET_ID, doc.fileId);
    } else {
      // IMAGES: Use getFilePreview to ensure browser compatibility (HEIC -> JPEG, etc.)
      // We set width/height to 0 (original size) or max usually 2000 to keep quality high but safe
      mainUrl = storage.getFilePreview(
        BUCKET_ID, 
        doc.fileId, 
        0, // Width (0 = original)
        0, // Height (0 = original)
        'center', // Gravity
        100 // Quality
        // Note: Appwrite automatically outputs a browser-supported format (jpg/webp)
      );
    }
    
    // Process additional images 
    if (doc.additionalImageIds) {
      additionalUrls = await fetchAdditionalImages(doc.additionalImageIds);
    }
  } catch (urlError) {
    console.warn(`Failed to get URL for file ${doc.fileId}:`, urlError);
    mainUrl = ''; 
  }

  const category = determineCategory(doc, mediaType);
  const tags = parseTags(doc.tags || doc.tag);
  const awards = parseAwards(doc.awards);

  return {
    id: doc.$id,
    documentId: doc.$id,
    artworkId: doc.artworkId || doc.$id,
    src: mainUrl,
    url: mainUrl,
    additionalImages: additionalUrls,
    type: mediaType, 
    category,
    fileType: doc.fileType,
    originalFileName: doc.originalFileName,
    title: doc.title || 'Untitled Artwork',
    description: doc.description || '',
    artist: doc.userId,
    userId: doc.userId,
    tags,
    awards,
    medium: doc.medium || 'Digital',
    likes: 0, 
    comments: 0,
    shares: 0,
    views: doc.viewCount || 0,
    downloads: doc.downloads || 0,
    trending: calculateTrendingScore(doc),
    price: doc.price || null,
    isForSale: doc.isForSale || false,
    currency: 'USD',
    timestamp: doc.uploadDate || doc.$createdAt,
    createdAt: doc.$createdAt,
    updatedAt: doc.$updatedAt,
    status: doc.status || 'published',
    source: 'appwrite',
    isFeatured: false,
    allImages: [mainUrl, ...additionalUrls.map(img => img.url)].filter(Boolean)
  };
};

// Also update fetchAdditionalImages to use Preview for images
const fetchAdditionalImages = async (additionalImageIds) => {
  try {
    const additionalIds = parseAdditionalImageIds(additionalImageIds);
    
    const imagePromises = additionalIds.map(async (fileId, index) => {
      try {
        const type = determineMediaType(null, fileId);
        let url;

        if (type === 'video') {
            url = storage.getFileView(BUCKET_ID, fileId);
        } else {
            // Force preview for additional images to ensure they render
            url = storage.getFilePreview(BUCKET_ID, fileId, 0, 0, 'center', 100);
        }

        return {
          id: fileId,
          url: url,
          type: type,
          position: index + 1,
          fileId: fileId
        };
      } catch (error) {
        console.warn(`Failed to get additional image ${fileId}:`, error);
        return null;
      }
    });

    const results = await Promise.allSettled(imagePromises);
    return results
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(result => result.value);

  } catch (error) {
    console.error('Error fetching additional images:', error);
    return [];
  }
};
/**
 * Helper: Unrestricted Media Type Determination
 * Defaults to 'image' unless it is strictly a video.
 */
const determineMediaType = (fileType, fileId) => {
  // 1. Trust DB fileType if explicitly video
  if (fileType && fileType.toLowerCase().includes('video')) {
    return 'video';
  }
  
  // 2. Check extension
  const extension = fileId?.split('.').pop()?.toLowerCase();
  
  // Extensive list of video formats to ensure they get the video player
  const videoExtensions = [
    'mp4', 'mov', 'avi', 'webm', 'mkv', 'm4v', 
    '3gp', 'ts', 'ogv', 'flv', 'wmv', 'asf', 'mpg', 'mpeg'
  ];
  
  if (extension && videoExtensions.includes(extension)) {
    return 'video';
  }
  
  // 3. Default to 'image' for everything else (jpg, png, webp, avif, svg, bmp, etc.)
  return 'image';
};

const determineCategory = (doc, mediaType) => {
  if (doc.isForSale) return 'for-sale';
  if (mediaType === 'video') return 'video';
  return 'image';
};

const parseTags = (tagData) => {
  if (!tagData) return ['art'];
  if (Array.isArray(tagData)) return tagData.slice(0, 5);
  if (typeof tagData === 'string') {
    return tagData.split(',').map(tag => tag.trim()).slice(0, 5);
  }
  return ['art'];
};

const parseAwards = (awardsData) => {
  if (!awardsData) return [];
  if (Array.isArray(awardsData)) return awardsData;
  if (typeof awardsData === 'string') {
    return awardsData.split(',').map(award => award.trim());
  }
  return [];
};

const calculateTrendingScore = (doc) => {
  let score = 0;
  score += (doc.viewCount || 0) * 0.1;
  score += (doc.downloads || 0) * 0.5;
  if (doc.awards && doc.awards.length > 0) score += doc.awards.length * 2;
  return Math.min(score, 10);
};

// const fetchAdditionalImages = async (additionalImageIds) => {
//   try {
//     const additionalIds = parseAdditionalImageIds(additionalImageIds);
    
//     const imagePromises = additionalIds.map(async (fileId, index) => {
//       try {
//         const url = storage.getFilePreview(BUCKET_ID, fileId);
//         return {
//           id: fileId,
//           url: url,
//           type: determineMediaType(null, fileId), // Recursively check type
//           position: index + 1,
//           fileId: fileId
//         };
//       } catch (error) {
//         console.warn(`Failed to get additional image ${fileId}:`, error);
//         return null;
//       }
//     });

//     const results = await Promise.allSettled(imagePromises);
//     return results
//       .filter(result => result.status === 'fulfilled' && result.value !== null)
//       .map(result => result.value);

//   } catch (error) {
//     console.error('Error fetching additional images:', error);
//     return [];
//   }
// };

const parseAdditionalImageIds = (additionalImageIds) => {
  if (!additionalImageIds) return [];
  try {
    if (Array.isArray(additionalImageIds)) return additionalImageIds.slice(0, 3);
    if (typeof additionalImageIds === 'string') {
      return additionalImageIds.split(',').map(id => id.trim()).filter(id => id).slice(0, 3);
    }
    return [];
  } catch (error) {
    console.error('Error parsing additional image IDs:', error);
    return [];
  }
};

// --- User Profile Caching ---

const fetchUserProfilesWithCache = async (userIds, enableCache = true) => {
  const profiles = {};
  const uncachedUserIds = [];

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
        return { userId, profile: getFallbackProfile(userId) };
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

const getFallbackProfile = (userId) => ({
  name: 'Unknown Artist',
  profileImage: null,
  title: 'Digital Artist',
  isFallback: true,
  userId: userId
});

export const clearUserProfileCache = (userId = null) => {
  if (userId) {
    userProfileCache.delete(userId);
  } else {
    userProfileCache.clear();
  }
};

// --- Batch Operations & Utilities ---

export const fetchMediaByIds = async (mediaIds) => {
  try {
    const mediaPromises = mediaIds.map(async (mediaId) => {
      try {
        const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, mediaId);
        return await processMediaDocument(doc);
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

export const incrementViewCount = async (mediaId) => {
  try {
    const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, mediaId);
    const currentViews = doc.viewCount || 0;
    
    await databases.updateDocument(DATABASE_ID, COLLECTION_ID, mediaId, {
      viewCount: currentViews + 1
    });
    
    return true;
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return false;
  }
};

// getFileView