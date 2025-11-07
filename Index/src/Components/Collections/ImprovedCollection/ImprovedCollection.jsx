// // // import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// // // import { useCollection } from "../useCollection";
// // // import { useMixedContent } from './useMixedContent';
// // // import CollectionHeader from './CollectionHeader';
// // // import CollectionContent from './CollectionContent';
// // // import ArtworkCard from "../../../FrontGallery/ArtworkCard";
// // // import ImageCard from "../../../FrontGallery/ImageCard";
// // // import VideoCard from "../../../FrontGallery/VideoCard";
// // // import ImageContentRenderer from './ContentRenderers/ImageContentRenderer';
// // // import MixedContentRenderer from './ContentRenderers/MixedContentRenderer';
// // // import { fetchAppwriteMedia } from "../../../FrontGallery/AppwriteService";
// // // import MainGalleryPage from "../../../FrontGallery/MainGalleryPage";

// // // const PERSISTENT_STORAGE_KEY = 'improved-collection-state';

// // // const ImprovedCollection = () => {
// // //   const {
// // //     images,
// // //     loading,
// // //     error,
// // //     hasMore,
// // //     feedType,
// // //     setFeedType,
// // //     selectedCategories,
// // //     setSelectedCategories,
// // //     likedImages,
// // //     savedImages,
// // //     categories,
// // //     loadMore,
// // //     handleLike,
// // //     handleSave,
// // //     formatTimestamp
// // //   } = useCollection();

// // //   const [showFilters, setShowFilters] = useState(false);
// // //   const [viewMode, setViewMode] = useState('feed');
// // //   const [selectedImage, setSelectedImage] = useState(null);
// // //   const [selectedCollage, setSelectedCollage] = useState(null);
// // //   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
// // //   const [isLoadingMore, setIsLoadingMore] = useState(false);
  
// // //   // Appwrite gallery state
// // //   const [galleryMedia, setGalleryMedia] = useState([]);
// // //   const [galleryProfiles, setGalleryProfiles] = useState({});
// // //   const [galleryLoading, setGalleryLoading] = useState(true);
// // //   const [galleryError, setGalleryError] = useState(null);
// // //   const [galleryHasMore, setGalleryHasMore] = useState(false);
// // //   const [galleryLoadingMore, setGalleryLoadingMore] = useState(false);
// // //   const [galleryPage, setGalleryPage] = useState(1);
  
// // //   // Active filter for both systems
// // //   const [activeFilter, setActiveFilter] = useState('all');
  
// // //   // Persistent state
// // //   const [localState, setLocalState] = useState(() => {
// // //     const saved = typeof window !== 'undefined' ? localStorage.getItem(PERSISTENT_STORAGE_KEY) : null;
// // //     return saved ? JSON.parse(saved) : {
// // //       likedProducts: [],
// // //       savedProducts: [],
// // //       followedArtists: [],
// // //       scrollPosition: 0,
// // //       loadedContentCount: 0
// // //     };
// // //   });

// // //   const [manualContent, setManualContent] = useState([]);
// // //   const containerRef = useRef(null);
// // //   const lastElementRef = useRef(null);

// // //   // Load Appwrite gallery content
// // //   useEffect(() => {
// // //     const loadGalleryContent = async () => {
// // //       try {
// // //         setGalleryLoading(true);
// // //         setGalleryError(null);
// // //         const result = await fetchAppwriteMedia(activeFilter, 1, {
// // //           pageSize: 12
// // //         });
        
// // //         setGalleryMedia(result.media);
// // //         setGalleryProfiles(result.profiles);
// // //         setGalleryHasMore(result.pagination?.hasMore || false);
// // //         setGalleryPage(1);
// // //       } catch (err) {
// // //         console.error('Error loading gallery content:', err);
// // //         setGalleryError(err.message);
// // //       } finally {
// // //         setGalleryLoading(false);
// // //       }
// // //     };

// // //     loadGalleryContent();
// // //   }, [activeFilter]);

// // //   // Load more gallery content
// // //   const handleGalleryLoadMore = async () => {
// // //     if (galleryLoadingMore || !galleryHasMore) return;
    
// // //     try {
// // //       setGalleryLoadingMore(true);
// // //       const nextPage = galleryPage + 1;
// // //       const result = await fetchAppwriteMedia(activeFilter, nextPage, {
// // //         pageSize: 12
// // //       });
      
// // //       setGalleryMedia(prev => [...prev, ...result.media]);
// // //       setGalleryProfiles(prev => ({ ...prev, ...result.profiles }));
// // //       setGalleryHasMore(result.pagination?.hasMore || false);
// // //       setGalleryPage(nextPage);
// // //     } catch (err) {
// // //       console.error('Error loading more gallery content:', err);
// // //     } finally {
// // //       setGalleryLoadingMore(false);
// // //     }
// // //   };

// // //   // Custom hooks for API content
// // //   const { mixedContent, generateStandaloneContent } = useMixedContent(images, viewMode, manualContent);

// // //   // Initialize manual content
// // //   useEffect(() => {
// // //     if (manualContent.length === 0) {
// // //       setManualContent(generateStandaloneContent());
// // //     }
// // //   }, [generateStandaloneContent, manualContent.length]);

// // //   // Convert arrays to Sets for efficient lookups
// // //   const likedProductsSet = new Set(localState.likedProducts);
// // //   const savedProductsSet = new Set(localState.savedProducts);
// // //   const followedArtistsSet = new Set(localState.followedArtists);

// // //   // Handlers
// // //   const handleProductLike = useCallback((productId) => {
// // //     setLocalState(prev => {
// // //       const newLiked = prev.likedProducts.includes(productId)
// // //         ? prev.likedProducts.filter(id => id !== productId)
// // //         : [...prev.likedProducts, productId];
// // //       return { ...prev, likedProducts: newLiked };
// // //     });
// // //   }, []);

// // //   const handleProductSave = useCallback((productId) => {
// // //     setLocalState(prev => {
// // //       const newSaved = prev.savedProducts.includes(productId)
// // //         ? prev.savedProducts.filter(id => id !== productId)
// // //         : [...prev.savedProducts, productId];
// // //       return { ...prev, savedProducts: newSaved };
// // //     });
// // //   }, []);

// // //   const handleArtistFollow = useCallback((artistId) => {
// // //     setLocalState(prev => {
// // //       const newFollowed = prev.followedArtists.includes(artistId)
// // //         ? prev.followedArtists.filter(id => id !== artistId)
// // //         : [...prev.followedArtists, artistId];
// // //       return { ...prev, followedArtists: newFollowed };
// // //     });
// // //   }, []);

// // //   const handleFilterChange = useCallback((filter) => {
// // //     setActiveFilter(filter);
// // //   }, []);

// // //   const handleLoadMore = useCallback(async () => {
// // //     if (loading || !hasMore || isLoadingMore) return;
// // //     setIsLoadingMore(true);
// // //     await loadMore();
// // //     setIsLoadingMore(false);
// // //     setLocalState(prev => ({
// // //       ...prev,
// // //       loadedContentCount: prev.loadedContentCount + 1
// // //     }));
// // //   }, [loading, hasMore, isLoadingMore, loadMore]);

// // //   // Combined load more for both systems
// // //   const handleCombinedLoadMore = useCallback(async () => {
// // //     // Load more from both systems
// // //     await Promise.all([
// // //       handleGalleryLoadMore(),
// // //       handleLoadMore()
// // //     ]);
// // //   }, [handleGalleryLoadMore, handleLoadMore]);

// // //   // Create combined mixed content
// // //   const combinedMixedContent = useMemo(() => {
// // //     const content = [];
    
// // //     // Add Appwrite gallery media first
// // //     galleryMedia.forEach(mediaItem => {
// // //       content.push({
// // //         ...mediaItem,
// // //         id: `appwrite-${mediaItem.id}`,
// // //         source: 'appwrite',
// // //         priority: 1
// // //       });
// // //     });

// // //     // Add API content
// // //     content.push(...mixedContent);

// // //     return content;
// // //   }, [galleryMedia, mixedContent]);

// // //   // Combined loading states
// // //   const combinedLoading = loading || galleryLoading;
// // //   const combinedLoadingMore = isLoadingMore || galleryLoadingMore;
// // //   const combinedHasMore = hasMore || galleryHasMore;
// // //   const combinedError = error || galleryError;

// // //   // Single render function for all content types
// // //   const renderContentItem = useCallback((item) => {
// // //     // Appwrite gallery content
// // //     if (item.source === 'appwrite') {
// // //       const enhancedItem = {
// // //         ...item,
// // //         artist: galleryProfiles[item.userId]?.name || 'Unknown Artist',
// // //         profileImage: galleryProfiles[item.userId]?.profileImage
// // //       };

// // //       if (item.category === 'video') {
// // //         return (
// // //           <VideoCard
// // //           className="mt-4"
// // //             video={enhancedItem}
// // //             onVideoClick={(video) => console.log('Video clicked:', video)}
// // //             likedVideos={likedImages}
// // //             savedVideos={savedImages}
// // //             onLike={handleLike}
// // //             onSave={handleSave}
// // //             formatTimestamp={formatTimestamp}
// // //             viewMode={viewMode}
// // //           />
// // //         );
// // //       } else if (item.category === 'for-sale') {
// // //         return (
// // //           <ArtworkCard
// // //             className="mt-4"
// // //             artwork={enhancedItem}
// // //             onArtworkClick={(artwork) => console.log('Artwork clicked:', artwork)}
// // //             likedArtworks={likedImages}
// // //             savedArtworks={savedImages}
// // //             onLike={handleLike}
// // //             onSave={handleSave}
// // //             formatTimestamp={formatTimestamp}
// // //             viewMode={viewMode}
// // //           />
// // //         );
// // //       } else {
// // //         return (
// // //           <ImageCard
// // //             image={enhancedItem}
// // //             onImageClick={setSelectedImage}
// // //             likedImages={likedImages}
// // //             savedImages={savedImages}
// // //             onLike={handleLike}
// // //             onSave={handleSave}
// // //             formatTimestamp={formatTimestamp}
// // //             viewMode={viewMode}
// // //           />
// // //         );
// // //       }
// // //     }

// // //     // API image-related content
// // //     if (item.type === 'image' || item.type === 'collage') {
// // //       return (
// // //         <ImageContentRenderer
// // //           item={item}
// // //           viewMode={viewMode}
// // //           likedImages={likedImages}
// // //           savedImages={savedImages}
// // //           categories={categories}
// // //           handleLike={handleLike}
// // //           handleSave={handleSave}
// // //           formatTimestamp={formatTimestamp}
// // //           onImageClick={setSelectedImage}
// // //           onCollageClick={(image, images) => {
// // //             setSelectedCollage(images);
// // //             setCurrentSlideIndex(images.indexOf(image));
// // //           }}
// // //         />
// // //       );
// // //     }

// // //     // Mixed content
// // //     return (
// // //       <MixedContentRenderer
// // //         item={item}
// // //         viewMode={viewMode}
// // //         likedProducts={likedProductsSet}
// // //         savedProducts={savedProductsSet}
// // //         followedArtists={followedArtistsSet}
// // //         handleProductLike={handleProductLike}
// // //         handleProductSave={handleProductSave}
// // //         handleArtistFollow={handleArtistFollow}
// // //         formatTimestamp={formatTimestamp}
// // //       />
// // //     );
// // //   }, [
// // //     viewMode, likedImages, savedImages, categories, handleLike, handleSave, 
// // //     handleProductLike, handleProductSave, handleArtistFollow, formatTimestamp,
// // //     galleryProfiles
// // //   ]);

// // //   // Persistence effects
// // //   useEffect(() => {
// // //     if (typeof window !== 'undefined') {
// // //       localStorage.setItem(PERSISTENT_STORAGE_KEY, JSON.stringify(localState));
// // //     }
// // //   }, [localState]);

// // //   useEffect(() => {
// // //     if (containerRef.current && localState.scrollPosition > 0) {
// // //       setTimeout(() => {
// // //         window.scrollTo(0, localState.scrollPosition);
// // //       }, 100);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     const handleBeforeUnload = () => {
// // //       if (typeof window !== 'undefined') {
// // //         setLocalState(prev => ({
// // //           ...prev,
// // //           scrollPosition: window.scrollY
// // //         }));
// // //       }
// // //     };
// // //     window.addEventListener('beforeunload', handleBeforeUnload);
// // //     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
// // //   }, []);

// // //   useEffect(() => {}, [])

// // //   // return (
// // //   //   <div className="min-h-screen bg-gray-100 dark:bg-[#000705]">
// // //   //     <div className="w-full max-w-7xl mx-auto" ref={containerRef}>
// // //   //       <CollectionHeader
// // //   //         viewMode={viewMode}
// // //   //         setViewMode={setViewMode}
// // //   //         feedType={feedType}
// // //   //         setFeedType={setFeedType}
// // //   //         showFilters={showFilters}
// // //   //         setShowFilters={setShowFilters}
// // //   //         categories={categories}
// // //   //         selectedCategories={selectedCategories}
// // //   //         setSelectedCategories={setSelectedCategories}
// // //   //         // Add gallery filters to header
// // //   //         activeFilter={activeFilter}
// // //   //         onFilterChange={handleFilterChange}
// // //   //         galleryFilters={[
// // //   //           { key: 'all', label: 'All Content' },
// // //   //           { key: 'images', label: 'Images' },
// // //   //           { key: 'videos', label: 'Videos' },
// // //   //           { key: 'for-sale', label: 'For Sale' }
// // //   //         ]}
// // //   //       />

// // //   //       {/* Single CollectionContent with combined data */}
// // //   //       <CollectionContent
// // //   //         error={combinedError}
// // //   //         loading={combinedLoading}
// // //   //         images={combinedMixedContent} // Use combined content
// // //   //         manualContent={manualContent}
// // //   //         mixedContent={combinedMixedContent}
// // //   //         viewMode={viewMode}
// // //   //         hasMore={combinedHasMore}
// // //   //         isLoadingMore={combinedLoadingMore}
// // //   //         handleLoadMore={handleCombinedLoadMore}
// // //   //         renderContentItem={renderContentItem}
// // //   //         lastElementRef={lastElementRef}
// // //   //       />
// // //   //     </div>
// // //   //   </div>
// // //   // );
// // //   // In your ImprovedCollection return statement, replace this part:
// // // return (
// // //   <div className="min-h-screen bg-gray-100 dark:bg-[#000705]">
// // //     <div className="w-full max-w-7xl mx-auto" ref={containerRef}>
// // //       <CollectionHeader
// // //         viewMode={viewMode}
// // //           setViewMode={setViewMode}
// // //           feedType={feedType}
// // //           setFeedType={setFeedType}
// // //           showFilters={showFilters}
// // //           setShowFilters={setShowFilters}
// // //           categories={categories}
// // //           selectedCategories={selectedCategories}
// // //           setSelectedCategories={setSelectedCategories}
// // //           // Add gallery filters to header
// // //           activeFilter={activeFilter}
// // //           onFilterChange={handleFilterChange}
// // //           galleryFilters={[
// // //             { key: 'all', label: 'All Content' },
// // //             { key: 'images', label: 'Images' },
// // //             { key: 'videos', label: 'Videos' },
// // //             { key: 'for-sale', label: 'For Sale' }
// // //           ]}
// // //         // ... other props
// // //       />

// // //       {/* Gallery Section */}
// // //       <section className="mb-8">
// // //         <div className="px-4 mb-4">
// // //           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
// // //             Gallery
// // //           </h2>
// // //           <p className="text-gray-600 dark:text-gray-400">
// // //             Featured artwork from our community
// // //           </p>
// // //         </div>
        
// // //         {/* Simplified MainGalleryPage integration */}
// // //         <div className="bg-gray-100 dark:bg-[#000705] rounded-lg ">
// // //           <MainGalleryPage 
// // //             activeFilter={activeFilter}
// // //             onFilterChange={handleFilterChange}
// // //             viewMode={viewMode}
// // //             onViewModeChange={setViewMode}
// // //             // Hide header since we have our own
// // //             hideHeader={true}
// // //           />
// // //         </div>
// // //       </section>

// // //       {/* Mixed Content Section */}
// // //       <section>
// // //         <div className="px-4 mb-4">
// // //           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
// // //             Discover More
// // //           </h2>
// // //           <p className="text-gray-600 dark:text-gray-400">
// // //             Artists, communities, and creative content
// // //           </p>
// // //         </div>
        
// // //         <CollectionContent
// // //           error={error}
// // //           loading={loading}
// // //           images={images}
// // //           manualContent={manualContent}
// // //           mixedContent={mixedContent}
// // //           viewMode={viewMode}
// // //           hasMore={hasMore}
// // //           isLoadingMore={isLoadingMore}
// // //           handleLoadMore={handleLoadMore}
// // //           renderContentItem={renderContentItem}
// // //           lastElementRef={lastElementRef}
// // //         />
// // //       </section>
// // //     </div>
// // //   </div>
// // // );
// // // };

// // // export default ImprovedCollection;

// // import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// // import { useCollection } from "../useCollection";
// // import { useMixedContent } from './useMixedContent';
// // import CollectionHeader from './CollectionHeader';
// // import CollectionContent from './CollectionContent';
// // import ArtworkCard from "../../../FrontGallery/ArtworkCard";
// // import ImageCard from "../../../FrontGallery/ImageCard";
// // import VideoCard from "../../../FrontGallery/VideoCard";
// // import ImageContentRenderer from './ContentRenderers/ImageContentRenderer';
// // import MixedContentRenderer from './ContentRenderers/MixedContentRenderer';
// // import { fetchAppwriteMedia } from "../../../FrontGallery/AppwriteService";

// // const PERSISTENT_STORAGE_KEY = 'improved-collection-state';

// // const ImprovedCollection = () => {
// //   const {
// //     images,
// //     loading,
// //     error,
// //     hasMore,
// //     feedType,
// //     setFeedType,
// //     selectedCategories,
// //     setSelectedCategories,
// //     likedImages,
// //     savedImages,
// //     categories,
// //     loadMore,
// //     handleLike,
// //     handleSave,
// //     formatTimestamp
// //   } = useCollection();

// //   const [showFilters, setShowFilters] = useState(false);
// //   const [viewMode, setViewMode] = useState('feed');
// //   const [selectedImage, setSelectedImage] = useState(null);
// //   const [selectedCollage, setSelectedCollage] = useState(null);
// //   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
// //   const [isLoadingMore, setIsLoadingMore] = useState(false);
  
// //   // Appwrite gallery state
// //   const [galleryMedia, setGalleryMedia] = useState([]);
// //   const [galleryProfiles, setGalleryProfiles] = useState({});
// //   const [galleryLoading, setGalleryLoading] = useState(true);
// //   const [galleryError, setGalleryError] = useState(null);
// //   const [galleryHasMore, setGalleryHasMore] = useState(false);
// //   const [galleryLoadingMore, setGalleryLoadingMore] = useState(false);
// //   const [galleryPage, setGalleryPage] = useState(1);
  
// //   // Separate filters for different content types
// //   const [galleryFilter, setGalleryFilter] = useState('all');
// //   const [contentFilter, setContentFilter] = useState('all');
  
// //   // Persistent state
// //   const [localState, setLocalState] = useState(() => {
// //     const saved = typeof window !== 'undefined' ? localStorage.getItem(PERSISTENT_STORAGE_KEY) : null;
// //     return saved ? JSON.parse(saved) : {
// //       likedProducts: [],
// //       savedProducts: [],
// //       followedArtists: [],
// //       scrollPosition: 0,
// //       loadedContentCount: 0
// //     };
// //   });

// //   const [manualContent, setManualContent] = useState([]);
// //   const containerRef = useRef(null);
// //   const lastElementRef = useRef(null);

// //   // Load Appwrite gallery content
// //   useEffect(() => {
// //     const loadGalleryContent = async () => {
// //       try {
// //         setGalleryLoading(true);
// //         setGalleryError(null);
// //         const result = await fetchAppwriteMedia(galleryFilter, 1, {
// //           pageSize: 20 // Increased for better content density
// //         });
        
// //         setGalleryMedia(result.media);
// //         setGalleryProfiles(result.profiles);
// //         setGalleryHasMore(result.pagination?.hasMore || false);
// //         setGalleryPage(1);
// //       } catch (err) {
// //         console.error('Error loading gallery content:', err);
// //         setGalleryError(err.message);
// //       } finally {
// //         setGalleryLoading(false);
// //       }
// //     };

// //     loadGalleryContent();
// //   }, [galleryFilter]);

// //   // Load more gallery content
// //   const handleGalleryLoadMore = async () => {
// //     if (galleryLoadingMore || !galleryHasMore) return;
    
// //     try {
// //       setGalleryLoadingMore(true);
// //       const nextPage = galleryPage + 1;
// //       const result = await fetchAppwriteMedia(galleryFilter, nextPage, {
// //         pageSize: 12
// //       });
      
// //       setGalleryMedia(prev => [...prev, ...result.media]);
// //       setGalleryProfiles(prev => ({ ...prev, ...result.profiles }));
// //       setGalleryHasMore(result.pagination?.hasMore || false);
// //       setGalleryPage(nextPage);
// //     } catch (err) {
// //       console.error('Error loading more gallery content:', err);
// //     } finally {
// //       setGalleryLoadingMore(false);
// //     }
// //   };

// //   // Custom hooks for API content
// //   const { mixedContent, generateStandaloneContent } = useMixedContent(images, viewMode, manualContent);

// //   // Initialize manual content
// //   useEffect(() => {
// //     if (manualContent.length === 0) {
// //       setManualContent(generateStandaloneContent());
// //     }
// //   }, [generateStandaloneContent, manualContent.length]);

// //   // Convert arrays to Sets for efficient lookups
// //   const likedProductsSet = new Set(localState.likedProducts);
// //   const savedProductsSet = new Set(localState.savedProducts);
// //   const followedArtistsSet = new Set(localState.followedArtists);

// //   // Handlers
// //   const handleProductLike = useCallback((productId) => {
// //     setLocalState(prev => {
// //       const newLiked = prev.likedProducts.includes(productId)
// //         ? prev.likedProducts.filter(id => id !== productId)
// //         : [...prev.likedProducts, productId];
// //       return { ...prev, likedProducts: newLiked };
// //     });
// //   }, []);

// //   const handleProductSave = useCallback((productId) => {
// //     setLocalState(prev => {
// //       const newSaved = prev.savedProducts.includes(productId)
// //         ? prev.savedProducts.filter(id => id !== productId)
// //         : [...prev.savedProducts, productId];
// //       return { ...prev, savedProducts: newSaved };
// //     });
// //   }, []);

// //   const handleArtistFollow = useCallback((artistId) => {
// //     setLocalState(prev => {
// //       const newFollowed = prev.followedArtists.includes(artistId)
// //         ? prev.followedArtists.filter(id => id !== artistId)
// //         : [...prev.followedArtists, artistId];
// //       return { ...prev, followedArtists: newFollowed };
// //     });
// //   }, []);

// //   const handleGalleryFilterChange = useCallback((filter) => {
// //     setGalleryFilter(filter);
// //   }, []);

// //   const handleContentFilterChange = useCallback((filter) => {
// //     setContentFilter(filter);
// //   }, []);

// //   const handleLoadMore = useCallback(async () => {
// //     if (loading || !hasMore || isLoadingMore) return;
// //     setIsLoadingMore(true);
// //     await loadMore();
// //     setIsLoadingMore(false);
// //     setLocalState(prev => ({
// //       ...prev,
// //       loadedContentCount: prev.loadedContentCount + 1
// //     }));
// //   }, [loading, hasMore, isLoadingMore, loadMore]);

// //   // Create enhanced mixed content with better organization
// //   const enhancedMixedContent = useMemo(() => {
// //     const content = [];
    
// //     // Add Gallery Section Header (subtle separation)
// //     if (galleryMedia.length > 0) {
// //       content.push({
// //         id: 'gallery-section-header',
// //         type: 'section-header',
// //         title: 'Featured Gallery',
// //         subtitle: 'Community artwork & creations',
// //         priority: 1,
// //         isSectionHeader: true
// //       });
// //     }

// //     // Add Appwrite gallery media
// //     galleryMedia.forEach(mediaItem => {
// //       content.push({
// //         ...mediaItem,
// //         id: `gallery-${mediaItem.id}`,
// //         source: 'appwrite',
// //         priority: 2,
// //         isGalleryContent: true
// //       });
// //     });

// //     // Add Mixed Content Section Header
// //     if (mixedContent.length > 0) {
// //       content.push({
// //         id: 'mixed-content-section-header',
// //         type: 'section-header',
// //         title: 'Discover More',
// //         subtitle: 'Artists, communities & creative content',
// //         priority: 3,
// //         isSectionHeader: true
// //       });
// //     }

// //     // Add API mixed content
// //     content.push(...mixedContent.map(item => ({
// //       ...item,
// //       priority: 4,
// //       isMixedContent: true
// //     })));

// //     return content;
// //   }, [galleryMedia, mixedContent]);

// //   // Combined loading states
// //   const combinedLoading = loading && galleryLoading;
// //   const combinedLoadingMore = isLoadingMore || galleryLoadingMore;
// //   const combinedHasMore = hasMore || galleryHasMore;
// //   const combinedError = error || galleryError;

// //   // Enhanced render function with section headers
// //   const renderContentItem = useCallback((item) => {
// //     // Section headers
// //     if (item.isSectionHeader) {
// //       return (
// //         <div className="col-span-full py-6 border-b border-gray-200 dark:border-gray-700 mb-2">
// //           <div className="text-center">
// //             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
// //               {item.title}
// //             </h2>
// //             <p className="text-gray-600 dark:text-gray-400 text-sm">
// //               {item.subtitle}
// //             </p>
// //           </div>
// //         </div>
// //       );
// //     }

// //     // Appwrite gallery content
// //     if (item.source === 'appwrite') {
// //       const enhancedItem = {
// //         ...item,
// //         artist: galleryProfiles[item.userId]?.name || 'Unknown Artist',
// //         profileImage: galleryProfiles[item.userId]?.profileImage
// //       };

// //       if (item.category === 'video') {
// //         return (
// //           <VideoCard
// //             video={enhancedItem}
// //             onVideoClick={(video) => console.log('Video clicked:', video)}
// //             likedVideos={likedImages}
// //             savedVideos={savedImages}
// //             onLike={handleLike}
// //             onSave={handleSave}
// //             formatTimestamp={formatTimestamp}
// //             viewMode={viewMode}
// //           />
// //         );
// //       } else if (item.category === 'for-sale') {
// //         return (
// //           <ArtworkCard
// //             artwork={enhancedItem}
// //             onArtworkClick={(artwork) => console.log('Artwork clicked:', artwork)}
// //             likedArtworks={likedImages}
// //             savedArtworks={savedImages}
// //             onLike={handleLike}
// //             onSave={handleSave}
// //             formatTimestamp={formatTimestamp}
// //             viewMode={viewMode}
// //           />
// //         );
// //       } else {
// //         return (
// //           <ImageCard
// //             image={enhancedItem}
// //             onImageClick={setSelectedImage}
// //             likedImages={likedImages}
// //             savedImages={savedImages}
// //             onLike={handleLike}
// //             onSave={handleSave}
// //             formatTimestamp={formatTimestamp}
// //             viewMode={viewMode}
// //           />
// //         );
// //       }
// //     }

// //     // API image-related content
// //     if (item.type === 'image' || item.type === 'collage') {
// //       return (
// //         <ImageContentRenderer
// //           item={item}
// //           viewMode={viewMode}
// //           likedImages={likedImages}
// //           savedImages={savedImages}
// //           categories={categories}
// //           handleLike={handleLike}
// //           handleSave={handleSave}
// //           formatTimestamp={formatTimestamp}
// //           onImageClick={setSelectedImage}
// //           onCollageClick={(image, images) => {
// //             setSelectedCollage(images);
// //             setCurrentSlideIndex(images.indexOf(image));
// //           }}
// //         />
// //       );
// //     }

// //     // Mixed content
// //     return (
// //       <MixedContentRenderer
// //         item={item}
// //         viewMode={viewMode}
// //         likedProducts={likedProductsSet}
// //         savedProducts={savedProductsSet}
// //         followedArtists={followedArtistsSet}
// //         handleProductLike={handleProductLike}
// //         handleProductSave={handleProductSave}
// //         handleArtistFollow={handleArtistFollow}
// //         formatTimestamp={formatTimestamp}
// //       />
// //     );
// //   }, [
// //     viewMode, likedImages, savedImages, categories, handleLike, handleSave, 
// //     handleProductLike, handleProductSave, handleArtistFollow, formatTimestamp,
// //     galleryProfiles
// //   ]);

// //   // Combined load more function
// //   const handleCombinedLoadMore = useCallback(async () => {
// //     // Load more from both systems sequentially to avoid race conditions
// //     if (galleryHasMore) {
// //       await handleGalleryLoadMore();
// //     }
// //     if (hasMore && !loading) {
// //       await handleLoadMore();
// //     }
// //   }, [galleryHasMore, hasMore, handleGalleryLoadMore, handleLoadMore, loading]);

// //   // Persistence effects
// //   useEffect(() => {
// //     if (typeof window !== 'undefined') {
// //       localStorage.setItem(PERSISTENT_STORAGE_KEY, JSON.stringify(localState));
// //     }
// //   }, [localState]);

// //   useEffect(() => {
// //     if (containerRef.current && localState.scrollPosition > 0) {
// //       setTimeout(() => {
// //         window.scrollTo(0, localState.scrollPosition);
// //       }, 100);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     const handleBeforeUnload = () => {
// //       if (typeof window !== 'undefined') {
// //         setLocalState(prev => ({
// //           ...prev,
// //           scrollPosition: window.scrollY
// //         }));
// //       }
// //     };
// //     window.addEventListener('beforeunload', handleBeforeUnload);
// //     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-gray-100 dark:bg-[#000705]">
// //       <div className="w-full max-w-7xl mx-auto" ref={containerRef}>
// //         <CollectionHeader
// //           viewMode={viewMode}
// //           setViewMode={setViewMode}
// //           feedType={feedType}
// //           setFeedType={setFeedType}
// //           showFilters={showFilters}
// //           setShowFilters={setShowFilters}
// //           categories={categories}
// //           selectedCategories={selectedCategories}
// //           setSelectedCategories={setSelectedCategories}
// //           // Enhanced header with dual filters
// //           galleryFilter={galleryFilter}
// //           onGalleryFilterChange={handleGalleryFilterChange}
// //           contentFilter={contentFilter}
// //           onContentFilterChange={handleContentFilterChange}
// //           galleryFilters={[
// //             { key: 'all', label: 'All Gallery' },
// //             { key: 'images', label: 'Gallery Images' },
// //             { key: 'videos', label: 'Gallery Videos' },
// //             { key: 'for-sale', label: 'Gallery For Sale' }
// //           ]}
// //           contentFilters={[
// //             { key: 'all', label: 'All Content' },
// //             { key: 'artists', label: 'Artists' },
// //             { key: 'communities', label: 'Communities' },
// //             { key: 'research', label: 'Research' }
// //           ]}
// //         />

// //         {/* Single seamless CollectionContent with enhanced organization */}
// //         <CollectionContent
// //           error={combinedError}
// //           loading={combinedLoading}
// //           images={enhancedMixedContent}
// //           manualContent={manualContent}
// //           mixedContent={enhancedMixedContent}
// //           viewMode={viewMode}
// //           hasMore={combinedHasMore}
// //           isLoadingMore={combinedLoadingMore}
// //           handleLoadMore={handleCombinedLoadMore}
// //           renderContentItem={renderContentItem}
// //           lastElementRef={lastElementRef}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default ImprovedCollection;

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useCollection } from "../useCollection";
import { useMixedContent } from './useMixedContent';
import CollectionHeader from './CollectionHeader';
import CollectionContent from './CollectionContent';
import ArtworkCard from "../../../FrontGallery/ArtworkCard";
import ImageCard from "../../../FrontGallery/ImageCard";
import VideoCard from "../../../FrontGallery/VideoCard";
import ImageContentRenderer from './ContentRenderers/ImageContentRenderer';
import MixedContentRenderer from './ContentRenderers/MixedContentRenderer';
import { fetchAppwriteMedia } from "../../../FrontGallery/AppwriteService";

const STORAGE_KEY = 'collection-state';

const ImprovedCollection = () => {
  const {
    images,
    loading,
    error,
    hasMore,
    feedType,
    setFeedType,
    selectedCategories,
    setSelectedCategories,
    likedImages,
    savedImages,
    categories,
    loadMore,
    handleLike,
    handleSave,
    formatTimestamp
  } = useCollection();

  // UI State
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('feed');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCollage, setSelectedCollage] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Gallery State
  const [galleryMedia, setGalleryMedia] = useState([]);
  const [galleryProfiles, setGalleryProfiles] = useState({});
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryHasMore, setGalleryHasMore] = useState(false);
  const [galleryPage, setGalleryPage] = useState(1);
  
  // Single unified filter
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Persistent interactions
  const [interactions, setInteractions] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return saved ? JSON.parse(saved) : {
      likedProducts: [],
      savedProducts: [],
      followedArtists: []
    };
  });

  const [manualContent, setManualContent] = useState([]);
  const containerRef = useRef(null);

  // Load gallery content
  useEffect(() => {
    const loadGallery = async () => {
      try {
        setGalleryLoading(true);
        const result = await fetchAppwriteMedia(activeFilter, 1, { pageSize: 15 });
        setGalleryMedia(result.media);
        setGalleryProfiles(result.profiles);
        setGalleryHasMore(result.pagination?.hasMore || false);
        setGalleryPage(1);
      } catch (err) {
        console.error('Gallery load error:', err);
      } finally {
        setGalleryLoading(false);
      }
    };
    loadGallery();
  }, [activeFilter]);

  // Load more gallery
  const loadMoreGallery = useCallback(async () => {
    if (!galleryHasMore) return;
    try {
      const nextPage = galleryPage + 1;
      const result = await fetchAppwriteMedia(activeFilter, nextPage, { pageSize: 12 });
      setGalleryMedia(prev => [...prev, ...result.media]);
      setGalleryProfiles(prev => ({ ...prev, ...result.profiles }));
      setGalleryHasMore(result.pagination?.hasMore || false);
      setGalleryPage(nextPage);
    } catch (err) {
      console.error('Load more error:', err);
    }
  }, [galleryHasMore, galleryPage, activeFilter]);

  // Mixed content hook
  const { mixedContent, generateStandaloneContent } = useMixedContent(images, viewMode, manualContent);

  useEffect(() => {
    if (manualContent.length === 0) {
      setManualContent(generateStandaloneContent());
    }
  }, [generateStandaloneContent, manualContent.length]);

  // Memoized sets for performance
  const interactionSets = useMemo(() => ({
    liked: new Set(interactions.likedProducts),
    saved: new Set(interactions.savedProducts),
    followed: new Set(interactions.followedArtists)
  }), [interactions]);

  // Interaction handlers
  const toggleLike = useCallback((id) => {
    setInteractions(prev => ({
      ...prev,
      likedProducts: prev.likedProducts.includes(id)
        ? prev.likedProducts.filter(x => x !== id)
        : [...prev.likedProducts, id]
    }));
  }, []);

  const toggleSave = useCallback((id) => {
    setInteractions(prev => ({
      ...prev,
      savedProducts: prev.savedProducts.includes(id)
        ? prev.savedProducts.filter(x => x !== id)
        : [...prev.savedProducts, id]
    }));
  }, []);

  const toggleFollow = useCallback((id) => {
    setInteractions(prev => ({
      ...prev,
      followedArtists: prev.followedArtists.includes(id)
        ? prev.followedArtists.filter(x => x !== id)
        : [...prev.followedArtists, id]
    }));
  }, []);

  // Load more for API content
  const loadMoreContent = useCallback(async () => {
    if (loading || !hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    await loadMore();
    setIsLoadingMore(false);
  }, [loading, hasMore, isLoadingMore, loadMore]);

  // Unified content stream - simple interleaving
  const unifiedContent = useMemo(() => {
    const stream = [];
    const gallery = galleryMedia.map(item => ({ ...item, source: 'gallery' }));
    const content = mixedContent.map(item => ({ ...item, source: 'content' }));
    
    // Simple merge: alternate between gallery and content
    const maxLength = Math.max(gallery.length, content.length);
    for (let i = 0; i < maxLength; i++) {
      if (i < gallery.length) stream.push(gallery[i]);
      if (i < content.length) stream.push(content[i]);
    }
    
    return stream;
  }, [galleryMedia, mixedContent]);

  // Unified renderer
  const renderItem = useCallback((item) => {
    // Gallery items
    if (item.source === 'gallery') {
      const profile = galleryProfiles[item.userId] || {};
      const enhanced = {
        ...item,
        artist: profile.name || 'Unknown Artist',
        profileImage: profile.profileImage
      };

      if (item.category === 'video') {
        return (
          <VideoCard
            video={enhanced}
            onVideoClick={(v) => console.log('Video:', v)}
            likedVideos={likedImages}
            savedVideos={savedImages}
            onLike={handleLike}
            onSave={handleSave}
            formatTimestamp={formatTimestamp}
            viewMode={viewMode}
          />
        );
      }
      
      if (item.category === 'for-sale') {
        return (
          <ArtworkCard
            artwork={enhanced}
            onArtworkClick={(a) => console.log('Artwork:', a)}
            likedArtworks={likedImages}
            savedArtworks={savedImages}
            onLike={handleLike}
            onSave={handleSave}
            formatTimestamp={formatTimestamp}
            viewMode={viewMode}
          />
        );
      }
      
      return (
        <ImageCard
          image={enhanced}
          onImageClick={setSelectedImage}
          likedImages={likedImages}
          savedImages={savedImages}
          onLike={handleLike}
          onSave={handleSave}
          formatTimestamp={formatTimestamp}
          viewMode={viewMode}
        />
      );
    }

    // API image content
    if (item.type === 'image' || item.type === 'collage') {
      return (
        <ImageContentRenderer
          item={item}
          viewMode={viewMode}
          likedImages={likedImages}
          savedImages={savedImages}
          categories={categories}
          handleLike={handleLike}
          handleSave={handleSave}
          formatTimestamp={formatTimestamp}
          onImageClick={setSelectedImage}
          onCollageClick={(img, imgs) => {
            setSelectedCollage(imgs);
            setCurrentSlideIndex(imgs.indexOf(img));
          }}
        />
      );
    }

    // Other mixed content
    return (
      <MixedContentRenderer
        item={item}
        viewMode={viewMode}
        likedProducts={interactionSets.liked}
        savedProducts={interactionSets.saved}
        followedArtists={interactionSets.followed}
        handleProductLike={toggleLike}
        handleProductSave={toggleSave}
        handleArtistFollow={toggleFollow}
        formatTimestamp={formatTimestamp}
      />
    );
  }, [
    viewMode, likedImages, savedImages, categories, 
    handleLike, handleSave, formatTimestamp,
    galleryProfiles, interactionSets,
    toggleLike, toggleSave, toggleFollow
  ]);

  // Combined load more
  const loadMoreAll = useCallback(async () => {
    await Promise.all([
      loadMoreGallery(),
      loadMoreContent()
    ]);
  }, [loadMoreGallery, loadMoreContent]);

  // Save interactions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(interactions));
    }
  }, [interactions]);

  // Combined states
  const isLoading = loading && galleryLoading;
  // const isLoadingMore = isLoadingMore;
  const hasMoreContent = hasMore || galleryHasMore;
  const hasError = error;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#000705]">
      <div className="w-full max-w-7xl mx-auto" ref={containerRef}>
        <CollectionHeader
          viewMode={viewMode}
          setViewMode={setViewMode}
          feedType={feedType}
          setFeedType={setFeedType}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          galleryFilters={[
            { key: 'all', label: 'All' },
            { key: 'images', label: 'Images' },
            { key: 'videos', label: 'Videos' },
            { key: 'for-sale', label: 'For Sale' }
          ]}
        />

        <CollectionContent
          error={hasError}
          loading={isLoading}
          images={unifiedContent}
          manualContent={manualContent}
          mixedContent={unifiedContent}
          viewMode={viewMode}
          hasMore={hasMoreContent}
          isLoadingMore={isLoadingMore}
          handleLoadMore={loadMoreAll}
          renderContentItem={renderItem}
        />
      </div>
    </div>
  );
};

export default ImprovedCollection;

