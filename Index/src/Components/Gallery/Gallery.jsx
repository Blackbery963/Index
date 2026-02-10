// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ToastContainer } from 'react-toastify';

// // Services
// import { fetchGalleryData, loadMoreData } from './services/galleryService';
// import { fetchPexelsData, loadMorePexelsData } from './services/pexelsService';

// // Hooks
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
//   const [source, setSource] = useState('all');
  
//   // Pagination state
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

//     const lowerCaseSearch = searchTerm.toLowerCase();
//     const results = allMedia.filter(item => {
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
//     setSource(filter === 'all' ? 'user' : filter);
//     setLoading(true);
//   }, [filter]);

//   // Initial data fetch
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);
//         let media, profiles, moreData, pagination;
//         if (source === 'featured') {
//           const result = await fetchPexelsData(filter, searchTerm);
//           media = result.media;
//           profiles = result.profiles;
//           moreData = result.hasMore;
//           pagination = result.pagination;
//         } else {
//           const result = await fetchGalleryData(source);
//           media = result.media;
//           profiles = result.profiles;
//           moreData = result.hasMore;
//           pagination = result.pagination;
//         }
        
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

//     if (allMedia.length === 0) {
//       loadData();
//     }
//   }, [source, searchTerm]);  // Note: depends on source and searchTerm for re-fetch if needed

//   // Load more handler
//   const handleLoadMore = useCallback(async () => {
//     if (loadingMore || !hasMore) {
//       return;
//     }
    
//     try {
//       setLoadingMore(true);
//       let result;
//       if (source === 'featured') {
//         result = await loadMorePexelsData(filter, searchTerm, paginationState);
//       } else {
//         result = await loadMoreData(source, allMedia, paginationState);
//       }
      
//       if (result.media.length > 0) {
//         setAllMedia(prev => [...prev, ...result.media]);
//         setUserProfiles(prev => ({ ...prev, ...result.profiles }));
//       }
      
//       setHasMore(result.hasMore);
//       setPaginationState(result.pagination);

//       // Switch to featured if all and no more appwrite
//       if (filter === 'all' && source !== 'featured' && !result.hasMore) {
//         setSource('featured');
//         setPaginationState({ featuredPage: 1, appwriteLastId: null });
//         setHasMore(true);
//       }
      
//     } catch (err) {
//       console.error('Error loading more content:', err);
//       setError(err.message || 'Failed to load more');
//       setHasMore(false);
//     } finally {
//       setLoadingMore(false);
//     }
//   }, [filter, source, searchTerm, loadingMore, hasMore, paginationState, allMedia]);

//   // Infinite scroll hook
//   const { observerRef } = useInfiniteScroll(
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
//     <div className="max-w-screen min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-950">
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
//       <div ref={contentRef} className="py-8 bg-gray-50 dark:bg-zinc-950 w-full">
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
            
//             {/* Infinite scroll trigger with load more button */}
//             {hasMore && (
//               <div 
//                 ref={observerRef} 
//                 className="h-20 flex items-center justify-center"
//                 style={{ minHeight: '100px' }}
//               >
//                 {loadingMore ? (
//                   <LoadingSpinner small />
//                 ) : (
//                   <button 
//                     onClick={handleLoadMore}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                   >
//                     Load More
//                   </button>
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


import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, User, SlidersHorizontal, Clock, X, Heart } from 'lucide-react';
import {Link} from 'react-router-dom'


const GalleryPage = () => {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedItems, setLikedItems] = useState([]);

  const categories = ['all', 'portraits', 'landscapes', 'abstract', 'minimilism'];

  const galleryItems = [
    { id: 1, type: 'portraits', title: 'Grace in Zinc', span: 'col-span-1 row-span-2', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800' },
    { id: 2, type: 'landscapes', title: 'Mountain Mist', span: 'col-span-1 row-span-1', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
    { id: 3, type: 'abstract', title: 'Geometric Flow', span: 'col-span-1 row-span-1', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800' },
    { id: 4, type: 'portraits', title: 'The Architect', span: 'col-span-2 row-span-1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200' },
    { id: 5, type: 'landscapes', title: 'Northern Light', span: 'col-span-1 row-span-1', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800' },
    { id: 6, type: 'abstract', title: 'Deep Ink', span: 'col-span-1 row-span-2', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800' },
    { id: 7, type: 'portraits', title: 'Shadow Play', span: 'col-span-1 row-span-1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800' },
    { id: 8, type: 'landscapes', title: 'Silent Peak', span: 'col-span-1 row-span-1', url: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800' },
  ];

  const filteredItems = useMemo(() => {
    return galleryItems.filter(item => {
      const matchesCategory = category === 'all' || item.type === category;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, searchQuery]);

  const toggleLike = (id) => {
    setLikedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      
      {/* HEADER */}
      <header className="w-full border-b border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 sticky top-0 z-50">
        <div className="px-4 md:px-12 py-3 flex items-center justify-between">
          <Link to="/">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl tracking-tighter font-Eagle">Painters' Diary</span>
          </div>
          </Link>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-4 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md text-xs font-bold transition-all">
              <Plus size={16} />
              <span className="">POST</span>
            </button>
            <button className="p-2 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <User size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-1 pb-4">
        
        {/* HERO SECTION */}
        <div className="max-w-7xl mx-auto pt-4">
          <div className="relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 md:p-12">
            
            {/* Background Images - Tilted */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 dark:opacity-10 overflow-hidden">
              <div className="absolute inset-0 flex gap-2 transform rotate-12 scale-125 translate-x-12">
                <div className="flex-1 h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400)' }} />
                <div className="flex-1 h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400)' }} />
                <div className="flex-1 h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400)' }} />
              </div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-3 leading-tight">
                Explore Creative Gallery
              </h1>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                Discover stunning artworks, photography, and creative pieces from talented artists around the world.
              </p>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search artworks, artists..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-zinc-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <section className="mt-8 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-3 px-1">
          <div className="flex gap-6 overflow-x-auto hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-[12px] font-semibold  font-Playfair  tracking-normal transition-all relative py-2
                  ${category === cat ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 hover:text-zinc-500'}
                `}
              >
                {cat}
                {category === cat && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:flex gap-4 items-center text-zinc-400">
             <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-tighter hover:text-zinc-900 dark:hover:text-white">
                <Clock size={12}/> NEWEST
             </button>
             <button className="hover:text-zinc-900 dark:hover:text-white"><SlidersHorizontal size={14}/></button>
          </div>
        </section>

        {/* COMPACT BENTO GRID */}
        <section className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-1">
            <AnimatePresence mode='popLayout'>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`relative group overflow-hidden bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-900 ${item.span}`}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Title/Description/Like Layer - Always visible on mobile, hover on desktop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 
                                  opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-between items-end w-full">
                      <div className="flex-1">
                        <p className="text-white text-xs font-black  tracking-widest leading-none mb-1">{item.title}</p>
                        <p className="text-zinc-300 text-[10px] font-medium">{item.type}</p>
                      </div>
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                        className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
                      >
                        <Heart 
                          size={14} 
                          className={likedItems.includes(item.id) ? "fill-red-500 text-red-500" : "text-white"} 
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-24">
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.3em]">Nothing found in {category}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default GalleryPage;