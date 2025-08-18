import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { databases, ID } from '../../appwriteConfig';

function CreateNewChallenge() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    categories: [],
    reward: '',
    visibility: 'community',
  });
  const [currentCategory, setCurrentCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [activePanel, setActivePanel] = useState('basic'); // 'basic', 'dates', 'details'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addCategory = () => {
    if (currentCategory && !formData.categories.includes(currentCategory)) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, currentCategory]
      }));
      setCurrentCategory('');
    }
  };

  const removeCategory = (categoryToRemove) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat !== categoryToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate) {
      setError('Please fill in all required fields');
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError('End date must be after start date');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await databases.createDocument(
        'YOUR_DATABASE_ID',
        'YOUR_COLLECTION_ID',
        ID.unique(),
        {
          ...formData,
          createdAt: new Date().toISOString(),
          createdBy: 'CURRENT_USER_ID',
          status: 'upcoming',
          participants: [],
          communityId: 'YOUR_COMMUNITY_ID'
        }
      );

      navigate(`/challenges/${response.$id}`);
    } catch (err) {
      console.error('Error creating challenge:', err);
      setError('Failed to create challenge. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" max-w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-3xl bg-white/90 mt-12 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/paint-splatter.png')`,
          backgroundSize: 'cover',
        }}
      >
        {/* Decorative paint splatters */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h- bg32-gradient-to-br from-pink-600 to-transparent opacity-20 rounded-full -translate-x-12 -translate-y-12" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-600 to-transparent opacity-20 rounded-full translate-x-16 translate-y-16" />
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            {['basic', 'dates', 'details'].map((step, index) => (
              <React.Fragment key={step}>
                <motion.button
                  onClick={() => setActivePanel(step)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-['Georgia','serif'] transition-all duration-300 ${
                    activePanel === step
                      ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white scale-110 shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {index + 1}
                </motion.button>
                {step !== 'details' && (
                  <motion.div
                    className={`w-16 h-1 mx-2 ${
                      activePanel === step || activePanel === (index === 0 ? 'dates' : 'details')
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    animate={{ scaleX: activePanel === step || activePanel === (index === 0 ? 'dates' : 'details') ? 1 : 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 font-['Georgia','serif'] tracking-tight">
          Paint Your Challenge
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 italic font-['Georgia','serif']">
          Create a vibrant art challenge to inspire your community.
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 p-4 bg-red-100/80 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-xl border border-red-300 dark:border-red-700"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="relative">
          {/* Panel 1: Basic Info */}
          <motion.div
            animate={{
              x: activePanel === 'basic' ? 0 : activePanel === 'dates' ? '-100%' : '-200%',
              opacity: activePanel === 'basic' ? 1 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="space-y-6 min-h-[400px]"
          >
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 font-['Georgia','serif']">
                Challenge Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 p-3 transition-all duration-300 hover:shadow-md"
                placeholder="Inktober Challenge"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 font-['Georgia','serif']">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 w-full rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 p-3 transition-all duration-300 hover:shadow-md"
                placeholder="Inspire with your challenge vision..."
                required
              />
            </div>
            <div className="flex justify-between pt-4">
              <motion.button
                type="button"
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 bg-gray-200/80 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Back
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setActivePanel('dates')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
              >
                Next
              </motion.button>
            </div>
          </motion.div>

          {/* Panel 2: Dates */}
          <motion.div
            animate={{
              x: activePanel === 'dates' ? 0 : activePanel === 'basic' ? '100%' : '-100%',
              opacity: activePanel === 'dates' ? 1 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="space-y-6 min-h-[400px] absolute top-0 left-0 w-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 font-['Georgia','serif']">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 p-3 transition-all duration-300 hover:shadow-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 font-['Georgia','serif']">
                  End Date *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 p-3 transition-all duration-300 hover:shadow-md"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <motion.button
                type="button"
                onClick={() => setActivePanel('basic')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 bg-gray-200/80 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Back
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setActivePanel('details')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
              >
                Next
              </motion.button>
            </div>
          </motion.div>

          {/* Panel 3: Details */}
          <motion.div
            animate={{
              x: activePanel === 'details' ? 0 : '100%',
              opacity: activePanel === 'details' ? 1 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="space-y-6 min-h-[400px] absolute top-0 left-0 w-full"
          >
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 font-['Georgia','serif']">
                Art Categories
              </label>
              <div className="mt-1 flex">
                <input
                  type="text"
                  value={currentCategory}
                  onChange={(e) => setCurrentCategory(e.target.value)}
                  className="flex-1 rounded-l-xl border-2 border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 p-3 transition-all duration-300 hover:shadow-md"
                  placeholder="e.g., Watercolor, Sketch"
                />
                <button
                  type="button"
                  onClick={addCategory}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-r-xl hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                >
                  +
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.categories.map((category) => (
                  <motion.span
                    key={category}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 text-purple-800 dark:text-purple-200"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-200"
                    >
                      &times;
                    </button>
                  </motion.span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 font-['Georgia','serif']">
                Reward (Optional)
              </label>
              <input
                type="text"
                name="reward"
                value={formData.reward}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 p-3 transition-all duration-300 hover:shadow-md"
                placeholder="e.g., Gallery Feature, Art Supplies"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 font-['Georgia','serif'] mb-2">
                Visibility
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visibility"
                    value="community"
                    checked={formData.visibility === 'community'}
                    onChange={handleChange}
                    className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300 dark:border-gray-700"
                  />
                  <span className="ml-2 text-sm font-['Georgia','serif'] text-gray-800 dark:text-gray-200">
                    Community Only
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={formData.visibility === 'public'}
                    onChange={handleChange}
                    className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300 dark:border-gray-700"
                  />
                  <span className="ml-2 text-sm font-['Georgia','serif'] text-gray-800 dark:text-gray-200">
                    Public
                  </span>
                </label>
              </div>
            </div>
            <div className="flex justify-between pt-8">
              <motion.button
                type="button"
                onClick={() => setActivePanel('dates')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 bg-gray-200/80 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Back
              </motion.button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isSubmitting ? 'Creating...' : 'Launch Challenge'}
              </motion.button>
            </div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

export default CreateNewChallenge;