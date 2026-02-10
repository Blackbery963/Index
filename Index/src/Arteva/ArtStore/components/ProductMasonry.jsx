import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { MdCurrencyRupee } from 'react-icons/md';

const ProductMasonry = ({ products, addToCart }) => {
  return (
    // CSS Columns for Masonry Layout
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-1 space-y-1">
      {products.map((art) => (
        <div key={art.$id} className="break-inside-avoid">
          <ProductCard art={art} addToCart={addToCart} />
        </div>
      ))}
    </div>
  );
};

const ProductCard = ({ art, addToCart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden w-full bg-zinc-100">
        <img 
          src={art.imageUrl} 
          alt={art.title} 
          className="w-full h-auto object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        
        {/* Overlay Action */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            onClick={() => addToCart(art)}
            className="bg-white text-black px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors flex items-center gap-2"
          >
            <FiPlus /> Add to Collection
          </button>
        </div>
      </div>

      {/* Minimal Info */}
      <div className="pt-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-serif text-zinc-900 leading-tight">{art.title}</h3>
            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wide">{art.artist}</p>
          </div>
          <p className="text-sm font-medium flex items-center text-zinc-900">
            <MdCurrencyRupee className="text-xs" />
            {art.price?.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductMasonry;