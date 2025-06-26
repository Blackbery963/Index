import React, { useState, useEffect, useContext } from 'react';
import { FaHome, FaInfoCircle, FaUser, FaPenFancy } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FiEdit, FiUpload } from 'react-icons/fi';
import { LuArrowRightFromLine } from 'react-icons/lu';
import { MdBook } from 'react-icons/md';
import { motion } from 'framer-motion';


const background = "https://cdn.pixabay.com/photo/2023/04/26/17/09/flower-7952950_1280.jpg"


function Journal({ onCreateDiary, onExplore }) {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [monthsBackgrounds, setMonthsBackgrounds] = useState(Array(12).fill(null));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [explore, setExplore] = useState(false);

  // Load saved data from localStorage when the component mounts
  useEffect(() => {
    const savedImage = localStorage.getItem('diaryBackground');
    const savedTitle = localStorage.getItem('diaryTitle');
    const savedDescription = localStorage.getItem('diaryDescription');

    if (savedImage) setBackgroundImage(savedImage);
    if (savedTitle) setTitle(savedTitle);
    if (savedDescription) setDescription(savedDescription);

    if (savedTitle && savedDescription) {
      setIsSaved(true);
    }
  }, []);

  const handleBackgroundImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageBase64 = reader.result;
        setBackgroundImage(imageBase64);
        localStorage.setItem('diaryBackground', imageBase64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMonthBackgroundImage = (e, monthIndex) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      const updatedMonthsBackgrounds = [...monthsBackgrounds];
      updatedMonthsBackgrounds[monthIndex] = imageURL;
      setMonthsBackgrounds(updatedMonthsBackgrounds);
    }
  };

  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      alert('Please enter both a Title and Description before saving!');
      return;
    }

    localStorage.setItem('diaryTitle', title);
    localStorage.setItem('diaryDescription', description);
    setIsSaved(true);
    alert('Your diary entry has been saved!');
  };

  const handleExplore = () => {
    setExplore(true);
  };

  const handleEdit = () => {
    localStorage.removeItem('diaryBackground');
    localStorage.removeItem('diaryTitle');
    localStorage.removeItem('diaryDescription');

    setBackgroundImage(null);
    setTitle('');
    setDescription('');
    setIsSaved(false);
  };

  const getBackgroundGradient = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    // Morning
    return 'from-amber-100 via-pink-100 to-blue-100';
  } else if (hour >= 12 && hour < 17) {
    // Afternoon
    return 'from-blue-100 via-purple-100 to-amber-100';
  } else if (hour >= 17 && hour < 21) {
    // Evening
    return 'from-purple-100 via-pink-100 to-orange-100';
  } else {
    // Night
    return 'from-indigo-200 via-purple-100 to-gray-200';
  }
};

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.2 } },
  hover: { scale: 1.1, transition: { duration: 0.2 } },
};

// const HeroSection = ({ onCreateDiary, onExplore }) => {
  const [background, setBackground] = useState(getBackgroundGradient());

  // Update background every hour to reflect time of day
  useEffect(() => {
    const updateBackground = () => setBackground(getBackgroundGradient());
    updateBackground();
    const interval = setInterval(updateBackground, 3600000); // Update every hour
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={'min-h-screen flex flex-col max-w-screen dark:bg-gradient-to-t dark:from-[#1E3A46] dark:via-[#374151] dark:to-[#1A2A3A] bg-gradient-to-t from-[#f5e0b7] via-[#FFDAB9] to-[#A9B7A1]'}>
      {/* Header Section */}
      <header className="h-[80px] w-full backdrop-blur-md shadow-md flex items-center justify-between px-6 sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80">
        <div>
          <h1 className="font-Eagle font-bold lg:text-[35px] md:text-[30px] sm:text-[25px] text-[20px] text-[#001F3F] dark:text-[#E2E8F0]">
            Painters' Diary
          </h1>
        </div>
        <div className="font-Playfair flex md:gap-8 gap-3">
          <Link to="/">
            <motion.button
              className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-cyan-600 dark:hover:bg-cyan-400 flex items-center gap-2 text-gray-800 dark:text-gray-200"
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
              className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-cyan-600 dark:hover:bg-cyan-400 flex items-center gap-2 text-gray-800 dark:text-gray-200"
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
              className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-cyan-600 dark:hover:bg-cyan-400 flex items-center gap-2 text-gray-800 dark:text-gray-200"
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
              className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-cyan-600 dark:hover:bg-cyan-400 flex items-center gap-2 text-gray-800 dark:text-gray-200"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <MdBook className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Diary</span>
            </motion.button>
          </Link>
        </div>
      </header>

      {!explore ? (
        <section className="lg:w-[90vw] w-[95vw] h-[75vh] mx-auto mt-16 relative border border-gray-400 dark:border-gray-600 overflow-hidden rounded-lg">
          {!backgroundImage ? (
            <label
              htmlFor="background-upload"
              className={`w-full h-full flex items-center justify-center cursor-pointer text-white font-Playfair text-lg font-semibold transition dark:bg-gradient-to-tr dark:from-[#4B5EAA] dark:o-[#2E3A59] from-[#a11d33] to-[#602437]`}
            >
              Upload Background Image to Continue
              <input
                type="file"
                id="background-upload"
                accept="image/*"
                className="hidden"
                onChange={handleBackgroundImage}
              />
            </label>
          ) : (
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div
                  className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/40 dark:border-gray-600/40 shadow-lg w-[90%] md:w-[50%] lg:w-[40%] p-6 rounded-md text-white flex justify-center items-center flex-col"
                >
                  <h1 className="text-center lg:text-4xl md:text-2xl text-xl font-bold mb-6 font-Playfair text-white dark:text-gray-200">
                    The Memories of 2024
                  </h1>
                  <div className="relative mb-6">
                    <input
                      type="text"
                      placeholder="Title"
                      className="w-full bg-transparent border-b text-2xl border-white/50 dark:border-gray-400/50 text-center placeholder-white/70 dark:placeholder-gray-400/70 focus:outline-none text-white dark:text-gray-200 font-Unna"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="relative mb-6">
                    <textarea
                      placeholder="Description"
                      className="w-full bg-transparent border-b text-xl border-white/50 dark:border-gray-400/50 text-center placeholder-white/70 dark:placeholder-gray-400/70 focus:outline-none text-white dark:text-gray-200 font-Unna resize-none"
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={isSaved ? handleExplore : handleSave}
                    className="w-[40%] bg-blue-500 dark:bg-blue-600 px-6 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition text-white mt-4"
                  >
                    {isSaved ? 'Explore' : 'Save'}
                  </button>
                </div>
              </div>
              <button
                onClick={handleEdit}
                className="absolute top-2 right-2 border border-gray-600/40 dark:border-gray-400/40 p-1 bg-white/40 dark:bg-gray-800/90 backdrop-blur-md rounded-md text-gray-800 dark:text-gray-200"
              >
                <FiEdit className="text-[20px]" />
              </button>
            </div>
          )}
        </section>
      ) : (
            <motion.div
      className={`w-[95%] lg:w-[80%] h-[80vh] mx-auto mt-16 rounded-2xl overflow-hidden bg-gradient-to-br ${background} shadow-2xl flex flex-col items-center justify-center relative border-2 border-indigo-200 dark:border-indigo-700`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Subtle overlay texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-20" />

      {/* Main Content */}
      <motion.h1
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 pt-16 z-10 px-4 font-Quicksand"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Discover a New{' '}
        <span className="text-4xl sm:text-5xl lg:text-6xl font-caveat text-orange-400 drop-shadow-md">
          Creative Spark
        </span>{' '}
        Every Day
      </motion.h1>

      <motion.p
        className="text-sm sm:text-base lg:text-lg font-lora text-gray-600 dark:text-gray-300 mt-4 text-center max-w-2xl px-4 z-10 font-Playfair"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        Capture your artistic journey with a daily diary entry or explore your past creations to reignite your inspiration.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-8 z-10"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
       >
        <Link to={"/January"}>
        <motion.button
          onClick={onCreateDiary}
          className="px-8 py-3 bg-indigo-600 text-white rounded-full flex items-center gap-2 text-lg font-caveat hover:bg-indigo-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          aria-label="Create a new diary entry"
        >
          <FaPenFancy />
          Create New Diary
        </motion.button>
        </Link>
        <Link to={"/Diaryland"}>
            <motion.button
          onClick={onExplore}
          className="px-8 py-3 bg-amber-500 text-white rounded-full flex items-center gap-2 text-lg font-caveat hover:bg-amber-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ delay: 0.3 }}
          aria-label="Explore existing diary entries"
        >
          <MdBook />
          Explore More
        </motion.button>
        </Link>
    </motion.div>
      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/paint-splatter.png')] opacity-30 transform -translate-x-1/4 translate-y-1/4"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/paint-splatter.png')] opacity-30 transform translate-x-1/4 -translate-y-1/4"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
      )}
    </div>
  );
}

export default Journal;