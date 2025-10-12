// // // // import React, { useEffect, useState } from "react";
// // // // import { FaHeart, FaDownload, FaShareAlt } from "react-icons/fa";

// // // // // Your Pexels API key here
// // // // const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

// // // // export default function ShortsPage() {
// // // //   const [videos, setVideos] = useState([]);

// // // //   useEffect(() => {
// // // //     async function fetchVideos() {
// // // //       try {
// // // //         const res = await fetch(
// // // //           "https://api.pexels.com/videos/search?query=art&per_page=70",
// // // //           {
// // // //             headers: { Authorization: PEXELS_API_KEY },
// // // //           }
// // // //         );
// // // //         const data = await res.json();
// // // //         setVideos(data.videos || []);
// // // //       } catch (err) {
// // // //         console.error("Error fetching videos:", err);
// // // //       }
// // // //     }
// // // //     fetchVideos();
// // // //   }, []);

// // // //   return (
// // // //     <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
// // // //       {videos.map((video) => {
// // // //         const file = video.video_files.find((f) => f.quality === "sd") || video.video_files[0];
// // // //         return (
// // // //           <div
// // // //             key={video.id}
// // // //             className="w-full h-screen flex-shrink-0 snap-start relative flex items-center justify-center"
// // // //           >
// // // //             {/* Video */}
// // // //             <video
// // // //               src={file.link}
// // // //               className="w-full h-full object-cover"
// // // //               autoPlay
// // // //               loop
// // // //               muted
// // // //               playsInline
// // // //             />

// // // //             {/* Overlay */}
// // // //             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-black/10 pointer-events-none"></div>

// // // //             {/* Video Info */}
// // // //             <div className="absolute bottom-20 left-4 text-white">
// // // //               <h2 className="font-semibold text-lg">{video.user?.name}</h2>
// // // //               <p className="text-sm opacity-80">#{video.id}</p>
// // // //             </div>

// // // //             {/* Action Buttons */}
// // // //             <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 text-white">
// // // //               <button
// // // //                 onClick={() => alert("Liked!")}
// // // //                 className="flex flex-col items-center"
// // // //               >
// // // //                 <FaHeart className="text-2xl" />
// // // //                 <span className="text-xs mt-1">Like</span>
// // // //               </button>

// // // //               <button
// // // //                 onClick={() => window.open(file.link, "_blank")}
// // // //                 className="flex flex-col items-center"
// // // //               >
// // // //                 <FaDownload className="text-2xl" />
// // // //                 <span className="text-xs mt-1">Save</span>
// // // //               </button>

// // // //               <button
// // // //                 onClick={() => navigator.share?.({ url: file.link })}
// // // //                 className="flex flex-col items-center"
// // // //               >
// // // //                 <FaShareAlt className="text-2xl" />
// // // //                 <span className="text-xs mt-1">Share</span>
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         );
// // // //       })}
// // // //     </div>
// // // //   );
// // // // }

// // // import React, { useEffect, useState, useRef, useCallback } from "react";
// // // import { FaHeart, FaDownload, FaShareAlt, FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaExpand } from "react-icons/fa";
// // // import { BiLike, BiDislike } from "react-icons/bi";

// // // // API Keys (you'll need to set these in your .env file)
// // // const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
// // // const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

// // // export default function ShortsPage() {
// // //   const [videos, setVideos] = useState([]);
// // //   const [currentIndex, setCurrentIndex] = useState(0);
// // //   const [loading, setLoading] = useState(false);
// // //   const [hasMore, setHasMore] = useState(true);
// // //   const [page, setPage] = useState(1);
// // //   const [playing, setPlaying] = useState(true);
// // //   const [muted, setMuted] = useState(true);
// // //   const videoRefs = useRef([]);
// // //   const containerRef = useRef();

// // //   // Video categories for variety
// // //   const categories = [
// // //     "art", "nature", "travel", "music", "dance", "sports", 
// // //     "food", "fashion", "technology", "animals", "architecture", "adventure"
// // //   ];

// // //   const fetchVideos = useCallback(async (pageNum = 1) => {
// // //     if (loading || !hasMore) return;
    
// // //     setLoading(true);
// // //     try {
// // //       const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
// // //       // Try Pexels first, then Pixabay as fallback
// // //       let newVideos = [];
      
// // //       try {
// // //         const pexelsRes = await fetch(
// // //           `https://api.pexels.com/videos/search?query=${randomCategory}&per_page=10&page=${pageNum}`,
// // //           { headers: { Authorization: PEXELS_API_KEY } }
// // //         );
// // //         const pexelsData = await pexelsRes.json();
// // //         newVideos = pexelsData.videos?.map(video => ({
// // //           ...video,
// // //           source: 'pexels',
// // //           bestQuality: video.video_files.sort((a, b) => b.width - a.width)[0]
// // //         })) || [];
// // //       } catch (error) {
// // //         console.log("Pexels API failed, trying Pixabay...");
// // //       }

// // //       // If no videos from Pexels, try Pixabay
// // //       if (newVideos.length === 0 && PIXABAY_API_KEY) {
// // //         const pixabayRes = await fetch(
// // //           `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${randomCategory}&per_page=10&page=${pageNum}`
// // //         );
// // //         const pixabayData = await pixabayRes.json();
// // //         newVideos = pixabayData.hits?.map(video => ({
// // //           ...video,
// // //           source: 'pixabay',
// // //           bestQuality: video.videos?.large || video.videos?.medium
// // //         })) || [];
// // //       }

// // //       if (newVideos.length > 0) {
// // //         setVideos(prev => pageNum === 1 ? newVideos : [...prev, ...newVideos]);
// // //         setPage(pageNum + 1);
// // //       } else {
// // //         setHasMore(false);
// // //       }
// // //     } catch (err) {
// // //       console.error("Error fetching videos:", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [loading, hasMore]);

// // //   useEffect(() => {
// // //     fetchVideos(1);
// // //   }, []);

// // //   // Handle scroll for infinite loading
// // //   const handleScroll = useCallback((e) => {
// // //     const container = e.target;
// // //     const scrollBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    
// // //     if (scrollBottom < 100 && !loading && hasMore) {
// // //       fetchVideos(page);
// // //     }
// // //   }, [loading, hasMore, page, fetchVideos]);

// // //   // Handle video play/pause
// // //   const togglePlay = () => {
// // //     const currentVideo = videoRefs.current[currentIndex];
// // //     if (currentVideo) {
// // //       if (playing) {
// // //         currentVideo.pause();
// // //       } else {
// // //         currentVideo.play();
// // //       }
// // //       setPlaying(!playing);
// // //     }
// // //   };

// // //   // Handle volume toggle
// // //   const toggleMute = () => {
// // //     const currentVideo = videoRefs.current[currentIndex];
// // //     if (currentVideo) {
// // //       currentVideo.muted = !muted;
// // //       setMuted(!muted);
// // //     }
// // //   };

// // //   // Handle fullscreen
// // //   const toggleFullscreen = () => {
// // //     const container = containerRef.current;
// // //     if (!document.fullscreenElement) {
// // //       container.requestFullscreen?.();
// // //     } else {
// // //       document.exitFullscreen?.();
// // //     }
// // //   };

// // //   // Keyboard controls
// // //   useEffect(() => {
// // //     const handleKeyPress = (e) => {
// // //       switch(e.code) {
// // //         case 'Space':
// // //           e.preventDefault();
// // //           togglePlay();
// // //           break;
// // //         case 'ArrowUp':
// // //           e.preventDefault();
// // //           setMuted(false);
// // //           break;
// // //         case 'ArrowDown':
// // //           e.preventDefault();
// // //           setMuted(true);
// // //           break;
// // //         case 'ArrowRight':
// // //           e.preventDefault();
// // //           if (currentIndex < videos.length - 1) {
// // //             setCurrentIndex(currentIndex + 1);
// // //             setPlaying(true);
// // //           }
// // //           break;
// // //         case 'ArrowLeft':
// // //           e.preventDefault();
// // //           if (currentIndex > 0) {
// // //             setCurrentIndex(currentIndex - 1);
// // //             setPlaying(true);
// // //           }
// // //           break;
// // //       }
// // //     };

// // //     document.addEventListener('keydown', handleKeyPress);
// // //     return () => document.removeEventListener('keydown', handleKeyPress);
// // //   }, [currentIndex, videos.length, playing]);

// // //   // Auto-play current video
// // //   useEffect(() => {
// // //     videoRefs.current.forEach((video, index) => {
// // //       if (video) {
// // //         if (index === currentIndex && playing) {
// // //           video.play().catch(console.error);
// // //         } else {
// // //           video.pause();
// // //         }
// // //       }
// // //     });
// // //   }, [currentIndex, playing]);

// // //   return (
// // //     <div 
// // //       ref={containerRef}
// // //       className="w-full h-screen overflow-y-auto snap-y snap-mandatory bg-black relative"
// // //       onScroll={handleScroll}
// // //     >
// // //       {/* Loading indicator */}
// // //       {loading && (
// // //         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full z-50">
// // //           Loading more videos...
// // //         </div>
// // //       )}

// // //       {videos.map((video, index) => (
// // //         <div
// // //           key={`${video.source}-${video.id}`}
// // //           className="w-full h-screen flex-shrink-0 snap-start relative flex items-center justify-center"
// // //         >
// // //           {/* Video container with responsive sizing */}
// // //           <div className={`
// // //             relative bg-black
// // //             w-full h-full
// // //             lg:max-w-2xl lg:max-h-[90vh] lg:rounded-2xl lg:my-4
// // //             xl:max-w-3xl
// // //             2xl:max-w-4xl
// // //           `}>
// // //             {/* Video */}
// // //             <video
// // //               ref={el => videoRefs.current[index] = el}
// // //               src={video.bestQuality?.link || video.video_files?.[0]?.link}
// // //               className="w-full h-full object-cover lg:rounded-2xl"
// // //               autoPlay={index === 0}
// // //               loop
// // //               muted={muted}
// // //               playsInline
// // //               onClick={togglePlay}
// // //             />

// // //             {/* Gradient overlays */}
// // //             <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/50 to-transparent pointer-events-none lg:rounded-t-2xl" />
// // //             <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none lg:rounded-b-2xl" />

// // //             {/* Video Info */}
// // //             <div className="absolute bottom-24 left-4 text-white max-w-[70%]">
// // //               <h2 className="font-bold text-xl mb-2 drop-shadow-lg">
// // //                 {video.user?.name || 'Unknown Creator'}
// // //               </h2>
// // //               <p className="text-sm opacity-90 drop-shadow-lg line-clamp-2">
// // //                 {video.description || `Amazing ${categories.find(cat => 
// // //                   video.tags?.includes(cat) || video.title?.includes(cat)
// // //                 ) || 'creative'} content`}
// // //               </p>
// // //               <div className="flex items-center gap-2 mt-2">
// // //                 <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
// // //                   #{video.source}
// // //                 </span>
// // //                 {video.duration && (
// // //                   <span className="text-xs bg-black/50 px-2 py-1 rounded-full">
// // //                     {Math.round(video.duration)}s
// // //                   </span>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* Action Buttons */}
// // //             <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 text-white">
// // //               <button
// // //                 onClick={() => {
// // //                   // Like functionality
// // //                   alert("Liked!");
// // //                 }}
// // //                 className="flex flex-col items-center hover:scale-110 transition-transform"
// // //               >
// // //                 <BiLike className="text-3xl" />
// // //                 <span className="text-xs mt-1 font-medium">Like</span>
// // //               </button>

// // //               <button
// // //                 onClick={() => {
// // //                   // Dislike functionality
// // //                   alert("Disliked!");
// // //                 }}
// // //                 className="flex flex-col items-center hover:scale-110 transition-transform"
// // //               >
// // //                 <BiDislike className="text-3xl" />
// // //                 <span className="text-xs mt-1 font-medium">Dislike</span>
// // //               </button>

// // //               <button
// // //                 onClick={() => window.open(video.bestQuality?.link || video.video_files?.[0]?.link, "_blank")}
// // //                 className="flex flex-col items-center hover:scale-110 transition-transform"
// // //               >
// // //                 <FaDownload className="text-2xl" />
// // //                 <span className="text-xs mt-1 font-medium">Save</span>
// // //               </button>

// // //               <button
// // //                 onClick={() => {
// // //                   if (navigator.share) {
// // //                     navigator.share({
// // //                       title: 'Check out this video!',
// // //                       url: video.bestQuality?.link || video.video_files?.[0]?.link
// // //                     });
// // //                   } else {
// // //                     navigator.clipboard.writeText(video.bestQuality?.link || video.video_files?.[0]?.link);
// // //                     alert('Link copied to clipboard!');
// // //                   }
// // //                 }}
// // //                 className="flex flex-col items-center hover:scale-110 transition-transform"
// // //               >
// // //                 <FaShareAlt className="text-2xl" />
// // //                 <span className="text-xs mt-1 font-medium">Share</span>
// // //               </button>
// // //             </div>

// // //             {/* Control Bar */}
// // //             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/50 rounded-full px-4 py-2">
// // //               <button
// // //                 onClick={togglePlay}
// // //                 className="text-white hover:scale-110 transition-transform"
// // //               >
// // //                 {playing ? <FaPause className="text-xl" /> : <FaPlay className="text-xl" />}
// // //               </button>

// // //               <button
// // //                 onClick={toggleMute}
// // //                 className="text-white hover:scale-110 transition-transform"
// // //               >
// // //                 {muted ? <FaVolumeMute className="text-xl" /> : <FaVolumeUp className="text-xl" />}
// // //               </button>

// // //               <button
// // //                 onClick={toggleFullscreen}
// // //                 className="text-white hover:scale-110 transition-transform"
// // //               >
// // //                 <FaExpand className="text-xl" />
// // //               </button>
// // //             </div>

// // //             {/* Progress indicator */}
// // //             <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-1">
// // //               {videos.slice(0, 10).map((_, i) => (
// // //                 <div
// // //                   key={i}
// // //                   className={`h-1 rounded-full transition-all duration-300 ${
// // //                     i === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
// // //                   }`}
// // //                 />
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       ))}

// // //       {/* End of content message */}
// // //       {!hasMore && videos.length > 0 && (
// // //         <div className="w-full h-screen flex items-center justify-center text-white text-xl">
// // //           <p>That's all for now! Check back later for more videos.</p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }


// // import React, { useEffect, useState, useRef, useCallback } from "react";
// // import { FaHeart, FaDownload, FaShareAlt, FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaSpinner } from "react-icons/fa";

// // // API Keys
// // const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
// // const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

// // export default function ShortsPage() {
// //   const [videos, setVideos] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [hasMore, setHasMore] = useState(true);
// //   const [page, setPage] = useState(1);
// //   const containerRef = useRef();
// //   const observerRef = useRef();

// //   // Video categories for variety
// //   const categories = [
// //     "art", "nature", "travel", "music", "dance", "sports", 
// //     "food", "fashion", "technology", "animals", "architecture",
// //     "beach", "city", "mountains", "sunset", "waterfall", "wildlife",
// //     "cooking", "fitness", "yoga", "meditation", "artistic", "creative"
// //   ];

// //   const fetchVideos = useCallback(async (pageNum = 1) => {
// //     if (loading || !hasMore) return;
    
// //     setLoading(true);
// //     try {
// //       const randomCategory = categories[Math.floor(Math.random() * categories.length)];
// //       let allVideos = [];

// //       // Fetch from Pexels API
// //       if (PEXELS_API_KEY) {
// //         try {
// //           const pexelsRes = await fetch(
// //             `https://api.pexels.com/videos/search?query=${randomCategory}&per_page=15&page=${pageNum}`,
// //             { headers: { Authorization: PEXELS_API_KEY } }
// //           );
          
// //           if (pexelsRes.ok) {
// //             const pexelsData = await pexelsRes.json();
// //             const pexelsVideos = pexelsData.videos?.map(video => ({
// //               id: `pexels-${video.id}`,
// //               ...video,
// //               source: 'pexels',
// //               bestQuality: video.video_files
// //                 .filter(f => f.width >= 640) // Minimum quality filter
// //                 .sort((a, b) => b.width - a.width)[0] || video.video_files[0]
// //             })) || [];
// //             allVideos = [...allVideos, ...pexelsVideos];
// //           }
// //         } catch (error) {
// //           console.log("Pexels API error:", error);
// //         }
// //       }

// //       // Fetch from Pixabay API
// //       if (PIXABAY_API_KEY && pageNum <= 3) { // Pixabay has page limits
// //         try {
// //           const pixabayRes = await fetch(
// //             `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${randomCategory}&per_page=15&page=${pageNum}`
// //           );
          
// //           if (pixabayRes.ok) {
// //             const pixabayData = await pixabayRes.json();
// //             const pixabayVideos = pixabayData.hits?.map(video => ({
// //               id: `pixabay-${video.id}`,
// //               ...video,
// //               source: 'pixabay',
// //               user: { name: video.user },
// //               bestQuality: video.videos?.large || video.videos?.medium || video.videos?.small,
// //               duration: video.duration
// //             })) || [];
// //             allVideos = [...allVideos, ...pixabayVideos];
// //           }
// //         } catch (error) {
// //           console.log("Pixabay API error:", error);
// //         }
// //       }

// //       // Shuffle videos for better variety
// //       const shuffledVideos = allVideos.sort(() => Math.random() - 0.5);

// //       if (shuffledVideos.length > 0) {
// //         setVideos(prev => {
// //           const existingIds = new Set(prev.map(v => v.id));
// //           const newVideos = shuffledVideos.filter(v => !existingIds.has(v.id));
// //           return pageNum === 1 ? shuffledVideos : [...prev, ...newVideos];
// //         });
// //         setPage(pageNum + 1);
        
// //         // Check if we should continue loading more
// //         if (shuffledVideos.length < 10 && pageNum > 5) {
// //           setHasMore(false);
// //         }
// //       } else {
// //         setHasMore(false);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching videos:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [loading, hasMore]);

// //   useEffect(() => {
// //     fetchVideos(1);
// //   }, []);

// //   // Intersection Observer for auto-play
// //   useEffect(() => {
// //     if (!videos.length) return;

// //     const options = {
// //       root: containerRef.current,
// //       rootMargin: '0px',
// //       threshold: 0.7
// //     };

// //     const handleIntersect = (entries) => {
// //       entries.forEach(entry => {
// //         const video = entry.target;
// //         if (entry.isIntersecting) {
// //           video.play().catch(error => {
// //             // Fallback: mute and try again
// //             video.muted = true;
// //             video.play().catch(console.log);
// //           });
// //         } else {
// //           video.pause();
// //         }
// //       });
// //     };

// //     observerRef.current = new IntersectionObserver(handleIntersect, options);

// //     const videoElements = containerRef.current?.querySelectorAll('video') || [];
// //     videoElements.forEach(video => {
// //       observerRef.current.observe(video);
// //     });

// //     return () => {
// //       if (observerRef.current) {
// //         observerRef.current.disconnect();
// //       }
// //     };
// //   }, [videos]);

// //   // Handle scroll for infinite loading
// //   const handleScroll = useCallback((e) => {
// //     const container = e.target;
// //     const scrollBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    
// //     if (scrollBottom < 300 && !loading && hasMore) {
// //       fetchVideos(page);
// //     }
// //   }, [loading, hasMore, page, fetchVideos]);

// //   // Handle video play/pause on click
// //   const handleVideoClick = (e) => {
// //     const video = e.currentTarget.querySelector('video') || e.target;
// //     if (video.tagName === 'VIDEO') {
// //       if (video.paused) {
// //         video.play();
// //       } else {
// //         video.pause();
// //       }
// //     }
// //   };

// //   // Handle volume toggle
// //   const toggleMute = (e, videoElement) => {
// //     e.stopPropagation();
// //     videoElement.muted = !videoElement.muted;
// //   };

// //   // Get video source icon and color
// //   const getSourceInfo = (source) => {
// //     switch(source) {
// //       case 'pexels':
// //         return { color: 'bg-green-500', text: 'Pexels' };
// //       case 'pixabay':
// //         return { color: 'bg-yellow-500', text: 'Pixabay' };
// //       default:
// //         return { color: 'bg-gray-500', text: 'Video' };
// //     }
// //   };

// //   return (
// //     <div 
// //       ref={containerRef}
// //       className="w-full h-screen overflow-y-auto snap-y snap-mandatory bg-black scroll-smooth"
// //       onScroll={handleScroll}
// //     >
// //       {/* Loading indicator */}
// //       {loading && (
// //         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full z-50 flex items-center gap-2">
// //           <FaSpinner className="animate-spin" />
// //           Loading more amazing videos...
// //         </div>
// //       )}

// //       {videos.map((video, index) => {
// //         const sourceInfo = getSourceInfo(video.source);
        
// //         return (
// //           <div
// //             key={video.id}
// //             className="w-full h-screen flex-shrink-0 snap-start relative flex items-center justify-center"
// //             onClick={handleVideoClick}
// //           >
// //             {/* Video container with responsive sizing */}
// //             <div className={`
// //               relative bg-black
// //               w-full h-full
// //               lg:max-w-2xl lg:max-h-[90vh] lg:rounded-2xl lg:my-4
// //               xl:max-w-3xl
// //               2xl:max-w-4xl
// //               cursor-pointer
// //             `}>
// //               {/* Video */}
// //               <video
// //                 src={video.bestQuality?.link || video.videos?.large?.url || video.video_files?.[0]?.link}
// //                 className="w-full h-full object-cover lg:rounded-2xl"
// //                 loop
// //                 muted
// //                 playsInline
// //                 preload="auto"
// //                 poster={video.image} // Pixabay has preview images
// //               />

// //               {/* Source badge */}
// //               <div className={`absolute top-4 left-4 ${sourceInfo.color} text-white text-xs px-2 py-1 rounded-full`}>
// //                 {sourceInfo.text}
// //               </div>

// //               {/* Gradient overlays */}
// //               <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/50 to-transparent pointer-events-none lg:rounded-t-2xl" />
// //               <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none lg:rounded-b-2xl" />

// //               {/* Video Info */}
// //               <div className="absolute bottom-20 left-4 text-white max-w-[70%]">
// //                 <h2 className="font-bold text-lg mb-1 drop-shadow-lg">
// //                   {video.user?.name || 'Unknown Creator'}
// //                 </h2>
// //                 <p className="text-sm opacity-90 drop-shadow-lg line-clamp-2">
// //                   {video.description || video.tags || `Amazing ${categories.find(cat => 
// //                     video.tags?.includes(cat) || video.title?.includes(cat)
// //                   ) || 'creative'} content`}
// //                 </p>
// //                 <div className="flex items-center gap-2 mt-1">
// //                   <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
// //                     {video.duration ? `${Math.round(video.duration)}s` : 'Short'}
// //                   </span>
// //                   <span className="text-xs bg-black/50 px-2 py-1 rounded-full">
// //                     {video.bestQuality?.width}p
// //                   </span>
// //                 </div>
// //               </div>

// //               {/* Action Buttons */}
// //               <div className="absolute right-4 bottom-20 flex flex-col items-center gap-5 text-white">
// //                 <button
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     alert("Liked!");
// //                   }}
// //                   className="flex flex-col items-center hover:scale-110 transition-transform duration-200"
// //                 >
// //                   <FaHeart className="text-2xl" />
// //                   <span className="text-xs mt-1">Like</span>
// //                 </button>

// //                 <button
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     window.open(video.bestQuality?.link || video.videos?.large?.url, "_blank");
// //                   }}
// //                   className="flex flex-col items-center hover:scale-110 transition-transform duration-200"
// //                 >
// //                   <FaDownload className="text-2xl" />
// //                   <span className="text-xs mt-1">Save</span>
// //                 </button>

// //                 <button
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     const videoUrl = video.bestQuality?.link || video.videos?.large?.url;
// //                     if (navigator.share) {
// //                       navigator.share({
// //                         title: 'Check out this amazing video!',
// //                         url: videoUrl
// //                       });
// //                     } else {
// //                       navigator.clipboard.writeText(videoUrl);
// //                       alert('Video link copied to clipboard!');
// //                     }
// //                   }}
// //                   className="flex flex-col items-center hover:scale-110 transition-transform duration-200"
// //                 >
// //                   <FaShareAlt className="text-2xl" />
// //                   <span className="text-xs mt-1">Share</span>
// //                 </button>
// //               </div>

// //               {/* Mute Button */}
// //               <div className="absolute bottom-4 left-4">
// //                 <button
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     const videoElement = e.target.closest('.relative').querySelector('video');
// //                     toggleMute(e, videoElement);
// //                   }}
// //                   className="text-white bg-black/50 rounded-full p-2 hover:scale-110 transition-transform duration-200"
// //                 >
// //                   <FaVolumeMute className="text-lg" />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         );
// //       })}

// //       {/* End of content message */}
// //       {!hasMore && videos.length > 0 && (
// //         <div className="w-full h-screen flex items-center justify-center text-white text-xl text-center px-4">
// //           <div className="bg-black/50 rounded-2xl p-8 max-w-md">
// //             <h3 className="text-2xl font-bold mb-2">🎉 Amazing Content!</h3>
// //             <p>You've seen all our best videos for now. New content coming soon!</p>
// //           </div>
// //         </div>
// //       )}

// //       {/* Initial loading */}
// //       {videos.length === 0 && !loading && (
// //         <div className="w-full h-screen flex items-center justify-center text-white">
// //           <div className="text-center">
// //             <FaSpinner className="animate-spin text-4xl mx-auto mb-4" />
// //             <p>Loading amazing videos...</p>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


import React, { useEffect, useState, useRef, useCallback } from "react";
import { 
  FaVolumeMute, 
  FaVolumeUp, 
  FaSpinner,
  FaChevronUp,
  FaChevronDown,
  FaPlay,
  FaPause,
  FaRegHeart
} from "react-icons/fa";
// import MdOutlineFileDownload from 'react-icons/md'
import { MdOutlineFileDownload } from "react-icons/md";
import {IoShareSocialOutline} from "react-icons/io5"
// API Keys
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

export default function ShortsPage() {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const containerRef = useRef();
  const videoRefs = useRef([]);
  const sectionRefs = useRef([]);

  // Video categories for variety
  const categories = [
    "art", "nature", "travel", "music", "dance", "sports", 
    "food", "fashion", "technology", "animals", "architecture",
    "beach", "city", "mountains", "sunset", "waterfall", "wildlife",
    "cooking", "fitness", "yoga", "meditation", "artistic", "creative",
    "abstract", "slow motion", "time lapse", "aerial", "underwater"
  ];

  const fetchVideos = useCallback(async (pageNum = 1) => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      let allVideos = [];

      console.log(`Fetching ${randomCategory} videos...`);

      // Fetch from Pexels API
      if (PEXELS_API_KEY) {
        try {
          const pexelsRes = await fetch(
            `https://api.pexels.com/videos/search?query=${randomCategory}&per_page=15&page=${pageNum}`,
            { headers: { Authorization: PEXELS_API_KEY } }
          );
          
          if (pexelsRes.ok) {
            const pexelsData = await pexelsRes.json();
            const pexelsVideos = pexelsData.videos?.map(video => ({
              id: `pexels-${video.id}`,
              ...video,
              source: 'pexels',
              bestQuality: video.video_files
                .filter(f => f.quality === 'hd' || f.quality === 'sd')
                .sort((a, b) => b.width - a.width)[0] || video.video_files[0]
            })) || [];
            allVideos = [...allVideos, ...pexelsVideos];
          }
        } catch (error) {
          console.log("Pexels API error:", error);
        }
      }

      // Fetch from Pixabay API
      if (PIXABAY_API_KEY && pageNum <= 3) {
        try {
          const pixabayRes = await fetch(
            `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${randomCategory}&per_page=15&page=${pageNum}`
          );
          
          if (pixabayRes.ok) {
            const pixabayData = await pixabayRes.json();
            const pixabayVideos = pixabayData.hits?.map(video => ({
              id: `pixabay-${video.id}`,
              ...video,
              source: 'pixabay',
              user: { name: video.user },
              bestQuality: video.videos?.large || video.videos?.medium || video.videos?.small,
              duration: video.duration
            })) || [];
            allVideos = [...allVideos, ...pixabayVideos];
          }
        } catch (error) {
          console.log("Pixabay API error:", error);
        }
      }

      // Shuffle videos for better variety
      const shuffledVideos = allVideos.sort(() => Math.random() - 0.5);

      if (shuffledVideos.length > 0) {
        setVideos(prev => {
          const existingIds = new Set(prev.map(v => v.id));
          const newVideos = shuffledVideos.filter(v => !existingIds.has(v.id));
          return pageNum === 1 ? shuffledVideos : [...prev, ...newVideos];
        });
        setPage(pageNum + 1);
        
        if (shuffledVideos.length < 5 && pageNum > 5) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    fetchVideos(1);
  }, []);

  // Auto-play when video comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const videoIndex = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setCurrentIndex(videoIndex);
            // Auto-play with mute to bypass browser restrictions
            const video = videoRefs.current[videoIndex];
            if (video) {
              video.muted = true;
              video.play().catch(error => {
                console.log("Autoplay prevented, will play on user interaction");
              });
              setPlaying(true);
            }
          }
        });
      },
      {
        threshold: 0.8,
        root: containerRef.current
      }
    );

    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [videos]);

  // Handle manual play/pause
  const togglePlay = () => {
    const video = videoRefs.current[currentIndex];
    if (video) {
      if (playing) {
        video.pause();
        setPlaying(false);
      } else {
        video.play();
        setPlaying(true);
      }
    }
  };

  // Handle volume toggle
  const toggleMute = () => {
    const video = videoRefs.current[currentIndex];
    if (video) {
      video.muted = !muted;
      setMuted(!muted);
    }
  };

  // Navigation functions
  const goToNextVideo = () => {
    if (currentIndex < videos.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      sectionRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth' });
    } else if (hasMore && !loading) {
      fetchVideos(page);
    }
  };

  const goToPrevVideo = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      sectionRefs.current[prevIndex]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.code) {
        case 'ArrowDown':
        case 'Space':
          e.preventDefault();
          goToNextVideo();
          break;
        case 'ArrowUp':
          e.preventDefault();
          goToPrevVideo();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'KeyP':
          e.preventDefault();
          togglePlay();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, videos.length, playing, muted]);

  // Handle scroll for infinite loading
  const handleScroll = useCallback((e) => {
    const container = e.target;
    const scrollBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    
    if (scrollBottom < 500 && !loading && hasMore) {
      fetchVideos(page);
    }
  }, [loading, hasMore, page, fetchVideos]);

  // Get video source info
  const getSourceInfo = (source) => {
    switch(source) {
      case 'pexels':
        return { color: 'bg-green-500/90', text: 'Pexels' };
      case 'pixabay':
        return { color: 'bg-yellow-500/90', text: 'Pixabay' };
      default:
        return { color: 'bg-blue-500/90', text: 'Video' };
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Navigation Arrows */}
      {videos.length > 0 && (
        <div className="absolute right-12 top-1/2 lg:block hidden">
          

          <button
            onClick={goToNextVideo}
            className={`absolute left-1/2 transform -translate-x-1/2 z-30 
              ${currentIndex === videos.length - 1 ? 'bottom-4' : 'bottom-10'} 
              transition-all duration-300 hover:scale-110`}
          >
            <div className="flex flex-col items-center text-white">
              <div className="bg-black/50 rounded-full p-3">
                <FaChevronDown className="text-xl" />
              </div>
              <span className="text-xs mt-1 bg-black/50 px-2 py-1 rounded">
                {currentIndex === videos.length - 1 && hasMore ? 'Load More' : 'Next'}
              </span>
            </div>
          </button>
          <button
            onClick={goToPrevVideo}
            disabled={currentIndex === 0}
            className={`absolute left-1/2 transform -translate-x-1/2 z-30 
              ${currentIndex === 0 ? 'top-4 opacity-50' : 'top-10'} 
              transition-all duration-300 hover:scale-110`}
          >
            <div className="flex flex-col items-center text-white">
              <div className="bg-black/50 rounded-full p-3">
                <FaChevronUp className="text-xl" />
              </div>
              <span className="text-xs mt-1 bg-black/50 px-2 py-1 rounded">
                Previous
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Video Container */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-y-auto snap-y snap-mandatory scroll-smooth hide-scrollbar"
        onScroll={handleScroll}
      >
        {videos.map((video, index) => {
          const sourceInfo = getSourceInfo(video.source);
          const isActive = index === currentIndex;
          
          return (
            <section
              key={video.id}
              ref={el => sectionRefs.current[index] = el}
              data-index={index}
              className="w-full h-screen flex-shrink-0 snap-start relative flex items-center justify-center"
            >
              {/* Video container with responsive sizing */}
              <div className={`
                relative bg-black
                w-full h-full
                lg:max-w-2xl lg:max-h-[90vh] lg:rounded-2xl lg:my-4
                xl:max-w-3xl
                2xl:max-w-4xl
                cursor-pointer
              `}>
                {/* Video */}
                <video
                  ref={el => videoRefs.current[index] = el}
                  src={video.bestQuality?.link || video.videos?.large?.url || video.video_files?.[0]?.link}
                  className="w-full h-full object-cover lg:rounded-2xl"
                  loop
                  muted={muted}
                  playsInline
                  preload="auto"
                  poster={video.image}
                  onClick={togglePlay}
                />

                {/* Source badge */}
                <div className={`absolute top-4 left-4 ${sourceInfo.color} text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm`}>
                  {sourceInfo.text}
                </div>

                {/* Progress indicator */}
                <div className="absolute top-4 right-4 flex gap-1">
                  {videos.slice(0, 10).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === currentIndex ? 'bg-white scale-150' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>

                {/* Gradient overlays */}
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/60 to-transparent pointer-events-none lg:rounded-t-2xl" />
                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none lg:rounded-b-2xl" />

                {/* Video Info */}
                <div className="absolute bottom-24 left-4 text-white max-w-[70%]">
                  <h2 className="font-bold text-xl mb-2 drop-shadow-lg">
                    {video.user?.name || 'Unknown Creator'}
                  </h2>
                  <p className="text-base opacity-95 drop-shadow-lg line-clamp-2 font-medium">
                    {video.description || video.tags || `Amazing ${categories.find(cat => 
                      video.tags?.includes(cat) || video.title?.includes(cat)
                    ) || 'creative'} content`}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm">
                      {video.duration ? `${Math.round(video.duration)}s` : 'Short'}
                    </span>
                    <span className="text-sm bg-black/50 px-3 py-1 rounded-full">
                      {video.bestQuality?.width}p
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 bg-black/40 backdrop-blur-md rounded-md text-white">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Liked! ❤️");
                    }}
                    className="flex flex-col items-center hover:scale-110 transition-transform duration-200 rounded-2xl p-3"
                  >
                    < FaRegHeart className="text-2xl" />
                    <span className="text-xs mt-1 font-medium">Like</span>
                  </button>
                    {/* <span className="h-1 border-b"></span> */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(video.bestQuality?.link || video.videos?.large?.url, "_blank");
                    }}
                    className="flex flex-col items-center hover:scale-110 transition-transform duration-200  rounded-2xl p-3"
                  >
                    <MdOutlineFileDownload className="text-2xl" />
                    <span className="text-xs mt-1 font-medium">Save</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const videoUrl = video.bestQuality?.link || video.videos?.large?.url;
                      if (navigator.share) {
                        navigator.share({
                          title: 'Check out this amazing video!',
                          url: videoUrl
                        });
                      } else {
                        navigator.clipboard.writeText(videoUrl);
                        alert('Video link copied to clipboard!');
                      }
                    }}
                    className="flex flex-col items-center hover:scale-110 transition-transform duration-200 rounded-2xl p-3"
                  >
                    <IoShareSocialOutline className="text-2xl" />
                    <span className="text-xs mt-1 font-medium">Share</span>
                  </button>
                </div>

                {/* Control Bar */}
                {isActive && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/50 rounded-full px-6 py-3 backdrop-blur-sm">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="text-white hover:scale-110 transition-transform duration-200"
                    >
                      {playing ? <FaPause className="text-xl" /> : <FaPlay className="text-xl" />}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="text-white hover:scale-110 transition-transform duration-200"
                    >
                      {muted ? <FaVolumeMute className="text-xl" /> : <FaVolumeUp className="text-xl" />}
                    </button>

                    <span className="text-white text-sm">
                      {currentIndex + 1} / {videos.length}
                    </span>
                  </div>
                )}
              </div>
            </section>
          );
        })}

        {/* Loading indicator */}
        {loading && (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-white">
              <FaSpinner className="animate-spin text-3xl" />
              <p>Loading more amazing videos...</p>
            </div>
          </div>
        )}

        {/* End of content message */}
        {!hasMore && videos.length > 0 && (
          <div className="w-full h-screen flex items-center justify-center text-white">
            <div className="text-center bg-black/50 rounded-2xl p-8 max-w-md">
              <h3 className="text-2xl font-bold mb-3">🎉 You've reached the end!</h3>
              <p>You've seen all our amazing videos. Check back later for more!</p>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard help hint */}
      <div className="absolute bottom-4 left-4 text-white/60 text-xs bg-black/30 rounded-lg p-2">
        ↑↓ Navigate • Space Next • M Mute • P Play/Pause
      </div>
    </div>
  );
}

// Add this to your CSS
const styles = `
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
`;


