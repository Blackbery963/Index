import React, {useState, useEffect} from "react";
import { toast } from "react-toastify";
import { FiDownload } from "react-icons/fi";
import { downloadImage } from "./downloadImage";
import { databases } from "../appwriteConfig";
import { MdOutlineFileDownload } from "react-icons/md";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const METADATA_COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;

const DownloadService = ({ artwork }) => {
  const handleDownload = async () => {
    const success = await downloadImage(
      artwork.fileId,
      artwork.$id,
      `${artwork.title}.jpg`
    );

    if (success) {
      toast.success('Download started!');
    } else {
      toast.error('Download failed!');
    }
  };

const [downloadCount, setDownloadCount] = useState(0);

useEffect(() => {
  const fetchCount = async () => {
    const doc = await databases.getDocument(
      DATABASE_ID,
      METADATA_COLLECTION_ID,
      artwork.$id
    );
    setDownloadCount(doc.downloads || 0);
  };

  fetchCount();
}, [artwork.$id]);

  return (
    <div className="artwork-card flex items-center space-x-2">
      {/* ... other content ... */}
      <button 
        onClick={handleDownload}
        className="download-btn text-gray-500 dark:text-gray-400 hover:text-blue-800 transition"
        title="Download"
      >
        <FiDownload size={18} className="text-gray-600 dark:text-gray-300" />
      </button>
      <span className="text-gray-500 dark:text-gray-400">{downloadCount}</span>
    </div>
  );
};

export default DownloadService;









// // components/Downloads/downloadService.jsx
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FiDownload, FiCheck } from 'react-icons/fi';

// const DownloadService = ({ artwork, className = '', children }) => {
//   const [isDownloading, setIsDownloading] = useState(false);
//   const [isDownloaded, setIsDownloaded] = useState(false);

//   const handleDownload = async () => {
//     if (isDownloading) return;

//     setIsDownloading(true);
    
//     try {
//       // Create a temporary anchor element
//       const response = await fetch(artwork.url);
//       const blob = await response.blob();
//       const blobUrl = URL.createObjectURL(blob);
      
//       const link = document.createElement('a');
//       link.href = blobUrl;
//       link.download = `${artwork.title || 'download'}.${artwork.type === 'video' ? 'mp4' : 'jpg'}`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
      
//       // Clean up
//       URL.revokeObjectURL(blobUrl);
      
//       setIsDownloaded(true);
//       setTimeout(() => setIsDownloaded(false), 3000);
      
//       // Track download in your analytics
//       console.log(`Downloaded: ${artwork.title}`);
      
//     } catch (error) {
//       console.error('Download failed:', error);
//       // Fallback: open in new tab
//       window.open(artwork.url, '_blank');
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   return (
//     <motion.button
//       whileTap={{ scale: 0.95 }}
//       onClick={handleDownload}
//       disabled={isDownloading}
//       className={`flex items-center gap-2 ${className} ${
//         isDownloading ? 'opacity-50 cursor-not-allowed' : ''
//       }`}
//     >
//       {children || (
//         <>
//           {isDownloaded ? (
//             <FiCheck size={18} className="text-green-500" />
//           ) : (
//             <FiDownload size={18} />
//           )}
//           <span>
//             {isDownloading ? 'Downloading...' : isDownloaded ? 'Downloaded!' : 'Download'}
//           </span>
//         </>
//       )}
//     </motion.button>
//   );
// };

// export default DownloadService;