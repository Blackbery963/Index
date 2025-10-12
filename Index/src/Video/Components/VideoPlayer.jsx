import React, { useEffect } from "react";
// import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { useVideoPlayer } from "../Hooks/useVideoPlayer";

export default function VideoPlayer({ video, isActive, onVideoClick }) {
  const { videoRef, playing, muted, volume, progress, togglePlay, toggleMute, setVolume, seek } = useVideoPlayer();

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(console.error);
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive]);

  if (video.platform === "youtube") {
    return (
      <div className="relative w-full h-full">
        <iframe
          src={video.bestQuality.link}
          title={video.title}
          className="w-full h-full object-cover"
          allow="autoplay; encrypted-media; accelerometer; gyroscope"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group">
      <video
        ref={videoRef}
        src={video.bestQuality.link}
        className="w-full h-full object-cover"
        loop
        muted={muted}
        playsInline
        preload="auto"
        onClick={onVideoClick}
      />
      
      {/* Custom Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1 bg-gray-600 cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const percentage = (e.clientX - rect.left) / rect.width * 100;
          seek(percentage);
        }}
      >
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Volume Slider */}
      <div className="absolute bottom-16 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
        />
      </div>
    </div>
  );
}