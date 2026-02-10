import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, MoreVertical, Plus } from 'lucide-react';
import StoryCreator from './StoryCreator';

const currentUser = {
  id: 0,
  name: "You",
  img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
};

const stories = [
  { id: 1, name: "alex_k", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop", unseen: true, time: "2h" },
  { id: 2, name: "sarah_m", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop", unseen: true, time: "4h" },
  { id: 3, name: "david_v", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop", unseen: false, time: "5h" },
  { id: 4, name: "elena_r", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", unseen: true, time: "6h" },
  { id: 5, name: "marcus_b", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop", unseen: false, time: "8h" },
];

const CinematicStories = () => {
  const [activeStoryId, setActiveStoryId] = useState(null);
  const activeStory = stories.find(s => s.id === activeStoryId);
  const [isCreating, setIsCreating] = useState(false); // Toggle state

  return (
    // CONTAINER: Clean Porcelain (Light) / Midnight Obsidian (Dark)
    <div className="w-full max-w-7xl mx-auto md:rounded-b-lg  to-transparent py-8 border-b border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-500">
      
      <AnimatePresence>
         {isCreating && (
            <StoryCreator onClose={() => setIsCreating(false)} />
         )}
       </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 relative">
        
        {/* HEADER: Minimal & Clean */}
        <motion.div 
          layout
          className="mb-6 flex justify-between items-end"
        >
          <h2 className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-[0.3em] font-bold opacity-80">
            {activeStoryId ? 'Now Viewing' : 'Daily Curations'}
          </h2>
        </motion.div>

        {/* --- THE MAIN STAGE (VIEWER) --- */}
        <AnimatePresence mode="wait">
          {activeStoryId && (
            <motion.div
              key="viewer"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }} // "Ease Out Quart" for smoothness
              className="w-full h-[450px] md:h-[550px] relative rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-black/20 ring-1 ring-black/5 dark:ring-white/10 bg-zinc-900"
            >
               {/* Background Image */}
               <motion.img 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src={activeStory.img} 
                  className="w-full h-full object-cover"
               />

               {/* UI OVERLAY: Clean Gradient Mesh */}
               <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 flex flex-col justify-between p-6 md:p-8">
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-full ring-2 ring-white/10 p-0.5 relative overflow-hidden">
                             <img src={activeStory.img} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-white font-medium text-sm tracking-widest uppercase shadow-black drop-shadow-md">{activeStory.name}</h3>
                            <p className="text-white/60 text-[10px] uppercase tracking-widest">{activeStory.time} ago</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                        <button className="p-2.5 bg-white/5 backdrop-blur-md rounded-full hover:bg-white/10 transition-colors border border-white/10">
                             <MoreVertical size={18} className="text-white" />
                        </button>
                        <button 
                            onClick={() => setActiveStoryId(null)}
                            className="p-2.5 bg-white/5 backdrop-blur-md rounded-full hover:bg-white/10 transition-colors border border-white/10"
                        >
                             <X size={18} className="text-white" />
                        </button>
                    </div>
                  </div>

                  {/* Progress Bars: Thinner & cleaner */}
                  <div className="absolute top-0 left-0 w-full flex gap-1 px-2 pt-2">
                     <div className="h-0.5 flex-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: "0%" }} 
                            animate={{ width: "100%" }} 
                            transition={{ duration: 5, ease: "linear" }}
                            className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
                        />
                     </div>
                     <div className="h-0.5 flex-1 bg-white/10 rounded-full" />
                     <div className="h-0.5 flex-1 bg-white/10 rounded-full" />
                  </div>

                  {/* Bottom Interaction Area */}
                  <div className="flex justify-between items-end gap-6">
                      <div className="flex-1">
                          <p className="text-white/90 text-sm md:text-lg font-light leading-relaxed max-w-xl line-clamp-2 drop-shadow-md">
                              Observing the silence of the architecture today. The light hits differently at 5PM.
                          </p>
                      </div>
                      
                      {/* Heart Button */}
                      <button className="group flex-shrink-0">
                          <div className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full group-hover:bg-white/10 transition-all">
                              <Heart size={22} className="text-white/80 group-hover:text-red-400 group-hover:fill-red-400/20 transition-all" />
                          </div>
                      </button>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* --- THE RAIL (THUMBNAILS) --- */}
        <motion.div 
            layout
            className="flex gap-4 overflow-x-auto pb-6 pt-2 hide-scrollbar snap-x snap-mandatory"
        >
          
          {/* 1. THE REFINED CREATE CARD */}
          {!activeStoryId && (
            <motion.div 
            onClick={() => setIsCreating(true)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative shrink-0 snap-start"
            >
                <div className="w-[125px] md:w-[145px] h-[185px] md:h-[215px] rounded-2xl overflow-hidden relative group cursor-pointer ring-1 ring-black/5 dark:ring-white/10">
                    
                    {/* Background: User Image (Subtle) */}
                    <img 
                      src={currentUser.img} 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:scale-105 transition-transform duration-700" 
                    />
                    
                    {/* Inner Gradient Box (The "Effect being felt") */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                        <div className="w-12 h-12 rounded-full shadow-lg shadow-black/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-90 transition-all duration-500 ease-out border border-white/20">
                            <Plus className="text-slate-700 dark:text-white" size={24} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-semibold font-Quicksand text-slate-800 dark:text-white tracking-wide z-10">Add Curations</span>
                    </div>

                    {/* Active Border Highlight */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-500/30 transition-colors pointer-events-none" />
                </div>
            </motion.div>
          )}

          {/* 2. STORY CARDS */}
          {stories.map((story, index) => {
             if (story.id === activeStoryId) return null;
             return (
                <motion.div 
                    key={story.id} 
                    layoutId={`card-${story.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setActiveStoryId(story.id)}
                    className="relative shrink-0 snap-start cursor-pointer group"
                >
                    <div className="relative  w-[125px] md:w-[145px] h-[185px] md:h-[215px] rounded-2xl overflow-hidden bg-slate-200 dark:bg-zinc-800 ring-1 ring-black/5 dark:ring-white/5 shadow-sm group-hover:shadow-xl group-hover:shadow-indigo-500/10 transition-all duration-500">
                        
                        {/* Image */}
                        <img 
                            src={story.img} 
                            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                              story.unseen ? 'scale-100 saturate-100' : 'scale-100 opacity-70 grayscale'
                            } group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100`}
                        />
                        
                        {/* Unseen Indicator (Clean & Minimal) */}
                        {story.unseen && (
                           <div className="absolute top-3 right-3">
                               <span className="relative flex h-2.5 w-2.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500 ring-2 ring-white dark:ring-black"></span>
                               </span>
                           </div>
                        )}

                        {/* Polished Glass Metadata Bar */}
                        <div className="absolute bottom-0 inset-x-0 py-3 rounded-t-md backdrop-blur-md border-t border-white/10 flex items-center justify-between px-2 transition-transform duration-300 translate-y-1 group-hover:translate-y-0">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <span className="text-[10px] text-white font-bold tracking-widest uppercase truncate">
                                    {story.name}
                                </span>
                            </div>
                            <Heart size={14} className="text-white/60 group-hover:text-red-400 transition-colors" />
                        </div>
                    </div>
                </motion.div>
             );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default CinematicStories;

