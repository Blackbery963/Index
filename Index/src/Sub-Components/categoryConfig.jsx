import { useState, useEffect } from 'react';
import { fetchPexelsImage } from './pexels';

export const CATEGORY_CONFIG = {
  abstract: {
    title: "Abstract Gallery",
    medium: "Abstract",
    description: "Where colors speak and forms feel",
    gradient: "from-gray-800 via-purple-600 to-blue-600",
    darkGradient: "from-white via-purple-400 to-blue-400",
    pexelsQuery: "abstract art colorful painting texture",
    accentColor: "purple"
  },
  portrait: {
    title: "Portrait Gallery",
    medium: "Portrait",
    description: "Capturing the essence of humanity",
    gradient: "from-gray-800 via-red-600 to-orange-600",
    darkGradient: "from-white via-red-400 to-orange-400",
    pexelsQuery: "portrait painting classical art face",
    accentColor: "red"
  },
  landscape: {
    title: "Landscape Gallery",
    medium: "Landscape",
    description: "Nature's masterpiece unveiled",
    gradient: "from-gray-800 via-green-600 to-teal-600",
    darkGradient: "from-white via-green-400 to-teal-400",
    pexelsQuery: "landscape painting nature scenery mountains",
    accentColor: "green"
  },
  watercolour: {
    title: "Watercolour Gallery",
    medium: "Watercolour",
    description: "Fluid colors and transparent beauty",
    gradient: "from-gray-800 via-blue-600 to-cyan-600",
    darkGradient: "from-white via-blue-400 to-cyan-400",
    pexelsQuery: "watercolor painting fluid art transparent",
    accentColor: "blue"
  },
  oilpainting: {
    title: "Oil Painting Gallery",
    medium: "Oil Painting",
    description: "Rich textures and timeless elegance",
    gradient: "from-gray-800 via-amber-600 to-yellow-600",
    darkGradient: "from-white via-amber-400 to-yellow-400",
    pexelsQuery: "oil painting classical art texture",
    accentColor: "amber"
  },
  stilllife: {
    title: "Still Life Gallery",
    medium: "StillLife",
    description: "Beauty in the ordinary and arranged",
    gradient: "from-gray-800 via-stone-600 to-neutral-600",
    darkGradient: "from-white via-stone-400 to-neutral-400",
    pexelsQuery: "still life painting fruits flowers arrangement",
    accentColor: "stone"
  },
  historical: {
    title: "Historical Art Gallery",
    medium: "Historical",
    description: "Echoes of the past through artistic vision",
    gradient: "from-gray-800 via-brown-600 to-amber-600",
    darkGradient: "from-white via-brown-400 to-amber-400",
    pexelsQuery: "historical painting ancient art classical",
    accentColor: "brown"
  },
  surrealism: {
    title: "Surrealism Gallery",
    medium: "Surrealism",
    description: "Where dreams and reality converge",
    gradient: "from-gray-800 via-pink-600 to-purple-600",
    darkGradient: "from-white via-pink-400 to-purple-400",
    pexelsQuery: "surrealism art dreamlike fantasy",
    accentColor: "pink"
  },
  impressionism: {
    title: "Impressionism Gallery",
    medium: "Impressionism",
    description: "Fleeting moments captured in light and color",
    gradient: "from-gray-800 via-sky-600 to-blue-600",
    darkGradient: "from-white via-sky-400 to-blue-400",
    pexelsQuery: "impressionism painting light brushstrokes",
    accentColor: "sky"
  },
  realism: {
    title: "Realism Gallery",
    medium: "Realism",
    description: "Truth and accuracy in every detail",
    gradient: "from-gray-800 via-gray-600 to-slate-600",
    darkGradient: "from-white via-gray-400 to-slate-400",
    pexelsQuery: "realism painting detailed art precise",
    accentColor: "gray"
  },
  expressionism: {
    title: "Expressionism Gallery",
    medium: "Expressionism",
    description: "Emotions unleashed through bold forms",
    gradient: "from-gray-800 via-orange-600 to-red-600",
    darkGradient: "from-white via-orange-400 to-red-400",
    pexelsQuery: "expressionism art emotional dramatic",
    accentColor: "orange"
  },
  minimalism: {
    title: "Minimalism Gallery",
    medium: "Minimalism",
    description: "Essence revealed through simplicity",
    gradient: "from-gray-800 via-slate-600 to-gray-600",
    darkGradient: "from-white via-slate-400 to-gray-400",
    pexelsQuery: "minimalism art simple geometric clean",
    accentColor: "slate"
  },
  popart: {
    title: "Pop Art Gallery",
    medium: "PopArt",
    description: "Bold statements from popular culture",
    gradient: "from-gray-800 via-fuchsia-600 to-pink-600",
    darkGradient: "from-white via-fuchsia-400 to-pink-400",
    pexelsQuery: "pop art colorful comic bold",
    accentColor: "fuchsia"
  },
  nature: {
    title: "Nature Art Gallery",
    medium: "Nature",
    description: "Celebrating the beauty of the natural world",
    gradient: "from-gray-800 via-emerald-600 to-green-600",
    darkGradient: "from-white via-emerald-400 to-green-400",
    pexelsQuery: "nature art wildlife plants organic",
    accentColor: "emerald"
  },
  traditional: {
    title: "Traditional Art Gallery",
    medium: "Traditional",
    description: "Honoring heritage and classical techniques",
    gradient: "from-gray-800 via-violet-600 to-purple-600",
    darkGradient: "from-white via-violet-400 to-purple-400",
    pexelsQuery: "traditional art cultural heritage folk",
    accentColor: "violet"
  },
  digital: {
    title: "Digital Art Gallery",
    medium: "Digital",
    description: "Where technology meets creativity",
    gradient: "from-gray-800 via-cyan-600 to-blue-600",
    darkGradient: "from-white via-cyan-400 to-blue-400",
    pexelsQuery: "digital art cyber technology futuristic",
    accentColor: "cyan"
  },
  modern: {
    title: "Modern Art Gallery",
    medium: "Modern",
    description: "Breaking boundaries with contemporary vision",
    gradient: "from-gray-800 via-indigo-600 to-purple-600",
    darkGradient: "from-white via-indigo-400 to-purple-400",
    pexelsQuery: "modern art contemporary innovative",
    accentColor: "indigo"
  },
  photography: {
    title: "Photography Gallery",
    medium: "Photography",
    description: "Moments frozen in time through light",
    gradient: "from-gray-800 via-zinc-600 to-gray-600",
    darkGradient: "from-white via-zinc-400 to-gray-400",
    pexelsQuery: "photography art black white cinematic",
    accentColor: "zinc"
  }
};


// Helper function to get complementary colors
export const getComplementaryColor = (color) => {
  const colorMap = {
    purple: 'blue',
    blue: 'purple', 
    red: 'orange',
    orange: 'red',
    green: 'teal',
    teal: 'green',
    amber: 'yellow',
    yellow: 'amber',
    stone: 'neutral',
    neutral: 'stone',
    brown: 'amber',
    pink: 'purple',
    sky: 'blue',
    gray: 'slate',
    slate: 'gray',
    fuchsia: 'pink',
    emerald: 'green',
    violet: 'purple',
    cyan: 'blue',
    indigo: 'purple',
    zinc: 'gray'
  };
  return colorMap[color] || 'blue';
};

// // Hook to fetch background images from Pexels
// export const useCategoryBackgrounds = () => {
//   const [backgrounds, setBackgrounds] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBackgrounds = async () => {
//       try {
//         const cached = localStorage.getItem('categoryBackgrounds');
//         if (cached) {
//           setBackgrounds(JSON.parse(cached));
//           setLoading(false);
//           return;
//         }

//         const backgroundPromises = Object.entries(CATEGORY_CONFIG).map(
//           async ([key, config]) => {
//             try {
//               const imageUrl = await fetchPexelsImage(config.pexelsQuery);
//               return [key, imageUrl || '/fallback-background.jpg'];
//             } catch (error) {
//               console.error(`Failed to fetch background for ${key}:`, error);
//               return [key, '/fallback-background.jpg'];
//             }
//           }
//         );

//         const results = await Promise.all(backgroundPromises);
//         const backgroundMap = Object.fromEntries(results);
        
//         localStorage.setItem('categoryBackgrounds', JSON.stringify(backgroundMap));
//         setBackgrounds(backgroundMap);
//       } catch (error) {
//         console.error('Error fetching category backgrounds:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBackgrounds();
//   }, []);

//   return { backgrounds, loading };
// };

export const useCategoryBackgrounds = () => {
  const [backgrounds, setBackgrounds] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      // 1. Try cache first
      const cached = localStorage.getItem('categoryBg_v3');
      if (cached) {
        try {
          setBackgrounds(JSON.parse(cached));
          setLoading(false);
          return;
        } catch {}
      }

      // 2. Fetch all backgrounds
      const results = {};

      for (const [key, cfg] of Object.entries(CATEGORY_CONFIG)) {
        let url = await fetchPexelsImage(cfg.pexelsQuery);

        // If Pexels fails, use a beautiful Unsplash fallback (always works)
        if (!url) {
          const unsplashQueries = {
            abstract: 'abstract painting texture colorful',
            portrait: 'classical portrait painting',
            landscape: 'epic landscape painting',
            watercolor: 'watercolor art soft',
            oilpainting: 'oil painting texture rich',
            stilllife: 'still life painting fruits',
            digital: 'digital art futuristic neon',
            surrealism: 'surreal dreamlike art',
            // add more if needed
          };

          url = `https://source.unsplash.com/featured/1600x900?${encodeURIComponent(unsplashQueries[key] || cfg.pexelsQuery)}`;
        }

        results[key] = url;
      }

      // 3. Save to cache and state
      localStorage.setItem('categoryBg_v3', JSON.stringify(results));
      setBackgrounds(results);
      setLoading(false);
    };

    load();
  }, []);

  return { backgrounds, loading };
};