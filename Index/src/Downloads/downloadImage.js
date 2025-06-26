// import { databases, storage, ID } from '../appwriteConfig';


// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const METADATA_COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;

// export const downloadImage = async (fileId, artworkId, fileName) => {
//   try {
//     // Get file preview URL
//     const fileUrl = storage.getFilePreview(
//       import.meta.env.VITE_APPWRITE_BUCKET_ID,
//       fileId
//     );

//     // Trigger download
//     const a = document.createElement('a');
//     a.href = fileUrl.href || fileUrl; // handle URL object or string
//     a.download = fileName || 'artwork.jpg';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);

//     // Fetch current download count
//     const doc = await databases.getDocument(
//       DATABASE_ID,
//       METADATA_COLLECTION_ID,
//       artworkId
//     );
//     const currentDownloads = doc.downloads || 0;

//     // Update download count
//     await databases.updateDocument(
//       DATABASE_ID,
//       METADATA_COLLECTION_ID,
//       artworkId,
//       {
//         downloads: currentDownloads + 1
//       }
//     );

//     console.log('Download recorded successfully.');
//   } catch (error) {
//     console.error('Download or tracking failed:', error);
//   }
// };


import { databases, storage, ID } from '../appwriteConfig';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const METADATA_COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

export const downloadImage = async (fileId, artworkId, fileName = 'artwork.jpg') => {
  try {
    // 1. First get the current download count atomically
    let currentDownloads = 0;
    
    try {
      const doc = await databases.getDocument(
        DATABASE_ID,
        METADATA_COLLECTION_ID,
        artworkId
      );
      currentDownloads = doc.downloads || 0;
    } catch (error) {
      console.warn('Failed to fetch current downloads, defaulting to 0:', error.message);
    }

    // 2. Immediately increment the count to prevent race conditions
    try {
      await databases.updateDocument(
        DATABASE_ID,
        METADATA_COLLECTION_ID,
        artworkId,
        {
          downloads: currentDownloads + 1
        }
      );
    } catch (updateError) {
      console.error('Failed to update download count:', updateError.message);
      // Continue with download even if count fails
    }

    // 3. Trigger the actual download
    try {
      const fileUrl = storage.getFileDownload(BUCKET_ID, fileId);
      
      // Create temporary anchor tag
      const a = document.createElement('a');
      a.href = typeof fileUrl === 'string' ? fileUrl : fileUrl.href;
      a.download = fileName;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
      }, 100);
      
      console.log(`Download recorded for ${artworkId}. New count: ${currentDownloads + 1}`);
      return true;
    } catch (downloadError) {
      console.error('Download failed:', downloadError.message);
      // Revert the count if download failed
      try {
        await databases.updateDocument(
          DATABASE_ID,
          METADATA_COLLECTION_ID,
          artworkId,
          { downloads: currentDownloads } // Revert to previous count
        );
      } catch (revertError) {
        console.error('Failed to revert download count:', revertError.message);
      }
      return false;
    }
  } catch (error) {
    console.error('Unexpected error in downloadImage:', error);
    return false;
  }
};