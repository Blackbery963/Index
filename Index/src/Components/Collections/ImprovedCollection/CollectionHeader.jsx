import React from 'react';
import { List, Grid3X3, Sparkles } from 'lucide-react';
import { MdGridView } from 'react-icons/md';
import { FiSlack } from 'react-icons/fi';

const CollectionHeader = ({ viewMode, setViewMode }) => {
  return (
    <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl border-b border-gray-200 dark:border-gray-80 mb-6">
      <div className="px-4 py-3 rounded-lg">
        <div className="flex items-center justify-between">
          
          {/* Title */}
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-500" />
            {/* <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Discover
            </h1> */}
          </div>

          {/* Simple Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('feed')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'feed'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {/* <List className="w-4 h-4" /> */}
              <MdGridView className=" w-4 h-4"/>
              Feed
            </button>
            <button
              onClick={() => setViewMode('collage')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'collage'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <FiSlack className="w-4 h-4" />
              Discover
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CollectionHeader;
