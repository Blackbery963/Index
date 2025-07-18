import { useState, useEffect } from 'react';
import { FaHome, FaInfoCircle, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { MdBook } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';


 export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const buttonVariants = {
    hover: { scale: 1.1, backgroundColor: '#A4C6EB', transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <motion.header
      className="h-16 sm:h-20 w-full bg-gradient-to-r from-teal-400/50 to-teal-800/50 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-between shadow-lg px-4 sm:px-8 fixed top-0 z-50"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-Eagle text-rose-700 dark:text-teal-400">
          Painters' Diary
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <nav className="hidden md:flex gap-x-4 text-gray-800 dark:text-gray-200 font-playfair font-semibold">
          <Link to="/">
            <motion.button
              className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 flex items-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaHome className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Home</span>
            </motion.button>
          </Link>
          <Link to="/About">
            <motion.button
              className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 flex items-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaInfoCircle className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">About</span>
            </motion.button>
          </Link>
          <Link to="/Account">
            <motion.button
              className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 flex items-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaUser className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Account</span>
            </motion.button>
          </Link>
          <Link to="/Journal">
            <motion.button
              className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 flex items-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <MdBook className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Diary</span>
            </motion.button>
          </Link>
        </nav>
        <button
          className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <MdClose className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-16 sm:top-20 mt-[5px] right-2 w-40 bg-teal-200/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg z-40 md:hidden"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="flex flex-col items-center gap-2 py-4 text-gray-800 dark:text-gray-200 font-playfair">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <motion.button
                  className="w-full px-4 py-2 hover:bg-teal-700 dark:hover:bg-teal-700 rounded-md flex items-center justify-center gap-2"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaHome className="text-lg" />
                  <span>Home</span>
                </motion.button>
              </Link>
              <Link to="/About" onClick={() => setIsMenuOpen(false)}>
                <motion.button
                  className="w-full px-4 py-2 hover:bg-teal-700 dark:hover:bg-teal-700 rounded-md flex items-center justify-center gap-2"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaInfoCircle className="text-lg" />
                  <span>About</span>
                </motion.button>
              </Link>
              <Link to="/Account" onClick={() => setIsMenuOpen(false)}>
                <motion.button
                  className="w-full px-4 py-2 hover:bg-teal-700 dark:hover:bg-teal-700 rounded-md flex items-center justify-center gap-2"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaUser className="text-lg" />
                  <span>Account</span>
                </motion.button>
              </Link>
              <Link to="/Journal" onClick={() => setIsMenuOpen(false)}>
                <motion.button
                  className="w-full px-4 py-2 hover:bg-teal-700 dark:hover:bg-teal-700 rounded-md flex items-center justify-center gap-2"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <MdBook className="text-lg" />
                  <span>Diary</span>
                </motion.button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};