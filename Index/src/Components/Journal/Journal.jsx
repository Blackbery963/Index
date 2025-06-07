import React, { useState, useEffect, useContext } from 'react';
import { FaHome, FaInfoCircle, FaUser, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import woodBackground from './Diary-images/beige-wooden-textured-flooring-background.jpg';
import diaryBackground from './Diary-images/1d19d578-7d3a-454b-9ce3-2dae3fd63c7b.jpg';
import { FiEdit, FiUpload } from 'react-icons/fi';
import { LuArrowRightFromLine } from 'react-icons/lu';
import { MdBook } from 'react-icons/md';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../Header/Header'; // Adjust the import path based on your project structure

function Journal() {
  const context = useContext(DarkModeContext);
  if (!context) {
    console.error("Journal must be used within a DarkModeProvider");
    return <div>Error: Dark Mode Context is missing. Please wrap your app with DarkModeProvider.</div>;
  }
  const { darkMode } = context;

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

  const buttonVariants = {
    hover: { scale: 1.1, backgroundColor: darkMode ? '#60A5FA' : '#A4C6EB', transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className={`min-h-screen flex flex-col max-w-screen ${darkMode ? 'bg-gradient-to-t from-[#1E3A46] via-[#374151] to-[#1A2A3A]' : 'bg-gradient-to-t from-[#f5e0b7] via-[#FFDAB9] to-[#A9B7A1]'}`}>
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

      <div className="mt-8 lg:ml-14 md:ml-10 ml-4 flex flex-col items-center">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-playfair text-gray-900 dark:text-gray-100">
          The Canvas of My Life
        </h1>
      </div>

      {!explore ? (
        <section className="lg:w-[90vw] w-[95vw] h-[75vh] mx-auto mt-8 relative border border-gray-400 dark:border-gray-600 overflow-hidden">
          {!backgroundImage ? (
            <label
              htmlFor="background-upload"
              className={`w-full h-full flex items-center justify-center cursor-pointer text-white font-Playfair text-lg font-semibold transition ${darkMode ? 'bg-gradient-to-tr from-[#4B5EAA] to-[#2E3A59]' : 'bg-gradient-to-tr from-[#a11d33] to-[#602437]'}`}
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
                className="absolute top-2 right-2 border border-gray-600 dark:border-gray-400 p-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-md text-gray-800 dark:text-gray-200"
              >
                <FiEdit className="text-[20px]" />
              </button>
            </div>
          )}
        </section>
      ) : (
        <section
          className="lg:w-[90vw] w-[95vw] mx-auto mt-8 relative border border-gray-400 dark:border-gray-600 bg-cover bg-center p-4"
          style={{ backgroundImage: `url(${woodBackground})` }}
        >
          <h2 className="text-3xl font-Playfair mb-6 lg:mt-0 mt-4 text-center text-gray-900 dark:text-gray-100">
            Your Year in 12 Chapters
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full px-4">
            {[
              { month: 'January', description: 'The beginning, a fresh start.', to: '/January' },
              { month: 'February', description: 'The month of love and reflection.', to: '/February' },
              { month: 'March', description: 'Spring is here, time for new beginnings.', to: '/March' },
              { month: 'April', description: 'A month of renewal and growth.', to: '/April' },
              { month: 'May', description: 'The month of flowers and dreams.', to: '/May' },
              { month: 'June', description: 'Summer approaches, energy and excitement.', to: '/June' },
              { month: 'July', description: 'The height of summer, heat and adventure.', to: '/July' },
              { month: 'August', description: 'A time to reflect and unwind.', to: '/August' },
              { month: 'September', description: 'Back to routine, the fall breeze.', to: '/September' },
              { month: 'October', description: 'The autumn chill, harvest and change.', to: '/October' },
              { month: 'November', description: 'A time for gratitude and reflection.', to: '/November' },
              { month: 'December', description: 'Endings and beginnings, a festive close.', to: '/December' },
            ].map((item, index) => {
              const hasBackground = monthsBackgrounds[index] !== null;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-transform border border-gray-300 dark:border-gray-600 relative"
                  style={{
                    height: '200px',
                    backgroundImage: `url(${monthsBackgrounds[index] || diaryBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <h3
                    className={`text-base sm:text-xl font-semibold font-Playfair text-center ${
                      hasBackground ? 'text-white dark:text-gray-200' : 'text-black dark:text-gray-200'
                    }`}
                  >
                    {item.month}
                  </h3>
                  <p
                    className={`text-base sm:text-lg font-normal font-Newsreader text-center ${
                      hasBackground ? 'text-white dark:text-gray-300' : 'text-slate-800 dark:text-gray-300'
                    }`}
                  >
                    {item.description}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id={`upload-${index}`}
                    onChange={(e) => handleMonthBackgroundImage(e, index)}
                  />
                  <label
                    htmlFor={`upload-${index}`}
                    className="absolute top-2 right-2 bg-transparent text-black dark:text-white p-1 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    <FiUpload />
                  </label>
                  <Link to={item.to}>
                    <button
                      className={`hidden md:block border px-2 font-Playfair rounded-md mt-4 backdrop-blur-md ${
                        hasBackground
                          ? 'text-white dark:text-gray-200 border-slate-100 dark:border-gray-400'
                          : 'text-slate-800 dark:text-gray-200 border-gray-600 dark:border-gray-400'
                      }`}
                    >
                      Explore
                    </button>
                  </Link>
                  <Link to={item.to}>
                    <LuArrowRightFromLine
                      size={22}
                      className="md:hidden text-blue-500 dark:text-blue-400 text-lg backdrop-blur-md p-1 mt-4"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

export default Journal;