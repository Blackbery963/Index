// // // // import React, { useState, useEffect, useRef } from "react";
// // // // import {
// // // //   FiSearch,
// // // //   FiX,
// // // //   FiGrid,
// // // //   FiUsers,
// // // //   FiVideo,
// // // //   FiBookOpen,
// // // //   FiFileText,
// // // //   FiShoppingBag,
// // // //   FiClock,
// // // //   FiTrendingUp
// // // // } from "react-icons/fi";
// // // // import { MdOutlineExplore } from "react-icons/md";
// // // // import { Link } from "react-router-dom";


// // // // // --- MOCK DATA ---
// // // // const MOCK_DATA = [
// // // //   { 
// // // //     id: 1, 
// // // //     type: "artwork", 
// // // //     title: "Neon Cyberpunk City", 
// // // //     author: "Alex Roe", 
// // // //     image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
// // // //     likes: "2.4k",
// // // //     date: "2 days ago"
// // // //   },
// // // //   { 
// // // //     id: 2, 
// // // //     type: "user", 
// // // //     name: "Sarah Jenkins", 
// // // //     handle: "@saraharts", 
// // // //     avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200", 
// // // //     role: "Digital Illustrator",
// // // //     followers: "12.4k"
// // // //   },
// // // //   { 
// // // //     id: 3, 
// // // //     type: "paper", 
// // // //     title: "The Impact of AI on Digital Impressionism", 
// // // //     author: "Dr. Katherine Smith", 
// // // //     date: "Oct 2025",
// // // //     citations: 42
// // // //   },
// // // //   { 
// // // //     id: 4, 
// // // //     type: "diary", 
// // // //     title: "Day 45: Learning Blender", 
// // // //     author: "BeginnerDev",
// // // //     entries: 45,
// // // //     readTime: "5 min"
// // // //   },
// // // //   { 
// // // //     id: 5, 
// // // //     type: "artwork", 
// // // //     title: "Abstract Flow", 
// // // //     author: "Mia T.", 
// // // //     image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80",
// // // //     likes: "1.8k",
// // // //     date: "1 week ago"
// // // //   },
// // // //   { 
// // // //     id: 6, 
// // // //     type: "video", 
// // // //     title: "Speedpaint: Forest Landscape", 
// // // //     author: "ArtDaily", 
// // // //     duration: "12:30",
// // // //     views: "124k",
// // // //     thumbnail: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80"
// // // //   },
// // // //   { 
// // // //     id: 7, 
// // // //     type: "for-sale", 
// // // //     title: "Oil Painting Collection", 
// // // //     author: "Traditional Arts", 
// // // //     image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80",
// // // //     price: "$1,200",
// // // //     bids: 8
// // // //   },
// // // //   { 
// // // //     id: 8, 
// // // //     type: "artwork", 
// // // //     title: "Minimalist Portrait", 
// // // //     author: "Studio Line", 
// // // //     image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&q=80",
// // // //     likes: "3.1k",
// // // //     date: "3 days ago"
// // // //   }
// // // // ];

// // // // const CATEGORIES = [
// // // //   { id: "all", label: "All", icon: MdOutlineExplore },
// // // //   { id: "artwork", label: "Artworks", icon: FiGrid },
// // // //   { id: "user", label: "People", icon: FiUsers },
// // // //   { id: "video", label: "Videos", icon: FiVideo },
// // // //   { id: "diary", label: "Diaries", icon: FiBookOpen },
// // // //   { id: "paper", label: "Research", icon: FiFileText },
// // // //   { id: "for-sale", label: "For Sale", icon: FiShoppingBag },
// // // // ];

// // // // const SearchPage = () => {
// // // //   // State
// // // //   const [query, setQuery] = useState("");
// // // //   const [activeCategory, setActiveCategory] = useState("all");
// // // //   const [isSearching, setIsSearching] = useState(false);
// // // //   const [results, setResults] = useState([]);
// // // //   const [hasSearched, setHasSearched] = useState(false);
// // // //   const [showSuggestions, setShowSuggestions] = useState(false);
// // // //   const [recentSearches, setRecentSearches] = useState([]);
  
// // // //   // Refs
// // // //   const searchContainerRef = useRef(null);
// // // //   const suggestionsRef = useRef(null);
// // // //   const inputRef = useRef(null);

// // // //   // Load recent searches
// // // //   useEffect(() => {
// // // //     const saved = localStorage.getItem("painters_recent_searches");
// // // //     if (saved) {
// // // //       try {
// // // //         setRecentSearches(JSON.parse(saved));
// // // //       } catch (e) {
// // // //         console.error("Error parsing saved searches:", e);
// // // //       }
// // // //     }
// // // //   }, []);

// // // //   // Close suggestions on click outside
// // // //   useEffect(() => {
// // // //     const handleClickOutside = (event) => {
// // // //       if (
// // // //         suggestionsRef.current && 
// // // //         !suggestionsRef.current.contains(event.target) &&
// // // //         searchContainerRef.current && 
// // // //         !searchContainerRef.current.contains(event.target)
// // // //       ) {
// // // //         setShowSuggestions(false);
// // // //       }
// // // //     };
    
// // // //     document.addEventListener("mousedown", handleClickOutside);
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // //   }, []);

// // // //   // Handle search
// // // //   const handleSearch = (e, overrideQuery = null) => {
// // // //     if (e) e.preventDefault();
    
// // // //     const searchQuery = overrideQuery || query;
// // // //     const trimmedQuery = searchQuery.trim();
    
// // // //     if (!trimmedQuery) {
// // // //       setShowSuggestions(true);
// // // //       return;
// // // //     }

// // // //     // Update state
// // // //     setQuery(trimmedQuery);
// // // //     setShowSuggestions(false);
// // // //     setHasSearched(true);
// // // //     setIsSearching(true);

// // // //     // Save to history
// // // //     const newHistory = [
// // // //       trimmedQuery, 
// // // //       ...recentSearches.filter(s => s.toLowerCase() !== trimmedQuery.toLowerCase())
// // // //     ].slice(0, 5);
    
// // // //     setRecentSearches(newHistory);
// // // //     localStorage.setItem("painters_recent_searches", JSON.stringify(newHistory));

// // // //     // Simulate API call
// // // //     setTimeout(() => {
// // // //       const lowerQuery = trimmedQuery.toLowerCase();
      
// // // //       let filtered = MOCK_DATA.filter(item => {
// // // //         const matchesQuery = 
// // // //           (item.title && item.title.toLowerCase().includes(lowerQuery)) ||
// // // //           (item.name && item.name.toLowerCase().includes(lowerQuery)) ||
// // // //           (item.author && item.author.toLowerCase().includes(lowerQuery)) ||
// // // //           (item.handle && item.handle.toLowerCase().includes(lowerQuery));
        
// // // //         const matchesCategory = 
// // // //           activeCategory === "all" || 
// // // //           item.type === activeCategory;
        
// // // //         return matchesQuery && matchesCategory;
// // // //       });

// // // //       setResults(filtered);
// // // //       setIsSearching(false);
// // // //     }, 600);
// // // //   };

// // // //   // Handle category change
// // // //   const handleCategoryChange = (categoryId) => {
// // // //     setActiveCategory(categoryId);
    
// // // //     if (query.trim() || hasSearched) {
// // // //       handleSearch(null, query);
// // // //     } else if (categoryId !== "all") {
// // // //       setIsSearching(true);
// // // //       setTimeout(() => {
// // // //         const filtered = categoryId === "all" 
// // // //           ? MOCK_DATA 
// // // //           : MOCK_DATA.filter(item => item.type === categoryId);
// // // //         setResults(filtered);
// // // //         setHasSearched(true);
// // // //         setIsSearching(false);
// // // //       }, 400);
// // // //     }
// // // //   };

// // // //   // Clear specific recent search
// // // //   const clearRecentSearch = (index, e) => {
// // // //     e.stopPropagation();
// // // //     const newHistory = recentSearches.filter((_, i) => i !== index);
// // // //     setRecentSearches(newHistory);
// // // //     localStorage.setItem("painters_recent_searches", JSON.stringify(newHistory));
// // // //   };

// // // //   // Clear all recent searches
// // // //   const clearAllRecentSearches = (e) => {
// // // //     e.stopPropagation();
// // // //     setRecentSearches([]);
// // // //     localStorage.removeItem("painters_recent_searches");
// // // //   };

// // // //   // Clear current search
// // // //   const clearSearch = () => {
// // // //     setQuery("");
// // // //     setShowSuggestions(true);
// // // //     inputRef.current?.focus();
// // // //   };

// // // //   // Get suggestions
// // // //   const getSuggestions = () => {
// // // //     if (!query.trim()) {
// // // //       return [
// // // //         "Cyberpunk Art",
// // // //         "Digital Painting", 
// // // //         "Character Design",
// // // //         "3D Modeling",
// // // //         "Watercolor Techniques"
// // // //       ];
// // // //     }
    
// // // //     const lowerQuery = query.toLowerCase();
// // // //     return [
// // // //       "Digital Painting",
// // // //       "Character Design",
// // // //       "3D Animation",
// // // //       "Concept Art",
// // // //       "Procreate Tutorial"
// // // //     ].filter(tag => tag.toLowerCase().includes(lowerQuery)).slice(0, 5);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-sans">
// // // //       <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8">
// // // //         {/* HEADER */}
// // // //         <div className={`flex flex-col transition-all duration-500 ${hasSearched ? "gap-6" : "gap-12 pt-12 md:pt-24"}`}>
          
// // // //           {/* Brand */}
// // // //           <div className="relative">
// // // //             {!hasSearched && (
// // // //               <div className="text-center mb-4">
// // // //                 <Link to={"/"}>
// // // //                 <h1 className="text-2xl md:text-3xl font-Eagle tracking-tight text-gray-900 dark:text-white mb-2">
// // // //                   Painters' Diary
// // // //                 </h1>
// // // //                 </Link>
// // // //                 <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
// // // //                   Discover art, creators, and inspiration
// // // //                 </p>
// // // //               </div>
// // // //             )}
            
// // // //             {hasSearched && (
// // // //               <div className="mb-2">
// // // //                 <Link to={"/"}>
// // // //                 <h1 className="text-xl font-medium font-Eagle text-gray-900 dark:text-white">
// // // //                   Painters' Diary
// // // //                 </h1>
// // // //                 </Link>
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           {/* SEARCH BAR CONTAINER - FIXED POSITIONING */}
// // // //           <div className="relative w-full max-w-2xl mx-auto" ref={searchContainerRef}>
            
// // // // <form
// // // //   onSubmit={handleSearch}
// // // //   className="relative flex flex-col sm:flex-row gap-3 sm:gap-0"
// // // // >
// // // //   {/* INPUT WRAPPER */}
// // // //   <div className="relative flex-1">
// // // //     {/* SEARCH ICON */}
// // // //     <FiSearch
// // // //       className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${
// // // //         isSearching
// // // //           ? "text-gray-600 dark:text-gray-300 animate-pulse"
// // // //           : "text-gray-400"
// // // //       }`}
// // // //     />

// // // //     {/* INPUT */}
// // // //     <input
// // // //       ref={inputRef}
// // // //       type="text"
// // // //       value={query}
// // // //       onFocus={() => setShowSuggestions(true)}
// // // //       onChange={(e) => {
// // // //         setQuery(e.target.value);
// // // //         setShowSuggestions(true);
// // // //       }}
// // // //       placeholder="Search artworks, artists, research..."
// // // //       className="
// // // //         w-full
// // // //         pl-12
// // // //         pr-12 sm:pr-28
// // // //         py-4
// // // //         bg-white dark:bg-zinc-900
// // // //         border border-gray-300 dark:border-zinc-700
// // // //         rounded-xl
// // // //         text-base
// // // //         focus:outline-none
// // // //         focus:ring-1 focus:ring-gray-400 dark:focus:ring-zinc-600
// // // //         transition-all
// // // //       "
// // // //     />

// // // //     {/* CLEAR BUTTON */}
// // // //     {query && (
// // // //       <button
// // // //         type="button"
// // // //         onClick={clearSearch}
// // // //         className="absolute right-3 sm:right-24 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
// // // //       >
// // // //         <FiX size={18} />
// // // //       </button>
// // // //     )}

// // // //     {/* DESKTOP SUBMIT */}
// // // //     <button
// // // //       type="submit"
// // // //       className="
// // // //         hidden sm:flex
// // // //         absolute right-2 top-1/2 -translate-y-1/2
// // // //         px-4 py-2
// // // //         bg-gray-900 dark:bg-white
// // // //         text-white dark:text-black
// // // //         rounded-lg
// // // //         font-medium
// // // //         hover:opacity-90
// // // //         transition
// // // //       "
// // // //     >
// // // //       Search
// // // //     </button>
// // // //   </div>

// // // //   {/* MOBILE SUBMIT */}
// // // //   <button
// // // //     type="submit"
// // // //     className="
// // // //       sm:hidden
// // // //       w-full
// // // //       py-3
// // // //       bg-gray-900 dark:bg-white
// // // //       text-white dark:text-black
// // // //       rounded-xl
// // // //       font-medium
// // // //       hover:opacity-90
// // // //       transition
// // // //     "
// // // //   >
// // // //     Search
// // // //   </button>
// // // // </form>

// // // //             {/* SUGGESTIONS DROPDOWN - FIXED POSITIONING */}
// // // //             {showSuggestions && (
// // // //               <div 
// // // //                 ref={suggestionsRef}
// // // //                 className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg overflow-hidden z-50"
// // // //                 style={{ position: 'absolute' }}
// // // //               >
// // // //                 {recentSearches.length > 0 && (
// // // //                   <div className="p-3 border-b border-gray-100 dark:border-zinc-800">
// // // //                     <div className="flex justify-between items-center mb-2">
// // // //                       <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Recent</p>
// // // //                       <button
// // // //                         onClick={clearAllRecentSearches}
// // // //                         className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
// // // //                       >
// // // //                         Clear All
// // // //                       </button>
// // // //                     </div>
// // // //                     {recentSearches.map((term, idx) => (
// // // //                       <div key={idx} className="flex items-center justify-between group">
// // // //                         <button 
// // // //                           onClick={(e) => handleSearch(e, term)}
// // // //                           className="flex-1 text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg flex items-center gap-2 transition-colors"
// // // //                         >
// // // //                           <FiClock className="text-gray-400" size={14} /> 
// // // //                           <span>{term}</span>
// // // //                         </button>
// // // //                         <button
// // // //                           onClick={(e) => clearRecentSearch(idx, e)}
// // // //                           className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
// // // //                         >
// // // //                           <FiX size={14} />
// // // //                         </button>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 )}
                
// // // //                 <div className="p-3">
// // // //                   <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
// // // //                     {query ? "Suggestions" : "Popular Searches"}
// // // //                   </p>
// // // //                   {getSuggestions().map((suggestion, i) => (
// // // //                     <button 
// // // //                       key={i}
// // // //                       onClick={(e) => handleSearch(e, suggestion)}
// // // //                       className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg flex items-center gap-2 transition-colors"
// // // //                     >
// // // //                       <FiSearch className="text-gray-400" size={14} /> 
// // // //                       {suggestion}
// // // //                     </button>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           {/* CATEGORIES */}
// // // //           <div className="w-full max-w-2xl mx-auto">
// // // //             <div className="flex items-center gap-1 mb-4">
// // // //               <FiTrendingUp className="text-gray-400" size={16} />
// // // //               <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Browse by</span>
// // // //             </div>
            
// // // //             <div className="flex flex-wrap gap-2 overflow-scroll">
// // // //               {CATEGORIES.map((cat) => {
// // // //                 const Icon = cat.icon;
// // // //                 return (
// // // //                   <button
// // // //                     key={cat.id}
// // // //                     onClick={() => handleCategoryChange(cat.id)}
// // // //                     className={`
// // // //                       flex items-center gap-2 px-2 py-1 rounded-lg text-sm font-medium transition-all
// // // //                       ${activeCategory === cat.id
// // // //                         ? "bg-gray-900 dark:bg-white text-white dark:text-black"
// // // //                         : "bg-gray-50 dark:bg-zinc-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-700"
// // // //                       }
// // // //                     `}
// // // //                   >
// // // //                     <Icon size={16} />
// // // //                     {cat.label}
// // // //                   </button>
// // // //                 );
// // // //               })}
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* RESULTS */}
// // // //         {hasSearched && (
// // // //           <div className="mt-12 animate-in fade-in duration-300">
// // // //             <div className="flex items-center justify-between mb-8">
// // // //               <div>
// // // //                 <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-1">
// // // //                   {query 
// // // //                     ? `Results for "${query}"` 
// // // //                     : activeCategory !== "all" 
// // // //                       ? CATEGORIES.find(c => c.id === activeCategory)?.label
// // // //                       : "All Content"
// // // //                   }
// // // //                 </h2>
// // // //                 <p className="text-sm text-gray-500 dark:text-gray-400">
// // // //                   {results.length} {results.length === 1 ? 'result' : 'results'} found
// // // //                 </p>
// // // //               </div>
// // // //             </div>
            
// // // //             {isSearching ? (
// // // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // // //                 {[...Array(8)].map((_, i) => (
// // // //                   <SkeletonCard key={i} />
// // // //                 ))}
// // // //               </div>
// // // //             ) : results.length > 0 ? (
// // // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // // //                 {results.map((item) => (
// // // //                   <ResultCard key={item.id} item={item} />
// // // //                 ))}
// // // //               </div>
// // // //             ) : (
// // // //               <div className="text-center py-16 border border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50">
// // // //                 <div className="inline-block p-4 rounded-full bg-white dark:bg-black mb-4">
// // // //                   <FiSearch className="text-gray-400" size={28} />
// // // //                 </div>
// // // //                 <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
// // // //                   No results found
// // // //                 </h3>
// // // //                 <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-md mx-auto">
// // // //                   {query 
// // // //                     ? `No matches found for "${query}". Try different keywords.`
// // // //                     : "No items in this category yet."
// // // //                   }
// // // //                 </p>
// // // //                 <div className="flex gap-3 justify-center">
// // // //                   <button 
// // // //                     onClick={() => setActiveCategory("all")}
// // // //                     className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors"
// // // //                   >
// // // //                     View All
// // // //                   </button>
// // // //                   <button 
// // // //                     onClick={clearSearch}
// // // //                     className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
// // // //                   >
// // // //                     Clear Search
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // --- Skeleton Card ---
// // // // const SkeletonCard = () => (
// // // //   <div className="border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
// // // //     <div className="aspect-[4/3] bg-gray-200 dark:bg-zinc-800 animate-pulse" />
// // // //     <div className="p-4 space-y-3">
// // // //       <div className="flex justify-between">
// // // //         <div className="h-3 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
// // // //         <div className="h-3 w-10 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
// // // //       </div>
// // // //       <div className="h-5 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
// // // //       <div className="h-3 w-1/3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
// // // //     </div>
// // // //   </div>
// // // // );

// // // // // --- Result Card ---
// // // // const ResultCard = ({ item }) => {
// // // //   const getTypeLabel = (type) => {
// // // //     const labels = {
// // // //       artwork: "Artwork",
// // // //       user: "Creator",
// // // //       video: "Video",
// // // //       diary: "Diary",
// // // //       paper: "Research",
// // // //       "for-sale": "For Sale"
// // // //     };
// // // //     return labels[type] || type;
// // // //   };

// // // //   return (
// // // //     <div className="group bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
// // // //       {/* Image/Thumbnail */}
// // // //       <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-zinc-800">
// // // //         {item.image || item.avatar || item.thumbnail ? (
// // // //           <img 
// // // //             src={item.image || item.avatar || item.thumbnail} 
// // // //             alt={item.title || item.name} 
// // // //             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
// // // //           />
// // // //         ) : (
// // // //           <div className="w-full h-full flex items-center justify-center">
// // // //             <div className="text-gray-400">
// // // //               {item.type === "user" && <FiUsers size={32} />}
// // // //               {item.type === "diary" && <FiBookOpen size={32} />}
// // // //               {item.type === "paper" && <FiFileText size={32} />}
// // // //               {item.type === "video" && <FiVideo size={32} />}
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
      
// // // //       {/* Content */}
// // // //       <div className="p-4">
// // // //         {/* Type Badge */}
// // // //         <div className="flex items-center justify-between mb-3">
// // // //           <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 rounded">
// // // //             {getTypeLabel(item.type)}
// // // //           </span>
// // // //           <span className="text-xs text-gray-500 dark:text-gray-400">
// // // //             {item.date || item.duration || ""}
// // // //           </span>
// // // //         </div>
        
// // // //         {/* Title */}
// // // //         <h3 className="font-medium text-gray-900 dark:text-white text-lg mb-2 line-clamp-1">
// // // //           {item.title || item.name}
// // // //         </h3>
        
// // // //         {/* Author */}
// // // //         <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
// // // //           {item.author || item.role || item.handle}
// // // //         </p>
        
// // // //         {/* Stats */}
// // // //         <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
// // // //           <div className="flex items-center gap-4">
// // // //             {item.likes && (
// // // //               <span className="flex items-center gap-1">
// // // //                 {item.likes} likes
// // // //               </span>
// // // //             )}
// // // //             {item.followers && (
// // // //               <span className="flex items-center gap-1">
// // // //                 {item.followers}
// // // //               </span>
// // // //             )}
// // // //             {item.views && (
// // // //               <span>{item.views} views</span>
// // // //             )}
// // // //           </div>
          
// // // //           {item.price && (
// // // //             <span className="font-medium text-gray-900 dark:text-white">
// // // //               {item.price}
// // // //             </span>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SearchPage;


// // // import React, { useState } from "react";
// // // import { Link } from "react-router-dom";
// // // import {
// // //   FiSearch,
// // //   FiUser,
// // //   FiHeart,
// // //   FiMessageCircle,
// // //   FiGrid,
// // //   FiBookOpen,
// // //   FiShoppingBag,
// // //   FiMapPin,
// // //   FiFileText,
// // //   FiTv
// // // } from "react-icons/fi";

// // // // --- MOCK DATA (With Grid Spans for "Insta" Look) ---
// // // const MOCK_DATA = [
// // //   {
// // //     id: 1,
// // //     type: "artwork",
// // //     title: "Neon City Lights",
// // //     author: "Alex Roe",
// // //     image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
// // //     likes: "2.4k",
// // //     span: "col-span-2 row-span-2" // Large item
// // //   },
// // //   {
// // //     id: 2,
// // //     type: "user",
// // //     title: "Sarah Jenkins",
// // //     handle: "@saraharts",
// // //     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
// // //     role: "Artist",
// // //     span: "col-span-1 row-span-1" // Standard item
// // //   },
// // //   {
// // //     id: 3,
// // //     type: "diary",
// // //     title: "Kyoto Travel Diary",
// // //     author: "Traveler_Ken",
// // //     image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600",
// // //     likes: "850",
// // //     span: "col-span-1 row-span-2" // Tall item
// // //   },
// // //   {
// // //     id: 4,
// // //     type: "guide",
// // //     title: "Beginner's Guide to Oils",
// // //     author: "ArtSchool",
// // //     image: "https://images.unsplash.com/photo-1599818676574-d4f82637293e?w=600",
// // //     likes: "420",
// // //     span: "col-span-1 row-span-1"
// // //   },
// // //   {
// // //     id: 5,
// // //     type: "sell",
// // //     title: "Vintage Palette - $45",
// // //     author: "Art Supply Co.",
// // //     image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600",
// // //     span: "col-span-1 row-span-1"
// // //   },
// // //   {
// // //     id: 6,
// // //     type: "artwork",
// // //     title: "Abstract Flow",
// // //     author: "Mia T.",
// // //     image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80",
// // //     likes: "1.8k",
// // //     span: "col-span-2 row-span-1" // Wide item
// // //   },
// // //   {
// // //     id: 7,
// // //     type: "blog",
// // //     title: "The Future of Digital Art",
// // //     author: "TechDaily",
// // //     image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
// // //     span: "col-span-1 row-span-1"
// // //   },
// // //   {
// // //     id: 8,
// // //     type: "diary",
// // //     title: "Sketching in Paris",
// // //     author: "Jean Luc",
// // //     image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
// // //     likes: "3.1k",
// // //     span: "col-span-1 row-span-2"
// // //   },
// // //   {
// // //     id: 9,
// // //     type: "sell",
// // //     title: "Custom Brushes",
// // //     author: "ProEdit",
// // //     image: "https://images.unsplash.com/photo-1586075010999-9bc9e4c17613?w=600",
// // //     span: "col-span-1 row-span-1"
// // //   },
// // //   {
// // //     id: 10,
// // //     type: "artwork",
// // //     title: "Mountain Fog",
// // //     author: "NatureLover",
// // //     image: "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?w=600",
// // //     likes: "900",
// // //     span: "col-span-1 row-span-1"
// // //   },
// // //   {
// // //     id: 11,
// // //     type: "guide",
// // //     title: "Color Theory 101",
// // //     author: "DesignMaster",
// // //     image: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=600",
// // //     span: "col-span-2 row-span-2"
// // //   },
// // // ];

// // // const CATEGORIES = [
// // //   { id: "all", label: "All", icon: FiGrid },
// // //   { id: "artwork", label: "Artworks", icon: FiGrid },
// // //   { id: "diary", label: "Travel Diaries", icon: FiMapPin },
// // //   { id: "article", label: "Articles", icon: FiFileText },
// // //   { id: "user", label: "Users", icon: FiUser },
// // //   { id: "guide", label: "Guides", icon: FiTv },
// // //   { id: "sell", label: "Sell Options", icon: FiShoppingBag },
// // //   { id: "blog", label: "Blogs", icon: FiBookOpen },
// // // ];

// // // const SearchPage = () => {
// // //   const [query, setQuery] = useState("");
// // //   const [activeCategory, setActiveCategory] = useState("all");

// // //   // Simple Filtering Logic
// // //   const filteredData = MOCK_DATA.filter((item) => {
// // //     const matchesCategory = activeCategory === "all" || item.type === activeCategory;
// // //     const matchesSearch = item.title.toLowerCase().includes(query.toLowerCase()) || 
// // //                           item.author.toLowerCase().includes(query.toLowerCase());
// // //     return matchesCategory && matchesSearch;
// // //   });

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 font-sans">
      
// // //       {/* --- HEADER --- */}
// // //       <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
// // //         <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
// // //           {/* Logo */}
// // //           <Link to="/" className="flex-shrink-0">
// // //             <h1 className="font-serif text-xl md:text-2xl font-bold tracking-tight">
// // //               Painters' Diary
// // //             </h1>
// // //           </Link>

// // //           {/* Search Bar - Centered & Wide */}
// // //           <div className="flex-1 max-w-2xl mx-auto">
// // //             <div className="relative group">
// // //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // //                 <FiSearch className="text-gray-400 group-focus-within:text-gray-900 dark:group-focus-within:text-white transition-colors" />
// // //               </div>
// // //               <input
// // //                 type="text"
// // //                 value={query}
// // //                 onChange={(e) => setQuery(e.target.value)}
// // //                 placeholder="Search for art, diaries, guides..."
// // //                 className="w-full bg-gray-100 dark:bg-zinc-900 text-sm md:text-base border-transparent focus:border-gray-300 dark:focus:border-zinc-700 focus:bg-white dark:focus:bg-black rounded-lg py-2.5 pl-10 pr-4 outline-none transition-all shadow-sm"
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* User Profile */}
// // //           <div className="flex-shrink-0 flex items-center gap-3">
// // //             <button className="hidden sm:block p-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors">
// // //               <FiMessageCircle size={22} />
// // //             </button>
// // //             <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[2px] cursor-pointer">
// // //               <img 
// // //                 src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" 
// // //                 alt="Profile" 
// // //                 className="rounded-full h-full w-full object-cover border-2 border-white dark:border-black"
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <div className="max-w-7xl mx-auto px-4 py-6">
        
// // //         {/* --- CATEGORIES --- */}
// // //         <div className="flex overflow-x-auto pb-6 scrollbar-hide gap-3">
// // //           {CATEGORIES.map((cat) => (
// // //             <button
// // //               key={cat.id}
// // //               onClick={() => setActiveCategory(cat.id)}
// // //               className={`
// // //                 flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all
// // //                 ${activeCategory === cat.id 
// // //                   ? "bg-black dark:bg-white text-white dark:text-black shadow-md transform scale-105" 
// // //                   : "bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800"}
// // //               `}
// // //             >
// // //               {activeCategory === cat.id && <cat.icon size={14} />}
// // //               {cat.label}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         {/* --- DENSE GRID CONTENT --- */}
// // //         {/* Using CSS Grid Auto-Flow Dense for the 'unique/mosaic' look */}
// // //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-[180px] grid-flow-dense">
          
// // //           {filteredData.length > 0 ? (
// // //             filteredData.map((item) => (
// // //               <div 
// // //                 key={item.id} 
// // //                 className={`relative group overflow-hidden rounded-md bg-gray-200 dark:bg-zinc-800 ${item.span}`}
// // //               >
// // //                 {/* Image */}
// // //                 <img 
// // //                   src={item.image} 
// // //                   alt={item.title} 
// // //                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
// // //                 />

// // //                 {/* Dark Gradient Overlay on Hover */}
// // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  
// // //                   {/* Content appearing on hover */}
// // //                   <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
// // //                     <span className="inline-block px-2 py-0.5 mb-2 text-[10px] uppercase font-bold tracking-wider text-black bg-white/90 rounded-sm">
// // //                       {item.type}
// // //                     </span>
// // //                     <h3 className="text-white font-bold text-sm md:text-lg leading-tight mb-1 truncate">
// // //                       {item.title}
// // //                     </h3>
// // //                     <div className="flex items-center justify-between text-gray-300 text-xs">
// // //                       <span>{item.author}</span>
// // //                       {item.likes && (
// // //                         <span className="flex items-center gap-1">
// // //                           <FiHeart className="fill-current" /> {item.likes}
// // //                         </span>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))
// // //           ) : (
// // //             // Empty State
// // //             <div className="col-span-full py-20 text-center">
// // //               <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-zinc-800 mb-4">
// // //                 <FiSearch className="text-gray-400 text-3xl" />
// // //               </div>
// // //               <p className="text-gray-500 dark:text-gray-400">No results found for your search.</p>
// // //             </div>
// // //           )}

// // //         </div>

// // //         {/* End of content hint */}
// // //         {filteredData.length > 0 && (
// // //           <div className="text-center py-12">
// // //             <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 dark:border-zinc-700 animate-spin border-t-transparent"></div>
// // //           </div>
// // //         )}

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default SearchPage;




// import React, { useState, useEffect, useRef } from "react";
// import {
//   Search,
//   X,
//   Clock,
//   Grid,
//   Image,
//   BookOpen,
//   ShoppingBag,
//   Video,
//   MoreHorizontal,
//   Heart,
//   Cloud,
//   Calendar,
//   ArrowUpRight,
//   Trash2,
//   Palette,
//   Brush,
//   Sparkles,
//   TrendingUp
// } from "lucide-react";

// // --- ENHANCED SEARCH DATA ---
// const SUGGESTION_KEYWORDS = [
//   "Portraits", "Portrait Photography", "Oil Painting", 
//   "Abstract Art", "Acrylic Pouring", "Sketching Basics",
//   "Digital Illustration", "Landscape", "Watercolor", 
//   "Procreate Brushes", "Art History", "Modernism",
//   "Pencil Drawing", "Photography Tips", "Art Supplies",
//   "Anatomy Studies", "Color Theory", "Pastel Techniques"
// ];

// // --- ENHANCED FEED DATA ---
// const MOCK_DATA = [
//   {
//     id: 'w1', type: "weather", span: "row-span-1",
//     city: "San Francisco", temp: "18°", condition: "Partly Cloudy"
//   },
//   {
//     id: 1, type: "artwork", category: "art", title: "Silent Portraits", author: "Elena R.",
//     image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
//     likes: "1.2k", span: "row-span-2" 
//   },
//   {
//     id: 'h1', type: "history", span: "row-span-1",
//     year: "1889", event: "The Starry Night was painted by Vincent van Gogh in Saint-Rémy-de-Provence."
//   },
//   {
//     id: 2, type: "diary", category: "diary", title: "Studio Morning", author: "Sarah J.",
//     image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600",
//     likes: "850", span: "row-span-1"
//   },
//   {
//     id: 3, type: "sell", category: "store", title: "Matte Acrylics", author: "Supply Co.",
//     image: "https://images.unsplash.com/photo-1586075010999-9bc9e4c17613?w=600",
//     likes: "120", span: "row-span-1"
//   },
//   {
//     id: 4, type: "artwork", category: "art", title: "Abstract Blue", author: "Mia T.",
//     image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80",
//     likes: "1.8k", span: "row-span-1"
//   },
//   {
//     id: 5, type: "video", category: "video", title: "Masterclass", author: "ArtDaily",
//     image: "https://images.unsplash.com/photo-1599818676574-d4f82637293e?w=600",
//     likes: "3.1k", span: "row-span-2"
//   },
//   {
//     id: 6, type: "artwork", category: "art", title: "Sunset Horizon", author: "James K.",
//     image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600",
//     likes: "945", span: "row-span-1"
//   },
//   {
//     id: 7, type: "diary", category: "diary", title: "Creative Process", author: "Alex M.",
//     image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600",
//     likes: "567", span: "row-span-1"
//   },
// ];

// const CATEGORIES = [
//   { id: "all", label: "For You", icon: Sparkles },
//   { id: "art", label: "Artworks", icon: Palette },
//   { id: "diary", label: "Diaries", icon: BookOpen },
//   { id: "store", label: "Shop", icon: ShoppingBag },
//   { id: "video", label: "Watch", icon: Video },
// ];

// const SearchPage = () => {
//   const [query, setQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [isFocused, setIsFocused] = useState(false);
//   const [history, setHistory] = useState(["Watercolor Techniques", "Digital Art"]);
//   const [suggestions, setSuggestions] = useState([]);
  
//   const inputRef = useRef(null);
//   const dropdownRef = useRef(null);

//   // Click Outside Handler
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         inputRef.current && !inputRef.current.contains(event.target) &&
//         dropdownRef.current && !dropdownRef.current.contains(event.target)
//       ) {
//         setIsFocused(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Smart Suggestions with Highlighting
//   useEffect(() => {
//     if (!query.trim()) {
//       setSuggestions([]);
//       return;
//     }
//     const lowerQuery = query.toLowerCase();
    
//     const keywordMatches = SUGGESTION_KEYWORDS.filter(k => 
//       k.toLowerCase().includes(lowerQuery)
//     ).slice(0, 6);

//     setSuggestions(keywordMatches);
//   }, [query]);

//   const handleSearch = (term) => {
//     const searchTerm = term || query;
//     if (!searchTerm.trim()) return;

//     setQuery(searchTerm);
//     setIsFocused(false);

//     const newHistory = [searchTerm, ...history.filter(h => h !== searchTerm)].slice(0, 5);
//     setHistory(newHistory);
//   };

//   const deleteHistoryItem = (e, item) => {
//     e.stopPropagation();
//     const newHistory = history.filter(h => h !== item);
//     setHistory(newHistory);
//   };

//   // Highlight matching part
//   const highlightMatch = (text, query) => {
//     if (!query) return text;
//     const index = text.toLowerCase().indexOf(query.toLowerCase());
//     if (index === -1) return text;
    
//     return (
//       <>
//         {text.substring(0, index)}
//         <span className="font-bold text-zinc-900 dark:text-white">{text.substring(index, index + query.length)}</span>
//         {text.substring(index + query.length)}
//       </>
//     );
//   };

//   const filteredData = MOCK_DATA.filter((item) => {
//     if (activeCategory !== "all") {
//        if (item.type === 'weather' || item.type === 'history') return false;
//        if (item.category !== activeCategory) return false;
//     }
    
//     if (query) {
//        const title = (item.title || "").toLowerCase();
//        const type = (item.type || "").toLowerCase();
//        return title.includes(query.toLowerCase()) || type.includes(query.toLowerCase());
//     }
//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
      
//       {/* PREMIUM HEADER */}
//       <div className="bg-white dark:bg-zinc-900 border-b rounded-b-3xl border-zinc-200 dark:border-zinc-800 pt-4 pb-6 px-4 md:px-6">
//         <div className="max-w-7xl mx-auto">
          
//           {/* Top Bar */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white font-Eagle">
//               Painters' Diary
//             </div>
//             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 overflow-hidden border border-zinc-300 dark:border-zinc-700">
//                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="Profile" className="w-full h-full object-cover" />
//             </div>
//           </div>

//           {/* COMPACT SEARCH BAR */}
//           <div className="max-w-2xl mx-auto relative">
//             <div 
//               className={`
//                 flex items-center w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg border transition-all duration-200
//                 ${isFocused 
//                   ? 'border-zinc-400 dark:border-zinc-600 ring-2 ring-zinc-200 dark:ring-zinc-700' 
//                   : 'border-zinc-200 dark:border-zinc-700'}
//               `}
//             >
//               <div className="pl-3 text-zinc-400 dark:text-zinc-500">
//                 <Search size={18} />
//               </div>
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={query}
//                 onFocus={() => setIsFocused(true)}
//                 onChange={(e) => setQuery(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                 placeholder="Search artworks, artists, or guides..."
//                 className="w-full py-2.5 px-3 bg-transparent outline-none text-sm font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-zinc-900 dark:text-white"
//               />
//               {query && (
//                 <button onClick={() => setQuery("")} className="pr-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
//                   <X size={16} />
//                 </button>
//               )}
//             </div>

//             {/* PREMIUM DROPDOWN */}
//             {isFocused && (
//               <div ref={dropdownRef} className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-50">
                
//                 {/* History */}
//                 {history.length > 0 && !query && (
//                   <div className="py-1">
//                     <p className="px-3 py-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Recent</p>
//                     {history.map((term, i) => (
//                       <div key={i} className="flex items-center justify-between px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer group" onClick={() => handleSearch(term)}>
//                          <div className="flex items-center gap-2.5 text-zinc-700 dark:text-zinc-300 text-sm">
//                            <Clock size={14} className="text-zinc-400 dark:text-zinc-500" />
//                            <span>{term}</span>
//                          </div>
//                          <button 
//                            onClick={(e) => deleteHistoryItem(e, term)}
//                            className="text-zinc-300 dark:text-zinc-600 hover:text-red-500 dark:hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                          >
//                            <Trash2 size={12} />
//                          </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Suggestions with Smart Highlighting */}
//                 {query && suggestions.length > 0 && (
//                    <div className="py-1">
//                       <p className="px-3 py-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Suggestions</p>
//                       {suggestions.map((term, i) => (
//                         <div key={i} onClick={() => handleSearch(term)} className="flex items-center gap-2.5 px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer text-zinc-600 dark:text-zinc-300 text-sm group">
//                            <Search size={14} className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400" />
//                            <span className="font-medium">
//                              {highlightMatch(term, query)}
//                            </span>
//                         </div>
//                       ))}
//                    </div>
//                 )}
                
//                 {/* Empty State */}
//                 {query && suggestions.length === 0 && (
//                   <div className="p-6 text-center text-zinc-400 dark:text-zinc-500 text-sm">
//                     No suggestions found
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 pb-20">
        
//         {/* Compact Category Pills */}
//         <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
//            {CATEGORIES.map((cat) => (
//              <button
//                key={cat.id}
//                onClick={() => setActiveCategory(cat.id)}
//                className={`
//                  flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap border
//                  ${activeCategory === cat.id 
//                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white" 
//                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"}
//                `}
//              >
//                <cat.icon size={13} />
//                {cat.label}
//              </button>
//            ))}
//         </div>

//         {/* COMPACT GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-auto">
          
//           {filteredData.map((item) => {
             
//              // Weather Widget
//              if (item.type === "weather") {
//                 return (
//                   <div key={item.id} className="sm:col-span-1 bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between h-[160px]">
//                       <div className="flex justify-between items-start">
//                          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
//                             <Cloud size={14} />
//                             <span className="text-[10px] font-bold uppercase tracking-wide">Weather</span>
//                          </div>
//                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Now</span>
//                       </div>
//                       <div>
//                          <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-0.5">{item.temp}</div>
//                          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{item.condition}</div>
//                          <div className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">{item.city}</div>
//                       </div>
//                   </div>
//                 )
//              }

//              // History Widget
//              if (item.type === "history") {
//                 return (
//                   <div key={item.id} className="sm:col-span-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between h-[160px]">
//                       <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
//                          <Calendar size={14} />
//                          <span className="text-[10px] font-bold uppercase tracking-wide">This Day</span>
//                       </div>
//                       <div>
//                          <div className="text-xl font-bold text-zinc-900 dark:text-white mb-1.5">{item.year}</div>
//                          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-snug line-clamp-2">
//                            {item.event}
//                          </p>
//                       </div>
//                       <button className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 hover:underline text-left">Learn more</button>
//                   </div>
//                 )
//              }

//              // Standard Items
//              return (
//                <div 
//                  key={item.id} 
//                  className={`group relative bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 ${item.span}`}
//                >
//                  {/* Image */}
//                  <div className={`relative w-full ${item.span === 'row-span-2' ? 'h-[240px]' : 'h-[140px]'}`}>
//                     <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    
//                     <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                        <button className="w-7 h-7 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-zinc-700 dark:text-zinc-300 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50">
//                           <MoreHorizontal size={14} />
//                        </button>
//                     </div>
//                  </div>

//                  {/* Content */}
//                  <div className="p-3">
//                     <div className="flex justify-between items-start mb-1">
//                        <span className="text-[9px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">{item.category}</span>
//                        {item.likes && (
//                          <div className="flex items-center gap-1 text-[10px] text-zinc-400 dark:text-zinc-500">
//                            <Heart size={11} className="group-hover:text-red-500 transition-colors" /> {item.likes}
//                          </div>
//                        )}
//                     </div>
//                     <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight mb-0.5 truncate">{item.title}</h3>
//                     <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{item.author}</p>
                    
//                     <button className="w-full mt-2.5 py-1.5 rounded-md bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-1">
//                        View <ArrowUpRight size={11} />
//                     </button>
//                  </div>
//                </div>
//              )
//           })}
//         </div>
        
//         {/* Empty State */}
//         {filteredData.length === 0 && (
//           <div className="text-center py-16">
//              <div className="text-3xl mb-3">🎨</div>
//              <p className="text-zinc-400 dark:text-zinc-500 text-sm">No items found</p>
//           </div>
//         )}

//       </main>
//     </div>
//   );
// };

// export default SearchPage;



import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  Clock,
  Grid,
  Image,
  BookOpen,
  ShoppingBag,
  Video,
  MoreHorizontal,
  Heart,
  Cloud,
  Calendar,
  ArrowUpRight,
  Trash2,
  Palette,
  Brush,
  Sparkles,
  TrendingUp
} from "lucide-react";
import {Link} from "react-router-dom"

// --- ENHANCED SEARCH DATA ---
const SUGGESTION_KEYWORDS = [
  "Portraits", "Portrait Photography", "Oil Painting", 
  "Abstract Art", "Acrylic Pouring", "Sketching Basics",
  "Digital Illustration", "Landscape", "Watercolor", 
  "Procreate Brushes", "Art History", "Modernism",
  "Pencil Drawing", "Photography Tips", "Art Supplies",
  "Anatomy Studies", "Color Theory", "Pastel Techniques"
];

// --- ENHANCED FEED DATA ---
const MOCK_DATA = [
  {
    id: 'w1', type: "weather", span: "row-span-1",
    city: "San Francisco", temp: "18°", condition: "Partly Cloudy"
  },
  {
    id: 1, type: "artwork", category: "art", title: "Silent Portraits", author: "Elena R.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    likes: "1.2k", span: "row-span-2" 
  },
  {
    id: 'h1', type: "history", span: "row-span-1",
    year: "1889", event: "The Starry Night was painted by Vincent van Gogh in Saint-Rémy-de-Provence."
  },
  {
    id: 2, type: "diary", category: "diary", title: "Studio Morning", author: "Sarah J.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600",
    likes: "850", span: "row-span-1"
  },
  {
    id: 3, type: "sell", category: "store", title: "Matte Acrylics", author: "Supply Co.",
    image: "https://images.unsplash.com/photo-1586075010999-9bc9e4c17613?w=600",
    likes: "120", span: "row-span-1"
  },
  {
    id: 4, type: "artwork", category: "art", title: "Abstract Blue", author: "Mia T.",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80",
    likes: "1.8k", span: "row-span-1"
  },
  {
    id: 5, type: "video", category: "video", title: "Masterclass", author: "ArtDaily",
    image: "https://images.unsplash.com/photo-1599818676574-d4f82637293e?w=600",
    likes: "3.1k", span: "row-span-2"
  },
  {
    id: 6, type: "artwork", category: "art", title: "Sunset Horizon", author: "James K.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600",
    likes: "945", span: "row-span-1"
  },
  {
    id: 7, type: "diary", category: "diary", title: "Creative Process", author: "Alex M.",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600",
    likes: "567", span: "row-span-1"
  },
];

const CATEGORIES = [
  { id: "all", label: "For You", icon: Sparkles },
  { id: "art", label: "Artworks", icon: Palette },
  { id: "diary", label: "Diaries", icon: BookOpen },
  { id: "store", label: "Shop", icon: ShoppingBag },
  { id: "video", label: "Watch", icon: Video },
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState(["Watercolor Techniques", "Digital Art"]);
  const [suggestions, setSuggestions] = useState([]);
  
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current && !inputRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Smart Suggestions with Highlighting
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    
    const keywordMatches = SUGGESTION_KEYWORDS.filter(k => 
      k.toLowerCase().includes(lowerQuery)
    ).slice(0, 6);

    setSuggestions(keywordMatches);
  }, [query]);

  const handleSearch = (term) => {
    const searchTerm = term || query;
    if (!searchTerm.trim()) return;

    setQuery(searchTerm);
    setIsFocused(false);

    const newHistory = [searchTerm, ...history.filter(h => h !== searchTerm)].slice(0, 5);
    setHistory(newHistory);
  };

  const deleteHistoryItem = (e, item) => {
    e.stopPropagation();
    const newHistory = history.filter(h => h !== item);
    setHistory(newHistory);
  };

  // Highlight matching part
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    
    return (
      <>
        {text.substring(0, index)}
        <span className="font-bold text-zinc-900 dark:text-white">{text.substring(index, index + query.length)}</span>
        {text.substring(index + query.length)}
      </>
    );
  };

  const filteredData = MOCK_DATA.filter((item) => {
    if (activeCategory !== "all") {
       if (item.type === 'weather' || item.type === 'history') return false;
       if (item.category !== activeCategory) return false;
    }
    
    if (query) {
       const title = (item.title || "").toLowerCase();
       const type = (item.type || "").toLowerCase();
       return title.includes(query.toLowerCase()) || type.includes(query.toLowerCase());
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
      
      {/* PREMIUM HEADER */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 pt-4 pb-6 px-4 md:px-6 rounded-b-3xl">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"}>
            <div className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white font-Eagle">
              Painters' 
              Diary
            </div>
            </Link>

            <Link to={"/account"}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 overflow-hidden border border-zinc-300 dark:border-zinc-700">
               <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="Profile" className="w-full h-full object-cover" />
            </div>
            </Link>

          </div>

          {/* COMPACT SEARCH BAR */}
          <div className="max-w-2xl mx-auto relative">
            
            <div 
              className={`
                flex items-center w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg border transition-all duration-200
                ${isFocused 
                  ? 'border-zinc-400 dark:border-zinc-600 ring-2 ring-zinc-200 dark:ring-zinc-700' 
                  : 'border-zinc-200 dark:border-zinc-700'}
              `}
             >
              <div className="pl-3 text-zinc-400 dark:text-zinc-500">
                <Search size={18} />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onFocus={() => setIsFocused(true)}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search artworks, artists, or guides..."
                className="w-full py-2.5 px-3 bg-transparent outline-none text-sm font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-zinc-900 dark:text-white"
              />
              {query && (
                <button onClick={() => setQuery("")} className="pr-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* PREMIUM DROPDOWN */}
            {isFocused && (
              <div ref={dropdownRef} className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-50">
                
                {/* History */}
                {history.length > 0 && !query && (
                  <div className="py-1">
                    <p className="px-3 py-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Recent</p>
                    {history.map((term, i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer group" onClick={() => handleSearch(term)}>
                         <div className="flex items-center gap-2.5 text-zinc-700 dark:text-zinc-300 text-sm">
                           <Clock size={14} className="text-zinc-400 dark:text-zinc-500" />
                           <span>{term}</span>
                         </div>
                         <button 
                           onClick={(e) => deleteHistoryItem(e, term)}
                           className="text-zinc-300 dark:text-zinc-600 hover:text-red-500 dark:hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                         >
                           <Trash2 size={12} />
                         </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions with Smart Highlighting */}
                {query && suggestions.length > 0 && (
                   <div className="py-1">
                      <p className="px-3 py-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Suggestions</p>
                      {suggestions.map((term, i) => (
                        <div key={i} onClick={() => handleSearch(term)} className="flex items-center gap-2.5 px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer text-zinc-600 dark:text-zinc-300 text-sm group">
                           <Search size={14} className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400" />
                           <span className="font-medium">
                             {highlightMatch(term, query)}
                           </span>
                        </div>
                      ))}
                   </div>
                )}
                
                {/* Empty State */}
                {query && suggestions.length === 0 && (
                  <div className="p-6 text-center text-zinc-400 dark:text-zinc-500 text-sm">
                    No suggestions found
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 pb-20">
        
        {/* Compact Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
           {CATEGORIES.map((cat) => (
             <button
               key={cat.id}
               onClick={() => setActiveCategory(cat.id)}
               className={`
                 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap border
                 ${activeCategory === cat.id 
                   ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white" 
                   : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"}
               `}
             >
               <cat.icon size={13} />
               {cat.label}
             </button>
           ))}
        </div>

        {/* PROFESSIONAL GRID - Responsive Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-auto">
          
          {filteredData.map((item) => {
             
             // Weather Widget - FULL WIDTH on mobile
             if (item.type === "weather") {
                return (
                  <div key={item.id} className="col-span-2 md:col-span-1 bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between h-[160px]">
                      <div className="flex justify-between items-start">
                         <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                            <Cloud size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wide">Weather</span>
                         </div>
                         <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Now</span>
                      </div>
                      <div>
                         <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-0.5">{item.temp}</div>
                         <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{item.condition}</div>
                         <div className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">{item.city}</div>
                      </div>
                  </div>
                )
             }

             // History Widget - FULL WIDTH on mobile
             if (item.type === "history") {
                return (
                  <div key={item.id} className="col-span-2 md:col-span-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between h-[160px]">
                      <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                         <Calendar size={14} />
                         <span className="text-[10px] font-bold uppercase tracking-wide">This Day</span>
                      </div>
                      <div>
                         <div className="text-xl font-bold text-zinc-900 dark:text-white mb-1.5">{item.year}</div>
                         <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-snug line-clamp-2">
                           {item.event}
                         </p>
                      </div>
                      <button className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 hover:underline text-left">Learn more</button>
                  </div>
                )
             }

             // Diary Articles - FULL WIDTH on mobile (More readable)
             if (item.type === "diary") {
                return (
                  <div 
                    key={item.id} 
                    className="col-span-2 md:col-span-1 group relative bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative w-full h-[180px] md:h-[140px]">
                       <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                       
                       <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-7 h-7 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-zinc-700 dark:text-zinc-300 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50">
                             <BookOpen size={14} />
                          </button>
                       </div>
                    </div>

                    {/* Content */}
                    <div className="p-3">
                       <div className="flex justify-between items-start mb-1">
                          <span className="text-[9px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">{item.category}</span>
                          {item.likes && (
                            <div className="flex items-center gap-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                              <Heart size={11} className="group-hover:text-red-500 transition-colors" /> {item.likes}
                            </div>
                          )}
                       </div>
                       <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight mb-0.5 truncate">{item.title}</h3>
                       <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{item.author}</p>
                       
                       <button className="w-full mt-2.5 py-1.5 rounded-md bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-1">
                          Read Article <ArrowUpRight size={11} />
                       </button>
                    </div>
                  </div>
                )
             }

             // Videos - FULL WIDTH on mobile (Better viewing)
             if (item.type === "video") {
                return (
                  <div 
                    key={item.id} 
                    className="col-span-2 md:col-span-1 lg:col-span-1 group relative bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 md:row-span-2"
                  >
                    {/* Video Thumbnail */}
                    <div className="relative w-full h-[220px] md:h-[240px]">
                       <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                       
                       {/* Play Button Overlay */}
                       <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                          <div className="w-14 h-14 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur flex items-center justify-center border-2 border-white dark:border-zinc-700">
                             <Video size={20} className="text-zinc-900 dark:text-white ml-1" />
                          </div>
                       </div>
                       
                       <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-7 h-7 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-zinc-700 dark:text-zinc-300 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50">
                             <MoreHorizontal size={14} />
                          </button>
                       </div>
                    </div>

                    {/* Content */}
                    <div className="p-3">
                       <div className="flex justify-between items-start mb-1">
                          <span className="text-[9px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">{item.category}</span>
                          {item.likes && (
                            <div className="flex items-center gap-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                              <Heart size={11} className="group-hover:text-red-500 transition-colors" /> {item.likes}
                            </div>
                          )}
                       </div>
                       <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight mb-0.5 truncate">{item.title}</h3>
                       <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{item.author}</p>
                       
                       <button className="w-full mt-2.5 py-1.5 rounded-md bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-1">
                          Watch Now <ArrowUpRight size={11} />
                       </button>
                    </div>
                  </div>
                )
             }

             // Artworks & Store Items - DUAL GRID on mobile (Standard)
             return (
               <div 
                 key={item.id} 
                 className={`col-span-1 group relative bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 ${item.span === 'row-span-2' ? 'md:row-span-2' : ''}`}
               >
                 {/* Image */}
                 <div className={`relative w-full ${item.span === 'row-span-2' ? 'h-[180px] md:h-[240px]' : 'h-[140px]'}`}>
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="w-7 h-7 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-zinc-700 dark:text-zinc-300 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50">
                          <MoreHorizontal size={14} />
                       </button>
                    </div>
                 </div>

                 {/* Content */}
                 <div className="p-3">
                    <div className="flex justify-between items-start mb-1">
                       <span className="text-[9px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">{item.category}</span>
                       {item.likes && (
                         <div className="flex items-center gap-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                           <Heart size={11} className="group-hover:text-red-500 transition-colors" /> {item.likes}
                         </div>
                       )}
                    </div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight mb-0.5 truncate">{item.title}</h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{item.author}</p>
                    
                    <button className="w-full mt-2.5 py-1.5 rounded-md bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-1">
                       View <ArrowUpRight size={11} />
                    </button>
                 </div>
               </div>
             )
          })}
        </div>
        
        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-16">
             <div className="text-3xl mb-3">🎨</div>
             <p className="text-zinc-400 dark:text-zinc-500 text-sm">No items found</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default SearchPage;



