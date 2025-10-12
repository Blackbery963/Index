// import { FaHeart, FaDownload, FaShareAlt } from "react-icons/fa";

// export default function ActionButtons({ video }) {
//   return (
//     <div className="absolute right-4 bottom-24 flex flex-col gap-4 text-white">
//       <button><FaHeart size={24} /></button>
//       <button onClick={() => window.open(video.bestQuality.link, "_blank")}><FaDownload size={24} /></button>
//       <button><FaShareAlt size={24} /></button>
//     </div>
//   );
// }
import React, { useState } from "react";
import { 
  Heart, 
  Download, 
  Share2, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward
} from "lucide-react";

export default function ActionButtons({ 
  video, 
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
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    onLike?.(!liked);
  };

  return (
    <div className="absolute right-6 bottom-28 flex flex-col items-center gap-6 text-white">
      {/* Like Button */}
      <div className="flex flex-col items-center">
        <button
          onClick={handleLike}
          className="p-3 bg-black/30 rounded-full backdrop-blur-sm hover:scale-110 transition-transform duration-200"
        >
          <Heart 
            className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : ''}`} 
          />
        </button>
        <span className="text-xs font-medium mt-1">{likeCount.toLocaleString()}</span>
      </div>

      {/* Download Button */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => onDownload?.(video)}
          className="p-3 bg-black/30 rounded-full backdrop-blur-sm hover:scale-110 transition-transform duration-200"
        >
          <Download className="w-6 h-6" />
        </button>
        <span className="text-xs font-medium mt-1">Save</span>
      </div>

      {/* Share Button */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => onShare?.(video)}
          className="p-3 bg-black/30 rounded-full backdrop-blur-sm hover:scale-110 transition-transform duration-200"
        >
          <Share2 className="w-6 h-6" />
        </button>
        <span className="text-xs font-medium mt-1">Share</span>
      </div>

      {/* Sound Toggle */}
      <div className="flex flex-col items-center">
        <button
          onClick={onMuteToggle}
          className="p-3 bg-black/30 rounded-full backdrop-blur-sm hover:scale-110 transition-transform duration-200"
        >
          {muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
        <span className="text-xs font-medium mt-1">Sound</span>
      </div>

      {/* Navigation Arrows (Desktop) */}
      {showNavigation && (
        <>
          <div className="flex flex-col items-center mt-4">
            <button
              onClick={onPrevious}
              className="p-3 bg-black/30 rounded-full backdrop-blur-sm hover:scale-110 transition-transform duration-200"
            >
              <SkipBack className="w-6 h-6" />
            </button>
            <span className="text-xs font-medium mt-1">Previous</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button
              onClick={onNext}
              className="p-3 bg-black/30 rounded-full backdrop-blur-sm hover:scale-110 transition-transform duration-200"
            >
              <SkipForward className="w-6 h-6" />
            </button>
            <span className="text-xs font-medium mt-1">Next</span>
          </div>
        </>
      )}
    </div>
  );
}