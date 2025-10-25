import { useState, useCallback, useRef, useEffect } from "react";

export function useVideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef();

  // Auto-play when video is ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      if (!playing) {
        video.play().then(() => setPlaying(true)).catch(console.error);
      }
    };

    const handleTimeUpdate = () => {
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [playing]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      video.play().then(() => setPlaying(true)).catch(console.error);
    }
  }, [playing]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      setMuted(!muted);
      return;
    }
    video.muted = !muted;
    setMuted(!muted);
  }, [muted]);

  const setVideoVolume = useCallback((newVolume) => {
    const video = videoRef.current;
    if (video) {
      video.volume = newVolume;
      setVolume(newVolume);
      setMuted(newVolume === 0);
    }
  }, []);

  const seek = useCallback((percentage) => {
    const video = videoRef.current;
    if (video && video.duration) {
      video.currentTime = (percentage / 100) * video.duration;
    }
  }, []);

  return {
    videoRef,
    playing,
    muted,
    volume,
    progress,
    togglePlay,
    toggleMute,
    setVolume: setVideoVolume,
    seek
  };
}