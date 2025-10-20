// import React, { useState, useEffect } from 'react';
// import { IoCloudUploadOutline } from 'react-icons/io5';
// import { artCategories, acceptedFileTypes, maxFileSize } from './constants';
// import { FaPlay } from 'react-icons/fa6';
// import { toast } from 'react-toastify'; // Assuming toast is imported here or globally available

// const UploadEntry = ({ index, entry, updateEntry, removeEntry, handleFileChange, handleEntryUpload, uploading }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [platformFee, setPlatformFee] = useState(0);
//   const [finalPrice, setFinalPrice] = useState(0);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [fileType, setFileType] = useState(''); // 'image' or 'video'
  
//   useEffect(() => {
//     if (entry.file) {
//       const type = entry.file.type.startsWith('video/') ? 'video' : 'image';
//       setFileType(type);
//     }
//   }, [entry.file]);

//   useEffect(() => {
//     if (entry.price) {
//       const price = parseFloat(entry.price);
//       let feePercentage = 0;
      
//       if (price <= 1000) {
//         feePercentage = 10;
//       } else if (price <= 5000) {
//         feePercentage = 8;
//       } else {
//         feePercentage = 6;
//       }
      
//       const fee = (price * feePercentage) / 100;
//       setPlatformFee(fee);
//       setFinalPrice(price - fee);
//     } else {
//       setPlatformFee(0);
//       setFinalPrice(0);
//     }
//   }, [entry.price]);

//   const nextStep = () => {
//     if (currentStep === 1 && (!entry.file || !entry.title)) {
//       toast.error('Please upload an image/video and provide a title');
//       return;
//     }
//     if (currentStep === 2 && (!entry.tag || !entry.medium)) {
//       toast.error('Please select a category tag and art/craft type');
//       return;
//     }
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleFileSelection = (files) => {
//     if (!files || files.length === 0) return;
//     const file = files[0];
    
//     // Check if file type is accepted
//     const isImage = acceptedFileTypes.images.includes(file.type);
//     const isVideo = acceptedFileTypes.videos.includes(file.type);
    
//     if (!isImage && !isVideo) {
//       toast.error('Please upload a valid image (JPEG, PNG, WEBP) or video (MP4, WebM, MOV)');
//       return;
//     }

//     if (file.size > maxFileSize) {
//       toast.error('File size exceeds 10MB limit');
//       return;
//     }

//     // Update via parent callback instead of local state
//     updateEntry(index, 'file', file);
//   };

//   const renderFilePreview = () => {
//     if (!entry.file) {
//       return (
//         <>
//           <IoCloudUploadOutline className="mx-auto h-12 w-12 text-teal-500 dark:text-teal-400" />
//           <p className="mt-2 text-gray-600 dark:text-gray-400 font-Playfair">
//             Drag & drop your image/video or{' '}
//             <span className="text-teal-600 dark:text-teal-400 font-semibold">browse</span>
//           </p>
//           <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-wrap">
//             Supports JPG, PNG, WEBP, MP4, WebM, MOV (Max 10MB)
//           </p>
//         </>
//       );
//     }

//     if (fileType === 'video') {
//       return (
//         <div className="flex flex-col items-center">
//           <video className="h-32 object-contain mb-2 rounded-lg" controls>
//             <source src={URL.createObjectURL(entry.file)} type={entry.file.type} />
//             Your browser does not support the video tag.
//           </video>
//           <p className="text-gray-700 dark:text-gray-300 font-medium truncate max-w-xs">
//             {entry.file.name}
//           </p>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//             {(entry.file.size / 1024 / 1024).toFixed(2)} MB
//           </p>
//         </div>
//       );
//     } else {
//       return (
//         <div className="flex flex-col items-center">
//           <img
//             src={URL.createObjectURL(entry.file)}
//             alt="Preview"
//             className="h-32 object-contain mb-2 rounded-lg"
//           />
//           <p className="text-gray-700 dark:text-gray-300 font-medium truncate max-w-xs">
//             {entry.file.name}
//           </p>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//             {(entry.file.size / 1024 / 1024).toFixed(2)} MB
//           </p>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800/90 p-6 rounded-xl shadow-lg mb-6 border border-gray-100 dark:border-gray-700 transform hover:scale-100 transition-transform duration-300 font-Playfair">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//           Upload Your Creation
//         </h3>
//       </div>
      
//       {/* Step indicator */}
//       <div className="flex justify-between mb-8 relative">
//         {[1, 2, 3, 4].map((step) => (
//           <div key={step} className="flex flex-col items-center z-10">
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-teal-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'} font-semibold`}>
//               {step}
//             </div>
//             <span className={`text-xs mt-2 ${currentStep >= step ? 'text-teal-600 dark:text-teal-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
//               {step === 1 ? 'Basic Info' : step === 2 ? 'Categories' : step === 3 ? 'Details' : 'Preview'}
//             </span>
//           </div>
//         ))}
//         <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 dark:bg-gray-700">
//           <div 
//             className="h-1 bg-teal-600 transition-all duration-300" 
//             style={{ width: `${(currentStep - 1) * 33.33}%` }}
//           ></div>
//         </div>
//       </div>

//       {/* Step 1: Basic Info */}
//       {currentStep === 1 && (
//         <div className="space-y-4">
//           <div>
//             <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//               Upload Your Creation *
//             </label>
//             <div
//               className={`border-2 border-dashed ${isDragging ? 'border-teal-500 bg-teal-50 dark:border-teal-400 dark:bg-teal-900' : 'border-teal-300 dark:border-teal-600'} rounded-xl p-6 text-center cursor-pointer transition-all bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 hover:bg-gradient-to-tl hover:from-teal-50 hover:to-gray-50 dark:hover:from-teal-900 dark:hover:to-gray-700`}
//               onDragOver={(e) => {
//                 e.preventDefault();
//                 setIsDragging(true);
//               }}
//               onDragLeave={(e) => {
//                 e.preventDefault();
//                 setIsDragging(false);
//               }}
//               onDrop={(e) => {
//                 e.preventDefault();
//                 setIsDragging(false);
//                 handleFileSelection(e.dataTransfer.files);
//               }}
//               onClick={() => document.getElementById(`fileInput-${index}`).click()}
//             >
//               {renderFilePreview()}
//               <input
//                 type="file"
//                 id={`fileInput-${index}`}
//                 className="hidden"
//                 accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
//                 onChange={(e) => handleFileSelection(e.target.files)}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//               Title *
//             </label>
//             <input
//               type="text"
//               placeholder="Give your creation a name"
//               value={entry.title}
//               onChange={(e) => updateEntry(index, 'title', e.target.value)}
//               className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//               Description
//             </label>
//             <textarea
//               placeholder="Tell us about your creation, inspiration, or process"
//               value={entry.description}
//               onChange={(e) => updateEntry(index, 'description', e.target.value)}
//               className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
//               rows="3"
//             />
//           </div>

//           <div className="flex justify-end">
//             <button
//               onClick={nextStep}
//               className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg transition-all duration-300"
//             >
//               Next: Categories
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Step 2: Categories */}
//       {currentStep === 2 && (
//         <div className="space-y-4">
//           {/* Category Tag */}
//           <div>
//             <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//               Category Tag *
//             </label>
//             <select
//               value={entry.tag}
//               onChange={(e) => updateEntry(index, 'tag', e.target.value)}
//               className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//               required
//             >
//               <option value="">Choose a Category Tag</option>
//               <optgroup label="Artistic Styles">
//                 {artCategories.showcase.tags.map((tag) => (
//                   <option key={tag} value={tag}>
//                     {tag}
//                   </option>
//                 ))}
//               </optgroup>
//               <optgroup label="Crafts & Creation">
//                 {artCategories.commercial.tags.map((tag) => (
//                   <option key={tag} value={tag}>
//                     {tag}
//                   </option>
//                 ))}
//               </optgroup>
//             </select>
//           </div>

//           {/* Art/Craft Type */}
//           <div>
//             <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//               Art/Craft Type *
//             </label>
//             <select
//               value={entry.medium}
//               onChange={(e) => updateEntry(index, 'medium', e.target.value)}
//               className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//               required
//             >
//               <option value="">Choose Art/Craft Type</option>
//               <optgroup label="Artistic Styles">
//                 {artCategories.showcase.types.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </optgroup>
//               <optgroup label="Crafts & Creation">
//                 {artCategories.commercial.types.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </optgroup>
//             </select>
//           </div>

//           <div className="flex justify-between">
//             <button
//               onClick={prevStep}
//               className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white py-2 px-6 rounded-lg transition-all duration-300"
//             >
//               Back
//             </button>
//             <button
//               onClick={nextStep}
//               className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg transition-all duration-300"
//             >
//               Next: Details
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Step 3: Details */}
//       {currentStep === 3 && (
//         <div className="space-y-4">
//           <div>
//             <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//               Awards & Recognition (Optional)
//             </label>
//             <input
//               type="text"
//               placeholder="List any awards or recognition received"
//               value={entry.awards}
//               onChange={(e) => updateEntry(index, 'awards', e.target.value)}
//               className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
//             />
//           </div>

//           <div>
//             <label className="text-base font-semibold text-teal-700 dark:text-teal-400 mb-1 block font-Playfair">
//               Price (in INR) - Optional
//             </label>
//             <input
//               type="number"
//               placeholder="Set price if selling"
//               value={entry.price}
//               onChange={(e) => updateEntry(index, 'price', e.target.value)}
//               className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
//               min="0"
//               step="0.01"
//             />
            
//             {entry.price && (
//               <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600 dark:text-gray-300">Platform Fee:</span>
//                   <span className="font-semibold">
//                     {platformFee.toFixed(2)} INR ({ 
//                       parseFloat(entry.price) <= 1000 ? '10%' : 
//                       parseFloat(entry.price) <= 5000 ? '8%' : '6%'
//                     })
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm mt-1">
//                   <span className="text-gray-600 dark:text-gray-300">You Receive:</span>
//                   <span className="font-semibold text-teal-600 dark:text-teal-400">
//                     {finalPrice.toFixed(2)} INR
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex justify-between">
//             <button
//               onClick={prevStep}
//               className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white py-2 px-6 rounded-lg transition-all duration-300"
//             >
//               Back
//             </button>
//             <button
//               onClick={nextStep}
//               className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg transition-all duration-300"
//             >
//               Next: Preview
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Step 4: Preview */}
//       {currentStep === 4 && (
//         <div className="space-y-6">
//           <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-400 border-b pb-2">
//             Preview Your Creation
//           </h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
//                 {fileType === 'video' ? 'Video Preview' : 'Image Preview'}
//               </h4>
//               {entry.file && (
//                 <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex justify-center">
//                   {fileType === 'video' ? (
//                     <video className="max-h-64 object-contain rounded-lg" controls>
//                       <source src={URL.createObjectURL(entry.file)} type={entry.file.type} />
//                       Your browser does not support the video tag.
//                     </video>
//                   ) : (
//                     <img
//                       src={URL.createObjectURL(entry.file)}
//                       alt="Preview"
//                       className="max-h-64 object-contain rounded-lg"
//                     />
//                   )}
//                 </div>
//               )}
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Details</h4>
//                 <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
//                   <div className="space-y-3">
//                     <div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Title</p>
//                       <p className="font-medium">{entry.title || 'Not provided'}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
//                       <p className="font-medium">{entry.description || 'Not provided'}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Category Tag</p>
//                       <p className="font-medium">{entry.tag || 'Not provided'}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Art/Craft Type</p>
//                       <p className="font-medium">{entry.medium || 'Not provided'}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Awards & Recognition</p>
//                       <p className="font-medium">{entry.awards || 'Not provided'}</p>
//                     </div>
//                     {entry.price && (
//                       <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Pricing</p>
//                         <p className="font-medium">₹{entry.price}</p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                           Platform fee: ₹{platformFee.toFixed(2)} ({parseFloat(entry.price) <= 1000 ? '10%' : parseFloat(entry.price) <= 5000 ? '8%' : '6%'})
//                         </p>
//                         <p className="text-xs text-teal-600 dark:text-teal-400">
//                           You receive: ₹{finalPrice.toFixed(2)}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-between pt-4">
//             <button
//               onClick={prevStep}
//               className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white py-2 px-6 rounded-lg transition-all duration-300"
//             >
//               Back to Edit
//             </button>
//             <button
//               className={`w-full md:w-auto bg-gradient-to-r from-teal-600 to-teal-300 dark:from-teal-500 dark:to-teal-700 text-white py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 font-Playfair ${uploading ? 'opacity-70 cursor-not-allowed' : 'hover:from-teal-700 hover:to-teal-400 dark:hover:from-teal-600 dark:hover:to-teal-800'}`}
//               onClick={() => handleEntryUpload(index)}
//               disabled={uploading}
//             >
//               {uploading ? (
//                 <span className="flex items-center justify-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Uploading...
//                 </span>
//               ) : entry.price ? (
//                 'List for Sale'
//               ) : (
//                 'Share Your Creation'
//               )}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadEntry;


// import React, { useState, useRef } from 'react';
// import { toast } from 'react-toastify';
// import { 
//   IoCloudUploadOutline, 
//   IoImage, 
//   IoVideocam,
//   IoPricetag,
//   IoSparkles,
//   IoChevronForward,
//   IoChevronBack,
//   IoCheckmarkCircle
// } from 'react-icons/io5';
// import { artCategories } from './constants';

// const UploadEntry = ({ index, entry, updateEntry, handleFileChange, handleEntryUpload, uploading }) => {
//   const [currentStep, setCurrentStep] = useState(1); // 1: Type, 2: File, 3: Details, 4: Review
//   const [uploadType, setUploadType] = useState('normal'); // 'normal', 'sell', 'video'
//   const [customTag, setCustomTag] = useState('');
//   const [specialReason, setSpecialReason] = useState('');
//   const fileInputRef = useRef(null);

//   const artCategories = [
//     'Painting', 'Drawing', 'Sculpture', 'Photography', 'Digital Art',
//     'Pottery', 'Textile', 'Jewelry', 'Woodwork', 'Mixed Media'
//   ];

//   const steps = [
//     { number: 1, title: 'Type', description: 'Choose content type' },
//     { number: 2, title: 'Upload', description: 'Add your file' },
//     { number: 3, title: 'Details', description: 'Add information' },
//     { number: 4, title: 'Review', description: 'Confirm & share' }
//   ];

//   const handleFileSelect = () => {
//     fileInputRef.current?.click();
//   };

//   const handleTypeSelect = (type) => {
//     setUploadType(type);
//     // Reset special fields when type changes
//     if (type === 'video') {
//       updateEntry(index, 'awards', []);
//       setSpecialReason('');
//     }
//     goToNextStep();
//   };

//   const goToNextStep = () => {
//     if (currentStep < 4) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const goToPrevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const addCustomTag = () => {
//     if (customTag.trim() && !entry.tag?.includes(customTag.trim())) {
//       const currentTags = entry.tag ? entry.tag.split(',').filter(t => t.trim()) : [];
//       const newTags = [...currentTags, customTag.trim().toLowerCase()].slice(0, 5);
//       updateEntry(index, 'tag', newTags.join(', '));
//       setCustomTag('');
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     const currentTags = entry.tag ? entry.tag.split(',').filter(t => t.trim()) : [];
//     const newTags = currentTags.filter(tag => tag !== tagToRemove);
//     updateEntry(index, 'tag', newTags.join(', '));
//   };

//   const handleSpecialToggle = (specialType) => {
//     const awards = entry.awards || [];
//     const newAwards = awards.includes(specialType) 
//       ? awards.filter(a => a !== specialType)
//       : [...awards, specialType];
//     updateEntry(index, 'awards', newAwards);
    
//     // Clear reason when unselecting
//     if (awards.includes(specialType)) {
//       setSpecialReason('');
//     }
//   };

//   // Step 1: Type Selection
//   const renderTypeStep = () => (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">What are you sharing?</h3>
//         <p className="text-gray-600 dark:text-gray-400">Choose how you want to share your creation</p>
//       </div>

//       {/* <div className="grid grid-cols-1 gap-3">
//         <button
//           onClick={() => handleTypeSelect('normal')}
//           className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-400 dark:hover:border-teal-500 transition-all"
//         >
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
//               <IoImage className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//             </div>
//             <div>
//               <div className="font-semibold text-gray-800 dark:text-white">Share with Community</div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">Showcase your artwork to the community</div>
//             </div>
//           </div>
//         </button>

//         <button
//           onClick={() => handleTypeSelect('sell')}
//           className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-400 dark:hover:border-teal-500 transition-all"
//         >
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
//               <IoPricetag className="w-5 h-5 text-green-600 dark:text-green-400" />
//             </div>
//             <div>
//               <div className="font-semibold text-gray-800 dark:text-white">Sell Your Art</div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">List your artwork for sale</div>
//             </div>
//           </div>
//         </button>

//         <button
//           onClick={() => handleTypeSelect('video')}
//           className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-400 dark:hover:border-teal-500 transition-all"
//         >
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
//               <IoVideocam className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//             </div>
//             <div>
//               <div className="font-semibold text-gray-800 dark:text-white">Share Video</div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">Upload video content</div>
//             </div>
//           </div>
//         </button>
//       </div>
//     </div> */}

//     <div className="grid grid-cols-1 gap-3">
//   <button
//     onClick={() => handleTypeSelect('normal')}
//     className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-400 dark:hover:border-teal-500 transition-all"
//   >
//     <div className="flex items-center gap-3">
//       <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
//         <IoImage className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//       </div>
//       <div>
//         <div className="font-semibold text-gray-800 dark:text-white">Showcase</div>
//         <div className="text-sm text-gray-600 dark:text-gray-400">Share your art, crafts, or handmade items with the community</div>
//       </div>
//     </div>
//   </button>

//   <button
//     onClick={() => handleTypeSelect('sell')}
//     className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-400 dark:hover:border-teal-500 transition-all"
//   >
//     <div className="flex items-center gap-3">
//       <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
//         <IoPricetag className="w-5 h-5 text-green-600 dark:text-green-400" />
//       </div>
//       <div>
//         <div className="font-semibold text-gray-800 dark:text-white">Sell</div>
//         <div className="text-sm text-gray-600 dark:text-gray-400">List your artwork, craft, or handmade item for sale</div>
//       </div>
//     </div>
//   </button>

//   <button
//     onClick={() => handleTypeSelect('video')}
//     className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-400 dark:hover:border-teal-500 transition-all"
//   >
//     <div className="flex items-center gap-3">
//       <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
//         <IoVideocam className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//       </div>
//       <div>
//         <div className="font-semibold text-gray-800 dark:text-white">Video</div>
//         <div className="text-sm text-gray-600 dark:text-gray-400">Upload short videos of your art, craft, or creative process</div>
//       </div>
//     </div>
//   </button>
// </div>
// </div>

//   );

//   // Step 2: File Upload
//   const renderUploadStep = () => (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Upload Your File</h3>
//         <p className="text-gray-600 dark:text-gray-400">
//           {uploadType === 'video' ? 'Select a video file' : 'Select an image file'}
//         </p>
//       </div>

//       <div
//         onClick={handleFileSelect}
//         className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center cursor-pointer hover:border-teal-400 dark:hover:border-teal-500 transition-colors"
//       >
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={(e) => {
//             handleFileChange(index, e.target.files);
//             if (e.target.files?.[0]) {
//               setTimeout(goToNextStep, 500); // Auto-proceed after file selection
//             }
//           }}
//           accept={uploadType === 'video' ? "video/*" : "image/*"}
//           className="hidden"
//         />
        
//         {entry.file ? (
//           <div className="text-green-600 dark:text-green-400">
//             <IoCheckmarkCircle className="mx-auto w-16 h-16 mb-3" />
//             <p className="font-semibold">File Selected!</p>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//               {entry.file.name} • {(entry.file.size / (1024 * 1024)).toFixed(1)}MB
//             </p>
//           </div>
//         ) : (
//           <>
//             <IoCloudUploadOutline className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
//             <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Tap to select file
//             </p>
//             <p className="text-gray-500 dark:text-gray-400 text-sm">
//               {uploadType === 'video' ? 'MP4, WebM, MOV • Max 10MB' : 'JPEG, PNG, WEBP • Max 10MB'}
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );

//   // Step 3: Details
//   const renderDetailsStep = () => (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Add Details</h3>
//         <p className="text-gray-600 dark:text-gray-400">Tell us about your creation</p>
//       </div>

//       <div className="space-y-4">
//         {/* Title */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Title *
//           </label>
//           <input
//             type="text"
//             value={entry.title}
//             onChange={(e) => updateEntry(index, 'title', e.target.value)}
//             placeholder="Give it a meaningful title..."
//             className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Description {uploadType === 'video' ? '*' : ''}
//           </label>
//           <textarea
//             value={entry.description}
//             onChange={(e) => updateEntry(index, 'description', e.target.value)}
//             placeholder="Share the story behind your creation..."
//             rows={3}
//             className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
//           />
//         </div>

//         {/* Category - Only for images */}
//         {(uploadType === 'normal' || uploadType === 'sell') && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Category *
//             </label>
//             <select
//               value={entry.medium}
//               onChange={(e) => updateEntry(index, 'medium', e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//             >
//               <option value="">Select a category</option>
//               {artCategories.map(cat => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Tags */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Tags {entry.tag ? `(${entry.tag.split(',').length}/5)` : ''}
//           </label>
//           <div className="flex gap-2 mb-2">
//             <input
//               type="text"
//               value={customTag}
//               onChange={(e) => setCustomTag(e.target.value)}
//               placeholder="Add a tag..."
//               className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
//               onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
//             />
//             <button
//               onClick={addCustomTag}
//               className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
//             >
//               Add
//             </button>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {entry.tag?.split(',').filter(t => t.trim()).map((tag, idx) => (
//               <span key={idx} className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-sm flex items-center gap-1">
//                 #{tag.trim()}
//                 <button onClick={() => removeTag(tag)} className="hover:text-teal-600">×</button>
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Price - Only for sell */}
//         {uploadType === 'sell' && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Price (₹) *
//             </label>
//             <input
//               type="number"
//               value={entry.price}
//               onChange={(e) => updateEntry(index, 'price', e.target.value)}
//               placeholder="0.00"
//               min="1"
//               className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl"
//             />
//           </div>
//         )}

//         {/* Special Piece - Only for images */}
//         {(uploadType === 'normal' || uploadType === 'sell') && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               <IoSparkles className="inline mr-1" />
//               Special Features (optional)
//             </label>
//             <div className="space-y-3">
//               <label className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   checked={entry.awards?.includes('featured')}
//                   onChange={(e) => handleSpecialToggle('featured')}
//                   className="rounded border-gray-300"
//                 />
//                 <span>This is a featured work</span>
//               </label>
              
//               <label className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   checked={entry.awards?.includes('award')}
//                   onChange={(e) => handleSpecialToggle('award')}
//                   className="rounded border-gray-300"
//                 />
//                 <span>Award-winning piece</span>
//               </label>

//               {(entry.awards?.includes('featured') || entry.awards?.includes('award')) && (
//                 <div>
//                   <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
//                     Why is it special?
//                   </label>
//                   <input
//                     type="text"
//                     value={specialReason}
//                     onChange={(e) => setSpecialReason(e.target.value)}
//                     placeholder="Briefly explain..."
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   // Step 4: Review
//   const renderReviewStep = () => (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Review Your Creation</h3>
//         <p className="text-gray-600 dark:text-gray-400">Everything look good?</p>
//       </div>

//       <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-4">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
//             {uploadType === 'video' ? (
//               <IoVideocam className="w-6 h-6 text-teal-600 dark:text-teal-400" />
//             ) : (
//               <IoImage className="w-6 h-6 text-teal-600 dark:text-teal-400" />
//             )}
//           </div>
//           <div>
//             <div className="font-semibold">{entry.title || 'Untitled'}</div>
//             <div className="text-sm text-gray-600 dark:text-gray-400">
//               {uploadType === 'sell' ? 'For Sale' : uploadType === 'video' ? 'Video' : 'Community Share'}
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 text-sm">
//           <div>
//             <span className="text-gray-500">Category:</span>
//             <div>{entry.medium || 'Not set'}</div>
//           </div>
//           <div>
//             <span className="text-gray-500">Tags:</span>
//             <div>{entry.tag ? entry.tag.split(',').map(t => `#${t.trim()}`).join(' ') : 'No tags'}</div>
//           </div>
//           {uploadType === 'sell' && (
//             <div className="col-span-2">
//               <span className="text-gray-500">Price:</span>
//               <div className="font-semibold">₹{entry.price || '0'}</div>
//             </div>
//           )}
//         </div>

//         {specialReason && (
//           <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
//             <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Special Feature</div>
//             <div className="text-sm text-yellow-600 dark:text-yellow-400">{specialReason}</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1: return renderTypeStep();
//       case 2: return renderUploadStep();
//       case 3: return renderDetailsStep();
//       case 4: return renderReviewStep();
//       default: return renderTypeStep();
//     }
//   };

//   const isStepComplete = () => {
//     switch (currentStep) {
//       case 1: return uploadType !== '';
//       case 2: return !!entry.file;
//       case 3: return entry.title && entry.tag && (uploadType === 'video' || entry.medium) && (uploadType !== 'sell' || entry.price);
//       case 4: return true;
//       default: return false;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Progress Steps */}
//       <div className="flex justify-between items-center mb-6">
//         {steps.map((step, index) => (
//           <React.Fragment key={step.number}>
//             <div className="flex flex-col items-center">
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                 currentStep >= step.number 
//                   ? 'bg-teal-500 text-white' 
//                   : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
//               }`}>
//                 {currentStep > step.number ? <IoCheckmarkCircle /> : step.number}
//               </div>
//               <span className={`text-xs mt-1 hidden sm:block ${
//                 currentStep >= step.number ? 'text-teal-600 dark:text-teal-400' : 'text-gray-500'
//               }`}>
//                 {step.title}
//               </span>
//             </div>
//             {index < steps.length - 1 && (
//               <div className={`flex-1 h-1 mx-2 ${
//                 currentStep > step.number ? 'bg-teal-500' : 'bg-gray-200 dark:bg-gray-700'
//               }`} />
//             )}
//           </React.Fragment>
//         ))}
//       </div>

//       {/* Step Content */}
//       <div className="min-h-[400px]">
//         {renderStepContent()}
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
//         <button
//           onClick={goToPrevStep}
//           disabled={currentStep === 1}
//           className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//         >
//           <IoChevronBack /> Back
//         </button>

//         {currentStep < 4 ? (
//           <button
//             onClick={goToNextStep}
//             disabled={!isStepComplete()}
//             className="px-6 py-2 bg-teal-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//           >
//             Next <IoChevronForward />
//           </button>
//         ) : (
//           <button
//             onClick={() => handleEntryUpload(index)}
//             disabled={uploading || !isStepComplete()}
//             className="px-6 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//           >
//             {uploading ? 'Uploading...' : 'Share Creation'}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadEntry;


// import React, { useState, useRef } from 'react';
// import { toast } from 'react-toastify';
// import { 
//   IoCloudUploadOutline, 
//   IoImage, 
//   IoVideocam,
//   IoPricetag,
//   IoSparkles,
//   IoChevronForward,
//   IoChevronBack,
//   IoCheckmarkCircle,
//   IoAdd,
//   IoClose
// } from 'react-icons/io5';

// const UploadEntry = ({ index, entry, updateEntry, handleFileChange, handleEntryUpload, uploading }) => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [uploadType, setUploadType] = useState('normal');
//   const [customTag, setCustomTag] = useState('');
//   const [specialReason, setSpecialReason] = useState('');
//   const [additionalImages, setAdditionalImages] = useState([]);
//   const fileInputRef = useRef(null);
//   const additionalImagesRef = useRef(null);

//   // const artCategories = [
//   //   'Abstract',
//   //   'Landscape',
//   //   'Portrait',
//   //   'StillLife',
//   //   'Fantasy',
//   //   'Realism',
//   //   'Surrealism',
//   //   'Traditional',
//   //   'Minimalism',
//   //   'Expressionism',
//   //   'Impressionism',
//   //   'PopArt',
//   //   'DigitalArt',
//   //   'Historical',
//   //   'Modern',
//   //   'Nature',
//   //   'Photography'
//   // ];
//   const artCategories = [
//   // 🎨 Painting & Traditional Art
//   'Landscape',
//   'Portrait',
//   'Watercolour',
//   'OilPainting',
//   'Abstract',
//   'StillLife',
//   'Historical',
//   'Surrealism',
//   'Impressionism',
//   'Realism',
//   'Expressionism',
//   'Minimalism',
//   'PopArt',
//   'Nature',
//   'Traditional',
//   'Digital',
//   'Modern',
//   'Photography',

//   // 🪄 Handcrafted & Decorative Arts
//   'Handcraft',
//   'JewelleryDesign',
//   'Pottery',
//   'Sculpture',
//   'Woodwork',
//   'Ceramics',
//   'Embroidery',
//   'TextileArt',
//   'Calligraphy',
//   'PaperCraft',

//   // 💼 Commercial & Applied Arts
//   'Illustration',
//   'GraphicDesign',
//   'FashionDesign',
//   'InteriorDesign',
//   'ProductDesign'
// ];


//   const steps = [
//     { number: 1, title: 'Type', description: 'Choose content type' },
//     { number: 2, title: 'Upload', description: 'Add your file' },
//     { number: 3, title: 'Details', description: 'Add information' },
//     { number: 4, title: 'Review', description: 'Confirm & share' }
//   ];

//   const handleFileSelect = () => {
//     fileInputRef.current?.click();
//   };

//   const handleAdditionalImagesSelect = () => {
//     additionalImagesRef.current?.click();
//   };

//   const handleAdditionalImagesChange = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter(file => {
//       const isImage = file.type.startsWith('image/');
//       const isUnderSize = file.size <= 10 * 1024 * 1024; // 10MB
      
//       if (!isImage) {
//         toast.error('Please select only image files');
//         return false;
//       }
//       if (!isUnderSize) {
//         toast.error('File size must be under 10MB');
//         return false;
//       }
//       return true;
//     });

//     const newImages = [...additionalImages, ...validFiles].slice(0, 3); // Max 3 images
//     setAdditionalImages(newImages);
//   };

//   const removeAdditionalImage = (indexToRemove) => {
//     setAdditionalImages(additionalImages.filter((_, index) => index !== indexToRemove));
//   };

//   const handleTypeSelect = (type) => {
//     setUploadType(type);
//     // Reset additional images when type changes
//     if (type !== 'sell') {
//       setAdditionalImages([]);
//     }
//     // Reset special fields when type changes
//     if (type === 'video') {
//       updateEntry(index, 'awards', []);
//       setSpecialReason('');
//     }
//     goToNextStep();
//   };

//   const goToNextStep = () => {
//     if (currentStep < 4) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const goToPrevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const addCustomTag = () => {
//     if (customTag.trim() && !entry.tag?.includes(customTag.trim())) {
//       const currentTags = entry.tag ? entry.tag.split(',').filter(t => t.trim()) : [];
//       const newTags = [...currentTags, customTag.trim().toLowerCase()].slice(0, 5);
//       updateEntry(index, 'tag', newTags.join(', '));
//       setCustomTag('');
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     const currentTags = entry.tag ? entry.tag.split(',').filter(t => t.trim()) : [];
//     const newTags = currentTags.filter(tag => tag !== tagToRemove);
//     updateEntry(index, 'tag', newTags.join(', '));
//   };

//   const handleSpecialToggle = (specialType) => {
//     const awards = entry.awards || [];
//     const newAwards = awards.includes(specialType) 
//       ? awards.filter(a => a !== specialType)
//       : [...awards, specialType];
//     updateEntry(index, 'awards', newAwards);
    
//     if (awards.includes(specialType)) {
//       setSpecialReason('');
//     }
//   };

//   // Step 1: Type Selection
//   const renderTypeStep = () => (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">What are you sharing?</h3>
//         <p className="text-gray-600 dark:text-gray-400">Choose how you want to share your creation</p>
//       </div>

//       <div className="grid grid-cols-1 gap-3">
//         <button
//           onClick={() => handleTypeSelect('normal')}
//           className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-400 dark:hover:border-teal-500 transition-all"
//         >
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
//               <IoImage className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//             </div>
//             <div>
//               <div className="font-semibold text-gray-800 dark:text-white">Share with Community</div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">Showcase your artwork to the community</div>
//             </div>
//           </div>
//         </button>

//         <button
//           onClick={() => handleTypeSelect('sell')}
//           className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-400 dark:hover:border-teal-500 transition-all"
//         >
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
//               <IoPricetag className="w-5 h-5 text-green-600 dark:text-green-400" />
//             </div>
//             <div>
//               <div className="font-semibold text-gray-800 dark:text-white">Sell Your Art</div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 List your artwork for sale • Add multiple images
//               </div>
//             </div>
//           </div>
//         </button>

//         <button
//           onClick={() => handleTypeSelect('video')}
//           className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-400 dark:hover:border-teal-500 transition-all"
//         >
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
//               <IoVideocam className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//             </div>
//             <div>
//               <div className="font-semibold text-gray-800 dark:text-white">Share Video</div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">Upload video content</div>
//             </div>
//           </div>
//         </button>
//       </div>
//     </div>
//   );

//   // Step 2: File Upload
//   const renderUploadStep = () => (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//           {uploadType === 'sell' ? 'Upload Product Images' : 'Upload Your File'}
//         </h3>
//         <p className="text-gray-600 dark:text-gray-400">
//           {uploadType === 'sell' 
//             ? 'Add main image and additional photos (max 3)' 
//             : uploadType === 'video' ? 'Select a video file' : 'Select an image file'
//           }
//         </p>
//       </div>

//       {/* Main File Upload */}
//       <div
//         onClick={handleFileSelect}
//         className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 text-center cursor-pointer hover:border-teal-400 dark:hover:border-teal-500 transition-colors"
//       >
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={(e) => {
//             handleFileChange(index, e.target.files);
//             if (e.target.files?.[0]) {
//               setTimeout(goToNextStep, 500);
//             }
//           }}
//           accept={uploadType === 'video' ? "video/*" : "image/*"}
//           className="hidden"
//         />
        
//         {entry.file ? (
//           <div className="text-green-600 dark:text-green-400">
//             <IoCheckmarkCircle className="mx-auto w-12 h-12 mb-3" />
//             <p className="font-semibold">Main {uploadType === 'video' ? 'Video' : 'Image'} Selected!</p>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//               {entry.file.name} • {(entry.file.size / (1024 * 1024)).toFixed(1)}MB
//             </p>
//           </div>
//         ) : (
//           <>
//             <IoCloudUploadOutline className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-3" />
//             <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
//               {uploadType === 'sell' ? 'Main Product Image' : 'Tap to select file'}
//             </p>
//             <p className="text-gray-500 dark:text-gray-400 text-sm">
//               {uploadType === 'video' ? 'MP4, WebM, MOV • Max 10MB' : 'JPEG, PNG, WEBP • Max 10MB'}
//             </p>
//           </>
//         )}
//       </div>

//       {/* Additional Images for Sale Items */}
//       {uploadType === 'sell' && (
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//               Additional Images ({additionalImages.length}/3)
//             </label>
//             <span className="text-xs text-gray-500">Optional but recommended</span>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//             {/* Add More Button */}
//             {additionalImages.length < 3 && (
//               <button
//                 onClick={handleAdditionalImagesSelect}
//                 className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center hover:border-teal-400 dark:hover:border-teal-500 transition-colors"
//               >
//                 <IoAdd className="w-8 h-8 text-gray-400 mb-2" />
//                 <span className="text-sm text-gray-500">Add Photo</span>
//                 <input
//                   type="file"
//                   ref={additionalImagesRef}
//                   onChange={handleAdditionalImagesChange}
//                   accept="image/*"
//                   multiple
//                   className="hidden"
//                 />
//               </button>
//             )}

//             {/* Additional Images Preview */}
//             {additionalImages.map((image, imgIndex) => (
//               <div key={imgIndex} className="relative aspect-square group">
//                 <img
//                   src={URL.createObjectURL(image)}
//                   alt={`Additional ${imgIndex + 1}`}
//                   className="w-full h-full object-cover rounded-xl border-2 border-gray-200 dark:border-gray-700"
//                 />
//                 <button
//                   onClick={() => removeAdditionalImage(imgIndex)}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <IoClose className="w-4 h-4" />
//                 </button>
//                 <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-xl">
//                   Photo {imgIndex + 1}
//                 </div>
//               </div>
//             ))}

//             {/* Empty slots */}
//             {Array.from({ length: 3 - additionalImages.length - 1 }).map((_, index) => (
//               <div key={index} className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center">
//                 <span className="text-gray-400 text-sm">Empty</span>
//               </div>
//             ))}
//           </div>

//           <p className="text-xs text-gray-500 text-center">
//             Add different angles or details to help buyers make decisions
//           </p>
//         </div>
//       )}
//     </div>
//   );

//   // Step 3: Details
//   const renderDetailsStep = () => (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Add Details</h3>
//         <p className="text-gray-600 dark:text-gray-400">Tell us about your creation</p>
//       </div>

//       <div className="space-y-4">
//         {/* Title */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Title *
//           </label>
//           <input
//             type="text"
//             value={entry.title}
//             onChange={(e) => updateEntry(index, 'title', e.target.value)}
//             placeholder="Give it a meaningful title..."
//             className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Description {uploadType === 'video' ? '*' : ''}
//           </label>
//           <textarea
//             value={entry.description}
//             onChange={(e) => updateEntry(index, 'description', e.target.value)}
//             placeholder={
//               uploadType === 'sell' 
//                 ? "Describe your product, materials used, dimensions, condition..." 
//                 : "Share the story behind your creation..."
//             }
//             rows={3}
//             className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
//           />
//         </div>

//         {/* Category - Only for images */}
//         {(uploadType === 'normal' || uploadType === 'sell') && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Category *
//             </label>
//             <select
//               value={entry.medium}
//               onChange={(e) => updateEntry(index, 'medium', e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//             >
//               <option value="">Select a category</option>
//               {artCategories.map(cat => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Tags */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Tags {entry.tag ? `(${entry.tag.split(',').length}/5)` : ''}
//           </label>
//           <div className="flex gap-2 mb-2">
//             <input
//               type="text"
//               value={customTag}
//               onChange={(e) => setCustomTag(e.target.value)}
//               placeholder="Add a tag..."
//               className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
//               onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
//             />
//             <button
//               onClick={addCustomTag}
//               className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
//             >
//               Add
//             </button>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {entry.tag?.split(',').filter(t => t.trim()).map((tag, idx) => (
//               <span key={idx} className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-sm flex items-center gap-1">
//                 #{tag.trim()}
//                 <button onClick={() => removeTag(tag)} className="hover:text-teal-600">×</button>
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Price - Only for sell */}
//         {uploadType === 'sell' && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Price (₹) *
//             </label>
//             <input
//               type="number"
//               value={entry.price}
//               onChange={(e) => updateEntry(index, 'price', e.target.value)}
//               placeholder="0.00"
//               min="1"
//               className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl"
//             />
//           </div>
//         )}

//         {/* Special Piece - Only for images */}
//         {(uploadType === 'normal' || uploadType === 'sell') && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               <IoSparkles className="inline mr-1" />
//               Special Features (optional)
//             </label>
//             <div className="space-y-3">
//               <label className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   checked={entry.awards?.includes('featured')}
//                   onChange={(e) => handleSpecialToggle('featured')}
//                   className="rounded border-gray-300"
//                 />
//                 <span>This is a featured work</span>
//               </label>
              
//               <label className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   checked={entry.awards?.includes('award')}
//                   onChange={(e) => handleSpecialToggle('award')}
//                   className="rounded border-gray-300"
//                 />
//                 <span>Award-winning piece</span>
//               </label>

//               {(entry.awards?.includes('featured') || entry.awards?.includes('award')) && (
//                 <div>
//                   <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
//                     Why is it special?
//                   </label>
//                   <input
//                     type="text"
//                     value={specialReason}
//                     onChange={(e) => setSpecialReason(e.target.value)}
//                     placeholder="Briefly explain..."
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   // Step 4: Review
//   const renderReviewStep = () => (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Review Your Creation</h3>
//         <p className="text-gray-600 dark:text-gray-400">Everything look good?</p>
//       </div>

//       <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-4">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
//             {uploadType === 'video' ? (
//               <IoVideocam className="w-6 h-6 text-teal-600 dark:text-teal-400" />
//             ) : (
//               <IoImage className="w-6 h-6 text-teal-600 dark:text-teal-400" />
//             )}
//           </div>
//           <div>
//             <div className="font-semibold">{entry.title || 'Untitled'}</div>
//             <div className="text-sm text-gray-600 dark:text-gray-400">
//               {uploadType === 'sell' ? 'For Sale' : uploadType === 'video' ? 'Video' : 'Community Share'}
//             </div>
//           </div>
//         </div>

//         {/* Image Gallery for Sale Items */}
//         {uploadType === 'sell' && additionalImages.length > 0 && (
//           <div>
//             <div className="text-sm text-gray-500 mb-2">Product Gallery ({additionalImages.length + 1} images)</div>
//             <div className="flex gap-2 overflow-x-auto pb-2">
//               <div className="flex-shrink-0 w-20 h-20 border-2 border-teal-500 rounded-lg">
//                 <img
//                   src={entry.file ? URL.createObjectURL(entry.file) : ''}
//                   alt="Main"
//                   className="w-full h-full object-cover rounded-lg"
//                 />
//                 <div className="text-xs text-center bg-teal-500 text-white">Main</div>
//               </div>
//               {additionalImages.map((image, index) => (
//                 <div key={index} className="flex-shrink-0 w-20 h-20 border border-gray-300 rounded-lg">
//                   <img
//                     src={URL.createObjectURL(image)}
//                     alt={`Additional ${index + 1}`}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                   <div className="text-xs text-center bg-gray-200 text-gray-600">Extra {index + 1}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-2 gap-4 text-sm">
//           <div>
//             <span className="text-gray-500">Category:</span>
//             <div>{entry.medium || 'Not set'}</div>
//           </div>
//           <div>
//             <span className="text-gray-500">Tags:</span>
//             <div>{entry.tag ? entry.tag.split(',').map(t => `#${t.trim()}`).join(' ') : 'No tags'}</div>
//           </div>
//           {uploadType === 'sell' && (
//             <div className="col-span-2">
//               <span className="text-gray-500">Price:</span>
//               <div className="font-semibold">₹{entry.price || '0'}</div>
//             </div>
//           )}
//         </div>

//         {specialReason && (
//           <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
//             <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Special Feature</div>
//             <div className="text-sm text-yellow-600 dark:text-yellow-400">{specialReason}</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1: return renderTypeStep();
//       case 2: return renderUploadStep();
//       case 3: return renderDetailsStep();
//       case 4: return renderReviewStep();
//       default: return renderTypeStep();
//     }
//   };

//   const isStepComplete = () => {
//     switch (currentStep) {
//       case 1: return uploadType !== '';
//       case 2: return !!entry.file;
//       case 3: return entry.title && entry.tag && (uploadType === 'video' || entry.medium) && (uploadType !== 'sell' || entry.price);
//       case 4: return true;
//       default: return false;
//     }
//   };

//   // Update the handleEntryUpload to include additional images
//   const handleUploadWithAdditionalImages = () => {
//     // Store additional images in the entry or handle them separately
//     // For now, we'll add them to the entry object
//     const entryWithAdditionalImages = {
//       ...entry,
//       additionalImages: additionalImages
//     };
    
//     // You'll need to update your parent component to handle additional images
//     handleEntryUpload(index, entryWithAdditionalImages);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Progress Steps */}
//       <div className="flex justify-between items-center mb-6">
//         {steps.map((step, index) => (
//           <React.Fragment key={step.number}>
//             <div className="flex flex-col items-center">
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                 currentStep >= step.number 
//                   ? 'bg-teal-500 text-white' 
//                   : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
//               }`}>
//                 {currentStep > step.number ? <IoCheckmarkCircle /> : step.number}
//               </div>
//               <span className={`text-xs mt-1 hidden sm:block ${
//                 currentStep >= step.number ? 'text-teal-600 dark:text-teal-400' : 'text-gray-500'
//               }`}>
//                 {step.title}
//               </span>
//             </div>
//             {index < steps.length - 1 && (
//               <div className={`flex-1 h-1 mx-2 ${
//                 currentStep > step.number ? 'bg-teal-500' : 'bg-gray-200 dark:bg-gray-700'
//               }`} />
//             )}
//           </React.Fragment>
//         ))}
//       </div>

//       {/* Step Content */}
//       <div className="min-h-[400px]">
//         {renderStepContent()}
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
//         <button
//           onClick={goToPrevStep}
//           disabled={currentStep === 1}
//           className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//         >
//           <IoChevronBack /> Back
//         </button>

//         {currentStep < 4 ? (
//           <button
//             onClick={goToNextStep}
//             disabled={!isStepComplete()}
//             className="px-6 py-2 bg-teal-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//           >
//             Next <IoChevronForward />
//           </button>
//         ) : (
//           <button
//             onClick={handleUploadWithAdditionalImages}
//             disabled={uploading || !isStepComplete()}
//             className="px-6 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//           >
//             {uploading ? 'Uploading...' : `Share ${uploadType === 'sell' ? 'Product' : 'Creation'}`}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadEntry;

import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { 
  IoCloudUploadOutline, 
  IoImage, 
  IoVideocam,
  IoPricetag,
  IoSparkles,
  IoChevronForward,
  IoChevronBack,
  IoCheckmarkCircle,
  IoAdd,
  IoClose,
  IoAlertCircle
} from 'react-icons/io5';

const UploadEntry = ({ index, entry, updateEntry, handleFileChange, handleEntryUpload, uploading }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadType, setUploadType] = useState('normal');
  const [customTag, setCustomTag] = useState('');
  const [specialReason, setSpecialReason] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);
  const fileInputRef = useRef(null);
  const additionalImagesRef = useRef(null);

  const artCategories = [
    'Landscape', 'Portrait', 'Watercolour', 'OilPainting', 'Abstract', 
    'StillLife', 'Historical', 'Surrealism', 'Impressionism', 'Realism', 
    'Expressionism', 'Minimalism', 'PopArt', 'Nature', 'Traditional', 
    'Digital', 'Modern', 'Photography', 'Handcraft', 'JewelleryDesign', 
    'Pottery', 'Sculpture', 'Woodwork', 'Ceramics', 'Embroidery', 
    'TextileArt', 'Calligraphy', 'PaperCraft', 'Illustration', 
    'GraphicDesign', 'FashionDesign', 'InteriorDesign', 'ProductDesign'
  ];

  const steps = [
    { number: 1, title: 'Type', description: 'Choose content type' },
    { number: 2, title: 'Upload', description: 'Add your file' },
    { number: 3, title: 'Details', description: 'Add information' },
    { number: 4, title: 'Review', description: 'Confirm & share' }
  ];

  // List of dangerous file extensions to block
  const dangerousExtensions = [
    '.exe', '.msi', '.bat', '.cmd', '.sh', '.bash', '.ps1', '.vbs', '.js', 
    '.jar', '.app', '.dmg', '.pkg', '.deb', '.rpm', '.scr', '.com', '.hta',
    '.wsf', '.reg', '.inf', '.zip', '.rar', '.7z', '.tar', '.gz', '.iso',
    '.dll', '.sys', '.drv', '.ocx', '.cpl', '.pif', '.application', '.gadget'
  ];

  // Security check function - only blocks dangerous files
  const isFileSecure = (file) => {
    const fileName = file.name.toLowerCase();
    const fileExtension = '.' + fileName.split('.').pop();
    
    // Block dangerous extensions
    if (dangerousExtensions.includes(fileExtension)) {
      return false;
    }
    
    // Allow all image types
    if (file.type.startsWith('image/')) {
      return true;
    }
    
    // Allow all video types
    if (file.type.startsWith('video/')) {
      return true;
    }
    
    // For files with no MIME type, check common safe extensions
    const safeExtensions = [
      '.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.svg', '.tiff', '.tif', 
      '.ico', '.heic', '.heif', '.avif', '.mp4', '.webm', '.ogg', '.mov', '.avi', 
      '.mpeg', '.mpg', '.mkv', '.flv', '.3gp', '.3g2', '.wmv', '.m4v', '.pdf'
    ];
    
    return safeExtensions.includes(fileExtension);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleAdditionalImagesSelect = () => {
    additionalImagesRef.current?.click();
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      // Security check first
      if (!isFileSecure(file)) {
        toast.error('File type not allowed for security reasons');
        return false;
      }
      
      // Size check
      const isUnderSize = file.size <= 10 * 1024 * 1024; // 10MB
      if (!isUnderSize) {
        toast.error('File size must be under 10MB');
        return false;
      }
      
      return true;
    });

    const newImages = [...additionalImages, ...validFiles].slice(0, 3); // Max 3 images
    setAdditionalImages(newImages);
    
    // Clear the input to allow selecting same files again
    if (additionalImagesRef.current) {
      additionalImagesRef.current.value = '';
    }
  };

  const removeAdditionalImage = (indexToRemove) => {
    setAdditionalImages(additionalImages.filter((_, index) => index !== indexToRemove));
  };

  const handleTypeSelect = (type) => {
    setUploadType(type);
    // Reset additional images when type changes
    if (type !== 'sell') {
      setAdditionalImages([]);
    }
    // Reset special fields when type changes
    if (type === 'video') {
      updateEntry(index, 'awards', []);
      setSpecialReason('');
    }
    goToNextStep();
  };

  const goToNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addCustomTag = () => {
    if (customTag.trim() && !entry.tag?.includes(customTag.trim())) {
      const currentTags = entry.tag ? entry.tag.split(',').filter(t => t.trim()) : [];
      const newTags = [...currentTags, customTag.trim().toLowerCase()].slice(0, 5);
      updateEntry(index, 'tag', newTags.join(', '));
      setCustomTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    const currentTags = entry.tag ? entry.tag.split(',').filter(t => t.trim()) : [];
    const newTags = currentTags.filter(tag => tag !== tagToRemove);
    updateEntry(index, 'tag', newTags.join(', '));
  };

  const handleSpecialToggle = (specialType) => {
    const awards = entry.awards || [];
    const newAwards = awards.includes(specialType) 
      ? awards.filter(a => a !== specialType)
      : [...awards, specialType];
    updateEntry(index, 'awards', newAwards);
    
    if (awards.includes(specialType)) {
      setSpecialReason('');
    }
  };

  // Step 1: Type Selection
  const renderTypeStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">What are you sharing?</h3>
        <p className="text-gray-600 dark:text-gray-400">Choose how you want to share your creation</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <button
          onClick={() => handleTypeSelect('normal')}
          className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-400 dark:hover:border-teal-500 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <IoImage className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="font-semibold text-gray-800 dark:text-white">Share with Community</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Showcase your artwork to the community</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleTypeSelect('sell')}
          className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-400 dark:hover:border-teal-500 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <IoPricetag className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="font-semibold text-gray-800 dark:text-white">Sell Your Art</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                List your artwork for sale • Add multiple images
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleTypeSelect('video')}
          className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-left hover:border-teal-400 dark:hover:border-teal-500 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <IoVideocam className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="font-semibold text-gray-800 dark:text-white">Share Video</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Upload video content</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  // Step 2: File Upload
  const renderUploadStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {uploadType === 'sell' ? 'Upload Product Images' : 'Upload Your File'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {uploadType === 'sell' 
            ? 'Add main image and additional photos (max 3)' 
            : uploadType === 'video' ? 'Select a video file' : 'Select an image file'
          }
        </p>
      </div>

      {/* Main File Upload */}
      <div
        onClick={handleFileSelect}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 text-center cursor-pointer hover:border-teal-400 dark:hover:border-teal-500 transition-colors"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            handleFileChange(index, e.target.files);
            if (e.target.files?.[0]) {
              setTimeout(goToNextStep, 500);
            }
          }}
          accept={uploadType === 'video' ? "video/*" : "image/*"}
          className="hidden"
        />
        
        {entry.file ? (
          <div className="text-green-600 dark:text-green-400">
            <IoCheckmarkCircle className="mx-auto w-12 h-12 mb-3" />
            <p className="font-semibold">Main {uploadType === 'video' ? 'Video' : 'Image'} Selected!</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {entry.file.name} • {(entry.file.size / (1024 * 1024)).toFixed(1)}MB
            </p>
          </div>
        ) : (
          <>
            <IoCloudUploadOutline className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-3" />
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {uploadType === 'sell' ? 'Main Product Image' : 'Tap to select file'}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {uploadType === 'video' ? 'All video formats supported • Max 10MB' : 'All image formats supported • Max 10MB'}
            </p>
          </>
        )}
      </div>

      {/* Additional Images for Sale Items */}
      {uploadType === 'sell' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Additional Images ({additionalImages.length}/3)
            </label>
            <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
              <IoAlertCircle className="w-4 h-4" />
              <span>Recommended for better sales</span>
            </div>
          </div>

          {/* Info box about additional images */}
          {additionalImages.length === 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <IoAlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    Add more images to increase sales
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Show different angles, close-ups, or your creation in use. Buyers love seeing details!
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Add More Button */}
            {additionalImages.length < 3 && (
              <button
                onClick={handleAdditionalImagesSelect}
                className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center hover:border-teal-400 dark:hover:border-teal-500 transition-colors bg-gray-50 dark:bg-gray-800/50"
              >
                <IoAdd className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Add Photo</span>
                <span className="text-xs text-gray-400 mt-1">Any image format</span>
                <input
                  type="file"
                  ref={additionalImagesRef}
                  onChange={handleAdditionalImagesChange}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </button>
            )}

            {/* Additional Images Preview */}
            {additionalImages.map((image, imgIndex) => (
              <div key={imgIndex} className="relative aspect-square group">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Additional ${imgIndex + 1}`}
                  className="w-full h-full object-cover rounded-xl border-2 border-gray-200 dark:border-gray-700"
                />
                <button
                  onClick={() => removeAdditionalImage(imgIndex)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <IoClose className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-xl">
                  Photo {imgIndex + 1}
                </div>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: 3 - additionalImages.length - 1 }).map((_, index) => (
              <div key={index} className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-gray-800/30">
                <span className="text-gray-400 text-sm">Empty slot</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 text-center">
            Supports all image formats (JPEG, PNG, WEBP, GIF, BMP, SVG, etc.) • Max 10MB per file
          </p>
        </div>
      )}
    </div>
  );

  // Step 3: Details
  const renderDetailsStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Add Details</h3>
        <p className="text-gray-600 dark:text-gray-400">Tell us about your creation</p>
      </div>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={entry.title}
            onChange={(e) => updateEntry(index, 'title', e.target.value)}
            placeholder="Give it a meaningful title..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description {uploadType === 'video' ? '*' : ''}
          </label>
          <textarea
            value={entry.description}
            onChange={(e) => updateEntry(index, 'description', e.target.value)}
            placeholder={
              uploadType === 'sell' 
                ? "Describe your product, materials used, dimensions, condition..." 
                : "Share the story behind your creation..."
            }
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Category - Only for images */}
        {(uploadType === 'normal' || uploadType === 'sell') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <select
              value={entry.medium}
              onChange={(e) => updateEntry(index, 'medium', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {artCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        )}

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags {entry.tag ? `(${entry.tag.split(',').length}/5)` : ''}
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="Add a tag..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
            />
            <button
              onClick={addCustomTag}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {entry.tag?.split(',').filter(t => t.trim()).map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-sm flex items-center gap-1">
                #{tag.trim()}
                <button 
                  onClick={() => removeTag(tag)} 
                  className="hover:text-teal-600 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Price - Only for sell */}
        {uploadType === 'sell' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Price (₹) *
            </label>
            <input
              type="number"
              value={entry.price}
              onChange={(e) => updateEntry(index, 'price', e.target.value)}
              placeholder="0.00"
              min="1"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800"
            />
          </div>
        )}

        {/* Special Piece - Only for images */}
        {(uploadType === 'normal' || uploadType === 'sell') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <IoSparkles className="inline mr-1" />
              Special Features (optional)
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={entry.awards?.includes('featured')}
                  onChange={(e) => handleSpecialToggle('featured')}
                  className="rounded border-gray-300"
                />
                <span>This is a featured work</span>
              </label>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={entry.awards?.includes('award')}
                  onChange={(e) => handleSpecialToggle('award')}
                  className="rounded border-gray-300"
                />
                <span>Award-winning piece</span>
              </label>

              {(entry.awards?.includes('featured') || entry.awards?.includes('award')) && (
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Why is it special?
                  </label>
                  <input
                    type="text"
                    value={specialReason}
                    onChange={(e) => setSpecialReason(e.target.value)}
                    placeholder="Briefly explain..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Step 4: Review
  const renderReviewStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Review Your Creation</h3>
        <p className="text-gray-600 dark:text-gray-400">Everything look good?</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
            {uploadType === 'video' ? (
              <IoVideocam className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            ) : (
              <IoImage className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            )}
          </div>
          <div>
            <div className="font-semibold">{entry.title || 'Untitled'}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {uploadType === 'sell' ? 'For Sale' : uploadType === 'video' ? 'Video' : 'Community Share'}
            </div>
          </div>
        </div>

        {/* Image Gallery for Sale Items */}
        {uploadType === 'sell' && (
          <div>
            <div className="text-sm text-gray-500 mb-2">
              Product Gallery ({1 + additionalImages.length} image{additionalImages.length !== 1 ? 's' : ''})
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <div className="flex-shrink-0 w-20 h-20 border-2 border-teal-500 rounded-lg relative">
                <img
                  src={entry.file ? URL.createObjectURL(entry.file) : ''}
                  alt="Main"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-teal-500 text-white text-xs text-center py-0.5 rounded-b-lg">
                  Main
                </div>
              </div>
              {additionalImages.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-20 h-20 border border-gray-300 rounded-lg relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Additional ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-200 text-gray-600 text-xs text-center py-0.5 rounded-b-lg">
                    Extra {index + 1}
                  </div>
                </div>
              ))}
            </div>
            {additionalImages.length === 0 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                💡 Consider adding more images to show different angles and details
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Category:</span>
            <div>{entry.medium || 'Not set'}</div>
          </div>
          <div>
            <span className="text-gray-500">Tags:</span>
            <div>{entry.tag ? entry.tag.split(',').map(t => `#${t.trim()}`).join(' ') : 'No tags'}</div>
          </div>
          {uploadType === 'sell' && (
            <div className="col-span-2">
              <span className="text-gray-500">Price:</span>
              <div className="font-semibold">₹{entry.price || '0'}</div>
            </div>
          )}
        </div>

        {specialReason && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
            <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Special Feature</div>
            <div className="text-sm text-yellow-600 dark:text-yellow-400">{specialReason}</div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderTypeStep();
      case 2: return renderUploadStep();
      case 3: return renderDetailsStep();
      case 4: return renderReviewStep();
      default: return renderTypeStep();
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1: return uploadType !== '';
      case 2: return !!entry.file;
      case 3: return entry.title && entry.tag && (uploadType === 'video' || entry.medium) && (uploadType !== 'sell' || entry.price);
      case 4: return true;
      default: return false;
    }
  };

  // Update the handleEntryUpload to include additional images
  const handleUploadWithAdditionalImages = () => {
    const entryWithAdditionalImages = {
      ...entry,
      additionalImages: additionalImages
    };
    
    handleEntryUpload(index, entryWithAdditionalImages);
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.number 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                {currentStep > step.number ? <IoCheckmarkCircle /> : step.number}
              </div>
              <span className={`text-xs mt-1 hidden sm:block ${
                currentStep >= step.number ? 'text-teal-600 dark:text-teal-400' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 ${
                currentStep > step.number ? 'bg-teal-500' : 'bg-gray-200 dark:bg-gray-700'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={goToPrevStep}
          disabled={currentStep === 1}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          <IoChevronBack /> Back
        </button>

        {currentStep < 4 ? (
          <button
            onClick={goToNextStep}
            disabled={!isStepComplete()}
            className="px-6 py-2 bg-teal-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            Next <IoChevronForward />
          </button>
        ) : (
          <button
            onClick={handleUploadWithAdditionalImages}
            disabled={uploading || !isStepComplete()}
            className="px-6 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {uploading ? 'Uploading...' : `Share ${uploadType === 'sell' ? 'Product' : 'Creation'}`}
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadEntry;