import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NotebookPen, BookOpen, Home, Info, User } from "lucide-react";
import { MdOutlineCollectionsBookmark } from "react-icons/md";

const bgImage =
  "https://images.pexels.com/photos/2180092/pexels-photo-2180092.jpeg";

function JournalGateway() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex flex-col"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Soft Background Overlay */}
      <div className="absolute inset-0 bg-black/30 sm:bg-black/20 backdrop-blur-[3px]" />

      {/* ─── Header ────────────────────────────── */}
      <header className="h-[70px] sm:h-[80px] w-full flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50">
       <Link to={"/"}>
       <h1 className="font-Eagle text-2xl sm:text-3xl font-bold text-gray-100 tracking-wide">
          Painters' Diary
        </h1>
       </Link> 

        {/* Mobile Friendly Buttons */}
        <div className="flex gap-4 sm:gap-6 text-white">
          <Link to="/">
            <Home className="hover:text-yellow-300 transition w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
          <Link to="/About">
            <Info className="hover:text-yellow-300 transition w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
          <Link to="/Account">
            <User className="hover:text-yellow-300 transition w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        </div>
      </header>

      {/* ─── Main Content ───────────────────────── */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 relative z-10">

        {/* Floating Glows - Scaled Down on Mobile */}
        <motion.div
          className="absolute w-24 h-24 sm:w-40 sm:h-40 bg-indigo-400/20 rounded-full blur-3xl -top-6 -left-6 sm:-top-10 sm:-left-10"
          animate={{ y: [0, 15, 0], x: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-20 h-20 sm:w-32 sm:h-32 bg-pink-300/20 rounded-full blur-3xl bottom-6 right-6 sm:bottom-10 sm:right-10"
          animate={{ y: [0, -15, 0], x: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        {/* Improved Mobile Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            w-full max-w-md sm:max-w-xl
            backdrop-blur-2xl bg-white/20 
            border border-white/30 
            rounded-2xl sm:rounded-3xl 
            p-6 sm:p-10 
            shadow-2xl 
            flex flex-col items-center text-center
          "
        >
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="
              text-3xl sm:text-4xl 
              font-Playfair font-bold 
              text-white mb-3
            "
          >
            Begin Your Story
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="
              text-base sm:text-lg 
              text-gray-200 
              font-Quicksand 
              max-w-sm sm:max-w-md 
              mb-8 sm:mb-10
            "
          >
            Collect moments, express emotions, and craft your creative journey—one page at a time.
          </motion.p>

          {/* Buttons - Mobile Auto Wrap */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-2">
            <Link to="/Diary">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  px-6 sm:px-8 py-2.5 sm:py-3 
                  bg-white/30 text-white 
                  border border-white/40 
                  backdrop-blur-xl 
                  rounded-lg shadow-lg 
                  flex items-center gap-2 
                  hover:bg-white/40 
                  transition font-medium
                  text-sm sm:text-base
                "
              >
                <NotebookPen className="w-4 h-4 sm:w-5 sm:h-5" />
                New Diary
              </motion.button>
            </Link>

            <Link to="/Diaryland">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  px-6 sm:px-8 py-2.5 sm:py-3 
                  bg-yellow-400/80 text-gray-900 
                  rounded-lg shadow-lg 
                  flex items-center gap-2 
                  hover:bg-yellow-500 
                  transition font-medium
                  text-sm sm:text-base
                "
              >
                <MdOutlineCollectionsBookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                Explore All
              </motion.button>
            </Link>

            <Link to="/MyDiaries">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  px-6 sm:px-8 py-2.5 sm:py-3 
                  bg-yellow-400/80 text-gray-900 
                  rounded-full shadow-lg 
                  flex items-center gap-2 
                  hover:bg-yellow-500 
                  transition font-medium
                  text-sm sm:text-base
                "
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                My Diaries
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default JournalGateway;
