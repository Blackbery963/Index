// // // src/components/CreateStoryModal.jsx
// // import React, { useState } from 'react';
// // import { XMarkIcon, PhotoIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

// // const CreateStoryModal = ({ isOpen, onClose, onCreateStory, onUploadFile }) => {
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     era: '',
// //     poeticTeaser: '',
// //     coverImage: null
// //   });
// //   const [uploading, setUploading] = useState(false);
// //   const [previewUrl, setPreviewUrl] = useState('');

// //   const handleInputChange = (e) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [e.target.name]: e.target.value
// //     }));
// //   };

// //   const handleFileChange = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     // Create preview
// //     const url = URL.createObjectURL(file);
// //     setPreviewUrl(url);

// //     try {
// //       setUploading(true);
// //       const uploadResult = await onUploadFile(file);
// //       setFormData(prev => ({
// //         ...prev,
// //         coverImage: uploadResult.url,
// //         coverImageFileId: uploadResult.fileId
// //       }));
// //     } catch (error) {
// //       console.error('Upload failed:', error);
// //       alert('Failed to upload image');
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!formData.title || !formData.poeticTeaser || !formData.coverImage) {
// //       alert('Please fill all required fields');
// //       return;
// //     }

// //     try {
// //       await onCreateStory({
// //         ...formData,
// //         author: 'You', // In real app, get from auth
// //         avatar: 'https://i.pravatar.cc/150?u=you',
// //         likes: 0,
// //         isLiked: false
// //       });
      
// //       // Reset form
// //       setFormData({
// //         title: '',
// //         era: '',
// //         poeticTeaser: '',
// //         coverImage: null
// //       });
// //       setPreviewUrl('');
// //       onClose();
// //     } catch (error) {
// //       console.error('Create story failed:', error);
// //       alert('Failed to create story');
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div 
// //       className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
// //       onClick={onClose}
// //     >
// //       <div 
// //         className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full shadow-2xl transform scale-100 opacity-100 transition-all duration-300 max-h-[90vh] overflow-y-auto"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         <div className="flex items-start justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
// //           <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Create New Story</h2>
// //           <button
// //             onClick={onClose}
// //             className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-110"
// //           >
// //             <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-300" />
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
// //           {/* File Upload */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //               Cover Image *
// //             </label>
// //             <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 text-center hover:border-indigo-400 transition-colors">
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleFileChange}
// //                 className="hidden"
// //                 id="cover-upload"
// //                 disabled={uploading}
// //               />
// //               <label htmlFor="cover-upload" className="cursor-pointer">
// //                 {previewUrl ? (
// //                   <div className="relative">
// //                     <img src={previewUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
// //                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
// //                       <CloudArrowUpIcon className="w-8 h-8 text-white" />
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div className="py-8">
// //                     <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
// //                     <p className="text-sm text-gray-500">
// //                       {uploading ? 'Uploading...' : 'Click to upload cover image'}
// //                     </p>
// //                   </div>
// //                 )}
// //               </label>
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //               Story Title *
// //             </label>
// //             <input
// //               type="text"
// //               name="title"
// //               value={formData.title}
// //               onChange={handleInputChange}
// //               placeholder="Enter your story title"
// //               className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-colors"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //               Era
// //             </label>
// //             <input
// //               type="text"
// //               name="era"
// //               value={formData.era}
// //               onChange={handleInputChange}
// //               placeholder="e.g., Modern Fantasy, Ancient Myth"
// //               className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-colors"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //               Poetic Description *
// //             </label>
// //             <textarea
// //               name="poeticTeaser"
// //               value={formData.poeticTeaser}
// //               onChange={handleInputChange}
// //               placeholder="Weave your story's essence in poetic words..."
// //               rows={3}
// //               className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-colors resize-none"
// //               required
// //             />
// //           </div>

// //           <div className="flex justify-end gap-3 pt-4">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 text-sm sm:text-base"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={uploading || !formData.coverImage}
// //               className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 transform disabled:scale-100 text-sm sm:text-base"
// //             >
// //               {uploading ? 'Creating...' : 'Create Story'}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateStoryModal;

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image, ChevronLeft } from 'lucide-react';

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
    if (!formData.title || !formData.poeticTeaser || !formData.coverImage) {
      alert('Please fill all required fields');
      return;
    }

    try {
      await onCreateStory({
        ...formData,
        author: 'You',
        avatar: 'https://i.pravatar.cc/150?u=you',
        likes: 0,
        isLiked: false,
        colorTheme: 'from-blue-500 to-purple-600'
      });
      
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