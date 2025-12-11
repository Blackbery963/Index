import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingCart, FiShare2 } from 'react-icons/fi';
// import LikeButton from '../EngagementService/likeButton';
// import ImageSlider from './ImageSlider';
import LikeButton from '../../EngagementService/likeButton';
import ImageSlider from '../ArtStore/ImageSlider';

const ProductDetails = ({ product, isOpen, onClose, onAddToCart }) => {
  const formatPrice = (price) => {
    if (!price) return '₹ N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col"
          >
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {product.title || 'Untitled'}
                  </h2>
                  <button 
                    onClick={onClose}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                
                {/* Image Slider */}
                <div className="mb-6">
                  <ImageSlider
                    images={[product.imageUrl, ...product.additionalImages]}
                    alt={product.title}
                    className="w-full rounded-xl"
                  />
                </div>
                
                {/* Price and Like */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-3xl font-bold text-pink-600">
                    {formatPrice(product.price)}
                  </span>
                  <div className="flex items-center gap-4">
                    <LikeButton 
                      artworkId={product.$id}
                      size="md"
                    />
                  </div>
                </div>
                
                {/* Artist Info */}
                <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {product.profileImage ? (
                    <img 
                      src={product.profileImage} 
                      alt={product.artist}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                      <span className="text-gray-500">👤</span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{product.artist}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Artist</p>
                  </div>
                </div>
                
                {/* Details */}
                <div className="space-y-4 mb-8">
                  {product.description && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  )}
                  
                  {product.materials && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Materials</h3>
                      <p className="text-gray-600 dark:text-gray-300">{product.materials}</p>
                    </div>
                  )}
                  
                  {product.dimensions && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Dimensions</h3>
                      <p className="text-gray-600 dark:text-gray-300">{product.dimensions}</p>
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="w-full py-4 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart />
                    Add to Cart - {formatPrice(product.price)}
                  </button>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:border-pink-600 hover:text-pink-600 transition-colors flex items-center justify-center gap-2">
                      <FiShare2 />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductDetails;








