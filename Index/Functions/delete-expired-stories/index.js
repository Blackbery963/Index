// // functions/delete-expired-stories/index.js
// import { Client, Databases, Storage, Query } from 'node-appwrite';

// export default async function (req, res) {
//   try {
//     // Initialize Appwrite client
//     const client = new Client();
    
//     client
//       .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
//       .setProject(import.meta.env.VITE_APPWRITE_FUNCTION_ID)
//       .setKey(import.meta.env.VITE_APPWRITE_API_KEY);

//     const databases = new Databases(client);
//     const storage = new Storage(client);

//     // Your database and bucket IDs
//     const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
//     const STORIES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_STORIES_COLLECTION_ID;
//     const STORIES_BUCKET_ID = import.meta.env.VITE_APPWRITE_STORIES_BUCKET_ID;

//     console.log('Starting expired stories cleanup...');

//     // Get current time
//     const now = new Date().toISOString();
//     console.log(`Current time: ${now}`);

//     // Find all expired stories
//     const expiredStories = await databases.listDocuments(
//       DATABASE_ID,
//       STORIES_COLLECTION_ID,
//       [Query.lessThan('expiresAt', now)]
//     );

//     console.log(`Found ${expiredStories.total} expired stories`);

//     let deletedCount = 0;
//     let errorCount = 0;

//     // Delete each expired story
//     for (const story of expiredStories.documents) {
//       try {
//         console.log(`Processing story: ${story.$id} - ${story.title}`);
        
//         // Delete cover image from storage if exists
//         if (story.coverImageFileId) {
//           try {
//             await storage.deleteFile(STORIES_BUCKET_ID, story.coverImageFileId);
//             console.log(`Deleted cover image: ${story.coverImageFileId}`);
//           } catch (fileError) {
//             console.warn(`Could not delete cover image ${story.coverImageFileId}:`, fileError.message);
//           }
//         }
        
//         // Delete the story document
//         await databases.deleteDocument(DATABASE_ID, STORIES_COLLECTION_ID, story.$id);
//         console.log(`Deleted story: ${story.$id}`);
//         deletedCount++;
        
//       } catch (storyError) {
//         console.error(`Failed to delete story ${story.$id}:`, storyError.message);
//         errorCount++;
//       }
//     }

//     const result = {
//       success: true,
//       deletedCount,
//       errorCount,
//       totalProcessed: expiredStories.total,
//       timestamp: new Date().toISOString()
//     };

//     console.log('Cleanup completed:', result);
//     return res.json(result);

//   } catch (error) {
//     console.error('Function error:', error);
//     return res.json({
//       success: false,
//       error: error.message,
//       timestamp: new Date().toISOString()
//     }, 500);
//   }
// };



import { Client, Databases, Storage, Query } from "node-appwrite";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
    .setKey(import.meta.env.VITE_APPWRITE_API_KEY);

  const databases = new Databases(client);
  const storage = new Storage(client);

  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const COLLECTION_ID = import.meta.env.VITE_APPWRITE_STORIES_COLLECTION_ID;

  try {
    // Get all stories (you can limit or paginate if needed)
    const stories = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

    const now = Date.now();

    for (const story of stories.documents) {
      const createdAt = new Date(story.$createdAt).getTime();

      // Check if 24 hours passed
      if (now - createdAt > 24 * 60 * 60 * 1000) {
        // Delete file if exists
        if (story.fileId) {
          await storage.deleteFile(process.env.STORY_BUCKET_ID, story.fileId);
        }

        // Delete the document
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, story.$id);

        log(`Deleted story ${story.$id}`);
      }
    }

    return res.json({ success: true, message: "Old stories deleted" });
  } catch (err) {
    error(err);
    return res.json({ success: false, message: err.message });
  }
};
