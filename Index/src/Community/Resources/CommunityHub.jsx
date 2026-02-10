// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import { Search, Plus, LayoutGrid, Users, Compass } from 'lucide-react';
// import CommunityFeed from './CommunityFeed'; // Adjust Path

// const CommunityHub = () => {
//   const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'my'
//   const [searchQuery, setSearchQuery] = useState('');

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
//       <ToastContainer position="bottom-right" theme="dark" />

//       {/* --- Sticky Header --- */}
//       <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            
//             {/* Logo area */}
//             <div className="flex items-center gap-6">
//                 <Link to="/" className="font-bold text-xl tracking-tight">
//                     Painters' Diary
//                 </Link>
                
//                 {/* Desktop Tabs */}
//                 <div className="hidden md:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
//                     <button 
//                         onClick={() => setActiveTab('explore')}
//                         className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'explore' ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
//                     >
//                         <Compass size={16} /> Explore
//                     </button>
//                     <button 
//                         onClick={() => setActiveTab('my')}
//                         className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'my' ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
//                     >
//                         <Users size={16} /> My Communities
//                     </button>
//                 </div>
//             </div>

//             {/* Actions: Search & Create */}
//             <div className="flex items-center gap-3 flex-1 justify-end">
//                 <div className="relative w-full max-w-md hidden sm:block">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
//                     <input 
//                         type="text" 
//                         placeholder="Find your tribe..." 
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full bg-zinc-100 dark:bg-zinc-900 border-none outline-none ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-zinc-400 dark:focus:ring-zinc-600 rounded-lg pl-10 pr-4 py-2 text-sm transition-all"
//                     />
//                 </div>
                
//                 <Link to="/community/create">
//                     <button className="flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
//                         <Plus size={16} /> <span className="hidden sm:inline">Create</span>
//                     </button>
//                 </Link>
//             </div>
//         </div>

//         {/* Mobile Tabs (Visible only on small screens) */}
//         <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 px-4 py-2 flex gap-2">
//             <button 
//                 onClick={() => setActiveTab('explore')}
//                 className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg text-sm font-medium border ${activeTab === 'explore' ? 'border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900' : 'border-transparent'}`}
//             >
//                 <Compass size={16} /> Explore
//             </button>
//             <button 
//                 onClick={() => setActiveTab('my')}
//                 className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-lg text-sm font-medium border ${activeTab === 'my' ? 'border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900' : 'border-transparent'}`}
//             >
//                 <Users size={16} /> My Comms
//             </button>
//         </div>
//       </nav>

//       {/* --- Main Content --- */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
//         {/* Mobile Search Input (Visible only on small screens) */}
//         <div className="sm:hidden mb-6 relative">
//              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
//              <input 
//                 type="text" 
//                 placeholder="Find communities..." 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-3 text-sm"
//              />
//         </div>

//         <div className="mb-6">
//             <h1 className="text-2xl font-bold tracking-tight mb-1">
//                 {activeTab === 'explore' ? 'Explore Communities' : 'My Memberships'}
//             </h1>
//             <p className="text-zinc-500 text-sm">
//                 {activeTab === 'explore' 
//                     ? 'Discover new groups, collaborate, and share your art.' 
//                     : 'Manage the communities you are a part of.'}
//             </p>
//         </div>

//         <CommunityFeed viewMode={activeTab} searchQuery={searchQuery} />
//       </main>
//     </div>
//   );
// };

// export default CommunityHub;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { 
  Search, Plus, Compass, Users, 
  TrendingUp, MoreHorizontal, Home, 
  User
} from 'lucide-react';
import Logo from "../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg"

// Components
import CommunityFeed from './CommunityFeed';
import { LeftSidebar, RightSidebar } from './Sidebars';

const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'my'
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <ToastContainer position="bottom-right" theme="dark" />

      {/* ================= NAVBAR (Logo + Search Only) ================= */}
      <nav className="fixed top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-8">
          
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center overflow-hidden">
                {/* <span className="font-bold text-white dark:text-black font-serif">P</span> */}
                <img src={Logo} alt="" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden md:block font-Eagle">Painters' Diary</span>
          </Link>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-zinc-800 dark:group-focus-within:text-zinc-200 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search communities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border-none rounded-full leading-5 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-800 transition-all sm:text-sm"
                />
            </div>
          </div>

          {/* Spacer for Right alignment (Desktop) or Mobile Menu Trigger could go here */}
          <Link to={"/account"}>
          <div className="w-8 shrink-0 md:w-auto border dark:border-zinc-600 flex items-center justify-center rounded-lg p-1">
             {/* Optional: Profile Icon could go here */}
             <User/>
          </div>
          </Link>
        </div>
      </nav>

      {/* ================= MAIN GRID LAYOUT ================= */}
      <div className="pt-20 pb-10 max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* --- LEFT COLUMN: Navigation (Hidden on Mobile) --- */}
          <div className="hidden md:block md:col-span-3 lg:col-span-2 relative">
            <div className="sticky top-24">
               <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>

          {/* --- MIDDLE COLUMN: Feed --- */}
          <div className="col-span-1 md:col-span-9 lg:col-span-7 min-h-screen">
            
            {/* Mobile Tabs (Only visible on small screens) */}
            <div className="md:hidden flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                 <button 
                    onClick={() => setActiveTab('explore')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border ${activeTab === 'explore' ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'}`}
                 >
                    Explore
                 </button>
                 <button 
                    onClick={() => setActiveTab('my')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border ${activeTab === 'my' ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'}`}
                 >
                    My Communities
                 </button>
            </div>

            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {activeTab === 'explore' ? 'Explore' : 'Your Communities'}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                    {activeTab === 'explore' ? 'Find your next favorite group.' : 'Manage your memberships.'}
                </p>
            </div>

            {/* The Feed Component */}
            <CommunityFeed viewMode={activeTab} searchQuery={searchQuery} />
          </div>

          {/* --- RIGHT COLUMN: Suggestions (Hidden on Tablet/Mobile) --- */}
          <div className="hidden lg:block lg:col-span-3 relative">
            <div className="sticky top-24">
                <RightSidebar />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CommunityHub;