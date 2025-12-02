// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const artists = [
//   {
//     name: "Alex Chen",
//     title: "Concept Artist | 15K Followers",
//     quote: "ArtVerse's challenges pushed my creativity to new heights!",
//     image: "https://images.pexels.com/photos/32125021/pexels-photo-32125021.jpeg",
//   },
//   {
//     name: "Maria Lopez",
//     title: "3D Modeler | 9K Followers",
//     quote: "The community feedback helped me refine my skills.",
//     image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     name: "Sam Patel",
//     title: "Traditional Painter | 20K Followers",
//     quote: "ArtVerse connected me with collectors worldwide.",
//     image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
//   },
// ];

// const ArtistSpotlight = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % artists.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + artists.length) % artists.length);
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, x: 100 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
//     exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
//   };

//   return (
//     <motion.section
//       variants={containerVariants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       className="py-16 bg-gray-100 dark:bg-gray-800"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white font-Quicksand">
//           Artist Spotlight
//         </h2>
//         <div className="relative ">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               variants={cardVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="bg-gradient-to-br from-red-50 to-purple-100 dark:from-gray-900 dark:to-black/25 rounded-2xl shadow-lg p-8 text-center border border-gray-200  dark:border-gray-700"
//             >
//               <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-800">
//                 <img
//                   src={artists[currentIndex].image}
//                   alt={artists[currentIndex].name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
//                 {artists[currentIndex].name}
//               </h3>
//               <p className="text-blue-600 dark:text-blue-400 mb-4">
//                 {artists[currentIndex].title}
//               </p>
//               <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
//                 "{artists[currentIndex].quote}"
//               </p>
//               <div className="flex justify-center space-x-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
//                   onClick={() => alert('View Portfolio')}
//                 >
//                   <span className="mr-1">👁️</span> View Portfolio
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
//                   onClick={() => alert('Join Q&A Session')}
//                 >
//                   <span className="mr-1">💬</span> Q&A Session
//                 </motion.button>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//           <button
//             onClick={handlePrev}
//             className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
//           >
//             ←
//           </button>
//           <button
//             onClick={handleNext}
//             className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
//           >
//             →
//           </button>
//         </div>
//         <div className="flex justify-center mt-6 space-x-2">
//           {artists.map((_, index) => (
//             <button
//               key={index}
//               className={`w-3 h-3 rounded-full ${
//                 index === currentIndex ? 'bg-blue-600' : 'bg-gray-400'
//               }`}
//               onClick={() => setCurrentIndex(index)}
//             />
//           ))}
//         </div>
//       </div>
//     </motion.section>
//   );
// };

// export default ArtistSpotlight;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Award, ExternalLink, MessageCircle, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const artists = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Concept Artist",
    followers: "15K",
    quote: "ArtVerse's challenges pushed my creativity to new heights! The feedback loop here is unlike any other platform.",
    image: "https://images.pexels.com/photos/32125021/pexels-photo-32125021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Sci-Fi", "Environment", "2D"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "Maria Lopez",
    role: "3D Modeler",
    followers: "9K",
    quote: "The community feedback helped me refine my skills. I found my co-founder for my indie game studio right here.",
    image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=800&q=80",
    tags: ["Character", "Blender", "Sculpting"],
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    name: "Sam Patel",
    role: "Traditional Painter",
    followers: "20K",
    quote: "ArtVerse connected me with collectors worldwide. It's refreshing to see digital and traditional art coexist so beautifully.",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Oil", "Portrait", "Fine Art"],
    color: "from-amber-500 to-orange-500"
  },
];

const ArtistSpotlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % artists.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + artists.length) % artists.length);
  };

  return (
    <section className="py-20 px-1 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-slate-800/40 border border-white/20 mb-6 backdrop-blur-sm"
          >
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Community Stars</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Artist Spotlight
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto"
          >
            Meet the creators shaping the future of digital art in our community.
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-20 hidden md:block">
            <button 
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 transition-transform text-slate-700 dark:text-white"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-20 hidden md:block">
            <button 
              onClick={handleNext}
              className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 transition-transform text-slate-700 dark:text-white"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Card Carousel */}
          <div className="overflow-hidden px-1 py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="
                  relative w-full
                  bg-white/40 dark:bg-slate-900/40 
                  backdrop-blur-xl
                  border border-white/40 dark:border-white/10
                  rounded-xl p-6 md:p-12
                  shadow-2xl
                "
              >
                {/* Decorative Gradient Blob */}
                <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${artists[currentIndex].color} opacity-10 blur-3xl rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4`} />

                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
                  
                  {/* Image Section */}
                  <div className="relative shrink-0 group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${artists[currentIndex].color} rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                      <img
                        src={artists[currentIndex].image}
                        alt={artists[currentIndex].name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 py-2 px-4 rounded-xl shadow-lg border border-white/10 flex items-center gap-2">
                      <Award size={16} className="text-amber-500" />
                      <span className="font-bold text-slate-800 dark:text-white">{artists[currentIndex].followers}</span>
                      <span className="text-xs text-slate-500">Followers</span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                      {artists[currentIndex].tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                      {artists[currentIndex].name}
                    </h3>
                    <p className={`text-lg font-medium bg-gradient-to-r ${artists[currentIndex].color} bg-clip-text text-transparent mb-6`}>
                      {artists[currentIndex].role}
                    </p>

                    <div className="relative mb-8">
                      <Quote className="absolute -top-4 -left-6 text-slate-300 dark:text-slate-700 opacity-50" size={40} />
                      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 italic relative z-10 leading-relaxed">
                        "{artists[currentIndex].quote}"
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                      <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
                        <ExternalLink size={18} />
                        View Portfolio
                      </button>
                      <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-transparent border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                        <MessageCircle size={18} />
                        Q&A Session
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-8 md:hidden">
            <button onClick={handlePrev} className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-black/5 text-slate-800 dark:text-white">
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2 items-center">
              {artists.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-slate-800 dark:bg-white w-4' : 'bg-slate-300 dark:bg-white/20'}`}
                />
              ))}
            </div>
            <button onClick={handleNext} className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-black/5 text-slate-800 dark:text-white">
              <ChevronRight size={24} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ArtistSpotlight;