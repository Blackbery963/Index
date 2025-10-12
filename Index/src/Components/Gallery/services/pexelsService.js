// // import axios from 'axios';

// // const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

// // const generatePexelsTitle = (altText) => {
// //   if (altText && altText.trim()) {
// //     return altText.charAt(0).toUpperCase() + altText.slice(1);
// //   }
// //   return 'Untitled Artwork';
// // };

// // export const fetchPexelsMedia = async (filter, page = 1) => {
// //   if (!PEXELS_API_KEY) {
// //     console.warn('Pexels API key not provided; skipping Pexels media');
// //     return { media: [], hasMore: false };
// //   }

// //   try {
// //     let query = 'art painting';
// //     let url, response;

// //     if (filter === 'videos') {
// //       query = 'art creative';
// //       url = `https://api.pexels.com/videos/search?query=${query}&per_page=15&page=${page}&orientation=landscape`;
// //     } else {
// //       url = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=${page}&orientation=landscape`;
// //     }

// //     response = await axios.get(url, {
// //       headers: {
// //         Authorization: PEXELS_API_KEY
// //       }
// //     });

// //     let media = [];

// //     if (filter === 'videos') {
// //       media = response.data.videos.map(video => {
// //         // Get the best quality video that's not too large
// //         const videoFile = video.video_files.find(file => 
// //           file.quality === 'hd' && file.width <= 1920
// //         ) || video.video_files[0];

// //         return {
// //           $id: `pexels-video-${video.id}`,
// //           url: videoFile.link,
// //           title: generatePexelsTitle(video.user?.name),
// //           description: `Video by ${video.user?.name}`,
// //           tag: ['art', 'featured', 'video', ...(video.tags || [])].slice(0, 4),
// //           userId: `pexels-${video.user?.id}`,
// //           uploadDate: new Date().toISOString(),
// //           viewCount: 0,
// //           isFeatured: true,
// //           photographer: video.user?.name,
// //           photographerUrl: video.user?.url,
// //           type: 'video',
// //           duration: video.duration,
// //           source: 'pexels',
// //           width: videoFile.width,
// //           height: videoFile.height
// //         };
// //       });
// //     } else {
// //       media = response.data.photos.map(photo => ({
// //         $id: `pexels-${photo.id}`,
// //         url: photo.src.large2x || photo.src.large,
// //         title: generatePexelsTitle(photo.alt),
// //         description: photo.alt || `Photography by ${photo.photographer}`,
// //         tag: ['art', 'featured', 'photography'],
// //         userId: `pexels-${photo.photographer_id}`,
// //         uploadDate: new Date().toISOString(),
// //         viewCount: 0,
// //         isFeatured: true,
// //         photographer: photo.photographer,
// //         photographerUrl: photo.photographer_url,
// //         type: 'image',
// //         source: 'pexels',
// //         width: photo.width,
// //         height: photo.height
// //       }));
// //     }

// //     return {
// //       media,
// //       hasMore: page < Math.ceil(response.data.total_results / 15)
// //     };
// //   } catch (error) {
// //     console.error('Error fetching Pexels media:', error);
// //     return { media: [], hasMore: false };
// //   }
// // };

// // import axios from 'axios';

// // const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

// // const generatePexelsTitle = (altText) => {
// //   if (altText && altText.trim()) {
// //     return altText.charAt(0).toUpperCase() + altText.slice(1);
// //   }
// //   return 'Untitled Artwork';
// // };

// // // Cache to store total results for each query to determine hasMore
// // const totalResultsCache = new Map();

// // export const fetchPexelsMedia = async (filter, page = 1, perPage = 15) => {
// //   if (!PEXELS_API_KEY) {
// //     console.warn('Pexels API key not provided; skipping Pexels media');
// //     return { media: [], hasMore: false };
// //   }

// //   try {
// //     let query = 'art painting';
// //     let url, response;

// //     // Determine query based on filter
// //     switch (filter) {
// //       case 'videos':
// //         query = 'art creative';
// //         url = `https://api.pexels.com/videos/search?query=${query}&per_page=${perPage}&page=${page}&orientation=landscape`;
// //         break;
// //       case 'featured':
// //         query = 'art gallery exhibition';
// //         url = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}&orientation=landscape`;
// //         break;
// //       case 'user':
// //         // For user content, use different query to simulate user uploads
// //         query = 'digital art illustration';
// //         url = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}&orientation=landscape`;
// //         break;
// //       default: // 'all'
// //         query = 'art painting creative';
// //         url = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}&orientation=landscape`;
// //     }

// //     response = await axios.get(url, {
// //       headers: {
// //         Authorization: PEXELS_API_KEY
// //       }
// //     });

// //     let media = [];

// //     if (filter === 'videos') {
// //       media = response.data.videos.map(video => {
// //         // Get the best quality video that's not too large
// //         const videoFile = video.video_files.find(file => 
// //           file.quality === 'hd' && file.width <= 1920
// //         ) || video.video_files[0];

// //         return {
// //           $id: `pexels-video-${video.id}-${page}`,
// //           url: videoFile.link,
// //           title: generatePexelsTitle(video.user?.name),
// //           description: `Video by ${video.user?.name}`,
// //           tag: ['art', 'featured', 'video', ...(video.tags || [])].slice(0, 4),
// //           userId: `pexels-${video.user?.id}`,
// //           uploadDate: new Date().toISOString(),
// //           viewCount: Math.floor(Math.random() * 1000),
// //           isFeatured: true,
// //           photographer: video.user?.name,
// //           photographerUrl: video.user?.url,
// //           type: 'video',
// //           duration: video.duration,
// //           source: 'pexels',
// //           width: videoFile.width,
// //           height: videoFile.height,
// //           page: page // Add page info for tracking
// //         };
// //       });
// //     } else {
// //       media = response.data.photos.map(photo => ({
// //         $id: `pexels-${photo.id}-${page}`,
// //         url: photo.src.large2x || photo.src.large,
// //         title: generatePexelsTitle(photo.alt),
// //         description: photo.alt || `Photography by ${photo.photographer}`,
// //         tag: ['art', 'featured', 'photography', ...(photo.alt?.toLowerCase().split(' ').slice(0, 2) || [])],
// //         userId: `pexels-${photo.photographer_id}`,
// //         uploadDate: new Date().toISOString(),
// //         viewCount: Math.floor(Math.random() * 1000),
// //         isFeatured: filter === 'featured' || filter === 'all',
// //         photographer: photo.photographer,
// //         photographerUrl: photo.photographer_url,
// //         type: 'image',
// //         source: 'pexels',
// //         width: photo.width,
// //         height: photo.height,
// //         page: page // Add page info for tracking
// //       }));
// //     }

// //     // Calculate hasMore based on total results and current page
// //     const totalResults = response.data.total_results;
// //     const totalPages = Math.ceil(totalResults / perPage);
// //     const hasMore = page < totalPages && page < 80; // Pexels max pages is usually 80

// //     // Cache the total results for this query
// //     const cacheKey = `${filter}-${query}`;
// //     totalResultsCache.set(cacheKey, totalResults);

// //     return {
// //       media,
// //       hasMore,
// //       totalResults,
// //       currentPage: page
// //     };
// //   } catch (error) {
// //     console.error('Error fetching Pexels media:', error);
    
// //     // If it's a rate limit error, return empty but with hasMore true to try again later
// //     if (error.response?.status === 429) {
// //       console.warn('Pexels API rate limit exceeded');
// //       return { 
// //         media: [], 
// //         hasMore: true, // Keep hasMore true to retry later
// //         rateLimited: true 
// //       };
// //     }
    
// //     return { media: [], hasMore: false };
// //   }
// // };

// // // Specific function for infinite scroll loading
// // export const loadMorePexelsMedia = async (filter, currentPage, currentMedia = []) => {
// //   const nextPage = currentPage + 1;
  
// //   try {
// //     const result = await fetchPexelsMedia(filter, nextPage);
    
// //     // Filter out duplicates (in case of API inconsistencies)
// //     const newMedia = result.media.filter(newItem => 
// //       !currentMedia.some(existingItem => existingItem.$id === newItem.$id)
// //     );

// //     return {
// //       ...result,
// //       media: newMedia,
// //       currentPage: nextPage
// //     };
// //   } catch (error) {
// //     console.error('Error loading more Pexels media:', error);
// //     return { media: [], hasMore: false };
// //   }
// // };

// // // Function to get mixed content (both images and videos) for 'all' filter
// // export const fetchMixedPexelsMedia = async (page = 1, perPage = 10) => {
// //   if (!PEXELS_API_KEY) {
// //     return { media: [], hasMore: false };
// //   }

// //   try {
// //     // Fetch both images and videos in parallel
// //     const [imagesResult, videosResult] = await Promise.all([
// //       fetchPexelsMedia('all', page, Math.ceil(perPage * 0.7)), // 70% images
// //       fetchPexelsMedia('videos', page, Math.ceil(perPage * 0.3)) // 30% videos
// //     ]);

// //     // Combine and shuffle the results
// //     const combinedMedia = [...imagesResult.media, ...videosResult.media]
// //       .sort(() => Math.random() - 0.5) // Shuffle the array
// //       .slice(0, perPage); // Take only the required number

// //     // Determine if we have more content
// //     const hasMore = imagesResult.hasMore || videosResult.hasMore;

// //     return {
// //       media: combinedMedia,
// //       hasMore,
// //       currentPage: page
// //     };
// //   } catch (error) {
// //     console.error('Error fetching mixed Pexels media:', error);
// //     return { media: [], hasMore: false };
// //   }
// // };

// // // Utility function to reset cache (useful when filters change)
// // export const resetPexelsCache = () => {
// //   totalResultsCache.clear();
// // };



// import axios from 'axios';

// const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
// const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

// const generatePexelsTitle = (altText) => {
//   if (altText && altText.trim()) {
//     return altText.charAt(0).toUpperCase() + altText.slice(1);
//   }
//   return 'Untitled Artwork';
// };

// // Cache to store total results for each query to determine hasMore
// const totalResultsCache = new Map();

// const fetchFromPexels = async (isVideo, query, page, perPage) => {
//   if (!PEXELS_API_KEY) {
//     throw new Error('No Pexels API key');
//   }

//   const baseUrl = 'https://api.pexels.com/';
//   const endpoint = isVideo ? 'videos/search' : 'v1/search';
//   const url = `${baseUrl}${endpoint}?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}${isVideo ? '&orientation=landscape' : '&orientation=landscape'}`;

//   const response = await axios.get(url, {
//     headers: {
//       Authorization: PEXELS_API_KEY
//     }
//   });

//   const data = response.data;
//   const items = isVideo ? data.videos : data.photos;

//   let media = [];
//   const profiles = {};

//   if (isVideo) {
//     media = items.map(video => {
//       const videoFile = video.video_files.find(file => file.quality === 'hd' && file.width <= 1920) || video.video_files[0];
//       const userId = `pexels-${video.user.id}`;
//       profiles[userId] = { name: video.user.name };
//       return {
//         $id: `pexels-video-${video.id}-${page}`,
//         url: videoFile.link,
//         title: generatePexelsTitle(video.user?.name),
//         description: `Video by ${video.user?.name}`,
//         tag: ['art', 'featured', 'video', ...(video.tags || [])].slice(0, 4),
//         userId,
//         uploadDate: new Date().toISOString(),
//         viewCount: Math.floor(Math.random() * 1000),
//         isFeatured: true,
//         photographer: video.user?.name,
//         photographerUrl: video.user?.url,
//         type: 'video',
//         duration: video.duration,
//         source: 'pexels',
//         width: videoFile.width,
//         height: videoFile.height,
//         page
//       };
//     });
//   } else {
//     media = items.map(photo => {
//       const userId = `pexels-${photo.photographer_id}`;
//       profiles[userId] = { name: photo.photographer };
//       return {
//         $id: `pexels-${photo.id}-${page}`,
//         url: photo.src.large2x || photo.src.large,
//         title: generatePexelsTitle(photo.alt),
//         description: photo.alt || `Photography by ${photo.photographer}`,
//         tag: ['art', 'featured', 'photography', ...(photo.alt?.toLowerCase().split(' ').slice(0, 2) || [])],
//         userId,
//         uploadDate: new Date().toISOString(),
//         viewCount: Math.floor(Math.random() * 1000),
//         isFeatured: true,
//         photographer: photo.photographer,
//         photographerUrl: photo.photographer_url,
//         type: 'image',
//         source: 'pexels',
//         width: photo.width,
//         height: photo.height,
//         page
//       };
//     });
//   }

//   const totalResults = data.total_results;
//   const cacheKey = `pexels-${isVideo ? 'video' : 'image'}-${query}`;
//   totalResultsCache.set(cacheKey, totalResults);
//   const totalPages = Math.ceil(totalResults / perPage);
//   const hasMore = page < totalPages && page < 80;

//   return { media, profiles, hasMore, totalResults };
// };

// const fetchFromPixabay = async (isVideo, query, page, perPage) => {
//   if (!PIXABAY_API_KEY) {
//     throw new Error('No Pixabay API key');
//   }

//   const baseUrl = 'https://pixabay.com/api/';
//   const endpoint = isVideo ? 'videos/' : '';
//   let url = `${baseUrl}${endpoint}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;
//   if (!isVideo) {
//     url += '&orientation=horizontal&image_type=photo';
//   }

//   const response = await axios.get(url);
//   const data = response.data;
//   const items = data.hits || [];

//   let media = [];
//   const profiles = {};

//   if (isVideo) {
//     media = items.map(video => {
//       const userId = `pixabay-${video.user_id}`;
//       profiles[userId] = { name: video.user };
//       return {
//         $id: `pixabay-video-${video.id}-${page}`,
//         url: video.videos.large.url,
//         title: generatePexelsTitle(video.tags),
//         description: `Video by ${video.user}`,
//         tag: video.tags.split(', ').slice(0, 4),
//         userId,
//         uploadDate: new Date().toISOString(),
//         viewCount: video.views,
//         isFeatured: true,
//         photographer: video.user,
//         photographerUrl: video.pageURL, // Using pageURL as fallback
//         type: 'video',
//         duration: video.duration,
//         source: 'pixabay',
//         width: video.videos.large.width,
//         height: video.videos.large.height,
//         page
//       };
//     });
//   } else {
//     media = items.map(photo => {
//       const userId = `pixabay-${photo.user_id}`;
//       profiles[userId] = { name: photo.user };
//       return {
//         $id: `pixabay-${photo.id}-${page}`,
//         url: photo.largeImageURL,
//         title: generatePexelsTitle(photo.tags),
//         description: photo.tags || `Photography by ${photo.user}`,
//         tag: photo.tags.split(', ').slice(0, 4),
//         userId,
//         uploadDate: new Date().toISOString(),
//         viewCount: photo.views,
//         isFeatured: true,
//         photographer: photo.user,
//         photographerUrl: photo.userImageURL, // Avatar URL
//         type: 'image',
//         source: 'pixabay',
//         width: photo.imageWidth,
//         height: photo.imageHeight,
//         page
//       };
//     });
//   }

//   const totalResults = data.totalHits;
//   const cacheKey = `pixabay-${isVideo ? 'video' : 'image'}-${query}`;
//   totalResultsCache.set(cacheKey, totalResults);
//   const totalPages = Math.ceil(totalResults / perPage);
//   const hasMore = page < totalPages; // No known page limit like Pexels

//   return { media, profiles, hasMore, totalResults };
// };

// const fetchStockMedia = async (isVideo, query, page, perPage) => {
//   let sourceUsed = 'pexels';
//   try {
//     if (PEXELS_API_KEY) {
//       return await fetchFromPexels(isVideo, query, page, perPage);
//     } else {
//       throw new Error('No Pexels key');
//     }
//   } catch (error) {
//     if (error.response?.status === 429 || error.message === 'No Pexels key') {
//       if (PIXABAY_API_KEY) {
//         sourceUsed = 'pixabay';
//         return await fetchFromPixabay(isVideo, query, page, perPage);
//       } else {
//         return { media: [], profiles: {}, hasMore: false, rateLimited: true };
//       }
//     } else {
//       console.error('Error fetching stock media:', error);
//       return { media: [], profiles: {}, hasMore: false };
//     }
//   }
// };

// export const fetchPexelsMedia = async (filter, searchTerm = '', page = 1, perPage = 10) => {
//   let query;
//   switch (filter) {
//     case 'videos':
//       query = searchTerm || 'art creative';
//       return await fetchStockMedia(true, query, page, perPage);
//     case 'featured':
//       query = searchTerm || 'art gallery exhibition';
//       return await fetchStockMedia(false, query, page, perPage);
//     case 'user':
//       query = searchTerm || 'digital art illustration';
//       return await fetchStockMedia(false, query, page, perPage);
//     default: // 'all'
//       const imageQuery = searchTerm || 'art painting creative';
//       const videoQuery = searchTerm || 'art creative';
//       const imagePer = Math.ceil(perPage * 0.7);
//       const videoPer = perPage - imagePer;
//       const [imagesRes, videosRes] = await Promise.all([
//         fetchStockMedia(false, imageQuery, page, imagePer),
//         fetchStockMedia(true, videoQuery, page, videoPer)
//       ]);
//       const media = [...imagesRes.media, ...videosRes.media].sort(() => Math.random() - 0.5);
//       const profiles = { ...imagesRes.profiles, ...videosRes.profiles };
//       const hasMore = imagesRes.hasMore || videosRes.hasMore;
//       const totalResults = imagesRes.totalResults + videosRes.totalResults; // Approximate
//       return { media, profiles, hasMore, totalResults };
//   }
// };

// // Specific function for infinite scroll loading
// export const loadMorePexelsMedia = async (filter, searchTerm = '', currentPage, currentMedia = []) => {
//   const nextPage = currentPage + 1;
//   const result = await fetchPexelsMedia(filter, searchTerm, nextPage);
  
//   // Filter out duplicates
//   const newMedia = result.media.filter(newItem => 
//     !currentMedia.some(existingItem => existingItem.$id === newItem.$id)
//   );

//   return {
//     ...result,
//     media: newMedia
//   };
// };

// // Function to get mixed content (both images and videos) for 'all' filter
// export const fetchMixedPexelsMedia = async (searchTerm = '', page = 1, perPage = 10) => {
//   return await fetchPexelsMedia('all', searchTerm, page, perPage);
// };

// // Utility function to reset cache (useful when filters change)
// export const resetPexelsCache = () => {
//   totalResultsCache.clear();
// };

// // Wrappers to match previous structure
// export async function fetchPexelsData(filter, searchTerm = '') {
//   const { media, profiles, hasMore, totalResults } = await fetchPexelsMedia(filter, searchTerm, 1, 10);
//   return {
//     media,
//     profiles,
//     hasMore,
//     pagination: { featuredPage: hasMore ? 2 : 1, appwriteLastId: null }
//   };
// }

// export async function loadMorePexelsData(filter, searchTerm = '', paginationState) {
//   const page = paginationState.featuredPage || 1;
//   const { media, profiles, hasMore, totalResults } = await fetchPexelsMedia(filter, searchTerm, page, 10);
//   return {
//     media,
//     profiles,
//     hasMore,
//     pagination: { featuredPage: hasMore ? page + 1 : page, appwriteLastId: null }
//   };
// }


import axios from 'axios';

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

// Extensive art-related search queries for variety
const ART_QUERIES = [
  'abstract art', 'digital painting', 'watercolor', 'oil painting', 'contemporary art',
  'modern art', 'surreal art', 'fantasy art', 'concept art', 'illustration',
  'sketch drawing', 'mixed media', 'portrait painting', 'landscape art', 'still life',
  'impressionism', 'expressionism', 'cubism', 'pop art', 'minimalist art',
  'street art', 'graffiti', 'mural art', 'digital illustration', 'character design',
  'environment art', 'concept design', 'art therapy', 'creative expression',
  'texture art', 'color theory', 'composition', 'art techniques', 'masterpiece',
  'gallery art', 'exhibition', 'art collection', 'visual arts', 'fine arts'
];

const PHOTOGRAPHY_QUERIES = [
  'artistic photography', 'creative photography', 'portrait photography',
  'landscape photography', 'macro photography', 'street photography',
  'black and white photography', 'fine art photography', 'conceptual photography',
  'abstract photography', 'minimalist photography', 'urban photography',
  'nature photography', 'architecture photography', 'fashion photography',
  'product photography', 'travel photography', 'documentary photography',
  'experimental photography', 'long exposure'
];

const VIDEO_QUERIES = [
  'art video', 'creative video', 'motion graphics', 'animation',
  'cinematic art', 'visual effects', 'time lapse art', 'slow motion',
  'art process', 'painting timelapse', 'digital art process',
  'creative animation', 'abstract motion', 'artistic video'
];

// Cache management
const queryHistory = new Map();
const usedImageIds = new Set();

const getRandomQuery = (category = 'art') => {
  const queries = {
    art: ART_QUERIES,
    photography: PHOTOGRAPHY_QUERIES,
    video: VIDEO_QUERIES
  };
  
  const categoryQueries = queries[category] || ART_QUERIES;
  return categoryQueries[Math.floor(Math.random() * categoryQueries.length)];
};

const getDiverseQuery = (baseQuery, page) => {
  // Add modifiers to create diverse queries
  const modifiers = [
    'colorful', 'minimal', 'detailed', 'textured', 'vibrant',
    'monochrome', 'bright', 'dark', 'warm', 'cool',
    'saturated', 'desaturated', 'high contrast', 'soft',
    'geometric', 'organic', 'structured', 'fluid'
  ];
  
  const randomModifier = modifiers[Math.floor(Math.random() * modifiers.length)];
  
  // Change query every 5 pages to get fresh results
  if (page % 5 === 0) {
    return `${baseQuery} ${randomModifier}`;
  }
  
  return baseQuery;
};

const generatePexelsTitle = (altText, photographer) => {
  if (altText && altText.trim() && altText !== 'null') {
    return altText.charAt(0).toUpperCase() + altText.slice(1);
  }
  return `Artwork by ${photographer}`;
};

const fetchFromPexels = async (isVideo, query, page, perPage) => {
  if (!PEXELS_API_KEY) {
    throw new Error('No Pexels API key');
  }

  const baseUrl = 'https://api.pexels.com/';
  const endpoint = isVideo ? 'videos/search' : 'v1/search';
  
  // Use curated endpoint for first page to get high-quality content
  let url;
  if (page === 1 && !isVideo && !query) {
    url = `${baseUrl}v1/curated?per_page=${perPage}&page=${page}`;
  } else {
    const diverseQuery = getDiverseQuery(query, page);
    url = `${baseUrl}${endpoint}?query=${encodeURIComponent(diverseQuery)}&per_page=${perPage}&page=${page}`;
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: PEXELS_API_KEY,
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    const data = response.data;
    const items = isVideo ? data.videos : data.photos;

    if (!items || items.length === 0) {
      return { media: [], profiles: {}, hasMore: false, totalResults: 0 };
    }

    let media = [];
    const profiles = {};

    // Filter out already used images and process new ones
    const newItems = items.filter(item => !usedImageIds.has(item.id));

    if (isVideo) {
      media = newItems.map(video => {
        const videoFile = video.video_files.find(file => 
          file.quality === 'hd' && file.width <= 1920
        ) || video.video_files[0];
        
        const userId = `pexels-${video.user.id}`;
        profiles[userId] = { 
          name: video.user.name,
          profileUrl: video.user.url
        };
        
        usedImageIds.add(video.id);
        
        return {
          $id: `pexels-video-${video.id}-${Date.now()}`,
          url: videoFile.link,
          title: generatePexelsTitle(video.user?.name, video.user?.name),
          description: `Video by ${video.user?.name}`,
          tags: ['art', 'featured', 'video', ...(video.tags || [])].slice(0, 6),
          userId,
          uploadDate: new Date().toISOString(),
          viewCount: Math.floor(Math.random() * 10000) + 1000,
          isFeatured: true,
          photographer: video.user?.name,
          photographerUrl: video.user?.url,
          type: 'video',
          duration: video.duration,
          source: 'pexels',
          width: videoFile.width,
          height: videoFile.height,
          page,
          query
        };
      });
    } else {
      media = newItems.map(photo => {
        const userId = `pexels-${photo.photographer_id}`;
        profiles[userId] = { 
          name: photo.photographer,
          profileUrl: photo.photographer_url
        };
        
        usedImageIds.add(photo.id);
        
        return {
          $id: `pexels-${photo.id}-${Date.now()}`,
          url: photo.src.large2x || photo.src.large,
          previewUrl: photo.src.medium,
          title: generatePexelsTitle(photo.alt, photo.photographer),
          description: photo.alt || `Photography by ${photo.photographer}`,
          tags: ['art', 'featured', 'photography', ...(photo.alt?.toLowerCase().split(' ').slice(0, 4) || [])],
          userId,
          uploadDate: new Date().toISOString(),
          viewCount: Math.floor(Math.random() * 50000) + 5000,
          isFeatured: true,
          photographer: photo.photographer,
          photographerUrl: photo.photographer_url,
          type: 'image',
          source: 'pexels',
          width: photo.width,
          height: photo.height,
          page,
          query,
          color: photo.avg_color
        };
      });
    }

    const totalResults = data.total_results;
    const totalPages = Math.min(Math.ceil(totalResults / perPage), 80); // Pexels max pages
    const hasMore = page < totalPages && media.length > 0;

    return { media, profiles, hasMore, totalResults };

  } catch (error) {
    console.error('Pexels API error:', error.response?.status, error.message);
    throw error;
  }
};

const fetchFromPixabay = async (isVideo, query, page, perPage) => {
  if (!PIXABAY_API_KEY) {
    throw new Error('No Pixabay API key');
  }

  const baseUrl = 'https://pixabay.com/api/';
  const endpoint = isVideo ? 'videos/' : '';
  const diverseQuery = getDiverseQuery(query, page);
  
  let url = `${baseUrl}${endpoint}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(diverseQuery)}&per_page=${perPage}&page=${page}`;
  
  if (!isVideo) {
    url += '&orientation=horizontal&image_type=photo&min_width=800';
  } else {
    url += '&min_width=1280';
  }

  try {
    const response = await axios.get(url, { timeout: 10000 });
    const data = response.data;
    const items = data.hits || [];

    if (items.length === 0) {
      return { media: [], profiles: {}, hasMore: false, totalResults: 0 };
    }

    let media = [];
    const profiles = {};

    const newItems = items.filter(item => !usedImageIds.has(item.id));

    if (isVideo) {
      media = newItems.map(video => {
        const userId = `pixabay-${video.user_id}`;
        profiles[userId] = { name: video.user };
        
        usedImageIds.add(video.id);
        
        return {
          $id: `pixabay-video-${video.id}-${Date.now()}`,
          url: video.videos.large.url,
          title: generatePexelsTitle(video.tags, video.user),
          description: `Video by ${video.user}`,
          tags: video.tags.split(', ').slice(0, 6),
          userId,
          uploadDate: new Date().toISOString(),
          viewCount: video.views || Math.floor(Math.random() * 5000) + 1000,
          isFeatured: true,
          photographer: video.user,
          photographerUrl: `https://pixabay.com/users/${video.user}-${video.user_id}/`,
          type: 'video',
          duration: video.duration,
          source: 'pixabay',
          width: video.videos.large.width,
          height: video.videos.large.height,
          page,
          query
        };
      });
    } else {
      media = newItems.map(photo => {
        const userId = `pixabay-${photo.user_id}`;
        profiles[userId] = { name: photo.user };
        
        usedImageIds.add(photo.id);
        
        return {
          $id: `pixabay-${photo.id}-${Date.now()}`,
          url: photo.largeImageURL,
          previewUrl: photo.webformatURL,
          title: generatePexelsTitle(photo.tags, photo.user),
          description: photo.tags || `Photography by ${photo.user}`,
          tags: photo.tags.split(', ').slice(0, 6),
          userId,
          uploadDate: new Date().toISOString(),
          viewCount: photo.views || Math.floor(Math.random() * 50000) + 5000,
          isFeatured: true,
          photographer: photo.user,
          photographerUrl: `https://pixabay.com/users/${photo.user}-${photo.user_id}/`,
          type: 'image',
          source: 'pixabay',
          width: photo.imageWidth,
          height: photo.imageHeight,
          page,
          query
        };
      });
    }

    const totalResults = data.totalHits;
    const totalPages = Math.ceil(totalResults / perPage);
    const hasMore = page < totalPages && media.length > 0;

    return { media, profiles, hasMore, totalResults };

  } catch (error) {
    console.error('Pixabay API error:', error.response?.status, error.message);
    throw error;
  }
};

const fetchFromUnsplash = async (query, page, perPage) => {
  if (!UNSPLASH_API_KEY) {
    throw new Error('No Unsplash API key');
  }

  const diverseQuery = getDiverseQuery(query, page);
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(diverseQuery)}&per_page=${perPage}&page=${page}&orientation=landscape`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
        'Accept-Version': 'v1'
      },
      timeout: 10000
    });

    const data = response.data;
    const items = data.results || [];

    if (items.length === 0) {
      return { media: [], profiles: {}, hasMore: false, totalResults: 0 };
    }

    const media = [];
    const profiles = {};

    const newItems = items.filter(item => !usedImageIds.has(item.id));

    newItems.forEach(photo => {
      const userId = `unsplash-${photo.user.id}`;
      profiles[userId] = {
        name: photo.user.name,
        profileUrl: photo.user.links.html
      };
      
      usedImageIds.add(photo.id);
      
      media.push({
        $id: `unsplash-${photo.id}-${Date.now()}`,
        url: photo.urls.regular,
        previewUrl: photo.urls.small,
        title: generatePexelsTitle(photo.description || photo.alt_description, photo.user.name),
        description: photo.description || photo.alt_description || `Photography by ${photo.user.name}`,
        tags: photo.tags?.map(tag => tag.title).slice(0, 6) || ['art', 'photography'],
        userId,
        uploadDate: photo.created_at,
        viewCount: photo.likes * 10,
        isFeatured: true,
        photographer: photo.user.name,
        photographerUrl: photo.user.links.html,
        type: 'image',
        source: 'unsplash',
        width: photo.width,
        height: photo.height,
        page,
        query,
        color: photo.color
      });
    });

    const totalResults = data.total;
    const totalPages = Math.ceil(totalResults / perPage);
    const hasMore = page < totalPages && media.length > 0;

    return { media, profiles, hasMore, totalResults };

  } catch (error) {
    console.error('Unsplash API error:', error.response?.status, error.message);
    throw error;
  }
};

// Smart media fetcher with fallbacks
const fetchStockMedia = async (isVideo, query, page, perPage) => {
  const sources = [];
  
  // Prioritize sources based on availability and content type
  if (PEXELS_API_KEY) {
    sources.push(() => fetchFromPexels(isVideo, query, page, perPage));
  }
  
  if (!isVideo && UNSPLASH_API_KEY) {
    sources.push(() => fetchFromUnsplash(query, page, perPage));
  }
  
  if (PIXABAY_API_KEY) {
    sources.push(() => fetchFromPixabay(isVideo, query, page, perPage));
  }

  // Try sources in order until we get results
  for (const source of sources) {
    try {
      const result = await source();
      if (result.media.length > 0) {
        return result;
      }
    } catch (error) {
      console.warn('Source failed, trying next...', error.message);
      continue;
    }
  }

  // If all sources fail, return empty result
  return { media: [], profiles: {}, hasMore: false, totalResults: 0 };
};

// Main export function
export const fetchPexelsMedia = async (filter, searchTerm = '', page = 1, perPage = 15) => {
  let baseQuery = searchTerm || getRandomQuery();
  
  switch (filter) {
    case 'videos':
      baseQuery = searchTerm || getRandomQuery('video');
      return await fetchStockMedia(true, baseQuery, page, perPage);
      
    case 'featured':
      baseQuery = searchTerm || getRandomQuery('art');
      return await fetchStockMedia(false, baseQuery, page, perPage);
      
    case 'user':
      baseQuery = searchTerm || getRandomQuery('photography');
      return await fetchStockMedia(false, baseQuery, page, perPage);
      
    default: // 'all'
      // Mix of images and videos
      const imageQuery = searchTerm || getRandomQuery('art');
      const videoQuery = searchTerm || getRandomQuery('video');
      
      const imagePerPage = Math.ceil(perPage * 0.7);
      const videoPerPage = perPage - imagePerPage;
      
      try {
        const [imagesRes, videosRes] = await Promise.all([
          fetchStockMedia(false, imageQuery, page, imagePerPage),
          fetchStockMedia(true, videoQuery, page, videoPerPage)
        ]);
        
        // Combine and shuffle results
        const combinedMedia = [...imagesRes.media, ...videosRes.media]
          .sort(() => Math.random() - 0.5)
          .slice(0, perPage);
          
        const combinedProfiles = { ...imagesRes.profiles, ...videosRes.profiles };
        const hasMore = imagesRes.hasMore || videosRes.hasMore;
        
        return {
          media: combinedMedia,
          profiles: combinedProfiles,
          hasMore,
          totalResults: (imagesRes.totalResults || 0) + (videosRes.totalResults || 0)
        };
        
      } catch (error) {
        console.error('Error fetching mixed media:', error);
        return { media: [], profiles: {}, hasMore: false, totalResults: 0 };
      }
  }
};

// Enhanced load more function
export const loadMorePexelsMedia = async (filter, searchTerm = '', currentPage, currentMedia = []) => {
  const nextPage = currentPage + 1;
  
  try {
    const result = await fetchPexelsMedia(filter, searchTerm, nextPage);
    
    // Filter out duplicates more aggressively
    const newMedia = result.media.filter(newItem => 
      !currentMedia.some(existingItem => 
        existingItem.url === newItem.url || 
        existingItem.$id.split('-')[1] === newItem.$id.split('-')[1]
      )
    );

    return {
      ...result,
      media: newMedia,
      page: nextPage
    };
    
  } catch (error) {
    console.error('Error loading more media:', error);
    return { media: [], profiles: {}, hasMore: false, totalResults: 0 };
  }
};

// Reset function to clear cache and start fresh
export const resetPexelsCache = () => {
  usedImageIds.clear();
  queryHistory.clear();
};

// Get fresh content with new queries
export const getFreshContent = async (filter, perPage = 15) => {
  resetPexelsCache();
  return await fetchPexelsMedia(filter, '', 1, perPage);
};

// Wrapper functions for compatibility
export async function fetchPexelsData(filter, searchTerm = '') {
  const { media, profiles, hasMore, totalResults } = await fetchPexelsMedia(filter, searchTerm, 1, 12);
  return {
    media,
    profiles,
    hasMore,
    pagination: { 
      featuredPage: hasMore ? 2 : 1, 
      appwriteLastId: null,
      totalResults 
    }
  };
}

export async function loadMorePexelsData(filter, searchTerm = '', paginationState) {
  const page = paginationState.featuredPage || 1;
  const currentMedia = paginationState.currentMedia || [];
  
  const result = await loadMorePexelsMedia(filter, searchTerm, page, currentMedia);
  
  return {
    media: result.media,
    profiles: result.profiles,
    hasMore: result.hasMore,
    pagination: { 
      featuredPage: result.hasMore ? page + 1 : page, 
      appwriteLastId: null,
      totalResults: result.totalResults 
    }
  };
}

// Utility to check API status
export const checkAPIStatus = async () => {
  const status = {
    pexels: false,
    pixabay: false,
    unsplash: false
  };

  try {
    if (PEXELS_API_KEY) {
      await axios.get('https://api.pexels.com/v1/curated?per_page=1', {
        headers: { Authorization: PEXELS_API_KEY }
      });
      status.pexels = true;
    }
  } catch (error) {
    console.warn('Pexels API not available');
  }

  try {
    if (PIXABAY_API_KEY) {
      await axios.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=test&per_page=1`);
      status.pixabay = true;
    }
  } catch (error) {
    console.warn('Pixabay API not available');
  }

  try {
    if (UNSPLASH_API_KEY) {
      await axios.get('https://api.unsplash.com/photos/random?count=1', {
        headers: { Authorization: `Client-ID ${UNSPLASH_API_KEY}` }
      });
      status.unsplash = true;
    }
  } catch (error) {
    console.warn('Unsplash API not available');
  }

  return status;
};