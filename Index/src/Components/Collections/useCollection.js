import { useState, useEffect, useCallback, useRef } from 'react';

export const useCollection = () => {
  const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
  const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
  const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedType, setFeedType] = useState('personalized');
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [likedImages, setLikedImages] = useState(() => {
    const saved = localStorage.getItem('likedImages');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [savedImages, setSavedImages] = useState(() => {
    const saved = localStorage.getItem('savedImages');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(1);
  const fetchingRef = useRef(false);
  const usedImageIdsRef = useRef(new Set());

  // Enhanced categories with better coverage
  const categories = [
    { id: 'all', name: 'All', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'art', name: 'Art', color: 'bg-purple-500' },
    { id: 'nature', name: 'Nature', color: 'bg-green-500' },
    { id: 'architecture', name: 'Architecture', color: 'bg-gray-500' },
    { id: 'abstract', name: 'Abstract', color: 'bg-pink-500' },
    { id: 'portrait', name: 'Portrait', color: 'bg-blue-500' },
    { id: 'landscape', name: 'Landscape', color: 'bg-teal-500' },
    { id: 'digital', name: 'Digital Art', color: 'bg-indigo-500' },
    { id: 'painting', name: 'Painting', color: 'bg-red-500' },
  ];

  const categoryQueries = {
    art: ['painting', 'artwork', 'creative', 'masterpiece', 'canvas art'],
    nature: ['nature', 'landscape', 'forest', 'mountains', 'ocean', 'wildlife'],
    architecture: ['architecture', 'building', 'modern design', 'interior', 'urban'],
    abstract: ['abstract', 'geometric', 'pattern', 'colorful', 'modern art'],
    portrait: ['portrait', 'people', 'face', 'person', 'human'],
    landscape: ['landscape', 'scenery', 'panorama', 'vista', 'countryside'],
    digital: ['digital art', 'concept art', 'illustration', '3d render'],
    painting: ['oil painting', 'watercolor', 'acrylic', 'traditional art']
  };

  // Enhanced fallback with Lorem Picsum and multiple strategies
  const getFallbackImages = useCallback((count = 20, category = 'all') => {
    const fallbackImages = [];
    const baseCategories = category === 'all' 
      ? Object.keys(categoryQueries)
      : [category];
    
    const loremPicsumThemes = {
      art: ['art', 'painting', 'colorful', 'abstract'],
      nature: ['nature', 'forest', 'mountain', 'river'],
      architecture: ['building', 'city', 'architecture', 'urban'],
      abstract: ['abstract', 'pattern', 'texture', 'color'],
      portrait: ['people', 'face', 'portrait', 'human'],
      landscape: ['landscape', 'scenery', 'view', 'horizon'],
      digital: ['digital', 'tech', 'future', 'cyber'],
      painting: ['brush', 'canvas', 'artistic', 'creative']
    };

    for (let i = 0; i < count; i++) {
      const cat = baseCategories[Math.floor(Math.random() * baseCategories.length)];
      const seed = `${cat}-${Date.now()}-${i}-${Math.random()}`;
      const width = 800 + Math.floor(Math.random() * 400);
      const height = 600 + Math.floor(Math.random() * 400);
      
      // Use Lorem Picsum for reliable, fast-loading images
      const imageId = Math.floor(Math.random() * 1000) + 1;
      const imageUrl = `https://picsum.photos/${width}/${height}?random=${imageId}`;
      const thumbUrl = `https://picsum.photos/400/300?random=${imageId}`;
      
      // Get relevant tags for the category
      const tags = loremPicsumThemes[cat] || ['art', 'creative'];
      
      fallbackImages.push({
        id: `fallback-${seed}`,
        src: imageUrl,
        thumb: thumbUrl,
        title: `${cat.charAt(0).toUpperCase() + cat.slice(1)} Artwork ${i + 1}`,
        artist: `Artist ${Math.floor(Math.random() * 50) + 1}`,
        category: cat,
        likes: Math.floor(Math.random() * 1500) + 100,
        views: Math.floor(Math.random() * 8000) + 500,
        comments: Math.floor(Math.random() * 100) + 10,
        tags: [...tags, 'artwork', 'creative'],
        description: `Beautiful ${cat} artwork from our curated collection. This piece showcases unique creativity and artistic expression.`,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'lorem-picsum',
        width,
        height,
        reliable: true // Mark as reliable fallback
      });
    }
    
    return fallbackImages;
  }, [categoryQueries]);

  // Image validation function - checks if image loads properly
  const validateImage = useCallback((url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      // Timeout after 3 seconds
      setTimeout(() => resolve(false), 3000);
    });
  }, []);

  // Enhanced API fetch with image validation
  const fetchWithValidation = useCallback(async (fetchFunction, query, page) => {
    try {
      const results = await fetchFunction(query, page);
      
      if (!results || results.length === 0) return [];
      
      // Validate each image concurrently
      const validatedResults = await Promise.all(
        results.map(async (image) => {
          try {
            const isValid = await validateImage(image.src);
            return isValid ? image : null;
          } catch {
            return null;
          }
        })
      );
      
      // Filter out invalid images and add reliability flag
      return validatedResults
        .filter(img => img !== null)
        .map(img => ({ ...img, reliable: true }));
        
    } catch (error) {
      console.warn('API fetch failed:', error.message);
      return [];
    }
  }, [validateImage]);

  // Enhanced Pexels fetch
  const fetchPexels = useCallback(async (query, page) => {
    if (!PEXELS_API_KEY) return [];
    
    try {
      const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&page=${page}&orientation=landscape`;
      const response = await fetch(url, {
        headers: { 
          Authorization: PEXELS_API_KEY,
          'Accept': 'application/json'
        },
        signal: AbortSignal.timeout(8000)
      });
      
      if (!response.ok) return [];
      
      const data = await response.json();
      if (!data.photos || data.photos.length === 0) return [];
      
      return data.photos
        .filter(photo => !usedImageIdsRef.current.has(`pexels-${photo.id}`))
        .map(photo => {
          usedImageIdsRef.current.add(`pexels-${photo.id}`);
          
          const category = Object.keys(categoryQueries).find(cat => 
            photo.alt?.toLowerCase().includes(cat) ||
            categoryQueries[cat].some(q => photo.alt?.toLowerCase().includes(q))
          ) || 'art';
          
          return {
            id: `pexels-${photo.id}`,
            src: photo.src.large2x || photo.src.large,
            thumb: photo.src.medium,
            title: photo.alt || `Artwork by ${photo.photographer}`,
            artist: photo.photographer,
            category,
            likes: Math.floor(Math.random() * 2000) + 100,
            views: Math.floor(Math.random() * 10000) + 500,
            tags: photo.alt ? photo.alt.toLowerCase().split(' ').filter(t => t.length > 3).slice(0, 5) : ['art'],
            description: photo.alt || `Beautiful artwork by ${photo.photographer}`,
            timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            source: 'pexels',
            width: photo.width,
            height: photo.height,
          };
        });
    } catch (error) {
      return [];
    }
  }, [PEXELS_API_KEY, categoryQueries]);

  // Enhanced Pixabay fetch
  const fetchPixabay = useCallback(async (query, page) => {
    if (!PIXABAY_API_KEY) return [];
    
    try {
      const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=15&page=${page}&orientation=horizontal`;
      const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
      
      if (!response.ok) return [];
      
      const data = await response.json();
      if (!data.hits || data.hits.length === 0) return [];
      
      return data.hits
        .filter(photo => !usedImageIdsRef.current.has(`pixabay-${photo.id}`))
        .map(photo => {
          usedImageIdsRef.current.add(`pixabay-${photo.id}`);
          
          const category = Object.keys(categoryQueries).find(cat => 
            photo.tags?.toLowerCase().includes(cat) ||
            categoryQueries[cat].some(q => photo.tags?.toLowerCase().includes(q))
          ) || 'art';
          
          return {
            id: `pixabay-${photo.id}`,
            src: photo.largeImageURL,
            thumb: photo.webformatURL,
            title: photo.tags?.split(',')[0]?.trim() || `Artwork by ${photo.user}`,
            artist: photo.user,
            category,
            likes: photo.likes || Math.floor(Math.random() * 2000) + 100,
            views: photo.views || Math.floor(Math.random() * 10000) + 500,
            tags: photo.tags ? photo.tags.split(',').map(t => t.trim()).slice(0, 5) : ['art'],
            description: photo.tags || `Beautiful artwork by ${photo.user}`,
            timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            source: 'pixabay',
            width: photo.imageWidth,
            height: photo.imageHeight
          };
        });
    } catch (error) {
      return [];
    }
  }, [PIXABAY_API_KEY, categoryQueries]);

  // Enhanced Unsplash fetch
  const fetchUnsplash = useCallback(async (query, page) => {
    if (!UNSPLASH_API_KEY) return [];
    
    try {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=15&page=${page}&orientation=landscape`;
      const response = await fetch(url, {
        headers: { 
          Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
          'Accept-Version': 'v1'
        },
        signal: AbortSignal.timeout(8000)
      });
      
      if (!response.ok) return [];
      
      const data = await response.json();
      if (!data.results || data.results.length === 0) return [];
      
      return data.results
        .filter(photo => !usedImageIdsRef.current.has(`unsplash-${photo.id}`))
        .map(photo => {
          usedImageIdsRef.current.add(`unsplash-${photo.id}`);
          
          const category = Object.keys(categoryQueries).find(cat => 
            photo.description?.toLowerCase().includes(cat) ||
            photo.alt_description?.toLowerCase().includes(cat) ||
            categoryQueries[cat].some(q => 
              photo.description?.toLowerCase().includes(q) ||
              photo.alt_description?.toLowerCase().includes(q)
            )
          ) || 'art';
          
          return {
            id: `unsplash-${photo.id}`,
            src: photo.urls.regular,
            thumb: photo.urls.small,
            title: photo.description || photo.alt_description || `Photo by ${photo.user.name}`,
            artist: photo.user.name,
            category,
            likes: photo.likes || Math.floor(Math.random() * 2000) + 100,
            views: photo.likes * 10 || Math.floor(Math.random() * 10000) + 500,
            tags: photo.tags?.map(t => t.title).slice(0, 5) || ['art', 'photography'],
            description: photo.description || photo.alt_description || `Beautiful work by ${photo.user.name}`,
            timestamp: photo.created_at,
            source: 'unsplash',
            width: photo.width,
            height: photo.height,
          };
        });
    } catch (error) {
      return [];
    }
  }, [UNSPLASH_API_KEY, categoryQueries]);

  // Smart query builder
  const buildQuery = useCallback((category) => {
    if (category === 'all') {
      const allQueries = Object.values(categoryQueries).flat();
      return allQueries[Math.floor(Math.random() * allQueries.length)];
    }
    
    const queries = categoryQueries[category] || ['art'];
    return queries[Math.floor(Math.random() * queries.length)];
  }, [categoryQueries]);

  // Main image loading function with guaranteed content
  const loadImages = useCallback(async (reset = false) => {
    if (fetchingRef.current) return;
    
    fetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const currentPage = reset ? 1 : pageRef.current;
      const category = selectedCategories.includes('all') 
        ? 'all' 
        : selectedCategories[0];
      
      const query = buildQuery(category);

      if (reset) {
        usedImageIdsRef.current.clear();
      }

      let apiImages = [];
      
      // Try all APIs with validation
      const apiPromises = [
        fetchWithValidation(fetchPexels, query, currentPage),
        fetchWithValidation(fetchPixabay, query, currentPage),
        fetchWithValidation(fetchUnsplash, query, currentPage)
      ];

      const results = await Promise.allSettled(apiPromises);
      
      // Combine all successful, validated results
      results.forEach(result => {
        if (result.status === 'fulfilled' && result.value.length > 0) {
          apiImages = [...apiImages, ...result.value];
        }
      });

      // Always ensure we have images - use fallback if needed
      let finalImages = [];
      
      if (apiImages.length >= 10) {
        // We have enough validated API images
        finalImages = apiImages.slice(0, 15);
      } else if (apiImages.length > 0) {
        // Mix API images with fallback to ensure quantity
        const needed = 15 - apiImages.length;
        const fallbackImages = getFallbackImages(needed, category);
        finalImages = [...apiImages, ...fallbackImages];
      } else {
        // No API images available, use reliable fallback
        finalImages = getFallbackImages(15, category);
      }

      // Shuffle for variety and apply feed type sorting
      let sortedImages = [...finalImages].sort(() => Math.random() - 0.5);
      
      switch (feedType) {
        case 'trending':
          sortedImages.sort((a, b) => (b.likes + b.views) - (a.likes + a.views));
          break;
        case 'recent':
          sortedImages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          break;
        case 'personalized':
          // Already shuffled
          break;
        default:
          break;
      }

      // Filter by category if needed
      if (!selectedCategories.includes('all')) {
        sortedImages = sortedImages.filter(img => 
          selectedCategories.includes(img.category)
        );
        
        // If filtering left us with too few images, add more fallback
        if (sortedImages.length < 10) {
          const additionalFallback = getFallbackImages(10, category);
          sortedImages = [...sortedImages, ...additionalFallback];
        }
      }

      // Update state
      if (reset) {
        setImages(sortedImages.slice(0, 15));
        pageRef.current = 1;
      } else {
        setImages(prev => {
          const existingIds = new Set(prev.map(img => img.id));
          const newImages = sortedImages.filter(img => !existingIds.has(img.id));
          const combined = [...prev, ...newImages].slice(0, 60); // Limit total
          return combined;
        });
      }
      
      setHasMore(true); // Always assume there's more with fallbacks

    } catch (err) {
      console.error('Image loading error:', err);
      
      // Ultimate reliable fallback - always show something
      const fallbackImages = getFallbackImages(
        15, 
        selectedCategories.includes('all') ? 'all' : selectedCategories[0]
      );
      
      if (reset) {
        setImages(fallbackImages);
      } else {
        setImages(prev => {
          const existingIds = new Set(prev.map(img => img.id));
          const newFallback = fallbackImages.filter(img => !existingIds.has(img.id));
          return [...prev, ...newFallback].slice(0, 60);
        });
      }
      
      setHasMore(true);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [
    feedType, 
    selectedCategories, 
    fetchPexels, 
    fetchPixabay, 
    fetchUnsplash, 
    getFallbackImages, 
    buildQuery, 
    fetchWithValidation
  ]);

  // Initial load and reset on changes
  useEffect(() => {
    loadImages(true);
  }, [feedType, selectedCategories.join(',')]);

  // Persist likes and saves
  useEffect(() => {
    localStorage.setItem('likedImages', JSON.stringify([...likedImages]));
  }, [likedImages]);

  useEffect(() => {
    localStorage.setItem('savedImages', JSON.stringify([...savedImages]));
  }, [savedImages]);

  const handleLike = useCallback((imageId) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });

    setImages(prev => prev.map(img => 
      img.id === imageId 
        ? { ...img, likes: img.likes + (likedImages.has(imageId) ? -1 : 1) }
        : img
    ));
  }, [likedImages]);

  const handleSave = useCallback((imageId) => {
    setSavedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  }, []);

  const handleImageView = useCallback((imageId) => {
    setImages(prev => prev.map(img => 
      img.id === imageId 
        ? { ...img, views: img.views + 1 }
        : img
    ));
  }, []);

  const formatTimestamp = useCallback((timestamp) => {
    if (!timestamp) {
      const times = ['2h ago', '5h ago', '1d ago', '2d ago', '1w ago'];
      return times[Math.floor(Math.random() * times.length)];
    }

    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return `${Math.floor(diffDays / 7)}w ago`;
  }, []);

  const refreshFeed = useCallback(() => {
    usedImageIdsRef.current.clear();
    pageRef.current = 1;
    loadImages(true);
  }, [loadImages]);

  return {
    images,
    loading,
    error,
    hasMore,
    feedType,
    setFeedType,
    selectedCategories,
    setSelectedCategories,
    likedImages,
    savedImages,
    categories,
    loadMore: () => loadImages(false),
    handleLike,
    handleSave,
    handleImageView,
    formatTimestamp,
    refreshFeed,
  };
};