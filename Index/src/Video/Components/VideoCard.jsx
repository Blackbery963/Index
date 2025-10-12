// import React, { useRef, useEffect } from "react";
// import ControlsBar from "./ControlsBar";
// import ActionButtons from "./ActionButtons";
// // import { useVideoPlayer } from "../hooks/useVideoPlayer";
// import { useVideoPlayer } from "../Hooks/useVideoPlayer";

// export default function VideoCard({ video, isActive }) {
//   const videoRef = useRef();
//   const { playing, muted, togglePlay, toggleMute } = useVideoPlayer(videoRef);

//   useEffect(() => {
//     if (isActive && videoRef.current && video.source !== "youtube") {
//       videoRef.current.play().catch(() => {});
//     } else if (!isActive && videoRef.current) {
//       videoRef.current.pause();
//     }
//   }, [isActive]);

//   return (
//     <div className="relative w-full h-screen snap-start flex items-center justify-center">
//       {video.source === "youtube" ? (
//         <iframe
//           src={video.bestQuality.link}
//           title={video.title}
//           className="w-full h-full object-cover"
//           allow="autoplay; encrypted-media"
//         />
//       ) : (
//         <video
//           ref={videoRef}
//           src={video.bestQuality.link}
//           className="w-full h-full object-cover"
//           loop
//           muted={muted}
//           playsInline
//           preload="auto"
//           onClick={togglePlay}
//         />
//       )}

//       <ActionButtons video={video} />import React from "react";

//       <ControlsBar
//         playing={playing}
//         muted={muted}
//         togglePlay={togglePlay}
//         toggleMute={toggleMute}
//       />
//     </div>
//   );
// }


// import VideoPlayer from "./VideoPlayer";
// import ActionButtons from "./ActionButtons";

// export default function VideoCard({ 
//   video, 
//   isActive, 
//   onVideoClick, 
//   onLike, 
//   onShare, 
//   onDownload,
//   playing,
//   muted,
//   onPlayPause,
//   onMuteToggle,
//   onNext,
//   onPrevious,
//   showNavigation = false 
// }) {
//   return (
//     <div className="relative w-full h-screen snap-start flex items-center justify-center bg-black">
//       {/* Main Video Container */}
//       <div className={`
//         relative w-full h-full bg-black
//         lg:max-w-2xl lg:max-h-[90vh] lg:rounded-3xl lg:my-4 lg:shadow-2xl
//         xl:max-w-3xl
//         2xl:max-w-4xl
//         transition-all duration-300
//         ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-70'}
//       `}>
//         {/* Video Player */}
//         <VideoPlayer 
//           video={video} 
//           isActive={isActive} 
//           onVideoClick={onPlayPause}
//         />

//         {/* Gradient Overlays */}
//         <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/60 to-transparent pointer-events-none lg:rounded-t-3xl" />
//         <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none lg:rounded-b-3xl" />

//         {/* Video Info */}
//         <div className="absolute bottom-24 left-6 text-white max-w-[60%]">
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//               <span className="font-bold text-sm">AF</span>
//             </div>
//             <div>
//               <h2 className="font-bold text-lg drop-shadow-lg">{video.title}</h2>
//               <p className="text-sm opacity-90 drop-shadow-lg">ArtFeed Creator</p>
//             </div>
//           </div>
//           <p className="text-base font-medium drop-shadow-lg line-clamp-2">
//             {video.description}
//           </p>
//           <div className="flex items-center gap-2 mt-2">
//             <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
//               #{video.platform}
//             </span>
//             {video.duration && (
//               <span className="text-xs bg-black/50 px-2 py-1 rounded-full">
//                 {Math.round(video.duration)}s
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <ActionButtons
//           video={video}
//           onLike={onLike}
//           onShare={onShare}
//           onDownload={onDownload}
//           playing={playing}
//           muted={muted}
//           onPlayPause={onPlayPause}
//           onMuteToggle={onMuteToggle}
//           onNext={onNext}
//           onPrevious={onPrevious}
//           showNavigation={showNavigation}
//         />

//         {/* Play/Pause Center Button */}
//         {!playing && isActive && (
//           <button
//             onClick={onPlayPause}
//             className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm lg:rounded-3xl"
//           >
//             <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//               <Play className="w-10 h-10 text-white ml-1" />
//             </div>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


import React from "react";
import VideoPlayer from "./VideoPlayer";
import ActionButtons from "./ActionButtons";
import { Play } from "lucide-react";

export default function VideoCard({ 
  video, 
  isActive, 
  onVideoClick, 
  onLike, 
  onShare, 
  onDownload,
  playing,
  muted,
  onPlayPause,
  onMuteToggle,
  onNext,
  onPrevious,
  showNavigation = false 
}) {
  return (
    <div className="relative w-full h-screen snap-start flex items-center justify-center bg-black">
      {/* Main Video Container */}
      <div className={`
        relative w-full h-full bg-black
        lg:max-w-2xl lg:max-h-[90vh] lg:rounded-3xl lg:my-4 lg:shadow-2xl
        xl:max-w-3xl
        2xl:max-w-4xl
        transition-all duration-300
        ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-70'}
      `}>
        {/* Video Player */}
        <VideoPlayer 
          video={video} 
          isActive={isActive} 
          onVideoClick={onPlayPause}
        />

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/60 to-transparent pointer-events-none lg:rounded-t-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none lg:rounded-b-3xl" />

        {/* Video Info */}
        <div className="absolute bottom-24 left-6 text-white max-w-[60%]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="font-bold text-sm">AF</span>
            </div>
            <div>
              <h2 className="font-bold text-lg drop-shadow-lg">{video.title}</h2>
              <p className="text-sm opacity-90 drop-shadow-lg">ArtFeed Creator</p>
            </div>
          </div>
          <p className="text-base font-medium drop-shadow-lg line-clamp-2">
            {video.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
              #{video.platform}
            </span>
            {video.duration && (
              <span className="text-xs bg-black/50 px-2 py-1 rounded-full">
                {Math.round(video.duration)}s
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <ActionButtons
          video={video}
          onLike={onLike}
          onShare={onShare}
          onDownload={onDownload}
          playing={playing}
          muted={muted}
          onPlayPause={onPlayPause}
          onMuteToggle={onMuteToggle}
          onNext={onNext}
          onPrevious={onPrevious}
          showNavigation={showNavigation}
        />

        {/* Play/Pause Center Button */}
        {!playing && isActive && (
          <button
            onClick={onPlayPause}
            className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm lg:rounded-3xl"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}