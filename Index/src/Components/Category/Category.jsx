import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import Pic_1 from './Category-images/landscape.png';
import Pic_2 from './Category-images/water.jpg';
import Pic_3 from './Category-images/oil.jpg';
import Pic_4 from './Category-images/abstract.jpg';
import Pic_5 from './Category-images/still life.jpg';
import Pic_6 from './Category-images/surreal.png';
import Pic_7 from './Category-images/impression.jpg';
import Pic_8 from './Category-images/realism.jpg';
import Pic_9 from './Category-images/portrait.jpg';
import Pic_10 from './Category-images/express.jpg';
import Pic_11 from './Category-images/minimal.jpg';
import Pic_12 from './Category-images/pop.jpg';
import Pic_13 from './Category-images/nature.jpg';
import Pic_14 from './Category-images/tradition.jpg';
import Pic_15 from './Category-images/historic.jpg';
import Pic_16 from './Category-images/digital.jpg';
import Pic_17 from './Category-images/modern.jpg';
import Pic_18 from './Category-images/Photography.jpg'


function Category() {
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const images = [
    {
      name: 'Landscape',
      para: 'Natural scenery emphasizing light, mood, and atmosphere.',
      backImg: Pic_1,
      link: '/Landscape',
    },
    {
      name: 'Portrait',
      para: 'Capturing personality, expression, and likeness of a person.',
      backImg: Pic_9,
      link: '/Portrait',
    },
    {
      name: 'Watercolor',
      para: 'Transparent pigments mixed with water producing soft effects.',
      backImg: Pic_2,
      link: '/Watercolor',
    },
    {
      name: 'Oil Painting',
      para: 'Rich textures and vibrant colors with slow blending.',
      backImg: Pic_3,
      link: '/Oil_Paint',
    },
    {
      name: 'Abstract',
      para: 'Expressing ideas through colors, shapes, and forms.',
      backImg: Pic_4,
      link: '/Abstract',
    },
    {
      name: 'Still Life',
      para: 'Inanimate objects emphasizing composition and lighting.',
      backImg: Pic_5,
      link: '/Still-Life',
    },
    {
      name: 'Historical Art',
      para: 'Significant events or figures from history.',
      backImg: Pic_15,
      link: '/Historical',
    },
    {
      name: 'Surrealism',
      para: 'Blends reality and dreams with symbolic elements.',
      backImg: Pic_6,
      link: '/Surrealism',
    },
    {
      name: 'Impressionism',
      para: 'Fleeting moments with quick brushstrokes and bright colors.',
      backImg: Pic_7,
      link: '/Impressionism',
    },
    {
      name: 'Realism',
      para: 'Portrays subjects truthfully and accurately.',
      backImg: Pic_8,
      link: '/Realism',
    },
    {
      name: 'Expressionism',
      para: 'Vivid colors and dramatic distortions for emotions.',
      backImg: Pic_10,
      link: '/Expressionism',
    },
    {
      name: 'Minimalism',
      para: 'Simplifies composition using basic shapes and limited colors.',
      backImg: Pic_1,
      link: '/Minimalism',
    },
    {
      name: 'Pop Art',
      para: 'Bold colors and imagery from mass culture.',
      backImg: Pic_12,
      link: '/Pop-Art',
    },
    {
      name: 'Nature',
      para: 'Showcases the beauty of the natural world.',
      backImg: Pic_13,
      link: '/Nature',
    },
    {
      name: 'Traditional',
      para: 'Established styles representing cultural heritage.',
      backImg: Pic_14,
      link: '/Traditional',
    },
    {
    name: 'Digital',
    para: 'Digital art is created using digital tools and software.',
    backImg: Pic_16,
    link: '/Digital',
    },
    {
      name: 'Modern',
      para: 'Breaks away from classical forms with innovation.',
      backImg: Pic_17,
      link: '/Modern',
    },
    {
      name:'Photography',
      para:'Capturing light to create expressive images.',
      backImg: Pic_18,
      link:'/Photography'
    }
  ];

  // Filter categories based on search query
  const filteredImages = images.filter(image => {
    return image.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           image.para.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
<div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4 overflow-x-hidden transition-colors duration-300">
  {/* Header Section */}
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center mb-12 max-w-3xl mx-auto"
  >
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
      Art Categories
    </h1>
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
      Explore diverse artistic styles and techniques
    </p>
    
    {/* Search Bar */}
    <div className="relative max-w-xl mx-auto mb-8">
      <input
        type="text"
        placeholder="Search categories..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <svg 
        className="absolute right-4 top-3 w-5 h-5 text-gray-500 dark:text-gray-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  </motion.div>

  {/* Categories Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
    {filteredImages.map((img, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="group"
      >
        <Link to={img.link}>
          <div className="rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg bg-white dark:bg-gray-800">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={img.backImg} 
                alt={img.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{img.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{img.para}</p>
              <div className="mt-4 flex justify-end">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                  View works
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    ))}
  </div>

  {/* Empty State */}
  {filteredImages.length === 0 && (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16"
    >
      <svg 
        className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No categories found</h3>
      <p className="text-gray-500 dark:text-gray-400">Try a different search term</p>
    </motion.div>
  )}
</div>

  );
}

export default Category;