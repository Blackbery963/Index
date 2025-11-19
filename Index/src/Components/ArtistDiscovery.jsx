// import { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { Heart, UserPlus, Users, MapPin, Award, Sparkles, Palette, Camera, Brush, Zap, ArrowLeft, ArrowRight } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const ArtistDiscovery = ({ viewMode = 'feed', onArtistClick, followedArtists, onFollow }) => {
//   const [artists, setArtists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const sliderRef = useRef(null);

//   // Enhanced artist data with unique content
//   const artistSpecialties = {
//     watercolor: {
//       icon: Palette,
//       color: 'from-blue-500 to-cyan-500',
//       bgColor: 'from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/10',
//       borderColor: 'border-blue-200 dark:border-blue-800/30',
//       techniques: ['Wet-on-wet', 'Dry brush', 'Glazing', 'Lifting'],
//       materials: ['Watercolor paper', 'Sable brushes', 'Professional pigments']
//     },
//     digital: {
//       icon: Zap,
//       color: 'from-purple-500 to-pink-500',
//       bgColor: 'from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/10',
//       borderColor: 'border-purple-200 dark:border-purple-800/30',
//       techniques: ['Digital painting', 'Vector art', '3D modeling', 'Animation'],
//       materials: ['Wacom tablet', 'Photoshop', 'Procreate', 'Blender']
//     },
//     sculpture: {
//       icon: Brush,
//       color: 'from-amber-500 to-orange-500',
//       bgColor: 'from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/10',
//       borderColor: 'border-amber-200 dark:border-amber-800/30',
//       techniques: ['Clay modeling', 'Stone carving', 'Metal casting', 'Woodworking'],
//       materials: ['Marble', 'Bronze', 'Terracotta', 'Resin']
//     },
//     photography: {
//       icon: Camera,
//       color: 'from-emerald-500 to-teal-500',
//       bgColor: 'from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/10',
//       borderColor: 'border-emerald-200 dark:border-emerald-800/30',
//       techniques: ['Portrait lighting', 'Landscape composition', 'Street photography', 'Long exposure'],
//       materials: ['DSLR camera', 'Prime lenses', 'Studio lights', 'Editing software']
//     }
//   };

//   // Fetch artists from API with enhanced data
//   useEffect(() => {
//     const fetchArtists = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch('https://randomuser.me/api/?results=6&nat=us,gb,ca,au&inc=name,picture,location,login,dob');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch artists');
//         }
        
//         const data = await response.json();
        
//         const specialties = Object.keys(artistSpecialties);
//         const locations = [
//           { city: 'New York', country: 'USA', flag: '🇺🇸' },
//           { city: 'London', country: 'UK', flag: '🇬🇧' },
//           { city: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
//           { city: 'Paris', country: 'France', flag: '🇫🇷' },
//           { city: 'Berlin', country: 'Germany', flag: '🇩🇪' },
//           { city: 'Sydney', country: 'Australia', flag: '🇦🇺' }
//         ];
        
//         const artistBios = {
//           watercolor: [
//             "Creating ethereal landscapes with flowing watercolor techniques that capture light and atmosphere",
//             "Master of transparent washes and delicate color harmonies in contemporary watercolor art",
//             "Pushing the boundaries of traditional watercolor with experimental approaches and mixed media"
//           ],
//           digital: [
//             "Blending digital precision with artistic intuition to create immersive virtual worlds",
//             "Specializing in character design and concept art for games and animation studios",
//             "Exploring the intersection of AI and human creativity in digital illustration"
//           ],
//           sculpture: [
//             "Transforming raw materials into expressive forms that challenge spatial perception",
//             "Creating large-scale installations that interact with architectural environments",
//             "Reviving ancient sculpting techniques with contemporary conceptual frameworks"
//           ],
//           photography: [
//             "Documenting human stories through intimate portrait photography and visual narratives",
//             "Capturing the ephemeral beauty of urban landscapes and architectural details",
//             "Experimental photographer merging traditional darkroom techniques with digital innovation"
//           ]
//         };
        
//         const formattedArtists = data.results.map((user, index) => {
//           const specialty = specialties[index % specialties.length];
//           const specialtyData = artistSpecialties[specialty];
//           const location = locations[index % locations.length];
//           const bioOptions = artistBios[specialty];
          
//           return {
//             id: user.login.uuid,
//             name: `${user.name.first} ${user.name.last}`,
//             specialty: specialty.charAt(0).toUpperCase() + specialty.slice(1),
//             specialtyData,
//             bio: bioOptions[index % bioOptions.length],
//             image: user.picture.large,
//             location: `${location.city}, ${location.country} ${location.flag}`,
//             followers: Math.floor(Math.random() * 5000) + 500,
//             artworks: Math.floor(Math.random() * 200) + 20,
//             isFollowing: Math.random() > 0.7,
//             isFeatured: index < 2,
//             rating: (Math.random() * 2 + 3).toFixed(1),
//             yearsExperience: Math.floor(Math.random() * 15) + 2,
//             recentProject: `"${getProjectName(specialty)}" - ${getProjectDescription(specialty)}`,
//             techniques: specialtyData.techniques.slice(0, 2),
//             availableFor: ['Commission', 'Collaboration', 'Workshops'][Math.floor(Math.random() * 3)],
//             achievement: getAchievement(specialty, index)
//           };
//         });
        
//         setArtists(formattedArtists);
//       } catch (err) {
//         setError('Failed to load artists');
//         console.error('Error fetching artists:', err);
        
//         // Enhanced fallback data
//         const mockArtists = [
//           {
//             id: 1,
//             name: 'Sophia Chen',
//             specialty: 'Watercolor',
//             specialtyData: artistSpecialties.watercolor,
//             bio: 'Creating ethereal landscapes with flowing watercolor techniques that capture light and atmosphere',
//             image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=200&fit=crop&crop=face',
//             location: 'San Francisco, USA 🇺🇸',
//             followers: 1242,
//             artworks: 45,
//             isFollowing: false,
//             isFeatured: true,
//             rating: '4.8',
//             yearsExperience: 8,
//             recentProject: '"Ocean Dreams" - Series exploring marine life through abstract watercolor',
//             techniques: ['Wet-on-wet', 'Dry brush'],
//             availableFor: 'Commission',
//             achievement: 'Featured in International Watercolor Biennial'
//           },
//           {
//             id: 2,
//             name: 'James Wilson',
//             specialty: 'Sculpture',
//             specialtyData: artistSpecialties.sculpture,
//             bio: 'Transforming raw materials into expressive forms that challenge spatial perception',
//             image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=200&h=200&fit=crop&crop=face',
//             location: 'London, UK 🇬🇧',
//             followers: 867,
//             artworks: 32,
//             isFollowing: true,
//             isFeatured: true,
//             rating: '4.6',
//             yearsExperience: 12,
//             recentProject: '"Urban Echoes" - Bronze sculptures for public spaces',
//             techniques: ['Metal casting', 'Stone carving'],
//             availableFor: 'Collaboration',
//             achievement: 'Tate Modern Acquisition 2023'
//           }
//         ];
//         setArtists(mockArtists);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArtists();
//   }, []);

//   // Helper functions for dynamic content
//   function getProjectName(specialty) {
//     const projects = {
//       watercolor: ['Ocean Dreams', 'Mountain Mists', 'Urban Reflections', 'Botanical Studies'],
//       digital: ['Digital Realms', 'Cyber Portraits', 'Virtual Landscapes', 'AI Collaborations'],
//       sculpture: ['Urban Echoes', 'Form and Void', 'Material Memories', 'Spatial Dialogues'],
//       photography: ['Human Stories', 'City Rhythms', 'Natural Patterns', 'Light Studies']
//     };
//     return projects[specialty][Math.floor(Math.random() * projects[specialty].length)];
//   }

//   function getProjectDescription(specialty) {
//     const descriptions = {
//       watercolor: 'Series exploring color transparency and fluid forms',
//       digital: 'Interactive installation merging digital and physical spaces',
//       sculpture: 'Large-scale installation challenging material boundaries',
//       photography: 'Documentary project capturing urban transformation'
//     };
//     return descriptions[specialty];
//   }

//   function getAchievement(specialty, index) {
//     const achievements = {
//       watercolor: ['International Watercolor Award', 'Solo Exhibition at National Gallery', 'Artist Residency in Italy'],
//       digital: ['Digital Art Festival Winner', 'VR Installation Featured', 'Tech-Art Collaboration Grant'],
//       sculpture: ['Public Art Commission', 'Museum Acquisition', 'International Sculpture Prize'],
//       photography: ['Photojournalism Award', 'National Geographic Feature', 'Documentary Film Collaboration']
//     };
//     return achievements[specialty][index % achievements[specialty].length];
//   }

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % artists.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + artists.length) % artists.length);
//   };

//   const handleFollow = (e, artistId) => {
//     e.stopPropagation();
//     onFollow?.(artistId);
    
//     setArtists(prev => prev.map(artist => 
//       artist.id === artistId 
//         ? { ...artist, isFollowing: !artist.isFollowing, followers: artist.isFollowing ? artist.followers - 1 : artist.followers + 1 }
//         : artist
//     ));
//   };

//   const handleArtistClick = (artist) => {
//     onArtistClick?.(artist);
//   };

//   // Compact version for feed integration
//   if (viewMode === 'feed' || viewMode === 'collage') {
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/10 rounded-sm p-6 shadow-lg border border-pink-200 dark:border-pink-800/30"
//       >
//         <div className="flex items-start gap-4 mb-6">
//           <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg flex items-center justify-center shadow-lg">
//             <Users className="w-6 h-6 text-white" />
//           </div>
//           <div className="flex-1">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
//               Featured Artists
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-300">
//               Discover unique creators with diverse artistic approaches
//             </p>
//           </div>
//         </div>

//         {loading ? (
//           <div className="animate-pulse">
//             <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
//           </div>
//         ) : error ? (
//           <div className="text-center py-8 text-red-500 dark:text-red-400 text-sm">
//             {error}
//           </div>
//         ) : (
//           <div className="relative">
//             {/* Desktop Arrows */}
//             <div className="hidden lg:flex absolute inset-y-0 left-0 right-0 -mx-6 items-center justify-between z-10 pointer-events-none">
//               <button
//                 onClick={prevSlide}
//                 className="pointer-events-auto p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors transform -translate-x-1/2"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={nextSlide}
//                 className="pointer-events-auto p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors transform translate-x-1/2"
//               >
//                 <ArrowRight className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Artist Slider */}
//             <div className="overflow-hidden rounded-lg">
//               <motion.div
//                 className="flex"
//                 animate={{ x: `-${currentSlide * 100}%` }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               >
//                 {artists.map((artist) => {
//                   const SpecialtyIcon = artist.specialtyData.icon;
//                   return (
//                     <div key={artist.id} className="w-full flex-shrink-0 px-2">
//                       <motion.div
//                         whileHover={{ scale: 1.02 }}
//                         className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
//                         onClick={() => handleArtistClick(artist)}
//                       >
//                         {/* Header with Avatar and Basic Info */}
//                         <div className="flex items-start gap-3 mb-4">
//                           <div className="relative">
//                             <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-md group-hover:scale-110 transition-transform duration-300">
//                               <img
//                                 src={artist.image}
//                                 alt={artist.name}
//                                 className="w-full h-full object-cover"
//                               />
//                             </div>
//                             {artist.isFeatured && (
//                               <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
//                                 <Sparkles className="w-3 h-3 text-white" />
//                               </div>
//                             )}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2 mb-1">
//                               <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">
//                                 {artist.name}
//                               </h4>
//                               <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${artist.specialtyData.color} flex items-center justify-center`}>
//                                 <SpecialtyIcon className="w-3 h-3 text-white" />
//                               </div>
//                             </div>
//                             <p className="text-xs text-pink-600 dark:text-pink-400 font-medium line-clamp-1 mb-1">
//                               {artist.specialty} Artist
//                             </p>
//                             <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
//                               <MapPin className="w-3 h-3" />
//                               <span className="line-clamp-1">{artist.location}</span>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Unique Content for Each Artist */}
//                         <div className="space-y-3 mb-4">
//                           {/* Bio */}
//                           <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
//                             {artist.bio}
//                           </p>

//                           {/* Recent Project */}
//                           <div>
//                             <p className="text-xs font-medium text-gray-900 dark:text-white mb-1">
//                               Recent Project
//                             </p>
//                             <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
//                               {artist.recentProject}
//                             </p>
//                           </div>

//                           {/* Techniques */}
//                           <div>
//                             <p className="text-xs font-medium text-gray-900 dark:text-white mb-1">
//                               Techniques
//                             </p>
//                             <div className="flex flex-wrap gap-1">
//                               {artist.techniques.map((technique, index) => (
//                                 <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
//                                   {technique}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>

//                           {/* Achievement */}
//                           <div>
//                             <p className="text-xs font-medium text-gray-900 dark:text-white mb-1">
//                               Achievement
//                             </p>
//                             <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
//                               {artist.achievement}
//                             </p>
//                           </div>
//                         </div>

//                         {/* Stats and Action */}
//                         <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-600">
//                           <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
//                             <div className="flex items-center gap-1">
//                               <Heart className="w-3 h-3" />
//                               <span>{artist.followers}</span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                               <Award className="w-3 h-3" />
//                               <span>{artist.rating}</span>
//                             </div>
//                             <div className="text-xs">
//                               {artist.yearsExperience}y exp
//                             </div>
//                           </div>
                          
//                           <button
//                             onClick={(e) => handleFollow(e, artist.id)}
//                             className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
//                               artist.isFollowing
//                                 ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
//                                 : 'bg-pink-500 text-white hover:bg-pink-600'
//                             }`}
//                           >
//                             {artist.isFollowing ? 'Following' : 'Follow'}
//                           </button>
//                         </div>
//                       </motion.div>
//                     </div>
//                   );
//                 })}
//               </motion.div>
//             </div>

//             {/* Slider Indicators */}
//             <div className="flex justify-center gap-2 mt-4">
//               {artists.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentSlide(index)}
//                   className={`w-2 h-2 rounded-full transition-all ${
//                     currentSlide === index 
//                       ? 'bg-pink-500 w-4' 
//                       : 'bg-gray-300 dark:bg-gray-600'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* CTA Buttons */}
//         <div className="flex gap-2 mt-6">
//           <Link to="/Artists/DiscoverUsers" className="flex-1">
//             <button className="w-full py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
//               <Users className="w-4 h-4" />
//               Explore All Artists
//             </button>
//           </Link>
//           <Link to="/artists/discover" className="flex-1">
//             <button className="w-full py-2 border border-pink-500 text-pink-500 dark:text-pink-400 text-sm font-medium rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors flex items-center justify-center gap-2">
//               <UserPlus className="w-4 h-4" />
//               Find Similar
//             </button>
//           </Link>
//         </div>
//       </motion.div>
//     );
//   }

//   // ... (Full version remains similar but enhanced with new data)
// };

// export default ArtistDiscovery;



// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Heart, UserPlus, Users, MapPin, Sparkles, Palette, Camera, Brush, Zap, ArrowLeft, ArrowRight } from 'lucide-react';
// import { motion } from 'framer-motion';

// const ArtistDiscovery = ({ viewMode = 'feed', onArtistClick, onFollow }) => {
//   const [artists, setArtists] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const specialtyStyles = {
//     Watercolor: { icon: Palette, color: 'from-blue-500 to-cyan-500' },
//     Digital: { icon: Zap, color: 'from-purple-500 to-pink-500' },
//     Sculpture: { icon: Brush, color: 'from-amber-500 to-orange-500' },
//     Photography: { icon: Camera, color: 'from-emerald-500 to-teal-500' },
//   };

//   useEffect(() => {
//     const fetchArtists = async () => {
//       try {
//         const res = await fetch('https://randomuser.me/api/?results=8&inc=name,picture,location,login');
//         const data = await res.json();

//         const specialties = Object.keys(specialtyStyles);
//         const cities = ['Paris', 'Tokyo', 'New York', 'Berlin', 'Seoul', 'Mexico City', 'London', 'Barcelona'];

//         const loadedArtists = data.results.map((user, i) => {
//           const specialty = specialties[i % specialties.length];
//           const { icon: Icon, color } = specialtyStyles[specialty];

//           return {
//             id: user.login.uuid,
//             name: `${user.name.first} ${user.name.last}`,
//             specialty,
//             specialtyColor: color,
//             specialtyIcon: Icon,
//             avatar: user.picture.large,
//             location: `${cities[i % cities.length]} ${i % 2 === 0 ? '🇫🇷' : i % 3 === 0 ? '🇯🇵' : i % 4 === 0 ? '🇺🇸' : '🇪🇸'}`,
//             followers: Math.floor(Math.random() * 8000) + 800,
//             isFollowing: Math.random() > 0.6,
//             isFeatured: i <  3,
//           };
//         });

//         setArtists(loadedArtists);
//       } catch (err) {
//         // Fallback
//         setArtists([
//           { id: 1, name: 'Lina Moreau', specialty: 'Watercolor', specialtyColor: 'from-blue-500 to-cyan-500', specialtyIcon: Palette, avatar: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=200&fit=crop&crop=face', location: 'Paris 🇫🇷', followers: 5200, isFollowing: false, isFeatured: true },
//           { id: 2, name: 'Kai Sato', specialty: 'Digital', specialtyColor: 'from-purple-500 to-pink-500', specialtyIcon: Zap, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', location: 'Tokyo 🇯🇵', followers: 8900, isFollowing: true, isFeatured: true },
//           { id: 3, name: 'Elena Ruiz', specialty: 'Photography', specialtyColor: 'from-emerald-500 to-teal-500', specialtyIcon: Camera, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face', location: 'Barcelona 🇪🇸', followers:3100, isFollowing: false, isFeatured: true },
//         ]);
//       }
//     };

//     fetchArtists();
//   }, []);

//   const next = () => setCurrentSlide((p) => (p + 1) % artists.length);
//   const prev = () => setCurrentSlide((p) => (p - 1 + artists.length) % artists.length);

//   const toggleFollow = (e, id) => {
//     e.stopPropagation();
//     onFollow?.(id);
//     setArtists(prev => prev.map(a => 
//       a.id === id 
//         ? { ...a, isFollowing: !a.isFollowing, followers: a.isFollowing ? a.followers - 1 : a.followers + 1 }
//         : a
//     ));
//   };

//   // Feed / Collage Version — Perfect Outlined Minimal Style
//   if (viewMode === 'feed') {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full rounded-sm border border-gray-300 dark:border-gray-700 p-2 bg-transparent"
//       >
//         {/* TOP BOX - Header */}
//         <div className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 mb-2 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center shadow-md">
//               <Sparkles className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h3 className="font-bold text-gray-900 dark:text-white">Featured Artists</h3>
//               <p className="text-xs text-gray-500 dark:text-gray-400">Amazing creators to follow</p>
//             </div>
//           </div>
//           <Link to="/Artists/DiscoverUsers" className="text-rose-600 dark:text-rose-400 text-xs font-medium hover:underline">
//             View all →
//           </Link>
//         </div>

//         {/* MIDDLE BOX - Slider */}
//         <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden mb-2">
//           <div className="relative">
//             <motion.div
//               className="flex"
//               animate={{ x: `-${currentSlide * 100}%` }}
//               transition={{ type: "spring", stiffness: 320, damping: 30 }}
//             >
//               {artists.map((artist) => {
//                 const Icon = artist.specialtyIcon;
//                 return (
//                   <div key={artist.id} className="w-full flex-shrink-0 p-4">
//                     <div 
//                       className="cursor-pointer group"
//                       onClick={() => onArtistClick?.(artist)}
//                     >
//                       <div className="flex items-center gap-4">
//                         <div className="relative flex-shrink-0">
//                           <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
//                             <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
//                           </div>
//                           {artist.isFeatured && (
//                             <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
//                               <Sparkles className="w-3.5 h-3.5 text-white" />
//                             </div>
//                           )}
//                         </div>

//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
//                             {artist.name}
//                             <div className={`w-7 h-7 rounded-full bg-gradient-to-r ${artist.specialtyColor} flex items-center justify-center`}>
//                               <Icon className="w-4 h-4 text-white" />
//                             </div>
//                           </h4>
//                           <p className="text-sm text-rose-600 dark:text-rose-400 font-medium">{artist.specialty} Artist</p>
//                           <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
//                             <MapPin className="w-3 h-3" />
//                             {artist.location}
//                           </p>
//                           <div className="flex items-center gap-3 mt-2 text-xs text-gray-600 dark:text-gray-400">
//                             <span className="flex items-center gap-1">
//                               <Heart className="w-3.5 h-3.5" /> {artist.followers.toLocaleString()}
//                             </span>
//                           </div>
//                         </div>

//                         <button
//                           onClick={(e) => toggleFollow(e, artist.id)}
//                           className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
//                             artist.isFollowing
//                               ? 'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'
//                               : 'bg-rose-600 text-white hover:bg-rose-700'
//                           }`}
//                         >
//                           {artist.isFollowing ? 'Following' : '+ Follow'}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </motion.div>

//             {/* Controls */}
//             <button
//               onClick={prev}
//               className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-full"
//             >
//               <ArrowLeft className="w-4 h-4" />
//             </button>
//             <button
//               onClick={next}
//               className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-full"
//             >
//               <ArrowRight className="w-4 h-4" />
//             </button>

//             {/* Dots */}
//             <div className="flex justify-center gap-1.5 py-2 bg-gray-50 dark:bg-gray-800/50">
//               {artists.slice(0, 6).map((_, i) => (
//                 <div
//                   key={i}
//                   className={`h-1 rounded-full transition-all ${i === currentSlide ? 'bg-rose-600 w-5' : 'bg-gray-300 dark:bg-gray-600 w-1'}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* BOTTOM BOX - CTA */}
//         <div className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3">
//           <div className="grid grid-cols-2 gap-3">
//             <Link to="/Artists/DiscoverUsers" className="block">
//               <button className="w-full py-2.5 text-sm font-medium bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-md transition-all">
//                 Explore Artists
//               </button>
//             </Link>
//             <Link to="/artists/discover" className="block">
//               <button className="w-full py-2.5 text-sm font-medium border border-rose-600 text-rose-600 dark:text-rose-400 rounded-md hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all flex items-center justify-center gap-1.5">
//                 <UserPlus className="w-4 h-4" />
//                 Find More
//               </button>
//             </Link>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }

//   // Full version can be added later if needed
// // return null;
// }



// export default ArtistDiscovery;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, UserPlus, MapPin, Sparkles, Palette, Camera, Brush, Zap, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ArtistDiscovery = ({ viewMode = 'feed', onArtistClick, onFollow }) => {
  const [artists, setArtists] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const specialtyStyles = {
    Watercolor: { icon: Palette, color: 'from-blue-500 to-cyan-500' },
    Digital: { icon: Zap, color: 'from-purple-500 to-pink-500' },
    Sculpture: { icon: Brush, color: 'from-amber-500 to-orange-500' },
    Photography: { icon: Camera, color: 'from-emerald-500 to-teal-500' },
  };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch('https://randomuser.me/api/?results=8&inc=name,picture,location,login');
        const data = await res.json();

        const specialties = Object.keys(specialtyStyles);
        const cities = ['Paris', 'Tokyo', 'New York', 'Berlin', 'Seoul', 'Mexico City', 'London', 'Barcelona'];

        const loaded = data.results.map((user, i) => {
          const specialty = specialties[i % specialties.length];
          const { icon: Icon, color } = specialtyStyles[specialty];

          return {
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            specialty,
            specialtyColor: color,
            specialtyIcon: Icon,
            avatar: user.picture.large,
            location: `${cities[i % cities.length]}`,
            followers: Math.floor(Math.random() * 8000) + 800,
            isFollowing: Math.random() > 0.6,
            isFeatured: i < 3
          };
        });

        setArtists(loaded);
      } catch {
        setArtists([]);
      }
    };

    fetchArtists();
  }, []);

  const next = () => setCurrentSlide((p) => (p + 1) % artists.length);
  const prev = () => setCurrentSlide((p) => (p - 1 + artists.length) % artists.length);

  const toggleFollow = (e, id) => {
    e.stopPropagation();
    onFollow?.(id);

    setArtists(prev =>
      prev.map(a =>
        a.id === id
          ? { ...a, isFollowing: !a.isFollowing, followers: a.isFollowing ? a.followers - 1 : a.followers + 1 }
          : a
      )
    );
  };

  // FEED MODE
  if (viewMode === 'feed') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full rounded-sm border border-gray-300 dark:border-gray-700 p-2 bg-transparent"
      >
        {/* TOP BOX */}
        <div className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Featured Artists</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Amazing creators to follow</p>
            </div>
          </div>

          <Link
            to="/Artists/DiscoverUsers"
            className="text-rose-600 dark:text-rose-400 text-xs font-medium hover:underline"
          >
            View all →
          </Link>
        </div>

        {/* MIDDLE SLIDER BOX */}
        <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden relative">
          <motion.div
            className="flex"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            {artists.map((artist) => {
              const Icon = artist.specialtyIcon;
              return (
                <div
                  key={artist.id}
                  className="w-full flex-shrink-0 p-4 cursor-pointer"
                  onClick={() => onArtistClick?.(artist)}
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 shadow-sm">
                        <img
                          src={artist.avatar}
                          alt={artist.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      {artist.isFeatured && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {artist.name}

                        <div className={`w-7 h-7 rounded-full bg-gradient-to-r ${artist.specialtyColor} flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                      </h4>

                      <p className="text-sm text-rose-600 dark:text-rose-400 font-medium">
                        {artist.specialty} Artist
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {artist.location}
                      </p>

                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5" />{" "}
                          {artist.followers.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Follow Button */}
                    <button
                      onClick={(e) => toggleFollow(e, artist.id)}
                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                        artist.isFollowing
                          ? "border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                          : "bg-rose-600 text-white hover:bg-rose-700"
                      }`}
                    >
                      {artist.isFollowing ? "Following" : "+ Follow"}
                    </button>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* NEW ARROW CONTROLS — NOT OVERLAPPING ANYTHING */}

        </div>
{/* FIXED RESPONSIVE ARROWS */}
<button
  onClick={prev}
  className="
    absolute 
    left-2           /* stays inside screen on mobile */
    top-1/2 
    -translate-y-1/2
    z-20
    p-1.5
    bg-white/90 dark:bg-gray-900/90 
    border border-gray-300 dark:border-gray-700 
    rounded-full shadow-sm
    backdrop-blur-md
  "
>
  <ArrowLeft className="w-4 h-4" />
</button>

<button
  onClick={next}
  className="
    absolute 
    right-2          /* also inside, safe for mobile */
    top-1/2 
    -translate-y-1/2
    z-20
    p-1.5
    bg-white/90 dark:bg-gray-900/90 
    border border-gray-300 dark:border-gray-700 
    rounded-full shadow-sm
    backdrop-blur-md
  "
>
  <ArrowRight className="w-4 h-4" />
</button>

      </motion.div>
    );
  }

  return null;
};

export default ArtistDiscovery;
