// src/utils/fileUpload.js
import { storage, ID, BUCKET_ID } from './appwrite.config';

/**
 * Upload file to Appwrite storage with progress tracking
 */
export const uploadFileWithProgress = async (file, onProgress = null) => {
  try {
    const fileId = ID.unique();
    
    const response = await storage.createFile(
      BUCKET_ID,
      fileId,
      file
    );

    // Get file preview URL
    const fileUrl = storage.getFilePreview(BUCKET_ID, response.$id);
    
    return {
      fileId: response.$id,
      url: fileUrl,
      name: file.name,
      size: file.size,
      type: file.type
    };
  } catch (error) {
    console.error('File upload error:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

/**
 * Upload multiple files
 */
export const uploadMultipleFiles = async (files, onProgress = null) => {
  const uploadPromises = files.map(file => uploadFileWithProgress(file, onProgress));
  return Promise.all(uploadPromises);
};

/**
 * Delete file from storage
 */
export const deleteFile = async (fileId) => {
  try {
    await storage.deleteFile(BUCKET_ID, fileId);
    return true;
  } catch (error) {
    console.error('File deletion error:', error);
    throw new Error(`Delete failed: ${error.message}`);
  }
};

/**
 * Get file URL
 */
export const getFileUrl = (fileId) => {
  return storage.getFilePreview(BUCKET_ID, fileId);
};

/**
 * Get file download URL
 */
export const getFileDownloadUrl = (fileId) => {
  return storage.getFileDownload(BUCKET_ID, fileId);
};

/**
 * Validate file type and size
 */
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
  } = options;

  const errors = [];

  // Check file size
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${maxSize / 1024 / 1024}MB`);
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type not supported. Allowed: ${allowedTypes.join(', ')}`);
  }

  // Check file extension
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    errors.push(`File extension not supported. Allowed: ${allowedExtensions.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Compress image before upload
 */
export const compressImage = (file, quality = 0.8, maxWidth = 1200) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    reader.onload = (e) => {
      img.onload = () => {
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            }));
          },
          'image/jpeg',
          quality
        );
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Generate thumbnail from file
 */
export const generateThumbnail = (file, width = 200, height = 200) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = width;
    canvas.height = height;

    reader.onload = (e) => {
      img.onload = () => {
        // Draw image centered and cropped
        const scale = Math.max(width / img.width, height / img.height);
        const x = (width - img.width * scale) / 2;
        const y = (height - img.height * scale) / 2;
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        
        canvas.toBlob((blob) => {
          resolve(new File([blob], `thumb_${file.name}`, {
            type: 'image/jpeg'
          }));
        }, 'image/jpeg', 0.7);
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
};