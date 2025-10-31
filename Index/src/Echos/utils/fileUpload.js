// // src/utils/fileUpload.js
// import { storage, ID, BUCKET_ID } from './appwrite.config';

// // Supported formats
// const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
// const SUPPORTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
// const SUPPORTED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

// const ALLOWED_TYPES = [...SUPPORTED_IMAGE_TYPES, ...SUPPORTED_VIDEO_TYPES, ...SUPPORTED_AUDIO_TYPES];
// const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// /**
//  * Upload file to Appwrite storage
//  */
// export const uploadFileWithProgress = async (file, onProgress = null) => {
//   try {
//     // Validate file first
//     const validation = validateFile(file);
//     if (!validation.isValid) {
//       throw new Error(validation.errors[0]);
//     }

//     const fileId = ID.unique();
    
//     const response = await storage.createFile(
//       BUCKET_ID,
//       fileId,
//       file
//     );

//     // Get file preview URL
//     const fileUrl = storage.getFilePreview(BUCKET_ID, response.$id);
    
//     return {
//       fileId: response.$id,
//       url: fileUrl,
//       name: file.name,
//       size: file.size,
//       type: file.type,
//       mediaType: getMediaType(file.type)
//     };
//   } catch (error) {
//     console.error('File upload error:', error);
//     throw new Error(`Upload failed: ${error.message}`);
//   }
// };

// /**
//  * Upload multiple files
//  */
// export const uploadMultipleFiles = async (files, onProgress = null) => {
//   const uploadPromises = files.map(file => uploadFileWithProgress(file, onProgress));
//   return Promise.all(uploadPromises);
// };

// /**
//  * Delete file from storage
//  */
// export const deleteFile = async (fileId) => {
//   try {
//     await storage.deleteFile(BUCKET_ID, fileId);
//     return true;
//   } catch (error) {
//     console.error('File deletion error:', error);
//     throw new Error(`Delete failed: ${error.message}`);
//   }
// };

// /**
//  * Get file URL
//  */
// export const getFileUrl = (fileId) => {
//   return storage.getFilePreview(BUCKET_ID, fileId);
// };

// /**
//  * Get file download URL
//  */
// export const getFileDownloadUrl = (fileId) => {
//   return storage.getFileDownload(BUCKET_ID, fileId);
// };

// /**
//  * Validate file type and size
//  */
// export const validateFile = (file, options = {}) => {
//   const {
//     maxSize = MAX_FILE_SIZE,
//     allowedTypes = ALLOWED_TYPES
//   } = options;

//   const errors = [];

//   // Check file size
//   if (file.size > maxSize) {
//     errors.push(`File size must be less than ${maxSize / 1024 / 1024}MB`);
//   }

//   // Check file type
//   if (!allowedTypes.includes(file.type)) {
//     errors.push(`File type not supported. Allowed: Images (JPEG, PNG, WebP, GIF), Videos (MP4, WebM, OGG)`);
//   }

//   return {
//     isValid: errors.length === 0,
//     errors
//   };
// };

// /**
//  * Get media type from file type
//  */
// export const getMediaType = (fileType) => {
//   if (fileType.startsWith('image/')) return 'image';
//   if (fileType.startsWith('video/')) return 'video';
//   if (fileType.startsWith('audio/')) return 'audio';
//   return 'file';
// };

// /**
//  * Compress image before upload (using browser canvas)
//  */
// export const compressImage = (file, quality = 0.7, maxWidth = 1200, maxHeight = 1200) => {
//   return new Promise((resolve, reject) => {
//     if (!file.type.startsWith('image/')) {
//       resolve(file); // Return original if not image
//       return;
//     }

//     const reader = new FileReader();
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     const img = new Image();

//     reader.onload = (e) => {
//       img.onload = () => {
//         try {
//           // Calculate new dimensions while maintaining aspect ratio
//           let width = img.width;
//           let height = img.height;

//           if (width > maxWidth || height > maxHeight) {
//             const ratio = Math.min(maxWidth / width, maxHeight / height);
//             width = Math.floor(width * ratio);
//             height = Math.floor(height * ratio);
//           }

//           canvas.width = width;
//           canvas.height = height;

//           // Set higher quality settings
//           ctx.imageSmoothingEnabled = true;
//           ctx.imageSmoothingQuality = 'high';
          
//           // Draw and compress
//           ctx.drawImage(img, 0, 0, width, height);
          
//           canvas.toBlob(
//             (blob) => {
//               if (!blob) {
//                 reject(new Error('Image compression failed'));
//                 return;
//               }
              
//               const compressedFile = new File([blob], file.name, {
//                 type: 'image/jpeg', // Always convert to JPEG for better compression
//                 lastModified: Date.now()
//               });
              
//               console.log(`Image compressed: ${file.size} → ${compressedFile.size} bytes (${Math.round((compressedFile.size / file.size) * 100)}%)`);
//               resolve(compressedFile);
//             },
//             'image/jpeg',
//             quality
//           );
//         } catch (error) {
//           reject(error);
//         }
//       };
      
//       img.onerror = () => reject(new Error('Failed to load image'));
//       img.src = e.target.result;
//     };

//     reader.onerror = () => reject(new Error('Failed to read file'));
//     reader.readAsDataURL(file);
//   });
// };

// /**
//  * Compress video before upload (reduces quality and size)
//  */
// export const compressVideo = (file, quality = 0.7, maxWidth = 720) => {
//   return new Promise((resolve, reject) => {
//     if (!file.type.startsWith('video/')) {
//       resolve(file); // Return original if not video
//       return;
//     }

//     const video = document.createElement('video');
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     const chunks = [];
    
//     video.preload = 'metadata';
    
//     video.onloadedmetadata = () => {
//       try {
//         // Calculate dimensions while maintaining aspect ratio
//         let width = video.videoWidth;
//         let height = video.videoHeight;
        
//         if (width > maxWidth) {
//           const ratio = maxWidth / width;
//           width = maxWidth;
//           height = Math.floor(height * ratio);
//         }
        
//         canvas.width = width;
//         canvas.height = height;
        
//         // Set up media recorder with lower quality
//         const stream = canvas.captureStream();
//         const recorder = new MediaRecorder(stream, {
//           mimeType: 'video/webm;codecs=vp9',
//           videoBitsPerSecond: 500000 // 500kbps for good compression
//         });
        
//         video.oncanplay = () => {
//           video.currentTime = 0;
//         };
        
//         video.onseeked = () => {
//           ctx.drawImage(video, 0, 0, width, height);
//         };
        
//         let currentTime = 0;
//         const captureFrame = () => {
//           if (currentTime >= video.duration) {
//             recorder.stop();
//             return;
//           }
          
//           video.currentTime = currentTime;
//           currentTime += 0.1; // Capture 10 frames per second
//         };
        
//         video.onseeked = () => {
//           ctx.drawImage(video, 0, 0, width, height);
//           captureFrame();
//         };
        
//         recorder.ondataavailable = (e) => {
//           if (e.data.size > 0) {
//             chunks.push(e.data);
//           }
//         };
        
//         recorder.onstop = () => {
//           const compressedBlob = new Blob(chunks, { type: 'video/webm' });
//           const compressedFile = new File([compressedBlob], file.name.replace(/\.[^/.]+$/, ".webm"), {
//             type: 'video/webm',
//             lastModified: Date.now()
//           });
          
//           console.log(`Video compressed: ${file.size} → ${compressedFile.size} bytes (${Math.round((compressedFile.size / file.size) * 100)}%)`);
//           resolve(compressedFile);
//         };
        
//         recorder.start();
//         captureFrame();
        
//       } catch (error) {
//         reject(error);
//       }
//     };
    
//     video.onerror = () => reject(new Error('Failed to load video'));
//     video.src = URL.createObjectURL(file);
//   });
// };

// /**
//  * Smart compressor - automatically chooses the right compression method
//  */
// export const compressFile = async (file, options = {}) => {
//   const {
//     imageQuality = 0.7,
//     videoQuality = 0.7,
//     maxImageWidth = 1200,
//     maxVideoWidth = 720,
//     maxFileSize = MAX_FILE_SIZE
//   } = options;

//   // If file is already small enough, return as is
//   if (file.size <= maxFileSize * 0.8) { // 80% of max size
//     return file;
//   }

//   try {
//     if (file.type.startsWith('image/')) {
//       return await compressImage(file, imageQuality, maxImageWidth);
//     } else if (file.type.startsWith('video/')) {
//       return await compressVideo(file, videoQuality, maxVideoWidth);
//     } else {
//       return file; // Return original for unsupported types
//     }
//   } catch (error) {
//     console.warn('Compression failed, using original file:', error);
//     return file; // Return original if compression fails
//   }
// };

// /**
//  * Generate thumbnail from file
//  */
// export const generateThumbnail = (file, width = 200, height = 200) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     const img = new Image();

//     canvas.width = width;
//     canvas.height = height;

//     reader.onload = (e) => {
//       img.onload = () => {
//         try {
//           // Draw image centered and cropped
//           const scale = Math.max(width / img.width, height / img.height);
//           const x = (width - img.width * scale) / 2;
//           const y = (height - img.height * scale) / 2;
          
//           ctx.imageSmoothingEnabled = true;
//           ctx.imageSmoothingQuality = 'high';
//           ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          
//           canvas.toBlob((blob) => {
//             if (!blob) {
//               reject(new Error('Thumbnail generation failed'));
//               return;
//             }
            
//             resolve(new File([blob], `thumb_${file.name}`, {
//               type: 'image/jpeg'
//             }));
//           }, 'image/jpeg', 0.7);
//         } catch (error) {
//           reject(error);
//         }
//       };
//       img.onerror = () => reject(new Error('Failed to load image for thumbnail'));
//       img.src = e.target.result;
//     };

//     reader.onerror = () => reject(new Error('Failed to read file for thumbnail'));
//     reader.readAsDataURL(file);
//   });
// };

// /**
//  * Get video thumbnail (first frame)
//  */
// export const getVideoThumbnail = (file, width = 200, height = 200) => {
//   return new Promise((resolve, reject) => {
//     const video = document.createElement('video');
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');

//     video.preload = 'metadata';
    
//     video.onloadedmetadata = () => {
//       try {
//         // Set canvas dimensions
//         canvas.width = width;
//         canvas.height = height;
        
//         // Capture first frame
//         video.currentTime = 0.1; // Small offset to ensure frame is loaded
        
//         video.onseeked = () => {
//           ctx.drawImage(video, 0, 0, width, height);
          
//           canvas.toBlob((blob) => {
//             if (!blob) {
//               reject(new Error('Video thumbnail generation failed'));
//               return;
//             }
            
//             resolve(new File([blob], `thumb_${file.name.replace(/\.[^/.]+$/, ".jpg")}`, {
//               type: 'image/jpeg'
//             }));
//           }, 'image/jpeg', 0.7);
//         };
//       } catch (error) {
//         reject(error);
//       }
//     };
    
//     video.onerror = () => reject(new Error('Failed to load video for thumbnail'));
//     video.src = URL.createObjectURL(file);
//   });
// };

// /**
//  * Utility to get file preview (for UI)
//  */
// export const getFilePreview = (file) => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.onload = (e) => resolve(e.target.result);
//     reader.readAsDataURL(file);
//   });
// };

// export {
//   SUPPORTED_IMAGE_TYPES,
//   SUPPORTED_VIDEO_TYPES,
//   SUPPORTED_AUDIO_TYPES,
//   ALLOWED_TYPES,
//   MAX_FILE_SIZE
// };


// src/utils/fileUpload.js
import { storage, ID, BUCKET_ID } from './appwrite.config';

// Supported formats
const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const SUPPORTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
const SUPPORTED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

const ALLOWED_TYPES = [...SUPPORTED_IMAGE_TYPES, ...SUPPORTED_VIDEO_TYPES, ...SUPPORTED_AUDIO_TYPES];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Upload file to Appwrite storage
 */
export const uploadFileWithProgress = async (file, onProgress = null) => {
  try {
    // Validate file first
    const validation = validateFile(file);
    if (!validation.isValid) {
      throw new Error(validation.errors[0]);
    }

    const fileId = ID.unique();
    
    const response = await storage.createFile(
      BUCKET_ID,
      fileId,
      file
    );

    // Get appropriate URL based on media type
    let fileUrl;
    const mediaType = getMediaType(file.type);
    
    if (mediaType === 'video' || mediaType === 'audio') {
      // Use view URL for videos and audio (direct playback)
      fileUrl = storage.getFileView(BUCKET_ID, response.$id);
    } else {
      // Use preview URL for images (optimized)
      fileUrl = storage.getFilePreview(BUCKET_ID, response.$id);
    }
    
    return {
      fileId: response.$id,
      url: fileUrl,
      name: file.name,
      size: file.size,
      type: file.type,
      mediaType
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
    maxSize = MAX_FILE_SIZE,
    allowedTypes = ALLOWED_TYPES
  } = options;

  const errors = [];

  // Check file size
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${maxSize / 1024 / 1024}MB`);
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type not supported. Allowed: Images (JPEG, PNG, WebP, GIF), Videos (MP4, WebM, OGG)`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Get media type from file type
 */
export const getMediaType = (fileType) => {
  if (fileType.startsWith('image/')) return 'image';
  if (fileType.startsWith('video/')) return 'video';
  if (fileType.startsWith('audio/')) return 'audio';
  return 'file';
};

/**
 * Compress image before upload (using browser canvas)
 */
export const compressImage = (file, quality = 0.7, maxWidth = 1200, maxHeight = 1200) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      resolve(file); // Return original if not image
      return;
    }

    const reader = new FileReader();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    reader.onload = (e) => {
      img.onload = () => {
        try {
          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.floor(width * ratio);
            height = Math.floor(height * ratio);
          }

          canvas.width = width;
          canvas.height = height;

          // Set higher quality settings
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Image compression failed'));
                return;
              }
              
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg', // Always convert to JPEG for better compression
                lastModified: Date.now()
              });
              
              console.log(`Image compressed: ${file.size} → ${compressedFile.size} bytes (${Math.round((compressedFile.size / file.size) * 100)}%)`);
              resolve(compressedFile);
            },
            'image/jpeg',
            quality
          );
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target.result;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Compress video before upload (reduces quality and size)
 */
export const compressVideo = (file, quality = 0.7, maxWidth = 720) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('video/')) {
      resolve(file); // Return original if not video
      return;
    }

    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const chunks = [];
    
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      try {
        // Calculate dimensions while maintaining aspect ratio
        let width = video.videoWidth;
        let height = video.videoHeight;
        
        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = Math.floor(height * ratio);
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Set up media recorder with lower quality
        const stream = canvas.captureStream();
        const recorder = new MediaRecorder(stream, {
          mimeType: 'video/webm;codecs=vp9',
          videoBitsPerSecond: 500000 // 500kbps for good compression
        });
        
        video.oncanplay = () => {
          video.currentTime = 0;
        };
        
        video.onseeked = () => {
          ctx.drawImage(video, 0, 0, width, height);
        };
        
        let currentTime = 0;
        const captureFrame = () => {
          if (currentTime >= video.duration) {
            recorder.stop();
            return;
          }
          
          video.currentTime = currentTime;
          currentTime += 0.1; // Capture 10 frames per second
        };
        
        video.onseeked = () => {
          ctx.drawImage(video, 0, 0, width, height);
          captureFrame();
        };
        
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
        };
        
        recorder.onstop = () => {
          const compressedBlob = new Blob(chunks, { type: 'video/webm' });
          const compressedFile = new File([compressedBlob], file.name.replace(/\.[^/.]+$/, ".webm"), {
            type: 'video/webm',
            lastModified: Date.now()
          });
          
          console.log(`Video compressed: ${file.size} → ${compressedFile.size} bytes (${Math.round((compressedFile.size / file.size) * 100)}%)`);
          resolve(compressedFile);
        };
        
        recorder.start();
        captureFrame();
        
      } catch (error) {
        reject(error);
      }
    };
    
    video.onerror = () => reject(new Error('Failed to load video'));
    video.src = URL.createObjectURL(file);
  });
};

/**
 * Smart compressor - automatically chooses the right compression method
 */
export const compressFile = async (file, options = {}) => {
  const {
    imageQuality = 0.7,
    videoQuality = 0.7,
    maxImageWidth = 1200,
    maxVideoWidth = 720,
    maxFileSize = MAX_FILE_SIZE
  } = options;

  // If file is already small enough, return as is
  if (file.size <= maxFileSize * 0.8) { // 80% of max size
    return file;
  }

  try {
    if (file.type.startsWith('image/')) {
      return await compressImage(file, imageQuality, maxImageWidth);
    } else if (file.type.startsWith('video/')) {
      return await compressVideo(file, videoQuality, maxVideoWidth);
    } else {
      return file; // Return original for unsupported types
    }
  } catch (error) {
    console.warn('Compression failed, using original file:', error);
    return file; // Return original if compression fails
  }
};

/**
 * Generate thumbnail from file
 */
export const generateThumbnail = (file, width = 200, height = 200) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = width;
    canvas.height = height;

    reader.onload = (e) => {
      img.onload = () => {
        try {
          // Draw image centered and cropped
          const scale = Math.max(width / img.width, height / img.height);
          const x = (width - img.width * scale) / 2;
          const y = (height - img.height * scale) / 2;
          
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Thumbnail generation failed'));
              return;
            }
            
            resolve(new File([blob], `thumb_${file.name}`, {
              type: 'image/jpeg'
            }));
          }, 'image/jpeg', 0.7);
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image for thumbnail'));
      img.src = e.target.result;
    };

    reader.onerror = () => reject(new Error('Failed to read file for thumbnail'));
    reader.readAsDataURL(file);
  });
};

/**
 * Get video thumbnail (first frame)
 */
export const getVideoThumbnail = (file, width = 200, height = 200) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      try {
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;
        
        // Capture first frame
        video.currentTime = 0.1; // Small offset to ensure frame is loaded
        
        video.onseeked = () => {
          ctx.drawImage(video, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Video thumbnail generation failed'));
              return;
            }
            
            resolve(new File([blob], `thumb_${file.name.replace(/\.[^/.]+$/, ".jpg")}`, {
              type: 'image/jpeg'
            }));
          }, 'image/jpeg', 0.7);
        };
      } catch (error) {
        reject(error);
      }
    };
    
    video.onerror = () => reject(new Error('Failed to load video for thumbnail'));
    video.src = URL.createObjectURL(file);
  });
};

/**
 * Utility to get file preview (for UI)
 */
export const getFilePreview = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
};

export {
  SUPPORTED_IMAGE_TYPES,
  SUPPORTED_VIDEO_TYPES,
  SUPPORTED_AUDIO_TYPES,
  ALLOWED_TYPES,
  MAX_FILE_SIZE
};