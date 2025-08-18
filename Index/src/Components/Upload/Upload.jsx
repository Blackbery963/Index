// import { Link } from 'react-router-dom';
// import { FaHome, FaInfoCircle, FaUser, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
// import { MdBook, MdClose } from 'react-icons/md';
// import { IoCloudUploadOutline } from 'react-icons/io5';
// import { FiMenu } from 'react-icons/fi';
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {account, storage, databases, config, ID, Permission, Role, Query } from "../../appwriteConfig"

// const UploadEntry = ({ index, entry, updateEntry, removeEntry, handleFileChange, handleEntryUpload, uploading }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [platformFee, setPlatformFee] = useState(0);
//   const [finalPrice, setFinalPrice] = useState(0);

//   const artTypes = [
//     // Traditional & Fine Arts
//     "Oil Painting",
//     "Acrylic Painting",
//     "Watercolor Painting",
//     "Ink",
//     "Charcoal",
//     "Pastel",
//     "Pencil Drawing",
//     "Graphite Drawing",
//     "Tempera",
//     "Fresco Painting",
//     "Mosaic Art",
//     "Glass Art",
//     "Fiber Art",
//     "Sand Art",

//     // Digital & Modern Art
//     "Digital Art",
//     "Digital Painting",
//     "Vector Art",
//     "Pixel Art",
//     "3D Modeling",
//     "Photography",
//     "Mixed Media",
//     "Collage",
//     "Printmaking",
//     "AI-Generated Art",
//     "Augmented Reality Art",
//     "Virtual Reality Art",
//     "NFT Art",
//     "Data Visualization Art",

//     // Calligraphy & Typography
//     "Calligraphy",
//     "Typography Design",

//     // Sculpture & Installation
//     "Sculpture",
//     "Ceramic",
//     "Installation Art",
//     "Kinetic Art",
//     "Light Art",

//     // Performance & Experimental
//     "Performance Art",
//     "Sound Art",
//     "Bio Art",

//     //Photogrraphy
//     "Portrait Photography",
//     "Landscape Photography",
//     "Street Photography",
//     "Conceptual Photography",
//     "Documentary Photography",
//     "Micro Photography",

//     // Design & Applied Arts
//     "Graphic Design",
//     "Industrial Design",
//     "Fashion Design",
//     "Interior Design",
//     "Architectural Drawing",
//     "Game Design",

//     // Other
//     "Other",
//     "Sell"
//   ];

//   const tagOptions = [
//     'Abstract',
//     'Landscape',
//     'Portrait',
//     'StillLife',
//     'Fantasy',
//     'Realism',
//     'Surrealism',
//     'Traditional',
//     'Minimalism',
//     'Expressionism',
//     'Impressionism',
//     'PopArt',
//     'DigitalArt',
//     'Historical',
//     'Modern',
//     'Nature',
//     'Photography'
//   ];

//     useEffect(() => {
//     if (entry.price) {
//       const price = parseFloat(entry.price);
//       let feePercentage = 0;
      
//       if (price <= 1000) {
//         feePercentage = 12;
//       } else if (price <= 5000) {
//         feePercentage = 8;
//       } else {
//         feePercentage = 6;
//       }
      
//       const fee = (price * feePercentage) / 100;
//       setPlatformFee(fee);
//       setFinalPrice(price - fee);
//     } else {
//       setPlatformFee(0);
//       setFinalPrice(0);
//     }
//   }, [entry.price]);

//   return (
//     <div className="bg-white dark:bg-gray-800/90 p-6 rounded-xl shadow-lg mb-6 border border-gray-100 dark:border-gray-700 transform hover:scale-100 transition-transform duration-300 font-Playfair">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//           Image Entry {index + 1}
//         </h3>
//         {index > 0 && (
//           <button
//             onClick={() => removeEntry(index)}
//             className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-600 text-sm font-medium underline"
//           >
//             Remove
//           </button>
//         )}
//       </div>
//       <div className="grid grid-cols-1 gap-4">
//         <div>
//           <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//             Title *
//           </label>
//           <input
//             type="text"
//             placeholder="Give your image a catchy name"
//             value={entry.title}
//             onChange={(e) => updateEntry(index, 'title', e.target.value)}
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
//             required
//           />
//         </div>
//         <div>
//           <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//             Story Behind It
//           </label>
//           <textarea
//             placeholder="Share the story or details"
//             value={entry.description}
//             onChange={(e) => updateEntry(index, 'description', e.target.value)}
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
//             rows="3"
//           />
//         </div>
//         <div>
//           <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//             Category Tag *
//           </label>
//           <select
//             value={entry.tag}
//             onChange={(e) => updateEntry(index, 'tag', e.target.value)}
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//             required
//           >
//             <option value="">Choose a Category Tag</option>
//             {tagOptions.map((tag) => (
//               <option key={tag} value={tag} className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-teal-300">
//                 {tag}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//             Art Type *
//           </label>
//           <select
//             value={entry.medium}
//             onChange={(e) => updateEntry(index, 'medium', e.target.value)}
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//             required
//           >
//             <option value="">Choose Art Type</option>
//             {artTypes.map((type) => (
//               <option key={type} value={type} className='bg-black text-white'>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </div>
//         {/* Awards and recognation */}
//               <div>
//           <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//             Awards & Recognition
//           </label>
//           <input
//             type="text"
//             placeholder="List any awards or recognition received"
//             value={entry.awards}
//             onChange={(e) => updateEntry(index, 'awards', e.target.value)}
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
//           />
//         </div>

//           <div>
//           <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//             Price (in INR)
//           </label>
//           <input
//             type="number"
//             placeholder="Set price if selling (optional)"
//             value={entry.price}
//             onChange={(e) => updateEntry(index, 'price', e.target.value)}
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
//             min="0"
//             step="0.01"
//           />
          
//           {/* Platform Fee Calculation */}
//           {entry.price && (
//             <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600 dark:text-gray-300">Platform Fee:</span>
//                 <span className="font-semibold">
//                   {platformFee.toFixed(2)} USD ({ 
//                     parseFloat(entry.price) <= 1000 ? '12%' : 
//                     parseFloat(entry.price) <= 5000 ? '8%' : '6%'
//                   })
//                 </span>
//               </div>
//               <div className="flex justify-between text-sm mt-1">
//                 <span className="text-gray-600 dark:text-gray-300">You Receive:</span>
//                 <span className="font-semibold text-teal-600 dark:text-teal-400">
//                   {finalPrice.toFixed(2)} USD
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>

//         <div>
//           <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//             Upload Your Masterpiece *
//           </label>
//           <div
//             className={`border-2 border-dashed ${isDragging ? 'border-teal-500 bg-teal-50 dark:border-teal-400 dark:bg-teal-900' : 'border-teal-300 dark:border-teal-600'} rounded-xl p-6 text-center cursor-pointer transition-all bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 hover:bg-gradient-to-tl hover:from-teal-50 hover:to-gray-50 dark:hover:from-teal-900 dark:hover:to-gray-700`}
//             onDragOver={(e) => {
//               e.preventDefault();
//               setIsDragging(true);
//             }}
//             onDragLeave={(e) => {
//               e.preventDefault();
//               setIsDragging(false);
//             }}
//             onDrop={(e) => {
//               e.preventDefault();
//               setIsDragging(false);
//               handleFileChange(index, e.dataTransfer.files);
//             }}
//             onClick={() => document.getElementById(`fileInput-${index}`).click()}
//           >
//             {entry.file ? (
//               <div className="flex flex-col items-center">
//                 <img
//                   src={URL.createObjectURL(entry.file)}
//                   alt="Preview"
//                   className="h-32 object-contain mb-2 rounded-lg"
//                 />
//                 <p className="text-gray-700 dark:text-gray-300 font-medium truncate max-w-xs">
//                   {entry.file.name}
//                 </p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   {(entry.file.size / 1024 / 1024).toFixed(2)} MB
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <IoCloudUploadOutline className="mx-auto h-12 w-12 text-teal-500 dark:text-teal-400" />
//                 <p className="mt-2 text-gray-600 dark:text-gray-400 font-Playfair">
//                   Drag & drop your image or{' '}
//                   <span className="text-teal-600 dark:text-teal-400 font-semibold">browse</span>
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-wrap">
//                   Supports JPG, PNG, WEBP (Max 10MB)
//                 </p>
//               </>
//             )}
//             <input
//               type="file"
//               id={`fileInput-${index}`}
//               className="hidden"
//               accept="image/jpeg,image/png,image/webp"
//               onChange={(e) => handleFileChange(index, e.target.files)}
//             />
//           </div>
//         </div>
//         <button
//           className={`w-full bg-gradient-to-r from-teal-600 to-teal-300 dark:from-teal-500 dark:to-teal-700 text-white py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 mt-4 font-Playfair ${uploading ? 'opacity-70 cursor-not-allowed' : 'hover:from-teal-700 hover:to-teal-400 dark:hover:from-teal-600 dark:hover:to-teal-800'}`}
//           onClick={() => handleEntryUpload(index)}
//           disabled={uploading}
//         >
//           {uploading ? (
//             <span className="flex items-center justify-center">
//               <svg
//                 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Uploading...
//             </span>
//           ) : entry.price ? (
//             'List for Sale'
//           ) : (
//             'Share Your Art'
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// const UploadSection = () => {
//   const [entries, setEntries] = useState([
//     { title: '', description: '', tag: '', medium: '', price: '', awards:[], file: null },
//   ]);
//   const [uploadingStates, setUploadingStates] = useState({});
//   const [progress, setProgress] = useState(0);
//   const [myImages, setMyImages] = useState([]);
//   const [searchTag, setSearchTag] = useState('');
//   const [searchedImages, setSearchedImages] = useState([]);
//   const [editingImage, setEditingImage] = useState(null);
//   const [editForm, setEditForm] = useState({ title: '', description: '', tag: '', medium: '', price:'', awards:[] });
//   const [user, setUser] = useState(null);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'myArtwork'

//   // Validate configuration
//   if (!config.databaseId || !config.collectionId || !config.bucketId) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-[#040d12f5] dark:to-[#1a2630f5]">
//         <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 font-Playfair">
//           Configuration Error
//         </h2>
//         <p className="text-gray-600 dark:text-gray-300 mt-2">
//           Missing Appwrite configuration. Please check your environment variables and try again.
//         </p>
//       </div>
//     );
//   }

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
//         //   console.log('Collection already exists');
//         } catch (err) {
//           if (err.code === 404) {
//             // Create collection
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
//             console.log('Collection created successfully');

//             // Set up attributes
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
//                 false,
//                 true
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
//             console.log('Attributes created successfully');

//             // Create full-text index for tags
//             try {
//               await databases.createIndex(
//                 config.databaseId,
//                 config.collectionId,
//                 'tag_index',
//                 'fulltext',
//                 ['tag']
//               );
//               console.log('Tags index created successfully');
//             } catch (err) {
//               if (err.code !== 409) throw err; // Ignore if index already exists
//             }
//           } else {
//             throw err;
//           }
//         }

//         // Fetch user's images if logged in
//         if (user) {
//           const images = await getMyImages();
//           setMyImages(images);
//         }
//         setIsInitialized(true);
//       } catch (error) {
//         console.error('Error initializing Appwrite:', {
//           message: error.message,
//           code: error.code,
//           type: error.type,
//           response: error.response,
//         });
//         toast.error('Failed to initialize database. Please check Appwrite setup.');
//       }
//     };
//     initializeAppwrite();
//   }, [user]);

//   const addEntry = () => {
//     setEntries([...entries, { title: '', description: '', tag: '', medium: '', price: '', awards:[], file: null }]);
//   };

//   const updateEntry = (index, field, value) => {
//     const newEntries = [...entries];
//     newEntries[index][field] = value;
//     setEntries(newEntries);
//   };

//   const removeEntry = (index) => {
//     setEntries(entries.filter((_, i) => i !== index));
//   };

//   const handleFileChange = (index, files) => {
//     if (!files || files.length === 0) return;
//     const file = files[0];
//     const maxSize = 10 * 1024 * 1024; // 10MB
//     const validTypes = [
//       'image/jpeg', 
//       'image/jpg',
//       'image/png', 
//       'image/webp',
//       'image/x-png'
//     ];

//     if (!validTypes.includes(file.type)) {
//       toast.error('Please upload a valid image (JPEG, PNG, or WEBP)');
//       return;
//     }

//     if (file.size > maxSize) {
//       toast.error('File size exceeds 10MB limit');
//       return;
//     }

//     const newEntries = [...entries];
//     newEntries[index].file = file;
//     setEntries(newEntries);
//   };

//   const storeFileWithMetadata = async (file, userId, entryData) => {
//     try {
//       const storageResponse = await storage.createFile(
//         config.bucketId,
//         ID.unique(),
//         file,
//         [Permission.read(Role.any()), Permission.write(Role.user(userId))]
//       );

//       const metadataResponse = await databases.createDocument(
//         config.databaseId,
//         config.collectionId,
//         ID.unique(),
//       {
//   fileId: storageResponse.$id,
//   userId,
//   title: entryData.title,
//   description: entryData.description || '',
//   tag: entryData.tag || '',
//   medium: entryData.medium,
//   price: entryData.price ? parseFloat(entryData.price) : null,
  // awards: entryData.awards
  //   ? Array.isArray(entryData.awards)
  //     ? entryData.awards
  //     : entryData.awards.split(',').map(a => a.trim())
  //   : [],
//   uploadDate: new Date().toISOString(),
//       },
//         [
//           Permission.read(Role.any()),
//           Permission.update(Role.user(userId)),
//           Permission.delete(Role.user(userId)),
//         ]
//       );

//       return { file: storageResponse, metadata: metadataResponse };
//     } catch (error) {
//       console.error('Error storing file and metadata:', {
//         message: error.message,
//         code: error.code,
//         type: error.type,
//         response: error.response,
//       });
//       throw new Error(`Upload failed: ${error.message}`);
//     }
//   };

//   const handleEntryUpload = async (index) => {
//     if (!isInitialized) {
//       toast.error('Database is not initialized. Please try again later.');
//       return;
//     }

//     const entry = entries[index];
//     if (!entry.title.trim()) {
//       toast.error('Please provide a title for your artwork');
//       return;
//     }
//     if (!entry.file) {
//       toast.error('Please select an image to upload');
//       return;
//     }
//     if (!entry.medium) {
//       toast.error('Please select an art type');
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
//         throw new Error('Please log in to upload artwork');
//       }

//       // Simulate progress
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
//       newEntries[index] = { title: '', description: '', tag: '', medium: '', price:'', awards:[], file: null };
//       setEntries(newEntries);

//       // Refresh user's images
//       const images = await getMyImages();
//       setMyImages(images);

//       toast.success(
//         <div>
//           <p className="font-semibold">"{entry.title}" uploaded successfully!</p>
//           {entry.price ? (
//             <p className="text-sm">Your artwork is now listed for sale at ${entry.price}.</p>
//           ) : (
//             <p className="text-sm">Your artwork is now live.</p>
//           )}
//         </div>,
//         { autoClose: 5000 }
//       );
//     } catch (err) {
//       console.error('Upload process failed:', {
//         message: err.message,
//         code: err.code,
//         type: err.type,
//         response: err.response,
//       });
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
//           Query.select(['title', 'description', 'fileId', 'uploadDate', 'tag', 'medium', 'userId', 'price', 'awards']),
//         ]
//       );
//       return response.documents;
//     } catch (error) {
//       console.error('Error fetching user documents:', error);
//       toast.error('Failed to fetch your images.');
//       return [];
//     }
//   };

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

//   const updateImageMetadata = async (documentId, updates) => {
//     try {
//       const response = await databases.updateDocument(
//         config.databaseId,
//         config.collectionId,
//         documentId,
//         updates
//       );
//       return response;
//     } catch (error) {
//       console.error('Error updating document:', error);
//       throw new Error(`Update failed: ${error.message}`);
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

//   const startEditing = (image) => {
//     if (!isInitialized) {
//       toast.error('Database is not initialized. Please try again later.');
//       return;
//     }

//     if (!user || user.$id !== image.userId) {
//       toast.error('You can only edit your own images');
//       return;
//     }
//     setEditingImage(image.$id);
// setEditForm({
//   title: image.title,
//   description: image.description,
//   tag: image.tag || '',
//   medium: image.medium,
//   price: image.price || '',
  // awards: Array.isArray(image.awards) ? image.awards : [],
// });

//   };

//   const handleEditChange = (field, value) => {
//     setEditForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleUpdate = async (documentId) => {
//     if (!isInitialized) {
//       toast.error('Database is not initialized. Please try again later.');
//       return;
//     }

//     try {
//       if (!user || !user.$id) {
//         throw new Error('Please log in to update metadata');
//       }

// const updates = {
//   title: editForm.title,
//   description: editForm.description,
//   tag: editForm.tag || '',
//   medium: editForm.medium,
  // awards: editForm.awards
  //   ? Array.isArray(editForm.awards)
  //     ? editForm.awards
  //     : editForm.awards.split(',').map(a => a.trim())
  //   : [],
//   price: editForm.price ? parseFloat(editForm.price) : null,
//   uploadDate: new Date().toISOString(),
// };


//       await updateImageMetadata(documentId, updates);

//       // Refresh image lists
//       const images = await getMyImages();
//       setMyImages(images);
//       setSearchedImages((prev) =>
//         prev.map((img) => (img.$id === documentId ? { ...img, ...updates } : img))
//       );
//       setEditingImage(null);
//       toast.success('Metadata updated successfully!');
//     } catch (error) {
//       toast.error(error.message || 'Failed to update metadata');
//     }
//   };

//   const deleteImage = async (documentId, fileId) => {
//     if (!isInitialized) {
//       toast.error('Database is not initialized. Please try again later.');
//       return;
//     }

//     try {
//       if (!user || !user.$id) {
//         throw new Error('Please log in to delete images');
//       }

//       // Delete document first
//       await databases.deleteDocument(config.databaseId, config.collectionId, documentId);
      
//       // Then delete file from storage
//       await storage.deleteFile(config.bucketId, fileId);

//       // Refresh image lists
//       const images = await getMyImages();
//       setMyImages(images);
//       setSearchedImages((prev) => prev.filter(img => img.$id !== documentId));
      
//       toast.success('Image deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting image:', error);
//       toast.error(error.message || 'Failed to delete image');
//     }
//   };

//   const calculatePlatformFee = (price) => {
//   const numericPrice = parseFloat(price);
//   if (numericPrice <= 1000) return numericPrice * 0.12;
//   if (numericPrice <= 5000) return numericPrice * 0.08;
//   return numericPrice * 0.06;
// };

//   return (
//     <div className="flex flex-col items-center bg-gradient-to-b from-gray-100 to-white dark:from-[#040d12f5] dark:to-[#1a2630f5] min-h-screen pt-[100px] font-Playfair">
//       <div className="w-full max-w-5xl mb-8 px-4">
//         <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 font-Playfair">Masterpiece & Sell</h2>
//         <p className="text-gray-600 dark:text-gray-300">Upload your creative masterpieces and list them for sale</p>
//       </div>

//       {/* Tabs */}
//       <div className="w-full max-w-5xl mb-6 px-4">
//         <div className="flex border-b border-gray-200 dark:border-gray-700">
//           <button
//             className={`py-2 px-4 font-medium ${activeTab === 'upload' ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
//             onClick={() => setActiveTab('upload')}
//           >
//             Upload Artwork
//           </button>
//           <button
//             className={`py-2 px-4 font-medium ${activeTab === 'myArtwork' ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
//             onClick={() => setActiveTab('myArtwork')}
//           >
//             My Artwork
//           </button>
//         </div>
//       </div>

//       {activeTab === 'upload' && (
//         <>
//           {entries.map((entry, index) => (
//             <div
//               key={index}
//               className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mb-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 lg:p-6 rounded-2xl shadow-xl border border-teal-100 dark:border-gray-700"
//             >
//               <div className="w-full md:w-1/2 h-80 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center rounded-xl overflow-hidden p-4">
//                 {entry.file ? (
//                   <img
//                     src={URL.createObjectURL(entry.file)}
//                     alt="Preview"
//                     className="max-h-full max-w-full object-contain rounded-xl"
//                   />
//                 ) : (
//                   <div className="text-center">
//                     <IoCloudUploadOutline className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
//                     <p className="text-gray-500 dark:text-gray-400 text-xl font-medium font-Playfair">Image Preview</p>
//                     <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Your uploaded image will appear here</p>
//                   </div>
//                 )}
//               </div>
//               <div className="w-full md:w-1/2 space-y-4">
//                 <UploadEntry
//                   index={index}
//                   entry={entry}
//                   updateEntry={updateEntry}
//                   removeEntry={removeEntry}
//                   handleFileChange={handleFileChange}
//                   handleEntryUpload={handleEntryUpload}
//                   uploading={uploadingStates[index] || false}
//                 />
//               </div>
//             </div>
//           ))}

//           <div className="w-full max-w-5xl mb-6 px-4">
//             <button
//               onClick={addEntry}
//               className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 font-Playfair"
//             >
//               + Add Another Artwork
//             </button>
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
//         </>
//       )}

//       {activeTab === 'myArtwork' && (
//         <div className="w-full max-w-5xl mb-8 px-4">
//           <div className="flex gap-4 mb-6">
//             <input
//               type="text"
//               placeholder="Search your artwork by tag"
//               value={searchTag}
//               onChange={(e) => setSearchTag(e.target.value)}
//               className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
//               disabled={!isInitialized}
//             />
//             <button
//               onClick={handleSearch}
//               className="p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair"
//               disabled={!isInitialized}
//             >
//               Search
//             </button>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {(searchTag ? searchedImages : myImages).length > 0 ? (
//               (searchTag ? searchedImages : myImages).map((image) => (
//                 <div
//                   key={image.$id}
//                   className="bg-white dark:bg-gray-800/90 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
//                 >
//                   {editingImage === image.$id ? (
//                     <div className="space-y-4">
//                       <input
//                         type="text"
//                         value={editForm.title}
//                         onChange={(e) => handleEditChange('title', e.target.value)}
//                         placeholder="Title"
//                         className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//                       />
//                       <textarea
//                         value={editForm.description}
//                         onChange={(e) => handleEditChange('description', e.target.value)}
//                         placeholder="Description"
//                         className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//                         rows="3"
//                       />
//                       <input
//                         type="text"
//                         value={editForm.tag}
//                         onChange={(e) => handleEditChange('tag', e.target.value)}
//                         placeholder="Tag"
//                         className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//                       />

//                       <input
//                       type="text"
//                       value={editForm.awards}
//                       onChange={(e) => handleEditChange('awards', e.target.value)}
//                       placeholder="List any awards received"
//                        className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//                       />
//                       <input
//                         type="number"
//                         value={editForm.price}
//                         onChange={(e) => handleEditChange('price', e.target.value)}
//                         placeholder="Price (USD)"
//                         className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//                         min="0"
//                         step="0.01"
//                       />
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleUpdate(image.$id)}
//                           className="w-full p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair"
//                         >
//                           Save
//                         </button>
//                         <button
//                           onClick={() => setEditingImage(null)}
//                           className="w-full p-3 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-all duration-300 font-Playfair"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       <img
//                         src={`${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${config.bucketId}/files/${image.fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`}
//                         alt={image.title}
//                         className="w-full h-48 object-cover rounded-lg mb-4"
//                       />
//                       <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 font-Playfair">
//                         {image.title}
//                       </h3>
//                       <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{image.description}</p>
//                       <p className="text-gray-500 dark:text-gray-400 text-sm">
//                         Medium: {image.medium}
//                       </p>
//                       <p className="text-gray-500 dark:text-gray-400 text-sm">
//                         Tag: {image.tag || 'not specified'}
//                       </p>
//                           {image.price && (
//                           <div className="mt-2">
//                           <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm">
//                           Price: ${image.price}
//                           </p>
//                           <p className="text-gray-500 dark:text-gray-400 text-xs">
//                            Platform fee: ${calculatePlatformFee(image.price).toFixed(2)}
//                           </p>
//                           </div>
//                           )}

//                       <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
//                         Uploaded: {new Date(image.uploadDate).toLocaleDateString()}
//                       </p>
//                       <div className="flex gap-2 mt-4">
//                         <button
//                           onClick={() => startEditing(image)}
//                           className="flex-1 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair text-sm"
//                           disabled={!isInitialized}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => deleteImage(image.$id, image.fileId)}
//                           className="flex-1 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-Playfair text-sm"
//                           disabled={!isInitialized}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full text-center py-12">
//                 <IoCloudUploadOutline className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
//                 <p className="text-gray-600 dark:text-gray-300 font-medium">
//                   {searchTag 
//                     ? `No images found for tag "${searchTag}" in your collection.` 
//                     : 'You have no uploaded artwork yet.'}
//                 </p>
//                 <button
//                   onClick={() => setActiveTab('upload')}
//                   className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair"
//                 >
//                   Upload Your First Artwork
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const buttonVariants = {
//     hover: { scale: 1.1, backgroundColor: '#A4C6EB', transition: { duration: 0.3 } },
//     tap: { scale: 0.95 },
//   };

//   const headerVariants = {
//     hidden: { opacity: 0, y: -50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   };

//   const dropdownVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
//   };

//   return (
//     <motion.header
//       className="h-16 sm:h-20 w-full bg-gradient-to-r from-teal-400/50 to-teal-800/50 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-between shadow-lg px-4 sm:px-8 fixed top-0 z-50"
//       variants={headerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <div className="flex items-center">
//         <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-Eagle text-rose-700 dark:text-teal-400">
//           Painters' Diary
//         </h1>
//       </div>
//       <div className="flex items-center gap-2">
//         <nav className="hidden md:flex gap-x-4 text-gray-800 dark:text-gray-200 font-playfair font-semibold">
//           <Link to="/">
//             <motion.button
//               className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 flex items-center gap-2"
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//             >
//               <FaHome className="text-lg sm:text-xl" />
//               <span className="hidden sm:inline">Home</span>
//             </motion.button>
//           </Link>
//           <Link to="/About">
//             <motion.button
//               className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 flex items-center gap-2"
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//             >
//               <FaInfoCircle className="text-lg sm:text-xl" />
//               <span className="hidden sm:inline">About</span>
//             </motion.button>
//           </Link>
//           <Link to="/Account">
//             <motion.button
//               className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 flex items-center gap-2"
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//             >
//               <FaUser className="text-lg sm:text-xl" />
//               <span className="hidden sm:inline">Account</span>
//             </motion.button>
//           </Link>
//           <Link to="/Journal">
//             <motion.button
//               className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 flex items-center gap-2"
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//             >
//               <MdBook className="text-lg sm:text-xl" />
//               <span className="hidden sm:inline">Diary</span>
//             </motion.button>
//           </Link>
//         </nav>
//         <button
//           className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? <MdClose className="text-2xl" /> : <FiMenu className="text-2xl" />}
//         </button>
//       </div>
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             className="absolute top-16 sm:top-20 mt-[5px] right-2 w-48 bg-teal-200/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg z-40 md:hidden"
//             variants={dropdownVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <nav className="flex flex-col items-center gap-2 py-4 text-gray-800 dark:text-gray-200 font-playfair">
//               <Link to="/" onClick={() => setIsMenuOpen(false)}>
//                 <motion.button
//                   className="w-full px-4 py-2 hover:bg-teal-700 dark:hover:bg-teal-700 rounded-md flex items-center justify-center gap-2"
//                   variants={buttonVariants}
//                   whileHover="hover"
//                   whileTap="tap"
//                 >
//                   <FaHome className="text-lg" />
//                   <span>Home</span>
//                 </motion.button>
//               </Link>
//               <Link to="/About" onClick={() => setIsMenuOpen(false)}>
//                 <motion.button
//                   className="w-full px-4 py-2 hover:bg-teal-700 dark:hover:bg-teal-700 rounded-md flex items-center justify-center gap-2"
//                   variants={buttonVariants}
//                   whileHover="hover"
//                   whileTap="tap"
//                 >
//                   <FaInfoCircle className="text-lg" />
//                   <span>About</span>
//                 </motion.button>
//               </Link>
//               <Link to="/Account" onClick={() => setIsMenuOpen(false)}>
//                 <motion.button
//                   className="w-full px-4 py-2 hover:bg-teal-700 dark:hover:bg-teal-700 rounded-md flex items-center justify-center gap-2"
//                   variants={buttonVariants}
//                   whileHover="hover"
//                   whileTap="tap"
//                 >
//                   <FaUser className="text-lg" />
//                   <span>Account</span>
//                 </motion.button>
//               </Link>
//               <Link to="/Journal" onClick={() => setIsMenuOpen(false)}>
//                 <motion.button
//                   className="w-full px-4 py-2 hover:bg-teal-700 dark:hover:bg-teal-700 rounded-md flex items-center justify-center gap-2"
//                   variants={buttonVariants}
//                   whileHover="hover"
//                   whileTap="tap"
//                 >
//                   <MdBook className="text-lg" />
//                   <span>Diary</span>
//                 </motion.button>
//               </Link>
             
//             </nav>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// };

// const App = () => {
//   return (
//     <div className="min-h-screen">
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={true}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//       <Navbar />
//       <UploadSection />
//     </div>
//   );
// };

// export default App;



import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaUser, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { MdBook, MdClose } from 'react-icons/md';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {account, storage, databases, config, ID, Permission, Role, Query } from "../../appwriteConfig"

const UploadEntry = ({ index, entry, updateEntry, removeEntry, handleFileChange, handleEntryUpload, uploading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [platformFee, setPlatformFee] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const artAndCraftTypes = [
    // Traditional & Fine Arts
    "Oil Painting",
    "Acrylic Painting",
    "Watercolor Painting",
    "Ink Drawing",
    "Charcoal Drawing",
    "Pastel Art",
    "Pencil Sketch",
    "Mixed Media",
    
    // Digital Art
    "Digital Art",
    "Digital Painting",
    "3D Modeling",
    "Photography",
    
    // Crafts
    "Pottery",
    "Ceramics",
    "Glass Art",
    "Jewelry Making",
    "Textile Art",
    "Fabric Painting",
    "Embroidery",
    "Knitting/Crochet",
    "Woodworking",
    "Metal Crafts",
    "Paper Crafts",
    "Origami",
    "Scrapbooking",
    "Candle Making",
    "Soap Making",
    "Basket Weaving",
    "Leather Craft",
    "Beadwork",
    
    // Sculpture
    "Sculpture",
    "Clay Modeling",
    "Stone Carving",
    
    // Other
    "Other"
  ];

const tagOptions = [
  // 🎨 Styles
  "Abstract", "Realism", "Impressionism", "Surrealism", "Minimalism", "Modern", "Vintage",
  
  // 🌍 Themes
  "Portrait", "Landscape", "Nature", "Fantasy", "Cultural", "Spiritual", "Still Life", "Urban", "Traditional",
  
  // 🖌 Mediums
  "Digital", "Photography", "Mixed Media", "Textile", "Wood", "Ceramic", "Paper",
  
  // 🏠 Purpose
  "Home Decor", "Wearable", "Gift Item", "Poster & Prints", "Handmade"
];




//   const tagOptions = [
//   // 🎨 Fine Art Styles
//   'Abstract', 'Realism', 'Impressionism', 'Expressionism', 'Surrealism', 'Minimalism', 'StillLife',
  
//   // 🌍 Themes & Subjects
//   'Landscape', 'Portrait', 'Nature', 'Fantasy', 'Historical', 'Pop Art',
  
//   // 🖌 Mediums & Techniques
//   'Digital Art', 'Traditional', 'Photography', 'Mixed Media', 'Watercolour', 'Oil Painting',
  
//   // 🏠 Functional & Commercial
//   'Home Decor', 'Wearable Art', 'Functional Art', 'Stationery', 'Prints & Posters', 'Vintage',
  
//   // 💡 Contemporary & Trend-Driven
//   'Modern', 'Street Art', 'Conceptual Art', 'Handmade', 'Sculpture', 'Installation Art'
// ];


  // const tagOptions = [
  //   'Abstract',
  //   'Landscape',
  //   'Portrait',
  //   'StillLife',
  //   'Fantasy',
  //   'Realism',
  //   'Surrealism',
  //   'Traditional',
  //   'Minimalism',
  //   'Expressionism',
  //   'Impressionism',
  //   'PopArt',
  //   'DigitalArt',
  //   'Historical',
  //   'Modern',
  //   'Nature',
  //   'Photography',
  //   'Handmade',
  //   'Vintage',
  //   'Home Decor',
  //   'Wearable Art',
  //   'Functional Art'
  // ];


  useEffect(() => {
    if (entry.price) {
      const price = parseFloat(entry.price);
      let feePercentage = 0;
      
      if (price <= 1000) {
        feePercentage = 10;
      } else if (price <= 5000) {
        feePercentage = 8;
      } else {
        feePercentage = 6;
      }
      
      const fee = (price * feePercentage) / 100;
      setPlatformFee(fee);
      setFinalPrice(price - fee);
    } else {
      setPlatformFee(0);
      setFinalPrice(0);
    }
  }, [entry.price]);

  const nextStep = () => {
    if (currentStep === 1 && (!entry.file || !entry.title)) {
      toast.error('Please upload an image and provide a title');
      return;
    }
    if (currentStep === 2 && (!entry.tag || !entry.medium)) {
      toast.error('Please select a category tag and art/craft type');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="bg-white dark:bg-gray-800/90 p-6 rounded-xl shadow-lg mb-6 border border-gray-100 dark:border-gray-700 transform hover:scale-100 transition-transform duration-300 font-Playfair">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Upload Your Creation
        </h3>
      </div>
      
      {/* Step indicator */}
      <div className="flex justify-between mb-8 relative">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col items-center z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-teal-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'} font-semibold`}>
              {step}
            </div>
            <span className={`text-xs mt-2 ${currentStep >= step ? 'text-teal-600 dark:text-teal-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
              {step === 1 ? 'Basic Info' : step === 2 ? 'Categories' : step === 3 ? 'Details' : 'Preview'}
            </span>
          </div>
        ))}
        <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 dark:bg-gray-700">
          <div 
            className="h-1 bg-teal-600 transition-all duration-300" 
            style={{ width: `${(currentStep - 1) * 33.33}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div>
            <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
              Upload Your Creation *
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

          <div>
            <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
              Title *
            </label>
            <input
              type="text"
              placeholder="Give your creation a name"
              value={entry.title}
              onChange={(e) => updateEntry(index, 'title', e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
              required
            />
          </div>

          <div>
            <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
              Description
            </label>
            <textarea
              placeholder="Tell us about your creation, inspiration, or process"
              value={entry.description}
              onChange={(e) => updateEntry(index, 'description', e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
              rows="3"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={nextStep}
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg transition-all duration-300"
            >
              Next: Categories
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Categories */}
      {currentStep === 2 && (
        <div className="space-y-4">
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
              Art/Craft Type *
            </label>
            <select
              value={entry.medium}
              onChange={(e) => updateEntry(index, 'medium', e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
              required
            >
              <option value="">Choose Art/Craft Type</option>
              {artAndCraftTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white py-2 px-6 rounded-lg transition-all duration-300"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg transition-all duration-300"
            >
              Next: Details
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Details */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div>
            <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
              Awards & Recognition (Optional)
            </label>
            <input
              type="text"
              placeholder="List any awards or recognition received"
              value={entry.awards}
              onChange={(e) => updateEntry(index, 'awards', e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
            />
          </div>

          <div>
            <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
              Price (in INR) - Optional
            </label>
            <input
              type="number"
              placeholder="Set price if selling"
              value={entry.price}
              onChange={(e) => updateEntry(index, 'price', e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
              min="0"
              step="0.01"
            />
            
            {entry.price && (
              <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Platform Fee:</span>
                  <span className="font-semibold">
                    {platformFee.toFixed(2)} INR ({ 
                      parseFloat(entry.price) <= 1000 ? '12%' : 
                      parseFloat(entry.price) <= 5000 ? '8%' : '6%'
                    })
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600 dark:text-gray-300">You Receive:</span>
                  <span className="font-semibold text-teal-600 dark:text-teal-400">
                    {finalPrice.toFixed(2)} INR
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white py-2 px-6 rounded-lg transition-all duration-300"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg transition-all duration-300"
            >
              Next: Preview
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Preview */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-400 border-b pb-2">
            Preview Your Creation
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Image Preview</h4>
              {entry.file && (
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex justify-center">
                  <img
                    src={URL.createObjectURL(entry.file)}
                    alt="Preview"
                    className="max-h-64 object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Details</h4>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Title</p>
                      <p className="font-medium">{entry.title || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                      <p className="font-medium">{entry.description || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Category Tag</p>
                      <p className="font-medium">{entry.tag || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Art/Craft Type</p>
                      <p className="font-medium">{entry.medium || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Awards & Recognition</p>
                      <p className="font-medium">{entry.awards || 'Not provided'}</p>
                    </div>
                    {entry.price && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Pricing</p>
                        <p className="font-medium">₹{entry.price}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Platform fee: ₹{platformFee.toFixed(2)} ({parseFloat(entry.price) <= 1000 ? '12%' : parseFloat(entry.price) <= 5000 ? '8%' : '6%'})
                        </p>
                        <p className="text-xs text-teal-600 dark:text-teal-400">
                          You receive: ₹{finalPrice.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={prevStep}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white py-2 px-6 rounded-lg transition-all duration-300"
            >
              Back to Edit
            </button>
            <button
              className={`w-full md:w-auto bg-gradient-to-r from-teal-600 to-teal-300 dark:from-teal-500 dark:to-teal-700 text-white py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 font-Playfair ${uploading ? 'opacity-70 cursor-not-allowed' : 'hover:from-teal-700 hover:to-teal-400 dark:hover:from-teal-600 dark:hover:to-teal-800'}`}
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
              ) : entry.price ? (
                'List for Sale'
              ) : (
                'Share Your Creation'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ... (rest of the code remains the same)

const UploadSection = () => {
  const [entries, setEntries] = useState([
    { title: '', description: '', tag: '', medium: '', price: '', awards: [], file: null },
  ]);
  const [uploadingStates, setUploadingStates] = useState({});
  const [progress, setProgress] = useState(0);
  const [myImages, setMyImages] = useState([]);
  const [searchTag, setSearchTag] = useState('');
  const [searchedImages, setSearchedImages] = useState([]);
  const [editingImage, setEditingImage] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', tag: '', medium: '', price: '', awards: [] });
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

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
          await databases.listDocuments(config.databaseId, config.collectionId);
        } catch (err) {
          if (err.code === 404) {
            toast.error('Database not found. Please create the database in Appwrite Console.');
            return;
          }
          throw err;
        }

        // Check if collection exists
        try {
          await databases.listDocuments(config.databaseId, config.collectionId);
        } catch (err) {
          if (err.code === 404) {
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
              databases.createStringAttribute(
                config.databaseId,
                config.collectionId,
                'medium',
                255,
                true
              ),
              databases.createStringAttribute(
                config.databaseId,
                config.collectionId,
                'awards',
                255,
                false
              ),
              databases.createFloatAttribute(
                config.databaseId,
                config.collectionId,
                'price',
                false
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

  const updateEntry = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleFileChange = (index, files) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const maxSize = 10 * 1024 * 1024;
    const validTypes = [
      'image/jpeg', 
      'image/jpg',
      'image/png', 
      'image/webp',
      'image/x-png'
    ];

    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPEG, PNG, or WEBP)');
      return;
    }

    if (file.size > maxSize) {
      toast.error('File size exceeds 10MB limit');
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
          tag: entryData.tag || '',
          medium: entryData.medium,
          price: entryData.price ? parseFloat(entryData.price) : null,
          // awards: entryData.awards || '',
          awards: entryData.awards
          ? Array.isArray(entryData.awards)
          ? entryData.awards
          : entryData.awards.split(',').map(a => a.trim())
          : [],
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
      console.error('Error storing file and metadata:', error);
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
      toast.error('Please provide a title for your creation');
      return;
    }
    if (!entry.file) {
      toast.error('Please select an image to upload');
      return;
    }
    if (!entry.medium) {
      toast.error('Please select an art/craft type');
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
        throw new Error('Please log in to upload creations');
      }

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
      newEntries[index] = { title: '', description: '', tag: '', medium: '', price: '', awards: [], file: null };
      setEntries(newEntries);

      const images = await getMyImages();
      setMyImages(images);

      toast.success(
        <div>
          <p className="font-semibold">"{entry.title}" uploaded successfully!</p>
          {entry.price ? (
            <p className="text-sm">Your creation is now listed for sale at ₹{entry.price}.</p>
          ) : (
            <p className="text-sm">Your creation is now live.</p>
          )}
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
          Query.select(['title', 'description', 'fileId', 'uploadDate', 'tag', 'medium', 'userId', 'price', 'awards']),
        ]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching user documents:', error);
      toast.error('Failed to fetch your images.');
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
          Query.select(['title', 'description', 'fileId', 'uploadDate', 'tag', 'medium', 'userId', 'price', 'awards']),
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
      tag: image.tag || '',
      medium: image.medium,
      price: image.price || '',
      // awards: image.awards || '',
        awards: Array.isArray(image.awards) ? image.awards : [],

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
        tag: editForm.tag || '',
        medium: editForm.medium,
        // awards: editForm.awards || '',
        awards: editForm.awards
      ? Array.isArray(editForm.awards)
      ? editForm.awards
      : editForm.awards.split(',').map(a => a.trim())
    : [],
        price: editForm.price ? parseFloat(editForm.price) : null,
        uploadDate: new Date().toISOString(),
      };

      await updateImageMetadata(documentId, updates);

      const images = await getMyImages();
      setMyImages(images);
      setSearchedImages((prev) =>
        prev.map((img) => (img.$id === documentId ? { ...img, ...updates } : img))
      );
      setEditingImage(null);
      toast.success('Metadata updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update metadata');
    }
  };

  const deleteImage = async (documentId, fileId) => {
    if (!isInitialized) {
      toast.error('Database is not initialized. Please try again later.');
      return;
    }

    try {
      if (!user || !user.$id) {
        throw new Error('Please log in to delete images');
      }

      await databases.deleteDocument(config.databaseId, config.collectionId, documentId);
      await storage.deleteFile(config.bucketId, fileId);

      const images = await getMyImages();
      setMyImages(images);
      setSearchedImages((prev) => prev.filter(img => img.$id !== documentId));
      
      toast.success('Creation deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error(error.message || 'Failed to delete creation');
    }
  };

  const calculatePlatformFee = (price) => {
    const numericPrice = parseFloat(price);
    if (numericPrice <= 1000) return numericPrice * 0.12;
    if (numericPrice <= 5000) return numericPrice * 0.08;
    return numericPrice * 0.06;
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
              {entries[0].file ? (
                <img
                  src={URL.createObjectURL(entries[0].file)}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain rounded-xl"
                />
              ) : (
                <div className="text-center">
                  <IoCloudUploadOutline className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-xl font-medium font-Playfair">Creation Preview</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Your uploaded image will appear here</p>
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
        <div className="w-full max-w-5xl mb-8 px-4">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search your creations by tag"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(searchTag ? searchedImages : myImages).length > 0 ? (
              (searchTag ? searchedImages : myImages).map((image) => (
                <div
                  key={image.$id}
                  className="bg-white dark:bg-gray-800/90 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
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
                      <input
                        type="text"
                        value={editForm.awards}
                        onChange={(e) => handleEditChange('awards', e.target.value)}
                        placeholder="Awards & Recognition"
                        className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
                      />
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) => handleEditChange('price', e.target.value)}
                        placeholder="Price (INR)"
                        className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
                        min="0"
                        step="0.01"
                      />
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
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{image.description}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Type: {image.medium}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Category: {image.tag || 'not specified'}
                      </p>
                      {image.price && (
                        <div className="mt-2">
                          <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm">
                            Price: ₹{image.price}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs">
                            Platform fee: ₹{calculatePlatformFee(image.price).toFixed(2)}
                          </p>
                        </div>
                      )}
                      {image.awards && (
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                          Awards: {image.awards}
                        </p>
                      )}
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                        Uploaded: {new Date(image.uploadDate).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => startEditing(image)}
                          className="flex-1 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair text-sm"
                          disabled={!isInitialized}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteImage(image.$id, image.fileId)}
                          className="flex-1 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-Playfair text-sm"
                          disabled={!isInitialized}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <IoCloudUploadOutline className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {searchTag 
                    ? `No creations found for tag "${searchTag}" in your collection.` 
                    : 'You have no uploaded creations yet.'}
                </p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair"
                >
                  Upload Your First Creation
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/About" },
    { name: "Account", path: "/Account" },
    { name: "Diary", path: "/Journal" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-3 left-[2.5%] -translate-x-1/2 z-50 w-[95%] bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-xl shadow-md px-4 py-3 flex items-center justify-between"
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold text-teal-800 dark:text-teal-200 font-Eagle">Painters' Diary</h1>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200 font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="hover:text-teal-500 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl text-gray-800 dark:text-gray-200">
        {isOpen ? <MdClose /> : < FiMenu />}
      </button>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-4 mt-2 w-44 rounded-lg bg-white dark:bg-gray-900 shadow-lg py-3 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-teal-100 dark:hover:bg-gray-800 transition"
              >
                {link.name}
              </Link>
            ))}
          </motion.nav>
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