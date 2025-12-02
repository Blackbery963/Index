import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  UserStar,
  Trophy,
  Compass,
  UserRoundSearch,
  Sparkles
} from "lucide-react";

const LogoImage = ({ src, alt }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
        <Sparkles className="text-white w-4 h-4" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className="w-8 h-8 rounded-lg object-cover border-2 border-indigo-500/30"
    />
  );
};

import logo from "../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg";

const CommunityNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Explore", path: "/community/ExploreCommunity", icon: Compass },
    { name: "Members", path: "/community/members", icon: UserRoundSearch },
    { name: "Challenges", path: "/community/challenges", icon: Trophy },
    { name: "My Community", path: "/community/MyCommunity", icon: UserStar },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] flex justify-center px-0 transition-all duration-300 ${
        isScrolled ? "pt-2" : "pt-6"
      }`}
    >
      <div
        className={`
          relative w-full max-w-[98%]
          backdrop-blur-xl bg-white/60 dark:bg-slate-900/60
          border border-white/40 dark:border-slate-700/50
          shadow-lg shadow-black/5
          rounded-lg transition-all duration-300
          ${isMobileMenuOpen ? "rounded-b-none bg-white/90 dark:bg-slate-900/90" : ""}
        `}
      >
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <LogoImage src={logo} alt="PD Community" />
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent font-Eagle group-hover:from-indigo-600 group-hover:to-purple-600 transition-all">
              PD Community
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center bg-slate-200/30 dark:bg-slate-800/30 rounded-full p-1 border border-slate-300/20 dark:border-slate-700/40">
            {navItems.map((item) => {
              const isActive = pathname.includes(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                    ${
                      isActive
                        ? "text-white shadow-md"
                        : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <item.icon size={16} className={isActive ? "animate-pulse" : ""} />
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden p-2 text-slate-700 dark:text-slate-300 bg-slate-200/50 dark:bg-slate-800 rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { ease: "easeOut", duration: 0.35 }
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: { ease: "easeIn", duration: 0.25 }
              }}
              className="md:hidden overflow-hidden border-t border-slate-200 dark:border-slate-800"
            >
              <div className="p-4 space-y-1">
                {navItems.map((item, idx) => {
                  const isActive = pathname.includes(item.path);

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * idx }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base transition-all
                          ${
                            isActive
                              ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium"
                              : "text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                          }
                        `}
                      >
                        <item.icon size={20} />
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default CommunityNavbar;
