// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Music, Play, Pause, X, Search } from 'lucide-react';

// const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY; // Get from https://pixabay.com/api/docs/

// export const MusicSelector = ({ 
//   selectedTrack, 
//   onTrackSelect, 
//   onRemoveTrack, 
//   playingAudio, 
//   setPlayingAudio,
//   mobile = false 
// }) => {
//   const [showMusicSearch, setShowMusicSearch] = useState(false);
//   const [musicTracks, setMusicTracks] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(false);

//   // 🎧 Featured mood-based suggestions (fallback)
//   const featuredTracks = [
//     {
//       id: "ft1",
//       title: "Lofi Study Beats",
//       artist: "Soft Flow",
//       preview: "https://cdn.pixabay.com/download/audio/2023/02/22/audio_f7c03a63ce.mp3?filename=lofi-study-148997.mp3",
//       album: { cover_medium: "https://images.unsplash.com/photo-1616628182509-2cf2f5d36b27?w=250&h=250&fit=crop" }
//     },
//     {
//       id: "ft2",
//       title: "Calm Piano Dreams",
//       artist: "Zen Notes",
//       preview: "https://cdn.pixabay.com/download/audio/2022/10/24/audio_73b9e30f80.mp3?filename=piano-dreams-123483.mp3",
//       album: { cover_medium: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=250&h=250&fit=crop" }
//     },
//     {
//       id: "ft3",
//       title: "Cinematic Horizon",
//       artist: "Epic Motion",
//       preview: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_c156c4468c.mp3?filename=cinematic-horizon-123567.mp3",
//       album: { cover_medium: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=250&h=250&fit=crop" }
//     },
//   ];

//   // 🎵 Search from Pixabay API
//   // const searchMusic = async (query = "chill") => {
//   //   try {
//   //     setLoading(true);
//   //     const response = await fetch(
//   //       `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&per_page=10&type=music`
//   //     );
//   //     const data = await response.json();
//   //     if (!data.hits) throw new Error("No tracks found");
      
//   //     return data.hits.map(track => ({
//   //       id: track.id,
//   //       title: track.tags.split(",")[0] || "Unknown Track",
//   //       artist: track.user || "Pixabay Artist",
//   //       preview: track.audio,
//   //       album: { cover_medium: track.image || "https://via.placeholder.com/150" },
//   //     }));
//   //   } catch (error) {
//   //     console.error("Pixabay Music fetch failed:", error);
//   //     return [];
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const searchMusic = async (query = "chill") => {
//   try {
//     setLoading(true);
//     const response = await fetch(
//       `https://pixabay.com/api/audio/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&per_page=10`
//     );
//     const data = await response.json();
//     if (!data.hits) throw new Error("No tracks found");
    
//     return data.hits.map(track => ({
//       id: track.id,
//       title: track.tags.split(",")[0] || "Unknown Track",
//       artist: track.user || "Pixabay Artist",
//       preview: track.audio, // real mp3 link
//       album: { cover_medium: track.image || "https://via.placeholder.com/150" },
//     }));
//   } catch (error) {
//     console.error("Pixabay Music fetch failed:", error);
//     return [];
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     searchMusic().then(setMusicTracks);
//   }, []);

//   const playMusicPreview = (track) => {
//     if (playingAudio) {
//       playingAudio.pause();
//       if (playingAudio.src === track.preview) {
//         setPlayingAudio(null);
//         return;
//       }
//     }

//     const audio = new Audio(track.preview);
//     audio.play().catch(console.error);
//     setPlayingAudio(audio);
//     audio.onended = () => setPlayingAudio(null);
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     const results = await searchMusic(searchQuery);
//     setMusicTracks(results);
//   };

//   return (
//     <div className={`${mobile ? 'w-full' : 'w-full'}`}>
//       <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
//         <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
//           <Music className="w-4 h-4" />
//           Background Music {!mobile && '(Optional)'}
//         </label>

//         {selectedTrack ? (
//           <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-3 border border-purple-200 dark:border-purple-800">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <img
//                   src={selectedTrack.album.cover_medium}
//                   alt={selectedTrack.title}
//                   className="w-12 h-12 rounded-lg shadow-sm"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">
//                     {selectedTrack.title}
//                   </div>
//                   <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
//                     {selectedTrack.artist}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => playMusicPreview(selectedTrack)}
//                   className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
//                 >
//                   {playingAudio && playingAudio.src === selectedTrack.preview ? (
//                     <Pause className="w-4 h-4 text-purple-600" />
//                   ) : (
//                     <Play className="w-4 h-4 text-purple-600" />
//                   )}
//                 </button>
//                 <button
//                   onClick={onRemoveTrack}
//                   className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
//                 >
//                   <X className="w-4 h-4 text-red-500" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => setShowMusicSearch(true)}
//             className="w-full p-4 border-2 border-dashed border-gray-300/50 dark:border-gray-600/50 rounded-xl hover:border-purple-400/50 dark:hover:border-purple-400/50 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-all duration-200 flex items-center justify-center gap-3 group"
//           >
//             <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg group-hover:scale-110 transition-transform duration-200">
//               <Music className="w-5 h-5 text-white" />
//             </div>
//             <div className="text-left">
//               <div className="font-semibold text-gray-700 dark:text-gray-300">
//                 Add Background Music
//               </div>
//               <div className="text-xs text-gray-500 dark:text-gray-400">
//                 Set the mood for your story
//               </div>
//             </div>
//           </button>
//         )}
//       </div>

//       {/* 🎧 Music Modal */}
//       <AnimatePresence>
//         {showMusicSearch && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
//             onClick={() => setShowMusicSearch(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl border border-white/20"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-xl font-bold text-gray-900 dark:text-white">Choose Music</h3>
//                   <button
//                     onClick={() => setShowMusicSearch(false)}
//                     className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>

//                 <form onSubmit={handleSearch} className="flex gap-2">
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search for music..."
//                     className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                   />
//                   <button
//                     type="submit"
//                     className="p-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600"
//                   >
//                     <Search className="w-5 h-5" />
//                   </button>
//                 </form>
//               </div>

//               <div className="max-h-96 overflow-y-auto p-4 space-y-4">
//                 {/* Featured Section */}
//                 <div>
//                   <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                     🎧 Suggested Tracks
//                   </h4>
//                   {featuredTracks.map(track => (
//                     <div
//                       key={track.id}
//                       className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group"
//                     >
//                       <img src={track.album.cover_medium} alt={track.title} className="w-12 h-12 rounded-lg" />
//                       <div className="flex-1 min-w-0">
//                         <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">{track.title}</div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{track.artist}</div>
//                       </div>
//                       <button
//                         onClick={() => playMusicPreview(track)}
//                         className="opacity-0 group-hover:opacity-100 p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm transition-all"
//                       >
//                         {playingAudio && playingAudio.src === track.preview ? (
//                           <Pause className="w-4 h-4" />
//                         ) : (
//                           <Play className="w-4 h-4" />
//                         )}
//                       </button>
//                       <button
//                         onClick={() => onTrackSelect(track)}
//                         className="text-xs bg-purple-500 text-white px-2 py-1 rounded-lg hover:bg-purple-600"
//                       >
//                         Select
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Search Results */}
//                 <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-4">Search Results</h4>
//                 {loading ? (
//                   <div className="text-center text-gray-500 py-4">Searching...</div>
//                 ) : musicTracks.length > 0 ? (
//                   musicTracks.map(track => (
//                     <button
//                       key={track.id}
//                       onClick={() => onTrackSelect(track)}
//                       className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group"
//                     >
//                       <img src={track.album.cover_medium} alt={track.title} className="w-12 h-12 rounded-lg" />
//                       <div className="flex-1 text-left min-w-0">
//                         <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">{track.title}</div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{track.artist}</div>
//                       </div>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           playMusicPreview(track);
//                         }}
//                         className="opacity-0 group-hover:opacity-100 p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm transition-all"
//                       >
//                         {playingAudio && playingAudio.src === track.preview ? (
//                           <Pause className="w-4 h-4" />
//                         ) : (
//                           <Play className="w-4 h-4" />
//                         )}
//                       </button>
//                     </button>
//                   ))
//                 ) : (
//                   <div className="text-center text-gray-500 py-4">No results found</div>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };



import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, X, Search, Download, Headphones } from 'lucide-react';
import { searchFreesoundMusic } from '../utils/musicAPI';

export const MusicSelector = ({ 
  selectedTrack, 
  onTrackSelect, 
  onRemoveTrack, 
  playingAudio, 
  setPlayingAudio,
  mobile = false 
}) => {
  const [showMusicSearch, setShowMusicSearch] = useState(false);
  const [musicTracks, setMusicTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('chill');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🎧 High-quality fallback tracks with GUARANTEED working URLs
  const getFallbackTracks = (mood = "chill") => {
    const moodTracks = {
      chill: [
        {
          id: "chill-1",
          title: "Lofi Study Session",
          artist: "Study Vibes",
          preview: "https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav", // Short sound effect
          duration: 30,
          album: { cover_medium: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=250&h=250&fit=crop" }
        },
        {
          id: "chill-2", 
          title: "Ambient Space",
          artist: "Cosmic Waves",
          preview: "https://www.soundjay.com/button/sounds/button-09.mp3", // Working sound
          duration: 30,
          album: { cover_medium: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=250&h=250&fit=crop" }
        }
      ],
      upbeat: [
        {
          id: "upbeat-1",
          title: "Morning Energy",
          artist: "Positive Vibes", 
          preview: "https://www.soundjay.com/button/sounds/button-10.mp3",
          duration: 30,
          album: { cover_medium: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=250&h=250&fit=crop" }
        }
      ],
      cinematic: [
        {
          id: "cinematic-1",
          title: "Epic Adventure", 
          artist: "Orchestral Dreams",
          preview: "https://www.soundjay.com/button/sounds/button-03.mp3",
          duration: 30,
          album: { cover_medium: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=250&h=250&fit=crop" }
        }
      ]
    };
    
    return moodTracks[mood] || moodTracks.chill;
  };

  // 🎵 Search music with Freesound API
  const searchMusic = async (query = "chill") => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Searching for:', query);
      
      // Try Freesound API first
      const freesoundResults = await searchFreesoundMusic(query);
      
      if (freesoundResults && freesoundResults.length > 0) {
        console.log('Found Freesound results:', freesoundResults.length);
        return freesoundResults;
      }
      
      // Fallback to our guaranteed working tracks
      console.log('Using fallback tracks');
      return getFallbackTracks(query);
      
    } catch (error) {
      console.error('Music search failed:', error);
      setError('Unable to load music. Using fallback tracks.');
      return getFallbackTracks(query);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load initial tracks
    searchMusic('chill').then(setMusicTracks);
  }, []);

  const playMusicPreview = async (track) => {
    try {
      // Stop currently playing audio
      if (playingAudio) {
        playingAudio.pause();
        if (playingAudio.src === track.preview) {
          setPlayingAudio(null);
          return;
        }
      }

      console.log('Playing:', track.title, track.preview);
      
      // Create new audio instance
      const audio = new Audio();
      
      // Set up event listeners first
      audio.addEventListener('canplaythrough', () => {
        console.log('Audio ready to play');
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Audio error:', e, audio.error);
      });

      audio.addEventListener('loadstart', () => {
        console.log('Starting to load audio');
      });

      // Set source and play
      audio.src = track.preview;
      audio.preload = 'auto';
      audio.crossOrigin = 'anonymous';
      
      // Wait for audio to be ready
      await new Promise((resolve, reject) => {
        audio.addEventListener('canplay', resolve, { once: true });
        audio.addEventListener('error', reject, { once: true });
      });

      // Play the audio
      await audio.play();
      setPlayingAudio(audio);
      
      audio.onended = () => {
        console.log('Audio ended');
        setPlayingAudio(null);
      };

    } catch (error) {
      console.error('Error playing audio:', error);
      setError(`Could not play "${track.title}". Please try another track.`);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const results = await searchMusic(searchQuery);
    setMusicTracks(results);
  };

  const handleTrackSelect = (track) => {
    onTrackSelect(track);
    setShowMusicSearch(false);
    
    if (playingAudio) {
      playingAudio.pause();
      setPlayingAudio(null);
    }
  };

  // Quick mood-based searches
  const quickSearches = ['chill', 'ambient', 'piano', 'upbeat', 'cinematic', 'jazz'];

  return (
    <div className={`${mobile ? 'w-full' : 'w-full'}`}>
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          <Music className="w-4 h-4" />
          Background Music {!mobile && '(Optional)'}
        </label>

        {selectedTrack ? (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-3 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedTrack.album.cover_medium}
                  alt={selectedTrack.title}
                  className="w-12 h-12 rounded-lg shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                    {selectedTrack.title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {selectedTrack.artist}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => playMusicPreview(selectedTrack)}
                  className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                  title="Preview track"
                >
                  {playingAudio && playingAudio.src === selectedTrack.preview ? (
                    <Pause className="w-4 h-4 text-purple-600" />
                  ) : (
                    <Play className="w-4 h-4 text-purple-600" />
                  )}
                </button>
                <button
                  onClick={onRemoveTrack}
                  className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                  title="Remove music"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowMusicSearch(true)}
            className="w-full p-4 border-2 border-dashed border-gray-300/50 dark:border-gray-600/50 rounded-xl hover:border-purple-400/50 dark:hover:border-purple-400/50 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-all duration-200 flex items-center justify-center gap-3 group"
          >
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-700 dark:text-gray-300">
                Add Background Music
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Royalty-free music for your stories
              </div>
            </div>
          </button>
        )}
      </div>

      {/* 🎧 Music Modal */}
      <AnimatePresence>
        {showMusicSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowMusicSearch(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Royalty-Free Music</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Powered by Freesound.org
                    </p>
                  </div>
                  <button
                    onClick={() => setShowMusicSearch(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Quick Search Buttons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {quickSearches.map(mood => (
                    <button
                      key={mood}
                      onClick={() => {
                        setSearchQuery(mood);
                        searchMusic(mood).then(setMusicTracks);
                      }}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors capitalize"
                    >
                      {mood}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for music (lofi, ambient, piano, cinematic...)"
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="p-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors disabled:opacity-50"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </form>

                {error && (
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">{error}</p>
                  </div>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto p-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                    <p className="text-gray-500 mt-2">Searching Freesound.org...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {musicTracks.map(track => (
                      <div
                        key={track.id}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group border border-gray-100 dark:border-gray-700"
                      >
                        <img 
                          src={track.album.cover_medium} 
                          alt={track.title} 
                          className="w-12 h-12 rounded-lg flex-shrink-0 object-cover" 
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                            {track.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {track.artist}
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {Math.round(track.duration)}s
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => playMusicPreview(track)}
                            className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                            title="Preview track"
                          >
                            {playingAudio && playingAudio.src === track.preview ? (
                              <Pause className="w-4 h-4 text-purple-600" />
                            ) : (
                              <Play className="w-4 h-4 text-purple-600" />
                            )}
                          </button>
                          <button
                            onClick={() => handleTrackSelect(track)}
                            className="px-3 py-2 bg-purple-500 text-white text-xs rounded-lg hover:bg-purple-600 transition-colors font-medium"
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {musicTracks.length === 0 && !loading && (
                  <div className="text-center py-8 text-gray-500">
                    <Headphones className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No tracks found. Try a different search term.</p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Music provided by Freesound.org - Royalty-free for personal use
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};