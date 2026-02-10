import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Award,
  IndianRupee,
  EllipsisVertical,
  Flag,
  EyeClosed,
  ChevronRight as ChevronRightIcon,
  Shield,
  AlertTriangle,
  Copyright,
  Sparkles,
  MessageSquareText,
  X,
  Send,
  PenTool
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LikeButton from '../EngagementService/likeButton';
import ShareButton from '../Share/ShareFunction';
import DownloadService from '../Downloads/downloadService';
import FollowButton from '../Follow/FollowButton';

// --- MOCK DATA ---
const MOCK_COMMENTS = [
  { id: 1, user: "ArtLover99", text: "The colors in this are incredible! 🎨", time: "2m" },
];

const CREATIVE_PROMPTS = [
  "What emotion does this spark?",
  "Critique the palette...",
  "Leave a mark here...",
  "Masterpiece or mess?",
  "First word that comes to mind?",
  "Share your perspective..."
];

const REPORT_REASONS = [
  { id: "hate_speech", title: "Hate Speech", icon: AlertTriangle, severity: "high" },
  { id: "explicit", title: "Explicit Content", icon: Shield, severity: "high" },
  { id: "copyright", title: "Copyright", icon: Copyright, severity: "medium" },
];

const ArtworkCard = ({
  artwork,
  onArtworkClick,
  formatTimestamp,
}) => {
  if (!artwork) return null;

  // --- STATE ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [menuState, setMenuState] = useState('closed');
  const [randomPrompt] = useState(CREATIVE_PROMPTS[Math.floor(Math.random() * CREATIVE_PROMPTS.length)]);
  
  // Comment Logic States
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(MOCK_COMMENTS);

  const menuRef = useRef(null);

  // --- DERIVED DATA ---
  const allImages = artwork.allImages || [artwork.src || artwork.url].filter(Boolean);
  const hasMultipleImages = allImages.length > 1;
  const currentImage = allImages[currentImageIndex];

  // --- EFFECT: CLICK OUTSIDE MENU ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuState !== 'closed' && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuState('closed');
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuState]);

  // --- HANDLERS ---
  const handleBuyClick = (e) => {
    e.stopPropagation();
    console.log('Buy artwork:', artwork.id || artwork.$id);
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([...comments, { id: Date.now(), user: "You", text: commentText, time: "Just now" }]);
    setCommentText("");
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const goToImage = (index, e) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const handleReport = () => {
    alert("Report submitted.");
    setMenuState('closed');
  };

  // --- MENU ITEMS ---
  const mainMenuItems = [
    { label: "Save", icon: Bookmark, action: () => console.log("Saved") },
    { label: "Hide", icon: EyeClosed, action: () => console.log("Hidden") },
    { label: "Report", icon: Flag, action: () => setMenuState('report'), destructive: true, hasSubMenu: true },
  ];

  if (!currentImage) return null;

  return (
    <div className="relative group w-full mb-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col gap-2 select-none p-1 relative"
      >
        
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg shadow-sm z-20 relative">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xs font-bold border-2 border-zinc-200 dark:border-zinc-700 shadow-sm">
              {(artwork.artist || 'A')[0].toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-none text-zinc-800 dark:text-zinc-100">
                {artwork.artist || "Unknown Artist"}
              </span>
              <span className="text-[10px] text-zinc-500 mt-0.5">
                {artwork.medium ? `${artwork.medium} • ` : ''} 
                {formatTimestamp?.(artwork.timestamp) || "Recently"}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FollowButton targetUserId={artwork.userId} variant="ghost" size="sm" />
            <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 mx-1" />
            
            {/* MENU */}
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

                <AnimatePresence>
                  {menuState !== 'closed' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 z-50 w-56 origin-top-right"
                    >
                      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden ring-1 ring-black/5">
                        {menuState === 'report' ? (
                           <div className="py-1">
                            <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
                                <button onClick={() => setMenuState('main')}><ChevronRightIcon size={14} className="rotate-180 text-zinc-500" /></button>
                                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-200">Select Reason</span>
                            </div>
                             {REPORT_REASONS.map((reason) => (
                               <button key={reason.id} onClick={handleReport} className="w-full text-left px-4 py-2.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-2.5">
                                   <reason.icon size={14} className="text-zinc-400" /><span>{reason.title}</span>
                               </button>
                             ))}
                           </div>
                        ) : (
                          <div className="py-1">
                            {mainMenuItems.map((item, idx) => {
                              const Icon = item.icon;
                              return (
                                <button
                                  key={idx}
                                  onClick={(e) => { e.stopPropagation(); item.action(); if (!item.hasSubMenu) setMenuState('closed'); }}
                                  className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center justify-between group transition-colors ${item.destructive ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                                >
                                  <div className="flex items-center gap-2.5"><Icon size={14} />{item.label}</div>
                                  {item.hasSubMenu && <ChevronRightIcon size={12} className="text-zinc-300" />}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ================= IMAGE AREA ================= */}
        <div 
          className="relative w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 overflow-hidden isolate z-10 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Image */}
          <div onClick={() => onArtworkClick?.(artwork)} className="cursor-pointer relative aspect-[4/3] sm:aspect-auto sm:h-[400px]">
             <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={currentImage}
                  alt={artwork.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
             </AnimatePresence>
          </div>

          {/* --- OVERLAYS --- */}
          {/* Price + Cart */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-auto">
             {artwork.price ? (
                <div className="bg-black/60 h-8 backdrop-blur-md text-white px-2.5 py-1.5 rounded-xl flex items-center gap-1 border border-white/10 shadow-lg">
                  <IndianRupee size={14} className="text-emerald-400" />
                  <span className="text-xs font-bold tracking-wide">{artwork.price}</span>
                </div>
              ) : (
                <div className="bg-black/60 backdrop-blur-md text-white px-2.5 py-1.5 rounded-xl flex items-center gap-1 border border-white/10 shadow-lg">
                  <Sparkles size={10} className="text-yellow-300" />
                  <span className="text-[10px] font-bold tracking-wide uppercase">Free</span>
                </div>
              )}
              {artwork.price && (
                <button
                  onClick={handleBuyClick}
                  className="w-8 h-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 border border-white/20"
                >
                  <ShoppingCart size={14} />
                </button>
              )}
          </div>

          {/* Awards */}
          {artwork.awards && artwork.awards.length > 0 && (
            <div className="absolute top-3 right-3 flex flex-col gap-1 items-end pointer-events-none">
               {artwork.awards.slice(0, 1).map((award, idx) => (
                 <div key={idx} className="bg-amber-500/90 backdrop-blur-md text-white px-2 py-1 rounded-md flex items-center gap-1.5 shadow-md border border-white/20">
                    <Award size={14} className="text-white" />
                    {/* <span className="text-[10px] font-semibold">{award}</span> */}
                 </div>
               ))}
            </div>
          )}

          {/* Navigation */}
          {hasMultipleImages && (
            <>
               {isHovered && (
                 <>
                   <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full backdrop-blur-sm transition-all border border-white/10 z-20">
                     <ChevronLeft size={16} />
                   </button>
                   <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full backdrop-blur-sm transition-all border border-white/10 z-20">
                     <ChevronRight size={16} />
                   </button>
                 </>
               )}
               <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 px-2 py-1 rounded-full bg-black/20 backdrop-blur-[2px]">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => goToImage(index, e)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* 4. COMMENTS DRAWER (Inside Image) */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                key="comments-drawer"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-x-0 bottom-0 z-40 h-[75%] max-h-[320px] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-700 rounded-t-xl shadow-2xl flex flex-col"
              >
                <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Discussion</span>
                  <button onClick={() => setShowComments(false)} className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {comments.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-50">
                      <MessageCircle size={22} className="mb-2 text-zinc-300" />
                      <p className="text-xs text-zinc-400">Be the first to comment...</p>
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

                 {/* Real Input inside Drawer */}
                 <div className="p-2 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                  <form onSubmit={handlePostComment} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Type a comment..."
                      autoFocus
                      className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 placeholder:text-zinc-400 outline-none transition-all"
                    />
                    <button type="submit" disabled={!commentText.trim()} className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-all">
                      <Send size={14} />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* ================= FOOTER ================= */}
        <div className="bg-white dark:bg-zinc-950 
  border border-zinc-200 dark:border-zinc-800 
  rounded-lg shadow-sm px-3 py-2">
          
          {/* Row 1: Title + Actions */}

          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-50 leading-tight pt-2 line-clamp-2 flex-1">
              {artwork.title || "Untitled"}
            </h3>

            {/* Action Icons */}
            <div className="flex items-center gap-3 shrink-0 text-zinc-600 dark:text-zinc-400">
               <LikeButton targetId={artwork.id || artwork.$id} />
               <button onClick={() => setShowComments(!showComments)} className="hover:text-blue-500 transition-colors">
                  <MessageCircle size={18} />
               </button>
               <ShareButton artwork={artwork} variant="icon" size={18} />
               {/* <DownloadService artwork={artwork} size={18} /> */}
            </div>
          </div>



          <div className="h-px bg-zinc-100 dark:bg-zinc-800 mb-2" />

          {/* Row 2: Description */}
          <motion.div layout className="text-[12px] text-zinc-600 dark:text-zinc-400 leading-relaxed mb-2">
            <p className={expanded ? "" : "line-clamp-2"}>
              {artwork.description || "No description provided."}
            </p>
            {artwork.description?.length > 100 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-0.5 text-[11px] font-medium text-blue-500 hover:underline"
              >
                {expanded ? "Show less" : "...more"}
              </button>
            )}
          </motion.div>

          {/* Row 3: Tags */}
          {artwork.tags && artwork.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {artwork.tags.slice(0, 4).map((tag, i) => (
                <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded-md text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/50">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Row 4: CREATIVE PROMPT CAPSULE (Replacement for Input) */}
          <div className="mt-3">
             <button 
                onClick={() => setShowComments(true)}
                className="w-full group flex items-center justify-between px-2 py-1 rounded-full
                           bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800
                           hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800/80
                           transition-all duration-300 shadow-sm"
             >
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">
                   <Sparkles size={14} className="text-purple-500 group-hover:scale-110 transition-transform" />
                   <span className="text-xs font-medium ">"{randomPrompt}"</span>
                </div>
{/*                 
                <div className="w-6 h-6 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shadow-sm">
                   <PenTool size={10} />
                </div> */}
             </button>
          </div>

        </div>

      </motion.div>
    </div>
  );
};

export default ArtworkCard;
