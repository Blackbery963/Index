import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import image1 from './Header-Images/no1.jpg';
import image2 from './Header-Images/no2.jpeg';
import image3 from './Header-Images/no3.webp';
import image4 from './Header-Images/no4.jpeg';
import image5 from './Header-Images/no5.jpg';
import image6 from './Header-Images/no6.jpeg';
import image7 from './Header-Images/no7.jpeg';
import image8 from './Header-Images/no8.jpeg';
import image9 from './Header-Images/no9.jpg';

function HeroSection() {
  const backgroundImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

  return (
    <section className="relative lg:h-[100vh] h-[80vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image Grid */}
      <div className="absolute inset-0 z-0">
        {/* Single image for mobile */}
        <div className="sm:hidden absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImages[0]})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        {/* 2x2 grid for tablets */}
        <div className="hidden sm:grid md:hidden grid-cols-2 grid-rows-2 h-full gap-1">
          {backgroundImages.slice(0, 4).map((img, index) => (
            <div
              key={index}
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        {/* 3x3 grid for desktop */}
        <div className="hidden md:grid grid-cols-3 grid-rows-3 h-full gap-1">
          {backgroundImages.map((img, index) => (
            <motion.div
              key={index}
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            />
          ))}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      {/* Content Overlay */}
      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-16">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-Roboto"
        >
          {/* Immerse Yourself in <span className="text-yellow-400">Art</span> */}
          A Journey Through Colors & Imagination
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl mb-8"
        >
           <span className="md:hidden block">
          Discover unique artwork from global artists. Connect, explore, and support creativity in one vibrant space.          </span>
          <span className="hidden md:block">
          Dive into a curated world of stunning art. Whether you're a creator or collector, find inspiration, connection, and exceptional pieces all in one place.          </span>
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-row gap-4"
        >
          <Link to="/community">
            <motion.button
              className="px-6 py-3 bg-yellow-400 border-2 border-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg text-sm sm:text-base transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             Join Community
            </motion.button>
          </Link>
          <Link to="/Arteva/Artstore">
            <motion.button
              className="px-6 py-3 border-2 border-white hover:border-yellow-300 hover:text-yellow-300 text-white font-medium rounded-lg text-sm sm:text-base transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Artstore
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Subtle Corner Accents */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-white/20"></div>
      <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-white/20"></div>
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-white/20"></div>
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-white/20"></div>
    </section>
  );
}

export default HeroSection;
