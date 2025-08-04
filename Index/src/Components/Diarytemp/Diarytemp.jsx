// import React, { useEffect } from 'react';
// import DiarytempBack from './Diarytemp-images/people-2587310.jpg';
// import mainCenter from './Diarytemp-images/pexels-veeterzy-39811.jpg';
// import topleft from './Diarytemp-images/zaki-ahmed-h0NsueWIdzw-unsplash.jpg';
// import leftBottom from './Diarytemp-images/medium-shot-senior-painter-indoors.jpg';
// import { Link } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// function Diarytemp() {
//   useEffect(() => {
//     AOS.init({ duration: 1500 });
//   }, []);

//   return (
//     <div className="max-w-[95%] mx-auto rounded-md overflow-hidden min-h-[90vh] font-sans">
//       <div
//         className="h-[90vh] w-full bg-cover bg-center flex flex-col md:flex-row"
//         style={{ backgroundImage: `url(${DiarytempBack})` }}
//       >
//         {/* Left Section */}
//         <div className="md:w-[40%] w-full flex flex-col items-center justify-center p-4 md:p-6 2xl:p-8">
//           <h1 className='lg:text-left text-center lg:text-[45px] md:text-[30px] text-[25px] font-Playfair px-8 font-semibold text-yellow-100'>Pages of the Soul - A timeless Journey Through Life’s Moments</h1>
//           <h5 className='lg:text-left text-center text-white font-Upright lg:text-[25px] font-semibold px-8'>A Diary of Thoughts, Dreams, and Memories Etched in Ink, Captures the Essence of Every Heart, the Whispers of Untold Stories, and the Beauty of Emotions That Shape Our Journey Through Time</h5>
//           <div className="flex gap-4 md:gap-8 mt-6">
//             <Link to="/Diaryland">
//               <button className=" px-3 py-1 md:px-4 md:py-2 2xl:px-5 2xl:py-3 border-2 font-semibold text-slate-100 font-Playfair rounded-md border-gray-100 hover:bg-yellow-600 bg-yellow-700 transition-colors">
//                 My Diary
//               </button>
//             </Link>
//             <Link to="/Diaries/Diary-Collection">
//               <button 
//                 className="  px-3 py-1 md:px-4 md:py-2 2xl:px-5 2xl:py-3 border-2 font-semibold text-slate-100 font-Playfair rounded-md border-amber-100 hover:bg-white/10 transition-colors">
//                 Discover More
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Desktop Card Section */}
//         <div className="lg:w-[60%] w-full hidden lg:flex backdrop-blur-sm relative items-center justify-center p-4 2xl:p-6">
//           {/* Main Center - Recent Entry */}
//           <div
//             data-aos="fade-in"
//             className="h-[50%] w-[60%] max-h-[450px] max-w-[550px] 2xl:max-h-[500px] 2xl:max-w-[600px] absolute top-[15%] left-[20%] rounded-lg overflow-hidden bg-center bg-cover shadow-lg group"
//             style={{ backgroundImage: `url(${mainCenter})` }}
//           >
//             <div className="w-full h-[35%] absolute bottom-0 p-3 2xl:p-4 flex flex-col justify-center transition-all group-hover:h-[40%]">
//               <h3 className="text-white font-Playfair text-[clamp(16px,2vw,22px)] 2xl:text-[clamp(18px,1.8vw,24px)]">A Day in the Rain</h3>
//               <p className="text-gray-200 font-Upright text-[clamp(12px,1.5vw,16px)] 2xl:text-[clamp(14px,1.3vw,18px)] line-clamp-2">
//                 "The drops fell like whispers, merging with my thoughts..."
//               </p>
//             </div>
//           </div>

//           {/* Top Left - Mood Snapshot */}
//           <div
//             data-aos="fade-left"
//             className="h-[35%] w-[16%] max-h-[280px] max-w-[160px] 2xl:max-h-[320px] 2xl:max-w-[180px] absolute top-[10%] left-[10%] rounded-md overflow-hidden shadow-lg bg-slate-900"
//           >
//             <div className="w-full h-[60%]">
//               <img className="h-full w-full object-cover" src={topleft} alt="Mood" />
//             </div>
//             <div className="w-full h-[40%] bg-slate-800 flex flex-col items-center justify-center p-2 2xl:p-3">
//               <span className="text-[clamp(20px,3vw,30px)] 2xl:text-[clamp(24px,2.5vw,34px)]">🌧️</span>
//               <p className="text-white font-Upright text-[clamp(10px,1.2vw,14px)] 2xl:text-[clamp(12px,1vw,16px)] text-center">
//                 Reflective - April 1
//               </p>
//             </div>
//           </div>

//           {/* Right Bottom - Quick Action */}
//           <div
//             data-aos="fade-up"
//             className="h-[60%] w-[22%] max-h-[380px] max-w-[220px] 2xl:max-h-[420px] 2xl:max-w-[240px] border border-gray-600 bg-black/20 backdrop-blur-md absolute bottom-[10%] right-[6%] rounded-md flex flex-col items-center justify-center gap-4 p-3 2xl:p-4"
//           >
//             <div className="h-[50%] w-[50%] max-h-[120px] max-w-[120px] 2xl:max-h-[140px] 2xl:max-w-[140px] bg-gray-800 rounded-full flex items-center justify-center">
//               <span className="text-white text-[clamp(24px,4vw,36px)] 2xl:text-[clamp(28px,3.5vw,40px)]">✍️</span>
//             </div>
//             <button className="px-3 py-1 2xl:px-4 2xl:py-2 bg-white/20 text-white font-Playfair rounded-md text-[clamp(12px,1.5vw,16px)] 2xl:text-[clamp(14px,1.3vw,18px)] hover:bg-white/30 transition-colors">
//               Write Now
//             </button>
//           </div>

//           {/* Left Bottom - Timeline Snippet */}
//           <div
//             data-aos="fade-right"
//             className="w-[50%] h-[25%] max-w-[450px] max-h-[200px] 2xl:max-w-[500px] 2xl:max-h-[220px] bg-blue-300/50 backdrop-blur-md absolute bottom-[7%] left-[10%] rounded-md flex items-center shadow-md"
//           >
//             <div className="h-[90%] w-[45%] p-2 2xl:p-3">
//               <img className="h-full w-full object-cover rounded-md" src={leftBottom} alt="Timeline" />
//             </div>
//             <div className="w-[55%] h-full bg-black/70 flex flex-col justify-center p-2 2xl:p-3">
//               <p className="font-Playfair text-white text-[clamp(14px,1.8vw,18px)] 2xl:text-[clamp(16px,1.6vw,20px)]">Spring 2025</p>
//               <p className="font-Upright text-gray-200 text-[clamp(10px,1.2vw,14px)] 2xl:text-[clamp(12px,1vw,16px)] line-clamp-2">
//                 A season of renewal and quiet moments.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Card Section */}
//         <div className="lg:hidden w-full h-[50vh] relative flex flex-col items-center justify-center p-4">
//           {/* Main Center */}
//           <div
//             data-aos="fade-in"
//             className="h-[60%] w-[70%] max-h-[320px] max-w-[400px] absolute top-[10%] rounded-lg overflow-hidden bg-center bg-cover shadow-lg group"
//             style={{ backgroundImage: `url(${mainCenter})` }}
//           >
//             <div className="w-full h-[35%] bg-black/20 backdrop-blur-md absolute bottom-0 p-2 flex flex-col justify-center transition-all group-hover:h-[40%]">
//               <h3 className="text-white font-Playfair text-[clamp(14px,2vw,18px)]">A Day in the Rain</h3>
//               <p className="text-gray-200 font-Upright text-[clamp(10px,1.5vw,14px)] line-clamp-2">
//                 "The drops fell like whispers..."
//               </p>
//             </div>
//           </div>

//           {/* Top Left */}
//           <div
//             data-aos="fade-left"
//             className="h-[25%] w-[30%] max-h-[160px] max-w-[140px] absolute top-[5%] left-[5%] rounded-md overflow-hidden shadow-lg bg-slate-900"
//           >
//             <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center p-2">
//               <span className="text-[clamp(18px,3vw,24px)]">🌧️</span>
//               <p className="text-white font-Upright text-[clamp(8px,1.2vw,12px)] text-center">
//                 Reflective - April 1
//               </p>
//             </div>
//           </div>

//           {/* Bottom Right */}
//           <div
//             data-aos="fade-up"
//             className="h-[35%] w-[35%] max-h-[200px] max-w-[160px] border border-gray-600 bg-black/20 backdrop-blur-md absolute bottom-[5%] right-[5%] rounded-md flex flex-col items-center justify-center gap-2 p-2"
//           >
//             <div className="h-[40%] w-[60%] max-h-[60px] max-w-[60px] bg-gray-800 rounded-full flex items-center justify-center">
//               <span className="text-white text-[clamp(18px,3vw,24px)]">✍️</span>
//             </div>
//             <button className="px-2 py-1 bg-white/20 text-white font-Playfair rounded-md text-[clamp(10px,1.5vw,14px)] hover:bg-white/30 transition-colors">
//               Write
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Diarytemp;





// import React from 'react';
// import { Link } from 'react-router-dom';

// function DiaryTemplate() {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto px-6 py-16">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-serif font-light text-gray-900 dark:text-white mb-4">
//             Your Personal Diary
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300">
//             A private space for your thoughts and memories
//           </p>
//         </div>

//         {/* Diary Preview Card */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-12 border border-gray-200 dark:border-gray-700">
//           <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-medium text-gray-900 dark:text-white">Today's Entry</h2>
//               <span className="text-sm text-gray-500 dark:text-gray-400">June 15, 2023</span>
//             </div>
//             <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mb-4">
//               <p className="text-gray-500 dark:text-gray-400 italic">
//                 Your latest entry will appear here...
//               </p>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-sm text-gray-500 dark:text-gray-400">☀️ Sunny day</span>
//               <span className="text-sm text-gray-500 dark:text-gray-400">📍 Home</span>
//             </div>
//           </div>
//           <div className="p-4 bg-gray-50 dark:bg-gray-700/30 flex justify-between">
//             <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
//               Read More
//             </button>
//             <div className="flex gap-2">
//               <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
//                 ✏️
//               </button>
//               <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
//                 🔖
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link
//             to="/new-entry"
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
//           >
//             Write New Entry
//           </Link>
//           <Link
//             to="/entries"
//             className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center font-medium"
//           >
//             Browse Entries
//           </Link>
//         </div>

//         {/* Recent Highlights */}
//         <div className="mt-16">
//           <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6 text-center">
//             Recent Highlights
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {[1, 2, 3].map((item) => (
//               <div key={item} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
//                 <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded mb-3 flex items-center justify-center">
//                   <span className="text-gray-400 dark:text-gray-500">Entry preview</span>
//                 </div>
//                 <h4 className="font-medium text-gray-900 dark:text-white mb-1">Memory {item}</h4>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
//                   A brief preview of your diary entry will appear here...
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DiaryTemplate;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiPlus, FiBookOpen, FiStar, FiCalendar } from 'react-icons/fi';

// function DiaryTemplate() {
//   const hasEntries = false; // Change to true to see the "with entries" version
//   const recentHighlights = [
//     { id: 1, title: "First Day of Summer", preview: "The sunlight danced through the trees..." },
//     { id: 2, title: "Coffee Shop Thoughts", preview: "Watching people come and go inspired me..." },
//     { id: 3, title: "Night Sky Reflections", preview: "The constellations seemed particularly bright..." }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto px-6 py-16">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-serif font-light text-gray-900 dark:text-white mb-4">
//             {hasEntries ? "Your Personal Diary" : "Start Your Diary Journey"}
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             {hasEntries 
//               ? "A private space for your thoughts and memories" 
//               : "Capture life's moments in your own words"}
//           </p>
//         </div>

//         {/* Empty State or Diary Preview */}
//         {hasEntries ? (
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-12">
//             <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-medium text-gray-900 dark:text-white">Today's Entry</h2>
//                 <span className="text-sm text-gray-500 dark:text-gray-400">June 15, 2023</span>
//               </div>
//               <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mb-4">
//                 <p className="text-gray-500 dark:text-gray-400 italic">
//                   Your latest entry will appear here...
//                 </p>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-sm text-gray-500 dark:text-gray-400">☀️ Sunny day</span>
//                 <span className="text-sm text-gray-500 dark:text-gray-400">📍 Home</span>
//               </div>
//             </div>
//             <div className="p-4 bg-gray-50 dark:bg-gray-700/30 flex justify-between">
//               <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
//                 Read More
//               </button>
//               <div className="flex gap-2">
//                 <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
//                   ✏️
//                 </button>
//                 <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
//                   🔖
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-12 text-center">
//             <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
//               <FiBookOpen className="text-blue-600 dark:text-blue-400 text-2xl" />
//             </div>
//             <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
//               Your diary is waiting
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
//               Start documenting your thoughts, experiences, and special moments. Your future self will thank you.
//             </p>
//             <Link
//               to="/new-entry"
//               className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//             >
//               <FiPlus className="mr-2" />
//               Create First Entry
//             </Link>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
//           <Link
//             to="/new-entry"
//             className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//           >
//             <FiPlus className="mr-2" />
//             New Entry
//           </Link>
//           <Link
//             to="/entries"
//             className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
//           >
//             <FiBookOpen className="mr-2" />
//             {hasEntries ? "All Entries" : "How It Works"}
//           </Link>
//         </div>

//         {/* Recent Highlights */}
//         <div className="mt-8">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-medium text-gray-900 dark:text-white">
//               Inspiration for Your Diary
//             </h3>
//             <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">
//               <FiCalendar className="mr-1" /> View prompts
//             </button>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {recentHighlights.map((highlight) => (
//               <div 
//                 key={highlight.id} 
//                 className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow group"
//               >
//                 <div className="flex items-center mb-3">
//                   <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-3">
//                     <FiStar className="text-blue-600 dark:text-blue-400" />
//                   </div>
//                   <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                     {highlight.title}
//                   </h4>
//                 </div>
//                 <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
//                   {highlight.preview}
//                 </p>
//                 <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
//                   Use this idea <FiPlus className="ml-1" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DiaryTemplate;




import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DiaryTemplate = () => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2, ease: 'easeOut' },
    }),
  };

  return (
    <div className="py-12 max-w-[95%] mx-auto bg-gray-50 dark:bg-[#0a0f14] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white relative inline-block font-Quicksand">
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
          <Link to="/january">
            <button className="px-4 py-2 bg-yellow-500 text-gray-900 font-medium rounded-md hover:bg-yellow-600 transition-colors">
              Start Writing
            </button>
          </Link>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-4 justify-center mb-12">
          <Link to="/Diaryland">
            <button className="px-6 py-3 bg-yellow-500 text-gray-900 font-medium rounded-md hover:bg-yellow-600 transition-colors">
              My Diary
            </button>
          </Link>
          <Link to="/Diaries/Diary-Collection">
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
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
            {[
              { title: 'First Reflection', image: 'https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg', text: 'A quiet moment to begin your story...' },
              { title: 'Quiet Moment', image: 'https://images.pexels.com/photos/1280162/pexels-photo-1280162.jpeg', text: 'Capture the calm of a new day...' },
              { title: 'Inspired Spark', image: 'https://images.pexels.com/photos/4069293/pexels-photo-4069293.jpeg', text: 'Let your creativity shine...' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index + 1}
                whileHover={{ scale: 1.02, rotate: 1, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DiaryTemplate;