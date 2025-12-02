import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Share2, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const DiaryCard = ({ diary, user, onLike, allDiaries = [], currentIndex = 0, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState({});
  
  // Helper function to get author name
  const getAuthorName = () => {
    // Priority: diary.author > user.name > user.username > user.email > "Anonymous"
    if (diary.author && diary.author !== "Anonymous") return diary.author;
    if (user?.name) return user.name;
    if (user?.username) return user.username;
    if (user?.email) return user.email.split('@')[0];
    return "Anonymous";
  };

  // Helper function to get author initial
  const getAuthorInitial = () => {
    const name = getAuthorName();
    return name ? name[0].toUpperCase() : "A";
  };

  const fallbackImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800";
  const images = (diary.images && diary.images.length > 0) ? diary.images : [fallbackImage];
  const hasMultipleImages = images.length > 1;

  const getImageSrc = (index) => {
    return imageError[index] ? fallbackImage : images[index];
  };

  const handleImageError = (index) => {
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handlePrevDiary = () => {
    if (onNavigate && currentIndex > 0) {
      setCurrentImageIndex(0);
      onNavigate(currentIndex - 1);
    }
  };

  const handleNextDiary = () => {
    if (onNavigate && currentIndex < allDiaries.length - 1) {
      setCurrentImageIndex(0);
      onNavigate(currentIndex + 1);
    }
  };

  return (
    <>
      {/* Main Card */}
      <motion.div 
        className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-zinc-900 cursor-pointer group"
        onClick={() => setIsOpen(true)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={getImageSrc(0)}
            alt={diary.title}
            className="w-full h-full object-cover"
            onError={() => handleImageError(0)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </motion.div>

        {/* Image Counter */}
        {hasMultipleImages && (
          <div className="absolute top-4 right-4 z-10">
            <div className="px-2.5 py-1 bg-black/50 backdrop-blur-xl border border-white/20 rounded-full">
              <span className="text-[10px] font-bold text-white">
                1/{images.length}
              </span>
            </div>
          </div>
        )}

        {/* Date Badge - Top Left */}
        <div className="absolute top-4 left-4 z-10">
          <div className="px-3 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
            <span className="text-[10px] font-bold text-white tracking-wider uppercase">
              {diary.date}
            </span>
          </div>
        </div>

        {/* Content - Bottom */}
        <div className="absolute inset-x-0 bottom-0 p-6 z-10">
          <h3 className="font-serif text-2xl md:text-3xl text-white leading-tight mb-3 drop-shadow-2xl">
            {diary.title}
          </h3>

          <p className="text-sm text-zinc-200/90 leading-relaxed mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {diary.snippet}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                {getAuthorInitial()}
              </div>
              <span className="text-xs text-zinc-300 font-medium">
                {getAuthorName()}
              </span>
            </div>

            {diary.location && (
              <div className="flex items-center gap-1 text-xs text-zinc-300">
                <MapPin className="w-3 h-3" />
                <span>{diary.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={() => setIsOpen(false)}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", damping: 30 }}
              className="relative w-full h-full max-w-6xl max-h-screen flex flex-col md:flex-row bg-zinc-950 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side - Image Slider (Takes 60% width on desktop) */}
              <div className="relative w-full md:w-[60%] h-[50vh] md:h-full bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={getImageSrc(currentImageIndex)}
                    alt={diary.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    onError={() => handleImageError(currentImageIndex)}
                  />
                </AnimatePresence>

                {/* Image Navigation */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Image Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentImageIndex 
                              ? "bg-white w-6" 
                              : "bg-white/50 hover:bg-white/75"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Right Side - Content (Takes 40% width on desktop) */}
              <div className="relative w-full md:w-[40%] h-[50vh] md:h-full bg-white dark:bg-zinc-900 flex flex-col">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-900 dark:text-white" />
                </button>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                  {/* Meta Pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1.5 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {diary.date}
                    </span>
                    {diary.location && (
                      <span className="px-3 py-1.5 bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {diary.location}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-3xl md:text-4xl text-zinc-900 dark:text-white mb-4 leading-tight">
                    {diary.title}
                  </h2>

                  {/* Author */}
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold">
                      {getAuthorInitial()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {getAuthorName()}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {user ? "Journal Author" : "Anonymous"}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 mb-6">
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {diary.snippet}
                    </p>
                    {/* <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      The experience was transformative. Every moment felt like a discovery, 
                      each detail adding layers to the story I was living. The textures, the sounds, 
                      the emotions—all intertwined into something unforgettable.
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Looking back, I realize how these moments shape us. They become part of our 
                      narrative, the chapters we revisit when we need to remember who we are and 
                      where we've been.
                    </p> */}
                  </div>

                  {/* Tags */}
                  {diary.tags && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {diary.tags.slice(0, 4).map(tag => (
                        <span 
                          key={tag} 
                          className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fixed Bottom Actions */}
                <div className="border-t border-zinc-200 dark:border-zinc-800 p-6 md:p-8 space-y-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); onLike(diary.id, diary.isLiked); }}
                      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                        diary.isLiked 
                          ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30" 
                          : "bg-zinc-900 dark:bg-white text-white dark:text-black hover:shadow-lg"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${diary.isLiked ? "fill-white" : ""}`} />
                      {diary.isLiked ? "Liked" : "Like Entry"}
                    </button>

                    <button className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                      <Share2 className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                    </button>
                  </div>

                  {/* Diary Navigation */}
                  {onNavigate && allDiaries.length > 1 && (
                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={handlePrevDiary}
                        disabled={currentIndex === 0}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          currentIndex === 0
                            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </button>
                      
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {currentIndex + 1} / {allDiaries.length}
                      </span>
                      
                      <button
                        onClick={handleNextDiary}
                        disabled={currentIndex === allDiaries.length - 1}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          currentIndex === allDiaries.length - 1
                            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        }`}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Diary Navigation - Outside Modal (Alternative Position) */}
            {onNavigate && allDiaries.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevDiary(); }}
                  disabled={currentIndex === 0}
                  className={`fixed left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentIndex === 0
                      ? "bg-white/10 text-white/30 cursor-not-allowed"
                      : "bg-white/20 backdrop-blur-md text-white hover:bg-white/30"
                  }`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={(e) => { e.stopPropagation(); handleNextDiary(); }}
                  disabled={currentIndex === allDiaries.length - 1}
                  className={`fixed right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentIndex === allDiaries.length - 1
                      ? "bg-white/10 text-white/30 cursor-not-allowed"
                      : "bg-white/20 backdrop-blur-md text-white hover:bg-white/30"
                  }`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DiaryCard;