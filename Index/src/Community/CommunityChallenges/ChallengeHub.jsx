import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Search, User, Trophy, Bell,
  Clock, Users, CheckCircle2, Target, ArrowRight, Zap
} from 'lucide-react';
// Replace with your actual logo
import Logo from "../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg";
import { Toaster, toast } from 'sonner';

// --- Mock Data ---
const ALL_CHALLENGES = [
  { 
    id: 1, 
    category: 'individual', 
    title: "Neon Cityscapes", 
    description: "Explore the vibrant aesthetics of cyberpunk cities. Focus on lighting, reflections, and futuristic architecture in a night setting.",
    host: "Painters' Official", 
    image: "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg", 
    participants: 1240, 
    daysLeft: 5, 
    status: 'live',
    prize: "$500 Cash",
    tags: ["Environment", "Cyberpunk"]
  },
  { 
    id: 2, 
    category: 'individual', 
    title: "Anatomy of Hands", 
    description: "A technical study focusing on the complexity of human hands. Submit sketches or rendered paintings showing various poses.",
    host: "Art School Daily", 
    image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg", 
    participants: 89, 
    daysLeft: 2, 
    status: 'live',
    prize: "Pro Brush Pack",
    tags: ["Study", "Anatomy"]
  },
  { 
    id: 3, 
    category: 'community', 
    communityName: "Pixel Wizards",
    isMember: true,
    title: "8-Bit Nostalgia", 
    description: "Create a scene from a childhood memory using only 8-bit pixel art techniques. Restricted palette applies.",
    image: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg", 
    participants: 45, 
    daysLeft: 10, 
    status: 'upcoming',
    prize: "Badge",
    tags: ["Pixel Art", "Retro"]
  },
  { 
    id: 5, 
    category: 'individual', 
    title: "Character Design: Villain", 
    description: "Design a compelling antagonist. We are looking for unique silhouettes and storytelling elements in the costume design.",
    host: "Painters' Official", 
    image: "https://images.pexels.com/photos/261403/pexels-photo-261403.jpeg", 
    participants: 3500, 
    daysLeft: 15, 
    status: 'upcoming',
    prize: "Wacom Tablet",
    tags: ["Character", "Concept"]
  }
];

const ChallengesHub = () => {
  const [viewMode, setViewMode] = useState('individual');
  const [searchQuery, setSearchQuery] = useState('');
  const [joinedChallenges, setJoinedChallenges] = useState([]);
  const [notifiedChallenges, setNotifiedChallenges] = useState([]);

  useEffect(() => {
    const cached = localStorage.getItem('joinedChallenges');
    if (cached) {
      setJoinedChallenges(JSON.parse(cached));
    }
  }, []);

  // const handleJoin = (challenge) => {
  //   if (joinedChallenges.some(c => c.id === challenge.id)) {
  //     toast.info("You have already joined this challenge!");
  //     return;
  //   }
  //   const newJoinedList = [...joinedChallenges, { ...challenge, joinDate: new Date().toISOString(), status: 'joined' }];
  //   setJoinedChallenges(newJoinedList);
  //   localStorage.setItem('joinedChallenges', JSON.stringify(newJoinedList));
  //   toast.success("Joined! Check 'My Entries' to submit your work.");
  // };

  const handleJoin = (challenge) => {
    if (joinedChallenges.some(c => c.id === challenge.id)) {
      // Info Toast
      toast.info("Already Joined", {
        description: "You are already a participant in this challenge.",
      });
      return;
    }

    const newJoinedList = [...joinedChallenges, { ...challenge, joinDate: new Date().toISOString(), status: 'joined' }];
    setJoinedChallenges(newJoinedList);
    localStorage.setItem('joinedChallenges', JSON.stringify(newJoinedList));

    // Success Toast with Premium Look
    toast.success("Challenge Accepted!", {
      description: `You have joined "${challenge.title}". Good luck!`,
      action: {
        label: "View Entries",
        onClick: () => navigate('/Community/Challenges/MyEntries'), // Make sure to import useNavigate
      },
    });
};

  // const toggleNotify = (id) => {
  //   if (notifiedChallenges.includes(id)) {
  //     setNotifiedChallenges(prev => prev.filter(cId => cId !== id));
  //     toast.info("Notifications turned off.");
  //   } else {
  //     setNotifiedChallenges(prev => [...prev, id]);
  //     toast.success("We will notify you when this starts!");
  //   }
  // };
  const toggleNotify = (id) => {
    if (notifiedChallenges.includes(id)) {
      setNotifiedChallenges(prev => prev.filter(cId => cId !== id));
      toast("Notifications Muted", {
        description: "We won't send you alerts for this challenge.",
        icon: <Bell size={16} className="text-zinc-400"/>
      });
    } else {
      setNotifiedChallenges(prev => [...prev, id]);
      toast.success("We'll notify you!", {
        description: "You'll get an alert when this challenge goes live.",
        duration: 4000, // stays for 4 seconds
      });
    }
};

  const filteredChallenges = ALL_CHALLENGES.filter(item => {
    return item.category === viewMode && item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-100">
      {/* <ToastContainer position="bottom-right" theme="dark" /> */}
      <Toaster 
      position="bottom-right" 
      richColors 
      theme="system" // or force "dark" if you want
      toastOptions={{
        classNames: {
          toast: 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-xl p-4 gap-4',
          title: 'text-zinc-900 dark:text-zinc-100 font-bold text-sm',
          description: 'text-zinc-500 dark:text-zinc-400 text-xs',
          actionButton: 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900',
          cancelButton: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400',
        },
      }}
    />

      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 h-16 px-4 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-zinc-200 overflow-hidden"><img src={Logo} className="w-full h-full object-cover"/></div>
            <span className="font-bold font-Eagle hidden md:block">Painters' Diary</span>
         </div>
         <div className="flex items-center gap-4">
            <Link to="/Community/Challenges/MyEntries" className="text-sm font-bold text-zinc-500 hover:text-black dark:hover:text-white">My Entries</Link>
            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center"><User size={16}/></div>
         </div>
      </nav>

      <div className="pt-24 pb-20 max-w-[1600px] mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* SIDEBAR */}
          <div className="hidden md:block md:col-span-3 lg:col-span-2 space-y-2 sticky top-24 h-fit">
               <Link to="/" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl"><Home size={20}/> Home</Link>
               <Link to="/Community/Challenges/Hub" className="flex items-center gap-3 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 font-bold rounded-xl"><Trophy size={20}/> Challenges</Link>
               <Link to="/Community/Challenges/MyEntries" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl"><Target size={20}/> My Entries</Link>
          </div>

          {/* MAIN FEED */}
          <div className="col-span-1 md:col-span-9 lg:col-span-7">
            <div className="flex justify-between items-center mb-6">
               <h1 className="text-2xl font-bold">Challenge Hub</h1>
               <div className="flex bg-zinc-200 dark:bg-zinc-900 rounded-lg p-1">
                  <button onClick={() => setViewMode('individual')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${viewMode === 'individual' ? 'bg-white dark:bg-zinc-800 shadow text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>Individual</button>
                  <button onClick={() => setViewMode('community')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${viewMode === 'community' ? 'bg-white dark:bg-zinc-800 shadow text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>Community</button>
               </div>
            </div>

            {/* FEED GRID */}
            <div className="flex flex-col gap-4">
               {filteredChallenges.map(item => (
                 <ChallengeCard 
                    key={item.id} 
                    item={item} 
                    onJoin={() => handleJoin(item)}
                    isJoined={joinedChallenges.some(c => c.id === item.id)}
                    isNotified={notifiedChallenges.includes(item.id)}
                    onNotify={() => toggleNotify(item.id)}
                 />
               ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24 h-fit">
             <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-bold mb-4">Top Artists</h3>
                {[1,2,3].map(i => <div key={i} className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded mb-2 w-full animate-pulse"/>)}
             </div>
          </div>
      </div>
    </div>
  );
};

// --- RECTANGULAR CARD (Consistent on Mobile & Desktop) ---
const ChallengeCard = ({ item, onJoin, isJoined, isNotified, onNotify }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    // Fixed height: 160px on mobile, 200px on desktop
    // Flex-row: Keeps image on left, text on right ALWAYS
    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-row h-[160px] sm:h-[220px] group w-full"
  >
    {/* IMAGE SECTION */}
    {/* Width is fixed: 110px on mobile, 220px on desktop. */}
    <div className="w-[110px] sm:w-[220px] shrink-0 relative h-full bg-zinc-100 dark:bg-zinc-800 border-r border-zinc-100 dark:border-zinc-800">
      <img src={item.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      
      {/* Badges (Smaller on mobile) */}
      <div className="absolute top-2 left-2 flex gap-1">
         {item.status === 'live' && (
           <span className="bg-red-500/90 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider backdrop-blur-md">
             Live
           </span>
         )}
         {item.status === 'upcoming' && (
           <span className="bg-blue-500/90 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider backdrop-blur-md">
             Soon
           </span>
         )}
      </div>
    </div>

    {/* CONTENT SECTION */}
    <div className="flex-1 p-3 sm:p-5 flex flex-col justify-between h-full relative overflow-hidden">
      <div>
         {/* Top Row: Host & Prize */}
         <div className="flex justify-between items-start mb-1 sm:mb-2">
            <span className="text-[10px] sm:text-xs font-bold text-zinc-400 dark:text-zinc-500 truncate pr-2 flex items-center gap-1">
               <Zap size={10} className="sm:hidden" />
               {item.host || item.communityName}
            </span>
            {/* Prize Badge */}
            <span className="shrink-0 text-[10px] sm:text-xs font-bold text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded whitespace-nowrap">
               {item.prize}
            </span>
         </div>

         {/* Title (Clamped to 1 line on mobile, 2 on desktop) */}
         <h3 className="font-bold text-sm sm:text-lg text-zinc-900 dark:text-white leading-tight mb-1 line-clamp-1 sm:line-clamp-2">
            {item.title}
         </h3>

         {/* Description (Clamped heavily on mobile) */}
         <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed line-clamp-2 sm:line-clamp-3">
            {item.description}
         </p>
      </div>

      {/* Footer Row */}
      <div className="mt-auto pt-2 sm:pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
         {/* Stats */}
         <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-zinc-500 font-medium">
            <span className="flex items-center gap-1">
                <Clock size={12} className="sm:w-3.5 sm:h-3.5"/> {item.daysLeft}d left
            </span>
            <span className="hidden sm:flex items-center gap-1">
                <Users size={12} className="sm:w-3.5 sm:h-3.5"/> {item.participants}
            </span>
         </div>

         {/* Action Button (Icon only on tiny screens, Text on regular mobile) */}
         {item.status === 'upcoming' ? (
             <button 
               onClick={onNotify}
               className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all border ${isNotified ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white' : 'bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-600'}`}
             >
                <Bell size={12} className={isNotified ? 'fill-current' : ''} /> 
                <span className="hidden xs:inline">{isNotified ? 'On' : 'Notify'}</span>
             </button>
         ) : (
            isJoined ? (
               <Link to="/Community/Challenges/MyEntries" className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold">
                  <CheckCircle2 size={12} className="text-green-500" /> Joined
               </Link>
            ) : (
              <button 
                  onClick={onJoin}
                  className="bg-black dark:bg-white text-white dark:text-black px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold hover:opacity-90 transition-transform active:scale-95 flex items-center gap-1"
              >
                  Join <ArrowRight size={12} className="hidden sm:inline" />
              </button>
            )
         )}
      </div>
    </div>
  </motion.div>
);

export default ChallengesHub;