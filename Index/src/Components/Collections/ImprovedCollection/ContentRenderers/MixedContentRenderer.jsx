// import React from 'react';
// // import Visual from '../../../Visual/Visual';
// import DiaryTemplate from '../../../Diarytemp/Diarytemp';
// import Gateway from '../../../Connecting/Connecting';
// import ArtResearchPage from '../../../ResearchPaperPage';
// import ArtistDiscovery from '../../../ArtistDiscovery';
// import MiniArtCategories from '../../../Style/ArtCategories';
// import MiniArtisan from '../../../Artisian/Artisian';
// import DailyChallenge from '../../../DialyChallenge';



// const MixedContentRenderer = ({ 
//   item, 
//   viewMode, 
//   likedProducts, 
//   savedProducts, 
//   followedArtists, 
//   handleProductLike, 
//   handleProductSave, 
//   handleArtistFollow, 
//   formatTimestamp,
//   // New props for MainGalleryPage
//   media = [],
//   profiles = {},
//   loading = false,
//   error = null,
//   activeFilter = 'all',
//   onFilterChange = () => {},
//   onViewModeChange = () => {},
//   onMediaClick = () => {},
//   onLike = () => {},
//   onSave = () => {},
//   hasMore = false,
//   isLoadingMore = false,
//   onLoadMore = () => {}
// }) => {
//   try {
//     // Priority 1: Main Gallery Content (images, videos, artwork)
//     if (item.type === 'gallery' || item.source === 'appwrite' || 
//         (item.category && ['image', 'video', 'for-sale'].includes(item.category)) ||
//         (item.fileType && ['image', 'video'].includes(item.fileType))) {
      
//       // If it's a gallery container item, render the full MainGalleryPage
//       // if (item.isGalleryContainer) {
//       //   return (
//       //     <MainGalleryPage 
//       //       media={media}
//       //       profiles={profiles}
//       //       loading={loading}
//       //       error={error}
//       //       activeFilter={activeFilter}
//       //       onFilterChange={onFilterChange}
//       //       viewMode={viewMode}
//       //       onViewModeChange={onViewModeChange}
//       //       onMediaClick={onMediaClick}
//       //       onLike={onLike}
//       //       onSave={onSave}
//       //       hasMore={hasMore}
//       //       isLoadingMore={isLoadingMore}
//       //       onLoadMore={onLoadMore}
//       //       formatTimestamp={formatTimestamp}
//       //     />
//       //   );
//       // }
      
//       // If it's an individual gallery item, render through Visual component
//       // return (
//       //   <Visual 
//       //     item={item}
//       //     viewMode={viewMode}
//       //     onProductClick={onMediaClick}
//       //     likedProducts={likedProducts}
//       //     savedProducts={savedProducts}
//       //     onLike={onLike}
//       //     onSave={onSave}
//       //     formatTimestamp={formatTimestamp}
//       //   />
//       // );
//     }

//     // Priority 2: Other content types
//     switch (item.type) {
//       case 'artists':
//         return (
//           <ArtistDiscovery 
//             viewMode={viewMode}
//             onArtistClick={(artist) => console.log('Artist clicked:', artist)}
//             followedArtists={followedArtists}
//             onFollow={handleArtistFollow}
//           />
//         );

//       case 'mini-categories':
//         return <MiniArtCategories viewMode={viewMode} />;

//       case 'mini-artisan':
//         return <MiniArtisan viewMode={viewMode} />;

//       // case 'mini-commerce':
//       //   return <MiniCommerce viewMode={viewMode} />;

//       // case 'products':
//       //   return (
//       //     <Visual 
//       //       item={item}
//       //       viewMode={viewMode}
//       //       onProductClick={(product) => console.log('Product clicked:', product)}
//       //       likedProducts={likedProducts}
//       //       savedProducts={savedProducts}
//       //       onLike={handleProductLike}
//       //       onSave={handleProductSave}
//       //       formatTimestamp={formatTimestamp}
//       //     />
//       //   );

//       case 'diary':
//         return (
//           <DiaryTemplate 
//             item={item}
//             viewMode={viewMode}
//             onDiaryAction={(action) => console.log('Diary action:', action)}
//           />
//         );

//       case 'communities':
//         return (
//           <Gateway 
//             item={item}
//             viewMode={viewMode}
//             onCommunityAction={(action) => console.log('Community action:', action)}
//           />
//         );

//       case 'research':
//         return (
//           <ArtResearchPage 
//             item={item}
//             viewMode={viewMode}
//             onResearchAction={(action) => console.log('Research action:', action)}
//           />
//         );

//       case 'daily-challenge':
//         return <DailyChallenge item={item} viewMode={viewMode} />;

//       default:
//         // Fallback: Try to render as gallery content if it has media properties
//         // if (item.src || item.url || item.mediaUrl || item.fileId) {
//         //   return (
//         //     <Visual 
//         //       item={item}
//         //       viewMode={viewMode}
//         //       onProductClick={onMediaClick}
//         //       likedProducts={likedProducts}
//         //       savedProducts={savedProducts}
//         //       onLike={onLike}
//         //       onSave={onSave}
//         //       formatTimestamp={formatTimestamp}
//         //     />
//         //   );
//         // }
        
//         console.warn('Unknown content type:', item.type, item);
//         return null;
//     }
//   } catch (error) {
//     console.error(`Error rendering ${item.type}:`, error, item);
//     return (
//       <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
//         <div className="flex items-center gap-2 mb-2">
//           <span className="text-red-500 text-lg">⚠️</span>
//           <p className="text-red-600 dark:text-red-400 font-medium">
//             Error loading content
//           </p>
//         </div>
//         <details className="text-xs">
//           <summary className="cursor-pointer text-red-700 dark:text-red-300">
//             Debug info
//           </summary>
//           <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 rounded">
//             <p><strong>Type:</strong> {item.type}</p>
//             <p><strong>ID:</strong> {item.id}</p>
//             <p><strong>Error:</strong> {error.message}</p>
//           </div>
//         </details>
//       </div>
//     );
//   }
// };

// // Helper function to determine content priority
// export const sortMixedContent = (contentArray) => {
//   return contentArray.sort((a, b) => {
//     const priority = {
//       'gallery': 1,
//       'image': 2,
//       'video': 2,
//       'for-sale': 2,
//       'products': 3,
//       'artists': 4,
//       'daily-challenge': 5,
//       'mini-categories': 6,
//       'mini-artisan': 7,
//       'mini-commerce': 8,
//       'diary': 9,
//       'communities': 10,
//       'research': 11
//     };

//     const priorityA = priority[a.type] || priority[a.category] || 99;
//     const priorityB = priority[b.type] || priority[b.category] || 99;

//     return priorityA - priorityB;
//   });
// };

// // Helper function to identify gallery content
// export const isGalleryContent = (item) => {
//   return (
//     item.type === 'gallery' ||
//     item.source === 'appwrite' ||
//     ['image', 'video', 'for-sale'].includes(item.category) ||
//     ['image', 'video'].includes(item.fileType) ||
//     item.src ||
//     item.url ||
//     item.mediaUrl ||
//     item.fileId
//   );
// };

// export default MixedContentRenderer;


import React, { lazy, Suspense } from 'react';

// Lazy load heavy components
const DiaryTemplate = lazy(() => import('../../../Diarytemp/Diarytemp'));
const Gateway = lazy(() => import('../../../Connecting/Connecting'));
const ArtResearchPage = lazy(() => import('../../../ResearchPaperPage'));
const ArtistDiscovery = lazy(() => import('../../../ArtistDiscovery'));
const MiniArtCategories = lazy(() => import('../../../Style/ArtCategories'));
const MiniArtisan = lazy(() => import('../../../Artisian/Artisian'));
const DailyChallenge = lazy(() => import('../../../DialyChallenge'));

// Skeleton for mixed content
const MixedContentSkeleton = () => (
  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg p-6 h-48">
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-2"></div>
    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
    <div className="flex gap-2 mt-4">
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
    </div>
  </div>
);

const MixedContentRenderer = ({ 
  item, 
  viewMode, 
  likedProducts = new Set(), 
  savedProducts = new Set(), 
  followedArtists = new Set(), 
  handleProductLike = () => {}, 
  handleProductSave = () => {}, 
  handleArtistFollow = () => {}, 
  formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Recently';
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  },
  onMediaClick = () => {}
}) => {
  // Early return for gallery content (handled by parent)
  const isGalleryItem = 
    item.type === 'gallery' || 
    item.source === 'appwrite' || 
    ['image', 'video', 'for-sale'].includes(item.category) ||
    ['image', 'video'].includes(item.fileType) ||
    item.src || 
    item.url || 
    item.mediaUrl || 
    item.fileId;

  if (isGalleryItem) {
    return null; // Let parent handle gallery items
  }

  const LazyComponent = ({ children }) => (
    <Suspense fallback={<MixedContentSkeleton />}>
      {children}
    </Suspense>
  );

  try {
    switch (item.type) {
      case 'artists':
        return (
          <LazyComponent>
            <ArtistDiscovery 
              viewMode={viewMode}
              onArtistClick={(artist) => console.log('Artist clicked:', artist)}
              followedArtists={followedArtists}
              onFollow={handleArtistFollow}
            />
          </LazyComponent>
        );

      case 'mini-categories':
        return (
          <LazyComponent>
            <MiniArtCategories viewMode={viewMode} />
          </LazyComponent>
        );

      case 'mini-artisan':
        return (
          <LazyComponent>
            <MiniArtisan viewMode={viewMode} />
          </LazyComponent>
        );

      case 'diary':
        return (
          <LazyComponent>
            <DiaryTemplate 
              item={item}
              viewMode={viewMode}
              onDiaryAction={(action) => console.log('Diary action:', action)}
            />
          </LazyComponent>
        );

      case 'communities':
        return (
          <LazyComponent>
            <Gateway 
              item={item}
              viewMode={viewMode}
              onCommunityAction={(action) => console.log('Community action:', action)}
            />
          </LazyComponent>
        );

      case 'research':
        return (
          <LazyComponent>
            <ArtResearchPage 
              item={item}
              viewMode={viewMode}
              onResearchAction={(action) => console.log('Research action:', action)}
            />
          </LazyComponent>
        );

      case 'daily-challenge':
        return (
          <LazyComponent>
            <DailyChallenge item={item} viewMode={viewMode} />
          </LazyComponent>
        );

      // default:
      //   console.warn('Unknown content type:', item.type, item);
      //   return (
      //     <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
      //       <div className="flex items-center gap-2">
      //         <span className="text-yellow-500">⚠️</span>
      //         <p className="text-yellow-700 dark:text-yellow-300 text-sm">
      //           Unsupported content: {item.type}
      //         </p>
      //       </div>
      //     </div>
      //   );
    }
  } catch (error) {
    console.error('Error rendering content:', error, item);
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
        <div className="flex items-center gap-2">
          <span className="text-red-500">❌</span>
          <p className="text-red-600 dark:text-red-400 text-sm">
            Failed to load content
          </p>
        </div>
      </div>
    );
  }
};

export default MixedContentRenderer;