import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { databases, Query, account } from '../appwriteConfig'; // Adjust import path
import { toast, ToastContainer } from 'react-toastify';


function ExploreCommunity() {
    const slug = useParams()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    // Get the specific community's full data to access the ownerId
    const communityDoc = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
      communityId
    );

    const ownerId = communityDoc.ownerId;
    const communityName = communityDoc.name;

    // Store request in a separate 'join_requests' collection
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

    toast.alert('Join request sent to the owner!');
  } catch (err) {
    console.error("Error sending join request:", err);
    toast.alert('Failed to send join request');
  }
};


    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-slate-200 via-pink-200 to-purple-200 dark:from-slate-900 dark:to-gray-950 flex items-center justify-center'>
          <ToastContainer
          
          />
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
                              {name:'Home', path:"/"},
                              {name:"Community", path:"/Community"},
                              {name:"Resources", path:"/Community/Resources"},
                              {name:"Challenge", path:"/community/communitychallenges/monthlychallenge"}
                            ].map((item) => (
                              <Link
                                key={item}
                                to={item.path}
                                whileHover={{ scale: 1.1 }}
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
                        {/* Mobile Menu */}
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
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="fixed top-4 left-4 right-4 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg shadow-lg"
            >
                {/* Your existing nav code remains the same */}
            </motion.nav>

            {/* Main content */}
            <div className="container mx-auto px-4 py-24">
               <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-Eagle">
  Explore Artist Communities
</h1>
<p className="text-center text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-12 font-Playfair">
  Discover and join amazing communities of artists, painters, and creatives.
</p>

                {loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-300">Loading communities...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-12 text-red-500">
                        <p>Error loading communities: {error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {communities.map((community) => (
                           <motion.div
  key={community.$id}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="bg-white/80 dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
>
  {community.banner && (
    <img src={community.banner} alt="Banner" className="w-full h-40 object-cover" />
  )}
  <div className="p-5">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-Playfair">
      {community.name}
    </h2>
    <p className="text-gray-600 dark:text-gray-300 mt-2">
      {community.description || 'No description provided.'}
    </p>
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {community.membersCount || 0} members
      </span>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleJoinRequest(community.$id)}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-sm"
      >
        Request to Join
      </motion.button>
    </div>
  </div>
</motion.div>

                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExploreCommunity;