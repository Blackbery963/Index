// // services/artworkService.js
// import { databases, storage } from '../../appwriteConfig';
// import { Query } from 'appwrite';

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
// const METADATA_COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
// const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
// const PROFILE_BUCKET_ID = import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID;

// export class ArtworkService {
//   // Fetch user profile
//   static async fetchUserProfile(userId) {
//     try {
//       const response = await databases.getDocument(
//         DATABASE_ID,
//         USER_COLLECTION_ID,
//         userId
//       );
      
//       let profileImageUrl = null;
//       if (response.profileImageId) {
//         profileImageUrl = storage.getFilePreview(
//           PROFILE_BUCKET_ID,
//           response.profileImageId
//         );
//       }

//       return {
//         name: response.name || response.username || 'Unknown Artist',
//         profileImage: profileImageUrl,
//         title: response.title || ''
//       };
//     } catch (err) {
//       console.error(`Error fetching profile for user ${userId}:`, err);
//       return {
//         name: 'Unknown Artist',
//         profileImage: null,
//         title: ''
//       };
//     }
//   }
  

//   // Get file preview URL
//   static getFilePreviewUrl(fileId) {
//     if (!fileId) return null;
//     return storage.getFilePreview(BUCKET_ID, fileId);
//   }

//   // Fetch all artwork with images
//   static async fetchArtwork(limit = 20) {
//     try {
//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         METADATA_COLLECTION_ID,
//         [
//           Query.orderDesc('$createdAt'),
//           Query.limit(limit),
//           Query.isNotNull('price', ),
//           Query.isNotNull('fileId')
//         ]
//       );

//       const artworksWithImages = await Promise.all(
//         response.documents.map(async (art) => {
//           try {
//             // Get main image
//             let imageUrl = null;
//             if (art.fileId) {
//               imageUrl = this.getFilePreviewUrl(art.fileId);
//             }

//             // Get additional images
//             let additionalImages = [];
//             if (art.additionalImageIds && art.additionalImageIds.length > 0) {
//               additionalImages = art.additionalImageIds
//                 .map(id => this.getFilePreviewUrl(id))
//                 .filter(url => url !== null);
//             }

//             // Get user data
//             let userData = { name: 'Unknown Artist' };
//             if (art.userId) {
//               userData = await this.fetchUserProfile(art.userId);
//             }

//             return {
//               ...art,
//               imageUrl,
//               additionalImages,
//               artist: userData.name,
//               profileImage: userData.profileImage,
//               formattedDate: new Date(art.$createdAt).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//               }),
//             };
//           } catch (err) {
//             console.error('Error processing artwork:', art.fileId, err);
//             return {
//               ...art,
//               imageUrl: null,
//               additionalImages: [],
//               artist: 'Unknown Artist',
//               formattedDate: 'Date not available'
//             };
//           }
//         })
//       );

//       return artworksWithImages;
//     } catch (err) {
//       console.error('Error fetching artwork:', err);
//       throw new Error('Failed to load artwork. Please try again later.');
//     }
//   }

//   // Fetch artwork by category
//   static async fetchArtworkByCategory(category, limit = 20) {
//     try {
//       const queries = [
//         Query.orderDesc('$createdAt'),
//         Query.limit(limit),
//         Query.isNotNull('price'),
//         Query.isNotNull('fileId'),
//         Query.select([
//           '$id', 'title', 'description', 'fileId', 'medium', 'tag', 
//           'userId', 'uploadDate', 'price', 'status', 'awards', 
//           'fileType', 'additionalImageIds', 'isForSale'
//         ])
//       ];

//       if (category !== 'trending') {
//         queries.push(Query.equal('category', category));
//       }

//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         METADATA_COLLECTION_ID,
//         queries
//       );

//       const artworks = await Promise.all(
//         response.documents.map(async (art) => {
//           const imageUrl = art.fileId ? this.getFilePreviewUrl(art.fileId) : null;
          
//           let additionalImages = [];
//           if (art.additionalImageIds && art.additionalImageIds.length > 0) {
//             additionalImages = art.additionalImageIds
//               .map(id => this.getFilePreviewUrl(id))
//               .filter(url => url !== null);
//           }

//           let userData = { name: 'Unknown Artist' };
//           if (art.userId) {
//             userData = await this.fetchUserProfile(art.userId);
//           }

//           return {
//             ...art,
//             imageUrl,
//             additionalImages,
//             artist: userData.name,
//             profileImage: userData.profileImage,
//             formattedDate: new Date(art.$createdAt).toLocaleDateString('en-US', {
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric'
//             }),
//           };
//         })
//       );

//       // For trending, sort by rating
//       if (category === 'trending') {
//         return artworks.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, limit);
//       }

//       return artworks;
//     } catch (err) {
//       console.error(`Error fetching artwork for category ${category}:`, err);
//       throw new Error(`Failed to load ${category} artwork. Please try again later.`);
//     }
//   }
// }

// services/artworkService.js
// import { databases, storage } from '../../appwriteConfig';
// import { Query } from 'appwrite';

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
// const METADATA_COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
// const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
// const PROFILE_BUCKET_ID = import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID;

// export class ArtworkService {
//   // Fetch user profile
//   static async fetchUserProfile(userId) {
//     try {
//       const response = await databases.getDocument(
//         DATABASE_ID,
//         USER_COLLECTION_ID,
//         userId
//       );
      
//       let profileImageUrl = null;
//       if (response.profileImageId) {
//         profileImageUrl = storage.getFilePreview(
//           PROFILE_BUCKET_ID,
//           response.profileImageId
//         );
//       }

//       return {
//         name: response.name || response.username || 'Unknown Artist',
//         profileImage: profileImageUrl,
//         title: response.title || ''
//       };
//     } catch (err) {
//       console.error(`Error fetching profile for user ${userId}:`, err);
//       return {
//         name: 'Unknown Artist',
//         profileImage: null,
//         title: ''
//       };
//     }
//   }

//   // Get file preview URL
//   static getFilePreviewUrl(fileId) {
//     if (!fileId) return null;
//     try {
//       return storage.getFilePreview(BUCKET_ID, fileId);
//     } catch (error) {
//       console.error('Error getting file preview for ID:', fileId, error);
//       return null;
//     }
//   }

//   // Debug function to check artwork data
//   static debugArtworkData(art) {
//     console.log('Artwork Data:', {
//       id: art.$id,
//       title: art.title,
//       fileId: art.fileId,
//       additionalImageIds: art.additionalImageIds,
//       hasAdditionalImages: art.additionalImageIds && art.additionalImageIds.length > 0,
//       additionalImagesType: typeof art.additionalImageIds,
//       additionalImagesValue: art.additionalImageIds
//     });
//   }

//   // Fetch all artwork with images
//   static async fetchArtwork(limit = 20) {
//     try {
//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         METADATA_COLLECTION_ID,
//         [
//           Query.orderDesc('$createdAt'),
//           Query.limit(limit),
//           Query.isNotNull('price'),
//           Query.isNotNull('fileId')
//         ]
//       );

//       console.log('Total artworks fetched:', response.documents.length);

//       const artworksWithImages = await Promise.all(
//         response.documents.map(async (art) => {
//           try {
//             // Debug the artwork data
//             this.debugArtworkData(art);

//             // Get main image
//             let imageUrl = null;
//             if (art.fileId) {
//               imageUrl = this.getFilePreviewUrl(art.fileId);
//             }

//             // Get additional images - FIXED LOGIC
//             let additionalImages = [];
            
//             // Check if additionalImageIds exists and is an array
//             if (art.additionalImageIds && Array.isArray(art.additionalImageIds)) {
//               console.log(`Artwork ${art.$id} has additionalImageIds:`, art.additionalImageIds);
              
//               // Process each additional image ID
//               additionalImages = await Promise.all(
//                 art.additionalImageIds.map(async (imageId) => {
//                   try {
//                     const url = this.getFilePreviewUrl(imageId);
//                     console.log(`Additional image ${imageId} URL:`, url);
//                     return url;
//                   } catch (error) {
//                     console.error(`Error processing additional image ${imageId}:`, error);
//                     return null;
//                   }
//                 })
//               );
              
//               // Filter out null values
//               additionalImages = additionalImages.filter(url => url !== null);
//               console.log(`Filtered additional images for ${art.$id}:`, additionalImages);
//             } else {
//               console.log(`Artwork ${art.$id} has no additionalImageIds or it's not an array:`, art.additionalImageIds);
//             }

//             // Get user data
//             let userData = { name: 'Unknown Artist' };
//             if (art.userId) {
//               userData = await this.fetchUserProfile(art.userId);
//             }

//             const artworkData = {
//               ...art,
//               imageUrl,
//               additionalImages,
//               artist: userData.name,
//               profileImage: userData.profileImage,
//               formattedDate: new Date(art.$createdAt).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//               }),
//             };

//             console.log('Final artwork data:', artworkData);
//             return artworkData;

//           } catch (err) {
//             console.error('Error processing artwork:', art.fileId, err);
//             return {
//               ...art,
//               imageUrl: null,
//               additionalImages: [],
//               artist: 'Unknown Artist',
//               formattedDate: 'Date not available'
//             };
//           }
//         })
//       );

//       return artworksWithImages;
//     } catch (err) {
//       console.error('Error fetching artwork:', err);
//       throw new Error('Failed to load artwork. Please try again later.');
//     }
//   }

//   // Enhanced version to handle different data structures
//   static async fetchArtworkEnhanced(limit = 20) {
//     try {
//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         METADATA_COLLECTION_ID,
//         [
//           Query.orderDesc('$createdAt'),
//           Query.limit(limit),
//           Query.isNotNull('price'),
//           Query.isNotNull('fileId')
//         ]
//       );

//       const artworksWithImages = await Promise.all(
//         response.documents.map(async (art) => {
//           try {
//             // Get main image
//             let imageUrl = art.fileId ? this.getFilePreviewUrl(art.fileId) : null;

//             // Handle additional images with multiple possible formats
//             let additionalImages = [];
            
//             // Case 1: additionalImageIds is an array of strings
//             if (art.additionalImageIds && Array.isArray(art.additionalImageIds)) {
//               additionalImages = art.additionalImageIds
//                 .map(id => this.getFilePreviewUrl(id))
//                 .filter(url => url !== null);
//             }
//             // Case 2: additionalImages is an array of strings
//             else if (art.additionalImages && Array.isArray(art.additionalImages)) {
//               additionalImages = art.additionalImages
//                 .map(id => this.getFilePreviewUrl(id))
//                 .filter(url => url !== null);
//             }
//             // Case 3: additionalImages is a comma-separated string
//             else if (art.additionalImages && typeof art.additionalImages === 'string') {
//               const imageIds = art.additionalImages.split(',').map(id => id.trim());
//               additionalImages = imageIds
//                 .map(id => this.getFilePreviewUrl(id))
//                 .filter(url => url !== null);
//             }
//             // Case 4: Check for sale items specifically
//             else if (art.isForSale) {
//               console.log('For sale item without additional images:', art.$id);
//             }

//             // Get user data
//             let userData = { name: 'Unknown Artist' };
//             if (art.userId) {
//               userData = await this.fetchUserProfile(art.userId);
//             }

//             return {
//               ...art,
//               imageUrl,
//               additionalImages,
//               artist: userData.name,
//               profileImage: userData.profileImage,
//               formattedDate: new Date(art.$createdAt).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//               }),
//             };

//           } catch (err) {
//             console.error('Error processing artwork:', art.$id, err);
//             return {
//               ...art,
//               imageUrl: null,
//               additionalImages: [],
//               artist: 'Unknown Artist',
//               formattedDate: 'Date not available'
//             };
//           }
//         })
//       );

//       return artworksWithImages;
//     } catch (err) {
//       console.error('Error fetching artwork:', err);
//       throw new Error('Failed to load artwork. Please try again later.');
//     }
//   }
// }


// services/artworkService.js
import { databases, storage } from '../../appwriteConfig';
import { Query } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
const METADATA_COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
const PROFILE_BUCKET_ID = import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID;

export class ArtworkService {
  /** ---------------------------
   * Get user profile data
   ---------------------------- */
  static async fetchUserProfile(userId) {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        userId
      );

      let profileImageUrl = null;
      if (response.profileImageId) {
        profileImageUrl = storage.getFilePreview(
          PROFILE_BUCKET_ID,
          response.profileImageId
        );
      }

      return {
        name: response.name || response.username || 'Unknown Artist',
        profileImage: profileImageUrl,
        title: response.title || ''
      };
    } catch (err) {
      console.error(`Error fetching profile for user ${userId}:`, err);
      return { name: 'Unknown Artist', profileImage: null, title: '' };
    }
  }

  /** ---------------------------
   * Get preview URL for a file
   ---------------------------- */
  static getFilePreviewUrl(fileId) {
    if (!fileId) return null;
    try {
      return storage.getFilePreview(BUCKET_ID, fileId);
    } catch (error) {
      console.error('Error getting file preview for ID:', fileId, error);
      return null;
    }
  }

  /** ---------------------------
   * Normalize additional images
   ---------------------------- */
  static normalizeAdditionalImages(raw) {
    let ids = [];

    if (!raw) return [];

    // Case 1: Already an array
    if (Array.isArray(raw)) {
      ids = raw;
    }
    // Case 2: Comma-separated string
    else if (typeof raw === 'string') {
      ids = raw.split(',').map((id) => id.trim()).filter(Boolean);
    }
    // Case 3: Unexpected type
    else {
      console.warn('Unknown additionalImageIds format:', raw);
    }

    return ids
      .map((id) => this.getFilePreviewUrl(id))
      .filter((url) => url !== null);
  }

  /** ---------------------------
   * Fetch all artworks
   ---------------------------- */
  static async fetchArtwork(limit = 20) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        METADATA_COLLECTION_ID,
        [
          Query.orderDesc('$createdAt'),
          Query.limit(limit),
          Query.isNotNull('price'),
          Query.isNotNull('fileId')
        ]
      );

      console.log('Total artworks fetched:', response.documents.length);

      const artworksWithImages = await Promise.all(
        response.documents.map(async (art) => {
          try {
            // Main image
            const imageUrl = art.fileId
              ? this.getFilePreviewUrl(art.fileId)
              : null;

            // Additional images (robust handling)
            const additionalImages = this.normalizeAdditionalImages(
              art.additionalImageIds || art.additionalImages
            );

            // Fetch user info
            let userData = { name: 'Unknown Artist' };
            if (art.userId) {
              userData = await this.fetchUserProfile(art.userId);
            }

            return {
              ...art,
              imageUrl,
              additionalImages,
              artist: userData.name,
              profileImage: userData.profileImage,
              formattedDate: new Date(art.$createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            };
          } catch (err) {
            console.error('Error processing artwork:', art.$id, err);
            return {
              ...art,
              imageUrl: null,
              additionalImages: [],
              artist: 'Unknown Artist',
              formattedDate: 'Date not available'
            };
          }
        })
      );

      return artworksWithImages;
    } catch (err) {
      console.error('Error fetching artwork:', err);
      throw new Error('Failed to load artwork. Please try again later.');
    }
  }
}
