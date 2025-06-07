
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FeedBackground from './evaluation-feedback-customer-smiley-response.jpg';
import FeedBackground2 from './9019830.jpg';
import { FaHome, FaInfoCircle, FaUser, FaBook } from 'react-icons/fa';
import {MdBook} from 'react-icons/md';
import { motion } from 'framer-motion';

function Feedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // Colorful emotions with emoji and text
  const emojiReactions = {
    1: { text: '😞 Very Bad', color: '#ff4d4d' }, // Red
    2: { text: '🙁 Bad', color: '#ff8c1a' },      // Orange
    3: { text: '😐 Okay', color: '#ffd700' },     // Yellow
    4: { text: '🙂 Good', color: '#00cc00' },     // Green
    5: { text: '😄 Excellent!', color: '#00ced1' }, // Dark Turquoise
  };

  const handleClick = (star) => {
    setRating(star);
  };

  // Fallback for emoji rendering (replace with twemoji.parse if imported)
  const renderEmoji = (text) => text;


  const buttonVariants = {
    hover: { scale: 1.1, backgroundColor: '#A4C6EB', transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };


  return (
    <>
      {/* Header */}
      <header className="h-[80px] w-full bg-gradient-to-l from-[#10002bad] to-[#dec9e9a9] backdrop-blur-md flex items-center justify-between px-4 md:px-6 shadow-xl text-white fixed top-0 z-50">
      <h1 className="lg:text-[35px] md:text-[30px] sm:text-[25px] text-[20px] font-bold font-Eagle">Painters' Diary</h1>
        <div className="flex gap-x-2 sm:gap-x-4 text-gray-800 font-playfair font-semibold">
            <Link to="/">
              <motion.button
                className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-rose-100 flex items-center gap-2"
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
                className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-rose-100  flex items-center gap-2"
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
                className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-rose-100 flex items-center gap-2"
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
                className="px-2 sm:px-2 py-1 sm:py-1 rounded-md hover:bg-rose-100 flex items-center gap-2"
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

      {/* Desktop View */}
      <div
        className="min-h-screen w-screen bg-center bg-cover flex items-center justify-center lg:block  pt-[250px]"
        style={{ backgroundImage: `url(${FeedBackground})` }}
      >
        <main className="w-[90%] max-w-2xl h-[70vh] bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center flex-col gap-6 p-6 rounded-2xl shadow-2xl border border-teal-200">
          <h1 className="text-4xl text-center font-serif text-teal-900 font-semibold drop-shadow-md">
            Your Opinion Shapes Us!
          </h1>
          <form className="flex flex-col gap-6 w-full max-w-md">
            <div>
              <label className="text-lg font-semibold text-teal-800 mb-2 block font-serif">Your Name</label>
              <input
                id="FeedInput"
                className="w-full p-3 rounded-lg bg-white/30 text-teal-900 outline-none border border-teal-300 focus:ring-2 focus:ring-teal-500 transition-all duration-200 placeholder-teal-600 font-medium"
                type="text"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="text-lg font-semibold text-teal-800 mb-2 block font-serif">Rate Our Platform</label>
              <div className="flex justify-center gap-2 text-4xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => handleClick(star)}
                    className="cursor-pointer transition-all duration-200 hover:scale-125"
                    style={{
                      color: star <= (hover || rating) ? '#00ced1' : '#d1d5db',
                    }}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center text-xl font-serif mt-2 text-teal-700 font-medium">
                  {renderEmoji(emojiReactions[rating].text)}
                </p>
              )}
            </div>
            <div>
              <label className="text-lg font-semibold text-teal-800 mb-2 block font-serif">Share Your Thoughts</label>
              <textarea
                className="w-full h-32 p-4 rounded-lg bg-white/30 border border-teal-300 focus:ring-2 focus:ring-teal-500 text-teal-900 placeholder-teal-600 font-serif resize-none shadow-md transition-all duration-200"
                placeholder="Write your feedback here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-teal-600 to-blue-500 text-white rounded-lg hover:from-teal-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl font-serif text-lg"
            >
              Submit Feedback
            </button>
          </form>
        </main>
      </div>

      {/* Mobile View */}
      <div
        className="min-h-screen w-screen bg-center bg-cover flex items-center justify-center lg:hidden  pt-[120px]"
        style={{ backgroundImage: `url(${FeedBackground2})` }}
      >
        <main className="w-[90%] max-w-md h-[70vh] bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center flex-col gap-4 p-4 rounded-2xl shadow-2xl border border-teal-200">
          <h1 className="text-2xl text-center font-serif text-teal-900 font-semibold drop-shadow-md">
            Your Opinion Shapes Us!
          </h1>
          <form className="flex flex-col gap-4 w-full">
            <div>
              <label className="text-base font-semibold text-teal-800 mb-2 block font-serif">Your Name</label>
              <input
                id="FeedInput"
                className="w-full p-2 rounded-lg bg-white/30 text-teal-900 outline-none border border-teal-300 focus:ring-2 focus:ring-teal-500 transition-all duration-200 placeholder-teal-600 font-medium"
                type="text"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="text-base font-semibold text-teal-800 mb-2 block font-serif">Rate Our Platform</label>
              <div className="flex justify-center gap-2 text-3xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => handleClick(star)}
                    className="cursor-pointer transition-all duration-200 hover:scale-125"
                    style={{
                      color: star <= (hover || rating) ? '#00ced1' : '#d1d5db',
                    }}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center text-lg font-serif mt-2 text-teal-700 font-medium">
                  {renderEmoji(emojiReactions[rating].text)}
                </p>
              )}
            </div>
            <div>
              <label className="text-base font-semibold text-teal-800 mb-2 block font-serif">Share Your Thoughts</label>
              <textarea
                className="w-full h-24 p-3 rounded-lg bg-white/30 border border-teal-300 focus:ring-2 focus:ring-teal-500 text-teal-900 placeholder-teal-600 font-serif resize-none shadow-md transition-all duration-200"
                placeholder="Write your feedback here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-teal-600 to-blue-500 text-white rounded-lg hover:from-teal-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl font-serif text-base"
            >
              Submit Feedback
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default Feedback;