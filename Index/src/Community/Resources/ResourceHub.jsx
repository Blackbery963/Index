// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MdClose } from 'react-icons/md';
// import { FiMenu } from 'react-icons/fi';

// function ResourcesHub() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [selectedResource, setSelectedResource] = useState(null);

//   // Resource categories
//   const categories = [
//     { id: 'all', name: 'All Resources' },
//     { id: 'articles', name: 'Articles' },
//     { id: 'guides', name: 'Guides & Tutorials' },
//     { id: 'templates', name: 'Templates' },
//     { id: 'research', name: 'Research Papers' },
//     { id: 'tools', name: 'Tools & Resources' }
//   ];

//   // Resource data with Pexels images and diverse research topics
//   const resources = [
//     {
//       id: 1,
//       title: 'Mastering Digital Painting',
//       category: 'guides',
//       type: 'PDF',
//       size: '12.4 MB',
//       downloads: 1243,
//       description: 'A comprehensive 120-page guide covering digital painting techniques, from basic brushwork to advanced rendering methods for professional results.',
//       thumbnail: 'https://images.pexels.com/photos/1699418/pexels-photo-1699418.jpeg',
//       file: '/mastering-digital-painting.pdf',
//       author: 'Art Education Foundation',
//       date: '2025-03-15'
//     },
//     {
//       id: 2,
//       title: 'Color Theory in Modern Art',
//       category: 'articles',
//       type: 'Article',
//       size: '8 min read',
//       downloads: 876,
//       description: 'Explore how color theory shapes contemporary art, with practical examples for applying vibrant palettes in your work.',
//       thumbnail: 'https://images.pexels.com/photos/663487/pexels-photo-663487.jpeg',
//       file: '/color-theory-article.html',
//       author: 'Maria Chen',
//       date: '2025-02-22'
//     },
//     {
//       id: 3,
//       title: 'Character Design Template Pack',
//       category: 'templates',
//       type: 'PSD',
//       size: '24.7 MB',
//       downloads: 2105,
//       description: 'A set of 10 customizable PSD templates for character design, featuring organized layers and smart objects for easy editing.',
//       thumbnail: 'https://images.pexels.com/photos/2089388/pexels-photo-2089388.jpeg',
//       file: '/character-design-templates.zip',
//       author: 'Design Resources Co.',
//       date: '2025-04-10'
//     },
//     {
//       id: 4,
//       title: 'Visual Perception in Art: A Cognitive Study',
//       category: 'research',
//       type: 'Research Paper',
//       size: '3.2 MB',
//       downloads: 542,
//       description: 'An academic study exploring how cognitive processes influence the perception and interpretation of visual art, with focus on viewer psychology.',
//       thumbnail: 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg',
//       file: '/visual-perception-research.pdf',
//       author: 'Dr. James Wilson',
//       date: '2025-01-05'
//     },
//     {
//       id: 5,
//       title: 'Ultimate Brush Collection',
//       category: 'tools',
//       type: 'ABR',
//       size: '58.9 MB',
//       downloads: 3876,
//       description: 'Over 200 high-quality Photoshop brushes for various painting styles, including watercolor, oil, and digital sketching.',
//       thumbnail: 'https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg',
//       file: '/ultimate-brush-collection.abr',
//       author: 'Digital Art Tools',
//       date: '2025-05-18'
//     },
//     {
//       id: 6,
//       title: 'Composition Mastery: Video Course',
//       category: 'guides',
//       type: 'Video',
//       size: '45 min',
//       downloads: 1567,
//       description: 'A detailed video tutorial covering essential composition techniques for visual arts, with practical examples and exercises.',
//       thumbnail: 'https://images.pexels.com/photos/342005/pexels-photo-342005.jpeg',
//       file: '/composition-mastery-video.mp4',
//       author: 'Creative Tutorials',
//       date: '2025-03-28'
//     },
//     {
//       id: 7,
//       title: 'Art Therapy and Emotional Expression',
//       category: 'research',
//       type: 'Research Paper',
//       size: '4.1 MB',
//       downloads: 678,
//       description: 'A study on the therapeutic benefits of art creation, focusing on how artistic expression aids emotional regulation and mental health.',
//       thumbnail: 'https://images.pexels.com/photos/1485793/pexels-photo-1485793.jpeg',
//       file: '/art-therapy-research.pdf',
//       author: 'Dr. Emily Carter',
//       date: '2025-02-10'
//     },
//     {
//       id: 8,
//       title: 'Perspective Grid Templates',
//       category: 'templates',
//       type: 'AI',
//       size: '7.8 MB',
//       downloads: 1789,
//       description: 'Vector perspective grids for 1, 2, and 3-point perspective drawing, compatible with Adobe Illustrator and other vector software.',
//       thumbnail: 'https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg',
//       file: '/perspective-grids.ai',
//       author: 'Design Assets',
//       date: '2025-04-30'
//     },
//     {
//       id: 9,
//       title: 'AI in Art: Creative Applications',
//       category: 'research',
//       type: 'Research Paper',
//       size: '2.8 MB',
//       downloads: 432,
//       description: 'An exploration of how artificial intelligence is transforming artistic creation, with case studies on AI-generated art and tools.',
//       thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
//       file: '/ai-in-art-research.pdf',
//       author: 'Dr. Sarah Lin',
//       date: '2025-06-12'
//     },
//     {
//       id: 10,
//       title: 'Cultural Influences on Modern Art',
//       category: 'research',
//       type: 'Research Paper',
//       size: '3.9 MB',
//       downloads: 589,
//       description: 'A cross-cultural analysis of how global traditions shape contemporary art practices, with focus on Asian, African, and Indigenous influences.',
//       thumbnail: 'https://images.pexels.com/photos/4275890/pexels-photo-4275890.jpeg',
//       file: '/cultural-influences-research.pdf',
//       author: 'Dr. Aisha Khan',
//       date: '2025-05-25'
//     }
//   ];

//   // Filter resources based on search and category
//   const filteredResources = resources.filter(resource => {
//     const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   // Format date
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   // Handle download
//   const handleDownload = (file) => {
//     console.log(`Downloading ${file}`);
//     alert(`Downloading: ${file}`);
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 pb-24">
//       {/* Navigation */}
      // <motion.nav
      //   initial={{ y: -50, opacity: 0 }}
      //   animate={{ y: 0, opacity: 1 }}
      //   transition={{ duration: 0.6, ease: "easeOut" }}
      //   className="fixed top-4 left-4 right-4 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl"
      // >
      //   <div className="px-6 py-4 sm:px-8 flex justify-between items-center">
      //     <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Eagle">
      //       ArtVerse
      //     </Link>
          
      //     <div className="hidden md:flex items-center gap-8">
      //       {[
      //         {name: 'Home', path: '/'},
      //         {name: 'Challenges', path: '/challenges'},
      //         {name: 'Resources', path: '/Community/Resources/ResourceHub'},
      //         {name: 'Community', path: '/Community'}
      //       ].map((item) => (
      //         <motion.div
      //           key={item.name}
      //           whileHover={{ scale: 1.1 }}
      //           whileTap={{ scale: 0.95 }}
      //           className="relative group"
      //         >
      //           <Link
      //             to={item.path}
      //             className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-semibold font-Playfair transition-colors duration-300"
      //           >
      //             {item.name}
      //           </Link>
      //           <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
      //         </motion.div>
      //       ))}
      //     </div>
          
      //     <button
      //       className="md:hidden text-gray-700 dark:text-gray-200"
      //       onClick={() => setIsMenuOpen(!isMenuOpen)}
      //       aria-label="Toggle menu"
      //     >
      //       <div fill="none" stroke="currentColor" viewBox="0 0 24 24">
      //         {isMenuOpen ? (
      //           <MdClose/>
      //         ) : (
      //           <FiMenu/>
      //         )}
      //       </div>
      //     </button>
      //   </div>
        
      //   <motion.div
      //     initial={{ height: 0, opacity: 0 }}
      //     animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
      //     transition={{ duration: 0.3, ease: "easeInOut" }}
      //     className="md:hidden overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-b-2xl"
      //   >
      //     <div className="px-6 py-4 space-y-3">
      //       {[
      //         {name: 'Home', path: '/'},
      //         {name: 'Challenges', path: '/challenges'},
      //         {name: 'Resources', path: '/resources'},
      //         {name: 'Community', path: '/community'}
      //       ].map((item) => (
      //         <Link
      //           key={item.name}
      //           to={item.path}
      //           className="block text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-semibold py-2 font-Playfair transition-colors duration-200"
      //           onClick={() => setIsMenuOpen(false)}
      //         >
      //           {item.name}
      //         </Link>
      //       ))}
      //     </div>
      //   </motion.div>
      // </motion.nav>

//       {/* Main Content */}
      // <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        // <motion.div
        //   initial={{ opacity: 0, y: 30 }}
        //   animate={{ opacity: 1, y: 0 }}
        //   transition={{ delay: 0.2, duration: 0.6 }}
        //   className="text-center mb-16"
        // >
        //   <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 mb-6 font-Quicksand">
        //     Resources Hub
        //   </h1>
        //   <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-Playfair">
        //     Discover high-quality resources to elevate your art skills and inspire your creative journey.
        //   </p>
        // </motion.div>

//         {/* Search and Filter */}
//         <div className="mb-12">
//           <div className="flex flex-col md:flex-row gap-4 mb-8">
//             <div className="relative flex-grow">
//               <input
//                 type="text"
//                 placeholder="Search resources..."
//                 className="w-full px-4 py-3 rounded-xl bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-12 font-Playfair text-gray-700 dark:text-gray-200"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <svg
//                 className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>
//             <Link to="/Community/Resources/ResourceUpload">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold font-Playfair transition-all shadow-lg"
//               >
//                 Upload Resource
//               </motion.button>
//             </Link>
//           </div>

//           {/* Category Tabs */}
          // <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
          //   {categories.map((category) => (
          //     <motion.button
          //       key={category.id}
          //       whileHover={{ scale: 1.05 }}
          //       whileTap={{ scale: 0.95 }}
          //       onClick={() => setActiveCategory(category.id)}
          //       className={`px-6 py-3 rounded-lg font-semibold text-lg font-Playfair whitespace-nowrap transition-all duration-300 ${
          //         activeCategory === category.id
          //           ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md'
          //           : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-700'
          //       }`}
          //     >
          //       {category.name}
          //     </motion.button>
          //   ))}
          // </div>
//         </div>

//         {/* Resources Grid */}
        // {filteredResources.length > 0 ? (
        //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        //     {filteredResources.map((resource) => (
        //       <motion.div
        //         key={resource.id}
        //         whileHover={{ y: -8, scale: 1.02 }}
        //         className="relative bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
        //       >
        //         <div 
        //           className="relative h-64 cursor-pointer" 
        //           onClick={() => setSelectedResource(resource)}
        //         >
        //           <img
        //             src={resource.thumbnail}
        //             alt={resource.title}
        //             className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        //           />
        //           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        //             <span className="inline-block px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-sm font-semibold rounded-lg text-gray-800 dark:text-gray-200 font-Playfair">
        //               {resource.type}
        //             </span>
        //           </div>
        //         </div>
        //         <div className="p-6">
        //           <h3 
        //             className="text-lg font-bold text-gray-800 dark:text-white mb-2 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 font-Eagle"
        //             onClick={() => setSelectedResource(resource)}
        //           >
        //             {resource.title}
        //           </h3>
        //           <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 font-Playfair">
        //             {resource.description}
        //           </p>
        //           <div className="flex justify-between items-center text-sm mb-4">
        //             <span className="text-gray-500 dark:text-gray-400 font-Playfair">{resource.size}</span>
        //             <span className="text-gray-500 dark:text-gray-400 font-Playfair">{resource.downloads.toLocaleString()} downloads</span>
        //           </div>
        //           <motion.button
        //             whileHover={{ scale: 1.05 }}
        //             whileTap={{ scale: 0.95 }}
        //             onClick={() => handleDownload(resource.file)}
        //             className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-3 rounded-lg font-semibold font-Playfair transition-all flex items-center justify-center shadow-md"
        //           >
        //             <svg
        //               xmlns="http://www.w3.org/2000/svg"
        //               className="h-5 w-5 mr-2"
        //               fill="none"
        //               viewBox="0 0 24 24"
        //               stroke="currentColor"
        //             >
        //               <path
        //                 strokeLinecap="round"
        //                 strokeLinejoin="round"
        //                 strokeWidth={2}
        //                 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        //               />
        //             </svg>
        //             Download
        //           </motion.button>
        //         </div>
        //       </motion.div>
        //     ))}
        //   </div>
        // ) : (
        //   <motion.div
        //     initial={{ opacity: 0, y: 20 }}
        //     animate={{ opacity: 1, y: 0 }}
        //     className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg p-8 text-center"
        //   >
        //     <svg
        //       className="mx-auto h-12 w-12 text-gray-400"
        //       fill="none"
        //       stroke="currentColor"
        //       viewBox="0 0 24 24"
        //     >
        //       <path
        //         strokeLinecap="round"
        //         strokeLinejoin="round"
        //         strokeWidth={2}
        //         d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        //       />
        //     </svg>
        //     <h3 className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-200 font-Eagle">
        //       No resources found
        //     </h3>
        //     <p className="mt-1 text-gray-600 dark:text-gray-400 font-Playfair">
        //       Try adjusting your search or filter to find what you're looking for.
        //     </p>
        //   </motion.div>
        // )}

//         {/* Resource Detail Modal */}
//         <AnimatePresence>
//           {selectedResource && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6"
//               onClick={() => setSelectedResource(null)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, y: 20 }}
//                 animate={{ scale: 1, y: 0 }}
//                 exit={{ scale: 0.9, y: 20 }}
//                 className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <button
//                   className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//                   onClick={() => setSelectedResource(null)}
//                 >
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//                 <div className="p-6 sm:p-8">
//                   <div className="flex flex-col lg:flex-row gap-8">
//                     <div className="lg:w-1/2">
//                       <img
//                         src={selectedResource.thumbnail}
//                         alt={selectedResource.title}
//                         className="w-full h-auto max-h-[60vh] object-contain rounded-xl shadow-lg"
//                       />
//                     </div>
//                     <div className="lg:w-1/2">
//                       <div className="flex items-center gap-3 mb-4">
//                         <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 text-sm font-semibold rounded-lg text-gray-800 dark:text-gray-200 font-Playfair">
//                           {selectedResource.type}
//                         </span>
//                         <span className="text-sm text-gray-500 dark:text-gray-400 font-Playfair">
//                           {selectedResource.category.charAt(0).toUpperCase() + selectedResource.category.slice(1)}
//                         </span>
//                       </div>
//                       <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 font-Eagle">
//                         {selectedResource.title}
//                       </h2>
//                       <p className="text-purple-600 dark:text-purple-400 mb-4 text-lg font-Playfair">
//                         by {selectedResource.author} • {formatDate(selectedResource.date)}
//                       </p>
//                       <p className="text-gray-600 dark:text-gray-300 mb-6 font-Playfair leading-relaxed">
//                         {selectedResource.description}
//                       </p>
//                       <div className="grid grid-cols-2 gap-4 mb-8">
//                         <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl shadow-inner">
//                           <p className="text-sm text-gray-500 dark:text-gray-400 font-Playfair">File Size</p>
//                           <p className="font-semibold text-gray-800 dark:text-gray-200 font-Playfair">{selectedResource.size}</p>
//                         </div>
//                         <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl shadow-inner">
//                           <p className="text-sm text-gray-500 dark:text-gray-400 font-Playfair">Downloads</p>
//                           <p className="font-semibold text-gray-800 dark:text-gray-200 font-Playfair">
//                             {selectedResource.downloads.toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => handleDownload(selectedResource.file)}
//                         className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-3 rounded-lg font-semibold font-Playfair transition-all flex items-center justify-center shadow-lg"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-5 w-5 mr-2"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                           />
//                         </svg>
//                         Download Resource
//                       </motion.button>
//                     </div>
//                   </div>
//                   <div className="mt-8">
//                     <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 font-Eagle">About This Resource</h3>
//                     <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
//                       <p className="text-gray-600 dark:text-gray-300 font-Playfair leading-relaxed">
//                         This resource is provided for educational purposes. Please respect the author's rights and terms of use.
//                         {selectedResource.type === 'Article' ? ' You can read this article online or download the PDF version.' : ''}
//                       </p>
//                       {selectedResource.type !== 'Article' && (
//                         <div className="mt-4">
//                           <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 font-Playfair">File Details</h4>
//                           <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 font-Playfair">
//                             <li>• Format: {selectedResource.type}</li>
//                             <li>• Compatible with most modern software</li>
//                             <li>• High-quality resolution</li>
//                           </ul>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// export default ResourcesHub;




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose, MdDownload, MdSearch, MdShare } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';
import { databases, storage } from '../../appwriteConfig';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const thumbnailDb = import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID;
const researchCollection = import.meta.env.VITE_APPWRITE_RESEARCH_COLLECTION_ID;
const researchBucket = import.meta.env.VITE_APPWRITE_RESEARCH_BUCKET_ID;

function ResourcesHub() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'articles', name: 'Articles' },
    { id: 'guides', name: 'Guides & Tutorials' },
    { id: 'templates', name: 'Templates' },
    { id: 'research', name: 'Research Papers' },
    { id: 'tools', name: 'Tools & Resources' },
  ];

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const response = await databases.listDocuments(thumbnailDb, researchCollection);
        const formattedResources = await Promise.all(
          response.documents.map(async (doc) => {
            const thumbnailUrl = storage.getFilePreview(researchBucket, doc.thumbnailId);
            let fileUrl = '#';
            if (doc.fileId) {
              fileUrl = storage.getFileDownload(researchBucket, doc.fileId);
            }
            return {
              id: doc.$id,
              title: doc.title,
              category: doc.category,
              type: doc.type,
              size: doc.size,
              downloads: doc.downloads || 0,
              description: doc.description,
              thumbnail: thumbnailUrl,
              fileId: doc.fileId,
              thumbnailId: doc.thumbnailId,
              fileUrl: fileUrl,
              author: doc.author,
              date: doc.date,
            };
          })
        );
        setResources(formattedResources);
      } catch (error) {
        console.error('Error fetching resources:', error);
        toast.error('Failed to load resources');
      } finally {
        setIsLoading(false);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isNewResource = (dateString) => {
    const resourceDate = new Date(dateString);
    const now = new Date();
    const diffDays = (now - resourceDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 7; // Consider resources newer than 7 days as "new"
  };

  // const handleDownload = async (resource) => {
  //   try {
  //     await databases.updateDocument(thumbnailDb, researchCollection, resource.id, {
  //       downloads: resource.downloads + 1,
  //     });
  //     setResources((prev) =>
  //       prev.map((r) => (r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r))
  //     );
  //     if (resource.fileId) {
  //       const downloadUrl = storage.getFileDownload(researchBucket, resource.fileId);
  //       const link = document.createElement('a');
  //       link.href = downloadUrl;
  //       link.download = `${resource.title}.${resource.type.toLowerCase()}`;
  //       link.click();
  //     } else {
  //       window.open(resource.fileUrl, '_blank');
  //     }
  //     toast.success('Download started!');
  //   } catch (error) {
  //     console.error('Download failed:', error);
  //     toast.error('Failed to start download');
  //   }
  // };


  const handleDownload = async (resource) => {
  try {
    // Update download count
    await databases.updateDocument(thumbnailDb, researchCollection, resource.id, {
      downloads: resource.downloads + 1,
    });
    setResources((prev) =>
      prev.map((r) => (r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r))
    );

    // Create a hidden HTML element for rendering
    const element = document.createElement('div');
    element.style.width = '600px';
    element.style.padding = '20px';
    element.style.fontFamily = 'Arial';
    element.style.backgroundColor = '#fff';
    element.innerHTML = `
      <h1 style="font-size: 24px; margin-bottom: 10px;">${resource.title}</h1>
      <p><strong>Description:</strong> ${resource.description || 'N/A'}</p>
      <p><strong>Medium:</strong> ${resource.medium || 'N/A'}</p>
      <p><strong>Tags:</strong> ${resource.tags?.join(', ') || 'N/A'}</p>
      <img src="${resource.thumbnailUrl || resource.imageUrl}" style="max-width: 100%; margin-top: 15px;" />
    `;
    document.body.appendChild(element);

    // Convert to canvas
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    // Create PDF
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const imgRatio = imgProps.width / imgProps.height;
    const pdfWidth = pageWidth - 40;
    const pdfHeight = pdfWidth / imgRatio;

    pdf.addImage(imgData, 'PNG', 20, 20, pdfWidth, pdfHeight);
    const filename = `${resource.title.replace(/\s+/g, '_')}.pdf`;
    pdf.save(filename);

    // Cleanup
    document.body.removeChild(element);
    toast.success('PDF download started!');
  } catch (error) {
    console.error('PDF generation failed:', error);
    toast.error('Failed to download as PDF');
  }
};




  const handleShare = (resource) => {
    // Placeholder for share functionality
    toast.info('Share functionality coming soon!');
  };

  const ResourceModal = ({ resource, onClose }) => {
    if (!resource) return null;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-6 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-gray-200 dark:border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={onClose}
            aria-label="Close modal"
          >
            <MdClose className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <div className="sticky top-6 bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg shadow-inner">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-auto max-h-[50vh] object-contain rounded-lg shadow-md"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/300?text=Image+Not+Found')}
                  />
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center shadow-sm">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-Playfair">File Size</p>
                      <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{resource.size}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center shadow-sm">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-Playfair">Downloads</p>
                      <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                        {resource.downloads.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleDownload(resource)}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center shadow-md transition-all duration-200"
                    >
                      <MdDownload className="w-5 h-5 mr-2" />
                      Download Resource
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleShare(resource)}
                      className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center shadow-md transition-all duration-200"
                    >
                      <MdShare className="w-5 h-5 mr-2" />
                      Share Resource
                    </motion.button>
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-xs font-medium rounded-full text-indigo-800 dark:text-indigo-200">
                    {resource.type}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                  </span>
                  {isNewResource(resource.date) && (
                    <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/50 text-xs font-medium rounded-full text-green-800 dark:text-green-200">
                      New
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2 font-Quicksand leading-tight">
                  {resource.title}
                </h2>
                <p className="text-indigo-600 dark:text-indigo-400 text-sm mb-4 font-Playfair">
                  by {resource.author} • {formatDate(resource.date)}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2 font-Roboto">
                    Description
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
                    <div
                      className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-Playfair shadow-inner border p-4 rounded-lg"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(resource.description, {
                          USE_PROFILES: { html: true },
                          ALLOWED_TAGS: ['p', 'a', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'blockquote', 'code', 'pre', 'hr'],
                          ALLOWED_ATTR: ['href', 'target', 'rel'],
                        }),
                      }}
                    />
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 font-Roboto">About This Resource</h3>
                  <div className="text-gray-600 dark:text-gray-300 text-sm space-y-3 font-Playfair">
                    <p>This resource is provided for educational purposes. Please respect the author's rights and terms of use.</p>
                    {resource.type !== 'Article' && (
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">File Details</h4>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Format: {resource.type}</li>
                          <li>Compatible with most modern software</li>
                          <li>High-quality resolution</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-900">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-4 left-4 right-4 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg"
      >
        <div className="px-4 py-3 sm:px-6 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent font-Quicksand">
            ArtVerse
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {[
              { name: 'Home', path: '/' },
              { name: 'Challenges', path: '/challenges' },
              { name: 'Resources', path: '/Community/Resources/ResourceHub' },
              { name: 'Community', path: '/Community' },
            ].map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Link
                  to={item.path}
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium font-Playfair transition-colors duration-200"
                >
                  {item.name}
                </Link>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
              </motion.div>
            ))}
          </div>
          <button
            className="md:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <MdClose className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-b-xl"
        >
          <div className="px-4 py-3 space-y-2">
            {[
              { name: 'Home', path: '/' },
              { name: 'Challenges', path: '/challenges' },
              { name: 'Resources', path: '/resources' },
              { name: 'Community', path: '/community' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 font-Playfair transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent font-Quicksand">
            Resources Hub
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-3 font-Playfair">
            Explore a curated collection of resources to inspire and elevate your creative journey.
          </p>
        </motion.div>

        <div className="mb-10">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full px-4 py-3 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10 text-gray-700 dark:text-gray-200 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MdSearch className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            <Link to="/Community/Resources/ResourceUpload">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium text-sm transition-all shadow-md"
              >
                Upload Resource
              </motion.button>
            </Link>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-indigo-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(category.id)}
                className={` whitespace-nowrap px-4 py-2 rounded-lg font-medium text-sm font-Playfair transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                    : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                className="relative bg-white/90 dark:bg-gray-800/90 rounded-xl overflow-hidden border border-transparent hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-300"
              >
                <div className="relative h-60 cursor-pointer" onClick={() => setSelectedResource(resource)}>
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/300?text=Image+Not+Found')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end">
                    <span className="inline-block px-2 py-1 bg-white/90 dark:bg-gray-800/90 text-xs font-medium rounded-full text-gray-800 dark:text-gray-200 font-Playfair">
                      {resource.type}
                    </span>
                    {isNewResource(resource.date) && (
                      <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/50 text-xs font-medium rounded-full text-green-800 dark:text-green-200">
                        New
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3
                    className="text-lg font-semibold text-gray-800 dark:text-white mb-2 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 font-Quicksand line-clamp-1"
                    onClick={() => setSelectedResource(resource)}
                  >
                    {resource.title}
                  </h3>
                  <div
                    className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 font-Playfair leading-snug"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        resource.description.length > 100 ? resource.description.substring(0, 100) + '...' : resource.description,
                        { USE_PROFILES: { html: false }, ALLOWED_TAGS: [] }
                      ),
                    }}
                  />
                  <div className="flex justify-between items-center text-xs mb-3 text-gray-500 dark:text-gray-400 font-Playfair">
                    <span>{resource.size}</span>
                    <span>{resource.downloads.toLocaleString()} downloads</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleDownload(resource)}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2 rounded-lg font-medium text-sm flex items-center justify-center shadow-md"
                  >
                    <MdDownload className="w-4 h-4 mr-2" />
                    Download
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-md p-6 text-center"
          >
            <svg
              className="mx-auto h-10 w-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-200 font-Quicksand">
              No resources found
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm font-Playfair">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedResource && <ResourceModal resource={selectedResource} onClose={() => setSelectedResource(null)} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ResourcesHub;