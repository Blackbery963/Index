// import { useState, useEffect, useRef } from 'react';
// import bg from './Bgimage-for-Container/pexels-scottwebb-305821.jpg';
// import { FaHome, FaInfoCircle, FaUser, FaPalette, FaHeart, FaComment, FaDownload, FaUserCircle, FaRegThumbsUp } from 'react-icons/fa';
// import { MdCollections } from 'react-icons/md';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiMenu } from 'react-icons/fi';
// import { MdClose } from 'react-icons/md';
// import { IoClose } from 'react-icons/io5';
// import { storage, Query, databases } from '../../appwriteConfig';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { FiDownload } from 'react-icons/fi';


// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
// const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

// function Gallery() {
//   const contentRef = useRef(null);
//   const [activeButton, setActiveButton] = useState('landscape');
//   // const [isExpanded, setIsExpanded] = useState(false);
//   // const [query, setQuery] = useState("");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [allImages, setAllImages] = useState([]); // Fixed typo: serAllImages -> setAllImages
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [profileImage, setProfileImage] = useState(null);
//   const [profile, setProfile] = useState({ username: '', email: '' });
//   const [likes, setLikes] = useState({});
//   const [showComments, setShowComments] = useState(null);
//   const [newComment, setNewComment] = useState('');
//   const [followedUsers, setFollowedUsers] = useState({});
//   const [lightbox, setLightbox] = useState({ open: false, index: 0 });
//   //search functionality
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchFilters, setSearchFilters] = useState({
//   title: true,
//   description: true,
//   tags: true
//   });
//   const [filteredImages, setFilteredImages] = useState([]);

//   // Add this useEffect to filter images when searchTerm or filters change
//   useEffect(() => {
//   if (!searchTerm) {
//     setFilteredImages(allImages);
//     return;
//   }

//   const lowerCaseSearch = searchTerm.toLowerCase();
  
//   const results = allImages.filter(image => {
//     const matches = [];
    
//     if (searchFilters.title && image.title) {
//       matches.push(image.title.toLowerCase().includes(lowerCaseSearch));
//     }
    
//     if (searchFilters.description && image.description) {
//       matches.push(image.description.toLowerCase().includes(lowerCaseSearch));
//     }
    
//     if (searchFilters.tags && image.tag) {
//       const tags = Array.isArray(image.tag) ? image.tag : [image.tag];
//       matches.push(tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)));
//     }
    
//     return matches.some(Boolean);
//   });

//   setFilteredImages(results);
// }, [searchTerm, allImages, searchFilters]);

// // loading profile images from local storage 
//   useEffect(() => {
//     const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
//     const savedProfileImage = localStorage.getItem('profileImage');
//     // for filtering images 

//     //for profile imafge
//     setProfile((prev) => ({ ...prev, ...savedProfile }));
//     if (savedProfileImage) {
//       setProfileImage(savedProfileImage);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchAllImages = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await databases.listDocuments(
//           DATABASE_ID,
//           COLLECTION_ID,
//           // [
//           //   Query.orderDesc('uploadDate'), // Optional: sort by upload date
//           //   Query.limit(50), // Adjust limit as needed
//           //   Query.select(['$id', 'fileId', 'title', 'description', 'tag', 'userId', 'uploadDate']),
//           // ]
//         );

//         console.log('Fetched documents:', response.documents);
//     //   }
//     // }
//     //   catch (err) {
//     //     console.error('Error fetching images:', err);
//     //   }
//     const imagesWithUrls = await Promise.all(
//         response.documents.map(async (doc) => {
//           if (!doc.fileId) {
//             console.warn(`Document ${doc.$id} missing fileId`);
//             return null;
//           }
//           try {
//             const url = storage.getFileView(BUCKET_ID, doc.fileId);
//             return {
//               ...doc,
//               url,
//               user: { id: doc.userId, name: profile.username || 'Unknown Artist', avatar: profileImage },
//             };
//           } catch (urlError) {
//             console.error(`Error getting URL for fileId ${doc.fileId}:`, urlError);
//             return null;
//           }
//         })
//       );

//       const validImages = imagesWithUrls.filter(image => image !== null);
//       setAllImages(validImages);
//       setFilteredImages(validImages);
//     } catch (err) {
//       console.error('Error fetching images:', {
//         message: err.message,
//         code: err.code,
//         type: err.type,
//       });
//       setError(err.message || 'Failed to load images');
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchAllImages();
// }, [profile.username, profileImage]);

// useEffect(() => {
//   if (!searchTerm) {
//     setFilteredImages(allImages);
//     return;
//   }

//   const lowerCaseSearch = searchTerm.toLowerCase();
  
//   const results = allImages.filter(image => {
//     if (!image) return false;
//     const matches = [];
    
//     if (searchFilters.title && image.title) {
//       matches.push(image.title.toLowerCase().includes(lowerCaseSearch));
//     }
    
//     if (searchFilters.description && image.description) {
//       matches.push(image.description.toLowerCase().includes(lowerCaseSearch));
//     }
    
//     if (searchFilters.tags && image.tag) {
//       const tags = Array.isArray(image.tag) ? image.tag : [image.tag];
//       matches.push(tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)));
//     }
    
//     return matches.some(Boolean);
//   });

//   setFilteredImages(results);
// }, [searchTerm, allImages, searchFilters]);

//   const scrollToContent = () => {
//     if (contentRef.current) {
//       contentRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleLike = (imageId) => {
//     setLikes((prev) => ({
//       ...prev,
//       [imageId]: {
//         liked: !prev[imageId]?.liked,
//         count: (prev[imageId]?.count || 0) + (prev[imageId]?.liked ? -1 : 1),
//       },
//     }));
//   };

//   const toggleFollow = (userId) => {
//     setFollowedUsers((prev) => ({
//       ...prev,
//       [userId]: !prev[userId],
//     }));
//   };

//   const handleCommentSubmit = (imageId, e) => {
//     e.preventDefault();
//     if (newComment.trim()) {
//       console.log(`Comment for ${imageId}: ${newComment}`);
//       setNewComment('');
//       setShowComments(null);
//     }
//   };

//   const downloadImage = (url, title) => {
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = title || 'image';
//     link.click();
//   };

//   const openLightbox = (index) => setLightbox({ open: true, index });
//   const closeLightbox = () => setLightbox({ open: false, index: 0 });
//   const prevImage = () => setLightbox((prev) => ({
//     ...prev,
//     index: prev.index > 0 ? prev.index - 1 : allImages.length - 1,
//   }));
//   const nextImage = () => setLightbox((prev) => ({
//     ...prev,
//     index: prev.index < allImages.length - 1 ? prev.index + 1 : 0,
//   }));

//   const lightboxVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
//     exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
//   };

//   const dropdownVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
//   };

//   const buttonVariants = {
//     hover: { scale: 1.1, backgroundColor: '#A4C6EB', transition: { duration: 0.3 } },
//     tap: { scale: 0.95 },
//   };

//   return (
//     <div className="max-w-screen min-h-screen flex flex-col">
//       {/* Hero Section */}
//       <div
//         className="h-[85vh] w-full bg-center bg-cover flex flex-col items-center justify-center relative"
//         style={{ backgroundImage: `url(${bg})` }}
//       >
//         {/* Sticky Header */}
//         <header className="h-[80px] w-full backdrop-blur-md shadow-md flex items-center justify-between pl-4 pr-8 fixed top-0 z-50">
//           <h1 className="font-Eagle font-bold lg:text-[35px] md:text-[30px] sm:text-[25px] text-[20px] text-[#001F3F]">
//             Painters' Diary
//           </h1>
//           <div className="md:flex hidden gap-x-2 sm:gap-x-4 text-gray-800 font-playfair font-semibold">
//             <Link to="/">
//               <motion.button
//                 className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-green-700 flex items-center gap-2"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 <FaHome className="text-lg sm:text-xl" />
//                 <span className="hidden sm:inline">Home</span>
//               </motion.button>
//             </Link>
//             <Link to="/About">
//               <motion.button
//                 className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-green-700 flex items-center gap-2"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 <FaInfoCircle className="text-lg sm:text-xl" />
//                 <span className="hidden sm:inline">About</span>
//               </motion.button>
//             </Link>
//             <Link to="/Account">
//               <motion.button
//                 className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-green-700 flex items-center gap-2"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 <FaUser className="text-lg sm:text-xl" />
//                 <span className="hidden sm:inline">Account</span>
//               </motion.button>
//             </Link>
//             <Link to="/Journal">
//               <motion.button
//                 className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-green-700 flex items-center gap-2"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 <MdCollections className="text-lg sm:text-xl" />
//                 <span className="hidden sm:inline">Collections</span>
//               </motion.button>
//             </Link>
           
//           </div>
//             <button 
//               className="md:hidden p-2 text-black hover:text-gray-800 transition-all duration-300"
//               onClick={toggleMenu}
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
//             </button>
//         </header>
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.nav
//               className="md:hidden fixed top-[85px] right-2 w-36 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md z-40 rounded-lg"
//               variants={dropdownVariants}
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//             >
//               <div className="flex flex-col items-center py-4 gap-y-3 font-Playfair font-bold text-black dark:text-gray-100">
//                 <Link to="/" onClick={() => { setActiveButton('home'); toggleMenu(); }}>
//                   <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${activeButton === 'home' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
//                     <FaHome />
//                     Home
//                   </button>
//                 </Link>
//                 <Link to="/About" onClick={() => { setActiveButton('about'); toggleMenu(); }}>
//                   <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${activeButton === 'about' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
//                     <FaInfoCircle />
//                     About
//                   </button>
//                 </Link>
//                 <Link to="/Account" onClick={() => { setActiveButton('account'); toggleMenu(); }}>
//                   <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${activeButton === 'account' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
//                     <FaUser />
//                     Account
//                   </button>
//                 </Link>
//                 <Link to="/Landscape" onClick={() => { setActiveButton('landscape'); toggleMenu(); }}>
//                   <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 ${activeButton === 'landscape' ? 'bg-blue-600' : ''}`}>
//                     <FaPalette />
//                     Gallery
//                   </button>
//                 </Link>
//               </div>
//             </motion.nav>
//           )}
//         </AnimatePresence>

//         {/* Title and Subtitle Section */}
//         <section className="mx-auto lg:w-[50%] w-[80%] backdrop-blur-md pl-12 pr-12 lg:py-6 py-4 rounded-lg border border-gray-600 shadow-lg animate-fadeIn">
//           <h1 className="font-Quicksand font-semibold lg:text-[40px] md:text-[30px] sm:text-[25px] text-[20px] text-[#6A1E55] text-center animate-slideInUp">
//             Palette of Dreams: A Showcase of Artistic Brilliance
//           </h1>
//           <h5 className="font-Playfair italic lg:text-[23px] text-[#1A1A1D] text-center animate-slideInUp">
//             <span className=' hidden lg:block'>
//             From timeless landscapes to mesmerizing abstract wonders, delve into
//             the rich tapestry of stories, emotions, and creative inspirations
//             woven into every brushstroke—a celebration of art's boundless beauty
//             and its profound connection to the human spirit.
//             </span>
//             <span className=' block lg:hidden'>
//               From stunning landscapes to abstract wonders, each brushstroke tells a story—a celebration of art’s beauty and deep connection to the human spirit.
//             </span>
//           </h5>
//         </section>
//       </div>

//       {/* Title and Subtitle for Quotes */}
//       <div className="mx-auto w-[80%] lg:w-[40%] mt-6 text-center">
//         <h1 className="text-center font-Playfair lg:text-[40px] md:text-[30px] sm:text-[25px] text-[20px] font-semibold text-[#2f3e46]">
//           Brushstrokes of Wisdom
//         </h1>
//         <h5 className="text-center font-Funnel lg:text-[20px] md:text-[18px] text-[16px] text-[#6a040f]">
//           Explore Timeless Quotes That Capture the Essence of Painting,
//           Celebrating the Beauty, Emotion, and Creativity Behind Every
//           Masterpiece
//         </h5>
//       </div>

      

//       {/* Main Image Container */}
//       <div>
//         <div className="flex items-center justify-around mt-8">
//           <div className="h-[1px] w-[30vw] bg-black"></div>
//           <h1 className="font-Playfair lg:text-[40px] md:text-[35px] sm:text-[30px] text-[25px] text-center">
//             Explore the World of Paintings
//           </h1>
//           <div className="h-[1px] w-[30vw] bg-black"></div>
//         </div>
//         {/* the search bar or container  */}
//       {/* Add this section right before your image grid */}
//     <div className="sticky top-[80px] z-40 bg-gray-100 dark:bg-gray-900 py-4 px-6 shadow-sm">
//     <div className="max-w-4xl mx-auto">
//      <div className="relative">
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Search paintings..."
//         className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white pl-10"
//       />
//       <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//         </svg>
//       </div>
//     </div>
    
//     <div className="flex flex-wrap gap-4 mt-3">
//       <label className="flex items-center space-x-2 cursor-pointer">
//         <input
//           type="checkbox"
//           checked={searchFilters.title}
//           onChange={() => setSearchFilters({...searchFilters, title: !searchFilters.title})}
//           className="rounded text-blue-600 dark:text-blue-400 focus:ring-blue-500"
//         />
//         <span className="text-sm text-gray-700 dark:text-gray-300">Title</span>
//       </label>
      
//       <label className="flex items-center space-x-2 cursor-pointer">
//         <input
//           type="checkbox"
//           checked={searchFilters.description}
//           onChange={() => setSearchFilters({...searchFilters, description: !searchFilters.description})}
//           className="rounded text-blue-600 dark:text-blue-400 focus:ring-blue-500"
//         />
//         <span className="text-sm text-gray-700 dark:text-gray-300">Description</span>
//       </label>
      
//       <label className="flex items-center space-x-2 cursor-pointer">
//         <input
//           type="checkbox"
//           checked={searchFilters.tags}
//           onChange={() => setSearchFilters({...searchFilters, tags: !searchFilters.tags})}
//           className="rounded text-blue-600 dark:text-blue-400 focus:ring-blue-500"
//         />
//         <span className="text-sm text-gray-700 dark:text-gray-300">Tags</span>
//       </label>
//     </div>
    
//     {searchTerm && (
//       <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//         Found {filteredImages.length} {filteredImages.length === 1 ? 'result' : 'results'}
//       </div>
//     )}
//    </div>
//    </div>
//         <section ref={contentRef} className="py-12 bg-gray-100 dark:bg-gray-900 w-full">
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : error ? (
//             <div className="text-center text-red-500 p-4">
//               Error loading images: {error}
//             </div>
//           ) : allImages.length === 0 ? (
//             <div className="text-center text-gray-600 dark:text-gray-300 p-4">
//               No images found.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
//               {/* {allImages.map((image, index) => ( */}

//               {/* Replace your current image grid mapping */}
//                 {filteredImages.length === 0 ? (
//                 <div className="text-center text-gray-600 dark:text-gray-300 p-8 col-span-full">
//                 {searchTerm ? 'No matching paintings found' : 'No paintings available'}
//                </div>
//                 ) : (
//                 filteredImages.map((image, index) => (
//                 // Your existing image card JSX
//               //  <motion.div key={image.$id} className="...">
//               //  {/* ... existing image card content ... */}
//               //   </motion.div>
//                 // ))
//                 //  )}
//                 <motion.div
//                   key={image.$id}
//                   className="relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
//                   whileHover={{ scale: 1.00, shadow: '0 10px 20px rgba(0,0,0,0.2)' }}
//                   transition={{ type: 'spring', stiffness: 400, damping: 10 }}
//                 >
//                   <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
//                     {profileImage ? (
//                       <img
//                         src={profileImage}
//                         alt="Profile"
//                         className="h-10 w-10 rounded-full object-cover"
//                       />
//                     ) : (
//                       <FaUser className="text-3xl text-white" />
//                     )}
//                     <div className="ml-3">
//                       <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 font-Quicksand">
//                         {profile.username || "Unknown Artist"}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => toggleFollow(image.user?.id || image.$id)}
//                       className={`ml-auto px-3 py-1 text-sm rounded-full font-Quicksand ${
//                         followedUsers[image.user?.id || image.$id]
//                           ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
//                           : 'bg-blue-500 text-white hover:bg-blue-600'
//                       }`}
//                     >
//                       {followedUsers[image.user?.id || image.$id] ? 'Unfollow' : 'Follow'}
//                     </button>
//                   </div>
//                   <img
//                     src={image.url}
//                     alt={image.title || 'Image'}
//                     className="w-full h-64 object-cover cursor-pointer"
//                     loading="lazy"
//                     onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
//                     onClick={() => openLightbox(index)}
//                   />
//                   <div className="flex justify-between items-center p-4">
//                     <div className="flex space-x-4">
//                       <button
//                         onClick={() => toggleLike(image.$id)}
//                         className={`flex items-center space-x-1 ${
//                           likes[image.$id]?.liked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
//                         } hover:text-red-500 transition-colors`}
//                       >
//                         <FaRegThumbsUp />
//                         <span className="text-sm font-Quicksand">{likes[image.$id]?.count || 0}</span>
//                       </button>
//                       <button
//                         onClick={() => setShowComments(showComments === image.$id ? null : image.$id)}
//                         className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
//                       >
//                         <FaComment />
//                         <span className="text-sm font-Quicksand">Comment</span>
//                       </button>
//                       <button
//                         onClick={() => downloadImage(image.url, image.title)}
//                         className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors"
//                       >
//                         <FiDownload />
//                         <span className="text-sm font-Quicksand">Download</span>
//                       </button>
//                     </div>
//                   </div>
//                   <AnimatePresence>
//                     {showComments === image.$id && (
//                       <motion.div
//                         className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: 'auto', opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <form onSubmit={(e) => handleCommentSubmit(image.$id, e)} className="flex flex-col">
//                           <textarea
//                             value={newComment}
//                             onChange={(e) => setNewComment(e.target.value)}
//                             placeholder="Add a comment..."
//                             className="w-full p-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 resize-none"
//                             rows={3}
//                           />
//                           <button
//                             type="submit"
//                             className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-Quicksand"
//                           >
//                             Post
//                           </button>
//                         </form>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                   <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-Quicksand truncate">
//                       {image.title || 'Untitled'}
//                     </h3>
//                     {image.description && (
//                       <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
//                         {image.description}
//                       </p>
//                     )}
//                   </div>
//                 </motion.div>
//               )))}
//             </div>
//           )}
          
//         </section>
//         <AnimatePresence>
//           {lightbox.open && (
//             <motion.div
//               className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <motion.div
//                 className="relative max-w-4xl w-full"
//                 variants={lightboxVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//               >
//                 <img
//                   src={allImages[lightbox.index].url}
//                   alt={allImages[lightbox.index].title || 'Image'}
//                   className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
//                   onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
//                 />
//                 <button
//                   onClick={closeLightbox}
//                   className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
//                 >
//                   <IoClose size={24} />
//                 </button>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
//                 >
//                   <FaArrowLeft />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
//                 >
//                   <FaArrowRight />
//                 </button>
//                 <div className="absolute bottom-4 left-0 right-0 text-center text-white font-Quicksand">
//                   <p>{allImages[lightbox.index].title || 'Untitled'}</p>
//                   <p className="text-sm">{lightbox.index + 1} / {allImages.length}</p>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// export default Gallery;

import { useState, useEffect, useRef,useCallback } from 'react';
import bg from './pexels-scottwebb-305821.jpg';
import { FaHome, FaInfoCircle, FaUser, FaPalette, FaRegComment, FaSearch, FaRegShareSquare, FaRegEye } from 'react-icons/fa';
import { MdCollections } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { storage, Query, databases } from '../../appwriteConfig';
import { FaArrowLeft, FaArrowRight, FaRegHeart, FaHeart } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import {PiShareFatLight} from'react-icons/pi'
import { client } from '../../appwriteConfig';
import { toast,ToastContainer } from 'react-toastify';
import ShareButton from '../../Share/ShareFunction';
import DownloadService from '../../Downloads/downloadService';
import FollowButton from '../../Follow/FollowButton';
import LikeButton from '../../EngagementService/likeButton';
import ArtworkViewTracker from '../../Views/viewsTracker';


const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;



function Gallery() {
  const contentRef = useRef(null);
  const [activeButton, setActiveButton] = useState('landscape');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [likes, setLikes] = useState({});
  const [showComments, setShowComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [followedUsers, setFollowedUsers] = useState({});
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to show/hide search bar in header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 85); // Adjust based on hero section height
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load profile from localStorage
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    const savedProfileImage = localStorage.getItem('profileImage');
    setProfile((prev) => ({ ...prev, ...savedProfile }));
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
  }, []);

  // Fetch images from Appwrite
  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [
            Query.orderDesc('uploadDate'),
            Query.limit(50),
            // Query.select([])
            Query.select(['$id', 'fileId', 'title', 'description', 'tag', 'userId', 'uploadDate','viewCount']),
          ]
        );

        console.log('Fetched documents:', response.documents);

        const imagesWithUrls = await Promise.all(
          response.documents.map(async (doc) => {
            if (!doc.fileId) {
              console.warn(`Document ${doc.$id} missing fileId`);
              return null;
            }
            try {
              const url = storage.getFileView(BUCKET_ID, doc.fileId);
              return {
                ...doc,
                url,
                user: { id: doc.userId, name: profile.username || 'Unknown Artist', avatar: profileImage },
              };
            } catch (urlError) {
              console.error(`Error getting URL for fileId ${doc.fileId}:`, urlError);
              return null;
            }
          })
        );

        const validImages = imagesWithUrls.filter((image) => image !== null);
        setAllImages(validImages);
        setFilteredImages(validImages);
      } catch (err) {
        console.error('Error fetching images:', {
          message: err.message,
          code: err.code,
          type: err.type,
        });
        setError(err.message || 'Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    fetchAllImages();
  }, [profile.username, profileImage]);

  // Search and suggestions logic
  useEffect(() => {
    if (!searchTerm) {
      setFilteredImages(allImages);
      setSuggestions([]);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();

    // Filter images
    const results = allImages.filter((image) => {
      if (!image) return false;
      const matches = [];

      if (image.title) {
        matches.push(image.title.toLowerCase().includes(lowerCaseSearch));
      }
      if (image.description) {
        matches.push(image.description.toLowerCase().includes(lowerCaseSearch));
      }
      if (image.tag) {
        const tags = Array.isArray(image.tag) ? image.tag : [image.tag];
        matches.push(tags.some((tag) => tag.toLowerCase().includes(lowerCaseSearch)));
      }

      return matches.some(Boolean);
    });

    // Generate suggestions
    const suggestionSet = new Set();
    allImages.forEach((image) => {
      if (image.title) {
        image.title
          .toLowerCase()
          .split(' ')
          .filter((word) => word.includes(lowerCaseSearch) && word.length > 2)
          .forEach((word) => suggestionSet.add(word));
      }
      if (image.description) {
        image.description
          .toLowerCase()
          .split(' ')
          .filter((word) => word.includes(lowerCaseSearch) && word.length > 2)
          .forEach((word) => suggestionSet.add(word));
      }
      if (image.tag) {
        const tags = Array.isArray(image.tag) ? image.tag : [image.tag];
        tags
          .filter((tag) => tag.toLowerCase().includes(lowerCaseSearch))
          .forEach((tag) => suggestionSet.add(tag.toLowerCase()));
      }
    });

    setFilteredImages(results);
    setSuggestions([...suggestionSet].slice(0, 5)); // Limit to 5 suggestions
  }, [searchTerm, allImages]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLike = (imageId) => {
    setLikes((prev) => ({
      ...prev,
      [imageId]: {
        liked: !prev[imageId]?.liked,
        count: (prev[imageId]?.count || 0) + (prev[imageId]?.liked ? -1 : 1),
      },
    }));
  };

  const toggleFollow = (userId) => {
    setFollowedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleCommentSubmit = (imageId, e) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log(`Comment for ${imageId}: ${newComment}`);
      setNewComment('');
      setShowComments(null);
    }
  };

  const downloadImage = (url, title) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title || 'image';
    link.click();
  };

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const prevImage = () => setLightbox((prev) => ({
    ...prev,
    index: prev.index > 0 ? prev.index - 1 : allImages.length - 1,
  }));
  const nextImage = () => setLightbox((prev) => ({
    ...prev,
    index: prev.index < allImages.length - 1 ? prev.index + 1 : 0,
  }));

  const lightboxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, backgroundColor: '#A4C6EB', transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const suggestionVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  // for saving the liked images
    const [hoveredButton, setHoveredButton]= useState(null)
    const [lovedImages, setLovedImages] = useState(() => {
      const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
      const initialLoved = {};
      allImages.forEach((img, index) => {
        initialLoved[index] = storedFavorites.includes(img);
      });
      return initialLoved;
    });

     const toggleLove = useCallback((index) => {
        setLovedImages((prev) => {
          const isCurrentlyLoved = prev[index];
          const updatedLovedImages = { 
            ...prev, 
            [index]: !isCurrentlyLoved 
          };
    
          const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
          let updatedFavorites;
          if (!isCurrentlyLoved) {
            if (!storedFavorites.includes(allImages[index])) {
              updatedFavorites = [...storedFavorites, allImages[index]];
            } else {
              updatedFavorites = storedFavorites;
            }
          } else {
            updatedFavorites = storedFavorites.filter(img => img !== allImages[index]);
          }
    
          localStorage.setItem("favoriteImages", JSON.stringify([...new Set(updatedFavorites)]));
          return updatedLovedImages;
        });
      }, []);

        useEffect(() => {
          const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
          const syncedLoved = {};
          allImages.forEach((img, index) => {
            syncedLoved[index] = storedFavorites.includes(img);
          });
          setLovedImages(syncedLoved);
        }, []);

    useEffect(() => {
  const unsubscribe = client.subscribe(
    `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
    (response) => {
      if (response.events.includes('databases.*.collections.*.documents.*.update')) {
        const updatedDoc = response.payload;
        setAllImages(prev =>  // Update allImages instead of landscapeImages
          prev.map(image =>
            image.$id === updatedDoc.$id
              ? { ...image, viewCount: updatedDoc.viewCount || 0 }
              : image
          )
        );
      }
    }
  );
  return () => unsubscribe();
}, []);

  return (
    <div className="max-w-screen min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <ToastContainer position="top-right" autoClose={5000} theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} />
      {/* Header with Conditional Search Bar */}
      <header className="lg:h-[80px] h-[70px] w-full backdrop-blur-md shadow-md flex items-center justify-between pl-4 pr-8 fixed top-0 z-50 bg-white/40 dark:bg-gray-800/40">
        <h1 className="font-Eagle font-bold lg:text-[35px] md:text-[30px] sm:text-[25px] text-[20px] text-[#001F3F]">
          Painters' Diary
        </h1>
        <div className="flex items-center gap-x-2 sm:gap-x-4">
          {/* Search Bar in Header when Scrolled */}
          {isScrolled && (
            <motion.div
              className="relative w-48 sm:w-64"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search paintings..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-sm"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <FaSearch/>
              </div>
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.ul
                    className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg mt-1 z-50"
                    variants={suggestionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          )}
          {/* For desktop */}
          <div className="md:flex hidden gap-x-2 sm:gap-x-4 text-gray-800 font-playfair font-semibold">
            <Link to="/">
              <motion.button
                className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-green-700 flex items-center gap-2"
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
                className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-green-700 flex items-center gap-2"
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
                className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-green-700 flex items-center gap-2"
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
                className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-green-700 flex items-center gap-2"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <MdCollections className="text-lg sm:text-xl" />
                <span className="hidden sm:inline">Collections</span>
              </motion.button>
            </Link>
          </div>
          <button
            className="md:hidden p-2 text-black hover:text-gray-800 transition-all duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header>

      {/* for mobile screens  */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden fixed top-[85px] right-2 w-36 bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg shadow-md z-40 rounded-lg"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex flex-col items-center py-4 gap-y-3 font-Playfair font-bold text-black dark:text-gray-100">
              <Link to="/" onClick={() => { setActiveButton('home'); toggleMenu(); }}>
                <button
                  className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    activeButton === 'home' ? 'bg-gray-200 dark:bg-gray-700' : ''
                  }`}
                >
                  <FaHome />
                  Home
                </button>
              </Link>
              <Link to="/About" onClick={() => { setActiveButton('about'); toggleMenu(); }}>
                <button
                  className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    activeButton === 'about' ? 'bg-gray-200 dark:bg-gray-700' : ''
                  }`}
                >
                  <FaInfoCircle />
                  About
                </button>
              </Link>
              <Link to="/Account" onClick={() => { setActiveButton('account'); toggleMenu(); }}>
                <button
                  className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    activeButton === 'account' ? 'bg-gray-200 dark:bg-gray-700' : ''
                  }`}
                >
                  <FaUser />
                  Account
                </button>
              </Link>
              <Link to="/Landscape" onClick={() => { setActiveButton('landscape'); toggleMenu(); }}>
                <button
                  className={`w-full py-2 px-4 flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 ${
                    activeButton === 'landscape' ? 'bg-blue-600' : ''
                  }`}
                >
                  <FaPalette />
                  Gallery
                </button>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div
        className="h-[100vh] w-full bg-center bg-cover flex flex-col items-center justify-center relative"
        style={{ backgroundImage: `url(${bg})` }}
      >
        
        <section className="mx-auto lg:w-[50%] w-[90%] p-6 rounded-xl border border-gray-300 dark:border-gray-700 shadow-2xl bg-white/40 dark:bg-gray-900/50 backdrop-blur-md transition-colors duration-300 animate-fadeIn">
  <h1 className="font-Quicksand font-bold text-center text-[#6A1E55] dark:text-[#E1A4C6] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] animate-slideInUp">
    Palette of Dreams: A Showcase of Artistic Brilliance
  </h1>

  <h5 className="font-Playfair italic text-center text-gray-800 dark:text-gray-300 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[23px] mt-4 animate-slideInUp">
    <span className="hidden lg:block">
      From timeless landscapes to mesmerizing abstract wonders, delve into the rich tapestry of stories, emotions,
      and creative inspirations woven into every brushstroke—a celebration of art's boundless beauty and its profound
      connection to the human spirit.
    </span>
    <span className="block lg:hidden">
      From stunning landscapes to abstract wonders, each brushstroke tells a story—a celebration of art’s beauty and
      deep connection to the human spirit.
    </span>
  </h5>

  {!isScrolled && (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search paintings..."
          className="w-full px-4 py-2 md:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-gray-900 dark:text-white pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
          <FaSearch />
        </div>

        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.ul
              className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg mt-1 z-50"
              variants={suggestionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {searchTerm && (
        <div className="mt-2 text-sm text-gray-700 dark:text-gray-400">
          Found {filteredImages.length} {filteredImages.length === 1 ? 'result' : 'results'}
        </div>
      )}
    </div>
  )}
          </section>


      </div>

      {/* Quotes Section */}
      <div className="mx-auto w-[80%] lg:w-[40%] mt-6 text-center ">
        <h1 className="text-center font-Playfair lg:text-[40px] md:text-[30px] sm:text-[25px] text-[22px] font-semibold text-[#1f3f2d] dark:text-[#f0efeb]">
          Brushstrokes of Wisdom
        </h1>
        <h5 className="text-center font-Funnel lg:text-[20px] md:text-[18px] text-[14px] text-[#6a040f] dark:text-[#4d8343] italic">
          Explore Timeless Quotes That Capture the Essence of Painting, Celebrating the Beauty, Emotion, and Creativity
          Behind Every Masterpiece
        </h5>
      </div>

      {/* Main Image Container */}
      <div>
        <div className="flex items-center justify-around mt-8 px-2">
          <div className="h-[1px] w-[30vw] bg-black"></div>
          <h1 className="font-Quicksand lg:text-[40px] md:text-[35px] sm:text-[30px] text-[25px] text-center dark:text-white text-black">
            Explore the World of Paintings
          </h1>
          <div className="h-[1px] w-[30vw]  bg-black"></div>
          
        </div>

        {/* the image section starts from here  */}
        <section ref={contentRef} className="py-12 bg-gray-100 dark:bg-gray-900 w-full">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">Error loading images: {error}</div>
          ) : allImages.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-300 p-4">No images found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
               {filteredImages.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-300 p-8 col-span-full">
                  {searchTerm ? 'No matching paintings found' : 'No paintings available'}
                </div>
              ) : 
            filteredImages.map((image, index) => (
                  <motion.div
                    key={image.$id}
                    className="relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    whileHover={{ scale: 1.02, shadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                      <Link to={'/account'}>
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <FaUser className="text-3xl text-white" />
                      )}
                      </Link>
                      <div className="ml-3">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 font-Quicksand">
                          {profile.username || 'Unknown Artist'}
                        </p>
                      </div>
                       <div className=' pl-3'>
                        <FollowButton targetUserId={allImages.user?.id || image.$id} />
                       </div>
                    </div>
                    <img
                      src={image.url}
                      alt={image.title || 'Image'}
                      className="w-full h-64 object-cover cursor-pointer"
                      loading="lazy"
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                     onClick={() => {
                     openLightbox(index);
                    }}
                    />
                    <div className="flex justify-between items-center p-4">
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                      <FaRegEye className='text-[20px]'/>
                      <span className="text-sm font-Quicksand">{image.viewCount || 0}</span> {/* Fix this line */}
                      </div>
                      <LikeButton targetId={image.$id}/>
                      <button
                      onClick={() => setShowComments(showComments === image.$id ? null : image.$id)}
                      className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
                      >
                      <FaRegComment />
                      <span className="text-sm font-Quicksand">0</span>
                      </button>
                      <div>
                      <DownloadService artwork={image} />
                      </div>
                      <div className="flex items-center space-x-2">
                      <ShareButton artwork={image} />
                      </div>
                      </div>
                    </div>
                    <AnimatePresence>
                      {showComments === image.$id && (
                        <motion.div
                          className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <form onSubmit={(e) => handleCommentSubmit(image.$id, e)} className="flex flex-col">
                            <textarea
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Add a comment..."
                              className="w-full p-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 resize-none"
                              rows={3}
                            />
                            <button
                              type="submit"
                              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-Quicksand"
                            >
                              Post
                            </button>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-Quicksand truncate">
                        {image.title || 'Untitled'}
                      </h3>
                      {image.description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                          {image.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )
               )}
                    </div>
          )}
        </section>
        <AnimatePresence>
          {lightbox.open && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="relative max-w-4xl w-full"
                variants={lightboxVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <img
                  src={allImages[lightbox.index].url}
                  alt={allImages[lightbox.index].title || 'Image'}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                />
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
                >
                  <IoClose size={24} />
                </button>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
                >
                  <FaArrowRight />
                </button>
                <div className="absolute bottom-4 left-0 right-0 text-center text-white font-Quicksand">
                  <p>{allImages[lightbox.index].title || 'Untitled'}</p>
                  <p className="text-sm">{lightbox.index + 1} / {allImages.length}</p>
                  <div className="absolute top-4 left-4">
                    <ArtworkViewTracker artworkId={allImages[lightbox.index].$id} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Gallery;