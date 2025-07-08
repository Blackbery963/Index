

// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBook, FaInfoCircle, FaHome, FaUser } from 'react-icons/fa';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { motion } from 'framer-motion';
// import introBackground from './About-images/side-view-man-holding-painting-brush.jpg';
// import uploadBackground from './About-images/4860763.jpg';
// import DiaryBackground from './About-images/3991843.jpg';
// import CollabBackground from './About-images/19198668.jpg';
// import whyBackground from './About-images/6943381.jpg';
// import diffBackground from './About-images/5197176.jpg';
// import callBackground from './About-images/3631943.jpg';
// import visionBackground from './About-images/4346104.jpg';

// function About() {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       easing: 'ease-in-out',
//       once: false, // Animate only once
//     });
//   }, []);

//   // Framer Motion variants for sections
//   const sectionVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
//   };

//   // Framer Motion variants for images
//   const imageVariants = {
//     hidden: { scale: 0.8, opacity: 0 },
//     visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
//     hover: { scale: 1.05, transition: { duration: 0.3 } },
//   };

//   return (
//     <div className="max-w-full min-h-screen bg-[#edf2fa] overflow-x-hidden overflow-y-auto pb-8">
//       <header className="h-[100px] w-full bg-gradient-to-l from-black/80 via-blue-950/80 to-black/20 backdrop-blur-md flex items-center justify-between px-4 md:px-6 shadow-lg text-white fixed top-0 z-50">
//         <h1 className="lg:text-[35px] md:text-[30px] sm:text-[25px] text-[20px] font-bold font-Eagle">
//           Painters' Diary
//         </h1>
//         <div className="flex items-center justify-center gap-x-2">
//           <Link to="/">
//             <button className="lg:px-4 px-2 py-1 bg-blue-700/50 hover:bg-blue-800/80 rounded-md font-Playfair text-white border border-gray-400 text-[18px]">
//               <FaHome className="text-xl sm:hidden" />
//               <span className="hidden sm:inline">Home</span>
//             </button>
//           </Link>
//           <Link to="/About">
//             <button className="lg:px-4 px-2 py-1 bg-blue-700/80 rounded-md font-Playfair text-white border border-gray-400 text-[18px]">
//               <FaInfoCircle className="text-xl sm:hidden" />
//               <span className="hidden sm:inline">About</span>
//             </button>
//           </Link>
//           <Link to="/Account">
//             <button className="lg:px-4 px-2 py-1 bg-blue-700/50 hover:bg-blue-800/80 rounded-md font-Playfair text-white border border-gray-400 text-[18px]">
//               <FaUser className="text-xl sm:hidden" />
//               <span className="hidden sm:inline">Account</span>
//             </button>
//           </Link>
//           <Link to="/Journal">
//             <button className="lg:px-4 px-2 py-1 bg-blue-700/50 hover:bg-blue-800/80 rounded-md font-Playfair text-white border border-gray-400 text-[18px]">
//               <FaBook className="text-xl sm:hidden" />
//               <span className="hidden sm:inline">Diary</span>
//             </button>
//           </Link>
//         </div>
//       </header>

//       <main className="w-screen h-full flex flex-col gap-y-8 items-center justify-center mt-[150px]">
//         {/* Introduction Section */}
//         <motion.div
//           className="lg:w-[80vw] w-[95vw] sm:w-[88vw] h-[80vh] rounded-md flex flex-col items-center justify-center lg:px-36 sm:px-20 px-8"
//           style={{
//             backgroundImage: `url(${introBackground})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//           variants={sectionVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.h1
//             className="lg:text-[50px] sm:text-[40px] text-[35px] font-Playfair font-semibold text-[#79021c] text-center"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//           >
//             Painters' Diary: A Canvas for Every Artist's Journey
//           </motion.h1>
//           <motion.p
//             className="text-center lg:text-[25px] sm:text-[20px] text-[18px] font-Upright font-bold text-[#e7e4eb]"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.8 }}
//           >
//             Painters' Diary is a dedicated space for artists to showcase their creativity,
//                 journey, and collaborations. Whether you're a painter, illustrator, or mixed-media artist,
//                 this platform is your creative diary—to express, share, and grow. More than just a gallery,
//                 it’s a thriving community where every brushstroke and idea finds its place.
//           </motion.p>
//         </motion.div>

//         {/* What We Offer Section */}
//         <div className="w-[95vw] sm:w-[88vw] lg:w-[80vw] rounded-md h-auto border border-gray-500 overflow-hidden p-4">
//           {/* Upload Section */}
//           <motion.section
//             className="flex flex-col md:flex-row items-center justify-center gap-4 h-auto md:h-[50vh]"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             <div
//               data-aos="fade-right"
//               data-aos-delay="100"
//               className="w-full text-center flex flex-col items-center justify-center gap-4 p-4"
//             >
//               <h1 className="text-[25px] sm:text-[30px] lg:text-[35px] font-Playfair font-semibold text-[#e74c3c]">
//                 Showcase Your Artwork: Upload & Inspire
//               </h1>
//               <p className="text-[18px] sm:text-[20px] lg:text-[25px] font-Upright font-bold text-[#677bab]">
//                  Easily upload your artwork and share your creative vision with the world. Whether it’s a painting, illustration, or mixed-media piece, Painters' Diary provides a space for your art to be seen, appreciated, and celebrated. Let your work tell its story and connect with a community of fellow artists.
//               </p>
//             </div>
//             <motion.div
//               data-aos="zoom-in"
//               data-aos-delay="200"
//               className="w-full md:w-[40%] h-[40vh] md:h-full p-4"
//               variants={imageVariants}
//               initial="hidden"
//               whileInView="visible"
//               whileHover="hover"
//               viewport={{ once: true }}
//             >
//               <img
//                 className="w-full h-full object-cover rounded-md border border-black/20"
//                 src={uploadBackground}
//                 alt="Upload Artwork"
//               />
//             </motion.div>
//           </motion.section>

//           {/* Diary Section */}
//           <motion.section
//             className="flex flex-col-reverse md:flex-row items-center justify-center gap-4 h-auto md:h-[50vh]"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             <motion.div
//               data-aos="zoom-in"
//               data-aos-delay="200"
//               className="w-full md:w-[40%] h-[40vh] md:h-full p-4"
//               variants={imageVariants}
//               initial="hidden"
//               whileInView="visible"
//               whileHover="hover"
//               viewport={{ once: true }}
//             >
//               <img
//                 className="w-full h-full object-cover rounded-md border border-black/20"
//                 src={DiaryBackground}
//                 alt="Artistic Diary"
//               />
//             </motion.div>
//             <div
//               data-aos="fade-left"
//               data-aos-delay="100"
//               className="w-full text-center flex flex-col items-center justify-center gap-4 p-4"
//             >
//               <h1 className="text-[25px] sm:text-[30px] lg:text-[35px] font-Playfair font-semibold text-[#262d79]">
//                 Unfold Your Creativity: Share Your Artistic Diary
//               </h1>
//               <p className="text-[18px] sm:text-[20px] lg:text-[25px] font-Upright font-bold text-[#677bab]">
//                Share your thoughts, inspirations, and creative process by uploading your artist’s diary. Whether it's sketches, ideas, or personal reflections, Painters' Diary lets you preserve and showcase your artistic growth. Your journey is just as valuable as your artwork—let it inspire others!
//               </p>
//             </div>
//           </motion.section>

//           {/* Collaboration Section */}
//           <motion.section
//             className="flex flex-col md:flex-row items-center justify-center gap-4 h-auto md:h-[50vh]"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             <div
//               data-aos="fade-right"
//               data-aos-delay="100"
//               className="w-full text-center flex flex-col items-center justify-center gap-4 p-4"
//             >
//               <h1 className="text-[25px] sm:text-[30px] lg:text-[35px] font-Playfair font-semibold text-[#850F8D]">
//                 Collaborate & Connect: Join Artistic Forces
//               </h1>
//               <p className="text-[18px] sm:text-[20px] lg:text-[25px] font-Upright font-bold text-[#677bab]">
// Discover the power of collaboration in art. Work with fellow artists, blend creative styles, and build something unique together. Painters' Diary offers a platform where ideas merge and artistic friendships thrive. Let your creativity flow beyond boundaries!

//               </p>
//             </div>
//             <motion.div
//               data-aos="zoom-in"
//               data-aos-delay="200"
//               className="w-full md:w-[40%] h-[40vh] md:h-full p-4"
//               variants={imageVariants}
//               initial="hidden"
//               whileInView="visible"
//               whileHover="hover"
//               viewport={{ once: true }}
//             >
//               <img
//                 className="w-full h-full object-cover rounded-md border border-black/20"
//                 src={CollabBackground}
//                 alt="Collaboration"
//               />
//             </motion.div>
//           </motion.section>
//         </div>

//         {/* Why Painters' Diary Section */}
//         <motion.div
//           className="w-[95vw] sm:w-[88vw] lg:w-[80vw] h-auto lg:h-[70vh] rounded-md flex flex-col lg:flex-row items-center justify-center border border-gray-500 overflow-hidden p-4 gap-y-2"
//           variants={sectionVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <div
//             data-aos="fade-up"
//             data-aos-delay="100"
//             className="w-full lg:w-[50%] flex flex-col items-center justify-center px-6 text-center lg:text-left gap-4"
//           >
//             <h1 className="text-[25px] sm:text-[30px] lg:text-[35px] font-Playfair font-semibold text-[#5b8c5a]">
//               Why Painters' Diary? A Home for Every Artist
//             </h1>
//             <p className="text-[18px] sm:text-[20px] lg:text-[25px] font-Upright font-bold text-[#677bab]">
// Painters' Diary is more than just a platform—it’s a space where artists can truly express themselves. Unlike social media, which focuses on trends, we prioritize creativity, storytelling, and artistic growth. Whether you want to showcase your work, document your journey, or collaborate with fellow artists, this is your creative sanctuary.

//             </p>
//           </div>
//           <motion.div
//             data-aos="flip-left"
//             data-aos-delay="200"
//             className="w-full lg:w-[50%] h-[40vh] lg:h-full"
//             variants={imageVariants}
//             initial="hidden"
//             whileInView="visible"
//             whileHover="hover"
//             viewport={{ once: true }}
//           >
//             <img className="w-full h-full object-cover rounded-md" src={whyBackground} alt="Why Painters" />
//           </motion.div>
//         </motion.div>

//         {/* What Sets Us Apart Section */}
//         <motion.div
//           className="w-[95vw] sm:w-[88vw] lg:w-[80vw] h-auto lg:h-[70vh] rounded-md flex flex-col lg:flex-row items-center justify-center border border-gray-500 overflow-hidden p-4 gap-y-2"
//           variants={sectionVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <motion.div
//             data-aos="flip-right"
//             data-aos-delay="200"
//             className="w-full lg:w-[50%] h-[40vh] lg:h-full"
//             variants={imageVariants}
//             initial="hidden"
//             whileInView="visible"
//             whileHover="hover"
//             viewport={{ once: true }}
//           >
//             <img className="w-full h-full object-cover rounded-md" src={diffBackground} alt="What Sets Us Apart" />
//           </motion.div>
//           <div
//             data-aos="fade-up"
//             data-aos-delay="100"
//             className="w-full lg:w-[50%] flex flex-col items-center justify-center px-6 text-center lg:text-left gap-4"
//           >
//             <h1 className="text-[25px] sm:text-[30px] lg:text-[35px] font-Playfair font-semibold text-[#7971ea]">
//               What Sets Us Apart: A Platform Designed for Artists
//             </h1>
//             <p className="text-[18px] sm:text-[20px] lg:text-[25px] font-Upright font-bold text-[#677bab]">
//                       Unlike generic social media or art galleries, Painters' Diary is built for artists who value storytelling, creativity, and meaningful connections. Here, your art isn't just displayed—it’s part of a journey. With features like diary uploads, collaborations, and a unique unfolding experience, we provide a space where every artist's voice is heard and celebrated.
//             </p>
//           </div>
//         </motion.div>

//         {/* Vision Section */}
//         <motion.div
//           className="w-[95vw] sm:w-[88vw] lg:w-[80vw] h-[70vh] lg:px-36 sm:px-20 px-8 rounded-md flex flex-col lg:flex-row items-center justify-center border border-gray-500 overflow-hidden p-4 gap-y-2"
//           style={{
//             backgroundImage: `url(${visionBackground})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//           variants={sectionVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <motion.div
//             data-aos="zoom-in-up"
//             data-aos-delay="100"
//             className="backdrop-blur-md flex flex-col items-center justify-center gap-y-4 p-4 border border-black/20 rounded-md bg-[#f7f7f72f] bg-opacity-80"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             <h1 className="text-[25px] sm:text-[30px] lg:text-[35px] font-Playfair font-semibold text-center text-[#6A1E55]">
//              Uniting Artists Through Creativity: A Journey Beyond Boundaries
//             </h1>
//             <p className="text-[18px] sm:text-[20px] lg:text-[25px] font-Upright font-bold text-center text-[#3B1E54]">
//              Art has the power to transcend borders, cultures, and languages. Painters' Diary was born in India with the vision of creating a global platform where artists can share their creativity, stories, and inspirations. What starts here will grow into a worldwide community—connecting artists from every corner of the world, fostering collaboration, and celebrating the universal language of art. Join us in building a space where creativity knows no boundaries!
//             </p>
//           </motion.div>
//         </motion.div>

//         {/* Call to Action Section */}
//         <motion.div
//           className="w-[95vw] sm:w-[88vw] lg:w-[80vw] h-auto lg:h-[70vh] bg-[#c7a5aa] rounded-md flex flex-col lg:flex-row items-center justify-center border border-gray-500 overflow-hidden p-4 gap-y-2"
//           variants={sectionVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <div
//             data-aos="fade-up"
//             data-aos-delay="100"
//             className="w-full lg:w-[50%] flex flex-col items-center justify-center px-6 text-center lg:text-left gap-4"
//           >
//             <h1 className="text-[25px] sm:text-[30px] lg:text-[35px] font-Playfair font-semibold text-[#21191c] text-left">
//               Join the Journey: Create, Share, and Inspire!
//             </h1>
//             <p className="text-[18px] sm:text-[20px] lg:text-[25px] font-Upright font-bold text-[#395e77]">
//                      Be part of a vibrant community where artists express their creativity, connect with like-minded individuals, and grow together. Upload your artwork, document your artistic journey, and collaborate on inspiring projects. At Painters' Diary, every brushstroke and idea matters. Start your journey today and let the world see your story unfold!
//             </p>
//           </div>
//           <motion.div
//             data-aos="flip-left"
//             data-aos-delay="200"
//             className="w-full lg:w-[50%] h-[40vh] lg:h-full"
//             variants={imageVariants}
//             initial="hidden"
//             whileInView="visible"
//             whileHover="hover"
//             viewport={{ once: true }}
//           >
//             <img className="w-full h-full object-cover rounded-md" src={callBackground} alt="Join the Journey" />
//           </motion.div>
//         </motion.div>
//       </main>
//     </div>
//   );
// }

// export default About;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaBook, FaInfoCircle, FaHome, FaUser, FaPalette, FaUpload, FaUsers } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// function About() {
//   // Framer Motion variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   const features = [
//     {
//       icon: <FaPalette className="text-4xl mb-4 text-indigo-600" />,
//       title: "Showcase Your Artwork",
//       description: "Upload and display your paintings, illustrations, and mixed-media creations in a clean, professional gallery."
//     },
//     {
//       icon: <FaBook className="text-4xl mb-4 text-indigo-600" />,
//       title: "Document Your Journey",
//       description: "Share your creative process, sketches, and artistic evolution through your personal artist's diary."
//     },
//     {
//       icon: <FaUsers className="text-4xl mb-4 text-indigo-600" />,
//       title: "Connect & Collaborate",
//       description: "Find like-minded artists, exchange ideas, and work together on exciting creative projects."
//     }
//   ];

//   const values = [
//     {
//       title: "Creativity First",
//       description: "We prioritize artistic expression over algorithms, giving your work the attention it deserves."
//     },
//     {
//       title: "Community Focus",
//       description: "A supportive network where artists encourage and inspire each other's growth."
//     },
//     {
//       title: "Global Vision",
//       description: "Born in India with a worldwide perspective, connecting artists across borders."
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-800 font-Eagle">Painters' Diary</h1>
//           <nav className="flex space-x-4">
//             <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center">
//               <FaHome className="mr-1" /> Home
//             </Link>
//             <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-100 text-indigo-700 flex items-center">
//               <FaInfoCircle className="mr-1" /> About
//             </Link>
//             <Link to="/account" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center">
//               <FaUser className="mr-1" /> Account
//             </Link>
//             <Link to="/journal" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center">
//               <FaBook className="mr-1" /> Diary
//             </Link>
//           </nav>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6 py-12">
//         {/* Hero Section */}
//         <motion.section 
//           className="text-center mb-20"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <motion.h1 
//             className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//           >
//             A Canvas for Every Artist's Journey
//           </motion.h1>
//           <motion.p 
//             className="text-xl text-gray-600 max-w-3xl mx-auto"
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.8 }}
//           >
//             Painters' Diary is a dedicated space where artists can showcase their work, document their creative process, and connect with a community that values authentic artistic expression.
//           </motion.p>
//         </motion.section>

//         {/* Features */}
//         <motion.section 
//           className="mb-20"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//         >
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What We Offer</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <motion.div 
//                 key={index}
//                 className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
//                 variants={itemVariants}
//                 whileHover={{ y: -5 }}
//               >
//                 <div className="text-center">
//                   {feature.icon}
//                   <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
//                   <p className="text-gray-600">{feature.description}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>

//         {/* Values */}
//         <motion.section 
//           className="mb-20"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
//           <div className="space-y-8 max-w-3xl mx-auto">
//             {values.map((value, index) => (
//               <motion.div 
//                 key={index}
//                 className="bg-white p-6 rounded-lg shadow-sm"
//                 variants={itemVariants}
//               >
//                 <h3 className="text-xl font-semibold mb-2 text-indigo-700">{value.title}</h3>
//                 <p className="text-gray-600">{value.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>

//         {/* Story */}
//         <motion.section 
//           className="mb-20 bg-white rounded-xl p-8 shadow-sm"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Story</h2>
//           <div className="max-w-3xl mx-auto space-y-6 text-gray-600">
//             <p>
//               Painters' Diary began as a passion project in India, born from the idea that artists deserve a platform focused on their creative journey rather than social metrics.
//             </p>
//             <p>
//               What started as a small community has grown into an international network of artists who value authenticity, creativity, and meaningful connections.
//             </p>
//             <p>
//               Today, we're proud to support thousands of artists worldwide in sharing their work and stories.
//             </p>
//           </div>
//         </motion.section>

//         {/* CTA */}
//         <motion.section 
//           className="text-center"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Begin Your Journey?</h2>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//             Join our community of artists today and share your creativity with the world.
//           </p>
//           <div className="flex justify-center space-x-4">
//             <Link 
//               to="/signup" 
//               className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
//             >
//               Create Account
//             </Link>
//             <Link 
//               to="/gallery" 
//               className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//             >
//               Explore Gallery
//             </Link>
//           </div>
//         </motion.section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white border-t py-8 mt-12">
//         <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
//           <p>© {new Date().getFullYear()} Painters' Diary. All rights reserved.</p>
//           <p className="mt-2">Created with ❤️ for artists worldwide</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default About;


import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaInfoCircle, FaHome, FaUser, FaPalette, FaUpload, FaUsers, FaGlobe, FaBrush, FaLightbulb } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
function About() {
  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }
    }
  };
  const features = [
    {
      icon: <FaPalette className="text-4xl mb-4 text-indigo-600" />,
      title: "Artwork Gallery",
      description: "Showcase your paintings, illustrations, and digital art in a beautifully curated gallery that highlights your unique style and technique."
    },
    {
      icon: <FaBook className="text-4xl mb-4 text-indigo-600" />,
      title: "Creative Journal",
      description: "Document your artistic journey with our diary feature—share sketches, concepts, and the stories behind your creations."
    },
    {
      icon: <FaUsers className="text-4xl mb-4 text-indigo-600" />,
      title: "Artist Community",
      description: "Connect with fellow artists worldwide, exchange feedback, and find collaborators for your next project."
    },
    {
      icon: <FaGlobe className="text-4xl mb-4 text-indigo-600" />,
      title: "Global Exposure",
      description: "Get discovered by art enthusiasts and potential buyers from around the world through our international platform."
    },
    {
      icon: <FaBrush className="text-4xl mb-4 text-indigo-600" />,
      title: "Creative Resources",
      description: "Access tutorials, artist interviews, and inspiration to help refine your skills and artistic vision."
    },
    {
      icon: <FaLightbulb className="text-4xl mb-4 text-indigo-600" />,
      title: "Art Challenges",
      description: "Participate in themed challenges to push your creative boundaries and gain recognition."
    }
  ];

  const platformStats = [
    { value: "10,000+", label: "Artworks Shared" },
    { value: "2,500+", label: "Active Artists" },
    { value: "50+", label: "Countries Represented" },
    { value: "100+", label: "Collaborations" }
  ];
  const [activeButton, setActiveButton] = useState('About');

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Roboto', sans-serif" }}>
      {/* Header */}
    
              <header className='fixed top-0 h-[80px] w-full bg-white/20 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 shadow-md z-50'>
                {/* Logo Section */}
              <Link to={'/'}>
                <div className='flex items-center'>
                  <h1 className='lg:text-[35px] md:text-[30px] sm:text-[25px] text-[21px] font-bold font-Eagle text-black'>Painters' Diary</h1>
                </div>
              </Link>
                {/* Navigation Buttons */}
                <div className='flex items-center gap-x-2 sm:gap-x-4'>
                  {/* Desktop Navigation */}
                  <nav className='hidden md:flex gap-x-4 text-black font-Playfair font-bold'>
                    <Link to='/'>
                      <button 
                        className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'home' ? 'bg-gray-600/50' : ''}`}
                        onClick={() => setActiveButton('home')}
                      >
                        <FaHome />
                        <span className="ml-1">Home</span>
                      </button>
                    </Link>
                    <Link to='/About'> 
                      <button 
                        className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'about' ? 'bg-gray-600/50' : ''}`}
                        onClick={() => setActiveButton('about')}
                      >
                        <FaInfoCircle />
                        <span className="ml-1">About</span>
                      </button>
                    </Link>
                    <Link to='/Account'>
                      <button 
                        className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'account' ? 'bg-gray-600/50' : ''}`}
                        onClick={() => setActiveButton('account')}
                      >
                        <FaUser />
                        <span className="ml-1">Account</span>
                      </button>
                    </Link>
                    <Link to='/Landscape'>
                      <button 
                        className={`px-2 py-1 rounded-md transition-all bg-blue-500 text-white flex items-center justify-center gap-1 ${activeButton === 'landscape' ? 'bg-blue-600' : ''}`}
                        onClick={() => setActiveButton('landscape')}
                      >
                        <FaPalette />
                        <span className="ml-1">Gallery</span>
                      </button>
                    </Link>
                  </nav>
                  {/* Mobile Menu Button */}
                  <button 
                    className="md:hidden p-2 text-black hover:text-gray-800 transition-all duration-300"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                  >
                    {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
                  </button>
                </div>
              </header>
              {/* Mobile Dropdown Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.nav
                    className="md:hidden fixed top-[85px] right-2 w-36 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-md z-40 rounded-lg"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="flex flex-col items-center py-4 gap-y-3 font-Playfair font-bold text-black dark:text-gray-100">
                      <Link to='/' onClick={() => { setActiveButton('home'); toggleMenu(); }}>
                        <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                          <FaHome />
                          Home
                        </button>
                      </Link>
                      <Link to='/About' onClick={() => { setActiveButton('about'); toggleMenu(); }}>
                        <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                          <FaInfoCircle />
                          About
                        </button>
                      </Link>
                      <Link to='/Account' onClick={() => { setActiveButton('account'); toggleMenu(); }}>
                        <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                          <FaUser />
                          Account
                        </button>
                      </Link>
                      <Link to='/Landscape' onClick={() => { setActiveButton('landscape'); toggleMenu(); }}>
                        <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg`}>
                          <FaPalette />
                          Gallery
                        </button>
                      </Link>
                    </div>
                  </motion.nav>
                )}
              </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 py-12 mt-[85px]">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-Roboto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Where Every Stroke Tells a Story
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Painters' Diary is more than a portfolio platform—it's a creative ecosystem designed to nurture artists at every stage of their journey, from emerging talents to established professionals.
          </motion.p>
        </motion.section>

        {/* Platform Introduction */}
        <motion.section 
          className="mb-20 bg-white rounded-xl p-8 shadow-sm"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 font-Playfair">
            About Painters' Diary
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-gray-600 text-lg">
            <p>
              Founded in 2025, Painters' Diary was created to address the unique needs of visual artists seeking a dedicated space to showcase their work and document their creative process.
            </p>
            <p>
              Unlike social media platforms that prioritize viral content, we've built a community that values artistic integrity, technical skill, and creative exploration.
            </p>
            <p>
              Our platform combines the best elements of a digital gallery, artist journal, and professional network—all designed specifically for painters, illustrators, and mixed-media artists.
            </p>
          </div>
        </motion.section>

        {/* Features */}
        <motion.section 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
            Platform Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-3 text-gray-800" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section 
          className="mb-20 bg-indigo-50 rounded-xl p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
            By The Numbers
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {platformStats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-indigo-700 mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Artist Testimonials */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Artists Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-gray-600 italic mb-4">
                "Painters' Diary has transformed how I document my creative process. The journal feature helps me reflect on my artistic growth in ways I never could before."
              </div>
              <div className="font-semibold text-indigo-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                — Sarah K., Watercolor Artist
              </div>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-gray-600 italic mb-4">
                "I've connected with more collaborators in 6 months on Painters' Diary than in 5 years on social media. This platform understands what artists really need."
              </div>
              <div className="font-semibold text-indigo-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                — Miguel R., Digital Illustrator
              </div>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-gray-600 italic mb-4">
                "The clean presentation of my portfolio has helped me secure three commissions already. Clients appreciate seeing my work without distractions."
              </div>
              <div className="font-semibold text-indigo-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                — Aisha T., Portrait Painter
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Begin Your Artistic Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of artists who are already documenting, sharing, and growing their creative practice.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/signup" 
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-lg"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Create Your Free Account
            </Link>
            <Link 
              to="/gallery" 
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-lg"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Explore Artist Galleries
            </Link>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Painters' Diary
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              The premier platform for artists to showcase their work, document their creative journey, and connect with a global community.
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="text-gray-500 hover:text-indigo-600">Terms</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600">FAQ</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600">Contact</a>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Painters' Diary. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;