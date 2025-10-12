const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Cache for better performance
const videoCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class VideoService {
  constructor() {
    this.categories = [
      "digital art", "motion graphics", "creative coding", "visual effects",
      "abstract animation", "3d art", "generative art", "kinetic typography",
      "liquid animation", "particle effects", "minimal design", "color theory"
    ];
  }

  async fetchVideos(page = 1) {
    const cacheKey = `videos-page-${page}`;
    const cached = videoCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      const [pexelsVideos, pixabayVideos, youtubeVideos] = await Promise.allSettled([
        this.fetchPexelsVideos(page),
        this.fetchPixabayVideos(page),
        this.fetchYouTubeShorts(page)
      ]);

      const videos = [
        ...(pexelsVideos.status === 'fulfilled' ? pexelsVideos.value : []),
        ...(pixabayVideos.status === 'fulfilled' ? pixabayVideos.value : []),
        ...(youtubeVideos.status === 'fulfilled' ? youtubeVideos.value : [])
      ].sort(() => Math.random() - 0.5); // Shuffle for variety

      videoCache.set(cacheKey, { data: videos, timestamp: Date.now() });
      return videos;
    } catch (error) {
      console.error('Error fetching videos:', error);
      return [];
    }
  }

  async fetchPexelsVideos(page = 1) {
    const category = this.categories[Math.floor(Math.random() * this.categories.length)];
    const res = await fetch(
      `https://api.pexels.com/videos/search?query=${encodeURIComponent(category)}&per_page=8&page=${page}`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );

    if (!res.ok) throw new Error("Pexels API error");
    const data = await res.json();

    return data.videos.map(v => ({
      id: `pex-${v.id}`,
      source: "artfeed",
      platform: "pexels",
      title: v.user?.name || "Creative Artist",
      description: this.generateCreativeDescription(v.url),
      thumbnail: v.image,
      duration: v.duration,
      bestQuality: { 
        link: v.video_files.find(f => f.quality === "hd" && f.width >= 1280)?.link || v.video_files[0].link,
        quality: "HD"
      },
      likes: Math.floor(Math.random() * 1000) + 100
    }));
  }

  async fetchPixabayVideos(page = 1) {
    const category = this.categories[Math.floor(Math.random() * this.categories.length)];
    const res = await fetch(
      `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(category)}&per_page=8&page=${page}`
    );

    if (!res.ok) throw new Error("Pixabay API error");
    const data = await res.json();

    return data.hits.map(v => ({
      id: `pix-${v.id}`,
      source: "artfeed",
      platform: "pixabay",
      title: v.user || "Digital Creator",
      description: this.generateCreativeDescription(v.tags),
      thumbnail: v.videos?.medium?.url || "",
      duration: v.duration,
      bestQuality: { 
        link: v.videos?.large?.url || v.videos?.medium?.url,
        quality: "HD"
      },
      likes: Math.floor(Math.random() * 800) + 50
    }));
  }

  async fetchYouTubeShorts(page = 1) {
    if (!YOUTUBE_API_KEY) return [];
    
    const category = this.categories[Math.floor(Math.random() * this.categories.length)];
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("q", `${category} short`);
    url.searchParams.set("type", "video");
    url.searchParams.set("videoDuration", "short");
    url.searchParams.set("maxResults", "6");
    url.searchParams.set("key", YOUTUBE_API_KEY);

    const res = await fetch(url);
    if (!res.ok) throw new Error("YouTube API error");
    const data = await res.json();

    return data.items.map(item => ({
      id: `yt-${item.id.videoId}`,
      source: "artfeed",
      platform: "youtube",
      title: this.cleanTitle(item.snippet.title),
      description: this.generateCreativeDescription(item.snippet.description),
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      bestQuality: {
        link: `https://www.youtube.com/embed/${item.id.videoId}?autoplay=1&mute=0&playsinline=1&controls=0&rel=0&modestbranding=1`,
        quality: "HD"
      },
      likes: Math.floor(Math.random() * 5000) + 1000
    }));
  }

  generateCreativeDescription(seed) {
    const phrases = [
      "Exploring the boundaries of digital creativity",
      "Where art meets technology in motion",
      "A symphony of colors and movements",
      "Digital canvas comes to life",
      "Pushing creative boundaries every day",
      "Art in motion, creativity in flow",
      "Visual poetry in digital form"
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  cleanTitle(title) {
    return title.replace(/[^\w\s]|short|video|hd|4k/gi, '').trim() || "Creative Visuals";
  }
}

export const videoService = new VideoService();