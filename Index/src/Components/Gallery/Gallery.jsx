// // // import { useState, useEffect, useRef } from 'react';
// // // import bg from './pexels-scottwebb-305821.jpg';
// // // import { FaHome, FaInfoCircle, FaUser, FaPalette, FaRegComment, FaSearch, FaRegEye } from 'react-icons/fa';
// // // import { MdCollections } from 'react-icons/md';
// // // import { Link, useNavigate, useSearchParams, useParams } from 'react-router-dom';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { FiMenu, FiDownload } from 'react-icons/fi';
// // // import { MdClose } from 'react-icons/md';
// // // import { IoClose } from 'react-icons/io5';
// // // import { storage, Query, databases } from '../../appwriteConfig';
// // // import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// // // import { ToastContainer } from 'react-toastify';
// // // import ShareButton from '../../Share/ShareFunction';
// // // import DownloadService from '../../Downloads/downloadService';
// // // import FollowButton from '../../Follow/FollowButton';
// // // import LikeButton from '../../EngagementService/likeButton';

// // // const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// // // const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
// // // const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
// // // const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

// // // function Gallery() {
// // //   const contentRef = useRef(null);
// // //   const navigate = useNavigate();
// // //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// // //   const [allImages, setAllImages] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [showComments, setShowComments] = useState(null);
// // //   const [newComment, setNewComment] = useState('');
// // //   const [lightbox, setLightbox] = useState({ open: false, index: 0 });
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [filteredImages, setFilteredImages] = useState([]);
// // //   const [suggestions, setSuggestions] = useState([]);
// // //   const [isScrolled, setIsScrolled] = useState(false);
// // //   const [userProfiles, setUserProfiles] = useState({});
// // //   const [profile, setProfile] = useState(null);
// // //   const [highlightedArtwork, setHighlightedArtwork] = useState(null);
// // //   const artworkRefs = useRef({});
// // //   const [searchParams] = useSearchParams();
// // //   const { artworkId } = useParams();

// // //   // Fetch user profile data
// // //   const fetchUserProfile = async (userId) => {
// // //     try {
// // //       const response = await databases.getDocument(
// // //         DATABASE_ID,
// // //         USER_COLLECTION_ID,
// // //         userId
// // //       );
// // //       return {
// // //         name: response.name || response.username || 'Unknown Artist',
// // //         profileImage: response.profileImage || null,
// // //         title: response.title || ''
// // //       };
// // //     } catch (err) {
// // //       console.error(`Error fetching profile for user ${userId}:`, err);
// // //       return {
// // //         name: 'Unknown Artist',
// // //         profileImage: null,
// // //         title: ''
// // //       };
// // //     }
// // //   };

// // //   // Fetch all images and user profiles
// // //   useEffect(() => {
// // //     const fetchAllData = async () => {
// // //       try {
// // //         setLoading(true);
        
// // //         // Fetch artworks
// // //         const artworksResponse = await databases.listDocuments(
// // //           DATABASE_ID,
// // //           COLLECTION_ID,
// // //           [
// // //             Query.orderDesc('uploadDate'),
// // //             Query.limit(50),
// // //             Query.select(['$id', 'fileId', 'title', 'description', 'tag', 'userId', 'uploadDate', 'viewCount'])
// // //           ]
// // //         );

// // //         // Get image URLs
// // //         const imagesWithUrls = await Promise.all(
// // //           artworksResponse.documents.map(async (doc) => {
// // //             try {
// // //               const url = storage.getFileView(BUCKET_ID, doc.fileId);
// // //               return { ...doc, url };
// // //             } catch (err) {
// // //               console.error(`Error getting URL for ${doc.fileId}:`, err);
// // //               return null;
// // //             }
// // //           })
// // //         );

// // //         const validImages = imagesWithUrls.filter(img => img !== null);
// // //         setAllImages(validImages);
// // //         setFilteredImages(validImages);

// // //         // Fetch all unique user profiles
// // //         const uniqueUserIds = [...new Set(validImages.map(img => img.userId))];
// // //         const profiles = {};
        
// // //         await Promise.all(
// // //           uniqueUserIds.map(async userId => {
// // //             profiles[userId] = await fetchUserProfile(userId);
// // //           })
// // //         );

// // //         setUserProfiles(profiles);
// // //       } catch (err) {
// // //         console.error('Error fetching data:', err);
// // //         setError(err.message || 'Failed to load gallery');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchAllData();
// // //   }, []);

// // //   // Handle direct artwork link or shared artwork focus
// // //   useEffect(() => {
// // //     if (allImages.length > 0) {
// // //       const artworkToHighlight = artworkId 
// // //         ? allImages.find(art => art.$id === artworkId)
// // //         : searchParams.get('highlight') 
// // //           ? allImages.find(art => art.$id === searchParams.get('highlight'))
// // //           : null;

// // //       if (artworkToHighlight) {
// // //         setHighlightedArtwork(artworkToHighlight.$id);
        
// // //         // Scroll to artwork after a short delay to ensure DOM is rendered
// // //         setTimeout(() => {
// // //           if (artworkRefs.current[artworkToHighlight.$id]) {
// // //             artworkRefs.current[artworkToHighlight.$id].scrollIntoView({
// // //               behavior: 'smooth',
// // //               block: 'center'
// // //             });
            
// // //             // Add highlight effect with more prominent styling
// // //             const element = artworkRefs.current[artworkToHighlight.$id];
// // //             element.classList.add(
// // //               'highlighted-artwork',
// // //               'ring-4', 
// // //               'ring-blue-500', 
// // //               'ring-opacity-90', 
// // //               'scale-105',
// // //               'z-50',
// // //               'shadow-2xl'
// // //             );
            
// // //             // Add pulse animation
// // //             element.style.animation = 'pulse-highlight 2s ease-in-out';
            
// // //             // Remove highlight after 5 seconds
// // //             setTimeout(() => {
// // //               if (artworkRefs.current[artworkToHighlight.$id]) {
// // //                 const el = artworkRefs.current[artworkToHighlight.$id];
// // //                 el.classList.remove(
// // //                   'highlighted-artwork',
// // //                   'ring-4', 
// // //                   'ring-blue-500', 
// // //                   'ring-opacity-90', 
// // //                   'scale-105',
// // //                   'z-50',
// // //                   'shadow-2xl'
// // //                 );
// // //                 el.style.animation = '';
// // //                 setHighlightedArtwork(null);
                
// // //                 // Clean up URL without page reload
// // //                 if (searchParams.get('highlight')) {
// // //                   const newUrl = new URL(window.location);
// // //                   newUrl.searchParams.delete('highlight');
// // //                   window.history.replaceState({}, '', newUrl);
// // //                 }
// // //               }
// // //             }, 5000);
// // //           }
// // //         }, 300);
// // //       }
// // //     }
// // //   }, [allImages, artworkId, searchParams]);

// // //   // Search functionality
// // //   useEffect(() => {
// // //     if (!searchTerm) {
// // //       setFilteredImages(allImages);
// // //       setSuggestions([]);
// // //       return;
// // //     }

// // //     const lowerCaseSearch = searchTerm.toLowerCase();
// // //     const results = allImages.filter(image => {
// // //       const matches = [];
// // //       if (image.title) matches.push(image.title.toLowerCase().includes(lowerCaseSearch));
// // //       if (image.description) matches.push(image.description.toLowerCase().includes(lowerCaseSearch));
// // //       if (image.tag) {
// // //         const tags = Array.isArray(image.tag) ? image.tag : [image.tag];
// // //         matches.push(tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)));
// // //       }
// // //       return matches.some(Boolean);
// // //     });

// // //     setFilteredImages(results);

// // //     // Generate suggestions
// // //     const suggestionSet = new Set();
// // //     allImages.forEach(image => {
// // //       [image.title, image.description].forEach(text => {
// // //         if (text) {
// // //           text.toLowerCase().split(' ')
// // //             .filter(word => word.includes(lowerCaseSearch) && word.length > 2)
// // //             .forEach(word => suggestionSet.add(word));
// // //         }
// // //       });
// // //       if (image.tag) {
// // //         const tags = Array.isArray(image.tag) ? image.tag : [image.tag];
// // //         tags.forEach(tag => {
// // //           if (tag.toLowerCase().includes(lowerCaseSearch)) {
// // //             suggestionSet.add(tag.toLowerCase());
// // //           }
// // //         });
// // //       }
// // //     });

// // //     setSuggestions([...suggestionSet].slice(0, 5));
// // //   }, [searchTerm, allImages]);

// // //   // Scroll handler
// // //   useEffect(() => {
// // //     const handleScroll = () => setIsScrolled(window.scrollY > 85);
// // //     window.addEventListener('scroll', handleScroll);
// // //     return () => window.removeEventListener('scroll', handleScroll);
// // //   }, []);

// // //   // UI handlers
// // //   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
// // //   const handleSuggestionClick = (suggestion) => {
// // //     setSearchTerm(suggestion);
// // //     setSuggestions([]);
// // //   };

// // //   // Lightbox controls
// // //   const openLightbox = (index) => setLightbox({ open: true, index });
// // //   const closeLightbox = () => setLightbox({ open: false, index: 0 });
// // //   const prevImage = () => setLightbox(prev => ({
// // //     ...prev,
// // //     index: prev.index > 0 ? prev.index - 1 : allImages.length - 1
// // //   }));
// // //   const nextImage = () => setLightbox(prev => ({
// // //     ...prev,
// // //     index: prev.index < allImages.length - 1 ? prev.index + 1 : 0
// // //   }));

// // //   // Animation variants
// // //   const lightboxVariants = {
// // //     hidden: { opacity: 0, scale: 0.8 },
// // //     visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
// // //     exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
// // //   };

// // //   const dropdownVariants = {
// // //     hidden: { opacity: 0, y: -10 },
// // //     visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
// // //   };

// // //   const cardVariants = {
// // //     hidden: { opacity: 0, y: 20 },
// // //     visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
// // //   };

// // //   return (
// // //     <div className="max-w-screen min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
// // //       <ToastContainer position="top-right" autoClose={5000} 
// // //         theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} />
      
// // //       {/* Custom CSS for highlight animation */}
// // //       <style>
// // //         {`
// // //           @keyframes pulse-highlight {
// // //             0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
// // //             70% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); }
// // //             100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
// // //           }
// // //           .highlighted-artwork {
// // //             animation: pulse-highlight 2s infinite;
// // //           }
// // //         `}
// // //       </style>
      
// // //       {/* Header */}
// // //       <header className={`fixed top-3 rounded-xl left-0 w-full max-w-[96%] ml-[2%] z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
// // //         <div className="mx-auto px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between">
          
// // //           {/* Logo */}
// // //           <Link to="/" className="flex items-center">
// // //             <h1 className="font-Eagle text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
// // //               Painters' Diary
// // //             </h1>
// // //           </Link>

// // //           {/* Desktop Nav */}
// // //           <nav className="hidden md:flex items-center gap-6 text-[16px] font-medium text-gray-700 dark:text-gray-300">
// // //             {['Home', 'About', 'Account', 'Journal'].map((item) => (
// // //               <Link
// // //                 key={item}
// // //                 to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
// // //                 className="hover:text-green-600 transition-colors duration-200"
// // //               >
// // //                 {item}
// // //               </Link>
// // //             ))}
// // //           </nav>

// // //           {/* Mobile Menu Button */}
// // //           <button
// // //             className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
// // //             onClick={toggleMenu}
// // //             aria-label="Toggle menu"
// // //           >
// // //             {isMenuOpen ? <MdClose size={22} /> : <FiMenu size={22} />}
// // //           </button>
// // //         </div>

// // //         {/* Mobile Menu */}
// // //         <AnimatePresence>
// // //           {isMenuOpen && (
// // //             <motion.div
// // //               className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3 space-y-3"
// // //               initial={{ opacity: 0, height: 0 }}
// // //               animate={{ opacity: 1, height: 'auto' }}
// // //               exit={{ opacity: 0, height: 0 }}
// // //               transition={{ duration: 0.2 }}
// // //             >
// // //               {['Home', 'About', 'Account', 'Journal'].map((item) => (
// // //                 <Link
// // //                   key={item}
// // //                   to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
// // //                   onClick={toggleMenu}
// // //                   className="block text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors py-2"
// // //                 >
// // //                   {item}
// // //                 </Link>
// // //               ))}
// // //             </motion.div>
// // //           )}
// // //         </AnimatePresence>
// // //       </header>

// // //       {/* Hero Section */}
// // //       <section
// // //         className="relative flex items-center justify-center min-h-screen bg-center bg-cover px-4 py-20"
// // //         style={{ backgroundImage: `url(${bg})` }}
// // //       >
// // //         <div className="max-w-3xl w-full text-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 shadow-xl">
          
// // //           {/* Heading */}
// // //           <h1 className="font-Quicksand text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
// // //             Palette of Dreams: 
// // //             <span className="block mt-1 text-green-600 dark:text-green-400">A Showcase of Artistic Brilliance</span>
// // //           </h1>

// // //           {/* Subtitle */}
// // //           <p className="mt-5 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
// // //             From stunning landscapes to abstract wonders, each brushstroke tells a story—
// // //             a celebration of art's beauty and deep connection to the human spirit.
// // //           </p>

// // //           {/* Search Section */}
// // //           <div className="mt-8 flex flex-col items-center gap-3">
// // //             <div className="relative w-full max-w-md group">
// // //               <input
// // //                 type="text"
// // //                 value={searchTerm}
// // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // //                 placeholder="Search paintings, artists, or tags..."
// // //                 className="w-full rounded-full px-5 py-3 border border-gray-300 dark:border-gray-600 
// // //                   bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white 
// // //                   focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200
// // //                   placeholder-gray-500 dark:placeholder-gray-400"
// // //               />
// // //               <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-green-500 transition-colors" />

// // //               {/* Suggestions Dropdown */}
// // //               <AnimatePresence>
// // //                 {suggestions.length > 0 && (
// // //                   <motion.ul
// // //                     className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border 
// // //                       border-gray-300 dark:border-gray-600 rounded-xl shadow-lg mt-2 z-50 overflow-hidden"
// // //                     variants={dropdownVariants}
// // //                     initial="hidden"
// // //                     animate="visible"
// // //                     exit="hidden"
// // //                   >
// // //                     {suggestions.map((suggestion, index) => (
// // //                       <li
// // //                         key={index}
// // //                         className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
// // //                         onClick={() => handleSuggestionClick(suggestion)}
// // //                       >
// // //                         {suggestion}
// // //                       </li>
// // //                     ))}
// // //                   </motion.ul>
// // //                 )}
// // //               </AnimatePresence>
// // //             </div>

// // //             {/* Search Results Count */}
// // //             {searchTerm && (
// // //               <div className="text-sm text-gray-700 dark:text-gray-400">
// // //                 Found <span className="font-medium text-green-600">{filteredImages.length}</span> {filteredImages.length === 1 ? 'result' : 'results'}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Gallery Content */}
// // //       <div ref={contentRef} className="py-12 bg-gray-50 dark:bg-gray-900 w-full">
// // //         {loading ? (
// // //           <div className="flex justify-center items-center h-64">
// // //             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
// // //           </div>
// // //         ) : error ? (
// // //           <div className="text-center text-red-500 p-4">Error loading images: {error}</div>
// // //         ) : filteredImages.length === 0 ? (
// // //           <div className="text-center text-gray-600 dark:text-gray-300 p-8">
// // //             {searchTerm ? 'No matching paintings found. Try different keywords.' : 'No paintings available yet.'}
// // //           </div>
// // //         ) : (
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 lg:max-w-[85%] max-w-[95%] mx-auto">
// // //             {filteredImages.map((image, index) => (
// // //               <motion.div
// // //                 key={image.$id}
// // //                 ref={el => artworkRefs.current[image.$id] = el}
// // //                 variants={cardVariants}
// // //                 initial="hidden"
// // //                 animate="visible"
// // //                 // transition={{ delay: index * 0.1 }}
// // //                   transition={{ type: 'spring', stiffness: 400, damping: 20 }}

// // //                 className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden  hover:shadow-xl transition-all duration-300 ${
// // //                   highlightedArtwork === image.$id ? 'highlighted-artwork ring-4 ring-blue-500 ring-opacity-90 scale-105 z-50 shadow-2xl' : ''
// // //                 }`}
// // //               >
// // //                 {/* Image Container */}
// // //                 <div className="relative group">
// // //                   <img
// // //                     src={image.url}
// // //                     alt={image.title || 'Artwork'}
// // //                     className="w-full h-72 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-100"
// // //                     loading="lazy"
// // //                     onClick={() => openLightbox(index)}
// // //                   />

// // //                   {/* Top Header Overlay */}
// // //                    <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-3 bg-gradient-to-b from-black/40 to-transparent">
// // //     <Link to={`/Account/${image.userId}`} className="flex items-center space-x-2">
// // //       {userProfiles[image.userId]?.profileImage ? (
// // //         <img
// // //           src={userProfiles[image.userId].profileImage}
// // //           alt={userProfiles[image.userId].name}
// // //           className="w-8 h-8 rounded-full object-cover border border-white"
// // //         />
// // //       ) : (
// // //         <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs">
// // //           {userProfiles[image.userId]?.name?.charAt(0) || 'U'}
// // //         </div>
// // //       )}
// // //       <span className="text-sm font-semibold text-white">
// // //         {userProfiles[image.userId]?.name || 'Username'}
// // //       </span>
// // //     </Link>
// // //     <FollowButton targetUserId={image.userId} />
// // //   </div>

// // //   {image.tag && (
// // //     <div className=" absolute bottom-0 right-0 m-2 px-2 py-1 rounded-md shadow-inner border dark:text-white text-gray-800 border-neutral-500 text-xs font-medium">
// // //       {image.tag}
// // //     </div>
// // //   )}

// // //   {/* Bottom Actions Overlay */}
// // //   <div className=" right-0 flex justify-between items-center px-3 py-2 text-sm">
// // //     <div className="flex items-center space-x-4">
// // //       <div className="flex items-center space-x-1">
// // //         <FaRegEye className="text-[18px] text-gray-500 dark:text-gray-400" />
// // //         <span className='text-gray-500 dark:text-gray-400'>{image.viewCount || 0}</span>
// // //       </div>
// // //       <LikeButton targetId={image.$id} className="text-white" />
// // //     </div>
// // //     <div className="flex items-center space-x-2">
// // //       <DownloadService artwork={image} />
// // //       <ShareButton artwork={image} />
// // //     </div>
// // //   </div>
// // //   {/* Title & description outside image */}
// // //   <div className="mt-2 px-4 pb-4 ">
// // //     <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
// // //       {image.title || 'Title'}
// // //     </h3>
// // //     {image.description && (
// // //       <p className="text-sm text-gray-500 dark:text-gray-400">
// // //         {image.description}
// // //       </p>
// // //     )}
// // //   </div>
// // //   </div>
// // //               </motion.div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Lightbox */}
// // //       <AnimatePresence>
// // //         {lightbox.open && (
// // //           <motion.div
// // //             className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             exit={{ opacity: 0 }}
// // //             transition={{ duration: 0.3 }}
// // //             onClick={closeLightbox}
// // //           >
// // //             <motion.div
// // //               className="relative max-w-5xl w-full max-h-[90vh]"
// // //               variants={lightboxVariants}
// // //               initial="hidden"
// // //               animate="visible"
// // //               exit="exit"
// // //               onClick={(e) => e.stopPropagation()}
// // //             >
// // //               <img
// // //                 src={allImages[lightbox.index].url}
// // //                 alt={allImages[lightbox.index].title || 'Artwork'}
// // //                 className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
// // //                 onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
// // //               />
              
// // //               {/* Lightbox Controls */}
// // //               <button
// // //                 onClick={closeLightbox}
// // //                 className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
// // //               >
// // //                 <IoClose size={28} />
// // //               </button>
// // //               <button
// // //                 onClick={prevImage}
// // //                 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
// // //               >
// // //                 <FaArrowLeft size={24} />
// // //               </button>
// // //               <button
// // //                 onClick={nextImage}
// // //                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
// // //               >
// // //                 <FaArrowRight size={24} />
// // //               </button>
              
// // //               {/* Lightbox Info */}
// // //               <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 backdrop-blur-sm rounded-lg p-4 mx-4">
// // //                 <p className="text-xl font-medium mb-1">{allImages[lightbox.index].title || 'Untitled'}</p>
// // //                 <p className="text-sm">
// // //                   {lightbox.index + 1} / {allImages.length} • 
// // //                   By {userProfiles[allImages[lightbox.index].userId]?.name || 'Unknown Artist'}
// // //                 </p>
// // //                 {allImages[lightbox.index].description && (
// // //                   <p className="text-sm mt-2 opacity-90">{allImages[lightbox.index].description}</p>
// // //                 )}
// // //               </div>
// // //             </motion.div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>
// // //     </div>
// // //   );
// // // }

// // // export default Gallery;



// import { useState, useEffect, useRef } from 'react';
// import bg from './pexels-scottwebb-305821.jpg';
// import { FaHome, FaInfoCircle, FaUser, FaPalette, FaRegComment, FaSearch, FaRegEye } from 'react-icons/fa';
// import { MdCollections } from 'react-icons/md';
// import { Link, useNavigate, useSearchParams, useParams } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiMenu, FiDownload } from 'react-icons/fi';
// import { MdClose } from 'react-icons/md';
// import { IoClose } from 'react-icons/io5';
// import { storage, Query, databases } from '../../appwriteConfig';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { ToastContainer } from 'react-toastify';
// import ShareButton from '../../Share/ShareFunction';
// import DownloadService from '../../Downloads/downloadService';
// import FollowButton from '../../Follow/FollowButton';
// import LikeButton from '../../EngagementService/likeButton';
// import axios from 'axios';


// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
// const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
// const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
// const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;


// function Gallery() {
//   const contentRef = useRef(null);
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [allImages, setAllImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [error, setError] = useState(null);
//   const [showComments, setShowComments] = useState(null);
//   const [newComment, setNewComment] = useState('');
//   const [lightbox, setLightbox] = useState({ open: false, index: 0 });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredImages, setFilteredImages] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [userProfiles, setUserProfiles] = useState({});
//   const [profile, setProfile] = useState(null);
//   const [highlightedArtwork, setHighlightedArtwork] = useState(null);
//   const artworkRefs = useRef({});
//   const [searchParams] = useSearchParams();
//   const { artworkId } = useParams();
//   const [appwriteLastId, setAppwriteLastId] = useState(null);
//   const [pexelsPage, setPexelsPage] = useState(1);
//   const [hasMoreAppwrite, setHasMoreAppwrite] = useState(true);
//   const [hasMorePexels, setHasMorePexels] = useState(true);
//   const [similarImages, setSimilarImages] = useState([]);
//   const [filter, setFilter] = useState('all'); // Filter state: 'all', 'user', 'featured'
//   const [pexelsViewCounts, setPexelsViewCounts] = useState({}); // Client-side view counts for Pexels images

//   // Fetch user profile data
//   const fetchUserProfile = async (userId) => {
//     try {
//       const response = await databases.getDocument(
//         DATABASE_ID,
//         USER_COLLECTION_ID,
//         userId
//       );
//       return {
//         name: response.name || response.username || 'Unknown Artist',
//         profileImage: response.profileImage || null,
//         title: response.title || ''
//       };
//     } catch (err) {
//       console.error(`Error fetching profile for user ${userId}:`, err);
//       return {
//         name: 'Unknown Artist',
//         profileImage: null,
//         title: ''
//       };
//     }
//   };

//   // Generate meaningful title for Pexels images
//   const generatePexelsTitle = (altText) => {
//     if (altText && altText.trim()) {
//       return altText.charAt(0).toUpperCase() + altText.slice(1);
//     }
//     return 'Untitled Artwork';
//   };

//   // Fetch data function (Appwrite + Pexels)
//   const fetchData = async (isLoadMore = false) => {
//     try {
//       if (isLoadMore) {
//         setLoadingMore(true);
//       } else {
//         setLoading(true);
//       }

//       let newAppwriteImages = [];
//       let newPexelsImages = [];

//       // Fetch from Appwrite
//       if (hasMoreAppwrite && (filter === 'all' || filter === 'user')) {
//         const queries = [
//           Query.orderDesc('uploadDate'),
//           Query.limit(20),
//           Query.select(['$id', 'fileId', 'title', 'description', 'tag', 'userId', 'uploadDate', 'viewCount'])
//         ];
//         if (isLoadMore && appwriteLastId) {
//           queries.push(Query.cursorAfter(appwriteLastId));
//         }

//         const artworksResponse = await databases.listDocuments(
//           DATABASE_ID,
//           COLLECTION_ID,
//           queries
//         );

//         const imagesWithUrls = await Promise.all(
//           artworksResponse.documents.map(async (doc) => {
//             try {
//               const url = storage.getFileView(BUCKET_ID, doc.fileId);
//               return { ...doc, url, isFeatured: false };
//             } catch (err) {
//               console.error(`Error getting URL for ${doc.fileId}:`, err);
//               return null;
//             }
//           })
//         );

//         newAppwriteImages = imagesWithUrls.filter(img => img !== null);
//         if (newAppwriteImages.length > 0) {
//           setAppwriteLastId(newAppwriteImages[newAppwriteImages.length - 1].$id);
//         }
//         if (newAppwriteImages.length < 20) {
//           setHasMoreAppwrite(false);
//         }
//       }

//       // Fetch from Pexels
//       if (PEXELS_API_KEY && hasMorePexels && (filter === 'all' || filter === 'featured')) {
//         try {
//           const pexelsResponse = await axios.get(
//             `https://api.pexels.com/v1/search?query=art+painting&per_page=10&page=${isLoadMore ? pexelsPage + 1 : pexelsPage}`,
//             {
//               headers: {
//                 Authorization: PEXELS_API_KEY
//               }
//             }
//           );
//           newPexelsImages = pexelsResponse.data.photos.map((photo) => ({
//             $id: `pexels-${photo.id}`,
//             url: photo.src.large,
//             title: generatePexelsTitle(photo.alt),
//             description: photo.alt || 'A stunning piece from Pexels',
//             tag: ['art', 'featured'],
//             userId: `pexels-${photo.photographer_id}`,
//             uploadDate: new Date().toISOString(),
//             viewCount: pexelsViewCounts[`pexels-${photo.id}`] || 0,
//             isFeatured: true,
//             photographer: photo.photographer,
//             photographerUrl: photo.photographer_url
//           }));
//           if (newPexelsImages.length < 10) {
//             setHasMorePexels(false);
//           }
//           if (isLoadMore) {
//             setPexelsPage(prev => prev + 1);
//           }
//         } catch (pexelsErr) {
//           console.error('Error fetching Pexels images:', pexelsErr);
//           if (!isLoadMore) {
//             setError('Failed to load featured images from Pexels');
//           }
//         }
//       } else if (!PEXELS_API_KEY) {
//         console.warn('Pexels API key not provided; skipping featured images');
//       }

//       // Combine and update state
//       const newImages = filter === 'user' ? newAppwriteImages : filter === 'featured' ? newPexelsImages : [...newAppwriteImages, ...newPexelsImages];
//       setAllImages(prev => isLoadMore ? [...prev, ...newImages] : [...newImages]);
//       setFilteredImages(prev => isLoadMore ? [...prev, ...newImages] : [...newImages]);

//       // Fetch user profiles for new Appwrite images
//       const uniqueUserIds = [...new Set(newAppwriteImages.map(img => img.userId))];
//       const newProfiles = {};
//       await Promise.all(
//         uniqueUserIds.map(async userId => {
//           newProfiles[userId] = await fetchUserProfile(userId);
//         })
//       );
//       setUserProfiles(prev => ({ ...prev, ...newProfiles }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setError(err.message || 'Failed to load gallery');
//     } finally {
//       if (isLoadMore) {
//         setLoadingMore(false);
//       } else {
//         setLoading(false);
//       }
//     }
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchData();
//   }, [filter]);

//   // Handle load more
//   const loadMore = () => {
//     fetchData(true);
//   };

//   // Increment view count for Pexels images
//   const incrementViewCount = (imageId) => {
//     if (imageId.startsWith('pexels-')) {
//       setPexelsViewCounts(prev => ({
//         ...prev,
//         [imageId]: (prev[imageId] || 0) + 1
//       }));
//     }
//   };

//   // Handle direct artwork link or shared artwork focus
//   useEffect(() => {
//     if (allImages.length > 0) {
//       const artworkToHighlight = artworkId 
//         ? allImages.find(art => art.$id === artworkId)
//         : searchParams.get('highlight') 
//           ? allImages.find(art => art.$id === searchParams.get('highlight'))
//           : null;

//       if (artworkToHighlight) {
//         setHighlightedArtwork(artworkToHighlight.$id);
        
//         setTimeout(() => {
//           if (artworkRefs.current[artworkToHighlight.$id]) {
//             artworkRefs.current[artworkToHighlight.$id].scrollIntoView({
//               behavior: 'smooth',
//               block: 'center'
//             });
            
//             const element = artworkRefs.current[artworkToHighlight.$id];
//             element.classList.add(
//               'highlighted-artwork',
//               'ring-4', 
//               'ring-blue-500', 
//               'ring-opacity-90', 
//               'scale-105',
//               'z-50',
//               'shadow-2xl'
//             );
            
//             element.style.animation = 'pulse-highlight 2s ease-in-out';
            
//             setTimeout(() => {
//               if (artworkRefs.current[artworkToHighlight.$id]) {
//                 const el = artworkRefs.current[artworkToHighlight.$id];
//                 el.classList.remove(
//                   'highlighted-artwork',
//                   'ring-4', 
//                   'ring-blue-500', 
//                   'ring-opacity-90', 
//                   'scale-105',
//                   'z-50',
//                   'shadow-2xl'
//                 );
//                 el.style.animation = '';
//                 setHighlightedArtwork(null);
                
//                 if (searchParams.get('highlight')) {
//                   const newUrl = new URL(window.location);
//                   newUrl.searchParams.delete('highlight');
//                   window.history.replaceState({}, '', newUrl);
//                 }
//               }
//             }, 5000);
//           }
//         }, 300);
//       }
//     }
//   }, [allImages, artworkId, searchParams]);

//   // Search and filter functionality
//   useEffect(() => {
//     if (!searchTerm) {
//       setFilteredImages(allImages.filter(img => {
//         if (filter === 'user') return !img.isFeatured;
//         if (filter === 'featured') return img.isFeatured;
//         return true;
//       }));
//       setSuggestions([]);
//       return;
//     }

//     const lowerCaseSearch = searchTerm.toLowerCase();
//     const results = allImages.filter(image => {
//       if ((filter === 'user' && image.isFeatured) || (filter === 'featured' && !image.isFeatured)) {
//         return false;
//       }
//       const matches = [];
//       if (image.title) matches.push(image.title.toLowerCase().includes(lowerCaseSearch));
//       if (image.description) matches.push(image.description.toLowerCase().includes(lowerCaseSearch));
//       if (image.tag) {
//         const tags = Array.isArray(image.tag) ? image.tag : [image.tag];
//         matches.push(tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)));
//       }
//       return matches.some(Boolean);
//     });

//     setFilteredImages(results);

//     const suggestionSet = new Set();
//     allImages.filter(img => (filter === 'user' ? !img.isFeatured : filter === 'featured' ? img.isFeatured : true)).forEach(image => {
//       [image.title, image.description].forEach(text => {
//         if (text) {
//           text.toLowerCase().split(' ')
//             .filter(word => word.includes(lowerCaseSearch) && word.length > 2)
//             .forEach(word => suggestionSet.add(word));
//         }
//       });
//       if (image.tag) {
//         const tags = Array.isArray(image.tag) ? image.tag : [image.tag];
//         tags.forEach(tag => {
//           if (tag.toLowerCase().includes(lowerCaseSearch)) {
//             suggestionSet.add(tag.toLowerCase());
//           }
//         });
//       }
//     });

//     setSuggestions([...suggestionSet].slice(0, 5));
//   }, [searchTerm, allImages, filter]);

//   // Scroll handler
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 85);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // UI handlers
//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//   const handleSuggestionClick = (suggestion) => {
//     setSearchTerm(suggestion);
//     setSuggestions([]);
//   };

//   // Lightbox controls
//   const openLightbox = (index) => {
//     setLightbox({ open: true, index });
//     incrementViewCount(allImages[index].$id);
//     const currentImage = allImages[index];
//     const similar = allImages.filter((img, i) => i !== index && (
//       (currentImage.tag && img.tag && currentImage.tag.some(t => img.tag.includes(t))) ||
//       (currentImage.title && img.title && currentImage.title.toLowerCase().includes(img.title.toLowerCase().split(' ')[0]))
//     )).slice(0, 6);
//     setSimilarImages(similar);
//   };
//   const closeLightbox = () => {
//     setLightbox({ open: false, index: 0 });
//     setSimilarImages([]);
//   };
//   const prevImage = () => setLightbox(prev => ({
//     ...prev,
//     index: prev.index > 0 ? prev.index - 1 : allImages.length - 1
//   }));
//   const nextImage = () => setLightbox(prev => ({
//     ...prev,
//     index: prev.index < allImages.length - 1 ? prev.index + 1 : 0
//   }));

//   // Animation variants
//   const lightboxVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
//     exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
//   };

//   const dropdownVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
//   };

//   return (
//     <div className="max-w-screen min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
//       <ToastContainer position="top-right" autoClose={5000} 
//         theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} />
      
//       {/* Custom CSS for highlight animation */}
//       <style>
//         {`
//           @keyframes pulse-highlight {
//             0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
//             70% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); }
//             100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
//           }
//           .highlighted-artwork {
//             animation: pulse-highlight 2s infinite;
//           }
//         `}
//       </style>
      
//       {/* Header */}
//       <header className={`fixed top-3 rounded-xl left-0 w-full max-w-[96%] ml-[2%] z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
//         <div className="mx-auto px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between">
//           <Link to="/" className="flex items-center">
//             <h1 className="font-Eagle text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
//               Painters' Diary
//             </h1>
//           </Link>
//           <nav className="hidden md:flex items-center gap-6 text-[16px] font-medium text-gray-700 dark:text-gray-300">
//             {['Home', 'About', 'Account', 'Journal'].map((item) => (
//               <Link
//                 key={item}
//                 to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
//                 className="hover:text-green-600 transition-colors duration-200"
//               >
//                 {item}
//               </Link>
//             ))}
//           </nav>
//           <button
//             className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
//             onClick={toggleMenu}
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? <MdClose size={22} /> : <FiMenu size={22} />}
//           </button>
//         </div>
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3 space-y-3"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               {['Home', 'About', 'Account', 'Journal'].map((item) => (
//                 <Link
//                   key={item}
//                   to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
//                   onClick={toggleMenu}
//                   className="block text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors py-2"
//                 >
//                   {item}
//                 </Link>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>

//       {/* Hero Section */}
//       <section
//         className="relative flex items-center justify-center min-h-screen bg-center bg-cover px-4 py-20"
//         style={{ backgroundImage: `url(${bg})` }}
//       >
//         <div className="max-w-3xl w-full text-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 shadow-xl">
//           <h1 className="font-Quicksand text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
//             Palette of Dreams: 
//             <span className="block mt-1 text-green-600 dark:text-green-400">A Showcase of Artistic Brilliance</span>
//           </h1>
//           <p className="mt-5 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
//             From stunning landscapes to abstract wonders, each brushstroke tells a story—
//             a celebration of art's beauty and deep connection to the human spirit.
//           </p>
//           <div className="mt-8 flex flex-col items-center gap-3">
//             <div className="relative w-full max-w-md group">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search paintings, artists, or tags..."
//                 className="w-full rounded-full px-5 py-3 border border-gray-300 dark:border-gray-600 
//                   bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white 
//                   focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200
//                   placeholder-gray-500 dark:placeholder-gray-400"
//               />
//               <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-green-500 transition-colors" />
//               <AnimatePresence>
//                 {suggestions.length > 0 && (
//                   <motion.ul
//                     className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border 
//                       border-gray-300 dark:border-gray-600 rounded-xl shadow-lg mt-2 z-50 overflow-hidden"
//                     variants={dropdownVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="hidden"
//                   >
//                     {suggestions.map((suggestion, index) => (
//                       <li
//                         key={index}
//                         className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
//                         onClick={() => handleSuggestionClick(suggestion)}
//                       >
//                         {suggestion}
//                       </li>
//                     ))}
//                   </motion.ul>
//                 )}
//               </AnimatePresence>
//             </div>
//             {searchTerm && (
//               <div className="text-sm text-gray-700 dark:text-gray-400">
//                 Found <span className="font-medium text-green-600">{filteredImages.length}</span> {filteredImages.length === 1 ? 'result' : 'results'}
//               </div>
//             )}
//             <div className="mt-4 flex gap-4">
//               <button
//                 onClick={() => setFilter('all')}
//                 className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
//               >
//                 All Art
//               </button>
//               <button
//                 onClick={() => setFilter('user')}
//                 className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
//               >
//                 User Art
//               </button>
//               <button
//                 onClick={() => setFilter('featured')}
//                 className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'featured' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
//               >
//                 Featured Art
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Gallery Content */}
//       <div ref={contentRef} className="py-12 bg-gray-50 dark:bg-gray-900 w-full">
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-500 p-4">Error loading images: {error}</div>
//         ) : filteredImages.length === 0 ? (
//           <div className="text-center text-gray-600 dark:text-gray-300 p-8">
//             {searchTerm ? 'No matching paintings found. Try different keywords.' : 'No paintings available yet.'}
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 lg:max-w-[85%] max-w-[95%] mx-auto">
//               {filteredImages.map((image, index) => (
//                 <motion.div
//                   key={image.$id}
//                   ref={el => artworkRefs.current[image.$id] = el}
//                   variants={cardVariants}
//                   initial="hidden"
//                   animate="visible"
//                   transition={{ type: 'spring', stiffness: 400, damping: 20 }}
//                   className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 ${
//                     highlightedArtwork === image.$id ? 'highlighted-artwork ring-4 ring-blue-500 ring-opacity-90 scale-105 z-50 shadow-2xl' : ''
//                   }`}
//                 >
//                   <div className="relative group">
//                     <img
//                       src={image.url}
//                       alt={image.title || 'Artwork'}
//                       className="w-full h-72 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-100"
//                       loading="lazy"
//                       onClick={() => openLightbox(index)}
//                     />
//                     <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-3 bg-gradient-to-b from-black/40 to-transparent">
//                       {image.isFeatured ? (
//                         <>
//                           <a href={image.photographerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
//                             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs">
//                               {image.photographer?.charAt(0) || 'P'}
//                             </div>
//                             <span className="text-sm font-semibold text-white">
//                               {image.photographer || 'Pexels Artist'}
//                             </span>
//                           </a>
//                           <span className="text-xs text-white bg-blue-600/80 px-2 py-1 rounded-full">Featured</span>
//                         </>
//                       ) : (
//                         <>
//                           <Link to={`/Account/${image.userId}`} className="flex items-center space-x-2">
//                             {userProfiles[image.userId]?.profileImage ? (
//                               <img
//                                 src={userProfiles[image.userId].profileImage}
//                                 alt={userProfiles[image.userId].name}
//                                 className="w-8 h-8 rounded-full object-cover border border-white"
//                               />
//                             ) : (
//                               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs">
//                                 {userProfiles[image.userId]?.name?.charAt(0) || 'U'}
//                               </div>
//                             )}
//                             <span className="text-sm font-semibold text-white">
//                               {userProfiles[image.userId]?.name || 'Username'}
//                             </span>
//                           </Link>
//                           <FollowButton targetUserId={image.userId} />
//                         </>
//                       )}
//                     </div>
//                     {image.tag && (
//                       <div className="absolute bottom-0 right-0 m-2 px-2 py-1 rounded-md shadow-inner border dark:text-white text-gray-800 border-neutral-500 text-xs font-medium">
//                         {Array.isArray(image.tag) ? image.tag[0] : image.tag}
//                       </div>
//                     )}
//                     <div className="right-0 flex justify-between items-center px-3 py-2 text-sm">
//                       <div className="flex items-center space-x-4">
//                         <div className="flex items-center space-x-1">
//                           <FaRegEye className="text-[18px] text-gray-500 dark:text-gray-400" />
//                           <span className='text-gray-500 dark:text-gray-400'>
//                             {image.isFeatured ? (pexelsViewCounts[image.$id] || 0) : (image.viewCount || 0)}
//                           </span>
//                         </div>
//                         {!image.isFeatured && <LikeButton targetId={image.$id} className="text-white" />}
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <DownloadService artwork={image} />
//                         <ShareButton artwork={image} />
//                       </div>
//                     </div>
//                     <div className="mt-2 px-4 pb-4">
//                       <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
//                         {image.title || 'Title'}
//                       </h3>
//                       {image.description && (
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                           {image.description}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//             {(hasMoreAppwrite || hasMorePexels) && (
//               <div className="flex justify-center mt-8">
//                 <button
//                   onClick={loadMore}
//                   disabled={loadingMore}
//                   className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50 transition-colors"
//                 >
//                   {loadingMore ? 'Loading...' : 'Load More'}
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Lightbox */}
//       <AnimatePresence>
//         {lightbox.open && (
//           <motion.div
//             className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             onClick={closeLightbox}
//           >
//             <motion.div
//               className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
//               variants={lightboxVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={allImages[lightbox.index].url}
//                 alt={allImages[lightbox.index].title || 'Artwork'}
//                 className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
//                 onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
//               />
//               <button
//                 onClick={closeLightbox}
//                 className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
//               >
//                 <IoClose size={28} />
//               </button>
//               <button
//                 onClick={prevImage}
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
//               >
//                 <FaArrowLeft size={24} />
//               </button>
//               <button
//                 onClick={nextImage}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
//               >
//                 <FaArrowRight size={24} />
//               </button>
//               <div className="text-center text-white bg-black/50 backdrop-blur-sm rounded-lg p-4 mx-4 mt-4">
//                 <p className="text-xl font-medium mb-1">{allImages[lightbox.index].title || 'Untitled'}</p>
//                 <p className="text-sm">
//                   {lightbox.index + 1} / {allImages.length} • 
//                   By {allImages[lightbox.index].isFeatured 
//                     ? (allImages[lightbox.index].photographer || 'Pexels Artist')
//                     : (userProfiles[allImages[lightbox.index].userId]?.name || 'Unknown Artist')}
//                 </p>
//                 {allImages[lightbox.index].description && (
//                   <p className="text-sm mt-2 opacity-90">{allImages[lightbox.index].description}</p>
//                 )}
//                 {allImages[lightbox.index].isFeatured && (
//                   <p className="text-sm mt-1">
//                     <a href={allImages[lightbox.index].photographerUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-green-400">
//                       View photographer's profile
//                     </a>
//                   </p>
//                 )}
//               </div>
//               {similarImages.length > 0 && (
//                 <div className="mt-4 flex flex-wrap justify-center gap-4 overflow-x-auto pb-4">
//                   {similarImages.map((simImg, simIndex) => (
//                     <img
//                       key={simImg.$id}
//                       src={simImg.url}
//                       alt={simImg.title}
//                       className="w-24 h-24 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
//                       onClick={() => {
//                         const originalIndex = allImages.findIndex(img => img.$id === simImg.$id);
//                         setLightbox({ open: true, index: originalIndex });
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default Gallery;


// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ToastContainer } from 'react-toastify';

// // Services
// // import { fetchGalleryData, loadMoreData } from '../../services/galleryService';
// import { useInfiniteScroll } from './hooks/useInfiniteScroll';

// // Components
// import { fetchGalleryData, loadMoreData } from './services/galleryService';
// // import { useGalleryFilters } from './hooks/useGalleryFilters';
// import { useLightbox } from './hooks/useLightbox';
// import { useHighlightEffect } from './hooks/useHighlightEffect';
// // Components
// import Header from './components/Header';
// import HeroSection from './components/HeroSection';
// import MasonryGrid from './components/MasonryGrid';
// import Lightbox from './components/Lightbox';
// import FilterButtons from './components/FilterButtons';
// import LoadingSpinner from './components/LoadingSpinner';


// const Gallery = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const { artworkId } = useParams();
//   const contentRef = useRef(null);
  
//   // State
//   const [allMedia, setAllMedia] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [error, setError] = useState(null);
//   const [userProfiles, setUserProfiles] = useState({});
//   const [hasMore, setHasMore] = useState(true);
  
//   // Pagination state
//   const [appwriteLastId, setAppwriteLastId] = useState(null);
//   const [featuredPage, setFeaturedPage] = useState(1);
  
//   // Filter and search state
//   const [filter, setFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredMedia, setFilteredMedia] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);

//   // Filter and search logic
//   useEffect(() => {
//     if (!searchTerm) {
//       setFilteredMedia(allMedia.filter(item => {
//         switch (filter) {
//           case 'user':
//             return !item.isFeatured;
//           case 'featured':
//             return item.isFeatured;
//           case 'videos':
//             return item.type === 'video';
//           default:
//             return true;
//         }
//       }));
//       setSuggestions([]);
//       return;
//     }

//     // Search logic (same as before)
//     const lowerCaseSearch = searchTerm.toLowerCase();
//     const results = allMedia.filter(item => {
//       // Apply filter first
//       switch (filter) {
//         case 'user':
//           if (item.isFeatured) return false;
//           break;
//         case 'featured':
//           if (!item.isFeatured) return false;
//           break;
//         case 'videos':
//           if (item.type !== 'video') return false;
//           break;
//         default:
//       }

//       // Then apply search
//       const matches = [];
//       if (item.title) matches.push(item.title.toLowerCase().includes(lowerCaseSearch));
//       if (item.description) matches.push(item.description.toLowerCase().includes(lowerCaseSearch));
//       if (item.tag) {
//         const tags = Array.isArray(item.tag) ? item.tag : [item.tag];
//         matches.push(tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)));
//       }
//       return matches.some(Boolean);
//     });

//     setFilteredMedia(results);

//     // Generate suggestions (same as before)
//     const suggestionSet = new Set();
//     allMedia.filter(item => {
//       switch (filter) {
//         case 'user':
//           return !item.isFeatured;
//         case 'featured':
//           return item.isFeatured;
//         case 'videos':
//           return item.type === 'video';
//         default:
//           return true;
//       }
//     }).forEach(item => {
//       [item.title, item.description].forEach(text => {
//         if (text) {
//           text.toLowerCase().split(' ')
//             .filter(word => word.includes(lowerCaseSearch) && word.length > 2)
//             .forEach(word => suggestionSet.add(word));
//         }
//       });
//       if (item.tag) {
//         const tags = Array.isArray(item.tag) ? item.tag : [item.tag];
//         tags.forEach(tag => {
//           if (tag.toLowerCase().includes(lowerCaseSearch)) {
//             suggestionSet.add(tag.toLowerCase());
//           }
//         });
//       }
//     });

//     setSuggestions([...suggestionSet].slice(0, 5));
//   }, [searchTerm, allMedia, filter]);

//   const handleSuggestionClick = (suggestion) => {
//     setSearchTerm(suggestion);
//     setSuggestions([]);
//   };

//   // Lightbox and highlight hooks (implement these)
//   const { lightbox, openLightbox, closeLightbox, prevImage, nextImage, similarMedia, setSimilarMedia } = 
//     useLightbox(allMedia);
//   const { highlightedArtwork, artworkRefs } = 
//     useHighlightEffect(allMedia, artworkId, searchParams);

//   // Initial data fetch
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);
//         setHasMore(true);
//         setFeaturedPage(1);
//         setAppwriteLastId(null);
        
//         const { media, profiles, hasMore: moreData } = await fetchGalleryData(filter);
//         setAllMedia(media);
//         setUserProfiles(profiles);
//         setHasMore(moreData);
//       } catch (err) {
//         setError(err.message || 'Failed to load gallery');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [filter]);

//   // Load more handler for infinite scroll
//   const handleLoadMore = useCallback(async () => {
//     if (loadingMore || !hasMore) return;

//     try {
//       setLoadingMore(true);
//       const { media, profiles, hasMore: moreData } = await loadMoreData(
//         filter, 
//         allMedia, 
//         featuredPage, 
//         appwriteLastId
//       );
      
//       if (media.length > 0) {
//         setAllMedia(prev => [...prev, ...media]);
//         setUserProfiles(prev => ({ ...prev, ...profiles }));
//       }
      
//       setHasMore(moreData);
//       setFeaturedPage(prev => prev + 1);
      
//       // Update last ID for Appwrite pagination
//       if (media.length > 0 && (filter === 'all' || filter === 'user')) {
//         const lastAppwriteItem = media.filter(item => !item.isFeatured).pop();
//         if (lastAppwriteItem) {
//           setAppwriteLastId(lastAppwriteItem.$id);
//         }
//       }
//     } catch (err) {
//       console.error('Error loading more content:', err);
//       setHasMore(false); // Stop trying if there's an error
//     } finally {
//       setLoadingMore(false);
//     }
//   }, [filter, allMedia, featuredPage, appwriteLastId, loadingMore, hasMore]);

//   // Infinite scroll hook
//   const { observerRef, isFetching } = useInfiniteScroll(
//     handleLoadMore,
//     hasMore,
//     loadingMore
//   );

//   return (
//     <div className="max-w-screen min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
//       <ToastContainer 
//         position="top-right" 
//         autoClose={5000} 
//         theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} 
//       />
      
//       <Header />
      
//       <HeroSection
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         suggestions={suggestions}
//         handleSuggestionClick={handleSuggestionClick}
//         filteredMedia={filteredMedia}
//       />

//       <FilterButtons 
//         filter={filter}
//         setFilter={setFilter}
//         filteredMedia={filteredMedia}
//       />

//       {/* Gallery Content */}
//       <div ref={contentRef} className="py-8 bg-gray-50 dark:bg-gray-900 w-full">
//         {loading ? (
//           <LoadingSpinner />
//         ) : error ? (
//           <div className="text-center text-red-500 p-4">Error loading content: {error}</div>
//         ) : filteredMedia.length === 0 ? (
//           <div className="text-center text-gray-600 dark:text-gray-300 p-8">
//             {searchTerm ? 'No matching content found. Try different keywords.' : 'No content available yet.'}
//           </div>
//         ) : (
//           <>
//             <MasonryGrid
//               media={filteredMedia}
//               userProfiles={userProfiles}
//               artworkRefs={artworkRefs}
//               highlightedArtwork={highlightedArtwork}
//               openLightbox={openLightbox}
//             />
            
//             {/* Infinite scroll trigger and loading indicator */}
//             <div ref={observerRef} className="h-10 flex items-center justify-center">
//               {loadingMore && <LoadingSpinner small />}
//               {!hasMore && filteredMedia.length > 0 && (
//                 <div className="text-center text-gray-500 dark:text-gray-400 py-8">
//                   <p className="text-sm">You've reached the end! 🎉</p>
//                   <p className="text-xs mt-1">No more content to load.</p>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>

//       <Lightbox
//         lightbox={lightbox}
//         allMedia={allMedia}
//         userProfiles={userProfiles}
//         similarMedia={similarMedia}
//         closeLightbox={closeLightbox}
//         prevImage={prevImage}
//         nextImage={nextImage}
//         openLightbox={openLightbox}
//       />
//     </div>
//   );
// };

// export default Gallery;



// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ToastContainer } from 'react-toastify';

// // Services
// import { fetchGalleryData, loadMoreData } from './services/galleryService';
// import { useInfiniteScroll } from './hooks/useInfiniteScroll';
// import { useLightbox } from './hooks/useLightbox';
// import { useHighlightEffect } from './hooks/useHighlightEffect';

// // Components
// import Header from './components/Header';
// import HeroSection from './components/HeroSection';
// import MasonryGrid from './components/MasonryGrid';
// import Lightbox from './components/Lightbox';
// import FilterButtons from './components/FilterButtons';
// import LoadingSpinner from './components/LoadingSpinner';

// const Gallery = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const { artworkId } = useParams();
//   const contentRef = useRef(null);
  
//   // State
//   const [allMedia, setAllMedia] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [error, setError] = useState(null);
//   const [userProfiles, setUserProfiles] = useState({});
//   const [hasMore, setHasMore] = useState(true);
  
//   // Pagination state - SIMPLIFIED
//   const [paginationState, setPaginationState] = useState({
//     featuredPage: 1,
//     appwriteLastId: null
//   });
  
//   // Filter and search state
//   const [filter, setFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredMedia, setFilteredMedia] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);

//   // Filter and search logic
//   useEffect(() => {
//     if (!searchTerm) {
//       setFilteredMedia(allMedia.filter(item => {
//         switch (filter) {
//           case 'user':
//             return !item.isFeatured;
//           case 'featured':
//             return item.isFeatured;
//           case 'videos':
//             return item.type === 'video';
//           default:
//             return true;
//         }
//       }));
//       setSuggestions([]);
//       return;
//     }

//     // Your existing search logic...
//     const lowerCaseSearch = searchTerm.toLowerCase();
//     const results = allMedia.filter(item => {
//       // Apply filter first
//       switch (filter) {
//         case 'user':
//           if (item.isFeatured) return false;
//           break;
//         case 'featured':
//           if (!item.isFeatured) return false;
//           break;
//         case 'videos':
//           if (item.type !== 'video') return false;
//           break;
//         default:
//       }

//       // Then apply search
//       const matches = [];
//       if (item.title) matches.push(item.title.toLowerCase().includes(lowerCaseSearch));
//       if (item.description) matches.push(item.description.toLowerCase().includes(lowerCaseSearch));
//       if (item.tag) {
//         const tags = Array.isArray(item.tag) ? item.tag : [item.tag];
//         matches.push(tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)));
//       }
//       return matches.some(Boolean);
//     });

//     setFilteredMedia(results);

//     // Generate suggestions
//     const suggestionSet = new Set();
//     allMedia.filter(item => {
//       switch (filter) {
//         case 'user':
//           return !item.isFeatured;
//         case 'featured':
//           return item.isFeatured;
//         case 'videos':
//           return item.type === 'video';
//         default:
//           return true;
//       }
//     }).forEach(item => {
//       [item.title, item.description].forEach(text => {
//         if (text) {
//           text.toLowerCase().split(' ')
//             .filter(word => word.includes(lowerCaseSearch) && word.length > 2)
//             .forEach(word => suggestionSet.add(word));
//         }
//       });
//       if (item.tag) {
//         const tags = Array.isArray(item.tag) ? item.tag : [item.tag];
//         tags.forEach(tag => {
//           if (tag.toLowerCase().includes(lowerCaseSearch)) {
//             suggestionSet.add(tag.toLowerCase());
//           }
//         });
//       }
//     });

//     setSuggestions([...suggestionSet].slice(0, 5));
//   }, [searchTerm, allMedia, filter]);

//   // Reset everything when filter changes
//   useEffect(() => {
//     setAllMedia([]);
//     setHasMore(true);
//     setPaginationState({ featuredPage: 1, appwriteLastId: null });
//     setLoading(true);
//   }, [filter]);

//   // Initial data fetch
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);
//         const { media, profiles, hasMore: moreData, pagination } = await fetchGalleryData(filter);
        
//         setAllMedia(media);
//         setUserProfiles(profiles);
//         setHasMore(moreData);
//         setPaginationState(pagination);
        
//       } catch (err) {
//         setError(err.message || 'Failed to load gallery');
//         setHasMore(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Only load if we don't have data yet
//     if (allMedia.length === 0) {
//       loadData();
//     }
//   }, [filter]);

//   // FIXED: Load more handler
//   const handleLoadMore = useCallback(async () => {
//     if (loadingMore || !hasMore) {
//       console.log('Skipping load more:', { loadingMore, hasMore });
//       return;
//     }

//     console.log('Loading more data...');
    
//     try {
//       setLoadingMore(true);
      
//       const result = await loadMoreData(filter, allMedia, paginationState);
      
//       console.log('Load more result:', {
//         newMediaCount: result.media.length,
//         hasMore: result.hasMore,
//         pagination: result.pagination
//       });
      
//       if (result.media.length > 0) {
//         setAllMedia(prev => [...prev, ...result.media]);
//         setUserProfiles(prev => ({ ...prev, ...result.profiles }));
//       }
      
//       setHasMore(result.hasMore);
//       setPaginationState(result.pagination);
      
//     } catch (err) {
//       console.error('Error loading more content:', err);
//       setHasMore(false);
//     } finally {
//       setLoadingMore(false);
//     }
//   }, [filter, allMedia, paginationState, loadingMore, hasMore]);

//   // Infinite scroll hook
//   const { observerRef, isFetching } = useInfiniteScroll(
//     handleLoadMore,
//     hasMore,
//     loadingMore
//   );

//   // Lightbox and highlight hooks
//   const { lightbox, openLightbox, closeLightbox, prevImage, nextImage, similarMedia, setSimilarMedia } = 
//     useLightbox(allMedia);
//   const { highlightedArtwork, artworkRefs } = 
//     useHighlightEffect(allMedia, artworkId, searchParams);

//   const handleSuggestionClick = (suggestion) => {
//     setSearchTerm(suggestion);
//     setSuggestions([]);
//   };

//   return (
//     <div className="max-w-screen min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
//       <ToastContainer 
//         position="top-right" 
//         autoClose={5000} 
//         theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} 
//       />
      
//       <Header />
      
//       <HeroSection
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         suggestions={suggestions}
//         handleSuggestionClick={handleSuggestionClick}
//         filteredMedia={filteredMedia}
//       />

//       <FilterButtons 
//         filter={filter}
//         setFilter={setFilter}
//         filteredMedia={filteredMedia}
//       />

//       {/* Gallery Content */}
//       <div ref={contentRef} className="py-8 bg-gray-50 dark:bg-gray-900 w-full">
//         {loading && allMedia.length === 0 ? (
//           <LoadingSpinner />
//         ) : error ? (
//           <div className="text-center text-red-500 p-4">Error loading content: {error}</div>
//         ) : filteredMedia.length === 0 ? (
//           <div className="text-center text-gray-600 dark:text-gray-300 p-8">
//             {searchTerm ? 'No matching content found. Try different keywords.' : 'No content available yet.'}
//           </div>
//         ) : (
//           <>
//             <MasonryGrid
//               media={filteredMedia}
//               userProfiles={userProfiles}
//               artworkRefs={artworkRefs}
//               highlightedArtwork={highlightedArtwork}
//               openLightbox={openLightbox}
//             />
            
//             {/* CRITICAL: Infinite scroll trigger */}
//             {hasMore && (
//               <div 
//                 ref={observerRef} 
//                 className="h-20 flex items-center justify-center"
//                 style={{ minHeight: '100px' }}
//               >
//                 {loadingMore && <LoadingSpinner small />}
//                 {!loadingMore && (
//                   <div className="text-center text-gray-500 dark:text-gray-400">
//                     <p className="text-sm">Loading more content...</p>
//                   </div>
//                 )}
//               </div>
//             )}
            
//             {!hasMore && filteredMedia.length > 0 && (
//               <div className="text-center text-gray-500 dark:text-gray-400 py-8">
//                 <p className="text-sm">You've reached the end! 🎉</p>
//                 <p className="text-xs mt-1">No more content to load.</p>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       <Lightbox
//         lightbox={lightbox}
//         allMedia={allMedia}
//         userProfiles={userProfiles}
//         similarMedia={similarMedia}
//         closeLightbox={closeLightbox}
//         prevImage={prevImage}
//         nextImage={nextImage}
//         openLightbox={openLightbox}
//       />
//     </div>
//   );
// };

// export default Gallery;

import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

// Services
import { fetchGalleryData, loadMoreData } from './services/galleryService';
import { fetchPexelsData, loadMorePexelsData } from './services/pexelsService';

// Hooks
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { useLightbox } from './hooks/useLightbox';
import { useHighlightEffect } from './hooks/useHighlightEffect';

// Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MasonryGrid from './components/MasonryGrid';
import Lightbox from './components/Lightbox';
import FilterButtons from './components/FilterButtons';
import LoadingSpinner from './components/LoadingSpinner';

const Gallery = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { artworkId } = useParams();
  const contentRef = useRef(null);
  
  // State
  const [allMedia, setAllMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [userProfiles, setUserProfiles] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [source, setSource] = useState('all');
  
  // Pagination state
  const [paginationState, setPaginationState] = useState({
    featuredPage: 1,
    appwriteLastId: null
  });
  
  // Filter and search state
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Filter and search logic
  useEffect(() => {
    if (!searchTerm) {
      setFilteredMedia(allMedia.filter(item => {
        switch (filter) {
          case 'user':
            return !item.isFeatured;
          case 'featured':
            return item.isFeatured;
          case 'videos':
            return item.type === 'video';
          default:
            return true;
        }
      }));
      setSuggestions([]);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const results = allMedia.filter(item => {
      switch (filter) {
        case 'user':
          if (item.isFeatured) return false;
          break;
        case 'featured':
          if (!item.isFeatured) return false;
          break;
        case 'videos':
          if (item.type !== 'video') return false;
          break;
        default:
      }

      const matches = [];
      if (item.title) matches.push(item.title.toLowerCase().includes(lowerCaseSearch));
      if (item.description) matches.push(item.description.toLowerCase().includes(lowerCaseSearch));
      if (item.tag) {
        const tags = Array.isArray(item.tag) ? item.tag : [item.tag];
        matches.push(tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)));
      }
      return matches.some(Boolean);
    });

    setFilteredMedia(results);

    const suggestionSet = new Set();
    allMedia.filter(item => {
      switch (filter) {
        case 'user':
          return !item.isFeatured;
        case 'featured':
          return item.isFeatured;
        case 'videos':
          return item.type === 'video';
        default:
          return true;
      }
    }).forEach(item => {
      [item.title, item.description].forEach(text => {
        if (text) {
          text.toLowerCase().split(' ')
            .filter(word => word.includes(lowerCaseSearch) && word.length > 2)
            .forEach(word => suggestionSet.add(word));
        }
      });
      if (item.tag) {
        const tags = Array.isArray(item.tag) ? item.tag : [item.tag];
        tags.forEach(tag => {
          if (tag.toLowerCase().includes(lowerCaseSearch)) {
            suggestionSet.add(tag.toLowerCase());
          }
        });
      }
    });

    setSuggestions([...suggestionSet].slice(0, 5));
  }, [searchTerm, allMedia, filter]);

  // Reset everything when filter changes
  useEffect(() => {
    setAllMedia([]);
    setHasMore(true);
    setPaginationState({ featuredPage: 1, appwriteLastId: null });
    setSource(filter === 'all' ? 'user' : filter);
    setLoading(true);
  }, [filter]);

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        let media, profiles, moreData, pagination;
        if (source === 'featured') {
          const result = await fetchPexelsData(filter, searchTerm);
          media = result.media;
          profiles = result.profiles;
          moreData = result.hasMore;
          pagination = result.pagination;
        } else {
          const result = await fetchGalleryData(source);
          media = result.media;
          profiles = result.profiles;
          moreData = result.hasMore;
          pagination = result.pagination;
        }
        
        setAllMedia(media);
        setUserProfiles(profiles);
        setHasMore(moreData);
        setPaginationState(pagination);
        
      } catch (err) {
        setError(err.message || 'Failed to load gallery');
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    if (allMedia.length === 0) {
      loadData();
    }
  }, [source, searchTerm]);  // Note: depends on source and searchTerm for re-fetch if needed

  // Load more handler
  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore) {
      return;
    }
    
    try {
      setLoadingMore(true);
      let result;
      if (source === 'featured') {
        result = await loadMorePexelsData(filter, searchTerm, paginationState);
      } else {
        result = await loadMoreData(source, allMedia, paginationState);
      }
      
      if (result.media.length > 0) {
        setAllMedia(prev => [...prev, ...result.media]);
        setUserProfiles(prev => ({ ...prev, ...result.profiles }));
      }
      
      setHasMore(result.hasMore);
      setPaginationState(result.pagination);

      // Switch to featured if all and no more appwrite
      if (filter === 'all' && source !== 'featured' && !result.hasMore) {
        setSource('featured');
        setPaginationState({ featuredPage: 1, appwriteLastId: null });
        setHasMore(true);
      }
      
    } catch (err) {
      console.error('Error loading more content:', err);
      setError(err.message || 'Failed to load more');
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [filter, source, searchTerm, loadingMore, hasMore, paginationState, allMedia]);

  // Infinite scroll hook
  const { observerRef } = useInfiniteScroll(
    handleLoadMore,
    hasMore,
    loadingMore
  );

  // Lightbox and highlight hooks
  const { lightbox, openLightbox, closeLightbox, prevImage, nextImage, similarMedia, setSimilarMedia } = 
    useLightbox(allMedia);
  const { highlightedArtwork, artworkRefs } = 
    useHighlightEffect(allMedia, artworkId, searchParams);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="max-w-screen min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} 
      />
      
      <Header />
      
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
        filteredMedia={filteredMedia}
      />

      <FilterButtons 
        filter={filter}
        setFilter={setFilter}
        filteredMedia={filteredMedia}
      />

      {/* Gallery Content */}
      <div ref={contentRef} className="py-8 bg-gray-50 dark:bg-gray-900 w-full">
        {loading && allMedia.length === 0 ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-500 p-4">Error loading content: {error}</div>
        ) : filteredMedia.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300 p-8">
            {searchTerm ? 'No matching content found. Try different keywords.' : 'No content available yet.'}
          </div>
        ) : (
          <>
            <MasonryGrid
              media={filteredMedia}
              userProfiles={userProfiles}
              artworkRefs={artworkRefs}
              highlightedArtwork={highlightedArtwork}
              openLightbox={openLightbox}
            />
            
            {/* Infinite scroll trigger with load more button */}
            {hasMore && (
              <div 
                ref={observerRef} 
                className="h-20 flex items-center justify-center"
                style={{ minHeight: '100px' }}
              >
                {loadingMore ? (
                  <LoadingSpinner small />
                ) : (
                  <button 
                    onClick={handleLoadMore}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Load More
                  </button>
                )}
              </div>
            )}
            
            {!hasMore && filteredMedia.length > 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <p className="text-sm">You've reached the end! 🎉</p>
                <p className="text-xs mt-1">No more content to load.</p>
              </div>
            )}
          </>
        )}
      </div>

      <Lightbox
        lightbox={lightbox}
        allMedia={allMedia}
        userProfiles={userProfiles}
        similarMedia={similarMedia}
        closeLightbox={closeLightbox}
        prevImage={prevImage}
        nextImage={nextImage}
        openLightbox={openLightbox}
      />
    </div>
  );
};

export default Gallery;



