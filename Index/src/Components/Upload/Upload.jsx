import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { MdBook, MdClose } from 'react-icons/md';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {account, storage, databases, config, ID, Permission, Role, Query } from "../../appwriteConfig"



 //account, storage, databases, config, ID, Permission, Role, Query 
const UploadEntry = ({ index, entry, updateEntry, removeEntry, handleFileChange, handleEntryUpload, uploading }) => {
  const [isDragging, setIsDragging] = useState(false);

  const artTypes = [
  // Traditional & Fine Arts
  "Oil Painting",
  "Acrylic Painting",
  "Watercolor Painting",
  "Ink",
  "Charcoal",
  "Pastel",
  "Pencil Drawing",
  "Graphite Drawing",
  "Tempera",
  "Fresco Painting",
  "Mosaic Art",
  "Glass Art",
  "Fiber Art",
  "Sand Art",

  // Digital & Modern Art
  "Digital Art",
  "Digital Painting",
  "Vector Art",
  "Pixel Art",
  "3D Modeling",
  "Photography",
  "Mixed Media",
  "Collage",
  "Printmaking",
  "AI-Generated Art",
  "Augmented Reality Art",
  "Virtual Reality Art",
  "NFT Art",
  "Data Visualization Art",

  // Calligraphy & Typography
  "Calligraphy",
  "Typography Design",

  // Sculpture & Installation
  "Sculpture",
  "Ceramic",
  "Installation Art",
  "Kinetic Art",
  "Light Art",

  // Performance & Experimental
  "Performance Art",
  "Sound Art",
  "Bio Art",

  // Design & Applied Arts
  "Graphic Design",
  "Industrial Design",
  "Fashion Design",
  "Interior Design",
  "Architectural Drawing",
  "Game Design",

  // Other
  "Other",
];

const tagOptions = [
  'Abstract',
  'Landscape',
  'Portrait',
  'StillLife',
  'Fantasy',
  'Realism',
  'Surrealism',
  'Traditional',
  'Minimalism',
  'Expressionism',
  'Impressionism',
  'PopArt',
  'DigitalArt',
  'Historical',
  'Modern',
  'Nature',
];


  return (
    <div className="bg-white dark:bg-gray-800/90 p-6 rounded-xl shadow-lg mb-6 border border-gray-100 dark:border-gray-700 transform hover:scale-100 transition-transform duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Image Entry {index + 1}
        </h3>
        {index > 0 && (
          <button
            onClick={() => removeEntry(index)}
            className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-600 text-sm font-medium underline"
          >
            Remove
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
            Title *
          </label>
          <input
            type="text"
            placeholder="Give your image a catchy name"
            value={entry.title}
            onChange={(e) => updateEntry(index, 'title', e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
            required
          />
        </div>
        <div>
          <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
            Story Behind It
          </label>
          <textarea
            placeholder="Share the story or details"
            value={entry.description}
            onChange={(e) => updateEntry(index, 'description', e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
            rows="3"
          />
        </div>
        {/* The tag part */}
        <div>
          <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
            Category Tag *
          </label>
          <select
            value={entry.tag}
            onChange={(e) => updateEntry(index, 'tag', e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
            required
          >
            <option value="">Choose a Category Tag</option>
            {tagOptions.map((tag) => (
              <option key={tag} value={tag} className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-teal-300">
                {tag}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
            Art Type *
          </label>
          <select
            value={entry.medium}
            onChange={(e) => updateEntry(index, 'medium', e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
            required
          >
            <option value="">Choose Art Type</option>
               {artTypes.map((type) => (
               <option key={type} value={type} className=' bg-black text-white '>
               {type}
             </option>
              ))}
         </select>
        </div>
       

        <div>
          <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
            Upload Your Masterpiece *
          </label>
          <div
            className={`border-2 border-dashed ${isDragging ? 'border-teal-500 bg-teal-50 dark:border-teal-400 dark:bg-teal-900' : 'border-teal-300 dark:border-teal-600'} rounded-xl p-6 text-center cursor-pointer transition-all bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 hover:bg-gradient-to-tl hover:from-teal-50 hover:to-gray-50 dark:hover:from-teal-900 dark:hover:to-gray-700`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFileChange(index, e.dataTransfer.files);
            }}
            onClick={() => document.getElementById(`fileInput-${index}`).click()}
          >
            {entry.file ? (
              <div className="flex flex-col items-center">
                <img
                  src={URL.createObjectURL(entry.file)}
                  alt="Preview"
                  className="h-32 object-contain mb-2 rounded-lg"
                />
                <p className="text-gray-700 dark:text-gray-300 font-medium truncate max-w-xs">
                  {entry.file.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {(entry.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <>
                <IoCloudUploadOutline className="mx-auto h-12 w-12 text-teal-500 dark:text-teal-400" />
                <p className="mt-2 text-gray-600 dark:text-gray-400 font-Playfair">
                  Drag & drop your image or{' '}
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">browse</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-wrap">
                  Supports JPG, PNG, WEBP (Max 10MB)
                </p>
              </>
            )}
            <input
              type="file"
              id={`fileInput-${index}`}
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => handleFileChange(index, e.target.files)}
            />
          </div>
        </div>
        <button
          className={`w-full bg-gradient-to-r from-teal-600 to-teal-300 dark:from-teal-500 dark:to-teal-700 text-white py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 mt-4 font-Playfair ${uploading ? 'opacity-70 cursor-not-allowed' : 'hover:from-teal-700 hover:to-teal-400 dark:hover:from-teal-600 dark:hover:to-teal-800'}`}
          onClick={() => handleEntryUpload(index)}
          disabled={uploading}
        >
          {uploading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading...
            </span>
          ) : (
            'Share Your Art'
          )}
        </button>
      </div>
    </div>
  );
};

const UploadSection = () => {
  const [entries, setEntries] = useState([
    { title: '', description: '', tag: '', medium: '', file: null },
  ]);
  const [uploadingStates, setUploadingStates] = useState({});
  const [progress, setProgress] = useState(0);
  const [recentImages, setRecentImages] = useState([]);
  const [searchTag, setSearchTag] = useState('');
  const [searchedImages, setSearchedImages] = useState([]);
  const [editingImage, setEditingImage] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', tag: '', medium: '' });
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Validate configuration
  if (!config.databaseId || !config.collectionId || !config.bucketId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-[#040d12f5] dark:to-[#1a2630f5]">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 font-Playfair">
          Configuration Error
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Missing Appwrite configuration. Please check your environment variables and try again.
        </p>
      </div>
    );
  }

  // Initialize Appwrite
  useEffect(() => {
   const initializeAppwrite = async () => {
      try {
        // Check user authentication
        try {
          const currentUser = await account.get();
          setUser(currentUser);
        } catch (err) {
          console.warn('No user logged in:', err.message);
        }

        // Check if database exists
        try {
          await databases.listDocuments (config.databaseId, config.collectionId);
        } catch (err) {
          if (err.code === 404) {
            toast.error('Database not found. Please create the database in Appwrite Console.');
            return;
          }
          throw err;
        }


// OR Option 2: Just rely on collection check (simpler, your original approach)
// The collection check will fail anyway if database doesn't exist

        // Check if collection exists
        try {
          await databases.listDocuments(config.databaseId, config.collectionId);
          console.log('Collection already exists');
        } catch (err) {
          if (err.code === 404) {
            // Create collection
            await databases.createCollection(
              config.databaseId,
              config.collectionId,
              'Images Collection',
              [
                Permission.read(Role.any()),
                Permission.write(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
              ]
            );
            console.log('Collection created successfully');

            // Set up attributes
            await Promise.all([
              databases.createStringAttribute(
                config.databaseId,
                config.collectionId,
                'title',
                255,
                true
              ),
              databases.createStringAttribute(
                config.databaseId,
                config.collectionId,
                'description',
                1000,
                false
              ),
              databases.createStringAttribute(
                config.databaseId,
                config.collectionId,
                'fileId',
                255,
                true
              ),
              databases.createStringAttribute(
                config.databaseId,
                config.collectionId,
                'tag',
                255,
                true,
                false
              ),
              await databases.createStringAttribute(
               config.databaseId,
               config.collectionId,
               'medium',
                255,
                true
                ),

              databases.createStringAttribute(
                config.databaseId,
                config.collectionId,
                'userId',
                255,
                true
              ),
              databases.createDatetimeAttribute(
                config.databaseId,
                config.collectionId,
                'uploadDate',
                true
              ),
            ]);
            console.log('Attributes created successfully');

            // Create full-text index for tags
            try {
              await databases.createIndex(
                config.databaseId,
                config.collectionId,
                'tag_index',
                'fulltext',
                ['tag']
              );
              console.log('Tags index created successfully');
            } catch (err) {
              if (err.code !== 409) throw err; // Ignore if index already exists
            }
          } else {
            throw err;
          }
        }

        // Fetch recent images
        const images = await getRecentImages();
        setRecentImages(images);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing Appwrite:', {
          message: error.message,
          code: error.code,
          type: error.type,
          response: error.response,
        });
        toast.error('Failed to initialize database. Please check Appwrite setup.');
      }
    };
    initializeAppwrite();
  }, []);

  


  const addEntry = () => {
    setEntries([...entries, { title: '', description: '', tag: '', medium: '', file: null }]);
  };

  const updateEntry = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const removeEntry = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleFileChange = (index, files) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPEG, PNG, or WEBP)');
      return;
    }

    if (file.size > maxSize) {
      toast.error('File size exceeds 25MB limit');
      return;
    }

    const newEntries = [...entries];
    newEntries[index].file = file;
    setEntries(newEntries);
  };

  const storeFileWithMetadata = async (file, userId, entryData) => {
    try {
      const storageResponse = await storage.createFile(
        config.bucketId,
        ID.unique(),
        file,
        [Permission.read(Role.any()), Permission.write(Role.user(userId))]
      );

      const metadataResponse = await databases.createDocument(
        config.databaseId,
        config.collectionId,
        ID.unique(),
        {
          fileId: storageResponse.$id,
          userId,
          title: entryData.title,
          description: entryData.description || '',
          // tag: entryData.tag ? [entryData.tag] : [],
          tag: entryData.tag || '',
          medium: entryData.medium,
          uploadDate: new Date().toISOString(),
        },
        [
          Permission.read(Role.any()),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );

      return { file: storageResponse, metadata: metadataResponse };
    } catch (error) {
      console.error('Error storing file and metadata:', {
        message: error.message,
        code: error.code,
        type: error.type,
        response: error.response,
      });
      throw new Error(`Upload failed: ${error.message}`);
    }
  };

  const handleEntryUpload = async (index) => {
    if (!isInitialized) {
      toast.error('Database is not initialized. Please try again later.');
      return;
    }

    const entry = entries[index];
    if (!entry.title.trim()) {
      toast.error('Please provide a title for your artwork');
      return;
    }
    if (!entry.file) {
      toast.error('Please select an image to upload');
      return;
    }
    if (!entry.medium) {
      toast.error('Please select an art type');
      return;
    }
    if (!entry.tag) {
      toast.error('Please add a relevant tag');
      return;
    }

    setUploadingStates((prev) => ({ ...prev, [index]: true }));
    setProgress(0);

    try {
      if (!user || !user.$id) {
        throw new Error('Please log in to upload artwork');
      }

      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + 1;
        });
      }, 500);

      await storeFileWithMetadata(entry.file, user.$id, entry);
      clearInterval(interval);
      setProgress(100);

      const newEntries = [...entries];
      newEntries[index] = { title: '', description: '', tag: '', medium: '', file: null };
      setEntries(newEntries);

      // Refresh recent images
      const images = await getRecentImages();
      setRecentImages(images);

      toast.success(
        <div>
          <p className="font-semibold">"{entry.title}" uploaded successfully!</p>
          <p className="text-sm">Your artwork is now live.</p>
        </div>,
        { autoClose: 5000 }
      );
    } catch (err) {
      console.error('Upload process failed:', {
        message: err.message,
        code: err.code,
        type: err.type,
        response: err.response,
      });
      toast.error(err.message || 'Upload failed. Please try again.', { autoClose: 5000 });
    } finally {
      setUploadingStates((prev) => ({ ...prev, [index]: false }));
      setProgress(0);
    }
  };

  const getRecentImages = async () => {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.collectionId,
        [
          Query.orderDesc('uploadDate'),
          Query.limit(10),
          Query.select(['title', 'description', 'fileId', 'uploadDate', 'tag', 'medium', 'userId']),
        ]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to fetch recent images.');
      return [];
    }
  };

  const searchImagesByTag = async (tag) => {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.collectionId,
        [
          Query.search('tag', tag),
          Query.select(['title', 'description', 'fileId', 'uploadDate', 'tag', 'medium', 'userId']),
        ]
      );
      return response.documents;
    } catch (error) {
      console.error('Error searching documents:', error);
      toast.error('Failed to search images.');
      return [];
    }
  };

  const updateImageMetadata = async (documentId, updates) => {
    try {
      const response = await databases.updateDocument(
        config.databaseId,
        config.collectionId,
        documentId,
        updates
      );
      return response;
    } catch (error) {
      console.error('Error updating document:', error);
      throw new Error(`Update failed: ${error.message}`);
    }
  };

  const handleSearch = async () => {
    if (!isInitialized) {
      toast.error('Database is not initialized. Please try again later.');
      return;
    }

    if (!searchTag.trim()) {
      toast.error('Please enter a tag to search');
      return;
    }
    const images = await searchImagesByTag(searchTag);
    setSearchedImages(images);
  };

  const startEditing = (image) => {
    if (!isInitialized) {
      toast.error('Database is not initialized. Please try again later.');
      return;
    }

    if (!user || user.$id !== image.userId) {
      toast.error('You can only edit your own images');
      return;
    }
    setEditingImage(image.$id);
    setEditForm({
      title: image.title,
      description: image.description,
      // tag: image.tag[0] || '',
      tag: image.tag || '',
      medium: image.medium,
    });
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async (documentId) => {
    if (!isInitialized) {
      toast.error('Database is not initialized. Please try again later.');
      return;
    }

    try {
      if (!user || !user.$id) {
        throw new Error('Please log in to update metadata');
      }

      const updates = {
        title: editForm.title,
        description: editForm.description,
        // tag: editForm.tag ? [editForm.tag] : [],
        tag: editForm.tag || '',
        medium: editForm.medium,
        uploadDate: new Date().toISOString(),
      };

      await updateImageMetadata(documentId, updates);

      // Refresh image lists
      const images = await getRecentImages();
      setRecentImages(images);
      setSearchedImages((prev) =>
        prev.map((img) => (img.$id === documentId ? { ...img, ...updates } : img))
      );
      setEditingImage(null);
      toast.success('Metadata updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update metadata');
    }
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-gray-100 to-white dark:from-[#040d12f5] dark:to-[#1a2630f5] min-h-screen pt-[100px]">
      <div className="w-full max-w-5xl mb-8 px-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 font-Playfair">Share Your Artwork</h2>
        <p className="text-gray-600 dark:text-gray-300">Upload your creative masterpieces to the community gallery</p>
      </div>

      {entries.map((entry, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mb-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 lg:p-6 rounded-2xl shadow-xl border border-teal-100 dark:border-gray-700"
        >
          <div className="w-full md:w-1/2 h-80 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center rounded-xl overflow-hidden p-4">
            {entry.file ? (
              <img
                src={URL.createObjectURL(entry.file)}
                alt="Preview"
                className="max-h-full max-w-full object-contain rounded-xl"
              />
            ) : (
              <div className="text-center">
                <IoCloudUploadOutline className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-xl font-medium font-Playfair">Image Preview</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Your uploaded image will appear here</p>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <UploadEntry
              index={index}
              entry={entry}
              updateEntry={updateEntry}
              removeEntry={removeEntry}
              handleFileChange={handleFileChange}
              handleEntryUpload={handleEntryUpload}
              uploading={uploadingStates[index] || false}
            />
          </div>
        </div>
      ))}

      <button
        onClick={addEntry}
        className="mb-8 p-3 bg-teal-100 dark:bg-teal-600 text-teal-700 dark:text-white rounded-full hover:bg-teal-200 dark:hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
        title="Add another image"
        disabled={Object.values(uploadingStates).some((state) => state) || !isInitialized}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span>Add Another Image</span>
      </button>

      {Object.values(uploadingStates).some((state) => state) && (
        <div className="w-full max-w-5xl mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-teal-700 dark:text-teal-400">Upload Progress</span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-teal-600 to-teal-300 dark:from-teal-500 dark:to-teal-700 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl mb-8 px-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 font-Playfair">Search Artwork</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by tag (e.g., sunset)"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
            disabled={!isInitialized}
          />
          <button
            onClick={handleSearch}
            className="p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair"
            disabled={!isInitialized}
          >
            Search
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {searchedImages.length > 0 ? (
            searchedImages.map((image) => (
              <div
                key={image.$id}
                className="bg-white dark:bg-gray-800/90 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                {editingImage === image.$id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => handleEditChange('title', e.target.value)}
                      placeholder="Title"
                      className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) => handleEditChange('description', e.target.value)}
                      placeholder="Description"
                      className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
                      rows="3"
                    />
                    <input
                      type="text"
                      value={editForm.tag}
                      onChange={(e) => handleEditChange('tag', e.target.value)}
                      placeholder="Tag"
                      className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
                    />
                    <select
                      value={editForm.medium}
                      onChange={(e) => handleEditForm('medium', e.target.value)}
                      className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
                    >
                      <option value="">Choose Art Type</option>
                      <option value="Photographic">Photography</option>
                      <option value="Digital Art">Digital Art</option>
                      <option value="Painting">Painting</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(image.$id)}
                        className="w-full p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingImage(null)}
                        className="w-full p-3 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-all duration-300 font-Playfair"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={`${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${config.bucketId}/files/${image.fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`}
                      alt={image.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 font-Playfair">
                      {image.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{image.description}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Medium: {image.medium}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Tag: {image.tag ? `: ${image.tag}` : 'not specified'}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Uploaded: {new Date(image.uploadDate).toLocaleDateString()}
                    </p>
                    {user && user.$id === image.userId && (
                      <button
                        onClick={() => startEditing(image)}
                        className="mt-2 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair"
                        disabled={!isInitialized}
                      >
                        Edit
                      </button>
                    )}
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300 col-span-full">
              {searchTag ? `No images found for tag "${searchTag}".` : 'Enter a tag to search.'}
            </p>
          )}
        </div>
      </div>

      <div className="w-full max-w-5xl mb-8 px-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 font-Playfair">Recent Artwork</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentImages.length > 0 ? (
            recentImages.map((image) => (
              <div
                key={image.$id}
                className="bg-white dark:bg-gray-800/90 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                {editingImage === image.$id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => handleEditChange('title', e.target.value)}
                      placeholder="Title"
                      className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) => handleEditChange('description', e.target.value)}
                      placeholder="Description"
                      className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
                      rows="3"
                    />
                    <input
                      type="text"
                      value={editForm.tag}
                      onChange={(e) => handleEditChange('tag', e.target.value)}
                      placeholder="Tag"
                      className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
                    />
                    <select
                      value={editForm.medium}
                      onChange={(e) => handleEditChange('medium', e.target.value)}
                      className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
                    >
                      <option value="">Choose Art Type</option>
                      <option value="Photography">Photography</option>
                      <option value="Digital Art">Digital Art</option>
                      <option value="Painting">Painting</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(image.$id)}
                        className="w-full p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingImage(null)}
                        className="w-full p-3 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-all duration-300 font-Playfair"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={`${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${
                        config.bucketId
                      }/files/${image.fileId}/view?project=${
                        import.meta.env.VITE_APPWRITE_PROJECT_ID
                      }`}
                      alt={image.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 font-Playfair">
                      {image.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{image.description}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Medium: {image.medium}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Tag: {image.tag ? image.tag : 'No tags available'}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Uploaded: {new Date(image.uploadDate).toLocaleDateString()}
                    </p>
                    {user && user.$id === image.userId && (
                      <button
                        onClick={() => startEditing(image)}
                        className="mt-2 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair"
                        disabled={!isInitialized}
                      >
                        Edit
                      </button>
                    )}
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300 col-span-full">No recent images found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const buttonVariants = {
    hover: { scale: 1.1, backgroundColor: '#A4C6EB', transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <motion.header
      className="h-16 sm:h-20 w-full bg-gradient-to-r from-teal-400/50 to-teal-800/50 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-between shadow-lg px-4 sm:px-8 fixed top-0 z-50"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-Eagle text-rose-700 dark:text-teal-400">
          Painters' Diary
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <nav className="hidden md:flex gap-x-4 text-gray-800 dark:text-gray-200 font-playfair font-semibold">
          <Link to="/">
            <motion.button
              className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 flex items-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaHome className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Home</span>
            </motion.button>
          </Link>
          <Link to="/About">
            <motion.button
              className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 flex items-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaInfoCircle className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">About</span>
            </motion.button>
          </Link>
          <Link to="/Account">
            <motion.button
              className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 flex items-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaUser className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Account</span>
            </motion.button>
          </Link>
          <Link to="/Journal">
            <motion.button
              className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 flex items-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <MdBook className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Diary</span>
            </motion.button>
          </Link>
        </nav>
        <button
          className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <MdClose className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-16 sm:top-20 mt-[5px] right-2 w-40 bg-teal-200/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg z-40 md:hidden"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="flex flex-col items-center gap-2 py-4 text-gray-800 dark:text-gray-200 font-playfair">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <motion.button
                  className="w-full px-4 py-2 hover:bg-teal-700 dark:hover:bg-teal-700 rounded-md flex items-center justify-center gap-2"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaHome className="text-lg" />
                  <span>Home</span>
                </motion.button>
              </Link>
              <Link to="/About" onClick={() => setIsMenuOpen(false)}>
                <motion.button
                  className="w-full px-4 py-2 hover:bg-teal-700 dark:hover:bg-teal-700 rounded-md flex items-center justify-center gap-2"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaInfoCircle className="text-lg" />
                  <span>About</span>
                </motion.button>
              </Link>
              <Link to="/Account" onClick={() => setIsMenuOpen(false)}>
                <motion.button
                  className="w-full px-4 py-2 hover:bg-teal-700 dark:hover:bg-teal-700 rounded-md flex items-center justify-center gap-2"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaUser className="text-lg" />
                  <span>Account</span>
                </motion.button>
              </Link>
              <Link to="/Journal" onClick={() => setIsMenuOpen(false)}>
                <motion.button
                  className="w-full px-4 py-2 hover:bg-teal-700 dark:hover:bg-teal-700 rounded-md flex items-center justify-center gap-2"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <MdBook className="text-lg" />
                  <span>Diary</span>
                </motion.button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const App = () => {
  return (
    <div className="min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar />
      <UploadSection />
    </div>
  );
};

export default App;