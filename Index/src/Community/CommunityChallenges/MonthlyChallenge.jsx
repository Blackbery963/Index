import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import {MdClose} from 'react-icons/md'



function MonthlyChallenge() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('current');

  // Sample data for challenges with Pexels images
  const challenges = {
    current: {
      title: "Summer Vibes",
      description: "Capture the essence of summer in your artwork. Whether it's beach scenes, tropical fruits, or sunny landscapes, show us your summer spirit!",
      deadline: "August 31, 2025",
      prize: "$500 + Featured on our homepage",
      participants: 1243,
      topSubmissions: [
        {
          id: 1,
          title: "Golden Sunset",
          artist: "Alex Rivera",
          likes: 892,
          image: "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg",
          award: "gold"
        },
        {
          id: 2,
          title: "Beach Memories",
          artist: "Sophie Chen",
          likes: 765,
          image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
          award: "silver"
        },
        {
          id: 3,
          title: "Tropical Paradise",
          artist: "Jamal Williams",
          likes: 721,
          image: "https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg",
          award: "bronze"
        },
        {
          id: 4,
          title: "Summer Fruits",
          artist: "Maria Garcia",
          likes: 689,
          image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg"
        },
        {
          id: 5,
          title: "Poolside Relaxation",
          artist: "David Kim",
          likes: 654,
          image: "https://images.pexels.com/photos/261403/pexels-photo-261403.jpeg"
        },
        {
          id: 6,
          title: "Ocean Breeze",
          artist: "Emma Johnson",
          likes: 621,
          image: "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg"
        },
        {
          id: 7,
          title: "Summer Festival",
          artist: "Lucas Smith",
          likes: 598,
          image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg"
        },
        {
          id: 8,
          title: "Desert Heat",
          artist: "Aisha Mohammed",
          likes: 543,
          image: "https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg"
        },
        {
          id: 9,
          title: "Mountain Hike",
          artist: "Ryan Wilson",
          likes: 512,
          image: "https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg"
        },
        {
          id: 10,
          title: "Summer Flower",
          artist: "Olivia Brown",
          likes: 487,
          image: "https://images.pexels.com/photos/3718388/pexels-photo-3718388.jpeg"
        }
      ]
    },
    upcoming: {
      title: "Autumn Colors",
      description: "Get ready to showcase the beautiful colors of autumn in your next artwork. Think falling leaves, cozy sweaters, and warm tones.",
      deadline: "Starts September 1, 2025",
      prize: "$500 + Art supplies bundle",
      image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg"
    },
    past: [
      {
        id: 1,
        title: "Spring Blooms",
        winner: "Elena Rodriguez",
        image: "https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg"
      },
      {
        id: 2,
        title: "Winter Wonderland",
        winner: "Michael Zhang",
        image: "https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg"
      },
      {
        id: 3,
        title: "Urban Life",
        winner: "Tasha Williams",
        image: "https://images.pexels.com/photos/2901581/pexels-photo-2901581.jpeg"
      }
    ]
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 pb-24 font-Playfair">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-4 right-4 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl"
      >
        <div className="px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Eagle">
            ArtVerse
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {[
              {name: 'Home', path: '/'},
              {name: 'Resources', path: '/resources'},
              {name: 'Explore', path: '/explore-communities'},
              {name: 'Challenges', path: '/community/challenges'}
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
              {name: 'Resources', path: '/resources'},
              {name: 'Explore', path: '/explore-communities'},
              {name: 'Challenges', path: '/community/challenges'}
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
            Monthly Art Challenges
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-Playfair">
            Unleash your creativity, join our themed challenges, and win amazing prizes!
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-1.5 shadow-lg">
            {['current', 'upcoming', 'past'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1) + (tab === 'past' ? ' Winners' : ' Challenge')}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'current' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="lg:w-1/2">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 font-Eagle">{challenges.current.title}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-Playfair leading-relaxed">{challenges.current.description}</p>
                    
                    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-inner">
                      <div className="flex items-center">
                        <svg className="w-7 h-7 text-purple-600 dark:text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300 text-lg">Deadline: <span className="font-semibold">{challenges.current.deadline}</span></span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-7 h-7 text-yellow-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300 text-lg">Prize: <span className="font-semibold">{challenges.current.prize}</span></span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-7 h-7 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300 text-lg">Participants: <span className="font-semibold">{challenges.current.participants.toLocaleString()}</span></span>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-10 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
                    >
                      Submit Your Artwork
                    </motion.button>
                  </div>
                  
                  <div className="lg:w-1/2">
                    <div className="relative bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-700 dark:to-gray-900 rounded-2xl p-6 h-full flex items-center justify-center shadow-inner">
                      <img 
                        src={challenges.current.topSubmissions[0].image} 
                        alt="Featured submission" 
                        className="rounded-xl shadow-lg w-full h-auto max-h-96 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Top Submissions Section */}
          {activeTab === 'current' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 lg:p-12"
            >
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 font-Eagle text-center">Top Submissions</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {challenges.current.topSubmissions.map((submission) => (
                  <motion.div 
                    key={submission.id}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative group rounded-xl overflow-hidden shadow-lg"
                  >
                    <img 
                      src={submission.image} 
                      alt={submission.title} 
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <h4 className="text-white font-bold text-lg">{submission.title}</h4>
                        <p className="text-gray-200 text-sm">by {submission.artist}</p>
                        <div className="flex items-center mt-2">
                          <svg className="w-5 h-5 text-red-400 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-200 text-sm">{submission.likes.toLocaleString()} likes</span>
                        </div>
                      </div>
                    </div>
                    
                    {submission.award && (
                      <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform rotate-12 ${
                        submission.award === 'gold' ? 'bg-yellow-400' : 
                        submission.award === 'silver' ? 'bg-gray-300' : 
                        submission.award === 'bronze' ? 'bg-amber-600' : ''
                      }`}>
                        {submission.award === 'gold' && (
                          <span className="text-yellow-800 font-bold text-sm">1st</span>
                        )}
                        {submission.award === 'silver' && (
                          <span className="text-gray-700 font-bold text-sm">2nd</span>
                        )}
                        {submission.award === 'bronze' && (
                          <span className="text-amber-900 font-bold text-sm">3rd</span>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === 'upcoming' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 lg:p-12 text-center">
                <div className="max-w-4xl mx-auto">
                  <div className="relative mb-8">
                    <img 
                      src={challenges.upcoming.image} 
                      alt="Upcoming challenge" 
                      className="w-full h-80 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 font-Eagle">{challenges.upcoming.title}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-Playfair leading-relaxed">{challenges.upcoming.description}</p>
                  
                  <div className="flex justify-center mb-10">
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-inner">
                      <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-3 font-Eagle">Coming Soon</div>
                      <div className="text-gray-600 dark:text-gray-400 text-lg">{challenges.upcoming.deadline}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 font-Eagle">Prize Details</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg font-Playfair">{challenges.upcoming.prize}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-600 transition-all shadow-lg"
                    >
                      Notify Me When It Starts
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'past' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 lg:p-12">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-10 font-Eagle text-center">Past Challenge Winners</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {challenges.past.map((challenge) => (
                    <motion.div 
                      key={challenge.id}
                      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                      className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
                    >
                      <img 
                        src={challenge.image} 
                        alt={challenge.title} 
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 font-Eagle">{challenge.title}</h3>
                        <p className="text-purple-600 dark:text-purple-400 font-medium mb-4 font-Playfair">Winner: {challenge.winner}</p>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-semibold font-Playfair"
                        >
                          View All Submissions →
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MonthlyChallenge;