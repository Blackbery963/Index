import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { account } from "../../appwriteConfig";
import { RiBubbleChartLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";

function HeroSection() {
  const { user, isAuthenticated } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userName, setUserName] = useState(null);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const emotionalSlides = [
    {
      text: "Your story deserves to be told.",
      subtext: "In a world of noise, your art speaks the truth.",
      emoji: "💫",
    },
    {
      text: "Create what only you can create.",
      subtext: "Your imagination is a world waiting to be seen.",
      emoji: "🎨",
    },
    {
      text: "Where silence finds its voice.",
      subtext: "Express what words cannot capture.",
      emoji: "🌌",
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserName(user.name || user.email?.split("@")[0]);
      } catch {
        setUserName(null);
      }
    };
    fetchUser();
  }, []);

  // Smooth text animation
  useEffect(() => {
    const currentText = emotionalSlides[currentSlide].text;
    let timeout;

    if (!isDeleting && displayText !== currentText) {
      // Typing effect
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, 80);
    } else if (isDeleting && displayText !== "") {
      // Deleting effect
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      }, 40);
    } else if (!isDeleting && displayText === currentText) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      // Move to next slide
      setIsDeleting(false);
      setCurrentSlide((prev) => (prev + 1) % emotionalSlides.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentSlide]);

  // Auto-advance slides as backup
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDeleting && displayText === emotionalSlides[currentSlide].text) {
        setIsDeleting(true);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide, displayText, isDeleting]);

  const greeting = isAuthenticated && userName 
    ? `Hello, ${userName}`
    : "Welcome, storyteller";

  return (
    <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden transition-all duration-700">
      {/* Enhanced Background with Floating Particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-gray-100 to-purple-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-700">
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/30 dark:bg-blue-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Enhanced Floating Glass Panels */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 2, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 right-16 w-64 h-64 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -1, 0],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: 1 
          }}
          className="absolute bottom-32 left-12 w-48 h-48 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto">
        {/* Enhanced Greeting with Smooth Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
            {greeting}
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"
          />
        </motion.div>

        {/* Enhanced Emotional Text Slide with Typewriter Effect */}
        <div className="relative h-48 mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="bg-white/20 dark:bg-white/10 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl mx-auto max-w-2xl transform transition-all duration-500 hover:scale-[1.02]">
                {/* Animated Emoji */}
                <motion.div
                  key={emotionalSlides[currentSlide].emoji}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="text-5xl mb-6"
                >
                  {emotionalSlides[currentSlide].emoji}
                </motion.div>
                
                {/* Typewriter Text */}
                <h2 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-gray-100 mb-4 min-h-[4rem] flex items-center justify-center">
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="ml-1"
                  >
                    |
                  </motion.span>
                </h2>
                
                {/* Subtext with Fade Animation */}
                <motion.p
                  key={emotionalSlides[currentSlide].subtext}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg text-gray-600 dark:text-gray-300 font-light"
                >
                  {emotionalSlides[currentSlide].subtext}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced CTA Buttons with Hover Effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-row items-center justify-center gap-4 mt-8"
        >
          {/* Art Store Button */}
          <Link to="/Arteva/Artstore" className="group relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-500" />
              <button className="relative px-4 py-2 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 border border-white/40 dark:border-white/20 rounded-lg backdrop-blur-xl font-medium shadow-xl
              flex items-center justify-center group-hover:shadow-2xl transition-all duration-500 whitespace-nowrap text-lg">
               <RiBubbleChartLine />
               <span className=" flex items-center justify-center gap-x-2"> <span className=" md:block hidden">Explore</span>  ArtStore</span>
              </button>
            </motion.div>
          </Link>

          {/* Community Button */}
          <Link to="/community" className="group relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-500" />
              <button className="relative px-4 py-2 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 border border-white/40 dark:border-white/20 rounded-lg backdrop-blur-xl font-medium
              flex items-center gap-x-1 justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 whitespace-nowrap text-lg">
                <LuUsers />
              <p className=" flex items-center justify-center gap-x-2"> <span className=" md:block hidden">Join</span>Community</p>
              </button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Enhanced Footer Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-16"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm italic mb-2">
            "Your canvas is waiting — start painting your story."
          </p>
          <motion.div
            animate={{ width: [0, 100, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto w-32"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;

