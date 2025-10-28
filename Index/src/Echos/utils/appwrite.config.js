// // src/utils/appwrite.config.js
// import { Client, Databases, Storage, ID, Query, Account } from 'appwrite';

// const client = new Client()
//   .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your Appwrite endpoint
//   .setProject( import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID

// export const account = new Account(client);
// export const databases = new Databases(client);
// export const storage = new Storage(client);




// export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// export const STORIES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_STORIES_COLLECTION_ID;
// export const USERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
// export const BUCKET_ID = import.meta.env.VITE_APPWRITE_STORIES_STORIES_BUCKET;

// export { client, account, databases, storage, ID, Query, DATABASE_ID, STORIES_COLLECTION_ID, USERS_COLLECTION_ID, BUCKET_ID };



import { Client, Databases, Storage, ID, Query, Account } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const STORIES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_STORIES_COLLECTION_ID;
const USERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_STORIES_STORIES_BUCKET;
const PROFILE_BUCKET_ID = import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID;

export { client, account, databases, storage, ID, Query, DATABASE_ID, STORIES_COLLECTION_ID, USERS_COLLECTION_ID, BUCKET_ID, PROFILE_BUCKET_ID };
