// import { Link } from 'react-router-dom';
// import { useState, useEffect, useCallback } from 'react';
// import { FiChevronRight, FiUserPlus, FiRefreshCw } from 'react-icons/fi';

// const ArtistDiscovery = () => {
//   const [artists, setArtists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [followed, setFollowed] = useState(new Set());

//   // Artist specialties to assign to random users
//   const artistSpecialties = [
//     'Watercolor', 'Sculpture', 'Digital Art', 'Photography',
//     'Oil Painting', 'Sketching', 'Mixed Media', 'Portraiture',
//     'Street Art', 'Abstract', 'Pottery', 'Illustration',
//   ];

//   // Generate a bio based on name and specialty
//   const generateArtistBio = (name, specialty) => {
//     const bios = {
//       Watercolor: `Creating dreamy landscapes with flowing hues.`,
//       Sculpture: `Modern shapes, timeless form.`,
//       'Digital Art': `Mixing fantasy and tech in illustrations.`,
//       Photography: `Catching light and life in every shot.`,
//       'Oil Painting': `Bold, textured stories on canvas.`,
//       Sketching: `Capturing moments with simple lines.`,
//       'Mixed Media': `Blending techniques for unique expressions.`,
//       Portraiture: `Revealing the soul through facial expressions.`,
//       'Street Art': `Transforming urban spaces with vibrant messages.`,
//       Abstract: `Exploring emotions through color and form.`,
//       Pottery: `Shaping clay into functional art.`,
//       Illustration: `Telling stories through visual narratives.`,
//     };
//     return bios[specialty] || 'Passionate artist sharing creative journeys.';
//   };

//   // Fetch random users from API
//   const fetchArtists = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       setFollowed(new Set()); // Clear followed state on refresh

//       const response = await fetch(
//         `https://randomuser.me/api/?results=10&nat=us,gb,ca,au&seed=${Date.now()}`
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch artist data');
//       }

//       const data = await response.json();

//       const formattedArtists = data.results.map((user, index) => ({
//         id: user.login.uuid,
//         name: `${user.name.first} ${user.name.last}`,
//         specialty: artistSpecialties[index % artistSpecialties.length],
//         bio: generateArtistBio(user.name.first, artistSpecialties[index % artistSpecialties.length]),
//         image: user.picture.large,
//       }));

//       setArtists(formattedArtists);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching artists:', err);
//       // Fallback to static data
//       setArtists([
//         {
//           id: 1,
//           name: 'Sophia Chen',
//           specialty: 'Watercolor',
//           bio: 'Creating dreamy landscapes with flowing hues.',
//           image:
//             'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
//         },
//         {
//           id: 2,
//           name: "James Wilson",
//           specialty: "Sculpture",
//           bio: "Modern shapes, timeless form.",
//           image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
//         },
//         {
//           id: 3,
//           name: "Emma Brown",
//           specialty: "Digital Art",
//           bio: "Mixing fantasy and tech in illustrations.",
//           image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
//         },
//         {
//           id: 4,
//           name: "Michael Lee",
//           specialty: "Photography",
//           bio: "Catching light and life in every shot.",
//           image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
//         },
//         {
//           id: 5,
//           name: "Olivia Park",
//           specialty: "Oil Painting",
//           bio: "Bold, textured stories on canvas.",
//           image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Toggle follow status
//   const toggleFollow = (artistId) => {
//     const newFollowed = new Set(followed);
//     if (newFollowed.has(artistId)) {
//       newFollowed.delete(artistId);
//     } else {
//       newFollowed.add(artistId);
//     }
//     setFollowed(newFollowed);
//   };

//   // Fetch artists on component mount
//   useEffect(() => {
//     fetchArtists();
//   }, [fetchArtists]);

//   // Debounce refresh
//   let debounceTimeout;
//   const handleRefresh = () => {
//     if (debounceTimeout) clearTimeout(debounceTimeout);
//     debounceTimeout = setTimeout(() => {
//       fetchArtists();
//     }, 300);
//   };

//   return (
//     <section className="py-12 bg-white dark:bg-[#0a0f14] xl:max-w-7xl max-w-full sm:max-w-[85%] mx-auto rounded-lg">
//       <div className="max-w-[100%] mx-auto px-4">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//               Masters of the Canvas
//             </h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Explore handpicked creators tailored to your artistic taste
//             </p>
//           </div>

//           {/* Refresh Button */}
//           <button
//             onClick={handleRefresh}
//             disabled={loading}
//             className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 disabled:opacity-50"
//             title="Discover new artists"
//           >
//             <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
//              <span className=' lg:block hidden'>Refresh</span>
//           </button>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex justify-center py-8">
//             <div className="animate-pulse text-gray-500">Discovering amazing artists...</div>
//           </div>
//         )}

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm">
//             {error} Showing sample artists instead.
//           </div>
//         )}

//         {/* Artist Grid */}
//         {!loading && (
//           <div
//             className="
//               flex gap-4 overflow-x-auto hide-scrollbar
//             "
//           >
//             {artists.map((artist) => (
//               <div
//                 key={artist.id}
//                 className="
//                   flex-shrink-0 min-w-[240px]
//                   bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md
//                   transition-all duration-200 border cursor-pointer
//                 "
//                 onClick={() => console.log(`Navigating to ${artist.name}'s profile`)}
//               >
//                 <div className="flex flex-col items-center text-center">
//                   <img
//                     src={artist.image}
//                     alt={artist.name}
//                     className="w-20 h-20 rounded-full object-cover mb-3"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/80?text=Artist';
//                     }}
//                   />
//                   <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
//                     {artist.name}
//                   </h3>
//                   <p className="text-xs text-blue-500 mb-1">{artist.specialty}</p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
//                     {artist.bio}
//                   </p>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleFollow(artist.id);
//                     }}
//                     className={`flex items-center gap-1 text-sm border rounded-full px-3 py-1 transition-all ${
//                       followed.has(artist.id)
//                         ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700'
//                         : 'text-blue-600 dark:text-blue-400 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900'
//                     }`}
//                   >
//                     <FiUserPlus className="text-xs" />
//                     {followed.has(artist.id) ? 'Following' : 'Follow'}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* CTA */}
//         <div className="mt-8 text-right">
//           <Link to={'Artists/DiscoverUsers'}>
//             <button className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
//               View all artists
//               <FiChevronRight className="ml-1" />
//             </button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ArtistDiscovery;



// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Heart, UserPlus, Users } from 'lucide-react';
// import { motion } from 'framer-motion';

// const ArtistDiscovery = ({ viewMode = 'feed', onArtistClick, followedArtists, onFollow }) => {
//   const [artists, setArtists] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Mock artist data (in real app, this would come from API)
//   const mockArtists = [
//     {
//       id: 1,
//       name: 'Sophia Chen',
//       specialty: 'Watercolor',
//       bio: 'Creating dreamy landscapes with flowing hues',
//       image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=200&fit=crop&crop=face',
//       followers: 1242,
//       artworks: 45,
//       isFollowing: false
//     },
//     {
//       id: 2,
//       name: 'James Wilson',
//       specialty: 'Sculpture',
//       bio: 'Modern shapes, timeless form',
//       image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=200&h=200&fit=crop&crop=face',
//       followers: 867,
//       artworks: 32,
//       isFollowing: true
//     },
//     {
//       id: 3,
//       name: 'Emma Brown',
//       specialty: 'Digital Art',
//       bio: 'Mixing fantasy and tech in illustrations',
//       image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&h=200&fit=crop&crop=face',
//       followers: 2156,
//       artworks: 78,
//       isFollowing: false
//     },
//     {
//       id: 4,
//       name: 'Michael Lee',
//       specialty: 'Photography',
//       bio: 'Catching light and life in every shot',
//       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
//       followers: 1893,
//       artworks: 123,
//       isFollowing: false
//     }
//   ];

//   useEffect(() => {
//     setLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setArtists(mockArtists);
//       setLoading(false);
//     }, 500);
//   }, []);

//   const handleFollow = (e, artistId) => {
//     e.stopPropagation();
//     onFollow?.(artistId);
//   };

//   const handleArtistClick = (artist) => {
//     onArtistClick?.(artist);
//   };

//   if (loading) {
//     return (
//       <section className="py-8">
//         <div className="animate-pulse">
//           <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[1, 2, 3, 4].map(i => (
//               <div key={i} className="text-center">
//                 <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-2"></div>
//                 <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
//                 <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-8">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
//             <Users className="w-5 h-5" />
//             Artists You Might Like
//           </h2>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Discover creators based on your interests
//           </p>
//         </div>
//         <Link to="/artists" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
//           View all
//         </Link>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {artists.map((artist) => (
//           <motion.div
//             key={artist.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="group cursor-pointer"
//             onClick={() => handleArtistClick(artist)}
//           >
//             <div className="text-center">
//               {/* Artist Avatar */}
//               <div className="relative mx-auto mb-3">
//                 <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-lg group-hover:scale-110 transition-transform duration-300">
//                   <img
//                     src={artist.image}
//                     alt={artist.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 {/* Online Status Indicator */}
//                 <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
//               </div>

//               {/* Artist Info */}
//               <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
//                 {artist.name}
//               </h3>
//               <p className="text-xs text-blue-500 dark:text-blue-400 mb-1">
//                 {artist.specialty}
//               </p>
//               <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
//                 {artist.bio}
//               </p>

//               {/* Stats */}
//               <div className="flex justify-center items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
//                 <div className="flex items-center gap-1">
//                   <Heart className="w-3 h-3" />
//                   <span>{artist.followers}</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <span>{artist.artworks} works</span>
//                 </div>
//               </div>

//               {/* Follow Button */}
//               <button
//                 onClick={(e) => handleFollow(e, artist.id)}
//                 className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${
//                   artist.isFollowing
//                     ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
//                     : 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200'
//                 }`}
//               >
//                 {artist.isFollowing ? 'Following' : 'Follow'}
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ArtistDiscovery;

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, UserPlus, Users, MapPin, Award, Sparkles, Palette, Camera, Brush, Zap, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ArtistDiscovery = ({ viewMode = 'feed', onArtistClick, followedArtists, onFollow }) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Enhanced artist data with unique content
  const artistSpecialties = {
    watercolor: {
      icon: Palette,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/10',
      borderColor: 'border-blue-200 dark:border-blue-800/30',
      techniques: ['Wet-on-wet', 'Dry brush', 'Glazing', 'Lifting'],
      materials: ['Watercolor paper', 'Sable brushes', 'Professional pigments']
    },
    digital: {
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/10',
      borderColor: 'border-purple-200 dark:border-purple-800/30',
      techniques: ['Digital painting', 'Vector art', '3D modeling', 'Animation'],
      materials: ['Wacom tablet', 'Photoshop', 'Procreate', 'Blender']
    },
    sculpture: {
      icon: Brush,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/10',
      borderColor: 'border-amber-200 dark:border-amber-800/30',
      techniques: ['Clay modeling', 'Stone carving', 'Metal casting', 'Woodworking'],
      materials: ['Marble', 'Bronze', 'Terracotta', 'Resin']
    },
    photography: {
      icon: Camera,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/10',
      borderColor: 'border-emerald-200 dark:border-emerald-800/30',
      techniques: ['Portrait lighting', 'Landscape composition', 'Street photography', 'Long exposure'],
      materials: ['DSLR camera', 'Prime lenses', 'Studio lights', 'Editing software']
    }
  };

  // Fetch artists from API with enhanced data
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://randomuser.me/api/?results=6&nat=us,gb,ca,au&inc=name,picture,location,login,dob');
        
        if (!response.ok) {
          throw new Error('Failed to fetch artists');
        }
        
        const data = await response.json();
        
        const specialties = Object.keys(artistSpecialties);
        const locations = [
          { city: 'New York', country: 'USA', flag: '🇺🇸' },
          { city: 'London', country: 'UK', flag: '🇬🇧' },
          { city: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
          { city: 'Paris', country: 'France', flag: '🇫🇷' },
          { city: 'Berlin', country: 'Germany', flag: '🇩🇪' },
          { city: 'Sydney', country: 'Australia', flag: '🇦🇺' }
        ];
        
        const artistBios = {
          watercolor: [
            "Creating ethereal landscapes with flowing watercolor techniques that capture light and atmosphere",
            "Master of transparent washes and delicate color harmonies in contemporary watercolor art",
            "Pushing the boundaries of traditional watercolor with experimental approaches and mixed media"
          ],
          digital: [
            "Blending digital precision with artistic intuition to create immersive virtual worlds",
            "Specializing in character design and concept art for games and animation studios",
            "Exploring the intersection of AI and human creativity in digital illustration"
          ],
          sculpture: [
            "Transforming raw materials into expressive forms that challenge spatial perception",
            "Creating large-scale installations that interact with architectural environments",
            "Reviving ancient sculpting techniques with contemporary conceptual frameworks"
          ],
          photography: [
            "Documenting human stories through intimate portrait photography and visual narratives",
            "Capturing the ephemeral beauty of urban landscapes and architectural details",
            "Experimental photographer merging traditional darkroom techniques with digital innovation"
          ]
        };
        
        const formattedArtists = data.results.map((user, index) => {
          const specialty = specialties[index % specialties.length];
          const specialtyData = artistSpecialties[specialty];
          const location = locations[index % locations.length];
          const bioOptions = artistBios[specialty];
          
          return {
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            specialty: specialty.charAt(0).toUpperCase() + specialty.slice(1),
            specialtyData,
            bio: bioOptions[index % bioOptions.length],
            image: user.picture.large,
            location: `${location.city}, ${location.country} ${location.flag}`,
            followers: Math.floor(Math.random() * 5000) + 500,
            artworks: Math.floor(Math.random() * 200) + 20,
            isFollowing: Math.random() > 0.7,
            isFeatured: index < 2,
            rating: (Math.random() * 2 + 3).toFixed(1),
            yearsExperience: Math.floor(Math.random() * 15) + 2,
            recentProject: `"${getProjectName(specialty)}" - ${getProjectDescription(specialty)}`,
            techniques: specialtyData.techniques.slice(0, 2),
            availableFor: ['Commission', 'Collaboration', 'Workshops'][Math.floor(Math.random() * 3)],
            achievement: getAchievement(specialty, index)
          };
        });
        
        setArtists(formattedArtists);
      } catch (err) {
        setError('Failed to load artists');
        console.error('Error fetching artists:', err);
        
        // Enhanced fallback data
        const mockArtists = [
          {
            id: 1,
            name: 'Sophia Chen',
            specialty: 'Watercolor',
            specialtyData: artistSpecialties.watercolor,
            bio: 'Creating ethereal landscapes with flowing watercolor techniques that capture light and atmosphere',
            image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=200&fit=crop&crop=face',
            location: 'San Francisco, USA 🇺🇸',
            followers: 1242,
            artworks: 45,
            isFollowing: false,
            isFeatured: true,
            rating: '4.8',
            yearsExperience: 8,
            recentProject: '"Ocean Dreams" - Series exploring marine life through abstract watercolor',
            techniques: ['Wet-on-wet', 'Dry brush'],
            availableFor: 'Commission',
            achievement: 'Featured in International Watercolor Biennial'
          },
          {
            id: 2,
            name: 'James Wilson',
            specialty: 'Sculpture',
            specialtyData: artistSpecialties.sculpture,
            bio: 'Transforming raw materials into expressive forms that challenge spatial perception',
            image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=200&h=200&fit=crop&crop=face',
            location: 'London, UK 🇬🇧',
            followers: 867,
            artworks: 32,
            isFollowing: true,
            isFeatured: true,
            rating: '4.6',
            yearsExperience: 12,
            recentProject: '"Urban Echoes" - Bronze sculptures for public spaces',
            techniques: ['Metal casting', 'Stone carving'],
            availableFor: 'Collaboration',
            achievement: 'Tate Modern Acquisition 2023'
          }
        ];
        setArtists(mockArtists);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Helper functions for dynamic content
  function getProjectName(specialty) {
    const projects = {
      watercolor: ['Ocean Dreams', 'Mountain Mists', 'Urban Reflections', 'Botanical Studies'],
      digital: ['Digital Realms', 'Cyber Portraits', 'Virtual Landscapes', 'AI Collaborations'],
      sculpture: ['Urban Echoes', 'Form and Void', 'Material Memories', 'Spatial Dialogues'],
      photography: ['Human Stories', 'City Rhythms', 'Natural Patterns', 'Light Studies']
    };
    return projects[specialty][Math.floor(Math.random() * projects[specialty].length)];
  }

  function getProjectDescription(specialty) {
    const descriptions = {
      watercolor: 'Series exploring color transparency and fluid forms',
      digital: 'Interactive installation merging digital and physical spaces',
      sculpture: 'Large-scale installation challenging material boundaries',
      photography: 'Documentary project capturing urban transformation'
    };
    return descriptions[specialty];
  }

  function getAchievement(specialty, index) {
    const achievements = {
      watercolor: ['International Watercolor Award', 'Solo Exhibition at National Gallery', 'Artist Residency in Italy'],
      digital: ['Digital Art Festival Winner', 'VR Installation Featured', 'Tech-Art Collaboration Grant'],
      sculpture: ['Public Art Commission', 'Museum Acquisition', 'International Sculpture Prize'],
      photography: ['Photojournalism Award', 'National Geographic Feature', 'Documentary Film Collaboration']
    };
    return achievements[specialty][index % achievements[specialty].length];
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % artists.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + artists.length) % artists.length);
  };

  const handleFollow = (e, artistId) => {
    e.stopPropagation();
    onFollow?.(artistId);
    
    setArtists(prev => prev.map(artist => 
      artist.id === artistId 
        ? { ...artist, isFollowing: !artist.isFollowing, followers: artist.isFollowing ? artist.followers - 1 : artist.followers + 1 }
        : artist
    ));
  };

  const handleArtistClick = (artist) => {
    onArtistClick?.(artist);
  };

  // Compact version for feed integration
  if (viewMode === 'feed' || viewMode === 'collage') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/10 rounded-sm p-6 shadow-lg border border-pink-200 dark:border-pink-800/30"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Featured Artists
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Discover unique creators with diverse artistic approaches
            </p>
          </div>
        </div>

        {loading ? (
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500 dark:text-red-400 text-sm">
            {error}
          </div>
        ) : (
          <div className="relative">
            {/* Desktop Arrows */}
            <div className="hidden lg:flex absolute inset-y-0 left-0 right-0 -mx-6 items-center justify-between z-10 pointer-events-none">
              <button
                onClick={prevSlide}
                className="pointer-events-auto p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors transform -translate-x-1/2"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="pointer-events-auto p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors transform translate-x-1/2"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Artist Slider */}
            <div className="overflow-hidden rounded-lg">
              <motion.div
                className="flex"
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {artists.map((artist) => {
                  const SpecialtyIcon = artist.specialtyData.icon;
                  return (
                    <div key={artist.id} className="w-full flex-shrink-0 px-2">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                        onClick={() => handleArtistClick(artist)}
                      >
                        {/* Header with Avatar and Basic Info */}
                        <div className="flex items-start gap-3 mb-4">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-md group-hover:scale-110 transition-transform duration-300">
                              <img
                                src={artist.image}
                                alt={artist.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {artist.isFeatured && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                                <Sparkles className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">
                                {artist.name}
                              </h4>
                              <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${artist.specialtyData.color} flex items-center justify-center`}>
                                <SpecialtyIcon className="w-3 h-3 text-white" />
                              </div>
                            </div>
                            <p className="text-xs text-pink-600 dark:text-pink-400 font-medium line-clamp-1 mb-1">
                              {artist.specialty} Artist
                            </p>
                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                              <MapPin className="w-3 h-3" />
                              <span className="line-clamp-1">{artist.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Unique Content for Each Artist */}
                        <div className="space-y-3 mb-4">
                          {/* Bio */}
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                            {artist.bio}
                          </p>

                          {/* Recent Project */}
                          <div>
                            <p className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                              Recent Project
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                              {artist.recentProject}
                            </p>
                          </div>

                          {/* Techniques */}
                          <div>
                            <p className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                              Techniques
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {artist.techniques.map((technique, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                                  {technique}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Achievement */}
                          <div>
                            <p className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                              Achievement
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                              {artist.achievement}
                            </p>
                          </div>
                        </div>

                        {/* Stats and Action */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-600">
                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              <span>{artist.followers}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              <span>{artist.rating}</span>
                            </div>
                            <div className="text-xs">
                              {artist.yearsExperience}y exp
                            </div>
                          </div>
                          
                          <button
                            onClick={(e) => handleFollow(e, artist.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                              artist.isFollowing
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                : 'bg-pink-500 text-white hover:bg-pink-600'
                            }`}
                          >
                            {artist.isFollowing ? 'Following' : 'Follow'}
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Slider Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {artists.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index 
                      ? 'bg-pink-500 w-4' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex gap-2 mt-6">
          <Link to="/artists" className="flex-1">
            <button className="w-full py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              Explore All Artists
            </button>
          </Link>
          <Link to="/artists/discover" className="flex-1">
            <button className="w-full py-2 border border-pink-500 text-pink-500 dark:text-pink-400 text-sm font-medium rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4" />
              Find Similar
            </button>
          </Link>
        </div>
      </motion.div>
    );
  }

  // ... (Full version remains similar but enhanced with new data)
};

export default ArtistDiscovery;