import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import PersonalizedRecommendationEngine from './PersonalizedRecommendationEngine';

export const useCollection = () => {
  const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
  const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedType, setFeedType] = useState('personalized');
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [likedImages, setLikedImages] = useState(new Set());
  const [savedImages, setSavedImages] = useState(new Set());
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Use refs to track state without causing re-renders
  const seenImageIds = useRef(new Set());
  const fetchingRef = useRef(false);
  const lastFetchTime = useRef(0);
  const imageCache = useRef(new Map());

  const recommendationEngine = useMemo(() => new PersonalizedRecommendationEngine(), []);

  const categories = useMemo(() => [
    { id: 'all', name: 'All', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'art', name: 'Art & Paintings', color: 'bg-purple-500' },
    { id: 'photography', name: 'Photography', color: 'bg-blue-500' },
    { id: 'nature', name: 'Nature', color: 'bg-green-500' },
    { id: 'architecture', name: 'Architecture', color: 'bg-gray-500' },
    { id: 'abstract', name: 'Abstract', color: 'bg-pink-500' },
    { id: 'minimal', name: 'Minimal', color: 'bg-indigo-500' },
    { id: 'creative', name: 'Creative', color: 'bg-orange-500' },
    { id: 'illustration', name: 'Illustrations', color: 'bg-yellow-500' }
  ], []);

  const categorySearchTerms = useMemo(() => ({
    all: 'artistic creative beautiful aesthetic',
    art: 'painting fine art canvas artistic masterpiece',
    photography: 'professional photography artistic photo',
    nature: 'nature landscape scenic beautiful natural',
    architecture: 'architecture building modern design structure',
    abstract: 'abstract art modern contemporary geometric',
    minimal: 'minimalist simple clean aesthetic minimal',
    creative: 'creative design innovative unique artistic',
    illustration: 'digital illustration vector art graphic design'
  }), []);

  // Reset when feed type or categories change
  useEffect(() => {
    console.log('Feed settings changed:', { feedType, selectedCategories });
    setImages([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    seenImageIds.current.clear();
    imageCache.current.clear();
    fetchingRef.current = false;
    
    // Small delay to ensure state is clean
    const timer = setTimeout(() => {
      fetchPersonalizedContent(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [feedType, selectedCategories.join(',')]);

  // Validate image URL with shorter timeout for faster loading
  const validateImageUrl = useCallback(async (url, timeout = 2000) => { // Reduced from 3000 to 2000ms
    if (!url) return false;
    
    // Check cache first
    if (imageCache.current.has(url)) {
      return imageCache.current.get(url);
    }

    return new Promise((resolve) => {
      const img = new Image();
      const timer = setTimeout(() => {
        img.src = '';
        imageCache.current.set(url, false);
        resolve(false);
      }, timeout);

      img.onload = () => {
        clearTimeout(timer);
        imageCache.current.set(url, true);
        resolve(true);
      };

      img.onerror = () => {
        clearTimeout(timer);
        imageCache.current.set(url, false);
        resolve(false);
      };

      img.src = url;
    });
  }, []);

  // Get search query based on preferences
  const getSearchQuery = useCallback(() => {
    let query = 'artistic creative';
    
    // Determine category
    if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
      const randomCategory = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
      query = categorySearchTerms[randomCategory] || query;
    } else if (feedType === 'personalized') {
      // Get top preference from recommendation engine
      const preferences = recommendationEngine.userProfile?.preferences || {};
      const topCategory = Object.entries(preferences)
        .sort(([, a], [, b]) => b - a)[0]?.[0];
      
      if (topCategory && categorySearchTerms[topCategory]) {
        query = categorySearchTerms[topCategory];
      }
    } else {
      query = categorySearchTerms.all;
    }

    // Add modifiers based on feed type
    if (feedType === 'trending') {
      query = `trending popular ${query}`;
    } else if (feedType === 'recent') {
      query = `latest new ${query}`;
    }

    return query;
  }, [selectedCategories, feedType, categorySearchTerms, recommendationEngine]);

  // Fetch from Pexels
  const fetchPexelsImages = useCallback(async (query, currentPage) => {
    if (!PEXELS_API_KEY) return [];

    try {
      const endpoint = query === 'curated' 
        ? 'https://api.pexels.com/v1/curated'
        : 'https://api.pexels.com/v1/search';

      const params = new URLSearchParams({
        per_page: '80', // Increased from 20 to 80 (Pexels max per request)
        page: currentPage.toString()
      });

      if (endpoint.includes('search')) {
        params.append('query', query);
      }

      const response = await fetch(`${endpoint}?${params}`, {
        headers: { 
          Authorization: PEXELS_API_KEY 
        }
      });

      if (!response.ok) {
        console.warn('Pexels API error:', response.status);
        return [];
      }

      const data = await response.json();
      return data.photos || [];
    } catch (error) {
      console.error('Pexels fetch error:', error);
      return [];
    }
  }, [PEXELS_API_KEY]);

  // Fetch from Pixabay
  const fetchPixabayImages = useCallback(async (query, currentPage) => {
    if (!PIXABAY_API_KEY) return [];

    try {
      const params = new URLSearchParams({
        key: PIXABAY_API_KEY,
        q: query,
        image_type: 'photo',
        per_page: '200', // Increased from 20 to 200 (Pixabay max per request)
        page: currentPage.toString(),
        safesearch: 'true',
        order: feedType === 'trending' ? 'popular' : 'latest'
      });

      const response = await fetch(`https://pixabay.com/api/?${params}`);
      
      if (!response.ok) {
        console.warn('Pixabay API error:', response.status);
        return [];
      }

      const data = await response.json();
      return data.hits || [];
    } catch (error) {
      console.error('Pixabay fetch error:', error);
      return [];
    }
  }, [PIXABAY_API_KEY, feedType]);

  // Transform and normalize image data
  const normalizeImageData = useCallback((photo, source, categoryId) => {
    const isPexels = source === 'pexels';
    
    // Get image URL
    const imageUrl = isPexels 
      ? photo.src?.large || photo.src?.original
      : photo.largeImageURL || photo.webformatURL;

    // Generate unique ID
    const uniqueId = `${source}-${photo.id}`;

    // Extract tags
    let tags = [];
    if (isPexels) {
      tags = photo.alt 
        ? photo.alt.toLowerCase().split(/[\s,]+/).filter(Boolean).slice(0, 5)
        : ['art', 'creative'];
    } else {
      tags = photo.tags 
        ? photo.tags.split(',').map(t => t.trim()).filter(Boolean).slice(0, 5)
        : ['art', 'creative'];
    }

    // Determine category
    let category = categoryId;
    if (!category || category === 'all') {
      // Try to infer from tags
      const tagStr = tags.join(' ').toLowerCase();
      for (const [catId, terms] of Object.entries(categorySearchTerms)) {
        if (catId !== 'all' && terms.toLowerCase().split(' ').some(term => tagStr.includes(term))) {
          category = catId;
          break;
        }
      }
      if (!category || category === 'all') {
        category = categories[Math.floor(Math.random() * (categories.length - 1)) + 1].id;
      }
    }

    return {
      id: uniqueId,
      src: imageUrl,
      title: isPexels 
        ? (photo.alt || 'Untitled Artwork') 
        : (tags[0] || 'Untitled Artwork'),
      artist: isPexels ? (photo.photographer || 'Unknown Artist') : (photo.user || 'Unknown Artist'),
      category,
      likes: isPexels ? Math.floor(Math.random() * 1000) + 50 : (photo.likes || 0),
      views: isPexels ? Math.floor(Math.random() * 5000) + 200 : (photo.views || 0),
      comments: isPexels ? Math.floor(Math.random() * 100) + 5 : (photo.comments || 0),
      shares: Math.floor(Math.random() * 50) + 5,
      timestamp: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
      trending: feedType === 'trending' 
        ? Math.random() * 10 + 5 
        : Math.random() * 5,
      tags,
      description: isPexels 
        ? (photo.alt || 'High-quality artistic image') 
        : (photo.tags || 'High-quality artistic image'),
      avg_color: isPexels 
        ? (photo.avg_color || '#808080') 
        : `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
      source,
      originalData: photo
    };
  }, [categorySearchTerms, categories, feedType]);

  // Main fetch function
  const fetchPersonalizedContent = useCallback(async (isInitial = false) => {
    // Prevent concurrent fetches
    if (fetchingRef.current) {
      console.log('Already fetching, skipping...');
      return;
    }

    // Rate limiting - prevent too frequent fetches
    const now = Date.now();
    if (!isInitial && now - lastFetchTime.current < 500) { // Reduced from 1000ms to 500ms for faster pagination
      console.log('Rate limited, skipping fetch');
      return;
    }

    // Check if we have API keys
    if (!PEXELS_API_KEY && !PIXABAY_API_KEY) {
      setError('No API keys configured. Please add PEXELS or PIXABAY API keys.');
      return;
    }

    fetchingRef.current = true;
    lastFetchTime.current = now;
    setLoading(true);
    setError(null);

    try {
      const currentPage = isInitial ? 1 : page;
      const query = getSearchQuery();
      
      console.log('Fetching images:', { feedType, query, page: currentPage, selectedCategories });

      // Fetch from both sources in parallel
      const [pexelsResults, pixabayResults] = await Promise.all([
        fetchPexelsImages(query, currentPage),
        fetchPixabayImages(query, currentPage)
      ]);

      console.log('API Results:', { 
        pexels: pexelsResults.length, 
        pixabay: pixabayResults.length 
      });

      // If no results, try fallback queries
      if (pexelsResults.length === 0 && pixabayResults.length === 0) {
        console.log('No results, trying fallback...');
        const [fallbackPexels, fallbackPixabay] = await Promise.all([
          fetchPexelsImages('art', currentPage),
          fetchPixabayImages('art', currentPage)
        ]);
        pexelsResults.push(...fallbackPexels);
        pixabayResults.push(...fallbackPixabay);
      }

      // Normalize all images
      const categoryId = selectedCategories.includes('all') 
        ? null 
        : selectedCategories[0];

      const normalizedPexels = pexelsResults.map(photo => 
        normalizeImageData(photo, 'pexels', categoryId)
      );

      const normalizedPixabay = pixabayResults.map(photo => 
        normalizeImageData(photo, 'pixabay', categoryId)
      );

      let allImages = [...normalizedPexels, ...normalizedPixabay];

      // Remove duplicates and already seen images
      allImages = allImages.filter(img => {
        if (seenImageIds.current.has(img.id)) return false;
        seenImageIds.current.add(img.id);
        return true;
      });

      console.log('After deduplication:', allImages.length);

      // Validate images (parallel validation with limit)
      const validationBatch = 20; // Increased batch size for faster validation
      const validatedImages = [];
      
      for (let i = 0; i < allImages.length; i += validationBatch) {
        const batch = allImages.slice(i, i + validationBatch);
        const results = await Promise.all(
          batch.map(async (img) => {
            const isValid = await validateImageUrl(img.src);
            return isValid ? img : null;
          })
        );
        validatedImages.push(...results.filter(Boolean));
        
        // Early exit if we have enough images
        if (validatedImages.length >= 50) break;
      }

      console.log('After validation:', validatedImages.length);

      if (validatedImages.length === 0) {
        if (isInitial) {
          setError('No images found. Try different categories or check your connection.');
        }
        setHasMore(false);
        return;
      }

      // Filter by selected categories if needed
      let filteredImages = validatedImages;
      if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
        filteredImages = validatedImages.filter(img => 
          selectedCategories.includes(img.category)
        );
      }

      // Apply sorting based on feed type
      let sortedImages = [...filteredImages];
      
      switch (feedType) {
        case 'personalized':
          // Use recommendation engine
          sortedImages = recommendationEngine.getPersonalizedFeed 
            ? recommendationEngine.getPersonalizedFeed(sortedImages)
            : sortedImages.sort((a, b) => {
                // Fallback: sort by likes + views
                return (b.likes + b.views) - (a.likes + a.views);
              });
          break;
          
        case 'trending':
          sortedImages.sort((a, b) => 
            (b.trending * 0.5 + b.likes * 0.3 + b.views * 0.2) - 
            (a.trending * 0.5 + a.likes * 0.3 + a.views * 0.2)
          );
          break;
          
        case 'recent':
          sortedImages.sort((a, b) => b.timestamp - a.timestamp);
          break;
          
        default:
          sortedImages.sort((a, b) => (b.likes + b.views) - (a.likes + a.views));
      }

      console.log('Final processed images:', sortedImages.length);

      // Update images state
      setImages(prev => {
        if (isInitial) {
          return sortedImages;
        }
        // Merge with existing, removing any duplicates
        const existingIds = new Set(prev.map(img => img.id));
        const newUnique = sortedImages.filter(img => !existingIds.has(img.id));
        return [...prev, ...newUnique];
      });

      // Update page
      if (!isInitial) {
        setPage(prev => prev + 1);
      }

      // Check if we have more content
      if (sortedImages.length < 20) { // Changed from 10 to 20
        setHasMore(false);
      }

    } catch (error) {
      console.error('Error fetching content:', error);
      setError('Failed to load images. Please try again.');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [
    page,
    feedType,
    selectedCategories,
    getSearchQuery,
    fetchPexelsImages,
    fetchPixabayImages,
    normalizeImageData,
    validateImageUrl,
    recommendationEngine,
    PEXELS_API_KEY,
    PIXABAY_API_KEY
  ]);

  // Handle like with debouncing
  const handleLike = useCallback((imageId, imageData) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      const isLiked = newSet.has(imageId);
      
      if (isLiked) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
        
        // Record interaction
        if (recommendationEngine.recordInteraction) {
          recommendationEngine.recordInteraction(imageId, 'like', {
            category: imageData.category,
            artist: imageData.artist,
            tags: imageData.tags || [],
            timestamp: Date.now()
          });
        }
      }
      
      return newSet;
    });
  }, [recommendationEngine]);

  // Handle save
  const handleSave = useCallback((imageId, imageData) => {
    setSavedImages(prev => {
      const newSet = new Set(prev);
      const isSaved = newSet.has(imageId);
      
      if (isSaved) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
        
        // Record interaction
        if (recommendationEngine.recordInteraction) {
          recommendationEngine.recordInteraction(imageId, 'save', {
            category: imageData.category,
            artist: imageData.artist,
            tags: imageData.tags || [],
            timestamp: Date.now()
          });
        }
      }
      
      return newSet;
    });
  }, [recommendationEngine]);

  // Handle image view
  const handleImageView = useCallback((imageId, imageData) => {
    if (recommendationEngine.recordInteraction) {
      recommendationEngine.recordInteraction(imageId, 'view', {
        category: imageData.category,
        artist: imageData.artist,
        tags: imageData.tags || []
      });
    }
  }, [recommendationEngine]);

  // Format timestamp
  const formatTimestamp = useCallback((timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  }, []);

  // Load more function
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchPersonalizedContent(false);
    }
  }, [loading, hasMore, fetchPersonalizedContent]);

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
    fetchPersonalizedContent,
    loadMore,
    handleLike,
    handleSave,
    handleImageView,
    formatTimestamp
  };
};


// import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// import PersonalizedRecommendationEngine from './PersonalizedRecommendationEngine';

// export const useCollection = () => {
//   const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
//   const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [feedType, setFeedType] = useState('personalized');
//   const [selectedCategories, setSelectedCategories] = useState(['all']);
//   const [likedImages, setLikedImages] = useState(() => new Set());
//   const [savedImages, setSavedImages] = useState(() => new Set());
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
  
//   // Improved refs for better state management
//   const seenImageIds = useRef(new Set());
//   const fetchingRef = useRef(false);
//   const lastFetchTime = useRef(0);
//   const imageCache = useRef(new Map());
//   const failedUrls = useRef(new Set()); // Track failed image URLs

//   const recommendationEngine = useMemo(() => new PersonalizedRecommendationEngine(), []);

//   const categories = useMemo(() => [
//     { id: 'all', name: 'All', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
//     { id: 'art', name: 'Art & Paintings', color: 'bg-purple-500' },
//     { id: 'photography', name: 'Photography', color: 'bg-blue-500' },
//     { id: 'nature', name: 'Nature', color: 'bg-green-500' },
//     { id: 'architecture', name: 'Architecture', color: 'bg-gray-500' },
//     { id: 'abstract', name: 'Abstract', color: 'bg-pink-500' },
//     { id: 'minimal', name: 'Minimal', color: 'bg-indigo-500' },
//     { id: 'creative', name: 'Creative', color: 'bg-orange-500' },
//     { id: 'illustration', name: 'Illustrations', color: 'bg-yellow-500' }
//   ], []);

//   // Improved search terms with more variety
//   const categorySearchTerms = useMemo(() => ({
//     all: ['artistic creative', 'beautiful aesthetic', 'visual art', 'creative design', 'art photography'],
//     art: ['painting artwork', 'fine art canvas', 'artistic masterpiece', 'oil painting', 'watercolor art'],
//     photography: ['professional photography', 'artistic photo', 'creative photography', 'landscape photography', 'portrait photography'],
//     nature: ['nature landscape', 'scenic beautiful', 'natural environment', 'wildlife nature', 'forest landscape'],
//     architecture: ['architecture building', 'modern design', 'urban structure', 'interior design', 'architectural photography'],
//     abstract: ['abstract art', 'modern contemporary', 'geometric patterns', 'colorful abstract', 'digital abstract'],
//     minimal: ['minimalist simple', 'clean aesthetic', 'minimal design', 'simple composition', 'minimal art'],
//     creative: ['creative design', 'innovative unique', 'artistic concept', 'creative composition', 'art direction'],
//     illustration: ['digital illustration', 'vector art', 'graphic design', 'character illustration', 'concept art']
//   }), []);

//   // Reset when feed type or categories change
//   useEffect(() => {
//     console.log('Feed settings changed:', { feedType, selectedCategories });
//     setImages([]);
//     setPage(1);
//     setHasMore(true);
//     setError(null);
//     seenImageIds.current.clear();
//     imageCache.current.clear();
//     failedUrls.current.clear();
//     fetchingRef.current = false;
    
//     // Small delay to ensure state is clean
//     const timer = setTimeout(() => {
//       fetchPersonalizedContent(true);
//     }, 100);
    
//     return () => clearTimeout(timer);
//   }, [feedType, selectedCategories.join(',')]);

//   // **FIX: Better image validation with retry logic**
//   const validateImageUrl = useCallback(async (url, timeout = 3000, retries = 2) => {
//     if (!url) return false;
    
//     // Check cache first
//     if (imageCache.current.has(url)) {
//       return imageCache.current.get(url);
//     }

//     // Skip known failed URLs
//     if (failedUrls.current.has(url)) {
//       return false;
//     }

//     for (let attempt = 0; attempt <= retries; attempt++) {
//       try {
//         const isValid = await new Promise((resolve) => {
//           const img = new Image();
//           const timer = setTimeout(() => {
//             img.src = '';
//             resolve(false);
//           }, timeout);

//           img.onload = () => {
//             clearTimeout(timer);
//             resolve(true);
//           };

//           img.onerror = () => {
//             clearTimeout(timer);
//             resolve(false);
//           };

//           img.src = url;
//         });

//         if (isValid) {
//           imageCache.current.set(url, true);
//           return true;
//         }

//         // Wait before retry
//         if (attempt < retries) {
//           await new Promise(resolve => setTimeout(resolve, 500));
//         }
//       } catch (error) {
//         console.warn(`Image validation attempt ${attempt + 1} failed:`, error);
//       }
//     }

//     // Mark as failed after all retries
//     failedUrls.current.add(url);
//     imageCache.current.set(url, false);
//     return false;
//   }, []);

//   // **FIX: Better search query with more variety**
//   const getSearchQuery = useCallback(() => {
//     let queries = ['artistic creative'];
    
//     // Determine category with more variety
//     if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
//       const randomCategory = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
//       queries = categorySearchTerms[randomCategory] || queries;
//     } else if (feedType === 'personalized') {
//       // Get top preference from recommendation engine
//       const preferences = recommendationEngine.userProfile?.preferences || {};
//       const topCategories = Object.entries(preferences)
//         .sort(([, a], [, b]) => b - a)
//         .slice(0, 3)
//         .map(([category]) => category);
      
//       if (topCategories.length > 0) {
//         const randomTopCategory = topCategories[Math.floor(Math.random() * topCategories.length)];
//         queries = categorySearchTerms[randomTopCategory] || queries;
//       }
//     } else {
//       queries = categorySearchTerms.all;
//     }

//     // Add modifiers based on feed type
//     if (feedType === 'trending') {
//       queries = queries.map(query => `trending popular ${query}`);
//     } else if (feedType === 'recent') {
//       queries = queries.map(query => `latest new ${query}`);
//     }

//     // Return random query from available options
//     return queries[Math.floor(Math.random() * queries.length)];
//   }, [selectedCategories, feedType, categorySearchTerms, recommendationEngine]);

//   // **FIX: Better Pexels fetch with error handling**
//   const fetchPexelsImages = useCallback(async (query, currentPage) => {
//     if (!PEXELS_API_KEY) return [];

//     try {
//       // Alternate between curated and search for variety
//       const useCurated = currentPage % 3 === 1; // Every 3rd page use curated
//       const endpoint = useCurated 
//         ? 'https://api.pexels.com/v1/curated'
//         : 'https://api.pexels.com/v1/search';

//       const params = new URLSearchParams({
//         per_page: '30', // Reduced to get better quality over quantity
//         page: currentPage.toString()
//       });

//       if (endpoint.includes('search')) {
//         params.append('query', query);
//       }

//       const response = await fetch(`${endpoint}?${params}`, {
//         headers: { 
//           Authorization: PEXELS_API_KEY 
//         }
//       });

//       if (!response.ok) {
//         if (response.status === 429) {
//           console.warn('Pexels rate limit reached');
//           return [];
//         }
//         console.warn('Pexels API error:', response.status);
//         return [];
//       }

//       const data = await response.json();
//       return data.photos || [];
//     } catch (error) {
//       console.error('Pexels fetch error:', error);
//       return [];
//     }
//   }, [PEXELS_API_KEY]);

//   // **FIX: Better Pixabay fetch with quality filtering**
//   const fetchPixabayImages = useCallback(async (query, currentPage) => {
//     if (!PIXABAY_API_KEY) return [];

//     try {
//       const params = new URLSearchParams({
//         key: PIXABAY_API_KEY,
//         q: query,
//         image_type: 'photo',
//         per_page: '30', // Reduced for better quality
//         page: currentPage.toString(),
//         safesearch: 'true',
//         order: feedType === 'trending' ? 'popular' : 'latest',
//         min_width: '800', // Ensure good quality images
//         min_height: '600'
//       });

//       const response = await fetch(`https://pixabay.com/api/?${params}`);
      
//       if (!response.ok) {
//         console.warn('Pixabay API error:', response.status);
//         return [];
//       }

//       const data = await response.json();
//       return data.hits || [];
//     } catch (error) {
//       console.error('Pixabay fetch error:', error);
//       return [];
//     }
//   }, [PIXABAY_API_KEY, feedType]);

//   // **FIX: Improved image normalization with better fallbacks**
//   const normalizeImageData = useCallback((photo, source, categoryId) => {
//     const isPexels = source === 'pexels';
    
//     // Get image URL with better fallbacks
//     let imageUrl;
//     if (isPexels) {
//       imageUrl = photo.src?.large2x || photo.src?.large || photo.src?.medium || photo.src?.original;
//     } else {
//       imageUrl = photo.largeImageURL || photo.webformatURL;
      
//       // Prefer higher quality images from Pixabay
//       if (photo.imageURL) {
//         imageUrl = photo.imageURL;
//       } else if (photo.fullHDURL) {
//         imageUrl = photo.fullHDURL;
//       }
//     }

//     // Skip if no valid URL
//     if (!imageUrl) return null;

//     // Generate unique ID
//     const uniqueId = `${source}-${photo.id}-${Date.now()}`;

//     // Extract tags with better logic
//     let tags = [];
//     if (isPexels) {
//       tags = photo.alt 
//         ? photo.alt.toLowerCase().split(/[\s,]+/).filter(Boolean).slice(0, 8)
//         : ['art', 'creative', 'design'];
//     } else {
//       tags = photo.tags 
//         ? photo.tags.split(',').map(t => t.trim()).filter(Boolean).slice(0, 8)
//         : ['art', 'creative', 'design'];
//     }

//     // Add source-specific tags for variety
//     if (isPexels && photo.photographer) {
//       tags.push(photo.photographer.toLowerCase().replace(/\s+/g, ''));
//     }

//     // **FIX: Better category detection**
//     let category = categoryId;
//     if (!category || category === 'all') {
//       const tagStr = tags.join(' ').toLowerCase();
      
//       // Check for exact matches first
//       for (const [catId, terms] of Object.entries(categorySearchTerms)) {
//         if (catId !== 'all') {
//           const categoryWords = terms[0].toLowerCase().split(' ');
//           if (categoryWords.some(word => tagStr.includes(word))) {
//             category = catId;
//             break;
//           }
//         }
//       }
      
//       // Fallback to random category
//       if (!category || category === 'all') {
//         const nonAllCategories = categories.filter(cat => cat.id !== 'all');
//         category = nonAllCategories[Math.floor(Math.random() * nonAllCategories.length)].id;
//       }
//     }

//     // **FIX: Better metadata with more realistic numbers**
//     const baseTime = Date.now() - (Math.random() * 30 * 24 * 60 * 60 * 1000); // Within 30 days
    
//     return {
//       id: uniqueId,
//       src: imageUrl,
//       title: isPexels 
//         ? (photo.alt || `Artwork by ${photo.photographer || 'Unknown Artist'}`) 
//         : (tags.slice(0, 3).join(' ') || 'Creative Artwork'),
//       artist: isPexels ? (photo.photographer || 'Unknown Artist') : (photo.user || 'Unknown Artist'),
//       category,
//       likes: isPexels ? Math.floor(Math.random() * 500) + 100 : (photo.likes || Math.floor(Math.random() * 300) + 50),
//       views: isPexels ? Math.floor(Math.random() * 5000) + 1000 : (photo.views || Math.floor(Math.random() * 2000) + 500),
//       comments: Math.floor(Math.random() * 50) + 5,
//       shares: Math.floor(Math.random() * 30) + 2,
//       timestamp: baseTime,
//       trending: feedType === 'trending' 
//         ? Math.random() * 8 + 7 // Higher for trending
//         : Math.random() * 4 + 2,
//       tags,
//       description: isPexels 
//         ? (photo.alt || 'High-quality artistic image from Pexels') 
//         : (photo.tags || 'High-quality artistic image from Pixabay'),
//       avg_color: isPexels 
//         ? (photo.avg_color || `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`)
//         : `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
//       source,
//       originalData: photo,
//       width: isPexels ? photo.width : photo.webformatWidth,
//       height: isPexels ? photo.height : photo.webformatHeight
//     };
//   }, [categorySearchTerms, categories, feedType]);

//   // **FIX: Improved main fetch function with better error handling**
//   const fetchPersonalizedContent = useCallback(async (isInitial = false) => {
//     // Prevent concurrent fetches
//     if (fetchingRef.current) {
//       console.log('Already fetching, skipping...');
//       return;
//     }

//     // Rate limiting
//     const now = Date.now();
//     if (!isInitial && now - lastFetchTime.current < 800) {
//       console.log('Rate limited, skipping fetch');
//       return;
//     }

//     // Check if we have API keys
//     if (!PEXELS_API_KEY && !PIXABAY_API_KEY) {
//       setError('No API keys configured. Please add PEXELS or PIXABAY API keys.');
//       return;
//     }

//     fetchingRef.current = true;
//     lastFetchTime.current = now;
//     setLoading(true);
//     setError(null);

//     try {
//       const currentPage = isInitial ? 1 : page;
//       const query = getSearchQuery();
      
//       console.log('Fetching images:', { feedType, query, page: currentPage, selectedCategories });

//       // Fetch from both sources in parallel with timeout
//       const fetchWithTimeout = async (fetchFn, timeout = 10000) => {
//         return Promise.race([
//           fetchFn(query, currentPage),
//           new Promise((_, reject) => 
//             setTimeout(() => reject(new Error('Timeout')), timeout)
//           )
//         ]);
//       };

//       const [pexelsResults, pixabayResults] = await Promise.allSettled([
//         PEXELS_API_KEY ? fetchWithTimeout(fetchPexelsImages) : Promise.resolve([]),
//         PIXABAY_API_KEY ? fetchWithTimeout(fetchPixabayImages) : Promise.resolve([])
//       ]);

//       const pexelsData = pexelsResults.status === 'fulfilled' ? pexelsResults.value : [];
//       const pixabayData = pixabayResults.status === 'fulfilled' ? pixabayResults.value : [];

//       console.log('API Results:', { 
//         pexels: pexelsData.length, 
//         pixabay: pixabayData.length 
//       });

//       // If no results, try fallback with different query
//       if (pexelsData.length === 0 && pixabayData.length === 0) {
//         console.log('No results, trying fallback query...');
//         const fallbackQuery = 'art creative design';
//         const [fallbackPexels, fallbackPixabay] = await Promise.allSettled([
//           PEXELS_API_KEY ? fetchPexelsImages(fallbackQuery, currentPage) : Promise.resolve([]),
//           PIXABAY_API_KEY ? fetchPixabayImages(fallbackQuery, currentPage) : Promise.resolve([])
//         ]);
        
//         pexelsData.push(...(fallbackPexels.status === 'fulfilled' ? fallbackPexels.value : []));
//         pixabayData.push(...(fallbackPixabay.status === 'fulfilled' ? fallbackPixabay.value : []));
//       }

//       // Normalize all images and filter out nulls
//       const categoryId = selectedCategories.includes('all') 
//         ? null 
//         : selectedCategories[0];

//       const normalizedPexels = pexelsData
//         .map(photo => normalizeImageData(photo, 'pexels', categoryId))
//         .filter(Boolean);

//       const normalizedPixabay = pixabayData
//         .map(photo => normalizeImageData(photo, 'pixabay', categoryId))
//         .filter(Boolean);

//       let allImages = [...normalizedPexels, ...normalizedPixabay];

//       // Remove duplicates and already seen images
//       allImages = allImages.filter(img => {
//         if (seenImageIds.current.has(img.id)) return false;
//         seenImageIds.current.add(img.id);
//         return true;
//       });

//       console.log('After deduplication:', allImages.length);

//       // **FIX: Better image validation with parallel processing**
//       if (allImages.length > 0) {
//         const validationPromises = allImages.map(async (img) => {
//           const isValid = await validateImageUrl(img.src);
//           return isValid ? img : null;
//         });

//         const validatedResults = await Promise.all(validationPromises);
//         allImages = validatedResults.filter(Boolean);
//       }

//       console.log('After validation:', allImages.length);

//       if (allImages.length === 0) {
//         if (isInitial) {
//           setError('No valid images found. Try different categories or check your connection.');
//         }
//         setHasMore(currentPage < 10); // Allow more pages even if current returns empty
//         return;
//       }

//       // Filter by selected categories if needed
//       let filteredImages = allImages;
//       if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
//         filteredImages = allImages.filter(img => 
//           selectedCategories.includes(img.category)
//         );
//       }

//       // **FIX: Better sorting with more variety**
//       let sortedImages = [...filteredImages];
      
//       switch (feedType) {
//         case 'personalized':
//           if (recommendationEngine.getPersonalizedFeed) {
//             sortedImages = recommendationEngine.getPersonalizedFeed(sortedImages);
//           } else {
//             // Fallback: mix of popularity and randomness for variety
//             sortedImages.sort((a, b) => {
//               const scoreA = (a.likes * 0.4 + a.views * 0.3 + Math.random() * 0.3);
//               const scoreB = (b.likes * 0.4 + b.views * 0.3 + Math.random() * 0.3);
//               return scoreB - scoreA;
//             });
//           }
//           break;
          
//         case 'trending':
//           sortedImages.sort((a, b) => 
//             (b.trending * 0.6 + b.likes * 0.2 + b.views * 0.2) - 
//             (a.trending * 0.6 + a.likes * 0.2 + a.views * 0.2)
//           );
//           break;
          
//         case 'recent':
//           sortedImages.sort((a, b) => b.timestamp - a.timestamp);
//           break;
          
//         default:
//           // Add some randomness to default sort
//           sortedImages.sort((a, b) => {
//             const scoreA = (b.likes + b.views) * (0.8 + Math.random() * 0.4);
//             const scoreB = (a.likes + a.views) * (0.8 + Math.random() * 0.4);
//             return scoreA - scoreB;
//           });
//       }

//       console.log('Final processed images:', sortedImages.length);

//       // Update images state
//       setImages(prev => {
//         if (isInitial) {
//           return sortedImages;
//         }
//         // Merge with existing, removing any duplicates
//         const existingIds = new Set(prev.map(img => img.id));
//         const newUnique = sortedImages.filter(img => !existingIds.has(img.id));
//         const merged = [...prev, ...newUnique];
        
//         // Limit total images to prevent memory issues
//         if (merged.length > 500) {
//           return merged.slice(-400); // Keep last 400 images
//         }
//         return merged;
//       });

//       // Update page
//       if (!isInitial) {
//         setPage(prev => prev + 1);
//       }

//       // **FIX: Better hasMore logic**
//       const hasEnoughNewImages = sortedImages.length >= 15;
//       const hasReachedMaxPages = currentPage >= 20; // Safety limit
      
//       setHasMore(hasEnoughNewImages && !hasReachedMaxPages);

//     } catch (error) {
//       console.error('Error fetching content:', error);
//       setError('Failed to load images. Please try again.');
//       setHasMore(false); // Stop infinite scroll on error
//     } finally {
//       setLoading(false);
//       fetchingRef.current = false;
//     }
//   }, [
//     page,
//     feedType,
//     selectedCategories,
//     getSearchQuery,
//     fetchPexelsImages,
//     fetchPixabayImages,
//     normalizeImageData,
//     validateImageUrl,
//     recommendationEngine,
//     PEXELS_API_KEY,
//     PIXABAY_API_KEY
//   ]);

//   // Rest of the functions remain the same...
//   const handleLike = useCallback((imageId, imageData) => {
//     setLikedImages(prev => {
//       const newSet = new Set(prev);
//       const isLiked = newSet.has(imageId);
      
//       if (isLiked) {
//         newSet.delete(imageId);
//       } else {
//         newSet.add(imageId);
        
//         if (recommendationEngine.recordInteraction) {
//           recommendationEngine.recordInteraction(imageId, 'like', {
//             category: imageData.category,
//             artist: imageData.artist,
//             tags: imageData.tags || [],
//             timestamp: Date.now()
//           });
//         }
//       }
      
//       return newSet;
//     });
//   }, [recommendationEngine]);

//   const handleSave = useCallback((imageId, imageData) => {
//     setSavedImages(prev => {
//       const newSet = new Set(prev);
//       const isSaved = newSet.has(imageId);
      
//       if (isSaved) {
//         newSet.delete(imageId);
//       } else {
//         newSet.add(imageId);
        
//         if (recommendationEngine.recordInteraction) {
//           recommendationEngine.recordInteraction(imageId, 'save', {
//             category: imageData.category,
//             artist: imageData.artist,
//             tags: imageData.tags || [],
//             timestamp: Date.now()
//           });
//         }
//       }
      
//       return newSet;
//     });
//   }, [recommendationEngine]);

//   const handleImageView = useCallback((imageId, imageData) => {
//     if (recommendationEngine.recordInteraction) {
//       recommendationEngine.recordInteraction(imageId, 'view', {
//         category: imageData.category,
//         artist: imageData.artist,
//         tags: imageData.tags || []
//       });
//     }
//   }, [recommendationEngine]);

//   const formatTimestamp = useCallback((timestamp) => {
//     const now = Date.now();
//     const diff = now - timestamp;
//     const minutes = Math.floor(diff / (1000 * 60));
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
    
//     if (days > 0) return `${days}d ago`;
//     if (hours > 0) return `${hours}h ago`;
//     if (minutes > 0) return `${minutes}m ago`;
//     return 'Just now';
//   }, []);

//   const loadMore = useCallback(() => {
//     if (!loading && hasMore) {
//       fetchPersonalizedContent(false);
//     }
//   }, [loading, hasMore, fetchPersonalizedContent]);

//   return {
//     images,
//     loading,
//     error,
//     hasMore,
//     feedType,
//     setFeedType,
//     selectedCategories,
//     setSelectedCategories,
//     likedImages,
//     savedImages,
//     categories,
//     fetchPersonalizedContent,
//     loadMore,
//     handleLike,
//     handleSave,
//     handleImageView,
//     formatTimestamp
//   };
// };