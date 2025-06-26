// // src/hooks/useDiary.js
// import { useState, useEffect } from 'react';
// import { diaryService } from './DiaryService';

// export const useDiary = () => {
//   const [entries, setEntries] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Load all entries
//   const loadEntries = async () => {
//     setLoading(true);
//     try {
//       const loadedEntries = await diaryService.loadEntries();
//       setEntries(loadedEntries);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load entries');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize with entries
//   useEffect(() => {
//     loadEntries();
//   }, []);

//   // Save entry (create or update)
//   const saveEntry = async (formData, isEditing, currentEntry) => {
//     if (!formData.title) {
//       setError('Title is required');
//       return false;
//     }

//     setLoading(true);
//     try {
//       let response;
//       if (isEditing && currentEntry?.$id) {
//         response = await diaryService.saveEntry(formData, true, currentEntry.$id);
//         setEntries(prev => prev.map(entry => 
//           entry.$id === currentEntry.$id ? response : entry
//         ));
//       } else {
//         response = await diaryService.saveEntry(formData);
//         setEntries(prev => [...prev, response]);
//         setCurrentIndex(prev => prev + 1);
//       }
//       setError(null);
//       return true;
//     } catch (err) {
//       setError(err.message || 'Failed to save entry');
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete entry
//   const deleteEntry = async (entryId, entryIndex) => {
//     setLoading(true);
//     try {
//       await diaryService.deleteEntry(entryId);
//       setEntries(prev => prev.filter(entry => entry.$id !== entryId));
//       setCurrentIndex(prev => Math.min(prev, entries.length - 2));
//       setError(null);
//       return true;
//     } catch (err) {
//       setError('Failed to delete entry');
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };


//   // Get current entry
// const currentEntry = entries[currentIndex] || null;
// const [formData, setFormData] = useState({
//   title: '',
//   date: new Date().toISOString().split('T')[0],
//   mood: '',
//   image: null,
//   imageStory: '',
//   artStory: '',
//   inspiration: '',
//   tips: '',
//   moodBoard: []
// });

// // Update this to initialize with currentEntry when editing
// useEffect(() => {
//   if (currentEntry) {
//     setFormData({
//       title: currentEntry.title || '',
//       date: currentEntry.date || new Date().toISOString().split('T')[0],
//       mood: currentEntry.mood || '',
//       image: currentEntry.image || null,
//       imageStory: currentEntry.imageStory || '',
//       artStory: currentEntry.artStory || '',
//       inspiration: currentEntry.inspiration || '',
//       tips: currentEntry.tips || '',
//       moodBoard: currentEntry.moodBoard || []
//     });
//   }
// }, [currentEntry]);

//   return {
//     entries,
//     currentEntry,
//     currentIndex,
//     loading,
//     error,
//     setCurrentIndex,
//     saveEntry,
//     deleteEntry,
//     loadEntries
//   };
// };


// import { useState, useEffect } from 'react';
// import { diaryService } from './DiaryService';

// export const useDiary = () => {
//   const [entries, setEntries] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [formData, setFormData] = useState({
//     title: '',
//     // date: new Date().toISOString().split('T')[0],
//     date: '',
//     mood: '',
//     image: null,
//     imageStory: '',
//     artStory: '',
//     tips: '',
//     moodBoard: [],
//   });
//   const [imageUploadedToday, setImageUploadedToday] = useState(() => {
//     const lastUploadDate = localStorage.getItem('lastImageUploadDate');
//     return lastUploadDate === new Date().toISOString().split('T')[0];
//   });
//   const [objectURLs, setObjectURLs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Reset imageUploadedToday on new day
//   useEffect(() => {
//     const checkNewDay = () => {
//       const lastUploadDate = localStorage.getItem('lastImageUploadDate');
//       const today = new Date().toISOString().split('T')[0];
//       if (lastUploadDate && lastUploadDate !== today) {
//         setImageUploadedToday(false);
//         localStorage.removeItem('lastImageUploadDate');
//       }
//     };
//     checkNewDay();
//     const interval = setInterval(checkNewDay, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   // Cleanup object URLs
//   useEffect(() => {
//     return () => {
//       objectURLs.forEach(url => URL.revokeObjectURL(url));
//       setObjectURLs([]);
//     };
//   }, []);

//   // Clear error on index change
//   const clearError = () => setError(null);
//   useEffect(() => {
//     clearError();
//   }, [currentIndex]);

//   // Load all entries
//   const loadEntries = async () => {
//     setLoading(true);
//     try {
//       const loadedEntries = await diaryService.loadEntries();
//       setEntries(loadedEntries);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load entries');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize with entries
//   useEffect(() => {
//     loadEntries();
//   }, []);

//   // Update formData based on currentEntry
//   const currentEntry = entries[currentIndex] || null;
//   useEffect(() => {
//     if (currentEntry) {
//       setFormData({
//         title: currentEntry.title || '',
//         date: currentEntry.date || new Date().toISOString().split('T')[0],
//         // date:currentEntry.date || '',
//         mood: currentEntry.mood || '',
//         image: currentEntry.image || null,
//         imageStory: currentEntry.imageStory || '',
//         artStory: currentEntry.artStory || '',
//         tips: currentEntry.tips || '',
//         moodBoard: Array.isArray(currentEntry.moodBoard) ? currentEntry.moodBoard : [],
//       });
//     } else {
//       setFormData({
//         title: '',
//         date: new Date().toISOString().split('T')[0],
//         // date:'',
//         mood: '',
//         image: null,
//         imageStory: '',
//         artStory: '',
//         tips: '',
//         moodBoard: [],
//       });
//     }
//   }, [currentEntry]);

//   // Save entry
//   const saveEntry = async (formData, isEditing, currentEntry) => {
//     if (!formData.title || !formData.mood || !formData.date) {
//       setError('Title, mood, and date are required');
//       return false;
//     }

//     setLoading(true);
//     try {
//       let response;
//       if (isEditing && currentEntry?.$id) {
//         response = await diaryService.saveEntry(formData, true, currentEntry.$id);
//         setEntries(prev =>
//           prev.map(entry => (entry.$id === currentEntry.$id ? response : entry))
//         );
//       } else {
//         response = await diaryService.saveEntry(formData);
//         setEntries(prev => [...prev, response]);
//         setCurrentIndex(prev.length);
//       }
//       setError(null);
//       return true;
//     } catch (err) {
//       setError(err.message || 'Failed to save entry');
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete entry
//   const deleteEntry = async (entryId, entryIndex) => {
//     setLoading(true);
//     try {
//       await diaryService.deleteEntry(entryId);
//       setEntries(prev => {
//         const updated = prev.filter(entry => entry.$id !== entryId);
//         setCurrentIndex(Math.min(entryIndex, updated.length - 1));
//         return updated;
//       });
//       setError(null);
//       return true;
//     } catch (err) {
//       setError('Failed to delete entry');
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = (field, file) => {
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setObjectURLs(prev => [...prev, url]);
//       setFormData(prev => ({ ...prev, [field]: url }));
//     }
//   };

//   // Add mood board item
//   const addMoodBoardItem = (type, content) => {
//     if (type === 'image') {
//       if (imageUploadedToday) {
//         setError('You can only upload one image per day to your mood board');
//         return false;
//       }
//       setImageUploadedToday(true);
//       localStorage.setItem('lastImageUploadDate', new Date().toISOString().split('T')[0]);
//       const url = URL.createObjectURL(content);
//       setObjectURLs(prev => [...prev, url]);
//       setFormData(prev => ({
//         ...prev,
//         moodBoard: [
//           ...prev.moodBoard,
//           {
//             id: Date.now(),
//             type,
//             content: url,
//             position: { x: Math.random() * 300, y: Math.random() * 200 },
//             date: new Date().toISOString(),
//           },
//         ],
//       }));
//       return true;
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         moodBoard: [
//           ...prev.moodBoard,
//           {
//             id: Date.now(),
//             type,
//             content,
//             position: { x: Math.random() * 300, y: Math.random() * 200 },
//             date: new Date().toISOString(),
//           },
//         ],
//       }));
//       return true;
//     }
//   };

//   // Remove mood board item
//   const removeMoodBoardItem = (itemId) => {
//     setFormData(prev => {
//       const updatedMoodBoard = prev.moodBoard.filter(item => {
//         if (item.id === itemId && item.type === 'image') {
//           URL.revokeObjectURL(item.content);
//           setObjectURLs(urls => urls.filter(u => u !== item.content));
//           setImageUploadedToday(false);
//           localStorage.removeItem('lastImageUploadDate');
//         }
//         return item.id !== itemId;
//       });
//       return { ...prev, moodBoard: updatedMoodBoard };
//     });
//   };

//   return {
//     entries,
//     currentEntry,
//     currentIndex,
//     formData,
//     setFormData,
//     handleImageUpload,
//     addMoodBoardItem,
//     removeMoodBoardItem,
//     imageUploadedToday,
//     loading,
//     error,
//     clearError,
//     setCurrentIndex,
//     saveEntry,
//     deleteEntry,
//     loadEntries,
//   };
// };



// import { useState, useEffect } from 'react';
// import { diaryService } from './DiaryService';
// import { toast } from 'react-toastify';

// // Custom hook for managing diary entries
// export const useDiary = () => {
//   const [entries, setEntries] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [formData, setFormData] = useState({
//     title: '',
//     date: new Date().toISOString().split('T')[0], // Standardized default date
//     mood: '',
//     image: null,
//     imageStory: '',
//     artStory: '',
//     tips: '',
//     moodBoard: [],
//   });
//   const [imageUploadedToday, setImageUploadedToday] = useState(() => {
//     const lastUploadDate = localStorage.getItem('lastImageUploadDate');
//     return lastUploadDate === new Date().toISOString().split('T')[0];
//   });
//   const [objectURLs, setObjectURLs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Reset imageUploadedToday on new day
//   useEffect(() => {
//     const checkNewDay = () => {
//       const lastUploadDate = localStorage.getItem('lastImageUploadDate');
//       const today = new Date().toISOString().split('T')[0];
//       if (lastUploadDate && lastUploadDate !== today) {
//         setImageUploadedToday(false);
//         localStorage.removeItem('lastImageUploadDate');
//       }
//     };
//     checkNewDay();
//     const interval = setInterval(checkNewDay, 6000); // Check every minute
//     return () => clearInterval(interval);
//   }, []);

//   // Cleanup object URLs on component unmount
//   // useEffect(() => {
//   //   return () => {
//   //     objectURLs.forEach((url) => URL.revokeObjectURL(url));
//   //     setObjectURLs([]);
//   //   };
//   // }, [objectURLs]);

//   // Load all entries
//   const loadEntries = async () => {
//     setLoading(true);
//     try {
//       const loadedEntries = await diaryService.loadEntries();
//       setEntries(loadedEntries || []); // Ensure entries is always an array
//       toast.success('Entries loaded successfully');
//     } catch (err) {
//       toast.error('Failed to load entries');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize with entries
//   useEffect(() => {
//     loadEntries();
//   }, []);

//   // Update formData based on currentEntry 
//     const currentEntry = entries[currentIndex] || null;
//     useEffect(() => {
//     // Only update if currentEntry actually changed
//     if (currentEntry && JSON.stringify(currentEntry) !== JSON.stringify(formData)) {
//       setFormData({
//         title: currentEntry.title || '',
//         date: currentEntry.date || new Date().toISOString().split('T')[0],
//         mood: currentEntry.mood || '',
//         image: currentEntry.image || null,
//         imageStory: currentEntry.imageStory || '',
//         artStory: currentEntry.artStory || '',
//         tips: currentEntry.tips || '',
//         moodBoard: Array.isArray(currentEntry.moodBoard) ? currentEntry.moodBoard : [],
//       });
//     } else if (!currentEntry && currentIndex === entries.length) {
//       // Only reset for new entries
//       setFormData({
//         title: '',
//         date: new Date().toISOString().split('T')[0],
//         mood: '',
//         image: null,
//         imageStory: '',
//         artStory: '',
//         tips: '',
//         moodBoard: [],
//       });
//     }
//   }, [currentEntry, currentIndex, entries.length]); // Added entries.length for new entry detection

//   // Save entry
//   const saveEntry = async (formData, isEditing, currentEntry) => {
//     if (!formData.title || !formData.mood || !formData.date) {
//       toast.error('Title, mood, and date are required');
//       return false;
//     }

//     setLoading(true);
//     try {
//       let response;
//       if (isEditing && currentEntry?.$id) {
//         response = await diaryService.saveEntry(formData, true, currentEntry.$id);
//         setEntries((prev) =>
//           prev.map((entry) => (entry.$id === currentEntry.$id ? response : entry))
//         );
//         toast.success('Entry updated successfully');
//       } else {
//         response = await diaryService.saveEntry(formData);
//         setEntries((prev) => {
//           const newEntries = [...prev, response];
//           setCurrentIndex(newEntries.length - 1); // Update index to new entry
//           return newEntries;
//         });
//         toast.success('Entry created successfully');
//       }
//       return true;
//     } catch (err) {
//       toast.error(err.message || 'Failed to save entry');
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete entry
//   const deleteEntry = async (entryId, entryIndex) => {
//     setLoading(true);
//     try {
//       await diaryService.deleteEntry(entryId);
//       setEntries((prev) => {
//         const updated = prev.filter((entry) => entry.$id !== entryId);
//         // Ensure currentIndex is valid after deletion
//         setCurrentIndex(Math.max(0, Math.min(entryIndex, updated.length - 1)));
//         return updated;
//       });
//       toast.success('Entry deleted successfully');
//       return true;
//     } catch (err) {
//       toast.error('Failed to delete entry');
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = (field, file) => {
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setObjectURLs((prev) => [...prev, url]);
//       setFormData((prev) => ({ ...prev, [field]: url }));
//       toast.success('Image uploaded successfully');
//     }
//   };

//   // Add mood board item
//   const addMoodBoardItem = (type, content) => {
//     if (type === 'image') {
//       if (imageUploadedToday) {
//         toast.error('You can only upload one image per day to your mood board');
//         return false;
//       }
//       setImageUploadedToday(true);
//       localStorage.setItem('lastImageUploadDate', new Date().toISOString().split('T')[0]);
//       const url = URL.createObjectURL(content);
//       setObjectURLs((prev) => [...prev, url]);
//       setFormData((prev) => ({
//         ...prev,
//         moodBoard: [
//           ...prev.moodBoard,
//           {
//             id: Date.now(),
//             type,
//             content: url,
//             position: { x: Math.random() * 300, y: Math.random() * 200 },
//             date: new Date().toISOString(),
//           },
//         ],
//       }));
//       toast.success('Image added to mood board');
//       return true;
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         moodBoard: [
//           ...prev.moodBoard,
//           {
//             id: Date.now(),
//             type,
//             content,
//             position: { x: Math.random() * 300, y: Math.random() * 200 },
//             date: new Date().toISOString(),
//           },
//         ],
//       }));
//       toast.success(`${type} added to mood board`);
//       return true;
//     }
//   };

//   // Remove mood board item
//   const removeMoodBoardItem = (itemId) => {
//     setFormData((prev) => {
//       const updatedMoodBoard = prev.moodBoard.filter((item) => {
//         if (item.id === itemId && item.type === 'image') {
//           URL.revokeObjectURL(item.content);
//           setObjectURLs((urls) => urls.filter((u) => u !== item.content));
//           setImageUploadedToday(false);
//           localStorage.removeItem('lastImageUploadDate');
//         }
//         return item.id !== itemId;
//       });
//       toast.success('Item removed from mood board');
//       return { ...prev, moodBoard: updatedMoodBoard };
//     });
//   };

//   return {
//     entries,
//     currentEntry,
//     currentIndex,
//     formData,
//     setFormData,
//     handleImageUpload,
//     addMoodBoardItem,
//     removeMoodBoardItem,
//     imageUploadedToday,
//     loading,
//     setCurrentIndex,
//     saveEntry,
//     deleteEntry,
//     loadEntries,
//   };
// };



import { useState, useEffect } from 'react';
import { diaryService } from './DiaryService';
import { toast } from 'react-toastify';

export const useDiary = () => {
  const [entries, setEntries] = useState([]);
  const [entryData, setEntrydata] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    mood: '',
    image: null, // This will now store either File object or file ID string
    imageStory: '',
    artStory: '',
    tips: '',
    moodBoard: [],
  });
  const [imageUploadedToday, setImageUploadedToday] = useState(() => {
    const lastUploadDate = localStorage.getItem('lastImageUploadDate');
    return lastUploadDate === new Date().toISOString().split('T')[0];
  });
  const [loading, setLoading] = useState(false);

  // Reset imageUploadedToday on new day
  useEffect(() => {
    const checkNewDay = () => {
      const lastUploadDate = localStorage.getItem('lastImageUploadDate');
      const today = new Date().toISOString().split('T')[0];
      if (lastUploadDate && lastUploadDate !== today) {
        setImageUploadedToday(false);
        localStorage.removeItem('lastImageUploadDate');
      }
    };
    checkNewDay();
    const interval = setInterval(checkNewDay, 60000);
    return () => clearInterval(interval);
  }, []);

  // Load all entries
  const loadEntries = async () => {
    setLoading(true);
    try {
      const loadedEntries = await diaryService.loadEntries();
      setEntries(loadedEntries || []);
      toast.success('Entries loaded successfully');
    } catch (err) {
      toast.error('Failed to load entries');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  // Update formData based on currentEntry
  const currentEntry = entries[currentIndex] || null;
  useEffect(() => {
    if (currentEntry && JSON.stringify(currentEntry) !== JSON.stringify(formData)) {
      setFormData({
        title: currentEntry.title || '',
        date: currentEntry.date || new Date().toISOString().split('T')[0],
        mood: currentEntry.mood || '',
        image: currentEntry.image || null, // This will be the file ID from storage
        imageStory: currentEntry.imageStory || '',
        artStory: currentEntry.artStory || '',
        tips: currentEntry.tips || '',
        moodBoard: Array.isArray(currentEntry.moodBoard) ? currentEntry.moodBoard : [],
      });
    } else if (!currentEntry && currentIndex === entries.length) {
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        mood: '',
        image: null,
        imageStory: '',
        artStory: '',
        tips: '',
        moodBoard: [],
      });
    }
  }, [currentEntry, currentIndex, entries.length]);

  // Save entry with direct file uploads
  const saveEntry = async (formData, isEditing, currentEntry) => {
    if (entryData.image instanceof File) {
    entryData.image = await diaryService.uploadFile(entryData.image); // image = fileId
    }
    if (!formData.title || !formData.mood || !formData.date) {
      toast.error('Title, mood, and date are required');
      return false;
    }

    setLoading(true);
    try {
      // Clone formData to avoid mutating the original
      const entryData = { ...formData };

      // Upload main image if it's a File object
      if (entryData.image instanceof File) {
        entryData.image = await diaryService.uploadFile(entryData.image);
      }

      // Process mood board items
      entryData.moodBoard = await Promise.all(
        (entryData.moodBoard || []).map(async (item) => {
          if (item.type === 'image' && item.content instanceof File) {
            const fileId = await diaryService.uploadFile(item.content);
            return { ...item, content: fileId };
          }
          return item;
        })
      );

      let response;
      if (isEditing && currentEntry?.$id) {
        response = await diaryService.saveEntry(entryData, true, currentEntry.$id);
        setEntries(prev => prev.map(entry => entry.$id === currentEntry.$id ? response : entry));
        toast.success('Entry updated successfully');
      } else {
        response = await diaryService.saveEntry(entryData);
        setEntries(prev => {
          const newEntries = [...prev, response];
          setCurrentIndex(newEntries.length - 1);
          return newEntries;
        });
        toast.success('Entry created successfully');
      }
      return true;
    } catch (err) {
      toast.error(err.message || 'Failed to save entry');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete entry
  const deleteEntry = async (entryId, entryIndex) => {
    setLoading(true);
    try {
      await diaryService.deleteEntry(entryId);
      setEntries(prev => {
        const updated = prev.filter(entry => entry.$id !== entryId);
        setCurrentIndex(Math.max(0, Math.min(entryIndex, updated.length - 1)));
        return updated;
      });
      toast.success('Entry deleted successfully');
      return true;
    } catch (err) {
      toast.error('Failed to delete entry');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload - now just stores the File object
  const handleImageUpload = (field, file) => {
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  // Add mood board item - now works with File objects directly
  const addMoodBoardItem = async (type, content) => {
    if (type === 'image') {
      if (imageUploadedToday) {
        toast.error('You can only upload one image per day to your mood board');
        return false;
      }
      setImageUploadedToday(true);
      localStorage.setItem('lastImageUploadDate', new Date().toISOString().split('T')[0]);
      
      setFormData(prev => ({
        ...prev,
        moodBoard: [
          ...prev.moodBoard,
          {
            id: Date.now(),
            type,
            content, // This is now the File object
            position: { x: Math.random() * 300, y: Math.random() * 200 },
            date: new Date().toISOString(),
          },
        ],
      }));
      return true;
    } else {
      setFormData(prev => ({
        ...prev,
        moodBoard: [
          ...prev.moodBoard,
          {
            id: Date.now(),
            type,
            content,
            position: { x: Math.random() * 300, y: Math.random() * 200 },
            date: new Date().toISOString(),
          },
        ],
      }));
      return true;
    }
  };

  // Remove mood board item
  const removeMoodBoardItem = (itemId) => {
    setFormData(prev => {
      const updatedMoodBoard = prev.moodBoard.filter(item => {
        if (item.id === itemId && item.type === 'image') {
          setImageUploadedToday(false);
          localStorage.removeItem('lastImageUploadDate');
        }
        return item.id !== itemId;
      });
      return { ...prev, moodBoard: updatedMoodBoard };
    });
  };

  return {
    entries,
    currentEntry,
    currentIndex,
    formData,
    setFormData,
    handleImageUpload,
    addMoodBoardItem,
    removeMoodBoardItem,
    imageUploadedToday,
    loading,
    setCurrentIndex,
    saveEntry,
    deleteEntry,
    loadEntries,
  };
};