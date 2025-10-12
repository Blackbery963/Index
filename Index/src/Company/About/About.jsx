
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaInfoCircle, FaHome, FaUser, FaPalette, FaUpload, FaUsers, FaGlobe, FaBrush, FaLightbulb } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
function About() {
  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

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
  const features = [
    {
      icon: <FaPalette className="text-4xl mb-4 text-indigo-600" />,
      title: "Artwork Gallery",
      description: "Showcase your paintings, illustrations, and digital art in a beautifully curated gallery that highlights your unique style and technique."
    },
    {
      icon: <FaBook className="text-4xl mb-4 text-indigo-600" />,
      title: "Creative Journal",
      description: "Document your artistic journey with our diary feature—share sketches, concepts, and the stories behind your creations."
    },
    {
      icon: <FaUsers className="text-4xl mb-4 text-indigo-600" />,
      title: "Artist Community",
      description: "Connect with fellow artists worldwide, exchange feedback, and find collaborators for your next project."
    },
    {
      icon: <FaGlobe className="text-4xl mb-4 text-indigo-600" />,
      title: "Global Exposure",
      description: "Get discovered by art enthusiasts and potential buyers from around the world through our international platform."
    },
    {
      icon: <FaBrush className="text-4xl mb-4 text-indigo-600" />,
      title: "Creative Resources",
      description: "Access tutorials, artist interviews, and inspiration to help refine your skills and artistic vision."
    },
    {
      icon: <FaLightbulb className="text-4xl mb-4 text-indigo-600" />,
      title: "Art Challenges",
      description: "Participate in themed challenges to push your creative boundaries and gain recognition."
    }
  ];

  const platformStats = [
    { value: "10,000+", label: "Artworks Shared" },
    { value: "2,500+", label: "Active Artists" },
    { value: "50+", label: "Countries Represented" },
    { value: "100+", label: "Collaborations" }
  ];
  const [activeButton, setActiveButton] = useState('About');

  return (
    <div className="min-h-screen max-w-screen bg-gray-50" style={{ fontFamily: "'Roboto', sans-serif" }}>
      {/* Header */}
    
              <header className='sticky top-0 h-[80px] w-full bg-white/20 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 shadow-md z-50'>
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
                    <Link to='/Landscape'>
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
                      <Link to='/Landscape' onClick={() => { setActiveButton('landscape'); toggleMenu(); }}>
                        <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg`}>
                          <FaPalette />
                          Gallery
                        </button>
                      </Link>
                    </div>
                  </motion.nav>
                )}
              </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 py-12 mt-[85px]">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-Roboto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Where Every Stroke Tells a Story
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Painters' Diary is more than a portfolio platform—it's a creative ecosystem designed to nurture artists at every stage of their journey, from emerging talents to established professionals.
          </motion.p>
        </motion.section>

        {/* Platform Introduction */}
        <motion.section 
          className="mb-20 bg-white rounded-xl p-8 shadow-sm"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 font-Playfair">
            About Painters' Diary
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-gray-600 text-lg">
            <p>
              Founded in 2025, Painters' Diary was created to address the unique needs of visual artists seeking a dedicated space to showcase their work and document their creative process.
            </p>
            <p>
              Unlike social media platforms that prioritize viral content, we've built a community that values artistic integrity, technical skill, and creative exploration.
            </p>
            <p>
              Our platform combines the best elements of a digital gallery, artist journal, and professional network—all designed specifically for painters, illustrators, and mixed-media artists.
            </p>
          </div>
        </motion.section>

        {/* Features */}
        <motion.section 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
            Platform Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-3 text-gray-800" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section 
          className="mb-20 bg-indigo-50 rounded-xl p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
            By The Numbers
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {platformStats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-indigo-700 mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Artist Testimonials */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Artists Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-gray-600 italic mb-4">
                "Painters' Diary has transformed how I document my creative process. The journal feature helps me reflect on my artistic growth in ways I never could before."
              </div>
              <div className="font-semibold text-indigo-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                — Sarah K., Watercolor Artist
              </div>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-gray-600 italic mb-4">
                "I've connected with more collaborators in 6 months on Painters' Diary than in 5 years on social media. This platform understands what artists really need."
              </div>
              <div className="font-semibold text-indigo-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                — Miguel R., Digital Illustrator
              </div>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-gray-600 italic mb-4">
                "The clean presentation of my portfolio has helped me secure three commissions already. Clients appreciate seeing my work without distractions."
              </div>
              <div className="font-semibold text-indigo-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                — Aisha T., Portrait Painter
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Begin Your Artistic Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of artists who are already documenting, sharing, and growing their creative practice.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/signup" 
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-lg"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Create Your Free Account
            </Link>
            <Link 
              to="/gallery" 
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-lg"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Explore Artist Galleries
            </Link>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Painters' Diary
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              The premier platform for artists to showcase their work, document their creative journey, and connect with a global community.
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="text-gray-500 hover:text-indigo-600">Terms</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600">FAQ</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600">Contact</a>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Painters' Diary. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;