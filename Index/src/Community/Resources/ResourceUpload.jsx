// import React, { useState, useRef, useMemo } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ID, Permission, Role} from 'appwrite';
// import { storage, databases,account  } from '../../appwriteConfig'; // Your configured Appwrite client
// import { toast } from 'react-toastify';
// import RichTextEditor from './RichTextEditor';

// const thumbnailDb = import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID
// const researchCollection = import.meta.env.VITE_APPWRITE_RESEARCH_COLLECTION_ID
// const researchBucket = import.meta.env.VITE_APPWRITE_RESEARCH_BUCKET_ID


// function ResourceUpload() {
//   const navigate = useNavigate();
//   const thumbnailInputRef = useRef(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [isDraggingThumbnail, setIsDraggingThumbnail] = useState(false);

//   // Form state
//   const [formData, setFormData] = useState({
//     title: '',
//     category: 'articles',
//     type: '',
//     description: '',
//     author: '',
//     thumbnail: null
//   });

//     const [content, setContent] = useState('');

//   // const handleSave = () => {
//   //   // content is HTML (sanitize before storing or rendering)
//   //   console.log(content);
//   // };

//   // Categories for dropdown
//   const categories = [
//     { value: 'articles', label: 'Articles' },
//     { value: 'guides', label: 'Guides & Tutorials' },
//     { value: 'templates', label: 'Templates' },
//     { value: 'research', label: 'Research Papers' },
//     { value: 'tools', label: 'Tools & Resources' }
//   ];

//   // File types for dropdown
//   const fileTypes = [
//     { value: 'PDF', label: 'PDF Document' },
//     { value: 'Article', label: 'Web Article' },
//     { value: 'PSD', label: 'Photoshop File' },
//     { value: 'Video', label: 'Video Tutorial' },
//     { value: 'ABR', label: 'Photoshop Brushes' },
//     { value: 'AI', label: 'Illustrator File' },
//     { value: 'ZIP', label: 'Archive (ZIP)' }
//   ];

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle thumbnail selection
//   const handleThumbnailChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         thumbnail: file
//       }));
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setPreviewImage(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle drag-and-drop for thumbnail
//   const handleThumbnailDrop = (e) => {
//     e.preventDefault();
//     setIsDraggingThumbnail(false);
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         thumbnail: file
//       }));
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setPreviewImage(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle form submission
// //  const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   setIsUploading(true);
// //   setUploadProgress(0);

// //   try {
// //     // Get current user ID (required for permissions)
// //     const user = await account.get(); // Make sure you have imported 'account' from Appwrite
// //     const userId = user.$id;

// //     // 1. Upload thumbnail to Storage
// //     const thumbnailId = ID.unique();
// //     await storage.createFile(
// //       researchBucket, // Bucket ID
// //       thumbnailId,    // File ID
// //       formData.thumbnail, // File object
// //       [ // ✅ FLAT ARRAY of permissions
// //         Permission.read(Role.any()), // Public read
// //         Permission.write(Role.user(userId)), // Only owner can modify
// //         Permission.delete(Role.user(userId)) // Only owner can delete
// //       ],
// //       {
// //         onProgress: (progress) => {
// //           setUploadProgress(Math.round((progress.loaded / progress.total) * 50));
// //         }
// //       }
// //     );

// //     // 2. Create document in Database
// //     await databases.createDocument(
// //       thumbnailDb, // Database ID
// //       researchCollection, // Collection ID
// //       ID.unique(), // Document ID
// //       {
// //         title: formData.title,
// //         category: formData.category,
// //         type: formData.type,
// //         description: formData.description,
// //         author: formData.author,
// //         thumbnailId: thumbnailId,
// //         // size: formatFileSize(formData.thumbnail.size),
// //         size: formData.thumbnail.size,
// //         downloads: 0,
// //         date: new Date().toISOString()
// //       },
// //       [ // ✅ FLAT ARRAY of permissions
// //         Permission.read(Role.any()), // Public read
// //         Permission.write(Role.user(userId)), // Only owner can modify
// //         Permission.delete(Role.user(userId)) // Only owner can delete
// //       ]
// //     );

// //     setUploadProgress(100);
// //     setTimeout(() => navigate('/Community/Resources/ResourceHub'), 1000);

// //   } catch (error) {
// //     console.error('Upload failed:', error);
// //     toast.error(`Upload failed: ${error.message}`);
// //     toast.success("Your Document Uploaded Successfully..")
// //     setIsUploading(false);
// //   }
// //  };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsUploading(true);
//   setUploadProgress(0);

//   try {
//     const user = await account.get();
//     const userId = user.$id;

//     // 1. Upload thumbnail
//     const thumbnailId = ID.unique();
//     await storage.createFile(
//       researchBucket,
//       thumbnailId,
//       formData.thumbnail,
//       [
//         Permission.read(Role.any()),
//         Permission.write(Role.user(userId)),
//         Permission.delete(Role.user(userId))
//       ],
//       {
//         onProgress: (progress) => {
//           setUploadProgress(Math.round((progress.loaded / progress.total) * 50));
//         }
//       }
//     );

//     // 2. Create document with HTML description
//     await databases.createDocument(
//       thumbnailDb,
//       researchCollection,
//       ID.unique(),
//       {
//         title: formData.title,
//         category: formData.category,
//         type: formData.type,
//         description: formData.description, // This now contains HTML
//         author: formData.author,
//         thumbnailId: thumbnailId,
//         size: formData.thumbnail.size, // Store raw bytes
//         formattedSize: formatFileSize(formData.thumbnail.size), // Optional: Store formatted string too
//         downloads: 0,
//         date: new Date().toISOString()
//       },
//       [
//         Permission.read(Role.any()),
//         Permission.write(Role.user(userId)),
//         Permission.delete(Role.user(userId))
//       ]
//     );

//     setUploadProgress(100);
//     toast.success("Your document was uploaded successfully!");
//     setTimeout(() => navigate('/Community/Resources/ResourceHub'), 1000);

//   } catch (error) {
//     console.error('Upload failed:', error);
//     toast.error(`Upload failed: ${error.message}`);
//     setIsUploading(false);
//   }
// };



//   // Helper function to format file size
//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
//   };

//    const editorRef = useRef(null);

//   // Handle editor change
//   const handleEditorChange = (content, editor) => {
//     // const plainText = content.replace(/<[^>]+>/g, '');
//     setFormData(prev => ({
//       ...prev,
//       description: content
//     }));
//   };

// //   const handleEditorChange = (htmlContent) => {
// //   setContent(htmlContent); // This maintains the rich text HTML
// //   setFormData(prev => ({
// //     ...prev,
// //     description: htmlContent // Save the HTML content to formData
// //   }));
// // };


//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 pb-24">
//       {/* Navigation */}
//       <motion.nav
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="fixed top-4 left-4 right-4 z-50 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl shadow-2xl"
//       >
//         <div className="px-6 py-4 sm:px-8 flex justify-between items-center">
//           <Link to="/" className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Eagle">
//             ArtVerse
//           </Link>
          
//           <div className="hidden md:flex items-center gap-8">
//             {[
//               {name: 'Home', path: '/'},
//               {name: 'Challenges', path: '/challenges'},
//               {name: 'Resources', path: '/resources'},
//               {name: 'Community', path: '/community'}
//             ].map((item) => (
//               <motion.div
//                 key={item.name}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="relative group"
//               >
//                 <Link
//                   to={item.path}
//                   className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-semibold font-Playfair transition-colors duration-300"
//                 >
//                   {item.name}
//                 </Link>
//                 <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
//               </motion.div>
//             ))}
//           </div>
          
//           <button
//             className="md:hidden text-gray-700 dark:text-gray-200"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               {isMenuOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
//         </div>
        
//         <motion.div
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
//           transition={{ duration: 0.3, ease: "easeInOut" }}
//           className="md:hidden overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-b-2xl"
//         >
//           <div className="px-6 py-4 space-y-3">
//             {[
//               {name: 'Home', path: '/'},
//               {name: 'Challenges', path: '/challenges'},
//               {name: 'Resources', path: '/resources'},
//               {name: 'Community', path: '/community'}
//             ].map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className="block text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-semibold py-2 font-Playfair transition-colors duration-200"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//         </motion.div>
//       </motion.nav>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 mb-6 font-Quicksand">
//             Share Your Resource
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-Playfair">
//             Contribute to the ArtVerse community by uploading your tutorials, templates, research, or tools to inspire others.
//           </p>
//         </motion.div>

//         {/* Upload Form */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto"
//         >
//           {isUploading ? (
//             <div className="text-center py-12">
//               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 mb-8 overflow-hidden">
//                 <motion.div 
//                   className="bg-gradient-to-r from-purple-600 to-blue-500 h-6 rounded-full transition-all duration-500 ease-out" 
//                   initial={{ width: 0 }}
//                   animate={{ width: `${uploadProgress}%` }}
//                 ></motion.div>
//               </div>
//               <p className="text-xl text-gray-800 dark:text-gray-200 mb-4 font-Playfair">
//                 {uploadProgress < 100 ? 'Uploading your resource...' : 'Upload complete!'}
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400 font-Playfair">
//                 {uploadProgress < 75 ? 'Uploading thumbnail...' : 
//                  uploadProgress < 100 ? 'Saving to database...' : 'Redirecting to Resources Hub...'}
//               </p>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* Title */}
//               <div>
//                 <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 font-Playfair">
//                   Resource Title *
//                 </label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200 font-Playfair"
//                   placeholder="e.g., Ultimate Guide to Digital Illustration"
//                 />
//               </div>

//               {/* Category and Type */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 font-Playfair">
//                     Category *
//                   </label>
//                   <select
//                     id="category"
//                     name="category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200 font-Playfair"
//                   >
//                     {categories.map((category) => (
//                       <option key={category.value} value={category.value}>
//                         {category.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label htmlFor="type" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 font-Playfair">
//                     File Type *
//                   </label>
//                   <select
//                     id="type"
//                     name="type"
//                     value={formData.type}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200 font-Playfair"
//                   >
//                     <option value="">Select a file type</option>
//                     {fileTypes.map((type) => (
//                       <option key={type.value} value={type.value}>
//                         {type.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Description */}
        
//               <div dir="ltr">
//       <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 font-Playfair">
//         Description *
//       </label>

//     <div className="max-w-3xl mx-auto p-4">
//       {/* <RichTextEditor value={content} onChange={setContent} /> */}
//       {/* <button onClick={handleSave} className="mt-4 px-4 py-2 rounded-lg bg-green-600 text-white">
//         Save
//       </button> */}
//       <RichTextEditor 
//   value={content} 
//   onChange={handleEditorChange} 
//   placeholder="Enter detailed description..."
// />
//     </div>
 
//       <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-Playfair">
//         Provide a detailed description to help others understand your resource.
//       </p>
//       </div>



//               {/* Author */}
//               <div>
//                 <label htmlFor="author" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 font-Playfair">
//                   Your Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="author"
//                   name="author"
//                   value={formData.author}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200 font-Playfair"
//                   placeholder="e.g., Alex Rivera"
//                 />
//               </div>

//               {/* Thumbnail Upload */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 font-Playfair">
//                   Thumbnail Image *
//                 </label>
//                 <div
//                   className={`relative w-full h-64 rounded-xl bg-gray-100 dark:bg-gray-900/50 border-2 border-dashed ${
//                     isDraggingThumbnail ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30' : 'border-gray-300 dark:border-gray-700'
//                   } flex items-center justify-center transition-all duration-300`}
//                   onDragOver={(e) => {
//                     e.preventDefault();
//                     setIsDraggingThumbnail(true);
//                   }}
//                   onDragLeave={() => setIsDraggingThumbnail(false)}
//                   onDrop={handleThumbnailDrop}
//                 >
//                   {previewImage ? (
//                     <img src={previewImage} alt="Thumbnail Preview" className="w-full h-full object-cover rounded-xl" />
//                   ) : (
//                     <div className="text-center">
//                       <svg className="mx-auto w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                       <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-Playfair">
//                         {isDraggingThumbnail ? 'Drop your thumbnail here' : 'Drag or click to upload thumbnail'}
//                       </p>
//                     </div>
//                   )}
//                   <button
//                     type="button"
//                     onClick={() => thumbnailInputRef.current.click()}
//                     className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-semibold font-Playfair hover:from-purple-700 hover:to-blue-600 transition-all"
//                   >
//                     {previewImage ? 'Change' : 'Upload'}
//                   </button>
//                 </div>
//                 <input
//                   ref={thumbnailInputRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={handleThumbnailChange}
//                   required
//                   className="hidden"
//                 />
//                 <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-Playfair">
//                   Recommended size: 800x600px (JPEG or PNG, max 5MB)
//                 </p>
//               </div>

//               {/* Submit Button */}
//               <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
//                 <motion.button
//                   type="submit"
//                   // onClick={handleSave}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-xl font-semibold font-Playfair transition-all shadow-lg"
//                 >
//                   Share Resource
//                 </motion.button>
//               </div>
//             </form>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default ResourceUpload;





import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ID, Permission, Role } from 'appwrite';
import { storage, databases, account } from '../../appwriteConfig';
import { toast } from 'react-toastify';
import RichTextEditor from './RichTextEditor';
import FileUploadArea from './FileUploadArea';
import ProgressIndicator from './ProgressIndicator';

const thumbnailDb = import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID
const researchCollection = import.meta.env.VITE_APPWRITE_RESEARCH_COLLECTION_ID
const researchBucket = import.meta.env.VITE_APPWRITE_RESEARCH_BUCKET_ID

const ResourceUpload = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(1); // For multi-step form

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'articles',
    type: '',
    description: '',
    author: '',
    thumbnail: null,
    file: null
  });

  const [content, setContent] = useState('');

  // Categories and file types
  const categories = [
    { value: 'articles', label: 'Articles', icon: '📝' },
    { value: 'guides', label: 'Guides', icon: '📚' },
    { value: 'templates', label: 'Templates', icon: '🎨' },
    { value: 'research', label: 'Research', icon: '🔬' },
    { value: 'tools', label: 'Tools', icon: '🛠️' }
  ];

  const fileTypes = [
    { value: 'PDF', label: 'PDF Document' },
    { value: 'Article', label: 'Web Article' },
    { value: 'Video', label: 'Video Tutorial' },
    { value: 'PSD', label: 'Photoshop File' },
    { value: 'ABR', label: 'Photoshop Brushes' },
    { value: 'AI', label: 'Illustrator File' },
    { value: 'ZIP', label: 'Archive (ZIP)' }
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file uploads
  const handleFileUpload = (file, fieldName) => {
    setFormData(prev => ({ ...prev, [fieldName]: file }));
  };

  // Handle editor content change
  const handleEditorChange = (htmlContent) => {
    setContent(htmlContent);
    setFormData(prev => ({ ...prev, description: htmlContent }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const user = await account.get();
      const userId = user.$id;

      // Upload thumbnail
      const thumbnailId = ID.unique();
      await storage.createFile(
        researchBucket,
        thumbnailId,
        formData.thumbnail,
        [
          Permission.read(Role.any()),
          Permission.write(Role.user(userId)),
          Permission.delete(Role.user(userId))
        ],
        {
          onProgress: (progress) => {
            setUploadProgress(Math.round((progress.loaded / progress.total) * 50));
          }
        }
      );

      // Upload main file if exists
      let fileId = null;
      if (formData.file) {
        fileId = ID.unique();
        await storage.createFile(
          researchBucket,
          fileId,
          formData.file,
          [
            Permission.read(Role.any()),
            Permission.write(Role.user(userId)),
            Permission.delete(Role.user(userId))
          ],
          {
            onProgress: (progress) => {
              setUploadProgress(50 + Math.round((progress.loaded / progress.total) * 50));
            }
          }
        );
      }

      // Create document
      await databases.createDocument(
        thumbnailDb,
        researchCollection,
        ID.unique(),
        {
          title: formData.title,
          category: formData.category,
          type: formData.type,
          description: formData.description,
          author: formData.author,
          thumbnailId,
          fileId,
          size: formData.file?.size || 0,
          downloads: 0,
          date: new Date().toISOString()
        },
        [
          Permission.read(Role.any()),
          Permission.write(Role.user(userId)),
          Permission.delete(Role.user(userId))
        ]
      );

      setUploadProgress(100);
      toast.success("Resource uploaded successfully!");
      setTimeout(() => navigate('/Community/Resources/ResourceHub'), 1500);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error(`Upload failed: ${error.message}`);
      setIsUploading(false);
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i]);
  };

  // Navigation steps
  const steps = [
    { id: 1, name: 'Basic Info' },
    { id: 2, name: 'Content' },
    { id: 3, name: 'Files' },
    { id: 4, name: 'Review' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ArtVerse
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
              <Link to="/resources" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Resources</Link>
              <Link to="/community" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Community</Link>
            </nav>
            <button className="md:hidden text-gray-700 dark:text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Upload Progress */}
        {isUploading ? (
          <ProgressIndicator progress={uploadProgress} />
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
          >
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <h1 className="text-3xl font-bold">Share Your Resource</h1>
              <p className="opacity-90">Contribute to the ArtVerse community</p>
            </div>

            {/* Stepper */}
            <div className="px-6 pt-6">
              <nav className="flex items-center justify-center">
                <ol className="flex items-center space-x-8">
                  {steps.map((step) => (
                    <li key={step.id} className="flex items-center">
                      <button
                        onClick={() => setActiveStep(step.id)}
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${activeStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                      >
                        {step.id}
                      </button>
                      <span className={`ml-2 text-sm font-medium ${activeStep >= step.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {step.name}
                      </span>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Step 1: Basic Info */}
              {activeStep === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resource Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., Ultimate Digital Painting Guide"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
                      <div className="grid grid-cols-3 gap-3">
                        {categories.map((cat) => (
                          <button
                            key={cat.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border ${formData.category === cat.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-300 dark:border-gray-600'} hover:border-blue-500 transition-colors`}
                          >
                            <span className="text-xl mb-1">{cat.icon}</span>
                            <span className="text-sm">{cat.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">File Type *</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Select file type</option>
                        {fileTypes.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., Alex Rivera"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                    >
                      Next: Content
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Content */}
              {activeStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description *</label>
                    <RichTextEditor 
                      value={content} 
                      onChange={handleEditorChange} 
                      placeholder="Describe your resource in detail..."
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                    >
                      Next: Files
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Files */}
              {activeStep === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Thumbnail Image *</label>
                    <FileUploadArea
                      onFileUpload={(file) => handleFileUpload(file, 'thumbnail')}
                      accept="image/*"
                      preview={formData.thumbnail}
                      label="Drag & drop thumbnail or click to browse"
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(4)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                    >
                      Next: Review
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {activeStep === 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Review Your Submission</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">Basic Information</h4>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Title</p>
                            <p className="text-gray-900 dark:text-white">{formData.title}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                            <p className="text-gray-900 dark:text-white">
                              {categories.find(c => c.value === formData.category)?.label}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">File Type</p>
                            <p className="text-gray-900 dark:text-white">{formData.type}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Author</p>
                            <p className="text-gray-900 dark:text-white">{formData.author}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">Files</h4>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Thumbnail</p>
                            {formData.thumbnail && (
                              <div className="mt-1 w-32 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                                <img 
                                  src={URL.createObjectURL(formData.thumbnail)} 
                                  alt="Thumbnail preview" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Resource File</p>
                            {formData.file ? (
                              <div className="mt-1">
                                <p className="text-gray-900 dark:text-white">{formData.file.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {formatFileSize(formData.file.size)}
                                </p>
                              </div>
                            ) : (
                              <p className="text-gray-500 dark:text-gray-400">No file uploaded</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                    >
                      Submit Resource
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ResourceUpload;


















