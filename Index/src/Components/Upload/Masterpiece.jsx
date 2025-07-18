// import React, { useState, useRef } from 'react';
// import { Databases, Storage, ID } from 'appwrite';
// import { FaUpload, FaSpinner, FaCheck, FaTimes, FaPalette, FaAward } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import { client } from '../../appwriteConfig';

// const UploadMasterpiece = () => {
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     yearCreated: new Date().getFullYear(),
//     medium: 'oil',
//     dimensions: '',
//     awards: '',
//     price: '',
//     isForSale: false
//   });
//   const [previewImage, setPreviewImage] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const fileInputRef = useRef(null);

//   // Initialize Appwrite
//   const databases = new Databases(client);
//   const storage = new Storage(client);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type and size
//       if (!file.type.match('image.*')) {
//         toast.error('Please select an image file');
//         return;
//       }
//       if (file.size > 10 * 1024 * 1024) { // 10MB limit
//         toast.error('Image size should be less than 10MB');
//         return;
//       }

//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setPreviewImage(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!selectedFile) {
//       toast.error('Please select an image to upload');
//       return;
//     }

//     try {
//       setUploading(true);
//       setProgress(0);

//       // Upload to storage first
//       const fileId = ID.unique();
//       const uploadResponse = await storage.createFile(
//         import.meta.env.VITE_APPWRITE_STORAGE_ID,
//         fileId,
//         selectedFile,
//         {
//           onProgress: (progress) => {
//             setProgress(progress);
//           }
//         }
//       );

//       // Create database document
//       await databases.createDocument(
//         import.meta.env.VITE_APPWRITE_DATABASE_ID,
//         'masterpieces', // Your collection ID
//         ID.unique(),
//         {
//           title: formData.title,
//           description: formData.description,
//           imageId: fileId,
//           yearCreated: parseInt(formData.yearCreated),
//           medium: formData.medium,
//           dimensions: formData.dimensions,
//           awards: formData.awards.split(',').map(award => award.trim()),
//           price: formData.price ? parseFloat(formData.price) : null,
//           isForSale: formData.isForSale,
//           isAwardWinning: !!formData.awards,
//           userId: (await new Account(client).get()).$id
//         }
//       );

//       toast.success('Masterpiece uploaded successfully!');
//       resetForm();
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('Failed to upload masterpiece');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       description: '',
//       yearCreated: new Date().getFullYear(),
//       medium: 'oil',
//       dimensions: '',
//       awards: '',
//       price: '',
//       isForSale: false
//     });
//     setPreviewImage(null);
//     setSelectedFile(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
//         <FaPalette className="mr-2 text-pink-500" />
//         Upload Award-Winning Masterpiece
//       </h2>
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Image Upload Section */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-center w-full">
//             <label
//               htmlFor="artwork-upload"
//               className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${
//                 previewImage 
//                   ? 'border-transparent' 
//                   : 'border-gray-300 dark:border-gray-600 hover:border-pink-500 dark:hover:border-pink-400'
//               }`}
//             >
//               {previewImage ? (
//                 <div className="relative w-full h-full group">
//                   <img 
//                     src={previewImage} 
//                     alt="Preview" 
//                     className="w-full h-full object-contain rounded-lg"
//                   />
//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
//                     <span className="text-white bg-pink-500 px-4 py-2 rounded-lg">
//                       Change Image
//                     </span>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                   <FaUpload className="text-4xl text-gray-400 mb-3" />
//                   <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                     <span className="font-semibold">Click to upload</span> or drag and drop
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     PNG, JPG (Max. 10MB)
//                   </p>
//                 </div>
//               )}
//               <input 
//                 id="artwork-upload" 
//                 type="file" 
//                 className="hidden" 
//                 onChange={handleFileChange}
//                 ref={fileInputRef}
//                 accept="image/*"
//               />
//             </label>
//           </div>

//           {uploading && (
//             <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
//               <div 
//                 className="bg-pink-600 h-2.5 rounded-full" 
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//           )}
//         </div>

//         {/* Artwork Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Title*
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               className="bg-gray-50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
//               placeholder="Mona Lisa"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="yearCreated" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Year Created*
//             </label>
//             <input
//               type="number"
//               id="yearCreated"
//               name="yearCreated"
//               min="1900"
//               max={new Date().getFullYear()}
//               value={formData.yearCreated}
//               onChange={handleInputChange}
//               className="bg-gray-50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="medium" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Medium*
//             </label>
//             <select
//               id="medium"
//               name="medium"
//               value={formData.medium}
//               onChange={handleInputChange}
//               className="bg-gray-50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
//             >
//               <option value="oil">Oil</option>
//               <option value="acrylic">Acrylic</option>
//               <option value="watercolor">Watercolor</option>
//               <option value="pastel">Pastel</option>
//               <option value="digital">Digital</option>
//               <option value="mixed">Mixed Media</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="dimensions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Dimensions (W × H)
//             </label>
//             <input
//               type="text"
//               id="dimensions"
//               name="dimensions"
//               value={formData.dimensions}
//               onChange={handleInputChange}
//               className="bg-gray-50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
//               placeholder="24 × 36 in"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Description*
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               rows="4"
//               value={formData.description}
//               onChange={handleInputChange}
//               className="bg-gray-50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
//               placeholder="Describe your masterpiece, inspiration, techniques used..."
//               required
//             ></textarea>
//           </div>

//           <div className="md:col-span-2">
//             <label htmlFor="awards" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white flex items-center">
//               <FaAward className="mr-2 text-yellow-500" />
//               Awards & Recognitions (comma separated)
//             </label>
//             <input
//               type="text"
//               id="awards"
//               name="awards"
//               value={formData.awards}
//               onChange={handleInputChange}
//               className="bg-gray-50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5"
//               placeholder="Best in Show 2023, Gold Medal 2022"
//             />
//           </div>

//           <div>
//             <div className="flex items-center mb-4">
//               <input
//                 id="isForSale"
//                 name="isForSale"
//                 type="checkbox"
//                 checked={formData.isForSale}
//                 onChange={handleInputChange}
//                 className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//               />
//               <label htmlFor="isForSale" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
//                 This masterpiece is for sale
//               </label>
//             </div>
//           </div>

//           {formData.isForSale && (
//             <div>
//               <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                 Price (USD)
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <span className="text-gray-500 dark:text-gray-400">$</span>
//                 </div>
//                 <input
//                   type="number"
//                   id="price"
//                   name="price"
//                   min="0"
//                   step="0.01"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                   className="bg-gray-50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full pl-8 p-2.5"
//                   placeholder="2500.00"
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end space-x-4 pt-4">
//           <button
//             type="button"
//             onClick={resetForm}
//             className="px-5 py-2.5 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg flex items-center"
//             disabled={uploading}
//           >
//             <FaTimes className="mr-2" /> Reset
//           </button>
//           <button
//             type="submit"
//             className="px-5 py-2.5 text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center"
//             disabled={uploading || !selectedFile}
//           >
//             {uploading ? (
//               <>
//                 <FaSpinner className="animate-spin mr-2" /> Uploading...
//               </>
//             ) : (
//               <>
//                 <FaUpload className="mr-2" /> Upload Masterpiece
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UploadMasterpiece;


import React, { useState, useRef } from 'react';
import { Databases, Storage, ID, Account } from 'appwrite';
import { FaUpload, FaSpinner, FaCheck, FaTimes, FaPalette, FaAward } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { client } from '../../appwriteConfig';

const UploadMasterpiece = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    yearCreated: new Date().getFullYear(),
    medium: 'oil',
    dimensions: '',
    awards: '',
    price: '',
    isForSale: false,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  const databases = new Databases(client);
  const storage = new Storage(client);
  const account = new Account(client);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.yearCreated || formData.yearCreated < 1900 || formData.yearCreated > new Date().getFullYear()) {
      newErrors.yearCreated = `Year must be between 1900 and ${new Date().getFullYear()}`;
    }
    if (formData.isForSale && (!formData.price || formData.price <= 0)) {
      newErrors.price = 'Price must be greater than 0';
    }
    if (!selectedFile) newErrors.image = 'Please select an image';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size should be less than 10MB');
        return;
      }
      setSelectedFile(file);
      setErrors((prev) => ({ ...prev, image: '' }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange({ target: { files: [file] } });
    dropAreaRef.current.classList.remove('border-blue-500');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropAreaRef.current.classList.add('border-blue-500');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropAreaRef.current.classList.remove('border-blue-500');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      const user = await account.get();
      const fileId = ID.unique();
      const uploadResponse = await storage.createFile(
        import.meta.env.VITE_APPWRITE_STORAGE_ID,
        fileId,
        selectedFile,
        undefined,
        (progressEvent) => {
          const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(percent);
        }
      );

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_ARTWORKS_COLLECTION_ID,
        ID.unique(),
        {
          title: formData.title,
          description: formData.description,
          imageId: fileId,
          imageUrl: `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${import.meta.env.VITE_APPWRITE_STORAGE_ID}/files/${fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`,
          yearCreated: parseInt(formData.yearCreated),
          medium: formData.medium,
          dimensions: formData.dimensions,
          awards: formData.awards ? formData.awards.split(',').map(award => award.trim()).filter(award => award) : [],
          price: formData.isForSale ? parseFloat(formData.price) || null : null,
          isForSale: formData.isForSale,
          isAwardWinning: !!formData.awards,
          userId: user.$id,
          createdAt: new Date().toISOString(),
          views: 0,
        }
      );

      toast.success('Masterpiece uploaded successfully!');
      resetForm();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload masterpiece');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      yearCreated: new Date().getFullYear(),
      medium: 'oil',
      dimensions: '',
      awards: '',
      price: '',
      isForSale: false,
    });
    setPreviewImage(null);
    setSelectedFile(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <motion.div
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 font-Playfair flex items-center">
          <FaPalette className="mr-3 text-blue-600 dark:text-blue-400" />
          Upload Your Masterpiece
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Upload Section */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white font-Playfair">Artwork Image</h3>
              <div
                ref={dropAreaRef}
                className={`relative flex items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl transition-colors duration-200 ${
                  previewImage
                    ? 'border-transparent'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {previewImage ? (
                  <div className="relative w-full h-full group">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-contain rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl">
                      <span className="text-white bg-blue-600 px-4 py-2 rounded-lg font-medium">
                        Change Image
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6">
                    <FaUpload className="text-4xl text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-inter">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG (Max. 10MB)</p>
                  </div>
                )}
                <input
                  id="artwork-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  accept="image/*"
                />
              </div>
              {errors.image && <p className="text-sm text-red-500 dark:text-red-400">{errors.image}</p>}
              {uploading && (
                <motion.div
                  className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="bg-blue-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              )}
            </motion.div>

            {/* Artwork Details */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-inter mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border ${
                    errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none text-gray-900 dark:text-white font-inter transition-colors`}
                  placeholder="Mona Lisa"
                />
                {errors.title && <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="yearCreated" className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-inter mb-1">
                  Year Created <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="yearCreated"
                  name="yearCreated"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.yearCreated}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border ${
                    errors.yearCreated ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none text-gray-900 dark:text-white font-inter transition-colors`}
                />
                {errors.yearCreated && <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.yearCreated}</p>}
              </div>

              <div>
                <label htmlFor="medium" className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-inter mb-1">
                  Medium <span className="text-red-500">*</span>
                </label>
                <select
                  id="medium"
                  name="medium"
                  value={formData.medium}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none text-gray-900 dark:text-white font-inter transition-colors"
                >
                  <option value="oil">Oil</option>
                  <option value="acrylic">Acrylic</option>
                  <option value="watercolor">Watercolor</option>
                  <option value="pastel">Pastel</option>
                  <option value="digital">Digital</option>
                  <option value="mixed">Mixed Media</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-inter mb-1">
                  Dimensions (W × H)
                </label>
                <input
                  type="text"
                  id="dimensions"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none text-gray-900 dark:text-white font-inter transition-colors"
                  placeholder="24 × 36 in"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-inter mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border ${
                    errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none text-gray-900 dark:text-white font-inter transition-colors`}
                  placeholder="Describe your masterpiece, inspiration, techniques used..."
                />
                {errors.description && <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.description}</p>}
              </div>

              <div>
                <label htmlFor="awards" className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-inter mb-1 flex items-center">
                  <FaAward className="mr-2 text-yellow-500" />
                  Awards & Recognitions (comma separated)
                </label>
                <input
                  type="text"
                  id="awards"
                  name="awards"
                  value={formData.awards}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none text-gray-900 dark:text-white font-inter transition-colors"
                  placeholder="Best in Show 2023, Gold Medal 2022"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="isForSale"
                  name="isForSale"
                  type="checkbox"
                  checked={formData.isForSale}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="isForSale" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 font-inter">
                  This masterpiece is for sale
                </label>
              </div>

              <AnimatePresence>
                {formData.isForSale && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-inter mb-1">
                      Price (USD) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500 dark:text-gray-400">$</span>
                      </div>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        className={`w-full pl-8 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border ${
                          errors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none text-gray-900 dark:text-white font-inter transition-colors`}
                        placeholder="2500.00"
                      />
                    </div>
                    {errors.price && <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errors.price}</p>}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Preview Section */}
          <motion.div
            className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white font-Playfair mb-4">Preview</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-600">
              <div className="flex flex-col md:flex-row gap-6">
                {previewImage && (
                  <div className="w-full md:w-1/3">
                    <img
                      src={previewImage}
                      alt="Artwork Preview"
                      className="w-full h-48 object-contain rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white font-Playfair">
                    {formData.title || 'Untitled Masterpiece'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-inter mt-1">
                    {formData.description || 'No description provided'}
                  </p>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 font-inter">
                    <p><span className="font-medium">Medium:</span> {formData.medium || 'Not specified'}</p>
                    <p><span className="font-medium">Year:</span> {formData.yearCreated || 'Not specified'}</p>
                    <p><span className="font-medium">Dimensions:</span> {formData.dimensions || 'Not specified'}</p>
                    {formData.awards && (
                      <p>
                        <span className="font-medium">Awards:</span>{' '}
                        {formData.awards.split(',').map(award => award.trim()).filter(award => award).join(', ') || 'None'}
                      </p>
                    )}
                    {formData.isForSale && (
                      <p>
                        <span className="font-medium">Price:</span>{' '}
                        {formData.price ? `$${parseFloat(formData.price).toFixed(2)}` : 'Not specified'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6">
            <motion.button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-inter font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 flex items-center"
              disabled={uploading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTimes className="mr-2" /> Reset
            </motion.button>
            <motion.button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-inter font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
              disabled={uploading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {uploading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" /> Uploading...
                </>
              ) : (
                <>
                  <FaUpload className="mr-2" /> Upload Masterpiece
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UploadMasterpiece;