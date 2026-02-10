import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Eye,
  Flag,
  Bookmark,
  EllipsisVertical,
  SquarePlus,
  SquareX,
  EyeClosed,
  ChevronRight,
  Shield,
  AlertTriangle,
  AlertCircle,
  UserX,
  Copyright,
  MessageSquareText,
  Send,
  Sparkles,
  X,
  MessageCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FollowButton from "../Follow/FollowButton";
import LikeButton from "../EngagementService/likeButton";
import ShareButton from "../Share/ShareFunction";
import DownloadService from "../Downloads/downloadService";

// --- CONSTANTS ---
const REPORT_REASONS = [
  { id: "hate_speech", title: "Hate Speech", icon: AlertTriangle, severity: "high" },
  { id: "explicit", title: "Explicit Content", icon: Shield, severity: "high" },
  { id: "violence", title: "Violence", icon: AlertTriangle, severity: "high" },
  { id: "scam", title: "Scam/Fraud", icon: AlertCircle, severity: "high" },
  { id: "impersonation", title: "Impersonation", icon: UserX, severity: "medium" },
  { id: "copyright", title: "Copyright", icon: Copyright, severity: "medium" },
];

const MOCK_COMMENTS = [];

const CREATIVE_PROMPTS = [
  "What emotion does this spark?",
  "Masterpiece or mess?",
  "Rate this 1-10...",
  "First word that comes to mind?"
];

let globalMuteState = true; 
const muteListeners = new Set();

const toggleGlobalMute = (newState) => {
  globalMuteState = newState;
  muteListeners.forEach((listener) => listener(globalMuteState));
};

const VideoCard = ({
  video,
  onVideoClick,
  formatTimestamp,
}) => {
  // --- STATE ---
  const [menuState, setMenuState] = useState('closed');
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [randomPrompt] = useState(CREATIVE_PROMPTS[Math.floor(Math.random() * CREATIVE_PROMPTS.length)]);
  
  const [isMuted, setIsMuted] = useState(globalMuteState);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // --- REFS ---
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const menuRef = useRef(null);
  const commentsEndRef = useRef(null);

  if (!video) return null;
  const videoSrc = video?.src || video?.url || video?.videoUrl || video?.videoURL || video?.mediaUrl || "";

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuState !== 'closed' && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuState('closed');
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuState]);

  // Subscribe to Global Mute Changes
  useEffect(() => {
    const handleMuteChange = (newState) => {
      setIsMuted(newState);
      if (videoRef.current) videoRef.current.muted = newState;
    };
    muteListeners.add(handleMuteChange);
    if (videoRef.current) videoRef.current.muted = globalMuteState;
    return () => muteListeners.delete(handleMuteChange);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        setIsVisible(e.isIntersecting);
      },
      { threshold: 0.6 }
    );
    if (containerRef.current) io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  // Handle Visibility
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = globalMuteState;
    if (isVisible) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isVisible]);

  // --- HANDLERS ---
  const handlePlayPause = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = (e) => {
    e?.stopPropagation();
    toggleGlobalMute(!globalMuteState);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration || 0);
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([...comments, { id: Date.now(), user: "You", text: commentText, time: "Now", isNew: true }]);
    setCommentText("");
  };

  const handleReport = (reasonId) => {
    console.log("Report submitted:", reasonId);
    alert("Report submitted.");
    setMenuState('closed');
  };

  const formatTime = (s) => {
    if (!s && s !== 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const latestComment = comments.length > 0 ? comments[comments.length - 1] : null;

  // --- MENU CONFIG ---
  const mainMenuItems = [
    { label: "Interested", icon: SquarePlus, action: () => console.log("Interested") },
    { label: "Not Interested", icon: SquareX, action: () => console.log("Not Interested") },
    { label: "Save", icon: Bookmark, action: () => console.log("Saved") },
    { label: "Hide", icon: EyeClosed, action: () => console.log("Hidden") },
    { label: "Report", icon: Flag, action: () => setMenuState('report'), destructive: true, hasSubMenu: true },
  ];

  return (
    <div className="relative group w-full mb-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col gap-2 select-none p-1 relative"
      >
        
        {/* ================= HEADER (Same as ImageCard) ================= */}
        <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg shadow-sm z-20 relative">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold border-2 dark:text-zinc-300 text-zinc-600 border-zinc-200 dark:border-zinc-700 shadow-sm">
              {(video?.artist || "V")[0].toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-none text-zinc-800 dark:text-zinc-100">{video?.artist || "Unknown"}</span>
              <span className="text-[10px] text-zinc-500 mt-0.5">{formatTimestamp?.(video?.timestamp) || "Just Now"}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FollowButton targetUserId={video?.userId} variant="ghost" size="sm" />
            
            <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 mx-1" />

            {/* --- MENU CONTAINER --- */}
            <div className="relative" ref={menuRef}>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuState(menuState === 'closed' ? 'main' : 'closed');
                  }}
                  className={`p-1.5 rounded-md transition-colors ${menuState !== 'closed' ? 'bg-zinc-200 dark:bg-zinc-800' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}
                >
                  <EllipsisVertical size={16} className="text-zinc-600 dark:text-zinc-400" />
                </button>

                {/* ================= MENU POPUP ================= */}
                <AnimatePresence>
                  {menuState !== 'closed' && (
                    <motion.div
                      key="menu-dropdown"
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2, ease: "easeIn" }}
                      className="absolute top-full right-0 mt-2 z-50 w-56 origin-top-right"
                    >
                      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden ring-1 ring-black/5">
                        
                        {/* 1. Report Header */}
                        {menuState === 'report' && (
                          <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 ">
                            <button onClick={() => setMenuState('main')} className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors">
                               <ChevronRight size={14} className="rotate-180 text-zinc-500" />
                            </button>
                            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-200">Report Content</span>
                          </div>
                        )}

                        {/* 2. Main Menu */}
                        {menuState === 'main' && (
                          <div className="py-1">
                            {mainMenuItems.map((item, idx) => {
                              const Icon = item.icon;
                              return (
                                <button
                                  key={idx}
                                  onClick={(e) => { 
                                      e.stopPropagation();
                                      item.action(); 
                                      if (!item.hasSubMenu) setMenuState('closed'); 
                                  }}
                                  className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center justify-between group transition-colors ${item.destructive ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                                >
                                  <div className="flex items-center gap-2.5"><Icon size={14} className={item.destructive ? "text-red-500" : "text-zinc-400 dark:text-zinc-500"} />{item.label}</div>
                                  {item.hasSubMenu && <ChevronRight size={12} className="text-zinc-300" />}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* 3. Report Reasons */}
                        {menuState === 'report' && (
                          <div className="py-1 max-h-60 overflow-y-auto hide-scrollbar">
                            {REPORT_REASONS.map((reason) => (
                              <button key={reason.id} onClick={() => handleReport(reason.id)} className="w-full text-left px-4 py-2.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-2.5 border-b border-dashed border-zinc-100 dark:border-zinc-800 last:border-0">
                                  <reason.icon size={14} className={reason.severity === 'high' ? "text-orange-500" : "text-zinc-400"} /><span>{reason.title}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
            {/* --- END MENU CONTAINER --- */}

          </div>
        </div>

        {/* ================= VIDEO AREA ================= */}
        <div 
          ref={containerRef}
          className="relative w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 overflow-hidden isolate z-10"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            poster={video?.thumbnail}
            loop
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
            className="w-full h-auto object-cover bg-black cursor-pointer"
            onClick={() => onVideoClick?.(video)}
          />

          {/* Views counter */}
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md text-white flex gap-1 text-[10px] font-bold border border-white/10 shadow-sm pointer-events-none">
            <Eye size={12} className="mt-[1px]"/> {video.views || 0}
          </div>

          {/* Mute button */}
          <button
            onClick={handleMuteToggle}
            className="absolute top-2 right-2 p-1.5 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-white z-20 hover:bg-black/60 transition-colors"
          >
            {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>

          {/* Play/Pause overlay */}
          <button
            onClick={handlePlayPause}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 z-10 ${
              showControls || !isPlaying ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-full p-3">
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </div>
          </button>

          {/* Progress bar */}
          <div 
            className={`absolute bottom-0 left-0 right-0 transition-opacity duration-200 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full bg-black/40 backdrop-blur-sm px-3 pb-3 pt-2">
              <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden mb-2">
                <div
                  className="h-1 bg-white rounded-full transition-all"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-white text-[10px] font-medium">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* --- COMPACT COMMENTS OVERLAY (Same as ImageCard) --- */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                key="comments-drawer"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                style={{ willChange: "transform" }}
                className="absolute inset-x-0 bottom-0 z-40 h-[75%] max-h-[320px] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-700 rounded-t-xl shadow-2xl flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Discussion</span>
                  <button onClick={() => setShowComments(false)} className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {comments.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-50">
                      <MessageCircle size={22} className="mb-2 text-zinc-300" />
                      <p className="text-xs text-zinc-400">Quiet in here…</p>
                    </div>
                  ) : (
                    comments.map((c) => (
                      <div key={c.id} className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex justify-between items-baseline">
                          <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200">{c.user}</span>
                          <span className="text-[9px] text-zinc-400">{c.time}</span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-snug">{c.text}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Input Area */}
                <div className="p-2 border-t border-zinc-200 dark:border-zinc-800">
                  <form onSubmit={handlePost} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Type something…"
                      className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-md px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 placeholder:text-zinc-400 outline-none transition-all"
                    />
                    <button type="submit" disabled={!commentText.trim()} className="p-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-all">
                      <Send size={12} />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= FOOTER (Same as ImageCard) ================= */}
        <div className="bg-white dark:bg-zinc-950 
          border border-zinc-200 dark:border-zinc-800 
          rounded-lg shadow-sm px-3 py-2">

          {/* Title + Actions (same row) */}
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-50 leading-snug line-clamp-2 flex-1">
              {video?.title || "Untitled Video"}
            </h3>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0 pt-0.5">
              <LikeButton targetId={video.id} />
              <button
                onClick={() => setShowComments(!showComments)}
                className="text-zinc-600 dark:text-zinc-400 hover:text-blue-500 transition"
              >
                <MessageCircle size={18} />
              </button>
              <ShareButton artwork={video} variant="icon" size={18} />
              {/* <DownloadService artwork={video} size={18} /> */}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2" />

          {/* Description (Expandable) */}
          <motion.div
            layout
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[12px] text-zinc-600 dark:text-zinc-400 leading-snug"
          >
            <p className={expanded ? "" : "line-clamp-2"}>
              {video?.description || "No description available."}
            </p>

            {video?.description?.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-1 text-[11px] font-medium text-blue-500 hover:underline"
              >
                {expanded ? "Show less" : "...more"}
              </button>
            )}
          </motion.div>

          {/* Tags */}
          {video?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {video.tags.slice(0, 4).map((tag, i) => (
                <span
                  key={i}
                  className="
                    text-[12px] font-medium
                    px-2 py-0.5 rounded-full
                    text-purple-600 dark:text-purple-300
                    bg-purple-50 dark:bg-purple-900/20
                  "
                >
                  # {tag}
                </span>
              ))}
            </div>
          )}

          {/* Comment Prompt (tight & calm) */}
          {!showComments && (
            <button
              onClick={() => setShowComments(true)}
              className="mt-2 text-left w-full"
            >
              {comments.length > 0 ? (
                <div className="text-xs flex gap-1.5 items-center">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    {latestComment.user}
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {latestComment.text}
                  </span>
                </div>
              ) : (
                <div className="text-[12px] w-full text-zinc-400 flex items-center gap-1.5 hover:text-blue-500 transition rounded-full border dark:border-zinc-600 py-1 px-2">
                  <Sparkles size={10} />
                  {randomPrompt}
                </div>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VideoCard;