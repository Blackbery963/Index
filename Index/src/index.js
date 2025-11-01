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
