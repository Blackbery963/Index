// // // src/Components/Gallery/services/archiveService.js
// // export async function fetchArchiveVideos(page = 1, limit = 10) {
// //   try {
// //     // Fetch creative commons / public domain videos from Internet Archive
// //     const query = `https://archive.org/advancedsearch.php?q=collection:(movies) AND mediatype:(movies)&fl[]=identifier,title,description,creator&rows=${limit}&page=${page}&output=json`;
// //     const response = await fetch(query);
// //     const data = await response.json();

// //     const videos = (data.response.docs || [])
// //       .map((item) => {
// //         // Construct the video file URL (most have MP4s available)
// //         const baseUrl = `https://archive.org/download/${item.identifier}`;
// //         return {
// //           $id: item.identifier,
// //           title: item.title || "Untitled Archive Video",
// //           description: item.description || "",
// //           userId: "archive",
// //           url: `${baseUrl}/${item.identifier}.mp4`,
// //           tag: ["public-domain", "archive"],
// //           creator: item.creator || "Unknown",
// //         };
// //       })
// //       .filter((v) => v.url);

// //     return videos;
// //   } catch (error) {
// //     console.error("Error fetching archive videos:", error);
// //     return [];
// //   }
// // }

// // src/Components/Gallery/services/archiveService.js

// export async function fetchArchiveVideos(page = 1, limit = 10) {
//   try {
//     // Search query targeting artistic, cinematic, and creative works
//     const searchTerms = [
//       'cinematic',
//       'artistic',
//       'creative video',
//       'experimental film',
//       'short film',
//       'animation',
//       'visual art',
//       'aesthetic',
//       'music video',
//       'performance art'
//     ].join(' OR ');

//     // Build Internet Archive API query
//     const query = `https://archive.org/advancedsearch.php?q=(${encodeURIComponent(
//       searchTerms
//     )}) AND mediatype:(movies) NOT subject:(news OR government OR lecture OR history OR documentary OR black-and-white)&fl[]=identifier,title,description,creator,subject&rows=${limit}&page=${page}&output=json`;

//     const response = await fetch(query);
//     const data = await response.json();

//     const videos = (data.response.docs || [])
//       .map((item) => {
//         const baseUrl = `https://archive.org/download/${item.identifier}`;
//         return {
//           $id: item.identifier,
//           title: item.title || "Untitled Archive Video",
//           description: item.description || "",
//           userId: "archive",
//           url: `${baseUrl}/${item.identifier}.mp4`,
//           tag: ["public-domain", "archive", "artistic"],
//           creator: item.creator || "Unknown",
//         };
//       })
//       .filter((v) => v.url);

//     return videos;
//   } catch (error) {
//     console.error("Error fetching archive videos:", error);
//     return [];
//   }
// }


// // // More reliable CORS proxies with proper formatting
// const CORS_PROXIES = [
//   { url: 'https://api.allorigins.win/raw?url=', needsEncode: true },
//   { url: 'https://corsproxy.io/?', needsEncode: true },
//   { url: 'https://api.codetabs.com/v1/proxy?quest=', needsEncode: true },
// ];

// // Helper function with better error handling and timeout
// async function fetchWithCorsFallback(url, options = {}) {
//   const timeout = options.timeout || 15000;

//   for (let i = 0; i < CORS_PROXIES.length; i++) {
//     const proxy = CORS_PROXIES[i];
//     try {
//       const proxyUrl = proxy.needsEncode 
//         ? `${proxy.url}${encodeURIComponent(url)}` 
//         : `${proxy.url}${url}`;
      
//       console.log(`Attempt ${i + 1}: Using proxy ${proxy.url.split('?')[0]}`);
      
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), timeout);
      
//       const response = await fetch(proxyUrl, {
//         ...options,
//         signal: controller.signal,
//         headers: {
//           'Accept': 'application/json',
//           ...options.headers
//         }
//       });
      
//       clearTimeout(timeoutId);
      
//       if (response.ok) {
//         console.log(`✓ Proxy ${proxy.url.split('?')[0]} succeeded`);
//         return response;
//       }
      
//       console.log(`✗ Proxy returned status ${response.status}`);
//     } catch (error) {
//       if (error.name === 'AbortError') {
//         console.log(`✗ Proxy timeout after ${timeout}ms`);
//       } else {
//         console.log(`✗ Proxy error: ${error.message}`);
//       }
//     }
//   }
  
//   throw new Error('All CORS proxies failed. Please check your internet connection.');
// }

// // Simplified query without advanced search complexity
// export async function fetchArchiveVideos(page = 1, limit = 15) {
//   try {
//     // Simpler, more reliable query
//     const collections = [
//       'animationandcartoons',
//       'opensource_movies',
//       'creative_commons'
//     ];

//     const query = collections[page % collections.length];
    
//     // Simplified Archive.org API endpoint
//     const searchUrl = `https://archive.org/advancedsearch.php?q=collection:${query} AND mediatype:movies&fl=identifier,title,description,creator,downloads&sort=downloads desc&rows=${limit}&page=${page}&output=json`;

//     console.log('Fetching from Archive.org...');
    
//     const response = await fetchWithCorsFallback(searchUrl, { timeout: 15000 });
//     const data = await response.json();

//     if (!data.response || !data.response.docs || data.response.docs.length === 0) {
//       console.warn('No videos found, using mock data');
//       return getMockArchiveVideos();
//     }

//     console.log(`Found ${data.response.docs.length} videos`);

//     // Process videos without HEAD requests (they're causing failures)
//     const videos = data.response.docs
//       .slice(0, limit)
//       .map((item) => {
//         if (!item.identifier) return null;

//         // Construct standard video URL
//         const videoUrl = `https://archive.org/download/${item.identifier}/${item.identifier}.mp4`;
        
//         return {
//           $id: item.identifier,
//           title: cleanTitle(item.title),
//           description: cleanDescription(item.description),
//           userId: "archive",
//           url: videoUrl,
//           tag: generateRelevantTags(item),
//           creator: item.creator || "Unknown Artist",
//           year: item.year || "Unknown",
//           downloads: item.downloads || 0,
//           rating: item.avg_rating || 0
//         };
//       })
//       .filter(v => v !== null);

//     console.log(`Returning ${videos.length} videos`);
    
//     return videos.length > 0 ? videos : getMockArchiveVideos();

//   } catch (error) {
//     console.error("Archive fetch error:", error.message);
//     return getMockArchiveVideos();
//   }
// }

// // Helper functions
// function cleanTitle(title) {
//   if (!title) return "Creative Archive Video";
  
//   return title
//     .replace(/\.(mp4|avi|mov|wmv)$/i, '')
//     .replace(/[_-]/g, ' ')
//     .replace(/\s+/g, ' ')
//     .trim()
//     .slice(0, 60);
// }

// function cleanDescription(desc) {
//   if (!desc) return "A creative work from the Internet Archive";
  
//   if (Array.isArray(desc)) {
//     desc = desc[0];
//   }
  
//   return desc
//     .toString()
//     .replace(/<[^>]*>/g, '')
//     .replace(/https?:\/\/[^\s]+/g, '')
//     .replace(/\s+/g, ' ')
//     .trim()
//     .slice(0, 120);
// }

// function generateRelevantTags(item) {
//   const baseTags = ["archive", "creative-commons"];
//   let contentTags = [];
  
//   if (item.subject) {
//     const subjects = Array.isArray(item.subject) ? item.subject : [item.subject];
//     contentTags = subjects
//       .map(subj => subj.toString().toLowerCase())
//       .filter(subj => subj.length > 2 && subj.length < 20)
//       .slice(0, 3);
//   }
  
//   const content = `${item.title || ''} ${item.description || ''}`.toLowerCase();
  
//   if (content.includes('animation')) contentTags.push('animation');
//   if (content.includes('experimental')) contentTags.push('experimental');
//   if (content.includes('art')) contentTags.push('art');
//   if (content.includes('music')) contentTags.push('music');
  
//   if (contentTags.length === 0) {
//     contentTags.push('cinematic');
//   }
  
//   return [...new Set([...baseTags, ...contentTags])].slice(0, 5);
// }

// // Enhanced mock data with working URLs
// function getMockArchiveVideos() {
//   console.log('Using mock archive videos');
//   return [
//     {
//       $id: "BigBuckBunny",
//       title: "Big Buck Bunny",
//       description: "Open source animated short film about a bunny",
//       userId: "archive",
//       url: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//       tag: ["animation", "open-source", "short-film"],
//       creator: "Blender Foundation",
//       year: "2008",
//       downloads: 50000,
//       rating: 4.5
//     },
//     {
//       $id: "ElephantsDream",
//       title: "Elephants Dream",
//       description: "The world's first open movie",
//       userId: "archive",
//       url: "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",
//       tag: ["animation", "experimental", "open-source"],
//       creator: "Blender Foundation",
//       year: "2006",
//       downloads: 35000,
//       rating: 4.2
//     },
//     {
//       $id: "Sintel",
//       title: "Sintel",
//       description: "An epic tale of a girl searching for her baby dragon",
//       userId: "archive",
//       url: "https://archive.org/download/Sintel/sintel-2048-surround_512kb.mp4",
//       tag: ["animation", "fantasy", "open-source"],
//       creator: "Blender Foundation",
//       year: "2010",
//       downloads: 45000,
//       rating: 4.7
//     }
//   ];
// }

// // Optional: Direct Archive.org fetch (no proxy) - only works on some browsers
// export async function fetchArchiveVideosDirectly(page = 1, limit = 15) {
//   try {
//     const query = 'collection:opensource_movies';
//     const url = `https://archive.org/advancedsearch.php?q=${query}&fl=identifier,title,description&rows=${limit}&page=${page}&output=json`;
    
//     const response = await fetch(url);
    
//     if (!response.ok) {
//       throw new Error('Direct fetch failed');
//     }
    
//     const data = await response.json();
//     // Process similar to above...
    
//     return data.response.docs;
//   } catch (error) {
//     console.log('Direct fetch not available, using proxy method');
//     return fetchArchiveVideos(page, limit);
//   }
// }
// Enhanced CORS proxies with better reliability


// // Coverr API - Free stock videos without API key
// const COVER_API_BASE = 'https://api.coverr.co';

// // Helper for fetching with fallback (simplified for Coverr)
// async function fetchCoverrData(endpoint, options = {}) {
//   const url = `${COVER_API_BASE}${endpoint}`;
//   try {
//     const response = await fetch(url, {
//       ...options,
//       headers: { 'Accept': 'application/json' }
//     });
//     if (!response.ok) throw new Error(`HTTP ${response.status}`);
//     return await response.json();
//   } catch (error) {
//     console.error(`Coverr fetch error: ${error.message}`);
//     return null;
//   }
// }

// // Main function - Fetch creative stock videos from Coverr
// export async function fetchArchiveVideos(page = 1, limit = 10) {
//   try {
//     // Search terms for artistic/cinematic content
//     const creativeQueries = [
//       'art', 'cinematic', 'animation', 'abstract', 'creative',
//       'motion graphics', 'visual art', 'experimental', 'surreal',
//       'colorful', 'geometric', 'kinetic', 'typography', 'vibrant'
//     ];
//     const query = creativeQueries[(page - 1) % creativeQueries.length];

//     console.log(`Searching Coverr for: "${query}"`);

//     // Search videos
//     const searchEndpoint = `/search_videos_query_query?query=${encodeURIComponent(query)}`;
//     const searchData = await fetchCoverrData(searchEndpoint);

//     if (!searchData || !Array.isArray(searchData) || searchData.length === 0) {
//       console.warn('No videos found, fetching latest');
//       const latestEndpoint = `/videos?page=${page}&per_page=${limit}`;
//       const latestData = await fetchCoverrData(latestEndpoint);
//       return processCoverrVideos(latestData || [], limit);
//     }

//     // Process search results
//     const videos = await processCoverrVideos(searchData, limit);

//     console.log(`Returning ${videos.length} videos from Coverr`);
//     return videos.length > 0 ? videos : getFallbackCreativeVideos();

//   } catch (error) {
//     console.error("Coverr fetch error:", error);
//     return getFallbackCreativeVideos();
//   }
// }

// // Process Coverr video data - Fetch signed MP4 URLs
// async function processCoverrVideos(items, limit) {
//   const videos = [];
//   for (const item of items.slice(0, limit * 2)) {  // Fetch extra to filter
//     try {
//       // Get signed MP4 URL
//       const storageEndpoint = `/storage_videos_base_filename/${encodeURIComponent(item.base_filename)}`;
//       const signedRes = await fetchCoverrData(storageEndpoint);
      
//       if (!signedRes || !signedRes.signedUrl) continue;

//       // Validate artistic/creative (simple filter)
//       const titleLower = (item.title || '').toLowerCase();
//       const descLower = (item.description || '').toLowerCase();
      
//       // Skip non-creative
//       if (titleLower.includes('news') || descLower.includes('stock') || 
//           titleLower.includes('business') || descLower.includes('corporate')) continue;

//       videos.push({
//         $id: item.id,
//         title: item.title || "Creative Stock Video",
//         description: item.description || "High-quality creative footage",
//         userId: "coverr",
//         url: signedRes.signedUrl,  // Direct MP4 URL (15min expiry, but fine for preview)
//         tag: generateCreativeTags(item),
//         creator: item.contributor_name || "Coverr Artist",
//         year: new Date(item.added_at).getFullYear() || "Recent",
//         downloads: item.downloads || 0,
//         rating: 4.5,  // Default high rating for stock
//         duration: "short",  // Coverr videos are typically shorts
//         resolution: item.is_vertical ? "Vertical HD" : "HD",
//         mood: detectMood(item)
//       });

//       if (videos.length >= limit) break;
//     } catch (err) {
//       console.log(`Skipping Coverr item ${item.id}: ${err.message}`);
//     }
//   }
//   return videos;
// }

// // Generate tags for creative content
// function generateCreativeTags(item) {
//   const baseTags = ["stock", "creative", "hd"];
//   const content = `${item.title || ''} ${item.description || ''}`.toLowerCase();
  
//   let tags = [];
//   if (content.includes('art')) tags.push('artistic');
//   if (content.includes('color')) tags.push('colorful');
//   if (content.includes('motion')) tags.push('motion-graphics');
//   if (content.includes('abstract')) tags.push('abstract');
//   if (item.is_vertical) tags.push('vertical');
  
//   return [...new Set([...baseTags, ...tags])].slice(0, 5);
// }

// // Mood detection
// function detectMood(item) {
//   const content = `${item.title || ''} ${item.description || ''}`.toLowerCase();
//   if (content.includes('fun') || content.includes('happy')) return 'fun';
//   if (content.includes('calm') || content.includes('relax')) return 'calm';
//   if (content.includes('energy') || content.includes('dynamic')) return 'energetic';
//   return 'creative';
// }

// // Enhanced fallback with more variety (high-quality known sources)
// function getFallbackCreativeVideos() {
//   return [
//     // Blender Open Movies (high quality)
//     {
//       $id: "big-buck-bunny",
//       title: "Big Buck Bunny",
//       description: "Vibrant animated short with fun forest adventure",
//       userId: "blender",
//       url: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//       tag: ["animation", "fun", "colorful", "creative"],
//       creator: "Blender Foundation",
//       year: "2008",
//       downloads: 50000,
//       rating: 4.5,
//       duration: "8 min",
//       resolution: "HD",
//       mood: "fun"
//     },
//     {
//       $id: "sintel",
//       title: "Sintel",
//       description: "Epic animated tale of friendship and loss",
//       userId: "blender",
//       url: "https://archive.org/download/Sintel/sintel-2048-surround_512kb.mp4",
//       tag: ["animation", "epic", "artistic", "creative"],
//       creator: "Blender Foundation",
//       year: "2010",
//       downloads: 45000,
//       rating: 4.7,
//       duration: "14 min",
//       resolution: "Full HD",
//       mood: "amazement"
//     },
//     // Pexels-like stock (use direct links to free videos)
//     {
//       $id: "pexels-art-1",
//       title: "Abstract Color Waves",
//       description: "Dynamic colorful abstract motion graphics",
//       userId: "stock",
//       url: "https://player.vimeo.com/video/123456789?h=abcdef",  // Replace with actual free Vimeo/YouTube embed or direct
//       tag: ["abstract", "motion", "colorful", "creative"],
//       creator: "Stock Artist",
//       year: "2023",
//       downloads: 10000,
//       rating: 4.6,
//       duration: "0:30",
//       resolution: "HD",
//       mood: "energetic"
//     },
//     // Add more high-quality known shorts
//     {
//       $id: "tears-of-steel",
//       title: "Tears of Steel",
//       description: "Sci-fi short with stunning VFX and creative storytelling",
//       userId: "blender",
//       url: "https://archive.org/download/TearsOfSteel/TearsOfSteel.mp4",
//       tag: ["sci-fi", "vfx", "creative", "artistic"],
//       creator: "Blender Foundation",
//       year: "2012",
//       downloads: 75000,
//       rating: 4.8,
//       duration: "12 min",
//       resolution: "Full HD",
//       mood: "amazement"
//     }
//   ];
// }

// // Clean functions (same as before)
// function cleanTitle(title) {
//   if (!title) return "Creative Short Video";
//   return title.replace(/\.(mp4|avi|mov|wmv)$/i, '').replace(/[_-]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60);
// }

// function cleanDescription(desc) {
//   if (!desc) return "High-quality creative footage from stock libraries";
//   if (Array.isArray(desc)) desc = desc[0];
//   return desc.toString().replace(/<[^>]*>/g, '').replace(/https?:\/\/[^\s]+/g, '').replace(/\s+/g, ' ').trim().slice(0, 120);
// }



// Coverr API - Free stock videos without API key
const COVER_API_BASE = import.meta.env.VITE_COVERR_API_KEY;

// Helper for fetching with fallback (simplified for Coverr)
async function fetchCoverrData(endpoint, options = {}) {
  const url = `${COVER_API_BASE}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Coverr fetch error: ${error.message}`);
    return null;
  }
}

// Main function - Fetch creative stock videos from Coverr
export async function fetchArchiveVideos(page = 1, limit = 10) {
  try {
    // Search terms for artistic/cinematic content
    const creativeQueries = [
      'art', 'cinematic', 'animation', 'abstract', 'creative',
      'motion graphics', 'visual art', 'experimental', 'surreal',
      'colorful', 'geometric', 'kinetic', 'typography', 'vibrant'
    ];
    const query = creativeQueries[(page - 1) % creativeQueries.length];

    console.log(`Searching Coverr for: "${query}"`);

    // Search videos
    const searchEndpoint = `/search_videos_query_query?query=${encodeURIComponent(query)}`;
    const searchData = await fetchCoverrData(searchEndpoint);

    if (!searchData || !Array.isArray(searchData) || searchData.length === 0) {
      console.warn('No videos found, fetching latest');
      const latestEndpoint = `/videos?page=${page}&per_page=${limit}`;
      const latestData = await fetchCoverrData(latestEndpoint);
      return processCoverrVideos(latestData || [], limit);
    }

    // Process search results
    const videos = await processCoverrVideos(searchData, limit);

    console.log(`Returning ${videos.length} videos from Coverr`);
    return videos.length > 0 ? videos : getFallbackCreativeVideos();

  } catch (error) {
    console.error("Coverr fetch error:", error);
    return getFallbackCreativeVideos();
  }
}

// Process Coverr video data - Fetch signed MP4 URLs
async function processCoverrVideos(items, limit) {
  const videos = [];
  for (const item of items.slice(0, limit * 2)) {  // Fetch extra to filter
    try {
      // Get signed MP4 URL
      const storageEndpoint = `/storage_videos_base_filename/${encodeURIComponent(item.base_filename)}`;
      const signedRes = await fetchCoverrData(storageEndpoint);
      
      if (!signedRes || !signedRes.signedUrl) continue;

      // Validate artistic/creative (simple filter)
      const titleLower = (item.title || '').toLowerCase();
      const descLower = (item.description || '').toLowerCase();
      
      // Skip non-creative
      if (titleLower.includes('news') || descLower.includes('stock') || 
          titleLower.includes('business') || descLower.includes('corporate')) continue;

      videos.push({
        $id: item.id,
        title: item.title || "Creative Stock Video",
        description: item.description || "High-quality creative footage",
        userId: "coverr",
        url: signedRes.signedUrl,  // Direct MP4 URL (15min expiry, but fine for preview)
        tag: generateCreativeTags(item),
        creator: item.contributor_name || "Coverr Artist",
        year: new Date(item.added_at).getFullYear() || "Recent",
        downloads: item.downloads || 0,
        rating: 4.5,  // Default high rating for stock
        duration: "short",  // Coverr videos are typically shorts
        resolution: item.is_vertical ? "Vertical HD" : "HD",
        mood: detectMood(item)
      });

      if (videos.length >= limit) break;
    } catch (err) {
      console.log(`Skipping Coverr item ${item.id}: ${err.message}`);
    }
  }
  return videos;
}

// Generate tags for creative content
function generateCreativeTags(item) {
  const baseTags = ["stock", "creative", "hd"];
  const content = `${item.title || ''} ${item.description || ''}`.toLowerCase();
  
  let tags = [];
  if (content.includes('art')) tags.push('artistic');
  if (content.includes('color')) tags.push('colorful');
  if (content.includes('motion')) tags.push('motion-graphics');
  if (content.includes('abstract')) tags.push('abstract');
  if (item.is_vertical) tags.push('vertical');
  
  return [...new Set([...baseTags, ...tags])].slice(0, 5);
}

// Mood detection
function detectMood(item) {
  const content = `${item.title || ''} ${item.description || ''}`.toLowerCase();
  if (content.includes('fun') || content.includes('happy')) return 'fun';
  if (content.includes('calm') || content.includes('relax')) return 'calm';
  if (content.includes('energy') || content.includes('dynamic')) return 'energetic';
  return 'creative';
}

// Enhanced fallback with more variety (high-quality known sources)
function getFallbackCreativeVideos() {
  return [
    // Blender Open Movies (high quality)
    {
      $id: "big-buck-bunny",
      title: "Big Buck Bunny",
      description: "Vibrant animated short with fun forest adventure",
      userId: "blender",
      url: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
      tag: ["animation", "fun", "colorful", "creative"],
      creator: "Blender Foundation",
      year: "2008",
      downloads: 50000,
      rating: 4.5,
      duration: "8 min",
      resolution: "HD",
      mood: "fun"
    },
    {
      $id: "sintel",
      title: "Sintel",
      description: "Epic animated tale of friendship and loss",
      userId: "blender",
      url: "https://archive.org/download/Sintel/sintel-2048-surround_512kb.mp4",
      tag: ["animation", "epic", "artistic", "creative"],
      creator: "Blender Foundation",
      year: "2010",
      downloads: 45000,
      rating: 4.7,
      duration: "14 min",
      resolution: "Full HD",
      mood: "amazement"
    },
    // Pexels-like stock (use direct links to free videos)
    {
      $id: "pexels-art-1",
      title: "Abstract Color Waves",
      description: "Dynamic colorful abstract motion graphics",
      userId: "stock",
      url: "https://player.vimeo.com/video/123456789?h=abcdef",  // Replace with actual free Vimeo/YouTube embed or direct
      tag: ["abstract", "motion", "colorful", "creative"],
      creator: "Stock Artist",
      year: "2023",
      downloads: 10000,
      rating: 4.6,
      duration: "0:30",
      resolution: "HD",
      mood: "energetic"
    },
    // Add more high-quality known shorts
    {
      $id: "tears-of-steel",
      title: "Tears of Steel",
      description: "Sci-fi short with stunning VFX and creative storytelling",
      userId: "blender",
      url: "https://archive.org/download/TearsOfSteel/TearsOfSteel.mp4",
      tag: ["sci-fi", "vfx", "creative", "artistic"],
      creator: "Blender Foundation",
      year: "2012",
      downloads: 75000,
      rating: 4.8,
      duration: "12 min",
      resolution: "Full HD",
      mood: "amazement"
    }
  ];
}

// Clean functions (same as before)
function cleanTitle(title) {
  if (!title) return "Creative Short Video";
  return title.replace(/\.(mp4|avi|mov|wmv)$/i, '').replace(/[_-]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60);
}

function cleanDescription(desc) {
  if (!desc) return "High-quality creative footage from stock libraries";
  if (Array.isArray(desc)) desc = desc[0];
  return desc.toString().replace(/<[^>]*>/g, '').replace(/https?:\/\/[^\s]+/g, '').replace(/\s+/g, ' ').trim().slice(0, 120);
}