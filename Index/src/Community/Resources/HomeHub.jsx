import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, Search, Plus, User, Trophy, FileText, Users, 
  Calendar, Star, Sparkles, ArrowRight, Zap, MessageSquare,
  Palette, Brush, Share2, Heart, Clock, Download, ChevronRight,
  Video, Box, Image as ImageIcon, Music,
  Blocks,
  CircleStar,
  Medal,
  UserPlus
} from 'lucide-react';
import Logo from "../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg";

// --- EXPANDED Mock Data ---
const featuredCommunities = [
  { id: 1, name: "Digital Painters", members: "12k", image: "https://images.pexels.com/photos/1988686/pexels-photo-1988686.jpeg", desc: "Daily speedpaints." },
  { id: 2, name: "Blender 3D", members: "8.5k", image: "https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg", desc: "Hard surface modeling." },
  { id: 3, name: "Inktober Forever", members: "5k", image: "https://images.pexels.com/photos/3354675/pexels-photo-3354675.jpeg", desc: "Ink drawing challenges." },
  { id: 4, name: "Traditional Oils", members: "3.2k", image: "https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg", desc: "Classic techniques." },
  { id: 5, name: "Concept Art", members: "15k", image: "https://images.pexels.com/photos/2086361/pexels-photo-2086361.jpeg", desc: "World building." },
  { id: 6, name: "Anime Club", members: "9k", image: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg", desc: "Manga styles." },
];

const activeChallenge = {
  title: "Neon Nights",
  type: "Weekly Challenge",
  timeLeft: "2 Days Remaining",
  participants: 142,
  image: "https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg"
};

const freshResources = [
  { id: 1, title: "Oil Brush Pack V2", type: "Brush", author: "Marta_K", downloads: 420, icon: Brush, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
  { id: 2, title: "Anatomy Ref Sheet", type: "PDF", author: "DocArt", downloads: 1200, icon: FileText, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
  { id: 3, title: "Lighting Tutorial", type: "Video", author: "Studio_X", downloads: 850, icon: Video, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30" },
  { id: 4, title: "Base Mesh Male", type: "3D", author: "PolyGuy", downloads: 210, icon: Box, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" },
];

const spotlightData = {
    name: "Elena Vosh",
    handle: "@elena_v",
    bio: "Digital Impressionist | 3D Sculptor",
    image: "https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    work1: "https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    work2: "https://images.pexels.com/photos/1988686/pexels-photo-1988686.jpeg"
};

const eventsData = [
    { date: "24", month: "OCT", title: "Global Sketch Meet", time: "18:00 GMT • Live" },
    { date: "02", month: "NOV", title: "Concept Art Workshop", time: "14:00 GMT • Zoom" },
];

const HomeHub = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-800">
      
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
               <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden md:block font-Eagle">Painters' Diary</span>
          </Link>

          <div className="flex-1 max-w-xl hidden sm:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-800 dark:group-focus-within:text-zinc-200" />
              <input
                type="text"
                placeholder="Search everything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-800 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors">
                <User size={18} />
             </div>
          </div>
        </div>
      </nav>

      {/* ================= MAIN GRID ================= */}
      <div className="pt-20 pb-24 md:pb-10 max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* --- LEFT SIDEBAR (Navigation & Actions) --- */}
          <div className="hidden md:block md:col-span-3 lg:col-span-2 relative">
            <div className="sticky top-24 flex flex-col gap-1">
               <SidebarItem icon={Home} label="Home" to="/" active />
               <SidebarItem icon={Users} label="Communities" to="/Community/Hub" />
               <SidebarItem icon={Medal} label="Challenges" to="/Community/Challenges/Hub" />
               <SidebarItem icon={Blocks} label="Resources" to="/Community/Resources/Hub" />
               
               <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4 mx-2" />
               
               <SidebarItem icon={Star} label="Spotlight" to="#" />
               <SidebarItem icon={UserPlus} label="Collabs" to="#" />
               <SidebarItem icon={Calendar} label="Events" to="#" />

               {/* CREATE COMMUNITY BUTTON */}
               <div className="mt-6 px-2">
                 <Link to="/community/create">
                    <button className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black py-3 rounded-xl font-bold text-sm shadow-lg shadow-zinc-200 dark:shadow-zinc-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        <Plus size={18} />
                        Create Community
                    </button>
                 </Link>
               </div>
            </div>
          </div>

          {/* --- MIDDLE COLUMN (Alive Feed) --- */}
          <div className="col-span-1 md:col-span-9 lg:col-span-7 min-h-screen space-y-8">
            
            {/* 1. HERO: Daily Inspiration */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden group shadow-sm"
            >
               <div className="relative z-10">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2 font-serif">Good Morning, Artist.</h1>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4 max-w-lg">
                    "Creativity takes courage." — Henri Matisse. <br/>
                    Ready to create something bold today?
                  </p>
                  <div className="flex gap-3">
                     <button className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-bold">
                        <Palette size={16} /> Daily Prompt
                     </button>
                  </div>
               </div>
               <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-purple-100 to-transparent dark:from-purple-900/20 rounded-bl-full pointer-events-none" />
            </motion.div>

            {/* 2. LIVE: Trending Communities */}
            <section>
               <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                     <Users size={18} className="text-blue-500" /> Trending Tribes
                  </h2>
                  <Link to="/Community/Hub" className="text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1">
                     View All <ChevronRight size={14} />
                  </Link>
               </div>
               
               <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                  {featuredCommunities.map((comm, idx) => (
                     <motion.div 
                        key={comm.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="min-w-[260px] bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors group cursor-pointer"
                     >
                        <div className="h-28 bg-zinc-200 overflow-hidden relative">
                           <img src={comm.image} alt={comm.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                           <span className="absolute bottom-2 left-3 text-white text-xs font-bold">{comm.members} Members</span>
                        </div>
                        <div className="p-3">
                           <div className="flex justify-between items-start mb-1">
                              <h3 className="font-bold text-zinc-900 dark:text-white truncate pr-2">{comm.name}</h3>
                              <button className="text-[10px] font-bold bg-zinc-900 dark:bg-white text-white dark:text-black px-3 py-1 rounded-full">Join</button>
                           </div>
                           <p className="text-xs text-zinc-500 line-clamp-1">{comm.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </section>

            {/* 3. FEATURE: Active Challenge */}
            <section>
               <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Trophy size={18} className="text-yellow-500" /> Active Challenge
               </h2>
               <Link to="/Community/Challenges/Hub">
                  <div className="relative w-full h-64 md:h-72 rounded-2xl overflow-hidden group cursor-pointer shadow-md">
                     <img src={activeChallenge.image} alt="Challenge" className="w-full h-full object-cover brightness-50 group-hover:brightness-40 transition-all duration-500 group-hover:scale-105" />
                     
                     <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider animate-pulse">Live Now</span>
                           <span className="text-xs font-medium text-zinc-300 flex items-center gap-1 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                              <Clock size={12} /> {activeChallenge.timeLeft}
                           </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{activeChallenge.title}</h3>
                        
                        <div className="flex items-center justify-between mt-2">
                           <div className="flex -space-x-2">
                              {[1,2,3,4].map(i => (
                                 <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-700"></div>
                              ))}
                              <div className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] text-white font-bold">
                                 +{activeChallenge.participants}
                              </div>
                           </div>
                           <span className="flex items-center gap-1 text-white text-sm font-bold group-hover:translate-x-1 transition-transform">
                              Join Now <ArrowRight size={16} />
                           </span>
                        </div>
                     </div>
                  </div>
               </Link>
            </section>

            {/* === MOBILE ONLY: ARTIST SPOTLIGHT (Visible lg:hidden) === */}
            <section className="lg:hidden">
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                            <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                                <Star size={18} className="text-purple-400 fill-current" /> Artist Spotlight
                            </h2>
                            <p className="text-xs text-zinc-400 mt-1">Featured Creator of the Week</p>
                        </div>
                        <button className="text-xs border border-zinc-600 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-colors">Follow</button>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <img src={spotlightData.image} className="w-16 h-16 rounded-full border-2 border-purple-500" alt="Artist" />
                        <div>
                            <h3 className="font-bold text-lg">{spotlightData.name}</h3>
                            <p className="text-sm text-zinc-400">{spotlightData.handle}</p>
                            <p className="text-xs text-zinc-500 mt-1 italic">"{spotlightData.bio}"</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 relative z-10">
                        <img src={spotlightData.work1} className="w-full h-24 object-cover rounded-lg bg-zinc-700" alt="Art 1" />
                        <img src={spotlightData.work2} className="w-full h-24 object-cover rounded-lg bg-zinc-700" alt="Art 2" />
                    </div>
                    
                    {/* Background blob */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                </div>
            </section>

            {/* 4. LIST: Fresh Resources (Rich Grid) */}
            <section>
               <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                     <FileText size={18} className="text-green-500" /> Fresh Resources
                  </h2>
                  <Link to="/Community/Resources/Hub" className="text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white">View Library</Link>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {freshResources.map(res => {
                     const Icon = res.icon;
                     return (
                        <div key={res.id} className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all cursor-pointer group shadow-sm hover:shadow-md">
                           <div className={`w-12 h-12 rounded-xl ${res.bg} flex items-center justify-center ${res.color} group-hover:scale-110 transition-transform`}>
                              <Icon size={24}/>
                           </div>
                           <div className="flex-1">
                              <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-0.5">{res.title}</h4>
                              <div className="flex items-center gap-2">
                                 <span className="text-[10px] font-bold uppercase text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{res.type}</span>
                                 <span className="text-xs text-zinc-500">• {res.downloads} dl</span>
                              </div>
                           </div>
                           <button className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                              <Download size={20} />
                           </button>
                        </div>
                     )
                  })}
               </div>
            </section>

            {/* === MOBILE ONLY: EVENTS (Visible lg:hidden) === */}
            <section className="lg:hidden">
               <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                     <Calendar size={18} className="text-pink-500" /> Events
                  </h2>
               </div>
               <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800">
                  {eventsData.map((ev, i) => (
                      <div key={i} className="flex items-center gap-4 p-4">
                          <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg text-center min-w-[60px]">
                              <span className="block text-xs font-bold text-zinc-500">{ev.month}</span>
                              <span className="block text-xl font-bold text-zinc-900 dark:text-white leading-none">{ev.date}</span>
                          </div>
                          <div className="flex-1">
                              <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{ev.title}</h4>
                              <p className="text-xs text-zinc-500">{ev.time}</p>
                          </div>
                          <button className="text-xs font-bold px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700">Join</button>
                      </div>
                  ))}
               </div>
            </section>

          </div>

          {/* --- RIGHT SIDEBAR (Desktop Only Stats/Spotlight) --- */}
          <div className="hidden lg:block lg:col-span-3 relative">
             <div className="sticky top-24 space-y-6">
                
                {/* Artist Spotlight (Sidebar Version) */}
                <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800">
                   <h3 className="font-bold text-zinc-900 dark:text-white mb-4 text-sm flex items-center gap-2">
                      <Star size={14} className="text-purple-500 fill-current" /> Artist Spotlight
                   </h3>
                   <div className="flex items-center gap-3 mb-3">
                      <img src={spotlightData.image} className="w-10 h-10 rounded-full object-cover" alt="Profile" />
                      <div>
                         <p className="font-bold text-sm">{spotlightData.name}</p>
                         <p className="text-xs text-zinc-500">{spotlightData.handle}</p>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-2 mb-3">
                      <img src={spotlightData.work1} className="h-16 w-full object-cover rounded-lg" alt="Work" />
                      <img src={spotlightData.work2} className="h-16 w-full object-cover rounded-lg" alt="Work" />
                   </div>
                   <button className="w-full py-1.5 text-xs font-bold border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                      View Profile
                   </button>
                </div>

                {/* Upcoming Events (Sidebar Version) */}
                <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800">
                   <h3 className="font-bold text-zinc-900 dark:text-white mb-3 text-sm flex items-center gap-2">
                      <Calendar size={14} /> Events
                   </h3>
                   <div className="space-y-3">
                      {eventsData.map((ev, i) => (
                        <div key={i} className="flex gap-3 items-center">
                            <div className="bg-white dark:bg-zinc-800 p-1.5 rounded text-center min-w-[40px]">
                                <span className="block text-[10px] font-bold text-zinc-500">{ev.month}</span>
                                <span className="block text-sm font-bold">{ev.date}</span>
                            </div>
                            <div>
                                <p className="text-xs font-bold hover:underline cursor-pointer">{ev.title}</p>
                                <p className="text-[10px] text-zinc-500">{ev.time}</p>
                            </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Footer */}
                <div className="text-xs text-zinc-400 px-2 leading-relaxed">
                   <p>© 2026 Painters' Diary.</p>
                   <p>Created with <Heart size={10} className="inline text-red-500"/> for Artists.</p>
                </div>

             </div>
          </div>

        </div>
      </div>

      {/* --- MOBILE BOTTOM NAV --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 pb-safe">
         <div className="flex items-center justify-around h-16">
            <Link to="/" className="p-2 text-zinc-900 dark:text-white"><Home size={24} /></Link>
            <Link to="/Community/Hub" className="p-2 text-zinc-500"><Users size={24} /></Link>
            <Link to="/community/create" className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full shadow-lg -mt-8 border-4 border-zinc-50 dark:border-black"><Plus size={24} /></Link>
            <Link to="/Community/Challenges/Hub" className="p-2 text-zinc-500"><Medal size={24} /></Link>
            <Link to="/account" className="p-2 text-zinc-500"><Blocks size={24} /></Link>
         </div>
      </div>

    </div>
  );
};

// --- SUB-COMPONENT ---
const SidebarItem = ({ icon: Icon, label, to, active }) => (
    <Link to={to}>
        <div className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${active ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}>
            <Icon size={20} />
            <span className="text-sm">{label}</span>
        </div>
    </Link>
);

export default HomeHub;