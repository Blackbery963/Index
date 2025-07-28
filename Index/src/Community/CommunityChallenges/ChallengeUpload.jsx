import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiChevronRight, FiCalendar, FiClock, FiCheck, FiAward } from 'react-icons/fi';
import { FaPalette, FaRegLightbulb } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { databases, storage, ID, account, Permission, Role } from '../../appwriteConfig';

const ChallengeDb = import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID;
const ChallengeCollection = import.meta.env.VITE_APPWRITE_CHALLENGE_COLLECTION_ID;
const ChallengeStorage = import.meta.env.VITE_APPWRITE_CHALLENGE_BUCKET_ID;

const ChallengeSubmission = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    artwork: null,
    title: '',
    description: '',
    process: '',
  });
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);
  const [challengeType, setChallengeType] = useState('monthly');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const prevPreviewRef = useRef(null);

  // Mock challenge data
  const currentChallenge = {
    id: challengeType === 'monthly' ? 'monthly-1' : 'weekly-1',
    type: challengeType,
    title: challengeType === 'monthly' ? 'Neon Dreams' : 'Urban Sketches',
    description:
      challengeType === 'monthly'
        ? 'Create artwork featuring vibrant neon elements in dark environments'
        : 'Sketch urban landscapes with a focus on dynamic perspectives',
    startDate: challengeType === 'monthly' ? '2025-07-01' : '2025-07-27',
    endDate: challengeType === 'monthly' ? '2025-07-31' : '2025-08-02',
    prize: challengeType === 'monthly' ? '$2,500 + Featured Artist Spot' : '$500 + Social Feature',
    rules: ['Original artwork only', 'No AI-generated content', '1920x1080 minimum resolution'],
    participants: challengeType === 'monthly' ? 342 : 128,
    daysLeft: challengeType === 'monthly' ? 4 : 5,
  };

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
        navigate('/login', { state: { from: '/challenges/submit' } });
      }
    };
    checkAuth();
  }, [navigate]);

  // Cleanup Object URLs
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setErrorMessage('File size exceeds 8MB limit. Please upload a smaller file.');
        return;
      }
      if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
        setErrorMessage('Invalid file type. Please upload PNG, JPEG, or WEBP.');
        return;
      }
      setErrorMessage('');
      if (prevPreviewRef.current) {
        URL.revokeObjectURL(prevPreviewRef.current);
      }
      const newPreview = URL.createObjectURL(file);
      setFormData({ ...formData, artwork: file });
      setPreview(newPreview);
      prevPreviewRef.current = newPreview;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const user = await account.get();
      const userId = user.$id;

      // Upload image to storage
      const imageFile = formData.artwork;
      const imageResponse = await storage.createFile(ChallengeStorage, ID.unique(), imageFile);

      // Create database document
      await databases.createDocument(
        ChallengeDb,
        ChallengeCollection,
        ID.unique(),
        {
          title: formData.title,
          description: formData.description,
          process: formData.process,
          imageId: imageResponse.$id,
          challengeId: currentChallenge.id,
          userId: userId,
        },
        [
          Permission.read(Role.any()),
          Permission.write(Role.user(userId)),
        ]
      );

      setSubmitSuccess(true);
    } catch (error) {
      setErrorMessage(`Submission failed: ${error.message}`);
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, name: 'Challenge Brief', icon: <FaRegLightbulb size={14} /> },
    { id: 2, name: 'Upload Artwork', icon: <FiUpload size={14} /> },
    { id: 3, name: 'Details', icon: <FaPalette size={14} /> },
    { id: 4, name: 'Submit', icon: <FiCheck size={14} /> },
  ];

  if (!isAuthenticated) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 p-4 md:p-8 font-Playfair">
      {/* Floating Timeline */}
      <div className="fixed top-1/2 left-4 transform -translate-y-1/2 hidden md:flex flex-col items-center space-y-6 z-10">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            whileHover={{ scale: 1.1 }}
            onClick={() => currentStep > step.id && setCurrentStep(step.id)}
            className={`relative flex items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-all ${
              currentStep >= step.id
                ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-700 text-gray-400 dark:text-gray-400 shadow-sm'
            } ${currentStep > step.id ? 'cursor-pointer' : 'cursor-default'}`}
            aria-label={`Step ${step.id}: ${step.name}`}
          >
            {currentStep > step.id ? (
              <FiCheck className="text-white" />
            ) : (
              <span className="flex items-center justify-center">{step.icon || step.id}</span>
            )}
            {currentStep === step.id && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-full ml-4 w-40 text-sm font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm whitespace-nowrap"
              >
                {step.name}
              </motion.div>
            )}
          </motion.div>
        ))}
        <div className="h-full w-1 bg-gradient-to-b from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800"></div>
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-4 left-4 right-4 z-50 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl shadow-2xl"
      >
        <div className="px-6 py-4 sm:px-8 flex justify-between items-center">
          <Link
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300 font-Eagle"
          >
            ArtVerse
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[
              { name: 'Home', path: '/' },
              { name: 'Challenges', path: '/challenges' },
              { name: 'Resources', path: '/resources' },
              { name: 'Community', path: '/community' },
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
              { name: 'Resources', path: '/resources' },
              { name: 'Community', path: '/community' },
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

      <div className="max-w-4xl mx-auto pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full mb-4 text-sm font-medium shadow-sm ${
              currentChallenge.type === 'monthly'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
            }`}
          >
            {currentChallenge.type === 'monthly' ? (
              <FiCalendar className="mr-2" />
            ) : (
              <FiClock className="mr-2" />
            )}
            {currentChallenge.type.toUpperCase()} CHALLENGE
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-3 font-Quicksand bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            {currentChallenge.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-Playfair">
            {currentChallenge.description}
          </p>
          {/* Challenge stats */}
          <div className="mt-6 flex justify-center gap-6">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <FiAward className="mr-2 text-indigo-500 dark:text-indigo-400" />
              <span className="font-medium">{currentChallenge.prize.split('+')[0]}</span>
              <span className="text-sm ml-1">+ more</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <svg className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z"></path>
              </svg>
              <span className="font-medium">{currentChallenge.participants}</span>
              <span className="text-sm ml-1">artists</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <FiClock className="mr-2 text-indigo-500 dark:text-indigo-400" />
              <span className="font-medium">{currentChallenge.daysLeft}</span>
              <span className="text-sm ml-1">days left</span>
            </div>
          </div>
          {/* Toggle for demo purposes */}
          <div className="mt-6 flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setChallengeType('weekly')}
              className={`px-5 py-2 rounded-lg font-medium text-sm shadow-sm ${
                challengeType === 'weekly'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Weekly Challenge
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setChallengeType('monthly')}
              className={`px-5 py-2 rounded-lg font-medium text-sm shadow-sm ${
                challengeType === 'monthly'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                  : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Monthly Challenge
            </motion.button>
          </div>
        </motion.div>

        {/* Submission Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Progress bar */}
          <div className="h-1.5 bg-gray-100 dark:bg-gray-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg mx-6 mt-6"
            >
              {errorMessage}
            </motion.div>
          )}

          {/* Step 1: Challenge Brief */}
          {currentStep === 1 && (
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 font-Quicksand flex items-center">
                    <FaRegLightbulb className="text-indigo-500 dark:text-indigo-400 mr-3" />
                    Challenge Details
                  </h2>
                  <div className="space-y-5">
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl">
                      <h3 className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-1 font-Playfair uppercase tracking-wider">
                        TIMEFRAME
                      </h3>
                      <p className="text-gray-800 dark:text-gray-200 flex items-center font-Playfair">
                        <FiCalendar className="mr-2 text-indigo-500 dark:text-indigo-400" />
                        {new Date(currentChallenge.startDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                        })}{' '}
                        -{' '}
                        {new Date(currentChallenge.endDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl">
                      <h3 className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1 font-Playfair uppercase tracking-wider">
                        PRIZE
                      </h3>
                      <p className="text-gray-800 dark:text-gray-200 font-Playfair">
                        {currentChallenge.prize.split('+')[0]}
                        <span className="block text-sm text-purple-600 dark:text-purple-300 mt-1">
                          + {currentChallenge.prize.split('+')[1]}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 font-Quicksand flex items-center">
                    <FiCheck className="text-indigo-500 dark:text-indigo-400 mr-3" />
                    Rules & Guidelines
                  </h2>
                  <ul className="space-y-4">
                    {currentChallenge.rules.map((rule, index) => (
                      <li key={index} className="text-gray-600 dark:text-gray-300 flex items-start font-Playfair">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-400 mr-3 mt-0.5 flex-shrink-0">
                          <FiCheck size={12} />
                        </span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg font-medium shadow-md transition-all font-Playfair"
                >
                  Begin Submission <FiChevronRight className="ml-2" />
                </motion.button>
              </div>
            </div>
          )}

          {/* Step 2: Artwork Upload */}
          {currentStep === 2 && (
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 font-Quicksand flex items-center">
                <FiUpload className="text-indigo-500 dark:text-indigo-400 mr-3" />
                Upload Your Artwork
              </h2>
              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all relative overflow-hidden"
                aria-label="Upload artwork"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/png,image/jpeg,image/webp"
                />
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
                    <FiUpload className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-Playfair">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-Playfair">
                    PNG, JPG, WEBP (max 8MB)
                  </p>
                </div>
                {!preview && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="bg-indigo-500/10 backdrop-blur-sm w-full h-full flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-indigo-300 font-medium">Select artwork file</span>
                    </div>
                  </div>
                )}
              </div>
              {preview && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 font-Playfair">
                    Artwork Preview
                  </h3>
                  <div className="relative group">
                    <div className="relative pt-[56.25%] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm">
                      <img
                        src={preview}
                        alt="Artwork preview"
                        className="absolute inset-0 w-full h-full object-contain"
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/800x450?text=Image+Not+Found')}
                      />
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          if (preview) {
                            URL.revokeObjectURL(preview);
                          }
                          setPreview(null);
                          setFormData({ ...formData, artwork: null });
                          prevPreviewRef.current = null;
                        }}
                        className="bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-2 rounded-full shadow-md"
                        aria-label="Remove artwork"
                      >
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
              <div className="mt-8 flex justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium font-Playfair"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentStep(3)}
                  disabled={!preview}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium text-white font-Playfair shadow-md ${
                    preview
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                      : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                  }`}
                >
                  Continue <FiChevronRight className="ml-2" />
                </motion.button>
              </div>
            </div>
          )}

          {/* Step 3: Submission Details */}
          {currentStep === 3 && (
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 font-Quicksand flex items-center">
                <FaPalette className="text-indigo-500 dark:text-indigo-400 mr-3" />
                Submission Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-Playfair">
                    Artwork Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-all"
                    placeholder="Give your artwork a title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-Playfair">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-all"
                    placeholder="Tell us about your artwork, inspiration, and techniques used"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Minimum 50 characters (
                    {formData.description.length >= 50 ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <span>{formData.description.length}/50</span>
                    )})
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-Playfair">
                    Creative Process (Optional)
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">- Share your journey</span>
                  </label>
                  <textarea
                    value={formData.process}
                    onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-all"
                    placeholder="Share your creative journey, challenges faced, tools used, etc."
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium font-Playfair"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentStep(4)}
                  disabled={!formData.title || !formData.description || formData.description.length < 50}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium text-white font-Playfair shadow-md ${
                    formData.title && formData.description && formData.description.length >= 10
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                      : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                  }`}
                >
                  Review Submission <FiChevronRight className="ml-2" />
                </motion.button>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 font-Quicksand flex items-center">
                <FiCheck className="text-indigo-500 dark:text-indigo-400 mr-3" />
                Review Your Submission
              </h2>
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 font-Quicksand">
                    Submission Successful!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-6 font-Playfair">
                    Your artwork has been submitted to the {currentChallenge.title} challenge. You'll hear back soon!
                  </p>
                  <Link to="/challenges">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors font-Playfair"
                    >
                      Explore More Challenges
                    </motion.button>
                  </Link>
                </motion.div>
              ) : (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                        {preview ? (
                          <img
                            src={preview}
                            alt="Artwork preview"
                            className="w-full h-auto max-h-80 object-contain"
                            onError={(e) => (e.target.src = 'https://via.placeholder.com/800x450?text=Image+Not+Found')}
                          />
                        ) : (
                          <div className="w-full h-80 flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-Playfair">
                            No Artwork Uploaded
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                          Submission Summary
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Challenge</p>
                            <p className="text-gray-800 dark:text-gray-200 font-medium font-Playfair">
                              {currentChallenge.title}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Artwork Title</p>
                            <p className="text-gray-800 dark:text-gray-200 font-medium font-Playfair">
                              {formData.title || 'Untitled'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Description</p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 font-Playfair">
                              {formData.description || 'No description provided'}
                            </p>
                          </div>
                          {formData.process && (
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Creative Process</p>
                              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 font-Playfair">
                                {formData.process}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800">
                        <h3 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-2 font-Playfair">
                          Before you submit
                        </h3>
                        <ul className="text-xs text-indigo-600 dark:text-indigo-300 space-y-2">
                          <li className="flex items-start">
                            <FiCheck className="mr-2 mt-0.5 flex-shrink-0" />
                            I confirm this is my original work
                          </li>
                          <li className="flex items-start">
                            <FiCheck className="mr-2 mt-0.5 flex-shrink-0" />
                            I agree to the challenge terms
                          </li>
                          <li className="flex items-start">
                            <FiCheck className="mr-2 mt-0.5 flex-shrink-0" />
                            I understand submissions are final
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium font-Playfair"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`flex items-center px-8 py-3 rounded-lg font-medium text-white shadow-md font-Playfair ${
                        isSubmitting
                          ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Entry'
                      )}
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ChallengeSubmission;