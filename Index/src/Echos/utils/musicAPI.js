// src/utils/musicAPI.js
const FREESOUND_API_KEY = import.meta.env.VITE_FREESOUND_API_KEY; // Get from https://freesound.org/apiv2/apply/

export const searchFreesoundMusic = async (query = "ambient", page = 1) => {
  try {
    const response = await fetch(
      `https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(query)}&filter=duration:[10 TO 60]&fields=id,name,url,previews,username,images,duration&page_size=20&page=${page}&token=${FREESOUND_API_KEY}`
    );
    
    if (!response.ok) throw new Error('Freesound API error');
    
    const data = await response.json();
    
    return data.results.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.username,
      preview: track.previews['preview-hq-mp3'], // High quality preview
      duration: track.duration,
      album: { 
        cover_medium: track.images?.waveform_m || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=250&h=250&fit=crop" 
      }
    }));
  } catch (error) {
    console.error('Freesound API error:', error);
    return getFallbackTracks(query);
  }
};