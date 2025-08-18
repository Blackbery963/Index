import { useState, useEffect } from 'react';
import { diaryService } from './DiaryService';
import { toast } from 'react-toastify';

export const useDiary = () => {
  const [entries, setEntries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState(initialFormData());
  const [imageUploadedToday, setImageUploadedToday] = useState(checkImageUploadToday());
  const [loading, setLoading] = useState(false);

  function initialFormData() {
    return {
      title: '',
      date: new Date().toISOString().split('T')[0],
      mood: '',
      image: null,
      imageStory: '',
      artStory: '',
      tips: '',
      inspiration: '',
      moodBoard: []
    };
  }

  function checkImageUploadToday() {
    const lastUploadDate = localStorage.getItem('lastImageUploadDate');
    return lastUploadDate === new Date().toISOString().split('T')[0];
  }

  // Reset image upload on new day
  useEffect(() => {
    const checkNewDay = () => {
      if (!checkImageUploadToday()) {
        setImageUploadedToday(false);
        localStorage.removeItem('lastImageUploadDate');
      }
    };
    checkNewDay();
    const interval = setInterval(checkNewDay, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadEntries = async () => {
    setLoading(true);
    try {
      const loadedEntries = await diaryService.loadEntries();
      setEntries(Array.isArray(loadedEntries) ? loadedEntries : []);
      toast.success('Entries loaded successfully');
    } catch (err) {
      console.error(err);
      toast.error(`Failed to load entries: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const currentEntry = entries[currentIndex] || null;

  useEffect(() => {
    if (currentEntry && currentIndex < entries.length) {
      setFormData({
        ...initialFormData(),
        ...currentEntry,
        moodBoard: Array.isArray(currentEntry.moodBoard) ? currentEntry.moodBoard : []
      });
    } else if (currentIndex === entries.length) {
      setFormData(initialFormData());
    }
  }, [currentEntry, currentIndex, entries.length]);

  const saveEntry = async (data, isEditing, entry) => {
    if (!data.title?.trim() || !data.mood || !data.date || !data.artStory?.trim()) {
      toast.error('Title, mood, date, and art story are required');
      return false;
    }

    setLoading(true);
    try {
      const response = await diaryService.saveEntry(data, isEditing, entry?.$id);
      if (isEditing && entry?.$id) {
        setEntries(prev => prev.map(e => (e.$id === entry.$id ? { ...e, ...response } : e)));
        toast.success('Entry updated successfully');
      } else {
        setEntries(prev => {
          const newEntries = [...prev, response];
          setCurrentIndex(newEntries.length - 1);
          return newEntries;
        });
        toast.success('Entry created successfully');
      }
      return true;
    } catch (err) {
      console.error(err);
      toast.error(`Failed to save entry: ${err.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (entryId, entryIndex) => {
    setLoading(true);
    try {
      await diaryService.deleteEntry(entryId);
      setEntries(prev => {
        const updated = prev.filter(e => e.$id !== entryId);
        setCurrentIndex(Math.max(0, Math.min(entryIndex, updated.length - 1)));
        return updated;
      });
      toast.success('Entry deleted successfully');
      return true;
    } catch (err) {
      console.error(err);
      toast.error(`Failed to delete entry: ${err.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (field, file) => {
    if (!file) return;
    setFormData(prev => ({ ...prev, [field]: file }));
    toast.success('Image selected successfully');
  };

  const addMoodBoardItem = (type, content) => {
    if (type === 'image') {
      if (imageUploadedToday) {
        toast.error('You can only upload one image per day to your mood board');
        return false;
      }
      setImageUploadedToday(true);
      localStorage.setItem('lastImageUploadDate', new Date().toISOString().split('T')[0]);
    }

    setFormData(prev => ({
      ...prev,
      moodBoard: [
        ...prev.moodBoard,
        {
          id: Date.now(),
          type,
          content,
          position: { x: Math.random() * 300, y: Math.random() * 200 },
          date: new Date().toISOString()
        }
      ]
    }));
    toast.success(`${type === 'image' ? 'Image' : 'Note'} added to mood board`);
    return true;
  };

  const removeMoodBoardItem = (itemId) => {
    setFormData(prev => {
      const updated = prev.moodBoard.filter(item => {
        if (item.id === itemId && item.type === 'image') {
          setImageUploadedToday(false);
          localStorage.removeItem('lastImageUploadDate');
        }
        return item.id !== itemId;
      });
      return { ...prev, moodBoard: updated };
    });
    toast.success('Mood board item removed');
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
    loadEntries
  };
};
