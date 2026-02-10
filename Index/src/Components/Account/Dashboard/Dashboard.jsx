// // // import React, { useState } from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { 
// // //   AreaChart, 
// // //   Area, 
// // //   XAxis, 
// // //   YAxis, 
// // //   CartesianGrid, 
// // //   Tooltip, 
// // //   ResponsiveContainer 
// // // } from 'recharts';
// // // import { 
// // //   TrendingUp, 
// // //   Users, 
// // //   DollarSign, 
// // //   Eye, 
// // //   Play, 
// // //   Image as ImageIcon, 
// // //   Palette, 
// // //   User, 
// // //   Bell, 
// // //   ChevronRight,
// // //   ShoppingBag,
// // //   Package,
// // //   ArrowUpRight,
// // //   ArrowDownRight
// // // } from 'lucide-react';

// // // // --- Mock Data ---

// // // const CHART_DATA = [
// // //   { name: 'Mon', revenue: 2400, views: 4000, followers: 20 },
// // //   { name: 'Tue', revenue: 1398, views: 3000, followers: 45 },
// // //   { name: 'Wed', revenue: 9800, views: 2000, followers: 80 },
// // //   { name: 'Thu', revenue: 3908, views: 2780, followers: 35 },
// // //   { name: 'Fri', revenue: 4800, views: 1890, followers: 12 },
// // //   { name: 'Sat', revenue: 3800, views: 2390, followers: 60 },
// // //   { name: 'Sun', revenue: 4300, views: 3490, followers: 55 },
// // // ];

// // // const UPLOAD_STATS = [
// // //     { label: "Artworks", count: 86, icon: Palette, color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20" },
// // //     { label: "Images", count: 324, icon: ImageIcon, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20" },
// // //     { label: "Videos", count: 42, icon: Play, color: "text-pink-600 bg-pink-100 dark:bg-pink-900/20" },
// // // ];

// // // const TOP_SELLING = [
// // //   {
// // //     id: 1,
// // //     title: "Monochromatic Dreams",
// // //     type: "Artwork",
// // //     sold: 45,
// // //     revenue: "$2,250",
// // //     image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&q=80&w=100"
// // //   },
// // //   {
// // //     id: 2,
// // //     title: "Urban Decay Pack",
// // //     type: "Asset",
// // //     sold: 128,
// // //     revenue: "$1,280",
// // //     image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=100"
// // //   },
// // // ];

// // // const TOP_VIEWED = [
// // //   {
// // //     id: 1,
// // //     title: "Ink Flow Process",
// // //     type: "Video",
// // //     views: "45.2k",
// // //     engagement: "8.4%",
// // //     image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=100"
// // //   },
// // //   {
// // //     id: 2,
// // //     title: "Sunset over Alipurduar",
// // //     type: "Image",
// // //     views: "12.5k",
// // //     engagement: "12%",
// // //     image: "https://images.unsplash.com/photo-1579783902614-a3fb392796a5?auto=format&fit=crop&q=80&w=100"
// // //   },
// // // ];

// // // const KPIS = [
// // //     { title: "Total Revenue", value: "$12,450", change: "+12%", icon: DollarSign, positive: true },
// // //     { title: "Total Orders", value: "156", change: "+8", icon: ShoppingBag, positive: true },
// // //     { title: "Items Sold", value: "342", change: "+24", icon: Package, positive: true },
// // //     { title: "Total Views", value: "45.2k", change: "+8.1%", icon: Eye, positive: true },
// // //     { title: "Followers", value: "2,890", change: "+124", icon: Users, positive: true },
// // //     { title: "Engagement", value: "4.3%", change: "-0.5%", icon: TrendingUp, positive: false },
// // // ];

// // // function Dashboard() {
// // //   const [activeChartTab, setActiveChartTab] = useState('revenue');

// // //   // Chart Config
// // //   const chartConfig = {
// // //     revenue: { color: '#18181b', darkColor: '#ffffff', gradient: 'colorRevenue' },
// // //     views: { color: '#3b82f6', darkColor: '#60a5fa', gradient: 'colorViews' },
// // //     followers: { color: '#8b5cf6', darkColor: '#a78bfa', gradient: 'colorFollowers' },
// // //   };
// // //   const currentConfig = chartConfig[activeChartTab];

// // //   return (
// // //     <div className="min-h-screen w-full bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300 overflow-x-hidden">
      
// // //       {/* --- Header --- */}
// // //       <header className="fixed top-0 inset-x-0 z-50 h-16 px-6 md:px-12 flex items-center justify-between 
// // //         bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md 
// // //         border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
        
// // //         <Link to="/" className="group">
// // //           <h1 className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-white font-Eagle">
// // //             Painters' Diary
// // //           </h1>
// // //         </Link>

// // //         <div className="flex items-center gap-6">
// // //           <button className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
// // //             <Bell className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
// // //             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black"></span>
// // //           </button>
// // //           <div>
// // //             <ShoppingBag size={20} className=' text-zinc-500'/>
// // //           </div>
// // //           <Link to={"/UploadPage"}>
// // //           <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-300 dark:border-zinc-700">
// // //              <User className="w-4 h-4 text-zinc-500" />
// // //           </div>
// // //           </Link>
// // //         </div>
// // //       </header>

// // //       {/* --- Main Content --- */}
// // //       <main className="pt-20 pb-24 max-w-6xl mx-auto space-y-8">
        
// // //         {/* 1. Overview Header */}
// // //         <div className="px-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
// // //             <div>
// // //                 <h2 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-white">Business Overview</h2>
// // //                 <p className="text-xs text-zinc-500 mt-1">Updates calculated every 24 hours.</p>
// // //             </div>
// // //             <select className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none w-full md:w-auto shadow-sm">
// // //                 <option>Last 7 Days</option>
// // //                 <option>Last 30 Days</option>
// // //                 <option>This Year</option>
// // //             </select>
// // //         </div>

// // //         {/* 2. Horizontal Scrollable KPIs (Expanded) */}
// // //         <div className="w-full overflow-x-auto px-4 pb-2 scrollbar-hide">
// // //             <div className="flex gap-3 w-max md:w-full md:grid md:grid-cols-3 lg:grid-cols-6">
// // //                 {KPIS.map((kpi, idx) => (
// // //                     <div key={idx} className="min-w-[150px] md:min-w-0 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
// // //                         <div className="flex items-start justify-between mb-3">
// // //                             <kpi.icon className="w-4 h-4 text-zinc-400" />
// // //                             <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${kpi.positive ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'}`}>
// // //                                 {kpi.positive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
// // //                                 {kpi.change}
// // //                             </span>
// // //                         </div>
// // //                         <div>
// // //                             <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">{kpi.title}</p>
// // //                             <p className="text-xl font-bold text-zinc-900 dark:text-white mt-0.5">{kpi.value}</p>
// // //                         </div>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //         </div>

// // //         {/* 3. Content Inventory (Upload Stats) */}
// // //         <div className="px-4">
// // //            <h3 className="font-semibold text-zinc-900 dark:text-white text-sm mb-3">Gallery Inventory</h3>
// // //            <div className="grid grid-cols-3 gap-3">
// // //               {UPLOAD_STATS.map((stat, idx) => (
// // //                   <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center text-center gap-2">
// // //                       <div className={`p-2 rounded-full ${stat.color}`}>
// // //                           <stat.icon className="w-5 h-5" />
// // //                       </div>
// // //                       <div>
// // //                         <span className="block text-xl font-bold text-zinc-900 dark:text-white">{stat.count}</span>
// // //                         <span className="text-[10px] uppercase tracking-wider text-zinc-500">{stat.label}</span>
// // //                       </div>
// // //                   </div>
// // //               ))}
// // //            </div>
// // //         </div>

// // //         {/* 4. Analytics Chart */}
// // //         <div className="px-4">
// // //             <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
// // //                 <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
// // //                     <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">Performance Graph</h3>
// // //                     <div className="flex p-1 bg-zinc-100 dark:bg-zinc-950 rounded-lg self-start sm:self-auto">
// // //                         {['revenue', 'views', 'followers'].map((tab) => (
// // //                             <button
// // //                                 key={tab}
// // //                                 onClick={() => setActiveChartTab(tab)}
// // //                                 className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${
// // //                                     activeChartTab === tab 
// // //                                     ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' 
// // //                                     : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
// // //                                 }`}
// // //                             >
// // //                                 {tab}
// // //                             </button>
// // //                         ))}
// // //                     </div>
// // //                 </div>
// // //                 <div className="h-[250px] w-full p-4">
// // //                     <ResponsiveContainer width="100%" height="100%">
// // //                         <AreaChart data={CHART_DATA}>
// // //                             <defs>
// // //                                 <linearGradient id={currentConfig.gradient} x1="0" y1="0" x2="0" y2="1">
// // //                                     <stop offset="5%" stopColor={currentConfig.color} stopOpacity={0.1}/>
// // //                                     <stop offset="95%" stopColor={currentConfig.color} stopOpacity={0}/>
// // //                                 </linearGradient>
// // //                             </defs>
// // //                             <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} opacity={0.3} />
// // //                             <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 10}} dy={10} />
// // //                             <YAxis axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 10}} width={30} />
// // //                             <Tooltip 
// // //                                 contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
// // //                                 itemStyle={{ color: '#fff', textTransform: 'capitalize' }}
// // //                                 cursor={{ stroke: '#a1a1aa', strokeWidth: 1, strokeDasharray: '4 4' }}
// // //                             />
// // //                             <Area type="monotone" dataKey={activeChartTab} stroke={currentConfig.color} strokeWidth={2} fill={`url(#${currentConfig.gradient})`} animationDuration={1000} />
// // //                         </AreaChart>
// // //                     </ResponsiveContainer>
// // //                 </div>
// // //             </div>
// // //         </div>

// // //         {/* 5. Split Section: Top Selling & Top Viewed */}
// // //         <div className="px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
            
// // //             {/* Best Sellers */}
// // //             <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
// // //                 <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
// // //                     <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">Best Selling</h3>
// // //                     <Link to="/orders" className="text-xs text-blue-500 hover:underline">View Sales</Link>
// // //                 </div>
// // //                 <div>
// // //                     {TOP_SELLING.map((item) => (
// // //                         <div key={item.id} className="flex items-center gap-3 p-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
// // //                             <img src={item.image} alt={item.title} className="w-10 h-10 rounded-md object-cover bg-zinc-100" />
// // //                             <div className="flex-1 min-w-0">
// // //                                 <h4 className="text-sm font-medium text-zinc-900 dark:text-white truncate">{item.title}</h4>
// // //                                 <p className="text-xs text-zinc-500">{item.sold} sold</p>
// // //                             </div>
// // //                             <span className="text-sm font-bold text-zinc-900 dark:text-white">{item.revenue}</span>
// // //                         </div>
// // //                     ))}
// // //                 </div>
// // //             </div>

// // //             {/* Most Viewed */}
// // //             <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
// // //                 <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
// // //                     <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">Most Viewed</h3>
// // //                     <Link to="/artworks" className="text-xs text-blue-500 hover:underline">View Gallery</Link>
// // //                 </div>
// // //                 <div>
// // //                     {TOP_VIEWED.map((item) => (
// // //                         <div key={item.id} className="flex items-center gap-3 p-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
// // //                             <img src={item.image} alt={item.title} className="w-10 h-10 rounded-md object-cover bg-zinc-100" />
// // //                             <div className="flex-1 min-w-0">
// // //                                 <h4 className="text-sm font-medium text-zinc-900 dark:text-white truncate">{item.title}</h4>
// // //                                 <p className="text-xs text-zinc-500">{item.engagement} engagement</p>
// // //                             </div>
// // //                             <span className="text-sm font-bold text-zinc-900 dark:text-white">{item.views}</span>
// // //                         </div>
// // //                     ))}
// // //                 </div>
// // //             </div>

// // //         </div>
        
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // // Helper for Bottom Nav
// // // const NavIcon = ({ icon: Icon, active }) => (
// // //     <button className={`p-2 rounded-lg transition-colors ${active ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}>
// // //         <Icon className="w-6 h-6" />
// // //     </button>
// // // );

// // // export default Dashboard;




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, Users, DollarSign, Eye, ShoppingBag, Package, 
  ArrowUpRight, ArrowDownRight, Bell, Zap, ChevronRight, 
  Heart, CheckCircle2, Circle, MoreHorizontal,
  LayoutGrid, Image as ImageIcon, Video, Layers,
  SlidersHorizontal
} from 'lucide-react';
import Logo from "../../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg"

// import { Link } from 'react-router-dom';

// --- MOCK DATA ---

const CHART_DATA = [
  { name: 'Mon', revenue: 2400, views: 4000, traffic: 1200, followers: 12 },
  { name: 'Tue', revenue: 1398, views: 3000, traffic: 900, followers: 8 },
  { name: 'Wed', revenue: 9800, views: 2000, traffic: 2800, followers: 45 },
  { name: 'Thu', revenue: 3908, views: 2780, traffic: 1500, followers: 18 },
  { name: 'Fri', revenue: 4800, views: 1890, traffic: 2100, followers: 24 },
  { name: 'Sat', revenue: 3800, views: 2390, traffic: 1700, followers: 30 },
  { name: 'Sun', revenue: 4300, views: 3490, traffic: 2400, followers: 35 },
];

const KPIS = [
    { id: 1, title: "Total Revenue", value: "$12,450", change: "+12.5%", icon: DollarSign, positive: true, note: "vs last week" },
    { id: 2, title: "Total Traffic", value: "82.3k", change: "+8.1%", icon: Zap, positive: true, note: "unique visitors" },
    { id: 3, title: "Followers", value: "2,890", change: "+124", icon: Users, positive: true, note: "new community" },
    { id: 4, title: "Engagement", value: "4.3%", change: "-0.5%", icon: TrendingUp, positive: false, note: "avg interaction" },
];

const RECENT_ACTIVITY = [
  { id: 1, user: "Alice M.", action: "purchased", target: "Monochromatic Dreams", time: "10m", icon: ShoppingBag, color: "text-emerald-500 bg-emerald-500/10" },
  { id: 2, user: "Bob D.", action: "started following", target: "", time: "25m", icon: Users, color: "text-blue-500 bg-blue-500/10" },
  { id: 3, user: "Sarah K.", action: "liked", target: "Ink Flow Process", time: "1h", icon: Heart, color: "text-rose-500 bg-rose-500/10" },
];

const TODOS = [
    { id: 1, text: "Update price for 'Urban Set'", done: false },
    { id: 2, text: "Reply to DM from Gallery", done: true },
    { id: 3, text: "Schedule Friday's upload", done: false },
];

const GROWTH_TIPS = [
    { title: "Trending Tag", desc: "Use #DigitalNoir in your next post to reach +15% more viewers." },
    { title: "Best Time", desc: "Post between 6 PM - 8 PM today for max engagement." },
];

const STUDIO_RECENT = [
    { id: 1, title: "Neon Cyberpunk", type: "Image", status: "Draft", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100" },
    { id: 2, title: "Abstract Flow", type: "Video", status: "Rendering", img: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?auto=format&fit=crop&q=80&w=100" },
];

const LIST_REVENUE = [
    { id: 1, title: "Urban Preset Pack", value: "$2,400", sub: "120 sales", img: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=100" },
    { id: 2, title: "Oil Brush Set", value: "$1,850", sub: "94 sales", img: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&q=80&w=100" },
];
const LIST_VIEWS = [
    { id: 1, title: "Sunset Timelapse", value: "45.2k", sub: "Views", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=100" },
    { id: 2, title: "Character Study", value: "32.1k", sub: "Views", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" },
];
const LIST_LOVED = [
    { id: 1, title: "Blue Period #4", value: "1.2k", sub: "Likes", img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&q=80&w=100" },
    { id: 2, title: "Golden Hour", value: "980", sub: "Likes", img: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&q=80&w=100" },
];

function Dashboard() {
  const [activeChartTab, setActiveChartTab] = useState('revenue');
  const [todos, setTodos] = useState(TODOS);

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const chartConfig = {
    revenue: { color: '#10b981', gradient: 'colorRev', label: 'Revenue ($)' },
    views: { color: '#3b82f6', gradient: 'colorView', label: 'Views' },
    traffic: { color: '#f59e0b', gradient: 'colorTraf', label: 'Traffic' },
    followers: { color: '#8b5cf6', gradient: 'colorFoll', label: 'Followers' }
  };
  const currentConfig = chartConfig[activeChartTab];

  return (
    // Added max-w-[100vw] and overflow-x-hidden to the root to prevent ANY horizontal scroll
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#FAFAFA] dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 inset-x-0 z-50 h-16 px-4 md:px-8 flex items-center justify-between bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-900 w-full">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                {/* <LayoutGrid className="w-5 h-5 text-white dark:text-black" /> */}
                <img src={Logo} alt="" />
            </div>
            <h1 className="text-lg font-bold tracking-tight font-Eagle">Painters' Diary</h1>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
            <Link to={"/studio-manager"}>    
          <button className="relative group shrink-0">
            <SlidersHorizontal className="w-5 h-5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black"></span>
          </button>
          </Link>

          <div className="h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800"></div>
          <div className="flex items-center gap-3">
             <div className="text-right hidden md:block">
                 <p className="text-xs font-bold">Jack D.</p>
                 <p className="text-[10px] text-zinc-500">Pro Artist</p>
             </div>
             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] shrink-0">
                <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" alt="Profile" className="w-full h-full object-cover" />
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content: max-w-7xl ensures it doesn't stretch too wide on huge screens, but w-full ensures it fits mobile */}
      <main className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-6 md:space-y-8">
        
        {/* --- KPI CARDS --- */}
        <div className="flex flex-nowrap gap-4 overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-x-scroll hide-scrollbar">
            {KPIS.map((kpi) => (
                <div key={kpi.id}
                 className="min-w-[260px] sm:min-w-0 bg-white dark:bg-zinc-900/50  p-5 rounded-2xl  border border-zinc-200 dark:border-zinc-800  shadow-sm hover:shadow-md  transition-shadow  relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <kpi.icon className="w-16 h-16" />
                    </div>
                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-zinc-500 dark:text-zinc-400">
                                <kpi.icon className="w-4 h-4" />
                                <span className="text-xs font-semibold uppercase tracking-wider">{kpi.title}</span>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight truncate">{kpi.value}</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-4">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${kpi.positive ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10' : 'text-rose-600 bg-rose-100 dark:bg-rose-500/10'}`}>
                                {kpi.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {kpi.change}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-medium whitespace-nowrap">{kpi.note}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* 1. PERFORMANCE GRAPH */}
            {/* min-w-0 forces this flex child to shrink rather than overflow */}
            <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 flex flex-col h-[400px] min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-lg font-bold">Performance</h2>
                        <p className="text-xs text-zinc-500">Analytics for the last 7 days</p>
                    </div>
                    {/* Added max-w-full to prevent buttons from pushing out */}
                    <div className="flex p-1 bg-zinc-100 dark:bg-zinc-950 rounded-xl overflow-x-auto max-w-full no-scrollbar">
                        {['revenue', 'views', 'traffic', 'followers'].map((tab) => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveChartTab(tab)} 
                                className={`flex-1 min-w-[70px] px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-all whitespace-nowrap ${activeChartTab === tab ? 'bg-white dark:bg-zinc-800 shadow-sm text-black dark:text-white' : 'text-zinc-400 hover:text-zinc-600'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={CHART_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id={currentConfig.gradient} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={currentConfig.color} stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor={currentConfig.color} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 11}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 11}} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey={activeChartTab} 
                                stroke={currentConfig.color} 
                                strokeWidth={3} 
                                fill={`url(#${currentConfig.gradient})`} 
                                animationDuration={800}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 2. STUDIO GLIMPSE */}
            <div className="bg-zinc-900 text-white rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between h-[400px] shadow-xl shadow-zinc-900/10 min-w-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-30 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-600 rounded-full blur-[80px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-2">
                             <Layers className="w-5 h-5 text-indigo-400" />
                             <h3 className="font-bold text-lg">Studio Glimpse</h3>
                         </div>
                         <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors whitespace-nowrap">Open Studio</button>
                    </div>
                    
                    <div className="space-y-4">
                        <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Currently Working On</p>
                        {STUDIO_RECENT.map((item) => (
                            <div key={item.id} className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-pointer backdrop-blur-md">
                                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold leading-tight group-hover:text-indigo-300 transition-colors truncate">{item.title}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Draft' ? 'bg-yellow-400' : 'bg-blue-400'} animate-pulse`}></div>
                                        <p className="text-[10px] text-zinc-400 truncate">{item.status}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 bg-zinc-800/50 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <p className="text-xs text-zinc-400 mb-2">Storage Usage</p>
                    <div className="h-2 w-full bg-zinc-700 rounded-full overflow-hidden mb-1">
                        <div className="h-full w-[65%] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-500">
                        <span>65 GB Used</span>
                        <span>100 GB Total</span>
                    </div>
                </div>
            </div>
        </div>

        {/* --- SECONDARY GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* 1. GROWTH ASSISTANT */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 rounded-3xl p-6 border border-indigo-100 dark:border-indigo-900/30 min-w-0">
                <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
                    <Zap className="w-5 h-5 fill-current shrink-0" />
                    <h3 className="font-bold text-lg">Growth Assistant</h3>
                </div>
                <div className="space-y-3">
                    {GROWTH_TIPS.map((tip, idx) => (
                        <div key={idx} className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                            <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-200 mb-1">{tip.title}</h4>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{tip.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. TO-DO LIST */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm min-w-0">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">To-Do List</h3>
                    <span className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md text-zinc-500 whitespace-nowrap">{todos.filter(t => !t.done).length} pending</span>
                </div>
                <div className="space-y-3">
                    {todos.map((todo) => (
                        <div 
                            key={todo.id} 
                            onClick={() => toggleTodo(todo.id)}
                            className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${todo.done ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 opacity-60' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'}`}
                        >
                            <div className={`mt-0.5 shrink-0 ${todo.done ? 'text-green-500' : 'text-zinc-300'}`}>
                                {todo.done ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                            </div>
                            <span className={`text-sm font-medium ${todo.done ? 'line-through text-zinc-400' : 'text-zinc-700 dark:text-zinc-200'}`}>{todo.text}</span>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-2 text-xs font-bold text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">+ Add Task</button>
            </div>

            {/* 3. RECENT ACTIVITY */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col min-w-0">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-lg">Live Feed</h3>
                    <MoreHorizontal className="w-5 h-5 text-zinc-400 shrink-0" />
                </div>
                <div className="space-y-6 relative flex-1">
                    <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-zinc-100 dark:bg-zinc-800"></div>
                    {RECENT_ACTIVITY.map((act) => (
                        <div key={act.id} className="relative flex gap-4 items-start z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white dark:border-zinc-900 ${act.color} shrink-0`}>
                                <act.icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-snug break-words">
                                    <span className="font-bold">{act.user}</span> {act.action} <span className="italic text-zinc-500">{act.target}</span>
                                </p>
                                <p className="text-[10px] text-zinc-400 mt-1 font-medium">{act.time} ago</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- BOTTOM LISTS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TopList title="Most Viewed" data={LIST_VIEWS} icon={Eye} color="text-blue-500" />
            <TopList title="Top Revenue" data={LIST_REVENUE} icon={DollarSign} color="text-emerald-500" />
            <TopList title="Most Loved" data={LIST_LOVED} icon={Heart} color="text-rose-500" />
        </div>
      </main>
    </div>
  );
}

function TopList({ title, data, icon: Icon, color }) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 min-w-0">
            <div className="flex items-center gap-2 mb-4">
                <div className={`p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 ${color} shrink-0`}>
                    <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm">{title}</h3>
            </div>
            <div className="space-y-4">
                {data.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                        <img src={item.img} alt="" className="w-12 h-12 rounded-lg object-cover bg-zinc-100 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold truncate">{item.title}</h4>
                            <p className="text-xs text-zinc-500 truncate">{item.sub}</p>
                        </div>
                        <span className="text-sm font-bold bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded-md shrink-0">{item.value}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                <button className="text-xs font-bold text-zinc-400 hover:text-zinc-800 dark:hover:text-white flex items-center gap-1 transition-colors">
                    View All <ChevronRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}

export default Dashboard;