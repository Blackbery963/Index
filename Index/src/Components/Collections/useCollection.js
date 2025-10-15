
// // import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// // import PersonalizedRecommendationEngine from './PersonalizedRecommendationEngine';

// // export const useCollection = () => {
// //   const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
// //   const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

// //   const [images, setImages] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [feedType, setFeedType] = useState('personalized');
// //   const [selectedCategories, setSelectedCategories] = useState(['all']);
// //   const [likedImages, setLikedImages] = useState(() => new Set());
// //   const [savedImages, setSavedImages] = useState(() => new Set());
// //   const [page, setPage] = useState(1);
// //   const [hasMore, setHasMore] = useState(true);
  
// //   // Improved refs for better state management
// //   const seenImageIds = useRef(new Set());
// //   const fetchingRef = useRef(false);
// //   const lastFetchTime = useRef(0);
// //   const imageCache = useRef(new Map());
// //   const failedUrls = useRef(new Set()); // Track failed image URLs

// //   const recommendationEngine = useMemo(() => new PersonalizedRecommendationEngine(), []);

// //   const categories = useMemo(() => [
// //     { id: 'all', name: 'All', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
// //     { id: 'art', name: 'Art & Paintings', color: 'bg-purple-500' },
// //     { id: 'photography', name: 'Photography', color: 'bg-blue-500' },
// //     { id: 'nature', name: 'Nature', color: 'bg-green-500' },
// //     { id: 'architecture', name: 'Architecture', color: 'bg-gray-500' },
// //     { id: 'abstract', name: 'Abstract', color: 'bg-pink-500' },
// //     { id: 'minimal', name: 'Minimal', color: 'bg-indigo-500' },
// //     { id: 'creative', name: 'Creative', color: 'bg-orange-500' },
// //     { id: 'illustration', name: 'Illustrations', color: 'bg-yellow-500' }
// //   ], []);

// //   // Improved search terms with more variety
// //   const categorySearchTerms = useMemo(() => ({
// //     all: ['artistic creative', 'beautiful aesthetic', 'visual art', 'creative design', 'art photography'],
// //     art: ['painting artwork', 'fine art canvas', 'artistic masterpiece', 'oil painting', 'watercolor art'],
// //     photography: ['professional photography', 'artistic photo', 'creative photography', 'landscape photography', 'portrait photography'],
// //     nature: ['nature landscape', 'scenic beautiful', 'natural environment', 'wildlife nature', 'forest landscape'],
// //     architecture: ['architecture building', 'modern design', 'urban structure', 'interior design', 'architectural photography'],
// //     abstract: ['abstract art', 'modern contemporary', 'geometric patterns', 'colorful abstract', 'digital abstract'],
// //     minimal: ['minimalist simple', 'clean aesthetic', 'minimal design', 'simple composition', 'minimal art'],
// //     creative: ['creative design', 'innovative unique', 'artistic concept', 'creative composition', 'art direction'],
// //     illustration: ['digital illustration', 'vector art', 'graphic design', 'character illustration', 'concept art']
// //   }), []);

// //   // Reset when feed type or categories change
// //   useEffect(() => {
// //     console.log('Feed settings changed:', { feedType, selectedCategories });
// //     setImages([]);
// //     setPage(1);
// //     setHasMore(true);
// //     setError(null);
// //     seenImageIds.current.clear();
// //     imageCache.current.clear();
// //     failedUrls.current.clear();
// //     fetchingRef.current = false;
    
// //     // Small delay to ensure state is clean
// //     const timer = setTimeout(() => {
// //       fetchPersonalizedContent(true);
// //     }, 100);
    
// //     return () => clearTimeout(timer);
// //   }, [feedType, selectedCategories.join(',')]);

// //   // **FIX: Better image validation with retry logic**
// //   const validateImageUrl = useCallback(async (url, timeout = 3000, retries = 2) => {
// //     if (!url) return false;
    
// //     // Check cache first
// //     if (imageCache.current.has(url)) {
// //       return imageCache.current.get(url);
// //     }

// //     // Skip known failed URLs
// //     if (failedUrls.current.has(url)) {
// //       return false;
// //     }

// //     for (let attempt = 0; attempt <= retries; attempt++) {
// //       try {
// //         const isValid = await new Promise((resolve) => {
// //           const img = new Image();
// //           const timer = setTimeout(() => {
// //             img.src = '';
// //             resolve(false);
// //           }, timeout);

// //           img.onload = () => {
// //             clearTimeout(timer);
// //             resolve(true);
// //           };

// //           img.onerror = () => {
// //             clearTimeout(timer);
// //             resolve(false);
// //           };

// //           img.src = url;
// //         });

// //         if (isValid) {
// //           imageCache.current.set(url, true);
// //           return true;
// //         }

// //         // Wait before retry
// //         if (attempt < retries) {
// //           await new Promise(resolve => setTimeout(resolve, 500));
// //         }
// //       } catch (error) {
// //         console.warn(`Image validation attempt ${attempt + 1} failed:`, error);
// //       }
// //     }

// //     // Mark as failed after all retries
// //     failedUrls.current.add(url);
// //     imageCache.current.set(url, false);
// //     return false;
// //   }, []);

// //   // **FIX: Better search query with more variety**
// //   const getSearchQuery = useCallback(() => {
// //     let queries = ['artistic creative'];
    
// //     // Determine category with more variety
// //     if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
// //       const randomCategory = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
// //       queries = categorySearchTerms[randomCategory] || queries;
// //     } else if (feedType === 'personalized') {
// //       // Get top preference from recommendation engine
// //       const preferences = recommendationEngine.userProfile?.preferences || {};
// //       const topCategories = Object.entries(preferences)
// //         .sort(([, a], [, b]) => b - a)
// //         .slice(0, 3)
// //         .map(([category]) => category);
      
// //       if (topCategories.length > 0) {
// //         const randomTopCategory = topCategories[Math.floor(Math.random() * topCategories.length)];
// //         queries = categorySearchTerms[randomTopCategory] || queries;
// //       }
// //     } else {
// //       queries = categorySearchTerms.all;
// //     }

// //     // Add modifiers based on feed type
// //     if (feedType === 'trending') {
// //       queries = queries.map(query => `trending popular ${query}`);
// //     } else if (feedType === 'recent') {
// //       queries = queries.map(query => `latest new ${query}`);
// //     }

// //     // Return random query from available options
// //     return queries[Math.floor(Math.random() * queries.length)];
// //   }, [selectedCategories, feedType, categorySearchTerms, recommendationEngine]);

// //   // **FIX: Better Pexels fetch with error handling**
// //   const fetchPexelsImages = useCallback(async (query, currentPage) => {
// //     if (!PEXELS_API_KEY) return [];

// //     try {
// //       // Alternate between curated and search for variety
// //       const useCurated = currentPage % 3 === 1; // Every 3rd page use curated
// //       const endpoint = useCurated 
// //         ? 'https://api.pexels.com/v1/curated'
// //         : 'https://api.pexels.com/v1/search';

// //       const params = new URLSearchParams({
// //         per_page: '30', // Reduced to get better quality over quantity
// //         page: currentPage.toString()
// //       });

// //       if (endpoint.includes('search')) {
// //         params.append('query', query);
// //       }

// //       const response = await fetch(`${endpoint}?${params}`, {
// //         headers: { 
// //           Authorization: PEXELS_API_KEY 
// //         }
// //       });

// //       if (!response.ok) {
// //         if (response.status === 429) {
// //           console.warn('Pexels rate limit reached');
// //           return [];
// //         }
// //         console.warn('Pexels API error:', response.status);
// //         return [];
// //       }

// //       const data = await response.json();
// //       return data.photos || [];
// //     } catch (error) {
// //       console.error('Pexels fetch error:', error);
// //       return [];
// //     }
// //   }, [PEXELS_API_KEY]);

// //   // **FIX: Better Pixabay fetch with quality filtering**
// //   const fetchPixabayImages = useCallback(async (query, currentPage) => {
// //     if (!PIXABAY_API_KEY) return [];

// //     try {
// //       const params = new URLSearchParams({
// //         key: PIXABAY_API_KEY,
// //         q: query,
// //         image_type: 'photo',
// //         per_page: '30', // Reduced for better quality
// //         page: currentPage.toString(),
// //         safesearch: 'true',
// //         order: feedType === 'trending' ? 'popular' : 'latest',
// //         min_width: '800', // Ensure good quality images
// //         min_height: '600'
// //       });

// //       const response = await fetch(`https://pixabay.com/api/?${params}`);
      
// //       if (!response.ok) {
// //         console.warn('Pixabay API error:', response.status);
// //         return [];
// //       }

// //       const data = await response.json();
// //       return data.hits || [];
// //     } catch (error) {
// //       console.error('Pixabay fetch error:', error);
// //       return [];
// //     }
// //   }, [PIXABAY_API_KEY, feedType]);

// //   // **FIX: Improved image normalization with better fallbacks**
// //   const normalizeImageData = useCallback((photo, source, categoryId) => {
// //     const isPexels = source === 'pexels';
    
// //     // Get image URL with better fallbacks
// //     let imageUrl;
// //     if (isPexels) {
// //       imageUrl = photo.src?.large2x || photo.src?.large || photo.src?.medium || photo.src?.original;
// //     } else {
// //       imageUrl = photo.largeImageURL || photo.webformatURL;
      
// //       // Prefer higher quality images from Pixabay
// //       if (photo.imageURL) {
// //         imageUrl = photo.imageURL;
// //       } else if (photo.fullHDURL) {
// //         imageUrl = photo.fullHDURL;
// //       }
// //     }

// //     // Skip if no valid URL
// //     if (!imageUrl) return null;

// //     // Generate unique ID
// //     const uniqueId = `${source}-${photo.id}-${Date.now()}`;

// //     // Extract tags with better logic
// //     let tags = [];
// //     if (isPexels) {
// //       tags = photo.alt 
// //         ? photo.alt.toLowerCase().split(/[\s,]+/).filter(Boolean).slice(0, 8)
// //         : ['art', 'creative', 'design'];
// //     } else {
// //       tags = photo.tags 
// //         ? photo.tags.split(',').map(t => t.trim()).filter(Boolean).slice(0, 8)
// //         : ['art', 'creative', 'design'];
// //     }

// //     // Add source-specific tags for variety
// //     if (isPexels && photo.photographer) {
// //       tags.push(photo.photographer.toLowerCase().replace(/\s+/g, ''));
// //     }

// //     // **FIX: Better category detection**
// //     let category = categoryId;
// //     if (!category || category === 'all') {
// //       const tagStr = tags.join(' ').toLowerCase();
      
// //       // Check for exact matches first
// //       for (const [catId, terms] of Object.entries(categorySearchTerms)) {
// //         if (catId !== 'all') {
// //           const categoryWords = terms[0].toLowerCase().split(' ');
// //           if (categoryWords.some(word => tagStr.includes(word))) {
// //             category = catId;
// //             break;
// //           }
// //         }
// //       }
      
// //       // Fallback to random category
// //       if (!category || category === 'all') {
// //         const nonAllCategories = categories.filter(cat => cat.id !== 'all');
// //         category = nonAllCategories[Math.floor(Math.random() * nonAllCategories.length)].id;
// //       }
// //     }

// //     // **FIX: Better metadata with more realistic numbers**
// //     const baseTime = Date.now() - (Math.random() * 30 * 24 * 60 * 60 * 1000); // Within 30 days
    
// //     return {
// //       id: uniqueId,
// //       src: imageUrl,
// //       title: isPexels 
// //         ? (photo.alt || `Artwork by ${photo.photographer || 'Unknown Artist'}`) 
// //         : (tags.slice(0, 3).join(' ') || 'Creative Artwork'),
// //       artist: isPexels ? (photo.photographer || 'Unknown Artist') : (photo.user || 'Unknown Artist'),
// //       category,
// //       likes: isPexels ? Math.floor(Math.random() * 500) + 100 : (photo.likes || Math.floor(Math.random() * 300) + 50),
// //       views: isPexels ? Math.floor(Math.random() * 5000) + 1000 : (photo.views || Math.floor(Math.random() * 2000) + 500),
// //       comments: Math.floor(Math.random() * 50) + 5,
// //       shares: Math.floor(Math.random() * 30) + 2,
// //       timestamp: baseTime,
// //       trending: feedType === 'trending' 
// //         ? Math.random() * 8 + 7 // Higher for trending
// //         : Math.random() * 4 + 2,
// //       tags,
// //       description: isPexels 
// //         ? (photo.alt || 'High-quality artistic image from Pexels') 
// //         : (photo.tags || 'High-quality artistic image from Pixabay'),
// //       avg_color: isPexels 
// //         ? (photo.avg_color || `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`)
// //         : `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
// //       source,
// //       originalData: photo,
// //       width: isPexels ? photo.width : photo.webformatWidth,
// //       height: isPexels ? photo.height : photo.webformatHeight
// //     };
// //   }, [categorySearchTerms, categories, feedType]);

// //   // **FIX: Improved main fetch function with better error handling**
// //   const fetchPersonalizedContent = useCallback(async (isInitial = false) => {
// //     // Prevent concurrent fetches
// //     if (fetchingRef.current) {
// //       console.log('Already fetching, skipping...');
// //       return;
// //     }

// //     // Rate limiting
// //     const now = Date.now();
// //     if (!isInitial && now - lastFetchTime.current < 800) {
// //       console.log('Rate limited, skipping fetch');
// //       return;
// //     }

// //     // Check if we have API keys
// //     if (!PEXELS_API_KEY && !PIXABAY_API_KEY) {
// //       setError('No API keys configured. Please add PEXELS or PIXABAY API keys.');
// //       return;
// //     }

// //     fetchingRef.current = true;
// //     lastFetchTime.current = now;
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const currentPage = isInitial ? 1 : page;
// //       const query = getSearchQuery();
      
// //       console.log('Fetching images:', { feedType, query, page: currentPage, selectedCategories });

// //       // Fetch from both sources in parallel with timeout
// //       const fetchWithTimeout = async (fetchFn, timeout = 10000) => {
// //         return Promise.race([
// //           fetchFn(query, currentPage),
// //           new Promise((_, reject) => 
// //             setTimeout(() => reject(new Error('Timeout')), timeout)
// //           )
// //         ]);
// //       };

// //       const [pexelsResults, pixabayResults] = await Promise.allSettled([
// //         PEXELS_API_KEY ? fetchWithTimeout(fetchPexelsImages) : Promise.resolve([]),
// //         PIXABAY_API_KEY ? fetchWithTimeout(fetchPixabayImages) : Promise.resolve([])
// //       ]);

// //       const pexelsData = pexelsResults.status === 'fulfilled' ? pexelsResults.value : [];
// //       const pixabayData = pixabayResults.status === 'fulfilled' ? pixabayResults.value : [];

// //       console.log('API Results:', { 
// //         pexels: pexelsData.length, 
// //         pixabay: pixabayData.length 
// //       });

// //       // If no results, try fallback with different query
// //       if (pexelsData.length === 0 && pixabayData.length === 0) {
// //         console.log('No results, trying fallback query...');
// //         const fallbackQuery = 'art creative design';
// //         const [fallbackPexels, fallbackPixabay] = await Promise.allSettled([
// //           PEXELS_API_KEY ? fetchPexelsImages(fallbackQuery, currentPage) : Promise.resolve([]),
// //           PIXABAY_API_KEY ? fetchPixabayImages(fallbackQuery, currentPage) : Promise.resolve([])
// //         ]);
        
// //         pexelsData.push(...(fallbackPexels.status === 'fulfilled' ? fallbackPexels.value : []));
// //         pixabayData.push(...(fallbackPixabay.status === 'fulfilled' ? fallbackPixabay.value : []));
// //       }

// //       // Normalize all images and filter out nulls
// //       const categoryId = selectedCategories.includes('all') 
// //         ? null 
// //         : selectedCategories[0];

// //       const normalizedPexels = pexelsData
// //         .map(photo => normalizeImageData(photo, 'pexels', categoryId))
// //         .filter(Boolean);

// //       const normalizedPixabay = pixabayData
// //         .map(photo => normalizeImageData(photo, 'pixabay', categoryId))
// //         .filter(Boolean);

// //       let allImages = [...normalizedPexels, ...normalizedPixabay];

// //       // Remove duplicates and already seen images
// //       allImages = allImages.filter(img => {
// //         if (seenImageIds.current.has(img.id)) return false;
// //         seenImageIds.current.add(img.id);
// //         return true;
// //       });

// //       console.log('After deduplication:', allImages.length);

// //       // **FIX: Better image validation with parallel processing**
// //       if (allImages.length > 0) {
// //         const validationPromises = allImages.map(async (img) => {
// //           const isValid = await validateImageUrl(img.src);
// //           return isValid ? img : null;
// //         });

// //         const validatedResults = await Promise.all(validationPromises);
// //         allImages = validatedResults.filter(Boolean);
// //       }

// //       console.log('After validation:', allImages.length);

// //       if (allImages.length === 0) {
// //         if (isInitial) {
// //           setError('No valid images found. Try different categories or check your connection.');
// //         }
// //         setHasMore(currentPage < 10); // Allow more pages even if current returns empty
// //         return;
// //       }

// //       // Filter by selected categories if needed
// //       let filteredImages = allImages;
// //       if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
// //         filteredImages = allImages.filter(img => 
// //           selectedCategories.includes(img.category)
// //         );
// //       }

// //       // **FIX: Better sorting with more variety**
// //       let sortedImages = [...filteredImages];
      
// //       switch (feedType) {
// //         case 'personalized':
// //           if (recommendationEngine.getPersonalizedFeed) {
// //             sortedImages = recommendationEngine.getPersonalizedFeed(sortedImages);
// //           } else {
// //             // Fallback: mix of popularity and randomness for variety
// //             sortedImages.sort((a, b) => {
// //               const scoreA = (a.likes * 0.4 + a.views * 0.3 + Math.random() * 0.3);
// //               const scoreB = (b.likes * 0.4 + b.views * 0.3 + Math.random() * 0.3);
// //               return scoreB - scoreA;
// //             });
// //           }
// //           break;
          
// //         case 'trending':
// //           sortedImages.sort((a, b) => 
// //             (b.trending * 0.6 + b.likes * 0.2 + b.views * 0.2) - 
// //             (a.trending * 0.6 + a.likes * 0.2 + a.views * 0.2)
// //           );
// //           break;
          
// //         case 'recent':
// //           sortedImages.sort((a, b) => b.timestamp - a.timestamp);
// //           break;
          
// //         default:
// //           // Add some randomness to default sort
// //           sortedImages.sort((a, b) => {
// //             const scoreA = (b.likes + b.views) * (0.8 + Math.random() * 0.4);
// //             const scoreB = (a.likes + a.views) * (0.8 + Math.random() * 0.4);
// //             return scoreA - scoreB;
// //           });
// //       }

// //       console.log('Final processed images:', sortedImages.length);

// //       // Update images state
// //       setImages(prev => {
// //         if (isInitial) {
// //           return sortedImages;
// //         }
// //         // Merge with existing, removing any duplicates
// //         const existingIds = new Set(prev.map(img => img.id));
// //         const newUnique = sortedImages.filter(img => !existingIds.has(img.id));
// //         const merged = [...prev, ...newUnique];
        
// //         // Limit total images to prevent memory issues
// //         if (merged.length > 500) {
// //           return merged.slice(-400); // Keep last 400 images
// //         }
// //         return merged;
// //       });

// //       // Update page
// //       if (!isInitial) {
// //         setPage(prev => prev + 1);
// //       }

// //       // **FIX: Better hasMore logic**
// //       const hasEnoughNewImages = sortedImages.length >= 15;
// //       const hasReachedMaxPages = currentPage >= 20; // Safety limit
      
// //       setHasMore(hasEnoughNewImages && !hasReachedMaxPages);

// //     } catch (error) {
// //       console.error('Error fetching content:', error);
// //       setError('Failed to load images. Please try again.');
// //       setHasMore(false); // Stop infinite scroll on error
// //     } finally {
// //       setLoading(false);
// //       fetchingRef.current = false;
// //     }
// //   }, [
// //     page,
// //     feedType,
// //     selectedCategories,
// //     getSearchQuery,
// //     fetchPexelsImages,
// //     fetchPixabayImages,
// //     normalizeImageData,
// //     validateImageUrl,
// //     recommendationEngine,
// //     PEXELS_API_KEY,
// //     PIXABAY_API_KEY
// //   ]);

// //   // Rest of the functions remain the same...
// //   const handleLike = useCallback((imageId, imageData) => {
// //     setLikedImages(prev => {
// //       const newSet = new Set(prev);
// //       const isLiked = newSet.has(imageId);
      
// //       if (isLiked) {
// //         newSet.delete(imageId);
// //       } else {
// //         newSet.add(imageId);
        
// //         if (recommendationEngine.recordInteraction) {
// //           recommendationEngine.recordInteraction(imageId, 'like', {
// //             category: imageData.category,
// //             artist: imageData.artist,
// //             tags: imageData.tags || [],
// //             timestamp: Date.now()
// //           });
// //         }
// //       }
      
// //       return newSet;
// //     });
// //   }, [recommendationEngine]);

// //   const handleSave = useCallback((imageId, imageData) => {
// //     setSavedImages(prev => {
// //       const newSet = new Set(prev);
// //       const isSaved = newSet.has(imageId);
      
// //       if (isSaved) {
// //         newSet.delete(imageId);
// //       } else {
// //         newSet.add(imageId);
        
// //         if (recommendationEngine.recordInteraction) {
// //           recommendationEngine.recordInteraction(imageId, 'save', {
// //             category: imageData.category,
// //             artist: imageData.artist,
// //             tags: imageData.tags || [],
// //             timestamp: Date.now()
// //           });
// //         }
// //       }
      
// //       return newSet;
// //     });
// //   }, [recommendationEngine]);

// //   const handleImageView = useCallback((imageId, imageData) => {
// //     if (recommendationEngine.recordInteraction) {
// //       recommendationEngine.recordInteraction(imageId, 'view', {
// //         category: imageData.category,
// //         artist: imageData.artist,
// //         tags: imageData.tags || []
// //       });
// //     }
// //   }, [recommendationEngine]);

// //   const formatTimestamp = useCallback((timestamp) => {
// //     const now = Date.now();
// //     const diff = now - timestamp;
// //     const minutes = Math.floor(diff / (1000 * 60));
// //     const hours = Math.floor(minutes / 60);
// //     const days = Math.floor(hours / 24);
    
// //     if (days > 0) return `${days}d ago`;
// //     if (hours > 0) return `${hours}h ago`;
// //     if (minutes > 0) return `${minutes}m ago`;
// //     return 'Just now';
// //   }, []);

// //   const loadMore = useCallback(() => {
// //     if (!loading && hasMore) {
// //       fetchPersonalizedContent(false);
// //     }
// //   }, [loading, hasMore, fetchPersonalizedContent]);

// //   return {
// //     images,
// //     loading,
// //     error,
// //     hasMore,
// //     feedType,
// //     setFeedType,
// //     selectedCategories,
// //     setSelectedCategories,
// //     likedImages,
// //     savedImages,
// //     categories,
// //     fetchPersonalizedContent,
// //     loadMore,
// //     handleLike,
// //     handleSave,
// //     handleImageView,
// //     formatTimestamp
// //   };
// // };


// import { useState, useEffect, useCallback, useRef } from 'react';

// export const useCollection = () => {
//   const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
//   const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [feedType, setFeedType] = useState('personalized');
//   const [selectedCategories, setSelectedCategories] = useState(['all']);
//   const [likedImages, setLikedImages] = useState(new Set());
//   const [savedImages, setSavedImages] = useState(new Set());
//   const [hasMore, setHasMore] = useState(true);

//   const pageRef = useRef(1);
//   const fetchingRef = useRef(false);

//   const categories = [
//     { id: 'all', name: 'All', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
//     { id: 'art', name: 'Art', color: 'bg-purple-500' },
//     { id: 'nature', name: 'Nature', color: 'bg-green-500' },
//     { id: 'architecture', name: 'Architecture', color: 'bg-gray-500' },
//     { id: 'abstract', name: 'Abstract', color: 'bg-pink-500' },
//   ];

//   const categoryQueries = {
//     art: 'painting art creative',
//     nature: 'nature landscape',
//     architecture: 'architecture building',
//     abstract: 'abstract geometric'
//   };

//   // Fallback to Lorem Picsum
//   const getFallbackImages = useCallback((count = 20) => {
//     const imageTypes = ['art', 'nature', 'architecture', 'abstract'];
//     const fallbackImages = [];
    
//     for (let i = 0; i < count; i++) {
//       const type = imageTypes[Math.floor(Math.random() * imageTypes.length)];
//       const width = 800 + Math.floor(Math.random() * 400);
//       const height = 600 + Math.floor(Math.random() * 400);
      
//       fallbackImages.push({
//         id: `fallback-${Date.now()}-${i}`,
//         src: `https://picsum.photos/${width}/${height}?random=${Date.now()}-${i}`,
//         title: `${type.charAt(0).toUpperCase() + type.slice(1)} Artwork ${i + 1}`,
//         artist: `Artist ${Math.floor(Math.random() * 100) + 1}`,
//         category: type,
//         likes: Math.floor(Math.random() * 1000) + 50,
//         views: Math.floor(Math.random() * 5000) + 200,
//         comments: Math.floor(Math.random() * 100) + 5,
//         tags: [type, 'art', 'creative'],
//         description: `Beautiful ${type} artwork created by talented artists.`,
//         source: 'picsum'
//       });
//     }
    
//     return fallbackImages;
//   }, []);

//   // Try Pexels API
//   const fetchPexels = useCallback(async (query, page) => {
//     if (!PEXELS_API_KEY) return [];
    
//     try {
//       const response = await fetch(
//         `https://api.pexels.com/v1/search?query=${query}&per_page=20&page=${page}`,
//         {
//           headers: { Authorization: PEXELS_API_KEY }
//         }
//       );
      
//       if (!response.ok) throw new Error('Pexels API failed');
      
//       const data = await response.json();
//       return data.photos.map(photo => ({
//         id: `pexels-${photo.id}`,
//         src: photo.src.large,
//         title: photo.alt || 'Artwork',
//         artist: photo.photographer,
//         category: Object.keys(categoryQueries).find(cat => 
//           photo.alt?.toLowerCase().includes(cat)
//         ) || 'art',
//         likes: Math.floor(Math.random() * 1000) + 50,
//         views: Math.floor(Math.random() * 5000) + 200,
//         comments: Math.floor(Math.random() * 100) + 5,
//         tags: photo.alt ? photo.alt.toLowerCase().split(' ').slice(0, 3) : ['art'],
//         description: photo.alt || 'Beautiful artwork from Pexels',
//         source: 'pexels'
//       }));
//     } catch (error) {
//       console.log('Pexels failed, using fallback');
//       return [];
//     }
//   }, [PEXELS_API_KEY, categoryQueries]);

//   // Try Pixabay API
//   const fetchPixabay = useCallback(async (query, page) => {
//     if (!PIXABAY_API_KEY) return [];
    
//     try {
//       const response = await fetch(
//         `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&image_type=photo&per_page=20&page=${page}`
//       );
      
//       if (!response.ok) throw new Error('Pixabay API failed');
      
//       const data = await response.json();
//       return data.hits.map(photo => ({
//         id: `pixabay-${photo.id}`,
//         src: photo.largeImageURL,
//         title: photo.tags?.split(',')[0] || 'Artwork',
//         artist: photo.user,
//         category: Object.keys(categoryQueries).find(cat => 
//           photo.tags?.toLowerCase().includes(cat)
//         ) || 'art',
//         likes: photo.likes || Math.floor(Math.random() * 1000) + 50,
//         views: photo.views || Math.floor(Math.random() * 5000) + 200,
//         comments: Math.floor(Math.random() * 100) + 5,
//         tags: photo.tags ? photo.tags.split(',').slice(0, 3) : ['art'],
//         description: photo.tags || 'Beautiful artwork from Pixabay',
//         source: 'pixabay'
//       }));
//     } catch (error) {
//       console.log('Pixabay failed, using fallback');
//       return [];
//     }
//   }, [PIXABAY_API_KEY, categoryQueries]);

//   // Main image loading function
//   const loadImages = useCallback(async (reset = false) => {
//     if (fetchingRef.current) return;
    
//     fetchingRef.current = true;
//     setLoading(true);
//     setError(null);

//     try {
//       const currentPage = reset ? 1 : pageRef.current;
//       const query = selectedCategories.includes('all') 
//         ? 'art' 
//         : categoryQueries[selectedCategories[0]] || 'art';

//       console.log('Fetching images:', { query, page: currentPage, feedType });

//       // Try APIs in sequence, fallback to Lorem Picsum
//       let apiImages = [];
      
//       // Try Pexels first
//       apiImages = await fetchPexels(query, currentPage);
      
//       // If Pexels fails, try Pixabay
//       if (apiImages.length === 0) {
//         apiImages = await fetchPixabay(query, currentPage);
//       }
      
//       // If both APIs fail, use fallback
//       if (apiImages.length === 0) {
//         console.log('Using fallback images');
//         apiImages = getFallbackImages(20);
//       }

//       // Filter by category if needed
//       let filteredImages = apiImages;
//       if (!selectedCategories.includes('all')) {
//         filteredImages = apiImages.filter(img => 
//           selectedCategories.includes(img.category)
//         );
//       }

//       // Apply feed type sorting
//       let sortedImages = [...filteredImages];
//       if (feedType === 'trending') {
//         sortedImages.sort((a, b) => b.likes - a.likes);
//       } else if (feedType === 'recent') {
//         // For recent, we'll simulate with random order since APIs don't provide timestamps
//         sortedImages.sort(() => Math.random() - 0.5);
//       }

//       // Update state
//       if (reset) {
//         setImages(sortedImages);
//         pageRef.current = 1;
//       } else {
//         setImages(prev => {
//           const existingIds = new Set(prev.map(img => img.id));
//           const newImages = sortedImages.filter(img => !existingIds.has(img.id));
//           return [...prev, ...newImages];
//         });
//         pageRef.current = currentPage + 1;
//       }

//       // Set hasMore - be conservative with APIs
//       setHasMore(sortedImages.length >= 15);

//     } catch (err) {
//       console.error('Image loading error:', err);
//       // Even if everything fails, use fallback
//       const fallbackImages = getFallbackImages(20);
//       if (reset) {
//         setImages(fallbackImages);
//       } else {
//         setImages(prev => [...prev, ...fallbackImages]);
//       }
//       setHasMore(true);
//     } finally {
//       setLoading(false);
//       fetchingRef.current = false;
//     }
//   }, [feedType, selectedCategories, fetchPexels, fetchPixabay, getFallbackImages, categoryQueries]);

//   // Initial load and reset on changes
//   useEffect(() => {
//     loadImages(true);
//   }, [feedType, selectedCategories.join(',')]);

//   const handleLike = useCallback((imageId) => {
//     setLikedImages(prev => {
//       const newSet = new Set(prev);
//       newSet.has(imageId) ? newSet.delete(imageId) : newSet.add(imageId);
//       return newSet;
//     });
//   }, []);

//   const handleSave = useCallback((imageId) => {
//     setSavedImages(prev => {
//       const newSet = new Set(prev);
//       newSet.has(imageId) ? newSet.delete(imageId) : newSet.add(imageId);
//       return newSet;
//     });
//   }, []);

//   const formatTimestamp = useCallback(() => {
//     const times = ['2h ago', '1d ago', '3d ago', '1w ago'];
//     return times[Math.floor(Math.random() * times.length)];
//   }, []);

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
//     loadMore: () => loadImages(false),
//     handleLike,
//     handleSave,
//     handleImageView: () => {},
//     formatTimestamp,
//   };
// };


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

  // CORS proxy for development
  const getProxyUrl = (url) => {
    const isDev = window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1';
    return isDev ? `https://corsproxy.io/?${encodeURIComponent(url)}` : url;
  };

  const categories = [
    { id: 'all', name: 'All', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'art', name: 'Art', color: 'bg-purple-500' },
    { id: 'nature', name: 'Nature', color: 'bg-green-500' },
    { id: 'architecture', name: 'Architecture', color: 'bg-gray-500' },
    { id: 'abstract', name: 'Abstract', color: 'bg-pink-500' },
    { id: 'portrait', name: 'Portrait', color: 'bg-blue-500' },
    { id: 'landscape', name: 'Landscape', color: 'bg-teal-500' },
  ];

  const categoryQueries = {
    art: ['painting', 'digital art', 'watercolor', 'oil painting', 'illustration'],
    nature: ['nature', 'landscape', 'forest', 'mountains', 'ocean'],
    architecture: ['architecture', 'building', 'modern design', 'interior'],
    abstract: ['abstract', 'geometric', 'pattern', 'colorful'],
    portrait: ['portrait', 'people', 'face', 'person'],
    landscape: ['landscape', 'scenery', 'panorama', 'vista']
  };

  // Enhanced fallback with better quality and variety
  const getFallbackImages = useCallback((count = 20, category = 'all') => {
    const fallbackImages = [];
    const baseCategories = category === 'all' 
      ? ['art', 'nature', 'architecture', 'abstract', 'portrait', 'landscape']
      : [category];
    
    for (let i = 0; i < count; i++) {
      const cat = baseCategories[Math.floor(Math.random() * baseCategories.length)];
      const seed = `${cat}-${Date.now()}-${i}-${Math.random()}`;
      const width = 1200;
      const height = 800;
      
      // Use unsplash source for better quality fallback
      const imageUrl = `https://source.unsplash.com/random/${width}x${height}/?${cat},art`;
      
      fallbackImages.push({
        id: `fallback-${seed}`,
        src: imageUrl,
        thumb: `https://source.unsplash.com/random/400x300/?${cat}`,
        title: `${cat.charAt(0).toUpperCase() + cat.slice(1)} Collection ${i + 1}`,
        artist: `Featured Artist ${Math.floor(Math.random() * 100) + 1}`,
        category: cat,
        likes: Math.floor(Math.random() * 2000) + 100,
        views: Math.floor(Math.random() * 10000) + 500,
        comments: Math.floor(Math.random() * 150) + 10,
        tags: [cat, 'art', 'creative', 'featured'],
        description: `Beautiful ${cat} artwork from our curated collection.`,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'unsplash-fallback',
        width,
        height
      });
    }
    
    return fallbackImages;
  }, []);

  // Enhanced Pexels fetch with better error handling
  const fetchPexels = useCallback(async (query, page) => {
    if (!PEXELS_API_KEY) return [];
    
    try {
      const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=20&page=${page}&orientation=landscape`;
      const response = await fetch(url, {
        headers: { 
          Authorization: PEXELS_API_KEY,
          'Accept': 'application/json'
        },
        signal: AbortSignal.timeout(10000)
      });
      
      if (!response.ok) throw new Error(`Pexels API error: ${response.status}`);
      
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
            artistUrl: photo.photographer_url,
            category,
            likes: Math.floor(Math.random() * 2000) + 100,
            views: Math.floor(Math.random() * 10000) + 500,
            comments: Math.floor(Math.random() * 150) + 10,
            tags: photo.alt ? photo.alt.toLowerCase().split(' ').filter(t => t.length > 3).slice(0, 5) : ['art'],
            description: photo.alt || `Beautiful artwork by ${photo.photographer}`,
            timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            source: 'pexels',
            width: photo.width,
            height: photo.height,
            avgColor: photo.avg_color
          };
        });
    } catch (error) {
      console.warn('Pexels fetch failed:', error.message);
      return [];
    }
  }, [PEXELS_API_KEY, categoryQueries]);

  // Enhanced Pixabay fetch
  const fetchPixabay = useCallback(async (query, page) => {
    if (!PIXABAY_API_KEY) return [];
    
    try {
      const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=20&page=${page}&orientation=horizontal&min_width=1000`;
      const response = await fetch(url, {
        signal: AbortSignal.timeout(10000)
      });
      
      if (!response.ok) throw new Error(`Pixabay API error: ${response.status}`);
      
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
            artistUrl: `https://pixabay.com/users/${photo.user}-${photo.user_id}/`,
            category,
            likes: photo.likes || Math.floor(Math.random() * 2000) + 100,
            views: photo.views || Math.floor(Math.random() * 10000) + 500,
            comments: photo.comments || Math.floor(Math.random() * 150) + 10,
            tags: photo.tags ? photo.tags.split(',').map(t => t.trim()).slice(0, 5) : ['art'],
            description: photo.tags || `Beautiful artwork by ${photo.user}`,
            timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            source: 'pixabay',
            width: photo.imageWidth,
            height: photo.imageHeight
          };
        });
    } catch (error) {
      console.warn('Pixabay fetch failed:', error.message);
      return [];
    }
  }, [PIXABAY_API_KEY, categoryQueries]);

  // Enhanced Unsplash fetch
  const fetchUnsplash = useCallback(async (query, page) => {
    if (!UNSPLASH_API_KEY) return [];
    
    try {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&page=${page}&orientation=landscape`;
      const response = await fetch(url, {
        headers: { 
          Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
          'Accept-Version': 'v1'
        },
        signal: AbortSignal.timeout(10000)
      });
      
      if (!response.ok) throw new Error(`Unsplash API error: ${response.status}`);
      
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
            artistUrl: photo.user.links.html,
            category,
            likes: photo.likes || Math.floor(Math.random() * 2000) + 100,
            views: photo.likes * 10 || Math.floor(Math.random() * 10000) + 500,
            comments: Math.floor(Math.random() * 150) + 10,
            tags: photo.tags?.map(t => t.title).slice(0, 5) || ['art', 'photography'],
            description: photo.description || photo.alt_description || `Beautiful work by ${photo.user.name}`,
            timestamp: photo.created_at,
            source: 'unsplash',
            width: photo.width,
            height: photo.height,
            avgColor: photo.color
          };
        });
    } catch (error) {
      console.warn('Unsplash fetch failed:', error.message);
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

  // Main image loading function with improved logic
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

      console.log('Loading images:', { query, page: currentPage, feedType, category });

      if (reset) {
        usedImageIdsRef.current.clear();
      }

      let apiImages = [];
      
      // Try all APIs in parallel for better performance
      const apiPromises = [
        fetchPexels(query, currentPage),
        fetchPixabay(query, currentPage),
        fetchUnsplash(query, currentPage)
      ];

      const results = await Promise.allSettled(apiPromises);
      
      // Combine all successful results
      results.forEach(result => {
        if (result.status === 'fulfilled' && result.value.length > 0) {
          apiImages = [...apiImages, ...result.value];
        }
      });

      // If all APIs failed, use high-quality fallback
      if (apiImages.length === 0) {
        console.log('All APIs failed, using fallback images');
        apiImages = getFallbackImages(20, category);
      }

      // Shuffle for variety
      apiImages = apiImages.sort(() => Math.random() - 0.5);

      // Filter by category if needed
      let filteredImages = apiImages;
      if (!selectedCategories.includes('all')) {
        filteredImages = apiImages.filter(img => 
          selectedCategories.includes(img.category)
        );
        
        // If filtering resulted in too few images, add some from fallback
        if (filteredImages.length < 10) {
          const additionalFallback = getFallbackImages(10, category);
          filteredImages = [...filteredImages, ...additionalFallback];
        }
      }

      // Apply feed type sorting
      let sortedImages = [...filteredImages];
      switch (feedType) {
        case 'trending':
          sortedImages.sort((a, b) => (b.likes + b.views) - (a.likes + a.views));
          break;
        case 'recent':
          sortedImages.sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
          );
          break;
        case 'personalized':
          // Mix based on liked categories
          sortedImages = sortedImages.sort(() => Math.random() - 0.5);
          break;
        default:
          break;
      }

      // Limit to reasonable number per page
      sortedImages = sortedImages.slice(0, 20);

      // Update state
      if (reset) {
        setImages(sortedImages);
        pageRef.current = 1;
      } else {
        setImages(prev => {
          const existingIds = new Set(prev.map(img => img.id));
          const newImages = sortedImages.filter(img => !existingIds.has(img.id));
          return [...prev, ...newImages];
        });
      }
      
      pageRef.current = currentPage + 1;
      setHasMore(sortedImages.length >= 15);

    } catch (err) {
      console.error('Critical image loading error:', err);
      setError('Failed to load images. Please try again.');
      
      // Ultimate fallback - always show something
      const fallbackImages = getFallbackImages(20, 
        selectedCategories.includes('all') ? 'all' : selectedCategories[0]
      );
      
      if (reset) {
        setImages(fallbackImages);
      } else {
        setImages(prev => [...prev, ...fallbackImages]);
      }
      
      setHasMore(true);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [feedType, selectedCategories, fetchPexels, fetchPixabay, fetchUnsplash, getFallbackImages, buildQuery]);

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

    // Update image likes count
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