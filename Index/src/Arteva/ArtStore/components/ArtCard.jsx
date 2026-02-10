// components/ArtCard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiMessageSquare, FiShare2, FiShoppingBag, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdCurrencyRupee } from 'react-icons/md';

const ArtCard = ({ art, addToCart, openDetails }) => {
  const images = [art.imageUrl, ...(art.additionalImages || [])].filter(Boolean);
  const [currentImg, setCurrentImg] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 md:rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image Slider Section */}
      <div className="relative aspect-auto bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <img 
          src={images[currentImg]} 
          alt={art.title} 
          onClick={openDetails}
          className="w-full h-auto object-cover cursor-pointer hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        
        {/* Slider Controls (Only if multiple images) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 dark:bg-black/50 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiChevronLeft />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 dark:bg-black/50 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiChevronRight />
            </button>
            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full ${idx === currentImg ? 'bg-white' : 'bg-white/50'}`} 
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Metadata & Actions Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div onClick={openDetails} className="cursor-pointer">
            <h3 className="text-lg font-serif font-semibold text-zinc-900 dark:text-zinc-50 leading-tight">
              {art.title}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wide">
              {art.artist}
            </p>
          </div>
          {/* High Visibility Price Tag */}
          <div className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm font-bold flex items-center text-zinc-900 dark:text-zinc-100">
            <MdCurrencyRupee className="text-xs" />
            {art.price?.toLocaleString()}
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800 my-3" />

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button className="text-zinc-400 hover:text-red-500 transition-colors">
              <FiHeart className="text-lg" />
            </button>
            <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              <FiMessageSquare className="text-lg" />
            </button>
            <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
              <FiShare2 className="text-lg" />
            </button>
          </div>

          <button 
            onClick={() => addToCart(art)}
            className="flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
          >
            <FiShoppingBag /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtCard;