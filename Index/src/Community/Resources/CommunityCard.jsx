import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, Plus } from 'lucide-react';

const CommunityCard = ({ community, isMember, onJoin }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
    >
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-4">
          {/* Icon / Image Placeholder */}
          <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white font-bold text-xl border border-zinc-200 dark:border-zinc-700">
             {community.imageUrl ? (
                <img src={community.imageUrl} alt="" className="w-full h-full object-cover rounded-lg" />
             ) : (
                community.name.charAt(0).toUpperCase()
             )}
          </div>
          
          {/* Category Tag */}
          <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400">
            {community.category || 'General'}
          </span>
        </div>

        <Link to={`/community/${community.$id}`}>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:underline decoration-zinc-400 underline-offset-4">
            {community.name}
          </h3>
        </Link>
        
        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {community.description || "No description provided."}
        </p>
      </div>

      {/* Footer Actions */}
      <div className="p-5 mt-auto flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/50 pt-4">
        <div className="flex items-center text-xs text-zinc-400 dark:text-zinc-500">
          <Users size={14} className="mr-1.5" />
          <span>{community.memberCount || 0} Members</span>
        </div>

        {isMember ? (
          <Link
            to={`/community/${community.$id}`} // Assuming slug or ID
            className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            Open <ArrowRight size={14} />
          </Link>
        ) : (
          <button
            onClick={() => onJoin(community.$id)}
            className="flex items-center gap-1.5 text-xs font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1.5 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
          >
            <Plus size={14} /> Join
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CommunityCard;