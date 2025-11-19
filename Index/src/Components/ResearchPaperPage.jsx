// import { motion } from 'framer-motion';
// import { FiArrowRight, FiBookOpen, FiUsers, FiShare2, FiArrowLeft, FiArrowRight as FiArrowRightIcon, FiDownload, FiHeart } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import { useState, useRef } from 'react';

// const ArtResearchPage = ({ viewMode = 'feed', onResearchAction }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const sliderRef = useRef(null);

//   const featuredPapers = [
//     {
//       id: 1,
//       title: "Digital Brushstrokes: AI in Contemporary Art Creation",
//       authors: "Dr. Maria Chen, Prof. Alejandro Rodriguez",
//       excerpt: "Exploring how neural networks and machine learning algorithms are revolutionizing artistic creation processes and challenging traditional notions of authorship in the digital age.",
//       image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
//       category: "AI & Technology",
//       reads: "2.4K",
//       citations: "127",
//       publishDate: "2024",
//       abstract: "This paper examines the intersection of artificial intelligence and contemporary art practices, focusing on how algorithms are being used as creative partners rather than mere tools.",
//       tags: ["Artificial Intelligence", "Digital Art", "Creative Algorithms", "Contemporary Practice"]
//     },
//     {
//       id: 2,
//       title: "The Minimalist Aesthetic: Reduction as Expression in 21st Century Art",
//       authors: "Dr. Satoshi Yamamoto",
//       excerpt: "Analyzing how minimalist principles have evolved from mid-century modernism to become a powerful expressive language in contemporary global art movements.",
//       image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop",
//       category: "Aesthetics & Philosophy",
//       reads: "1.8K",
//       citations: "89",
//       publishDate: "2023",
//       abstract: "This research traces the development of minimalist aesthetics across different cultural contexts and explores its psychological impact on contemporary viewers.",
//       tags: ["Minimalism", "Aesthetics", "Contemporary Art", "Visual Psychology"]
//     },
//     {
//       id: 3,
//       title: "Street Art as Social Commentary: Urban Spaces as Democratic Canvases",
//       authors: "J. Banks Collective Research Team",
//       excerpt: "Investigating how street art transforms public spaces into platforms for cultural dialogue, political expression, and community engagement in global urban environments.",
//       image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
//       category: "Social & Cultural Studies",
//       reads: "3.1K",
//       citations: "214",
//       publishDate: "2024",
//       abstract: "This comprehensive study documents the evolution of street art from vandalism to recognized art form and its role in shaping urban identity and social discourse.",
//       tags: ["Street Art", "Urban Studies", "Social Commentary", "Public Space"]
//     },
//     {
//       id: 4,
//       title: "Color Theory Reimagined: Neuroscience of Visual Perception in Abstract Art",
//       authors: "Dr. Elena Vasquez, Prof. James Fitzgerald",
//       excerpt: "Bridging neuroscience and art theory to understand how the human brain processes abstract compositions and color relationships in non-representational art.",
//       image: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=600&h=400&fit=crop",
//       category: "Neuroscience & Perception",
//       reads: "1.2K",
//       citations: "67",
//       publishDate: "2023",
//       abstract: "Using fMRI and eye-tracking technology, this research reveals how abstract art activates different neural pathways compared to representational artwork.",
//       tags: ["Neuroscience", "Color Theory", "Abstract Art", "Visual Perception"]
//     }
//   ];

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % featuredPapers.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + featuredPapers.length) % featuredPapers.length);
//   };

//   // Compact version for feed integration
//   if (viewMode === 'feed' || viewMode === 'collage') {
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/10 rounded-sm p-6 shadow-lg border border-blue-200 dark:border-blue-800/30"
//       >
//         <div className="flex items-start gap-4 mb-6">
//           <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
//             <FiBookOpen className="w-6 h-6 text-white" />
//           </div>
//           <div className="flex-1">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
//               Art Research Papers
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-300">
//               Academic insights into artistic techniques and cultural trends
//             </p>
//           </div>
//         </div>

//         {/* Research Papers Slider */}
//         <div className="relative mb-6">
//           <div className="overflow-hidden rounded-xl">
//             <motion.div
//               className="flex"
//               animate={{ x: `-${currentSlide * 100}%` }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             >
//               {featuredPapers.slice(0, 3).map((paper) => (
//                 <div key={paper.id} className="w-full flex-shrink-0">
//                   <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700">
//                     <div className="flex gap-3 mb-3">
//                       <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
//                         <img 
//                           src={paper.image} 
//                           alt={paper.title}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-start justify-between mb-1">
//                           <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
//                             {paper.category}
//                           </span>
//                           <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
//                             <FiUsers className="w-3 h-3" />
//                             {paper.reads}
//                           </span>
//                         </div>
//                         <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
//                           {paper.title}
//                         </h4>
//                         <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
//                           {paper.excerpt}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                           {paper.authors}
//                         </p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <button className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
//                           <FiBookOpen className="w-3 h-3" />
//                           Read Abstract
//                         </button>
//                         <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
//                           <FiDownload className="w-3 h-3" />
//                           PDF
//                         </button>
//                       </div>
//                       <span className="text-xs text-gray-500 dark:text-gray-400">
//                         {paper.publishDate}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </motion.div>
//           </div>

//           {/* Slider Controls */}
//           {featuredPapers.length > 1 && (
//             <div className="flex justify-between items-center mt-4">
//               <button
//                 onClick={prevSlide}
//                 className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//               >
//                 <FiArrowLeft className="w-4 h-4" />
//               </button>
              
//               <div className="flex gap-2">
//                 {featuredPapers.slice(0, 3).map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentSlide(index)}
//                     className={`w-2 h-2 rounded-full transition-all ${
//                       currentSlide === index 
//                         ? 'bg-blue-500 w-4' 
//                         : 'bg-gray-300 dark:bg-gray-600'
//                     }`}
//                   />
//                 ))}
//               </div>

//               <button
//                 onClick={nextSlide}
//                 className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//               >
//                 <FiArrowRightIcon className="w-4 h-4" />
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="flex gap-2">
//           <Link to="/Community/Resources/ResourceHub" className="flex-1">
//             <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
//               <FiBookOpen className="w-4 h-4" />
//               Research Library
//             </button>
//           </Link>
//           <Link to="/Community/Resources/ResourceUpload" className="flex-1">
//             <button className="w-full py-2 border border-blue-500 text-blue-500 dark:text-blue-400 text-sm font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2">
//               <FiShare2 className="w-4 h-4" />
//               Submit Paper
//             </button>
//           </Link>
//         </div>
//       </motion.div>
//     );
//   }

//   // Full version for standalone use
//   return (
//     <div className="min-h-screen bg-white dark:bg-[#0a0f14] lg:max-w-7xl max-w-full mx-auto px-4 py-12 text-gray-800 dark:text-gray-200">
//       {/* Header */}
//       <div className="max-w-4xl mx-auto text-center mb-16">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6">
//             <FiBookOpen className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//             Art Research Archive
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//             Scholarly research bridging art theory, practice, and interdisciplinary studies
//           </p>
//         </motion.div>

//         {/* Stats */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-12"
//         >
//           <div className="text-center">
//             <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">156</div>
//             <div className="text-sm text-gray-600 dark:text-gray-400">Published Papers</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-green-600 dark:text-green-400">4.2K</div>
//             <div className="text-sm text-gray-600 dark:text-gray-400">Active Researchers</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">89</div>
//             <div className="text-sm text-gray-600 dark:text-gray-400">Academic Institutions</div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Featured Research Slider */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.3 }}
//         className="mb-16"
//       >
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Featured Research
//           </h2>
//           <div className="flex gap-2">
//             <button 
//               onClick={prevSlide}
//               className="p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-lg"
//             >
//               <FiArrowLeft className="w-5 h-5" />
//             </button>
//             <button 
//               onClick={nextSlide}
//               className="p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-lg"
//             >
//               <FiArrowRightIcon className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         <div className="relative overflow-hidden rounded-2xl">
//           <motion.div
//             className="flex"
//             animate={{ x: `-${currentSlide * 100}%` }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             ref={sliderRef}
//           >
//             {featuredPapers.map((paper) => (
//               <div key={paper.id} className="w-full flex-shrink-0">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/10 rounded-2xl p-8">
//                   {/* Paper Image */}
//                   <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl">
//                     <img 
//                       src={paper.image} 
//                       alt={paper.title}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//                     <div className="absolute bottom-4 left-4">
//                       <span className="text-white bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
//                         {paper.category}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Paper Details */}
//                   <div className="flex flex-col justify-between">
//                     <div>
//                       <div className="flex items-center gap-4 mb-4">
//                         <span className="text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-sm font-medium">
//                           {paper.publishDate}
//                         </span>
//                         <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
//                           <span className="flex items-center gap-1">
//                             <FiUsers className="w-4 h-4" />
//                             {paper.reads} reads
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <FiShare2 className="w-4 h-4" />
//                             {paper.citations} citations
//                           </span>
//                         </div>
//                       </div>

//                       <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//                         {paper.title}
//                       </h3>
                      
//                       <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
//                         {paper.excerpt}
//                       </p>

//                       <div className="mb-6">
//                         <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
//                           Authors
//                         </h4>
//                         <p className="text-gray-600 dark:text-gray-400 text-sm">
//                           {paper.authors}
//                         </p>
//                       </div>

//                       <div className="mb-6">
//                         <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
//                           Abstract
//                         </h4>
//                         <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
//                           {paper.abstract}
//                         </p>
//                       </div>

//                       <div className="flex flex-wrap gap-2 mb-6">
//                         {paper.tags.map((tag, index) => (
//                           <span key={index} className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-300 dark:border-gray-600">
//                             #{tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex gap-3">
//                       <button className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
//                         <FiBookOpen className="w-5 h-5" />
//                         Read Full Paper
//                       </button>
//                       <button className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
//                         <FiDownload className="w-5 h-5" />
//                       </button>
//                       <button className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
//                         <FiHeart className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         </div>

//         {/* Slider Indicators */}
//         <div className="flex justify-center gap-3 mt-6">
//           {featuredPapers.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all ${
//                 currentSlide === index 
//                   ? 'bg-blue-500 w-8' 
//                   : 'bg-gray-300 dark:bg-gray-600'
//               }`}
//             />
//           ))}
//         </div>
//       </motion.div>

//       {/* CTA Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.6 }}
//         className="text-center"
//       >
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/10 rounded-2xl p-12">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//             Contribute to Art Research
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
//             Join our community of researchers, artists, and scholars pushing the boundaries of artistic knowledge and practice.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link to="/Community/Resources/ResourceHub">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all font-semibold flex items-center gap-3"
//               >
//                 <FiBookOpen className="w-5 h-5" />
//                 Explore Research Library
//               </motion.button>
//             </Link>
//             <Link to="/Community/Resources/ResourceUpload">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-4 border-2 border-blue-500 text-blue-500 dark:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-semibold flex items-center gap-3"
//               >
//                 <FiShare2 className="w-5 h-5" />
//                 Submit Your Research
//               </motion.button>
//             </Link>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ArtResearchPage;


import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiDownload, FiHeart, FiBookOpen, FiUsers, FiShare2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ArtResearchPage = ({ viewMode = 'feed' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const papers = [
    {
      id: 1,
      title: "Digital Brushstrokes: AI in Contemporary Art Creation",
      authors: "Dr. Maria Chen & Prof. Alejandro Rodriguez",
      excerpt: "Exploring how neural networks are becoming creative partners rather than tools.",
      category: "AI & Technology",
      reads: "2.4K",
      citations: "127",
      year: "2024",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
      tags: ["AI Art", "Machine Learning", "Authorship"]
    },
    {
      id: 2,
      title: "The Minimalist Aesthetic: Reduction as Expression",
      authors: "Dr. Satoshi Yamamoto",
      excerpt: "How silence and empty space became the loudest voice in modern art.",
      category: "Aesthetics",
      reads: "1.8K",
      citations: "89",
      year: "2023",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
      tags: ["Minimalism", "Zen", "Space"]
    },
    {
      id: 3,
      title: "Street Art as Social Commentary",
      authors: "J. Banks Collective",
      excerpt: "When walls become the most democratic gallery in the world.",
      category: "Urban Studies",
      reads: "3.1K",
      citations: "214",
      year: "2024",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop",
      tags: ["Street Art", "Activism", "Public Space"]
    }
  ];

  const next = () => setCurrentSlide((p) => (p + 1) % papers.length);
  const prev = () => setCurrentSlide((p) => (p - 1 + papers.length) % papers.length);

  // Compact Feed Version — Ultra Clean Outlined Style
  if (viewMode === 'feed' || viewMode === 'collage') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full rounded-sm border border-gray-300 dark:border-gray-700 p-2 bg-transparent"
      >
        {/* TOP BOX */}
        <div className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <FiBookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Art Research Papers</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Latest academic insights</p>
            </div>
          </div>
          <Link to="/Community/Resources/ResourceHub" className="text-purple-600 dark:text-purple-400 text-xs font-medium hover:underline">
            View all →
          </Link>
        </div>

        {/* MIDDLE BOX - Slider */}
        <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden mb-2">
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              >
                {papers.map((paper) => (
                  <div key={paper.id} className="w-full flex-shrink-0">
                    <div className="p-4">
                      <div className="flex gap-3">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
                          <img src={paper.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium">
                            {paper.category}
                          </span>
                          <h4 className="font-semibold text-gray-900 dark:text-white mt-1.5 line-clamp-2 text-sm">
                            {paper.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {paper.excerpt}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {paper.authors} • {paper.year}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-1.5 py-2 bg-gray-50 dark:bg-gray-800/50">
              {papers.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1 rounded-full transition-all ${
                    i === currentSlide ? "bg-purple-600 w-6" : "bg-gray-300 dark:bg-gray-600 w-1.5"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BOX - Actions */}
        <div className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3">
          <div className="flex gap-3">
            <Link to="/Community/Resources/ResourceHub" className="flex-1">
              <button className="w-full py-2 text-sm font-medium text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-800 rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                Browse Library
              </button>
            </Link>
            <Link to="/Community/Resources/ResourceUpload" className="flex-1">
              <button className="w-full py-2 text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors flex items-center justify-center gap-1.5">
                <FiShare2 className="w-3.5 h-3.5" />
                Submit Paper
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // Full Standalone Version — Still Ultra Minimal & Outlined
  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-sm border border-gray-300 dark:border-gray-700 p-2 bg-transparent"
      >
        {/* Header */}
        <div className="border border-gray-300 dark:border-gray-700 rounded-md px-6 py-8 text-center mb-3">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <FiBookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Art Research Archive</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Scholarly papers • Theory • Practice • Innovation</p>
        </div>

        {/* Featured Slider */}
        <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden mb-3">
          <div className="relative">
            <motion.div
              className="flex"
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
            >
              {papers.map((paper) => (
                <div key={paper.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Image */}
                    <div className="relative h-64 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                      <img src={paper.image} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute bottom-4 left-4 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                        {paper.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                          {paper.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                          {paper.excerpt}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                          {paper.authors} • {paper.year}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {paper.tags.map((tag, i) => (
                            <span key={i} className="text-xs px-2.5 py-1 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-6">
                        <button className="flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                          <FiBookOpen className="w-4 h-4" />
                          Read Paper
                        </button>
                        <button className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <FiDownload className="w-4 h-4" />
                        </button>
                        <button className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <FiHeart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Controls */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <FiArrowRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {papers.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentSlide ? "bg-white w-8" : "bg-white/50 w-1.5"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border border-gray-300 dark:border-gray-700 rounded-md px-6 py-5 text-center">
          <Link to="/Community/Resources/ResourceHub">
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-md transition-all mb-3">
              Explore Full Research Library
            </button>
          </Link>
          <Link to="/Community/Resources/ResourceUpload">
            <button className="w-full py-3 border border-purple-600 text-purple-600 dark:text-purple-400 font-medium rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
              Submit Your Research Paper
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ArtResearchPage;