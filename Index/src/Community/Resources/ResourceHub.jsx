// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { Link } from 'react-router-dom';
// // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // import { MdClose, MdDownload, MdSearch, MdShare } from 'react-icons/md';
// // // // // import { FiMenu } from 'react-icons/fi';
// // // // // import { databases, storage } from '../../appwriteConfig';
// // // // // import { toast } from 'react-toastify';
// // // // // import DOMPurify from 'dompurify';
// // // // // import jsPDF from 'jspdf';
// // // // // import html2canvas from 'html2canvas';


// // // // // const thumbnailDb = import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID;
// // // // // const researchCollection = import.meta.env.VITE_APPWRITE_RESEARCH_COLLECTION_ID;
// // // // // const researchBucket = import.meta.env.VITE_APPWRITE_RESEARCH_BUCKET_ID;

// // // // // function ResourcesHub() {
// // // // //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// // // // //   const [searchQuery, setSearchQuery] = useState('');
// // // // //   const [activeCategory, setActiveCategory] = useState('all');
// // // // //   const [selectedResource, setSelectedResource] = useState(null);
// // // // //   const [resources, setResources] = useState([]);
// // // // //   const [isLoading, setIsLoading] = useState(true);

// // // // //   const categories = [
// // // // //     { id: 'all', name: 'All Resources' },
// // // // //     { id: 'articles', name: 'Articles' },
// // // // //     { id: 'guides', name: 'Guides & Tutorials' },
// // // // //     { id: 'templates', name: 'Templates' },
// // // // //     { id: 'research', name: 'Research Papers' },
// // // // //     { id: 'tools', name: 'Tools & Resources' },
// // // // //   ];

// // // // //   useEffect(() => {
// // // // //     const fetchResources = async () => {
// // // // //       try {
// // // // //         setIsLoading(true);
// // // // //         const response = await databases.listDocuments(thumbnailDb, researchCollection);
// // // // //         const formattedResources = await Promise.all(
// // // // //           response.documents.map(async (doc) => {
// // // // //             const thumbnailUrl = storage.getFilePreview(researchBucket, doc.thumbnailId);
// // // // //             let fileUrl = '#';
// // // // //             if (doc.fileId) {
// // // // //               fileUrl = storage.getFileDownload(researchBucket, doc.fileId);
// // // // //             }
// // // // //             return {
// // // // //               id: doc.$id,
// // // // //               title: doc.title,
// // // // //               category: doc.category,
// // // // //               type: doc.type,
// // // // //               size: doc.size,
// // // // //               downloads: doc.downloads || 0,
// // // // //               description: doc.description,
// // // // //               thumbnail: thumbnailUrl,
// // // // //               fileId: doc.fileId,
// // // // //               thumbnailId: doc.thumbnailId,
// // // // //               fileUrl: fileUrl,
// // // // //               author: doc.author,
// // // // //               date: doc.date,
// // // // //             };
// // // // //           })
// // // // //         );
// // // // //         setResources(formattedResources);
// // // // //       } catch (error) {
// // // // //         console.error('Error fetching resources:', error);
// // // // //         toast.error('Failed to load resources');
// // // // //       } finally {
// // // // //         setIsLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchResources();
// // // // //   }, []);

// // // // //   const filteredResources = resources.filter((resource) => {
// // // // //     const matchesSearch =
// // // // //       resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // //       resource.description.toLowerCase().includes(searchQuery.toLowerCase());
// // // // //     const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
// // // // //     return matchesSearch && matchesCategory;
// // // // //   });

// // // // //   const formatDate = (dateString) => {
// // // // //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
// // // // //     return new Date(dateString).toLocaleDateString(undefined, options);
// // // // //   };

// // // // //   const isNewResource = (dateString) => {
// // // // //     const resourceDate = new Date(dateString);
// // // // //     const now = new Date();
// // // // //     const diffDays = (now - resourceDate) / (1000 * 60 * 60 * 24);
// // // // //     return diffDays <= 7; // Consider resources newer than 7 days as "new"
// // // // //   };

// // // // //   // const handleDownload = async (resource) => {
// // // // //   //   try {
// // // // //   //     await databases.updateDocument(thumbnailDb, researchCollection, resource.id, {
// // // // //   //       downloads: resource.downloads + 1,
// // // // //   //     });
// // // // //   //     setResources((prev) =>
// // // // //   //       prev.map((r) => (r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r))
// // // // //   //     );
// // // // //   //     if (resource.fileId) {
// // // // //   //       const downloadUrl = storage.getFileDownload(researchBucket, resource.fileId);
// // // // //   //       const link = document.createElement('a');
// // // // //   //       link.href = downloadUrl;
// // // // //   //       link.download = `${resource.title}.${resource.type.toLowerCase()}`;
// // // // //   //       link.click();
// // // // //   //     } else {
// // // // //   //       window.open(resource.fileUrl, '_blank');
// // // // //   //     }
// // // // //   //     toast.success('Download started!');
// // // // //   //   } catch (error) {
// // // // //   //     console.error('Download failed:', error);
// // // // //   //     toast.error('Failed to start download');
// // // // //   //   }
// // // // //   // };


// // // // //   const handleDownload = async (resource) => {
// // // // //   try {
// // // // //     // Update download count
// // // // //     await databases.updateDocument(thumbnailDb, researchCollection, resource.id, {
// // // // //       downloads: resource.downloads + 1,
// // // // //     });
// // // // //     setResources((prev) =>
// // // // //       prev.map((r) => (r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r))
// // // // //     );

// // // // //     // Create a hidden HTML element for rendering
// // // // //     const element = document.createElement('div');
// // // // //     element.style.width = '600px';
// // // // //     element.style.padding = '20px';
// // // // //     element.style.fontFamily = 'Arial';
// // // // //     element.style.backgroundColor = '#fff';
// // // // //     element.innerHTML = `
// // // // //       <h1 style="font-size: 24px; margin-bottom: 10px;">${resource.title}</h1>
// // // // //       <p><strong>Description:</strong> ${resource.description || 'N/A'}</p>
// // // // //       <p><strong>Medium:</strong> ${resource.medium || 'N/A'}</p>
// // // // //       <p><strong>Tags:</strong> ${resource.tags?.join(', ') || 'N/A'}</p>
// // // // //       <img src="${resource.thumbnailUrl || resource.imageUrl}" style="max-width: 100%; margin-top: 15px;" />
// // // // //     `;
// // // // //     document.body.appendChild(element);

// // // // //     // Convert to canvas
// // // // //     const canvas = await html2canvas(element);
// // // // //     const imgData = canvas.toDataURL('image/png');

// // // // //     // Create PDF
// // // // //     const pdf = new jsPDF('p', 'pt', 'a4');
// // // // //     const pageWidth = pdf.internal.pageSize.getWidth();
// // // // //     const pageHeight = pdf.internal.pageSize.getHeight();
// // // // //     const imgProps = pdf.getImageProperties(imgData);
// // // // //     const imgRatio = imgProps.width / imgProps.height;
// // // // //     const pdfWidth = pageWidth - 40;
// // // // //     const pdfHeight = pdfWidth / imgRatio;

// // // // //     pdf.addImage(imgData, 'PNG', 20, 20, pdfWidth, pdfHeight);
// // // // //     const filename = `${resource.title.replace(/\s+/g, '_')}.pdf`;
// // // // //     pdf.save(filename);

// // // // //     // Cleanup
// // // // //     document.body.removeChild(element);
// // // // //     toast.success('PDF download started!');
// // // // //   } catch (error) {
// // // // //     console.error('PDF generation failed:', error);
// // // // //     toast.error('Failed to download as PDF');
// // // // //   }
// // // // // };




// // // // //   const handleShare = (resource) => {
// // // // //     // Placeholder for share functionality
// // // // //     toast.info('Share functionality coming soon!');
// // // // //   };

// // // // //   const ResourceModal = ({ resource, onClose }) => {
// // // // //     if (!resource) return null;
// // // // //     return (
// // // // //       <motion.div
// // // // //         initial={{ opacity: 0 }}
// // // // //         animate={{ opacity: 1 }}
// // // // //         exit={{ opacity: 0 }}
// // // // //         className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-6 backdrop-blur-sm"
// // // // //         onClick={onClose}
// // // // //       >
// // // // //         <motion.div
// // // // //           initial={{ scale: 0.95, y: 20 }}
// // // // //           animate={{ scale: 1, y: 0 }}
// // // // //           exit={{ scale: 0.95, y: 20 }}
// // // // //           className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-gray-200 dark:border-gray-700"
// // // // //           onClick={(e) => e.stopPropagation()}
// // // // //         >
// // // // //           <button
// // // // //             className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
// // // // //             onClick={onClose}
// // // // //             aria-label="Close modal"
// // // // //           >
// // // // //             <MdClose className="w-6 h-6 text-gray-600 dark:text-gray-300" />
// // // // //           </button>
// // // // //           <div className="p-6 sm:p-8">
// // // // //             <div className="flex flex-col lg:flex-row gap-8">
// // // // //               <div className="lg:w-1/3">
// // // // //                 <div className="sticky top-6 bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg shadow-inner">
// // // // //                   <img
// // // // //                     src={resource.thumbnail}
// // // // //                     alt={resource.title}
// // // // //                     className="w-full h-auto max-h-[50vh] object-contain rounded-lg shadow-md"
// // // // //                     onError={(e) => (e.target.src = 'https://via.placeholder.com/300?text=Image+Not+Found')}
// // // // //                   />
// // // // //                   <div className="mt-4 grid grid-cols-2 gap-3">
// // // // //                     <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center shadow-sm">
// // // // //                       <p className="text-xs text-gray-500 dark:text-gray-400 font-Playfair">File Size</p>
// // // // //                       <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{resource.size}</p>
// // // // //                     </div>
// // // // //                     <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center shadow-sm">
// // // // //                       <p className="text-xs text-gray-500 dark:text-gray-400 font-Playfair">Downloads</p>
// // // // //                       <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
// // // // //                         {resource.downloads.toLocaleString()}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <div className="mt-4 space-y-3">
// // // // //                     <motion.button
// // // // //                       whileHover={{ scale: 1.03 }}
// // // // //                       whileTap={{ scale: 0.97 }}
// // // // //                       onClick={() => handleDownload(resource)}
// // // // //                       className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center shadow-md transition-all duration-200"
// // // // //                     >
// // // // //                       <MdDownload className="w-5 h-5 mr-2" />
// // // // //                       Download Resource
// // // // //                     </motion.button>
// // // // //                     <motion.button
// // // // //                       whileHover={{ scale: 1.03 }}
// // // // //                       whileTap={{ scale: 0.97 }}
// // // // //                       onClick={() => handleShare(resource)}
// // // // //                       className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center shadow-md transition-all duration-200"
// // // // //                     >
// // // // //                       <MdShare className="w-5 h-5 mr-2" />
// // // // //                       Share Resource
// // // // //                     </motion.button>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div className="lg:w-2/3">
// // // // //                 <div className="flex items-center gap-2 mb-3">
// // // // //                   <span className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-xs font-medium rounded-full text-indigo-800 dark:text-indigo-200">
// // // // //                     {resource.type}
// // // // //                   </span>
// // // // //                   <span className="text-xs text-gray-500 dark:text-gray-400">
// // // // //                     {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
// // // // //                   </span>
// // // // //                   {isNewResource(resource.date) && (
// // // // //                     <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/50 text-xs font-medium rounded-full text-green-800 dark:text-green-200">
// // // // //                       New
// // // // //                     </span>
// // // // //                   )}
// // // // //                 </div>
// // // // //                 <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2 font-Quicksand leading-tight">
// // // // //                   {resource.title}
// // // // //                 </h2>
// // // // //                 <p className="text-indigo-600 dark:text-indigo-400 text-sm mb-4 font-Playfair">
// // // // //                   by {resource.author} • {formatDate(resource.date)}
// // // // //                 </p>
// // // // //                 <div className="mb-6">
// // // // //                   <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2 font-Roboto">
// // // // //                     Description
// // // // //                   </h3>
// // // // //                   <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
// // // // //                     <div
// // // // //                       className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-Playfair shadow-inner border p-4 rounded-lg"
// // // // //                       dangerouslySetInnerHTML={{
// // // // //                         __html: DOMPurify.sanitize(resource.description, {
// // // // //                           USE_PROFILES: { html: true },
// // // // //                           ALLOWED_TAGS: ['p', 'a', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'blockquote', 'code', 'pre', 'hr'],
// // // // //                           ALLOWED_ATTR: ['href', 'target', 'rel'],
// // // // //                         }),
// // // // //                       }}
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 shadow-sm">
// // // // //                   <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 font-Roboto">About This Resource</h3>
// // // // //                   <div className="text-gray-600 dark:text-gray-300 text-sm space-y-3 font-Playfair">
// // // // //                     <p>This resource is provided for educational purposes. Please respect the author's rights and terms of use.</p>
// // // // //                     {resource.type !== 'Article' && (
// // // // //                       <div>
// // // // //                         <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">File Details</h4>
// // // // //                         <ul className="list-disc list-inside space-y-1">
// // // // //                           <li>Format: {resource.type}</li>
// // // // //                           <li>Compatible with most modern software</li>
// // // // //                           <li>High-quality resolution</li>
// // // // //                         </ul>
// // // // //                       </div>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </motion.div>
// // // // //       </motion.div>
// // // // //     );
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-900">
// // // // //       <motion.nav
// // // // //         initial={{ y: -50, opacity: 0 }}
// // // // //         animate={{ y: 0, opacity: 1 }}
// // // // //         transition={{ duration: 0.5, ease: 'easeOut' }}
// // // // //         className="fixed top-4 left-4 right-4 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg"
// // // // //       >
// // // // //         <div className="px-4 py-3 sm:px-6 flex justify-between items-center">
// // // // //           <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent font-Quicksand">
// // // // //             ArtVerse
// // // // //           </Link>
// // // // //           <div className="hidden md:flex items-center gap-6">
// // // // //             {[
// // // // //               { name: 'Home', path: '/' },
// // // // //               { name: 'Challenges', path: '/challenges' },
// // // // //               { name: 'Resources', path: '/Community/Resources/ResourceHub' },
// // // // //               { name: 'Community', path: '/Community' },
// // // // //             ].map((item) => (
// // // // //               <motion.div
// // // // //                 key={item.name}
// // // // //                 whileHover={{ scale: 1.05 }}
// // // // //                 whileTap={{ scale: 0.95 }}
// // // // //                 className="relative group"
// // // // //               >
// // // // //                 <Link
// // // // //                   to={item.path}
// // // // //                   className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium font-Playfair transition-colors duration-200"
// // // // //                 >
// // // // //                   {item.name}
// // // // //                 </Link>
// // // // //                 <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
// // // // //               </motion.div>
// // // // //             ))}
// // // // //           </div>
// // // // //           <button
// // // // //             className="md:hidden text-gray-600 dark:text-gray-300"
// // // // //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// // // // //             aria-label="Toggle menu"
// // // // //           >
// // // // //             {isMenuOpen ? <MdClose className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
// // // // //           </button>
// // // // //         </div>
// // // // //         <motion.div
// // // // //           initial={{ height: 0, opacity: 0 }}
// // // // //           animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
// // // // //           transition={{ duration: 0.3, ease: 'easeInOut' }}
// // // // //           className="md:hidden overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-b-xl"
// // // // //         >
// // // // //           <div className="px-4 py-3 space-y-2">
// // // // //             {[
// // // // //               { name: 'Home', path: '/' },
// // // // //               { name: 'Challenges', path: '/challenges' },
// // // // //               { name: 'Resources', path: '/resources' },
// // // // //               { name: 'Community', path: '/community' },
// // // // //             ].map((item) => (
// // // // //               <Link
// // // // //                 key={item.name}
// // // // //                 to={item.path}
// // // // //                 className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 font-Playfair transition-colors duration-200"
// // // // //                 onClick={() => setIsMenuOpen(false)}
// // // // //               >
// // // // //                 {item.name}
// // // // //               </Link>
// // // // //             ))}
// // // // //           </div>
// // // // //         </motion.div>
// // // // //       </motion.nav>

// // // // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
// // // // //         <motion.div
// // // // //           initial={{ opacity: 0, y: 20 }}
// // // // //           animate={{ opacity: 1, y: 0 }}
// // // // //           transition={{ duration: 0.6 }}
// // // // //           className="text-center mb-12"
// // // // //         >
// // // // //           <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent font-Quicksand">
// // // // //             Resources Hub
// // // // //           </h1>
// // // // //           <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-3 font-Playfair">
// // // // //             Explore a curated collection of resources to inspire and elevate your creative journey.
// // // // //           </p>
// // // // //         </motion.div>

// // // // //         <div className="mb-10">
// // // // //           <div className="flex flex-col sm:flex-row gap-4 mb-6">
// // // // //             <div className="relative flex-grow">
// // // // //               <input
// // // // //                 type="text"
// // // // //                 placeholder="Search resources..."
// // // // //                 className="w-full px-4 py-3 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10 text-gray-700 dark:text-gray-200 text-sm"
// // // // //                 value={searchQuery}
// // // // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // // // //               />
// // // // //               <MdSearch className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
// // // // //             </div>
// // // // //             <Link to="/Community/Resources/ResourceUpload">
// // // // //               <motion.button
// // // // //                 whileHover={{ scale: 1.03 }}
// // // // //                 whileTap={{ scale: 0.97 }}
// // // // //                 className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium text-sm transition-all shadow-md"
// // // // //               >
// // // // //                 Upload Resource
// // // // //               </motion.button>
// // // // //             </Link>
// // // // //           </div>
// // // // //           <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-indigo-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
// // // // //             {categories.map((category) => (
// // // // //               <motion.button
// // // // //                 key={category.id}
// // // // //                 whileHover={{ scale: 1.03 }}
// // // // //                 whileTap={{ scale: 0.97 }}
// // // // //                 onClick={() => setActiveCategory(category.id)}
// // // // //                 className={` whitespace-nowrap px-4 py-2 rounded-lg font-medium text-sm font-Playfair transition-all duration-200 ${
// // // // //                   activeCategory === category.id
// // // // //                     ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
// // // // //                     : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-700'
// // // // //                 }`}
// // // // //               >
// // // // //                 {category.name}
// // // // //               </motion.button>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>

// // // // //         {isLoading ? (
// // // // //           <div className="flex justify-center items-center h-64">
// // // // //             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
// // // // //           </div>
// // // // //         ) : filteredResources.length > 0 ? (
// // // // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // // // //             {filteredResources.map((resource) => (
// // // // //               <motion.div
// // // // //                 key={resource.id}
// // // // //                 whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
// // // // //                 className="relative bg-white/90 dark:bg-gray-800/90 rounded-xl overflow-hidden border border-transparent hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-300"
// // // // //               >
// // // // //                 <div className="relative h-60 cursor-pointer" onClick={() => setSelectedResource(resource)}>
// // // // //                   <img
// // // // //                     src={resource.thumbnail}
// // // // //                     alt={resource.title}
// // // // //                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
// // // // //                     onError={(e) => (e.target.src = 'https://via.placeholder.com/300?text=Image+Not+Found')}
// // // // //                   />
// // // // //                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
// // // // //                   <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end">
// // // // //                     <span className="inline-block px-2 py-1 bg-white/90 dark:bg-gray-800/90 text-xs font-medium rounded-full text-gray-800 dark:text-gray-200 font-Playfair">
// // // // //                       {resource.type}
// // // // //                     </span>
// // // // //                     {isNewResource(resource.date) && (
// // // // //                       <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/50 text-xs font-medium rounded-full text-green-800 dark:text-green-200">
// // // // //                         New
// // // // //                       </span>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="p-4">
// // // // //                   <h3
// // // // //                     className="text-lg font-semibold text-gray-800 dark:text-white mb-2 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 font-Quicksand line-clamp-1"
// // // // //                     onClick={() => setSelectedResource(resource)}
// // // // //                   >
// // // // //                     {resource.title}
// // // // //                   </h3>
// // // // //                   <div
// // // // //                     className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 font-Playfair leading-snug"
// // // // //                     dangerouslySetInnerHTML={{
// // // // //                       __html: DOMPurify.sanitize(
// // // // //                         resource.description.length > 100 ? resource.description.substring(0, 100) + '...' : resource.description,
// // // // //                         { USE_PROFILES: { html: false }, ALLOWED_TAGS: [] }
// // // // //                       ),
// // // // //                     }}
// // // // //                   />
// // // // //                   <div className="flex justify-between items-center text-xs mb-3 text-gray-500 dark:text-gray-400 font-Playfair">
// // // // //                     <span>{resource.size}</span>
// // // // //                     <span>{resource.downloads.toLocaleString()} downloads</span>
// // // // //                   </div>
// // // // //                   <motion.button
// // // // //                     whileHover={{ scale: 1.03 }}
// // // // //                     whileTap={{ scale: 0.97 }}
// // // // //                     onClick={() => handleDownload(resource)}
// // // // //                     className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2 rounded-lg font-medium text-sm flex items-center justify-center shadow-md"
// // // // //                   >
// // // // //                     <MdDownload className="w-4 h-4 mr-2" />
// // // // //                     Download
// // // // //                   </motion.button>
// // // // //                 </div>
// // // // //               </motion.div>
// // // // //             ))}
// // // // //           </div>
// // // // //         ) : (
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-md p-6 text-center"
// // // // //           >
// // // // //             <svg
// // // // //               className="mx-auto h-10 w-10 text-gray-400"
// // // // //               fill="none"
// // // // //               stroke="currentColor"
// // // // //               viewBox="0 0 24 24"
// // // // //             >
// // // // //               <path
// // // // //                 strokeLinecap="round"
// // // // //                 strokeLinejoin="round"
// // // // //                 strokeWidth={2}
// // // // //                 d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
// // // // //               />
// // // // //             </svg>
// // // // //             <h3 className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-200 font-Quicksand">
// // // // //               No resources found
// // // // //             </h3>
// // // // //             <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm font-Playfair">
// // // // //               Try adjusting your search or filter to find what you're looking for.
// // // // //             </p>
// // // // //           </motion.div>
// // // // //         )}

// // // // //         <AnimatePresence>
// // // // //           {selectedResource && <ResourceModal resource={selectedResource} onClose={() => setSelectedResource(null)} />}
// // // // //         </AnimatePresence>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default ResourcesHub;



// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { 
// //   Home, Search, Plus, User, FileText, Bookmark, Bell, MoreHorizontal, 
// //   Download, Share2, ArrowLeft, CheckCircle2, Heart, MessageCircle, Filter
// // } from 'lucide-react';
// // import { databases, storage } from '../../appwriteConfig';
// // import { toast } from 'react-toastify';
// // import DOMPurify from 'dompurify';
// // import jsPDF from 'jspdf';
// // import html2canvas from 'html2canvas';
// // import Logo from "../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg"

// // // Configuration
// // const thumbnailDb = import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID;
// // const researchCollection = import.meta.env.VITE_APPWRITE_RESEARCH_COLLECTION_ID;
// // const researchBucket = import.meta.env.VITE_APPWRITE_RESEARCH_BUCKET_ID;

// // function ResourcesHub() {
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [activeCategory, setActiveCategory] = useState('all');
// //   const [selectedResource, setSelectedResource] = useState(null);
// //   const [resources, setResources] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   const categories = [
// //     { id: 'all', name: 'For You' },
// //     { id: 'articles', name: 'Articles' },
// //     { id: 'guides', name: 'Guides' },
// //     { id: 'templates', name: 'Templates' },
// //     { id: 'research', name: 'Research' },
// //   ];

// //   useEffect(() => {
// //     const fetchResources = async () => {
// //       try {
// //         setIsLoading(true);
// //         const response = await databases.listDocuments(thumbnailDb, researchCollection);
// //         const formattedResources = await Promise.all(
// //           response.documents.map(async (doc) => {
// //             const thumbnailUrl = storage.getFilePreview(researchBucket, doc.thumbnailId);
// //             return {
// //               id: doc.$id,
// //               title: doc.title,
// //               category: doc.category,
// //               type: doc.type,
// //               size: doc.size,
// //               downloads: doc.downloads || 0,
// //               description: doc.description,
// //               thumbnail: thumbnailUrl,
// //               fileId: doc.fileId,
// //               fileUrl: doc.fileId ? storage.getFileDownload(researchBucket, doc.fileId) : '#',
// //               author: doc.author,
// //               date: doc.date,
// //             };
// //           })
// //         );
// //         setResources(formattedResources);
// //       } catch (error) {
// //         console.error('Error fetching resources:', error);
// //         toast.error('Failed to load resources');
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };
// //     fetchResources();
// //   }, []);

// //   const filteredResources = resources.filter((resource) => {
// //     const matchesSearch =
// //       resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       resource.description.toLowerCase().includes(searchQuery.toLowerCase());
// //     const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
// //     return matchesSearch && matchesCategory;
// //   });

// //   const formatDate = (dateString) => {
// //     return new Date(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
// //   };

// //   const handleDownload = async (resource) => {
// //     try {
// //         toast.success("Download started...");
// //     } catch (e) { toast.error("Error"); }
// //   };

// //   // --- Sub-Components ---
// //   const Header = () => (
// //   <header className=" sticky top-0 z-50 py-2 px-2">
// //     <div className="max-w-[1350px] mx-auto bg-white/90 dark:bg-zinc-900/85 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl h-14 flex items-center justify-between px-4">

// //       {/* Left: Brand + Context */}
// //       <div className="flex items-center gap-4 min-w-0">
// //         <Link 
// //           to="/" 
// //           className="flex items-center gap-2 shrink-0"
// //         >
// //           <div className="w-8 h-8 rounded-lg flex items-center justify-center font-serif italic text-sm overflow-hidden ">
// //             <img src={Logo} alt="" />
// //           </div>
// //           <span className="hidden sm:block font-Eagle text-lg text-zinc-900 dark:text-white">
// //             Painters’ Diary
// //           </span>
// //         </Link>
// //       </div>

// //       {/* Middle: Search (Tool-like, not social) */}
// //       <div className="flex-1 max-w-[420px] hidden md:block">
// //         <div className="relative">
// //           <Search 
// //             size={15} 
// //             className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
// //           />
// //           <input
// //             type="text"
// //             placeholder="Search guides, templates, research…"
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-zinc-700 rounded-full py-1.5 pl-9 pr-4 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
// //           />
// //         </div>
// //       </div>

// //       {/* Right: Actions */}
// //       <div className="flex items-center gap-2">
// //         <button 
// //           className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
// //           title="Notifications"
// //         >
// //           <Bell size={18} />
// //         </button>

// //         <div className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
// //           <User size={16} />
// //         </div>
// //       </div>

// //     </div>
// //   </header>
// // );


// //   const LeftPanel = () => (
// //     <div className="hidden md:flex flex-col w-[240px] h-[calc(100vh-85px)] bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-800 rounded-sm shadow-sm overflow-hidden">
// //       <div className="p-3 flex flex-col h-full overflow-y-auto custom-scrollbar">
// //         <nav className="space-y-0.5 mb-6">
// //           <NavLink icon={<Home size={18} />} label="Home" active={!activeCategory} />
// //           <NavLink icon={<FileText size={18} />} label="My Resources" />
// //           <NavLink icon={<Bookmark size={18} />} label="Saved" />
// //           <NavLink icon={<User size={18} />} label="Profile" />
// //         </nav>

// //         <div className="mb-6 px-1">
// //           <Link to="/Community/Resources/ResourceUpload">
// //             <button className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-2.5 rounded-xl shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
// //               <Plus size={16} />
// //               <span className="text-sm">Create Session</span>
// //             </button>
// //           </Link>
// //         </div>

// //         <div>
// //           <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2 px-3">Discover</h3>
// //           <div className="space-y-0.5">
// //             {categories.map((cat) => (
// //               <button
// //                 key={cat.id}
// //                 onClick={() => { setActiveCategory(cat.id); setSelectedResource(null); }}
// //                 className={`w-full text-left px-3 py-2 rounded-sm text-sm font-medium transition-all ${
// //                   activeCategory === cat.id 
// //                     ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border-l-2 border-zinc-900 dark:border-white' 
// //                     : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
// //                 }`}
// //               >
// //                 {cat.name}
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const NavLink = ({ icon, label, active }) => (
// //     <Link to="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all ${
// //       active 
// //       ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold' 
// //       : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white'
// //     }`}>
// //       {icon}
// //       <span className="text-sm">{label}</span>
// //     </Link>
// //   );

// //   const RightPanel = () => (
// //     <div className="hidden lg:flex flex-col w-[280px] h-[calc(100vh-85px)] bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-800 rounded-sm shadow-sm overflow-hidden">
// //        <div className="p-4 h-full overflow-y-auto">
// //         <h3 className="font-bold text-zinc-900 dark:text-white mb-3 text-sm">Suggestions</h3>
// //         <div className="space-y-3">
// //           {[1, 2, 3].map((i) => (
// //             <div key={i} className="flex items-center justify-between p-2 rounded-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group">
// //               <div className="flex items-center gap-2.5">
// //                 <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-sm"></div>
// //                 <div className="flex flex-col">
// //                   <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
// //                     Artist{i} <CheckCircle2 className="text-blue-500 w-3 h-3" />
// //                   </span>
// //                   <span className="text-[10px] text-zinc-400">@artist_{i}</span>
// //                 </div>
// //               </div>
// //               <button className="text-[10px] font-bold px-2.5 py-1 rounded-sm border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
// //                 Follow
// //               </button>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="mt-5 pt-5 border-t border-zinc-100 dark:border-zinc-800">
// //            <h3 className="font-bold text-zinc-900 dark:text-white mb-2 text-sm">Tags</h3>
// //            <div className="flex flex-wrap gap-1.5">
// //              {['#DigitalArt', '#Concept', '#3D', '#Sketch'].map(tag => (
// //                <span key={tag} className="text-[10px] px-2 py-1 bg-zinc-100 dark:bg-black/40 rounded-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-500 cursor-pointer border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700">
// //                  {tag}
// //                </span>
// //              ))}
// //            </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const FeedItem = ({ resource }) => (
// //     <motion.div 
// //       layout
// //       initial={{ opacity: 0 }} 
// //       animate={{ opacity: 1 }}
// //       className="border-b border-zinc-100 dark:border-zinc-800 p-4 md:p-5 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer "
// //       onClick={() => setSelectedResource(resource)}
// //     >
// //       {/* Header Info */}
// //       <div className="flex justify-between items-center mb-2">
// //         <div className="flex items-center gap-2.5">
// //           <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-100 to-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
// //             {resource.author.charAt(0)}
// //           </div>
// //           <div className="flex flex-col">
// //             <span className="font-bold text-zinc-900 dark:text-white text-sm hover:underline">{resource.author}</span>
// //             <span className="text-zinc-400 text-[11px]">{formatDate(resource.date)}</span>
// //           </div>
// //         </div>
// //         <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-1 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
// //           <MoreHorizontal size={18} />
// //         </button>
// //       </div>

// //       {/* Main Image */}
// //       <div className="w-full rounded-sm overflow-hidden border border-zinc-100 dark:border-zinc-800 mb-3 bg-zinc-50 dark:bg-black">
// //          <img 
// //            src={resource.thumbnail} 
// //            alt={resource.title} 
// //            className="w-full h-auto max-h-[500px] object-cover hover:scale-[1.01] transition-transform duration-500 ease-out"
// //          />
// //       </div>

// //       {/* Metadata */}
// //       <div className="mb-2">
// //         <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1 leading-tight">
// //           {resource.title}
// //         </h3>
// //         <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
// //            {resource.description.replace(/<[^>]+>/g, '')}
// //         </p>
// //       </div>

// //       {/* Interactions */}
// //       <div className="flex items-center justify-between mt-2 pt-1">
// //          <div className="flex items-center gap-5">
// //             <button className="flex items-center gap-1.5 text-zinc-400 hover:text-pink-500 transition-colors group" onClick={(e) => e.stopPropagation()}>
// //               <Heart size={18} className="group-hover:scale-110 transition-transform" />
// //             </button>
// //             <button className="flex items-center gap-1.5 text-zinc-400 hover:text-blue-500 transition-colors group" onClick={(e) => e.stopPropagation()}>
// //               <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
// //             </button>
// //             <button className="flex items-center gap-1.5 text-zinc-400 hover:text-green-500 transition-colors group" onClick={(e) => { e.stopPropagation(); handleDownload(resource); }}>
// //               <Download size={18} className="group-hover:scale-110 transition-transform" />
// //               {resource.downloads > 0 && <span className="text-xs font-medium">{resource.downloads}</span>}
// //             </button>
// //          </div>
// //          <button className="text-zinc-400 hover:text-indigo-500 transition-colors" onClick={(e) => e.stopPropagation()}>
// //             <Share2 size={18} />
// //          </button>
// //       </div>
// //     </motion.div>
// //   );

// //   const DetailView = ({ resource }) => (
// //     <motion.div 
// //       initial={{ opacity: 0 }} 
// //       animate={{ opacity: 1 }}
// //       className="p-0 min-h-full"
// //     >
// //       <div className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-b border-zinc-100 dark:border-zinc-800 p-3 flex items-center gap-3">
// //         <button 
// //           onClick={() => setSelectedResource(null)} 
// //           className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
// //         >
// //           <ArrowLeft size={20} className="text-zinc-900 dark:text-white" />
// //         </button>
// //         <span className="font-bold text-zinc-900 dark:text-white text-sm">Post</span>
// //       </div>
      
// //       <div className="p-4 md:p-6 pb-20">
// //         <div className="flex items-center gap-3 mb-4">
// //            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
// //              {resource.author.charAt(0)}
// //            </div>
// //            <div>
// //              <h3 className="font-bold text-zinc-900 dark:text-white text-sm">{resource.author}</h3>
// //              <p className="text-xs text-zinc-500">{formatDate(resource.date)}</p>
// //            </div>
// //         </div>

// //         <h1 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-4">{resource.title}</h1>
        
// //         <div className="w-full rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 mb-6 bg-zinc-50 dark:bg-black">
// //            <img src={resource.thumbnail} className="w-full h-auto object-contain" alt="Detail" />
// //         </div>

// //         <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed mb-8 text-sm md:text-base" 
// //              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resource.description) }} />
        
// //         <div className="flex flex-col gap-3">
// //            <button 
// //               onClick={() => handleDownload(resource)}
// //               className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-3.5 rounded-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm"
// //            >
// //               <Download size={18} />
// //               Download Resource
// //            </button>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );

// //   return (
// //     <div className="max-h-screen bg-white md:bg-zinc-100 dark:bg-black md:dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans overflow-hidden">
      
// //       <Header />
      
// //       <div className="max-w-[1350px] mx-auto px-0 md:px-4 flex justify-center gap-2 pb-0 md:pb-6">
        
// //         {/* Left Column (Desktop Only) */}
// //         <LeftPanel />

// //         {/* Middle Column (Feed) - KEY FIX: Fixed Height + Internal Scroll */}
// //         <main className="flex-1 w-full md:max-w-[600px] h-[calc(100vh-120px)] md:h-[calc(100vh-85px)] bg-white md:bg-white/70 dark:bg-black md:dark:bg-zinc-900/70 backdrop-blur-xl md:border md:border-white/20 md:dark:border-zinc-800 rounded-none md:rounded-sm shadow-none md:shadow-sm overflow-hidden flex flex-col hide-scrollbar">
// //             {selectedResource ? (
// //                // Detail View Wrapper with internal scroll
// //                <div className="flex-1 overflow-y-auto hide-scrollbar">
// //                   <DetailView resource={selectedResource} />
// //                </div>
// //             ) : (
// //               <>
// //                  {/* Feed Header */}
// //                  <div className="flex-shrink-0 sticky top-0 z-30 bg-white/95 md:bg-white/90 dark:bg-black/95 md:dark:bg-zinc-900/90 backdrop-blur border-b border-zinc-100 dark:border-zinc-800 p-3 md:p-4 lg:flex justify-between items-center  hidden">
// //                     <h2 className="font-bold text-base md:text-lg">For You</h2>
// //                     <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-sm transition-colors"><Filter size={18} /></button>
// //                  </div>

// //                  {/* Mobile Categories */}
// //                  <div className="flex-shrink-0 md:hidden overflow-x-auto hide-scrollbar py-2 px-4 flex gap-2 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-black">
// //                     {categories.map(cat => (
// //                         <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-bold border ${activeCategory === cat.id ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' : 'border-zinc-200 dark:border-zinc-800 text-zinc-500'}`}>{cat.name}</button>
// //                     ))}
// //                  </div>

// //                  {/* Scrollable Content Area */}
// //                  <div className="flex-1 overflow-y-auto hide-scrollbar pb-20 md:pb-0">
// //                    {isLoading ? (
// //                       <div className="flex justify-center items-center h-40">
// //                           <div className="animate-spin rounded-full h-6 w-6 border-2 border-zinc-500 border-t-transparent"></div>
// //                       </div>
// //                    ) : filteredResources.length > 0 ? (
// //                       <div>
// //                           {filteredResources.map(resource => (
// //                               <FeedItem key={resource.id} resource={resource} />
// //                           ))}
// //                       </div>
// //                    ) : (
// //                       <div className="p-10 text-center text-zinc-400">
// //                           <Search className="mx-auto h-8 w-8 mb-2 opacity-50" />
// //                           <p className="text-sm">No resources found.</p>
// //                       </div>
// //                    )}
// //                  </div>
// //               </>
// //             )}
// //         </main>

// //         {/* Right Column (Desktop Only) */}
// //         <RightPanel />
// //       </div>

// //       {/* Mobile Bottom Nav */}
// //       <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800 pb-safe">
// //          <div className="flex items-center justify-around h-14">
// //             <Link to="/" className="p-2 text-zinc-900 dark:text-white"><Home size={22} /></Link>
// //             <Link to="/search" className="p-2 text-zinc-500"><Search size={22} /></Link>
// //             <Link to="/Community/Resources/ResourceUpload" className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-sm shadow-sm"><Plus size={22} /></Link>
// //             <button className="p-2 text-zinc-500"><Bell size={22} /></button>
// //             <button className="p-2 text-zinc-500"><User size={22} /></button>
// //          </div>
// //       </div>

// //     </div>
// //   );
// // }

// // export default ResourcesHub;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Search, Plus, User, FileText, Bookmark, Bell, MoreHorizontal, 
  Download, Share2, ArrowLeft, CheckCircle2, Heart, MessageCircle, 
  Filter, X, Image as ImageIcon,
  Blocks
} from 'lucide-react';
import { databases, storage } from '../../appwriteConfig'; // Adjust path as needed
import { toast, ToastContainer } from 'react-toastify';
import DOMPurify from 'dompurify';
import Logo from "../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg"; // Adjust path
import Block from 'quill/blots/block';

// Configuration
const thumbnailDb = import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID;
const researchCollection = import.meta.env.VITE_APPWRITE_RESEARCH_COLLECTION_ID;
const researchBucket = import.meta.env.VITE_APPWRITE_RESEARCH_BUCKET_ID;

const ResourcesHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Categories
  const categories = [
    { id: 'all', name: 'For You' },
    { id: 'articles', name: 'Articles' },
    { id: 'guides', name: 'Guides' },
    { id: 'templates', name: 'Templates' },
    { id: 'research', name: 'Research' },
  ];

  // Fetch Data
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        // Mocking data fetching if Appwrite fails for demo purposes, 
        // essentially wraps your original logic
        const response = await databases.listDocuments(thumbnailDb, researchCollection);
        const formattedResources = await Promise.all(
          response.documents.map(async (doc) => {
            let thumbnailUrl = '';
            try {
                 thumbnailUrl = storage.getFilePreview(researchBucket, doc.thumbnailId);
            } catch(e) { console.log("Image error") }

            return {
              id: doc.$id,
              title: doc.title,
              category: doc.category,
              type: doc.type,
              downloads: doc.downloads || 0,
              description: doc.description,
              thumbnail: thumbnailUrl,
              fileId: doc.fileId,
              fileUrl: doc.fileId ? storage.getFileDownload(researchBucket, doc.fileId) : '#',
              author: doc.author,
              date: doc.date,
            };
          })
        );
        setResources(formattedResources);
      } catch (error) {
        console.error('Error fetching resources:', error);
        // Fallback for UI demo if needed, otherwise just toast
        toast.error('Failed to load resources');
      } finally {
        setIsLoading(false);
      }
    };
    fetchResources();
  }, []);

  // Filter Logic
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    if(!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const handleDownload = (resource) => {
    toast.success(`Downloading ${resource.title}...`);
    // Add actual download logic here
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-100 selection:bg-purple-200 dark:selection:bg-purple-900">
      <ToastContainer position="bottom-right" theme="dark" />

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
               <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden md:block font-Eagle">Painters' Diary</span>
          </Link>

          <div className="flex-1 max-w-xl hidden sm:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-400" />
              </div>
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-800 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
             <Link to="/Community/Resources/ResourceUpload" className="hidden md:flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
                <Plus size={16} /> <span>Upload</span>
             </Link>
             <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <User size={16} />
             </div>
          </div>
        </div>
      </nav>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="pt-20 pb-24 md:pb-10 max-w-[1600px] mx-auto px- sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* --- LEFT SIDEBAR (Navigation) --- */}
          <div className="hidden md:block md:col-span-3 lg:col-span-3 relative">
            <div className="sticky top-24 space-y-2">
               <SidebarItem icon={Home} label="Home" to="/" />
               <SidebarItem icon={Blocks} label="Resources" to="/Community/Resources/Hub" active />
               <SidebarItem icon={Bookmark} label="Saved" to="#" />
               <SidebarItem icon={Bell} label="Notifications" to="#" />
               
               <div className="pt-6">
                 <h3 className="px-4 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Categories</h3>
                 {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat.id ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
                    >
                        {cat.name}
                    </button>
                 ))}
               </div>
            </div>
          </div>

          {/* --- MIDDLE COLUMN (Feed) --- */}
          {/* Constrained max width for readability, centered in the column space */}
          <div className="col-span-1 md:col-span-9 lg:col-span-6 min-h-screen">
             <div className="w-full max-w-[600px] mx-auto">
                
                <AnimatePresence mode="wait">
                  {selectedResource ? (
                    // --- DETAIL VIEW ---
                    <DetailView 
                        resource={selectedResource} 
                        onClose={() => setSelectedResource(null)} 
                        onDownload={handleDownload}
                        formatDate={formatDate}
                    />
                  ) : (
                    // --- FEED LIST ---
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Header / Mobile Tabs */}
                        <div className="sticky top-16 z-30 bg-zinc-50/95 dark:bg-black/95 backdrop-blur-md pb-4 pt-2 mb-4 border-b border-zinc-200 dark:border-zinc-800 px-4">
                           <div className="flex items-center justify-between mb-2 md:mb-0">
                              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Resources</h1>
                              <button className="md:hidden p-2 text-zinc-500"><Filter size={18}/></button>
                           </div>
                           
                           {/* Mobile Categories */}
                           <div className="md:hidden flex gap-2 overflow-x-auto hide-scrollbar">
                                {categories.map(cat => (
                                    <button 
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold border ${activeCategory === cat.id ? 'bg-zinc-900 text-white dark:bg-white dark:text-black border-zinc-900 dark:border-white' : 'bg-transparent text-zinc-500 border-zinc-200 dark:border-zinc-800'}`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                           </div>
                        </div>

                        {/* Resource Items */}
                        <div className="space-y-4">
                            {isLoading ? (
                                <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-6 w-6 border-2 border-zinc-500 border-t-transparent"></div></div>
                            ) : filteredResources.length > 0 ? (
                                filteredResources.map(resource => (
                                    <ResourceCard 
                                        key={resource.id} 
                                        resource={resource} 
                                        onClick={() => setSelectedResource(resource)}
                                        formatDate={formatDate}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-20 text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                                    <Blocks className="mx-auto h-12 w-12 mb-4 opacity-20" />
                                    <p>No resources found.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                  )}
                </AnimatePresence>

             </div>
          </div>

          {/* --- RIGHT SIDEBAR (Widgets) --- */}
          <div className="hidden lg:block lg:col-span-3 relative">
             <div className="sticky top-24 space-y-6">
                
                {/* Suggested Artists */}
                <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-bold text-zinc-900 dark:text-white mb-4 text-sm">Suggested Contributors</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center font-bold text-xs shadow-sm">
                                        {i}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-zinc-800 dark:text-zinc-200">Artist_{i}</p>
                                        <p className="text-xs text-zinc-500">@artist{i}</p>
                                    </div>
                                </div>
                                <button className="text-xs font-bold px-3 py-1 rounded-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                    Follow
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trending Tags */}
                <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-bold text-zinc-900 dark:text-white mb-3 text-sm">Trending</h3>
                    <div className="flex flex-wrap gap-2">
                        {['#Tutorial', '#Brushes', '#3DModels', '#Reference'].map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white dark:bg-zinc-800 rounded text-xs text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

             </div>
          </div>

        </div>
      </div>

      {/* --- MOBILE BOTTOM NAV --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 pb-safe">
         <div className="flex items-center justify-around h-16">
            <Link to="/" className="p-2 text-zinc-500"><Home size={24} /></Link>
            <Link to="/Community/Resources/Hub" className="p-2 text-zinc-900 dark:text-white"><Blocks size={24} /></Link>
            <Link to="/Community/Resources/ResourceUpload" className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full shadow-lg -mt-8 border-4 border-zinc-50 dark:border-black"><Plus size={24} /></Link>
            <button className="p-2 text-zinc-500"><Bell size={24} /></button>
            <button className="p-2 text-zinc-500"><User size={24} /></button>
         </div>
      </div>

    </div>
  );
};

// --- SUB-COMPONENTS ---

const SidebarItem = ({ icon: Icon, label, to, active }) => (
    <Link to={to}>
        <div className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${active ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}>
            <Icon size={20} />
            <span className="text-sm">{label}</span>
        </div>
    </Link>
);

const ResourceCard = ({ resource, onClick, formatDate }) => (
    <motion.div 
        layout
        whileHover={{ y: -2 }}
        onClick={onClick}
        className="bg-white dark:bg-zinc-900 rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer"
    >
        <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 font-bold border border-zinc-100 dark:border-zinc-700">
                        {resource.author?.[0]}
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-zinc-900 dark:text-white hover:underline">{resource.author}</h4>
                        <p className="text-[11px] text-zinc-500">{formatDate(resource.date)}</p>
                    </div>
                </div>
                <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <MoreHorizontal size={18} />
                </button>
            </div>

            {/* Content */}
            <div className="mb-3">
                <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-1 leading-snug">{resource.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {resource.description.replace(/<[^>]+>/g, '')}
                </p>
            </div>
            
            {/* Image (if exists) */}
            {resource.thumbnail && (
                <div className="w-full h-52 md:h-80 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-3 border border-zinc-100 dark:border-zinc-800/50">
                    <img src={resource.thumbnail} alt="" className="w-full h-full object-cover" />
                </div>
            )}

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/50">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-zinc-500 hover:text-pink-500 transition-colors text-xs font-medium group">
                        <Heart size={16} className="group-hover:scale-110 transition-transform"/>
                    </button>
                    <button className="flex items-center gap-1.5 text-zinc-500 hover:text-blue-500 transition-colors text-xs font-medium group">
                        <MessageCircle size={16} className="group-hover:scale-110 transition-transform"/>
                    </button>
                    <button className="flex items-center gap-1.5 text-zinc-500 hover:text-green-500 transition-colors text-xs font-medium group">
                        <Download size={16} className="group-hover:scale-110 transition-transform"/>
                        {resource.downloads > 0 && <span>{resource.downloads}</span>}
                    </button>
                </div>
                <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                    <Share2 size={16} />
                </button>
            </div>
        </div>
    </motion.div>
);

const DetailView = ({ resource, onClose, onDownload, formatDate }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white dark:bg-zinc-900 rounded-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-[50vh]"
    >
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center gap-3">
            <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
                <ArrowLeft size={20} />
            </button>
            <span className="font-bold text-zinc-900 dark:text-white">Post</span>
        </div>

        <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center font-bold">
                    {resource.author?.[0]}
                </div>
                <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">{resource.author}</h3>
                    <p className="text-xs text-zinc-500">{formatDate(resource.date)}</p>
                </div>
            </div>

            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">{resource.title}</h1>
            
            {resource.thumbnail && (
                <div className="w-full rounded-xl overflow-hidden mb-6 border border-zinc-200 dark:border-zinc-800">
                    <img src={resource.thumbnail} alt="" className="w-full h-auto object-contain bg-zinc-50 dark:bg-black" />
                </div>
            )}

            <div 
                className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 mb-8 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resource.description) }}
            />

            <button 
                onClick={() => onDownload(resource)}
                className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
            >
                <Download size={18} /> Download Resource
            </button>
        </div>
    </motion.div>
);

export default ResourcesHub;