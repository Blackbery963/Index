// // import { useState, useMemo, useEffect, useRef } from "react";
// // import { useCollection } from './useCollection';
// // import { 
// //   TrendingUp, 
// //   Sparkles, 
// //   Filter,
// //   Clock,
// //   BarChart3,
// //   Layers,
// //   Plus,
// // } from 'lucide-react';
// // import Lightbox from './Lightbox';
// // import ImageCollage from './ImageCollage';
// // import ImageCard from './ImageCard';
// // import  Visual from "../Visual/Visual"
// // import DiaryTemplate from "../Diarytemp/Diarytemp";
// // import Gateway from "../Connecting/Connecting";
// // import ArtResearchPage from "../ResearchPaperPage";
// // import ArtistDiscovery from "../ArtistDiscovery";
// // import MiniArtCategories from "../Style/ArtCategories";
// // import MiniArtisan from "../Artisian/Artisian";
// // import MiniCommerce from "../Commerce/Commerce";
// // import DailyChallenge from "../DialyChallenge";

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
// //     handleImageView,
// //     formatTimestamp
// //   } = useCollection();

// //   const [showFilters, setShowFilters] = useState(false);
// //   const [viewMode, setViewMode] = useState('feed');
// //   const [selectedImage, setSelectedImage] = useState(null);
// //   const [selectedCollage, setSelectedCollage] = useState(null);
// //   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
// //   const [isLoadingMore, setIsLoadingMore] = useState(false);
// //   const [likedProducts, setLikedProducts] = useState(new Set());
// //   const [savedProducts, setSavedProducts] = useState(new Set());
// //   const [followedArtists, setFollowedArtists] = useState(new Set());

// //   const containerRef = useRef(null);

// //   // Manual load more with smooth loading
// //   const handleLoadMore = async () => {
// //     if (loading || !hasMore || isLoadingMore) return;
    
// //     setIsLoadingMore(true);
// //     await loadMore();
    
// //     setTimeout(() => {
// //       setIsLoadingMore(false);
// //       if (containerRef.current) {
// //         const scrollHeight = containerRef.current.scrollHeight;
// //         window.scrollTo({
// //           top: scrollHeight - 800,
// //           behavior: 'smooth'
// //         });
// //       }
// //     }, 500);
// //   };

// //   // Handle product likes
// //   const handleProductLike = (productId) => {
// //     setLikedProducts(prev => {
// //       const newSet = new Set(prev);
// //       if (newSet.has(productId)) {
// //         newSet.delete(productId);
// //       } else {
// //         newSet.add(productId);
// //       }
// //       return newSet;
// //     });
// //   };

// //   // Handle product saves
// //   const handleProductSave = (productId) => {
// //     setSavedProducts(prev => {
// //       const newSet = new Set(prev);
// //       if (newSet.has(productId)) {
// //         newSet.delete(productId);
// //       } else {
// //         newSet.add(productId);
// //       }
// //       return newSet;
// //     });
// //   };

// //   // Handle product click
// //   const handleProductClick = (product) => {
// //     console.log('Product clicked:', product);
// //   };

// //   // Handle diary actions
// //   const handleDiaryAction = (action) => {
// //     console.log('Diary action:', action);
// //   };

// //   // Handle community actions
// //   const handleCommunityAction = (action) => {
// //     console.log('Community action:', action);
// //   };

// //   // Handle research actions
// //   const handleResearchAction = (action) => {
// //     console.log('Research action:', action);
// //   };

// //   // Enhanced content mixing with all components
// //   // for artist discovery
// //   const handleArtistFollow = (artistId) => {
// //   setFollowedArtists(prev => {
// //     const newSet = new Set(prev);
// //     if (newSet.has(artistId)) {
// //       newSet.delete(artistId);
// //     } else {
// //       newSet.add(artistId);
// //     }
// //     return newSet;
// //   });
// // };

// // // Add handleArtistClick function
// // const handleArtistClick = (artist) => {
// //   console.log('Artist clicked:', artist);
// //   // Navigate to artist profile or show details
// // };

// // // Update mixedContent to include artists
// // const mixedContent = useMemo(() => {
// //   if (!images.length) return [];

// //   const content = [];
// //   let imageIndex = 0;
// //   let contentCounter = 0;

// //   while (imageIndex < images.length) {
// //     contentCounter++;

// //     // Show products every 6th item
// //     if (contentCounter % 6 === 0) {
// //       content.push({ type: 'products', data: null });
// //     }
    
// //     // Show diary every 8th item
// //     if (contentCounter % 8 === 0) {
// //       content.push({ type: 'diary', data: null });
// //     }
    
// //     // Show communities every 10th item
// //     if (contentCounter % 10 === 0) {
// //       content.push({ type: 'communities', data: null });
// //     }
    
// //     // Show research every 12th item
// //     if (contentCounter % 12 === 0) {
// //       content.push({ type: 'research', data: null });
// //     }
    
// //     // Show artists every 14th item
// //     if (contentCounter % 14 === 0) {
// //       content.push({ type: 'artists', data: null });
// //     }
// //         if (contentCounter % 8 === 0) {
// //       content.push({ type: 'mini-categories', data: null });
// //     }
    
// //     // Show mini artisan every 12th item
// //     if (contentCounter % 12 === 0) {
// //       content.push({ type: 'mini-artisan', data: null });
// //     }
    
// //     // Show mini commerce every 16th item
// //     if (contentCounter % 16 === 0) {
// //       content.push({ type: 'mini-commerce', data: null });
// //     }
// //     if (contentCounter % 10 === 0) {
// //       content.push({ type: 'daily-challenge', data: null });
// //     }
    
// //     // Your existing content types...
// //     if (contentCounter % 6 === 0) {
// //       content.push({ type: 'products', data: null });
// //     }
    
// //     // For collage view, create collages; for feed view, show single images
// //     if (viewMode === 'collage' && contentCounter % 4 === 0 && imageIndex + 3 <= images.length) {
// //       // Create collage in discover mode
// //       const collageImages = images.slice(imageIndex, imageIndex + 3);
// //       content.push({ type: 'collage', data: collageImages });
// //       imageIndex += 3;
// //     } else if (imageIndex < images.length) {
// //       // Show single image
// //       content.push({ type: 'image', data: images[imageIndex] });
// //       imageIndex++;
// //     }
// //   }

// //   return content;
// // }, [images, viewMode]);



// //   const feedTypes = [
// //     { id: 'personalized', label: 'For You', icon: Sparkles },
// //     { id: 'trending', label: 'Trending', icon: TrendingUp },
// //     { id: 'recent', label: 'Latest', icon: Clock }
// //   ];

// //   const viewModes = [
// //     { id: 'feed', label: 'Feed', icon: BarChart3, description: 'Personalized art stream' },
// //     { id: 'collage', label: 'Discover', icon: Layers, description: 'Smart visual collections' }
// //   ];

// //   const renderContentItem = (item, idx) => {
// //     switch (item.type) {
// //       case 'collage':
// //         return (
// //           <ImageCollage 
// //             key={`collage-${idx}`} 
// //             groupImages={item.data} 
// //             onImageClick={(image, images) => {
// //               setSelectedCollage(images);
// //               setCurrentSlideIndex(images.indexOf(image));
// //             }}
// //             likedImages={likedImages}
// //             savedImages={savedImages}
// //             onLike={handleLike}
// //             onSave={handleSave}
// //             categories={categories}
// //           />
// //         );

// //   case 'artists':
// //   return (
// //     <div key={`artists-${idx}`} className={viewMode === 'feed' ? 'col-span-2' : ''}>
// //       <ArtistDiscovery 
// //         viewMode={viewMode}
// //         onArtistClick={handleArtistClick}
// //         followedArtists={followedArtists}
// //         onFollow={handleArtistFollow}
// //       />
// //     </div>
// //   );

// //     case 'mini-categories':
// //       return (
// //         <div key={`mini-categories-${idx}`} className={viewMode === 'feed' ? 'col-span-2' : ''}>
// //           <MiniArtCategories />
// //         </div>
// //       );
    
// //     case 'mini-artisan':
// //       return (
// //         <div key={`mini-artisan-${idx}`} className={viewMode === 'feed' ? 'col-span-2' : ''}>
// //           <MiniArtisan />
// //         </div>
// //       );
    
// //     case 'mini-commerce':
// //       return (
// //         <div key={`mini-commerce-${idx}`} className={viewMode === 'feed' ? 'col-span-2' : ''}>
// //           <MiniCommerce />
// //         </div>
// //       );
      
// //       case 'products':
// //         return (
// //           <div key={`products-${idx}`} className={viewMode === 'feed' ? 'col-span-2' : ''}>
// //             <Visual 
// //               viewMode={viewMode}
// //               onProductClick={handleProductClick}
// //               likedProducts={likedProducts}
// //               savedProducts={savedProducts}
// //               onLike={handleProductLike}
// //               onSave={handleProductSave}
// //               formatTimestamp={formatTimestamp}
// //             />
// //           </div>
// //         );
      
// //       case 'diary':
// //         return (
// //           <div key={`diary-${idx}`} className={viewMode === 'feed' ? 'col-span-2' : ''}>
// //             <DiaryTemplate 
// //               viewMode={viewMode}
// //               onDiaryAction={handleDiaryAction}
// //             />
// //           </div>
// //         );
      
// //       case 'communities':
// //         return (
// //           <div key={`communities-${idx}`} className={viewMode === 'feed' ? 'col-span-2' : ''}>
// //             <Gateway 
// //               viewMode={viewMode}
// //               onCommunityAction={handleCommunityAction}
// //             />
// //           </div>
// //         );
      
// //       case 'research':
// //         return (
// //           <div key={`research-${idx}`} className={viewMode === 'feed' ? 'col-span-2' : ''}>
// //             <ArtResearchPage 
// //               viewMode={viewMode}
// //               onResearchAction={handleResearchAction}
// //             />
// //           </div>
// //         );
// //       case 'daily-challenge':
// //       return (
// //         <div key={`daily-challenge-${idx}`} className={viewMode === 'feed' ? 'col-span-2' : ''}>
// //           <DailyChallenge />
// //         </div>
// //       );
      
// //       case 'image':
// //       default:
// //         return (
// //           <ImageCard 
// //             key={item.data.id} 
// //             image={item.data} 
// //             onImageClick={setSelectedImage}
// //             likedImages={likedImages}
// //             savedImages={savedImages}
// //             onLike={handleLike}
// //             onSave={handleSave}
// //             formatTimestamp={formatTimestamp}
// //             viewMode={viewMode}
// //           />
// //         );
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 dark:bg-[#000705]">
// //       <div className="w-full max-w-7xl mx-auto" ref={containerRef}>
// //         {/* Enhanced Sticky Header */}
// //         <div className="sticky top-0 z-40 bg-white/95 dark:bg-[#000705]/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
// //           <div className="px-3 sm:px-4 py-3 sm:py-4">
// //             {/* Header Row */}
// //             <div className="flex items-center justify-between mb-3 sm:mb-4">
// //               <div className="flex items-center gap-2 sm:gap-3">
// //                 <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
// //                   <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
// //                 </div>
// //                 <div>
// //                   <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-600 dark:from-white dark:to-purple-400 bg-clip-text text-transparent">
// //                     Discover
// //                   </h1>
// //                   <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
// //                     {viewMode === 'collage' ? 'Smart visual collections' : 'Personalized art feed'}
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="flex items-center gap-2 sm:gap-3">
// //                 {/* Filter Button */}
// //                 <button
// //                   onClick={() => setShowFilters(!showFilters)}
// //                   className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all duration-300 ${
// //                     showFilters 
// //                       ? 'bg-purple-500 text-white border-purple-500 shadow-lg' 
// //                       : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:shadow-md'
// //                   }`}
// //                 >
// //                   <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* View Mode Toggle */}
// //             <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl p-1 shadow-inner mb-2">
// //               {viewModes.map(mode => {
// //                 const Icon = mode.icon;
// //                 return (
// //                   <button
// //                     key={mode.id}
// //                     onClick={() => setViewMode(mode.id)}
// //                     className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 flex-1 ${
// //                       viewMode === mode.id 
// //                         ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md' 
// //                         : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
// //                     }`}
// //                   >
// //                     <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
// //                     <span className="hidden xs:inline">{mode.label}</span>
// //                     <span className="xs:hidden">{mode.label.charAt(0)}</span>
// //                   </button>
// //                 );
// //               })}
// //             </div>

// //             {/* Feed Type Selector */}
// //             <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
// //               {feedTypes.map(feed => {
// //                 const Icon = feed.icon;
// //                 return (
// //                   <button
// //                     key={feed.id}
// //                     onClick={() => setFeedType(feed.id)}
// //                     className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
// //                       feedType === feed.id 
// //                         ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105' 
// //                         : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md'
// //                     }`}
// //                   >
// //                     <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
// //                     {feed.label}
// //                   </button>
// //                 );
// //               })}
// //             </div>

// //             {/* Enhanced Filter Panel */}
// //             {showFilters && (
// //               <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mt-3 shadow-xl">
// //                 <div className="flex items-center justify-between mb-4">
// //                   <div>
// //                     <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">Filter Content</h3>
// //                     <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
// //                       Curate your discovery experience
// //                     </p>
// //                   </div>
// //                   <button 
// //                     onClick={() => setShowFilters(false)}
// //                     className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
// //                   >
// //                     <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 rotate-45" />
// //                   </button>
// //                 </div>
// //                 <div className="flex flex-wrap gap-2 sm:gap-3">
// //                   {categories.map(category => (
// //                     <button
// //                       key={category.id}
// //                       onClick={() => {
// //                         if (category.id === 'all') {
// //                           setSelectedCategories(['all']);
// //                         } else if (selectedCategories.includes(category.id)) {
// //                           setSelectedCategories(prev => prev.length > 1 ? prev.filter(id => id !== category.id) : ['all']);
// //                         } else {
// //                           setSelectedCategories(prev => [...prev.filter(id => id !== 'all'), category.id]);
// //                         }
// //                       }}
// //                       className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
// //                         selectedCategories.includes(category.id) 
// //                           ? `${category.color} text-white shadow-lg transform scale-105` 
// //                           : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md'
// //                       }`}
// //                     >
// //                       {category.name}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

//         {/* Content Area */}
    //     <div className="px-0 sm:px-4 py-6">
    //       {error && (
    //         <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 text-center">
    //           <p className="text-red-600 dark:text-red-400 font-medium text-sm sm:text-base">{error}</p>
    //         </div>
    //       )}

    //       {loading && images.length === 0 ? (
    //         <div className="flex items-center justify-center py-20">
    //           <div className="flex flex-col items-center gap-4">
    //             <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
    //             <div className="text-center">
    //               <p className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">Curating Your Feed</p>
    //               <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Finding the perfect art for you...</p>
    //             </div>
    //           </div>
    //         </div>
    //       ) : (
    //         <>
    //           {/* Content Grid with Improved Column Layouts */}
    //           <div className={`transition-all duration-500 ${
    //             viewMode === 'collage'
    //               ? 'columns-1 sm:columns-2 xl:columns-3 gap-4 space-y-4'  // Multi-column for discover
    //               : 'columns-1 sm:columns-2 gap-6 space-y-4 w-full max-w-4xl mx-auto'  // Two columns for feed
    //           }`}>
    //             {mixedContent.map((item, idx) => renderContentItem(item, idx))}
    //           </div>

    //           {/* Manual Load More Button */}
    //           {hasMore && !loading && images.length > 0 && (
    //             <div className="text-center mt-12 mb-8">
    //               <button
    //                 onClick={handleLoadMore}
    //                 disabled={isLoadingMore}
    //                 className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 disabled:shadow-md disabled:cursor-not-allowed"
    //               >
    //                 {isLoadingMore ? (
    //                   <>
    //                     <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    //                     Loading...
    //                   </>
    //                 ) : (
    //                   <>
    //                     <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
    //                     Load More
    //                   </>
    //                 )}
    //               </button>
    //             </div>
    //           )}

    //           {/* Loading More Indicator */}
    //           {isLoadingMore && (
    //             <div className="flex items-center justify-center py-8">
    //               <div className="flex flex-col items-center gap-3">
    //                 <div className="w-8 h-8 border-3 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
    //                 <p className="text-sm text-gray-600 dark:text-gray-400">Loading more amazing art...</p>
    //               </div>
    //             </div>
    //           )}

    //           {/* End of Content */}
    //           {!hasMore && images.length > 0 && (
    //             <div className="text-center mt-12 py-8 border-t border-gray-200 dark:border-gray-800">
    //               <div className="max-w-md mx-auto">
    //                 <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
    //                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
    //                   You've Discovered It All!
    //                 </h3>
    //                 <p className="text-gray-600 dark:text-gray-400 text-sm">
    //                   You've reached the end of your personalized art journey. Check back later for new creations!
    //                 </p>
    //               </div>
    //             </div>
    //           )}
    //         </>
    //       )}
    //     </div>
    //   </div>

    //   {/* Lightbox */}
    //   {(selectedImage || selectedCollage) && (
    //     <Lightbox
    //       selectedImage={selectedImage}
    //       selectedCollage={selectedCollage}
    //       currentSlideIndex={currentSlideIndex}
    //       setCurrentSlideIndex={setCurrentSlideIndex}
    //       onClose={() => {
    //         setSelectedImage(null);
    //         setSelectedCollage(null);
    //         setCurrentSlideIndex(0);
    //       }}
    //       likedImages={likedImages}
    //       savedImages={savedImages}
    //       onLike={handleLike}
    //       onSave={handleSave}
    //     />
    //   )}
    // </div>
// //   );
// // };

// // export default ImprovedCollection;


import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useCollection } from './useCollection';
import { 
  TrendingUp, 
  Sparkles, 
  Filter,
  Clock,
  BarChart3,
  Layers,
  Plus,
} from 'lucide-react';
// import Lightbox from './Lightbox';
import ImageCollage from './ImageCollage';
import ImageCard from './ImageCard';
import Visual from "../Visual/Visual"
import DiaryTemplate from "../Diarytemp/Diarytemp";
import Gateway from "../Connecting/Connecting";
import ArtResearchPage from "../ResearchPaperPage";
import ArtistDiscovery from "../ArtistDiscovery";
import MiniArtCategories from "../Style/ArtCategories";
import MiniArtisan from "../Artisian/Artisian";
import MiniCommerce from "../Commerce/Commerce";
import DailyChallenge from "../DialyChallenge";
import Lightbox from "./Lightbox";

// Persistent storage for scroll position and loaded content
const PERSISTENT_STORAGE_KEY = 'improved-collection-state';

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
    handleImageView,
    formatTimestamp
  } = useCollection();

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('feed');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCollage, setSelectedCollage] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Persistent state that survives component remounts
  const [localState, setLocalState] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(PERSISTENT_STORAGE_KEY) : null;
    return saved ? JSON.parse(saved) : {
      likedProducts: [],
      savedProducts: [],
      followedArtists: [],
      scrollPosition: 0,
      loadedContentCount: 0
    };
  });

  const [manualContent, setManualContent] = useState([]);
  
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const lastElementRef = useRef(null);

  // Save state to localStorage on changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PERSISTENT_STORAGE_KEY, JSON.stringify(localState));
    }
  }, [localState]);

  // Restore scroll position on mount
  useEffect(() => {
    if (containerRef.current && localState.scrollPosition > 0) {
      setTimeout(() => {
        window.scrollTo(0, localState.scrollPosition);
      }, 100);
    }
  }, []);

  // Save scroll position before unmount
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (typeof window !== 'undefined') {
        setLocalState(prev => ({
          ...prev,
          scrollPosition: window.scrollY
        }));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Generate standalone content that doesn't depend on images
  const generateStandaloneContent = useCallback(() => {
    const contentTypes = [
      'mini-categories',
      'products', 
      'daily-challenge',
      'mini-artisan',
      'diary',
      'mini-commerce',
      'communities',
      'artists',
      'research'
    ];

    return contentTypes.map((type, index) => ({
      type,
      data: null,
      id: `standalone-${type}-${index}`,
      timestamp: Date.now() + index
    }));
  }, []);

  // Initialize manual content once
  useEffect(() => {
    if (manualContent.length === 0) {
      setManualContent(generateStandaloneContent());
    }
  }, [generateStandaloneContent, manualContent.length]);

  // Convert arrays to Sets for efficient lookups
  const likedProductsSet = useMemo(() => new Set(localState.likedProducts), [localState.likedProducts]);
  const savedProductsSet = useMemo(() => new Set(localState.savedProducts), [localState.savedProducts]);
  const followedArtistsSet = useMemo(() => new Set(localState.followedArtists), [localState.followedArtists]);

  const handleProductLike = useCallback((productId) => {
    setLocalState(prev => {
      const newLiked = prev.likedProducts.includes(productId)
        ? prev.likedProducts.filter(id => id !== productId)
        : [...prev.likedProducts, productId];
      
      return { ...prev, likedProducts: newLiked };
    });
  }, []);

  const handleProductSave = useCallback((productId) => {
    setLocalState(prev => {
      const newSaved = prev.savedProducts.includes(productId)
        ? prev.savedProducts.filter(id => id !== productId)
        : [...prev.savedProducts, productId];
      
      return { ...prev, savedProducts: newSaved };
    });
  }, []);

  const handleArtistFollow = useCallback((artistId) => {
    setLocalState(prev => {
      const newFollowed = prev.followedArtists.includes(artistId)
        ? prev.followedArtists.filter(id => id !== artistId)
        : [...prev.followedArtists, artistId];
      
      return { ...prev, followedArtists: newFollowed };
    });
  }, []);

  // Improved mixed content that works even without images
  const mixedContent = useMemo(() => {
    const content = [];
    let contentCounter = 0;

    // Always include standalone content first
    manualContent.forEach(item => {
      content.push(item);
    });

    // Then mix in images if available
    if (images.length > 0) {
      let imageIndex = 0;
      const totalImages = images.length;

      while (imageIndex < totalImages) {
        contentCounter++;

        // Add image content regularly
        if (viewMode === 'collage' && contentCounter % 4 === 0 && imageIndex + 3 <= totalImages) {
          const collageImages = images.slice(imageIndex, imageIndex + 3);
          content.push({ 
            type: 'collage', 
            data: collageImages,
            id: `collage-${imageIndex}`,
            timestamp: Date.now() + imageIndex
          });
          imageIndex += 3;
        } else if (imageIndex < totalImages) {
          content.push({ 
            type: 'image', 
            data: images[imageIndex],
            id: `image-${images[imageIndex].id}`,
            timestamp: Date.now() + imageIndex
          });
          imageIndex++;
        }

        // Add additional standalone content periodically
        if (contentCounter % 5 === 0 && manualContent.length > 0) {
          const randomContent = manualContent[contentCounter % manualContent.length];
          content.push({
            ...randomContent,
            id: `${randomContent.type}-extra-${contentCounter}`
          });
        }
      }
    }

    // Sort by timestamp to maintain consistent order
    return content.sort((a, b) => a.timestamp - b.timestamp);
  }, [images, viewMode, manualContent]);

    const handleLoadMore = useCallback(async () => {
    if (loading || !hasMore || isLoadingMore) return;
    
    setIsLoadingMore(true);
    await loadMore();
    setIsLoadingMore(false);

    // Update content count for tracking
    setLocalState(prev => ({
      ...prev,
      loadedContentCount: prev.loadedContentCount + 1
    }));
  }, [loading, hasMore, isLoadingMore, loadMore]);


  // Infinite scroll implementation
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, isLoadingMore, handleLoadMore]);


  // Memoized configuration arrays
  const feedTypes = useMemo(() => [
    { id: 'personalized', label: 'For You', icon: Sparkles },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'recent', label: 'Latest', icon: Clock }
  ], []);

  const viewModes = useMemo(() => [
    { id: 'feed', label: 'Feed', icon: BarChart3, description: 'Personalized art stream' },
    { id: 'collage', label: 'Discover', icon: Layers, description: 'Smart visual collections' }
  ], []);

  // Enhanced render function with better error handling
  const renderContentItem = useCallback((item, idx, isLast = false) => {
    const commonProps = {
      key: item.id || `${item.type}-${idx}`,
      className: viewMode === 'feed' ? 'col-span-2' : '',
      ref: isLast ? lastElementRef : null
    };

    try {
      switch (item.type) {
        case 'collage':
          if (!item.data || item.data.length === 0) return null;
          return (
            <div {...commonProps}>
              <ImageCollage 
                groupImages={item.data} 
                onImageClick={(image, images) => {
                  setSelectedCollage(images);
                  setCurrentSlideIndex(images.indexOf(image));
                }}
                likedImages={likedImages}
                savedImages={savedImages}
                onLike={handleLike}
                onSave={handleSave}
                categories={categories}
              />
            </div>
          );

        case 'artists':
          return (
            <div {...commonProps}>
              <ArtistDiscovery 
                viewMode={viewMode}
                onArtistClick={(artist) => console.log('Artist clicked:', artist)}
                followedArtists={followedArtistsSet}
                onFollow={handleArtistFollow}
              />
            </div>
          );

        case 'mini-categories':
          return <div {...commonProps}><MiniArtCategories /></div>;
        case 'mini-artisan':
          return <div {...commonProps}><MiniArtisan /></div>;
        case 'mini-commerce':
          return <div {...commonProps}><MiniCommerce /></div>;
        case 'products':
          return (
            <div {...commonProps}>
              <Visual 
                viewMode={viewMode}
                onProductClick={(product) => console.log('Product clicked:', product)}
                likedProducts={likedProductsSet}
                savedProducts={savedProductsSet}
                onLike={handleProductLike}
                onSave={handleProductSave}
                formatTimestamp={formatTimestamp}
              />
            </div>
          );
        case 'diary':
          return (
            <div {...commonProps}>
              <DiaryTemplate 
                viewMode={viewMode}
                onDiaryAction={(action) => console.log('Diary action:', action)}
              />
            </div>
          );
        case 'communities':
          return (
            <div {...commonProps}>
              <Gateway 
                viewMode={viewMode}
                onCommunityAction={(action) => console.log('Community action:', action)}
              />
            </div>
          );
        case 'research':
          return (
            <div {...commonProps}>
              <ArtResearchPage 
                viewMode={viewMode}
                onResearchAction={(action) => console.log('Research action:', action)}
              />
            </div>
          );
        case 'daily-challenge':
          return <div {...commonProps}><DailyChallenge /></div>;
        case 'image':
          if (!item.data) return null;
          return (
            <ImageCard 
              key={item.data.id} 
              image={item.data} 
              onImageClick={setSelectedImage}
              likedImages={likedImages}
              savedImages={savedImages}
              onLike={handleLike}
              onSave={handleSave}
              formatTimestamp={formatTimestamp}
              viewMode={viewMode}
            />
          );
        default:
          return null;
      }
    } catch (error) {
      console.error(`Error rendering ${item.type}:`, error);
      return (
        <div {...commonProps} className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400 text-sm">
            Error loading {item.type} content
          </p>
        </div>
      );
    }
  }, [viewMode, likedImages, savedImages, categories, handleLike, handleSave, followedArtistsSet, handleArtistFollow, handleProductLike, handleProductSave, formatTimestamp]);

  // Memoized filter panel
  const filterPanel = useMemo(() => {
    if (!showFilters) return null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mt-3 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">Filter Content</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              Curate your discovery experience
            </p>
          </div>
          <button 
            onClick={() => setShowFilters(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 rotate-45" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                if (category.id === 'all') {
                  setSelectedCategories(['all']);
                } else if (selectedCategories.includes(category.id)) {
                  setSelectedCategories(prev => prev.length > 1 ? prev.filter(id => id !== category.id) : ['all']);
                } else {
                  setSelectedCategories(prev => [...prev.filter(id => id !== 'all'), category.id]);
                }
              }}
              className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedCategories.includes(category.id) 
                  ? `${category.color} text-white shadow-lg transform scale-105` 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    );
  }, [showFilters, categories, selectedCategories, setSelectedCategories]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#000705]">
      <div className="w-full max-w-7xl mx-auto" ref={containerRef}>
        {/* Enhanced Sticky Header */}
        <div className="sticky top-0 z-40 bg-white/95 dark:bg-[#000705]/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
          <div className="px-3 sm:px-4 py-3 sm:py-4">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-600 dark:from-white dark:to-purple-400 bg-clip-text text-transparent">
                    Discover
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                    {viewMode === 'collage' ? 'Smart visual collections' : 'Personalized art feed'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all duration-300 ${
                    showFilters 
                      ? 'bg-purple-500 text-white border-purple-500 shadow-lg' 
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:shadow-md'
                  }`}
                >
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl p-1 shadow-inner mb-2">
              {viewModes.map(mode => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 flex-1 ${
                      viewMode === mode.id 
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">{mode.label}</span>
                    <span className="xs:hidden">{mode.label.charAt(0)}</span>
                  </button>
                );
              })}
            </div>

            {/* Feed Type Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {feedTypes.map(feed => {
                const Icon = feed.icon;
                return (
                  <button
                    key={feed.id}
                    onClick={() => setFeedType(feed.id)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                      feedType === feed.id 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md'
                    }`}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    {feed.label}
                  </button>
                );
              })}
            </div>

            {/* Filter Panel */}
            {filterPanel}
          </div>
        </div>

        {/* Content Area */}
        <div className="px-0 sm:px-4 py-6">
          {/* Error message - doesn't block content */}
          {error && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 text-center">
              <p className="text-yellow-700 dark:text-yellow-400 font-medium text-sm sm:text-base">
                Connection issue: Showing available content
              </p>
            </div>
          )}

          {loading && images.length === 0 && manualContent.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">Curating Your Feed</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Finding the perfect art for you...</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Content Grid */}
              <div className={`transition-all duration-500 ${
                viewMode === 'collage'
                  ? 'columns-1 sm:columns-2 xl:columns-3 gap-4 space-y-4'
                  : 'columns-1 sm:columns-2 gap-6 space-y-4 w-full max-w-4xl mx-auto'
              }`}>
                {mixedContent.map((item, idx) => 
                  renderContentItem(item, idx, idx === mixedContent.length - 1)
                )}
              </div>

              {/* Manual Load More Button */}
              {hasMore && !loading && (images.length > 0 || manualContent.length > 0) && (
                <div className="text-center mt-12 mb-8">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 disabled:shadow-md disabled:cursor-not-allowed"
                  >
                    {isLoadingMore ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                        Load More
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Loading More Indicator */}
              {isLoadingMore && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Loading more amazing art...</p>
                  </div>
                </div>
              )}

              {/* End of Content */}
              {!hasMore && (images.length > 0 || manualContent.length > 0) && (
                <div className="text-center mt-12 py-8 border-t border-gray-200 dark:border-gray-800">
                  <div className="max-w-md mx-auto">
                    <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      You've Discovered It All!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      You've reached the end of your personalized art journey. Check back later for new creations!
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {(selectedImage || selectedCollage) && (
        <Lightbox
          selectedImage={selectedImage}
          selectedCollage={selectedCollage}
          currentSlideIndex={currentSlideIndex}
          setCurrentSlideIndex={setCurrentSlideIndex}
          onClose={() => {
            setSelectedImage(null);
            setSelectedCollage(null);
            setCurrentSlideIndex(0);
          }}
          likedImages={likedImages}
          savedImages={savedImages}
          onLike={handleLike}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ImprovedCollection;