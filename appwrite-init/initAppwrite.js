// // initAppwrite.js

// require('dotenv').config();
// const { Client, Databases, ID, Permission, Role } = require('appwrite');

// const client = new Client()
//   .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
//   .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
//   .setKey(process.env.VITE_APPWRITE_API_KEY); // Admin Key

// const databases = new Databases(client);

// async function initAppwrite() {
//     try {
//     // Create database
//     await databases.create(process.env.VITE_APPWRITE_DATABASE_ID, 'Images Database');
    
//     console.log('Database created');

//     // Create collection
//     await databases.createCollection(
//       process.env.VITE_APPWRITE_DATABASE_ID,
//       process.env.VITE_APPWRITE_METADATA_COLLECTION_ID,
//       'Images Collection',
//       [
//         Permission.read(Role.any()),
//         Permission.write(Role.users()),
//         Permission.update(Role.users()),
//         Permission.delete(Role.users()),
//       ]
//     );
//     console.log('Collection created');


//     //
//     // Create attributes
//     await Promise.all([
      // databases.createStringAttribute(process.env.VITE_APPWRITE_DATABASE_ID, process.env.VITE_APPWRITE_METADATA_COLLECTION_ID,  'title', 255, true),
      // databases.createStringAttribute(process.env.VITE_APPWRITE_DATABASE_ID, process.env.VITE_APPWRITE_METADATA_COLLECTION_ID,  'description', 1000, false),
      // databases.createStringAttribute(process.env.VITE_APPWRITE_DATABASE_ID, process.env.VITE_APPWRITE_METADATA_COLLECTION_ID, 'fileId', 255, true),
      // databases.createStringAttribute(process.env.VITE_APPWRITE_DATABASE_ID, process.env.VITE_APPWRITE_METADATA_COLLECTION_ID,  'tags', 255, false, true),
      // databases.createStringAttribute(process.env.VITE_APPWRITE_DATABASE_ID, process.env.VITE_APPWRITE_METADATA_COLLECTION_ID,  'medium', 255, true),
      // databases.createStringAttribute(process.env.VITE_APPWRITE_DATABASE_ID, process.env.VITE_APPWRITE_METADATA_COLLECTION_ID, 'userId', 255, true),
      // databases.createDatetimeAttribute(process.env.VITE_APPWRITE_DATABASE_ID, process.env.VITE_APPWRITE_METADATA_COLLECTION_ID, 'uploadDate', true),
//     ]);
//     console.log('Attributes created');

//     // Create index
//     await databases.createIndex(
//       process.env.VITE_APPWRITE_DATABASE_ID,
//       process.env.VITE_APPWRITE_METADATA_COLLECTION_ID,
//       'tags_index',
//       'fulltext',
//       ['tags']
//     );
//     console.log('Index created');
//   } catch (error) {
//     console.error('Initialization failed:', error);
//   }
// }

// initAppwrite();


require('dotenv').config();
const { Client, Databases, ID, Permission, Role } = require('appwrite');

const client = new Client()
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
  .setKey(process.env.VITE_APPWRITE_API_KEY);

const databases = new Databases(client);

async function initAppwrite() {
  const databaseId = process.env.VITE_APPWRITE_DATABASE_ID;
  const collectionId = process.env.VITE_APPWRITE_METADATA_COLLECTION_ID;

  try {
    // Try to create the database (Appwrite throws 409 if it already exists)
    try {
      await databases.create(databaseId, 'Images Database');
      console.log('Database created');
    } catch (err) {
      if (err.code === 409) {
        console.log('Database already exists');
      } else {
        throw err;
      }
    }

    // Check if collection exists
    try {
      await databases.getCollection(databaseId, collectionId);
      console.log('Collection already exists');
      return;
    } catch (err) {
      if (err.code !== 404) throw err;
      console.log('Collection not found. Creating...');
    }

    // Create collection
    await databases.createCollection(
      databaseId,
      collectionId,
      'Images Collection',
      [
        Permission.read(Role.any()),
        Permission.write(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ]
    );
    console.log('Collection created');

    // Create attributes
    await Promise.all([
      databases.createStringAttribute(process.env.VITE_APPWRITE_DATABASE_ID, process.env.VITE_APPWRITE_METADATA_COLLECTION_ID,  'title', 255, true),
      databases.createStringAttribute(process.env.VITE_APPWRITE_DATABASE_ID, process.env.VITE_APPWRITE_METADATA_COLLECTION_ID,  'description', 1000, false),
      databases.createStringAttribute(process.env.VITE_APPWRITE_DATABASE_ID, process.env.VITE_APPWRITE_METADATA_COLLECTION_ID, 'fileId', 255, true),
      databases.createStringAttribute(process.env.VITE_APPWRITE_DATABASE_ID, process.env.VITE_APPWRITE_METADATA_COLLECTION_ID,  'tag', 255, false, true),
      databases.createStringAttribute(process.env.VITE_APPWRITE_DATABASE_ID, process.env.VITE_APPWRITE_METADATA_COLLECTION_ID,  'medium', 255, true),
      databases.createStringAttribute(process.env.VITE_APPWRITE_DATABASE_ID, process.env.VITE_APPWRITE_METADATA_COLLECTION_ID, 'userId', 255, true),
      databases.createDatetimeAttribute(process.env.VITE_APPWRITE_DATABASE_ID, process.env.VITE_APPWRITE_METADATA_COLLECTION_ID, 'uploadDate', true),
    ]);
    console.log('Attributes created');

    // Create index
    try {
      await databases.createIndex(databaseId, collectionId, 'tag_index', 'fulltext', ['tag']);
      console.log('Index created');
    } catch (indexErr) {
      if (indexErr.code === 409) {
        console.log('Index already exists');
      } else {
        throw indexErr;
      }
    }

  } catch (error) {
    console.error('Appwrite initialization failed:', error.message || error);
  }
}

initAppwrite();
