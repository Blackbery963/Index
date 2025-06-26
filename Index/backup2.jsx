 <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FaBook className="text-indigo-500" />
                Inspiration & Ideas
              </h2>
              
              {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
                {/* Daily Challenge */}

                
                {/* Color Palette */}


                {/* </div> */}
              </div>
                              <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                  <h3 className="font-medium text-lg mb-3 text-gray-800 dark:text-white">Today's Challenge</h3>
                  {/* <div className="grid grid-cols-5 gap-2 mb-4">

                  </div> */}                <div className={`p-6 rounded-xl ${moodConfig[formData.mood || 'happy'].card} dark:bg-gray-700/50`}>
                  <h3 className="font-medium text-lg mb-3 text-gray-800 dark:text-white">Daily Challenge</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 font-caveat text-lg">
                    {getDailyChallenge()}
                  </p>
                </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Notes & Reflections
                </label>
                <textarea
                  value={isEditing ? formData.inspiration : currentEntry.inspiration || ''}
                  onChange={(e) => handleInputChange('inspiration', e.target.value)}
                  className="w-full h-32 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Jot down any creative ideas, inspirations, or reflections..."
                />
              </div>










                          <div className="p-6 flex items-center justify-between">
                            {/* motivation */}
                           <div className=''>
                            <h1>Motivate & Inspiration</h1>
                            <textarea name="motivation" id="motivation"></textarea>
                           </div>
              
                           {/* Tips And Tricks */}
                           <div>
                            <h1>Tips & Tricks </h1>
                            <textarea name="tips" id="tips"></textarea>
                           </div>
                          </div>
                          {/* the Daily collection */}
                          <div className=' flex items-center flex-col'>
                            <h1>Daily Challenges</h1>
                            <div>
                              challege
                            </div>
                           </div>







                                   // <section
        //   className="lg:w-[90vw] w-[95vw] mx-auto mt-8 relative border border-gray-400 dark:border-gray-600 bg-cover bg-center p-4"
        //   style={{ backgroundImage: `url(${woodBackground})` }}
        // >
        //   <h2 className="text-3xl font-Playfair mb-6 lg:mt-0 mt-4 text-center text-gray-900 dark:text-gray-100">
        //     Your Year in 12 Chapters
        //   </h2>
        //   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full px-4">
        //     {[
        //       { month: 'January', description: 'The beginning, a fresh start.', to: '/January' },
        //       { month: 'February', description: 'The month of love and reflection.', to: '/February' },
        //       { month: 'March', description: 'Spring is here, time for new beginnings.', to: '/March' },
        //       { month: 'April', description: 'A month of renewal and growth.', to: '/April' },
        //       { month: 'May', description: 'The month of flowers and dreams.', to: '/May' },
        //       { month: 'June', description: 'Summer approaches, energy and excitement.', to: '/June' },
        //       { month: 'July', description: 'The height of summer, heat and adventure.', to: '/July' },
        //       { month: 'August', description: 'A time to reflect and unwind.', to: '/August' },
        //       { month: 'September', description: 'Back to routine, the fall breeze.', to: '/September' },
        //       { month: 'October', description: 'The autumn chill, harvest and change.', to: '/October' },
        //       { month: 'November', description: 'A time for gratitude and reflection.', to: '/November' },
        //       { month: 'December', description: 'Endings and beginnings, a festive close.', to: '/December' },
        //     ].map((item, index) => {
        //       const hasBackground = monthsBackgrounds[index] !== null;
        //       return (
        //         <div
        //           key={index}
        //           className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-transform border border-gray-300 dark:border-gray-600 relative"
        //           style={{
        //             height: '200px',
        //             backgroundImage: `url(${monthsBackgrounds[index] || diaryBackground})`,
        //             backgroundSize: 'cover',
        //             backgroundPosition: 'center',
        //           }}
        //         >
        //           <h3
        //             className={`text-base sm:text-xl font-semibold font-Playfair text-center ${
        //               hasBackground ? 'text-white dark:text-gray-200' : 'text-black dark:text-gray-200'
        //             }`}
        //           >
        //             {item.month}
        //           </h3>
        //           <p
        //             className={`text-base sm:text-lg font-normal font-Newsreader text-center ${
        //               hasBackground ? 'text-white dark:text-gray-300' : 'text-slate-800 dark:text-gray-300'
        //             }`}
        //           >
        //             {item.description}
        //           </p>
        //           <input
        //             type="file"
        //             accept="image/*"
        //             className="hidden"
        //             id={`upload-${index}`}
        //             onChange={(e) => handleMonthBackgroundImage(e, index)}
        //           />
        //           <label
        //             htmlFor={`upload-${index}`}
        //             className="absolute top-2 right-2 bg-transparent text-black dark:text-white p-1 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        //           >
        //             <FiUpload />
        //           </label>
        //           <Link to={item.to}>
        //             <button
        //               className={`hidden md:block border px-2 font-Playfair rounded-md mt-4 backdrop-blur-md ${
        //                 hasBackground
        //                   ? 'text-white dark:text-gray-200 border-slate-100 dark:border-gray-400'
        //                   : 'text-slate-800 dark:text-gray-200 border-gray-600 dark:border-gray-400'
        //               }`}
        //             >
        //               Explore
        //             </button>
        //           </Link>
        //           <Link to={item.to}>
        //             <LuArrowRightFromLine
        //               size={22}
        //               className="md:hidden text-blue-500 dark:text-blue-400 text-lg backdrop-blur-md p-1 mt-4"
        //             />
        //           </Link>
        //         </div>
        //       );
        //     })}
        //   </div>
        // </section>
      



























        // const ArtistDiary = () => {
        //   const [entries, setEntries] = useState(() => {
        //     const saved = localStorage.getItem('diaryEntries');
        //     return saved ? JSON.parse(saved) : [];
        //   });
        //   const [currentIndex, setCurrentIndex] = useState(0);
        //   const currentEntry = entries[currentIndex] || {};
        
        //   // Rest of your state declarations...
        //   const [formData, setFormData] = useState({
        //     title: '',
        //     date: new Date().toISOString().split('T')[0],
        //     mood: '',
        //     image: null,
        //     imageStory: '',
        //     artStory: '',
        //     inspiration: '',
        //     tips: '',
        //     moodBoard: []
        //   });
        //   const [isEditing, setIsEditing] = useState(false);
        //   const [theme, setTheme] = useState('light');
        //   const [showMoodBoardModal, setShowMoodBoardModal] = useState(false);
        //   const [moodBoardContent, setMoodBoardContent] = useState('');
        //   const [activeModalTab, setActiveModalTab] = useState('text');
        //   const [imageUploadedToday, setImageUploadedToday] = useState(() => {
        //     const lastUploadDate = localStorage.getItem('lastImageUploadDate');
        //     return lastUploadDate === new Date().toISOString().split('T')[0];
        //   });
        
        //   const todaysChallenge = React.useMemo(() => getTodaysChallenge(), []);
        
        //   useEffect(() => {
        //     localStorage.setItem('diaryEntries', JSON.stringify(entries));
        //     document.documentElement.classList.toggle('dark', theme === 'dark');
        //   }, [entries, theme]);
        
        //   const handleInputChange = (field, value) => {
        //     setFormData(prev => ({ ...prev, [field]: value }));
        //   };
        
        //   const handleImageUpload = (field) => (e) => {
        //     const file = e.target.files[0];
        //     if (file) {
        //       const url = URL.createObjectURL(file);
        //       handleInputChange(field, url);
        //     }
        //   };
        
        //   const addMoodBoardItem = (type, content) => {
        //     if (type === 'image') {
        //       if (imageUploadedToday) {
        //         alert('You can only upload one image per day to your mood board');
        //         return;
        //       }
        //       setImageUploadedToday(true);
        //       localStorage.setItem('lastImageUploadDate', new Date().toISOString().split('T')[0]);
        //     }
        
        //     const newItem = {
        //       id: Date.now(),
        //       type,
        //       content,
        //       position: { x: Math.random() * 300, y: Math.random() * 200 },
        //       date: new Date().toISOString()
        //     };
            
        //     setFormData(prev => ({
        //       ...prev,
        //       moodBoard: [...prev.moodBoard, newItem]
        //     }));
        //     setShowMoodBoardModal(false);
        //     setMoodBoardContent('');
        //   };
        
        //   const todaysMoodBoardItems = isEditing 
        //   ? (formData.moodBoard || []).filter(item => 
        //       item?.date && new Date(item.date).toDateString() === new Date().toDateString()
        //     )
        //   : (currentEntry?.moodBoard || []).filter(item => 
        //       item?.date && new Date(item.date).toDateString() === new Date().toDateString()
        //     );
        
        //   const saveEntry = () => {
        //     if (!formData.title) {
        //       alert('Please add a title to your entry');
        //       return;
        //     }
        
        //     const newEntry = { ...formData };
        //     if (isEditing) {
        //       const updated = [...entries];
        //       updated[currentIndex] = newEntry;
        //       setEntries(updated);
        //     } else {
        //       setEntries([...entries, newEntry]);
        //       setCurrentIndex(entries.length);
        //     }
        //     setIsEditing(false);
        //   };
        
        //   const deleteEntry = () => {
        //     if (window.confirm('Delete this entry permanently?')) {
        //       const updated = entries.filter((_, i) => i !== currentIndex);
        //       setEntries(updated);
        //       setCurrentIndex(Math.min(currentIndex, updated.length - 1));
        //     }
        //   };
        
        //   const loadEntry = (index) => {
        //     if (index >= 0 && index < entries.length) {
        //       const entryToLoad = entries[index];
        //       setFormData({
        //         ...entryToLoad,
        //         moodBoard: entryToLoad.moodBoard || []
        //       });
        //       setIsEditing(true);
              
        //       // Check if image was uploaded today when loading an entry
        //       const hasTodayImage = entryToLoad.moodBoard?.some(
        //         item => item.type === 'image' && 
        //         new Date(item.date).toDateString() === new Date().toDateString()
        //       );
        //       setImageUploadedToday(hasTodayImage);
        //     } else {
        //       setFormData({
        //         title: '',
        //         date: new Date().toISOString().split('T')[0],
        //         mood: '',
        //         image: null,
        //         imageStory: '',
        //         artStory: '',
        //         inspiration: '',
        //         tips: '',
        //         moodBoard: []
        //       });
        //       setIsEditing(true);
        //       setImageUploadedToday(false);
        //     }
        //   };

















        // import React, { useState, useEffect } from 'react';
// import { FaBook, FaInfoCircle, FaHome, FaUser, FaPen, FaSearch, FaShare, FaSave, FaTrash } from 'react-icons/fa';
// import { FiUpload, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { motion, AnimatePresence } from 'framer-motion';
// import GalleryView from './Galleryview';
// function January() {
//   // State management
//   const [diaryEntries, setDiaryEntries] = useState(() => {
//     const saved = localStorage.getItem('diaryEntries');
//     return saved ? JSON.parse(saved) : [];
//   });
  
//   const [currentPage, setCurrentPage] = useState(0);
//   const [formData, setFormData] = useState({
//     title: '',
//     date: '',
//     selectedDay: '',
//     motivateImage: null,
//     motivateText: '',
//     startImage: null,
//     finishImage: null,
//     images: [null, null, null, null],
//     artStory: '',
//     progressImage: null,
//     progressText: '',
//     tipsText: ''
//   });
  
//   const [isWriting, setIsWriting] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [query, setQuery] = useState('');
//   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
//   const [isEditing, setIsEditing] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Initialize AOS and theme
//   useEffect(() => {
//     AOS.init({ duration: 600, once: true });
//     document.documentElement.classList.toggle('dark', theme === 'dark');
//   }, [theme]);

//   // Save entries to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
//   }, [diaryEntries]);

//   // Handle form input changes
//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   // Handle image uploads
//   const handleImageChange = (field, index = null) => (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       const url = URL.createObjectURL(file);
//       if (index !== null) {
//         setFormData(prev => {
//           const newImages = [...prev.images];
//           newImages[index] = url;
//           return { ...prev, images: newImages };
//         });
//       } else {
//         handleInputChange(field, url);
//       }
//     }
//   };

//   // Toggle between light/dark theme
//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//   };

//   // Share functionality
//   const handleShare = async () => {
//     const shareData = {
//       title: formData.title || 'My Art Diary Entry',
//       text: 'Check out my latest artwork on Painters\' Diary!',
//       url: window.location.href,
//     };
    
//     try {
//       if (navigator.share) {
//         await navigator.share(shareData);
//       } else {
//         await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
//         alert('Link copied to clipboard!');
//       }
//     } catch (err) {
//       console.error('Error sharing:', err);
//     }
//   };

//   // Save or update entry
//   const saveEntry = () => {
//     if (!formData.title || !formData.date) {
//       alert('Please enter a title and date!');
//       return;
//     }
    
//     const newEntry = { ...formData };
    
//     if (isEditing) {
//       const updatedEntries = [...diaryEntries];
//       updatedEntries[currentPage] = newEntry;
//       setDiaryEntries(updatedEntries);
//     } else {
//       setDiaryEntries([...diaryEntries, newEntry]);
//       setCurrentPage(diaryEntries.length);
//     }
    
//     resetForm();
//     setIsEditing(false);
//   };

//   // Delete current entry
//   const deleteEntry = () => {
//     if (window.confirm('Are you sure you want to delete this entry?')) {
//       const updatedEntries = diaryEntries.filter((_, i) => i !== currentPage);
//       setDiaryEntries(updatedEntries);
//       setCurrentPage(Math.min(currentPage, updatedEntries.length - 1));
//       resetForm();
//       setIsEditing(false);
//     }
//   };

//   // Reset form to empty state
//   const resetForm = () => {
//     setFormData({
//       title: '',
//       date: '',
//       selectedDay: '',
//       motivateImage: null,
//       motivateText: '',
//       startImage: null,
//       finishImage: null,
//       images: [null, null, null, null],
//       artStory: '',
//       progressImage: null,
//       progressText: '',
//       tipsText: ''
//     });
//   };

//   // Navigation functions
//   const goToPrevious = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//       setIsEditing(false);
//     }
//   };

//   const goToNext = () => {
//     if (currentPage < diaryEntries.length) {
//       setCurrentPage(currentPage + 1);
//       setIsEditing(false);
//     }
//   };

//   // Load entry for editing
//   const loadEntry = (index) => {
//     if (index >= 0 && index < diaryEntries.length) {
//       setFormData(diaryEntries[index]);
//       setIsEditing(true);
//     } else {
//       resetForm();
//       setIsEditing(false);
//     }
//   };

//   // Current entry data
//   const currentEntry = diaryEntries[currentPage] || {};
//   const isEmpty = diaryEntries.length === 0;
//   const isNewEntry = currentPage === diaryEntries.length;

//   // Animation variants
//   const pageVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -20 }
//   };

//   // Generate a daily challenge based on date
// const getDailyChallenge = (dateString) => {
//   const date = new Date(dateString);
//   const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  
//   const challenges = [
//     "Try a monochromatic color scheme",
//     "Experiment with a new brush technique",
//     "Paint without using black",
//     "Create art using only geometric shapes",
//     "Draw with your non-dominant hand",
//     "Make a piece using only 3 colors",
//     "Create artwork inspired by music",
//     "Try a style completely different from your usual",
//     "Use only complementary colors",
//     "Create a piece in 30 minutes or less"
//   ];
  
//   return challenges[dayOfYear % challenges.length];
// };

// // Generate a random color palette
// const generateColorPalette = () => {
//   const palettes = [
//     ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF'],
//     ['#CDB4DB', '#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF'],
//     ['#F72585', '#7209B7', '#3A0CA3', '#4361EE', '#4CC9F0'],
//     ['#D8F3DC', '#B7E4C7', '#95D5B2', '#74C69D', '#52B788'],
//     ['#FF9F1C', '#FFBF69', '#FFFFFF', '#CBF3F0', '#2EC4B6'],
//     ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93']
//   ];
  
//   return palettes[Math.floor(Math.random() * palettes.length)];
// };

// const [viewMode, setViewMode] = useState('gallery'); // 'gallery' or 'detail'

// //   // Toggle between views
//   const toggleView = () => setViewMode(prev => prev === 'gallery' ? 'detail' : 'gallery');
  
// //   // Select an entry from gallery
//   const selectEntry = (index) => {
//     setCurrentPage(index);
//     setViewMode('detail');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
//       {/* Header */}
//       {/* Header Component */}
// <header className="w-full bg-white dark:bg-gray-800 shadow-sm fixed top-0 z-50 px-4 py-3">
//   <div className="max-w-full mx-auto flex items-center justify-between">
//     <h1 className="text-2xl font-bold font-Eagle text-indigo-600 dark:text-indigo-400">Painters' Diary</h1>
    
//     <div className="flex items-center gap-4">
//       {/* Search Bar (same as before) */}
//       <motion.div
//               className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden"
//               animate={{ width: isExpanded ? '240px' : '40px' }}
//               transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//             >
//               {isExpanded && (
//                 <motion.input
//                   type="text"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   className="px-4 py-1 w-full bg-transparent outline-none"
//                   placeholder="Search entries..."
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                 />
//               )}
//               <button
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className="p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
//               >
//                 <FaSearch />
//               </button>
//             </motion.div>
      
//       {/* Theme Toggle (same as before) */}
//       <button
//         onClick={toggleTheme}
//         className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//         aria-label="Toggle theme"
//       >
//         {theme === 'light' ? '🌙' : '☀️'}
//       </button>
      
//       {/* Desktop Navigation (hidden on mobile) */}
//       <nav className="hidden md:flex items-center gap-2">
//         <Link to="/" className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors font-Playfair">
//           <FaHome />
//           <span>Home</span>
//         </Link>
//         <Link to="/About" className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors font-Playfair">
//           <FaInfoCircle />
//           <span>About</span>
//         </Link>
//         <Link to="/Account" className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors font-Playfair">
//           <FaUser />
//           <span>Account</span>
//         </Link>
//         <Link to="/Diary" className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 rounded-md text-indigo-600 dark:text-indigo-300 flex items-center gap-2 transition-colors font-Playfair">
//           <FaBook />
//           <span>Diary</span>
//         </Link>
//       </nav>
      
//       {/* Mobile Dropdown Menu */}
//       <div className="md:hidden relative">
//         <button
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//           aria-label="Toggle menu"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
//           </svg>
//         </button>
        
//         {/* Dropdown Content */}
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
//           >
//             <Link
//               to="/"
//               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               <FaHome />
//               Home
//             </Link>
//             <Link
//               to="/About"
//               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               <FaInfoCircle />
//               About
//             </Link>
//             <Link
//               to="/Account"
//               className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               <FaUser />
//               Account
//             </Link>
//             <Link
//               to="/Diary"
//               className="block px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 flex items-center gap-2"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               <FaBook />
//               Diary
//             </Link>
//           </motion.div>
//         )}
//       </div>
//         <Link to="/diary/collection" className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors font-Playfair">
//         <FaBook />
//         <span>View Collection</span>
//         </Link>
//     </div>
//   </div>
// </header>

//       {/* Main Content */}
//       <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
//         {viewMode === 'gallery' ? (
//           <GalleryView 
//             entries={diaryEntries} 
//             onSelect={selectEntry} 
//           />
//         ) : (
//           // Your existing detailed view component
//           <DetailedView 
//             currentEntry={currentEntry}
//             isEditing={isEditing}
//             // ... pass all necessary props ...
//           />
//         )}
//         {/* Entry Navigation */}
//         <div className="flex items-center justify-between mb-6">
//           <button
//             onClick={goToPrevious}
//             disabled={currentPage === 0}
//             className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
//           >
//             <FiChevronLeft />
//             <span className="hidden sm:inline">Previous</span>
//           </button>
          
//           <div className="text-center">
//             <h2 className="text-xl font-semibold">
//               {isNewEntry ? 'New Entry' : currentEntry.title || 'Untitled Entry'}
//             </h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               {isEmpty ? 'No entries yet' : `Entry ${currentPage + 1} of ${diaryEntries.length}`}
//             </p>
//           </div>
          
//           <button
//             onClick={goToNext}
//             disabled={currentPage >= diaryEntries.length}
//             className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
//           >
//             <span className="hidden sm:inline">Next</span>
//             <FiChevronRight />
//           </button>
//         </div>

//         {/* Diary Content */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentPage}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             variants={pageVariants}
//             transition={{ duration: 0.3 }}
//             className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
//           >
//             {/* Entry Metadata */}
//             <div className="p-6 border-b border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Title</label>
//                 <input
//                   type="text"
//                   value={isEditing ? formData.title : currentEntry.title || ''}
//                   onChange={(e) => handleInputChange('title', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                   placeholder="My Artwork"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Date</label>
//                 <input
//                   type="date"
//                   value={isEditing ? formData.date : currentEntry.date || ''}
//                   onChange={(e) => handleInputChange('date', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Day</label>
//                 <select
//                   value={isEditing ? formData.selectedDay : currentEntry.day || ''}
//                   onChange={(e) => handleInputChange('selectedDay', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select a day</option>
//                   {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
//                     <option key={day} value={day.toLowerCase()}>{day}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Art Gallery */}
//             <section className="p-6 border-b border-gray-100 dark:border-gray-700">
//               <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                 <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 p-2 rounded-lg">
//                   <FaBook />
//                 </span>
//                 Art Gallery
//               </h2>
              
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                 {(isEditing ? formData.images : currentEntry.images || Array(4).fill(null)).map((img, index) => (
//                   <div
//                     key={index}
//                     className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden group"
//                     data-aos="zoom-in"
//                     data-aos-delay={index * 100}
//                   >
//                     {img ? (
//                       <img
//                         src={img}
//                         alt={`Gallery ${index + 1}`}
//                         className="w-full h-full object-cover transition-transform group-hover:scale-105"
//                       />
//                     ) : (
//                       <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 p-4">
//                         <FiUpload className="text-2xl mb-2" />
//                         <span className="text-xs text-center">Upload Image</span>
//                       </div>
//                     )}
                    
//                     <input
//                       type="file"
//                       id={`galleryImage${index}`}
//                       className="hidden"
//                       accept="image/*"
//                       onChange={handleImageChange('images', index)}
//                     />
//                     <button
//                       onClick={() => document.getElementById(`galleryImage${index}`).click()}
//                       className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black/30 flex items-center justify-center text-white transition-opacity"
//                     >
//                       <FiUpload className="text-xl" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Art Story */}
//             <section className="p-6 border-b border-gray-100 dark:border-gray-700">
//               <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                 <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 p-2 rounded-lg">
//                   <FaPen />
//                 </span>
//                 Art Story
//               </h2>
              
//               <textarea
//                 value={isEditing ? formData.artStory : currentEntry.artStory || ''}
//                 onChange={(e) => handleInputChange('artStory', e.target.value)}
//                 className="w-full h-40 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                 placeholder="Tell the story behind your artwork... What inspired you? What techniques did you use? How do you feel about the result?"
//               />
//             </section>

//             {/* Progress Section */}
//             <section className="p-6 border-b border-gray-100 dark:border-gray-700">
//               <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                 <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 p-2 rounded-lg">
//                   <FaPen />
//                 </span>
//                 Progress
//               </h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden group">
//                   {isEditing ? formData.progressImage || currentEntry.progressImage ? (
//                     <img
//                       src={formData.progressImage || currentEntry.progressImage}
//                       alt="Progress"
//                       className="w-full h-full object-cover transition-transform group-hover:scale-105"
//                     />
//                   ) : (
//                     <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 p-4">
//                       <FiUpload className="text-2xl mb-2" />
//                       <span className="text-xs text-center">Upload Progress Image</span>
//                     </div>
//                   ) : currentEntry.progressImage ? (
//                     <img
//                       src={currentEntry.progressImage}
//                       alt="Progress"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
//                       No progress image
//                     </div>
//                   )}
                  
//                   {isEditing && (
//                     <>
//                       <input
//                         type="file"
//                         id="progressImage"
//                         className="hidden"
//                         accept="image/*"
//                         onChange={handleImageChange('progressImage')}
//                       />
//                       <button
//                         onClick={() => document.getElementById('progressImage').click()}
//                         className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black/30 flex items-center justify-center text-white transition-opacity"
//                       >
//                         <FiUpload className="text-xl" />
//                       </button>
//                     </>
//                   )}
//                 </div>
                
//                 <textarea
//                   value={isEditing ? formData.progressText : currentEntry.progressText || ''}
//                   onChange={(e) => handleInputChange('progressText', e.target.value)}
//                   className="w-full h-full min-h-[200px] px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                   placeholder="Describe your progress... What challenges did you face? What did you learn?"
//                 />
//               </div>
//             </section>

//             {/* Before & After */}
//             <section className="p-6 border-b border-gray-100 dark:border-gray-700">
//               <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                 <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 p-2 rounded-lg">
//                   <FaPen />
//                 </span>
//                 Before & After
//               </h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {['startImage', 'finishImage'].map((field, idx) => (
//                   <div key={field} className="space-y-2">
//                     <h3 className="font-medium text-gray-600 dark:text-gray-300">
//                       {idx === 0 ? 'Starting Point' : 'Finished Work'}
//                     </h3>
//                     <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden group">
//                       {isEditing ? formData[field] || currentEntry[field] ? (
//                         <img
//                           src={formData[field] || currentEntry[field]}
//                           alt={idx === 0 ? 'Start' : 'Finish'}
//                           className="w-full h-full object-cover transition-transform group-hover:scale-105"
//                         />
//                       ) : (
//                         <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 p-4">
//                           <FiUpload className="text-2xl mb-2" />
//                           <span className="text-xs text-center">
//                             Upload {idx === 0 ? 'Starting' : 'Finished'} Image
//                           </span>
//                         </div>
//                       ) : currentEntry[field] ? (
//                         <img
//                           src={currentEntry[field]}
//                           alt={idx === 0 ? 'Start' : 'Finish'}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
//                           No {idx === 0 ? 'start' : 'finish'} image
//                         </div>
//                       )}
                      
//                       {isEditing && (
//                         <>
//                           <input
//                             type="file"
//                             id={field}
//                             className="hidden"
//                             accept="image/*"
//                             onChange={handleImageChange(field)}
//                           />
//                           <button
//                             onClick={() => document.getElementById(field).click()}
//                             className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black/30 flex items-center justify-center text-white transition-opacity"
//                           >
//                             <FiUpload className="text-xl" />
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Motivation */}
//            {/* Motivation Section */}
// <section className="p-6 border-b border-gray-100 dark:border-gray-700">
//   <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//     <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 p-2 rounded-lg">
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//         <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
//       </svg>
//     </span>
//     Inspiration & Motivation
//   </h2>
  
//   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//     {/* Motivational Quote */}
//     <div className="relative bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 h-full min-h-[200px] flex flex-col">
//       {isEditing ? (
//         isWriting || !formData.motivateImage ? (
//           <textarea
//             value={formData.motivateText}
//             onChange={(e) => handleInputChange('motivateText', e.target.value)}
//             className="w-full flex-1 p-4 bg-transparent focus:outline-none resize-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
//             placeholder="Write your motivational thoughts or paste an inspiring quote..."
//             autoFocus={isWriting}
//           />
//         ) : (
//           <img
//             src={formData.motivateImage}
//             alt="Motivation"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         )
//       ) : currentEntry.motivateText ? (
//         <div className="flex-1 flex flex-col">
//           <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4 flex-1">
//             "{currentEntry.motivateText}"
//           </blockquote>
//           <div className="text-right text-sm text-gray-500 dark:text-gray-400">
//             — {currentEntry.title ? currentEntry.title : "Anonymous Artist"}
//           </div>
//         </div>
//       ) : currentEntry.motivateImage ? (
//         <img
//           src={currentEntry.motivateImage}
//           alt="Motivation"
//           className="w-full h-full object-cover rounded-lg"
//         />
//       ) : (
//         <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
//           No motivation content yet
//         </div>
//       )}
      
//       {isEditing && (
//         <div className="absolute bottom-4 right-4 flex gap-2">
//           <input
//             type="file"
//             id="motivateImage"
//             className="hidden"
//             accept="image/*"
//             onChange={(e) => {
//               handleImageChange('motivateImage')(e);
//               setIsWriting(false);
//             }}
//           />
//           <button
//             onClick={() => document.getElementById('motivateImage').click()}
//             className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-md"
//             title="Upload inspirational image"
//           >
//             <FiUpload />
//           </button>
//           <button
//             onClick={() => {
//               setIsWriting(true);
//               handleInputChange('motivateImage', null);
//             }}
//             className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-md"
//             title="Write inspirational text"
//           >
//             <FaPen />
//           </button>
//         </div>
//       )}
//     </div>

//     {/* Daily Challenge */}
//     <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 flex flex-col">
//       <h3 className="font-medium text-lg mb-3 text-amber-700 dark:text-amber-400 flex items-center gap-2">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//         </svg>
//         Today's Art Challenge
//       </h3>
//       <p className="text-gray-700 dark:text-gray-300 mb-4">
//         {getDailyChallenge(currentEntry.date || new Date().toISOString())}
//       </p>
//       <button 
//         className="mt-auto px-4 py-2 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors text-sm"
//         onClick={() => handleInputChange('tipsText', (formData.tipsText || '') + `\n\nChallenge Attempt: ${getDailyChallenge(currentEntry.date || new Date().toISOString())}`)}
//       >
//         Add to My Tips
//       </button>
//     </div>

//     {/* Color Inspiration */}
//     <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6">
//       <h3 className="font-medium text-lg mb-3 text-purple-700 dark:text-purple-400 flex items-center gap-2">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
//         </svg>
//         Color Palette Inspiration
//       </h3>
//       <div className="grid grid-cols-5 gap-2 mb-3">
//         {generateColorPalette().map((color, i) => (
//           <div 
//             key={i} 
//             className="aspect-square rounded-full cursor-pointer hover:scale-110 transition-transform"
//             style={{ backgroundColor: color }}
//             onClick={() => handleInputChange('tipsText', (formData.tipsText || '') + `\n\nColor Inspiration: ${color}`)}
//           />
//         ))}
//       </div>
//       <button 
//         className="w-full px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm"
//         onClick={() => handleInputChange('tipsText', (formData.tipsText || '') + `\n\nColor Palette: ${generateColorPalette().join(', ')}`)}
//       >
//         Save This Palette
//       </button>
//     </div>
//   </div>
// </section>

//             {/* Tips & Tricks */}
//             <section className="p-6">
//               <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                 <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 p-2 rounded-lg">
//                   <FaPen />
//                 </span>
//                 Tips & Tricks
//               </h2>
              
//               <textarea
//                 value={isEditing ? formData.tipsText : currentEntry.tipsText || ''}
//                 onChange={(e) => handleInputChange('tipsText', e.target.value)}
//                 className="w-full h-40 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                 placeholder="Share your artistic tips and tricks... What worked well? What would you do differently next time?"
//               />
//             </section>

//             {/* Action Buttons */}
//             <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 flex flex-wrap justify-between gap-4">
//               <div className="flex gap-3">
//                 {isEditing ? (
//                   <>
//                     <button
//                       onClick={saveEntry}
//                       className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
//                     >
//                       <FaSave />
//                       Save
//                     </button>
//                     <button
//                       onClick={() => {
//                         setIsEditing(false);
//                         loadEntry(currentPage);
//                       }}
//                       className="px-6 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => {
//                       if (currentPage < diaryEntries.length) {
//                         loadEntry(currentPage);
//                       } else {
//                         setIsEditing(true);
//                       }
//                     }}
//                     className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
//                   >
//                     <FaPen />
//                     {currentPage < diaryEntries.length ? 'Edit' : 'Create New'}
//                   </button>
//                 )}
                
//                 {currentPage < diaryEntries.length && !isEditing && (
//                   <button
//                     onClick={deleteEntry}
//                     className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors"
//                   >
//                     <FaTrash />
//                     Delete
//                   </button>
//                 )}
//               </div>
              
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleShare}
//                   className="px-6 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center gap-2 transition-colors"
//                   disabled={currentPage >= diaryEntries.length}
//                 >
//                   <FaShare />
//                   Share
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </main>
//     </div>
//   );
// }

// export default January;


















































// import { databases, ID, Query, account } from '../appwriteConfig';

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const DIARY_COLLECTION_ID = import.meta.env.VITE_APPWRITE_DIARY_COLLECTION_ID;

// // ✅ Utility function to get current user
// const getCurrentUser = async () => {
//   try {
//     const user = await account.get();
//     return user;
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return null;
//   }
// };

// export const diaryService = {
//   // ✅ Load all entries for current user
//   async loadEntries() {
//     try {
//       const user = await getCurrentUser();
//       if (!user) throw new Error('User not authenticated');

//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         DIARY_COLLECTION_ID,
//         [Query.equal('userId', user.$id)]
//       );

//       // Convert moodBoard string back to array
//       return response.documents.map(doc => ({
//         ...doc,
//         moodBoard: doc.moodBoard ? JSON.parse(doc.moodBoard) : []
//       }));
//     } catch (error) {
//       console.error('Failed to load entries:', error);
//       throw error;
//     }
//   },

//   // ✅ Save an entry (create or update)
//   async saveEntry(entryData, isEditing = false, entryId = null) {
//     try {
//       const user = await getCurrentUser();
//       if (!user) throw new Error('User not authenticated');

//       const data = {
//         ...entryData,
//         moodBoard: JSON.stringify(entryData.moodBoard || []),
//         userId: user.$id
//       };

//       if (isEditing && entryId) {
//         return await databases.updateDocument(
//           DATABASE_ID,
//           DIARY_COLLECTION_ID,
//           entryId,
//           data
//         );
//       } else {
//         return await databases.createDocument(
//           DATABASE_ID,
//           DIARY_COLLECTION_ID,
//           ID.unique(),
//           data
//         );
//       }
//     } catch (error) {
//       console.error('Failed to save entry:', error);
//       throw error;
//     }
//   },

//   // ✅ Delete an entry
//   async deleteEntry(entryId) {
//     try {
//       await databases.deleteDocument(
//         DATABASE_ID,
//         DIARY_COLLECTION_ID,
//         entryId
//       );
//       return true;
//     } catch (error) {
//       console.error('Failed to delete entry:', error);
//       throw error;
//     }
//   }
// // };



// import { databases, storage, ID, Query, account } from '../appwriteConfig';

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const DIARY_COLLECTION_ID = import.meta.env.VITE_APPWRITE_DIARY_COLLECTION_ID;
// const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

// if (!DATABASE_ID || !DIARY_COLLECTION_ID || !BUCKET_ID) {
//   throw new Error('Missing required Appwrite environment variables');
// }

// let currentUserPromise = null;

// const getCurrentUser = async () => {
//   if (currentUserPromise) {
//     return currentUserPromise;
//   }

//   currentUserPromise = (async () => {
//     try {
//       const user = await account.get();
//       return user;
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       currentUserPromise = null;
//       return null;
//     }
//   })();

//   return currentUserPromise;
// };

// export const diaryService = {
//   async loadEntries() {
//     try {
//       const user = await getCurrentUser();
//       if (!user) throw new Error('User not authenticated');

//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         DIARY_COLLECTION_ID,
//         [Query.equal('userId', user.$id)]
//       );

//       return response.documents.map(doc => {
//         let moodBoard = [];
//         if (doc.moodBoard) {
//           try {
//             moodBoard = JSON.parse(doc.moodBoard);
//           } catch (parseError) {
//             console.error(`Failed to parse moodBoard for entry ${doc.$id}:`, parseError);
//           }
//         }
//         return {
//           ...doc,
//           moodBoard: Array.isArray(moodBoard) ? moodBoard : [],
//         };
//       });
//     } catch (error) {
//       console.error('Failed to load entries:', error);
//       throw error;
//     }
//   },

//   async saveEntry(entryData, isEditing = false, entryId = null) {
//     try {
//       const user = await getCurrentUser();
//       if (!user) throw new Error('User not authenticated');

//       const requiredFields = ['title', 'mood', 'date'];
//       for (const field of requiredFields) {
//         if (!entryData[field]) {
//           throw new Error(`Missing required field: ${field}`);
//         }
//       }

//       const moodBoard = entryData.moodBoard || [];
//       const processedMoodBoard = await Promise.all(
//         moodBoard.map(async (item) => {
//           if (item.type === 'image' && item.content.startsWith('blob:')) {
//             const response = await fetch(item.content);
//             const blob = await response.blob();
//             const file = new File([blob], `moodboard_${item.id}.jpg`, { type: blob.type });
//             const storedFile = await storage.createFile(BUCKET_ID, ID.unique(), file);
//             return { ...item, content: storedFile.$id };
//           }
//           return item;
//         })
//       );

//       const data = {
//         ...entryData,
//         moodBoard: JSON.stringify(processedMoodBoard),
//         userId: user.$id,
//       };

//       if (isEditing && entryId) {
//         return await databases.updateDocument(
//           DATABASE_ID,
//           DIARY_COLLECTION_ID,
//           entryId,
//           data
//         );
//       } else {
//         return await databases.createDocument(
//           DATABASE_ID,
//           DIARY_COLLECTION_ID,
//           ID.unique(),
//           data
//         );
//       }
//     } catch (error) {
//       console.error('Failed to save entry:', error);
//       throw error;
//     }
//   },

//   async deleteEntry(entryId) {
//     try {
//       const document = await databases.getDocument(
//         DATABASE_ID,
//         DIARY_COLLECTION_ID,
//         entryId
//       );

//       const moodBoard = document.moodBoard ? JSON.parse(document.moodBoard) : [];
//       for (const item of moodBoard) {
//         if (item.type === 'image' && !item.content.startsWith('blob:')) {
//           await storage.deleteFile(BUCKET_ID, item.content);
//         }
//       }
//       if (document.image && !document.image.startsWith('blob:')) {
//         await storage.deleteFile(BUCKET_ID, document.image);
//       }

//       await databases.deleteDocument(
//         DATABASE_ID,
//         DIARY_COLLECTION_ID,
//         entryId
//       );
//       return true;
//     } catch (error) {
//       console.error('Failed to delete entry:', error);
//       throw error;
//     }
//   },
// };
