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