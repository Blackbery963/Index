// import { useState, useEffect, useRef } from "react";
// import { fetchPexelsVideos, fetchPixabayVideos, fetchYouTubeShorts } from "../services";
// // import VideoCard from "../components/VideoCard";
// import VideoCard from "../Components/VideoCard";

// export default function ShortsPage() {
//   const [videos, setVideos] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const containerRef = useRef();

//   useEffect(() => {
//     async function loadVideos() {
//       try {
//         const [pexels, pixabay, yt] = await Promise.all([
//           fetchPexelsVideos("art"),
//           fetchPixabayVideos("art"),
//           fetchYouTubeShorts("artistic painting")
//         ]);
//         setVideos([...pexels, ...pixabay, ...yt]);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     loadVideos();
//   }, []);

//   // auto-detect current video
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             setActiveIndex(Number(entry.target.dataset.index));
//           }
//         });
//       },
//       { threshold: 0.6, root: containerRef.current }
//     );

//     const children = containerRef.current?.children || [];
//     [...children].forEach(el => observer.observe(el));

//     return () => observer.disconnect();
//   }, [videos]);

//   return (
//     <div ref={containerRef} className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black">
//       {videos.map((video, idx) => (
//         <div key={video.id} data-index={idx}>
//           <VideoCard video={video} isActive={activeIndex === idx} />
//         </div>
//       ))}
//     </div>
//   );
// }


import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useInfiniteVideos } from "../hooks/useInfiniteVideos";
import { useInfiniteVideos } from "../Hooks/useInfiniteVideos";
// import VideoCard from "../components/VideoCard";
import VideoCard from "../Components/VideoCard";
import { SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

export default function ShortsPage() {
  const { videos, loading, hasMore, loadMore } = useInfiniteVideos();
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const containerRef = useRef();
  const sectionRefs = useRef([]);

  // Auto-detect active video
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const newIndex = Number(entry.target.dataset.index);
            setActiveIndex(newIndex);
            setPlaying(true);
            
            // Load more videos when nearing the end
            if (newIndex >= videos.length - 3 && hasMore && !loading) {
              loadMore();
            }
          }
        });
      },
      { threshold: 0.7, root: containerRef.current }
    );

    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [videos, hasMore, loading, loadMore]);

  const goToNextVideo = useCallback(() => {
    if (activeIndex < videos.length - 1) {
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      sectionRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeIndex, videos.length]);

  const goToPrevVideo = useCallback(() => {
    if (activeIndex > 0) {
      const prevIndex = activeIndex - 1;
      setActiveIndex(prevIndex);
      sectionRefs.current[prevIndex]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeIndex]);

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
          setMuted(!muted);
          break;
        case 'KeyP':
          e.preventDefault();
          setPlaying(!playing);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [goToNextVideo, goToPrevVideo, muted, playing]);

  const handleLike = (liked) => {
    console.log(`${liked ? 'Liked' : 'Unliked'} video`);
  };

  const handleShare = (video) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out this creative video: ${video.title}`,
        url: video.bestQuality.link,
      });
    } else {
      navigator.clipboard.writeText(video.bestQuality.link);
      alert('Video link copied to clipboard!');
    }
  };

  const handleDownload = (video) => {
    window.open(video.bestQuality.link, '_blank');
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Navigation Arrows for Desktop */}
      <div className="hidden lg:block">
        <button
          onClick={goToPrevVideo}
          disabled={activeIndex === 0}
          className="absolute left-10 top-1/2 transform -translate-y-1/2 z-30 disabled:opacity-30"
        >
          <div className="flex flex-col items-center text-white">
            <div className="bg-black/50 rounded-full p-4 hover:scale-110 transition-transform backdrop-blur-sm">
              <SkipBack className="w-6 h-6" />
            </div>
            <span className="text-sm mt-2 bg-black/50 px-3 py-1 rounded-full">Previous</span>
          </div>
        </button>

        <button
          onClick={goToNextVideo}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 z-30"
        >
          <div className="flex flex-col items-center text-white">
            <div className="bg-black/50 rounded-full p-4 hover:scale-110 transition-transform backdrop-blur-sm">
              <SkipForward className="w-6 h-6" />
            </div>
            <span className="text-sm mt-2 bg-black/50 px-3 py-1 rounded-full">Next</span>
          </div>
        </button>
      </div>

      {/* Header */}
      {/* <div className="absolute top-6 left-6 z-20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="font-bold text-white text-lg">AF</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">ArtFeed</h1>
            <p className="text-gray-300 text-sm">Creative Shorts</p>
          </div>
        </div>
      </div> */}
      {/* Minimal Shorts Header */}
<div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
  <div className="flex items-center gap-2 px-3 py-1 bg-black/50 rounded-full backdrop-blur-sm">
    {/* Website Name */}
    <h1 className="text-white font-semibold text-base font-Eagle">
      Painters' Diary
    </h1>
  </div>
</div>


      {/* Video Container */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-y-auto snap-y snap-mandatory scroll-smooth hide-scrollbar"
      >
        {videos.map((video, index) => (
          <section
            key={video.id}
            ref={el => sectionRefs.current[index] = el}
            data-index={index}
            className="snap-start"
          >
            <VideoCard
              video={video}
              isActive={activeIndex === index}
              onVideoClick={() => setPlaying(!playing)}
              onLike={handleLike}
              onShare={handleShare}
              onDownload={handleDownload}
              playing={playing}
              muted={muted}
              onPlayPause={() => setPlaying(!playing)}
              onMuteToggle={() => setMuted(!muted)}
              onNext={goToNextVideo}
              onPrevious={goToPrevVideo}
              showNavigation={window.innerWidth >= 1024}
            />
          </section>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-white">
              <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p>Loading more creative content...</p>
            </div>
          </div>
        )}

        {/* End of Feed */}
        {!hasMore && videos.length > 0 && (
          <div className="h-screen flex items-center justify-center">
            <div className="text-center text-white bg-black/30 rounded-3xl p-8 max-w-md backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold mb-2">You're all caught up!</h3>
              <p>More creative content coming soon</p>
            </div>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1 z-20">
        {videos.slice(0, 8).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-white w-6' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Keyboard Help */}
      <div className="absolute bottom-6 right-6 text-white/60 text-xs bg-black/30 rounded-lg p-2 backdrop-blur-sm">
        ↑↓ Navigate • Space Next • M Mute • P Play
      </div>
    </div>
  );
}