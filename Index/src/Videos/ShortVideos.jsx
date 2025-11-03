// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { fetchAppwriteMedia } from "../Components/Gallery/services/appwriteService";
// import LikeButton from "../EngagementService/likeButton";
// import DownloadService from "../Downloads/downloadService";
// import ShareButton from "../Share/ShareFunction";
// import FollowButton from "../Follow/FollowButton";
// import { Link } from "react-router-dom";
// import { Volume2, VolumeX, ArrowUp, ArrowDown } from "lucide-react";

// function ShortVideos() {
//   const [videos, setVideos] = useState([]);
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hasMore, setHasMore] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [userProfiles, setUserProfiles] = useState({});
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [volume, setVolume] = useState(1);
//   const videoRefs = useRef([]);
//   const containerRef = useRef(null);

//   // Fetch videos
//   const fetchVideos = useCallback(async (lastId = null, isLoadMore = false) => {
//     try {
//       if (isLoadMore) setLoadingMore(true);
//       else setLoading(true);

//       const response = await fetchAppwriteMedia("videos", lastId, {
//         pageSize: 10,
//         enableCache: true,
//       });
//       if (isLoadMore) setVideos((prev) => [...prev, ...response.media]);
//       else setVideos(response.media);
//       setUserProfiles((prev) => ({ ...prev, ...response.profiles }));
//       setHasMore(response.hasMore);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching videos:", err);
//       setError("Failed to load videos. Please try again.");
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchVideos();
//   }, [fetchVideos]);

//   // Handle scroll change
//   const handleScroll = useCallback(
//     (e) => {
//       const container = e.target;
//       const newIndex = Math.round(container.scrollTop / container.clientHeight);
//       if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
//         if (videoRefs.current[currentVideoIndex])
//           videoRefs.current[currentVideoIndex].pause();
//         setCurrentVideoIndex(newIndex);
//         setIsPlaying(true);
//       }
//     },
//     [currentVideoIndex, videos.length]
//   );

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;
//     container.addEventListener("scroll", handleScroll);
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   // Auto-play and volume - FIXED PLAY/PAUSE ISSUE
//   useEffect(() => {
//     if (videos.length > 0 && videoRefs.current[currentVideoIndex]) {
//       const video = videoRefs.current[currentVideoIndex];
//       video.volume = volume;
      
//       // Only control play/pause if this is the current video
//       if (isPlaying && video.paused) {
//         const playPromise = video.play();
//         if (playPromise) playPromise.catch(() => {});
//       } else if (!isPlaying && !video.paused) {
//         video.pause();
//       }
//     }
//   }, [currentVideoIndex, videos.length, isPlaying, volume]);

//   // FIXED: Proper video click handler
//   const handleVideoClick = () => {
//     const video = videoRefs.current[currentVideoIndex];
//     if (!video) return;

//     if (video.paused) {
//       video.play().then(() => {
//         setIsPlaying(true);
//       }).catch(() => {});
//     } else {
//       video.pause();
//       setIsPlaying(false);
//     }
//   };

//   const handleLoadMore = useCallback(() => {
//     if (hasMore && !loadingMore && videos.length > 0 && currentVideoIndex >= videos.length - 2) {
//       const lastId = videos[videos.length - 1].$id;
//       fetchVideos(lastId, true);
//     }
//   }, [hasMore, loadingMore, videos, currentVideoIndex, fetchVideos]);

//   useEffect(() => {
//     handleLoadMore();
//   }, [currentVideoIndex, handleLoadMore]);

//   if (loading && videos.length === 0)
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 text-white">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
//           <p>Loading shorts...</p>
//         </div>
//       </div>
//     );

//   if (error && videos.length === 0)
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 text-white">
//         <div className="text-center">
//           <p className="mb-4">{error}</p>
//           <button
//             onClick={() => fetchVideos()}
//             className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div
//       ref={containerRef}
//       className="h-screen overflow-y-auto snap-y snap-mandatory bg-neutral-950 text-white hide-scrollbar"
//     >
//       {/* Fixed Logo */}
//       <Link
//         to="/"
//         className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-black backdrop-blur-lg rounded-full px-3 py-1 text-sm font-Eagle tracking-wide shadow-md"
//       >
//         Painters' Diary
//       </Link>

//       {videos.map((video, index) => {
//         const userProfile = userProfiles[video.userId] || {
//           name: "Unknown Artist",
//           profileImage: null,
//           title: "",
//         };

//         const isCurrentVideo = index === currentVideoIndex;

//         return (
//           <div key={video.$id} className="snap-center h-screen flex justify-center items-center">
//             {/* Main container with fixed dimensions */}
//             <div className="relative w-full sm:w-[38vw] h-[100vh] md:h-[95vh] rounded-sm overflow-hidden shadow-2xl border border-white/10 bg-black">
              
//               {/* Video - takes full container */}
//               <video
//                 ref={(el) => (videoRefs.current[index] = el)}
//                 src={video.url}
//                 className="w-full h-full object-cover cursor-pointer"
//                 loop
//                 playsInline
//                 onClick={handleVideoClick}
//                 preload="auto"
//               />

//               {/* Pause Overlay - FIXED: Only shows for current video */}
//               {isCurrentVideo && !isPlaying && (
//                 <div 
//                   className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 cursor-pointer"
//                   onClick={handleVideoClick}
//                 >
//                   <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center border border-white/20">
//                     <svg
//                       className="w-7 h-7 text-white"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M8 5v14l11-7z" />
//                     </svg>
//                   </div>
//                 </div>
//               )}

//               {/* Action Buttons - Compact right sidebar */}
//               <div className={`absolute right-1 -bottom-28 -translate-y-1/2 flex flex-col items-center gap-4 z-10 ${
//                 !isCurrentVideo && 'opacity-50'
//               }`}>
//                 <div className="flex flex-col items-center gap-3 bg-black/50 backdrop-blur-lg rounded-lg p-3 border border-white/10">
//                   <LikeButton targetId={video.$id} />
//                   <ShareButton artwork={video} />
//                   <DownloadService artwork={video} />
                  
//                   {/* Compact Volume Control */}
//                   {isCurrentVideo && (
//                     <div className="flex flex-col items-center gap-1 mt-2">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setVolume(prev => Math.min(1, prev + 0.2));
//                         }}
//                         className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition"
//                       >
//                         <ArrowUp size={14} />
//                       </button>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setVolume(prev => prev === 0 ? 0.5 : 0);
//                         }}
//                         className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition"
//                       >
//                         {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
//                       </button>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setVolume(prev => Math.max(0, prev - 0.2));
//                         }}
//                         className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition"
//                       >
//                         <ArrowDown size={14} />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* User Info - Compact bottom overlay */}
//               <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t   to-transparent mr-20 mb-3 ml-1 rounded-lg backdrop-blur-sm">
//                 <div className="flex items-start justify-between gap-2">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 border border-white/20 flex-shrink-0">
//                         {userProfile.profileImage ? (
//                           <img
//                             src={userProfile.profileImage}
//                             alt={userProfile.name}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             <span className="font-semibold text-xs">
//                               {userProfile.name.charAt(0).toUpperCase()}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-2 min-w-0">
//                         <p className="text-sm font-medium truncate">@{userProfile.name}</p>
//                         <FollowButton userId={video.userId} variant="mini" />
//                       </div>
//                     </div>

//                     <h3 className="font-semibold text-sm mb-1 truncate">
//                       {video.title || "Untitled"}
//                     </h3>
                    
//                     {video.description && (
//                       <p className="text-xs text-white/80 line-clamp-1 mb-1">
//                         {video.description}
//                       </p>
//                     )}
                    
//                     {video.tag?.length > 0 && (
//                       <div className="flex flex-wrap gap-1">
//                         {video.tag.slice(0, 2).map((tag, i) => (
//                           <span
//                             key={i}
//                             className="px-1.5 py-0.5 rounded-full text-xs bg-white/10 backdrop-blur-md"
//                           >
//                             #{tag}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}

//       {loadingMore && (
//         <div className="flex justify-center py-8">
//           <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
//         </div>
//       )}
//       {!hasMore && videos.length > 0 && (
//         <div className="flex justify-center py-8 text-white/50">No more videos</div>
//       )}
//     </div>
//   );
// }

// export default ShortVideos;


import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchAppwriteMedia } from "../Components/Gallery/services/appwriteService";
import LikeButton from "../EngagementService/likeButton";
import DownloadService from "../Downloads/downloadService"
import ShareButton from "../Share/ShareFunction";
import FollowButton from "../Follow/FollowButton";
import { Link } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";

function ShortVideos() {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [userProfiles, setUserProfiles] = useState({});
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const videoRefs = useRef([]); // DOM video elements
  const rafRefs = useRef([]); // RAF ids per index
  const containerRef = useRef(null);
  const [progress, setProgress] = useState({}); // { index: percent }

  // Fetch videos
  const fetchVideos = useCallback(async (lastId = null, isLoadMore = false) => {
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);

      const response = await fetchAppwriteMedia("videos", lastId, {
        pageSize: 10,
        enableCache: true,
      });
      if (isLoadMore) setVideos((prev) => [...prev, ...response.media]);
      else setVideos(response.media);

      setUserProfiles((prev) => ({ ...prev, ...response.profiles }));
      setHasMore(response.hasMore);
      setError(null);

      // initialize progress for new media if needed (ensures keys exist)
      if (!isLoadMore) {
        setProgress({});
      } else {
        // make sure newly appended items have 0 progress
        const startIndex = videos.length;
        const newProgress = {};
        response.media.forEach((_, i) => {
          newProgress[startIndex + i] = 0;
        });
        setProgress((prev) => ({ ...newProgress, ...prev }));
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Failed to load videos. Please try again.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [videos.length]);

  useEffect(() => {
    fetchVideos();
    // cleanup on unmount: cancel RAFs
    return () => {
      rafRefs.current.forEach((id) => id && cancelAnimationFrame(id));
      rafRefs.current = [];
    };
  }, [fetchVideos]);

  // SAFELY start RAF progress tracking for index
  const startProgressLoop = (index) => {
    stopProgressLoop(index); // ensure not duplicated
    const vid = videoRefs.current[index];
    if (!vid) return;

    const step = () => {
      if (!vid || vid.duration === 0 || isNaN(vid.duration)) {
        // if metadata not ready, schedule another check
        rafRefs.current[index] = requestAnimationFrame(step);
        return;
      }

      const percent = Math.min(100, Math.max(0, (vid.currentTime / vid.duration) * 100));
      setProgress((prev) => ({ ...prev, [index]: percent }));

      // Continue loop only while video is playing
      if (!vid.paused && !vid.ended) {
        rafRefs.current[index] = requestAnimationFrame(step);
      } else {
        // stop if paused/ended
        stopProgressLoop(index);
      }
    };

    rafRefs.current[index] = requestAnimationFrame(step);
  };

  const stopProgressLoop = (index) => {
    const id = rafRefs.current[index];
    if (id) {
      cancelAnimationFrame(id);
      rafRefs.current[index] = null;
    }
  };

  // Pause all videos except the one at keepIndex (optional)
  const pauseAllExcept = (keepIndex = null) => {
    videoRefs.current.forEach((v, i) => {
      if (v && i !== keepIndex) {
        try {
          v.pause();
        } catch (e) {}
        stopProgressLoop(i);
      }
    });
  };

  // Handle scroll change (snap style)
  const handleScroll = useCallback(
    (e) => {
      const container = e.target;
      const newIndex = Math.round(container.scrollTop / container.clientHeight);
      if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
        // pause previous and stop its progress loop
        if (videoRefs.current[currentVideoIndex]) {
          try {
            videoRefs.current[currentVideoIndex].pause();
          } catch (e) {}
          stopProgressLoop(currentVideoIndex);
        }

        // make sure progress for new index is reset to 0
        setProgress((prev) => ({ ...prev, [newIndex]: 0 }));

        setCurrentVideoIndex(newIndex);

        // try to play the new video (user-initiated will allow play)
        const nextVid = videoRefs.current[newIndex];
        if (nextVid) {
          // pause other vids too
          pauseAllExcept(newIndex);
          nextVid.volume = volume;
          nextVid.play().then(() => {
            setIsPlaying(true);
            startProgressLoop(newIndex);
          }).catch(() => {
            // if browser blocks autoplay, we'll still set playing=false
            setIsPlaying(false);
          });
        } else {
          setIsPlaying(false);
        }
      }
    },
    [currentVideoIndex, videos.length, volume]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // When currentVideoIndex or isPlaying changes, ensure only current plays and RAF runs
  useEffect(() => {
    // stop all RAFs first
    rafRefs.current.forEach((id, i) => {
      if (i !== currentVideoIndex && id) {
        cancelAnimationFrame(id);
        rafRefs.current[i] = null;
      }
    });

    const vid = videoRefs.current[currentVideoIndex];
    if (!vid) return;

    // set volume
    vid.volume = volume;

    // if should be playing, ensure others paused and then play current
    if (isPlaying) {
      pauseAllExcept(currentVideoIndex);
      vid.play().then(() => {
        setIsPlaying(true);
        // reset progress if undefined
        setProgress((prev) => ({ ...prev, [currentVideoIndex]: prev[currentVideoIndex] ?? 0 }));
        startProgressLoop(currentVideoIndex);
      }).catch(() => {
        // autoplay blocked: leave paused but keep UI consistent
        setIsPlaying(false);
        stopProgressLoop(currentVideoIndex);
      });
    } else {
      // paused: pause this video and stop progress
      try { vid.pause(); } catch (e) {}
      stopProgressLoop(currentVideoIndex);
    }

    // cleanup when switching index
    return () => {
      stopProgressLoop(currentVideoIndex);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideoIndex, isPlaying, volume]);

  // play/pause toggle using direct video element and index
  const handleVideoClick = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    // pause other videos
    videoRefs.current.forEach((v, i) => {
      if (v && i !== index) {
        try { v.pause(); } catch (e) {}
        stopProgressLoop(i);
      }
    });

    if (video.paused) {
      video.volume = volume;
      video.play().then(() => {
        setIsPlaying(true);
        setCurrentVideoIndex(index); // ensure index synced if user tapped a non-current (rare)
        // reset progress if starting fresh
        setProgress((prev) => ({ ...prev, [index]: prev[index] ?? 0 }));
        startProgressLoop(index);
      }).catch(() => {
        // play blocked
        setIsPlaying(false);
      });
    } else {
      video.pause();
      setIsPlaying(false);
      stopProgressLoop(index);
    }
  };

  const toggleMute = () => {
    const newVolume = volume === 0 ? 1 : 0;
    setVolume(newVolume);

    // update all video elements immediately
    videoRefs.current.forEach((v) => {
      if (v) v.volume = newVolume;
    });
  };

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loadingMore && videos.length > 0 && currentVideoIndex >= videos.length - 2) {
      const lastId = videos[videos.length - 1].$id;
      fetchVideos(lastId, true);
    }
  }, [hasMore, loadingMore, videos, currentVideoIndex, fetchVideos]);

  useEffect(() => {
    handleLoadMore();
  }, [currentVideoIndex, handleLoadMore]);

  if (loading && videos.length === 0)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Bringing moments to life…</p>
        </div>
      </div>
    );

  if (error && videos.length === 0)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 text-white">
        <div className="text-center">
          <p className="mb-4">{error}</p>
          <button
            onClick={() => fetchVideos()}
            className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory bg-neutral-950 text-white hide-scrollbar relative"
    >
      {/* Fixed Logo */}
      <Link
        to="/"
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-black/40 backdrop-blur-lg rounded-full px-3 py-1 text-sm font-Eagle tracking-wide shadow-md"
      >
        Painters' Diary
      </Link>

      {videos.map((video, index) => {
        const userProfile = userProfiles[video.userId] || {
          name: "Unknown Artist",
          profileImage: null,
          title: "",
        };

        const isCurrentVideo = index === currentVideoIndex;
        const pct = progress[index] ?? 0;

        return (
          <div key={video.$id} className="snap-center h-screen flex justify-center items-center relative">
            {/* Progress Bar */}
            <div className="absolute bottom-[10px] left-3 right-3 h-1 bg-white/8 rounded-full overflow-hidden z-20 pointer-events-none">
              <div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-[width] duration-150 ease-linear"
                style={{ width: `${pct}%` }}
              />
            </div>

            {/* Main container */}
            <div className="relative w-full sm:w-[38vw] h-[100vh] md:h-[95vh] rounded-sm overflow-hidden shadow-2xl border border-white/10 bg-black">
              {/* Video */}
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.url}
                className="w-full h-full object-cover cursor-pointer"
                loop
                playsInline
                onClick={() => handleVideoClick(index)}
                preload="auto"
                onLoadedMetadata={() => {
                  // ensure progress initialized for this index
                  setProgress((prev) => ({ ...prev, [index]: prev[index] ?? 0 }));
                }}
              />

              {/* Pause Overlay */}
              {isCurrentVideo && !isPlaying && (
                <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 cursor-pointer"
                  onClick={() => handleVideoClick(index)}
                >
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center border border-white/20">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Bottom Overlay - Info + Actions */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pb-6">
                {/* Info Section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 flex items-center justify-center border-2 border-white/20">
                        {userProfile.profileImage ? (
                          <img
                            src={userProfile.profileImage}
                            alt={userProfile.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-bold text-white text-sm">
                            {userProfile.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold truncate text-white">
                          {userProfile.name}
                        </p>
                        {userProfile.title && (
                          <p className="text-xs text-white/60 truncate">{userProfile.title}</p>
                        )}
                      </div>
                    </div>
                    <FollowButton targetUserId={video.userId} variant="minimal" />
                  </div>

                  <h3 className="font-bold text-base mb-1.5 line-clamp-2 text-white">
                    {video.title || "Untitled"}
                  </h3>

                  {video.description && (
                    <p className="text-sm text-white/80 line-clamp-2 mb-2.5 leading-relaxed">
                      {video.description}
                    </p>
                  )}

                  {video.tag?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {video.tag.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md border border-white/10 text-white"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons Row */}
                <div className={`flex items-center justify-between gap-3 transition-opacity duration-300 ${!isCurrentVideo ? "opacity-50" : ""}`}>
                  <div className="flex items-center gap-4 bg-white/5 backdrop-blur-lg rounded-lg px-4 py-2 border border-white/10">
                    <div className="flex flex-col items-center gap-1 max-w-full">
                      <LikeButton targetId={video.$id} />
                    </div>

                    <div className="w-px h-8 bg-white/10" />

                    <div className="flex flex-col items-center gap-1 min-w-[44px]">
                      <ShareButton artwork={video} />
                    </div>

                    <div className="w-px h-8 bg-white/10" />

                    <div className="flex flex-col items-center gap-1 min-w-[44px]">
                      <DownloadService artwork={video} />
                    </div>

                    <div className="w-px h-8 bg-white/10" />

                    {/* Mute / Unmute */}
                    <div className="flex flex-col items-center gap-1 min-w-[44px] cursor-pointer" onClick={toggleMute}>
                      {volume === 0 ? (
                        <VolumeX className="w-5 h-5 text-white hover:text-red-400 transition" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white hover:text-green-400 transition" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {loadingMore && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      {!hasMore && videos.length > 0 && (
        <div className="flex justify-center py-8 text-white/50">No more videos</div>
      )}
    </div>
  );
}

export default ShortVideos;





// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { fetchAppwriteMedia } from "../Components/Gallery/services/appwriteService";
// import LikeButton from "../EngagementService/likeButton";
// import DownloadService from "../Downloads/downloadService"
// import ShareButton from "../Share/ShareFunction";
// import FollowButton from "../Follow/FollowButton";
// import { Link } from "react-router-dom";
// import { Volume2, VolumeX } from "lucide-react";
// import { fetchArchiveVideos } from "./internetArchiveService";



// function ShortVideos() {
//   const [videos, setVideos] = useState([]);
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hasMore, setHasMore] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [userProfiles, setUserProfiles] = useState({});
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [volume, setVolume] = useState(1);
//   const videoRefs = useRef([]); // DOM video elements
//   const rafRefs = useRef([]); // RAF ids per index
//   const containerRef = useRef(null);
//   const [progress, setProgress] = useState({}); // { index: percent }
//   // for internet archive pagination
//   const [archiveVideos, setArchiveVideos] = useState([]);
//   const [usingArchive, setUsingArchive] = useState(false);
//   const [archivePage, setArchivePage] = useState(1);


//   // Fetch videos
//   const fetchVideos = useCallback(async (lastId = null, isLoadMore = false) => {
//     try {
//       if (isLoadMore) setLoadingMore(true);
//       else setLoading(true);

//       const response = await fetchAppwriteMedia("videos", lastId, {
//         pageSize: 10,
//         enableCache: true,
//       });
//       if (isLoadMore) setVideos((prev) => [...prev, ...response.media]);
//       else setVideos(response.media);

//       setUserProfiles((prev) => ({ ...prev, ...response.profiles }));
//       setHasMore(response.hasMore);
//       setError(null);

//       // initialize progress for new media if needed (ensures keys exist)
//       if (!isLoadMore) {
//         setProgress({});
//       } else {
//         // make sure newly appended items have 0 progress
//         const startIndex = videos.length;
//         const newProgress = {};
//         response.media.forEach((_, i) => {
//           newProgress[startIndex + i] = 0;
//         });
//         setProgress((prev) => ({ ...newProgress, ...prev }));
//       }
//     } catch (err) {
//       console.error("Error fetching videos:", err);
//       setError("Failed to load videos. Please try again.");
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   }, [videos.length]);

//   useEffect(() => {
//     fetchVideos();
//     // cleanup on unmount: cancel RAFs
//     return () => {
//       rafRefs.current.forEach((id) => id && cancelAnimationFrame(id));
//       rafRefs.current = [];
//     };
//   }, [fetchVideos]);

//   // SAFELY start RAF progress tracking for index
//   const startProgressLoop = (index) => {
//     stopProgressLoop(index); // ensure not duplicated
//     const vid = videoRefs.current[index];
//     if (!vid) return;

//     const step = () => {
//       if (!vid || vid.duration === 0 || isNaN(vid.duration)) {
//         // if metadata not ready, schedule another check
//         rafRefs.current[index] = requestAnimationFrame(step);
//         return;
//       }

//       const percent = Math.min(100, Math.max(0, (vid.currentTime / vid.duration) * 100));
//       setProgress((prev) => ({ ...prev, [index]: percent }));

//       // Continue loop only while video is playing
//       if (!vid.paused && !vid.ended) {
//         rafRefs.current[index] = requestAnimationFrame(step);
//       } else {
//         // stop if paused/ended
//         stopProgressLoop(index);
//       }
//     };

//     rafRefs.current[index] = requestAnimationFrame(step);
//   };

//   const stopProgressLoop = (index) => {
//     const id = rafRefs.current[index];
//     if (id) {
//       cancelAnimationFrame(id);
//       rafRefs.current[index] = null;
//     }
//   };

//   // Pause all videos except the one at keepIndex (optional)
//   const pauseAllExcept = (keepIndex = null) => {
//     videoRefs.current.forEach((v, i) => {
//       if (v && i !== keepIndex) {
//         try {
//           v.pause();
//         } catch (e) {}
//         stopProgressLoop(i);
//       }
//     });
//   };

//   // Handle scroll change (snap style)
//   const handleScroll = useCallback(
//     (e) => {
//       const container = e.target;
//       const newIndex = Math.round(container.scrollTop / container.clientHeight);
//       if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
//         // pause previous and stop its progress loop
//         if (videoRefs.current[currentVideoIndex]) {
//           try {
//             videoRefs.current[currentVideoIndex].pause();
//           } catch (e) {}
//           stopProgressLoop(currentVideoIndex);
//         }

//         // make sure progress for new index is reset to 0
//         setProgress((prev) => ({ ...prev, [newIndex]: 0 }));

//         setCurrentVideoIndex(newIndex);

//         // try to play the new video (user-initiated will allow play)
//         const nextVid = videoRefs.current[newIndex];
//         if (nextVid) {
//           // pause other vids too
//           pauseAllExcept(newIndex);
//           nextVid.volume = volume;
//           nextVid.play().then(() => {
//             setIsPlaying(true);
//             startProgressLoop(newIndex);
//           }).catch(() => {
//             // if browser blocks autoplay, we'll still set playing=false
//             setIsPlaying(false);
//           });
//         } else {
//           setIsPlaying(false);
//         }
//       }
//     },
//     [currentVideoIndex, videos.length, volume]
//   );

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;
//     container.addEventListener("scroll", handleScroll);
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   // When currentVideoIndex or isPlaying changes, ensure only current plays and RAF runs
//   useEffect(() => {
//     // stop all RAFs first
//     rafRefs.current.forEach((id, i) => {
//       if (i !== currentVideoIndex && id) {
//         cancelAnimationFrame(id);
//         rafRefs.current[i] = null;
//       }
//     });

//     const vid = videoRefs.current[currentVideoIndex];
//     if (!vid) return;

//     // set volume
//     vid.volume = volume;

//     // if should be playing, ensure others paused and then play current
//     if (isPlaying) {
//       pauseAllExcept(currentVideoIndex);
//       vid.play().then(() => {
//         setIsPlaying(true);
//         // reset progress if undefined
//         setProgress((prev) => ({ ...prev, [currentVideoIndex]: prev[currentVideoIndex] ?? 0 }));
//         startProgressLoop(currentVideoIndex);
//       }).catch(() => {
//         // autoplay blocked: leave paused but keep UI consistent
//         setIsPlaying(false);
//         stopProgressLoop(currentVideoIndex);
//       });
//     } else {
//       // paused: pause this video and stop progress
//       try { vid.pause(); } catch (e) {}
//       stopProgressLoop(currentVideoIndex);
//     }

//     // cleanup when switching index
//     return () => {
//       stopProgressLoop(currentVideoIndex);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentVideoIndex, isPlaying, volume]);

//   // play/pause toggle using direct video element and index
//   const handleVideoClick = (index) => {
//     const video = videoRefs.current[index];
//     if (!video) return;

//     // pause other videos
//     videoRefs.current.forEach((v, i) => {
//       if (v && i !== index) {
//         try { v.pause(); } catch (e) {}
//         stopProgressLoop(i);
//       }
//     });

//     if (video.paused) {
//       video.volume = volume;
//       video.play().then(() => {
//         setIsPlaying(true);
//         setCurrentVideoIndex(index); // ensure index synced if user tapped a non-current (rare)
//         // reset progress if starting fresh
//         setProgress((prev) => ({ ...prev, [index]: prev[index] ?? 0 }));
//         startProgressLoop(index);
//       }).catch(() => {
//         // play blocked
//         setIsPlaying(false);
//       });
//     } else {
//       video.pause();
//       setIsPlaying(false);
//       stopProgressLoop(index);
//     }
//   };

//   const toggleMute = () => {
//     const newVolume = volume === 0 ? 1 : 0;
//     setVolume(newVolume);

//     // update all video elements immediately
//     videoRefs.current.forEach((v) => {
//       if (v) v.volume = newVolume;
//     });
//   };

//   // const handleLoadMore = useCallback(() => {
//   //   if (hasMore && !loadingMore && videos.length > 0 && currentVideoIndex >= videos.length - 2) {
//   //     const lastId = videos[videos.length - 1].$id;
//   //     fetchVideos(lastId, true);
//   //   }
//   // }, [hasMore, loadingMore, videos, currentVideoIndex, fetchVideos]);

//   // useEffect(() => {
//   //   handleLoadMore();
//   // }, [currentVideoIndex, handleLoadMore]);

//   const handleLoadMore = useCallback(async () => {
//   if (loadingMore) return;

//   if (!usingArchive) {
//     if (hasMore && videos.length > 0 && currentVideoIndex >= videos.length - 2) {
//       const lastId = videos[videos.length - 1].$id;
//       fetchVideos(lastId, true);
//     } else if (!hasMore && currentVideoIndex >= videos.length - 2) {
//       // Switch to archive when Appwrite ends
//       setUsingArchive(true);
//       setLoadingMore(true);
//       const archive = await fetchArchiveVideos(archivePage);
//       setArchiveVideos(archive);
//       setLoadingMore(false);
//     }
//   } else {
//     // Load next archive page
//     if (currentVideoIndex >= videos.length + archiveVideos.length - 2) {
//       const nextPage = archivePage + 1;
//       setArchivePage(nextPage);
//       setLoadingMore(true);
//       const nextArchive = await fetchArchiveVideos(nextPage);
//       setArchiveVideos((prev) => [...prev, ...nextArchive]);
//       setLoadingMore(false);
//     }
//   }
// }, [loadingMore, usingArchive, hasMore, videos, archiveVideos, currentVideoIndex, archivePage, fetchVideos]);


//   useEffect(() => {
//     handleLoadMore();
//   }, [currentVideoIndex, handleLoadMore]);



//   if (loading && videos.length === 0)
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 text-white">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
//           <p>Loading shorts...</p>
//         </div>
//       </div>
//     );

//   if (error && videos.length === 0)
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 text-white">
//         <div className="text-center">
//           <p className="mb-4">{error}</p>
//           <button
//             onClick={() => fetchVideos()}
//             className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div
//       ref={containerRef}
//       className="h-screen overflow-y-auto snap-y snap-mandatory bg-neutral-950 text-white hide-scrollbar relative"
//     >
//       {/* Fixed Logo */}
//       <Link
//         to="/"
//         className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-black/40 backdrop-blur-lg rounded-full px-3 py-1 text-sm font-Eagle tracking-wide shadow-md"
//       >
//         Painters' Diary
//       </Link>

//       {/* {videos.map((video, index) => { */}
//       {[...videos, ...archiveVideos].map((video, index) => {
//         const userProfile = userProfiles[video.userId] || {
//           name: "Unknown Artist",
//           profileImage: null,
//           title: "",
//         };

//         const isCurrentVideo = index === currentVideoIndex;
//         const pct = progress[index] ?? 0;

//         return (
//           <div key={video.$id} className="snap-center h-screen flex justify-center items-center relative">
//             {/* Progress Bar */}
//             <div className="absolute bottom-[10px] left-3 right-3 h-1 bg-white/8 rounded-full overflow-hidden z-20 pointer-events-none">
//               <div
//                 className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-[width] duration-150 ease-linear"
//                 style={{ width: `${pct}%` }}
//               />
//             </div>

//             {/* Main container */}
//             <div className="relative w-full sm:w-[38vw] h-[100vh] md:h-[95vh] rounded-sm overflow-hidden shadow-2xl border border-white/10 bg-black">
//               {/* Video */}
//               <video
//                 ref={(el) => (videoRefs.current[index] = el)}
//                 src={video.url}
//                 className="w-full h-full object-cover cursor-pointer"
//                 loop
//                 playsInline
//                 onClick={() => handleVideoClick(index)}
//                 preload="auto"
//                 onLoadedMetadata={() => {
//                   // ensure progress initialized for this index
//                   setProgress((prev) => ({ ...prev, [index]: prev[index] ?? 0 }));
//                 }}
//               />

//               {/* Pause Overlay */}
//               {isCurrentVideo && !isPlaying && (
//                 <div
//                   className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 cursor-pointer"
//                   onClick={() => handleVideoClick(index)}
//                 >
//                   <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center border border-white/20">
//                     <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M8 5v14l11-7z" />
//                     </svg>
//                   </div>
//                 </div>
//               )}

//               {/* Bottom Overlay - Info + Actions */}
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pb-6">
//                 {/* Info Section */}
//                 <div className="mb-4">
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center gap-2.5 min-w-0 flex-1">
//                       <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 flex items-center justify-center border-2 border-white/20">
//                         {userProfile.profileImage ? (
//                           <img
//                             src={userProfile.profileImage}
//                             alt={userProfile.name}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <span className="font-bold text-white text-sm">
//                             {userProfile.name.charAt(0).toUpperCase()}
//                           </span>
//                         )}
//                       </div>
//                       <div className="min-w-0 flex-1">
//                         <p className="text-sm font-semibold truncate text-white">
//                           {userProfile.name}
//                         </p>
//                         {userProfile.title && (
//                           <p className="text-xs text-white/60 truncate">{userProfile.title}</p>
//                         )}
//                       </div>
//                     </div>
//                     <FollowButton targetUserId={video.userId} variant="minimal" />
//                   </div>

//                   <h3 className="font-bold text-base mb-1.5 line-clamp-2 text-white">
//                     {video.title || "Untitled"}
//                   </h3>

//                   {video.description && (
//                     <p className="text-sm text-white/80 line-clamp-2 mb-2.5 leading-relaxed">
//                       {video.description}
//                     </p>
//                   )}

//                   {video.tag?.length > 0 && (
//                     <div className="flex flex-wrap gap-2">
//                       {video.tag.slice(0, 3).map((tag, i) => (
//                         <span
//                           key={i}
//                           className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md border border-white/10 text-white"
//                         >
//                           #{tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Action Buttons Row */}
//                 <div className={`flex items-center justify-between gap-3 transition-opacity duration-300 ${!isCurrentVideo ? "opacity-50" : ""}`}>
//                   <div className="flex items-center gap-4 bg-white/5 backdrop-blur-lg rounded-lg px-4 py-2 border border-white/10">
//                     <div className="flex flex-col items-center gap-1 max-w-full">
//                       <LikeButton targetId={video.$id} />
//                     </div>

//                     <div className="w-px h-8 bg-white/10" />

//                     <div className="flex flex-col items-center gap-1 min-w-[44px]">
//                       <ShareButton artwork={video} />
//                     </div>

//                     <div className="w-px h-8 bg-white/10" />

//                     <div className="flex flex-col items-center gap-1 min-w-[44px]">
//                       <DownloadService artwork={video} />
//                     </div>

//                     <div className="w-px h-8 bg-white/10" />

//                     {/* Mute / Unmute */}
//                     <div className="flex flex-col items-center gap-1 min-w-[44px] cursor-pointer" onClick={toggleMute}>
//                       {volume === 0 ? (
//                         <VolumeX className="w-5 h-5 text-white hover:text-red-400 transition" />
//                       ) : (
//                         <Volume2 className="w-5 h-5 text-white hover:text-green-400 transition" />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}

//       {loadingMore && (
//         <div className="flex justify-center py-8">
//           <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
//         </div>
//       )}
//       {!hasMore && videos.length > 0 && (
//         <div className="flex justify-center py-8 text-white/50">No more videos</div>
//       )}
//     </div>
//   );
// }

// export default ShortVideos;
