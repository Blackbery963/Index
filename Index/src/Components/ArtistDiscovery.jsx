
// import { Link } from 'react-router-dom';
// import { useState, useRef } from 'react';
// import { FiChevronRight, FiUserPlus } from 'react-icons/fi';

// const ArtistDiscovery = () => {


//   const artists = [
//     {
//       id: 1,
//       name: "Sophia Chen",
//       specialty: "Watercolor",
//       bio: "Creating dreamy landscapes with flowing hues.",
//       image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
//     },
//     {
//       id: 2,
//       name: "James Wilson",
//       specialty: "Sculpture",
//       bio: "Modern shapes, timeless form.",
//       image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
//     },
//     {
//       id: 3,
//       name: "Emma Brown",
//       specialty: "Digital Art",
//       bio: "Mixing fantasy and tech in illustrations.",
//       image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
//     },
//     {
//       id: 4,
//       name: "Michael Lee",
//       specialty: "Photography",
//       bio: "Catching light and life in every shot.",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
//     },
//     {
//       id: 5,
//       name: "Olivia Park",
//       specialty: "Oil Painting",
//       bio: "Bold, textured stories on canvas.",
//       image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
//     }
//   ];

//   return (
//     <section className="py-12 bg-white dark:bg-[#0a0f14] max-w-[95%] mx-auto rounded-lg">
//       <div className="max-w-[100%] mx-auto px-4">
//         {/* Header */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//              Masters of the Canvas
//           </h2>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             Explore handpicked creators tailored to your artistic taste
//           </p>
//         </div>

//         {/* Category Filter (optional future feature) */}
//          <div
//     className="
//       flex gap-4 overflow-x-auto hide-scrollbar 
//       md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 md:overflow-visible
//     "
//   >
//     {artists.map((artist) => (
//       <div
//         key={artist.id}
//         className="
//           flex-shrink-0 min-w-[240px] md:min-w-0
//           bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md
//           transition-all duration-200 border
//         "
//       >
//         <div className="flex flex-col items-center text-center">
//           <img
//             src={artist.image}
//             alt={artist.name}
//             className="w-20 h-20 rounded-full object-cover mb-3"
//           />
//           <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
//             {artist.name}
//           </h3>
//           <p className="text-xs text-blue-500 mb-1">{artist.specialty}</p>
//           <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
//             {artist.bio || "Passionate artist sharing creative journeys."}
//           </p>
//           <button className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 border border-blue-500 rounded-full px-3 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all">
//             <FiUserPlus className="text-xs" />
//             Follow
//           </button>
//         </div>
//       </div>
//     ))}
//   </div>

//         {/* CTA */}
//         <div className="mt-8 text-right">

//           <Link to={"Artists/DiscoverUsers"}>
//           <button className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
//             View all artists
//             <FiChevronRight className="ml-1" />
//           </button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ArtistDiscovery;


// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { FiChevronRight, FiUserPlus, FiRefreshCw } from 'react-icons/fi';

// const ArtistDiscovery = () => {
//   const [artists, setArtists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [followed, setFollowed] = useState(new Set());

//   // Artist specialties to assign to random users
//   const artistSpecialties = [
//     "Watercolor", "Sculpture", "Digital Art", "Photography", 
//     "Oil Painting", "Sketching", "Mixed Media", "Portraiture",
//     "Street Art", "Abstract", "Pottery", "Illustration"
//   ];

//   // Fetch random users from API
//   const fetchArtists = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('https://randomuser.me/api/?results=5&nat=us,gb,ca,au');
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch artist data');
//       }
      
//       const data = await response.json();
      
//       // Transform API data into artist format
//       const formattedArtists = data.results.map((user, index) => ({
//         id: user.login.uuid,
//         name: `${user.name.first} ${user.name.last}`,
//         specialty: artistSpecialties[index % artistSpecialties.length],
//         bio: generateArtistBio(user.name.first, artistSpecialties[index % artistSpecialties.length]),
//         image: user.picture.large
//       }));
      
//       setArtists(formattedArtists);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       console.error("Error fetching artists:", err);
      
//       // Fallback to static data if API fails
//       setArtists([
        // {
        //   id: 1,
        //   name: "Sophia Chen",
        //   specialty: "Watercolor",
        //   bio: "Creating dreamy landscapes with flowing hues.",
        //   image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        // },
        // {
        //   id: 2,
        //   name: "James Wilson",
        //   specialty: "Sculpture",
        //   bio: "Modern shapes, timeless form.",
        //   image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        // },
        // {
        //   id: 3,
        //   name: "Emma Brown",
        //   specialty: "Digital Art",
        //   bio: "Mixing fantasy and tech in illustrations.",
        //   image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        // },
        // {
        //   id: 4,
        //   name: "Michael Lee",
        //   specialty: "Photography",
        //   bio: "Catching light and life in every shot.",
        //   image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        // },
        // {
        //   id: 5,
        //   name: "Olivia Park",
        //   specialty: "Oil Painting",
        //   bio: "Bold, textured stories on canvas.",
        //   image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        // }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generate a bio based on name and specialty
//   const generateArtistBio = (name, specialty) => {
//     const bios = {
//       Watercolor: `Creating dreamy landscapes with flowing hues.`,
//       Sculpture: `Modern shapes, timeless form.`,
//       "Digital Art": `Mixing fantasy and tech in illustrations.`,
//       Photography: `Catching light and life in every shot.`,
//       "Oil Painting": `Bold, textured stories on canvas.`,
//       Sketching: `Capturing moments with simple lines.`,
//       "Mixed Media": `Blending techniques for unique expressions.`,
//       Portraiture: `Revealing the soul through facial expressions.`,
//       "Street Art": `Transforming urban spaces with vibrant messages.`,
//       Abstract: `Exploring emotions through color and form.`,
//       Pottery: `Shaping clay into functional art.`,
//       Illustration: `Telling stories through visual narratives.`
//     };
    
//     return bios[specialty] || "Passionate artist sharing creative journeys.";
//   };

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
//   }, []);

//   return (
//     <section className="py-12 bg-white dark:bg-[#0a0f14] max-w-[95%] mx-auto rounded-lg">
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
//             onClick={fetchArtists}
//             disabled={loading}
//             className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 disabled:opacity-50"
//             title="Discover new artists"
//           >
//             <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
//             Refresh
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
//               md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 md:overflow-visible
//             "
//           >
//             {artists.map((artist) => (
//               <div
//                 key={artist.id}
//                 className="
//                   flex-shrink-0 min-w-[240px] md:min-w-0
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
//           <Link to={"Artists/DiscoverUsers"}>
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

import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { FiChevronRight, FiUserPlus, FiRefreshCw } from 'react-icons/fi';

const ArtistDiscovery = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followed, setFollowed] = useState(new Set());

  // Artist specialties to assign to random users
  const artistSpecialties = [
    'Watercolor', 'Sculpture', 'Digital Art', 'Photography',
    'Oil Painting', 'Sketching', 'Mixed Media', 'Portraiture',
    'Street Art', 'Abstract', 'Pottery', 'Illustration',
  ];

  // Generate a bio based on name and specialty
  const generateArtistBio = (name, specialty) => {
    const bios = {
      Watercolor: `Creating dreamy landscapes with flowing hues.`,
      Sculpture: `Modern shapes, timeless form.`,
      'Digital Art': `Mixing fantasy and tech in illustrations.`,
      Photography: `Catching light and life in every shot.`,
      'Oil Painting': `Bold, textured stories on canvas.`,
      Sketching: `Capturing moments with simple lines.`,
      'Mixed Media': `Blending techniques for unique expressions.`,
      Portraiture: `Revealing the soul through facial expressions.`,
      'Street Art': `Transforming urban spaces with vibrant messages.`,
      Abstract: `Exploring emotions through color and form.`,
      Pottery: `Shaping clay into functional art.`,
      Illustration: `Telling stories through visual narratives.`,
    };
    return bios[specialty] || 'Passionate artist sharing creative journeys.';
  };

  // Fetch random users from API
  const fetchArtists = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setFollowed(new Set()); // Clear followed state on refresh

      const response = await fetch(
        `https://randomuser.me/api/?results=10&nat=us,gb,ca,au&seed=${Date.now()}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch artist data');
      }

      const data = await response.json();

      const formattedArtists = data.results.map((user, index) => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        specialty: artistSpecialties[index % artistSpecialties.length],
        bio: generateArtistBio(user.name.first, artistSpecialties[index % artistSpecialties.length]),
        image: user.picture.large,
      }));

      setArtists(formattedArtists);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching artists:', err);
      // Fallback to static data
      setArtists([
        {
          id: 1,
          name: 'Sophia Chen',
          specialty: 'Watercolor',
          bio: 'Creating dreamy landscapes with flowing hues.',
          image:
            'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        },
        {
          id: 2,
          name: "James Wilson",
          specialty: "Sculpture",
          bio: "Modern shapes, timeless form.",
          image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: 3,
          name: "Emma Brown",
          specialty: "Digital Art",
          bio: "Mixing fantasy and tech in illustrations.",
          image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: 4,
          name: "Michael Lee",
          specialty: "Photography",
          bio: "Catching light and life in every shot.",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        },
        {
          id: 5,
          name: "Olivia Park",
          specialty: "Oil Painting",
          bio: "Bold, textured stories on canvas.",
          image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle follow status
  const toggleFollow = (artistId) => {
    const newFollowed = new Set(followed);
    if (newFollowed.has(artistId)) {
      newFollowed.delete(artistId);
    } else {
      newFollowed.add(artistId);
    }
    setFollowed(newFollowed);
  };

  // Fetch artists on component mount
  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  // Debounce refresh
  let debounceTimeout;
  const handleRefresh = () => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      fetchArtists();
    }, 300);
  };

  return (
    <section className="py-12 bg-white dark:bg-[#0a0f14] max-w-[95%] mx-auto rounded-lg">
      <div className="max-w-[100%] mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Masters of the Canvas
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Explore handpicked creators tailored to your artistic taste
            </p>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 disabled:opacity-50"
            title="Discover new artists"
          >
            <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
             <span className=' lg:block hidden'>Refresh</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-pulse text-gray-500">Discovering amazing artists...</div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm">
            {error} Showing sample artists instead.
          </div>
        )}

        {/* Artist Grid */}
        {!loading && (
          <div
            className="
              flex gap-4 overflow-x-auto hide-scrollbar
            "
          >
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="
                  flex-shrink-0 min-w-[240px]
                  bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md
                  transition-all duration-200 border cursor-pointer
                "
                onClick={() => console.log(`Navigating to ${artist.name}'s profile`)}
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-20 h-20 rounded-full object-cover mb-3"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80?text=Artist';
                    }}
                  />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {artist.name}
                  </h3>
                  <p className="text-xs text-blue-500 mb-1">{artist.specialty}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                    {artist.bio}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFollow(artist.id);
                    }}
                    className={`flex items-center gap-1 text-sm border rounded-full px-3 py-1 transition-all ${
                      followed.has(artist.id)
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700'
                        : 'text-blue-600 dark:text-blue-400 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900'
                    }`}
                  >
                    <FiUserPlus className="text-xs" />
                    {followed.has(artist.id) ? 'Following' : 'Follow'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 text-right">
          <Link to={'Artists/DiscoverUsers'}>
            <button className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              View all artists
              <FiChevronRight className="ml-1" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArtistDiscovery;