import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { databases, Query, account } from '../appwriteConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ExploreCommunity() {
    const { slug } = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    // Fetch all communities
    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                setLoading(true);
                const response = await databases.listDocuments(
                    import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID
                );
                setCommunities(response.documents);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching communities:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCommunities();
    }, []);

    const handleJoinRequest = async (communityId) => {
        try {
            const user = await account.get();
            const currentUserId = user.$id;

            const communityDoc = await databases.getDocument(
                import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
                communityId
            );

            const ownerId = communityDoc.ownerId;
            const communityName = communityDoc.name;

            await databases.createDocument(
                import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COMMUNITY_REQUEST_COLLECTION_ID,
                'unique()',
                {
                    communityId,
                    communityName,
                    userId: currentUserId,
                    ownerId,
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                }
            );

            toast.success('Join request sent to the community owner!');
        } catch (err) {
            console.error("Error sending join request:", err);
            toast.error('Failed to send join request');
        }
    };

    // Filter communities based on search and filter
    const filteredCommunities = communities.filter(community => {
        const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            community.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' || 
                            (filter === 'popular' && community.memberCount > 100) ||
                            (filter === 'new' && new Date(community.$createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
        
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 font-Playfair">
            <ToastContainer position="bottom-right" />
            
            {/* Floating Particles Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-purple-200/30 dark:bg-purple-800/20"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            width: Math.random() * 10 + 5,
                            height: Math.random() * 10 + 5,
                            opacity: Math.random() * 0.5 + 0.1
                        }}
                        animate={{
                            y: [0, (Math.random() - 0.5) * 100],
                            x: [0, (Math.random() - 0.5) * 100],
                            transition: {
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                repeatType: 'reverse'
                            }
                        }}
                    />
                ))}
            </div>

            {/* Navigation */}
<motion.nav
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="fixed top-4 left-4 right-4 z-50 bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-lg shadow-lg"
            >
              <div className="px-4 py-3 sm:px-6 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Eagle">
                  ArtVerse
                </Link>
                <div className="hidden md:flex items-center gap-6">
                  {[
                    {name: 'Home', path: '/'},
                    {name: 'Resources', path:'/resourches'},
                    {name:'Community', path:'/community'},
                    {name:'Challenges', path:'/communnity/Challenges'}
                  ].map((item) => (
                     <motion.div
                     key={item.name}
                     whileHover={{ scale: 1.1 }}
                     className="relative group"
                     >
                     <Link
                     to={item.path}
                     className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium font-Playfair"
                     >
                     {item.name}
                     </Link>
                     <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                     </motion.div>
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
              {/* Mobile Menu */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden bg-white/40 backdrop-blur-md dark:bg-gray-800/40 rounded-b-lg"
              >
                <div className="px-4 py-3 space-y-2">
                  {[
                    {name: 'Home', path: '/'},
                    {name: 'Resources', path:'/resourches'},
                    {name:'Community', path:'/community'},
                    {name:'Challenges', path:'/communnity/Challenges'}
                  ].map((item) => (
                    <Link
                    key={item.name}
                    to={item.path}
                    className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium py-2 font-Playfair"
                    >
                    {item.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </motion.nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 pt-32 pb-16">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mb-16"
                >
                    <motion.h1 
                        className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-Quicksand"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Discover Artist Communities
                    </motion.h1>
                    <motion.p 
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-Playfair mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Connect with creative minds, share your art, and grow together in vibrant communities.
                    </motion.p>
                    
                    {/* Search and Filter */}
                    <motion.div 
                        className="max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search communities..."
                                className="w-full px-6 py-4 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 pl-14"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        
                        <div className="flex justify-center mt-6 space-x-3">
                            {['all', 'popular', 'new'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                        filter === type 
                                            ? 'bg-purple-600 text-white shadow-md'
                                            : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full"
                        />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center"
                    >
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Error Loading Communities</h3>
                            <p className="text-red-600 dark:text-red-300">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Communities Grid */}
                {!loading && !error && (
                    <div className="relative">
                        {filteredCommunities.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <div className="max-w-md mx-auto">
                                    <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">No Communities Found</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">Try adjusting your search or filters</p>
                                    <button
                                        onClick={() => { setSearchQuery(''); setFilter('all'); }}
                                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            >
                                <AnimatePresence>
                                    {filteredCommunities.map((community, index) => (
                                        <motion.div
                                            key={community.$id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            whileHover={{ y: -5 }}
                                            className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                                        >
                                            {/* Community Banner */}
                                            <div className="relative h-48 overflow-hidden">
                                                {community.color ? (
                                                    <div 
                                                        className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                                                        style={{ backgroundColor: community.color }}
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                                                    </div>
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                                        <div className="text-white text-center p-6">
                                                            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                            </svg>
                                                            <span className="text-sm font-medium">Artist Community</span>
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                {/* Member Count Badge */}
                                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md flex items-center space-x-1">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        {community.memberCount || 0} members
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Community Content */}
                                            <div className="p-6">
                                                <Link to={`/community/${community.slug}`}>
                                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                        {community.name}
                                                    </h3>
                                                </Link>
                                                
                                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                                    {community.description || 'A creative community for artists to connect and share their work.'}
                                                </p>
                                                
                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {['Art', 'Creative', 'Collaboration'].map((tag, i) => (
                                                        <span 
                                                            key={i}
                                                            className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                
                                                {/* Join Button */}
                                                <motion.button
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    onClick={() => handleJoinRequest(community.$id)}
                                                    className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-md transition-all flex items-center justify-center space-x-2"
                                                >
                                                    <span>Join Community</span>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            {/* <footer className="dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"></div>
                                <span className="text-lg font-bold text-gray-800 dark:text-white">ArtVerse</span>
                            </Link>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                Connecting artists worldwide
                            </p>
                        </div>
                        <div className="flex space-x-6">
                            {['About', 'Contact', 'Privacy', 'Terms'].map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase()}`}
                                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} ArtVerse. All rights reserved.
                    </div>
                </div>
            </footer> */}
        </div>
    );
}

export default ExploreCommunity;