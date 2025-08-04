// import { useEffect } from 'react'
// import Grid from './Grid'
// import Slider from './Slider'
// import { Link } from 'react-router-dom'
// import { FaArrowRight, FaChevronDown } from 'react-icons/fa'
// import AOS from "aos";
// import "aos/dist/aos.css";

// function Collection() {
//   useEffect(() => {
//     AOS.init({ 
//       duration: 800,
//       once: true
//     });
//   }, []);

//   return (
//     <main className='w-screen min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#040d1200] dark:to-[#040d1200] overflow-x-hidden pb-16 relative'>
//       {/* Hero Section */}
//       <section className='w-full py-12 lg:py-20 px-4'>
//         <div className='max-w-[95%] mx-auto text-center'>
//           <h1 
//             className='font-serif font-bold lg:text-6xl text-4xl text-red-700 dark:text-red-400 mb-6'
//             data-aos="fade-up"
//           >
//             Discover Our Collections
//           </h1>
//           <p 
//             className='max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-8 font-Quicksand'
//             data-aos="fade-up" data-aos-delay="100"
//           >
//             Explore our curated selection of premium products, each crafted with exceptional quality and attention to detail.
//           </p>
//           <div data-aos="fade-up" data-aos-delay="200">
//             <Link 
//               to='/Gallery' 
//               className='inline-flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-all duration-300 group shadow-lg'
//             >
//               View Gallery
//               <FaArrowRight className='ml-2 group-hover:translate-x-1 transition-transform' />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Featured Slider */}
//       <section 
//         className='w-full max-w-[95%] mx-auto px-4 mb-16 rounded-2xl overflow-hidden shadow-xl dark:shadow-gray-800/30'
//         data-aos="fade-up"
//       >
//         <Slider />
//       </section>

//       {/* Collections Grid */}
//       <section className='w-full max-w-[95%] mx-auto px-4'>
//         <div className='flex justify-between items-center mb-8'>
//           <h2 
//             className='font-serif text-3xl font-semibold text-gray-800 dark:text-white'
//             data-aos="fade-right"
//           >
//             Our Collections
//           </h2>
//           <Link 
//             to='/category' 
//             className='text-red-600 dark:text-red-400 hover:underline flex items-center'
//             data-aos="fade-left"
//           >
//             Browse all categories
//             <FaChevronDown className='ml-1 transform rotate-90' />
//           </Link>
//         </div>

//         <div className='relative'>
//           <Grid />
//           <div className='absolute bottom-0 left-0 w-full h-64 flex items-end justify-center pb-8'>
//             <div className='absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/70 to-transparent dark:from-gray-900 dark:via-gray-900/80 pointer-events-none'></div>
//             <Link 
//               to='/Gallery' 
//               className='relative z-10'
//               data-aos="fade-up"
//             >
//               <button className='py-3 px-8 bg-white dark:bg-gray-800 rounded-full font-medium shadow-lg cursor-pointer text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 group border border-gray-200 dark:border-gray-700'>
//                 Load More
//                 <FaChevronDown className='group-hover:translate-y-1 transition-transform duration-300'/>
//               </button>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </main>
//   )
// }

// export default Collection

// import { useEffect } from 'react'
// import Grid from './Grid'
// import Slider from './Slider'
// import { Link } from 'react-router-dom'
// import { FiArrowRight, FiChevronDown } from 'react-icons/fi'
// import AOS from "aos";
// import "aos/dist/aos.css";

// function Collection() {
//   useEffect(() => {
//     AOS.init({ 
//       duration: 800,
//       once: true
//     });
//   }, []);

//   return (
//     <main className='w-full min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden pb-16'>
//       {/* Hero Section - Minimalist */}
//       <section className='w-full py-16 lg:py-24 px-4 sm:px-6'>
//         <div className='max-w-[95%] mx-auto text-center'>
//           <h1 
//             className='text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-6'
//             data-aos="fade-up"
//           >
//             Curated <span className='font-medium text-red-600 dark:text-red-400'>Art Collections</span>
//           </h1>
//           <p 
//             className='max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-8'
//             data-aos="fade-up" data-aos-delay="100"
//           >
//             Discover exceptional artworks from emerging and established creators worldwide
//           </p>
//           <div data-aos="fade-up" data-aos-delay="200">
//             <Link 
//               to='/Gallery' 
//               className='inline-flex items-center px-6 py-3 border-2 border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-all duration-300 group'
//             >
//               Explore Gallery
//               <FiArrowRight className='ml-2 group-hover:translate-x-1 transition-transform' />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Featured Slider - Clean Cards */}
//       <section 
//         className='w-full max-w-[90%] mx-auto px-4 sm:px-6 mb-20'
//         data-aos="fade-up"
//       >
//         <div className='mb-8 flex justify-between items-center'>
//           <h2 className='text-2xl font-light text-gray-900 dark:text-white'>
//             Featured Works
//           </h2>
//           <Link 
//             to='/featured' 
//             className='text-sm text-red-600 dark:text-red-400 hover:underline flex items-center'
//           >
//             View all
//             <FiChevronDown className='ml-1 transform rotate-90' />
//           </Link>
//         </div>
//         <Slider />
//       </section>

//       {/* Collections Grid - Modern Layout */}
//       <section className='w-full max-w-7xl mx-auto px-4 sm:px-6'>
//         <div className='flex justify-between items-center mb-8'>
//           <h2 
//             className='text-2xl font-light text-gray-900 dark:text-white'
//             data-aos="fade-right"
//           >
//             Browse Collections
//           </h2>
//           <div className='hidden sm:flex space-x-4'>
//             <button className='text-sm px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'>
//               All
//             </button>
//             <button className='text-sm px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'>
//               Paintings
//             </button>
//             <button className='text-sm px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'>
//               Photography
//             </button>
//             <button className='text-sm px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'>
//               Digital
//             </button>
//           </div>
//         </div>

//         {/* Grid with subtle hover effects */}
//         <div className='relative'>
//           <Grid />
          
//           {/* Gradient fade with centered button */}
//           <div className='absolute bottom-0 left-0 w-full h-48 flex items-end justify-center pb-8'>
//             <div className='absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent dark:from-gray-900 dark:via-gray-900/70 pointer-events-none'></div>
//             <Link 
//               to='/Gallery' 
//               className='relative z-10'
//               data-aos="fade-up"
//             >
//               <button className='px-6 py-2.5 bg-white dark:bg-gray-800 rounded-full font-medium shadow-sm hover:shadow-md cursor-pointer text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 border border-gray-200 dark:border-gray-700'>
//                 Show More
//                 <FiChevronDown className='group-hover:translate-y-0.5 transition-transform duration-300'/>
//               </button>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </main>
//   )
// }

// export default Collection;








import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css'

const featuredImages1 = [
  { src: '/Image-of-Collection/abstract.jpg', title: 'Abstract Vision', category: 'abstract', featured: true },
  { src: '/Image-of-Collection/pexels-eberhardgross-1367192.jpg', title: 'Mountain Majesty', category: 'landscape', featured: false },
  { src: '/Image-of-Collection/pexels-philippedonn-1133957.jpg', title: 'Forest Serenity', category: 'nature', featured: true },
  { src: '/Image-of-Collection/pexels-pixabay-147411.jpg', title: 'Urban Geometry', category: 'architecture', featured: false },
  { src: '/Image-of-Collection/pexels-rafael-guajardo-194140-604684.jpg', title: 'Street Stories', category: 'street', featured: true },
  { src: '/Image-of-Collection/blossoms.jpg', title: 'Floral Dreams', category: 'nature', featured: false },
  { src: '/Image-of-Collection/digital.jpg', title: 'Digital Art', category: 'digital', featured: true },
  { src: '/Image-of-Collection/dream.jpg', title: 'Surreal Moment', category: 'conceptual', featured: false },
  { src: '/Image-of-Collection/pexels-dax-dexter-delada-2150239947-31090348.jpg', title: 'Lonely Road', category: 'travel', featured: true },
  { src: '/Image-of-Collection/pexels-shaosong-sun-503031340-16100671.jpg', title: 'Golden Hour', category: 'landscape', featured: false },
];

const featuredImages2 = [
  { src: 'https://cdn.pixabay.com/photo/2022/10/24/09/31/flower-7543035_960_720.jpg', title: 'Abstract Vision', category: 'abstract', featured: true },
  { src: 'https://cdn.pixabay.com/photo/2025/01/29/11/09/lantern-9367692_1280.jpg', title: 'Mountain Majesty', category: 'landscape', featured: false },
  { src: 'https://cdn.pixabay.com/photo/2021/11/26/20/45/lantern-6826698_960_720.jpg', title: 'Forest Serenity', category: 'nature', featured: true },
  { src: 'https://cdn.pixabay.com/photo/2022/10/07/11/02/autumn-7504820_960_720.jpg', title: 'Urban Geometry', category: 'architecture', featured: false },
  { src: 'https://cdn.pixabay.com/photo/2024/12/26/21/04/firenze-9292733_960_720.jpg', title: 'Street Stories', category: 'street', featured: true },
  { src: 'https://cdn.pixabay.com/photo/2023/11/25/12/18/sea-8411640_960_720.jpg', title: 'Floral Dreams', category: 'nature', featured: false },
  { src: 'https://cdn.pixabay.com/photo/2025/06/11/17/18/red-gana-top-9654874_1280.jpg', title: 'Digital Art', category: 'digital', featured: true },
  { src: 'https://cdn.pixabay.com/photo/2024/01/25/12/30/mountain-8531778_1280.jpg', title: 'Surreal Moment', category: 'conceptual', featured: false },
  { src: 'https://cdn.pixabay.com/photo/2025/05/31/20/23/trees-9634157_1280.jpg', title: 'Lonely Road', category: 'travel', featured: true },
  { src: 'https://cdn.pixabay.com/photo/2022/09/08/02/55/pahan-7439926_1280.jpg', title: 'Golden Hour', category: 'landscape', featured: false },
]

const features = [
  {
    title: 'Curated Collections',
    description: 'Dive into thoughtfully assembled collections that highlight the best works across genres and styles. Our curators work tirelessly to bring you exceptional artworks from around the globe.',
    image: '/Image-of-Collection/abstract.jpg',
    color: 'bg-red-100 dark:bg-red-900/30'
  },
  {
    title: 'Artist Discovery',
    description: 'Uncover hidden gems and emerging talents. Painters\' Diary bridges the gap between creators and admirers, giving artists the platform they deserve and art lovers direct access to new inspiration.',
    image: '/Image-of-Collection/pexels-pixabay-147411.jpg',
    color: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'Creative Inspiration',
    description: 'Fuel your imagination with artworks that spark new ideas and emotions. Whether you\'re an artist seeking inspiration or an enthusiast looking to expand your horizons, our collections will move you.',
    image: '/Image-of-Collection/blossoms.jpg',
    color: 'bg-green-100 dark:bg-green-900/30'
  }
];




const Collection = () => {
  const [activeFeature, setActiveFeature] = useState(features[0]);
  const [hoveredImage, setHoveredImage] = useState(null);

  const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1,
};


const batches = [featuredImages1, featuredImages2]

  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [images, setImages] = useState(batches[0]);

  const handleLoadMore = () => {
    const nextIndex = currentBatchIndex + 1;
    if (nextIndex < batches.length) {
      setImages(prev => [...prev, ...batches[nextIndex]]);
      setCurrentBatchIndex(nextIndex);
    }
  };
  return (
    <div className="min-h-screen max-w-[95%] mx-auto bg-gray-50 dark:bg-[#0a0f14] rounded-lg">
      {/* Hero Section */}
      {/* Interactive Features Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950 rounded-xl">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-white font-Roboto">
                Why <span className="font-semibold text-red-600 dark:text-red-400">Painters' Diary</span> Matters
              </h2>
              
              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className={`p-4 rounded-xl transition-all cursor-pointer ${activeFeature.title === feature.title ? `${feature.color} shadow-md` : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    onClick={() => setActiveFeature(feature)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white font-Playfair">{feature.title}</h3>
                    <AnimatePresence mode="wait">
                      {activeFeature.title === feature.title && (
                        <motion.p
                          className="text-gray-600 dark:text-gray-300 font-Roboto"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              key={activeFeature.image}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-80 w-full rounded-2xl overflow-hidden shadow-xl"
            >
              <img 
                src={activeFeature.image} 
                alt={activeFeature.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-semibold font-Quicksand ">{activeFeature.title}</h3>
                  <p className="text-white/80 font-Roboto">{activeFeature.description.split('.')[0]}.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Masonry Grid Gallery */}
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

        {/* Masonry */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-6"
          columnClassName="space-y-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <h3 className="text-white font-semibold text-lg font-Quicksand">{image.title}</h3>
                <p className="text-white/80 text-sm font-Roboto">{image.category}</p>
              </div>
             
            </motion.div>
          ))}
        </Masonry>
          {currentBatchIndex < batches.length - 1 && (
        <button
          onClick={handleLoadMore}
          className="col-span-2 mt-12 px-6 py-3 dark:bg-slate-900 dark:text-gray-200 bg-gray-200 text-gray-900 border shadow-inner rounded-xl mx-auto"
        >
          Load More
        </button>
       )}
      </div>

        </section>
    </div>
  );
};

export default Collection;
