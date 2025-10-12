// import { Query, } from 'appwrite'; // Add databases import
// import { storage, databases } from '../../../appwriteConfig';
// import { fetchAppwriteMedia } from './appwriteService';
// import { fetchFeaturedMedia } from './featuredMediaService';

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
// const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
// const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

// // Fetch user profile
// export const fetchUserProfile = async (userId) => {
//   try {
//     const response = await databases.getDocument(
//       DATABASE_ID,
//       USER_COLLECTION_ID,
//       userId
//     );
//     return {
//       name: response.name || response.username || 'Unknown Artist',
//       profileImage: response.profileImage || null,
//       title: response.title || ''
//     };
//   } catch (err) {
//     console.error(`Error fetching profile for user ${userId}:`, err);
//     return {
//       name: 'Unknown Artist',
//       profileImage: null,
//       title: ''
//     };
//   }
// };

// export const fetchGalleryData = async (filter = 'all', options = {}) => {
//   try {
//     let appwriteMedia = [];
//     let featuredMedia = [];
//     let profiles = {};
//     let hasMore = true;
//     let appwriteLastId = null;
//     let featuredHasMore = false;

//     // Fetch Appwrite data with pagination support
//     if (filter === 'all' || filter === 'user' || filter === 'videos') {
//       const appwriteFilter = filter === 'user' ? 'all' : filter;
//       const appwriteData = await fetchAppwriteMedia(appwriteFilter, null, options);
//       appwriteMedia = appwriteData.media;
//       profiles = appwriteData.profiles;
//       appwriteLastId = appwriteData.lastId;
//       hasMore = appwriteData.hasMore;
//     }

//     // Fetch featured data
//     if (filter === 'all' || filter === 'featured' || filter === 'videos') {
//       const featuredData = await fetchFeaturedMedia(filter, 1);
//       featuredMedia = featuredData.media;
//       featuredHasMore = featuredData.hasMore;
//       // Combine hasMore logic
//       hasMore = hasMore || featuredHasMore;
//     }

//     // Combine and filter media
//     let combinedMedia = [];
//     switch (filter) {
//       case 'user':
//         combinedMedia = appwriteMedia.filter(item => !item.isFeatured);
//         hasMore = appwriteMedia.length > 0 ? hasMore : false;
//         break;
//       case 'featured':
//         combinedMedia = featuredMedia;
//         hasMore = featuredHasMore;
//         break;
//       case 'videos':
//         combinedMedia = [...appwriteMedia, ...featuredMedia].filter(item => item.type === 'video');
//         hasMore = hasMore || featuredHasMore;
//         break;
//       default:
//         combinedMedia = [...appwriteMedia, ...featuredMedia];
//         hasMore = hasMore || featuredHasMore;
//     }

//     return {
//       media: combinedMedia,
//       profiles,
//       hasMore,
//       pagination: {
//         appwriteLastId,
//         featuredPage: 1
//       }
//     };
//   } catch (error) {
//     console.error('Error fetching gallery data:', error);
//     throw error;
//   }
// };

// export const loadMoreData = async (filter, existingMedia, pagination, options = {}) => {
//   try {
//     let newAppwriteMedia = [];
//     let newFeaturedMedia = [];
//     let newProfiles = {};
//     let hasMore = false;
//     let appwriteHasMore = false;
//     let featuredHasMore = false;

//     // Fetch more Appwrite data
//     if (filter === 'all' || filter === 'user' || filter === 'videos') {
//       const appwriteFilter = filter === 'user' ? 'all' : filter;
//       const appwriteData = await fetchAppwriteMedia(
//         appwriteFilter, 
//         pagination.appwriteLastId, 
//         options
//       );
//       newAppwriteMedia = appwriteData.media;
//       newProfiles = appwriteData.profiles;
//       appwriteHasMore = appwriteData.hasMore;
//       hasMore = appwriteHasMore;
//     }

//     // Fetch more featured data
//     if (filter === 'all' || filter === 'featured' || filter === 'videos') {
//       const featuredData = await fetchFeaturedMedia(filter, pagination.featuredPage + 1);
//       newFeaturedMedia = featuredData.media;
//       featuredHasMore = featuredData.hasMore;
//       hasMore = hasMore || featuredHasMore;
//     }

//     // Combine new media
//     let combinedMedia = [];
//     switch (filter) {
//       case 'user':
//         combinedMedia = newAppwriteMedia.filter(item => !item.isFeatured);
//         hasMore = appwriteHasMore;
//         break;
//       case 'featured':
//         combinedMedia = newFeaturedMedia;
//         hasMore = featuredHasMore;
//         break;
//       case 'videos':
//         combinedMedia = [...newAppwriteMedia, ...newFeaturedMedia].filter(item => item.type === 'video');
//         hasMore = appwriteHasMore || featuredHasMore;
//         break;
//       default:
//         combinedMedia = [...newAppwriteMedia, ...newFeaturedMedia];
//         hasMore = appwriteHasMore || featuredHasMore;
//     }

//     return {
//       media: combinedMedia,
//       profiles: newProfiles,
//       hasMore,
//       pagination: {
//         appwriteLastId: newAppwriteMedia.length > 0 ? newAppwriteMedia[newAppwriteMedia.length - 1].$id : pagination.appwriteLastId,
//         featuredPage: pagination.featuredPage + 1
//       }
//     };
//   } catch (error) {
//     console.error('Error loading more data:', error);
//     throw error;
//   }
// };


import { Query } from 'appwrite';
import { storage, databases } from '../../../appwriteConfig';
import { fetchAppwriteMedia } from './appwriteService';
import { fetchFeaturedMedia, loadMoreFeaturedMedia } from './featuredMediaService';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

// Fetch user profile (keep your existing implementation)
export const fetchUserProfile = async (userId) => {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      userId
    );
    return {
      name: response.name || response.username || 'Unknown Artist',
      profileImage: response.profileImage || null,
      title: response.title || ''
    };
  } catch (err) {
    console.error(`Error fetching profile for user ${userId}:`, err);
    return {
      name: 'Unknown Artist',
      profileImage: null,
      title: ''
    };
  }
};

export const fetchGalleryData = async (filter = 'all', options = {}) => {
  try {
    let appwriteMedia = [];
    let featuredMedia = [];
    let profiles = {};
    
    // Track pagination state separately for each source
    let appwritePagination = { hasMore: false, lastId: null };
    let featuredPagination = { hasMore: false, page: 2 };

    // Fetch Appwrite data
    if (filter === 'all' || filter === 'user' || filter === 'videos') {
      const appwriteFilter = filter === 'user' ? 'all' : filter;
      const appwriteData = await fetchAppwriteMedia(appwriteFilter, null, options);
      appwriteMedia = appwriteData.media;
      profiles = appwriteData.profiles;
      appwritePagination = {
        hasMore: appwriteData.hasMore,
        lastId: appwriteData.lastId
      };
    }

    // Fetch featured data
    if (filter === 'all' || filter === 'featured' || filter === 'videos') {
      const featuredData = await fetchFeaturedMedia(filter, 1);
      featuredMedia = featuredData.media;
      featuredPagination = {
        hasMore: featuredData.hasMore,
        page: 1
      };
    }

    // Combine and filter media based on filter type
    let combinedMedia = [];
    let hasMore = false;

    switch (filter) {
      case 'user':
        combinedMedia = appwriteMedia.filter(item => !item.isFeatured);
        hasMore = appwritePagination.hasMore;
        break;
      case 'featured':
        combinedMedia = featuredMedia;
        hasMore = featuredPagination.hasMore;
        break;
      case 'videos':
        combinedMedia = [...appwriteMedia, ...featuredMedia].filter(item => item.type === 'video');
        hasMore = appwritePagination.hasMore || featuredPagination.hasMore;
        break;
      default: // 'all'
        combinedMedia = [...appwriteMedia, ...featuredMedia];
        hasMore = appwritePagination.hasMore || featuredPagination.hasMore;
    }

    return {
      media: combinedMedia,
      profiles,
      hasMore,
      pagination: {
        appwrite: appwritePagination,
        featured: featuredPagination,
        filter: filter
      }
    };
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    throw error;
  }
};

export const loadMoreData = async (filter, existingMedia, pagination, options = {}) => {
  try {
    let newAppwriteMedia = [];
    let newFeaturedMedia = [];
    let newProfiles = {};
    
    // Track new pagination state
    let appwritePagination = { hasMore: false, lastId: pagination.appwrite?.lastId };
    let featuredPagination = { hasMore: false, page: pagination.featured?.page || 1 };

    // Fetch more Appwrite data if applicable and has more
    if ((filter === 'all' || filter === 'user' || filter === 'videos') && pagination.appwrite?.hasMore) {
      const appwriteFilter = filter === 'user' ? 'all' : filter;
      const appwriteData = await fetchAppwriteMedia(
        appwriteFilter, 
        pagination.appwrite.lastId, 
        options
      );
      newAppwriteMedia = appwriteData.media;
      newProfiles = appwriteData.profiles;
      appwritePagination = {
        hasMore: appwriteData.hasMore,
        lastId: appwriteData.lastId
      };
    }

    // Fetch more featured data if applicable and has more
    if ((filter === 'all' || filter === 'featured' || filter === 'videos') && pagination.featured?.hasMore) {
      const nextFeaturedPage = pagination.featured.page + 1;
      const featuredData = await fetchFeaturedMedia(filter, nextFeaturedPage);
      newFeaturedMedia = featuredData.media;
      featuredPagination = {
        hasMore: featuredData.hasMore,
        page: nextFeaturedPage
      };
    }

    // Combine new media based on filter
    let combinedMedia = [];
    let hasMore = false;

    switch (filter) {
      case 'user':
        combinedMedia = newAppwriteMedia.filter(item => !item.isFeatured);
        hasMore = appwritePagination.hasMore;
        break;
      case 'featured':
        combinedMedia = newFeaturedMedia;
        hasMore = featuredPagination.hasMore;
        break;
      case 'videos':
        combinedMedia = [...newAppwriteMedia, ...newFeaturedMedia].filter(item => item.type === 'video');
        hasMore = appwritePagination.hasMore || featuredPagination.hasMore;
        break;
      default: // 'all'
        combinedMedia = [...newAppwriteMedia, ...newFeaturedMedia];
        hasMore = appwritePagination.hasMore || featuredPagination.hasMore;
    }

    // Prevent duplicates
    const existingIds = new Set(existingMedia.map(item => item.$id));
    const uniqueNewMedia = combinedMedia.filter(item => !existingIds.has(item.$id));

    return {
      media: uniqueNewMedia,
      profiles: newProfiles,
      hasMore,
      pagination: {
        appwrite: appwritePagination,
        featured: featuredPagination,
        filter: filter
      }
    };
  } catch (error) {
    console.error('Error loading more data:', error);
    throw error;
  }
};