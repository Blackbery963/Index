import React from "react";
import { MdGridView } from "react-icons/md";
import { FiGrid } from "react-icons/fi";
import { Sparkles } from "lucide-react";
import { FiSlack } from 'react-icons/fi';

const CollectionHeader = ({ viewMode, setViewMode }) => {
  return (
    <div className="sticky top-0 z-40 px-1 py-2">
      <div className="
        bg-white/80 dark:bg-gray-900/80 
        backdrop-blur-xl shadow-sm 
        rounded-lg border border-white/10 dark:border-gray-700/40
        px-4 py-3
      ">
        
        <div className="flex items-center justify-between">

          {/* Left Icon */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500/70" />
          </div>

          {/* Beautiful Minimal Pill Toggle */}
          <div
            className="relative flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1"
          >
            {/* Active highlight */}
            <div
              className={`
                absolute inset-y-1 w-[47%] rounded-lg 
                bg-white dark:bg-gray-700 shadow-sm 
                transition-transform duration-300
                ${viewMode === "feed" ? "translate-x-0" : "translate-x-full"}
              `}
            />

            <button
              onClick={() => setViewMode("feed")}
              className="
                relative z-10 flex items-center gap-1.5
                w-20 justify-center py-1.5 text-xs font-medium
                text-gray-700 dark:text-gray-300
              "
            >
              <MdGridView className="w-4 h-4" />
              Feed
            </button>

            <button
              onClick={() => setViewMode("collage")}
              className="
                relative z-10 flex items-center gap-1.5
                w-20 justify-center py-1.5 text-xs font-medium
                text-gray-700 dark:text-gray-300
              "
            >
              <FiSlack className="w-4 h-4" />
              Explore
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CollectionHeader;
