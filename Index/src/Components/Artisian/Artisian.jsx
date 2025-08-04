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

import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaChevronLeft, FaChevronRight, FaPalette, FaAward, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const artisans = [
  { 
    id: 1, 
    name: "Anna Smith", 
    bio: "Specializing in watercolor landscapes for over 10 years. Anna brings a delicate touch to natural scenes.", 
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    signaturePiece: "Mountain Reflections",
    medium: "Watercolor",
    awards: "2022 National Art Prize Winner",
    location: "Portland, OR",
  },
  { 
    id: 2, 
    name: "John Doe", 
    bio: "Crafts unique wooden sculptures with a modern twist. Combines traditional woodworking with contemporary design.", 
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    signaturePiece: "Oak & Steel Series",
    medium: "Wood/Metal",
    awards: "2021 Craft Innovation Award",
    location: "Austin, TX",
  },
  { 
    id: 3, 
    name: "Emma Brown", 
    bio: "Creates minimalist art prints with bold lines and subtle textures. Explores the balance between space and form.", 
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    signaturePiece: "Silhouette Series",
    medium: "Digital Print",
    awards: "Emerging Artist Grant 2023",
    location: "Brooklyn, NY",
  },
  {
  id: 4,
  name: "Liam Chen",
  bio: "Blends traditional Chinese ink techniques with modern abstract forms. His work bridges heritage and experimentation.",
  image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  signaturePiece: "Whispers of Mountains",
  medium: "Ink & Wash",
  awards: "Global Fusion Art Prize 2022",
  location: "Beijing, China",
},
{
  id: 5,
  name: "Sofia Martinez",
  bio: "Vibrant oil painter capturing emotional moments through expressive brushstrokes and intense colors.",
  image: "https://images.pexels.com/photos/30877151/pexels-photo-30877151.jpeg",
  signaturePiece: "Crimson Embrace",
  medium: "Oil on Canvas",
  awards: "Latin Art Showcase Finalist 2024",
  location: "Buenos Aires, Argentina",
},
{
  id: 6,
  name: "Noah Thompson",
  bio: "Multidisciplinary artist working across photography and generative digital art. Themes of identity and time drive his pieces.",
  image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
  signaturePiece: "Fragmented Realities",
  medium: "Digital Mixed Media",
  awards: "Adobe Rising Creator 2023",
  location: "Toronto, Canada",
}

];

const Artisan = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide(prev => (prev === artisans.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? artisans.length - 1 : prev - 1));
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="py-12 bg-white dark:bg-[#0a0f14] max-w-[95%] rounded-xl mx-auto overflow-hidden relative">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-3">
             Spotlight on Excellence
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
             From local gems to global icons — explore the art that’s making headlines.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative ">
          {/* Navigation Arrows - Positioned on sides */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 lg:block hidden -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous"
          >
            <FaChevronLeft className="text-gray-700 dark:text-gray-300 text-lg" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 lg:block hidden -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Next"
          >
            <FaChevronRight className="text-gray-700 dark:text-gray-300 text-lg" />
          </button>

          {/* Slides */}
          <div className="flex transition-transform duration-300 ease-in-out max-w-6xl" 
               style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {artisans.map((artisan) => (
              <div key={artisan.id} className="w-full flex-shrink-0 px-4">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Image - Sized to 3xl */}
                  <div className="w-full md:w-2/5">
                    <div className="relative rounded-lg overflow-hidden shadow-md aspect-square">
                      <img
                        src={artisan.image}
                        alt={artisan.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="w-full md:w-3/5 space-y-4">
                    <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                      {artisan.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300">
                      {artisan.bio}
                    </p>
                    
                    {/* Additional Info */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <FaPalette className="text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">{artisan.medium}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaAward className="text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">{artisan.awards}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">{artisan.location}</span>
                      </div>
                      {/* <div className="flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400">Active:</span>
                        <span className="text-gray-700 dark:text-gray-300">{artisan.yearsActive}</span>
                      </div> */}
                    </div>
                    
                    <div className="pt-2">
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                        Signature Piece
                      </h4>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {artisan.signaturePiece}
                      </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-3 pt-4">
                      {['facebook', 'instagram', 'twitter', 'linkedin'].map((platform) => (
                        <button
                          key={platform}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          {platform === 'facebook' && <FaFacebook />}
                          {platform === 'instagram' && <FaInstagram />}
                          {platform === 'twitter' && <FaXTwitter />}
                          {platform === 'linkedin' && <FaLinkedin />}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-6">
                      <Link to="/Artist/discoverartists">
                        <button className="px-6 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors rounded-md">
                          View All Artists
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-8 gap-2 ">
          {artisans.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                currentSlide === index ? 'bg-gray-900 dark:bg-gray-100' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artisan;