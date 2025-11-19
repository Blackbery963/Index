// import React, { useState, useEffect } from 'react';
// import CollectionContent from './CollectionContent';
// import ImageCard from './ImageCard';
// import VideoCard from './VideoCard';
// import ArtworkCard from './ArtworkCard';
// import { fetchAppwriteMedia } from './AppwriteService';
// import DiaryCollection from '../Components/Diaryland/DiaryCollection';
// import Gateway from '../Components/Connecting/Connecting';
// import ArtResearchPage from '../Components/ResearchPaperPage';
// import ArtistDiscovery from '../Components/ArtistDiscovery';
// import MiniArtCategories from '../Components/Style/ArtCategories';
// import MiniArtisan from '../Components/Artisian/Artisian';
// import DailyChallenge from '../Components/DialyChallenge';  
// import FeaturedOutlinedImageCard from '../Components/Collections/ImageCard';


// const MainGalleryPage = ({ 
//   // Props from ImprovedCollection for integration
//   viewMode = 'feed',
//   onViewModeChange,
//   activeFilter = 'all', 
//   onFilterChange,
//   onMediaClick,
//   onLike,
//   onSave,
//   formatTimestamp,
//   hideHeader = false 
// }) => {
//   const [media, setMedia] = useState([]);
//   const [profiles, setProfiles] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasMore, setHasMore] = useState(false);
  
//   // Use props or local state
//   const [localViewMode, setLocalViewMode] = useState(viewMode);
//   const [localActiveFilter, setLocalActiveFilter] = useState(activeFilter);
//   const [likedImages, setLikedImages] = useState(new Set());
//   const [savedImages, setSavedImages] = useState(new Set());

//   // Use props if provided, otherwise use local handlers
//   const finalViewMode = onViewModeChange ? viewMode : localViewMode;
//   const finalActiveFilter = onFilterChange ? activeFilter : localActiveFilter;

//   // Filters configuration - match ImprovedCollection styling
//   const filters = [
//     { key: 'all', label: 'All Content' },
//     { key: 'images', label: 'Images' },
//     { key: 'videos', label: 'Videos' },
//     { key: 'for-sale', label: 'For Sale' }
//   ];

//   // View modes - match ImprovedCollection styling
//   const viewModes = [
//     { key: 'feed', label: 'Feed', icon: '📱' },
//     { key: 'grid', label: 'Grid', icon: '🟩' },
//     { key: 'collage', label: 'Collage', icon: '🎨' }
//   ];

//   // Load media data
//   const loadMedia = async (filter = 'all', page = 1, reset = true) => {
//     try {
//       if (reset) {
//         setLoading(true);
//         setCurrentPage(1);
//       } else {
//         setLoadingMore(true);
//       }

//       const result = await fetchAppwriteMedia(filter, page, {
//         pageSize: 12
//       });

//       if (reset) {
//         setMedia(result.media);
//       } else {
//         // Prevent duplicates by checking IDs
//         const newMedia = result.media.filter(newItem => 
//           !media.some(existingItem => existingItem.id === newItem.id)
//         );
//         setMedia(prev => [...prev, ...newMedia]);
//       }

//       setProfiles(prev => ({ ...prev, ...result.profiles }));
//       setHasMore(result.pagination?.hasMore || false);
//       setError(null);

//     } catch (err) {
//       console.error('Error loading media:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   };

//   // Load initial data
//   useEffect(() => {
//     loadMedia(finalActiveFilter, 1, true);
//   }, [finalActiveFilter]);

//   // Handle filter change
//   const handleFilterChange = (filter) => {
//     if (onFilterChange) {
//       onFilterChange(filter);
//     } else {
//       setLocalActiveFilter(filter);
//     }
//     setCurrentPage(1);
//   };

//   // Handle view mode change
//   const handleViewModeChange = (mode) => {
//     if (onViewModeChange) {
//       onViewModeChange(mode);
//     } else {
//       setLocalViewMode(mode);
//     }
//   };

//   // Manual load more
//   const handleLoadMore = () => {
//     if (!loadingMore && hasMore) {
//       const nextPage = currentPage + 1;
//       setCurrentPage(nextPage);
//       loadMedia(finalActiveFilter, nextPage, false);
//     }
//   };

//   // Handle like
//   const handleLike = (mediaId, mediaItem) => {
//     if (onLike) {
//       onLike(mediaId, mediaItem);
//     } else {
//       setLikedImages(prev => {
//         const newSet = new Set(prev);
//         if (newSet.has(mediaId)) {
//           newSet.delete(mediaId);
//         } else {
//           newSet.add(mediaId);
//         }
//         return newSet;
//       });
//     }
//   };

//   // Handle save
//   const handleSave = (mediaId, mediaItem) => {
//     if (onSave) {
//       onSave(mediaId, mediaItem);
//     } else {
//       setSavedImages(prev => {
//         const newSet = new Set(prev);
//         if (newSet.has(mediaId)) {
//           newSet.delete(mediaId);
//         } else {
//           newSet.add(mediaId);
//         }
//         return newSet;
//       });
//     }
//   };

//   // Handle media click
//   const handleMediaClick = (mediaItem) => {
//     if (onMediaClick) {
//       onMediaClick(mediaItem);
//     } else {
//       console.log('Media item clicked:', mediaItem);
//     }
//   };

//   // Format timestamp - use prop or default
//   const finalFormatTimestamp = formatTimestamp || ((timestamp) => {
//     if (!timestamp) return 'Recently';
    
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffInHours = (now - date) / (1000 * 60 * 60);
    
//     if (diffInHours < 1) return 'Just now';
//     if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
//     if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
//     return date.toLocaleDateString();
//   });

//   // Render appropriate card based on media type
//   const renderContentItem = (item) => {
//     const enhancedItem = {
//       ...item,
//       artist: profiles[item.userId]?.name || 'Unknown Artist',
//       profileImage: profiles[item.userId]?.profileImage
//     };

//     if (item.category === 'video') {
//       return (
//         <VideoCard
//           video={enhancedItem}
//           onVideoClick={handleMediaClick}
//           likedVideos={likedImages}
//           savedVideos={savedImages}
//           onLike={handleLike}
//           onSave={handleSave}
//           formatTimestamp={finalFormatTimestamp}
//           viewMode={finalViewMode}
//         />
//       );
//     } else if (item.category === 'for-sale') {
//       return (
//         <ArtworkCard
//           artwork={enhancedItem}
//           onArtworkClick={handleMediaClick}
//           likedArtworks={likedImages}
//           savedArtworks={savedImages}
//           onLike={handleLike}
//           onSave={handleSave}
//           formatTimestamp={finalFormatTimestamp}
//           viewMode={finalViewMode}
//         />
//       );
//     } else {
//       return (
//         <ImageCard
//           image={enhancedItem}
//           onImageClick={handleMediaClick}
//           likedImages={likedImages}
//           savedImages={savedImages}
//           onLike={handleLike}
//           onSave={handleSave}
//           formatTimestamp={finalFormatTimestamp}
//           viewMode={finalViewMode}
//         />
//       );
//     }
//   };

//   if ((onFilterChange && onViewModeChange) || hideHeader) {
//     return (
//       <CollectionContent
//         error={error}
//         loading={loading}
//         images={media}
//         manualContent={[]}
//         mixedContent={media}
//         viewMode={finalViewMode}
//         hasMore={hasMore}
//         isLoadingMore={loadingMore}
//         handleLoadMore={handleLoadMore}
//         renderContentItem={renderContentItem}
//         lastElementRef={null}
//       />
//     );
//   }

//   // Standalone version with header
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-[#000705] mt-4 overflow-visible">
//       <div className="w-full max-w-7xl mx-auto">
//         {/* Header - Only show when used standalone */}
//         <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
//           <div className="px-4 py-4">
//             {/* Filter Tabs */}
//             <div className="flex flex-wrap gap-2 mb-4">
//               {filters.map(filter => (
//                 <button
//                   key={filter.key}
//                   onClick={() => handleFilterChange(filter.key)}
//                   className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
//                     finalActiveFilter === filter.key
//                       ? 'bg-purple-500 text-white shadow-lg'
//                       : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
//                   }`}
//                 >
//                   {filter.label}
//                 </button>
//               ))}
//             </div>

//             {/* View Mode Toggle */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 {viewModes.map(mode => (
//                   <button
//                     key={mode.key}
//                     onClick={() => handleViewModeChange(mode.key)}
//                     className={`p-2 rounded-lg text-sm transition-all ${
//                       finalViewMode === mode.key
//                         ? 'bg-blue-500 text-white'
//                         : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
//                     }`}
//                     title={mode.label}
//                   >
//                     {mode.icon}
//                   </button>
//                 ))}
//               </div>

//               {/* Stats */}
//               {!loading && (
//                 <div className="text-sm text-gray-500 dark:text-gray-400">
//                   {media.length} items • Page {currentPage}
//                   {hasMore && ' • More available'}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         {/* for appwrite */}
//         <CollectionContent
//           error={error}
//           loading={loading}
//           images={media}
//           manualContent={[]}
//           mixedContent={media}
//           viewMode={finalViewMode}
//           hasMore={hasMore}
//           isLoadingMore={loadingMore}
//           handleLoadMore={handleLoadMore}
//           renderContentItem={renderContentItem}
//           lastElementRef={null}
//         />
       

//       </div>
//     </div>
//   );
// };

// export default MainGalleryPage;
