import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';
import { databases, storage, ID, account, Permission, Role, Query } from '../../appwriteConfig';


//Environment variables
const ChallengeDb = import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID;
const ChallengeCollection = import.meta.env.VITE_APPWRITE_CHALLENGE_COLLECTION_ID;
const ChallengeStorage = import.meta.env.VITE_APPWRITE_CHALLENGE_BUCKET_ID;
const UserDb = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const UserCollection = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;



function VotingGallery() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState('monthly');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedImage, setSelectedImage] = useState(null);
  const [votedImages, setVotedImages] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Mock challenge metadata (ideally fetched from Appwrite)
  const challenges = {
    monthly: {
      id: 'monthly-1',
      title: 'Summer Vibes Challenge',
      deadline: 'Voting ends in 3 days',
      description: 'Vote for your favorite summer-themed artwork! The top 3 with the most votes will win exciting prizes.',
    },
    weekly: {
      id: 'weekly-1',
      title: 'Urban Sketch Challenge',
      deadline: 'Voting ends in 1 day',
      description: 'Quick sketches of city life. Vote for your favorite urban artwork!',
    },
  };

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Enhanced fetch submissions with user data
  const fetchSubmissions = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // 1. Fetch submissions for current challenge
      const submissionsResponse = await databases.listDocuments(
        ChallengeDb,
        ChallengeCollection,
        [Query.equal('challengeId', challenges[activeChallenge].id)]
      );

      // 2. Get unique user IDs from submissions
      const userIds = [...new Set(submissionsResponse.documents.map(s => s.userId))];
      
      // 3. Fetch user data in batches if needed (Appwrite limits to 100 docs per query)
      const userBatches = [];
      const batchSize = 100;
      
      for (let i = 0; i < userIds.length; i += batchSize) {
        const batch = userIds.slice(i, i + batchSize);
        userBatches.push(
          databases.listDocuments(
            UserDb,
            UserCollection,
            [Query.equal('$id', batch)]
          )
        );
      }

      const usersResponses = await Promise.all(userBatches);
      const usersMap = new Map();
      
      usersResponses.forEach(response => {
        response.documents.forEach(user => {
          usersMap.set(user.$id, user);
        });
      });

      // 4. Process submissions with user data
      const processedSubmissions = await Promise.all(
        submissionsResponse.documents.map(async (submission) => {
          try {
            const imageUrl = storage.getFilePreview(
              ChallengeStorage,
              submission.imageId
            );

            const user = usersMap.get(submission.userId);
            
            return {
              id: submission.$id,
              title: submission.title,
              artist: user?.username || 'Anonymous',
              artistId: submission.userId,
              votes: submission.votes || 0,
              imageUrl,
              comments: submission.comments?.length || 0,
              timestamp: submission.$createdAt,
            };
          } catch (err) {
            console.error(`Error processing submission ${submission.$id}:`, err);
            return null;
          }
        })
      );

      // Filter out any failed submissions
      setSubmissions(processedSubmissions.filter(sub => sub !== null));
      
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message || 'Failed to load submissions');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when challenge changes
  useEffect(() => {
    fetchSubmissions();
  }, [activeChallenge]);

  // Handle voting
  const handleVote = async (submissionId) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/vote' } });
      return;
    }

    try {
      const user = await account.get();
      const isUpvote = !votedImages.includes(submissionId);
      
      // Optimistic UI update
      setSubmissions(prev => prev.map(sub => 
        sub.id === submissionId 
          ? { ...sub, votes: isUpvote ? sub.votes + 1 : sub.votes - 1 }
          : sub
      ));
      
      setVotedImages(prev => 
        isUpvote 
          ? [...prev, submissionId] 
          : prev.filter(id => id !== submissionId)
      );

      // Update in database
      await databases.updateDocument(
        ChallengeDb,
        ChallengeCollection,
        submissionId,
        { votes: isUpvote ? 1 : -1 }
      );

    } catch (error) {
      console.error('Vote error:', error);
      // Revert optimistic update on error
      fetchSubmissions();
      setError('Failed to record vote. Please try again.');
    }
  };

  // Sort submissions
  const sortedSubmissions = [...submissions].sort((a, b) => {
    if (sortBy === 'popular') return b.votes - a.votes;
    if (sortBy === 'recent') return new Date(b.timestamp) - new Date(a.timestamp);
    return 0;
  });

  if (!isAuthenticated && !isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 pb-24">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-4 left-4 right-4 z-50 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl shadow-2xl"
      >
        <div className="px-6 py-4 sm:px-8 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Quicksand"
          >
            ArtVerse
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[
              { name: 'Home', path: '/' },
              { name: 'Challenges', path: '/challenges' },
              { name: 'Vote', path: '/vote' },
              { name: 'Submit', path: '/submit' },
            ].map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Link
                  to={item.path}
                  className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-semibold font-Playfair transition-colors duration-300"
                >
                  {item.name}
                </Link>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </motion.div>
            ))}
          </div>
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
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
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-b-2xl"
        >
          <div className="px-6 py-4 space-y-3">
            {[
              { name: 'Home', path: '/' },
              { name: 'Challenges', path: '/challenges' },
              { name: 'Vote', path: '/vote' },
              { name: 'Submit', path: '/submit' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-semibold py-2 font-Playfair transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 mb-6 font-Quicksand">
            Public Voting Gallery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-Playfair">
            Browse and vote for your favorite artworks to help decide the winners!
          </p>
        </motion.div>

        {/* Challenge Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-1.5 shadow-lg overflow-x-auto">
            {['monthly', 'weekly'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveChallenge(tab)}
                className={`whitespace-nowrap px-6 py-3 rounded-lg font-semibold text-lg font-Playfair transition-all duration-300 ${
                  activeChallenge === tab
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-700'
                }`}
                aria-current={activeChallenge === tab ? 'page' : undefined}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Challenge
              </button>
            ))}
          </div>
        </div>

        {/* Challenge Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3 font-Quicksand">{challenges[activeChallenge].title}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-Playfair leading-relaxed">{challenges[activeChallenge].description}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 px-6 py-3 rounded-xl shadow-inner">
              <span className="text-purple-700 dark:text-purple-300 font-semibold text-lg font-Playfair">{challenges[activeChallenge].deadline}</span>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg mb-8"
          >
            {error}
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <svg
              className="animate-spin h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="mt-4 text-gray-600 dark:text-gray-300 font-Playfair">Loading submissions...</p>
          </div>
        )}

        {/* Sorting Options */}
        {!isLoading && !error && (
          <div className="flex justify-between items-center mb-8">
            <div className="text-gray-600 dark:text-gray-300 text-lg font-Playfair">
              Showing {sortedSubmissions.length} submissions
            </div>
            <div className="flex items-center">
              <label htmlFor="sortBy" className="text-gray-600 dark:text-gray-300 mr-3 font-Playfair">
                Sort by:
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200 font-Playfair focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                aria-label="Sort submissions"
              >
                <option value="popular">Most Popular</option>
                <option value="recent">Most Recent</option>
              </select>
            </div>
          </div>
        )}

        {/* Submissions Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedSubmissions.map((submission) => (
              <motion.div
                key={submission.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative group">
                  <img
                    src={submission.imageUrl}
                    alt={submission.title}
                    className="w-full h-64 object-contain cursor-pointer transition-transform duration-300 group-hover:scale-105"
                    onClick={() => setSelectedImage(submission)}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/800x450?text=Image+Not+Found')}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleVote(submission.id)}
                    className={`absolute top-4 right-4 p-2.5 rounded-full shadow-lg transition-colors duration-300 ${
                      votedImages.includes(submission.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-900'
                    }`}
                    aria-label={votedImages.includes(submission.id) ? 'Remove vote' : 'Vote for this artwork'}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill={votedImages.includes(submission.id) ? 'currentColor' : 'none'}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={votedImages.includes(submission.id) ? '0' : '2'}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </motion.button>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 font-Quicksand">{submission.title}</h3>
                  <p className="text-purple-600 dark:text-purple-400 mb-3 font-Playfair">by {submission.artist}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500 mr-1.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300 font-Playfair">{submission.votes.toLocaleString()} votes</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span className="font-Playfair">{submission.comments} comments</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close modal"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="p-6 sm:p-8">
                  <div className="mb-8">
                    <img
                      src={selectedImage.imageUrl}
                      alt={selectedImage.title}
                      className="w-full h-auto max-h-[60vh] object-contain rounded-xl shadow-lg"
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/800x450?text=Image+Not+Found')}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 font-Quicksand">{selectedImage.title}</h2>
                      <p className="text-purple-600 dark:text-purple-400 text-lg font-Playfair">by {selectedImage.artist}</p>
                      <p className="text-gray-600 dark:text-gray-300 mt-1 font-Playfair">
                        {new Date(selectedImage.timestamp).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleVote(selectedImage.id)}
                        className={`flex items-center px-4 py-2 rounded-lg font-semibold text-lg transition-all ${
                          votedImages.includes(selectedImage.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600'
                        }`}
                        aria-label={votedImages.includes(selectedImage.id) ? 'Remove vote' : 'Vote for this artwork'}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill={votedImages.includes(selectedImage.id) ? 'currentColor' : 'none'}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={votedImages.includes(selectedImage.id) ? '0' : '2'}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span>{selectedImage.votes.toLocaleString()} votes</span>
                      </motion.button>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span className="font-Playfair">{selectedImage.comments} comments</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 font-Quicksand">Comments</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                      {isAuthenticated ? (
                        <p className="text-gray-600 dark:text-gray-300 italic font-Playfair">No comments yet. Be the first to comment!</p>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300 italic font-Playfair">
                          <Link to="/login" className="text-purple-600 dark:text-purple-400 hover:underline">
                            Sign in
                          </Link>{' '}
                          to view and post comments
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default VotingGallery;
