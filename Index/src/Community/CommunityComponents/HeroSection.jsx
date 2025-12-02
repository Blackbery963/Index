// // Components/HeroSection.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import { Sparkles } from "lucide-react";

// const slides = [
//   {
//     title: "Connect with Creators",
//     text: "Meet artists, share ideas, and explore creative stories together."
//   },
//   {
//     title: "Collaborate Easily",
//     text: "Start projects, join groups, and create alongside talented artists."
//   },
//   {
//     title: "Grow Your Skills",
//     text: "Learn techniques, get feedback, and level up your artistic journey."
//   }
// ];

// const HeroSection = () => {
//   return (
//     <section className="relative h-[55vh] w-full flex items-center justify-center px-4 pt-20">
//       <div className="relative max-w-7xl w-full mx-auto flex justify-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="
//             w-full max-w-5xl
//             bg-white/10 dark:bg-black/20
//             backdrop-blur-2xl
//             border border-white/20 dark:border-gray-700/20
//             rounded-3xl p-8 shadow-xl
//           "
//         >
//           {/* Tag */}
//           <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-white/20 dark:bg-black/20 border border-white/20">
//             <Sparkles size={16} className="text-white/80" />
//             <span className="text-sm text-white/80">Community Hub</span>
//           </div>

//           {/* Slider (Auto-Switching Text) */}
//           <div className="relative overflow-hidden h-32 max-w-full">
//             {slides.map((slide, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -40 }}
//                 transition={{ duration: 0.6, delay: index * 4 }}
//                 className="absolute w-full"
//                 style={{ animation: `fadeSlide 12s infinite ${index * 4}s` }}
//               >
//                 <h1 className="text-4xl md:text-5xl font-semibold text-white">
//                   {slide.title}
//                 </h1>
//                 <p className="mt-3 text-lg text-white/80 max-w-xl">
//                   {slide.text}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* Keyframes */}
//       <style>{`
//         @keyframes fadeSlide {
//           0% { opacity: 0; transform: translateY(20px); }
//           10% { opacity: 1; transform: translateY(0px); }
//           30% { opacity: 1; transform: translateY(0px); }
//           40% { opacity: 0; transform: translateY(-20px); }
//           100% { opacity: 0; }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HeroSection;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Palette, Share2, Zap } from "lucide-react";

const slides = [
  {
    icon: Palette,
    title: "Ignite Your Creative Spark",
    text: "Join a canvas where imagination knows no borders. Discover art, share your vision, and inspire the world.",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Share2,
    title: "Collaborate Without Limits",
    text: "Bridge the gap between ideas and reality. Start projects, form teams, and create masterpieces together.",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: Zap,
    title: "Accelerate Your Growth",
    text: "Level up your skills with real-time feedback, exclusive challenges, and a community that pushes you forward.",
    color: "from-cyan-500 to-blue-500"
  }
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction) => ({
      y: 20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      y: -20,
      opacity: 0,
    }),
  };

  const CurrentIcon = slides[currentIndex].icon;

  return (
    <section className="relative w-full flex items-center justify-center px-1 py-32 overflow-hidden ">
      
      {/* Background Elements (Subtle Glows) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="
          relative z-10 w-full max-w-5xl
          bg-white/40 dark:bg-slate-900/40
          backdrop-blur-2xl
          border border-white/40 dark:border-white/10
          rounded-xl p-8 md:p-12 shadow-2xl shadow-indigo-500/10
          overflow-hidden
        "
      >
        {/* Animated Background Mesh inside card */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />

        <div className="relative z-10 flex flex-col items-start">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-white/10 border border-white/20 backdrop-blur-md mb-8"
          >
            <Sparkles size={14} className="text-amber-500" />
            <span className="text-xs font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300">
              Community Hub
            </span>
          </motion.div>

          {/* Text Slider */}
          <div className="h-48 md:h-40 w-full relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute top-0 left-0 w-full"
              >
                <div className="flex items-start gap-4 md:gap-6 flex-col md:flex-row">
                  {/* Dynamic Icon */}
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${slides[currentIndex].color} shadow-lg text-white hidden md:block`}>
                    <CurrentIcon size={32} />
                  </div>

                  <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400 pb-2">
                      {slides[currentIndex].title}
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                      {slides[currentIndex].text}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicators & CTA */}
          <div className="mt-8 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Progress Bars */}
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <div 
                  key={idx} 
                  className="h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden w-12 md:w-16"
                >
                  {idx === currentIndex && (
                    <motion.div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  )}
                  {idx < currentIndex && (
                    <div className="h-full w-full bg-slate-300 dark:bg-white/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;