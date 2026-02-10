// // // // // components/MediaComponents.js
// // // // import React, { useState } from 'react';
// // // // import { MdErrorOutline, MdPhoto, MdVideocam,  } from 'react-icons/md';
// // // // import { FiAward, FiMonitor } from 'react-icons/fi';
// // // // import { MdOutlineSell } from 'react-icons/md';
// // // // import { FaPlay, FaArrowLeft, FaArrowRight, FaCaretRight } from 'react-icons/fa';
// // // // import { FaCaretLeft } from 'react-icons/fa';
// // // // import { IoImageOutline, IoVideocamOutline } from 'react-icons/io5';
// // // // import { motion } from 'framer-motion';
// // // // import { YourCollectionsService } from './YourCollectionsService';
// // // // import { SquarePlay, Volume, Volume2, VolumeOff, VolumeX } from 'lucide-react';

// // // // export const ImagePlaceholder = ({ type, activeTab, className = "" }) => (

// // // // <div
// // // //   className={`${className} flex flex-col items-center justify-center text-center 
// // // //               p-6 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 
// // // //               bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400`}
// // // // >
// // // //   {type === "error" ? (
// // // //     <>
// // // //       <MdErrorOutline className="text-5xl mb-3 text-red-500" />
// // // //       <p className="text-sm font-medium">Media unavailable</p>
// // // //     </>
// // // //   ) : (
// // // //     <>
// // // //       {activeTab === "Arts&Crafts" && <IoImageOutline className="text-5xl mb-3 text-blue-400" />}
// // // //       {activeTab === "Videos" && <IoVideocamOutline className="text-5xl mb-3 text-purple-400" />}
// // // //       {activeTab === "Awards" && <FiAward className="text-5xl mb-3 text-yellow-400" />}
// // // //       {activeTab === "Sell" && <MdOutlineSell className="text-5xl mb-3 text-green-400" />}
      
// // // //       <p className="text-sm font-medium">No media available</p>
// // // //       <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
// // // //         Try uploading something to get started
// // // //       </p>
// // // //     </>
// // // //   )}
// // // // </div>

// // // // );

// // // // export const AppwriteMedia = ({ upload, className = "", onImageClick }) => {
// // // //   const [error, setError] = useState(false);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
// // // // const [muted, setMuted] = useState(true);

// // // //   const [playing, setPlaying] = useState(false);
// // // // const videoRef = React.useRef(null);

// // // // const togglePlay = (e) => {
// // // //   e.stopPropagation();
// // // //   if (!videoRef.current) return;

// // // //   if (videoRef.current.paused) {
// // // //     videoRef.current.play();
// // // //     setPlaying(true);
// // // //   } else {
// // // //     videoRef.current.pause();
// // // //     setPlaying(false);
// // // //   }
// // // // };

// // // // const [duration, setDuration] = useState(0);
// // // // const [currentTime, setCurrentTime] = useState(0);

// // // // const formatTime = (time) => {
// // // //   if (!time || isNaN(time)) return "0:00";
// // // //   const minutes = Math.floor(time / 60);
// // // //   const seconds = Math.floor(time % 60)
// // // //     .toString()
// // // //     .padStart(2, "0");
// // // //   return `${minutes}:${seconds}`;
// // // // };


// // // //   const allImageUrls = YourCollectionsService.getAllImageUrls(upload);
// // // //   const hasMultipleImages = allImageUrls.length > 1;

// // // //   if (error || !upload.fileId) {
// // // //     return <ImagePlaceholder type="error" className={className} />;
// // // //   }

// // // //   const nextImage = (e) => {
// // // //     e.stopPropagation();
// // // //     setCurrentImageIndex((prev) => (prev + 1) % allImageUrls.length);
// // // //   };

// // // //   const prevImage = (e) => {
// // // //     e.stopPropagation();
// // // //     setCurrentImageIndex((prev) => (prev - 1 + allImageUrls.length) % allImageUrls.length);
// // // //   };

// // // //   const currentUrl = allImageUrls[currentImageIndex];

// // // //   return (
// // // //     <div className={`${className} relative group overflow-hidden rounded-`}>
// // // //       {loading && (
// // // //         <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
// // // //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
// // // //         </div>
// // // //       )}
      
// // // // {upload.isVideo ? (
// // // //   <div
// // // //     className="relative w-full h-full rounded- overflow-hidden bg-black cursor-pointer"
// // // //     onClick={togglePlay}
// // // //   >
// // // //     {/* Video */}
// // // //   <video
// // // //   ref={videoRef}
// // // //   src={currentUrl}
// // // //   className={`w-full h-full object-cover transition-opacity duration-500 ${
// // // //     loading ? "opacity-0" : "opacity-100"
// // // //   }`}
// // // //   preload="metadata"
// // // //   muted={muted}
// // // //   autoPlay={true}
// // // //   loop

// // // //   playsInline
// // // //   onLoadedMetadata={(e) => {
// // // //     setDuration(e.target.duration);
// // // //     setLoading(false);
// // // //   }}
// // // //   onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
// // // //   onEnded={() => setPlaying(false)}
// // // //   onError={() => setError(true)}


// // // // />

// // // //   <button
// // // //   onClick={(e) => {
// // // //     e.stopPropagation();
// // // //     setMuted((prev) => !prev);
// // // //   }}
// // // //   className="absolute bottom-3 left-3 bg-black/60 backdrop-blur p-1.5 rounded-full text-white opacity-90 hover:opacity-100 transition"
// // // // >
// // // //   {muted ? (
// // // //     <VolumeX size={14} />
// // // //   ) : (
// // // //     <Volume2 size={14} />
// // // //   )}
// // // // </button>


// // // // {duration > 0 && (
// // // //   <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded-full text-[11px] text-white font-medium">
// // // //     {formatTime(currentTime)} / {formatTime(duration)}
// // // //   </div>
// // // // )}


// // // //     {/* Soft gradient overlay */}
// // // //     <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />

// // // //     {/* Play / Pause Button */}
// // // //     {!playing && !loading && (
// // // //       <div className="absolute inset-0 flex items-center justify-center">
// // // //         <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur flex items-center justify-center transition-transform group-hover:scale-105">
// // // //           <FaPlay className="text-white text-sm ml-[2px]" />
// // // //         </div>
// // // //       </div>
// // // //     )}

// // // //     {/* Video Badge */}
// // // //     <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
// // // //       <SquarePlay className="text-sm" />
// // // //     </div>

// // // //     {/* Loading state */}
// // // //     {loading && (
// // // //       <div className="absolute inset-0 flex items-center justify-center bg-black/20">
// // // //         <div className="w-6 h-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
// // // //       </div>
// // // //     )}
// // // //   </div>
// // // // ) : (
// // // //   <>
// // // //     <img
// // // //       src={currentUrl}
// // // //       alt={upload.title || "Artwork"}
// // // //       className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-100 ${
// // // //         loading ? 'opacity-0' : 'opacity-100'
// // // //       }`}
// // // //       loading="lazy"
// // // //       onLoad={() => setLoading(false)}
// // // //       onError={() => setError(true)}
// // // //       onClick={onImageClick}
// // // //     />

// // // //     {/* Image Gallery Controls... (same as before) */}
// // // //     {hasMultipleImages && (
// // // //       <>
// // // //         <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
// // // //           <MdPhoto className="text-xs" />
// // // //           <span>{currentImageIndex + 1}/{allImageUrls.length}</span>
// // // //         </div>

// // // //         <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
// // // //           {allImageUrls.map((_, index) => (
// // // //             <button
// // // //               key={index}
// // // //               onClick={(e) => {
// // // //                 e.stopPropagation();
// // // //                 setCurrentImageIndex(index);
// // // //               }}
// // // //               className={`w-2 h-2 rounded-full transition-all ${
// // // //                 index === currentImageIndex 
// // // //                   ? 'bg-white' 
// // // //                   : 'bg-white/50 hover:bg-white/70'
// // // //               }`}
// // // //             />
// // // //           ))}
// // // //         </div>

// // // //         <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// // // //           <button
// // // //             onClick={prevImage}
// // // //             className="text-white p-1 rounded-lg"
// // // //           >
// // // //             <FaCaretLeft size={14} />
// // // //           </button>
// // // //           <button
// // // //             onClick={nextImage}
// // // //             className="text-white p-1 rounded-lg"
// // // //           >
// // // //             <FaCaretRight size={14} />
// // // //           </button>
// // // //         </div>
// // // //       </>
// // // //     )}
// // // //   </>
// // // // )}

// // // //       {/* Badges */}
// // // //       <div className="absolute top-3 left-3 flex flex-col gap-1">
// // // //         {upload.isAward && (
// // // //           <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
// // // //             <FiAward className="mr-1" />
// // // //             Award
// // // //           </span>
// // // //         )}
// // // //         {upload.forSale && (
// // // //           <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
// // // //             For Sale
// // // //           </span>
// // // //         )}
// // // //         {hasMultipleImages && !upload.isVideo && (
// // // //           <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
// // // //             Gallery
// // // //           </span>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };




import React, { useRef, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import {
  Play,
  Volume2,
  VolumeX,
  Award,
  Tag,
  SquarePlay
} from "lucide-react";
import { YourCollectionsService } from "./YourCollectionsService";

/* ---------------------------------- */
/* Placeholder */
/* ---------------------------------- */

export const ImagePlaceholder = ({ className = "" }) => (
  <div
    className={`${className} flex flex-col items-center justify-center 
    rounded-lg border border-dashed border-gray-300 dark:border-gray-700 
    bg-gray-50 dark:bg-gray-800/50 text-gray-400`}
  >
    <MdErrorOutline size={32} />
  </div>
);

/* ---------------------------------- */
/* Media Card */
/* ---------------------------------- */

export const AppwriteMedia = ({ upload, className = "", onImageClick }) => {
  const videoRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // We get the first URL for video, or single image fallback
  const urls = YourCollectionsService.getAllImageUrls(upload);
  const url = urls[0];

  if (error || !upload.fileId) {
    return <ImagePlaceholder className={className} />;
  }

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);dark
    }
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div
      className={`${className} relative overflow-hidden rounded- bg-black group`}
      // Pass click event up: specific play for video, standard click for image
      onClick={upload.isVideo ? togglePlay : onImageClick}
    >
      {/* ---------------- VIDEO ---------------- */}
      {upload.isVideo ? (
        <>
          <video
            ref={videoRef}
            src={url}
            muted={muted}
            playsInline
            preload="metadata"
            className="h-full w-full object-cover min-h-[240px]"
            onLoadedMetadata={(e) => {
              setDuration(e.target.duration);
              setLoading(false);
            }}
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
            onEnded={() => setPlaying(false)}
            onError={() => setError(true)}
          />

          {/* Play Overlay (Center) */}
          {!playing && !loading && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="rounded-full bg-black/50 p-2 backdrop-blur transition-transform group-hover:scale-110">
                <Play size={20} className="text-white ml-[2px]" />
              </div>
            </div>
          )}

          {/* Mute Toggle (Bottom Left) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMuted((m) => !m);
            }}
            className="absolute bottom-2 left-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 transition z-20"
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          
          {/* Video Icon Badge (Top Right) */}
          <div className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-1 text-white">
            <SquarePlay size={14} />
          </div>

          {/* Time (Bottom Right) */}
          {duration > 0 && (
            <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          )}
        </>
       ) : (
        /* ---------------- IMAGE FALLBACK ---------------- */
        /* Note: ArtworkCard typically handles images now, this is a safety fallback */
        <img
          src={url}
          alt={upload.title || "Artwork"}
          className="h-full min-h-[240px] w-full object-cover block"
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => setError(true)}
        />
      )}

      {/* ---------------- STATUS ICONS (Top Left) ---------------- */}
      <div className="absolute top-2 left-2 flex gap-1 z-20 pointer-events-none">
        {upload.isAward && (
          <div className="rounded-full bg-yellow-500/90 p-1.5 text-white shadow-sm">
            <Award size={12} />
          </div>
        )}

        {upload.forSale && (
          <div className="rounded-full bg-green-500/90 p-1.5 text-white shadow-sm">
            <Tag size={12} />
          </div>
        )}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        </div>
      )}
    </div>
  );
};

