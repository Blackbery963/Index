// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Masonry from 'react-masonry-css'

// const featuredImages1 = [
//   { src: '/Image-of-Collection/abstract.jpg', title: 'Abstract Vision', category: 'abstract', featured: true },
//   { src: '/Image-of-Collection/pexels-eberhardgross-1367192.jpg', title: 'Mountain Majesty', category: 'landscape', featured: false },
//   { src: '/Image-of-Collection/pexels-philippedonn-1133957.jpg', title: 'Forest Serenity', category: 'nature', featured: true },
//   { src: '/Image-of-Collection/pexels-pixabay-147411.jpg', title: 'Urban Geometry', category: 'architecture', featured: false },
//   { src: '/Image-of-Collection/pexels-rafael-guajardo-194140-604684.jpg', title: 'Street Stories', category: 'street', featured: true },
//   { src: '/Image-of-Collection/blossoms.jpg', title: 'Floral Dreams', category: 'nature', featured: false },
//   { src: '/Image-of-Collection/digital.jpg', title: 'Digital Art', category: 'digital', featured: true },
//   { src: '/Image-of-Collection/dream.jpg', title: 'Surreal Moment', category: 'conceptual', featured: false },
//   { src: '/Image-of-Collection/pexels-dax-dexter-delada-2150239947-31090348.jpg', title: 'Lonely Road', category: 'travel', featured: true },
//   { src: '/Image-of-Collection/pexels-shaosong-sun-503031340-16100671.jpg', title: 'Golden Hour', category: 'landscape', featured: false },
// ];

// const featuredImages2 = [
//   { src: 'https://cdn.pixabay.com/photo/2022/10/24/09/31/flower-7543035_960_720.jpg', title: 'Abstract Vision', category: 'abstract', featured: true },
//   { src: 'https://cdn.pixabay.com/photo/2025/01/29/11/09/lantern-9367692_1280.jpg', title: 'Mountain Majesty', category: 'landscape', featured: false },
//   { src: 'https://cdn.pixabay.com/photo/2021/11/26/20/45/lantern-6826698_960_720.jpg', title: 'Forest Serenity', category: 'nature', featured: true },
//   { src: 'https://cdn.pixabay.com/photo/2022/10/07/11/02/autumn-7504820_960_720.jpg', title: 'Urban Geometry', category: 'architecture', featured: false },
//   { src: 'https://cdn.pixabay.com/photo/2024/12/26/21/04/firenze-9292733_960_720.jpg', title: 'Street Stories', category: 'street', featured: true },
//   { src: 'https://cdn.pixabay.com/photo/2023/11/25/12/18/sea-8411640_960_720.jpg', title: 'Floral Dreams', category: 'nature', featured: false },
//   { src: 'https://cdn.pixabay.com/photo/2025/06/11/17/18/red-gana-top-9654874_1280.jpg', title: 'Digital Art', category: 'digital', featured: true },
//   { src: 'https://cdn.pixabay.com/photo/2024/01/25/12/30/mountain-8531778_1280.jpg', title: 'Surreal Moment', category: 'conceptual', featured: false },
//   { src: 'https://cdn.pixabay.com/photo/2025/05/31/20/23/trees-9634157_1280.jpg', title: 'Lonely Road', category: 'travel', featured: true },
//   { src: 'https://cdn.pixabay.com/photo/2022/09/08/02/55/pahan-7439926_1280.jpg', title: 'Golden Hour', category: 'landscape', featured: false },
// ]

// const features = [
//   {
//     title: 'Curated Collections',
//     description: 'Dive into thoughtfully assembled collections that highlight the best works across genres and styles. Our curators work tirelessly to bring you exceptional artworks from around the globe.',
//     image: '/Image-of-Collection/abstract.jpg',
//     color: 'bg-red-100 dark:bg-red-900/30'
//   },
//   {
//     title: 'Artist Discovery',
//     description: 'Uncover hidden gems and emerging talents. Painters\' Diary bridges the gap between creators and admirers, giving artists the platform they deserve and art lovers direct access to new inspiration.',
//     image: '/Image-of-Collection/pexels-pixabay-147411.jpg',
//     color: 'bg-blue-100 dark:bg-blue-900/30'
//   },
//   {
//     title: 'Creative Inspiration',
//     description: 'Fuel your imagination with artworks that spark new ideas and emotions. Whether you\'re an artist seeking inspiration or an enthusiast looking to expand your horizons, our collections will move you.',
//     image: '/Image-of-Collection/blossoms.jpg',
//     color: 'bg-green-100 dark:bg-green-900/30'
//   }
// ];




// const Collection = () => {
//   const [activeFeature, setActiveFeature] = useState(features[0]);
//   const [hoveredImage, setHoveredImage] = useState(null);

//   const breakpointColumnsObj = {
//   default: 3,
//   1024: 2,
//   640: 1,
// };


// const batches = [featuredImages1, featuredImages2]

//   const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
//   const [images, setImages] = useState(batches[0]);

//   const handleLoadMore = () => {
//     const nextIndex = currentBatchIndex + 1;
//     if (nextIndex < batches.length) {
//       setImages(prev => [...prev, ...batches[nextIndex]]);
//       setCurrentBatchIndex(nextIndex);
//     }
//   };
//   return (
//     <div className="min-h-screen max-w-[95%] mx-auto bg-gray-50 dark:bg-[#0a0f14] rounded-lg">
//       {/* Hero Section */}
//       {/* Interactive Features Section */}
//       <section className="py-20 px-6 bg-white dark:bg-gray-950 rounded-xl">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="grid lg:grid-cols-2 gap-12 items-center"
//           >
//             <div className="space-y-8">
//               <h2 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-white font-Roboto">
//                 Why <span className="font-semibold text-red-600 dark:text-red-400">Painters' Diary</span> Matters
//               </h2>
              
//               <div className="space-y-4">
//                 {features.map((feature, idx) => (
//                   <motion.div
//                     key={idx}
//                     className={`p-4 rounded-xl transition-all cursor-pointer ${activeFeature.title === feature.title ? `${feature.color} shadow-md` : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
//                     onClick={() => setActiveFeature(feature)}
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ type: 'spring', stiffness: 400, damping: 10 }}
//                   >
//                     <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white font-Playfair">{feature.title}</h3>
//                     <AnimatePresence mode="wait">
//                       {activeFeature.title === feature.title && (
//                         <motion.p
//                           className="text-gray-600 dark:text-gray-300 font-Roboto"
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: 'auto' }}
//                           exit={{ opacity: 0, height: 0 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           {feature.description}
//                         </motion.p>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             <motion.div
//               key={activeFeature.image}
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//               className="relative h-80 w-full rounded-2xl overflow-hidden shadow-xl"
//             >
//               <img 
//                 src={activeFeature.image} 
//                 alt={activeFeature.title} 
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
//                 <div>
//                   <h3 className="text-white text-xl font-semibold font-Quicksand ">{activeFeature.title}</h3>
//                   <p className="text-white/80 font-Roboto">{activeFeature.description.split('.')[0]}.</p>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Masonry Grid Gallery */}
//     <section className="py-12 px-6 bg-white dark:bg-[#040d1200]">
//       <div className="max-w-7xl mx-auto flex flex-col">
//         {/* Header */}
//               <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl font-light text-gray-900 dark:text-white mb-3">
//             Featured <span className="font-semibold">Masterpieces</span>
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
//             A curated gallery of art that moves you.
//           </p>
//         </motion.div>

//         {/* Masonry */}
//         <Masonry
//           breakpointCols={breakpointColumnsObj}
//           className="flex gap-6"
//           columnClassName="space-y-6"
//         >
//           {images.map((image, index) => (
//             <motion.div
//               key={index}
//               className="relative overflow-hidden rounded-xl shadow-lg group"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               {/* Image */}
//               <img
//                 src={image.src}
//                 alt={image.title}
//                 className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
//                 loading="lazy"
//               />

//               {/* Info */}
//               <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
//                 <h3 className="text-white font-semibold text-lg font-Quicksand">{image.title}</h3>
//                 <p className="text-white/80 text-sm font-Roboto">{image.category}</p>
//               </div>
             
//             </motion.div>
//           ))}
//         </Masonry>
//           {currentBatchIndex < batches.length - 1 && (
//         <button
//           onClick={handleLoadMore}
//           className="col-span-2 mt-12 px-6 py-3 dark:bg-slate-900 dark:text-gray-200 bg-gray-200 text-gray-900 border shadow-inner rounded-xl mx-auto"
//         >
//           Load More
//         </button>
//        )}
//       </div>

//         </section>
//     </div>
//   );
// };

// export default Collection;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';

const Collection = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1,
  };

  // 🔹 Fetch images from Pexels
  const fetchImages = async (pageNum = 1) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
      
      if (!API_KEY) {
        console.error("Pexels API key not found");
        return;
      }

      const res = await fetch(
        `https://api.pexels.com/v1/search?query=art&per_page=9&page=${pageNum}`,
        {
          headers: {
            Authorization: API_KEY
          }
        }
      );
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Check if we've reached the end of available images
      if (data.photos.length === 0) {
        setHasMore(false);
        return;
      }
      
      const formatted = data.photos.map(photo => ({
        id: photo.id,
        src: photo.src.large,
        title: photo.alt || "Untitled",
        category: photo.photographer,
      }));
      
      setImages(prev => pageNum === 1 ? formatted : [...prev, ...formatted]);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial batch
  useEffect(() => {
    fetchImages(page);
  }, [page]);

  return (
    <div className="min-h-screen xl:max-w-7xl max-w-full sm:max-w-[85%] mx-auto bg-gray-50 dark:bg-[#0a0f14] rounded-lg">
      <section className="py-12 px-6 bg-white dark:bg-[#040d1200]">
        <div className="max-w-7xl mx-auto flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-gray-900 dark:text-white mb-3">
              Featured <span className="font-semibold">Masterpieces</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              A curated gallery of art that moves you.
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-6"
            columnClassName="space-y-6"
          >
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                className="relative overflow-hidden rounded-xl shadow-lg group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                  <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                  <p className="text-white/80 text-sm">{image.category}</p>
                </div>
              </motion.div>
            ))}
          </Masonry>

          {/* Load More Button */}
          {hasMore && (
            <button
              onClick={() => setPage(prev => prev + 1)}
              disabled={loading}
              className="col-span-2 mt-12 px-6 py-3 dark:bg-slate-900 dark:text-gray-200 bg-gray-200 text-gray-900 border shadow-inner rounded-xl mx-auto disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Collection;