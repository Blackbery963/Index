import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaInfoCircle, FaPalette, FaMapMarkerAlt, FaPhoneAlt, FaFax, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

// Placeholder background image
const BackImg = 'https://images.pexels.com/photos/7709161/pexels-photo-7709161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

function Help() {
  const [activeButton, setActiveButton] = useState('contact');
  const formRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    setFormStatus('Sending...');

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        // Clear status message after 5 seconds
        setTimeout(() => setFormStatus(''), 5000);
      } else {
        setFormStatus(data.message || 'Failed to send message.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setFormStatus('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  // Form animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className={`min-h-screen max-w-screen overflow-x-hidden transition-colors duration-300`}>
      {/* Header Section */}
      <div className="min-h-screen w-full bg-center bg-cover bg-no-repeat relative items-center flex justify-center" style={{ backgroundImage: `url(${BackImg})` }}>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900/60 dark:bg-gray-900/70"></div>
        
        {/* Navbar */}
        <header className="fixed top-0 h-[80px] w-full bg-[#ffffff48] dark:bg-gray-800/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 shadow-md z-50">
          <div className="flex items-center">
            <h1 className="lg:text-[35px] md:text-[30px] sm:text-[25px] text-[21px] font-bold font-Eagle text-gray-800 dark:text-gray-100">Painters' Diary</h1>
          </div>
          
          <div className="flex items-center gap-x-2 sm:gap-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-x-4 text-gray-800 dark:text-gray-100 font-Playfair font-bold">
              <Link to="/">
                <button
                  className={`px-3 py-1 rounded-md transition-all hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center gap-1 ${activeButton === 'home' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  onClick={() => setActiveButton('home')}
                >
                  <FaHome />
                  <span className="ml-1">Home</span>
                </button>
              </Link>
              <Link to="/About">
                <button
                  className={`px-3 py-1 rounded-md transition-all hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center gap-1 ${activeButton === 'about' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  onClick={() => setActiveButton('about')}
                >
                  <FaInfoCircle />
                  <span className="ml-1">About</span>
                </button>
              </Link>
              <Link to="/Account">
                <button
                  className={`px-3 py-1 rounded-md transition-all hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center gap-1 ${activeButton === 'account' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  onClick={() => setActiveButton('account')}
                >
                  <FaUser />
                  <span className="ml-1">Account</span>
                </button>
              </Link>
              <Link to="/Landscape">
                <button
                  className={`px-3 py-1 rounded-md transition-all hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center gap-1 ${activeButton === 'landscape' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  onClick={() => setActiveButton('landscape')}
                >
                  <FaPalette />
                  <span className="ml-1">Gallery</span>
                </button>
              </Link>
            </nav>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-800 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300"
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
              className="md:hidden fixed top-[85px] right-2 w-48 bg-white/40 dark:bg-gray-800/90 backdrop-blur-md shadow-md z-40 rounded-lg"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex flex-col items-center py-4 gap-y-3 font-Playfair font-bold text-gray-800 dark:text-gray-100">
                <Link to="/" onClick={() => { setActiveButton('home'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${activeButton === 'home' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                    <FaHome />
                    Home
                  </button>
                </Link>
                <Link to="/About" onClick={() => { setActiveButton('about'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${activeButton === 'about' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                    <FaInfoCircle />
                    About
                  </button>
                </Link>
                <Link to="/Account" onClick={() => { setActiveButton('account'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${activeButton === 'account' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                    <FaUser />
                    Account
                  </button>
                </Link>
                <Link to="/Landscape" onClick={() => { setActiveButton('landscape'); toggleMenu(); }}>
                  <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${activeButton === 'landscape' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                    <FaPalette />
                    Gallery
                  </button>
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
        
        {/* Hero Section */}
        <main className="relative flex flex-col items-center justify-center h-full px-4 text-center z-10">
          <motion.div
            className="bg-[#ffffff6e] dark:bg-gray-800/80 rounded-lg rounded-br-[60px] rounded-tl-[60px] p-6 max-w-2xl backdrop-blur-sm shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-Tapestary text-3xl md:text-5xl text-gray-800 dark:text-gray-100 drop-shadow-lg">Welcome!</h1>
            <p className="font-GreatVibes text-lg md:text-xl text-gray-700 dark:text-gray-200 mt-4 drop-shadow-md">
              Every problem has a solution. We're here to help you navigate obstacles and discover the right path forward.
            </p>
            <button
              className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-colors shadow-md hover:shadow-lg"
              onClick={scrollToForm}
            >
              Get In Touch
            </button>
          </motion.div>
        </main>
      </div>
      
      {/* Contact Details and Form Section */}
      <section ref={formRef} className="w-full py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Title */}
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            How Can We Help You?
          </motion.h2>
          
          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-full mb-4">
                <FaMapMarkerAlt className="text-indigo-600 dark:text-indigo-400 text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Our Main Office</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">SoHo 94 Broadway St New York, NY 10001</p>
            </motion.div>
            
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-full mb-4">
                <FaPhoneAlt className="text-indigo-600 dark:text-indigo-400 text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Phone Number</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">234-876-5400<br/>(888) 0123-4567 (Toll Free)</p>
            </motion.div>
            
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-full mb-4">
                <FaFax className="text-indigo-600 dark:text-indigo-400 text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Fax</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">1-234-567-8900</p>
            </motion.div>
            
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-full mb-4">
                <FaEnvelope className="text-indigo-600 dark:text-indigo-400 text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Email</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">hello@painterdiary.com</p>
            </motion.div>
          </div>
          
          {/* Form and Opening Times */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md"
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl md:text-3xl font-bold font-Playfair text-gray-800 dark:text-gray-100 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    placeholder="Your name"
                    required
                    aria-label="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    placeholder="your.email@example.com"
                    required
                    aria-label="Your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
                    placeholder="How can we help you?"
                    required
                    aria-label="Your message"
                  />
                </div>
                
                {formStatus && (
                  <p className={`text-sm text-center ${formStatus.includes('success') ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                    {formStatus}
                  </p>
                )}
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </motion.div>
            
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold font-Playfair text-gray-800 dark:text-gray-100 mb-6">Our Working Hours</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Monday - Friday</span>
                  <span className="text-gray-600 dark:text-gray-400">9:00 AM - 7:00 PM</span>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Saturday</span>
                  <span className="text-gray-600 dark:text-gray-400">10:00 AM - 4:00 PM</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Sunday</span>
                  <span className="text-gray-600 dark:text-gray-400">Closed</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Emergency Support</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  For urgent matters outside working hours, please call our 24/7 support line.
                </p>
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-indigo-600 dark:text-indigo-400" />
                  <span className="text-gray-800 dark:text-gray-100 font-medium">(888) 555-EMER (3637)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Help;