import { motion } from 'framer-motion';

const FilterButtons = ({ filter, setFilter, filteredMedia }) => {
  const filterOptions = [
    { 
      key: 'all', 
      label: 'All', 
      description: 'All content',
      icon: '🔄'
    },
    { 
      key: 'user', 
      label: 'Users', 
      description: 'User uploads only',
      icon: '👤'
    },
    { 
      key: 'featured', 
      label: 'Featured', 
      description: 'Pexels content',
      icon: '⭐'
    },
    { 
      key: 'videos', 
      label: 'Videos', 
      description: 'Videos only',
      icon: '🎥'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div 
      className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 shadow-sm"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-3">
          {filterOptions.map((option) => (
            <motion.button
              key={option.key}
              onClick={() => setFilter(option.key)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
                transition-all duration-200 border transform hover:scale-105
                ${filter === option.key
                  ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                }
              `}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-base">{option.icon}</span>
              <span>{option.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Active Filter Info and Stats */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600 dark:text-gray-400"
          variants={itemVariants}
        >
          <div className="text-center">
            <span className="font-semibold text-green-600 dark:text-green-400">
              {filteredMedia.length}
            </span>{' '}
            items total
          </div>
          
          <div className="text-center">
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {filteredMedia.filter(item => item.type === 'video').length}
            </span>{' '}
            videos
          </div>
          
          <div className="text-center">
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {filteredMedia.filter(item => item.isFeatured).length}
            </span>{' '}
            featured
          </div>
          
          <div className="text-center">
            <span className="font-semibold text-orange-600 dark:text-orange-400">
              {filteredMedia.filter(item => !item.isFeatured).length}
            </span>{' '}
            user uploads
          </div>

          {/* Active Filter Description */}
          <div className="text-center px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
            {filterOptions.find(opt => opt.key === filter)?.description}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FilterButtons;
