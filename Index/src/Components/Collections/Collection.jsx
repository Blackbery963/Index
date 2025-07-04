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
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiHeart, FiShare2, FiDownload } from 'react-icons/fi';
import Masonry from 'react-masonry-css'

const featuredImages = [
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[75vh] max-w-[95%] mx-auto rounded-lg flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10"></div>
        <div className="absolute inset-0">
          <img 
            src="/Image-of-Collection/pexels-eberhardgross-1367192.jpg" 
            alt="Hero background" 
            className="w-full h-full object-cover animate-fadeInOut"
          />
        </div>
        
        <motion.div 
          className="relative z-20 text-center px-6 max-w-4xl font-Quicksand"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="text-lg sm:text-xl text-white mb-4 font-medium tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            DISCOVER THE ART OF
          </motion.p>
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Visual Storytelling
          </motion.h1>
          <motion.p 
            className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A curated collection of breathtaking visuals from talented creators worldwide
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link 
              to="/gallery" 
              className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Explore Gallery <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              to="/artists" 
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-all"
            >
              Meet Artists
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-800">
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
              
              <div className="space-y-6">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className={`p-6 rounded-xl transition-all cursor-pointer ${activeFeature.title === feature.title ? `${feature.color} shadow-md` : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
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
              className="relative h-96 w-full rounded-2xl overflow-hidden shadow-xl"
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
    <section className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
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
          {featuredImages.map((image, index) => (
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

              {/* Icons */}
              <div className="absolute bottom-2 right-2 flex sm:flex-col gap-2 transition-opacity duration-300
               opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                {[FiHeart, FiShare2, FiDownload].map((Icon, i) => (
                  <button
                    key={i}
                    className=" p-1 bg-black/50 hover:bg-black/70 text-white rounded-lg border transition-colors"
                  >
                    <Icon className='md:text-[16px] text-[14px]' />
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </Masonry>
        </div>
        </section>

      {/* Final CTA */}
      <section className="lg:py-20 py-10 rounded-lg max-w-[90%] lg:max-w-[95%] mx-auto px-6 bg-gradient-to-r from-purple-500 to-indigo-400">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-Quicksand">
            Begin Your Artistic Journey
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-Roboto">
            Join our community of art lovers and creators today
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/signup" 
              className="lg:px-8 lg:py-4 px-6 py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
            >
              Create Free Account
            </Link>
            <Link 
              to="/about" 
              className="lg:px-8 lg:py-4 px-6 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-all"
            >
              Learn How It Works
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Collection;