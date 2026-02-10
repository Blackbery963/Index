import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, Image as ImageIcon, Palette, Trash2, Heart, Share2, 
  MoreHorizontal, Search, Filter, ChartColumnIncreasing,
  DollarSign, ShoppingBag, Eye, ArrowUpRight, Plus, X, User,
  Trophy, Flame, TrendingUp, ArrowDownRight, Activity
} from 'lucide-react';

// --- MOCK DATA WITH GROWTH METRICS ---
const ALL_ASSETS = [
  // Artworks (Commercial)
  { 
    id: 101, title: "Abstract Blue #4", type: "artwork", price: 450, 
    views: 1205, likes: 340, revenue: 1350, 
    growth: 12.5, trend: 'up', velocity: 85, // Velocity 0-100
    src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&q=80&w=400", 
    orders: [{user: "Alice", date: "2d ago"}, {user: "Bob", date: "5d ago"}] 
  },
  { 
    id: 102, title: "Golden Age", type: "artwork", price: 890, 
    views: 980, likes: 210, revenue: 890, 
    growth: -2.4, trend: 'down', velocity: 40,
    src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400", 
    orders: [{user: "Museum X", date: "3d ago"}] 
  },
  { 
    id: 103, title: "Neon Cyberpunk", type: "artwork", price: 1200, 
    views: 2400, likes: 890, revenue: 0, 
    growth: 5.0, trend: 'up', velocity: 60,
    src: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=400", 
    orders: [] 
  },
  
  // Media (Photos/Videos)
  { id: 201, title: "Mountain Peak", type: "image", views: 15450, likes: 3200, growth: 24, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400" },
  { id: 202, title: "Process Reel", type: "video", views: 5400, likes: 1200, growth: 8, src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=400" },
  { id: 203, title: "Studio Tour", type: "video", views: 8200, likes: 2890, growth: 45, src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400" },
  { id: 204, title: "Urban Silence", type: "image", views: 670, likes: 120, growth: -5, src: "https://images.unsplash.com/photo-1449824913929-4bdd7666d730?auto=format&fit=crop&q=80&w=400" },
];

function StudioManager() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // --- DERIVED LISTS ---
  const artworks = ALL_ASSETS.filter(item => item.type === 'artwork');
  const media = ALL_ASSETS.filter(item => item.type === 'image' || item.type === 'video');

  // Totals
  const totalRevenue = artworks.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalViews = ALL_ASSETS.reduce((acc, curr) => acc + curr.views, 0);
  const totalLikes = ALL_ASSETS.reduce((acc, curr) => acc + curr.likes, 0);

  // Top Lists
  const topRevenue = [...artworks].sort((a, b) => b.revenue - a.revenue).slice(0, 3);
  const topViews = [...ALL_ASSETS].sort((a, b) => b.views - a.views).slice(0, 3);
  const topLikes = [...ALL_ASSETS].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans overflow-x-hidden">
      
      {/* Header */}
      <header className="sticky top-0 z-50 h-16 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6">
        <h1 className="font-bold text-lg lg:text-xl tracking-tight font-Eagle">Painters' Diary</h1>
        <div className="flex gap-3">
             <Link to="/Account/Dashboard" className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <ChartColumnIncreasing className="w-5 h-5" />
            </Link>
            <Link to={"/UploadPage"}>
             <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-xs font-bold hover:opacity-90 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Upload
             </button>
             </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-10">
        
        {/* --- 1. COMPACT OVERVIEW (Top Strip) --- */}
 
        <section className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
  
  {/* Mobile: horizontal scroll | Desktop: fixed grid */}
  <div className="
    flex flex-nowrap overflow-x-auto
    md:grid md:grid-cols-4 md:overflow-visible
    divide-x divide-zinc-200 dark:divide-zinc-800
    scrollbar-hide
  ">
    
    <div className="min-w-[220px] md:min-w-0">
      <OverviewItem 
        label="Total Revenue" 
        value={`$${totalRevenue.toLocaleString()}`} 
        sub="+12% this week" 
        icon={DollarSign}
      />
    </div>

    <div className="min-w-[220px] md:min-w-0">
      <OverviewItem 
        label="Total Views" 
        value={`${(totalViews / 1000).toFixed(1)}k`} 
        sub="+8.5% this week" 
        icon={Eye}
      />
    </div>

    <div className="min-w-[220px] md:min-w-0">
      <OverviewItem 
        label="Total Likes" 
        value={`${(totalLikes / 1000).toFixed(1)}k`} 
        sub="+15% this week" 
        icon={Heart}
      />
    </div>

    <div className="min-w-[220px] md:min-w-0">
      <OverviewItem 
        label="Active Assets" 
        value={ALL_ASSETS.length} 
        sub="2 pending review" 
        icon={Palette}
      />
    </div>

  </div>
</section>


        {/* --- 2. ARTWORKS (With Detailed Growth Dashboard) --- */}
        <section>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg text-purple-600"><ShoppingBag className="w-4 h-4" /></div>
                    <h2 className="text-lg font-bold">Artworks & Products</h2>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {artworks.map((item) => (
                    <div key={item.id} className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-purple-500/30 transition-all flex flex-col">
                        {/* Header Image & Info */}
                        <div className="p-3 flex gap-4 border-b border-dashed border-zinc-100 dark:border-zinc-800/50">
                            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                                <img src={item.src} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-sm truncate">{item.title}</h3>
                                    <p className="text-xs text-zinc-500">{item.orders.length} orders total</p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold text-zinc-900 dark:text-white">${item.price}</span>
                                    <button onClick={() => setSelectedArtwork(item)} className="text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded hover:bg-zinc-200 transition-colors">History</button>
                                </div>
                            </div>
                        </div>

                        {/* MINI DASHBOARD (Growth & Velocity) */}
                        <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-b-2xl flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Performance (7d)</span>
                                <span className={`text-xs font-bold flex items-center gap-1 ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {Math.abs(item.growth)}%
                                </span>
                            </div>
                            
                            {/* Velocity Bar */}
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-zinc-500">Sales Velocity</span>
                                    <span className="text-zinc-900 dark:text-white font-bold">{item.velocity}/100</span>
                                </div>
                                <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${item.velocity > 75 ? 'bg-green-500' : item.velocity > 40 ? 'bg-yellow-500' : 'bg-zinc-400'}`} 
                                        style={{ width: `${item.velocity}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* --- 3. MEDIA (Creative Gallery with Viral Score) --- */}
        <section>
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-blue-600"><ImageIcon className="w-4 h-4" /></div>
                <h2 className="text-lg font-bold">Creative Gallery</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {media.map((item) => (
                    <div key={item.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                        <img src={item.src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        
                        {/* Type Badge */}
                        <div className="absolute top-2 right-2">
                             {item.type === 'video' 
                                ? <div className="p-1.5 bg-black/60 backdrop-blur-md rounded-full"><Play className="w-3 h-3 text-white fill-white" /></div>
                                : <div className="p-1.5 bg-black/60 backdrop-blur-md rounded-full"><ImageIcon className="w-3 h-3 text-white" /></div>
                             }
                        </div>

                        {/* Growth Badge Overlay */}
                        <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold backdrop-blur-md border border-white/10 ${item.growth > 20 ? 'bg-green-500/80 text-white' : 'bg-black/60 text-zinc-300'}`}>
                            {item.growth > 0 ? '+' : ''}{item.growth}%
                        </div>
                        
                        {/* Hover Stats */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                            <h3 className="text-white font-bold text-sm truncate mb-1">{item.title}</h3>
                            <div className="grid grid-cols-2 gap-2 text-center">
                                <div className="bg-white/10 rounded p-1 backdrop-blur-sm">
                                    <p className="text-[10px] text-zinc-400">Views</p>
                                    <p className="text-xs font-bold text-white">{item.views}</p>
                                </div>
                                <div className="bg-white/10 rounded p-1 backdrop-blur-sm">
                                    <p className="text-[10px] text-zinc-400">Likes</p>
                                    <p className="text-xs font-bold text-white">{item.likes}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* --- 4. HALL OF FAME (Top Lists) --- */}
        <section>
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg text-yellow-600"><Trophy className="w-4 h-4" /></div>
                <h2 className="text-lg font-bold">Hall of Fame</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TopListCard title="Top Revenue" icon={DollarSign} color="text-green-500" data={topRevenue} renderValue={(item) => `$${item.revenue}`} />
                <TopListCard title="Most Viewed" icon={Eye} color="text-blue-500" data={topViews} renderValue={(item) => `${(item.views/1000).toFixed(1)}k`} />
                <TopListCard title="Most Liked" icon={Heart} color="text-rose-500" data={topLikes} renderValue={(item) => item.likes} />
            </div>
        </section>

      </main>

      {/* --- MODAL --- */}
      {selectedArtwork && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                    <h3 className="font-bold">Sales History</h3>
                    <button onClick={() => setSelectedArtwork(null)}><X className="w-5 h-5 text-zinc-400" /></button>
                </div>
                <div className="p-4 max-h-[50vh] overflow-y-auto space-y-3">
                    {selectedArtwork.orders.length > 0 ? selectedArtwork.orders.map((order, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center"><User className="w-4 h-4" /></div>
                            <div className="flex-1">
                                <p className="text-sm font-bold">{order.user}</p>
                                <p className="text-xs text-zinc-500">{order.date}</p>
                            </div>
                            <span className="text-sm font-bold text-green-600">+${selectedArtwork.price}</span>
                        </div>
                    )) : <p className="text-center text-zinc-500 text-sm py-4">No sales recorded yet.</p>}
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

// --- SUB COMPONENTS ---

// Compact Overview Item (Box style with borders)
function OverviewItem({ label, value, sub, icon: Icon }) {
    return (
        <div className="flex-1 p-4 flex items-center gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            </div>
            <div>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">{label}</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-lg font-bold text-zinc-900 dark:text-white leading-none">{value}</p>
                    <span className="text-[10px] text-zinc-400 font-medium">{sub}</span>
                </div>
            </div>
        </div>
    );
}

function TopListCard({ title, icon: Icon, color, data, renderValue }) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
                <Icon className={`w-4 h-4 ${color}`} />
                <h3 className="font-bold text-sm uppercase tracking-wider">{title}</h3>
            </div>
            <div className="space-y-4">
                {data.map((item, idx) => (
                    <div key={item.id} className="flex items-center gap-3">
                        <span className={`text-sm font-bold w-4 ${idx === 0 ? 'text-yellow-500' : 'text-zinc-400'}`}>#{idx + 1}</span>
                        <img src={item.src} alt="" className="w-10 h-10 rounded-lg object-cover bg-zinc-100" />
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold truncate">{item.title}</h4>
                            <p className="text-[10px] text-zinc-500 uppercase">{item.type}</p>
                        </div>
                        <span className="text-sm font-bold">{renderValue(item)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudioManager;