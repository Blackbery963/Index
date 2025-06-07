import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaUser, FaBook, FaBars, FaTimes, FaPlus, FaSearch, FaArrowRight } from 'react-icons/fa';
import {MdBook, MdClose} from 'react-icons/md';
import {FiMenu} from 'react-icons/fi'
import background from './Diaryland-Images/calligraphy-7188024.jpg';

function Diaryland() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [diaries, setDiaries] = useState([
    { id: 1, title: 'Beach Sunset Reflections', date: 'May 15, 2023', excerpt: 'The golden hues of sunset blended with the rhythmic waves, creating a moment of perfect serenity...' },
    { id: 2, title: 'Grandma\'s Secret Recipes', date: 'April 22, 2023', excerpt: 'Discovered the worn recipe book in the attic, each stain telling its own delicious story...' },
    { id: 3, title: 'Mountain Summit Epiphany', date: 'March 10, 2023', excerpt: 'At 2,500 meters, the world below seemed both vast and insignificantly small...' },
    { id: 4, title: 'Dancing in the Rain', date: 'February 28, 2023', excerpt: 'The sudden downpour became an unexpected invitation to embrace spontaneity...' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDiaries = diaries.filter(diary =>
    diary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    diary.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen max-w-screen overflow-x-hidden">
      {/* Hero Section (your existing beautiful header) */}
      <div className='h-screen w-screen bg-black bg-center bg-cover flex items-center justify-center' style={{backgroundImage: `url(${background})`}}>
        <div className='h-[90%] w-[85%] border-[2px] border-white bg-black/50 rounded-lg flex flex-col items-center justify-between overflow-hidden'>
          <header className="h-[100px] w-full backdrop-blur-md shadow-md flex items-center justify-between pl-4 pr-8 sticky top-0 z-50">
            <div>
              <h1 className="font-Eagle font-bold lg:text-[35px] md:text-[30px] sm:text-[25px] text-[20px] text-[#001F3F]">
                Painters' Diary
              </h1>
            </div>
            
            {/* Mobile menu button - added for responsive design */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
            </button>
            
            <div className="font-Playfair hidden md:flex gap-8">
              <Link to="/">
                <button className="flex bg-gradient-to-tr from-amber-700 to-amber-900 text-white px-2 py-1 rounded-md items-center gap-2">
                  <span className='hidden lg:block'>Home</span>
                  <FaHome className="text-green-100 text-" title="Home" />
                </button>
              </Link>
              <Link to="/About">
                <button className="flex bg-gradient-to-tr from-amber-700 to-amber-900 text-white px-2 py-1 rounded-md items-center gap-2">
                  <span className='hidden lg:block'>About</span>
                  <FaInfoCircle className="text-green-100 text-" title="About" />
                </button>
              </Link>
              <Link to="/Account">
                <button className="flex bg-gradient-to-tr from-amber-700 to-amber-900 text-white px-2 py-1 rounded-md items-center gap-2">
                  <span className='hidden lg:block'>Account</span>
                  <FaUser className="text-green-100 text-" title="Contact" />
                </button>
              </Link>
              <button className="flex bg-gradient-to-tr from-amber-700 to-amber-900 text-white px-2 py-1 rounded-md items-center gap-2">
                <span className='hidden lg:block'>Collection</span>
                <MdBook className="text-green-100 text-" title="Collections" />
              </button>
            </div>
          </header>

          {/* Mobile Menu - added for responsive design */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-[150px] right-[9%] bg-black/40 backdrop-blur-md rounded-lg shadow-lg p-4 z-50">
              <div className="flex flex-col gap-4">
                <Link to="/" className="text-white hover:text-amber-400 flex items-center gap-2">
                  <FaHome /> Home
                </Link>
                <Link to="/About" className="text-white hover:text-amber-400 flex items-center gap-2">
                  <FaInfoCircle /> About
                </Link>
                <Link to="/Account" className="text-white hover:text-amber-400 flex items-center gap-2">
                  <FaUser /> Account
                </Link>
                <button className="text-white hover:text-amber-400 flex items-center gap-2">
                  <MdBook /> Collection
                </button>
              </div>
            </div>
          )}

          <main className='mx-auto px-8 md:px-0'>
            <h1 className='lg:text-[40px] md:text-[30px] text-[25px] text-center text-white font-Playfair font-semibold'> A Chronicle of Thoughts, Dreams, and Memories</h1>
            <h5 className='lg:text-[20px] text-white text-center font-news'>Explore the Pages of Time, Where Every Entry Holds a Story Waiting to Be Told</h5>
          </main>

          <div className="flex justify-center items-center w-full mb-8">
            <div className="lg:w-[70%] md:w-[85%] sm:w-[90%] w-[95%] lg:h-[400px] md:h-[350px] sm:h-[300px] h-[250px] border border-gray-300 p-2 rounded-lg flex items-center">
              {/* Your Diarylandslider component would go here */}
              <div className="w-full h-full bg-black/30 flex items-center justify-center text-white">
                Featured Diaries Slider
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diary Entries Section (new addition) */}
      <div className="bg-gradient-to-b from-white via-blue-100 to-blue-200 dark:from-black dark:to-gray-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
  <div className="max-w-7xl mx-auto">
    {/* Search and New Entry */}
    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
      <div className="relative w-full md:w-1/2">
        <FaSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search your diaries..."
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="bg-gradient-to-tr from-amber-600 to-amber-800 dark:from-amber-700 dark:to-amber-900 text-white px-6 py-2 rounded-md hover:from-amber-500 hover:to-amber-700 flex items-center gap-2 w-full md:w-auto justify-center transition-colors duration-300">
        <FaPlus /> New Diary Entry
      </button>
    </div>

    {/* Diaries Grid */}
    {filteredDiaries.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDiaries.map(diary => (
          <div
            key={diary.id}
            className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{diary.title}</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">{diary.date}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">{diary.excerpt}</p>
              <div className="flex justify-between items-center">
                <button className="text-amber-600 dark:text-amber-500 hover:text-amber-500 dark:hover:text-amber-400 font-medium flex items-center gap-1">
                  Continue reading <FaArrowRight className="mt-0.5" />
                </button>
                <div className="text-xs text-gray-500 dark:text-gray-400">3 min read</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 text-lg">No diaries found matching your search.</p>
        <button
          onClick={() => setSearchTerm('')}
          className="mt-4 text-amber-600 dark:text-amber-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-300"
        >
          Clear search
        </button>
      </div>
    )}

    {/* Load More Button */}
    {filteredDiaries.length > 0 && (
      <div className="mt-12 text-center">
        <button className="border border-amber-600 text-amber-600 dark:text-amber-500 hover:bg-amber-600/10 dark:hover:bg-amber-500/10 px-6 py-2 rounded-md transition-colors duration-300">
          Load More Entries
        </button>
      </div>
    )}
  </div>
</div>

    </div>
  );
}

export default Diaryland;