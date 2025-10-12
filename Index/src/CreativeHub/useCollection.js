import { useState, useEffect, useCallback } from 'react';

// Mock data for images
const mockImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262',
    title: 'Colorful Abstract',
    artist: 'Sarah Chen',
    category: 'abstract',
    tags: ['abstract', 'colorful', 'modern'],
    likes: 42,
    views: 128,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031',
    title: 'Mountain Landscape',
    artist: 'James Wilson',
    category: 'landscape',
    tags: ['landscape', 'mountains', 'nature'],
    likes: 28,
    views: 95,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    title: 'Urban Portrait',
    artist: 'Maria Garcia',
    category: 'portrait',
    tags: ['portrait', 'urban', 'street'],
    likes: 67,
    views: 210,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f',
    title: 'Digital Dreams',
    artist: 'Alex Kim',
    category: 'digital',
    tags: ['digital', 'fantasy', 'surreal'],
    likes: 89,
    views: 305,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0',
    title: 'Minimal Composition',
    artist: 'David Park',
    category: 'minimal',
    tags: ['minimal', 'geometric', 'modern'],
    likes: 34,
    views: 112,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b',
    title: 'Still Life Study',
    artist: 'Emma Thompson',
    category: 'still-life',
    tags: ['still-life', 'traditional', 'study'],
    likes: 23,
    views: 78,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  }
];

// Categories data
const categories = [
  { id: 'all', name: 'All', color: 'bg-gray-500' },
  { id: 'abstract', name: 'Abstract', color: 'bg-purple-500' },
  { id: 'landscape', name: 'Landscape', color: 'bg-green-500' },
  { id: 'portrait', name: 'Portrait', color: 'bg-blue-500' },
  { id: 'digital', name: 'Digital', color: 'bg-pink-500' },
  { id: 'minimal', name: 'Minimal', color: 'bg-gray-400' },
  { id: 'still-life', name: 'Still Life', color: 'bg-amber-500' }
];

export const useCollection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [feedType, setFeedType] = useState('personalized');
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [likedImages, setLikedImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);
  const [page, setPage] = useState(1);

  // Format timestamp to relative time
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInHours = Math.floor((now - past) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  // Filter images based on selected categories and feed type
  const filterImages = useCallback((images, categories, feedType) => {
    let filtered = [...images];
    
    // Filter by category
    if (!categories.includes('all')) {
      filtered = filtered.filter(img => categories.includes(img.category));
    }
    
    // Sort by feed type
    switch (feedType) {
      case 'trending':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'recent':
        filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
      case 'personalized':
      default:
        // Mix of popularity and recency for personalized feed
        filtered.sort((a, b) => {
          const scoreA = (a.likes * 0.6) + (new Date(a.timestamp).getTime() * 0.4);
          const scoreB = (b.likes * 0.6) + (new Date(b.timestamp).getTime() * 0.4);
          return scoreB - scoreA;
        });
        break;
    }
    
    return filtered;
  }, []);

  // Load initial images
  useEffect(() => {
    const loadInitialImages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const filteredImages = filterImages(mockImages, selectedCategories, feedType);
        setImages(filteredImages);
        setHasMore(filteredImages.length < 20); // Assume we have more data
        
      } catch (err) {
        setError('Failed to load images. Please try again.');
        console.error('Error loading images:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialImages();
  }, [feedType, selectedCategories, filterImages]);

  // Load more images
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate more mock images (in a real app, this would be an API call)
      const newImages = [
        {
          id: images.length + 1,
          url: `https://images.unsplash.com/photo-1513364776144-60967b0f800f?${images.length + 1}`,
          title: `Artwork ${images.length + 1}`,
          artist: 'Various Artists',
          category: ['abstract', 'landscape', 'portrait'][Math.floor(Math.random() * 3)],
          tags: ['art', 'creative', 'design'],
          likes: Math.floor(Math.random() * 100),
          views: Math.floor(Math.random() * 300),
          timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: images.length + 2,
          url: `https://images.unsplash.com/photo-1579547945413-497e1b99dac0?${images.length + 2}`,
          title: `Creation ${images.length + 2}`,
          artist: 'Various Artists',
          category: ['digital', 'minimal', 'still-life'][Math.floor(Math.random() * 3)],
          tags: ['minimal', 'modern', 'clean'],
          likes: Math.floor(Math.random() * 100),
          views: Math.floor(Math.random() * 300),
          timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      const filteredNewImages = filterImages(newImages, selectedCategories, feedType);
      setImages(prev => [...prev, ...filteredNewImages]);
      setPage(prev => prev + 1);
      setHasMore(page < 5); // Limit to 5 pages for demo
      
    } catch (err) {
      setError('Failed to load more images.');
      console.error('Error loading more images:', err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, images.length, page, selectedCategories, feedType, filterImages]);

  // Handle like action
  const handleLike = useCallback((imageId) => {
    setLikedImages(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      } else {
        return [...prev, imageId];
      }
    });
    
    // Update image likes count
    setImages(prev => prev.map(img => 
      img.id === imageId 
        ? { ...img, likes: img.likes + (likedImages.includes(imageId) ? -1 : 1) }
        : img
    ));
  }, [likedImages]);

  // Handle save action
  const handleSave = useCallback((imageId) => {
    setSavedImages(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      } else {
        return [...prev, imageId];
      }
    });
  }, []);

  // Handle image view (analytics)
  const handleImageView = useCallback((imageId) => {
    setImages(prev => prev.map(img => 
      img.id === imageId 
        ? { ...img, views: img.views + 1 }
        : img
    ));
  }, []);

  return {
    // State
    images,
    loading,
    error,
    hasMore,
    feedType,
    selectedCategories,
    likedImages,
    savedImages,
    categories,
    
    // Actions
    setFeedType,
    setSelectedCategories,
    loadMore,
    handleLike,
    handleSave,
    handleImageView,
    formatTimestamp
  };
};