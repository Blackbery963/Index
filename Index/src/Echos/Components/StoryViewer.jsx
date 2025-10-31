import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  XMarkIcon, 
  MusicalNoteIcon, 
  PauseIcon, 
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import StoryLikeButton from './StoryLikeButton';
import { useStoryLikes } from '../hooks/useStoryLikes';

// Custom hook for audio management
const useAudio = (url, volume = 0.3) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!url) {
      if (audio) {
        audio.pause();
        setAudio(null);
      }
      return;
    }

    const newAudio = new Audio(url);
    newAudio.loop = true;
    newAudio.volume = volume;
    newAudio.preload = 'auto';

    newAudio.addEventListener('play', () => setIsPlaying(true));
    newAudio.addEventListener('pause', () => setIsPlaying(false));
    newAudio.addEventListener('ended', () => setIsPlaying(false));

    setAudio(newAudio);

    return () => {
      newAudio.pause();
      newAudio.removeEventListener('play', () => setIsPlaying(false));
      newAudio.removeEventListener('pause', () => setIsPlaying(false));
      newAudio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [url]);

  const play = useCallback(async () => {
    if (audio) {
      try {
        await audio.play();
      } catch (error) {
        console.log('Audio play failed:', error);
      }
    }
  }, [audio]);

  const pause = useCallback(() => {
    if (audio) {
      audio.pause();
    }
  }, [audio]);

  const stop = useCallback(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [audio]);

  return { audio, isPlaying, play, pause, stop };
};

// Custom hook for touch gestures
const useSwipe = (onSwipeLeft, onSwipeRight) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onSwipeLeft();
    } else if (isRightSwipe) {
      onSwipeRight();
    }
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};

const StoryViewer = ({ 
  users, 
  currentUserIndex,
  currentStoryIndex,
  isOpen, 
  onClose, 
  onNavigateUser,
  onNavigateStory,
  onLike,
  seenStories,
  onMarkAsSeen
}) => {
  // Early returns
  if (!isOpen || !users?.length) return null;
  
  const currentUser = users[currentUserIndex];
  if (!currentUser) return null;
  
  const currentStory = currentUser?.stories?.[currentStoryIndex];
  if (!currentStory) return null;

  // Refs
  const containerRef = useRef(null);
  const videoRef = useRef(null); // Changed to native video ref

  const seenStoriesRef = useRef(new Set());

  // State
  const [direction, setDirection] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoError, setVideoError] = useState(null);

  // Custom hooks
  const { audio, isPlaying: isMusicPlaying, play: playMusic, pause: pauseMusic, stop: stopMusic } = 
    useAudio(currentStory?.backgroundMusic, 0.3);
  
  const { toggleLike, addReaction, likingStories } = useStoryLikes();

  // Constants
  const totalUsers = users.length;
  const totalStoriesInCurrentUser = currentUser?.stories?.length || 0;
  const storyKey = `${currentUserIndex}-${currentStoryIndex}`;
  const isVideo = currentStory?.mediaType === 'video';

  // Mark story as seen
  useEffect(() => {
    if (!isOpen || !currentStory?.$id || !onMarkAsSeen) return;

    const storyId = currentStory.$id;
    if (!seenStoriesRef.current.has(storyId)) {
      seenStoriesRef.current.add(storyId);
      onMarkAsSeen(currentUser.userId);
    }
  }, [isOpen, currentStory?.$id, currentUser?.userId, onMarkAsSeen]);

  // User interaction for autoplay
  useEffect(() => {
    if (!isOpen || hasUserInteracted) return;

    const handleInteraction = () => setHasUserInteracted(true);

    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => 
      document.addEventListener(event, handleInteraction, { once: true })
    );

    return () => {
      events.forEach(event => 
        document.removeEventListener(event, handleInteraction)
      );
    };
  }, [isOpen, hasUserInteracted]);

  // Audio management
  useEffect(() => {
    if (!hasUserInteracted) return;

    if (isVideo) {
      // Don't play music for videos
      pauseMusic();
    } else if (currentStory?.backgroundMusic && !isMusicPlaying) {
      // Play music for images
      playMusic();
    }
  }, [isVideo, currentStory?.backgroundMusic, hasUserInteracted, isMusicPlaying, playMusic, pauseMusic]);

  // Video management with native video
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideo) {
      setIsVideoPlaying(false);
      setIsVideoReady(false);
      setVideoError(null);
      return;
    }

    // Reset video
    video.currentTime = 0;
    video.muted = isMuted;

    // Event listeners
    const handleLoadedData = () => {
      setIsVideoReady(true);
      if (hasUserInteracted) {
        video.play().catch(err => setVideoError(err.message));
      }
    };

    const handleError = (err) => {
      setVideoError(err.message || 'Failed to load video');
      setIsVideoPlaying(false);
      setIsVideoReady(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    // Cleanup
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.pause();
    };
  }, [isVideo, currentStory?.$id, hasUserInteracted, isMuted]);

  // Cleanup on close
  useEffect(() => {
    if (!isOpen) {
      stopMusic();
      setIsVideoPlaying(false);
      setIsVideoReady(false);
      setHasUserInteracted(false);
      setVideoError(null);
    }
  }, [isOpen, stopMusic]);

  // Navigation
  const navigateToNext = useCallback(() => {
    if (currentStoryIndex < totalStoriesInCurrentUser - 1) {
      onNavigateStory(1);
    } else if (currentUserIndex < totalUsers - 1) {
      onNavigateUser(1);
      onNavigateStory(-currentStoryIndex);
    } else {
      onClose();
    }
  }, [currentStoryIndex, totalStoriesInCurrentUser, currentUserIndex, totalUsers, onNavigateStory, onNavigateUser, onClose]);

  const navigateToPrev = useCallback(() => {
    if (currentStoryIndex > 0) {
      onNavigateStory(-1);
    } else if (currentUserIndex > 0) {
      const prevUser = users[currentUserIndex - 1];
      const prevUserStoriesCount = prevUser?.stories?.length || 0;
      onNavigateUser(-1);
      onNavigateStory(prevUserStoriesCount - 1);
    }
  }, [currentStoryIndex, currentUserIndex, users, onNavigateStory, onNavigateUser]);

  // Auto-advance for non-video stories
  useEffect(() => {
    if (isVideo || !hasUserInteracted || !isOpen) return;

    const timer = setTimeout(() => {
      navigateToNext();
    }, 5000); // 5 seconds for image stories

    return () => clearTimeout(timer);
  }, [isVideo, hasUserInteracted, isOpen, navigateToNext]);

  // Swipe gestures
  const swipeHandlers = useSwipe(navigateToNext, navigateToPrev);

  // Click navigation for mobile
  const handleClick = (e) => {
    if (window.innerWidth >= 768) return;
    
    const clickX = e.clientX;
    const containerWidth = containerRef.current?.clientWidth || 0;
    
    if (clickX < containerWidth / 3) {
      setDirection('prev');
      navigateToPrev();
    } else if (clickX > (containerWidth * 2) / 3) {
      setDirection('next');
      navigateToNext();
    }
  };

  // Media controls
  const toggleMusic = useCallback(async () => {
    if (isMusicPlaying) {
      pauseMusic();
    } else {
      if (isVideoPlaying) {
        setIsVideoPlaying(false);
      }
      await playMusic();
    }
  }, [isMusicPlaying, isVideoPlaying, playMusic, pauseMusic]);

  const toggleVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      video.pause();
    } else {
      if (isMusicPlaying) {
        pauseMusic();
      }
      video.play().catch(err => setVideoError(err.message));
    }
    setIsVideoPlaying(!isVideoPlaying);
  }, [isVideoPlaying, isMusicPlaying, pauseMusic]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  // Debug logger - makes console logs clearer and grouped
const logDebug = (label, data) => {
  console.log(`🎥 [StoryViewer Debug] ${label}:`, data);
};

// Video event handlers with debugging
const handleVideoPlay = useCallback(() => {
  setIsVideoPlaying(true);
  setVideoError(null);
  logDebug('Video Play', { currentStory });
}, [currentStory]);

const handleVideoPause = useCallback(() => {
  setIsVideoPlaying(false);
  logDebug('Video Paused', currentStory?.mediaUrl);
}, [currentStory?.mediaUrl]);

const handleVideoEnded = useCallback(() => {
  setIsVideoPlaying(false);
  logDebug('Video Ended', currentStory?.mediaUrl);
  navigateToNext();
}, [navigateToNext, currentStory?.mediaUrl]);

const handleVideoReady = useCallback(() => {
  setIsVideoReady(true);
  setVideoError(null);
  logDebug('Video Ready', currentStory?.mediaUrl);
}, [currentStory?.mediaUrl]);

const handleVideoError = useCallback((error) => {
  console.error('❌ [StoryViewer] Video Error:', error);
  setVideoError('Failed to load video');
  setIsVideoPlaying(false);
  setIsVideoReady(false);

  // Log extra diagnostic information
  logDebug('Video Error Details', {
    mediaUrl: currentStory?.mediaUrl,
    readyState: videoRef?.current?.readyState,
    errorCode: error?.target?.error?.code,
    errorMessage: error?.target?.error?.message,
  });
}, [currentStory?.mediaUrl]);

// Get video URL with step-by-step debug info
const getVideoUrl = useCallback(() => {
  if (!currentStory?.mediaUrl) {
    logDebug('Video URL Missing', 'No mediaUrl found in currentStory');
    return '';
  }

  if (currentStory.mediaUrl.startsWith('https')) {
    logDebug('Using Direct Video URL', currentStory.mediaUrl);
    return currentStory.mediaUrl;
  }

  // Appwrite URL construction
  const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID;
  const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
  const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;

  const fullUrl = `${endpoint}/storage/buckets/${bucketId}/files/${currentStory.mediaUrl}/view?project=${projectId}`;
  logDebug('Constructed Appwrite Video URL', fullUrl);

  return fullUrl;
}, [currentStory?.mediaUrl]);


  // User data for navigation
  const nextUser = users[(currentUserIndex + 1) % totalUsers];
  const prevUser = users[(currentUserIndex - 1 + totalUsers) % totalUsers];

  // Animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir === 'next' ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.4
      }
    },
    exit: (dir) => ({
      x: dir === 'next' ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    })
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Desktop User Previews */}
      {nextUser && (
        <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-20">
          <div 
            onClick={() => {
              setDirection('next');
              onNavigateUser(1);
              onNavigateStory(-currentStoryIndex);
            }}
            className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer group relative shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
          >
            <img
              src={nextUser.avatar}
              alt={nextUser.author}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-1 left-1 right-1 text-white text-xs text-center truncate font-medium">
              {nextUser.author}
            </div>
            {!seenStories?.has(nextUser.userId) && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full ring-1 ring-white"></div>
            )}
          </div>
          <div className="text-white/80 text-xs text-center mt-2 font-medium">
            Next
          </div>
        </div>
      )}
      
      {prevUser && (
        <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-20">
          <div 
            onClick={() => {
              setDirection('prev');
              const prevUserStoriesCount = prevUser?.stories?.length || 0;
              onNavigateUser(-1);
              onNavigateStory(prevUserStoriesCount - 1);
            }}
            className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer group relative shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
          >
            <img
              src={prevUser.avatar}
              alt={prevUser.author}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-1 left-1 right-1 text-white text-xs text-center truncate font-medium">
              {prevUser.author}
            </div>
            {seenStories?.has(prevUser.userId) && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full ring-1 ring-white"></div>
            )}
          </div>
          <div className="text-white/80 text-xs text-center mt-2 font-medium">
            Previous
          </div>
        </div>
      )}

      {/* Mobile User Indicator */}
      <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="flex gap-2 bg-black/60 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
          {users.slice(0, 5).map((user, index) => (
            <div
              key={user.userId}
              onClick={() => {
                const newDirection = index > currentUserIndex ? 'next' : 'prev';
                setDirection(newDirection);
                onNavigateUser(index - currentUserIndex);
                onNavigateStory(-currentStoryIndex);
              }}
              className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                index === currentUserIndex 
                  ? 'border-white scale-110 ring-2 ring-white' 
                  : !seenStories?.has(user.userId) 
                  ? 'border-indigo-500' 
                  : 'border-gray-400'
              }`}
            >
              <img
                src={user.avatar}
                alt={user.author}
                className="w-full h-full rounded-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
          {users.length > 5 && (
            <div className="w-10 h-10 rounded-full bg-gray-600/80 flex items-center justify-center text-white text-xs font-medium border border-white/20">
              +{users.length - 5}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Container */}
      <div 
        ref={containerRef}
        className="flex items-center justify-center h-full py-4 px-1"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-auto shadow-2xl h-[85vh] flex flex-col border border-gray-200 dark:border-gray-700">
          {/* Progress Bars */}
          {totalStoriesInCurrentUser > 1 && (
            <div className="flex gap-1 p-3">
              {currentUser.stories.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                    index === currentStoryIndex 
                      ? 'bg-indigo-600' 
                      : index < currentStoryIndex 
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Header */}
          <div className="flex items-center gap-3 p-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.author}
              className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
              loading="lazy"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-900 dark:text-white">
                {currentUser.author}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {currentStory.era}
              </div>
              {currentStory.musicTitle && (
                <div className="flex items-center gap-1 mt-1">
                  <MusicalNoteIcon className="w-3 h-3 text-purple-500" />
                  <span className="text-xs text-purple-600 dark:text-purple-400 truncate">
                    {currentStory.musicTitle}
                  </span>
                </div>
              )}
            </div>
            
            {/* Music Control */}
            {currentStory.backgroundMusic && (
              <button
                onClick={toggleMusic}
                className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                  isMusicPlaying 
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500'
                }`}
                title={isMusicPlaying ? 'Pause background music' : 'Play background music'}
              >
                {isMusicPlaying ? (
                  <PauseIcon className="w-5 h-5" />
                ) : (
                  <PlayIcon className="w-5 h-5" />
                )}
              </button>
            )}
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-110 text-gray-500 dark:text-gray-300"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content Area */}
          <div 
            className="flex-1 relative min-h-0 cursor-pointer overflow-hidden bg-black"
            onClick={handleClick}
            {...swipeHandlers}
          >
            {/* Desktop Navigation Arrows */}
            <div className="hidden md:block">
              {(currentStoryIndex > 0 || currentUserIndex > 0) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirection('prev');
                    navigateToPrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm border border-white/20"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
              )}
              {(currentStoryIndex < totalStoriesInCurrentUser - 1 || currentUserIndex < totalUsers - 1) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirection('next');
                    navigateToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm border border-white/20"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Animated Content */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={storyKey}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full flex items-center justify-center absolute top-0 left-0"
              >
                {isVideo ? (
                  // Video Story
                  <div className="relative w-full h-full flex items-center justify-center">
                    {videoError ? (
                      <div className="text-center text-white p-4">
                        <div className="text-red-400 text-lg mb-2">Video Error</div>
                        <div className="text-sm text-gray-300">{videoError}</div>
                        <button 
                          onClick={() => setVideoError(null)}
                          className="mt-4 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                        >
                          Retry
                        </button>
                      </div>
                    ) : (
                      <>
                        <video
                          ref={videoRef}
                          src={getVideoUrl()}
                          className="max-w-full max-h-full object-contain"
                          autoPlay
                          muted={isMuted}
                          playsInline
                          onPlay={handleVideoPlay}
                          onPause={handleVideoPause}
                          onEnded={handleVideoEnded}
                          onLoadedData={handleVideoReady}
                          onError={handleVideoError}
                        />
                      
                        {/* Video Controls Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleVideo();
                              }}
                              className="p-3 bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-black/90 transition-colors border border-white/20"
                            >
                              {isVideoPlaying ? (
                                <PauseIcon className="w-5 h-5" />
                              ) : (
                                <PlayIcon className="w-5 h-5" />
                              )}
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleMute();
                              }}
                              className="p-3 bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-black/90 transition-colors border border-white/20"
                            >
                              {isMuted ? (
                                <SpeakerXMarkIcon className="w-5 h-5" />
                              ) : (
                                <SpeakerWaveIcon className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Video Play Button Overlay */}
                        {isVideoReady && !isVideoPlaying && !videoError && (
                          <div 
                            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                            onClick={toggleVideo}
                          >
                            <div className="p-6 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all duration-200 hover:scale-110 border-2 border-white/30">
                              <PlayIcon className="w-12 h-12" />
                            </div>
                          </div>
                        )}

                        {/* Video Loading State */}
                        {!isVideoReady && !videoError && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                            <div className="text-white text-center">
                              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                              <p className="text-sm">Loading video...</p>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  // Image Story
                  <div className="relative w-full h-full">
                    <img
                      src={currentStory.coverImage}
                      alt={currentStory.title}
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                    
                    {/* Music Visualizer */}
                    {currentStory.backgroundMusic && isMusicPlaying && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2 border border-white/20">
                        <div className="flex items-center gap-1">
                          <div className="flex items-end gap-1 h-4">
                            {[1, 2, 3, 2, 1].map((height, index) => (
                              <motion.div
                                key={index}
                                animate={{
                                  height: [`${height * 4}px`, `${(height + 1) * 4}px`, `${height * 4}px`]
                                }}
                                transition={{
                                  duration: 0.5,
                                  repeat: Infinity,
                                  delay: index * 0.1
                                }}
                                className="w-1 bg-purple-400 rounded-full"
                              />
                            ))}
                          </div>
                          <MusicalNoteIcon className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-white text-xs max-w-[120px] truncate font-medium">
                          {currentStory.musicTitle?.split(' - ')[0]}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 pr-4">
                {currentStory.title}
              </h3>
              <StoryLikeButton
                storyId={currentStory.$id}
                initialLikes={currentStory.likes || 0}
                initialIsLiked={currentStory.isLiked || false}
                onLike={toggleLike}
                onReaction={addReaction}
                isLiking={likingStories.has(currentStory.$id)}
              />
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic mb-2">
              {currentStory.poeticTeaser}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium">
                {currentStoryIndex + 1} of {totalStoriesInCurrentUser} • {currentUserIndex + 1} of {totalUsers} users
              </span>
              {currentStory.backgroundMusic && (
                <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium">
                  <MusicalNoteIcon className="w-3 h-3" />
                  Background Music
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;