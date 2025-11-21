// pexels.js
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const fetchPexelsImage = async (query, orientation = 'landscape') => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=${orientation}&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Pexels');
    }

    const data = await response.json();
    return data.photos[1]?.src.large2x || data.photos[0]?.src.large || null;
  } catch (error) {
    console.error('Error fetching Pexels image:', error);
    return null;
  }
};