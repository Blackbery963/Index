import { databases } from '../../appwriteConfig';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

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


// Optional: Batch fetch multiple user profiles
// export const fetchMultipleUserProfiles = async (userIds) => {
//   try {
//     if (!userIds.length) return {};
    
//     const response = await databases.listDocuments(
//       DATABASE_ID,
//       USER_COLLECTION_ID,
//       [Query.equal('$id', userIds)]
//     );

//     return response.documents.reduce((acc, userDoc) => ({
//       ...acc,
//       [userDoc.$id]: {
//         username: userDoc.username || userDoc.name || 'Unknown Artist',
//         profileImage: userDoc.profileImageUrl || null,
//         userId: userDoc.$id
//       }
//     }), {});
//   } catch (error) {
//     console.error("Error fetching multiple user profiles:", error);
//     return userIds.reduce((acc, userId) => ({
//       ...acc,
//       [userId]: {
//         username: 'Unknown Artist',
//         profileImage: null,
//         userId
//       }
//     }), {});
//   }
// };