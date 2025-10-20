import { databases, storage, ID, Query, account } from '../../appwriteConfig';

// Config with required parameters
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_APPWRITE_DIARY_COLLECTION_ID;
const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID;

export const extractDiary = {
  
async loadEntries(options = {}) {
  try {
    const queries = [
      Query.limit(options.limit || 25),
      Query.offset(options.offset || 0),
      Query.orderDesc('$createdAt'),
    ];

    const response = await databases.listDocuments(
      databaseId,
      collectionId,
      queries
    );

    if (!response || !Array.isArray(response.documents)) {
      throw new Error('Invalid response structure');
    }

    return {
      documents: response.documents.map(doc => ({
        ...doc,
        image: doc.image ? this.getFileView(doc.image) : null,
        moodBoard: this.parseMoodBoard(doc.moodBoard),
      })),
      total: response.total,
    };
  } catch (error) {
    console.error('Failed to load entries:', error);
    throw error;
  }
},

  getFileView(fileId) {
    if (!fileId) return null;
    // Use HTTPS and ensure endpoint doesn't have trailing slash
    const cleanEndpoint = endpoint.replace(/\/$/, '');
    return `${cleanEndpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
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




// import { databases, storage, ID, Query, account } from '../../appwriteConfig';

// // Config with required parameters
// const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
// const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
// const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const collectionId = import.meta.env.VITE_APPWRITE_DIARY_COLLECTION_ID;
// const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID;

// export const extractDiary = {
//   async loadEntries(options = {}) {
//     try {
//       console.log('Loading entries with options:', options);
      
//       // Build queries
//       const queries = [
//         Query.limit(options.limit || 25),
//         Query.offset(options.offset || 0),
//         Query.orderDesc('$createdAt'),
//       ];

//       // Add user filter if authenticated
//       try {
//         const user = await account.get();
//         if (user) {
//           queries.push(Query.equal('userId', user.$id));
//         }
//       } catch (authError) {
//         console.log('User not authenticated, loading all public entries');
//         // If not authenticated, you might want to load public entries only
//         // queries.push(Query.equal('isPublic', true));
//       }

//       const response = await databases.listDocuments(
//         databaseId,
//         collectionId,
//         queries
//       );

//       console.log('Raw API response:', response);

//       if (!response || !Array.isArray(response.documents)) {
//         console.error('Invalid response structure:', response);
//         throw new Error('Invalid response structure from server');
//       }

//       // Process each document
//       const processedDocuments = await Promise.all(
//         response.documents.map(async (doc) => {
//           try {
//             return {
//               ...doc,
//               image: await this.getFileUrl(doc.image),
//               moodBoard: await this.parseMoodBoard(doc.moodBoard),
//               // Ensure all fields have proper fallbacks
//               title: doc.title || 'Untitled',
//               mood: doc.mood || 'inspired',
//               date: doc.date || doc.$createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
//               artStory: doc.artStory || '',
//               imageStory: doc.imageStory || '',
//               inspiration: doc.inspiration || '',
//               tips: doc.tips || '',
//             };
//           } catch (docError) {
//             console.error('Error processing document:', doc.$id, docError);
//             // Return a safe version of the document
//             return {
//               ...doc,
//               image: null,
//               moodBoard: [],
//               title: doc.title || 'Untitled',
//               mood: doc.mood || 'inspired',
//             };
//           }
//         })
//       );

//       return {
//         documents: processedDocuments,
//         total: response.total || 0,
//       };
//     } catch (error) {
//       console.error('Failed to load entries:', error);
//       // Return empty structure instead of throwing to prevent app crash
//       return {
//         documents: [],
//         total: 0,
//       };
//     }
//   },

//   async getFileUrl(fileId) {
//     if (!fileId) return null;
    
//     try {
//       // First, check if the file exists and get its details
//       const file = await storage.getFile(bucketId, fileId);
//       if (!file) return null;

//       // Use HTTPS and ensure endpoint doesn't have trailing slash
//       const cleanEndpoint = endpoint.replace(/\/$/, '');
//       const fileUrl = `${cleanEndpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
      
//       // Test if the URL is accessible
//       const testResponse = await fetch(fileUrl, { method: 'HEAD' });
//       if (testResponse.ok) {
//         return fileUrl;
//       } else {
//         console.warn('File URL not accessible:', fileUrl);
//         return null;
//       }
//     } catch (error) {
//       console.warn('Failed to get file URL for:', fileId, error.message);
//       return null;
//     }
//   },

//   async parseMoodBoard(moodBoardData) {
//     try {
//       // Handle different types of mood board data
//       if (!moodBoardData) return [];
      
//       let items;
//       if (typeof moodBoardData === 'string') {
//         items = JSON.parse(moodBoardData);
//       } else if (Array.isArray(moodBoardData)) {
//         items = moodBoardData;
//       } else {
//         console.warn('Unexpected mood board format:', moodBoardData);
//         return [];
//       }

//       if (!Array.isArray(items)) {
//         console.warn('Mood board is not an array:', items);
//         return [];
//       }

//       // Process each mood board item
//       const processedItems = await Promise.all(
//         items.map(async (item) => {
//           try {
//             if (!item || typeof item !== 'object') {
//               console.warn('Invalid mood board item:', item);
//               return null;
//             }

//             const processedItem = {
//               id: item.id || Date.now().toString(),
//               type: item.type || 'text',
//               content: item.content || '',
//               position: item.position || { x: 0, y: 0 },
//               date: item.date || new Date().toISOString(),
//             };

//             // Handle image items
//             if (processedItem.type === 'image' && processedItem.content) {
//               processedItem.content = await this.getFileUrl(processedItem.content);
//             }

//             return processedItem;
//           } catch (itemError) {
//             console.error('Error processing mood board item:', item, itemError);
//             return null;
//           }
//         })
//       );

//       // Filter out null items and ensure unique IDs
//       return processedItems
//         .filter(item => item !== null)
//         .map((item, index) => ({
//           ...item,
//           id: item.id || `mood-item-${index}`
//         }));
//     } catch (error) {
//       console.error('Failed to parse mood board:', error);
//       return [];
//     }
//   },

//   async uploadFile(file) {
//     if (!file?.type?.startsWith('image/')) {
//       throw new Error('Only image files are allowed');
//     }

//     try {
//       const fileId = ID.unique();
//       await storage.createFile(
//         bucketId,
//         fileId,
//         file,
//         undefined,
//         [
//           `filename:${file.name}`,
//           `content-type:${file.type}`
//         ]
//       );
      
//       console.log('File uploaded successfully:', fileId);
//       return fileId;
//     } catch (error) {
//       console.error('File upload failed:', error);
//       throw new Error(`Failed to upload file: ${error.message}`);
//     }
//   },

//   getFilePreview(fileId) {
//     if (!fileId) return null;
    
//     const cleanEndpoint = endpoint.replace(/\/$/, '');
//     return `${cleanEndpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
//   },

//   async saveEntry(entryData, isEditing = false, entryId = null) {
//     try {
//       const user = await account.get();
//       if (!user) throw new Error('User not authenticated');

//       console.log('Saving entry data:', { entryData, isEditing, entryId });

//       // Validate required fields
//       const requiredFields = ['title', 'mood', 'date', 'artStory'];
//       const missingFields = requiredFields.filter(field => !entryData[field]?.toString().trim());
      
//       if (missingFields.length > 0) {
//         throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
//       }

//       // Process image uploads
//       let imageFileId = entryData.image;
//       if (entryData.image instanceof File) {
//         imageFileId = await this.uploadFile(entryData.image);
//       }

//       // Process mood board uploads
//       const processedMoodBoard = await Promise.all(
//         (entryData.moodBoard || []).map(async (item) => {
//           if (item.type === 'image' && item.content instanceof File) {
//             const uploadedFileId = await this.uploadFile(item.content);
//             return {
//               ...item,
//               content: uploadedFileId
//             };
//           }
//           return item;
//         })
//       );

//       // Prepare document data
//       const documentData = {
//         title: entryData.title.trim(),
//         mood: entryData.mood,
//         date: entryData.date,
//         image: imageFileId,
//         imageStory: entryData.imageStory || '',
//         artStory: entryData.artStory.trim(),
//         inspiration: entryData.inspiration || '',
//         tips: entryData.tips || '',
//         moodBoard: JSON.stringify(processedMoodBoard),
//         userId: user.$id,
//         userEmail: user.email,
//         userName: user.name || user.email,
//       };

//       console.log('Final document data:', documentData);

//       if (isEditing && entryId) {
//         return await databases.updateDocument(databaseId, collectionId, entryId, documentData);
//       } else {
//         return await databases.createDocument(databaseId, collectionId, ID.unique(), documentData);
//       }
//     } catch (error) {
//       console.error('Save entry failed:', error);
//       throw error;
//     }
//   },

//   async deleteEntry(entryId) {
//     try {
//       const document = await databases.getDocument(databaseId, collectionId, entryId);
      
//       // Delete associated files
//       const filesToDelete = [];
      
//       // Main image
//       if (document.image) {
//         filesToDelete.push(document.image);
//       }

//       // Mood board images
//       try {
//         const moodBoard = JSON.parse(document.moodBoard || '[]');
//         moodBoard
//           .filter(item => item.type === 'image' && item.content)
//           .forEach(item => filesToDelete.push(item.content));
//       } catch (parseError) {
//         console.warn('Failed to parse mood board for deletion:', parseError);
//       }

//       // Delete files
//       await Promise.allSettled(
//         filesToDelete.map(fileId => 
//           storage.deleteFile(bucketId, fileId).catch(error => 
//             console.warn('Failed to delete file:', fileId, error)
//           )
//         )
//       );

//       return await databases.deleteDocument(databaseId, collectionId, entryId);
//     } catch (error) {
//       console.error('Delete entry failed:', error);
//       throw error;
//     }
//   },

//   // Additional utility methods
//   async getEntry(entryId) {
//     try {
//       const document = await databases.getDocument(databaseId, collectionId, entryId);
      
//       return {
//         ...document,
//         image: await this.getFileUrl(document.image),
//         moodBoard: await this.parseMoodBoard(document.moodBoard),
//       };
//     } catch (error) {
//       console.error('Failed to get entry:', error);
//       throw error;
//     }
//   },

//   // Test connection
//   async testConnection() {
//     try {
//       const response = await databases.listDocuments(databaseId, collectionId, [
//         Query.limit(1)
//       ]);
//       return {
//         success: true,
//         message: 'Connection successful',
//         count: response.total
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: `Connection failed: ${error.message}`
//       };
//     }
//   }
// };