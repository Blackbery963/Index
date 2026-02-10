import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Users, Plus, TrendingUp, Home, Hash, MoreHorizontal } from 'lucide-react';

// --- LEFT SIDEBAR (Navigation) ---
export const LeftSidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'my', label: 'My Communities', icon: Users },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Link to="/">
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors font-medium text-lg">
          <Home size={24} />
          <span>Home</span>
        </button>
      </Link>

      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;
        
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-lg ${
              isActive
                ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span>{item.label}</span>
          </button>
        );
      })}

      <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4 mx-4" />

      <Link to="/community/create">
        <button className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3.5 rounded-full font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-zinc-200 dark:shadow-zinc-900">
           <Plus size={24} />
           <span>Create</span>
        </button>
      </Link>
    </div>
  );
};

// --- RIGHT SIDEBAR (Suggestions/Trending) ---
export const RightSidebar = () => {
  // Mock data for visual structure
  const trendingTopics = [
    { tag: 'DigitalArt', posts: '12.5k' },
    { tag: 'OilPainting', posts: '8.2k' },
    { tag: 'Sketchbook', posts: '5.1k' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Box 1: Trending Topics */}
      <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">
        <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp size={20} /> Trending
        </h3>
        <div className="space-y-4">
            {trendingTopics.map((topic, i) => (
                <div key={i} className="flex justify-between items-center group cursor-pointer">
                    <div>
                        <p className="font-semibold text-zinc-700 dark:text-zinc-200 text-sm group-hover:underline">#{topic.tag}</p>
                        <p className="text-xs text-zinc-400">{topic.posts} posts</p>
                    </div>
                    <MoreHorizontal size={16} className="text-zinc-300" />
                </div>
            ))}
        </div>
      </div>

      {/* Box 2: Suggested Community (Mock) */}
      <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">
        <h3 className="font-bold text-zinc-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Suggested</h3>
        
        <div className="flex gap-3 items-center mb-3">
             <div className="w-10 h-10 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center font-bold">A</div>
             <div className="flex-1 overflow-hidden">
                <h4 className="font-bold text-sm truncate">Abstract Minds</h4>
                <p className="text-xs text-zinc-500 truncate">For abstract lovers</p>
             </div>
             <button className="p-1.5 rounded-full border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-800">
                <Plus size={14} />
             </button>
        </div>
         <div className="flex gap-3 items-center">
             <div className="w-10 h-10 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center font-bold">P</div>
             <div className="flex-1 overflow-hidden">
                <h4 className="font-bold text-sm truncate">Portrait Club</h4>
                <p className="text-xs text-zinc-500 truncate">Daily challenges</p>
             </div>
             <button className="p-1.5 rounded-full border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-800">
                <Plus size={14} />
             </button>
        </div>
      </div>

      <div className="text-xs text-zinc-400 px-2 leading-relaxed">
        © 2024 Painters' Diary. <br/>
        <span className="hover:underline cursor-pointer">Privacy</span> · <span className="hover:underline cursor-pointer">Terms</span> · <span className="hover:underline cursor-pointer">Cookies</span>
      </div>

    </div>
  );
};