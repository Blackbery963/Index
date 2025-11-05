import React, { useState, useRef } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  TrendingUp,
  Eye,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MdSearch } from "react-icons/md";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import FollowButton from '../Follow/FollowButton';
import LikeButton from '../EngagementService/likeButton';
import ShareButton from '../Share/ShareFunction';
import DownloadService from '../Downloads/downloadService';

const VideoCard = ({ 
  video, 
  onVideoClick, 
  likedVideos, 
  savedVideos, 
  onLike, 
  onSave, 
  formatTimestamp,
  viewMode = 'feed'
}) => {
  // Validate video object
  if (!video) {
    console.error('VideoCard: No video object provided');
    return null;
  }

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const isLiked = likedVideos?.has(video.id);
  const isSaved = savedVideos?.has(video.id);
  const likeCount = (video.likes || 0) + (isLiked ? 1 : 0);

  // Get video source with fallbacks
  const getVideoSrc = () => {
    return video.src || 
           video.url || 
           video.videoUrl || 
           video.videoURL ||
           video.mediaUrl ||
           '';
  };

  const videoSrc = getVideoSrc();

  // Video event handlers
  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoClick = () => {
    console.group('🎥 VideoCard Click Debug');
    console.log('Video ID:', video.id);
    console.log('Video Source:', videoSrc);
    console.log('Video Title:', video.title);
    console.log('Full Video Object:', video);
    console.groupEnd();

    if (onVideoClick) {
      onVideoClick(video);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    onLike?.(video.id, video);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onSave?.(video.id, video);
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  // Error state if no video source
  if (!videoSrc) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
        <p className="text-red-600 dark:text-red-400 text-sm">
          Video source missing for: {video.title || 'Unknown'}
        </p>
        <details className="mt-2 text-xs">
          <summary className="cursor-pointer">Debug Info</summary>
          <pre className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 rounded overflow-auto">
            {JSON.stringify(video, null, 2)}
          </pre>
        </details>
      </div>
    );
  }

  // Different layouts based on view mode
  const getCardLayout = () => {
    switch (viewMode) {
      case 'grid':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 group cursor-pointer"
            onClick={handleVideoClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Video Container */}
            <div className="relative aspect-square overflow-hidden bg-black">
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover"
                muted={isMuted}
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                poster={video.thumbnail} // You can store thumbnails in your Appwrite collection
              />
              
              {/* Video Overlay */}
              <div 
                className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                  isHovered || showControls ? 'opacity-100' : 'opacity-0'
                }`}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                {/* Play/Pause Button */}
                <button
                  onClick={handlePlayPause}
                  className="absolute inset-0 w-full h-full flex items-center justify-center"
                >
                  <div className="bg-white/20 backdrop-blur-lg rounded-full p- transition-transform hover:scale-110">
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white ml-1" />
                    )}
                  </div>
                </button>

                {/* Video Controls */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* Progress Bar */}
                  <div className="w-full bg-white/30 rounded-full h-1 mb-3">
                    <div 
                      className="bg-white h-1 rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handlePlayPause}
                        className="text-white hover:text-gray-300 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                      
                      <button 
                        onClick={handleMuteToggle}
                        className="text-white hover:text-gray-300 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      
                      <span className="text-white text-xs font-medium">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <button 
                      onClick={handleSave}
                      className={`p-2 rounded-full transition-all ${
                        isSaved 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Badge */}
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1 shadow-lg">
                <Play className="w-3 h-3" />
                Video
              </div>

              {/* Trending Badge */}
              {video.trending > 5 && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 shadow-lg">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </div>
              )}
            </div>

            {/* Content - Minimal for Grid */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">
                {video.title || 'Untitled Video'}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                by {video.artist || 'Unknown Creator'}
              </p>
              
              <div className="flex items-center justify-between">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-1 transition-all ${
                    isLiked ? 'text-red-500 scale-110' : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-xs font-medium">{likeCount}</span>
                </button>
                
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimestamp?.(video.timestamp) || 'Recently'}
                </span>
              </div>
            </div>
          </motion.div>
        );

      default: // Feed view
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 group cursor-pointer"
            onClick={handleVideoClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                  {(video.artist || 'V')[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {video.artist || 'Unknown Creator'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatTimestamp?.(video.timestamp) || 'Recently'}
                  </p>
                </div>
              </div>
              <FollowButton targetUserId={video.id} variant='ghost'/>
            </div>

            {/* Video Container */}
            <div className="relative bg-black">
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-auto max-h-[600px] object-contain"
                muted={isMuted}
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                poster={video.thumbnail}
              />
              
              {/* Video Controls Overlay */}
              <div 
                className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                  isHovered || showControls ? 'opacity-100' : 'opacity-0'
                }`}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                {/* Central Play/Pause Button */}
                <button
                  onClick={handlePlayPause}
                  className="absolute inset-0 w-full h-full flex items-center justify-center"
                >
                  <div className="bg-white/20 backdrop-blur-lg rounded-full p-2 transition-transform hover:scale-110">
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 text-white ml-1" />
                    )}
                  </div>
                </button>

                {/* Bottom Controls Bar */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* Progress Bar */}
                  <div className="w-full bg-white/30 rounded-full h-2 mb-3 cursor-pointer">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={handlePlayPause}
                        className="text-white hover:text-gray-300 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </button>
                      
                      <button 
                        onClick={handleMuteToggle}
                        className="text-white hover:text-gray-300 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                      
                      <span className="text-white text-sm font-medium">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handleSave}
                        className={`p-2 rounded-xl transition-all ${
                          isSaved 
                            ? 'bg-blue-500 text-white shadow-lg' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Badge */}
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1.5 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                <Play className="w-4 h-4" />
                Video
              </div>

              {/* Trending Badge */}
              {video.trending > 5 && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm px-3 py-1.5 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                  <TrendingUp className="w-4 h-4" />
                  Trending
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-3">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  {video.title || 'Untitled Video'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {video.description || 'No description available.'}
                </p>
              </div>
              
              {/* Tags */}
              {video.tags && video.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {video.tags.slice(0, 4).map((tag, index) => (
                    <span 
                      key={`${tag}-${index}`}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full font-medium transition-colors hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Engagement Stats */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                {/* <div className="flex items-center gap-4"> */}
                  <div className="flex items-center gap-2">
                    <div className=' mt-2'><LikeButton targetId={video.id || video.$id} /></div>
                  <ShareButton artwork={video} />
                  <DownloadService artwork={video}/>
                {/* </div> */}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Eye className="w-4 h-4" />
                  <span>{video.views || 0} views</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return getCardLayout();
};

export default VideoCard;