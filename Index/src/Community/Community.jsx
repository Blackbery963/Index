// // // Community.jsx
// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { FiMenu } from 'react-icons/fi';
// // import { Link, useNavigate, useParams } from 'react-router-dom';
// // import {Query, account, databases} from '../appwriteConfig'
// // import ArtistSpotlight from './CommunityComponents/ArtistSpotlight';

// // const Community = () => {
// //   const {slug} = useParams();
// //   const [isMenuOpen, setIsMenuOpen] = useState(false)
// //   const [myCommunity, setMyCommunity] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();



// //   useEffect(() => {
// //     const fetchCommunity = async () => {
// //       try {
// //         setLoading(true);
// //         setNotFound(false);
        
// //         // First try to fetch by slug if it exists in URL
// //         if (slug) {
// //           const response = await databases.listDocuments(
// //             import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
// //             import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
// //             [Query.equal('slug', slug)]
// //           );

// //           if (response.documents.length > 0) {
// //             setMyCommunity(response.documents[0]);
// //             return;
// //           }
// //           setNotFound(true);
// //         }

// //         // If no slug or community not found by slug, try by user membership
// //         const user = await account.get();
// //         const memberResponse = await databases.listDocuments(
// //           import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
// //           import.meta.env.VITE_APPWRITE_COMMUNITY_MEMBERS_COLLECTION_ID,
// //           [Query.equal('userId', user.$id)]
// //         );

// //         if (memberResponse.documents.length === 0) {
// //           setMyCommunity(null);
// //           return;
// //         }

// //         const memberDoc = memberResponse.documents[0];
// //         const communityResponse = await databases.getDocument(
// //           import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
// //           import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
// //           memberDoc.communityId
// //         );

// //         setMyCommunity(communityResponse);
        
// //         // If we came here via slug but found via user membership, redirect to correct URL
// //         if (slug && communityResponse.slug !== slug) {
// //           navigate(`/community/${communityResponse.slug}`, { replace: true });
// //         }
// //       } catch (error) {
// //         console.error("Error fetching community:", error);
// //         setNotFound(true);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCommunity();
// //   }, [slug, navigate]);

// //   // ... rest of your component code ...

// //    // Handle navigation to community
// //   // const handleCommunityNavigation = () => {
// //   //   if (!myCommunity) {
// //   //     alert("You don't belong to any community yet");
// //   //     navigate('/explore-communities'); // Redirect to explore if no community
// //   //     return;
// //   //   }
// //   //   navigate(`/community/${myCommunity.slug}`);
// //   // };

// //   // Animation variants for staggered children
// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.2,
// //       },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex flex-col font-Playfair">
// //       {/* Navbar - Enhanced Glassmorphism */}
     
// // <motion.nav
// //   initial={{ y: -50, opacity: 0 }}
// //   animate={{ y: 0, opacity: 1 }}
// //   transition={{ duration: 0.6 }}
// //   className="fixed top-4 left-4 right-4 z-50 bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-lg shadow-lg"
// // >
// //   <div className="px-4 py-3 sm:px-6 flex justify-between items-center">
// //     <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Eagle">
// //       ArtVerse
// //     </Link>
    
// //     {/* Desktop Navigation */}
// //     <div className="hidden md:flex items-center gap-6">
// //       {[
// //         {name: 'Home', path: '/'},
// //         {name: 'Resources', path: '/Community/Resources/ResourceHub'},
// //         {name: 'Explore', path: '/community/ExploreCommunity'},
// //         {name: 'Challenges', path: '/community/challenges'},
// //         {name: 'My Community', path: '/community/MyCommunity'}
// //       ].map((item) => (
// //         <motion.div
// //           key={item.name}
// //           whileHover={{ scale: 1.1 }}
// //           className="relative group"
// //         >
// //           <Link
// //             to={item.path}
// //             className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium font-Playfair"
// //           >
// //             {item.name}
// //           </Link>
// //           <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
// //         </motion.div>
// //       ))}
      
// //     </div>
    
// //     {/* Mobile Menu Button */}
// //     <button
// //       className="md:hidden text-gray-700 dark:text-gray-300"
// //       onClick={() => setIsMenuOpen(!isMenuOpen)}
// //       aria-label="Toggle menu"
// //     >
// //       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //         {isMenuOpen ? (
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //         ) : (
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //         )}
// //       </svg>
// //     </button>
// //   </div>
  
// //   {/* Mobile Menu */}
// //   <motion.div
// //     initial={{ height: 0, opacity: 0 }}
// //     animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
// //     transition={{ duration: 0.3 }}
// //     className="md:hidden overflow-hidden bg-white/40 backdrop-blur-md dark:bg-gray-800/40 rounded-b-lg"
// //   >
// //     <div className="px-4 py-3 space-y-2">
// //       {[
// //   { name: 'Home', path: '/' },
// //   { name: 'Resources', path: '/resources' },
// //   { name: 'Explore', path: '/explore-communities' },
// //   {name: 'My Community', path: '/community/MyCommunity'},
// //   { name: 'Challenges', path: '/community/challenges' }
// // ].map((item) => (
// //   <Link
// //     key={item.name}
// //     to={item.path}
// //     className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium py-2 font-Playfair"
// //     onClick={() => setIsMenuOpen(false)}
// //   >
// //     {item.name}
// //   </Link>
// // ))}

// //     </div>
// //   </motion.div>
// // </motion.nav>


// //       {/* Hero Section - Parallax Blobs */}
// //       <section className="relative max-w-7xl mx-auto px-4 py-32 text-center overflow-hidden">
// //         <motion.div
// //           animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
// //           transition={{ duration: 3, repeat: Infinity }}
// //           className="absolute top-0 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
// //         />
// //         <motion.div
// //           animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
// //           transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
// //           className="absolute bottom-0 right-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
// //         />
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.8 }}
// //           className="relative"
// //         >
// //           <h1 className="text-5xl font-bold mb-6 text-gray-800 dark:text-white font-Quicksand">
// //             Art Without Borders. <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300">A Community Without Limits.</span>
// //           </h1>
// //           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 font-Playfair">
// //             Share, learn, and grow with artists worldwide. Get feedback, monetize your work, and join creative challenges.
// //           </p>
// //           <div className="flex justify-center gap-4">
// //            <Link to={'/signup'}>
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-purple-500/20 dark:shadow-purple-400/10"
// //             >
// //               Sign Up Free
// //             </motion.button>
// //            </Link>
// //             <Link to={'/gallery'}>
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-800/50 transition"
// //             >
// //               Explore Galleries
// //             </motion.button>
// //             </Link>
// //           </div>
// //         </motion.div>
// //       </section>

// //       {/* Join or Create Communities */}
// //       <motion.section
// //         variants={containerVariants}
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true }}
// //         className="max-w-7xl mx-auto px-4 py-16 "
// //       >
// //         <motion.h2
// //           variants={itemVariants}
// //           className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
// //         >
// //           <span className="relative"> 
// //             <span className="relative z-10 font-Quicksand">Join or Create Communities</span>
// //             <span className="absolute bottom-0 left-0 w-full h-3 bg-purple-200 dark:bg-purple-900/50 z-0 opacity-60"></span>
// //           </span>
// //         </motion.h2>
// //          <motion.div
// //           variants={containerVariants}
// //           className="grid md:grid-cols-2 gap-8 items-center"
// //         >
// //        {[
// //   {
// //     icon: "👥",
// //     bg: "bg-blue-100 dark:bg-blue-900",
// //     text: "text-blue-600 dark:text-blue-300",
// //     title: "Join Existing Groups",
// //     desc: "Connect with niche communities (e.g., #DigitalArt, #Watercolor, #AI_Art).",
// //     buttonText: "Browse All Communities →",
// //     link: "/community/ExploreCommunity"
// //   },
// //   {
// //     icon: "✨",
// //     bg: "bg-green-100 dark:bg-green-900",
// //     text: "text-green-600 dark:text-green-300",
// //     title: "Start Your Own",
// //     desc: "Create a sub-community with custom rules, moderators, and exclusive events.",
// //     buttonText: "Create a Community →",
// //     link: "/community/CreateCommunity"
// //   },
// // ].map((card, index) => (
// //   <motion.div
// //     key={index}
// //     variants={itemVariants}
// //     whileHover={{ y: -10, rotateX: 5 }}
// //     className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg transition-all hover:shadow-xl border border-gray-100 dark:border-gray-700"
// //   >
// //     <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
// //       <span className={`${card.bg} ${card.text} p-2 rounded-full mr-3`}>{card.icon}</span>
// //       {card.title}
// //     </h3>
// //     <p className="text-gray-600 dark:text-gray-300 mb-4">{card.desc}</p>
// //     <motion.div whileHover={{ scale: 1.05 }}>
// //       <Link
// //         to={card.link}
// //         className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
// //       >
// //         {card.buttonText}
// //       </Link>
// //     </motion.div>
// //   </motion.div>
 
// // ))}
// //  </motion.div>
// //       </motion.section>
// //       {/* Challenges & Rewards */}
// //       <motion.section
// //         variants={containerVariants}
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true }}
// //         className="py-16 bg-gray-100 dark:bg-gray-900/50"
// //       >
// //         <div className="max-w-7xl mx-auto px-4">
// //           <motion.h2
// //             variants={itemVariants}
// //             className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
// //           >
// //             Challenges & <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Quicksand">Rewards</span>
// //           </motion.h2>
// //           <motion.div
// //             variants={containerVariants}
// //             className="grid md:grid-cols-3 gap-6"
// //           >
// //             {[
// //               {
// //                 title: "Weekly Prompt",
// //                 prize: "$100 Prize Pool",
// //                 desc: "New theme every Monday. Winners featured on the homepage.",
// //                 link: '/community/communitychallenges/weeklychallenge'
// //               },
// //               {
// //                 title: "Monthly Masterpiece",
// //                 prize: "Wacom Tablet + $500",
// //                 desc: "Submit your best work. Judged by industry pros.",
// //                 link: "/community/communitychallenges/monthlychallenge"
// //               },
// //               {
// //                 title: "Community Vote",
// //                 prize: "Exclusive Badge",
// //                 desc: "Members pick their favorite art each Friday.",
// //                 link:"/community/communitychallenges/votinggallery"
// //               },
// //             ].map((challenge, index) => (
// //               <motion.div
// //                 key={index}
// //                 variants={itemVariants}
// //                 whileHover={{ scale: 1.03, rotateX: 3 }}
// //                 className={`p-6 rounded-2xl shadow-lg border-l-4 border-purple-500 transition-all bg-white dark:bg-gray-800 dark:border-gray-700`}
// //               >
// //                 <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{challenge.title}</h3>
// //                 <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm mb-3">
// //                   {challenge.prize}
// //                 </span>
// //                 <p className="text-gray-600 dark:text-gray-300 mb-4">{challenge.desc}</p>
// //                <Link 
// //                to={challenge.link}
// //                >
// //                   <motion.button
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                   className="text-sm bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-600"
// //                 >
// //                   Learn More
// //                 </motion.button>
// //                </Link>
// //               </motion.div>
// //             ))}
// //           </motion.div>
// //         </div>
// //       </motion.section>

// //       {/* Publish & Inspire */}
// //       <motion.section
// //         variants={containerVariants}
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true }}
// //         className="max-w-7xl mx-auto px-4 py-16"
// //       >
// //         <motion.h2
// //           variants={itemVariants}
// //           className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white font-Quicksand"
// //         >
// //           Publish & Inspire
// //         </motion.h2>
// //         <motion.div
// //           variants={containerVariants}
// //           className="grid md:grid-cols-2 gap-8"
// //         >
// //           {[
// //             {
// //               icon: "📚",
// //               bg: "bg-yellow-100 dark:bg-yellow-900",
// //               text: "text-yellow-600 dark:text-yellow-300",
// //               title: "Share Tutorials",
// //               desc: "Teach others your techniques—write step-by-step guides or record video demos.",
// //               buttonText: "Publish a Tutorial →",
// //               link:"/Community/Resources/ResourceUpload"
// //             },
// //             {
// //               icon: "💡",
// //               bg: "bg-red-100 dark:bg-red-900",
// //               text: "text-red-600 dark:text-red-300",
// //               title: "Inspire Others",
// //               desc: "Post behind-the-scenes, art struggles, or motivational stories.",
// //               buttonText: "Start a Blog →",
// //               link: '/Journal'
// //             },
// //           ].map((card, index) => (
// //             <motion.div
// //               key={index}
// //               variants={itemVariants}
// //               whileHover={{ y: -10, rotateX: 5 }}
// //               className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg transition-all hover:shadow-xl border border-gray-100 dark:border-gray-700`}
// //             >
// //               <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
// //                 <span className={`${card.bg} ${card.text} p-2 rounded-full mr-3`}>{card.icon}</span>
// //                 {card.title}
// //               </h3>
// //               <p className="text-gray-600 dark:text-gray-300 mb-4">{card.desc}</p>
// //               <Link to={card.link}> 
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
// //               >
// //                 {card.buttonText}
// //               </motion.button>
// //               </Link>
// //             </motion.div>
// //           ))}
// //         </motion.div>
// //       </motion.section>

// //       {/* Live Collaboration Hub */}
// //       <motion.section
// //         variants={containerVariants}
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true }}
// //         className="max-w-7xl mx-auto px-4 py-16"
// //       >
// //         <motion.h2
// //           variants={itemVariants}
// //           className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white font-Quicksand"
// //         >
// //           Live Collaboration Hub
// //         </motion.h2>
// //         <motion.div
// //           variants={itemVariants}
// //           whileHover={{ scale: 1.02 }}
// //           className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
// //         >
// //           <div className="md:flex">
// //             <div className="md:w-1/2 p-8">
// //               <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
// //                 <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 p-2 rounded-full mr-3">🎭</span>
// //                 Real-Time Co-Creation
// //               </h3>
// //               <p className="text-gray-600 dark:text-gray-300 mb-6">
// //                 Invite artists to collaborate on the same canvas, chat via voice/text, and export layered files.
// //               </p>
// //               <ul className="space-y-3 mb-6">
// //                 {[
// //                   "Multi-user drawing sync",
// //                   "Version history",
// //                   "Private or public sessions",
// //                 ].map((feature, i) => (
// //                   <li key={i} className="flex items-center">
// //                     <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 p-1 rounded-full mr-2">✓</span>
// //                     <span className="text-gray-600 dark:text-gray-300">{feature}</span>
// //                   </li>
// //                 ))}
// //               </ul>
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-blue-600"
// //               >
// //                 Start a Session
// //               </motion.button>
// //             </div>
// //             <div className="md:w-1/2 bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-8">
// //               <div className="text-center">
// //                 <motion.div
// //                   animate={{ rotate: [0, 5, -5, 0] }}
// //                   transition={{ duration: 4, repeat: Infinity }}
// //                   className="inline-block bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xs mb-4"
// //                 >
// //                   <span className="text-4xl">🖌️</span>
// //                 </motion.div>
// //                 <p className="text-gray-500 dark:text-gray-400">Live preview of collaborative artwork</p>
// //               </div>
// //             </div>
// //           </div>
// //         </motion.div>
// //       </motion.section>


// //       <ArtistSpotlight/>

// //       {/* Resource Library */}
// //       <motion.section
// //         variants={containerVariants}
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true }}
// //         className="max-w-7xl mx-auto px-4 py-16"
// //       >
// //         <motion.h2
// //           variants={itemVariants}
// //           className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white font-Quicksand"
// //         >
// //           Free Resource Library
// //         </motion.h2>
// //         <motion.div
// //           variants={containerVariants}
// //           className="grid md:grid-cols-3 gap-6"
// //         >
// //           {[
// //             { icon: "🖌️", title: "Procreate Brushes", downloads: "1.2K" },
// //             { icon: "🎨", title: "PSD Templates", downloads: "890" },
// //             { icon: "🖥️", title: "3D Models", downloads: "456" },
// //           ].map((resource, index) => (
// //             <motion.div
// //               key={index}
// //               variants={itemVariants}
// //               whileHover={{ y: -10, rotateX: 5 }}
// //               className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
// //             >
// //               <span className="text-4xl mb-4 block">{resource.icon}</span>
// //               <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{resource.title}</h3>
// //               <p className="text-gray-500 dark:text-gray-400 mb-4">{resource.downloads}+ downloads</p>
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-white py-2 rounded-lg hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 transition"
// //               >
// //                 Download
// //               </motion.button>
// //             </motion.div>
// //           ))}
// //         </motion.div>
// //         <Link to={"/Community/Resources/ResourceHub"}>       
// //         <motion.div variants={itemVariants} className="text-center mt-8">
// //           <motion.button
// //             whileHover={{ scale: 1.05 }}
// //             className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
// //           >
// //             Browse All Resources →
// //           </motion.button>
// //         </motion.div>
// //         </Link>
// //       </motion.section>
// //       {/* Event Calendar */}
// //       {/* <MainCalenderService/> */}


// //       {/* Footer */}
// //       <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 py-12">
// //         <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
// //           <div>
// //             <h3 className="text-xl font-bold mb-4 text-white">ArtVerse</h3>
// //             <p className="text-gray-400 mb-4">The future of art communities.</p>
// //             <div className="flex gap-4">
// //               {["twitter", "instagram", "discord"].map((social) => (
// //                 <motion.a
// //                   key={social}
// //                   whileHover={{ scale: 1.2 }}
// //                   href="#"
// //                   className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
// //                 >
// //                   <span className="text-lg">{social === 'twitter' ? '𝕏' : social === 'instagram' ? '📷' : '💬'}</span>
// //                 </motion.a>
// //               ))}
// //             </div>
// //           </div>
// //           <div>
// //             <h4 className="font-semibold mb-4 text-white">Features</h4>
// //             <ul className="space-y-2 text-gray-400">
// //               {["Portfolios", "Challenges", "Monetization"].map((item) => (
// //                 <li key={item}>
// //                   <motion.a
// //                     whileHover={{ x: 5 }}
// //                     href="#"
// //                     className="hover:text-purple-400 hover:underline"
// //                   >
// //                     {item}
// //                   </motion.a>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //           <div>
// //             <h4 className="font-semibold mb-4 text-white">Company</h4>
// //             <ul className="space-y-2 text-gray-400">
// //               {["About", "Careers", "Press"].map((item) => (
// //                 <li key={item}>
// //                   <motion.a
// //                     whileHover={{ x: 5 }}
// //                     href="#"
// //                     className="hover:text-purple-400 hover:underline"
// //                   >
// //                     {item}
// //                   </motion.a>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //           <div>
// //             <h4 className="font-semibold mb-4 text-white">Stay Updated</h4>
// //             <div className="flex mb-4">
// //               <input
// //                 type="email"
// //                 placeholder="Your email"
// //                 className="bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none w-full border border-gray-600 focus:border-purple-500"
// //               />
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2 rounded-r-lg hover:from-purple-700 hover:to-blue-600"
// //               >
// //                 Join
// //               </motion.button>
// //             </div>
// //             <p className="text-sm text-gray-500">No spam, just creative inspiration</p>
// //           </div>
// //         </div>
// //         <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-500">
// //           <p>© 2025 ArtVerse. All rights reserved.</p>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default Community;




// // Community.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Query, account, databases } from '../appwriteConfig';
// import Navbar from './CommunityComponents/Navbar';
// import HeroSection from './CommunityComponents/HeroSection';
// import CommunityActions from './CommunityComponents/CommunityActions';
// import ChallengesSection from './CommunityComponents/ChallengesSection';
// import CollaborationHub from './CommunityComponents/CollaborationHub';
// import ResourceLibrary from './CommunityComponents/ResourceLibrary';
// import Footer from './CommunityComponents/Footer';
// import ModernEventCalendar from './CommunityComponents/MainCalenderService';
// import ArtistSpotlight from './CommunityComponents/ArtistSpotlight';
// const Community = () => {
//   const { slug } = useParams();
//   const [myCommunity, setMyCommunity] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [notFound, setNotFound] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCommunity = async () => {
//       try {
//         setLoading(true);
//         setNotFound(false);
        
//         if (slug) {
//           const response = await databases.listDocuments(
//             import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
//             import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
//             [Query.equal('slug', slug)]
//           );

//           if (response.documents.length > 0) {
//             setMyCommunity(response.documents[0]);
//             return;
//           }
//           setNotFound(true);
//         }

//         const user = await account.get();
//         const memberResponse = await databases.listDocuments(
//           import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
//           import.meta.env.VITE_APPWRITE_COMMUNITY_MEMBERS_COLLECTION_ID,
//           [Query.equal('userId', user.$id)]
//         );

//         if (memberResponse.documents.length === 0) {
//           setMyCommunity(null);
//           return;
//         }

//         const memberDoc = memberResponse.documents[0];
//         const communityResponse = await databases.getDocument(
//           import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
//           import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
//           memberDoc.communityId
//         );

//         setMyCommunity(communityResponse);
        
//         if (slug && communityResponse.slug !== slug) {
//           navigate(`/community/${communityResponse.slug}`, { replace: true });
//         }
//       } catch (error) {
//         console.error("Error fetching community:", error);
//         setNotFound(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCommunity();
//   }, [slug, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//       <Navbar />
//       <HeroSection />
//       <CommunityActions />
//       <ChallengesSection />
//       <CollaborationHub />
//       <ResourceLibrary />
//       <ArtistSpotlight />
//       <ModernEventCalendar />
//       <Footer/>
//     </div>
//   );
// };

// export default Community;


import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Query, account, databases } from "../appwriteConfig";

// Keep your existing imports
// import Navbar from "./CommunityComponents/Navbar";
// import HeroSection from "./CommunityComponents/HeroSection";

const Navbar = lazy(() => import("./CommunityComponents/Navbar"));
const HeroSection = lazy(() => import("./CommunityComponents/HeroSection"));
const CommunityActions = lazy(() => import("./CommunityComponents/CommunityActions"));
const ChallengesSection = lazy(() => import("./CommunityComponents/ChallengesSection"));
const CollaborationHub = lazy(() => import("./CommunityComponents/CollaborationHub"));
const ResourceLibrary = lazy(() => import("./CommunityComponents/ResourceLibrary"));
const ModernEventCalendar = lazy(() => import("./CommunityComponents/MainCalenderService"));
const ArtistSpotlight = lazy(() => import("./CommunityComponents/ArtistSpotlight"));
const Footer = lazy(() => import("./CommunityComponents/Footer"));

// A warm, high-quality image representing connection and unity
const bgImage = "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=2070";

const Community = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- Simplified Fetch Logic ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Note: I kept your logic intact but removed unused state (myCommunity) 
        // if you aren't passing it down. If you need it, add it back to props.
        
        let communityDoc = null;

        if (slug) {
          const res = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
            [Query.equal("slug", slug)]
          );
          if (res.documents.length) communityDoc = res.documents[0];
        } else {
          const user = await account.get();
          const membership = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COMMUNITY_MEMBERS_COLLECTION_ID,
            [Query.equal("userId", user.$id)]
          );

          if (membership.documents.length) {
            communityDoc = await databases.getDocument(
              import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
              import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
              membership.documents[0].communityId
            );
          }
        }

        if (slug && communityDoc && communityDoc.slug !== slug) {
          navigate(`/community/${communityDoc.slug}`, { replace: true });
        }
      } catch (err) {
        console.error("Failed to load community:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, navigate]);

  // --- Minimal Loading Screen ---
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <h2 className=" text-xl text-gray-900 dark:text-gray-300"> 
          Loading Community...
        </h2>
      </div>
    );
  }

  // --- MAIN PAGE ---
  return (
    <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950">
      
      {/* PERFORMANCE FIX: 
        1. Fixed background attachment prevents jitter.
        2. Removed 'backdrop-blur' from this overlay. This is crucial. 
           Glassmorphism on top of a global blur kills performance.
      */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-20 pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Subtle Gradient Overlay for Readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-white/80 via-white/50 to-white/90 dark:from-slate-950/80 dark:via-slate-950/50 dark:to-slate-950/90 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        
        <main className="flex flex-col gap-12 pb-20">
          <HeroSection />

          <Suspense fallback={<div className="h-96 w-full" />}>
            <div className="space-y-12">
              <CommunityActions />
              <ChallengesSection />
              <CollaborationHub />
              <ResourceLibrary />
              <ArtistSpotlight />
              <ModernEventCalendar />
            </div>
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default Community;