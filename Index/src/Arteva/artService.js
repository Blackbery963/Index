import { databases, storage, Query } from '../appwriteConfig';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
const METADATA_COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
const PROFILE_BUCKET_ID = import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID;

export const fetchUserProfile = async (userId) => {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      userId
    );
    
    let profileImageUrl = null;
    if (response.profileImageId) {
      profileImageUrl = storage.getFilePreview(PROFILE_BUCKET_ID, response.profileImageId);
    }

    return {
      name: response.name || response.username || 'Unknown Artist',
      profileImage: profileImageUrl,
      email: response.email || ''
    };
  } catch (err) {
    console.error(`Error fetching profile for user ${userId}:`, err);
    return {
      name: 'Unknown Artist',
      profileImage: null,
      email: ''
    };
  }
};

export const fetchArtwork = async () => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      METADATA_COLLECTION_ID,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(20),
        Query.isNotNull('price'),
        Query.isNotNull('fileId')
      ]
    );

    const artworksWithImages = await Promise.all(
      response.documents.map(async (art) => {
        try {
          let imageUrl = null;
          if (art.fileId) {
            imageUrl = storage.getFilePreview(BUCKET_ID, art.fileId);
          }
          
          let userData = { name: 'Unknown Artist', email: '' };
          if (art.userId) {
            userData = await fetchUserProfile(art.userId);
          }

          // Generate URLs for additional images
          const additionalImageUrls = art.additionalImageIds?.map(id => 
            storage.getFilePreview(BUCKET_ID, id)
          ) || [];

          return { 
            ...art, 
            imageUrl,
            additionalImageUrls,
            artist: userData.name,
            artistEmail: userData.email,
            profileImage: userData.profileImage,
            formattedDate: new Date(art.$createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
          };
        } catch (err) {
          console.error('Error processing artwork:', art.fileId, err);
          return {
            ...art,
            imageUrl: null,
            additionalImageUrls: [],
            artist: 'Unknown Artist',
            artistEmail: '',
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
};