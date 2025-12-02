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
import UploadProgress from './UploadProgress';
import TypeStep from './TypeStep';
import UploadStep from './UploadStep';
import DetailsStep from './DetailsStep';
import ReviewStep from './ReviewStep';
import { artCategories, dangerousExtensions } from './constants';

const UploadEntry = ({ index, entry, updateEntry, handleFileChange, handleEntryUpload, uploading }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadType, setUploadType] = useState('normal');
  const [customTag, setCustomTag] = useState('');
  const [specialReason, setSpecialReason] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);
  const fileInputRef = useRef(null);
  const additionalImagesRef = useRef(null);

  const steps = [
    { number: 1, title: 'Type', description: 'Choose content type' },
    { number: 2, title: 'Upload', description: 'Add your file' },
    { number: 3, title: 'Details', description: 'Add information' },
    { number: 4, title: 'Review', description: 'Confirm & share' }
  ];

  // Security check function
  const isFileSecure = (file) => {
    const fileName = file.name.toLowerCase();
    const fileExtension = '.' + fileName.split('.').pop();
    
    if (dangerousExtensions.includes(fileExtension)) {
      return false;
    }
    
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      return true;
    }
    
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
      if (!isFileSecure(file)) {
        toast.error('File type not allowed for security reasons');
        return false;
      }
      
      const isUnderSize = file.size <= 10 * 1024 * 1024;
      if (!isUnderSize) {
        toast.error('File size must be under 10MB');
        return false;
      }
      
      return true;
    });

    const newImages = [...additionalImages, ...validFiles].slice(0, 3);
    setAdditionalImages(newImages);
    
    if (additionalImagesRef.current) {
      additionalImagesRef.current.value = '';
    }
  };

  const removeAdditionalImage = (indexToRemove) => {
    setAdditionalImages(additionalImages.filter((_, index) => index !== indexToRemove));
  };

  const handleTypeSelect = (type) => {
    setUploadType(type);
    if (type !== 'sell') {
      setAdditionalImages([]);
    }
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

  const renderStepContent = () => {
    const stepProps = {
      uploadType,
      entry,
      index,
      updateEntry,
      handleFileChange,
      fileInputRef,
      additionalImagesRef,
      additionalImages,
      handleFileSelect,
      handleAdditionalImagesSelect,
      handleAdditionalImagesChange,
      removeAdditionalImage,
      handleTypeSelect,
      customTag,
      setCustomTag,
      addCustomTag,
      removeTag,
      handleSpecialToggle,
      specialReason,
      setSpecialReason,
      artCategories,
      goToNextStep
    };

    switch (currentStep) {
      case 1: return <TypeStep {...stepProps} />;
      case 2: return <UploadStep {...stepProps} />;
      case 3: return <DetailsStep {...stepProps} />;
      case 4: return <ReviewStep {...stepProps} />;
      default: return <TypeStep {...stepProps} />;
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
      <UploadProgress 
        steps={steps} 
        currentStep={currentStep} 
        handleFileChange={(index, file) => {
    // Your logic to update state
    setEntries(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], file };
      return updated;
    });
  }}
      />

      {/* Step Content */}
      <div className="min-h-[400px] glass-card rounded-lg p-2 backdrop-blur-lg min-w-full">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-white/20">
        <button
          onClick={goToPrevStep}
          disabled={currentStep === 1}
          className="glass-button px-6 dark:text-white py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all hover:scale-105"
        >
          <IoChevronBack /> Back
        </button>

        {currentStep < 4 ? (
          <button
            onClick={goToNextStep}
            disabled={!isStepComplete()}
            className="gradient-button px-6 py-3 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all hover:scale-105"
          >
            Next <IoChevronForward />
          </button>
        ) : (
          <button
            onClick={handleUploadWithAdditionalImages}
            disabled={uploading || !isStepComplete()}
            className="success-button px-6 py-3 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all hover:scale-105"
          >
            {uploading ? 'Uploading...' : `Share ${uploadType === 'sell' ? 'Product' : 'Creation'}`}
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadEntry;