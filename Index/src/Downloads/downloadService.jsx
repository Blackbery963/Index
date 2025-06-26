import React, {useState, useEffect} from "react";
import { toast } from "react-toastify";
import { FiDownload } from "react-icons/fi";
import { downloadImage } from "./downloadImage";
import { databases } from "../appwriteConfig";

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
        className="download-btn text-gray-400 hover:text-blue-800 transition"
        title="Download"
      >
        <FiDownload size={16} />
      </button>
      <span>{downloadCount}</span>
    </div>
  );
};

export default DownloadService;
