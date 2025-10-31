// // src/components/CreateStoryModal.jsx (improved: remove author/avatar from storyData, consistent with db design)
// import React, { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Upload, Image, ChevronLeft } from 'lucide-react';
// import { useAuth } from '../hooks/useAuth';

// const CreateStoryModal = ({ isOpen, onClose, onCreateStory, onUploadFile }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     era: '',
//     poeticTeaser: '',
//     coverImage: null,
//     mood: ''
//   });
//   const [uploading, setUploading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [currentStep, setCurrentStep] = useState(1);
//   const fileInputRef = useRef(null);

//   const { user } = useAuth(); // Get current user

//   const moods = [
//     { name: 'Mystical', emoji: '✨' },
//     { name: 'Romantic', emoji: '💕' },
//     { name: 'Adventure', emoji: '🗺️' },
//     { name: 'Mystery', emoji: '🔮' },
//     { name: 'Fantasy', emoji: '🦄' },
//     { name: 'Historical', emoji: '📜' }
//   ];

//   const handleInputChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (!file.type.startsWith('image/')) {
//       alert('Please upload an image file');
//       return;
//     }

//     const url = URL.createObjectURL(file);
//     setPreviewUrl(url);

//     try {
//       setUploading(true);
//       const uploadResult = await onUploadFile(file);
//       setFormData(prev => ({
//         ...prev,
//         coverImage: uploadResult.url,
//         coverImageFileId: uploadResult.fileId
//       }));
//     } catch (error) {
//       console.error('Upload failed:', error);
//       alert('Failed to upload image');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const nextStep = () => {
//     if (!formData.coverImage) {
//       alert('Please add a cover image first');
//       return;
//     }
//     setCurrentStep(2);
//   };

//   const prevStep = () => setCurrentStep(1);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       alert('Please log in to create a story');
//       return;
//     }
//     if (!formData.title || !formData.poeticTeaser || !formData.coverImage) {
//       alert('Please fill all required fields');
//       return;
//     }

//     try {
//       await onCreateStory({
//         ...formData,
//         likes: 0,
//         isLiked: false,
//         colorTheme: 'from-blue-500 to-purple-600'
//       }); // Removed author and avatar; handled via userId and enrichment
      
//       setFormData({
//         title: '',
//         era: '',
//         poeticTeaser: '',
//         coverImage: null,
//         mood: ''
//       });
//       setPreviewUrl('');
//       setCurrentStep(1);
//       onClose();
//     } catch (error) {
//       console.error('Create story failed:', error);
//       alert('Failed to create story');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
//         onClick={onClose}
//       >
//         {/* Desktop Layout */}
//         <motion.div
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.95, opacity: 0 }}
//           className="hidden lg:flex bg-white dark:bg-gray-900 rounded-2xl w-full max-w-7xl max-h-[90vh] shadow-2xl overflow-hidden"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Left Side - Image Upload */}
//           <div className="w-4/6 p-6 border-r border-gray-200 dark:border-gray-700">
//             <div className="h-full">
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
              
//               {previewUrl ? (
//                 <div className="relative w-full h-full rounded-lg overflow-hidden bg-black">
//                   <img
//                     src={previewUrl}
//                     alt="Preview"
//                     className="w-full h-full object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current?.click()}
//                     className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70"
//                   >
//                     <Upload className="w-4 h-4" />
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={() => fileInputRef.current?.click()}
//                   className="w-full h-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
//                 >
//                   <Image className="w-12 h-12 text-gray-400 mb-3" />
//                   <p className="text-gray-600 dark:text-gray-400 font-medium">
//                     Upload cover image
//                   </p>
//                   <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
//                     Click to upload
//                   </p>
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Right Side - Form Inputs */}
//           <div className="w-1/2 flex flex-col">
//             <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Create Story
//               </h2>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="flex-1 p-6 overflow-y-auto">
//               <div className="space-y-6">
//                 {/* Title Input */}
//                 <div>
//                   <label className="block text-xl font-bold font-Quicksand text-gray-700 dark:text-gray-300 mb-3">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     placeholder="Enter story title"
//                     className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
//                     required
//                   />
//                 </div>

//                 {/* Era Input */}
//                 <div>
//                   <label className="block text-xl font-bold font-Quicksand text-gray-700 dark:text-gray-300 mb-3">
//                     Era
//                   </label>
//                   <input
//                     type="text"
//                     name="era"
//                     value={formData.era}
//                     onChange={handleInputChange}
//                     placeholder="Enter story era"
//                     className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
//                   />
//                 </div>

//                 {/* Description Input */}
//                 <div>
//                   <label className="block text-xl font-bold font-Quicksand text-gray-700 dark:text-gray-300 mb-3">
//                     Description
//                   </label>
//                   <textarea
//                     name="poeticTeaser"
//                     value={formData.poeticTeaser}
//                     onChange={handleInputChange}
//                     placeholder="Enter story description"
//                     rows={4}
//                     className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors resize-none"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Mood Selection */}
//               <div className="mt-8">
//                 <label className="block text-xl font-bold font-Quicksand text-gray-700 dark:text-gray-300 mb-4">
//                   Story Mood
//                 </label>
//                 <div className="grid grid-cols-3 gap-3">
//                   {moods.map((mood) => (
//                     <button
//                       key={mood.name}
//                       type="button"
//                       onClick={() => setFormData(prev => ({ ...prev, mood: mood.name }))}
//                       className={`p-4 rounded-lg border-2 transition-colors  ${
//                         formData.mood === mood.name
//                           ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
//                           : 'border-gray-300 dark:border-gray-600'
//                       }`}
//                     >
//                       <span className="text-2xl block mb-2">{mood.emoji}</span>
//                       <p className="text-sm font-medium">{mood.name}</p>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Desktop Create Button */}
//             <div className="p-6 border-t border-gray-200 dark:border-gray-700">
//               <button
//                 onClick={handleSubmit}
//                 disabled={uploading || !formData.coverImage || !formData.title || !formData.poeticTeaser}
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
//               >
//                 {uploading ? 'Creating Story...' : 'Create Story'}
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Mobile Layout - Full Screen */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 50 }}
//           className="lg:hidden w-full h-full bg-white dark:bg-gray-900 flex flex-col"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               {currentStep === 2 && (
//                 <button
//                   onClick={prevStep}
//                   className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
//                 >
//                   <ChevronLeft className="w-5 h-5" />
//                 </button>
//               )}
//               <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 {currentStep === 1 ? 'Add Cover Image' : 'Story Details'}
//               </h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Content Area */}
//           <div className="flex-1 overflow-y-auto">
//             <AnimatePresence mode="wait">
//               {currentStep === 1 ? (
//                 <motion.div
//                   key="step1"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   className="h-full flex flex-col"
//                 >
//                   {/* Image Upload */}
//                   <div className="flex-1 p-4 flex items-center justify-center">
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                       className="hidden"
//                     />
                    
//                     {previewUrl ? (
//                       <div className="relative w-full aspect-auto h-auto rounded-lg overflow-hidden bg-black">
//                         <img
//                           src={previewUrl}
//                           alt="Preview"
//                           className="w-full h-full object-cover"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => fileInputRef.current?.click()}
//                           className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70"
//                         >
//                           <Upload className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ) : (
//                       <button
//                         type="button"
//                         onClick={() => fileInputRef.current?.click()}
//                         className="w-full h-80 aspect-auto rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
//                       >
//                         <Image className="w-16 h-16 text-gray-400 mb-4" />
//                         <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
//                           Upload cover image
//                         </p>
//                         <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
//                           Tap to upload
//                         </p>
//                       </button>
//                     )}
//                   </div>

//                   {/* Continue Button */}
//                   <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//                     <button
//                       onClick={nextStep}
//                       disabled={!formData.coverImage}
//                       className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
//                     >
//                       Continue
//                     </button>
//                   </div>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="step2"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   className="h-full flex flex-col"
//                 >
//                   {/* Form Inputs */}
//                   <div className="flex-1 p-4 space-y-6">
//                     {/* Title Input */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                         Title
//                       </label>
//                       <input
//                         type="text"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleInputChange}
//                         placeholder="Enter story title"
//                         className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors text-lg"
//                         required
//                       />
//                     </div>

//                     {/* Era Input */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                         Era
//                       </label>
//                       <input
//                         type="text"
//                         name="era"
//                         value={formData.era}
//                         onChange={handleInputChange}
//                         placeholder="Enter story era"
//                         className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors text-lg"
//                       />
//                     </div>

//                     {/* Description Input */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                         Description
//                       </label>
//                       <textarea
//                         name="poeticTeaser"
//                         value={formData.poeticTeaser}
//                         onChange={handleInputChange}
//                         placeholder="Enter story description"
//                         rows={4}
//                         className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors resize-none text-lg"
//                         required
//                       />
//                     </div>

//                     {/* Mood Selection */}
//                     <div className="mt-6">
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
//                         Story Mood
//                       </label>
//                       <div className="grid grid-cols-3 gap-3">
//                         {moods.map((mood) => (
//                           <button
//                             key={mood.name}
//                             type="button"
//                             onClick={() => setFormData(prev => ({ ...prev, mood: mood.name }))}
//                             className={`p-4 rounded-lg border-2 transition-colors ${
//                               formData.mood === mood.name
//                                 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
//                                 : 'border-gray-300 dark:border-gray-600'
//                             }`}
//                           >
//                             <span className="text-2xl block mb-2">{mood.emoji}</span>
//                             <p className="text-sm font-medium">{mood.name}</p>
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Create Button */}
//                   <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//                     <button
//                       onClick={handleSubmit}
//                       disabled={uploading || !formData.title || !formData.poeticTeaser}
//                       className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
//                     >
//                       {uploading ? 'Creating...' : 'Create Story'}
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default CreateStoryModal;




// src/components/CreateStoryModal.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image, Video, Music, Play, Pause, Sparkles, Palette, Type, Mic } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { 
  uploadFileWithProgress, 
  compressFile, 
  validateFile,
  getFilePreview,
  getVideoThumbnail,
  MAX_FILE_SIZE
} from '../utils/fileUpload';
import { MusicSelector } from './MusicSelector';

const CreateStoryModal = ({ isOpen, onClose, onCreateStory }) => {
  const [formData, setFormData] = useState({
    title: '',
    era: '',
    poeticTeaser: '',
    coverImage: null,
    coverImageFileId: null,
    mediaUrl: null,
    mediaType: null,
    backgroundMusic: null,
    musicTitle: '',
    colorTheme: 'from-purple-500 to-pink-500'
  });
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const fileInputRef = useRef(null);

  const { user } = useAuth();

  const colorThemes = [
    { name: 'Sunset', class: 'from-orange-400 to-pink-600', bg: 'bg-gradient-to-br from-orange-400 to-pink-600' },
    { name: 'Ocean', class: 'from-cyan-400 to-blue-600', bg: 'bg-gradient-to-br from-cyan-400 to-blue-600' },
    { name: 'Forest', class: 'from-emerald-400 to-green-600', bg: 'bg-gradient-to-br from-emerald-400 to-green-600' },
    { name: 'Royal', class: 'from-purple-500 to-indigo-600', bg: 'bg-gradient-to-br from-purple-500 to-indigo-600' },
    { name: 'Sunrise', class: 'from-amber-400 to-red-500', bg: 'bg-gradient-to-br from-amber-400 to-red-500' },
    { name: 'Twilight', class: 'from-violet-500 to-purple-900', bg: 'bg-gradient-to-br from-violet-500 to-purple-900' }
  ];

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.isValid) {
      alert(validation.errors[0]);
      return;
    }

    const preview = await getFilePreview(file);
    setPreviewUrl(preview);

    try {
      setUploading(true);
      const compressedFile = await compressFile(file);
      const uploadResult = await uploadFileWithProgress(compressedFile);
      
      let thumbnailUrl = null;
      if (file.type.startsWith('video/')) {
        const thumbnail = await getVideoThumbnail(file);
        const thumbResult = await uploadFileWithProgress(thumbnail);
        thumbnailUrl = thumbResult.url;
      }

      setFormData(prev => ({
        ...prev,
        mediaUrl: uploadResult.url,
        coverImage: thumbnailUrl || uploadResult.url,
        coverImageFileId: uploadResult.fileId,
        mediaType: uploadResult.mediaType
      }));

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleMusicSelect = (track) => {
    setSelectedTrack(track);
    setFormData(prev => ({
      ...prev,
      backgroundMusic: track.preview,
      musicTitle: `${track.title} - ${track.artist}`
    }));
    
    if (playingAudio) {
      playingAudio.pause();
      setPlayingAudio(null);
    }
  };

  const removeMusic = () => {
    setSelectedTrack(null);
    setFormData(prev => ({
      ...prev,
      backgroundMusic: null,
      musicTitle: ''
    }));
    if (playingAudio) {
      playingAudio.pause();
      setPlayingAudio(null);
    }
  };

  const nextStep = () => {
    if (!formData.coverImage) {
      alert('Please add media to continue');
      return;
    }
    setCurrentStep(2);
  };

  const prevStep = () => setCurrentStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to create a story');
      return;
    }
    if (!formData.title || !formData.poeticTeaser || !formData.coverImage) {
      alert('Please fill all required fields');
      return;
    }

    try {
      await onCreateStory({
        title: formData.title,
        era: formData.era,
        poeticTeaser: formData.poeticTeaser,
        coverImage: formData.coverImage,
        coverImageFileId: formData.coverImageFileId,
        mediaUrl: formData.mediaUrl,
        mediaType: formData.mediaType,
        backgroundMusic: formData.backgroundMusic,
        musicTitle: formData.musicTitle,
        colorTheme: formData.colorTheme,
        likes: 0,
        isLiked: false
      });
      
      // Reset form
      setFormData({
        title: '',
        era: '',
        poeticTeaser: '',
        coverImage: null,
        coverImageFileId: null,
        mediaUrl: null,
        mediaType: null,
        backgroundMusic: null,
        musicTitle: '',
        colorTheme: 'from-purple-500 to-pink-500'
      });
      setPreviewUrl('');
      setCurrentStep(1);
      setSelectedTrack(null);
      if (playingAudio) {
        playingAudio.pause();
        setPlayingAudio(null);
      }
      onClose();
    } catch (error) {
      console.error('Create story failed:', error);
      alert('Failed to create story');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="flex bg-white dark:bg-gray-900 rounded-md w-full max-w-7xl mx-1 h-[90vh] shadow-2xl overflow-hidden border border-white/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Desktop: All in one layout */}
          <div className="hidden lg:flex w-full">
            {/* Left Side - Premium Media Area */}
            <div className="w-1/2 relative overflow-auto">
              <div className={`absolute inset-0 ${formData.colorTheme.split(' ')[0]} ${formData.colorTheme.split(' ')[1]} opacity-10`} />
              
              <div className="relative h-full p-8 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Create Story
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 hover:scale-110"
                  >
                    <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Premium Upload Area */}
                <div className="flex-1 flex flex-col">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  {previewUrl ? (
                    <div className="relative flex-1 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                      {formData.mediaType === 'video' ? (
                        <video
                          src={previewUrl}
                          className="w-full h-full object-cover"
                          controls
                          muted
                          autoPlay
                        />
                      ) : (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-black/70 transition-all duration-200 hover:scale-105"
                      >
                        <Upload className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex-1 rounded-2xl border-3 border-dashed border-gray-300/50 dark:border-gray-600/50 flex flex-col items-center justify-center hover:border-purple-400/50 dark:hover:border-purple-400/50 transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-gray-100/30 dark:from-gray-800/50 dark:to-gray-900/30 backdrop-blur-sm group"
                    >
                      {uploading ? (
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
                          <p className="text-gray-600 dark:text-gray-400 font-medium">Uploading...</p>
                        </div>
                      ) : (
                        <>
                          <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Upload className="w-12 h-12 text-white" />
                          </div>
                          <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                            Add Your Media
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-center max-w-xs">
                            Upload a stunning image or captivating video to bring your story to life
                          </p>
                          <div className="flex gap-4 mt-6">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <Image className="w-4 h-4" />
                              Image
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <Video className="w-4 h-4" />
                              Video
                            </div>
                          </div>
                        </>
                      )}
                    </button>
                  )}

                  {/* Music & Theme Selection */}
                  <div className="mt-6 space-y-4">
                    {/* Music Selector */}
                    <MusicSelector
                      selectedTrack={selectedTrack}
                      onTrackSelect={handleMusicSelect}
                      onRemoveTrack={removeMusic}
                      playingAudio={playingAudio}
                      setPlayingAudio={setPlayingAudio}
                    />

                    {/* Color Theme Selection */}
                    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        <Palette className="w-4 h-4" />
                        Story Theme
                      </label>
                      <div className="grid grid-cols-6 gap-2">
                        {colorThemes.map((theme) => (
                          <button
                            key={theme.name}
                            onClick={() => setFormData(prev => ({ ...prev, colorTheme: theme.class }))}
                            className={`w-8 h-8 rounded-full ${theme.bg} border-2 transition-all duration-200 ${
                              formData.colorTheme === theme.class 
                                ? 'border-white shadow-lg scale-110 ring-2 ring-offset-2 ring-purple-500' 
                                : 'border-transparent hover:scale-105'
                            }`}
                            title={theme.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Story Details */}
            <div className="w-1/2 border-l border-gray-200/50 dark:border-gray-700/50">
              <div className="h-full p-8 flex flex-col">
                <div className="flex-1 space-y-8">
                  {/* Title Input */}
                  <div>
                    <label className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                      <Type className="w-5 h-5 text-purple-500" />
                      Story Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Craft a captivating title..."
                      className="w-full px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white text-lg font-medium outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 backdrop-blur-sm"
                      required
                    />
                  </div>

                  {/* Era Input */}
                  <div>
                    <label className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      Era or Time Period
                    </label>
                    <input
                      type="text"
                      name="era"
                      value={formData.era}
                      onChange={handleInputChange}
                      placeholder="Medieval, Future, Present Day..."
                      className="w-full px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white text-lg font-medium outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 backdrop-blur-sm"
                    />
                  </div>

                  {/* Description Input */}
                  <div className="flex-1">
                    <label className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                      <Mic className="w-5 h-5 text-blue-500" />
                      Your Story *
                    </label>
                    <textarea
                      name="poeticTeaser"
                      value={formData.poeticTeaser}
                      onChange={handleInputChange}
                      placeholder="Weave your narrative... Share your emotions, dreams, or adventures in your own unique voice. Let every word paint a picture and every sentence build a world..."
                      rows={8}
                      className="w-full h-full px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white text-lg font-medium outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none backdrop-blur-sm leading-relaxed"
                      required
                    />
                  </div>
                </div>

                {/* Create Button */}
                <button
                  onClick={handleSubmit}
                  disabled={uploading || !formData.title || !formData.poeticTeaser || !formData.coverImage}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mt-8"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      Crafting Your Story...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Create Magical Story
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden w-full h-full flex flex-col pb-4">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {currentStep === 1 ? 'Add Media' : 'Story Details'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {currentStep === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full p-6 space-y-6"
                  >
                    {/* Media Upload */}
                    <div className="flex-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      
                      {previewUrl ? (
                        <div className="relative h-auto rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
                          {formData.mediaType === 'video' ? (
                            <video
                              src={previewUrl}
                              className="w-full h-full object-cover"
                              controls
                              muted
                            />
                          ) : (
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          )}
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-lg"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="w-full h-96 rounded-2xl border-3 border-dashed border-gray-300/50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
                        >
                          {uploading ? (
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                          ) : (
                            <>
                              <Upload className="w-16 h-16 text-gray-400 mb-4" />
                              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                Tap to Upload
                              </p>
                              <p className="text-gray-500 text-sm mt-2">
                                Image or Video • Max {MAX_FILE_SIZE / 1024 / 1024}MB
                              </p>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Music Selector for Mobile */}
                    <MusicSelector
                      selectedTrack={selectedTrack}
                      onTrackSelect={handleMusicSelect}
                      onRemoveTrack={removeMusic}
                      playingAudio={playingAudio}
                      setPlayingAudio={setPlayingAudio}
                      mobile
                    />

                    {/* Continue Button */}
                    {formData.coverImage && (
                      <button
                        onClick={nextStep}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold"
                      >
                        Continue to Story
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full p-6 space-y-6"
                  >
                    {/* Mobile form inputs similar to desktop but stacked */}
                    {/* ... */}
                    <div className="flex-1 p-4 space-y-6">
                    {/* Title Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter story title"
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors text-lg"
                        required
                      />
                    </div>

                    {/* Era Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Era
                      </label>
                      <input
                        type="text"
                        name="era"
                        value={formData.era}
                        onChange={handleInputChange}
                        placeholder="Enter story era"
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors text-lg"
                      />
                    </div>

                    {/* Description Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Description
                      </label>
                      <textarea
                        name="poeticTeaser"
                        value={formData.poeticTeaser}
                        onChange={handleInputChange}
                        placeholder="Enter story description"
                        rows={4}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors resize-none text-lg"
                        required
                      />
                    </div>

                    {/* Mood Selection */}
                    {/* <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Story Mood
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {moods.map((mood) => (
                          <button
                            key={mood.name}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, mood: mood.name }))}
                            className={`p-4 rounded-lg border-2 transition-colors ${
                              formData.mood === mood.name
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            <span className="text-2xl block mb-2">{mood.emoji}</span>
                            <p className="text-sm font-medium">{mood.name}</p>
                          </button>
                        ))}
                      </div>
                    </div> */}
                  </div>

                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleSubmit}
                      disabled={uploading || !formData.title || !formData.poeticTeaser}
                      className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
                    >
                      {uploading ? 'Creating...' : 'Create Story'}
                    </button>
                  </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateStoryModal;