// Enhanced caching system
const responseCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
const MAX_CACHE_SIZE = 200;

export const getCachedResponse = (message) => {
  const cacheKey = message.toLowerCase().trim();
  const cached = responseCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log("✓ Cache hit for:", cacheKey);
    return cached.response;
  }
  
  // Remove expired entry
  if (cached) {
    responseCache.delete(cacheKey);
  }
  
  return null;
};

export const setCachedResponse = (message, response) => {
  const cacheKey = message.toLowerCase().trim();
  
  // Limit cache size
  if (responseCache.size >= MAX_CACHE_SIZE) {
    const firstKey = responseCache.keys().next().value;
    responseCache.delete(firstKey);
  }
  
  responseCache.set(cacheKey, {
    response,
    timestamp: Date.now(),
    type: response.type
  });
  
  console.log("✓ Cache set for:", cacheKey, `(Size: ${responseCache.size})`);
};

export const clearCache = () => {
  responseCache.clear();
  console.log("✓ Cache cleared");
};

export const getCacheStats = () => ({
  size: responseCache.size,
  keys: Array.from(responseCache.keys())
});