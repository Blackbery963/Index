// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { 
//   HomeIcon, 
//   InformationCircleIcon, 
//   UserIcon, 
//   BookOpenIcon, 
//   XMarkIcon, 
//   Bars3Icon ,
//   PlusIcon, ArrowRightIcon
// } from '@heroicons/react/24/outline';
// import { MdBrush } from 'react-icons/md';
// import { extractDiary } from './ExractDiaries';



// function DiaryCollection() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('all'); // For diary filtering
//   const [hoveredDiary, setHoveredDiary] = useState(null);
//   const [diaries, setDiaries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);

//   // useEffect(() => {
//   // fetchDiaries(0); // Call the standalone function with initial page 0
//   // }, []);

//   // Fetching load entries 
//     useEffect(() => {
//     const fetchDiaries = async () => {
//       try {
//         setLoading(true);
//         const response = await extractDiary.loadEntries();
//         setDiaries(response.documents || []);
//       } catch (err) {
//         console.error('Failed to fetch diaries:', err);
//         setError(err.message || 'Failed to load diaries');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDiaries();
//   }, []);

//   // fetching more diaries
// const fetchDiaries = async (page = 0) => {
//   try {
//     setError(null);
//     setLoading(true);
//     const response = await extractDiary.loadEntries({
//       limit: 9,
//       offset: page * 9
//     });
    
//     setDiaries(prev => page === 0 ? response.documents : [...prev, ...response.documents]);
//     setHasMore(response.documents.length === 9);
//     setCurrentPage(page);
//   } catch (err) {
//     console.error('Failed to fetch diaries:', err);
//     setError(err.message || 'Failed to load diaries');
//   } finally {
//     setLoading(false);
//   }
// };


//   const moodColors = {
//     happy: 'bg-amber-100 text-amber-800',
//     introspective: 'bg-blue-100 text-blue-800',
//     calm: 'bg-green-100 text-green-800',
//     inspired: 'bg-violet-100 text-violet-800',
//     playful: 'bg-pink-100 text-pink-800',
//     frustrated: 'bg-red-100 text-red-800'
//   };


//   const navItems = [
//     { to: '/', label: 'Home', icon: HomeIcon },
//     { to: '/about', label: 'About', icon: InformationCircleIcon },
//     { to: '/account', label: 'Account', icon: UserIcon },
//     { to: '/diaryland', label: 'My Collection', icon: BookOpenIcon },
//   ];

//   return (
//     <div className='max-w-screen h-full overflow-x-hidden bg-gradient-to-t to-gray-50 from-blue-200'>
//       {/* Dual background Image */}
//     <div className='w-full h-screen flex items-center justify-center relative'>
//         <div className="flex flex-col md:flex-row w-full h-screen">
//                       <div className="absolute inset-0 bg-black/40" />

//           {/* Top / Left image */}
//           <div
//             className="w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center bg-no-repeat"
//             style={{ backgroundImage: "url('https://images.pexels.com/photos/31280583/pexels-photo-31280583.jpeg')" }}
//           ></div>

//           {/* Bottom / Right image */}
//           <div
//             className="w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center bg-no-repeat"
//             style={{ backgroundImage: "url('https://images.pexels.com/photos/32626708/pexels-photo-32626708.jpeg')" }}
//           ></div>
//         </div>
//         <header className="w-[90%] p-4 flex items-center justify-between rounded-md bg-white/40 dark:bg-black/40 backdrop-blur-md fixed top-4 z-50 mx-auto">
//           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-Eagle text-gray-600 dark:text-white">
//             Painters' Diary
//           </h1>
//           <nav className="hidden md:flex items-center gap-6 font-Playfair text-black dark:text-white">
//             {navItems.map(({ to, label, icon: Icon }) => (
//               <Link
//                 key={to}
//                 to={to}
//                 className="flex items-center gap-2 hover:text-amber-300 transition-colors"
//               >
//                 <Icon className="h-5 w-5" />
//                 <span className="hidden lg:inline">{label}</span>
//               </Link>
//             ))}
//           </nav>
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden dark:text-white text-gray-900 focus:outline-none"
//             aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
//           >
//             {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
//           </button>
//         </header>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.nav
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="md:hidden absolute top-20 right-6 bg-white/40 dark:bg-black/80 backdrop-blur-md rounded-lg p-4 z-50 font-Playfair"
//             >
//               <div className="flex flex-col gap-4">
//                 {navItems.map(({ to, label, icon: Icon }) => (
//                   <Link
//                     key={to}
//                     to={to}
//                     className="flex items-center gap-2  text-gray-900 dark:text-white hover:text-amber-300 transition-colors"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <Icon className="h-5 w-5" />
//                     {label}
//                   </Link>
//                 ))}
//               </div>
//             </motion.nav>
//           )}
//         </AnimatePresence>

//         {/* Diary Collection Content */}
//         {/* do something creative  */}

//         <div className="text-center max-w-[95%] lg:max-w-4xl mx-auto mb-10 px-4 md:mx-8 lg:px-12 py-3 md:py-8 lg:py-14 border-2 border-gray-300 absolute bg-gray-500/30 backdrop-blur-sm rounded-lg shadow-lg shadow-slate-400/40">
//         <div className='diaryh1 text-xl sm:text-3xl lg:text-5xl flex gap-1 flex-col items-center text-white font-bold text-center'>
//        <h1 className='flex gap-2 text-center text-gray-200'>
//       <span>Every</span>
//       <span>stroke</span>
//       <span>is</span>
//       <span>a</span>
//       <span>step</span>
//     </h1>
//     <h1 className='flex gap-2 text-center text-red-900'>
//       <span>forward</span>
//       <span>in</span>
//       <span>your</span>
//       <span>story,</span>
//     </h1>
//     <h1 className='flex gap-2 text-center text-yellow-100'>
//       <span>even</span>
//       <span>if</span>
//       <span>you</span>
//       <span>can’t</span>
//       <span>see</span>
//       <span>the</span>
//       <span>end.</span>
//     </h1>
//     <p className="text-sm sm:text-xl font-medium font-Quicksand leading-relaxed text-blue-100">
//       Each diary here holds more than ink — it's a fragment of a soul, a preserved whisper from another moment. A place where artists express, not impress, sharing truths that endure.    </p>
//     </div>
//     </div>

//       </div>
//        <main className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">        {/* Hero Section */}
//         <section className="mb-16 text-center">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl p-8 sm:p-12 shadow-lg border border-gray-200 dark:border-gray-700"
//           >
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 font-Eagle">
//               <span className="block mb-2">Artistic Journeys</span>
//               <span className="text-indigo-600 dark:text-amber-400">Preserved in Time</span>
//             </h1>
//             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-Quicksand leading-relaxed">
//               Each diary here holds more than ink — it's a fragment of a soul, a preserved whisper from another moment. 
//               A place where artists express, not impress, sharing truths that endure.
//             </p>
//             <div className="mt-8 flex justify-center gap-4">
//               <Link 
//                 to="/create" 
//                 className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
//               >
//                 <PlusIcon className="h-5 w-5" />
//                 New Diary
//               </Link>
//               <Link 
//                 to="/about" 
//                 className="flex items-center gap-2 px-6 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
//               >
//                 Learn More
//                 <ArrowRightIcon className="h-5 w-5" />
//               </Link>
//             </div>
//           </motion.div>
//         </section>

//         {/* Diary Collection */}
//         <section>
          // <div className="flex justify-between items-center mb-8">
          //   <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-Eagle">
          //     Recent Entries
          //   </h2>
          //   <div className="flex space-x-2">
          //     <button 
          //       onClick={() => setActiveTab('all')}
          //       className={`px-4 py-2 rounded-lg ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          //     >
          //       All
          //     </button>
          //     <button 
          //       onClick={() => setActiveTab('favorites')}
          //       className={`px-4 py-2 rounded-lg ${activeTab === 'favorites' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          //     >
          //       Favorites
          //     </button>
          //   </div>
          // </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* // Replace the existing diaries grid section with this: */}
// {loading ? (
//   <div className="flex justify-center items-center py-12">
//     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//   </div>
// ) : error ? (
//   <div className="text-center py-12 text-red-500">
//     <p>{error}</p>
//     <button 
//       onClick={() => window.location.reload()} 
//       className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
//     >
//       Retry
//     </button>
//   </div>
// ) : (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//     {diaries.map(diary => (
//       <motion.div 
//         key={diary.$id} // Using Appwrite's $id instead of sample id
//         whileHover={{ y: -5 }}
//         className="relative group overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
//         onMouseEnter={() => setHoveredDiary(diary.$id)}
//         onMouseLeave={() => setHoveredDiary(null)}
//       >
//         <div className="relative h-48 overflow-hidden">
//           {diary.image ? (
//             <img 
//               src={diary.image} 
//               alt={diary.title} 
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//               onError={(e) => {
//                 e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
//               }}
//             />
//           ) : (
//             <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//               <MdBrush className="text-gray-400 text-4xl" />
//             </div>
//           )}
//           <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${moodColors[diary.mood] || 'bg-gray-100 text-gray-800'}`}>
//             {diary.mood}
//           </div>
//         </div>
//         <div className="p-6">
//           <div className="flex justify-between items-start mb-2">
//             <h3 className="text-xl font-bold text-gray-800 dark:text-white truncate">
//               {diary.title}
//             </h3>
//             <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
//               {new Date(diary.date).toLocaleDateString()}
//             </span>
//           </div>
//           <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
//             {diary.artStory?.slice(0, 100) + '...' || 'No content available...'}
//           </p>
//           <Link 
//             to={`/diary/${diary.$id}`}
//             className="inline-flex items-center text-indigo-600 dark:text-amber-400 hover:text-indigo-800 dark:hover:text-amber-300 transition-colors font-medium"
//           >
//             Read More
//             <ArrowRightIcon className="ml-2 h-4 w-4" />
//           </Link>
//         </div>
//       </motion.div>
//     ))}
//   </div>
// )}
//           </div>
//         </section>
//         {hasMore && !loading && (
//   <div className="mt-8 text-center">
//     <button
//       onClick={() => fetchDiaries(currentPage + 1)}
//       className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//     >
//       Load More
//     </button>
//   </div>
// )}
//       </main>
//     </div>
//   );
// }

// export default DiaryCollection;



// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { 
//   HomeIcon, 
//   InformationCircleIcon, 
//   UserIcon, 
//   BookOpenIcon, 
//   XMarkIcon, 
//   Bars3Icon,
//   PlusIcon, 
//   ArrowRightIcon
// } from '@heroicons/react/24/outline';
// import { MdBrush } from 'react-icons/md';
// import { useFetchDiaries } from './useFetchDiary';
// const placeholderImage = 'https://cdn.pixabay.com/photo/2025/04/01/11/26/blue-tit-9506658_960_720.jpg';


//   const moodColors = {
//     happy: 'bg-amber-100 text-amber-800',
//     introspective: 'bg-blue-100 text-blue-800',
//     calm: 'bg-green-100 text-green-800',
//     inspired: 'bg-violet-100 text-violet-800',
//     playful: 'bg-pink-100 text-pink-800',
//     frustrated: 'bg-red-100 text-red-800'
//   };

//   const navItems = [
//     { to: '/', label: 'Home', icon: HomeIcon },
//     { to: '/about', label: 'About', icon: InformationCircleIcon },
//     { to: '/account', label: 'Account', icon: UserIcon },
//     { to: '/diaryland', label: 'My Collection', icon: BookOpenIcon },
//   ];

// function DiaryCollection() {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('all');
// //   const [hoveredDiary, setHoveredDiary] = useState(null);
// //   const [diaries, setDiaries] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(0);
// //   const [hasMore, setHasMore] = useState(true);

// //   const getImageUrl = (image) => {
// //   try {
// //     if (!image) return null;
    
// //     // If it's already a URL (from File object or existing URL)
// //     if (typeof image === 'string' && image.startsWith('http')) {
// //       return image;
// //     }
    
// //     // If it's a File object
// //     if (image instanceof File) {
// //       return URL.createObjectURL(image);
// //     }
    
// //     // If it's an Appwrite file ID
// //     if (typeof image === 'string') {
// //       return `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${
// //         import.meta.env.VITE_APPWRITE_BUCKET_ID
// //       }/files/${image}/view?project=${
// //         import.meta.env.VITE_APPWRITE_PROJECT_ID
// //       }&mode=admin`;
// //     }
    
// //     return null;
// //   } catch (error) {
// //     console.error('Failed to get image URL:', error);
// //     return null;
// //   }
// // };


// // const fetchDiaries = async (page = 0, reset = false) => {
// //   try {
// //     setError(null);
// //     setLoading(true);
    
// //     const response = await extractDiary.loadEntries({
// //       limit: 9,
// //       offset: page * 9
// //     });

// //     if (!response) {
// //       throw new Error('No response received from server');
// //     }

// //     // Handle both Appwrite-style and direct array responses
// //     const documents = Array.isArray(response) 
// //       ? response 
// //       : response.documents || [];

// //     if (!Array.isArray(documents)) {
// //       throw new Error('Invalid data format received');
// //     }
    
// //     setDiaries(prev => reset ? documents : [...prev, ...documents]);
// //     setHasMore(documents.length === 9);
// //     setCurrentPage(page);
// //   } catch (err) {
// //     console.error('Failed to fetch diaries:', err);
// //     setError(err.message || 'Failed to load diaries');
// //   } finally {
// //     setLoading(false);
// //   }
// // };

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [visibleDiaries, setVisibleDiaries] = useState(6);
//   const { entries, loading, error, loadEntries, hasMore, currentPage } = useFetchDiaries();
//   const [hoveredDiary, setHoveredDiary] = useState(null);

//   // generating image file to url
//   const getImageUrl = (image) => {
//   try {
//     if (!image) return null;
    
//     // If it's already a URL (from File object or existing URL)
//     if (typeof image === 'string' && image.startsWith('http')) {
//       return image;
//     }
    
//     // If it's a File object
//     if (image instanceof File) {
//       return URL.createObjectURL(image);
//     }
    
//     // If it's an Appwrite file ID
//     if (typeof image === 'string') {
//       return `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${
//         import.meta.env.VITE_APPWRITE_BUCKET_ID
//       }/files/${image}/view?project=${
//         import.meta.env.VITE_APPWRITE_PROJECT_ID
//       }&mode=admin`;
//     }
    
//     return null;
//   } catch (error) {
//     console.error('Failed to get image URL:', error);
//     return null;
//   }
// };

//   const diaries = useMemo(() => {
//     return entries.map(entry => ({
//       id: entry.$id || entry.id,
//       title: entry.title || 'Untitled',
//       image: entry.image ? getImageUrl(entry.image) : '',
//       artStory: entry.artStory || 'No story yet',
//       date: entry.date || new Date().toISOString().split('T')[0],
//       excerpt: entry.artStory?.slice(0, 100) + '...' || 'No story provided...',
//       mood: entry.mood || 'inspired'
//     }));
//   }, [entries, getImageUrl]);

//   useEffect(() => {
//     loadEntries();
//   }, [loadEntries]);

//   // const filteredDiaries = diaries().filter(diary =>
//   //   diary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //   diary.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
//   // ).slice(0, visibleDiaries);

//   // const handleLoadMore = () => {
//   //   setVisibleDiaries(prev => prev + 6);
//   // };

//   const handleImageError = (e) => {
//     e.target.onerror = null;
//     e.target.src = placeholderImage;
//   };

//   return (
//     <div className='max-w-screen h-full overflow-x-hidden bg-gradient-to-t to-gray-50 from-blue-200'>
//       {/* Dual background Image */}
      // <div className='w-full h-screen flex items-center justify-center relative'>
      //   <div className="flex flex-col md:flex-row w-full h-screen">
      //     <div className="absolute inset-0 bg-black/40" />
      //     <div
      //       className="w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center bg-no-repeat"
      //       style={{ backgroundImage: "url('https://images.pexels.com/photos/31280583/pexels-photo-31280583.jpeg')" }}
      //     />
      //     <div
      //       className="w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center bg-no-repeat"
      //       style={{ backgroundImage: "url('https://images.pexels.com/photos/32626708/pexels-photo-32626708.jpeg')" }}
      //     />
      //   </div>

      //   {/* Header */}
      //   <header className="w-[90%] p-4 flex items-center justify-between rounded-md bg-white/40 dark:bg-black/40 backdrop-blur-md fixed top-4 z-50 mx-auto">
      //     <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-Eagle text-gray-600 dark:text-white">
      //       Painters' Diary
      //     </h1>
      //     <nav className="hidden md:flex items-center gap-6 font-Playfair text-black dark:text-white">
      //       {navItems.map(({ to, label, icon: Icon }) => (
      //         <Link
      //           key={to}
      //           to={to}
      //           className="flex items-center gap-2 hover:text-amber-300 transition-colors"
      //         >
      //           <Icon className="h-5 w-5" />
      //           <span className="hidden lg:inline">{label}</span>
      //         </Link>
      //       ))}
      //     </nav>
      //     <button
      //       onClick={() => setIsMenuOpen(!isMenuOpen)}
      //       className="md:hidden dark:text-white text-gray-900 focus:outline-none"
      //       aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      //     >
      //       {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      //     </button>
      //   </header>

      //   {/* Mobile Menu */}
      //   <AnimatePresence>
      //     {isMenuOpen && (
      //       <motion.nav
      //         initial={{ opacity: 0, y: -20 }}
      //         animate={{ opacity: 1, y: 0 }}
      //         exit={{ opacity: 0, y: -20 }}
      //         className="md:hidden absolute top-20 right-6 bg-white/40 dark:bg-black/80 backdrop-blur-md rounded-lg p-4 z-50 font-Playfair"
      //       >
      //         <div className="flex flex-col gap-4">
      //           {navItems.map(({ to, label, icon: Icon }) => (
      //             <Link
      //               key={to}
      //               to={to}
      //               className="flex items-center gap-2 text-gray-900 dark:text-white hover:text-amber-300 transition-colors"
      //               onClick={() => setIsMenuOpen(false)}
      //             >
      //               <Icon className="h-5 w-5" />
      //               {label}
      //             </Link>
      //           ))}
      //         </div>
      //       </motion.nav>
      //     )}
      //   </AnimatePresence>

      //   {/* Hero Content */}
      //   <div className="text-center max-w-[95%] lg:max-w-4xl mx-auto mb-10 px-4 md:mx-8 lg:px-12 py-3 md:py-8 lg:py-14 border-2 border-gray-300 absolute bg-gray-500/30 backdrop-blur-sm rounded-lg shadow-lg shadow-slate-400/40">
      //     <div className='diaryh1 text-xl sm:text-3xl lg:text-5xl flex gap-1 flex-col items-center text-white font-bold text-center'>
      //       <h1 className='flex gap-2 text-center text-gray-200'>
      //         <span>Every</span>
      //         <span>stroke</span>
      //         <span>is</span>
      //         <span>a</span>
      //         <span>step</span>
      //       </h1>
      //       <h1 className='flex gap-2 text-center text-red-900'>
      //         <span>forward</span>
      //         <span>in</span>
      //         <span>your</span>
      //         <span>story,</span>
      //       </h1>
      //       <h1 className='flex gap-2 text-center text-yellow-100'>
      //         <span>even</span>
      //         <span>if</span>
      //         <span>you</span>
      //         <span>can't</span>
      //         <span>see</span>
      //         <span>the</span>
      //         <span>end.</span>
      //       </h1>
      //       <p className="text-sm sm:text-xl font-medium font-Quicksand leading-relaxed text-blue-100">
      //         Each diary here holds more than ink — it's a fragment of a soul, a preserved whisper from another moment. 
      //         A place where artists express, not impress, sharing truths that endure.
      //       </p>
      //     </div>
      //   </div>
      // </div>

//       <main className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
//         {/* Hero Section */}
//         <section className="mb-16 text-center">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl p-8 sm:p-12 shadow-lg border border-gray-200 dark:border-gray-700"
//           >
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 font-Eagle">
//               <span className="block mb-2">Artistic Journeys</span>
//               <span className="text-indigo-600 dark:text-amber-400">Preserved in Time</span>
//             </h1>
//             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-Quicksand leading-relaxed">
//               Each diary here holds more than ink — it's a fragment of a soul, a preserved whisper from another moment. 
//               A place where artists express, not impress, sharing truths that endure.
//             </p>
//             <div className="mt-8 flex justify-center gap-4">
//               <Link 
//                 to="/create" 
//                 className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
//               >
//                 <PlusIcon className="h-5 w-5" />
//                 New Diary
//               </Link>
//               <Link 
//                 to="/about" 
//                 className="flex items-center gap-2 px-6 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
//               >
//                 Learn More
//                 <ArrowRightIcon className="h-5 w-5" />
//               </Link>
//             </div>
//           </motion.div>
//         </section>

//         {/* Diary Collection */}
//         <section>
//             <div className="flex justify-between items-center mb-8">
//             <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-Eagle">
//               Recent Entries
//             </h2>
//             <div className="flex space-x-2">
//               <button 
//                 onClick={() => setActiveTab('all')}
//                 className={`px-4 py-2 rounded-lg ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
//               >
//                 All
//               </button>
//               <button 
//                 onClick={() => setActiveTab('favorites')}
//                 className={`px-4 py-2 rounded-lg ${activeTab === 'favorites' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
//               >
//                 Favorites
//               </button>
//             </div>
//           </div>

//           {loading && diaries.length === 0 ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//             </div>
//           ) : error ? (
//             <div className="text-center py-12 text-red-500">
//               <p>{error}</p>
//               <button 
//                 onClick={() => fetchDiaries(0, true)} 
//                 className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
//               >
//                 Retry
//               </button>
//             </div>
//           ) : diaries.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500">No diaries found. Create your first one!</p>
//               <Link 
//                 to="/create" 
//                 className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg"
//               >
//                 <PlusIcon className="h-5 w-5 mr-2" />
//                 Create Diary
//               </Link>
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {diaries.map(diary => (
//                   <motion.div 
//                     key={diary.$id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     whileHover={{ y: -5 }}
//                     transition={{ duration: 0.3 }}
//                     className="relative group overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
//                     onMouseEnter={() => setHoveredDiary(diary.$id)}
//                     onMouseLeave={() => setHoveredDiary(null)}
//                   >
//                     <div className="relative h-48 overflow-hidden">
//                       {diary.image ? (
//                         <img 
//                           src={diary.image}
//                           alt={diary.title} 
//                           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                           onerror={handleImageError}
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//                           <MdBrush className="text-gray-400 text-4xl" />
//                         </div>
//                       )}
//                       <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${moodColors[diary.mood] || 'bg-gray-100 text-gray-800'}`}>
//                         {diary.mood}
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <div className="flex justify-between items-start mb-2">
//                         <h3 className="text-xl font-bold text-gray-800 dark:text-white truncate">
//                           {diary.title}
//                         </h3>
//                         <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
//                           {new Date(diary.date).toLocaleDateString()}
//                         </span>
//                       </div>
//                       <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
//                         {diary.artStory?.slice(0, 100) + '...' || 'No content available...'}
//                       </p>
//                       <Link 
//                         to={`/diary/${diary.$id}`}
//                         className="inline-flex items-center text-indigo-600 dark:text-amber-400 hover:text-indigo-800 dark:hover:text-amber-300 transition-colors font-medium"
//                       >
//                         Read More
//                         <ArrowRightIcon className="ml-2 h-4 w-4" />
//                       </Link>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {hasMore && (
//                 <div className="mt-8 text-center">
//                   <button
//                     onClick={() => useFetchDiaries(currentPage + 1)}
//                     disabled={loading}
//                     className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
//                       loading ? 'opacity-50 cursor-not-allowed' : ''
//                     }`}
//                   >
//                     {loading ? 'Loading...' : 'Load More'}
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// }

// export default DiaryCollection;

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  InformationCircleIcon, 
  UserIcon, 
  BookOpenIcon, 
  XMarkIcon, 
  Bars3Icon,
  PlusIcon, 
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { MdBrush } from 'react-icons/md';
import { useFetchDiaries } from './useFetchDiary';

const placeholderImage = 'https://cdn.pixabay.com/photo/2025/04/01/11/26/blue-tit-9506658_960_720.jpg';

const moodColors = {
  happy: 'bg-amber-100 text-amber-800',
  introspective: 'bg-blue-100 text-blue-800',
  calm: 'bg-green-100 text-green-800',
  inspired: 'bg-violet-100 text-violet-800',
  playful: 'bg-pink-100 text-pink-800',
  frustrated: 'bg-red-100 text-red-800'
};

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/about', label: 'About', icon: InformationCircleIcon },
  { to: '/account', label: 'Account', icon: UserIcon },
  { to: '/diaryland', label: 'My Collection', icon: BookOpenIcon },
];

function DiaryCollection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredDiary, setHoveredDiary] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use the hook correctly
  const { 
    diaries: entries, 
    loading, 
    error, 
    loadDiaries, 
    hasMore 
  } = useFetchDiaries();

  const diaries = useMemo(() => {
    return entries.map(entry => ({
      id: entry.$id,
      title: entry.title || 'Untitled',
      image: entry.image || '',
      artStory: entry.artStory || 'No story yet',
      date: entry.date || new Date().toISOString().split('T')[0],
      excerpt: entry.artStory?.slice(0, 100) + '...' || 'No story provided...',
      mood: entry.mood || 'inspired'
    }));
  }, [entries]);

  const filteredDiaries = useMemo(() => {
    return diaries.filter(diary =>
      diary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diary.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [diaries, searchTerm]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = placeholderImage;
  };

  const handleLoadMore = () => {
    loadDiaries(); // This should automatically handle pagination
  };

  // useEffect(() => {
  //   loadDiaries(true); // Initial load with reset
  // }, []);

  return (
    <div className='max-w-screen h-full overflow-x-hidden bg-gradient-to-t to-gray-50 from-blue-200'>
      {/* ... (keep all your existing JSX up to the diary collection section) ... */}
       <div className='w-full h-screen flex items-center justify-center relative'>
        <div className="flex flex-col md:flex-row w-full h-screen">
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/31280583/pexels-photo-31280583.jpeg')" }}
          />
          <div
            className="w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/32626708/pexels-photo-32626708.jpeg')" }}
          />
        </div>

        {/* Header */}
        <header className="w-[90%] p-4 flex items-center justify-between rounded-md bg-white/40 dark:bg-black/40 backdrop-blur-md fixed top-4 z-50 mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-Eagle text-gray-600 dark:text-white">
            Painters' Diary
          </h1>
          <nav className="hidden md:flex items-center gap-6 font-Playfair text-black dark:text-white">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2 hover:text-amber-300 transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span className="hidden lg:inline">{label}</span>
              </Link>
            ))}
          </nav>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden dark:text-white text-gray-900 focus:outline-none"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 right-6 bg-white/40 dark:bg-black/80 backdrop-blur-md rounded-lg p-4 z-50 font-Playfair"
            >
              <div className="flex flex-col gap-4">
                {navItems.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center gap-2 text-gray-900 dark:text-white hover:text-amber-300 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Hero Content */}
        <div className="text-center max-w-[95%] lg:max-w-4xl mx-auto mb-10 px-4 md:mx-8 lg:px-12 py-3 md:py-8 lg:py-14 border-2 border-gray-300 absolute bg-gray-500/30 backdrop-blur-sm rounded-lg shadow-lg shadow-slate-400/40">
          <div className='diaryh1 text-xl sm:text-3xl lg:text-5xl flex gap-1 flex-col items-center text-white font-bold text-center'>
            <h1 className='flex gap-2 text-center text-gray-200'>
              <span>Every</span>
              <span>stroke</span>
              <span>is</span>
              <span>a</span>
              <span>step</span>
            </h1>
            <h1 className='flex gap-2 text-center text-red-900'>
              <span>forward</span>
              <span>in</span>
              <span>your</span>
              <span>story,</span>
            </h1>
            <h1 className='flex gap-2 text-center text-yellow-100'>
              <span>even</span>
              <span>if</span>
              <span>you</span>
              <span>can't</span>
              <span>see</span>
              <span>the</span>
              <span>end.</span>
            </h1>
            <p className="text-sm sm:text-xl font-medium font-Quicksand leading-relaxed text-blue-100">
              Each diary here holds more than ink — it's a fragment of a soul, a preserved whisper from another moment. 
              A place where artists express, not impress, sharing truths that endure.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Diary Collection Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-Eagle">
            Recent Entries
          </h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab('favorites')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'favorites' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              Favorites
            </button>
          </div>
        </div>

        {loading && diaries.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
            <button 
              onClick={() => loadDiaries(true)} 
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Retry
            </button>
          </div>
        ) : diaries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No diaries found. Create your first one!</p>
            <Link 
              to="/create" 
              className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Diary
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDiaries.map(diary => (
                <motion.div 
                  key={diary.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="relative group overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  onMouseEnter={() => setHoveredDiary(diary.id)}
                  onMouseLeave={() => setHoveredDiary(null)}
                >
                  <div className="relative h-48 overflow-hidden">
                    {diary.image ? (
                      <img 
                        src={diary.image}
                        alt={diary.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={handleImageError}  
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <MdBrush className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${moodColors[diary.mood] || 'bg-gray-100 text-gray-800'}`}>
                      {diary.mood}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white truncate">
                        {diary.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                        {new Date(diary.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {diary.excerpt}
                    </p>
                    <Link 
                      to={`/diary/${diary.id}`}
                      className="inline-flex items-center text-indigo-600 dark:text-amber-400 hover:text-indigo-800 dark:hover:text-amber-300 transition-colors font-medium"
                    >
                      Read More
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default DiaryCollection;