import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';

function VotingGallery() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState('monthly');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedImage, setSelectedImage] = useState(null);
  const [votedImages, setVotedImages] = useState([]);

  // Sample data for submissions with Pexels images
  
  const challenges = {
    monthly: {
      title: "Summer Vibes Challenge",
      deadline: "Voting ends in 3 days",
      description: "Vote for your favorite summer-themed artwork! The top 3 with the most votes will win exciting prizes.",
      submissions: [
        {
          id: 1,
          title: "Golden Sunset",
          artist: "Alex Rivera",
          votes: 892,
          image: "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg",
          comments: 24,
          timestamp: "2 days ago"
        },
        {
          id: 2,
          title: "Beach Memories",
          artist: "Sophie Chen",
          votes: 765,
          image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
          comments: 18,
          timestamp: "3 days ago"
        },
        {
          id: 3,
          title: "Tropical Paradise",
          artist: "Jamal Williams",
          votes: 721,
          image: "https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg",
          comments: 15,
          timestamp: "4 days ago"
        },
        {
          id: 4,
          title: "Summer Fruits",
          artist: "Maria Garcia",
          votes: 689,
          image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg",
          comments: 12,
          timestamp: "3 days ago"
        },
        {
          id: 5,
          title: "Poolside Relaxation",
          artist: "David Kim",
          votes: 654,
          image: "https://images.pexels.com/photos/261403/pexels-photo-261403.jpeg",
          comments: 10,
          timestamp: "2 days ago"
        },
        {
          id: 6,
          title: "Ocean Breeze",
          artist: "Emma Johnson",
          votes: 621,
          image: "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg",
          comments: 8,
          timestamp: "5 days ago"
        },
        {
          id: 7,
          title: "Summer Festival",
          artist: "Lucas Smith",
          votes: 598,
          image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
          comments: 7,
          timestamp: "4 days ago"
        },
        {
          id: 8,
          title: "Desert Heat",
          artist: "Aisha Mohammed",
          votes: 543,
          image: "https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg",
          comments: 6,
          timestamp: "3 days ago"
        },
        {
          id: 9,
          title: "Mountain Hike",
          artist: "Ryan Wilson",
          votes: 512,
          image: "https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg",
          comments: 5,
          timestamp: "2 days ago"
        },
        {
          id: 10,
          title: "Summer Reading",
          artist: "Olivia Brown",
          votes: 487,
          image: "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg",
          comments: 4,
          timestamp: "1 day ago"
        }
      ]
    },
    weekly: {
      title: "Urban Sketch Challenge",
      deadline: "Voting ends in 1 day",
      description: "Quick sketches of city life. Vote for your favorite urban artwork!",
      submissions: [
        {
          id: 101,
          title: "City Lights",
          artist: "Maria Garcia",
          votes: 432,
          image: "https://images.pexels.com/photos/2901581/pexels-photo-2901581.jpeg",
          comments: 12,
          timestamp: "1 day ago"
        },
        {
          id: 102,
          title: "Metro Rush",
          artist: "David Kim",
          votes: 387,
          image: "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg",
          comments: 8,
          timestamp: "1 day ago"
        },
        {
          id: 103,
          title: "Urban Sunset",
          artist: "Maya Patel",
          votes: 354,
          image: "https://images.pexels.com/photos/2341837/pexels-photo-2341837.jpeg",
          comments: 7,
          timestamp: "2 days ago"
        },
        {
          id: 104,
          title: "City Rooftop",
          artist: "Ethan Brooks",
          votes: 321,
          image: "https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg",
          comments: 6,
          timestamp: "1 day ago"
        },
        {
          id: 105,
          title: "Night Alley",
          artist: "Aria Kim",
          votes: 298,
          image: "https://images.pexels.com/photos/1123972/pexels-photo-1123972.jpeg",
          comments: 5,
          timestamp: "2 days ago"
        },
        {
          id: 106,
          title: "Street Vibes",
          artist: "Noah Evans",
          votes: 276,
          image: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg",
          comments: 4,
          timestamp: "1 day ago"
        },
        {
          id: 107,
          title: "Urban Glow",
          artist: "Luna Chen",
          votes: 245,
          image: "https://images.pexels.com/photos/771883/pexels-photo-771883.jpeg",
          comments: 3,
          timestamp: "2 days ago"
        },
        {
          id: 108,
          title: "Cityscape",
          artist: "Kai Nguyen",
          votes: 210,
          image: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg",
          comments: 2,
          timestamp: "1 day ago"
        }
      ]
    }
  };

  // Handle vote
  const handleVote = (submissionId) => {
    if (votedImages.includes(submissionId)) {
      setVotedImages(votedImages.filter(id => id !== submissionId));
      const challengeType = activeChallenge;
      const submissionIndex = challenges[challengeType].submissions.findIndex(s => s.id === submissionId);
      if (submissionIndex !== -1) {
        challenges[challengeType].submissions[submissionIndex].votes -= 1;
      }
    } else {
      setVotedImages([...votedImages, submissionId]);
      const challengeType = activeChallenge;
      const submissionIndex = challenges[challengeType].submissions.findIndex(s => s.id === submissionId);
      if (submissionIndex !== -1) {
        challenges[challengeType].submissions[submissionIndex].votes += 1;
      }
    }
  };

  // Sort submissions
  const sortedSubmissions = [...challenges[activeChallenge].submissions].sort((a, b) => {
    if (sortBy === 'popular') return b.votes - a.votes;
    if (sortBy === 'recent') return new Date(b.timestamp) - new Date(a.timestamp);
    return 0;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 pb-24">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-4 right-4 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl"
      >
        <div className="px-6 py-4 sm:px-8 flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Eagle">
            ArtVerse
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {[
              {name: 'Home', path: '/'},
              {name: 'Challenges', path: '/challenges'},
              {name: 'Vote', path: '/vote'},
              {name: 'Submit', path: '/submit'}
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
            <div fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <MdClose/>
              ) : (
                <FiMenu/>
              )}
            </div>
          </button>
        </div>
        
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-b-2xl"
        >
          <div className="px-6 py-4 space-y-3">
            {[
              {name: 'Home', path: '/'},
              {name: 'Challenges', path: '/challenges'},
              {name: 'Vote', path: '/vote'},
              {name: 'Submit', path: '/submit'}
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
          <div className="inline-flex rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-1.5 shadow-lg">
            {['monthly', 'weekly'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveChallenge(tab)}
                className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  activeChallenge === tab 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-700'
                }`}
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
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3 font-Eagle">{challenges[activeChallenge].title}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-Playfair leading-relaxed">{challenges[activeChallenge].description}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 px-6 py-3 rounded-xl shadow-inner">
              <span className="text-purple-700 dark:text-purple-300 font-semibold text-lg font-Playfair">{challenges[activeChallenge].deadline}</span>
            </div>
          </div>
        </motion.div>

        {/* Sorting Options */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-600 dark:text-gray-300 text-lg font-Playfair">
            Showing {sortedSubmissions.length} submissions
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-300 mr-3 font-Playfair">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200 font-Playfair focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
        </div>

        {/* Submissions Grid */}
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
                  src={submission.image}
                  alt={submission.title}
                  className="w-full h-64 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                  onClick={() => setSelectedImage(submission)}
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
                  aria-label={votedImages.includes(submission.id) ? "Remove vote" : "Vote for this artwork"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill={votedImages.includes(submission.id) ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={votedImages.includes(submission.id) ? "0" : "2"}
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
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 font-Eagle">{submission.title}</h3>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="font-Playfair">{submission.comments} comments</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="p-6 sm:p-8">
                  <div className="mb-8">
                    <img
                      src={selectedImage.image}
                      alt={selectedImage.title}
                      className="w-full h-auto max-h-[60vh] object-contain rounded-xl shadow-lg"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 font-Eagle">{selectedImage.title}</h2>
                      <p className="text-purple-600 dark:text-purple-400 text-lg font-Playfair">by {selectedImage.artist}</p>
                      <p className="text-gray-600 dark:text-gray-300 mt-1 font-Playfair">{selectedImage.timestamp}</p>
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
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill={votedImages.includes(selectedImage.id) ? "currentColor" : "none"}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={votedImages.includes(selectedImage.id) ? "0" : "2"}
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="font-Playfair">{selectedImage.comments} comments</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 font-Eagle">Comments</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                      <p className="text-gray-600 dark:text-gray-300 italic font-Playfair">Sign in to view and post comments</p>
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