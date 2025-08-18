import React, { useState, useEffect } from 'react';
import { databases, Query } from '../../appwriteConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaInfoCircle, } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import FollowButton from '../../Follow/FollowButton';
import { FaSearch, FaTimes, FaUserPlus, FaHeart, FaPaintBrush, FaPalette, FaCamera, FaVectorSquare } from 'react-icons/fa';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

const DiscoverUsers = () => {
  const [activeButton, setActiveButton] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [allInterests, setAllInterests] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  // Categorized interests
  const interestCategories = {
    'Painting': [
      "Oil Painting", "Acrylic Painting", "Watercolor Painting", "Ink", 
      "Charcoal", "Pastel", "Pencil Drawing", "Graphite Drawing",
      "Tempera", "Fresco Painting", "Abstract", "Landscape", "Portrait"
    ],
    'Digital': [
      "Digital Art", "Digital Painting", "Vector Art", "Pixel Art",
      "3D Modeling", "AI-Generated Art", "NFT Art", "Augmented Reality Art"
    ],
    'Photography': [
      "Portrait Photography", "Landscape Photography", "Street Photography",
      "Conceptual Photography", "Documentary Photography", "Micro Photography"
    ],
    'Design': [
      "Graphic Design", "Typography Design", "Fashion Design", 
      "Interior Design", "Game Design", "Industrial Design"
    ],
    'Sculpture': [
      "Sculpture", "Ceramic", "Installation Art", "Kinetic Art", "Light Art"
    ],
    'Other': [
      "Mixed Media", "Collage", "Printmaking", "Performance Art", "Sound Art"
    ]
  };

  // Fetch users from Appwrite
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          USER_COLLECTION_ID,
          [Query.select(['$id', 'userId', 'username', 'profileImageUrl', 'bio', 'interests'])]
        );
        
        setUsers(response.documents);
        
        // Extract all unique interests
        const interests = new Set();
        response.documents.forEach(user => {
          if (user.interests) {
            user.interests.forEach(interest => interests.add(interest));
          }
        });
        setAllInterests(Array.from(interests));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Toggle interest selection
  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  // Toggle follow status
  const toggleFollow = (userId) => {
    setFollowedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Filter users based on search and interests
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesInterests = selectedInterests.length === 0 || 
                           (user.interests && user.interests.some((i) => selectedInterests.includes(i)));
    
    const matchesCategory = activeCategory === 'all' || 
                          (user.interests && user.interests.some(i => 
                            interestCategories[activeCategory]?.includes(i)));
    
    return matchesSearch && matchesInterests && matchesCategory;
  });

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  };

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

  const categoryIcons = {
    'all': <FaPalette className="mr-2" />,
    'Painting': <FaPaintBrush className="mr-2" />,
    'Digital': <FaVectorSquare className="mr-2" />,
    'Photography': <FaCamera className="mr-2" />,
    'Design': <FaVectorSquare className="mr-2" />,
    'Sculpture': <FaPalette className="mr-2" />,
    'Other': <FaPalette className="mr-2" />
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-200 dark:bg-blue-800 rounded-full mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Discovering artists...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Error Loading Artists</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-Playfair">
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
      <div className="max-w-7xl mx-auto pt-[100px] px-4 ">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 font-Quicksand">
            Discover Creative Minds
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-Roboto">
            Connect with talented artists and creators from around the world. Find inspiration for your next project.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-10 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex items-center px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap font-Playfair ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 f'
              }`}
            >
              {categoryIcons['all']}
              All Artists
            </button>
            
            {Object.keys(interestCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap font-Playfair ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {categoryIcons[category]}
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 backdrop-blur-sm bg-opacity-70">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search artists by name, bio..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value
                )}
                />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 h-full items-center">
                {selectedInterests.length > 0 ? (
                  <>
                    {selectedInterests.map((interest, index) => (
                      <button
                        key={index}
                        onClick={() => toggleInterest(interest)}
                        className="flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        {interest}
                        <FaTimes className="ml-2 text-xs" />
                      </button>
                    ))}
                    <button
                      onClick={() => setSelectedInterests([])}
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium ml-2"
                    >
                      Clear all
                    </button>
                  </>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {activeCategory === 'all' 
                      ? 'Select interests to filter...' 
                      : `Showing ${activeCategory} artists`}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Interest Suggestions */}
        {selectedInterests.length === 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Popular Interests
            </h3>
            <div className="flex flex-wrap gap-3">
              {interestCategories[activeCategory]?.slice(0, 12).map((interest, index) => (
                <button
                  key={index}
                  onClick={() => toggleInterest(interest)}
                  className="px-4 py-2 rounded-full text-sm font-medium  font-Playfair bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-800 dark:text-white">{filteredUsers.length}</span> {filteredUsers.length === 1 ? 'artist' : 'artists'}
          </div>
          {selectedInterests.length > 0 && (
            <button
              onClick={() => setSelectedInterests([])}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* User Cards */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <FaSearch className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 font-Roboto">
                No artists found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedInterests([]);
                  setActiveCategory('all');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
              >
                Show all artists
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredUsers.map((user) => (
                <motion.div
                  key={user.$id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="h-32 w-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600"></div>
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                      <img
                        src={user.profileImageUrl || 'https://i.pravatar.cc/150?img=random'}
                        alt={user.username}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800"
                        onError={(e) => {
                          e.target.src = 'https://i.pravatar.cc/150?img=random';
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-16 pb-6 px-5 text-center items-center flex flex-col">
                    <Link
                    to={`/Account/${user.$id}`}>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 font-Quicksand">
                      {user.username}
                    </h3>
                    </Link>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-3 font-Playfair">
                      {user.interests?.[0] || 'Artist'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 line-clamp-2 font-Roboto">
                      {user.bio || 'No bio available'}
                    </p>
                    
                    {user.interests && user.interests.length > 0 && (
                      <div className="mb-5 flex flex-wrap gap-2 justify-center">
                        {user.interests.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {user.interests.length > 3 && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            +{user.interests.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    <FollowButton targetUserId={user.$id}/>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverUsers;




// import React, { useState, useEffect } from 'react';
// import { databases, Query } from '../../appwriteConfig';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { FiSearch, FiX, FiUser, FiHome, FiInfo,  } from 'react-icons/fi';
// import { FaPalette } from 'react-icons/fa';
// import { FaPaintBrush, FaCamera, FaVectorSquare } from 'react-icons/fa';

// const DiscoverUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedInterests, setSelectedInterests] = useState([]);
//   const [activeCategory, setActiveCategory] = useState('all');

//   // Simplified interest categories
//   const interestCategories = {
//     'all': { icon: <FaPalette />, items: [] },
//     'Painting': { icon: <FaPaintBrush />, items: ["Oil", "Acrylic", "Watercolor", "Abstract"] },
//     'Digital': { icon: <FaVectorSquare />, items: ["3D Art", "Digital Painting", "NFT"] },
//     'Photography': { icon: <FaCamera />, items: ["Portrait", "Landscape", "Street"] },
//     'Design': { icon: <FaVectorSquare />, items: ["Graphic", "Typography", "UI/UX"] },
//     'Other': { icon: <FaPalette />, items: ["Mixed Media", "Collage", "Sculpture"] }
//   };

//   // Fetch users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await databases.listDocuments(
//           import.meta.env.VITE_APPWRITE_DATABASE_ID,
//           import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
//           [Query.select(['$id', 'username', 'profileImageUrl', 'bio', 'interests'])]
//         );
//         setUsers(response.documents);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const toggleInterest = (interest) => {
//     setSelectedInterests(prev => 
//       prev.includes(interest) 
//         ? prev.filter(i => i !== interest) 
//         : [...prev, interest]
//     );
//   };

//   const filteredUsers = users.filter(user => {
//     const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesInterests = selectedInterests.length === 0 || 
//       (user.interests && user.interests.some(i => selectedInterests.includes(i)));
//     const matchesCategory = activeCategory === 'all' || 
//       (user.interests && user.interests.some(i => 
//         interestCategories[activeCategory]?.items.includes(i)));
//     return matchesSearch && matchesInterests && matchesCategory;
//   });

//   if (loading) return <LoadingSpinner />;
//   if (error) return <ErrorDisplay error={error} />;

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Minimal Header */}
//       <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//           <Link to="/" className="text-xl font-medium text-gray-900 dark:text-white">
//             ArtConnect
//           </Link>
//           <div className="flex items-center space-x-4">
//             <Link to="/" className="hidden sm:block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
//               <FiHome size={20} />
//             </Link>
//             <Link to="/account" className="hidden sm:block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
//               <FiUser size={20} />
//             </Link>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-8">
//         {/* Hero Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-3xl font-light text-gray-900 dark:text-white mb-3">
//             Discover <span className="font-medium">Creatives</span>
//           </h1>
//           <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
//             Find and connect with talented artists across all mediums
//           </p>
//         </div>

//         {/* Search and Filter */}
//         <div className="mb-8">
//           <div className="relative max-w-md mx-auto mb-6">
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search artists..."
//               className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-800 dark:text-white"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <button 
//                 onClick={() => setSearchTerm('')}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//               >
//                 <FiX size={18} />
//               </button>
//             )}
//           </div>

//           {/* Category Tabs */}
//           <div className="flex flex-wrap justify-center gap-2 mb-6">
//             {Object.keys(interestCategories).map(category => (
//               <button
//                 key={category}
//                 onClick={() => setActiveCategory(category)}
//                 className={`flex items-center px-4 py-2 rounded-full text-sm transition-colors ${
//                   activeCategory === category
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
//                 }`}
//               >
//                 <span className="mr-2">{interestCategories[category].icon}</span>
//                 {category}
//               </button>
//             ))}
//           </div>

//           {/* Selected Interests */}
//           {selectedInterests.length > 0 && (
//             <div className="flex flex-wrap justify-center gap-2 mb-6">
//               {selectedInterests.map(interest => (
//                 <button
//                   key={interest}
//                   onClick={() => toggleInterest(interest)}
//                   className="flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm"
//                 >
//                   {interest}
//                   <FiX className="ml-2" size={14} />
//                 </button>
//               ))}
//               <button 
//                 onClick={() => setSelectedInterests([])}
//                 className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
//               >
//                 Clear all
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Interest Suggestions */}
//         {selectedInterests.length === 0 && activeCategory !== 'all' && (
//           <div className="mb-8 text-center">
//             <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
//               Popular in {activeCategory}
//             </h3>
//             <div className="flex flex-wrap justify-center gap-2">
//               {interestCategories[activeCategory].items.map(interest => (
//                 <button
//                   key={interest}
//                   onClick={() => toggleInterest(interest)}
//                   className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-sm"
//                 >
//                   {interest}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Results */}
//         <div className="mb-4 text-sm text-gray-500 dark:text-gray-400 text-center">
//           {filteredUsers.length} {filteredUsers.length === 1 ? 'artist' : 'artists'} found
//         </div>

//         {/* User Grid */}
//         {filteredUsers.length === 0 ? (
//           <div className="text-center py-12">
//             <FiSearch size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
//             <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
//               No results found
//             </h3>
//             <p className="text-gray-500 dark:text-gray-400 mb-4">
//               Try adjusting your search or filters
//             </p>
//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setSelectedInterests([]);
//                 setActiveCategory('all');
//               }}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
//             >
//               Reset filters
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {filteredUsers.map(user => (
//               <UserCard key={user.$id} user={user} />
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// // Minimal User Card Component
// const UserCard = ({ user }) => (
//   <motion.div 
//     whileHover={{ y: -5 }}
//     className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700"
//   >
//     <div className="p-4">
//       <div className="flex items-center space-x-3">
//         <img
//           src={user.profileImageUrl || 'https://i.pravatar.cc/150?img=random'}
//           alt={user.username}
//           className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800"
//           onError={(e) => {
//             e.target.src = 'https://i.pravatar.cc/150?img=random';
//           }}
//         />
//         <div>
//           <Link to={`/account/${user.$id}`} className="font-medium text-gray-900 dark:text-white hover:text-blue-500">
//             {user.username}
//           </Link>
//           {user.interests?.[0] && (
//             <p className="text-xs text-blue-500 dark:text-blue-400">{user.interests[0]}</p>
//           )}
//         </div>
//       </div>
//       {user.bio && (
//         <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
//           {user.bio}
//         </p>
//       )}
//       {user.interests && (
//         <div className="mt-3 flex flex-wrap gap-1">
//           {user.interests.slice(0, 3).map((tag, i) => (
//             <span key={i} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
//               {tag}
//             </span>
//           ))}
//         </div>
//       )}
//       <button className="mt-4 w-full py-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
//         Follow
//       </button>
//     </div>
//   </motion.div>
// );

// // Minimal Loading Spinner
// const LoadingSpinner = () => (
//   <div className="min-h-screen flex items-center justify-center">
//     <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//   </div>
// );

// // Minimal Error Display
// const ErrorDisplay = ({ error }) => (
//   <div className="min-h-screen flex items-center justify-center">
//     <div className="text-center p-6 max-w-md">
//       <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
//         <FiX className="text-red-500 dark:text-red-300" size={24} />
//       </div>
//       <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Error loading artists</h3>
//       <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
//       <button 
//         onClick={() => window.location.reload()}
//         className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
//       >
//         Try again
//       </button>
//     </div>
//   </div>
// );

// export default DiscoverUsers;