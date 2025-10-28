// import React, { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Upload, Image, ChevronLeft } from 'lucide-react';

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
//     if (!formData.title || !formData.poeticTeaser || !formData.coverImage) {
//       alert('Please fill all required fields');
//       return;
//     }

//     try {
//       await onCreateStory({
//         ...formData,
//         author: 'You',
//         avatar: 'https://i.pravatar.cc/150?u=you',
//         likes: 0,
//         isLiked: false,
//         colorTheme: 'from-blue-500 to-purple-600'
//       });
      
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


// src/components/CreateStoryModal.jsx (improved: remove author/avatar from storyData, consistent with db design)
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image, ChevronLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const CreateStoryModal = ({ isOpen, onClose, onCreateStory, onUploadFile }) => {
  const [formData, setFormData] = useState({
    title: '',
    era: '',
    poeticTeaser: '',
    coverImage: null,
    mood: ''
  });
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef(null);

  const { user } = useAuth(); // Get current user

  const moods = [
    { name: 'Mystical', emoji: '✨' },
    { name: 'Romantic', emoji: '💕' },
    { name: 'Adventure', emoji: '🗺️' },
    { name: 'Mystery', emoji: '🔮' },
    { name: 'Fantasy', emoji: '🦄' },
    { name: 'Historical', emoji: '📜' }
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
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    try {
      setUploading(true);
      const uploadResult = await onUploadFile(file);
      setFormData(prev => ({
        ...prev,
        coverImage: uploadResult.url,
        coverImageFileId: uploadResult.fileId
      }));
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const nextStep = () => {
    if (!formData.coverImage) {
      alert('Please add a cover image first');
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
        ...formData,
        likes: 0,
        isLiked: false,
        colorTheme: 'from-blue-500 to-purple-600'
      }); // Removed author and avatar; handled via userId and enrichment
      
      setFormData({
        title: '',
        era: '',
        poeticTeaser: '',
        coverImage: null,
        mood: ''
      });
      setPreviewUrl('');
      setCurrentStep(1);
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        onClick={onClose}
      >
        {/* Desktop Layout */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="hidden lg:flex bg-white dark:bg-gray-900 rounded-2xl w-full max-w-7xl max-h-[90vh] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Side - Image Upload */}
          <div className="w-4/6 p-6 border-r border-gray-200 dark:border-gray-700">
            <div className="h-full">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {previewUrl ? (
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-black">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                >
                  <Image className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    Upload cover image
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Click to upload
                  </p>
                </button>
              )}
            </div>
          </div>

          {/* Right Side - Form Inputs */}
          <div className="w-1/2 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create Story
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Title Input */}
                <div>
                  <label className="block text-xl font-bold font-Quicksand text-gray-700 dark:text-gray-300 mb-3">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter story title"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                {/* Era Input */}
                <div>
                  <label className="block text-xl font-bold font-Quicksand text-gray-700 dark:text-gray-300 mb-3">
                    Era
                  </label>
                  <input
                    type="text"
                    name="era"
                    value={formData.era}
                    onChange={handleInputChange}
                    placeholder="Enter story era"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-xl font-bold font-Quicksand text-gray-700 dark:text-gray-300 mb-3">
                    Description
                  </label>
                  <textarea
                    name="poeticTeaser"
                    value={formData.poeticTeaser}
                    onChange={handleInputChange}
                    placeholder="Enter story description"
                    rows={4}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors resize-none"
                    required
                  />
                </div>
              </div>

              {/* Mood Selection */}
              <div className="mt-8">
                <label className="block text-xl font-bold font-Quicksand text-gray-700 dark:text-gray-300 mb-4">
                  Story Mood
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {moods.map((mood) => (
                    <button
                      key={mood.name}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, mood: mood.name }))}
                      className={`p-4 rounded-lg border-2 transition-colors  ${
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
              </div>
            </div>

            {/* Desktop Create Button */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSubmit}
                disabled={uploading || !formData.coverImage || !formData.title || !formData.poeticTeaser}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                {uploading ? 'Creating Story...' : 'Create Story'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Layout - Full Screen */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="lg:hidden w-full h-full bg-white dark:bg-gray-900 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {currentStep === 2 && (
                <button
                  onClick={prevStep}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentStep === 1 ? 'Add Cover Image' : 'Story Details'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {currentStep === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full flex flex-col"
                >
                  {/* Image Upload */}
                  <div className="flex-1 p-4 flex items-center justify-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    
                    {previewUrl ? (
                      <div className="relative w-full aspect-auto h-auto rounded-lg overflow-hidden bg-black">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70"
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-80 aspect-auto rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                      >
                        <Image className="w-16 h-16 text-gray-400 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                          Upload cover image
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          Tap to upload
                        </p>
                      </button>
                    )}
                  </div>

                  {/* Continue Button */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={nextStep}
                      disabled={!formData.coverImage}
                      className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col"
                >
                  {/* Form Inputs */}
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
                    <div className="mt-6">
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
                    </div>
                  </div>

                  {/* Create Button */}
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateStoryModal;