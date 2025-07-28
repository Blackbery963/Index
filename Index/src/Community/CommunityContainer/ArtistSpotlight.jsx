import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const artists = [
  {
    name: "Alex Chen",
    title: "Concept Artist | 15K Followers",
    quote: "ArtVerse's challenges pushed my creativity to new heights!",
    image: "https://images.pexels.com/photos/32125021/pexels-photo-32125021.jpeg",
  },
  {
    name: "Maria Lopez",
    title: "3D Modeler | 9K Followers",
    quote: "The community feedback helped me refine my skills.",
    image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sam Patel",
    title: "Traditional Painter | 20K Followers",
    quote: "ArtVerse connected me with collectors worldwide.",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
];

const ArtistSpotlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % artists.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + artists.length) % artists.length);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-16 bg-gray-100 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white font-Quicksand">
          Artist Spotlight
        </h2>
        <div className="relative ">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gradient-to-br from-red-50 to-purple-100 dark:from-gray-900 dark:to-black/25 rounded-2xl shadow-lg p-8 text-center border border-gray-200  dark:border-gray-700"
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-800">
                <img
                  src={artists[currentIndex].image}
                  alt={artists[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                {artists[currentIndex].name}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4">
                {artists[currentIndex].title}
              </p>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                "{artists[currentIndex].quote}"
              </p>
              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => alert('View Portfolio')}
                >
                  <span className="mr-1">👁️</span> View Portfolio
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => alert('Join Q&A Session')}
                >
                  <span className="mr-1">💬</span> Q&A Session
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
          >
            →
          </button>
        </div>
        <div className="flex justify-center mt-6 space-x-2">
          {artists.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-400'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ArtistSpotlight;