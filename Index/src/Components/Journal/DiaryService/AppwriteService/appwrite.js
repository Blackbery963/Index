// lib/appwrite.js
import { Client, Account, Databases, Storage, ID } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID };

// ⚠️ VERIFY THESE IDs MATCH YOUR APPWRITE CONSOLE ⚠️
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_NEW_DIARY_DATABASE_ID; // Check in Database section
export const COLLECTIONS = {
  ENTRIES: import.meta.env.VITE_APPWRITE_NEW_DIARY_COLLECTION_ID, // Check collection ID
  USERS: 'users'
};

export const BUCKETS = {
  IMAGES: import.meta.env.VITE_APPWRITE_NEW_DIARY_BUCKET_ID, // Check bucket ID
};