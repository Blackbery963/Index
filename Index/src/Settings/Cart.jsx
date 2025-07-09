import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome,FaUser,FaInfoCircle, FaPalette } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

function Cart() {
    const [activeButton, setActiveButton] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }
    }
  };
    return (
        <div className='w-full  min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center'>
          <header className='fixed top-0 h-[80px] w-full bg-white/20 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 shadow-md z-50'>
          {/* Logo Section */}
        <Link to={'/'}>
          <div className='flex items-center'>
            <h1 className='lg:text-[35px] md:text-[30px] sm:text-[25px] text-[21px] font-bold font-Eagle text-black'>Painters' Diary</h1>
          </div>
        </Link>
          {/* Navigation Buttons */}
          <div className='flex items-center gap-x-2 sm:gap-x-4'>
            {/* Desktop Navigation */}
            <nav className='hidden md:flex gap-x-4 text-black font-Playfair font-bold'>
              <Link to='/'>
                <button 
                  className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'home' ? 'bg-gray-600/50' : ''}`}
                  onClick={() => setActiveButton('home')}
                >
                  <FaHome />
                  <span className="ml-1">Home</span>
                </button>
              </Link>
              <Link to='/About'> 
                <button 
                  className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'about' ? 'bg-gray-600/50' : ''}`}
                  onClick={() => setActiveButton('about')}
                >
                  <FaInfoCircle />
                  <span className="ml-1">About</span>
                </button>
              </Link>
              <Link to='/Account'>
                <button 
                  className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'account' ? 'bg-gray-600/50' : ''}`}
                  onClick={() => setActiveButton('account')}
                >
                  <FaUser />
                  <span className="ml-1">Account</span>
                </button>
              </Link>
              <Link to='/gallery'>
                <button 
                  className={`px-2 py-1 rounded-md transition-all bg-blue-500 text-white flex items-center justify-center gap-1 ${activeButton === 'landscape' ? 'bg-blue-600' : ''}`}
                  onClick={() => setActiveButton('landscape')}
                >
                  <FaPalette />
                  <span className="ml-1">Gallery</span>
                </button>
              </Link>
            </nav>
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-black hover:text-gray-800 transition-all duration-300"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </header>
        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden fixed top-[85px] right-2 w-36 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-md z-40 rounded-lg"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex flex-col items-center py-4 gap-y-3 font-Playfair font-bold text-black dark:text-gray-100">
                <Link to='/' onClick={() => { setActiveButton('home'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                    <FaHome />
                    Home
                  </button>
                </Link>
                <Link to='/About' onClick={() => { setActiveButton('about'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                    <FaInfoCircle />
                    About
                  </button>
                </Link>
                <Link to='/Account' onClick={() => { setActiveButton('account'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                    <FaUser />
                    Account
                  </button>
                </Link>
                <Link to='/gallery' onClick={() => { setActiveButton('landscape'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg`}>
                    <FaPalette />
                    Gallery
                  </button>
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
        <main className=' flex items-center justify-center mt-[100px]'>
          <h1 className='md:text-2xl text-xl text-gray-900 dark:bg-gray-200 font-Playfair font-semibold'>Nothig in the Cart For Now ..</h1>
        </main>
        </div>
        
    )
}

export default Cart;