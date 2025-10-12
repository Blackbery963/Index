// // import { fetchPexelsMedia } from './pexelsService';
// // import { fetchPixabayMedia } from './pixabayService';

// // export const fetchFeaturedMedia = async (filter, page = 1) => {
// //   try {
// //     // Fetch from both APIs simultaneously
// //     const [pexelsData, pixabayData] = await Promise.allSettled([
// //       fetchPexelsMedia(filter, page),
// //       fetchPixabayMedia(filter, page)
// //     ]);

// //     let allMedia = [];
// //     let hasMore = false;

// //     // Process Pexels results
// //     if (pexelsData.status === 'fulfilled') {
// //       allMedia = [...allMedia, ...pexelsData.value.media];
// //       hasMore = hasMore || pexelsData.value.hasMore;
// //     } else {
// //       console.warn('Pexels API failed:', pexelsData.reason);
// //     }

// //     // Process Pixabay results
// //     if (pixabayData.status === 'fulfilled') {
// //       allMedia = [...allMedia, ...pixabayData.value.media];
// //       hasMore = hasMore || pixabayData.value.hasMore;
// //     } else {
// //       console.warn('Pixabay API failed:', pixabayData.reason);
// //     }

// //     // Shuffle and limit results for better variety
// //     const shuffledMedia = allMedia
// //       .sort(() => Math.random() - 0.5)
// //       .slice(0, 20); // Limit to 20 items per page

// //     return {
// //       media: shuffledMedia,
// //       hasMore,
// //       sources: {
// //         pexels: pexelsData.status === 'fulfilled',
// //         pixabay: pixabayData.status === 'fulfilled'
// //       }
// //     };
// //   } catch (error) {
// //     console.error('Error fetching featured media:', error);
// //     return { media: [], hasMore: false, sources: {} };
// //   }
// // };



// import { fetchPexelsMedia, loadMorePexelsMedia } from './pexelsService';
// import { fetchPixabayMedia, loadMorePixabayMedia, fetchPixabayWithFallback } from './pixabayService';

// // Cache for tracking API performance and fallbacks
// const apiPerformance = {
//   pexels: { success: 0, failures: 0, lastSuccess: null },
//   pixabay: { success: 0, failures: 0, lastSuccess: null }
// };

// // Configuration
// const CONFIG = {
//   defaultPerPage: 20,
//   maxRetries: 2,
//   retryDelay: 1000,
//   shuffleResults: true,
//   enableFallbacks: true,
//   balanceSources: true
// };

// // Smart source selector based on performance
// const getPreferredSources = () => {
//   const pexelsScore = apiPerformance.pexels.success - (apiPerformance.pexels.failures * 2);
//   const pixabayScore = apiPerformance.pixabay.success - (apiPerformance.pixabay.failures * 2);
  
//   if (pexelsScore > pixabayScore) {
//     return ['pexels', 'pixabay']; // Pexels first
//   } else {
//     return ['pixabay', 'pexels']; // Pixabay first
//   }
// };

// // Update API performance
// const updateApiPerformance = (source, success) => {
//   if (success) {
//     apiPerformance[source].success++;
//     apiPerformance[source].lastSuccess = Date.now();
//   } else {
//     apiPerformance[source].failures++;
//   }
// };

// // Retry with delay
// const retryWithDelay = async (fn, retries = CONFIG.maxRetries) => {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await fn();
//     } catch (error) {
//       if (i < retries - 1) {
//         await new Promise(resolve => setTimeout(resolve, CONFIG.retryDelay * (i + 1)));
//       } else {
//         throw error;
//       }
//     }
//   }
// };

// // Filter and deduplicate media
// const processMedia = (media, existingMedia = []) => {
//   const existingIds = new Set(existingMedia.map(item => item.$id));
  
//   return media.filter(item => {
//     // Remove duplicates
//     if (existingIds.has(item.$id)) return false;
    
//     // Ensure required fields
//     if (!item.url || !item.type) return false;
    
//     // Validate URLs
//     try {
//       new URL(item.url);
//       return true;
//     } catch {
//       return false;
//     }
//   });
// };

// // Balance media from different sources
// const balanceMediaSources = (media, targetCount) => {
//   const pexelsMedia = media.filter(item => item.source === 'pexels');
//   const pixabayMedia = media.filter(item => item.source === 'pixabay');
  
//   // If one source is dominating, balance them
//   const maxPerSource = Math.ceil(targetCount / 2);
  
//   let balancedMedia = [];
  
//   if (pexelsMedia.length > maxPerSource) {
//     balancedMedia = balancedMedia.concat(pexelsMedia.slice(0, maxPerSource));
//   } else {
//     balancedMedia = balancedMedia.concat(pexelsMedia);
//   }
  
//   if (pixabayMedia.length > maxPerSource) {
//     balancedMedia = balancedMedia.concat(pixabayMedia.slice(0, maxPerSource));
//   } else {
//     balancedMedia = balancedMedia.concat(pixabayMedia);
//   }
  
//   // Fill remaining slots if needed
//   if (balancedMedia.length < targetCount) {
//     const remaining = media
//       .filter(item => !balancedMedia.includes(item))
//       .slice(0, targetCount - balancedMedia.length);
//     balancedMedia = balancedMedia.concat(remaining);
//   }
  
//   return balancedMedia.slice(0, targetCount);
// };

// export const fetchFeaturedMedia = async (filter, page = 1, options = {}) => {
//   const {
//     perPage = CONFIG.defaultPerPage,
//     shuffle = CONFIG.shuffleResults,
//     enableFallbacks = CONFIG.enableFallbacks,
//     balanceSources = CONFIG.balanceSources
//   } = options;

//   try {
//     const preferredSources = getPreferredSources();
//     const apiPromises = [];

//     // Create API calls based on preferred sources
//     for (const source of preferredSources) {
//       if (source === 'pexels') {
//         apiPromises.push(
//           retryWithDelay(() => fetchPexelsMedia(filter, page, Math.ceil(perPage / 2)))
//         );
//       } else if (source === 'pixabay') {
//         if (enableFallbacks) {
//           apiPromises.push(
//             retryWithDelay(() => fetchPixabayWithFallback(filter, page, Math.ceil(perPage / 2)))
//           );
//         } else {
//           apiPromises.push(
//             retryWithDelay(() => fetchPixabayMedia(filter, page, Math.ceil(perPage / 2)))
//           );
//         }
//       }
//     }

//     const results = await Promise.allSettled(apiPromises);

//     let allMedia = [];
//     let hasMore = false;
//     const sources = {
//       pexels: { success: false, mediaCount: 0, hasMore: false },
//       pixabay: { success: false, mediaCount: 0, hasMore: false }
//     };

//     // Process results with detailed tracking
//     results.forEach((result, index) => {
//       const sourceName = preferredSources[index];
      
//       if (result.status === 'fulfilled') {
//         const data = result.value;
//         sources[sourceName] = {
//           success: true,
//           mediaCount: data.media.length,
//           hasMore: data.hasMore,
//           totalHits: data.totalHits,
//           currentPage: data.currentPage
//         };
        
//         allMedia = [...allMedia, ...data.media];
//         hasMore = hasMore || data.hasMore;
        
//         updateApiPerformance(sourceName, true);
//       } else {
//         console.warn(`${sourceName} API failed:`, result.reason);
//         sources[sourceName] = {
//           success: false,
//           mediaCount: 0,
//           hasMore: false,
//           error: result.reason?.message
//         };
        
//         updateApiPerformance(sourceName, false);
//       }
//     });

//     // Process and balance media
//     let processedMedia = processMedia(allMedia);
    
//     if (balanceSources) {
//       processedMedia = balanceMediaSources(processedMedia, perPage);
//     }
    
//     // Shuffle if enabled
//     if (shuffle && processedMedia.length > 1) {
//       processedMedia = processedMedia.sort(() => Math.random() - 0.5);
//     }
    
//     // Limit to requested perPage
//     processedMedia = processedMedia.slice(0, perPage);

//     return {
//       media: processedMedia,
//       hasMore: hasMore && processedMedia.length > 0,
//       pagination: {
//         page,
//         perPage: processedMedia.length,
//         nextPage: hasMore ? page + 1 : null
//       },
//       sources,
//       performance: { ...apiPerformance }
//     };

//   } catch (error) {
//     console.error('Error fetching featured media:', error);
//     return {
//       media: [],
//       hasMore: false,
//       pagination: { page, perPage: 0, nextPage: null },
//       sources: { pexels: { success: false }, pixabay: { success: false } },
//       error: error.message
//     };
//   }
// };

// export const loadMoreFeaturedMedia = async (filter, currentPage, existingMedia = [], options = {}) => {
//   const nextPage = currentPage + 1;
  
//   try {
//     const result = await fetchFeaturedMedia(filter, nextPage, options);
    
//     // Ensure no duplicates with existing media
//     const uniqueNewMedia = processMedia(result.media, existingMedia);
    
//     return {
//       ...result,
//       media: uniqueNewMedia,
//       pagination: {
//         ...result.pagination,
//         page: nextPage
//       }
//     };
//   } catch (error) {
//     console.error('Error loading more featured media:', error);
//     return {
//       media: [],
//       hasMore: false,
//       pagination: { page: currentPage, perPage: 0, nextPage: null },
//       sources: { pexels: { success: false }, pixabay: { success: false } },
//       error: error.message
//     };
//   }
// };

// // Smart loading that adapts based on previous performance
// export const smartLoadFeaturedMedia = async (filter, page = 1, existingMedia = [], options = {}) => {
//   // If previous pages had good results, continue normally
//   if (apiPerformance.pexels.success > 0 || apiPerformance.pixabay.success > 0) {
//     return await loadMoreFeaturedMedia(filter, page - 1, existingMedia, options);
//   }
  
//   // Otherwise, try a fresh fetch with fallbacks enabled
//   return await fetchFeaturedMedia(filter, page, {
//     ...options,
//     enableFallbacks: true,
//     balanceSources: true
//   });
// };

// // Get media statistics
// export const getFeaturedMediaStats = () => {
//   return {
//     performance: apiPerformance,
//     config: CONFIG,
//     totalSuccesses: apiPerformance.pexels.success + apiPerformance.pixabay.success,
//     totalFailures: apiPerformance.pexels.failures + apiPerformance.pixabay.failures,
//     successRate: ((apiPerformance.pexels.success + apiPerformance.pixabay.success) / 
//                  (apiPerformance.pexels.success + apiPerformance.pixabay.success + 
//                   apiPerformance.pexels.failures + apiPerformance.pixabay.failures)) * 100
//   };
// };

// // Reset performance tracking
// export const resetFeaturedMediaStats = () => {
//   apiPerformance.pexels = { success: 0, failures: 0, lastSuccess: null };
//   apiPerformance.pixabay = { success: 0, failures: 0, lastSuccess: null };
// };

// // Health check for APIs
// export const checkApiHealth = async () => {
//   const health = {
//     pexels: { healthy: false, responseTime: null },
//     pixabay: { healthy: false, responseTime: null }
//   };

//   try {
//     // Test Pexels
//     const pexelsStart = Date.now();
//     const pexelsTest = await fetchPexelsMedia('all', 1, 1);
//     health.pexels.responseTime = Date.now() - pexelsStart;
//     health.pexels.healthy = pexelsTest.media.length > 0;
//   } catch (error) {
//     health.pexels.healthy = false;
//   }

//   try {
//     // Test Pixabay
//     const pixabayStart = Date.now();
//     const pixabayTest = await fetchPixabayMedia('all', 1, 1);
//     health.pixabay.responseTime = Date.now() - pixabayStart;
//     health.pixabay.healthy = pixabayTest.media.length > 0;
//   } catch (error) {
//     health.pixabay.healthy = false;
//   }

//   return health;
// };


import { fetchPexelsMedia, loadMorePexelsMedia, getFreshContent, resetPexelsCache } from './pexelsService';
import { fetchPixabayMedia, loadMorePixabayMedia, fetchPixabayWithFallback } from './pixabayService';

// Enhanced configuration with featured-specific settings
const CONFIG = {
  defaultPerPage: 20,
  maxRetries: 3,
  retryDelay: 1000,
  shuffleResults: true,
  enableFallbacks: true,
  balanceSources: true,
  maxQueriesPerSession: 50,
  queryRotationThreshold: 3, // Rotate queries after 3 pages
  enableQueryExpansion: true,
  contentDiversity: true
};

// Extensive featured content queries categorized by type
const FEATURED_QUERIES = {
  artistic: [
    'art gallery exhibition', 'museum artwork', 'contemporary art exhibition',
    'digital art showcase', 'painting collection', 'art installation',
    'masterpiece artwork', 'fine art collection', 'art curation',
    'visual arts exhibition', 'modern art gallery', 'artistic masterpiece',
    'creative expression art', 'exhibition display', 'art collection'
  ],
  photography: [
    'award winning photography', 'professional photography',
    'artistic photography exhibition', 'fine art photography',
    'photography showcase', 'creative photography gallery',
    'photography masterpiece', 'exhibition photography',
    'gallery quality photos', 'professional photo collection'
  ],
  digital: [
    'digital art showcase', 'concept art exhibition', 'illustration gallery',
    'digital masterpiece', 'creative digital art', 'art direction',
    'visual development art', 'character design showcase', 'environment art'
  ],
  mixed: [
    'featured artwork', 'curated art collection', 'premium art',
    'selected artworks', 'art highlights', 'featured creations',
    'best artwork', 'top art pieces', 'artistic highlights'
  ]
};

// Cache for tracking and rotation
const apiPerformance = {
  pexels: { success: 0, failures: 0, lastSuccess: null, queryHistory: [] },
  pixabay: { success: 0, failures: 0, lastSuccess: null, queryHistory: [] }
};

const sessionState = {
  usedQueries: new Set(),
  currentQueryCategory: 'artistic',
  queryRotationCount: 0,
  totalPagesFetched: 0,
  lastRotationPage: 0
};

// Smart query generator with rotation and expansion
class QueryManager {
  constructor() {
    this.categories = Object.keys(FEATURED_QUERIES);
    this.currentCategoryIndex = 0;
    this.queryIndex = 0;
  }

  getNextQuery() {
    // If we've used many queries, reset and expand
    if (sessionState.usedQueries.size >= CONFIG.maxQueriesPerSession) {
      this.expandQueries();
    }

    const currentCategory = this.categories[this.currentCategoryIndex];
    const queries = FEATURED_QUERIES[currentCategory];
    
    let query = queries[this.queryIndex % queries.length];
    
    // Add modifiers for diversity
    if (CONFIG.enableQueryExpansion) {
      query = this.addQueryModifiers(query);
    }

    this.queryIndex++;
    
    // Rotate category every few queries
    if (this.queryIndex % 4 === 0) {
      this.currentCategoryIndex = (this.currentCategoryIndex + 1) % this.categories.length;
    }

    sessionState.usedQueries.add(query);
    return query;
  }

  addQueryModifiers(baseQuery) {
    const modifiers = [
      'colorful', 'minimal', 'detailed', 'textured', 'vibrant', 'monochrome',
      'bright', 'dark', 'warm', 'cool', 'saturated', 'desaturated',
      'high contrast', 'soft', 'geometric', 'organic', 'structured', 'fluid',
      'abstract', 'realistic', 'surreal', 'fantasy', 'contemporary', 'traditional'
    ];

    const randomModifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    return `${baseQuery} ${randomModifier}`;
  }

  expandQueries() {
    // Add more dynamic queries based on what worked well
    const successfulQueries = [...apiPerformance.pexels.queryHistory, ...apiPerformance.pixabay.queryHistory]
      .filter(item => item.success)
      .map(item => item.query);

    successfulQueries.forEach(query => {
      if (!sessionState.usedQueries.has(query)) {
        // Add to appropriate category or create mixed
        FEATURED_QUERIES.mixed.push(query);
      }
    });

    sessionState.usedQueries.clear();
    this.queryIndex = 0;
  }

  shouldRotateQuery(page) {
    return page - sessionState.lastRotationPage >= CONFIG.queryRotationThreshold;
  }

  rotateQuery() {
    sessionState.lastRotationPage = sessionState.totalPagesFetched;
    sessionState.queryRotationCount++;
    this.queryIndex = 0;
    this.currentCategoryIndex = (this.currentCategoryIndex + 1) % this.categories.length;
  }
}

const queryManager = new QueryManager();

// Enhanced source selection with query awareness
const getPreferredSources = (query = '') => {
  const pexelsScore = apiPerformance.pexels.success - (apiPerformance.pexels.failures * 2);
  const pixabayScore = apiPerformance.pixabay.success - (apiPerformance.pixabay.failures * 2);
  
  // Check if query has been successful with specific sources
  const queryHistoryPexels = apiPerformance.pexels.queryHistory.filter(h => h.query === query && h.success);
  const queryHistoryPixabay = apiPerformance.pixabay.queryHistory.filter(h => h.query === query && h.success);
  
  if (queryHistoryPexels.length > queryHistoryPixabay.length) {
    return ['pexels', 'pixabay'];
  } else if (queryHistoryPixabay.length > queryHistoryPexels.length) {
    return ['pixabay', 'pexels'];
  }
  
  // Fall back to general performance
  return pexelsScore >= pixabayScore ? ['pexels', 'pixabay'] : ['pixabay', 'pexels'];
};

// Enhanced API performance tracking
const updateApiPerformance = (source, success, query, mediaCount = 0) => {
  if (success) {
    apiPerformance[source].success++;
    apiPerformance[source].lastSuccess = Date.now();
    apiPerformance[source].queryHistory.push({
      query,
      success: true,
      mediaCount,
      timestamp: Date.now()
    });
  } else {
    apiPerformance[source].failures++;
    apiPerformance[source].queryHistory.push({
      query,
      success: false,
      mediaCount: 0,
      timestamp: Date.now()
    });
  }
  
  // Keep history manageable
  if (apiPerformance[source].queryHistory.length > 100) {
    apiPerformance[source].queryHistory = apiPerformance[source].queryHistory.slice(-50);
  }
};

// Retry with exponential backoff
const retryWithDelay = async (fn, retries = CONFIG.maxRetries, delay = CONFIG.retryDelay) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i < retries - 1) {
        const backoffDelay = delay * Math.pow(2, i); // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      } else {
        throw error;
      }
    }
  }
};

// Enhanced media processing with content diversity
const processMedia = (media, existingMedia = []) => {
  const existingIds = new Set(existingMedia.map(item => item.$id));
  const existingUrls = new Set(existingMedia.map(item => item.url));
  
  return media.filter(item => {
    // Remove duplicates
    if (existingIds.has(item.$id) || existingUrls.has(item.url)) return false;
    
    // Ensure required fields
    if (!item.url || !item.type) return false;
    
    // Validate URLs
    try {
      new URL(item.url);
      return true;
    } catch {
      return false;
    }
  });
};

// Content diversity scoring
const calculateDiversityScore = (media, existingMedia = []) => {
  if (media.length === 0) return 0;
  
  const allMedia = [...existingMedia, ...media];
  
  // Calculate diversity based on sources, types, and colors
  const sources = new Set(allMedia.map(item => item.source));
  const types = new Set(allMedia.map(item => item.type));
  const artists = new Set(allMedia.map(item => item.photographer));
  
  const sourceDiversity = sources.size / allMedia.length;
  const typeDiversity = types.size / allMedia.length;
  const artistDiversity = artists.size / allMedia.length;
  
  return (sourceDiversity + typeDiversity + artistDiversity) / 3;
};

// Enhanced media balancing with diversity consideration
const balanceMediaSources = (media, targetCount, existingMedia = []) => {
  const sourceGroups = {
    pexels: media.filter(item => item.source === 'pexels'),
    pixabay: media.filter(item => item.source === 'pixabay')
  };
  
  let balancedMedia = [];
  const maxPerSource = Math.ceil(targetCount / Object.keys(sourceGroups).length);
  
  // Take from each source proportionally
  Object.values(sourceGroups).forEach(sourceMedia => {
    const takeCount = Math.min(sourceMedia.length, maxPerSource);
    balancedMedia = balancedMedia.concat(sourceMedia.slice(0, takeCount));
  });
  
  // If we need more media, fill from remaining
  if (balancedMedia.length < targetCount) {
    const remaining = media
      .filter(item => !balancedMedia.includes(item))
      .slice(0, targetCount - balancedMedia.length);
    balancedMedia = balancedMedia.concat(remaining);
  }
  
  // Ensure diversity
  if (CONFIG.contentDiversity) {
    const diversityScore = calculateDiversityScore(balancedMedia, existingMedia);
    if (diversityScore < 0.3) {
      // Try to improve diversity by replacing similar items
      balancedMedia = improveDiversity(balancedMedia, media, existingMedia);
    }
  }
  
  return balancedMedia.slice(0, targetCount);
};

const improveDiversity = (currentSelection, allMedia, existingMedia) => {
  const improved = [...currentSelection];
  const allMediaSet = new Set(allMedia);
  
  // Replace items to improve source diversity
  const sourceCount = {};
  improved.forEach(item => {
    sourceCount[item.source] = (sourceCount[item.source] || 0) + 1;
  });
  
  // If one source dominates, replace some items
  const maxSource = Object.keys(sourceCount).reduce((a, b) => 
    sourceCount[a] > sourceCount[b] ? a : b
  );
  
  if (sourceCount[maxSource] > Math.ceil(improved.length / 2)) {
    // Replace some items from dominant source with items from other sources
    const replacements = allMedia
      .filter(item => item.source !== maxSource && !improved.includes(item))
      .slice(0, 2);
    
    if (replacements.length > 0) {
      // Remove some dominant source items and add replacements
      const dominantItems = improved.filter(item => item.source === maxSource);
      const toRemove = dominantItems.slice(0, Math.min(replacements.length, 2));
      
      toRemove.forEach(item => {
        const index = improved.indexOf(item);
        if (index > -1) improved.splice(index, 1);
      });
      
      improved.push(...replacements);
    }
  }
  
  return improved;
};

// Main enhanced featured media fetcher
export const fetchFeaturedMedia = async (filter = 'featured', page = 1, options = {}) => {
  const {
    perPage = CONFIG.defaultPerPage,
    shuffle = CONFIG.shuffleResults,
    enableFallbacks = CONFIG.enableFallbacks,
    balanceSources = CONFIG.balanceSources,
    forceRefresh = false
  } = options;

  try {
    sessionState.totalPagesFetched++;

    // Rotate query if needed
    let query;
    if (forceRefresh || queryManager.shouldRotateQuery(page)) {
      queryManager.rotateQuery();
      query = queryManager.getNextQuery();
    } else {
      query = queryManager.getNextQuery();
    }

    const preferredSources = getPreferredSources(query);
    const apiPromises = [];

    // Create enhanced API calls with query awareness
    for (const source of preferredSources) {
      const sourcePerPage = Math.ceil(perPage / preferredSources.length);
      
      if (source === 'pexels') {
        apiPromises.push(
          retryWithDelay(() => fetchPexelsMedia(filter, query, page, sourcePerPage))
        );
      } else if (source === 'pixabay') {
        if (enableFallbacks) {
          apiPromises.push(
            retryWithDelay(() => fetchPixabayWithFallback(filter, query, page, sourcePerPage))
          );
        } else {
          apiPromises.push(
            retryWithDelay(() => fetchPixabayMedia(filter, query, page, sourcePerPage))
          );
        }
      }
    }

    const results = await Promise.allSettled(apiPromises);

    let allMedia = [];
    let hasMore = false;
    const sources = {
      pexels: { success: false, mediaCount: 0, hasMore: false, query },
      pixabay: { success: false, mediaCount: 0, hasMore: false, query }
    };

    // Process results with enhanced tracking
    results.forEach((result, index) => {
      const sourceName = preferredSources[index];
      
      if (result.status === 'fulfilled') {
        const data = result.value;
        sources[sourceName] = {
          success: true,
          mediaCount: data.media.length,
          hasMore: data.hasMore,
          totalResults: data.totalResults,
          currentPage: page,
          query
        };
        
        allMedia = [...allMedia, ...data.media];
        hasMore = hasMore || data.hasMore;
        
        updateApiPerformance(sourceName, true, query, data.media.length);
      } else {
        console.warn(`${sourceName} API failed for query "${query}":`, result.reason);
        sources[sourceName] = {
          success: false,
          mediaCount: 0,
          hasMore: false,
          error: result.reason?.message,
          query
        };
        
        updateApiPerformance(sourceName, false, query);
      }
    });

    // Enhanced media processing
    let processedMedia = processMedia(allMedia);
    
    if (balanceSources) {
      processedMedia = balanceMediaSources(processedMedia, perPage);
    }
    
    // Shuffle if enabled
    if (shuffle && processedMedia.length > 1) {
      processedMedia = processedMedia.sort(() => Math.random() - 0.5);
    }
    
    // Ensure we have the requested number of items
    if (processedMedia.length < perPage && hasMore) {
      // Try to get more media from successful sources
      const successfulSources = Object.entries(sources)
        .filter(([_, stats]) => stats.success && stats.hasMore)
        .map(([name]) => name);
      
      if (successfulSources.length > 0) {
        const additionalPromises = successfulSources.map(source => {
          if (source === 'pexels') {
            return retryWithDelay(() => fetchPexelsMedia(filter, query, page + 1, perPage - processedMedia.length));
          } else {
            return retryWithDelay(() => fetchPixabayMedia(filter, query, page + 1, perPage - processedMedia.length));
          }
        });
        
        try {
          const additionalResults = await Promise.allSettled(additionalPromises);
          additionalResults.forEach((result, index) => {
            if (result.status === 'fulfilled') {
              const additionalMedia = processMedia(result.value.media, processedMedia);
              processedMedia = [...processedMedia, ...additionalMedia];
            }
          });
        } catch (error) {
          console.warn('Failed to fetch additional media:', error);
        }
      }
    }
    
    processedMedia = processedMedia.slice(0, perPage);

    // If we still don't have enough media and it's the first page, try force refresh
    if (processedMedia.length === 0 && page === 1) {
      resetPexelsCache();
      return await fetchFeaturedMedia(filter, page, { ...options, forceRefresh: true });
    }

    return {
      media: processedMedia,
      hasMore: hasMore && processedMedia.length > 0,
      pagination: {
        page,
        perPage: processedMedia.length,
        nextPage: hasMore ? page + 1 : null,
        totalPagesFetched: sessionState.totalPagesFetched
      },
      sources,
      query,
      performance: { ...apiPerformance },
      sessionState: { ...sessionState }
    };

  } catch (error) {
    console.error('Error fetching featured media:', error);
    return {
      media: [],
      hasMore: false,
      pagination: { page, perPage: 0, nextPage: null },
      sources: { 
        pexels: { success: false, query: '' }, 
        pixabay: { success: false, query: '' } 
      },
      error: error.message,
      sessionState: { ...sessionState }
    };
  }
};

// Enhanced load more with intelligent query rotation
export const loadMoreFeaturedMedia = async (filter, currentPage, existingMedia = [], options = {}) => {
  const nextPage = currentPage + 1;
  
  try {
    const result = await fetchFeaturedMedia(filter, nextPage, options);
    
    // Ensure no duplicates with existing media
    const uniqueNewMedia = processMedia(result.media, existingMedia);
    
    // If we got no new media, try with query rotation
    if (uniqueNewMedia.length === 0 && result.hasMore) {
      queryManager.rotateQuery();
      const retryResult = await fetchFeaturedMedia(filter, 1, { ...options, forceRefresh: true });
      const retryNewMedia = processMedia(retryResult.media, existingMedia);
      
      return {
        ...retryResult,
        media: retryNewMedia,
        pagination: {
          ...retryResult.pagination,
          page: nextPage
        }
      };
    }
    
    return {
      ...result,
      media: uniqueNewMedia,
      pagination: {
        ...result.pagination,
        page: nextPage
      }
    };
  } catch (error) {
    console.error('Error loading more featured media:', error);
    return {
      media: [],
      hasMore: false,
      pagination: { page: currentPage, perPage: 0, nextPage: null },
      sources: { pexels: { success: false }, pixabay: { success: false } },
      error: error.message
    };
  }
};

// Smart infinite loading with automatic recovery
export const smartInfiniteFeaturedMedia = async (filter, page = 1, existingMedia = [], options = {}) => {
  const maxRetries = 2;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await fetchFeaturedMedia(filter, page, {
        ...options,
        forceRefresh: attempt > 0
      });
      
      const uniqueMedia = processMedia(result.media, existingMedia);
      
      if (uniqueMedia.length > 0 || !result.hasMore) {
        return {
          ...result,
          media: uniqueMedia
        };
      }
      
      // If no new media but hasMore is true, try next page
      if (attempt < maxRetries - 1) {
        page++;
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.warn(`Attempt ${attempt + 1} failed:`, error.message);
      if (attempt === maxRetries - 1) throw error;
    }
  }
  
  throw new Error('Failed to fetch featured media after retries');
};

// Reset everything for fresh start
export const resetFeaturedMediaService = () => {
  resetPexelsCache();
  resetFeaturedMediaStats();
  sessionState.usedQueries.clear();
  sessionState.currentQueryCategory = 'artistic';
  sessionState.queryRotationCount = 0;
  sessionState.totalPagesFetched = 0;
  sessionState.lastRotationPage = 0;
  queryManager.queryIndex = 0;
  queryManager.currentCategoryIndex = 0;
};

// Enhanced statistics
export const getFeaturedMediaStats = () => {
  const totalSuccesses = apiPerformance.pexels.success + apiPerformance.pixabay.success;
  const totalFailures = apiPerformance.pexels.failures + apiPerformance.pixabay.failures;
  const totalRequests = totalSuccesses + totalFailures;
  
  return {
    performance: apiPerformance,
    session: sessionState,
    config: CONFIG,
    totals: {
      successes: totalSuccesses,
      failures: totalFailures,
      requests: totalRequests,
      successRate: totalRequests > 0 ? (totalSuccesses / totalRequests) * 100 : 0
    },
    queries: {
      totalUsed: sessionState.usedQueries.size,
      recentQueries: [...sessionState.usedQueries].slice(-10)
    }
  };
};

export const resetFeaturedMediaStats = () => {
  apiPerformance.pexels = { success: 0, failures: 0, lastSuccess: null, queryHistory: [] };
  apiPerformance.pixabay = { success: 0, failures: 0, lastSuccess: null, queryHistory: [] };
};

// Health check with detailed diagnostics
export const checkFeaturedMediaHealth = async () => {
  const health = {
    pexels: { healthy: false, responseTime: null, testQuery: '', mediaCount: 0 },
    pixabay: { healthy: false, responseTime: null, testQuery: '', mediaCount: 0 },
    overall: { healthy: false, issues: [] }
  };

  const testQuery = 'art gallery exhibition';

  try {
    const pexelsStart = Date.now();
    const pexelsTest = await fetchPexelsMedia('featured', testQuery, 1, 3);
    health.pexels.responseTime = Date.now() - pexelsStart;
    health.pexels.healthy = pexelsTest.media.length > 0;
    health.pexels.mediaCount = pexelsTest.media.length;
    health.pexels.testQuery = testQuery;
  } catch (error) {
    health.pexels.healthy = false;
    health.overall.issues.push(`Pexels: ${error.message}`);
  }

  try {
    const pixabayStart = Date.now();
    const pixabayTest = await fetchPixabayMedia('featured', testQuery, 1, 3);
    health.pixabay.responseTime = Date.now() - pixabayStart;
    health.pixabay.healthy = pixabayTest.media.length > 0;
    health.pixabay.mediaCount = pixabayTest.media.length;
    health.pixabay.testQuery = testQuery;
  } catch (error) {
    health.pixabay.healthy = false;
    health.overall.issues.push(`Pixabay: ${error.message}`);
  }

  health.overall.healthy = health.pexels.healthy || health.pixabay.healthy;
  
  return health;
};