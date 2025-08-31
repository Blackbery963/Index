import { storage, ID, databases } from '../../appwriteConfig';

const PROFILE_BUCKET_ID = import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID;
const COVER_BUCKET_ID = import.meta.env.VITE_APPWRITE_COVER_BUCKET_ID; // Fixed variable name
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

export const uploadImage = async (file, bucketId) => {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are allowed');
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size must be less than 5MB');
    }

    const uploadedFile = await storage.createFile(
      bucketId, // Use the parameter, not hardcoded PROFILE_BUCKET_ID
      ID.unique(),
      file
    );

    // Use /preview for images (not /view)
    const fileUrl = `https://nyc.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${uploadedFile.$id}/preview?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;


    return fileUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const updateUserImages = async (userId, { profileImageUrl, coverImageUrl }) => {
  try {
    // Only update the fields that were provided
    const updateData = {};
    if (profileImageUrl) updateData.profileImageUrl = profileImageUrl;
    if (coverImageUrl) updateData.coverImageUrl = coverImageUrl;

    await databases.updateDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      userId,
      updateData
    );
  } catch (error) {
    console.error('Error updating user images:', error);
    throw error;
  }
};


