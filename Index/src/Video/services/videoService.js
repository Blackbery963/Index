// const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
// const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
// const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// // Cache for better performance
// const videoCache = new Map();
// const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// class VideoService {
//   constructor() {
//     this.categories = [
//       "digital art", "motion graphics", "creative coding", "visual effects",
//       "abstract animation", "3d art", "generative art", "kinetic typography",
//       "liquid animation", "particle effects", "minimal design", "color theory"
//     ];
//   }

//   async fetchVideos(page = 1) {
//     const cacheKey = `videos-page-${page}`;
//     const cached = videoCache.get(cacheKey);
    
//     if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
//       return cached.data;
//     }

//     try {
//       const [pexelsVideos, pixabayVideos, youtubeVideos] = await Promise.allSettled([
//         this.fetchPexelsVideos(page),
//         this.fetchPixabayVideos(page),
//         this.fetchYouTubeShorts(page)
//       ]);

//       const videos = [
//         ...(pexelsVideos.status === 'fulfilled' ? pexelsVideos.value : []),
//         ...(pixabayVideos.status === 'fulfilled' ? pixabayVideos.value : []),
//         ...(youtubeVideos.status === 'fulfilled' ? youtubeVideos.value : [])
//       ].sort(() => Math.random() - 0.5); // Shuffle for variety

//       videoCache.set(cacheKey, { data: videos, timestamp: Date.now() });
//       return videos;
//     } catch (error) {
//       console.error('Error fetching videos:', error);
//       return [];
//     }
//   }

//   async fetchPexelsVideos(page = 1) {
//     const category = this.categories[Math.floor(Math.random() * this.categories.length)];
//     const res = await fetch(
//       `https://api.pexels.com/videos/search?query=${encodeURIComponent(category)}&per_page=8&page=${page}`,
//       { headers: { Authorization: PEXELS_API_KEY } }
//     );

//     if (!res.ok) throw new Error("Pexels API error");
//     const data = await res.json();

//     return data.videos.map(v => ({
//       id: `pex-${v.id}`,
//       source: "artfeed",
//       platform: "pexels",
//       title: v.user?.name || "Creative Artist",
//       description: this.generateCreativeDescription(v.url),
//       thumbnail: v.image,
//       duration: v.duration,
//       bestQuality: { 
//         link: v.video_files.find(f => f.quality === "hd" && f.width >= 1280)?.link || v.video_files[0].link,
//         quality: "HD"
//       },
//       likes: Math.floor(Math.random() * 1000) + 100
//     }));
//   }

//   async fetchPixabayVideos(page = 1) {
//     const category = this.categories[Math.floor(Math.random() * this.categories.length)];
//     const res = await fetch(
//       `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(category)}&per_page=8&page=${page}`
//     );

//     if (!res.ok) throw new Error("Pixabay API error");
//     const data = await res.json();

//     return data.hits.map(v => ({
//       id: `pix-${v.id}`,
//       source: "artfeed",
//       platform: "pixabay",
//       title: v.user || "Digital Creator",
//       description: this.generateCreativeDescription(v.tags),
//       thumbnail: v.videos?.medium?.url || "",
//       duration: v.duration,
//       bestQuality: { 
//         link: v.videos?.large?.url || v.videos?.medium?.url,
//         quality: "HD"
//       },
//       likes: Math.floor(Math.random() * 800) + 50
//     }));
//   }

//   async fetchYouTubeShorts(page = 1) {
//     if (!YOUTUBE_API_KEY) return [];
    
//     const category = this.categories[Math.floor(Math.random() * this.categories.length)];
//     const url = new URL("https://www.googleapis.com/youtube/v3/search");
//     url.searchParams.set("part", "snippet");
//     url.searchParams.set("q", `${category} short`);
//     url.searchParams.set("type", "video");
//     url.searchParams.set("videoDuration", "short");
//     url.searchParams.set("maxResults", "6");
//     url.searchParams.set("key", YOUTUBE_API_KEY);

//     const res = await fetch(url);
//     if (!res.ok) throw new Error("YouTube API error");
//     const data = await res.json();

//     return data.items.map(item => ({
//       id: `yt-${item.id.videoId}`,
//       source: "artfeed",
//       platform: "youtube",
//       title: this.cleanTitle(item.snippet.title),
//       description: this.generateCreativeDescription(item.snippet.description),
//       thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
//       bestQuality: {
//         link: `https://www.youtube.com/embed/${item.id.videoId}?autoplay=1&mute=0&playsinline=1&controls=0&rel=0&modestbranding=1`,
//         quality: "HD"
//       },
//       likes: Math.floor(Math.random() * 5000) + 1000
//     }));
//   }

//   generateCreativeDescription(seed) {
//     const phrases = [
//       "Exploring the boundaries of digital creativity",
//       "Where art meets technology in motion",
//       "A symphony of colors and movements",
//       "Digital canvas comes to life",
//       "Pushing creative boundaries every day",
//       "Art in motion, creativity in flow",
//       "Visual poetry in digital form"
//     ];
//     return phrases[Math.floor(Math.random() * phrases.length)];
//   }

//   cleanTitle(title) {
//     return title.replace(/[^\w\s]|short|video|hd|4k/gi, '').trim() || "Creative Visuals";
//   }
// }

// export const videoService = new VideoService();


const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

// Cache for better performance
const videoCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

class VideoService {
  constructor() {
    this.categories = [
      "animation", "motion graphics", "digital art", "visual effects",
      "abstract", "generative art", "kinetic typography", "liquid motion",
      "particle", "3d animation", "minimal", "cyberpunk", "futuristic",
      "geometric", "fluid", "light", "creative coding", "mathematical art"
    ];
  }

  async fetchVideos(page = 1) {
    const cacheKey = `videos-page-${page}`;
    const cached = videoCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      // Internet Archive as PRIMARY source
      const [archiveVideos, pixabayVideos, coverrVideos] = await Promise.allSettled([
        this.fetchInternetArchiveVideos(page),
        this.fetchPixabayVideosWithSound(page),
        this.fetchCoverrVideos(page)
      ]);

      let videos = [
        ...(archiveVideos.status === 'fulfilled' ? archiveVideos.value : []),
        ...(pixabayVideos.status === 'fulfilled' ? pixabayVideos.value : []),
        ...(coverrVideos.status === 'fulfilled' ? coverrVideos.value : [])
      ];

      // Filter to ensure videos have sound and are short
      videos = videos.filter(video => 
        video.hasSound && 
        video.bestQuality?.link &&
        video.duration <= 60
      );

      // Prioritize Internet Archive videos, then shuffle the rest
      const archiveVids = videos.filter(v => v.platform === "internetarchive");
      const otherVids = videos.filter(v => v.platform !== "internetarchive").sort(() => Math.random() - 0.5);
      
      videos = [...archiveVids, ...otherVids];

      videoCache.set(cacheKey, { data: videos, timestamp: Date.now() });
      return videos;
    } catch (error) {
      console.error('Error fetching videos:', error);
      return this.getHardcodedFallbackVideos();
    }
  }

  // 🎯 PRIMARY SOURCE: Internet Archive - Public Domain & Creative Commons
  async fetchInternetArchiveVideos(page = 1) {
    const category = this.categories[Math.floor(Math.random() * this.categories.length)];
    
    try {
      // Search for creative/artistic short videos in Internet Archive
      const searchQuery = this.buildArchiveQuery(category);
      const response = await fetch(
        `https://archive.org/advancedsearch.php?` +
        `q=${searchQuery}` +
        `&fl[]=identifier,title,description,subject,licenseurl` +
        `&sort[]=downloads+desc` +
        `&rows=15` +
        `&page=${page}` +
        `&output=json`
      );

      if (!response.ok) return [];
      const data = await response.json();

      if (!data.response || !data.response.docs) return [];

      // Process videos in parallel
      const videos = await Promise.all(
        data.response.docs.slice(0, 12).map(async doc => {
          try {
            const videoDetails = await this.getArchiveVideoDetails(doc.identifier);
            if (!videoDetails.playable) return null;

            return {
              id: `ia-${doc.identifier}`,
              source: "artfeed",
              platform: "internetarchive",
              title: this.cleanTitle(doc.title?.[0] || "Creative Animation"),
              description: doc.description?.[0] || this.generateCreativeDescription(),
              thumbnail: `https://archive.org/download/${doc.identifier}/__ia_thumb.jpg`,
              duration: videoDetails.duration || 20,
              hasSound: videoDetails.hasSound,
              bestQuality: {
                link: `https://archive.org/download/${doc.identifier}/format=MPEG4`,
                quality: "HD"
              },
              likes: Math.floor(Math.random() * 3000) + 1000,
              license: this.getArchiveLicense(doc.licenseurl),
              tags: doc.subject || [category],
              views: Math.floor(Math.random() * 10000) + 5000
            };
          } catch {
            return null;
          }
        })
      );

      return videos.filter(v => v !== null);
    } catch (error) {
      console.warn('Internet Archive fetch failed:', error);
      return [];
    }
  }

  // Build optimized search query for Internet Archive
  buildArchiveQuery(category) {
    const creativeCollections = [
      "animation_music_graphics", "computerartsociety", "prelinger",
      "avgears", "creativecommons", "motion_graphics", "digital_art"
    ];
    
    const collection = creativeCollections[Math.floor(Math.random() * creativeCollections.length)];
    
    return encodeURIComponent(
      `collection:(${collection}) AND ` +
      `(${category} OR "motion graphics" OR "digital art" OR animation) AND ` +
      `mediatype:(movies) AND ` +
      `format:(MPEG4 OR h.264) AND ` +
      `-collection:(etree) AND ` + // exclude live music
      `-subject:(concert) AND ` +
      `-title:("live" concert)`
    );
  }

  // Get detailed video info from Internet Archive
  async getArchiveVideoDetails(identifier) {
    try {
      const response = await fetch(`https://archive.org/metadata/${identifier}`);
      if (!response.ok) return { playable: false };
      
      const data = await response.json();
      
      // Check if video has MP4 files
      const mp4Files = data.files?.filter(file => 
        file.format?.includes('MPEG4') || 
        file.format?.includes('h.264') ||
        file.name?.endsWith('.mp4')
      ) || [];

      const duration = this.parseDuration(data.metadata?.duration);
      
      return {
        playable: mp4Files.length > 0,
        duration: duration,
        hasSound: true, // Most archive videos have audio
        files: mp4Files
      };
    } catch {
      return { playable: false };
    }
  }

  parseDuration(durationStr) {
    if (!durationStr) return 20;
    // Parse "HH:MM:SS" or "MM:SS" format
    const parts = durationStr.split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[2];
    return 20;
  }

  getArchiveLicense(licenseUrl) {
    if (!licenseUrl) return "Public Domain";
    if (licenseUrl.includes('creativecommons.org')) return "Creative Commons";
    if (licenseUrl.includes('publicdomain')) return "Public Domain";
    return "Free License";
  }

  // SECONDARY: Pixabay fallback
  async fetchPixabayVideosWithSound(page = 1) {
    const category = this.categories[Math.floor(Math.random() * this.categories.length)];
    
    try {
      if (!PIXABAY_API_KEY) return [];

      const res = await fetch(
        `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(category)}&per_page=8&page=${page}&video_type=film&min_width=1280`
      );

      if (!res.ok) return [];
      const data = await res.json();

      return data.hits.map(v => ({
        id: `pix-${v.id}`,
        source: "artfeed",
        platform: "pixabay",
        title: v.user || "Digital Creator",
        description: this.generateCreativeDescription(v.tags),
        thumbnail: v.videos?.medium?.url || "",
        duration: v.duration,
        hasSound: true,
        bestQuality: { 
          link: v.videos?.large?.url || v.videos?.medium?.url,
          quality: "HD"
        },
        likes: v.likes || Math.floor(Math.random() * 800) + 50,
        tags: v.tags ? v.tags.split(', ') : [],
        license: "Pixabay License"
      }));
    } catch (error) {
      console.warn('Pixabay API failed:', error);
      return [];
    }
  }

  // TERTIARY: Coverr fallback
  async fetchCoverrVideos(page = 1) {
    const categories = ['abstract', 'art', 'technology', 'creative'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    try {
      const res = await fetch(
        `https://api.coverr.co/videos?query=${category}&page=${page}&page_size=6`
      );

      if (!res.ok) return [];
      const data = await res.json();

      return data.videos.map(v => ({
        id: `cov-${v.id}`,
        source: "artfeed",
        platform: "coverr",
        title: v.title || "Creative Visuals",
        description: this.generateCreativeDescription(v.description),
        thumbnail: v.thumbnail,
        duration: v.duration,
        hasSound: v.has_sound || false,
        bestQuality: {
          link: v.assets?.mp4 || v.url,
          quality: "HD"
        },
        likes: Math.floor(Math.random() * 1000) + 200,
        tags: v.tags || [],
        license: "Coverr Free License"
      }));
    } catch (error) {
      console.warn('Coverr API failed:', error);
      return [];
    }
  }

  // Search with Internet Archive as primary
  async searchVideos(query, page = 1) {
    try {
      const [archiveResults, pixabayResults, coverrResults] = await Promise.allSettled([
        this.searchInternetArchive(query, page),
        this.searchPixabayVideos(query, page),
        this.searchCoverrVideos(query, page)
      ]);

      let videos = [
        ...(archiveResults.status === 'fulfilled' ? archiveResults.value : []),
        ...(pixabayResults.status === 'fulfilled' ? pixabayResults.value : []),
        ...(coverrResults.status === 'fulfilled' ? coverrResults.value : [])
      ];

      // Prioritize Internet Archive results
      const archiveVids = videos.filter(v => v.platform === "internetarchive");
      const otherVids = videos.filter(v => v.platform !== "internetarchive")
                            .filter(v => v.hasSound)
                            .sort(() => Math.random() - 0.5);
      
      return [...archiveVids, ...otherVids];
    } catch (error) {
      console.error('Error searching videos:', error);
      return this.getHardcodedFallbackVideos();
    }
  }

  async searchInternetArchive(query, page = 1) {
    try {
      const searchQuery = encodeURIComponent(
        `(${query} OR "motion graphics" OR animation) AND ` +
        `mediatype:(movies) AND ` +
        `format:(MPEG4) AND ` +
        `-collection:(etree)`
      );

      const response = await fetch(
        `https://archive.org/advancedsearch.php?` +
        `q=${searchQuery}` +
        `&fl[]=identifier,title,description,subject` +
        `&sort[]=downloads+desc` +
        `&rows=12` +
        `&page=${page}` +
        `&output=json`
      );

      if (!response.ok) return [];
      const data = await response.json();

      if (!data.response?.docs) return [];

      return await Promise.all(
        data.response.docs.map(async doc => {
          const videoDetails = await this.getArchiveVideoDetails(doc.identifier);
          if (!videoDetails.playable) return null;

          return {
            id: `ia-${doc.identifier}`,
            source: "artfeed",
            platform: "internetarchive",
            title: this.cleanTitle(doc.title?.[0] || query),
            description: doc.description?.[0] || `Creative ${query} animation`,
            thumbnail: `https://archive.org/download/${doc.identifier}/__ia_thumb.jpg`,
            duration: videoDetails.duration || 20,
            hasSound: true,
            bestQuality: {
              link: `https://archive.org/download/${doc.identifier}/format=MPEG4`,
              quality: "HD"
            },
            likes: Math.floor(Math.random() * 3000) + 1000,
            license: "Public Domain/CC0",
            tags: doc.subject || [query]
          };
        })
      ).then(results => results.filter(v => v !== null));
    } catch {
      return [];
    }
  }

  async searchPixabayVideos(query, page = 1) {
    try {
      if (!PIXABAY_API_KEY) return [];

      const res = await fetch(
        `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&per_page=6&page=${page}&video_type=film`
      );

      if (!res.ok) return [];
      const data = await res.json();

      return data.hits.map(v => ({
        id: `pix-${v.id}`,
        source: "artfeed",
        platform: "pixabay",
        title: v.user || "Digital Creator",
        description: this.generateCreativeDescription(v.tags),
        thumbnail: v.videos?.medium?.url || "",
        duration: v.duration,
        hasSound: true,
        bestQuality: { 
          link: v.videos?.large?.url || v.videos?.medium?.url,
          quality: "HD"
        },
        likes: v.likes || Math.floor(Math.random() * 800) + 50,
        license: "Pixabay License"
      }));
    } catch {
      return [];
    }
  }

  async searchCoverrVideos(query, page = 1) {
    try {
      const res = await fetch(
        `https://api.coverr.co/videos?query=${encodeURIComponent(query)}&page=${page}&page_size=4`
      );

      if (!res.ok) return [];
      const data = await res.json();

      return data.videos.map(v => ({
        id: `cov-${v.id}`,
        source: "artfeed",
        platform: "coverr",
        title: v.title || "Creative Visuals",
        description: this.generateCreativeDescription(v.description),
        thumbnail: v.thumbnail,
        duration: v.duration,
        hasSound: v.has_sound || false,
        bestQuality: {
          link: v.assets?.mp4 || v.url,
          quality: "HD"
        },
        likes: Math.floor(Math.random() * 1000) + 200,
        license: "Coverr Free License"
      }));
    } catch {
      return [];
    }
  }

  cleanTitle(title) {
    return title.replace(/[^\w\s\-()]/gi, '').trim() || "Creative Visuals";
  }

  generateCreativeDescription() {
    const phrases = [
      "Exploring digital creativity through motion and sound",
      "Where art meets technology in harmonious motion",
      "Visual poetry in digital form with immersive audio",
      "Creative coding and algorithms brought to life",
      "Abstract expressions in motion with atmospheric sound",
      "Digital canvas animated with artistic precision"
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  getHardcodedFallbackVideos() {
    return [
      {
        id: "fallback-1",
        source: "artfeed",
        platform: "internetarchive",
        title: "Abstract Digital Art",
        description: "Creative coding and visual algorithms",
        thumbnail: "https://archive.org/download/prelinger_news_256/prelinger_news_256.thumbs/prelinger_news_256_000372.jpg",
        duration: 20,
        hasSound: true,
        bestQuality: {
          link: "https://ia804502.us.archive.org/10/items/prelinger_news_256/prelinger_news_256.mp4",
          quality: "HD"
        },
        likes: 2500,
        license: "Public Domain",
        tags: ["abstract", "digital", "art"]
      }
    ];
  }
}

export const videoService = new VideoService();