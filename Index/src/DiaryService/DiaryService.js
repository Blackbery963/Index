// import { databases, storage, ID, Query, account } from '../appwriteConfig';

// const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT
// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const DIARY_COLLECTION_ID = import.meta.env.VITE_APPWRITE_DIARY_COLLECTION_ID;
// const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID


// let currentUserPromise = null;

// const getCurrentUser = async () => {
//   if (currentUserPromise) {
//     return currentUserPromise;
//   }

//   currentUserPromise = (async () => {
//     try {
//       const user = await account.get();
//       return user;
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       currentUserPromise = null;
//       return null;
//     }
//   })();

//   return currentUserPromise;
// };

// export const diaryService = {
//   async loadEntries() {
//     try {
//       const user = await getCurrentUser();
//       if (!user) throw new Error('User not authenticated');

//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         DIARY_COLLECTION_ID,
//         [Query.equal('userId', user.$id)]
//       );

//       return response.documents.map(doc => {
//         let moodBoard = [];
//         if (doc.moodBoard) {
//           try {
//             moodBoard = JSON.parse(doc.moodBoard);
//           } catch (parseError) {
//             console.error(`Failed to parse moodBoard for entry ${doc.$id}:`, parseError);
//           }
//         }
//         return {
//           ...doc,
//           moodBoard: Array.isArray(moodBoard) ? moodBoard : [],
//         };
//       });
//     } catch (error) {
//       console.error('Failed to load entries:', error);
//       throw error;
//     }
//   },

//   async uploadFile(file) {
//     try {
//       // Ensure we have the correct file type
//       if (!file.type.startsWith('image/')) {
//         throw new Error('Only image files are allowed');
//       }
      
//       const fileId = ID.unique();
//       const storedFile = await storage.createFile(
//         BUCKET_ID,
//         fileId,
//         file,
//         undefined, // permissions
//         [
//           `filename:${file.name}`,
//           `content-type:${file.type}`
//         ] // add file metadata
//       );
//       return storedFile.$id;
//     } catch (error) {
//       console.error('Failed to upload file:', error);
//       throw error;
//     }
//   },

//   getFilePreview(fileId) {
//    try {
//      return storage.getFilePreview(
//       BUCKET_ID,
//       fileId,
//       width, // width
//       height, // height
//       'top', // gravity
//       90, // quality
//       undefined, // background
//       undefined, // border width
//       undefined, // border radius
//       undefined, // border color
//       undefined, // border opacity
//       undefined, // rotation
//       undefined, // opacity
//     );
//    } catch (error){
//        console.error('Error fatching image', error )
//    }
//   },
//   // ... rest of your service methods

//   async saveEntry(entryData, isEditing = false, entryId = null) {
//     try {
//       const user = await getCurrentUser();
//       if (!user) throw new Error('User not authenticated');

//       const requiredFields = ['title', 'mood', 'date'];
//       for (const field of requiredFields) {
//         if (!entryData[field]) {
//           throw new Error(`Missing required field: ${field}`);
//         }
//       }

//       // Handle main image upload
//       let imageFileId = entryData.image;
//       if (entryData.image instanceof File) {
//         imageFileId = await this.uploadFile(entryData.image);
//       }

//       // Process mood board items
//       const moodBoard = entryData.moodBoard || [];
//       const processedMoodBoard = await Promise.all(
//         moodBoard.map(async (item) => {
//           if (item.type === 'image' && item.content instanceof File) {
//             const fileId = await this.uploadFile(item.content);
//             return { ...item, content: fileId };
//           }
//           return item;
//         })
//       );

//       const data = {
//         ...entryData,
//         image: imageFileId,
//         moodBoard: JSON.stringify(processedMoodBoard),
//         userId: user.$id,
//       };

//       if (isEditing && entryId) {
//         return await databases.updateDocument(
//           DATABASE_ID,
//           DIARY_COLLECTION_ID,
//           entryId,
//           data
//         );
//       } else {
//         return await databases.createDocument(
//           DATABASE_ID,
//           DIARY_COLLECTION_ID,
//           ID.unique(),
//           data
//         );
//       }
//     } catch (error) {
//       console.error('Failed to save entry:', error);
//       throw error;
//     }
//   },

//   async deleteEntry(entryId) {
//     try {
//       const document = await databases.getDocument(
//         DATABASE_ID,
//         DIARY_COLLECTION_ID,
//         entryId
//       );

//       // Delete mood board images
//       const moodBoard = document.moodBoard ? JSON.parse(document.moodBoard) : [];
//       for (const item of moodBoard) {
//         if (item.type === 'image') {
//           try {
//             await storage.deleteFile(BUCKET_ID, item.content);
//           } catch (error) {
//             console.error(`Failed to delete mood board image ${item.content}:`, error);
//           }
//         }
//       }

//       // Delete main image
//       if (document.image) {
//         try {
//           await storage.deleteFile(BUCKET_ID, document.image);
//         } catch (error) {
//           console.error(`Failed to delete main image ${document.image}:`, error);
//         }
//       }

//       await databases.deleteDocument(
//         DATABASE_ID,
//         DIARY_COLLECTION_ID,
//         entryId
//       );
//       return true;
//     } catch (error) {
//       console.error('Failed to delete entry:', error);
//       throw error;
//     }
//   },

//   // getFilePreview(fileId) {
//   //   return storage.getFilePreview(BUCKET_ID, fileId);
//   // },
//   // getFilePreview: (fileId) => {
//   //   // Example: Appwrite or similar service
//   //   return `https://localhost:5173/files/${fileId}/preview`;
//   // },
//   getFilePreview(fileId) {
//   // Replace with your actual Appwrite endpoint

//   return `${endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/preview`;
// }
// };

import { databases, storage, ID, Query, account } from '../appwriteConfig';

// Config with required parameters
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_APPWRITE_DIARY_COLLECTION_ID;
const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID;

export const diaryService = {
  async loadEntries() {
    try {
      const user = await account.get();
      if (!user) throw new Error('User not authenticated');

      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        [Query.equal('userId', user.$id)]
      );

      return response.documents.map(doc => ({
        ...doc,
        // Transform main image to viewable URL
        image: doc.image ? this.getFileView(doc.image) : null,
        // Parse and transform mood board items
        moodBoard: this.parseMoodBoard(doc.moodBoard)
      }));
    } catch (error) {
      console.error('Failed to load entries:', error);
      throw error;
    }
  },

  parseMoodBoard(moodBoardString) {
    try {
      const items = JSON.parse(moodBoardString || '[]');
      return items.map(item => ({
        ...item,
        // Transform image references to URLs
        content: item.type === 'image' 
          ? this.getFileView(item.content) 
          : item.content
      }));
    } catch (error) {
      console.error('Failed to parse mood board:', error);
      return [];
    }
  },

  async uploadFile(file) {
    if (!file?.type?.startsWith('image/')) {
      throw new Error('Only image files are allowed');
    }

    const fileId = ID.unique();
    await storage.createFile(
      bucketId,
      fileId,
      file,
      undefined,
      [
        `filename:${file.name}`,
        `content-type:${file.type}`
      ]
    );
    return fileId;
  },

  getFileView(fileId) {
    if (!fileId) return null;
    return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}&mode=admin`;
  },

  // In your diaryService.js
  getFilePreview(fileId) {
  if (!fileId) return null;
  return `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${
    import.meta.env.VITE_APPWRITE_BUCKET_ID
  }/files/${fileId}/view?project=${
    import.meta.env.VITE_APPWRITE_PROJECT_ID
  }&mode=admin`;
},

  async saveEntry(entryData, isEditing = false, entryId = null) {
    const user = await account.get();
    if (!user) throw new Error('User not authenticated');

    // Validate required fields
    const requiredFields = ['title', 'mood', 'date'];
    requiredFields.forEach(field => {
      if (!entryData[field]) throw new Error(`Missing ${field}`);
    });

    // Process image uploads
    const imageFileId = entryData.image instanceof File
      ? await this.uploadFile(entryData.image)
      : entryData.image;

    // Process mood board uploads
    const processedMoodBoard = await Promise.all(
      (entryData.moodBoard || []).map(async item => {
        if (item.type === 'image' && item.content instanceof File) {
          return {
            ...item,
            content: await this.uploadFile(item.content)
          };
        }
        return item;
      })
    );

    // Prepare document data
    const documentData = {
      ...entryData,
      image: imageFileId,
      moodBoard: JSON.stringify(processedMoodBoard),
      userId: user.$id
    };

    return isEditing && entryId
      ? databases.updateDocument(databaseId, collectionId, entryId, documentData)
      : databases.createDocument(databaseId, collectionId, ID.unique(), documentData);
  },

  async deleteEntry(entryId) {
    const document = await databases.getDocument(databaseId, collectionId, entryId);
    
    // Delete associated files
    const filesToDelete = [
      document.image,
      ...(JSON.parse(document.moodBoard || '[]')
        .filter(item => item.type === 'image')
        .map(item => item.content))
    ].filter(Boolean);

    await Promise.allSettled(
      filesToDelete.map(fileId => 
        storage.deleteFile(bucketId, fileId).catch(console.error)
      )
    );

    return databases.deleteDocument(databaseId, collectionId, entryId);
  }
};