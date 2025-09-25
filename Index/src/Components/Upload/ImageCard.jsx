// import React from 'react';


// // const VITE_APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
// // const VITE_APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

// const config = {
//   bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
// };

// const ImageCard = ({
//   image,
//   editingImage,
//   editForm,
//   handleEditChange,
//   startEditing,
//   handleUpdate,
//   deleteImage,
//   setEditingImage,
//   calculatePlatformFee,
//   isInitialized,
//   user
// }) => {
//   return (
//     <div className="bg-white dark:bg-gray-800/90 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
//       {/* {editingImage === image.$id ? ( */}
//       {/* // In the ImageCard component, update the media display: */}
// {editingImage !== image.$id && (
//   <>
//     {image.fileId && (
//       <>
//         {image.fileType === 'video' ? (
//           <video 
//             className="w-full h-48 object-cover rounded-lg mb-4"
//             controls
//           >
//             <source 
//               src={`${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${config.bucketId}/files/${image.fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`} 
//               type="video/mp4" 
//             />
//             Your browser does not support the video tag.
//           </video>
//         ) : (
//           <img
//             src={`${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${config.bucketId}/files/${image.fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`}
//             alt={image.title}
//             className="w-full h-48 object-cover rounded-lg mb-4"
//           />
//         )}
//       </>
//     )}
//     {/* ... rest of the component */}
//   </>
// )}
//         <div className="space-y-4">
//           <input
//             type="text"
//             value={editForm.title}
//             onChange={(e) => handleEditChange('title', e.target.value)}
//             placeholder="Title"
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//           />
//           <textarea
//             value={editForm.description}
//             onChange={(e) => handleEditChange('description', e.target.value)}
//             placeholder="Description"
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//             rows="3"
//           />
//           <input
//             type="text"
//             value={editForm.tag}
//             onChange={(e) => handleEditChange('tag', e.target.value)}
//             placeholder="Tag"
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//           />
//           <input
//             type="text"
//             value={editForm.awards}
//             onChange={(e) => handleEditChange('awards', e.target.value)}
//             placeholder="Awards & Recognition"
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//           />
//           <input
//             type="number"
//             value={editForm.price}
//             onChange={(e) => handleEditChange('price', e.target.value)}
//             placeholder="Price (INR)"
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//             min="0"
//             step="0.01"
//           />
//           <div className="flex gap-2">
//             <button
//               onClick={() => handleUpdate(image.$id)}
//               className="w-full p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair"
//             >
//               Save
//             </button>
//             <button
//               onClick={() => setEditingImage(null)}
//               className="w-full p-3 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-all duration-300 font-Playfair"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <img
//             src={`${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${config.bucketId}/files/${image.fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`}
//             alt={image.title}
//             className="w-full h-48 object-cover rounded-lg mb-4"
//           />
//           <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 font-Playfair">
//             {image.title}
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{image.description}</p>
//           <p className="text-gray-500 dark:text-gray-400 text-sm">
//             Type: {image.medium}
//           </p>
//           <p className="text-gray-500 dark:text-gray-400 text-sm">
//             Category: {image.tag || 'not specified'}
//           </p>
//           {image.price && (
//             <div className="mt-2">
//               <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm">
//                 Price: ₹{image.price}
//               </p>
//               <p className="text-gray-500 dark:text-gray-400 text-xs">
//                 Platform fee: ₹{calculatePlatformFee(image.price).toFixed(2)}
//               </p>
//             </div>
//           )}
//           {image.awards && (
//             <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
//               Awards: {image.awards}
//             </p>
//           )}
//           <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
//             Uploaded: {new Date(image.uploadDate).toLocaleDateString()}
//           </p>
//           <div className="flex gap-2 mt-4">
//             <button
//               onClick={() => startEditing(image)}
//               className="flex-1 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair text-sm"
//               disabled={!isInitialized}
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => deleteImage(image.$id, image.fileId)}
//               className="flex-1 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-Playfair text-sm"
//               disabled={!isInitialized}
//             >
//               Delete
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ImageCard;



// import React from 'react';

// const config = {
//   bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
// };

// const ImageCard = ({
//   image,
//   editingImage,
//   editForm,
//   handleEditChange,
//   startEditing,
//   handleUpdate,
//   deleteImage,
//   setEditingImage,
//   calculatePlatformFee,
//   isInitialized,
// }) => {
//   const fileUrl = `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${config.bucketId}/files/${image.fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;

//   return (
//     <div className="bg-white dark:bg-gray-800/90 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
//       {editingImage === image.$id ? (
//         // --- Edit Mode ---
//         <div className="space-y-4">
//           <input
//             type="text"
//             value={editForm.title}
//             onChange={(e) => handleEditChange('title', e.target.value)}
//             placeholder="Title"
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//           />
//           <textarea
//             value={editForm.description}
//             onChange={(e) => handleEditChange('description', e.target.value)}
//             placeholder="Description"
//             rows="3"
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//           />
//           <input
//             type="text"
//             value={editForm.tag}
//             onChange={(e) => handleEditChange('tag', e.target.value)}
//             placeholder="Tag"
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//           />
//           <input
//             type="text"
//             value={editForm.awards}
//             onChange={(e) => handleEditChange('awards', e.target.value)}
//             placeholder="Awards & Recognition"
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//           />
//           <input
//             type="number"
//             value={editForm.price}
//             onChange={(e) => handleEditChange('price', e.target.value)}
//             placeholder="Price (INR)"
//             min="0"
//             step="0.01"
//             className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
//           />
//           <div className="flex gap-2">
//             <button
//               onClick={() => handleUpdate(image.$id)}
//               className="w-full p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair"
//             >
//               Save
//             </button>
//             <button
//               onClick={() => setEditingImage(null)}
//               className="w-full p-3 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-all duration-300 font-Playfair"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         // --- View Mode ---
//         <>
//           {image.fileId &&
//             (image.fileType === 'video' ? (
//               <video className="w-full h-48 object-cover rounded-lg mb-4" controls>
//                 <source src={fileUrl} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             ) : (
//               <img
//                 src={fileUrl}
//                 alt={image.title}
//                 className="w-full h-48 object-cover rounded-lg mb-4"
//               />
//             ))}

//           <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 font-Playfair">
//             {image.title}
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
//             {image.description}
//           </p>
//           <p className="text-gray-500 dark:text-gray-400 text-sm">
//             Type: {image.medium}
//           </p>
//           <p className="text-gray-500 dark:text-gray-400 text-sm">
//             Category: {image.tag || 'not specified'}
//           </p>

//           {image.price && (
//             <div className="mt-2">
//               <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm">
//                 Price: ₹{image.price}
//               </p>
//               <p className="text-gray-500 dark:text-gray-400 text-xs">
//                 Platform fee: ₹{calculatePlatformFee(image.price).toFixed(2)}
//               </p>
//             </div>
//           )}

//           {image.awards && (
//             <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
//               Awards: {image.awards}
//             </p>
//           )}

//           <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
//             Uploaded: {new Date(image.uploadDate).toLocaleDateString()}
//           </p>

//           <div className="flex gap-2 mt-4">
//             <button
//               onClick={() => startEditing(image)}
//               className="flex-1 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair text-sm"
//               disabled={!isInitialized}
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => deleteImage(image.$id, image.fileId)}
//               className="flex-1 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-Playfair text-sm"
//               disabled={!isInitialized}
//             >
//               Delete
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ImageCard;


import React, { useState } from 'react';
import { IoChevronForward, IoChevronBack, IoImages, IoPricetag } from 'react-icons/io5';

const config = {
  bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

const ImageCard = ({
  image,
  editingImage,
  editForm,
  handleEditChange,
  startEditing,
  handleUpdate,
  deleteImage,
  setEditingImage,
  calculatePlatformFee,
  isInitialized,
  getAllImageUrls, // New prop to get all image URLs
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get all image URLs including additional images
  const allImageUrls = getAllImageUrls ? getAllImageUrls(image) : [];
  const hasAdditionalImages = allImageUrls.length > 1;
  const isForSale = !!image.price;

  const getImageUrl = (fileId) => {
    return `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${config.bucketId}/files/${fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
  };

  const mainImageUrl = getImageUrl(image.fileId);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImageUrls.length) % allImageUrls.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="bg-white dark:bg-gray-800/90 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      {editingImage === image.$id ? (
        // --- Edit Mode ---
        <div className="space-y-4">
          <input
            type="text"
            value={editForm.title}
            onChange={(e) => handleEditChange('title', e.target.value)}
            placeholder="Title"
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
          />
          <textarea
            value={editForm.description}
            onChange={(e) => handleEditChange('description', e.target.value)}
            placeholder="Description"
            rows="3"
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
          />
          <input
            type="text"
            value={editForm.tag}
            onChange={(e) => handleEditChange('tag', e.target.value)}
            placeholder="Tag"
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
          />
          <input
            type="text"
            value={editForm.awards}
            onChange={(e) => handleEditChange('awards', e.target.value)}
            placeholder="Awards & Recognition"
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
          />
          <input
            type="number"
            value={editForm.price}
            onChange={(e) => handleEditChange('price', e.target.value)}
            placeholder="Price (INR)"
            min="0"
            step="0.01"
            className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-medium font-Playfair"
          />
          <div className="flex gap-2">
            <button
              onClick={() => handleUpdate(image.$id)}
              className="w-full p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair"
            >
              Save
            </button>
            <button
              onClick={() => setEditingImage(null)}
              className="w-full p-3 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-all duration-300 font-Playfair"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // --- View Mode ---
        <>
          {/* Image/Video Display with Slider */}
          <div className="relative mb-4">
            {image.fileId && (
              <div className="relative rounded-lg overflow-hidden">
                {image.fileType === 'video' ? (
                  <video className="w-full h-48 object-cover" controls>
                    <source src={mainImageUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <>
                    <img
                      src={allImageUrls[currentImageIndex] || mainImageUrl}
                      alt={image.title}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* Image Counter Badge */}
                    {hasAdditionalImages && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <IoImages className="w-3 h-3" />
                        <span>{currentImageIndex + 1}/{allImageUrls.length}</span>
                      </div>
                    )}
                    
                    {/* Sale Badge */}
                    {isForSale && (
                      <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <IoPricetag className="w-3 h-3" />
                        <span>For Sale</span>
                      </div>
                    )}

                    {/* Navigation Arrows */}
                    {hasAdditionalImages && allImageUrls.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all"
                        >
                          <IoChevronBack className="w-4 h-4" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all"
                        >
                          <IoChevronForward className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Thumbnail Dots Indicator */}
            {hasAdditionalImages && allImageUrls.length > 1 && (
              <div className="flex justify-center mt-2 space-x-1">
                {allImageUrls.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-teal-500' 
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-teal-300'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Thumbnail Strip (Alternative to dots) */}
            {hasAdditionalImages && allImageUrls.length > 1 && (
              <div className="flex justify-center mt-2 space-x-1 overflow-x-auto py-1">
                {allImageUrls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-12 h-12 border-2 rounded-lg overflow-hidden transition-all ${
                      index === currentImageIndex 
                        ? 'border-teal-500' 
                        : 'border-transparent hover:border-teal-300'
                    }`}
                  >
                    <img
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content Details */}
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 font-Playfair mb-2">
            {image.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
            {image.description}
          </p>
          
          <div className="space-y-1 text-sm">
            <p className="text-gray-500 dark:text-gray-400">
              <span className="font-medium">Type:</span> {image.medium}
            </p>
            
            <p className="text-gray-500 dark:text-gray-400">
              <span className="font-medium">Category:</span> {image.tag || 'Not specified'}
            </p>

            {image.awards && (
              <p className="text-gray-500 dark:text-gray-400">
                <span className="font-medium">Awards:</span> {image.awards}
              </p>
            )}

            {isForSale && (
              <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-green-700 dark:text-green-300 font-semibold">
                  ₹{image.price}
                </p>
                <p className="text-green-600 dark:text-green-400 text-xs">
                  Platform fee: ₹{calculatePlatformFee(image.price).toFixed(2)}
                </p>
                {hasAdditionalImages && (
                  <p className="text-green-600 dark:text-green-400 text-xs mt-1">
                    {allImageUrls.length - 1} additional image{allImageUrls.length - 1 !== 1 ? 's' : ''} available
                  </p>
                )}
              </div>
            )}

            <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
              Uploaded: {new Date(image.uploadDate).toLocaleDateString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => startEditing(image)}
              className="flex-1 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair text-sm"
              disabled={!isInitialized}
            >
              Edit
            </button>
            <button
              onClick={() => deleteImage(image.$id, image.fileId)}
              className="flex-1 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-Playfair text-sm"
              disabled={!isInitialized}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCard;