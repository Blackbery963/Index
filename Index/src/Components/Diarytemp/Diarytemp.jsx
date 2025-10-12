// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const DiaryTemplate = () => {
//   // Animation variants
//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, delay: i * 0.2, ease: 'easeOut' },
//     }),
//   };

//   return (
//     <div className="py-12 xl:max-w-7xl max-w-full sm:max-w-[85%] mx-auto bg-gray-50 dark:bg-[#0a0f14] transition-colors">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-10"
//         >
//           <h1 className="text-3xl font-semibold text-gray-900 dark:text-white relative inline-block font-Quicksand">
//             Your Personal Diary
//             <motion.svg
//               className="absolute -bottom-2 left-0 w-full h-4 text-yellow-500"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               viewBox="0 0 100 10"
//             >
//               <path
//                 d="M0 5 Q25 0 50 5 T100 5"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 fill="none"
//               />
//             </motion.svg>
//           </h1>
//           <p className="mt-4 text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
//             A private space to capture your thoughts and dreams
//           </p>
//         </motion.div>

//         {/* Invite Card */}
//         <motion.div
//           variants={cardVariants}
//           initial="hidden"
//           animate="visible"
//           custom={0}
//           whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
//           className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-10 border-l-4 border-yellow-500 text-center"
//         >
//           <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
//             Begin Your Journey
//           </h2>
//           <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
//             Start your diary today and let your thoughts flow freely, capturing moments that matter.
//           </p>
//           <Link to="">
//             <button className="px-4 py-2 bg-yellow-500 text-gray-900 font-medium rounded-md hover:bg-yellow-600 transition-colors">
//               Start Writing
//             </button>
//           </Link>
//         </motion.div>

//         {/* Action Buttons */}
//         <div className="flex flex-row gap-4 justify-center mb-12">
//           <Link to="/Diaryland">
//             <button className="px-6 py-3 bg-yellow-500 text-gray-900 font-medium rounded-md hover:bg-yellow-600 transition-colors">
//               My Diary
//             </button>
//           </Link>
//           <Link to="/Diaries/Diary-Collection">
//             <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
//               Discover More
//             </button>
//           </Link>
//         </div>

//         {/* Recent Highlights */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="mt-12"
//         >
//           <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6 text-center">
//             Inspiration to Start
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {[
//               { title: 'First Reflection', image: 'https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg', text: 'A quiet moment to begin your story...' },
//               { title: 'Quiet Moment', image: 'https://images.pexels.com/photos/1280162/pexels-photo-1280162.jpeg', text: 'Capture the calm of a new day...' },
//               { title: 'Inspired Spark', image: 'https://images.pexels.com/photos/4069293/pexels-photo-4069293.jpeg', text: 'Let your creativity shine...' },
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//                 custom={index + 1}
//                 whileHover={{ scale: 1.02, rotate: 1, transition: { duration: 0.2 } }}
//                 className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
//                     {item.title}
//                   </h4>
//                   <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
//                     {item.text}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default DiaryTemplate;


import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, Search, FileText } from 'lucide-react';

const DiaryTemplate = ({ viewMode = 'feed', onDiaryAction }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2, ease: 'easeOut' },
    }),
  };

  const diaryCards = [
    { 
      title: 'First Reflection', 
      image: 'https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg', 
      text: 'A quiet moment to begin your story...',
      icon: PenTool
    },
    { 
      title: 'Quiet Moment', 
      image: 'https://images.pexels.com/photos/1280162/pexels-photo-1280162.jpeg', 
      text: 'Capture the calm of a new day...',
      icon: BookOpen
    },
    { 
      title: 'Inspired Spark', 
      image: 'https://images.pexels.com/photos/4069293/pexels-photo-4069293.jpeg', 
      text: 'Let your creativity shine...',
      icon: FileText
    },
  ];

  // Compact version for feed integration
  if (viewMode === 'feed' || viewMode === 'collage') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/10 rounded-sm p-6 shadow-lg border border-yellow-200 dark:border-yellow-800/30"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Your Creative Diary
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Capture your artistic journey and creative thoughts
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <button
            onClick={() => onDiaryAction?.('startWriting')}
            className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all group"
          >
            <PenTool className="w-5 h-5 text-yellow-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Start</span>
          </button>
          
          <Link to="/Diaryland">
            <button className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all group w-full">
              <FileText className="w-5 h-5 text-yellow-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">My Diary</span>
            </button>
          </Link>
          
          <Link to="/Diaries/Diary-Collection">
            <button className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all group w-full">
              <Search className="w-5 h-5 text-yellow-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Explore</span>
            </button>
          </Link>
        </div>

        <div className="flex gap-2">
          {diaryCards.slice(0, 2).map((card, index) => (
            <div key={index} className="flex-1">
              <div className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center line-clamp-1">
                {card.title}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Full version for standalone use
  return (
    <div className="py-12 bg-gray-50 dark:bg-[#0a0f14] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white relative inline-block">
            Your Personal Diary
            <motion.svg
              className="absolute -bottom-2 left-0 w-full h-4 text-yellow-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewBox="0 0 100 10"
            >
              <path
                d="M0 5 Q25 0 50 5 T100 5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </motion.svg>
          </h1>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            A private space to capture your thoughts and dreams
          </p>
        </motion.div>

        {/* Invite Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-10 border-l-4 border-yellow-500 text-center"
        >
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
            Begin Your Journey
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Start your diary today and let your thoughts flow freely, capturing moments that matter.
          </p>
          <button 
            onClick={() => onDiaryAction?.('startWriting')}
            className="px-4 py-2 bg-yellow-500 text-gray-900 font-medium rounded-md hover:bg-yellow-600 transition-colors"
          >
            Start Writing
          </button>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/Diaryland">
            <button className="px-6 py-3 bg-yellow-500 text-gray-900 font-medium rounded-md hover:bg-yellow-600 transition-colors w-full sm:w-auto">
              My Diary
            </button>
          </Link>
          <Link to="/Diaries/Diary-Collection">
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto">
              Discover More
            </button>
          </Link>
        </div>

        {/* Recent Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6 text-center">
            Inspiration to Start
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {diaryCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index + 1}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DiaryTemplate;