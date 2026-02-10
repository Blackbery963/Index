// components/DetailModal.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiHeart, FiShare2, FiShoppingBag, FiStar, FiUser } from 'react-icons/fi';
import { MdCurrencyRupee } from 'react-icons/md';

const DetailModal = ({ art, onClose, addToCart }) => {
  const images = [art.imageUrl, ...(art.additionalImages || [])].filter(Boolean);
  const [selectedImg, setSelectedImg] = useState(images[0]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center py-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-white dark:bg-zinc-900 w-full max-w-5xl md:min-h-[90vh] min-h-full rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl z-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/50 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black transition-colors"
        >
          <FiX className="text-xl dark:text-white" />
        </button>

        {/* Left Side: Images */}
        <div className="w-full md:w-1/2 bg-zinc-100 dark:bg-zinc-950 p-4 flex flex-col justify-center items-center">
          <div className="w-full h-64 md:h-[500px] flex items-center justify-center mb-4">
            <img 
              src={selectedImg} 
              alt={art.title} 
              className="max-w-full max-h-full object-contain shadow-lg"
            />
          </div>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto p-2">
              {images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedImg(img)}
                  className={`w-16 h-16 border-2 rounded-md overflow-hidden flex-shrink-0 ${selectedImg === img ? 'border-zinc-900 dark:border-white' : 'border-transparent opacity-60'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Info */}
        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
          
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs font-bold uppercase tracking-wider rounded-full">
              {art.category || 'Artwork'}
            </span>
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              <FiStar className="fill-current" /> <span>{art.rating || '4.9'}</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">{art.title}</h2>
          
          <div className="flex items-center gap-3 mb-6">
             <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
               <FiUser />
             </div>
             <p className="font-medium">{art.artist}</p>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
            {art.description || "This piece is a unique exploration of texture and form, created using traditional methods combined with modern aesthetics. Perfect for contemporary living spaces."}
          </p>

          <div className="flex flex-col gap-4 mb-8">
            <div className="flex justify-between items-end border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <span className="text-zinc-500">Price</span>
              <span className="text-2xl font-bold flex items-center">
                <MdCurrencyRupee />{art.price?.toLocaleString()}
              </span>
            </div>
            
            <div className="flex gap-4 mt-2">
              <button 
                onClick={() => { addToCart(art); onClose(); }}
                className="flex-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black py-4 rounded-lg font-bold uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <FiShoppingBag /> Add to Cart
              </button>
              <button className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <FiHeart className="text-xl" />
              </button>
              <button className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <FiShare2 className="text-xl" />
              </button>
            </div>
          </div>

          {/* Simple Comment Section Preview */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl">
             <h4 className="font-bold mb-4">Latest Reviews</h4>
             {art.reviews && art.reviews.length > 0 ? (
               art.reviews.map(rev => (
                 <div key={rev.id} className="mb-4 last:mb-0 border-b border-zinc-200 dark:border-zinc-700 last:border-0 pb-2">
                   <p className="text-xs font-bold">{rev.user}</p>
                   <p className="text-sm text-zinc-600 dark:text-zinc-400">{rev.comment}</p>
                 </div>
               ))
             ) : (
               <p className="text-sm text-zinc-500">No reviews yet. Be the first to collect this.</p>
             )}
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default DetailModal;