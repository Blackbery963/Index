import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiUpload, FiPlus } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 85);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Account", path: "/account" },
    { name: "Journal", path: "/journal" },
  ];

  return (
    <header
      className={`fixed top-3 left-1/2 -translate-x-1/2 w-[96%] rounded-2xl z-50 border transition-all duration-300
      ${isScrolled ? "shadow-xl" : ""}
      bg-white/30 dark:bg-gray-900/30 border-white/20 dark:border-gray-700/40 backdrop-blur-2xl`}
    >
      <div className="px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="font-Eagle text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Painters' Diary
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-[16px] font-medium text-gray-700 dark:text-gray-300">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="hover:text-green-600 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 ml-4">
            <Link
              to="/account/upload"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <FiUpload size={16} /> Upload
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <MdClose size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white/30 dark:bg-gray-900/30 border-white/20 dark:border-gray-700/40 backdrop-blur-2xl px-4 py-3 space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={toggleMenu}
                className="block text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors py-2"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Action Buttons */}
            <div className="flex flex-col gap-2 pt-3">
              <Link
                to="/account/upload"
                onClick={toggleMenu}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
              >
                <FiUpload size={16} /> Upload
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
