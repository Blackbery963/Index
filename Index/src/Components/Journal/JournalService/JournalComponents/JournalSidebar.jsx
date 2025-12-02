import React from "react";
import { Link } from "react-router-dom";
import { Plus, Compass, HousePlus } from "lucide-react";
import { motion } from "framer-motion";

const JournalSidebar = ({ activeTab, setActiveTab, currentUser, diaries }) => {
  
  // Calculate stats purely for display
  const userEntriesCount = currentUser ? diaries.filter(d => d.userId === currentUser.$id).length : 0;
  const totalLikes = currentUser ? diaries.filter(d => d.userId === currentUser.$id).reduce((sum, d) => sum + d.likes, 0) : 0;

  return (
    <aside className="
      lg:w-64 lg:flex-shrink-0 
      sticky top-16 z-30 lg:z-0 lg:static
      bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm lg:bg-transparent
      border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-zinc-800
    ">
      <div className="p-2 lg:p-6 lg:sticky lg:top-20 space-y-0 lg:space-y-6 flex lg:flex-col items-center lg:items-stretch gap-2 overflow-x-auto no-scrollbar">
        
        {/* Create Button */}
        <Link to="/diary" className="flex-shrink-0">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="lg:w-full py-2 px-4 lg:py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden lg:inline">New Entry</span>
          </motion.button>
        </Link>

        {/* Stats (Desktop Only) */}
        {currentUser && (
          <div className="hidden lg:block p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Your Journey</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-600 dark:text-zinc-400">Entries</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{userEntriesCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-zinc-400">Appreciation</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{totalLikes}</span>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <nav className="flex lg:flex-col gap-1 flex-1">
          <TabButton 
            isActive={activeTab === "explore"} 
            onClick={() => setActiveTab("explore")} 
            icon={<Compass className="w-5 h-5" />} 
            label="Explore" 
          />
          {currentUser && (
            <TabButton 
              isActive={activeTab === "my_journals"} 
              onClick={() => setActiveTab("my_journals")} 
              icon={<HousePlus className="w-5 h-5" />} 
              label="My Journals" 
            />
          )}
        </nav>

      </div>
    </aside>
  );
};

const TabButton = ({ isActive, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`
      flex items-center gap-2 lg:gap-3 px-4 py-2 lg:py-3 rounded-full lg:rounded-xl transition-all duration-200 group whitespace-nowrap
      ${isActive 
        ? "bg-emerald-50 dark:bg-zinc-900/80 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 font-semibold" 
        : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/50 border border-transparent font-medium"}
    `}
  >
    {React.cloneElement(icon, { className: `w-4 h-4 lg:w-5 lg:h-5` })}
    <span className="text-sm lg:text-base">{label}</span>
  </button>
);

export default JournalSidebar;