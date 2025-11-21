// // src/pages/GalleryPage.jsx or components/Gallery/CategoryGallery.jsx
// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import {
//   Home, User, Palette, ChevronLeft, ChevronRight,
//   Eye, Heart, X, Sparkles, Filter
// } from 'lucide-react';
// import { TbCategory2 } from "react-icons/tb";
// import { motion, AnimatePresence } from 'framer-motion';
// import { databases, storage, client, Query } from '../appwriteConfig';
// import SearchBar from '../SearchBar';
// import FollowButton from '../Follow/FollowButton';
// import LikeButton from '../EngagementService/likeButton';
// import ShareButton from '../Share/ShareFunction';
// import DownloadService from '../Downloads/downloadService';
// import ArtworkViewTracker from '../Views/viewsTracker';
// import { CATEGORY_CONFIG, useCategoryBackgrounds } from './categoryConfig'; // your improved config
// import { HiOutlineViewfinderCircle } from "react-icons/hi2";


// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
// const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
// const userProfileCollection = import.meta.env.VITE_APPWRITE_USER_PROFILE_COLLECTION;

// export default function GalleryPage() {
//   const { categoryName } = useParams();
//   const { backgrounds, loading: bgLoading } = useCategoryBackgrounds();

//   // PERFECT CATEGORY RESOLVER — Never fails again
//   const resolveCategoryKey = (name) => {
//     if (!name) return 'abstract';
//     const lower = name.toLowerCase().trim();

//     // Direct match
//     if (CATEGORY_CONFIG[lower]) return lower;

//     // Common aliases
//     const aliases = {
//       'watercolor': 'watercolour',
//       'pop art': 'popart',
//       'pop-art': 'popart',
//       'still life': 'stilllife',
//       'still-life': 'stilllife',
//       'oil painting': 'oilpainting',
//       'oil-painting': 'oilpainting',
//       'digital art': 'digital',
//     };

//     if (aliases[lower]) return aliases[lower];

//     // Remove hyphens/spaces fallback
//     const clean = lower.replace(/[-\s]/g, '');
//     return CATEGORY_CONFIG[clean] ? clean : 'abstract';
//   };

//   const categoryKey = resolveCategoryKey(categoryName);
//   const config = CATEGORY_CONFIG[categoryKey] || CATEGORY_CONFIG.abstract;
//   const rawBg = backgrounds[categoryKey];
//   const hasRealBg = rawBg && rawBg.startsWith('http');
//   const backgroundImage = hasRealBg ? rawBg : null;

//   const [images, setImages] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [lightboxIndex, setLightboxIndex] = useState(null);
//   const [sortBy, setSortBy] = useState('newest');
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [showFilters, setShowFilters] = useState(false);

//   const allTags = [...new Set(images.flatMap(img => img.tags || []))];

//   // Fetch artworks by medium
//   useEffect(() => {
//     let mounted = true;
//     const fetchImages = async () => {
//       try {
//         setLoading(true);
//         const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
//           Query.equal('medium', config.medium),
//           Query.limit(100) // prevent huge loads
//         ]);

//         const docs = res.documents || [];
//         const withUrls = await Promise.all(
//           docs.map(async (d) => {
//             try {
//               const url = storage.getFileView(BUCKET_ID, d.fileId);
//               return { ...d, url };
//             } catch {
//               return null;
//             }
//           })
//         );

//         const valid = withUrls.filter(Boolean);
//         if (mounted) {
//           setImages(valid);
//           setFiltered(valid);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     fetchImages();
//     return () => { mounted = false; };
//   }, [categoryKey, config.medium]);

//   // Real-time updates
//   useEffect(() => {
//     const unsub = client.subscribe(
//       `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
//       (res) => {
//         const p = res.payload;
//         if (!p?.$id) return;

//         const update = (prev) => prev.map(i =>
//           i.$id === p.$id
//             ? { ...i, viewCount: p.viewCount ?? i.viewCount, likes: p.likes ?? i.likes }
//             : i
//         );

//         setImages(update);
//         setFiltered(update);
//       }
//     );

//     return () => unsub();
//   }, []);


//   // for username caching

// const userCache = {};

//  async function getUserData(userId) {
//   if (userCache[userId]) return userCache[userId];

//   const res = await databases.getDocument(DATABASE_ID, userProfileCollection, userId);
//   userCache[userId] = res;
//   return res;
// }

// const [username, setUsername] = useState("Artist");

//   useEffect(() => {
//     if (!img.userId) return;

//     getUserData(img.userId).then((data) => {
//       setUsername(data.username || "Artist");
//     });
//   }, [img.userId]);
  

//   // Sorting & Filtering
//   useEffect(() => {
//     let result = [...images];

//     if (selectedTags.length > 0) {
//       result = result.filter(img =>
//         img.tags?.some(t => selectedTags.includes(t))
//       );
//     }

//     result.sort((a, b) => {
//       switch (sortBy) {
//         case 'newest': return new Date(b.$createdAt) - new Date(a.$createdAt);
//         case 'oldest': return new Date(a.$createdAt) - new Date(b.$createdAt);
//         case 'popular': return (b.views || 0) - (a.views || 0);
//         case 'likes': return (b.likes || 0) - (a.likes || 0);
//         default: return 0;
//       }
//     });

//     setFiltered(result);
//   }, [images, sortBy, selectedTags]);

//   const toggleTag = (tag) => {
//     setSelectedTags(prev =>
//       prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
//     );
//   };

//   const clearFilters = () => {
//     setSelectedTags([]);
//     setSortBy('newest');
//   };

//   const openLightbox = (idx) => setLightboxIndex(idx);
//   const closeLightbox = () => setLightboxIndex(null);
//   const prev = () => setLightboxIndex(i => (i === 0 ? filtered.length - 1 : i - 1));
//   const next = () => setLightboxIndex(i => (i === filtered.length - 1 ? 0 : i + 1));

//   const ImageCard = ({ img, index }) => (

//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.06 }}
//       className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 transition-all duration-500"
//     >
//       <div className="relative">
//         <img
//           src={img.url}
//           alt={img.title || config.title}
//           className="w-full aspect-square object-cover transition-transform duration-1000 group-hover:scale-100"
//           onClick={() => openLightbox(index)}
//         />

//         {/* Floating Artist Bar */}
//         <div className="absolute top-3 left-3 right-3 flex justify-between items-center px-4 py-2.5 rounded-xl glass backdrop-blur-lg border border-white/20">
//           <div className="flex items-center gap-3">
//             <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-${config.accent}-500 to-${config.complement}-500 flex items-center justify-center text-white font-bold shadow-xl`}>
//               {/* {(img.username || "A").charAt(0).toUpperCase()} */}
//               {username.charAt(0).toUpperCase()}
//             </div>
//             <p className="text-white font-semibold">{img.username || "Artist"}</p>
//           </div>
//           <FollowButton targetUserId={img.userId} className="bg-white/90 hover:bg-white px-4 py-1.5 rounded-lg text-sm font-bold" />
//         </div>

//         {/* Hover Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
//           {/* <p className="text-white font-medium text-lg">Click to view</p> */}
//           <HiOutlineViewfinderCircle size={18} />
//         </div>
//       </div>

//       <div className="p-5 space-y-4">
//         <div className="flex justify-between items-center">
//           <div className="flex gap-3">
//             <div className='mt-2'>
//                 <LikeButton targetId={img.$id} initialLikes={img.likes || 0} />
//             </div>
//             <ShareButton artwork={img} variant="icon" />
//             <DownloadService artwork={img} />
//           </div>
//           <div className="flex items-center gap-1.5 text-sm">
//             <Eye className="w-4 h-4" />
//             <span>{(img.views || 0).toLocaleString()}</span>
//           </div>
//         </div>

//         <h3 className="text-xl font-bold line-clamp-1">
//           {img.title || `Untitled ${config.medium}`}
//         </h3>

//         {img.description && (
//           <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
//             {img.description}
//           </p>
//         )}

//         <div className="flex flex-wrap gap-2">
//           {img.tags?.slice(0, 4).map((tag) => (
//             <button
//               key={tag}
//               onClick={(e) => { e.stopPropagation(); toggleTag(tag); }}
//               className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900 transition"
//             >
//               {tag}
//             </button>
//           ))}
//           {img.tags?.length > 4 && (
//             <span className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700">
//               +{img.tags.length - 4}
//             </span>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-950 dark:to-purple-950/20">
//       {/* HERO SECTION — NOW 100% WORKING */}
//       <header className="relative h-[65vh] w-full overflow-hidden">
//         <div className="absolute inset-0">
//           {bgLoading ? (
//             <div className="w-full h-full bg-gradient-to-br from-gray-300 to-purple-300 dark:from-gray-800 dark:to-purple-900 animate-pulse" />
//           ) : backgroundImage ? (
//             <img
//               src={backgroundImage}
//               alt={`${config.title} background`}
//               className="w-full h-full object-cover"
//               style={{ opacity: 0 }}
//               onLoad={(e) => {
//                 e.currentTarget.style.opacity = '1';
//                 e.currentTarget.style.transition = 'opacity 1.2s ease-out';
//               }}
//             />
//           ) : (
//             // Beautiful gradient fallback with subtle pattern
//             <div className={`w-full h-full bg-gradient-to-br ${config.gradient} dark:${config.darkGradient} relative overflow-hidden`}>
//               <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
//               <div className="absolute inset-0 opacity-10" style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff'%3E%3Cpath d='M0 0h100v100H0z' opacity='0.05'/%3E%3C/g%3E%3C/svg%3E")`
//               }} />
//             </div>
//           )}

//           {/* Overlays */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent dark:from-gray-900/95" />
//           <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20" />
//         </div>

//         {/* Floating Orbs */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[...Array(6)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute rounded-full blur-3xl"
//               style={{
//                 background: `radial-gradient(circle, ${config.accent === 'purple' ? '#a78bfa' : '#f43f5e'}33, transparent)`,
//                 width: 300 + Math.random() * 400,
//                 height: 300 + Math.random() * 400,
//                 top: `${20 + Math.random() * 60}%`,
//                 left: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: [0, -60, 0],
//                 x: [0, 40, 0],
//                 scale: [1, 1.3, 1],
//               }}
//               transition={{
//                 duration: 20 + i * 5,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//             />
//           ))}
//         </div>

//         <div className="relative z-10 h-full flex flex-col">
{/* <nav className="px-4 py-2 flex justify-between items-center  ">
  <Link 
    to="/" 
    className="p-2 rounded-lg bg-white/10 transition-all duration-200"
  >
    <h1 className='text-xl font-semibold text-gray-800 dark:text-white font-Eagle'>
      Painters' Diary
    </h1>
  </Link>

  <div className="flex gap-2">
    <Link 
      to="/Account" 
      className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
    >
      <User className="w-5 h-5" />
    </Link>
    <Link 
      to="/Category" 
      className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
    >
      <TbCategory2 className="w-5 h-5" />
    </Link>
    <Link 
      to="/Gallery" 
      className="p-2 rounded-lg bg-black dark:bg-white text-white dark:text-black transition-all duration-200"
    >
      <Palette className="w-5 h-5" />
    </Link>
  </div>
</nav> */}

//           <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
//             <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
//               <div className="flex items-center gap-4 mb-6">
//                 <Sparkles className={`w-10 h-10 text-${config.accent}-400`} />
//                 <h1 className={`text-5xl md:text-7xl font-bold font-Upright bg-gradient-to-r ${config.darkGradient} bg-clip-text text-transparent`}>
//                   {config.title}
//                 </h1>
//                 <Sparkles className={`w-10 h-10 text-${config.complement}-400`} />
//               </div>
//               <p className="text-xl md:text-2xl font-Create text-white/90 mb-8 max-w-3xl">
//                 {config.description}
//               </p>

//               <div className="w-full max-w-2xl">
//                 <SearchBar
//                   allImages={images}
//                   onFilter={setFiltered}
//                   placeholder={`Search in ${config.medium.toLowerCase()}...`}
//                   className="glass backdrop-blur-xl border-white/30"
//                 />
//               </div>

//               <div className="mt-6 text-white/70 text-sm">
//                 {images.length} artworks by {new Set(images.map(i => i.userId)).size} artists
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </header>

//       {/* Filters */}
//       <section className="max-w-7xl mx-auto px-1 py-8">
//         <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="px-5 py-3 rounded-xl glass backdrop-blur-md border border-white/20"
//           >
//             <option value="newest">Newest First</option>
//             <option value="oldest">Oldest First</option>
//             <option value="popular">Most Viewed</option>
//             <option value="likes">Most Liked</option>
//           </select>

//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-3 px-5 py-3 rounded-xl glass backdrop-blur-md border border-white/20 hover:bg-white/10 transition"
//           >
//             <Filter className="w-5 h-5" />
//             Filters {selectedTags.length > 0 && `(${selectedTags.length})`}
//           </button>
//         </div>

//         <AnimatePresence>
//           {showFilters && allTags.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               className="mb-8"
//             >
//               <div className="glass rounded-2xl p-6 border border-white/20">
//                 <div className="flex flex-wrap gap-3">
//                   {allTags.map(tag => (
//                     <button
//                       key={tag}
//                       onClick={() => toggleTag(tag)}
//                       className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                         selectedTags.includes(tag)
//                           ? 'bg-purple-500 text-white'
//                           : 'bg-white/20 hover:bg-white/40 text-white'
//                       }`}
//                     >
//                       {tag}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </section>

//       {/* Gallery Grid */}
//       <main className="max-w-7xl mx-auto px-1 pb-20">
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[...Array(9)].map((_, i) => (
//               <div key={i} className="animate-pulse">
//                 <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl" />
//                 <div className="mt-4 h-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />
//               </div>
//             ))}
//           </div>
//         ) : filtered.length === 0 ? (
//           <div className="text-center py-20 text-white">
//             <p className="text-6xl mb-4">🎨</p>
//             <h3 className="text-3xl font-bold mb-4">
//               No {config.medium} artworks yet
//             </h3>
//             {selectedTags.length > 0 && (
//               <button onClick={clearFilters} className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl">
//                 Clear Filters
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filtered.map((img, i) => (
//               <ImageCard key={img.$id} img={img} index={i} />
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Lightbox */}
//       <AnimatePresence>
//         {lightboxIndex !== null && (
//           <motion.div
//             className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={closeLightbox}
//           >
//             <motion.div
//               className="relative max-w-6xl w-full"
//               onClick={(e) => e.stopPropagation()}
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//             >
//               <img
//                 src={filtered[lightboxIndex].url}
//                 alt={filtered[lightboxIndex].title}
//                 className="max-w-full max-h-[85vh] mx-auto rounded-2xl shadow-2xl"
//               />

//               <button onClick={closeLightbox} className="absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition">
//                 <X className="w-8 h-8 text-white" />
//               </button>

//               <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition">
//                 <ChevronLeft className="w-8 h-8 text-white" />
//               </button>

//               <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition">
//                 <ChevronRight className="w-8 h-8 text-white" />
//               </button>

//               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-2xl px-8 py-4 text-white text-center">
//                 <p className="font-bold text-xl">{filtered[lightboxIndex].title || 'Untitled'}</p>
//                 <p className="text-sm opacity-80">by {filtered[lightboxIndex].authorName} • {lightboxIndex + 1}/{filtered.length}</p>
//               </div>

//               <div className="absolute top-6 left-6">
//                 <ArtworkViewTracker artworkId={filtered[lightboxIndex].$id} />
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style jsx>{`
//         .glass {
//           background: rgba(255, 255, 255, 0.15);
//           backdrop-filter: blur(20px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//         }
//         .dark .glass {
//           background: rgba(0, 0, 0, 0.3);
//           border-color: rgba(255, 255, 255, 0.1);
//         }
//       `}</style>
//     </div>
//   );
// }

// src/pages/GalleryPage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Home, User, Palette, ChevronLeft, ChevronRight,
  Eye, Heart, X, Sparkles, Filter, ZoomIn, Download, Share2
} from 'lucide-react';
import { TbCategory2 } from "react-icons/tb";
import { motion, AnimatePresence } from 'framer-motion';
import { databases, storage, client, Query } from '../appwriteConfig';
import SearchBar from '../SearchBar';
import FollowButton from '../Follow/FollowButton';
import LikeButton from '../EngagementService/likeButton';
import ShareButton from '../Share/ShareFunction';
import DownloadService from '../Downloads/downloadService';
import ArtworkViewTracker from '../Views/viewsTracker';
import { CATEGORY_CONFIG, useCategoryBackgrounds } from './categoryConfig';
import { HiOutlineViewfinderCircle } from "react-icons/hi2";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_METADATA_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
const USER_PROFILE_COLLECTION = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

// User data cache
const userCache = new Map();

export default function GalleryPage() {
  const { categoryName } = useParams();
  const { backgrounds, loading: bgLoading } = useCategoryBackgrounds();

  // Category resolver
  const resolveCategoryKey = useCallback((name) => {
    if (!name) return 'abstract';
    const lower = name.toLowerCase().trim();

    if (CATEGORY_CONFIG[lower]) return lower;

    const aliases = {
      'watercolor': 'watercolour', 'pop art': 'popart', 'pop-art': 'popart',
      'still life': 'stilllife', 'still-life': 'stilllife',
      'oil painting': 'oilpainting', 'oil-painting': 'oilpainting',
      'digital art': 'digital',
    };

    if (aliases[lower]) return aliases[lower];

    const clean = lower.replace(/[-\s]/g, '');
    return CATEGORY_CONFIG[clean] ? clean : 'abstract';
  }, []);

  const categoryKey = resolveCategoryKey(categoryName);
  const config = CATEGORY_CONFIG[categoryKey] || CATEGORY_CONFIG.abstract;
  const rawBg = backgrounds[categoryKey];
  const hasRealBg = rawBg && rawBg.startsWith('http');
  const backgroundImage = hasRealBg ? rawBg : null;

  const [images, setImages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [userDataMap, setUserDataMap] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);

  const allTags = [...new Set(images.flatMap(img => img.tags || []))];

  // Fetch user data with caching
  const fetchUserData = useCallback(async (userId) => {
    if (!userId) return null;
    
    if (userCache.has(userId)) {
      return userCache.get(userId);
    }

    try {
      const user = await databases.getDocument(
        DATABASE_ID, 
        USER_PROFILE_COLLECTION, 
        userId
      );
      userCache.set(userId, user);
      return user;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }, []);

  // Batch fetch user data for all images
  useEffect(() => {
    const fetchAllUserData = async () => {
      const uniqueUserIds = [...new Set(images.map(img => img.userId).filter(Boolean))];
      
      const userDataPromises = uniqueUserIds.map(async (userId) => {
        const user = await fetchUserData(userId);
        return { userId, user };
      });

      const results = await Promise.all(userDataPromises);
      const userMap = results.reduce((acc, { userId, user }) => {
        if (user) acc[userId] = user;
        return acc;
      }, {});

      setUserDataMap(userMap);
    };

    if (images.length > 0) {
      fetchAllUserData();
    }
  }, [images, fetchUserData]);

  // Get display name for image
  const getDisplayName = useCallback((img) => {
    const user = userDataMap[img.userId];
    if (user?.username) return user.username;
    if (user?.name) return user.name;
    if (img.authorName) return img.authorName;
    if (img.username) return img.username;
    return "Artist";
  }, [userDataMap]);

  // Get user initial
  const getUserInitial = useCallback((img) => {
    const name = getDisplayName(img);
    return name.charAt(0).toUpperCase();
  }, [getDisplayName]);

  // Fetch artworks
  useEffect(() => {
    let mounted = true;
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
          Query.equal('medium', config.medium),
          Query.limit(100)
        ]);

        const docs = res.documents || [];
        const withUrls = await Promise.all(
          docs.map(async (d) => {
            try {
              const url = storage.getFileView(BUCKET_ID, d.fileId);
              return { 
                ...d, 
                url,
                createdAt: d.$createdAt,
                likes: d.likes || 0,
                views: d.views || 0
              };
            } catch {
              return null;
            }
          })
        );

        const valid = withUrls.filter(Boolean);
        if (mounted) {
          setImages(valid);
          setFiltered(valid);
        }
      } catch (err) {
        console.error('Error fetching images:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchImages();
    return () => { mounted = false; };
  }, [categoryKey, config.medium]);

  // Real-time updates
  useEffect(() => {
    const unsub = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
      (res) => {
        const p = res.payload;
        if (!p?.$id) return;

        const update = (prev) => prev.map(i =>
          i.$id === p.$id
            ? { ...i, viewCount: p.viewCount ?? i.viewCount, likes: p.likes ?? i.likes }
            : i
        );

        setImages(update);
        setFiltered(update);
      }
    );

    return () => unsub();
  }, []);

  // Sorting & Filtering
  useEffect(() => {
    let result = [...images];

    if (selectedTags.length > 0) {
      result = result.filter(img =>
        img.tags?.some(t => selectedTags.includes(t))
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.$createdAt) - new Date(a.$createdAt);
        case 'oldest': return new Date(a.$createdAt) - new Date(b.$createdAt);
        case 'popular': return (b.views || 0) - (a.views || 0);
        case 'likes': return (b.likes || 0) - (a.likes || 0);
        default: return 0;
      }
    });

    setFiltered(result);
  }, [images, sortBy, selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSortBy('newest');
  };

  const openLightbox = (idx) => {
    setLightboxIndex(idx);
    setImageLoaded(false);
  };

  const closeLightbox = () => setLightboxIndex(null);
  
  const prev = (e) => {
    e?.stopPropagation();
    setLightboxIndex(i => (i === 0 ? filtered.length - 1 : i - 1));
    setImageLoaded(false);
  };
  
  const next = (e) => {
    e?.stopPropagation();
    setLightboxIndex(i => (i === filtered.length - 1 ? 0 : i + 1));
    setImageLoaded(false);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          next();
          break;
        case 'Escape':
          e.preventDefault();
          closeLightbox();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const ImageCard = ({ img, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-md transition-al"
    >
      <div className="relative">
        <img
          src={img.url}
          alt={img.title || config.title}
          className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-100"
          onClick={() => openLightbox(index)}
        />

        {/* Floating Artist Bar */}
        <div className="absolute top-1 left-1 right-1 flex justify-between items-center px-2 py-2 bg-white/40 opacity-80 rounded-md border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-xl">
              {getUserInitial(img)}
            </div>
            <p className="text-white font-semibold">{getDisplayName(img)}</p>
          </div>
          <FollowButton 
            targetUserId={img.userId} 
            className="bg-white/90 hover:bg-white px-4 py-1.5 rounded-lg text-sm font-bold text-gray-800 transition-all" 
          />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="text-white text-center"
          >
            <HiOutlineViewfinderCircle size={24} className="mx-auto mb-2" />
            <p className="text-sm font-medium">View Details</p>
          </motion.div>
        </div>
      </div>

      <div className="p-3 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <div className=' mt-2'><LikeButton targetId ={img.$id || img.id} /></div>
            <ShareButton artwork={img} variant="icon" />
            <DownloadService artwork={img} />
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
            <Eye className="w-4 h-4" />
            <span>{(img.views || 0).toLocaleString()}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
          {img.title || `Untitled ${config.medium}`}
        </h3>

        {img.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
            {img.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {img.tags?.slice(0, 4).map((tag) => (
            <button
              key={tag}
              onClick={(e) => { e.stopPropagation(); toggleTag(tag); }}
              className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors text-gray-700 dark:text-gray-300 font-medium"
            >
              {tag}
            </button>
          ))}
          {img.tags?.length > 4 && (
            <span className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400">
              +{img.tags.length - 4}
            </span>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(img.$createdAt).toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-950 dark:to-zinc-950">
      {/* HERO SECTION */}
      <header className="relative h-[65vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          {bgLoading ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-purple-300 dark:from-gray-800 dark:to-purple-900 animate-pulse" />
          ) : backgroundImage ? (
            <img
              src={backgroundImage}
              alt={`${config.title} background`}
              className="w-full h-full object-cover transition-opacity duration-1000"
              onLoad={(e) => e.target.style.opacity = '1'}
              style={{ opacity: 0 }}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${config.gradient} dark:${config.darkGradient} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20" />
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl opacity-30"
              style={{
                background: `radial-gradient(circle, ${config.accent === 'purple' ? '#a78bfa' : '#f43f5e'}33, transparent)`,
                width: 300 + Math.random() * 400,
                height: 300 + Math.random() * 400,
                top: `${20 + Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, 40, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col">
          <nav className="px-4 py-2 flex justify-between items-center  ">
  <Link 
    to="/" 
    className="p-2 rounded-lg bg-white/10 transition-all duration-200"
  >
    <h1 className='text-xl font-semibold text-gray-800 dark:text-white font-Eagle'>
      Painters' Diary
    </h1>
  </Link>

  <div className="flex gap-2">
    <Link 
      to="/Account" 
      className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
    >
      <User className="w-5 h-5" />
    </Link>
    <Link 
      to="/Category" 
      className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
    >
      <TbCategory2 className="w-5 h-5" />
    </Link>
    <Link 
      to="/Gallery" 
      className="p-2 rounded-lg bg-black dark:bg-white text-white dark:text-black transition-all duration-200"
    >
      <Palette className="w-5 h-5" />
    </Link>
  </div>
</nav>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <Sparkles className="w-8 h-8 text-purple-300" />
                <h1 className="text-5xl md:text-7xl font-bold font-Upright bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  {config.title}
                </h1>
                <Sparkles className="w-8 h-8 text-blue-300" />
              </div>
              <p className="text-xl md:text-2xl font-Create text-white/90 mb-8 max-w-3xl mx-auto">
                {config.description}
              </p>

              <div className="w-full max-w-2xl mx-auto">
                <SearchBar
                  allImages={images}
                  onFilter={setFiltered}
                  placeholder={`Search ${config.medium.toLowerCase()} artworks...`}
                  className="bg-white/20 backdrop-blur-xl border-white/30 text-white placeholder-white/70"
                />
              </div>

              <div className="mt-6 text-white/70 text-sm">
                {images.length} artworks • {new Set(images.map(i => i.userId)).size} artists
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-gray-800/90 text-black dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="newest" className="text-gray-900">Newest First</option>
            <option value="oldest" className="text-gray-900">Oldest First</option>
            {/* <option value="popular" className="text-gray-900">Most Viewed</option> */}
            {/* <option value="likes" className="text-gray-900">Most Liked</option> */}
          </select>

          <div className="flex items-center gap-4">
            {selectedTags.length > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-white hover:text-purple-200 transition-colors"
              >
                Clear all
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-800/10 backdrop-blur-md border border-white/20 hover:bg-gray-900/20 transition text-gray-800 dark:text-gray-400"
            >
              <Filter className="w-5 h-5" />
              Filters {selectedTags.length > 0 && `(${selectedTags.length})`}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && allTags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-semibold mb-4">Filter by Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-purple-500 text-white shadow-lg'
                          : 'bg-white/20 hover:bg-white/30 text-white'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>


      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-1 pb">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                <div className="mt-4 h-24 bg-gray-200 dark:bg-gray-700 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              No {config.medium} artworks found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {selectedTags.length > 0 
                ? 'Try adjusting your filters or search terms'
                : 'Be the first to upload artwork in this category!'
              }
            </p>
            {selectedTags.length > 0 && (
              <button 
                onClick={clearFilters}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((img, i) => (
              <ImageCard key={img.$id} img={img} index={i} />
            ))}
          </div>
        )}
      </main>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Background overlay with separate click handler */}
            <div className="absolute inset-0" onClick={closeLightbox} />
            
            <motion.div
              className="relative max-w-6xl w-full max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main Image with Loading State */}
              <div className="relative">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <motion.img
                  src={filtered[lightboxIndex]?.url}
                  alt={filtered[lightboxIndex]?.title}
                  className="max-w-full max-h-[80vh] mx-auto rounded-2xl shadow-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imageLoaded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              {/* Close Button */}
              <motion.button 
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 hover:bg-black/70 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>

              {/* Navigation Arrows */}
              <motion.button 
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 hover:bg-black/70 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </motion.button>

              <motion.button 
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 hover:bg-black/70 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </motion.button>

              {/* Image Info */}
              <motion.div 
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-2xl px-6 py-4 text-white text-center min-w-[300px] border border-white/20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-bold text-lg mb-1">
                  {filtered[lightboxIndex]?.title || 'Untitled'}
                </h3>
                <p className="text-sm opacity-80">
                  by {getDisplayName(filtered[lightboxIndex])} • {lightboxIndex + 1} of {filtered.length}
                </p>
              </motion.div>

              {/* Additional Actions */}
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <ArtworkViewTracker artworkId={filtered[lightboxIndex]?.$id} />
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/20">
                  <Heart className="w-4 h-4 text-white" />
                  <span className="text-sm text-white">{filtered[lightboxIndex]?.likes || 0}</span>
                </div>
              </div>

              {/* Zoom Indicator */}
              <motion.div 
                className="absolute top-6 right-20 bg-black/50 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xs text-white/70 flex items-center gap-1">
                  <ZoomIn className="w-3 h-3" />
                  Scroll to zoom
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}