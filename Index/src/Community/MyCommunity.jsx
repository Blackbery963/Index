import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { account, databases, Query } from '../appwriteConfig';
import { FiArrowRight, FiPlusCircle, FiSearch, FiUsers, FiAward } from 'react-icons/fi';

const MyCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserCommunities = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const user = await account.get();
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COMMUNITY_MEMBERS_COLLECTION_ID,
          [Query.equal('userId', user.$id)]
        );

        if (response.documents.length === 0) {
          setCommunities([]);
          return;
        }

        const communityPromises = response.documents.map(memberDoc => 
          databases.getDocument(
            import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
            memberDoc.communityId
          )
        );

        const communitiesData = await Promise.all(communityPromises);
        setCommunities(communitiesData);
        
      } catch (err) {
        console.error("Error fetching communities:", err);
        setError("Failed to load your communities. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCommunities();
  }, []);

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         community.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || community.category?.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-700 dark:text-gray-300 text-lg"
          >
            Gathering your creative communities...
          </motion.p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8 max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
        >
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-12 h-12 bg-red-200 dark:bg-red-800 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Oops!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (communities.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center p-8 max-w-md"
        >
          <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiUsers className="w-12 h-12 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">No Communities Yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            You haven't joined any creative communities yet. Let's find your artistic tribe!
          </p>
          <div className="flex flex-col space-y-4 max-w-xs mx-auto">
            <motion.div whileHover={{ y: -2 }}>
              <Link
                to="/community/explore"
                className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <FiSearch className="mr-3 w-5 h-5" />
                <span className="font-medium">Explore Communities</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link
                to="/community/create"
                className="flex items-center justify-center px-6 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-50 dark:hover:bg-gray-800/50 transition-all"
              >
                <FiPlusCircle className="mr-3 w-5 h-5" />
                <span className="font-medium">Create New Community</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pb-20 font-Playfair">
      {/* Enhanced Navigation */}
          <motion.nav
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="fixed top-4 left-4 right-4 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg shadow-lg"
                  >
                      <div className="px-4 py-3 sm:px-6 flex justify-between items-center">
                          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Eagle">
                              ArtVerse
                          </Link>
                          <div className="hidden md:flex items-center gap-6">
                              {[
                                  { name: 'Home', path: '/' },
                                  { name: 'Community', path: '/Community' },
                                  { name: 'Resources', path: '/Community/Resources' },
                                  { name: 'Challenge', path: '/community/communitychallenges/monthlychallenge' },
                              ].map((item) => (
                                  <Link
                                      key={item.name}
                                      to={item.path}
                                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium relative group font-Playfair"
                                  >
                                      {item.name}
                                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                                  </Link>
                              ))}
                          </div>
                          <button
                              className="md:hidden text-gray-700 dark:text-gray-300"
                              onClick={() => setIsMenuOpen(!isMenuOpen)}
                          >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  {isMenuOpen ? (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  ) : (
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                  )}
                              </svg>
                          </button>
                      </div>
                      <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="md:hidden overflow-hidden bg-white/40 backdrop-blur-md dark:bg-gray-800/40 rounded-b-lg"
                      >
                          <div className="px-4 py-3 space-y-2">
                              {['Home', 'Community', 'Challenges', 'Resources'].map((item) => (
                                  <a
                                      key={item}
                                      href="#"
                                      className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium py-2 font-Playfair"
                                  >
                                      {item}
                                  </a>
                              ))}
                          </div>
                      </motion.div>
                  </motion.nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-Quicksand">
            Your Creative <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Communities</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            All the artistic communities where you collaborate, learn, and grow
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search communities..."
                className="block w-full outline-none pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {['all', 'painting', 'digital', 'sculpture', 'photography', 'mixed'].map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap  ${
                    filter === category
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Community Grid */}
        {filteredCommunities.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCommunities.map((community) => (
              <motion.div
                key={community.$id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative p-6 h-full flex flex-col">
                  <div className="flex items-start mb-4">
                    {community.imageUrl ? (
                      <img
                        src={community.imageUrl}
                        alt={community.name}
                        className="w-14 h-14 rounded-xl object-cover mr-4 border-2 border-white dark:border-gray-700 shadow-sm"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl mr-4 shadow-sm">
                        {community.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
                        {community.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                          {community.category || 'General'}
                        </span>
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <FiUsers className="mr-1 w-3 h-3" />
                          {community.memberCount || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-2 flex-grow">
                    {community.description || 'No description available'}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div 
                            key={i}
                            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800 shadow-inner"
                          ></div>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 shadow-inner flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                          +{Math.max(0, (community.memberCount || 0) - 3)}
                        </div>
                      </div>
                      
                      <Link
                        to={`/community/${community.slug}`}
                        className="flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                      >
                        Visit
                        <FiArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No communities found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter to find what you're looking for
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilter('all');
              }}
              className="px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 shadow-inner">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FiAward className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to join more creative communities?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Discover new artistic circles, collaborate with fellow creators, and grow your skills
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.div whileHover={{ y: -2 }}>
                  <Link
                    to="/community/ExploreCommunity"
                    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    <FiSearch className="mr-3 w-5 h-5" />
                    Explore Communities
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }}>
                  <Link
                    to="/community/CreateCommunity"
                    className="flex items-center justify-center px-6 py-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800/50 transition-all"
                  >
                    <FiPlusCircle className="mr-3 w-5 h-5" />
                    Create Community
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyCommunities;