import axios from "axios";

const API_URL = "https://api.pexels.com/v1/search";
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const fetchPexelsImage = async (query, perPage = 10) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: API_KEY },
      params: { query, per_page: perPage, orientation: "landscape" },
    });

    const photos = response.data.photos;
    if (photos.length === 0) return null;

    // Randomly pick one photo to reduce repetition
    const randomIndex = Math.floor(Math.random() * photos.length);
    return photos[randomIndex].src.landscape;
  } catch (error) {
    console.error("Pexels fetch error:", error);
    return null;
  }
};
