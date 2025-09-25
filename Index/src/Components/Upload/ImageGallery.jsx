// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { IoCloudUploadOutline } from 'react-icons/io5';
// import ImageCard from './ImageCard';
// import { databases, storage, config } from "../../appwriteConfig";

// const ImageGallery = ({
//   isInitialized,
//   searchTag,
//   setSearchTag,
//   handleSearch,
//   myImages,
//   searchedImages,
//   user,
//   setMyImages,
//   setSearchedImages
// }) => {
//   const [editingImage, setEditingImage] = useState(null);
//   const [editForm, setEditForm] = useState({ 
//     title: '', 
//     description: '', 
//     tag: '', 
//     medium: '', 
//     price: '', 
//     awards: [] 
//   });

//   const updateImageMetadata = async (documentId, updates) => {
//     try {
//       const response = await databases.updateDocument(
//         config.databaseId,
//         config.collectionId,
//         documentId,
//         updates
//       );
//       return response;
//     } catch (error) {
//       console.error('Error updating document:', error);
//       throw new Error(`Update failed: ${error.message}`);
//     }
//   };

//   const startEditing = (image) => {
//     if (!isInitialized) {
//       toast.error('Database is not initialized. Please try again later.');
//       return;
//     }

//     if (!user || user.$id !== image.userId) {
//       toast.error('You can only edit your own images');
//       return;
//     }
//     setEditingImage(image.$id);
//     setEditForm({
//       title: image.title,
//       description: image.description,
//       tag: image.tag || '',
//       medium: image.medium,
//       price: image.price || '',
//       awards: Array.isArray(image.awards) ? image.awards : [],
//     });
//   };

//   const handleEditChange = (field, value) => {
//     setEditForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleUpdate = async (documentId) => {
//     if (!isInitialized) {
//       toast.error('Database is not initialized. Please try again later.');
//       return;
//     }

//     try {
//       if (!user || !user.$id) {
//         throw new Error('Please log in to update metadata');
//       }

//       const updates = {
//         title: editForm.title,
//         description: editForm.description,
//         tag: editForm.tag || '',
//         medium: editForm.medium,
//         awards: editForm.awards
//           ? Array.isArray(editForm.awards)
//             ? editForm.awards
//             : editForm.awards.split(',').map(a => a.trim())
//           : [],
//         price: editForm.price ? parseFloat(editForm.price) : null,
//         uploadDate: new Date().toISOString(),
//       };

//       await updateImageMetadata(documentId, updates);

//       const images = await getMyImages();
//       setMyImages(images);
//       setSearchedImages((prev) =>
//         prev.map((img) => (img.$id === documentId ? { ...img, ...updates } : img))
//       );
//       setEditingImage(null);
//       toast.success('Metadata updated successfully!');
//     } catch (error) {
//       toast.error(error.message || 'Failed to update metadata');
//     }
//   };

//   const deleteImage = async (documentId, fileId) => {
//     if (!isInitialized) {
//       toast.error('Database is not initialized. Please try again later.');
//       return;
//     }

//     try {
//       if (!user || !user.$id) {
//         throw new Error('Please log in to delete images');
//       }

//       await databases.deleteDocument(config.databaseId, config.collectionId, documentId);
//       await storage.deleteFile(config.bucketId, fileId);

//       const images = await getMyImages();
//       setMyImages(images);
//       setSearchedImages((prev) => prev.filter(img => img.$id !== documentId));
      
//       toast.success('Creation deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting image:', error);
//       toast.error(error.message || 'Failed to delete creation');
//     }
//   };

//   const calculatePlatformFee = (price) => {
//     const numericPrice = parseFloat(price);
//     if (numericPrice <= 1000) return numericPrice * 0.12;
//     if (numericPrice <= 5000) return numericPrice * 0.08;
//     return numericPrice * 0.06;
//   };

//   return (
//     <div className="w-full max-w-5xl mb-8 px-4">
//       <div className="flex gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search your creations by tag"
//           value={searchTag}
//           onChange={(e) => setSearchTag(e.target.value)}
//           className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
//           disabled={!isInitialized}
//         />
//         <button
//           onClick={handleSearch}
//           className="p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair"
//           disabled={!isInitialized}
//         >
//           Search
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {(searchTag ? searchedImages : myImages).length > 0 ? (
//           (searchTag ? searchedImages : myImages).map((image) => (
//             <ImageCard
//               key={image.$id}
//               image={image}
//               editingImage={editingImage}
//               editForm={editForm}
//               handleEditChange={handleEditChange}
//               startEditing={startEditing}
//               handleUpdate={handleUpdate}
//               deleteImage={deleteImage}
//               setEditingImage={setEditingImage}
//               calculatePlatformFee={calculatePlatformFee}
//               isInitialized={isInitialized}
//               user={user}
//             />
//           ))
//         ) : (
//           <div className="col-span-full text-center py-12">
//             <IoCloudUploadOutline className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
//             <p className="text-gray-600 dark:text-gray-300 font-medium">
//               {searchTag 
//                 ? `No creations found for tag "${searchTag}" in your collection.` 
//                 : 'You have no uploaded creations yet.'}
//             </p>
//             <button
//               onClick={() => setActiveTab('upload')}
//               className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair"
//             >
//               Upload Your First Creation
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;



import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { IoCloudUploadOutline } from 'react-icons/io5';
import ImageCard from './ImageCard';
import { databases, storage, config } from "../../appwriteConfig";
import { Query } from '../../appwriteConfig';

const ImageGallery = ({
  isInitialized,
  searchTag,
  setSearchTag,
  handleSearch,
  myImages,
  searchedImages,
  user,
  setMyImages,
  setSearchedImages,
  // getImageUrl, // New prop from UploadSection
  // getAllImageUrls // New prop from UploadSection
}) => {
  const [editingImage, setEditingImage] = useState(null);
  const [editForm, setEditForm] = useState({ 
    title: '', 
    description: '', 
    tag: '', 
    medium: '', 
    price: '', 
    awards: [] 
  });

  // Function to get image URL for a specific fileId
  const getImageUrl = (fileId) => {
    return `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${config.bucketId}/files/${fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
  };

  // Function to get all image URLs for a creation (main + additional)
  const getAllImageUrls = (image) => {
    if (!image) return [];
    
    const urls = [getImageUrl(image.fileId)];
    
    // Check if there are additional images
    if (image.additionalImageIds && image.additionalImageIds.trim()) {
      const additionalIds = image.additionalImageIds.split(',').filter(id => id.trim());
      additionalIds.forEach(id => {
        urls.push(getImageUrl(id));
      });
    }
    
    return urls;
  };

  // Function to delete all images (main + additional) when deleting a creation
  const deleteAllImages = async (image) => {
    const filesToDelete = [image.fileId];
    
    // Add additional image IDs to delete list
    if (image.additionalImageIds && image.additionalImageIds.trim()) {
      const additionalIds = image.additionalImageIds.split(',').filter(id => id.trim());
      filesToDelete.push(...additionalIds);
    }
    
    // Delete all files from storage
    const deletePromises = filesToDelete.map(fileId => 
      storage.deleteFile(config.bucketId, fileId)
    );
    
    await Promise.all(deletePromises);
  };

  const updateImageMetadata = async (documentId, updates) => {
    try {
      const response = await databases.updateDocument(
        config.databaseId,
        config.collectionId,
        documentId,
        updates
      );
      return response;
    } catch (error) {
      console.error('Error updating document:', error);
      throw new Error(`Update failed: ${error.message}`);
    }
  };

  const startEditing = (image) => {
    if (!isInitialized) {
      toast.error('Database is not initialized. Please try again later.');
      return;
    }

    if (!user || user.$id !== image.userId) {
      toast.error('You can only edit your own images');
      return;
    }
    setEditingImage(image.$id);
    setEditForm({
      title: image.title,
      description: image.description,
      tag: image.tag || '',
      medium: image.medium,
      price: image.price || '',
      awards: Array.isArray(image.awards) ? image.awards : [],
    });
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async (documentId) => {
    if (!isInitialized) {
      toast.error('Database is not initialized. Please try again later.');
      return;
    }

    try {
      if (!user || !user.$id) {
        throw new Error('Please log in to update metadata');
      }

      const updates = {
        title: editForm.title,
        description: editForm.description,
        tag: editForm.tag || '',
        medium: editForm.medium,
        awards: editForm.awards
          ? Array.isArray(editForm.awards)
            ? editForm.awards
            : editForm.awards.split(',').map(a => a.trim())
          : [],
        price: editForm.price ? parseFloat(editForm.price) : null,
        uploadDate: new Date().toISOString(),
        // Preserve additionalImageIds when updating
        ...(myImages.find(img => img.$id === documentId)?.additionalImageIds && {
          additionalImageIds: myImages.find(img => img.$id === documentId).additionalImageIds
        })
      };

      await updateImageMetadata(documentId, updates);

      const images = await getMyImages();
      setMyImages(images);
      setSearchedImages((prev) =>
        prev.map((img) => (img.$id === documentId ? { ...img, ...updates } : img))
      );
      setEditingImage(null);
      toast.success('Metadata updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update metadata');
    }
  };

  const deleteImage = async (documentId, fileId) => {
    if (!isInitialized) {
      toast.error('Database is not initialized. Please try again later.');
      return;
    }

    try {
      if (!user || !user.$id) {
        throw new Error('Please log in to delete images');
      }

      // Find the complete image object to get additional image IDs
      const imageToDelete = myImages.find(img => img.$id === documentId) || 
                           searchedImages.find(img => img.$id === documentId);
      
      if (!imageToDelete) {
        throw new Error('Image not found');
      }

      // Delete document from database
      await databases.deleteDocument(config.databaseId, config.collectionId, documentId);
      
      // Delete all associated files from storage
      await deleteAllImages(imageToDelete);

      // Update state
      const images = await getMyImages();
      setMyImages(images);
      setSearchedImages((prev) => prev.filter(img => img.$id !== documentId));
      
      toast.success('Creation deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error(error.message || 'Failed to delete creation');
    }
  };

  const calculatePlatformFee = (price) => {
    const numericPrice = parseFloat(price);
    if (numericPrice <= 1000) return numericPrice * 0.12;
    if (numericPrice <= 5000) return numericPrice * 0.08;
    return numericPrice * 0.06;
  };

  // Enhanced function to fetch images with additional image data
  const getMyImages = async () => {
    if (!user || !user.$id) return [];
    
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        config.collectionId,
        [
          Query.equal('userId', user.$id),
          Query.orderDesc('uploadDate'),
          Query.limit(50),
          Query.select([
            'title', 'description', 'fileId', 'uploadDate', 'tag', 
            'medium', 'userId', 'price', 'awards', 'fileType',
            'additionalImageIds', 'isForSale'
          ]),
        ]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching user documents:', error);
      toast.error('Failed to fetch your creations.');
      return [];
    }
  };

  // Filter function to show sale items with additional images first
  const sortImages = (images) => {
    return images.sort((a, b) => {
      // Items with additional images and for sale come first
      const aHasAdditional = a.additionalImageIds && a.additionalImageIds.trim();
      const bHasAdditional = b.additionalImageIds && b.additionalImageIds.trim();
      const aIsForSale = !!a.price;
      const bIsForSale = !!b.price;

      if (aHasAdditional && aIsForSale && (!bHasAdditional || !bIsForSale)) return -1;
      if (bHasAdditional && bIsForSale && (!aHasAdditional || !aIsForSale)) return 1;
      
      // Then sort by upload date
      return new Date(b.uploadDate) - new Date(a.uploadDate);
    });
  };

  const displayedImages = searchTag ? searchedImages : myImages;
  const sortedImages = sortImages([...displayedImages]);

  return (
    <div className="w-full max-w-5xl mb-8 px-4">
      {/* Search Section */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search your creations by tag"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 font-medium font-Playfair"
          disabled={!isInitialized}
        />
        <button
          onClick={handleSearch}
          className="p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair whitespace-nowrap"
          disabled={!isInitialized}
        >
          Search
        </button>
      </div>

      {/* Stats Summary */}
      {myImages.length > 0 && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>Total: {myImages.length} creations</span>
            <span>For Sale: {myImages.filter(img => img.price).length}</span>
            <span>
              With Gallery: {myImages.filter(img => img.additionalImageIds && img.additionalImageIds.trim()).length}
            </span>
          </div>
        </div>
      )}

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedImages.length > 0 ? (
          sortedImages.map((image) => (
            <ImageCard
              key={image.$id}
              image={image}
              editingImage={editingImage}
              editForm={editForm}
              handleEditChange={handleEditChange}
              startEditing={startEditing}
              handleUpdate={handleUpdate}
              deleteImage={deleteImage}
              setEditingImage={setEditingImage}
              calculatePlatformFee={calculatePlatformFee}
              isInitialized={isInitialized}
              user={user}
              getImageUrl={getImageUrl} // Pass to ImageCard
              getAllImageUrls={getAllImageUrls} // Pass to ImageCard
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <IoCloudUploadOutline className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              {searchTag 
                ? `No creations found for tag "${searchTag}" in your collection.` 
                : 'You have no uploaded creations yet.'}
            </p>
            <button
              onClick={() => window.dispatchEvent(new Event('tabChange', { detail: 'upload' }))}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 font-Playfair"
            >
              Upload Your First Creation
            </button>
          </div>
        )}
      </div>

      {/* Additional Images Info */}
      {sortedImages.some(img => img.additionalImageIds && img.additionalImageIds.trim()) && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-blue-600 dark:text-blue-400 text-sm text-center">
            💫 Items with <span className="font-semibold">multiple images</span> show a gallery slider. 
            Click the arrows to view different angles!
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;