// src/utils/appwrite.config.js
import { Client, Databases, Storage, ID, Query } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your Appwrite endpoint
  .setProject( import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID

export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const STORIES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_STORIES_COLLECTION_ID;
export const BUCKET_ID = import.meta.env.VITE_APPWRITE_STORIES_STORIES_BUCKET;

export { ID, Query };