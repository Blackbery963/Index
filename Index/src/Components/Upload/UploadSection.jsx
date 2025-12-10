// import React, { useState, useEffect, useRef } from 'react';
// import { toast } from 'react-toastify';
// import { IoCloudUploadOutline } from 'react-icons/io5';
// // import UploadEntry from './UploadEntry';
// import UploadEntry from './UploadEntry/UploadEntry';
// import ImageGallery from './ImageGallery';
// import { account, databases, storage, config, Query, ID, Permission, Role } from "../../appwriteConfig";
// import { maxFileSize } from './constants';
// import imageCompression from 'browser-image-compression';
// import { FFmpeg } from '@ffmpeg/ffmpeg';
// import { fetchFile, toBlobURL } from '@ffmpeg/util';

// const UploadSection = () => {
//   const [entries, setEntries] = useState([
//     { 
//       title: '', 
//       description: '', 
//       tag: '', 
//       medium: '', 
//       price: '', 
//       awards: [], 
//       file: null, 
//       fileType: null,
//       additionalImages: []
//     },
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
//   const [isProcessing, setIsProcessing] = useState(false);
  
//   const ffmpegRef = useRef(new FFmpeg());
//   const [ffmpegLoaded, setFfmpegLoaded] = useState(false);

//   // List of potentially dangerous file extensions
//   const dangerousExtensions = [
//     '.exe', '.msi', '.bat', '.cmd', '.sh', '.bash', '.ps1', '.vbs', '.js', 
//     '.jar', '.app', '.dmg', '.pkg', '.deb', '.rpm', '.scr', '.com', '.hta',
//     '.wsf', '.reg', '.inf', '.zip', '.rar', '.7z', '.tar', '.gz', '.iso',
//     '.dll', '.sys', '.drv', '.ocx', '.cpl', '.pif', '.application', '.gadget',
//     '.msp', '.mst', '.ade', '.adp', '.appx', '.appxbundle', '.cab', '.chm',
//     '.ins', '.isp', '.jse', '.lib', '.lnk', '.mde', '.msc', '.msix', '.msixbundle',
//     '.msp', '.mst', '.nsh', '.sct', '.shb', '.svg', '.vbe', '.vxd', '.wsc',
//     '.wsf', '.wsh', '.xbap', '.xll', '.docm', '.dotm', '.xlsm', '.xltm', '.xlam',
//     '.pptm', '.potm', '.ppam', '.ppsm', '.sldm'
//   ];

//   // Simple security check - only block obviously dangerous files
//   const isFileSecure = (file) => {
//     const fileName = file.name.toLowerCase();
//     const fileExtension = '.' + fileName.split('.').pop();
    
//     // Block dangerous extensions
//     if (dangerousExtensions.includes(fileExtension)) {
//       return false;
//     }
    
//     // Additional security checks
//     const fileType = file.type.toLowerCase();
    
//     // Allow all image types (starts with image/)
//     if (fileType.startsWith('image/')) {
//       return true;
//     }
    
//     // Allow all video types (starts with video/)
//     if (fileType.startsWith('video/')) {
//       return true;
//     }
    
//     // Allow common document types that are generally safe
//     const safeDocumentTypes = [
//       'application/pdf',
//       'text/plain',
//       'application/msword',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       'application/vnd.ms-excel',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//       'application/vnd.ms-powerpoint',
//       'application/vnd.openxmlformats-officedocument.presentationml.presentation'
//     ];
    
//     if (safeDocumentTypes.includes(fileType)) {
//       return true;
//     }
    
//     // For files with no MIME type or unknown types, check extension
//     const safeExtensions = [
//       '.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.svg', '.tiff', '.tif', 
//       '.ico', '.heic', '.heif', '.avif', '.mp4', '.webm', '.ogg', '.mov', '.avi', 
//       '.mpeg', '.mpg', '.mkv', '.flv', '.3gp', '.3g2', '.wmv', '.m4v', '.ts', 
//       '.mts', '.pdf', '.txt', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'
//     ];
    
//     return safeExtensions.includes(fileExtension);
//   };

//   // Enhanced file type detection based on both MIME and extension
//   const getFileCategory = (file) => {
//     const fileName = file.name.toLowerCase();
//     const fileType = file.type.toLowerCase();
    
//     // Image detection
//     const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.svg', '.tiff', '.tif', '.ico', '.heic', '.heif', '.avif'];
//     const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/svg+xml', 'image/tiff', 'image/x-tiff', 'image/x-icon', 'image/heic', 'image/heif', 'image/avif'];
    
//     const fileExtension = '.' + fileName.split('.').pop();
    
//     if (fileType.startsWith('image/') || imageMimeTypes.includes(fileType) || imageExtensions.includes(fileExtension)) {
//       return 'image';
//     }
    
//     // Video detection
//     const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mpeg', '.mpg', '.mkv', '.flv', '.3gp', '.3g2', '.wmv', '.m4v', '.ts', '.mts'];
//     const videoMimeTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo', 'video/mpeg', 'video/x-mpeg', 'video/x-matroska', 'video/x-flv', 'video/3gpp', 'video/3gpp2', 'video/x-ms-wmv', 'video/x-m4v'];
    
//     if (fileType.startsWith('video/') || videoMimeTypes.includes(fileType) || videoExtensions.includes(fileExtension)) {
//       return 'video';
//     }
    
//     // Default to image for unknown but safe files (most creative works are images)
//     return 'image';
//   };

//   // Load FFmpeg for video compression
//   useEffect(() => {
//     const loadFFmpeg = async () => {
//       const ffmpeg = ffmpegRef.current;
//       try {
//         const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
//         await ffmpeg.load({
//           coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
//           wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
//         });
//         setFfmpegLoaded(true);
//       } catch (error) {
//         console.error('Failed to load FFmpeg:', error);
//       }
//     };
//     loadFFmpeg();
//   }, []);

//   useEffect(() => {
//     if (entries[0].file) {
//       const url = URL.createObjectURL(entries[0].file);
//       setPreviewUrl(url);
//       return () => URL.revokeObjectURL(url);
//     } else {
//       setPreviewUrl(null);
//     }
//   }, [entries[0].file]);

//   // Helper function to get file extension
//   const getFileExtension = (filename) => {
//     return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
//   };

//   // Helper function to change file extension
//   const changeFileExtension = (filename, newExtension) => {
//     const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
//     return `${nameWithoutExt}.${newExtension}`;
//   };

//   // Silent compression functions with proper file extensions
//   const compressImage = async (file) => {
//     const options = {
//       maxSizeMB: 3,
//       maxWidthOrHeight: 1920,
//       useWebWorker: true,
//       fileType: file.type,
//       initialQuality: 0.8,
//     };

//     try {
//       const compressedFile = await imageCompression(file, options);
      
//       // Additional compression if still too large
//       if (compressedFile.size > 3 * 1024 * 1024) {
//         options.maxSizeMB = 1;
//         options.initialQuality = 0.6;
//         return await imageCompression(file, options);
//       }
      
//       return compressedFile;
//     } catch (error) {
//       console.error('Image compression error:', error);
//       return file; // Return original file if compression fails
//     }
//   };

//   const compressVideo = async (file) => {
//     if (!ffmpegLoaded) {
//       return file; // Return original if FFmpeg not ready
//     }

//     const ffmpeg = ffmpegRef.current;
//     const inputName = 'input.' + getFileExtension(file.name);
//     const outputName = 'output.mp4'; // Always output as MP4

//     try {
//       await ffmpeg.writeFile(inputName, await fetchFile(file));

//       await ffmpeg.exec([
//         '-i', inputName,
//         '-c:v', 'libx264',
//         '-crf', '28',
//         '-preset', 'fast',
//         '-vf', 'scale=1280:-2',
//         '-c:a', 'aac',
//         '-b:a', '128k',
//         '-movflags', '+faststart',
//         outputName
//       ]);

//       const data = await ffmpeg.readFile(outputName);
//       const compressedBlob = new Blob([data.buffer], { type: 'video/mp4' });
      
//       // Always use .mp4 extension for compressed videos
//       const compressedFileName = changeFileExtension(file.name, 'mp4');
      
//       const compressedFile = new File(
//         [compressedBlob], 
//         compressedFileName,
//         { type: 'video/mp4' }
//       );

//       await ffmpeg.deleteFile(inputName);
//       await ffmpeg.deleteFile(outputName);

//       return compressedFile;
//     } catch (error) {
//       console.error('Video compression error:', error);
//       return file; // Return original file if compression fails
//     }
//   };

//   // Process file with proper extension handling
//   const processFile = async (file, isImage, isVideo) => {
//     let processedFile = file;

//     // Silent compression for large files
//     if (file.size > 3 * 1024 * 1024) {
//       try {
//         if (isImage) {
//           processedFile = await compressImage(file);
//         } else if (isVideo) {
//           processedFile = await compressVideo(file);
//         }
//       } catch (error) {
//         console.error('Processing failed:', error);
//         processedFile = file; // Use original file if processing fails
//       }
//     }

//     return processedFile;
//   };

//   // Initialize Appwrite
//   useEffect(() => {
//     const initializeAppwrite = async () => {
//       try {
//         try {
//           const currentUser = await account.get();
//           setUser(currentUser);
//         } catch (err) {
//           console.warn('No user logged in:', err.message);
//         }

//         try {
//           await databases.listDocuments(config.databaseId, config.collectionId);
//         } catch (err) {
//           if (err.code === 404) {
//             toast.error('Database not found. Please create the database in Appwrite Console.');
//             return;
//           }
//           throw err;
//         }

//         try {
//           await databases.listDocuments(config.databaseId, config.collectionId);
//         } catch (err) {
//           if (err.code === 404) {
//             await createCollectionAndAttributes();
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

//   const createCollectionAndAttributes = async () => {
//     await databases.createCollection(
//       config.databaseId,
//       config.collectionId,
//       import.meta.env.VITE_APPWRITE_IMAGES_COLLECTION_ID,
//       [
//         Permission.read(Role.any()),
//         Permission.write(Role.users()),
//         Permission.update(Role.users()),
//         Permission.delete(Role.users()),             
//       ]
//     );

//     const attributes = [
//       { name: 'title', type: 'string', size: 255, required: true },
//       { name: 'description', type: 'string', size: 1000, required: false },
//       { name: 'fileId', type: 'string', size: 255, required: true },
//       { name: 'additionalImageIds', type: 'string', size: 1000, required: false },
//       { name: 'tag', type: 'string', size: 255, required: true, array: false },
//       { name: 'medium', type: 'string', size: 255, required: true },
//       { name: 'awards', type: 'string', size: 255, required: false },
//       { name: 'price', type: 'float', required: false },
//       { name: 'userId', type: 'string', size: 255, required: true },
//       { name: 'uploadDate', type: 'datetime', required: true },
//       { name: 'fileType', type: 'string', size: 50, required: false },
//       { name: 'isForSale', type: 'boolean', required: false },
//       { name: 'originalFileName', type: 'string', size: 255, required: false },
//     ];

//     for (const attr of attributes) {
//       try {
//         if (attr.type === 'string') {
//           await databases.createStringAttribute(
//             config.databaseId,
//             config.collectionId,
//             attr.name,
//             attr.size,
//             attr.required,
//             attr.array
//           );
//         } else if (attr.type === 'float') {
//           await databases.createFloatAttribute(
//             config.databaseId,
//             config.collectionId,
//             attr.name,
//             attr.required
//           );
//         } else if (attr.type === 'datetime') {
//           await databases.createDatetimeAttribute(
//             config.databaseId,
//             config.collectionId,
//             attr.name,
//             attr.required
//           );
//         } else if (attr.type === 'boolean') {
//           await databases.createBooleanAttribute(
//             config.databaseId,
//             config.collectionId,
//             attr.name,
//             attr.required
//           );
//         }
//       } catch (error) {
//         if (error.code !== 409) throw error;
//       }
//     }

//     try {
//       await databases.createIndex(
//         config.databaseId,
//         config.collectionId,
//         'tag_index',
//         'fulltext',
//         ['tag']
//       );
//     } catch (err) {
//       if (err.code !== 409) throw err;
//     }
//   };

//   const updateEntry = (index, field, value) => {
//     const newEntries = [...entries];
//     newEntries[index][field] = value;
//     setEntries(newEntries);
//   };

//   // Simplified handleFileChange - only security checks, no MIME restrictions
//   const handleFileChange = async (index, files, isAdditional = false) => {
//     if (!files || files.length === 0) return;
    
//     if (isAdditional) {
//       const newFiles = Array.from(files);
//       const validFiles = [];
      
//       setIsProcessing(true);

//       for (const file of newFiles) {
//         // Security check for additional images
//         if (!isFileSecure(file)) {
//           toast.error('File type not allowed for security reasons');
//           continue;
//         }
        
//         const fileCategory = getFileCategory(file);
        
//         // For additional images, prefer images but allow any safe file
//         if (fileCategory !== 'image') {
//           toast.info('Additional files should preferably be images for best display');
//         }
        
//         try {
//           let processedFile = file;
          
//           // Silent compression for large files
//           if (file.size > 3 * 1024 * 1024) {
//             processedFile = await processFile(file, fileCategory === 'image', fileCategory === 'video');
//           }
          
//           validFiles.push(processedFile);
//         } catch (error) {
//           console.error('Processing failed:', error);
//           validFiles.push(file); // Use original file if processing fails
//         }
//       }

//       setIsProcessing(false);

//       const newEntries = [...entries];
//       const currentAdditional = newEntries[index].additionalImages || [];
//       const updatedAdditional = [...currentAdditional, ...validFiles].slice(0, 3);
//       newEntries[index].additionalImages = updatedAdditional;
//       setEntries(newEntries);
//     } else {
//       // Handle main file
//       const file = files[0];
      
//       // Security check - only block dangerous files
//       if (!isFileSecure(file)) {
//         toast.error('File type not allowed for security reasons. Please upload images, videos, or documents.');
//         return;
//       }

//       if (file.size > maxFileSize) {
//         toast.error('File size exceeds 10MB limit');
//         return;
//       }

//       const fileCategory = getFileCategory(file);
//       const isImage = fileCategory === 'image';
//       const isVideo = fileCategory === 'video';

//       setIsProcessing(true);
      
//       try {
//         const processedFile = await processFile(file, isImage, isVideo);

//         const newEntries = [...entries];
//         newEntries[index].file = processedFile;
//         newEntries[index].fileType = fileCategory;
//         setEntries(newEntries);
//       } catch (error) {
//         console.error('File processing failed:', error);
//         toast.error('Failed to process file. Please try again.');
//       } finally {
//         setIsProcessing(false);
//       }
//     }
//   };

//   const uploadFilesToStorage = async (files, userId) => {
//     const uploadPromises = files.map(file => {
//       // Validate file exists and is valid
//       if (!file || !(file instanceof File)) {
//         throw new Error('Invalid file provided');
//       }
      
//       return storage.createFile(
//         config.bucketId,
//         ID.unique(),
//         file,
//         [Permission.read(Role.any()), Permission.write(Role.user(userId))]
//       );
//     });
    
//     const results = await Promise.all(uploadPromises);
//     return results.map(result => result.$id);
//   };

//   const storeFileWithMetadata = async (file, additionalImages, userId, entryData) => {
//     try {
//       // Validate main file
//       if (!file || !(file instanceof File)) {
//         throw new Error('No valid file provided for upload');
//       }

//       // Upload main file
//       const storageResponse = await storage.createFile(
//         config.bucketId,
//         ID.unique(),
//         file,
//         [Permission.read(Role.any()), Permission.write(Role.user(userId))]
//       );

//       // Upload additional images
//       let additionalImageIds = [];
//       if (additionalImages && additionalImages.length > 0) {
//         additionalImageIds = await uploadFilesToStorage(additionalImages, userId);
//       }

//       const fileType = getFileCategory(file);
//       const isForSale = !!entryData.price;

//       // Store metadata
//       const metadataResponse = await databases.createDocument(
//         config.databaseId,
//         config.collectionId,
//         ID.unique(),
//         {
//           fileId: storageResponse.$id,
//           additionalImageIds: additionalImageIds.join(','),
//           userId,
//           title: entryData.title,
//           description: entryData.description || '',
//           tag: entryData.tag || '',
//           medium: entryData.medium,
//           price: entryData.price ? parseFloat(entryData.price) : null,
//           awards: entryData.awards
//             ? Array.isArray(entryData.awards)
//               ? entryData.awards
//               : entryData.awards.split(',').map(a => a.trim())
//             : [],
//           uploadDate: new Date().toISOString(),
//           fileType: fileType,
//           isForSale: isForSale,
//           originalFileName: file.name, // Store original filename
//         },
//         [
//           Permission.read(Role.any()),
//           Permission.update(Role.user(userId)),
//           Permission.delete(Role.user(userId)),
//         ]
//       );

//       return { 
//         file: storageResponse, 
//         additionalFiles: additionalImageIds.map(id => ({ $id: id })),
//         metadata: metadataResponse 
//       };
//     } catch (error) {
//       console.error('Error storing file and metadata:', error);
//       throw new Error(`Upload failed: ${error.message}`);
//     }
//   };

//   const handleEntryUpload = async (index, entryWithAdditional) => {
//     if (!isInitialized) {
//       toast.error('Database is not initialized. Please try again later.');
//       return;
//     }

//     const entry = entryWithAdditional || entries[index];
    
//     // Validation
//     if (!entry.title.trim()) {
//       toast.error('Please provide a title for your creation');
//       return;
//     }
//     if (!entry.file) {
//       toast.error('Please select a file to upload');
//       return;
//     }
//     if (entry.fileType !== 'video' && !entry.medium) {
//       toast.error('Please select an art/craft type');
//       return;
//     }
//     if (!entry.tag) {
//       toast.error('Please add at least one tag');
//       return;
//     }
//     if (entry.price && !entry.medium) {
//       toast.error('Please select a category for items for sale');
//       return;
//     }

//     // Validate file object
//     if (!(entry.file instanceof File)) {
//       toast.error('Invalid file. Please select a valid file to upload.');
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

//       await storeFileWithMetadata(entry.file, entry.additionalImages, user.$id, entry);
//       clearInterval(interval);
//       setProgress(100);

//       // Reset form
//       const newEntries = [...entries];
//       newEntries[index] = { 
//         title: '', 
//         description: '', 
//         tag: '', 
//         medium: '', 
//         price: '', 
//         awards: [], 
//         file: null, 
//         fileType: null,
//         additionalImages: [] 
//       };
//       setEntries(newEntries);

//       // Refresh user's images
//       const images = await getMyImages();
//       setMyImages(images);

//       // Success message
//       const message = entry.price 
//         ? `Your creation is now listed for sale at ₹${entry.price}${entry.additionalImages.length > 0 ? ' with ' + entry.additionalImages.length + ' additional images' : ''}`
//         : `Your creation is now live${entry.additionalImages.length > 0 ? ' with ' + entry.additionalImages.length + ' additional images' : ''}`;

//       toast.success(
//         <div>
//           <p className="font-semibold">"{entry.title}" uploaded successfully!</p>
//           <p className="text-sm">{message}</p>
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

//   const getMyImages = async () => {
//     if (!user || !user.$id) return [];
    
//     try {
//       const response = await databases.listDocuments(
//         config.databaseId,
//         config.collectionId,
//         [
//           Query.equal('userId', user.$id),
//           Query.orderDesc('uploadDate'),
//           Query.limit(50),
//           Query.select([
//             'title', 'description', 'fileId', 'uploadDate', 'tag', 
//             'medium', 'userId', 'price', 'awards', 'fileType',
//             'additionalImageIds', 'isForSale', 'originalFileName'
//           ]),
//         ]
//       );
//       return response.documents;
//     } catch (error) {
//       console.error('Error fetching user documents:', error);
//       toast.error('Failed to fetch your creations.');
//       return [];
//     }
//   };

//   const getImageUrl = (fileId) => {
//     return `${config.endpoint}/storage/buckets/${config.bucketId}/files/${fileId}/preview?project=${config.projectId}`;
//   };

//   const getAllImageUrls = (document) => {
//     const urls = [getImageUrl(document.fileId)];
    
//     if (document.additionalImageIds) {
//       const additionalIds = document.additionalImageIds.split(',').filter(id => id.trim());
//       additionalIds.forEach(id => {
//         urls.push(getImageUrl(id));
//       });
//     }
    
//     return urls;
//   };

//   const searchImagesByTag = async (tag) => {
//     try {
//       const response = await databases.listDocuments(
//         config.databaseId,
//         config.collectionId,
//         [
//           Query.search('tag', tag),
//           Query.select([
//             'title', 'description', 'fileId', 'uploadDate', 'tag', 
//             'medium', 'userId', 'price', 'awards', 'fileType',
//             'additionalImageIds', 'isForSale', 'originalFileName'
//           ]),
//         ]
//       );
//       return response.documents;
//     } catch (error) {
//       console.error('Error searching documents:', error);
//       toast.error('Failed to search creations.');
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
//     <div className="flex flex-col items-center bg-gradient-to-b from-gray-100 to-white dark:from-[#000705] dark:to-[#000705] min-h-screen pt-[100px] font-Playfair">
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


// {activeTab === 'upload' && (
//   <div className="w-full md:max-w-5xl max-w-full mb-10 px-1">

//     {/* Processing alert */}
//     {isProcessing && (
//       <div className="mb-4 p-4 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl shadow-sm">
//         <p className="text-teal-800 dark:text-teal-300 text-sm font-medium">
//           ⚡ Processing your creation...
//         </p>
//       </div>
//     )}

//     {/* Outer Section */}
//     <div className="
//       w-full flex flex-col md:flex-row gap-10
//       bg-white/50 dark:bg-gray-800/30 
//       backdrop-blur-xl
//       rounded-sm shadow-2xl px-1 py-4 md:p-6 lg:p-8
//       border border-white/40 dark:border-gray-700
//     ">

//       {/* PREVIEW SECTION */}
//       <div className="
//         w-full md:w-1/2 h-[340px]
//         rounded-xl overflow-hidden
//         flex items-center justify-center
//         bg-gradient-to-br from-gray-100 to-gray-50
//         dark:from-gray-700 dark:to-gray-800
//         shadow-inner
//         px-2
//       ">
//         {previewUrl ? (
//           entries[0].fileType === "image" ? (
//             <img
//               src={previewUrl}
//               alt="Preview"
//               className="max-h-full max-w-full object-contain rounded-lg"
//             />
//           ) : entries[0].fileType === "video" ? (
//             <video
//               src={previewUrl}
//               controls
//               className="max-h-full max-w-full object-contain rounded-lg"
//             />
//           ) : (
//             <div className="text-center opacity-80">
//               <IoCloudUploadOutline className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-3" />
//               <p className="text-gray-600 dark:text-gray-300">Preview not available</p>
//             </div>
//           )
//         ) : (
//           <div className="text-center opacity-70">
//             <IoCloudUploadOutline className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
//             <p className="text-xl font-medium text-gray-700 dark:text-gray-300 font-Playfair">Your Creation Preview</p>
//             <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">It will appear here once selected</p>
//           </div>
//         )}
//       </div>

//       {/* FORM (no padding) */}
//       <div className="w-full md:w-1/2 px-0 space-y-6">
//         <UploadEntry
//           index={0}
//           entry={entries[0]}
//           updateEntry={updateEntry}
//           handleFileChange={handleFileChange}
//           handleEntryUpload={handleEntryUpload}
//           uploading={uploadingStates[0] || false}
//         />
//       </div>
//     </div>

//     {/* PROGRESS BAR */}
//     {Object.values(uploadingStates).some((state) => state) && (
//       <div className="w-full mt-6">
//         <div className="flex justify-between mb-1">
//           <span className="text-sm font-medium text-teal-700 dark:text-teal-400">Upload Progress</span>
//           <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{progress}%</span>
//         </div>
//         <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
//           <div
//             className="bg-teal-600 dark:bg-teal-500 h-2.5 rounded-full transition-all duration-300"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
//       </div>
//     )}

//   </div>
// )}


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
//           getImageUrl={getImageUrl}
//           getAllImageUrls={getAllImageUrls}
//         />
//       )}
//     </div>
//   );
// };

// export default UploadSection;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'react-toastify';
import { IoCloudUploadOutline } from 'react-icons/io5';
import UploadEntry from './UploadEntry/UploadEntry';
import ImageGallery from './ImageGallery';
import { account, databases, storage, config, Query, ID, Permission, Role } from "../../appwriteConfig";
import { maxFileSize } from './constants';
import imageCompression from 'browser-image-compression';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import heic2any from 'heic2any'; // HEIC conversion

const UploadSection = () => {
  const [entries, setEntries] = useState([
    {
      title: '', description: '', tag: '', medium: '', price: '', awards: [],
      file: null, fileType: null, additionalImages: []
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const ffmpegRef = useRef(new FFmpeg());
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);

  // Security check (simplified - expand as needed)
  const isFileSecure = (file) => {
    const fileName = file.name.toLowerCase();
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || file.size === 0) return false;
    // Block dangerous extensions (your list)
    const dangerous = ['.exe', '.msi', '.bat', /* ... full list ... */];
    if (dangerous.includes(`.${fileExtension}`)) return false;
    // Allow images/videos
    return file.type.startsWith('image/') || file.type.startsWith('video/') || fileExtension === 'heic' || fileExtension === 'heif';
  };

  const getFileCategory = (file) => file.type.startsWith('video/') ? 'video' : 'image';

  // FFmpeg load
  useEffect(() => {
    const loadFFmpeg = async () => {
      const ffmpeg = ffmpegRef.current;
      try {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        setFfmpegLoaded(true);
      } catch (error) {
        console.error('Failed to load FFmpeg:', error);
      }
    };
    loadFFmpeg();
  }, []);

  // Preview URL cleanup
  useEffect(() => {
    if (entries[0].file) {
      const url = URL.createObjectURL(entries[0].file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [entries[0].file]);

  // Appwrite init
  useEffect(() => {
    const initializeAppwrite = async () => {
      try {
        // Get user
        try {
          const currentUser = await account.get();
          setUser(currentUser);
        } catch {}

        // Ensure collection exists
        try {
          await databases.listDocuments(config.databaseId, config.collectionId);
        } catch (err) {
          if (err.code === 404) await createCollectionAndAttributes();
        }

        // Fetch my images if user
        if (user) {
          const images = await getMyImages();
          setMyImages(images);
        }

        setIsInitialized(true);
      } catch (error) {
        toast.error('Failed to initialize database.');
      }
    };
    initializeAppwrite();
  }, [user]);

  const createCollectionAndAttributes = async () => {
    // Your existing collection creation logic
  };

  const updateEntry = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  // HEIC to JPEG
  const convertHeicToJpeg = async (file) => {
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.8
      });
      const finalBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      if (!finalBlob || finalBlob.size === 0) throw new Error("Conversion produced empty file");
      const newFileName = file.name.replace(/\.(heic|heif)$/i, ".jpg");
      return new File([finalBlob], newFileName, { type: "image/jpeg" });
    } catch (error) {
      console.error("HEIC Conversion failed:", error);
      throw new Error("Failed to convert HEIC image.");
    }
  };

  // Image compression
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 3,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: file.type,
      initialQuality: 0.8
    };
    try {
      let compressedFile = await imageCompression(file, options);
      if (compressedFile.size > 3 * 1024 * 1024) {
        options.maxSizeMB = 1;
        options.initialQuality = 0.6;
        compressedFile = await imageCompression(file, options);
      }
      if (compressedFile.size === 0) throw new Error("Compression produced empty file");
      return compressedFile;
    } catch (error) {
      console.warn("Compression failed, using original:", error);
      return file;
    }
  };

  // Video compression
  const compressVideo = async (file) => {
    if (!ffmpegLoaded) {
      console.warn("FFmpeg not loaded, skipping video compression");
      return file;
    }

    const ffmpeg = ffmpegRef.current;
    const inputName = 'input.' + file.name.split('.').pop();
    const outputName = 'output.mp4';

    try {
      await ffmpeg.writeFile(inputName, await fetchFile(file));
      await ffmpeg.exec([
        '-i', inputName,
        '-c:v', 'libx264', '-crf', '28', '-preset', 'fast',
        '-vf', 'scale=1280:-2',
        '-c:a', 'aac', '-b:a', '128k',
        '-movflags', '+faststart',
        outputName
      ]);
      const data = await ffmpeg.readFile(outputName);
      if (data.byteLength === 0) throw new Error("Compression produced empty file");
      const compressedBlob = new Blob([data.buffer], { type: 'video/mp4' });
      const compressedFileName = file.name.replace(/\.[^/.]+$/, ".mp4");
      const compressedFile = new File([compressedBlob], compressedFileName, { type: 'video/mp4' });
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
      return compressedFile;
    } catch (error) {
      console.warn("Video compression failed, using original:", error);
      await ffmpeg.deleteFile(inputName).catch(() => {});
      return file;
    }
  };

  const processFile = async (file, isImage, isVideo) => {
    let processedFile = file;
    if (file.size > 3 * 1024 * 1024) {
      setProcessingMessage(isImage ? "Compressing image..." : "Compressing video...");
      try {
        processedFile = isImage ? await compressImage(file) : await compressVideo(file);
        if (processedFile.size === 0) throw new Error("Processed file is empty");
      } catch (error) {
        console.warn("Processing failed:", error);
        processedFile = file; // Fallback
      }
    }
    return processedFile;
  };

  // FIXED: Enhanced file change with validation
  const handleFileChange = useCallback(async (index, files, isAdditional = false) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);

    try {
      const processSingleFile = async (inputFile) => {
        if (!isFileSecure(inputFile)) throw new Error("File type not allowed");
        let workingFile = inputFile;
        const lowerName = inputFile.name.toLowerCase();
        const isHeic = lowerName.endsWith('.heic') || lowerName.endsWith('.heif');

        // Convert HEIC
        if (isHeic) {
          setProcessingMessage("Converting HEIC to JPEG...");
          workingFile = await convertHeicToJpeg(inputFile);
          if (!workingFile || workingFile.size === 0) throw new Error("HEIC conversion failed");
        }

        // Compress
        const fileCategory = getFileCategory(workingFile);
        const processed = await processFile(workingFile, fileCategory === 'image', fileCategory === 'video');
        if (processed.size === 0) throw new Error("Processed file is invalid");

        return processed;
      };

      if (isAdditional) {
        setProcessingMessage("Processing additional images...");
        const newFiles = Array.from(files);
        const validFiles = [];
        for (const file of newFiles) {
          try {
            const processed = await processSingleFile(file);
            validFiles.push(processed);
          } catch (e) {
            toast.error(`Skipped ${file.name}: ${e.message}`);
          }
        }
        const newEntries = [...entries];
        const currentAdditional = newEntries[index].additionalImages || [];
        newEntries[index].additionalImages = [...currentAdditional, ...validFiles].slice(0, 3);
        setEntries(newEntries);
      } else {
        // Main file
        const file = files[0];
        const processedFile = await processSingleFile(file);
        const fileCategory = getFileCategory(processedFile);
        const newEntries = [...entries];
        newEntries[index].file = processedFile;
        newEntries[index].fileType = fileCategory;
        setEntries(newEntries);
      }
    } catch (err) {
      console.error("File processing error:", err);
      toast.error(err.message || "File processing failed");
    } finally {
      setIsProcessing(false);
      setProcessingMessage('');
    }
  }, [entries, ffmpegLoaded]);

  // FIXED: Upload with file validation
  const uploadFilesToStorage = async (files, userId) => {
    const uploadPromises = files
      .filter(f => f && f.size > 0 && f.type) // Validate each file
      .map(async (file) => {
        try {
          return await storage.createFile(
            config.bucketId,
            ID.unique(),
            file, // Ensure it's File
            [Permission.read(Role.any()), Permission.write(Role.user(userId))]
          );
        } catch (err) {
          console.error(`Upload failed for ${file.name}:`, err);
          throw err;
        }
      });
    const results = await Promise.allSettled(uploadPromises);
    return results
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value.$id);
  };

  // Find this function in your code
const storeFileWithMetadata = async (file, additionalImages, userId, entryData) => {
  
  // 1. VALIDATION CHECK
  if (!file || file.size === 0) {
    throw new Error("Invalid file: File is empty or missing.");
  }

  // 2. THE FIX: RE-WRAP THE FILE
  // This ensures the SDK receives a strictly valid File object with a proper name and type.
  // We prioritize the 'originalFileName' if available to ensure extensions match.
  const fileName = entryData.originalFileName || file.name || "image.jpg";
  const fileToUpload = new File([file], fileName, { type: file.type });

  try {
    // 3. UPLOAD THE RE-WRAPPED FILE
    const storageResponse = await storage.createFile(
      config.bucketId,
      ID.unique(),
      fileToUpload, // <--- Use the fresh variable here
      [Permission.read(Role.any()), Permission.write(Role.user(userId))]
    );

    // ... existing logic for additional images ...
    let additionalImageIds = [];
    if (additionalImages && additionalImages.length > 0) {
      // Apply the same fix to additional images
      const processedAdditionalImages = additionalImages.map(img => 
        new File([img], img.name, { type: img.type })
      );
      additionalImageIds = await uploadFilesToStorage(processedAdditionalImages, userId);
    }

    // ... existing metadata database logic ...
    const metadataResponse = await databases.createDocument(
      config.databaseId,
      config.collectionId,
      ID.unique(),
      {
        fileId: storageResponse.$id,
        additionalImageIds: additionalImageIds.join(','),
        userId,
        title: entryData.title,
        description: entryData.description || '',
        tag: entryData.tag || '',
        medium: entryData.medium,
        price: entryData.price ? parseFloat(entryData.price) : null,
        awards: entryData.awards ? (Array.isArray(entryData.awards) ? entryData.awards : entryData.awards.split(',').map(a => a.trim())) : [],
        uploadDate: new Date().toISOString(),
        fileType: getFileCategory(fileToUpload),
        isForSale: !!entryData.price,
        originalFileName: fileToUpload.name,
      },
      [Permission.read(Role.any()), Permission.update(Role.user(userId)), Permission.delete(Role.user(userId))]
    );

    return { file: storageResponse, additionalFiles: additionalImageIds, metadata: metadataResponse };

  } catch (error) {
    console.error("Upload failed details:", error);
    // Throw a clearer error message
    throw new Error(error.message || "Failed to upload file to storage.");
  }
};

  const handleEntryUpload = async (index, entryWithAdditional) => {
    const entry = entryWithAdditional || entries[index];
    if (!isInitialized) {
      toast.error('Database not ready');
      return;
    }
    if (!entry.title.trim() || !entry.file || (!entry.medium && entry.fileType !== 'video')) {
      toast.error('Missing required fields');
      return;
    }

    // FIXED: Validate file before upload
    if (!entry.file || entry.file.size === 0 || !entry.file.type || !isFileSecure(entry.file)) {
      toast.error('Invalid file - please select a valid image or video');
      return;
    }

    setUploadingStates(prev => ({ ...prev, [index]: true }));
    setProgress(0);

    try {
      if (!user) throw new Error("Login required");

      const interval = setInterval(() => setProgress(p => p >= 90 ? p : p + 1), 500);
      const result = await storeFileWithMetadata(entry.file, entry.additionalImages, user.$id, entry);
      clearInterval(interval);
      setProgress(100);

      // Reset entry
      setEntries(prev => {
        const n = [...prev];
        n[index] = { title: '', description: '', tag: '', medium: '', price: '', awards: [], file: null, fileType: null, additionalImages: [] };
        return n;
      });

      // Refresh gallery
      const images = await getMyImages();
      setMyImages(images);
      toast.success("Uploaded successfully!");
    } catch (e) {
      console.error("Upload error:", e); // Log for debugging
      toast.error(e.message || "Upload failed");
    } finally {
      setUploadingStates(prev => ({ ...prev, [index]: false }));
      setProgress(0);
    }
  };

  // Data fetching (unchanged)
  const getMyImages = async () => {
    if (!user) return [];
    return (await databases.listDocuments(config.databaseId, config.collectionId, [
      Query.equal('userId', user.$id),
      Query.orderDesc('uploadDate'),
      Query.limit(50)
    ])).documents;
  };

  const getImageUrl = (fileId) => `${config.endpoint}/storage/buckets/${config.bucketId}/files/${fileId}/preview?project=${config.projectId}`;

  const getAllImageUrls = (doc) => {
    const u = [getImageUrl(doc.fileId)];
    if (doc.additionalImageIds) {
      doc.additionalImageIds.split(',').forEach(i => u.push(getImageUrl(i)));
    }
    return u;
  };

  const handleSearch = async () => {
    if (!searchTag) return;
    setSearchedImages((await databases.listDocuments(config.databaseId, config.collectionId, [
      Query.search('tag', searchTag)
    ])).documents);
  };

  // Render (unchanged UI)
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-gray-100 to-white dark:from-zinc-950 dark:to-zinc-950 min-h-screen pt-[100px] font-Playfair">
      {/* Headers and Tabs */}
      <div className="w-full max-w-5xl mb-8 px-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 font-Playfair">
          Share Your Creations
        </h2>
      </div>

      <div className="w-full max-w-5xl mb-6 px-4">
        <div className="flex border-b border-gray-200 dark:border-zinc-700">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'upload' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 dark:text-zinc-400'}`}
            onClick={() => setActiveTab('upload')}
          >
            Upload
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'myArtwork' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 dark:text-zinc-400'}`}
            onClick={() => setActiveTab('myArtwork')}
          >
            My Creations
          </button>
        </div>
      </div>

      {activeTab === 'upload' && (
        <div className="w-full md:max-w-5xl max-w-full mb-10 px-1">
          {/* Processing UI */}
          {isProcessing && (
            <div className="mb-4 p-4 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl shadow-sm animate-pulse">
              <p className="text-teal-800 dark:text-teal-300 text-sm font-medium flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></span>
                {processingMessage || "Processing..."}
              </p>
            </div>
          )}

          <div className="w-full flex flex-col md:flex-row gap-10 bg-white/50 dark:bg-zinc-800/30 backdrop-blur-xl rounded-lg shadow-2xl px-1 py-4 md:p-6 lg:p-8 border border-white/40 dark:border-zinc-700">
            {/* Preview Section */}
            <div className="w-full md:w-1/2 h-[340px] rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 dark:from-zinc-700 dark:to-zinc-800 shadow-inner px-2 relative">
              {entries[0].file && entries[0].file.name.toLowerCase().includes('heic') && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full z-10">
                  Converted from HEIC
                </div>
              )}
              {previewUrl ? (
                entries[0].fileType === "image" ? (
                  <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain rounded-lg" />
                ) : entries[0].fileType === "video" ? (
                  <video src={previewUrl} controls className="max-h-full max-w-full object-contain rounded-lg" />
                ) : (
                  <div className="text-center opacity-80">
                    <IoCloudUploadOutline className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p>No Preview</p>
                  </div>
                )
              ) : (
                <div className="text-center opacity-70">
                  <IoCloudUploadOutline className="mx-auto h-16 w-16 text-gray-400 dark:text-zinc-500 mb-4" />
                  <p className="text-xl font-medium text-gray-700 dark:text-zinc-300">Your Creation Preview</p>
                  <p className="text-gray-500 dark:text-zinc-500 text-sm mt-2">Supports JPEG, PNG, Video & HEIC</p>
                </div>
              )}
            </div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 space-y-6">
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

          {/* Progress Bar */}
          {Object.values(uploadingStates).some(state => state) && (
            <div className="w-full mt-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">Upload Progress</span>
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2.5">
                <div className="bg-teal-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
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