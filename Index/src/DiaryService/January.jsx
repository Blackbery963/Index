
// import React, { useState, useEffect, useMemo } from 'react';
// import { FaBook, FaPen, FaSave, FaTrash, FaShare, FaPalette, FaLightbulb, FaTasks, FaImage } from 'react-icons/fa';
// import { FiUpload, FiType } from 'react-icons/fi';
// import {MdEdit, MdBrush} from 'react-icons/md'
// import { motion, AnimatePresence } from 'framer-motion';
// import { useDiary } from './useDiary';
// import toast from 'react-hot-toast';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



// const moodConfig = {
//   happy: { 
//     bg: 'from-amber-50 to-pink-100', 
//     card: 'bg-amber-50', 
//     prompt: 'What sparked joy in your art today?', 
//     emoji: '😊', 
//     color: 'bg-amber-400',
//     text: 'text-amber-800'
//   },
//   introspective: { 
//     bg: 'from-blue-50 to-indigo-100', 
//     card: 'bg-blue-50',
//     prompt: 'What thoughts are shaping your work?', 
//     emoji: '🤔', 
//     color: 'bg-blue-400',
//     text: 'text-blue-800'
//   },
//   calm: {
//     bg: 'from-green-50 to-emerald-100',
//     card: 'bg-green-50',
//     prompt: 'What brought you peace in your process today?',
//     emoji: '🌿',
//     color: 'bg-green-400',
//     text: 'text-green-800'
//   },
//   frustrated: {
//     bg: 'from-red-50 to-stone-100',
//     card: 'bg-red-50',
//     prompt: 'What challenges did you face while creating?',
//     emoji: '😤',
//     color: 'bg-red-400',
//     text: 'text-red-800'
//   },
//   nostalgic: {
//     bg: 'from-yellow-50 to-orange-100',
//     card: 'bg-yellow-50',
//     prompt: 'What memory influenced your art today?',
//     emoji: '🕰️',
//     color: 'bg-yellow-400',
//     text: 'text-yellow-800'
//   },
//   inspired: {
//     bg: 'from-violet-50 to-purple-100',
//     card: 'bg-violet-50',
//     prompt: 'What inspired your creation today?',
//     emoji: '✨',
//     color: 'bg-violet-400',
//     text: 'text-violet-800'
//   },
//   melancholic: {
//     bg: 'from-slate-50 to-gray-100',
//     card: 'bg-slate-50',
//     prompt: 'What emotions are you processing through your art?',
//     emoji: '🌧️',
//     color: 'bg-slate-400',
//     text: 'text-slate-800'
//   },
//   playful: {
//     bg: 'from-pink-50 to-purple-100',
//     card: 'bg-pink-50',
//     prompt: 'What fun or experimentation did you explore today?',
//     emoji: '🎨',
//     color: 'bg-pink-400',
//     text: 'text-pink-800'
//   }
// };

// const getTodaysChallenge = () => {
//   const date = new Date();
//   const dayOfYear = Math.floor ((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
//   const challenges = [
//     'Try a monochromatic color scheme',
//     'Experiment with negative space',
//     'Create using only organic shapes',
//     'Limit yourself to 3 brush strokes per element',
//     'Draw with your non-dominant hand',
//     'Paint without using black',
//     'Use only complementary colors'
//   ];
//   return challenges[dayOfYear % challenges.length];
// };

// const ArtistDiary = () => {
//   const {
//     entries,
//     currentEntry,
//     currentIndex,
//     loading,
//     error,
//     setCurrentIndex,
//     saveEntry: saveEntryHook,
//     deleteEntry: deleteEntryHook,
//     loadEntries
//   } = useDiary();

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

//   // toast container configaration
//     useEffect(() => {
//     toast.configure({
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     });
//   }, []);
  
//   const [isEditing, setIsEditing] = useState(false);
//   const [theme, setTheme] = useState('light');
//   const [showMoodBoardModal, setShowMoodBoardModal] = useState(false);
//   const [moodBoardContent, setMoodBoardContent] = useState('');
//   const [activeModalTab, setActiveModalTab] = useState('text');
//   const [imageUploadedToday, setImageUploadedToday] = useState(false);
//   const [draggedItem, setDraggedItem] = useState(null);

//   const todaysChallenge = useMemo(() => getTodaysChallenge(), []);

//   // Initialize form with current entry
//   useEffect(() => {
//     if (currentEntry) {
//       setFormData({
//         title: currentEntry.title || '',
//         date: currentEntry.date || new Date().toISOString().split('T')[0],
//         // date: currentEntry.date || '',
//         mood: currentEntry.mood || '',
//         image: currentEntry.image || null,
//         imageStory: currentEntry.imageStory || '',
//         artStory: currentEntry.artStory || '',
//         inspiration: currentEntry.inspiration || '',
//         tips: currentEntry.tips || '',
//         moodBoard: currentEntry.moodBoard || []
//       });

//       // Check for today's image upload
//       const hasTodayImage = currentEntry.moodBoard?.some(
//         item => item.type === 'image' && 
//         new Date(item.date).toDateString() === new Date().toDateString()
//       );


//       setImageUploadedToday(hasTodayImage);
//     } else {
//       // Reset form for new entry
//       if (!isEditing) {
//       setFormData({
//         title: '',
//         date: new Date().toISOString().split('T')[0],
//         // date: '',
//         mood: '',
//         image: null,
//         imageStory: '',
//         artStory: '',
//         inspiration: '',
//         tips: '',
//         moodBoard: []
//       });
//       setImageUploadedToday(false);
//     }
//     }
//   }, [currentEntry, isEditing]);

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', theme === 'dark');
//   }, [theme]);

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

//   const handleSave = async () => {
//     if (!formData.title) {
//       alert('Please add a title to your entry');
//       return;
//     }

//     const isEditingEntry = currentIndex < entries.length;
//     const success = await saveEntryHook(formData, isEditingEntry, currentEntry?.$id);
    
//     if (success) {
//       setIsEditing(false);
//       loadEntries(); // Refresh the entries list
//     }
//   };

//     const handleEditClick = () => {
//     if (isNew) {
//       // For new entries, just set editing to true
//       setIsEditing(true);
//     } else {
//       // For existing entries, reload the entry in edit mode
//       loadEntry(currentIndex, true);
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Delete this entry permanently?')) {
//       await deleteEntryHook(currentEntry?.$id, currentIndex);
//       setIsEditing(false);
//       loadEntries(); // Refresh the entries list
//     }
//   };

//   const loadEntry = (index) => {
//     setCurrentIndex(index);
//     setIsEditing(index < entries.length);
//   };

//   const handleDragStart = (e, item) => {
//     setDraggedItem(item);
//     e.dataTransfer.setData('text/plain', item.id);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e, moodBoardItem) => {
//     e.preventDefault();
//     if (!draggedItem || !isEditing) return;

//     const updatedMoodBoard = formData.moodBoard.map(item => {
//       if (item.id === moodBoardItem.id) {
//         return { ...item, position: draggedItem.position };
//       }
//       if (item.id === draggedItem.id) {
//         return { ...item, position: moodBoardItem.position };
//       }
//       return item;
//     });

//     setFormData(prev => ({ ...prev, moodBoard: updatedMoodBoard }));
//     setDraggedItem(null);
//   };

//   const moodBoard = isEditing ? formData.moodBoard : (currentEntry?.moodBoard || []);
//   const isEmpty = entries.length === 0;
//   const isNew = currentIndex === entries.length;
//   const currentMood = formData.mood ? moodConfig[formData.mood] : moodConfig.happy;

//   const fadeIn = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.5 } }
//   };

//   if (loading && !entries.length) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl">Loading your diary...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-red-500 text-xl">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen bg-gradient-to-br ${currentMood.bg} dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 font-sans`}>
//       <header className="w-full bg-white/30 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 fixed top-0 z-50">
//         <div className="w-full mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold font-eagle text-gray-800 dark:text-white">
//             <span className="text-indigo-600 dark:text-indigo-400">Painters'</span> Diary
//           </h1>
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
//               className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//             >
//               {theme === 'light' ? '🌙' : '☀️'}
//             </button>
//           </div>
//         </div>
//       </header>

      // <main className="pt-24 pb-12 px-6 max-w-6xl mx-auto">
      //   <div className="flex justify-between items-center mb-8">
      //     <button
      //       onClick={() => {
      //         setCurrentIndex(Math.max(0, currentIndex - 1));
      //         setIsEditing(false);
      //       }}
      //       disabled={currentIndex === 0}
      //       className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow disabled:opacity-50 flex items-center gap-2"
      //     >
      //       <span>←</span>
      //       <span className="hidden sm:inline">Previous</span>
      //     </button>
          
      //     <div className="text-center">
      //       <h2 className="text-xl font-Playfair font-semibold text-gray-800 dark:text-white">
      //         {isNew ? 'New Entry' : currentEntry?.title || 'Untitled'}
      //       </h2>
      //       <p className="text-sm text-gray-500 dark:text-gray-400">
      //         {isEmpty ? 'No entries yet' : `Entry ${currentIndex + 1} of ${entries.length}`}
      //       </p>
      //     </div>
          
      //     <button
      //       onClick={() => {
      //         setCurrentIndex(Math.min(entries.length, currentIndex + 1));
      //         setIsEditing(false);
      //       }}
      //       disabled={currentIndex >= entries.length}
      //       className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow disabled:opacity-50 flex items-center gap-2"
      //     >
      //       <span className="hidden sm:inline">Next</span>
      //       <span>→</span>
      //     </button>
      //   </div>

      //   <AnimatePresence mode="wait">
      //     <motion.div
      //       key={currentIndex}
      //       initial={{ opacity: 0, y: 20 }}
      //       animate={{ opacity: 1, y: 0 }}
      //       exit={{ opacity: 0, y: -20 }}
      //       transition={{ duration: 0.3 }}
      //       className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
      //     >
      //       <div className="p-6 border-b border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
      //         <div>
      //           <label className="block text-lg font-Quicksand font-medium text-gray-600 dark:text-gray-300 mb-1">Title</label>
      //           <input
      //             type="text"
      //             value={isEditing ? formData.title : currentEntry?.title || ''}
      //             onChange={(e) => handleInputChange('title', e.target.value)}
      //             className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-caveat text-[16px] font-Playfair"
      //             placeholder="My masterpiece..."
      //             disabled={!isEditing}
      //           />
      //         </div>
              
      //         <div>
      //           <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-1 font-Quicksand">Date</label>
      //           <input
      //             type="date"
      //             value={isEditing ? formData.date : currentEntry?.date || ''}
      //             onChange={(e) => handleInputChange('date', e.target.value)}
      //             className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-Playfair"
      //             disabled={!isEditing}
      //           />
      //         </div>
              
      //         <div>
      //           <label className="block text-lg font-Quicksand font-medium text-gray-600 dark:text-gray-300 mb-1">Mood</label>
      //           <div className="flex gap-2 flex-wrap">
      //             {Object.keys(moodConfig).map(mood => (
      //               <button
      //                 key={mood}
      //                 onClick={() => isEditing && handleInputChange('mood', mood)}
      //                 className={`p-2 rounded-md ${moodConfig[mood].color} ${
      //                   formData.mood === mood ? 'ring-2 ring-offset-2 ring-indigo-500' : 'opacity-70 hover:opacity-100'
      //                 } transition-all`}
      //                 title={mood}
      //                 disabled={!isEditing}
      //               >
      //                 {moodConfig[mood].emoji}
      //               </button>
      //             ))}
      //           </div>
      //         </div>
      //       </div>

      //       <div className="p-6 border-b border-gray-100 dark:border-gray-700">
      //         <div className="flex justify-between items-center mb-4">
      //           <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2 font-Quicksand">
      //             <FaPalette className="text-indigo-500" />
      //             Today's Mood Board
      //             {isEditing && (
      //               <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded-full">
      //                 {moodBoard.filter(i => i.type === 'image').length}/1 image
      //               </span>
      //             )}
      //           </h2>
      //           {isEditing && (
      //             <button
      //               onClick={() => setShowMoodBoardModal(true)}
      //               className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center gap-2"
      //             >
      //               <span>Add Item</span>
      //             </button>
      //           )}
      //         </div>
              
      //         <div 
      //           className="relative h-64 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-600 overflow-hidden p-4"
      //           onDragOver={handleDragOver}
      //         >
      //           {moodBoard.length > 0 ? (
      //             moodBoard.map(item => (
      //               <motion.div
      //                 key={item.id}
      //                 className=""
      //                 style={{ 
      //                   left: `${item.position.x}px`, 
      //                   top: `${item.position.y}px`,
      //                   cursor: isEditing ? 'grab' : 'default'
      //                 }}
      //                 initial={{ scale: 0 }}
      //                 animate={{ scale: 1 }}
      //                 transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      //                 draggable={isEditing}
      //                 onDragStart={(e) => handleDragStart(e, item)}
      //                 onDrop={(e) => handleDrop(e, item)}
      //               >
      //                 {item.type === 'image' ? (
      //                   <div className="relative group">
      //                     <img 
      //                       src={item.content} 
      //                       alt="Mood board" 
      //                       className="lg:w-[200px] sm:w-[150px] sm:h-[150px] w-[120px] h-[120px] lg:h-[200px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform relative"
      //                     />
      //                     {isEditing && (
      //                       <button
      //                         onClick={(e) => {
      //                           e.stopPropagation();
      //                           setFormData(prev => ({
      //                             ...prev,
      //                             moodBoard: prev.moodBoard.filter(i => i.id !== item.id)
      //                           }));
      //                           if (item.type === 'image') {
      //                             setImageUploadedToday(false);
      //                           }
      //                         }}
      //                         className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
      //                       >
      //                         ×
      //                       </button>
      //                     )}
      //                   </div>
      //                 ) : (
      //                   <div className="relative group bg-white dark:bg-gray-700 p-2 rounded-lg shadow-md max-w-xs text-sm font-caveat">
      //                     {item.content}
      //                     {isEditing && (
      //                       <button
      //                         onClick={(e) => {
      //                           e.stopPropagation();
      //                           setFormData(prev => ({
      //                             ...prev,
      //                             moodBoard: prev.moodBoard.filter(i => i.id !== item.id)
      //                           }));
      //                         }}
      //                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
      //                       >
      //                         ×
      //                       </button>
      //                     )}
      //                   </div>
      //                 )}
      //               </motion.div>
      //             ))
      //           ) : (
      //             <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
      //               {isEditing ? (
      //                 <div className="text-center">
      //                   <p>Add inspiration to your mood board</p>
      //                   <p className="text-xs mt-2">
      //                     {imageUploadedToday ? (
      //                       "You've added your daily image - add text notes instead!"
      //                     ) : (
      //                       "You can add 1 image and unlimited text notes today"
      //                     )}
      //                   </p>
      //                 </div>
      //               ) : (
      //                 'No mood board items for this day'
      //               )}
      //             </div>
      //           )}
      //         </div>
      //       </div>

      //       <div className="p-6 border-b border-gray-100 dark:border-gray-700">
      //         <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2 font-Quicksand">
      //           <MdBrush className="text-indigo-700" />
      //           Today's Artwork
      //         </h2>
              
      //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      //           <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden group">
      //             {isEditing ? (
      //               formData.image ? (
      //                 <>
      //                   <img
      //                     src={formData.image}
      //                     alt="Artwork"
      //                     className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
      //                   />
      //                   <input
      //                     type="file"
      //                     id="artwork-upload"
      //                     className="hidden"
      //                     accept="image/*"
      //                     onChange={handleImageUpload('image')}
      //                   />
      //                   <button
      //                     onClick={() => document.getElementById('artwork-upload').click()}
      //                     className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black/30 flex items-center justify-center text-white transition-opacity"
      //                   >
      //                     <FiUpload className="text-xl mr-2" />
      //                     Change Image
      //                   </button>
      //                 </>
      //               ) : (
      //                 <>
      //                   <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
      //                     <FiUpload className="text-2xl mb-2" />
      //                     <span className='font-Quicksand'>Upload your artwork</span>
      //                   </div>
      //                   <input
      //                     type="file"
      //                     id="artwork-upload"
      //                     className="hidden"
      //                     accept="image/*"
      //                     onChange={handleImageUpload('image')}
      //                   />
      //                   <button
      //                     onClick={() => document.getElementById('artwork-upload').click()}
      //                     className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black/30 flex items-center justify-center text-white transition-opacity"
      //                   >
      //                     <FiUpload className="text-xl mr-2" />
      //                     Upload Image
      //                   </button>
      //                 </>
      //               )
      //             ) : currentEntry?.image ? (
      //               <img
      //                 src={currentEntry.image}
      //                 alt="Artwork"
      //                 className="w-full h-full object-cover"
      //               />
      //             ) : (
      //               <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
      //                 No artwork uploaded
      //               </div>
      //             )}
      //           </div>
                
      //           <div>
      //             <label className="block text-lg font-Quicksand font-medium text-gray-600 dark:text-gray-300 mb-2">
      //               The Story Behind This Work
      //             </label>
      //             <textarea
      //               value={isEditing ? formData.imageStory : currentEntry?.imageStory || ''}
      //               onChange={(e) => handleInputChange('imageStory', e.target.value)}
      //               className="w-full h-40 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-caveat text-lg font-Playfair"
      //               placeholder="What inspired this piece? What does it represent?..."
      //               disabled={!isEditing}
      //             />
      //           </div>
      //         </div>
      //       </div>

      //       <div className="p-6 border-b border-gray-100 dark:border-gray-700">
      //         <h2 className="text-lg font-Quicksand font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
      //           <FaBook className="text-indigo-500" />
      //           Artistic Journey
      //         </h2>
      //         <textarea
      //           value={isEditing ? formData.artStory : currentEntry?.artStory || ''}
      //           onChange={(e) => handleInputChange('artStory', e.target.value)}
      //           className="w-full h-48 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-caveat text-lg font-Playfair"
      //           placeholder="Describe your creative process today. What did you learn? How did you feel while creating?..."
      //           disabled={!isEditing}
      //         />
      //       </div>

      //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      //         <motion.div 
      //           initial="hidden"
      //           animate="visible"
      //           variants={fadeIn}
      //           className={`p-6 rounded-xl ${currentMood.card} dark:bg-gray-700/50 border-2 border-dashed ${currentMood.text}/20`}
      //         >
      //           <div className="flex items-center gap-3 mb-4">
      //             <div className={`p-2 rounded-lg ${currentMood.color} text-white`}>
      //               <FaTasks />
      //             </div>
      //             <h3 className="text-lg font-semibold text-gray-800 dark:text-white font-Quicksand">Today's Challenge</h3>
      //           </div>
      //           <p className="text-gray-700 dark:text-gray-300 mb-4 font-caveat text-[16px] font-Playfair">
      //             {todaysChallenge}
      //           </p>
      //         </motion.div>

      //         <motion.div 
      //           initial="hidden"
      //           animate="visible"
      //           variants={fadeIn}
      //           transition={{ delay: 0.1 }}
      //           className="p-6 rounded-xl bg-white dark:bg-gray-700/50 border-2 border-dashed border-gray-200 dark:border-gray-600"
      //         >
      //           <div className="flex items-center gap-3 mb-4">
      //             <div className="p-2 rounded-lg bg-green-500 text-white">
      //               <FaLightbulb />
      //             </div>
      //             <h3 className="text-lg font-semibold text-gray-800 dark:text-white font-Quicksand">Tips & Tricks</h3>
      //           </div>
      //           <textarea
      //             value={isEditing ? formData.tips : currentEntry?.tips || ''}
      //             onChange={(e) => handleInputChange('tips', e.target.value)}
      //             className="w-full h-32 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-Playfair"
      //             placeholder="Share your artistic discoveries and techniques..."
      //             disabled={!isEditing}
      //           />
      //         </motion.div>
      //       </div>
            
      //       <div className="p-6 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700 flex flex-wrap justify-between gap-4">
      //         <div className="flex gap-3">
      //           {isEditing ? (
      //             <>
      //               <button
      //                 onClick={handleSave}
      //                 className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
      //               >
      //                 <FaSave />
      //                 Save Entry
      //               </button>
      //               <button
      //                 onClick={() => setIsEditing(false)}
      //                 className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
      //               >
      //                 Cancel
      //               </button>
      //             </>
      //           ) : (
      //             <button
      //               // onClick={() => loadEntry(currentIndex)}
      //               onClick={handleEditClick}
      //               className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
      //             >
      //               <MdEdit />
      //               {isNew ? 'Create New' : 'Edit Entry'}
      //             </button>
      //           )}
                
      //           {!isNew && !isEditing && (
      //             <button
      //               onClick={handleDelete}
      //               className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors"
      //             >
      //               <FaTrash />
      //               Delete
      //             </button>
      //           )}
      //         </div>
              
      //         {!isNew && (
      //           <button
      //             onClick={() => {
      //               if (navigator.share) {
      //                 navigator.share({
      //                   title: currentEntry.title || 'My Art Diary Entry',
      //                   text: `Check out my art diary entry from ${currentEntry.date}`,
      //                   url: window.location.href,
      //                 }).catch(err => console.log('Error sharing:', err));
      //               } else {
      //                 alert('Web Share API not supported in your browser');
      //               }
      //             }}
      //             className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center gap-2 transition-colors"
      //           >
      //             <FaShare />
      //             Share
      //           </button>
      //         )}
      //       </div>
      //     </motion.div>
      //   </AnimatePresence>

      //   {showMoodBoardModal && (
      //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      //       <motion.div 
      //         initial={{ scale: 0.9, opacity: 0 }}
      //         animate={{ scale: 1, opacity: 1 }}
      //         className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl"
      //       >
      //         <h3 className="text-lg font-semibold mb-4">Add to Mood Board</h3>
              
      //         <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
      //           <button
      //             onClick={() => setActiveModalTab('image')}
      //             className={`px-4 py-2 font-medium flex items-center gap-2 ${
      //               activeModalTab === 'image' 
      //                 ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400' 
      //                 : 'text-gray-500 dark:text-gray-400'
      //             }`}
      //             disabled={imageUploadedToday}
      //           >
      //             <FaImage />
      //             Image
      //             {imageUploadedToday && <span className="text-xs text-red-500">(Limit reached)</span>}
      //           </button>
      //           <button
      //             onClick={() => setActiveModalTab('text')}
      //             className={`px-4 py-2 font-medium flex items-center gap-2 ${
      //               activeModalTab === 'text' 
      //                 ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400' 
      //                 : 'text-gray-500 dark:text-gray-400'
      //             }`}
      //           >
      //             <FiType />
      //             Text
      //           </button>
      //         </div>
              
      //         {activeModalTab === 'image' ? (
      //           <div className="space-y-4">
      //             <div className={`p-4 border-2 border-dashed rounded-lg ${
      //               imageUploadedToday 
      //                 ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20' 
      //                 : 'border-gray-200 dark:border-gray-600'
      //             }`}>
      //               {imageUploadedToday ? (
      //                 <p className="text-center text-gray-600 dark:text-gray-300">
      //                   You've already added your daily image. Try again tomorrow!
      //                 </p>
      //               ) : (
      //                 <>
      //                   <label className="block text-sm font-medium mb-2 text-center">
      //                     Upload Today's Inspiration Image
      //                   </label>
      //                   <input
      //                     type="file"
      //                     accept="image/*"
      //                     onChange={(e) => {
      //                       const file = e.target.files[0];
      //                       if (file) {
      //                         addMoodBoardItem('image', URL.createObjectURL(file));
      //                       }
      //                     }}
      //                     className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
      //                   />
      //                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
      //                     Limit: 1 image per day
      //                   </p>
      //                 </>
      //               )}
      //             </div>
      //           </div>
      //         ) : (
      //           <div className="space-y-4">
      //             <label className="block text-sm font-medium mb-2">Add Inspirational Note</label>
      //             <textarea
      //               value={moodBoardContent}
      //               onChange={(e) => setMoodBoardContent(e.target.value)}
      //               className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
      //               placeholder="Write an inspirational quote, idea, or reflection..."
      //               rows={4}
      //             />
      //             <button
      //               onClick={() => {
      //                 if (moodBoardContent.trim()) {
      //                   addMoodBoardItem('text', moodBoardContent);
      //                 }
      //               }}
      //               className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      //               disabled={!moodBoardContent.trim()}
      //             >
      //               Add Note
      //             </button>
      //           </div>
      //         )}
              
      //         <button
      //           onClick={() => setShowMoodBoardModal(false)}
      //           className="mt-4 w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      //         >
      //           Close
      //         </button>
      //       </motion.div>
      //     </div>
      //   )}
      // </main>
//     </div>
//   );
// };

// export default ArtistDiary;

import React, { useState, useEffect, useMemo } from 'react';
import { FaBook, FaPen, FaSave, FaTrash, FaShare, FaPalette, FaLightbulb, FaTasks, FaImage } from 'react-icons/fa';
import { FiUpload, FiType } from 'react-icons/fi';
import { MdEdit, MdBrush } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDiary } from './useDiary';
import { diaryService } from './DiaryService';

const moodConfig = {
  happy: {
    bg: 'from-amber-50 to-pink-100',
    card: 'bg-amber-50',
    prompt: 'What sparked joy in your art today?',
    emoji: '😊',
    color: 'bg-amber-400',
    text: 'text-amber-800',
  },
  introspective: {
    bg: 'from-blue-50 to-indigo-100',
    card: 'bg-blue-50',
    prompt: 'What thoughts are shaping your work?',
    emoji: '🤔',
    color: 'bg-blue-400',
    text: 'text-blue-800',
  },
  calm: {
    bg: 'from-green-50 to-emerald-100',
    card: 'bg-green-50',
    prompt: 'What brought you peace in your process today?',
    emoji: '🌿',
    color: 'bg-green-400',
    text: 'text-green-800',
  },
  frustrated: {
    bg: 'from-red-50 to-stone-100',
    card: 'bg-red-50',
    prompt: 'What challenges did you face while creating?',
    emoji: '😤',
    color: 'bg-red-400',
    text: 'text-red-800',
  },
  nostalgic: {
    bg: 'from-yellow-50 to-orange-100',
    card: 'bg-yellow-50',
    prompt: 'What memory influenced your art today?',
    emoji: '🕰️',
    color: 'bg-yellow-400',
    text: 'text-yellow-800',
  },
  inspired: {
    bg: 'from-violet-50 to-purple-100',
    card: 'bg-violet-50',
    prompt: 'What inspired your creation today?',
    emoji: '✨',
    color: 'bg-violet-400',
    text: 'text-violet-800',
  },
  melancholic: {
    bg: 'from-slate-50 to-gray-100',
    card: 'bg-slate-50',
    prompt: 'What emotions are you processing through your art?',
    emoji: '🌧️',
    color: 'bg-slate-400',
    text: 'text-slate-800',
  },
  playful: {
    bg: 'from-pink-50 to-purple-100',
    card: 'bg-pink-50',
    prompt: 'What fun or experimentation did you explore today?',
    emoji: '🎨',
    color: 'bg-pink-400',
    text: 'text-pink-800',
  },
};

const getTodaysChallenge = () => {
  const date = new Date();
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const challenges = [
    'Try a monochromatic color scheme',
    'Experiment with negative space',
    'Create using only organic shapes',
    'Limit yourself to 3 brush strokes per element',
    'Draw with your non-dominant hand',
    'Paint without using black',
    'Use only complementary colors',
  ];
  return challenges[dayOfYear % challenges.length];
};

const ArtistDiary = () => {
  const {
    entries,
    currentEntry,
    currentIndex,
    formData,
    setFormData,
    handleImageUpload,
    addMoodBoardItem,
    removeMoodBoardItem,
    imageUploadedToday,
    loading,
    setCurrentIndex,
    saveEntry: saveEntryHook,
    deleteEntry: deleteEntryHook,
    loadEntries,
  } = useDiary();


  const getImageUrl = (image) => {
  try {
    if (!image) return null;
    
    // If it's already a URL (from File object or existing URL)
    if (typeof image === 'string' && image.startsWith('http')) {
      return image;
    }
    
    // If it's a File object
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    
    // If it's an Appwrite file ID
    if (typeof image === 'string') {
      return `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${
        import.meta.env.VITE_APPWRITE_BUCKET_ID
      }/files/${image}/view?project=${
        import.meta.env.VITE_APPWRITE_PROJECT_ID
      }&mode=admin`;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get image URL:', error);
    return null;
  }
};

  const [isEditing, setIsEditing] = useState(false);
  const [showMoodBoardModal, setShowMoodBoardModal] = useState(false);
  const [moodBoardContent, setMoodBoardContent] = useState('');
  const [activeModalTab, setActiveModalTab] = useState('text');
  const [draggedItem, setDraggedItem] = useState(null);
  const todaysChallenge = useMemo(() => getTodaysChallenge(), []);

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Please add a title to your entry');
      return false;
    }
    if (!formData.mood) {
      toast.error('Please select a mood');
      return false;
    }
    if (!formData.artStory.trim()) {
      toast.error('Please share your artistic journey');
      return false;
    }
    return true;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const isEditingEntry = currentIndex < entries.length;
      const success = await saveEntryHook(formData, isEditingEntry, currentEntry);
      if (success) {
        toast.success(`Entry ${isEditingEntry ? 'updated' : 'created'} successfully!`);
        setIsEditing(false);
        setFormData({
          title: '',
          date: new Date().toISOString().split('T')[0],
          mood: '',
          image: null,
          imageStory: '',
          artStory: '',
          inspiration: '',
          tips: '',
          moodBoard: [],
        });
      }
    } catch (error) {
      toast.error(`Error saving entry: ${error.message}`);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    if (currentEntry && window.confirm('Delete this entry permanently?')) {
      try {
        const success = await deleteEntryHook(currentEntry.$id, currentIndex);
        if (success) {
          toast.success('Entry deleted successfully');
          setIsEditing(false);
        }
      } catch (error) {
        toast.error(`Error deleting entry: ${error.message}`);
      }
    }
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, moodBoardItem) => {
    e.preventDefault();
    if (!draggedItem || !isEditing) return;

    const updatedMoodBoard = formData.moodBoard.map((item) => {
      if (item.id === moodBoardItem.id) {
        return { ...item, position: draggedItem.position };
      }
      if (item.id === draggedItem.id) {
        return { ...item, position: moodBoardItem.position };
      }
      return item;
    });

    setFormData((prev) => ({ ...prev, moodBoard: updatedMoodBoard }));
    setDraggedItem(null);
  };

  const moodBoard = isEditing ? formData.moodBoard : (currentEntry?.moodBoard || []);
  const isEmpty = entries.length === 0;
  const isNew = currentIndex === entries.length;
  const currentMood = formData.mood ? moodConfig[formData.mood] : moodConfig.happy;

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  if (loading && !entries.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading your diary...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentMood.bg} dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 font-sans`}>
      <ToastContainer />
      <header className="w-full bg-white/30 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 fixed top-0 z-50">
        <div className="w-full mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-eagle text-gray-800 dark:text-white">
            <span className="text-indigo-600 dark:text-indigo-400">Painters'</span> Diary
          </h1>
        </div>
      </header>
      <main className="pt-24 pb-12 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => {
              setCurrentIndex(Math.max(0, currentIndex - 1));
              setIsEditing(true);
            }}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow disabled:opacity-50 flex items-center gap-2"
          >
            <span>←</span>
            <span className="hidden sm:inline">Previous</span>
          </button>
          <div className="text-center">
            <h2 className="text-xl font-Playfair font-semibold text-gray-800 dark:text-white">
              {isNew ? 'New Entry' : currentEntry?.title || 'Untitled'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isEmpty ? 'No entries yet' : `Entry ${currentIndex + 1} of ${entries.length}`}
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentIndex(Math.min(entries.length, currentIndex + 1));
              setIsEditing(true);
            }}
            disabled={currentIndex >= entries.length}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow disabled:opacity-50 flex items-center gap-2"
          >
            <span className="hidden sm:inline">Next</span>
            <span>→</span>
          </button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-lg font-Quicksand font-medium text-gray-600 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={isEditing ? formData.title : currentEntry?.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-caveat text-[16px] font-Playfair"
                  placeholder="My masterpiece..."
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-1 font-Quicksand">Date</label>
                <input
                  type="date"
                  value={isEditing ? formData.date : currentEntry?.date || ''}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-Playfair"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-lg font-Quicksand font-medium text-gray-600 dark:text-gray-300 mb-1">Mood</label>
                <div className="flex gap-2 flex-wrap">
                  {Object.keys(moodConfig).map((mood) => (
                    <button
                      key={mood}
                      onClick={() => isEditing && handleInputChange('mood', mood)}
                      className={`p-2 rounded-md ${moodConfig[mood].color} ${
                        formData.mood === mood ? 'ring-2 ring-offset-2 ring-indigo-500' : 'opacity-70 hover:opacity-100'
                      } transition-all`}
                      title={mood}
                      disabled={!isEditing}
                    >
                      {moodConfig[mood].emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2 font-Quicksand">
                  <FaPalette className="text-indigo-500" />
                  Today's Mood Board
                  {isEditing && (
                    <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded-full">
                      {moodBoard.filter((i) => i.type === 'image').length}/1 image
                    </span>
                  )}
                </h2>
                {isEditing && (
                  <button
                    onClick={() => setShowMoodBoardModal(true)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                    <span>Add Item</span>
                  </button>
                )}
              </div>
              <div
                className="relative h-64 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-600 overflow-hidden p-4"
                onDragOver={handleDragOver}
              >
                {Array.isArray(moodBoard) && moodBoard.length > 0 ? (
                  moodBoard.map((item) => (
                    <motion.div
                      key={item.id}
                      className="absolute"
                      style={{
                        left: `${item.position.x}px`,
                        top: `${item.position.y}px`,
                        cursor: isEditing ? 'grab' : 'default',
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      draggable={isEditing}
                      onDragStart={(e) => handleDragStart(e, item)}
                      onDrop={(e) => handleDrop(e, item)}
                    >
                      {item.type === 'image' ? (
                        <div className="relative group">
                          {/* <img
                            src={getImageUrl(item.content)}
                            alt="Mood board"
                            className="lg:w-[200px] sm:w-[150px] sm:h-[150px] w-[120px] h-[120px] lg:h-[200px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                          /> */}
                          {moodBoard.map(item => (
                          item.type === 'image' ? (
                          <img
                          key={item.id}
                          src={getImageUrl(item.content)}
                          alt="Mood board item"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                          e.target.onerror = null;
                          }}
                          />
                         ) : (
                         <div key={item.id}>{item.content}</div>
                          )
                          ))}
                          {isEditing && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeMoodBoardItem(item.id);
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="relative group bg-white dark:bg-gray-700 p-2 rounded-lg shadow-md max-w-xs text-sm font-caveat">
                          {item.content}
                          {isEditing && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeMoodBoardItem(item.id);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                    {isEditing ? (
                      <div className="text-center">
                        <p>Add inspiration to your mood board</p>
                        <p className="text-xs mt-2">
                          {imageUploadedToday ? (
                            "You've added your daily image - add text notes instead!"
                          ) : (
                            "You can add 1 image and unlimited text notes today"
                          )}
                        </p>
                      </div>
                    ) : (
                      'No mood board items for this day'
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-Quicksand font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <MdBrush className="text-indigo-700" />
                Today's Artwork
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden group">
                  {isEditing ? (
                    formData.image ? (
                      <>
                        {/* <img
                          src={getImageUrl(formData.image)}
                          alt="Artwork"
                          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                        /> */}
                        {currentEntry?.image && (
                        <img 
                        src={getImageUrl(currentEntry.image)}
                        alt={currentEntry.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                        e.target.onerror = null;
                        }}
                        />
                        )}
                        <input
                          type="file"
                          id="artwork-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('image', e.target.files[0])}
                        />
                        <button
                          onClick={() => document.getElementById('artwork-upload').click()}
                          className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black/30 flex items-center justify-center text-white transition-opacity"
                        >
                          <FiUpload className="text-xl mr-2" />
                          Change Image
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                          <FiUpload className="text-2xl mb-2" />
                          <span className="font-Quicksand">Upload your artwork</span>
                        </div>
                        <input
                          type="file"
                          id="artwork-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('image', e.target.files[0])}
                        />
                        <button
                          onClick={() => document.getElementById('artwork-upload').click()}
                          className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black/30 flex items-center justify-center text-white transition-opacity"
                        >
                          <FiUpload className="text-xl mr-2" />
                          Upload Image
                        </button>
                      </>
                    )
                  ) : currentEntry?.image ? (
                    <img src={currentEntry.image} alt="Artwork" className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                      No artwork uploaded
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-Quicksand font-medium text-gray-600 dark:text-gray-300 mb-2">
                    The Story Behind This Work
                  </label>
                  <textarea
                    value={isEditing ? formData.imageStory : currentEntry?.imageStory || ''}
                    onChange={(e) => handleInputChange('imageStory', e.target.value)}
                    className="w-full h-40 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-caveat text-lg font-Playfair"
                    placeholder="What inspired this piece? What does it represent?..."
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-Quicksand font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FaBook className="text-indigo-500" />
                Artistic Journey
              </h2>
              <textarea
                value={isEditing ? formData.artStory : currentEntry?.artStory || ''}
                onChange={(e) => handleInputChange('artStory', e.target.value)}
                className="w-full h-48 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-caveat text-lg font-Playfair"
                placeholder="Describe your creative process today. What did you learn? How did you feel while creating?..."
                disabled={!isEditing}
              />
            </div>
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-Quicksand font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FaLightbulb className="text-indigo-500" />
                Inspiration
              </h2>
              <textarea
                value={isEditing ? formData.inspiration : currentEntry?.inspiration || ''}
                onChange={(e) => handleInputChange('inspiration', e.target.value)}
                className="w-full h-48 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-caveat text-lg font-Playfair"
                placeholder="What inspired you today? Any quotes, ideas, or experiences?..."
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className={`p-6 rounded-xl ${currentMood.card} dark:bg-gray-700/50 border-2 border-dashed ${currentMood.text}/20`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${currentMood.color} text-white`}>
                    <FaTasks />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white font-Quicksand">Today's Challenge</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 font-caveat text-[16px] font-Playfair">{todaysChallenge}</p>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-xl bg-white dark:bg-gray-700/50 border-2 border-dashed border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-green-500 text-white">
                    <FaLightbulb />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white font-Quicksand">Tips & Tricks</h3>
                </div>
                <textarea
                  value={isEditing ? formData.tips : currentEntry?.tips || ''}
                  onChange={(e) => handleInputChange('tips', e.target.value)}
                  className="w-full h-32 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-Playfair"
                  placeholder="Share your artistic discoveries and techniques..."
                  disabled={!isEditing}
                />
              </motion.div>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700 flex flex-wrap justify-between gap-4">
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
                    >
                      <FaSave />
                      Save Entry
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          title: '',
                          date: new Date().toISOString().split('T')[0],
                          mood: '',
                          image: null,
                          imageStory: '',
                          artStory: '',
                          inspiration: '',
                          tips: '',
                          moodBoard: [],
                        });
                      }}
                      className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEditClick}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
                  >
                    <MdEdit />
                    {isNew ? 'Create New' : 'Edit Entry'}
                  </button>
                )}
                {!isNew && !isEditing && (
                  <button
                    onClick={handleDelete}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors"
                  >
                    <FaTrash />
                    Delete
                  </button>
                )}
              </div>
              {!isNew && (
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: currentEntry.title || 'My Art Diary Entry',
                        text: `Check out my art diary entry from ${currentEntry.date}`,
                        url: window.location.href,
                      }).catch((err) => console.log('Error sharing:', err));
                    } else {
                      toast.info('Web Share API not supported in your browser');
                    }
                  }}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center gap-2 transition-colors"
                >
                  <FaShare />
                  Share
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        {showMoodBoardModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-lg font-semibold mb-4">Add to Mood Board</h3>
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                <button
                  onClick={() => setActiveModalTab('image')}
                  className={`px-4 py-2 font-medium flex items-center gap-2 ${
                    activeModalTab === 'image'
                      ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  disabled={imageUploadedToday}
                >
                  <FaImage />
                  Image
                  {imageUploadedToday && <span className="text-xs text-red-500">(Limit reached)</span>}
                </button>
                <button
                  onClick={() => setActiveModalTab('text')}
                  className={`px-4 py-2 font-medium flex items-center gap-2 ${
                    activeModalTab === 'text'
                      ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <FiType />
                  Text
                </button>
              </div>
              {activeModalTab === 'image' ? (
                <div className="space-y-4">
                  <div
                    className={`p-4 border-2 border-dashed rounded-lg ${
                      imageUploadedToday
                        ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {imageUploadedToday ? (
                      <p className="text-center text-gray-600 dark:text-gray-300">
                        You've already added your daily image. Try again tomorrow!
                      </p>
                    ) : (
                      <>
                        <label className="block text-sm font-medium mb-2 text-center">Upload Today's Inspiration Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              addMoodBoardItem('image', file);
                            }
                          }}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">Limit: 1 image per day</p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <label className="block text-sm font-medium mb-2">Add Inspirational Note</label>
                  <textarea
                    value={moodBoardContent}
                    onChange={(e) => setMoodBoardContent(e.target.value)}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                    placeholder="Write an inspirational quote, idea, or reflection..."
                    rows={4}
                  />
                  <button
                    onClick={() => {
                      if (moodBoardContent.trim()) {
                        addMoodBoardItem('text', moodBoardContent);
                      }
                    }}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    disabled={!moodBoardContent.trim()}
                  >
                    Add Note
                  </button>
                </div>
              )}
              <button
                onClick={() => setShowMoodBoardModal(false)}
                className="mt-4 w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ArtistDiary;