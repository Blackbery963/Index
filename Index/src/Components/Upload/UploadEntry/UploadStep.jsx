import React from 'react';
import { IoCloudUploadOutline, IoCheckmarkCircle, IoAdd, IoClose, IoAlertCircle } from 'react-icons/io5';

const UploadStep = ({
  uploadType,
  entry,
  index,
  handleFileChange,
  fileInputRef,
  additionalImagesRef,
  additionalImages,
  handleFileSelect,
  handleAdditionalImagesSelect,
  handleAdditionalImagesChange,
  removeAdditionalImage,
  goToNextStep
}) => {
  
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files?.[0]) {
      handleFileChange(index, files);
      setTimeout(goToNextStep, 500);
    }
  };

  return (
    <div className="space-y-6 ">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-2">
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
        className="glass-card border-2 border-dashed border-white/30 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:border-teal-400/50 hover:shadow-xl"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept={uploadType === 'video' ? "video/*" : "image/*"}
          className="hidden"
        />
        
        {entry.file ? (
          <div className="text-green-400">
            <IoCheckmarkCircle className="mx-auto w-16 h-16 mb-4" />
            <p className="font-semibold text-xl">Main {uploadType === 'video' ? 'Video' : 'Image'} Selected!</p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {entry.file.name} • {(entry.file.size / (1024 * 1024)).toFixed(1)}MB
            </p>
            {entry.file.type.startsWith('image/') && (
              <div className="mt-4 max-w-xs mx-auto">
                <img 
                  src={URL.createObjectURL(entry.file)} 
                  alt="Preview" 
                  className="rounded-lg max-h-40 mx-auto border-2 border-white/20"
                />
              </div>
            )}
          </div>
        ) : (
          <>
            <IoCloudUploadOutline className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {uploadType === 'sell' ? 'Main Product Image' : 'Tap to select file'}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {uploadType === 'video' ? 'All video formats supported • Max 10MB' : 'All image formats supported • Max 10MB'}
            </p>
          </>
        )}
      </div>

      {/* Rest of the component remains the same */}
      {uploadType === 'sell' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Additional Images ({additionalImages.length}/3)
            </label>
            <div className="flex items-center gap-1 text-xs text-amber-500">
              <IoAlertCircle className="w-4 h-4" />
              <span>Recommended for better sales</span>
            </div>
          </div>

          {/* Info box about additional images */}
          {additionalImages.length === 0 && (
            <div className="glass-card bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <IoAlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-300">
                    Add more images to increase sales
                  </p>
                  <p className="text-xs text-blue-400/80 mt-1">
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
                className="aspect-square glass-card border-2 border-dashed border-white/30 rounded-xl flex flex-col items-center justify-center transition-all hover:scale-105 hover:border-teal-400/50"
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
                  className="w-full h-full object-cover rounded-xl glass-card border-2 border-white/20 group-hover:border-teal-400/50 transition-all"
                />
                <button
                  onClick={() => removeAdditionalImage(imgIndex)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                >
                  <IoClose className="w-3 h-3" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 rounded-b-xl backdrop-blur-sm">
                  Photo {imgIndex + 1}
                </div>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: 3 - additionalImages.length - 1 }).map((_, index) => (
              <div key={index} className="aspect-square glass-card border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center">
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
};

export default UploadStep;
