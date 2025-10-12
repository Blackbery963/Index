// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Masonry from 'react-masonry-css';

// const Collection = () => {
//   const [images, setImages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const breakpointColumnsObj = {
//     default: 3,
//     1024: 2,
//     640: 1,
//   };

//   // 🔹 Fetch images from Pexels
//   const fetchImages = async (pageNum = 1) => {
//     if (loading) return;
    
//     setLoading(true);
//     try {
//       const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
      
//       if (!API_KEY) {
//         console.error("Pexels API key not found");
//         return;
//       }

//       const res = await fetch(
//         `https://api.pexels.com/v1/search?query=art&per_page=9&page=${pageNum}`,
//         {
//           headers: {
//             Authorization: API_KEY
//           }
//         }
//       );
      
//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
      
//       const data = await res.json();
      
//       // Check if we've reached the end of available images
//       if (data.photos.length === 0) {
//         setHasMore(false);
//         return;
//       }
      
//       const formatted = data.photos.map(photo => ({
//         id: photo.id,
//         src: photo.src.large,
//         title: photo.alt || "Untitled",
//         category: photo.photographer,
//       }));
      
//       setImages(prev => pageNum === 1 ? formatted : [...prev, ...formatted]);
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch initial batch
//   useEffect(() => {
//     fetchImages(page);
//   }, [page]);

//   return (
//     <div className="min-h-screen xl:max-w-7xl max-w-full sm:max-w-[85%] mx-auto bg-gray-50 dark:bg-[#0a0f14] rounded-lg">
//       <section className="py-12 px-6 bg-white dark:bg-[#040d1200]">
//         <div className="max-w-7xl mx-auto flex flex-col">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl font-light text-gray-900 dark:text-white mb-3">
//               Featured <span className="font-semibold">Masterpieces</span>
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
//               A curated gallery of art that moves you.
//             </p>
//           </motion.div>

//           {/* Masonry Grid */}
//           <Masonry
//             breakpointCols={breakpointColumnsObj}
//             className="flex gap-6"
//             columnClassName="space-y-6"
//           >
//             {images.map((image, index) => (
//               <motion.div
//                 key={image.id}
//                 className="relative overflow-hidden rounded-xl shadow-lg group"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <img
//                   src={image.src}
//                   alt={image.title}
//                   className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
//                   loading="lazy"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
//                   <h3 className="text-white font-semibold text-lg">{image.title}</h3>
//                   <p className="text-white/80 text-sm">{image.category}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </Masonry>

//           {/* Load More Button */}
//           {hasMore && (
//             <button
//               onClick={() => setPage(prev => prev + 1)}
//               disabled={loading}
//               className="col-span-2 mt-12 px-6 py-3 dark:bg-slate-900 dark:text-gray-200 bg-gray-200 text-gray-900 border shadow-inner rounded-xl mx-auto disabled:opacity-50"
//             >
//               {loading ? 'Loading...' : 'Load More'}
//             </button>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Collection;

// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Masonry from 'react-masonry-css';

// const Collection = () => {
//   const [images, setImages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [userInterests, setUserInterests] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('art');
//   const [lastRefreshDate, setLastRefreshDate] = useState('');
//   const [showInterestModal, setShowInterestModal] = useState(false);

//   // Categories with related keywords for better search results
//   const categories = [
//     { id: 'art', name: 'Art', keywords: ['painting', 'artwork', 'masterpiece'] },
//     { id: 'nature', name: 'Nature', keywords: ['landscape', 'wildlife', 'forest'] },
//     { id: 'architecture', name: 'Architecture', keywords: ['building', 'design', 'urban'] },
//     { id: 'abstract', name: 'Abstract', keywords: ['abstract', 'modern', 'contemporary'] },
//     { id: 'portrait', name: 'Portrait', keywords: ['portrait', 'people', 'face'] },
//     { id: 'minimal', name: 'Minimal', keywords: ['minimal', 'simple', 'clean'] }
//   ];

//   const breakpointColumnsObj = {
//     default: 3,
//     1024: 2,
//     640: 1,
//   };

//   // Check if we need to refresh content (once per day)
//   const needsRefresh = () => {
//     const today = new Date().toDateString();
//     if (lastRefreshDate !== today) {
//       setLastRefreshDate(today);
//       return true;
//     }
//     return false;
//   };

//   // Load user interests from localStorage or show modal if none exist
//   useEffect(() => {
//     const savedInterests = localStorage.getItem('artCollectionInterests');
//     const savedDate = localStorage.getItem('artCollectionLastRefresh');
    
//     if (savedDate) {
//       setLastRefreshDate(savedDate);
//     }
    
//     if (savedInterests) {
//       setUserInterests(JSON.parse(savedInterests));
//       setSelectedCategory(JSON.parse(savedInterests)[0] || 'art');
//     } else {
//       setShowInterestModal(true);
//     }
//   }, []);

//   // Save interests to localStorage
//   const saveInterests = (interests) => {
//     setUserInterests(interests);
//     localStorage.setItem('artCollectionInterests', JSON.stringify(interests));
//     if (interests.length > 0) {
//       setSelectedCategory(interests[0]);
//     }
//     setShowInterestModal(false);
//   };

//   // Get a random keyword from the selected category for variety
//   const getRandomKeyword = (categoryId) => {
//     const category = categories.find(cat => cat.id === categoryId);
//     if (category && category.keywords) {
//       const randomIndex = Math.floor(Math.random() * category.keywords.length);
//       return category.keywords[randomIndex];
//     }
//     return categoryId; // fallback to category ID
//   };

//   // Fetch images with daily variation
//   const fetchImages = useCallback(async (pageNum = 1, isRefresh = false) => {
//     if (loading) return;
    
//     setLoading(true);
//     try {
//       const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
      
//       if (!API_KEY) {
//         console.error("Pexels API key not found");
//         return;
//       }

//       // Determine search query - use selected category with a random keyword for variety
//       const searchQuery = getRandomKeyword(selectedCategory);
      
//       // Add date-based variation to ensure different results each day
//       const date = new Date();
//       const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
      
//       // Use a combination of query and day of year to get varied but consistent daily results
//       const res = await fetch(
//         `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=9&page=${pageNum + dayOfYear}`,
//         {
//           headers: {
//             Authorization: API_KEY
//           }
//         }
//       );
      
//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
      
//       const data = await res.json();
      
//       // Check if we've reached the end of available images
//       if (data.photos.length === 0) {
//         setHasMore(false);
//         return;
//       }
      
//       const formatted = data.photos.map(photo => ({
//         id: photo.id,
//         src: photo.src.large,
//         title: photo.alt || "Untitled",
//         category: photo.photographer,
//       }));
      
//       if (isRefresh || pageNum === 1) {
//         setImages(formatted);
//         setPage(1);
//       } else {
//         setImages(prev => [...prev, ...formatted]);
//       }
      
//       // Save the refresh date
//       const today = new Date().toDateString();
//       setLastRefreshDate(today);
//       localStorage.setItem('artCollectionLastRefresh', today);
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedCategory, loading]);

//   // Fetch initial batch or refresh if needed
//   useEffect(() => {
//     if (needsRefresh() || page === 1) {
//       fetchImages(1, true);
//     }
//   }, [selectedCategory]);

//   // Handle load more
//   const handleLoadMore = () => {
//     setPage(prev => prev + 1);
//     fetchImages(page + 1, false);
//   };

//   // Handle category change
//   const handleCategoryChange = (categoryId) => {
//     setSelectedCategory(categoryId);
//     setPage(1);
//     setHasMore(true);
//   };

//   // Refresh content manually
//   const handleRefresh = () => {
//     fetchImages(1, true);
//   };

//   // Interest selection modal
//   const InterestModal = () => (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
//       >
//         <h3 className="text-xl font-bold mb-4 dark:text-white">Personalize Your Gallery</h3>
//         <p className="text-gray-600 dark:text-gray-300 mb-6">
//           Select your interests to see art that matches your taste. We'll refresh the collection daily with new discoveries.
//         </p>
        
//         <div className="grid grid-cols-2 gap-3 mb-6">
//           {categories.map(category => (
//             <button
//               key={category.id}
//               onClick={() => {
//                 if (userInterests.includes(category.id)) {
//                   setUserInterests(prev => prev.filter(id => id !== category.id));
//                 } else {
//                   setUserInterests(prev => [...prev, category.id]);
//                 }
//               }}
//               className={`p-3 rounded-lg border transition-colors ${
//                 userInterests.includes(category.id)
//                   ? 'bg-blue-500 text-white border-blue-500'
//                   : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
//               }`}
//             >
//               {category.name}
//             </button>
//           ))}
//         </div>
        
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={() => saveInterests(['art'])}
//             className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
//           >
//             Skip
//           </button>
//           <button
//             onClick={() => saveInterests(userInterests.length > 0 ? userInterests : ['art'])}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Save Preferences
//           </button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen xl:max-w-7xl max-w-full sm:max-w-[85%] mx-auto bg-gray-50 dark:bg-[#0a0f14] rounded-lg">
//       <section className="py-12 px-6 bg-white dark:bg-[#040d1200]">
//         <div className="max-w-7xl mx-auto flex flex-col">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-8"
//           >
//             <h2 className="text-4xl font-light text-gray-900 dark:text-white mb-3">
//               Your <span className="font-semibold">Personalized Gallery</span>
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
//               Discover art that moves you, refreshed daily based on your interests.
//             </p>
//           </motion.div>

//           {/* Category Filter */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="flex flex-wrap justify-center gap-2 mb-8"
//           >
//             {userInterests.map(interestId => {
//               const category = categories.find(cat => cat.id === interestId);
//               return category ? (
//                 <button
//                   key={category.id}
//                   onClick={() => handleCategoryChange(category.id)}
//                   className={`px-4 py-2 rounded-full transition-all ${
//                     selectedCategory === category.id
//                       ? 'bg-blue-500 text-white shadow-md'
//                       : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
//                   }`}
//                 >
//                   {category.name}
//                 </button>
//               ) : null;
//             })}
//             <button
//               onClick={() => setShowInterestModal(true)}
//               className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1"
//             >
//               <span>Edit Interests</span>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
//               </svg>
//             </button>
//             <button
//               onClick={handleRefresh}
//               disabled={loading}
//               className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/50 flex items-center gap-1"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
//               </svg>
//               <span>Refresh</span>
//             </button>
//           </motion.div>

//           {/* Daily Refresh Indicator */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center mb-6"
//           >
//             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//               </svg>
//               Last refreshed: {lastRefreshDate || 'Today'}
//             </span>
//           </motion.div>

//           {/* Masonry Grid */}
//           <Masonry
//             breakpointCols={breakpointColumnsObj}
//             className="flex gap-6"
//             columnClassName="space-y-6"
//           >
//             <AnimatePresence>
//               {images.map((image, index) => (
//                 <motion.div
//                   key={`${image.id}-${lastRefreshDate}`} // Ensure re-render on refresh
//                   className="relative overflow-hidden rounded-xl shadow-lg group"
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -30 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   layout // Enable layout animations
//                 >
//                   <img
//                     src={image.src}
//                     alt={image.title}
//                     className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
//                     loading="lazy"
//                   />
//                   <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
//                     <h3 className="text-white font-semibold text-lg">{image.title}</h3>
//                     <p className="text-white/80 text-sm">{image.category}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </Masonry>

//           {/* Empty State */}
//           {images.length === 0 && !loading && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-12"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No images found</h3>
//               <p className="text-gray-600 dark:text-gray-400">Try refreshing or selecting different categories.</p>
//             </motion.div>
//           )}

//           {/* Load More Button */}
//           {hasMore && images.length > 0 && (
//             <button
//               onClick={handleLoadMore}
//               disabled={loading}
//               className="col-span-2 mt-12 px-6 py-3 dark:bg-slate-900 dark:text-gray-200 bg-gray-200 text-gray-900 border shadow-inner rounded-xl mx-auto disabled:opacity-50 flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Loading...
//                 </>
//               ) : (
//                 'Load More'
//               )}
//             </button>
//           )}

//           {/* End of Results */}
//           {!hasMore && images.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center mt-8 py-4 text-gray-500 dark:text-gray-400"
//             >
//               You've reached the end of today's collection. Check back tomorrow for new discoveries!
//             </motion.div>
//           )}
//         </div>
//       </section>

//       {/* Interest Selection Modal */}
//       {showInterestModal && <InterestModal />}
//     </div>
//   );
// };

// export default Collection;




import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  Eye, 
  TrendingUp, 
  Sparkles, 
  Filter,
  RefreshCw,
  Settings,
  User,
  Clock,
  Palette,
  Camera,
  Mountain,
  Building,
  Shapes,
  Minimize,
  Users,
  X,
  ChevronDown,
  Search,
  Grid3X3,
  BarChart3
} from 'lucide-react';

// Enhanced personalization algorithm
class PersonalizedRecommendationEngine {
  constructor() {
    this.userProfile = this.loadUserProfile();
    this.interactionWeights = {
      like: 3,
      save: 5,
      share: 4,
      view: 1,
      timeSpent: 2
    };
  }

  loadUserProfile() {
    const saved = localStorage.getItem('artPersonalizationProfile');
    return saved ? JSON.parse(saved) : {
      preferences: {},
      interactions: [],
      categories: [],
      colors: [],
      styles: [],
      artists: [],
      timeOfDay: {},
      sessionBehavior: []
    };
  }

  saveUserProfile() {
    localStorage.setItem('artPersonalizationProfile', JSON.stringify(this.userProfile));
  }

  // Track user interaction
  recordInteraction(imageId, type, metadata = {}) {
    const interaction = {
      imageId,
      type,
      timestamp: Date.now(),
      metadata
    };
    
    this.userProfile.interactions.push(interaction);
    this.updatePreferences(metadata, type);
    this.saveUserProfile();
  }

  // Update user preferences based on interactions
  updatePreferences(metadata, interactionType) {
    const weight = this.interactionWeights[interactionType] || 1;
    
    // Update category preferences
    if (metadata.category) {
      this.userProfile.preferences[metadata.category] = 
        (this.userProfile.preferences[metadata.category] || 0) + weight;
    }

    // Track time-based preferences
    const hour = new Date().getHours();
    const timeSlot = hour < 6 ? 'night' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
    this.userProfile.timeOfDay[timeSlot] = (this.userProfile.timeOfDay[timeSlot] || 0) + 1;
  }

  // Calculate personalized score for an image
  calculatePersonalizationScore(image) {
    let score = 0;
    
    // Category preference scoring
    if (this.userProfile.preferences[image.category]) {
      score += this.userProfile.preferences[image.category] * 0.4;
    }

    // Time-based scoring
    const hour = new Date().getHours();
    const timeSlot = hour < 6 ? 'night' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
    if (this.userProfile.timeOfDay[timeSlot]) {
      score += this.userProfile.timeOfDay[timeSlot] * 0.1;
    }

    // Diversity factor - slightly favor unexplored categories
    const categoryExposure = this.userProfile.interactions.filter(
      i => i.metadata && i.metadata.category === image.category
    ).length;
    score += Math.max(0, 10 - categoryExposure) * 0.05;

    // Trending boost
    score += (image.trending || 0) * 0.2;

    // Quality indicators
    score += (image.likes || 0) * 0.001;
    score += (image.views || 0) * 0.0001;

    return Math.max(0, score);
  }

  // Get personalized recommendations
  getPersonalizedFeed(images) {
    return images
      .map(image => ({
        ...image,
        personalScore: this.calculatePersonalizationScore(image)
      }))
      .sort((a, b) => b.personalScore - a.personalScore);
  }
}

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const ImprovedCollection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedType, setFeedType] = useState('personalized');
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [showFilters, setShowFilters] = useState(false);
  const [likedImages, setLikedImages] = useState(new Set());
  const [savedImages, setSavedImages] = useState(new Set());
  const [viewMode, setViewMode] = useState('feed'); // 'feed' or 'grid'
  const [page, setPage] = useState(1);
  
  // Initialize recommendation engine
  const recommendationEngine = useMemo(() => new PersonalizedRecommendationEngine(), []);

  const categories = [
    { id: 'art', name: 'Art & Paintings', icon: Palette, color: 'bg-purple-500' },
    { id: 'photography', name: 'Photography', icon: Camera, color: 'bg-blue-500' },
    { id: 'nature', name: 'Nature', icon: Mountain, color: 'bg-green-500' },
    { id: 'architecture', name: 'Architecture', icon: Building, color: 'bg-gray-500' },
    { id: 'abstract', name: 'Abstract', icon: Shapes, color: 'bg-pink-500' },
    { id: 'minimal', name: 'Minimal', icon: Minimize, color: 'bg-indigo-500' }
  ];

  const categoryMap = {
    art: 'painting art',
    photography: 'photography',
    nature: 'nature landscape',
    architecture: 'architecture building',
    abstract: 'abstract art',
    minimal: 'minimalist'
  };

  // Reset and fetch when feed type or categories change
  useEffect(() => {
    setImages([]);
    setPage(1);
    fetchPersonalizedContent();
  }, [feedType, selectedCategories]);

  // Fetch and personalize content using Pexels API
  const fetchPersonalizedContent = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      let useCurated = (feedType === 'recent' || feedType === 'trending') && 
        (selectedCategories.includes('all') || selectedCategories.length === 0);
      
      let selectedCatId;
      let queryStr = 'art';

      if (!useCurated) {
        if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
          selectedCatId = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
        } else if (feedType === 'personalized') {
          const prefs = Object.entries(recommendationEngine.userProfile.preferences)
            .sort((a, b) => b[1] - a[1])
            .map(([cat]) => cat);
          selectedCatId = prefs[0] || categories[Math.floor(Math.random() * categories.length)].id;
        }
        queryStr = categoryMap[selectedCatId] || 'art';
      }

      if (feedType === 'trending') {
        queryStr = `trending ${queryStr}`;
      }

      let endpoint = useCurated 
        ? 'https://api.pexels.com/v1/curated' 
        : 'https://api.pexels.com/v1/search';

      const params = new URLSearchParams({
        per_page: '20',
        page: page.toString()
      });

      if (!useCurated) {
        params.append('query', queryStr);
      }

      const response = await fetch(`${endpoint}?${params.toString()}`, {
        headers: {
          Authorization: PEXELS_API_KEY
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from Pexels');
      }

      const data = await response.json();
      const newImages = data.photos.map(photo => ({
        id: photo.id,
        src: photo.src.large,
        title: photo.alt ? photo.alt.split(' ').slice(0, 4).join(' ') + '...' : 'Untitled',
        artist: photo.photographer,
        category: useCurated 
          ? categories[Math.floor(Math.random() * categories.length)].id 
          : selectedCatId || 'art',
        likes: Math.floor(Math.random() * 1000) + 10,
        views: Math.floor(Math.random() * 5000) + 100,
        comments: Math.floor(Math.random() * 50) + 1,
        shares: Math.floor(Math.random() * 20) + 1,
        timestamp: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
        trending: (feedType === 'trending' || useCurated) ? Math.random() * 10 + 5 : Math.random() * 5,
        tags: photo.alt ? photo.alt.toLowerCase().split(' ').slice(0, 3) : ['art'],
        description: photo.alt || 'Beautiful image from Pexels',
        avg_color: photo.avg_color
      }));

      setImages(prev => {
        let updated = [...prev, ...newImages];

        let processed = updated;

        // Apply category filter if active
        if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
          processed = processed.filter(img => selectedCategories.includes(img.category));
        }

        // Sort based on feed type
        switch (feedType) {
          case 'personalized':
            processed = recommendationEngine.getPersonalizedFeed(processed);
            break;
          case 'trending':
            processed = processed.sort((a, b) => b.trending - a.trending);
            break;
          case 'recent':
            processed = processed.sort((a, b) => b.timestamp - a.timestamp);
            break;
        }

        return processed;
      });

      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching content:', error);
      // Fallback to mock data if API fails
      const mockImages = [];
      for (let i = 0; i < 20; i++) {
        const catId = selectedCategories.includes('all') 
          ? categories[Math.floor(Math.random() * categories.length)].id 
          : selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
        mockImages.push({
          id: Date.now() + i,
          src: `https://picsum.photos/800/1200?random=${Date.now() + i}`,
          title: `Artistic Creation ${i + 1}`,
          artist: `Artist ${Math.floor(Math.random() * 20) + 1}`,
          category: catId,
          likes: Math.floor(Math.random() * 1000) + 10,
          views: Math.floor(Math.random() * 5000) + 100,
          comments: Math.floor(Math.random() * 50) + 1,
          shares: Math.floor(Math.random() * 20) + 1,
          timestamp: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
          trending: Math.random() * 10,
          tags: ['creative', 'inspiring', catId],
          description: `Beautiful ${catId} piece.`,
          avg_color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        });
      }

      setImages(prev => {
        let updated = [...prev, ...mockImages];

        let processed = updated;

        if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
          processed = processed.filter(img => selectedCategories.includes(img.category));
        }

        switch (feedType) {
          case 'personalized':
            processed = recommendationEngine.getPersonalizedFeed(processed);
            break;
          case 'trending':
            processed = processed.sort((a, b) => b.trending - a.trending);
            break;
          case 'recent':
            processed = processed.sort((a, b) => b.timestamp - a.timestamp);
            break;
        }

        return processed;
      });

      setPage(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  }, [loading, feedType, selectedCategories, page, recommendationEngine, categories]);

  // Handle user interactions
  const handleLike = useCallback((imageId, imageData) => {
    const newLikedImages = new Set(likedImages);
    if (newLikedImages.has(imageId)) {
      newLikedImages.delete(imageId);
    } else {
      newLikedImages.add(imageId);
      // Record interaction for personalization
      recommendationEngine.recordInteraction(imageId, 'like', {
        category: imageData.category,
        artist: imageData.artist,
        timestamp: Date.now()
      });
    }
    setLikedImages(newLikedImages);
  }, [likedImages, recommendationEngine]);

  const handleSave = useCallback((imageId, imageData) => {
    const newSavedImages = new Set(savedImages);
    if (newSavedImages.has(imageId)) {
      newSavedImages.delete(imageId);
    } else {
      newSavedImages.add(imageId);
      recommendationEngine.recordInteraction(imageId, 'save', {
        category: imageData.category,
        artist: imageData.artist
      });
    }
    setSavedImages(newSavedImages);
  }, [savedImages, recommendationEngine]);

  const handleImageView = useCallback((imageId, imageData) => {
    recommendationEngine.recordInteraction(imageId, 'view', {
      category: imageData.category,
      artist: imageData.artist
    });
  }, [recommendationEngine]);

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const ImageCard = ({ image, index }) => (
    <div 
      className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800"
      onLoad={() => handleImageView(image.id, image)}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
            {image.artist[0]}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{image.artist}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{formatTimestamp(image.timestamp)}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Image */}
      <div 
        className="relative group"
        style={{ backgroundColor: image.avg_color || '#ffffff' }}
      >
        <img
          src={image.src}
          alt={image.title}
          className="w-full h-auto object-cover cursor-pointer transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        
        {/* Trending indicator */}
        {image.trending > 5 && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Trending
          </div>
        )}

        {/* View overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-3">
            <Eye className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{image.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{image.description}</p>
        
        {/* Tags */}
        <div className="flex gap-2 mb-4">
          {image.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleLike(image.id, image)}
              className={`flex items-center gap-2 transition-colors ${
                likedImages.has(image.id) 
                  ? 'text-red-500' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${likedImages.has(image.id) ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{image.likes + (likedImages.has(image.id) ? 1 : 0)}</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{image.comments}</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-medium">{image.shares}</span>
            </button>
          </div>
          
          <button 
            onClick={() => handleSave(image.id, image)}
            className={`p-2 rounded-full transition-colors ${
              savedImages.has(image.id) 
                ? 'text-blue-500 bg-blue-50 dark:bg-blue-950/30' 
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${savedImages.has(image.id) ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 w-full">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Discover</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Personalized for you</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('feed')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'feed' 
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Feed
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                  Grid
                </button>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Feed Type Selector */}
          <div className="flex gap-2 mb-4">
            {[
              { id: 'personalized', label: 'For You', icon: Sparkles },
              { id: 'trending', label: 'Trending', icon: TrendingUp },
              { id: 'recent', label: 'Latest', icon: Clock }
            ].map(feed => {
              const Icon = feed.icon;
              return (
                <button
                  key={feed.id}
                  onClick={() => setFeedType(feed.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    feedType === feed.id 
                      ? 'bg-purple-500 text-white shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {feed.label}
                </button>
              );
            })}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">Categories</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategories(['all'])}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                    selectedCategories.includes('all') 
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  All
                </button>
                {categories.map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        if (selectedCategories.includes(category.id)) {
                          setSelectedCategories(prev => prev.filter(id => id !== category.id));
                        } else {
                          setSelectedCategories(prev => [...prev.filter(id => id !== 'all'), category.id]);
                        }
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                        selectedCategories.includes(category.id) 
                          ? `${category.color} text-white` 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-0 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
              <p className="text-gray-600 dark:text-gray-400">Curating personalized content...</p>
            </div>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto'
          }`}>
            {images.map((image, index) => (
              <ImageCard key={image.id} image={image} index={index} />
            ))}
          </div>
        )}

        {/* Load More */}
        {images.length > 0 && !loading && (
          <div className="text-center mt-8">
            <button
              onClick={fetchPersonalizedContent}
              className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-5 h-5" />
              Load More Content
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImprovedCollection;