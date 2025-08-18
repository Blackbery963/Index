// import { databases, storage, ID, Query, account } from '../appwriteConfig';

// // Config with required parameters
// const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
// const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
// const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const collectionId = import.meta.env.VITE_APPWRITE_DIARY_COLLECTION_ID;
// const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID;

// export const diaryService = {
//   async loadEntries() {
//     try {
//       const user = await account.get();
//       if (!user) throw new Error('User not authenticated');

//       const response = await databases.listDocuments(
//         databaseId,
//         collectionId,
//         [Query.equal('userId', user.$id)]
//       );

//       return response.documents.map(doc => ({
//         ...doc,
//         // Transform main image to viewable URL
//         image: doc.image ? this.getFileView(doc.image) : null,
//         // Parse and transform mood board items
//         moodBoard: this.parseMoodBoard(doc.moodBoard)
//       }));
//     } catch (error) {
//       console.error('Failed to load entries:', error);
//       throw error;
//     }
//   },

//   // parseMoodBoard(moodBoardString) {
//   //   try {
//   //     const items = JSON.parse(moodBoardString || '[]');
//   //     return items.map(item => ({
//   //       ...item,
//   //       // Transform image references to URLs
//   //       content: item.type === 'image' 
//   //         ? this.getFileView(item.content) 
//   //         : item.content
//   //     }));
//   //   } catch (error) {
//   //     console.error('Failed to parse mood board:', error);
//   //     return [];
//   //   }
//   // },


//   parseMoodBoard(moodBoard) {
//   try {
//     const items = typeof moodBoard === 'string'
//       ? JSON.parse(moodBoard || '[]')
//       : Array.isArray(moodBoard)
//         ? moodBoard
//         : [];

//     return items.map(item => ({
//       ...item,
//       content: item.type === 'image'
//         ? this.getFileView(item.content)
//         : item.content
//     }));
//   } catch (error) {
//     console.error('Failed to parse mood board:', error);
//     return [];
//   }
// }
// ,
//   async uploadFile(file) {
//     if (!file?.type?.startsWith('image/')) {
//       throw new Error('Only image files are allowed');
//     }

//     const fileId = ID.unique();
//     await storage.createFile(
//       bucketId,
//       fileId,
//       file,
//       undefined,
//       [
//         `filename:${file.name}`,
//         `content-type:${file.type}`
//       ]
//     );
//     return fileId;
//   },

//   getFileView(fileId) {
//     if (!fileId) return null;
//     return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}&mode=admin`;
//   },

//   // In your diaryService.js
//   getFilePreview(fileId) {
//   if (!fileId) return null;
//   return `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${
//     import.meta.env.VITE_APPWRITE_BUCKET_ID
//   }/files/${fileId}/view?project=${
//     import.meta.env.VITE_APPWRITE_PROJECT_ID
//   }&mode=admin`;
// },

//   async saveEntry(entryData, isEditing = false, entryId = null) {
//     const user = await account.get();
//     if (!user) throw new Error('User not authenticated');

//     // Validate required fields
//     const requiredFields = ['title', 'mood', 'date'];
//     requiredFields.forEach(field => {
//       if (!entryData[field]) throw new Error(`Missing ${field}`);
//     });

//     // Process image uploads
//     const imageFileId = entryData.image instanceof File
//       ? await this.uploadFile(entryData.image)
//       : entryData.image;

//     // Process mood board uploads
//     const processedMoodBoard = await Promise.all(
//       (entryData.moodBoard || []).map(async item => {
//         if (item.type === 'image' && item.content instanceof File) {
//           return {
//             ...item,
//             content: await this.uploadFile(item.content)
//           };
//         }
//         return item;
//       })
//     );

//     // Prepare document data
//     const documentData = {
//       ...entryData,
//       image: imageFileId,
//       moodBoard: processedMoodBoard,
//       userId: user.$id
//     };

//     return isEditing && entryId
//       ? databases.updateDocument(databaseId, collectionId, entryId, documentData)
//       : databases.createDocument(databaseId, collectionId, ID.unique(), documentData);
//   },

//   async deleteEntry(entryId) {
//     const document = await databases.getDocument(databaseId, collectionId, entryId);
    
//     // Delete associated files
//     const filesToDelete = [
//       document.image,
//       ...(JSON.parse(document.moodBoard || '[]')
//         .filter(item => item.type === 'image')
//         .map(item => item.content))
//     ].filter(Boolean);

//     await Promise.allSettled(
//       filesToDelete.map(fileId => 
//         storage.deleteFile(bucketId, fileId).catch(console.error)
//       )
//     );

//     return databases.deleteDocument(databaseId, collectionId, entryId);
//   }
// };



import { databases, storage, ID, Query, account } from '../appwriteConfig';

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
        image: doc.image ? this.getFileView(doc.image) : null,
        moodBoard: Array.isArray(doc.moodBoard)
          ? doc.moodBoard.map(item => ({
              ...item,
              content: item.type === 'image' ? this.getFileView(item.content) : item.content
            }))
          : []
      }));
    } catch (error) {
      console.error('Failed to load entries:', error);
      throw error;
    }
  },

  async uploadFile(file) {
    if (!file?.type?.startsWith('image/')) {
      throw new Error('Only image files are allowed');
    }
    const fileId = ID.unique();
    await storage.createFile(bucketId, fileId, file);
    return fileId; // Always return string
  },

  getFileView(fileId) {
    if (!fileId) return null;
    return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}&mode=admin`;
  },

  async saveEntry(entryData, isEditing = false, entryId = null) {
    const user = await account.get();
    if (!user) throw new Error('User not authenticated');

    const requiredFields = ['title', 'mood', 'date', 'artStory'];
    requiredFields.forEach(field => {
      if (!entryData[field]) throw new Error(`Missing ${field}`);
    });

    // Upload main image if needed
    const imageFileId = entryData.image instanceof File
      ? await this.uploadFile(entryData.image)
      : entryData.image || null;

    // Upload mood board images if needed
    const processedMoodBoard = await Promise.all(
      (entryData.moodBoard || []).map(async item => {
        if (item.type === 'image' && item.content instanceof File) {
          const fileId = await this.uploadFile(item.content);
          return { ...item, content: fileId };
        }
        return item;
      })
    );

    const documentData = {
      ...entryData,
      image: imageFileId,
      moodBoard: processedMoodBoard,
      userId: user.$id
    };

    return isEditing && entryId
      ? databases.updateDocument(databaseId, collectionId, entryId, documentData)
      : databases.createDocument(databaseId, collectionId, ID.unique(), documentData);
  },

  async deleteEntry(entryId) {
    const document = await databases.getDocument(databaseId, collectionId, entryId);

    const filesToDelete = [
      document.image,
      ...(Array.isArray(document.moodBoard)
        ? document.moodBoard
            .filter(item => item.type === 'image')
            .map(item => item.content)
        : [])
    ].filter(Boolean);

    await Promise.allSettled(
      filesToDelete.map(fileId =>
        storage.deleteFile(bucketId, fileId).catch(console.error)
      )
    );

    return databases.deleteDocument(databaseId, collectionId, entryId);
  }
};
