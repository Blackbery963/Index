// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { IoCloudUploadOutline } from 'react-icons/io5';
// import UploadEntry from './UploadEntry';
// import ImageGallery from './ImageGallery';
// import { account, databases, storage, config, Query, ID, Permission, Role } from "../../appwriteConfig";
// // import { artCategories } from './constants';
// import { acceptedFileTypes, maxFileSize } from './constants';

// const UploadSection = () => {
//   const [entries, setEntries] = useState([
//     { title: '', description: '', tag: '', medium: '', price: '', awards: [], file: null },
//   ]);
//   const [uploadingStates, setUploadingStates] = useState({});
//   const [progress, setProgress] = useState(0);
//   const [myImages, setMyImages] = useState([]);
//   const [searchTag, setSearchTag] = useState('');
//   const [searchedImages, setSearchedImages] = useState([]);
//   const [user, setUser] = useState(null);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [activeTab, setActiveTab] = useState('upload');
//   const [previewUrl, setPreviewUrl] = useState(null);

// useEffect(() => {
//   if (entries[0].file) {
//     const url = URL.createObjectURL(entries[0].file);
//     setPreviewUrl(url);

//     // cleanup to prevent memory leaks
//     return () => URL.revokeObjectURL(url);
//   } else {
//     setPreviewUrl(null);
//   }
// }, [entries[0].file]);



//   // Initialize Appwrite
//   useEffect(() => {
//     const initializeAppwrite = async () => {
//       try {
//         // Check user authentication
//         try {
//           const currentUser = await account.get();
//           setUser(currentUser);
//         } catch (err) {
//           console.warn('No user logged in:', err.message);
//         }

//         // Check if database exists
//         try {
//           await databases.listDocuments(config.databaseId, config.collectionId);
//         } catch (err) {
//           if (err.code === 404) {
//             toast.error('Database not found. Please create the database in Appwrite Console.');
//             return;
//           }
//           throw err;
//         }

//         // Check if collection exists
//         try {
//           await databases.listDocuments(config.databaseId, config.collectionId);
//         } catch (err) {
//           if (err.code === 404) {
//             await databases.createCollection(
//               config.databaseId,
//               config.collectionId,
//               import.meta.env.VITE_APPWRITE_IMAGES_COLLECTION_ID,
//               [
//                 Permission.read(Role.any()),
//                 Permission.write(Role.users()),
//                 Permission.update(Role.users()),
//                 Permission.delete(Role.users()),             
//               ]
//             );

//             await Promise.all([
//               databases.createStringAttribute(
//                 config.databaseId,
//                 config.collectionId,
//                 'title',
//                 255,
//                 true
//               ),
//               databases.createStringAttribute(
//                 config.databaseId,
//                 config.collectionId,
//                 'description',
//                 1000,
//                 false
//               ),
//               databases.createStringAttribute(
//                 config.databaseId,
//                 config.collectionId,
//                 'fileId',
//                 255,
//                 true
//               ),
//               databases.createStringAttribute(
//                 config.databaseId,
//                 config.collectionId,
//                 'tag',
//                 255,
//                 true,
//                 false
//               ),
//               databases.createStringAttribute(
//                 config.databaseId,
//                 config.collectionId,
//                 'medium',
//                 255,
//                 true
//               ),
//               databases.createStringAttribute(
//                 config.databaseId,
//                 config.collectionId,
//                 'awards',
//                 255,
//                 false
//               ),
//               databases.createFloatAttribute(
//                 config.databaseId,
//                 config.collectionId,
//                 'price',
//                 false
//               ),
//               databases.createStringAttribute(
//                 config.databaseId,
//                 config.collectionId,
//                 'userId',
//                 255,
//                 true
//               ),
//               databases.createDatetimeAttribute(
//                 config.databaseId,
//                 config.collectionId,
//                 'uploadDate',
//                 true
//               ),
//             ]);

//             try {
//               await databases.createIndex(
//                 config.databaseId,
//                 config.collectionId,
//                 'tag_index',
//                 'fulltext',
//                 ['tag']
//               );
//             } catch (err) {
//               if (err.code !== 409) throw err;
//             }
//           } else {
//             throw err;
//           }
//         }

//         if (user) {
//           const images = await getMyImages();
//           setMyImages(images);
//         }
//         setIsInitialized(true);
//       } catch (error) {
//         console.error('Error initializing Appwrite:', error);
//         toast.error('Failed to initialize database. Please check Appwrite setup.');
//       }
//     };
//     initializeAppwrite();
//   }, [user]);


//   const updateEntry = (index, field, value) => {
//     const newEntries = [...entries];
//     newEntries[index][field] = value;
//     setEntries(newEntries);
//   };

//   // const handleFileChange = (index, files) => {
//   //   if (!files || files.length === 0) return;
//   //   const file = files[0];
//   //   const maxSize = 10 * 1024 * 1024;
//   //   const validTypes = [
//   //     "image/jpeg", "image/jpg", "image/png", 
//   //     "image/webp", "image/x-png"
//   //   ];

//   //   if (!validTypes.includes(file.type)) {
//   //     toast.error('Please upload a valid image (JPEG, PNG, or WEBP)');
//   //     return;
//   //   }

//   //   if (file.size > maxSize) {
//   //     toast.error('File size exceeds 10MB limit');
//   //     return;
//   //   }

//   //   const newEntries = [...entries];
//   //   newEntries[index].file = file;
//   //   setEntries(newEntries);
//   // };
// const handleFileChange = (index, files) => {
//   if (!files || files.length === 0) return;
//   const file = files[0];
  
//   // Check if file type is accepted
//   const isImage = acceptedFileTypes.images.includes(file.type);
//   const isVideo = acceptedFileTypes.videos.includes(file.type);
  
//   if (!isImage && !isVideo) {
//     toast.error('Please upload a valid image (JPEG, PNG, WEBP) or video (MP4, WebM, MOV)');
//     return;
//   }

//   if (file.size > maxFileSize) {
//     toast.error('File size exceeds 10MB limit');
//     return;
//   }

//   const newEntries = [...entries];
//   newEntries[index].file = file;
//   setEntries(newEntries);
// };


//   // const storeFileWithMetadata = async (file, userId, entryData) => {
//   //   try {
//   //     const storageResponse = await storage.createFile(
//   //       config.bucketId,
//   //       ID.unique(),
//   //       file,
//   //       [Permission.read(Role.any()), Permission.write(Role.user(userId))]
//   //     );

//   //     const metadataResponse = await databases.createDocument(
//   //       config.databaseId,
//   //       config.collectionId,
//   //       ID.unique(),
//   //       {
//   //         fileId: storageResponse.$id,
//   //         userId,
//   //         title: entryData.title,
//   //         description: entryData.description || '',
//   //         tag: entryData.tag || '',
//   //         medium: entryData.medium,
//   //         price: entryData.price ? parseFloat(entryData.price) : null,
//   //         awards: entryData.awards
//   //           ? Array.isArray(entryData.awards)
//   //             ? entryData.awards
//   //             : entryData.awards.split(',').map(a => a.trim())
//   //           : [],
//   //         uploadDate: new Date().toISOString(),
//   //       },
//   //       [
//   //         Permission.read(Role.any()),
//   //         Permission.update(Role.user(userId)),
//   //         Permission.delete(Role.user(userId)),
//   //       ]
//   //     );

//   //     return { file: storageResponse, metadata: metadataResponse };
//   //   } catch (error) {
//   //     console.error('Error storing file and metadata:', error);
//   //     throw new Error(`Upload failed: ${error.message}`);
//   //   }
//   // };

//   // In the UploadSection component, update the storeFileWithMetadata function:

// const storeFileWithMetadata = async (file, userId, entryData) => {
//   try {
//     const storageResponse = await storage.createFile(
//       config.bucketId,
//       ID.unique(),
//       file,
//       [Permission.read(Role.any()), Permission.write(Role.user(userId))]
//     );

//     // Determine file type
//     const fileType = file.type.startsWith('video/') ? 'video' : 'image';

//     const metadataResponse = await databases.createDocument(
//       config.databaseId,
//       config.collectionId,
//       ID.unique(),
//       {
//         fileId: storageResponse.$id,
//         userId,
//         title: entryData.title,
//         description: entryData.description || '',
//         tag: entryData.tag || '',
//         medium: entryData.medium,
//         price: entryData.price ? parseFloat(entryData.price) : null,
//         awards: entryData.awards
//           ? Array.isArray(entryData.awards)
//             ? entryData.awards
//             : entryData.awards.split(',').map(a => a.trim())
//           : [],
//         uploadDate: new Date().toISOString(),
//         fileType: fileType, // Add file type to metadata
//       },
//       [
//         Permission.read(Role.any()),
//         Permission.update(Role.user(userId)),
//         Permission.delete(Role.user(userId)),
//       ]
//     );

//     return { file: storageResponse, metadata: metadataResponse };
//   } catch (error) {
//     console.error('Error storing file and metadata:', error);
//     throw new Error(`Upload failed: ${error.message}`);
//   }
// };

//   const handleEntryUpload = async (index) => {
//     if (!isInitialized) {
//       toast.error('Database is not initialized. Please try again later.');
//       return;
//     }

//     const entry = entries[index];
//     if (!entry.title.trim()) {
//       toast.error('Please provide a title for your creation');
//       return;
//     }
//     if (!entry.file) {
//       toast.error('Please select an image to upload');
//       return;
//     }
//     if (!entry.medium) {
//       toast.error('Please select an art/craft type');
//       return;
//     }
//     if (!entry.tag) {
//       toast.error('Please add a relevant tag');
//       return;
//     }

//     setUploadingStates((prev) => ({ ...prev, [index]: true }));
//     setProgress(0);

//     try {
//       if (!user || !user.$id) {
//         throw new Error('Please log in to upload creations');
//       }

//       const interval = setInterval(() => {
//         setProgress((prev) => {
//           if (prev >= 90) return prev;
//           return prev + 1;
//         });
//       }, 500);

//       await storeFileWithMetadata(entry.file, user.$id, entry);
//       clearInterval(interval);
//       setProgress(100);

//       const newEntries = [...entries];
//       newEntries[index] = { title: '', description: '', tag: '', medium: '', price: '', awards: [], file: null };
//       setEntries(newEntries);

//       const images = await getMyImages();
//       setMyImages(images);

//       toast.success(
//         <div>
//           <p className="font-semibold">"{entry.title}" uploaded successfully!</p>
//           {entry.price ? (
//             <p className="text-sm">Your creation is now listed for sale at ₹{entry.price}.</p>
//           ) : (
//             <p className="text-sm">Your creation is now live.</p>
//           )}
//         </div>,
//         { autoClose: 5000 }
//       );
//     } catch (err) {
//       console.error('Upload process failed:', err);
//       toast.error(err.message || 'Upload failed. Please try again.', { autoClose: 5000 });
//     } finally {
//       setUploadingStates((prev) => ({ ...prev, [index]: false }));
//       setProgress(0);
//     }
//   };


//   // const getMyImages = async () => {
//   //   if (!user || !user.$id) return [];
    
//   //   try {
//   //     const response = await databases.listDocuments(
//   //       config.databaseId,
//   //       config.collectionId,
//   //       [
//   //         Query.equal('userId', user.$id),
//   //         Query.orderDesc('uploadDate'),
//   //         Query.limit(50),
//   //         Query.select(['title', 'description', 'fileId', 'uploadDate', 'tag', 'medium', 'userId', 'price', 'awards']),
//   //       ]
//   //     );
//   //     return response.documents;
//   //   } catch (error) {
//   //     console.error('Error fetching user documents:', error);
//   //     toast.error('Failed to fetch your images.');
//   //     return [];
//   //   }
//   // };

//   const getMyImages = async () => {
//   if (!user || !user.$id) return [];
  
//   try {
//     const response = await databases.listDocuments(
//       config.databaseId,
//       config.collectionId,
//       [
//         Query.equal('userId', user.$id),
//         Query.orderDesc('uploadDate'),
//         Query.limit(50),
//         Query.select(['title', 'description', 'fileId', 'uploadDate', 'tag', 'medium', 'userId', 'price', 'awards', 'fileType']),
//       ]
//     );
//     return response.documents;
//   } catch (error) {
//     console.error('Error fetching user documents:', error);
//     toast.error('Failed to fetch your creations.');
//     return [];
//   }
// };


//   const searchImagesByTag = async (tag) => {
//     try {
//       const response = await databases.listDocuments(
//         config.databaseId,
//         config.collectionId,
//         [
//           Query.search('tag', tag),
//           Query.select(['title', 'description', 'fileId', 'uploadDate', 'tag', 'medium', 'userId', 'price', 'awards']),
//         ]
//       );
//       return response.documents;
//     } catch (error) {
//       console.error('Error searching documents:', error);
//       toast.error('Failed to search images.');
//       return [];
//     }
//   };

//   const handleSearch = async () => {
//     if (!isInitialized) {
//       toast.error('Database is not initialized. Please try again later.');
//       return;
//     }

//     if (!searchTag.trim()) {
//       toast.error('Please enter a tag to search');
//       return;
//     }
//     const images = await searchImagesByTag(searchTag);
//     setSearchedImages(images);
//   };

//   return (
//     <div className="flex flex-col items-center bg-gradient-to-b from-gray-100 to-white dark:from-[#040d12f5] dark:to-[#1a2630f5] min-h-screen pt-[100px] font-Playfair">
//       <div className="w-full max-w-5xl mb-8 px-4">
//         <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 font-Playfair">Share Your Creations</h2>
//         <p className="text-gray-600 dark:text-gray-300">Upload your art, crafts, and creative works to share with the community</p>
//       </div>

//       {/* Tabs */}
//       <div className="w-full max-w-5xl mb-6 px-4">
//         <div className="flex border-b border-gray-200 dark:border-gray-700">
//           <button
//             className={`py-2 px-4 font-medium ${activeTab === 'upload' ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
//             onClick={() => setActiveTab('upload')}
//           >
//             Upload
//           </button>
//           <button
//             className={`py-2 px-4 font-medium ${activeTab === 'myArtwork' ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
//             onClick={() => setActiveTab('myArtwork')}
//           >
//             My Creations
//           </button>
//         </div>
//       </div>

//       {activeTab === 'upload' && (
//         <div className="w-full max-w-5xl mb-6 px-4">
//           <div className="flex flex-col md:flex-row gap-8 w-full mb-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 lg:p-6 rounded-2xl shadow-xl border border-teal-100 dark:border-gray-700">
//            <div className="w-full md:w-1/2 h-80 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center rounded-xl overflow-hidden p-4">

// {previewUrl ? (
//   entries[0].file.type.startsWith("image/") ? (
//     <img
//       src={previewUrl}
//       alt="Preview"
//       className="max-h-full max-w-full object-contain rounded-xl"
//     />
//   ) : entries[0].file.type.startsWith("video/") ? (
//     <video
//       src={previewUrl}
//       controls
//       className="max-h-full max-w-full object-contain rounded-xl"
//     />
//   ) : (
//     <p className="text-gray-500">Unsupported file type</p>
//   )
// ) : (
//   <div className="text-center">
//     <IoCloudUploadOutline className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
//     <p className="text-gray-500 dark:text-gray-400 text-xl font-medium font-Playfair">Creation Preview</p>
//     <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Your uploaded file will appear here</p>
//   </div>
// )}


//             </div>
//             <div className="w-full md:w-1/2 space-y-4">
//               <UploadEntry
//                 index={0}
//                 entry={entries[0]}
//                 updateEntry={updateEntry}
//                 handleFileChange={handleFileChange}
//                 handleEntryUpload={handleEntryUpload}
//                 uploading={uploadingStates[0] || false}
//               />
//             </div>
//           </div>

//           {Object.values(uploadingStates).some((state) => state) && (
//             <div className="w-full max-w-5xl mb-6">
//               <div className="flex justify-between mb-1">
//                 <span className="text-sm font-medium text-teal-700 dark:text-teal-400">Upload Progress</span>
//                 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{progress}%</span>
//               </div>
//               <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
//                 <div
//                   className="bg-gradient-to-r from-teal-600 to-teal-300 dark:from-teal-500 dark:to-teal-700 h-2.5 rounded-full transition-all duration-300"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {activeTab === 'myArtwork' && (
//         <ImageGallery
//           isInitialized={isInitialized}
//           searchTag={searchTag}
//           setSearchTag={setSearchTag}
//           handleSearch={handleSearch}
//           myImages={myImages}
//           searchedImages={searchedImages}
//           user={user}
//           setMyImages={setMyImages}
//           setSearchedImages={setSearchedImages}
//         />
//       )}
//     </div>
//   );
// };

// export default UploadSection;


import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IoCloudUploadOutline } from 'react-icons/io5';
import UploadEntry from './UploadEntry';
import ImageGallery from './ImageGallery';
import { account, databases, storage, config, Query, ID, Permission, Role } from "../../appwriteConfig";
import { acceptedFileTypes, maxFileSize } from './constants';
// import { getImageUrl, getAllImageUrls } from './storageHelper';

const UploadSection = () => {
  const [entries, setEntries] = useState([
    { 
      title: '', 
      description: '', 
      tag: '', 
      medium: '', 
      price: '', 
      awards: [], 
      file: null, 
      fileType: null,
      additionalImages: [] // New field for additional images
    },
  ]);
  const [uploadingStates, setUploadingStates] = useState({});
  const [progress, setProgress] = useState(0);
  const [myImages, setMyImages] = useState([]);
  const [searchTag, setSearchTag] = useState('');
  const [searchedImages, setSearchedImages] = useState([]);
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (entries[0].file) {
      const url = URL.createObjectURL(entries[0].file);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [entries[0].file]);

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
          await databases.listDocuments(config.databaseId, config.collectionId);
        } catch (err) {
          if (err.code === 404) {
            toast.error('Database not found. Please create the database in Appwrite Console.');
            return;
          }
          throw err;
        }

        // Check if collection exists and create attributes if needed
        try {
          await databases.listDocuments(config.databaseId, config.collectionId);
        } catch (err) {
          if (err.code === 404) {
            await createCollectionAndAttributes();
          } else {
            throw err;
          }
        }

        if (user) {
          const images = await getMyImages();
          setMyImages(images);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing Appwrite:', error);
        toast.error('Failed to initialize database. Please check Appwrite setup.');
      }
    };
    initializeAppwrite();
  }, [user]);

  const createCollectionAndAttributes = async () => {
    await databases.createCollection(
      config.databaseId,
      config.collectionId,
      import.meta.env.VITE_APPWRITE_IMAGES_COLLECTION_ID,
      [
        Permission.read(Role.any()),
        Permission.write(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),             
      ]
    );

    const attributes = [
      { name: 'title', type: 'string', size: 255, required: true },
      { name: 'description', type: 'string', size: 1000, required: false },
      { name: 'fileId', type: 'string', size: 255, required: true },
      { name: 'additionalImageIds', type: 'string', size: 1000, required: false }, // New attribute for additional images
      { name: 'tag', type: 'string', size: 255, required: true, array: false },
      { name: 'medium', type: 'string', size: 255, required: true },
      { name: 'awards', type: 'string', size: 255, required: false },
      { name: 'price', type: 'float', required: false },
      { name: 'userId', type: 'string', size: 255, required: true },
      { name: 'uploadDate', type: 'datetime', required: true },
      { name: 'fileType', type: 'string', size: 50, required: false },
      { name: 'isForSale', type: 'boolean', required: false }, // New attribute to identify sale items
    ];

    for (const attr of attributes) {
      try {
        if (attr.type === 'string') {
          await databases.createStringAttribute(
            config.databaseId,
            config.collectionId,
            attr.name,
            attr.size,
            attr.required,
            attr.array
          );
        } else if (attr.type === 'float') {
          await databases.createFloatAttribute(
            config.databaseId,
            config.collectionId,
            attr.name,
            attr.required
          );
        } else if (attr.type === 'datetime') {
          await databases.createDatetimeAttribute(
            config.databaseId,
            config.collectionId,
            attr.name,
            attr.required
          );
        } else if (attr.type === 'boolean') {
          await databases.createBooleanAttribute(
            config.databaseId,
            config.collectionId,
            attr.name,
            attr.required
          );
        }
      } catch (error) {
        if (error.code !== 409) throw error; // Ignore attribute already exists error
      }
    }

    try {
      await databases.createIndex(
        config.databaseId,
        config.collectionId,
        'tag_index',
        'fulltext',
        ['tag']
      );
    } catch (err) {
      if (err.code !== 409) throw err;
    }
  };

  const updateEntry = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  // Update handleFileChange to accept additional images
  const handleFileChange = (index, files, isAdditional = false) => {
    if (!files || files.length === 0) return;
    
    if (isAdditional) {
      // Handle additional images
      const newFiles = Array.from(files);
      const validFiles = newFiles.filter(file => {
        const isImage = acceptedFileTypes.images.includes(file.type);
        const isUnderSize = file.size <= maxFileSize;
        
        if (!isImage) {
          toast.error('Please upload only image files for additional images');
          return false;
        }
        if (!isUnderSize) {
          toast.error('File size exceeds 10MB limit');
          return false;
        }
        return true;
      });

      const newEntries = [...entries];
      const currentAdditional = newEntries[index].additionalImages || [];
      const updatedAdditional = [...currentAdditional, ...validFiles].slice(0, 3); // Max 3 additional images
      newEntries[index].additionalImages = updatedAdditional;
      setEntries(newEntries);
    } else {
      // Handle main file
      const file = files[0];
      const isImage = acceptedFileTypes.images.includes(file.type);
      const isVideo = acceptedFileTypes.videos.includes(file.type);

      if (!isImage && !isVideo) {
        toast.error('Please upload a valid image (JPEG, PNG, WEBP) or video (MP4, WebM, MOV)');
        return;
      }

      if (file.size > maxFileSize) {
        toast.error('File size exceeds 10MB limit');
        return;
      }

      const newEntries = [...entries];
      newEntries[index].file = file;
      newEntries[index].fileType = isVideo ? 'video' : 'image';
      setEntries(newEntries);
    }
  };

  // Function to upload multiple files to storage
  const uploadFilesToStorage = async (files, userId) => {
    const uploadPromises = files.map(file => 
      storage.createFile(
        config.bucketId,
        ID.unique(),
        file,
        [Permission.read(Role.any()), Permission.write(Role.user(userId))]
      )
    );
    
    const results = await Promise.all(uploadPromises);
    return results.map(result => result.$id);
  };

  const storeFileWithMetadata = async (file, additionalImages, userId, entryData) => {
    try {
      // Upload main file
      const storageResponse = await storage.createFile(
        config.bucketId,
        ID.unique(),
        file,
        [Permission.read(Role.any()), Permission.write(Role.user(userId))]
      );

      // Upload additional images if they exist
      let additionalImageIds = [];
      if (additionalImages && additionalImages.length > 0) {
        additionalImageIds = await uploadFilesToStorage(additionalImages, userId);
      }

      const fileType = file.type.startsWith('video/') ? 'video' : 'image';
      const isForSale = !!entryData.price;

      const metadataResponse = await databases.createDocument(
        config.databaseId,
        config.collectionId,
        ID.unique(),
        {
          fileId: storageResponse.$id,
          additionalImageIds: additionalImageIds.join(','), // Store as comma-separated string
          userId,
          title: entryData.title,
          description: entryData.description || '',
          tag: entryData.tag || '',
          medium: entryData.medium,
          price: entryData.price ? parseFloat(entryData.price) : null,
          awards: entryData.awards
            ? Array.isArray(entryData.awards)
              ? entryData.awards
              : entryData.awards.split(',').map(a => a.trim())
            : [],
          uploadDate: new Date().toISOString(),
          fileType: fileType,
          isForSale: isForSale,
        },
        [
          Permission.read(Role.any()),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );

      return { 
        file: storageResponse, 
        additionalFiles: additionalImageIds.map(id => ({ $id: id })),
        metadata: metadataResponse 
      };
    } catch (error) {
      console.error('Error storing file and metadata:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }
  };

  const handleEntryUpload = async (index, entryWithAdditional) => {
    if (!isInitialized) {
      toast.error('Database is not initialized. Please try again later.');
      return;
    }

    const entry = entryWithAdditional || entries[index];
    
    // Validation
    if (!entry.title.trim()) {
      toast.error('Please provide a title for your creation');
      return;
    }
    if (!entry.file) {
      toast.error('Please select a file to upload');
      return;
    }
    if (entry.fileType !== 'video' && !entry.medium) {
      toast.error('Please select an art/craft type');
      return;
    }
    if (!entry.tag) {
      toast.error('Please add at least one tag');
      return;
    }
    if (entry.price && !entry.medium) {
      toast.error('Please select a category for items for sale');
      return;
    }

    setUploadingStates((prev) => ({ ...prev, [index]: true }));
    setProgress(0);

    try {
      if (!user || !user.$id) {
        throw new Error('Please log in to upload creations');
      }

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + 1;
        });
      }, 500);

      // Upload with additional images
      await storeFileWithMetadata(entry.file, entry.additionalImages, user.$id, entry);
      clearInterval(interval);
      setProgress(100);

      // Reset form
      const newEntries = [...entries];
      newEntries[index] = { 
        title: '', 
        description: '', 
        tag: '', 
        medium: '', 
        price: '', 
        awards: [], 
        file: null, 
        fileType: null,
        additionalImages: [] 
      };
      setEntries(newEntries);

      // Refresh gallery
      const images = await getMyImages();
      setMyImages(images);

      // Success message
      const message = entry.price 
        ? `Your creation is now listed for sale at ₹${entry.price}${entry.additionalImages.length > 0 ? ' with ' + entry.additionalImages.length + ' additional images' : ''}`
        : `Your creation is now live${entry.additionalImages.length > 0 ? ' with ' + entry.additionalImages.length + ' additional images' : ''}`;

      toast.success(
        <div>
          <p className="font-semibold">"{entry.title}" uploaded successfully!</p>
          <p className="text-sm">{message}</p>
        </div>,
        { autoClose: 5000 }
      );
    } catch (err) {
      console.error('Upload process failed:', err);
      toast.error(err.message || 'Upload failed. Please try again.', { autoClose: 5000 });
    } finally {
      setUploadingStates((prev) => ({ ...prev, [index]: false }));
      setProgress(0);
    }
  };

  const getMyImages = async () => {
    if (!user || !user.$id) return [];
    
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.collectionId,
        [
          Query.equal('userId', user.$id),
          Query.orderDesc('uploadDate'),
          Query.limit(50),
          Query.select([
            'title', 'description', 'fileId', 'uploadDate', 'tag', 
            'medium', 'userId', 'price', 'awards', 'fileType',
            'additionalImageIds', 'isForSale' // Include additional images and sale flag
          ]),
        ]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching user documents:', error);
      toast.error('Failed to fetch your creations.');
      return [];
    }
  };

  // Function to get image URL for display
  const getImageUrl = (fileId) => {
    return `${config.endpoint}/storage/buckets/${config.bucketId}/files/${fileId}/view?project=${config.projectId}`;
  };

  // Function to get all images for a creation (main + additional)
  const getAllImageUrls = (document) => {
    const urls = [getImageUrl(document.fileId)];
    
    if (document.additionalImageIds) {
      const additionalIds = document.additionalImageIds.split(',').filter(id => id.trim());
      additionalIds.forEach(id => {
        urls.push(getImageUrl(id));
      });
    }
    
    return urls;
  };

  const searchImagesByTag = async (tag) => {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.collectionId,
        [
          Query.search('tag', tag),
          Query.select([
            'title', 'description', 'fileId', 'uploadDate', 'tag', 
            'medium', 'userId', 'price', 'awards', 'fileType',
            'additionalImageIds', 'isForSale'
          ]),
        ]
      );
      return response.documents;
    } catch (error) {
      console.error('Error searching documents:', error);
      toast.error('Failed to search creations.');
      return [];
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

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-gray-100 to-white dark:from-[#040d12f5] dark:to-[#1a2630f5] min-h-screen pt-[100px] font-Playfair">
      <div className="w-full max-w-5xl mb-8 px-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 font-Playfair">Share Your Creations</h2>
        <p className="text-gray-600 dark:text-gray-300">Upload your art, crafts, and creative works to share with the community</p>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-5xl mb-6 px-4">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'upload' ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('upload')}
          >
            Upload
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'myArtwork' ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('myArtwork')}
          >
            My Creations
          </button>
        </div>
      </div>

      {activeTab === 'upload' && (
        <div className="w-full max-w-5xl mb-6 px-4">
          <div className="flex flex-col md:flex-row gap-8 w-full mb-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 lg:p-6 rounded-2xl shadow-xl border border-teal-100 dark:border-gray-700">
            <div className="w-full md:w-1/2 h-80 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center rounded-xl overflow-hidden p-4">
              {previewUrl ? (
                entries[0].fileType === "image" ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain rounded-xl"
                  />
                ) : entries[0].fileType === "video" ? (
                  <video
                    src={previewUrl}
                    controls
                    className="max-h-full max-w-full object-contain rounded-xl"
                  />
                ) : (
                  <p className="text-gray-500">Unsupported file type</p>
                )
              ) : (
                <div className="text-center">
                  <IoCloudUploadOutline className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-xl font-medium font-Playfair">Creation Preview</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Your uploaded file will appear here</p>
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <UploadEntry
                index={0}
                entry={entries[0]}
                updateEntry={updateEntry}
                handleFileChange={handleFileChange}
                handleEntryUpload={handleEntryUpload}
                uploading={uploadingStates[0] || false}
              />
            </div>
          </div>

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
        </div>
      )}

      {activeTab === 'myArtwork' && (
        <ImageGallery
          isInitialized={isInitialized}
          searchTag={searchTag}
          setSearchTag={setSearchTag}
          handleSearch={handleSearch}
          myImages={myImages}
          searchedImages={searchedImages}
          user={user}
          setMyImages={setMyImages}
          setSearchedImages={setSearchedImages}
          getImageUrl={getImageUrl}
          getAllImageUrls={getAllImageUrls}
        />
      )}
    </div>
  );
};

export default UploadSection;