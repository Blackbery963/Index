// import axios from 'axios';

// const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

// const generatePixabayTitle = (tags, user) => {
//   if (tags) {
//     const mainTag = tags.split(',')[0];
//     return mainTag.charAt(0).toUpperCase() + mainTag.slice(1) + ' Art';
//   }
//   return `Art by ${user}`;
// };

// export const fetchPixabayMedia = async (filter, page = 1) => {
//   if (!PIXABAY_API_KEY) {
//     console.warn('Pixabay API key not provided; skipping Pixabay media');
//     return { media: [], hasMore: false };
//   }

//   try {
//     // Determine query and media type based on filter
//     let query = 'art painting';
//     let mediaType = 'all'; // pixabay supports: all, photo, illustration, vector
    
//     if (filter === 'videos') {
//       mediaType = 'video';
//       query = 'art';
//     }

//     const response = await axios.get(
//       `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&page=${page}&per_page=20&safesearch=true&image_type=photo&media_type=${mediaType}`
//     );

//     const media = response.data.hits.map(item => {
//       const isVideo = item.videos || item.type === 'video';
      
//       return {
//         $id: `pixabay-${isVideo ? 'video-' : ''}${item.id}`,
//         url: isVideo ? item.videos.medium.url : item.largeImageURL || item.webformatURL,
//         title: generatePixabayTitle(item.tags, item.user),
//         description: item.tags ? `Photo of ${item.tags}` : `Content by ${item.user}`,
//         tag: item.tags ? item.tags.split(', ').slice(0, 3) : ['art', 'featured'],
//         userId: `pixabay-${item.user_id}`,
//         uploadDate: new Date().toISOString(),
//         viewCount: item.views || 0,
//         downloads: item.downloads || 0,
//         likes: item.likes || 0,
//         isFeatured: true,
//         photographer: item.user,
//         photographerUrl: `https://pixabay.com/users/${item.user}-${item.user_id}/`,
//         type: isVideo ? 'video' : 'image',
//         duration: isVideo ? item.duration : null,
//         source: 'pixabay',
//         // Additional metadata
//         width: item.webformatWidth,
//         height: item.webformatHeight,
//         previewURL: item.previewURL
//       };
//     });

//     return {
//       media,
//       hasMore: page < Math.ceil(response.data.totalHits / 20)
//     };
//   } catch (error) {
//     console.error('Error fetching Pixabay media:', error);
//     // Don't throw error, return empty array to prevent breaking the app
//     return { media: [], hasMore: false };
//   }
// };

import axios from 'axios';

const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

// Cache for tracking queries and their total results
const queryCache = new Map();
const RATE_LIMIT_DELAY = 1000; // 1 second between requests to avoid rate limits

const generatePixabayTitle = (tags, user) => {
  if (tags) {
    const mainTag = tags.split(',')[0];
    return mainTag.charAt(0).toUpperCase() + mainTag.slice(1) + ' Art';
  }
  return `Art by ${user}`;
};

// Enhanced search queries for different filters
const getQueryConfig = (filter) => {
  const queries = {
    all: ['art', 'painting', 'digital art', 'illustration', 'creative', 'design', 'abstract', 'colorful'],
    featured: ['gallery', 'exhibition', 'masterpiece', 'fine art', 'museum', 'classic art', 'contemporary'],
    user: ['drawing', 'sketch', 'doodle', 'handmade', 'amateur', 'community', 'artwork'],
    videos: ['art video', 'creative video', 'animation', 'motion graphics', 'cinematic', 'visual art']
  };

  const baseQueries = queries[filter] || queries.all;
  
  // Return a function that cycles through queries
  let queryIndex = 0;
  return () => {
    const query = baseQueries[queryIndex % baseQueries.length];
    queryIndex++;
    return query;
  };
};

// Get query for specific page to ensure variety
const getQueryForPage = (filter, page) => {
  const queryConfig = getQueryConfig(filter);
  const queryIndex = (page - 1) % 8; // Cycle through 8 different queries
  const queries = [
    queryConfig(), queryConfig(), queryConfig(), queryConfig(),
    queryConfig(), queryConfig(), queryConfig(), queryConfig()
  ];
  return queries[queryIndex];
};

export const fetchPixabayMedia = async (filter, page = 1, perPage = 20) => {
  if (!PIXABAY_API_KEY) {
    console.warn('Pixabay API key not provided; skipping Pixabay media');
    return { media: [], hasMore: false };
  }

  try {
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY));

    // Determine media type based on filter
    let mediaType = 'all';
    let category = ''; // Pixabay categories: backgrounds, fashion, nature, etc.
    
    if (filter === 'videos') {
      mediaType = 'video';
    } else if (filter === 'featured') {
      category = 'backgrounds';
    }

    // Get dynamic query for this page to ensure content variety
    const query = getQueryForPage(filter, page);

    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&safesearch=true&media_type=${mediaType}${category ? `&category=${category}` : ''}`;

    const response = await axios.get(url);

    const media = response.data.hits.map((item, index) => {
      const isVideo = item.videos || item.type === 'video';
      const videoUrl = isVideo ? (item.videos?.medium?.url || item.videos?.large?.url || item.videos?.small?.url) : null;
      
      // Generate unique ID with page and index to avoid conflicts
      const uniqueId = `pixabay-${isVideo ? 'video-' : 'image-'}${item.id}-${page}-${index}`;

      return {
        $id: uniqueId,
        url: isVideo ? videoUrl : item.largeImageURL || item.webformatURL,
        title: generatePixabayTitle(item.tags, item.user),
        description: item.tags ? `${item.tags.charAt(0).toUpperCase() + item.tags.slice(1)} - Photo by ${item.user}` : `Content by ${item.user}`,
        tag: item.tags ? item.tags.split(', ').slice(0, 4) : ['art', 'featured', 'creative'],
        userId: `pixabay-${item.user_id}`,
        uploadDate: new Date(item.previewURL ? Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 : new Date()).toISOString(), // Randomize dates for realism
        viewCount: item.views || Math.floor(Math.random() * 10000),
        downloads: item.downloads || Math.floor(Math.random() * 1000),
        likes: item.likes || Math.floor(Math.random() * 500),
        isFeatured: filter === 'featured' || filter === 'all',
        photographer: item.user,
        photographerUrl: `https://pixabay.com/users/${item.user}-${item.user_id}/`,
        type: isVideo ? 'video' : 'image',
        duration: isVideo ? item.duration : null,
        source: 'pixabay',
        width: item.webformatWidth,
        height: item.webformatHeight,
        previewURL: item.previewURL,
        page: page, // Track which page this came from
        query: query // Track which query was used
      };
    });

    // Cache total results for this query pattern
    const cacheKey = `${filter}-${query}`;
    if (!queryCache.has(cacheKey)) {
      queryCache.set(cacheKey, response.data.totalHits);
    }

    // Calculate hasMore - Pixabay has a limit of 500 pages, but we'll be more conservative
    const totalHits = response.data.totalHits;
    const maxPages = Math.min(Math.ceil(totalHits / perPage), 100); // Limit to 100 pages max
    const hasMore = page < maxPages && media.length === perPage;

    return {
      media,
      hasMore,
      totalHits,
      currentPage: page,
      query: query,
      nextPage: hasMore ? page + 1 : null
    };

  } catch (error) {
    console.error('Error fetching Pixabay media:', error);
    
    // Handle rate limiting gracefully
    if (error.response?.status === 429) {
      console.warn('Pixabay API rate limit exceeded, retrying with longer delay...');
      return { 
        media: [], 
        hasMore: true, // Keep hasMore true to retry
        rateLimited: true,
        error: 'rate_limit'
      };
    }
    
    return { media: [], hasMore: false, error: error.message };
  }
};

// Enhanced load more function with duplicate prevention
export const loadMorePixabayMedia = async (filter, currentPage, existingMedia = []) => {
  const nextPage = currentPage + 1;
  
  try {
    const result = await fetchPixabayMedia(filter, nextPage);
    
    // Filter out duplicates based on unique IDs
    const existingIds = new Set(existingMedia.map(item => item.$id));
    const newMedia = result.media.filter(item => !existingIds.has(item.$id));
    
    // If we got duplicates, try next page
    if (newMedia.length === 0 && result.hasMore) {
      console.log('No new media found on page', nextPage, 'trying next page...');
      return await loadMorePixabayMedia(filter, nextPage, existingMedia);
    }

    return {
      ...result,
      media: newMedia,
      currentPage: nextPage
    };
  } catch (error) {
    console.error('Error loading more Pixabay media:', error);
    return { media: [], hasMore: false, error: error.message };
  }
};

// Mixed content fetcher for 'all' filter
export const fetchMixedPixabayMedia = async (page = 1, perPage = 15) => {
  if (!PIXABAY_API_KEY) {
    return { media: [], hasMore: false };
  }

  try {
    // Fetch both images and videos in parallel
    const [imagesResult, videosResult] = await Promise.all([
      fetchPixabayMedia('all', page, Math.ceil(perPage * 0.7)),
      fetchPixabayMedia('videos', page, Math.ceil(perPage * 0.3))
    ]);

    // Combine and shuffle results
    const combinedMedia = [...imagesResult.media, ...videosResult.media]
      .sort(() => Math.random() - 0.5)
      .slice(0, perPage);

    const hasMore = imagesResult.hasMore || videosResult.hasMore;

    return {
      media: combinedMedia,
      hasMore,
      currentPage: page,
      totalHits: (imagesResult.totalHits || 0) + (videosResult.totalHits || 0)
    };
  } catch (error) {
    console.error('Error fetching mixed Pixabay media:', error);
    return { media: [], hasMore: false };
  }
};

// Advanced search with multiple fallbacks
export const fetchPixabayWithFallback = async (filter, page = 1, perPage = 20) => {
  const primaryResult = await fetchPixabayMedia(filter, page, perPage);
  
  // If primary result is empty but hasMore is true, try alternative queries
  if (primaryResult.media.length === 0 && primaryResult.hasMore) {
    console.log('Primary query returned no results, trying fallback queries...');
    
    // Try broader search as fallback
    const fallbackQueries = {
      all: 'art',
      featured: 'beautiful',
      user: 'drawing',
      videos: 'animation'
    };
    
    const fallbackQuery = fallbackQueries[filter] || 'art';
    const fallbackUrl = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(fallbackQuery)}&page=${page}&per_page=${perPage}&safesearch=true`;
    
    try {
      const fallbackResponse = await axios.get(fallbackUrl);
      const fallbackMedia = fallbackResponse.data.hits.map((item, index) => ({
        $id: `pixabay-fallback-${item.id}-${page}-${index}`,
        url: item.largeImageURL || item.webformatURL,
        title: generatePixabayTitle(item.tags, item.user),
        description: `Fallback result: ${item.tags || 'Art'}`,
        tag: ['art', 'fallback', ...(item.tags ? item.tags.split(', ').slice(0, 2) : [])],
        userId: `pixabay-${item.user_id}`,
        uploadDate: new Date().toISOString(),
        viewCount: item.views || 0,
        isFeatured: true,
        photographer: item.user,
        type: 'image',
        source: 'pixabay',
        page: page
      }));

      return {
        media: fallbackMedia,
        hasMore: page < Math.ceil(fallbackResponse.data.totalHits / perPage),
        currentPage: page,
        usedFallback: true
      };
    } catch (error) {
      console.error('Fallback also failed:', error);
    }
  }
  
  return primaryResult;
};

// Reset cache when filters change drastically
export const resetPixabayCache = () => {
  queryCache.clear();
};

// Get statistics about available content
export const getPixabayStats = () => {
  return {
    cachedQueries: queryCache.size,
    queries: Array.from(queryCache.entries())
  };
};