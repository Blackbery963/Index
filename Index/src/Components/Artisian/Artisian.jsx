// import React, { useState, useEffect } from 'react';
// import { FaXTwitter } from 'react-icons/fa6';
// import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const artisans = [
//   { 
//     id: 1, 
//     name: "Anna Smith", 
//     bio: "Specializing in watercolor landscapes for over 10 years. Anna brings a delicate touch to natural scenes, capturing the ephemeral beauty of light and water.", 
//     image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
//     signaturePiece: "Mountain Reflections", 
//   },
//   { 
//     id: 2, 
//     name: "John Doe", 
//     bio: "Crafts unique wooden sculptures with a modern twist. John combines traditional woodworking techniques with contemporary design principles.", 
//     image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
//     signaturePiece: "Oak & Steel Series", 
//   },
//   { 
//     id: 3, 
//     name: "Emma Brown", 
//     bio: "Creates minimalist art prints with bold lines and subtle textures. Emma's work explores the balance between positive and negative space.", 
//     image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
//     signaturePiece: "Silhouette Series", 
//   },
// ];

// const Artisan = () => {
//   // const [darkMode, setDarkMode] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);
//   const [image, setImage] = useState(null);
//   const [showButton, setShowButton] = useState(true);
//   const [profile, setProfile] = useState({
//     username: '',
//     email: '',
//     bio: '',
//     facebook: '',
//     instagram: '',
//     twitter: '',
//     linkedin: ''
//   });

//   useEffect(() => {
//     const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
//     const savedProfileImage = localStorage.getItem('profileImage');
//     const savedCoverImage = localStorage.getItem('coverImage');
//     setProfile((prev) => ({
//       ...prev,
//       ...savedProfile
//     }));
//     if (savedProfileImage) {
//       setProfileImage(savedProfileImage);
//     }
//     if (savedCoverImage) {
//       setImage(savedCoverImage);
//       setShowButton(false);
//     }
//   }, []);

//   const [currentSlide, setCurrentSlide] = useState(0);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev === artisans.length - 1 ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? artisans.length - 1 : prev - 1));
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   return (
//     <div className="py-4 bg-gray-100 dark:bg-[#040d1200] transition-colors duration-300 font-Playfair">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-serif font-medium text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
//             Meet Our Artisans
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             Discover the skilled hands and creative minds behind each unique piece in our collection.
//           </p>
//           <Link to={'/Artist/discoverartists'}>
//           <button className=' px-4 py-2 border text-black hover:text-gray-200 dark:text-gray-300 bg-gray-300 hover:bg-gray-500 dark:bg-gray-900 border-gray-800 dark:border-gray-300 mt-2 font-medium text-[20px] font-Playfair rounded-md'> View your artist</button>
//           </Link>
//         </div>

//         {/* Slider Container */}
//         <div className="relative overflow-hidden">
//           <div
//             className="flex transition-transform duration-500 ease-in-out"
//             style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//           >
//             {artisans.map((artisan, index) => (
//               <div key={artisan.id} className="w-full flex-shrink-0 px-4">
//                 <div className="flex flex-col md:flex-row items-center gap-12">
//                   {/* Artisan Image */}
//                   <div className="w-full md:w-1/2">
//                     <div className="relative pb-[100%] overflow-hidden rounded-lg shadow-lg dark:shadow-gray-800/50">
//                       <img
//                         src={artisan.image}
//                         alt={artisan.name}
//                         className="absolute h-full w-full object-cover transition-all duration-500 hover:scale-105"
//                       />
//                     </div>
//                   </div>

//                   {/* Artisan Details */}
//                   <div className="w-full md:w-1/2">
//                     <div className="max-w-md mx-auto md:mx-0">
//                       <h3 className="text-3xl font-serif font-medium text-gray-900 dark:text-white mb-4">
//                         {artisan.name}
//                       </h3>
//                       <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
//                         {artisan.bio}
//                       </p>
                      
//                       <div className="mb-8">
//                         <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
//                           Signature Piece
//                         </h4>
//                         <p className="text-gray-900 dark:text-gray-100 font-medium">
//                           {artisan.signaturePiece}
//                         </p>
//                       </div>
                      
//                       <div className="flex gap-4 mx-auto">
//                         {[
//                           {
//                             platform: 'facebook',
//                             icon: <FaFacebook className="hover:text-blue-600 dark:hover:text-blue-400" />,
//                             url: profile.facebook ? `https://www.facebook.com/${profile.facebook}` : null
//                           },
//                           {
//                             platform: 'instagram',
//                             icon: <FaInstagram className="hover:text-pink-900 dark:hover:text-pink-400" />,
//                             url: profile.instagram ? `https://www.instagram.com/${profile.instagram}` : null
//                           },
//                           {
//                             platform: 'twitter',
//                             icon: <FaXTwitter className="hover:text-blue-400 dark:hover:text-blue-300" />,
//                             url: profile.twitter ? `https://twitter.com/${profile.twitter}` : null
//                           },
//                           {
//                             platform: 'linkedin',
//                             icon: <FaLinkedin className="hover:text-blue-300 dark:hover:text-blue-200" />,
//                             url: profile.linkedin ? `https://www.linkedin.com/${profile.linkedin}` : null
//                           }
//                         ].map((social) => (
//                           <a
//                             key={social.platform}
//                             href={social.url || '#'}
//                             target={social.url ? "_blank" : "_self"}
//                             rel={social.url ? "noopener noreferrer" : ""}
//                             className={`w-8 h-8 flex items-center justify-center rounded-md text-white bg-gray-700 hover:bg-gray-900 dark:bg-gray-600 dark:hover:bg-gray-800 transition ${!social.url ? 'opacity-50 cursor-not-allowed' : ''}`}
//                           >
//                             {social.icon}
//                           </a>
//                         ))}
//                       </div>

//                       <Link to={'Account'}>
//                         <button className="px-8 py-3 mt-4 border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 font-medium hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900 transition-colors duration-300 font-GreatVibes">
//                           View Profile
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Navigation Arrows */}
//         <button
//           onClick={prevSlide}
//           className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
//           aria-label="Previous slide"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"/>
//           </svg>
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
//           aria-label="Next slide"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"/>
//           </svg>
//         </button>

//         {/* Dot Indicators */}
//         <div className="flex justify-center mt-12 space-x-2">
//           {artisans.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-3 h-3 rounded-full transition-colors duration-300 ${
//                 currentSlide === index 
//                   ? 'bg-gray-900 dark:bg-gray-100' 
//                   : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Artisan;


// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

// const artisans = [
//   { 
//     id: 1, 
//     name: "Anna Smith", 
//     bio: "Specializing in watercolor landscapes, capturing light and water's beauty.", 
//     image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
//     signaturePiece: "Mountain Reflections",
//   },
//   { 
//     id: 2, 
//     name: "John Doe", 
//     bio: "Crafts wooden sculptures blending tradition and modern design.", 
//     image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
//     signaturePiece: "Oak & Steel Series",
//   },
//   { 
//     id: 3, 
//     name: "Emma Brown", 
//     bio: "Creates minimalist art prints exploring spatial balance.", 
//     image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
//     signaturePiece: "Silhouette Series",
//   },
//   { 
//     id: 4, 
//     name: "Liam Carter", 
//     bio: "Paints vibrant abstracts inspired by urban energy.", 
//     image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
//     signaturePiece: "City Pulse",
//   },
//   { 
//     id: 5, 
//     name: "Sophia Lee", 
//     bio: "Sculpts delicate ceramics reflecting natural forms.", 
//     image: "https://images.unsplash.com/photo-1580130775562-0ad5a9e86e0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
//     signaturePiece: "Ocean Waves",
//   },
//   { 
//     id: 6, 
//     name: "Oliver Gray", 
//     bio: "Explores digital art with bold, futuristic themes.", 
//     image: "https://images.unsplash.com/photo-1558583691-763b7d85a1f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
//     signaturePiece: "Neon Horizons",
//   },
// ];

// const Artisan = () => {
//   // Animation variants for cards
//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.15, duration: 0.4, ease: 'easeOut' },
//     }),
//   };

//   return (
//     <div className="py-12 bg-gray-50 dark:bg-gray-900 transition-colors">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-10"
//         >
//           <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
//             Our Artisans
//           </h2>
//           <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
//             Meet the creators behind our unique artworks
//           </p>
//           <Link to="/Artist/discoverartists">
//             <motion.button
//               className="mt-4 px-6 py-2 bg-yellow-500 text-gray-900 font-medium rounded-md hover:bg-yellow-600 transition-colors"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Explore All Artists
//             </motion.button>
//           </Link>
//         </motion.div>

//         {/* Artisan Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {artisans.map((artisan, index) => (
//             <motion.div
//               key={artisan.id}
//               custom={index}
//               initial="hidden"
//               animate="visible"
//               variants={cardVariants}
//               className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
//             >
//               {/* Image */}
//               <div className="aspect-[3/2] overflow-hidden">
//                 <motion.img
//                   src={artisan.image}
//                   alt={artisan.name}
//                   className="w-full h-full object-cover"
//                   whileHover={{ scale: 1.03 }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </div>

//               {/* Details */}
//               <div className="p-4 space-y-2">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   {artisan.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
//                   {artisan.bio}
//                 </p>
//                 <div>
//                   <h4 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
//                     Signature Work
//                   </h4>
//                   <p className="text-sm text-gray-900 dark:text-white font-medium">
//                     {artisan.signaturePiece}
//                   </p>
//                 </div>
//                 <Link to="/Account">
//                   <motion.button
//                     className="w-full px-4 py-1.5 border border-gray-900 dark:border-gray-200 text-gray-900 dark:text-gray-200 rounded-md hover:bg-gray-900 dark:hover:bg-gray-200 hover:text-white dark:hover:text-gray-900 transition-colors text-sm"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     View Profile
//                   </motion.button>
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Artisan;

// import React, { useState } from 'react';
// import { FaFacebook, FaInstagram, FaLinkedin, FaChevronLeft, FaChevronRight, FaPalette, FaAward, FaMapMarkerAlt } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';
// import { Link } from 'react-router-dom';

// const artisans = [
//   { 
//     id: 1, 
//     name: "Anna Smith", 
//     bio: "Specializing in watercolor landscapes for over 10 years. Anna brings a delicate touch to natural scenes.", 
//     image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
//     signaturePiece: "Mountain Reflections",
//     medium: "Watercolor",
//     awards: "2022 National Art Prize Winner",
//     location: "Portland, OR",
//   },
//   { 
//     id: 2, 
//     name: "John Doe", 
//     bio: "Crafts unique wooden sculptures with a modern twist. Combines traditional woodworking with contemporary design.", 
//     image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
//     signaturePiece: "Oak & Steel Series",
//     medium: "Wood/Metal",
//     awards: "2021 Craft Innovation Award",
//     location: "Austin, TX",
//   },
//   { 
//     id: 3, 
//     name: "Emma Brown", 
//     bio: "Creates minimalist art prints with bold lines and subtle textures. Explores the balance between space and form.", 
//     image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
//     signaturePiece: "Silhouette Series",
//     medium: "Digital Print",
//     awards: "Emerging Artist Grant 2023",
//     location: "Brooklyn, NY",
//   },
//   {
//   id: 4,
//   name: "Liam Chen",
//   bio: "Blends traditional Chinese ink techniques with modern abstract forms. His work bridges heritage and experimentation.",
//   image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
//   signaturePiece: "Whispers of Mountains",
//   medium: "Ink & Wash",
//   awards: "Global Fusion Art Prize 2022",
//   location: "Beijing, China",
// },
// {
//   id: 5,
//   name: "Sofia Martinez",
//   bio: "Vibrant oil painter capturing emotional moments through expressive brushstrokes and intense colors.",
//   image: "https://images.pexels.com/photos/30877151/pexels-photo-30877151.jpeg",
//   signaturePiece: "Crimson Embrace",
//   medium: "Oil on Canvas",
//   awards: "Latin Art Showcase Finalist 2024",
//   location: "Buenos Aires, Argentina",
// },
// {
//   id: 6,
//   name: "Noah Thompson",
//   bio: "Multidisciplinary artist working across photography and generative digital art. Themes of identity and time drive his pieces.",
//   image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
//   signaturePiece: "Fragmented Realities",
//   medium: "Digital Mixed Media",
//   awards: "Adobe Rising Creator 2023",
//   location: "Toronto, Canada",
// }

// ];

// const Artisan = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const nextSlide = () => setCurrentSlide(prev => (prev === artisans.length - 1 ? 0 : prev + 1));
//   const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? artisans.length - 1 : prev - 1));
//   const goToSlide = (index) => setCurrentSlide(index);

//   return (
//     <div className="py-12 bg-white dark:bg-[#0a0f14] xl:max-w-7xl max-w-full sm:max-w-[85%] rounded-xl mx-auto overflow-hidden relative">
//       <div className=" mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-3">
//              Spotlight on Excellence
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//              From local gems to global icons — explore the art that’s making headlines.
//           </p>
//         </div>

//         {/* Slider Container */}
//         <div className="relative ">
//           {/* Navigation Arrows - Positioned on sides */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/3 mt-14 lg:mt-0 lg:top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//             aria-label="Previous"
//           >
//             <FaChevronLeft className="text-gray-700 dark:text-gray-300 text-lg" />
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/3  mt-14 lg:mt-0 lg:top-1/2  -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//             aria-label="Next"
//           >
//             <FaChevronRight className="text-gray-700 dark:text-gray-300 text-lg" />
//           </button>

//           {/* Slides */}
//           <div className="flex transition-transform duration-300 ease-in-out max-w-6xl" 
//                style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
//             {artisans.map((artisan) => (
//               <div key={artisan.id} className="w-full flex-shrink-0 px-4">
//                 <div className="flex flex-col md:flex-row gap-8 items-center">
//                   {/* Image - Sized to 3xl */}
//                   <div className="w-full md:w-2/5">
//                     <div className="relative rounded-lg overflow-hidden shadow-md aspect-square">
//                       <img
//                         src={artisan.image}
//                         alt={artisan.name}
//                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                       />
//                     </div>
//                   </div>

//                   {/* Details */}
//                   <div className="w-full md:w-3/5 space-y-4">
//                     <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
//                       {artisan.name}
//                     </h3>
                    
//                     <p className="text-gray-600 dark:text-gray-300">
//                       {artisan.bio}
//                     </p>
                    
//                     {/* Additional Info */}
//                     <div className="grid grid-cols-2 gap-4 mt-4">
//                       <div className="flex items-center gap-2">
//                         <FaPalette className="text-gray-500 dark:text-gray-400" />
//                         <span className="text-gray-700 dark:text-gray-300">{artisan.medium}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <FaAward className="text-gray-500 dark:text-gray-400" />
//                         <span className="text-gray-700 dark:text-gray-300">{artisan.awards}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400" />
//                         <span className="text-gray-700 dark:text-gray-300">{artisan.location}</span>
//                       </div>
//                       {/* <div className="flex items-center gap-2">
//                         <span className="text-gray-500 dark:text-gray-400">Active:</span>
//                         <span className="text-gray-700 dark:text-gray-300">{artisan.yearsActive}</span>
//                       </div> */}
//                     </div>
                    
//                     <div className="pt-2">
//                       <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
//                         Signature Piece
//                       </h4>
//                       <p className="text-gray-900 dark:text-white font-medium">
//                         {artisan.signaturePiece}
//                       </p>
//                     </div>

//                     {/* Social Links */}
//                     <div className="flex gap-3 pt-4">
//                       {['facebook', 'instagram', 'twitter', 'linkedin'].map((platform) => (
//                         <button
//                           key={platform}
//                           className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//                         >
//                           {platform === 'facebook' && <FaFacebook />}
//                           {platform === 'instagram' && <FaInstagram />}
//                           {platform === 'twitter' && <FaXTwitter />}
//                           {platform === 'linkedin' && <FaLinkedin />}
//                         </button>
//                       ))}
//                     </div>

//                     <div className="flex gap-4 pt-6">
//                       <Link to="/Artist/discoverartists">
//                         <button className="px-6 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors rounded-md">
//                           View All Artists
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Dot Indicators */}
//         <div className="flex justify-center mt-8 gap-2 ">
//           {artisans.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-2.5 h-2.5 rounded-full transition-colors ${
//                 currentSlide === index ? 'bg-gray-900 dark:bg-gray-100' : 'bg-gray-300 dark:bg-gray-600'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Artisan;

import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPalette, FaAward, FaMapMarkerAlt, FaBrush, FaEye, FaHeart } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';

const MiniArtisan = () => {
  const [refreshCount, setRefreshCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const allArtisans = [
    {
      id: 1,
      name: "Anna Smith",
      bio: "Specializing in watercolor landscapes for over 10 years. Capturing the essence of nature with delicate brushstrokes.",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      signaturePiece: "Mountain Reflections",
      medium: "Watercolor",
      awards: "2022 National Art Prize",
      location: "Portland, OR",
      followers: "12.4K",
      rating: 4.9,
      color: "from-blue-500 to-teal-600"
    },
    {
      id: 2,
      name: "Marcus Chen",
      bio: "Contemporary digital artist pushing boundaries with AI-assisted creations and mixed media installations.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      signaturePiece: "Neural Dreams",
      medium: "Digital & AI Art",
      awards: "2023 Digital Innovation Award",
      location: "San Francisco, CA",
      followers: "28.7K",
      rating: 4.8,
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      bio: "Traditional oil painter inspired by Renaissance masters with a modern surrealist twist.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      signaturePiece: "Timeless Echoes",
      medium: "Oil Painting",
      awards: "Golden Brush Award 2021",
      location: "Madrid, Spain",
      followers: "15.2K",
      rating: 5.0,
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 4,
      name: "David Kim",
      bio: "Street artist transforming urban spaces with vibrant murals and social commentary.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      signaturePiece: "Urban Pulse",
      medium: "Spray Paint & Murals",
      awards: "Urban Art Festival Winner",
      location: "Brooklyn, NY",
      followers: "34.1K",
      rating: 4.7,
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 5,
      name: "Sophie Williams",
      bio: "Minimalist sculptor working with marble and bronze to explore form and negative space.",
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      signaturePiece: "Silent Forms",
      medium: "Sculpture",
      awards: "Contemporary Sculpture Prize",
      location: "London, UK",
      followers: "8.9K",
      rating: 4.9,
      color: "from-gray-500 to-slate-600"
    },
    {
      id: 6,
      name: "Kenji Tanaka",
      bio: "Japanese calligraphy master blending traditional techniques with abstract expressionism.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      signaturePiece: "Ink Flow",
      medium: "Calligraphy & Ink",
      awards: "International Art Biennale",
      location: "Kyoto, Japan",
      followers: "19.3K",
      rating: 5.0,
      color: "from-red-500 to-rose-600"
    },
    {
      id: 7,
      name: "Isabelle Martin",
      bio: "Mixed media artist creating immersive installations with found objects and light.",
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      signaturePiece: "Luminous Memories",
      medium: "Mixed Media",
      awards: "New Media Art Grant",
      location: "Paris, France",
      followers: "22.6K",
      rating: 4.8,
      color: "from-indigo-500 to-purple-600"
    },
    {
      id: 8,
      name: "Carlos Mendez",
      bio: "Photorealistic painter capturing urban life and cultural diversity in vivid detail.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      signaturePiece: "City Stories",
      medium: "Acrylic & Oil",
      awards: "Realism Excellence Award",
      location: "Mexico City, MX",
      followers: "17.8K",
      rating: 4.9,
      color: "from-yellow-500 to-amber-600"
    },
    {
      id: 9,
      name: "Nadia Petrova",
      bio: "Abstract expressionist exploring emotional landscapes through bold colors and textures.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      signaturePiece: "Emotional Currents",
      medium: "Abstract Expressionism",
      awards: "Young Artist of the Year",
      location: "Moscow, Russia",
      followers: "14.5K",
      rating: 4.7,
      color: "from-pink-500 to-rose-600"
    },
    {
      id: 10,
      name: "Ahmed Hassan",
      bio: "Geometric artist inspired by Islamic patterns and architectural forms.",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      signaturePiece: "Sacred Geometry",
      medium: "Geometric Art",
      awards: "Cultural Heritage Award",
      location: "Dubai, UAE",
      followers: "25.3K",
      rating: 4.9,
      color: "from-teal-500 to-cyan-600"
    },
    {
      id: 11,
      name: "Luna Johnson",
      bio: "Ceramic artist creating organic forms that explore the relationship between nature and craft.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      signaturePiece: "Earth Forms",
      medium: "Ceramics",
      awards: "Craft Council Award",
      location: "Portland, OR",
      followers: "11.2K",
      rating: 4.8,
      color: "from-orange-500 to-red-600"
    },
    {
      id: 12,
      name: "Rohan Kapoor",
      bio: "Contemporary miniature painter reviving traditional techniques with modern narratives.",
      image: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      signaturePiece: "Modern Miniatures",
      medium: "Miniature Painting",
      awards: "Heritage Art Revival",
      location: "New Delhi, India",
      followers: "16.7K",
      rating: 4.9,
      color: "from-emerald-500 to-green-600"
    }
  ];

  // Select one random featured artisan
  const featuredArtisan = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * allArtisans.length);
    return allArtisans[randomIndex];
  }, [refreshCount]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshCount(prev => prev + 1);
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Auto-refresh every 3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCount(prev => prev + 1);
    }, 180000); // 3 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-gradient-to-br ${featuredArtisan.color}/10 to-white dark:from-gray-900 dark:to-gray-800 rounded-sm p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${featuredArtisan.color} rounded-full flex items-center justify-center shadow-lg`}>
            <FaPalette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">Featured Artist</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Spotlight • Refreshes regularly</p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 disabled:opacity-50"
          title="Discover another artist"
        >
          <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Artist Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex items-start gap-4">
          {/* Artist Image */}
          <div className="flex-shrink-0 relative">
            <img
              src={featuredArtisan.image}
              alt={featuredArtisan.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r ${featuredArtisan.color} rounded-full border-2 border-white flex items-center justify-center`}>
              <FaBrush className="w-2 h-2 text-white" />
            </div>
          </div>
          
          {/* Artist Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                {featuredArtisan.name}
              </h4>
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                <FaAward className="text-amber-500 w-3 h-3" />
                <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                  {featuredArtisan.rating}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              {featuredArtisan.bio}
            </p>
            
            {/* Stats */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                <FaEye className="w-3 h-3" />
                <span>{featuredArtisan.followers} followers</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                <FaHeart className="w-3 h-3 text-red-500" />
                <span>Featured</span>
              </div>
            </div>
            
            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <FaPalette className={`text-gradient ${featuredArtisan.color.split(' ')[1]} flex-shrink-0`} />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{featuredArtisan.medium}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaAward className="text-amber-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{featuredArtisan.awards}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaMapMarkerAlt className="text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{featuredArtisan.location}</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex gap-2">
              <Link to="/Artist/discoverartists" className="flex-1">
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                  View Profile
                </button>
              </Link>
              <button className="flex items-center justify-center w-12 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-lg transition-all duration-300">
                <FaHeart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Refresh Indicator */}
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center flex items-center justify-center gap-1">
        <FiRefreshCw className="w-3 h-3" />
        Discover new artists regularly
      </div>
    </div>
  );
};

export default MiniArtisan;