// import React from 'react';
// import { Sparkles, Plus } from 'lucide-react';

// const CollectionContent = ({
//   error,
//   loading,
//   images,
//   manualContent,
//   mixedContent,
//   viewMode,
//   hasMore,
//   isLoadingMore,
//   handleLoadMore,
//   renderContentItem
// }) => {
//   return (
//     <div className="px-0 sm:px-4 pt-4">
//       {/* Error message */}
//       {error && (
//         <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 text-center">
//           <p className="text-yellow-700 dark:text-yellow-400 font-medium text-sm sm:text-base">
//             {error}
//           </p>
//         </div>
//       )}

//       {loading && images.length === 0 && manualContent.length === 0 ? (
//         <div className="flex items-center justify-center py-20">
//           <div className="flex flex-col items-center gap-4">
//             <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
//             <div className="text-center">
//               <p className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">Loading Content</p>
//               <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Getting your media ready...</p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <>
//           {/* Content Grid - Remove lastElementRef */}
//           <div className={`transition-all duration-500 ${
//             viewMode === 'collage'
//               ? 'columns-1 sm:columns-2 xl:columns-3 gap-4 space-y-4'
//               : 'columns-1 sm:columns-2 gap-6 space-y-4 w-full max-w-4xl mx-auto'
//           }`}>
//             {mixedContent.map((item, idx) => (
//               <div
//                 key={item.id || `${item.type}-${idx}`}
//                 className={`break-inside-avoid ${viewMode === 'feed' ? 'col-span-2' : ''}`}
//               >
//                 {renderContentItem(item)}
//               </div>
//             ))}
//           </div>

//           {/* Manual Load More Button - Only show this */}
//           {hasMore && !loading && (images.length > 0 || manualContent.length > 0) && (
//             <div className="text-center mt-12 mb-8">
//               <button
//                 onClick={handleLoadMore}
//                 disabled={isLoadingMore}
//                 className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 disabled:shadow-md disabled:cursor-not-allowed"
//               >
//                 {isLoadingMore ? (
//                   <>
//                     <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Loading More...
//                   </>
//                 ) : (
//                   <>
//                     <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
//                     Load More Content
//                   </>
//                 )}
//               </button>
//             </div>
//           )}

//           {/* End of Content */}
//           {!hasMore && (images.length > 0 || manualContent.length > 0) && (
//             <div className="text-center mt-12 py-8 border-t border-gray-200 dark:border-gray-800">
//               <div className="max-w-md mx-auto">
//                 <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                   You've Seen It All!
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400 text-sm">
//                   You've reached the end of the content. Check back later for new uploads!
//                 </p>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default CollectionContent;
