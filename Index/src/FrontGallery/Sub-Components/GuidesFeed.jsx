import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Clock, BarChart, ChevronLeft, CheckCircle, PlayCircle } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_GUIDES = [
  {
    id: 1,
    title: "Varnishing Oil Paintings: The Complete Process",
    difficulty: "Intermediate",
    duration: "45 Min",
    stepsCount: 5,
    image: "https://images.pexels.com/photos/672630/pexels-photo-672630.jpeg",
    steps: [
        { title: "Wait for Cure", desc: "Ensure painting is dry (6+ months)." },
        { title: "Clean Surface", desc: "Remove dust with lint-free cloth." },
        { title: "Apply Varnish", desc: "Use long, even strokes." }
    ]
  },
  {
    id: 2,
    title: "Setting Up a Print Shop",
    difficulty: "Beginner",
    duration: "2 Hours",
    stepsCount: 8,
    image: "https://images.pexels.com/photos/974439/pexels-photo-974439.jpeg",
    steps: [
        { title: "Scan Artwork", desc: "Scan at 600 DPI." },
        { title: "Color Correct", desc: "Match screen to original." }
    ]
  }
];

// --- CARD (Action Card) ---
const GuideCard = ({ item, onClick }) => (
    <motion.div 
        layout
        onClick={onClick}
        className="min-w-[280px] w-[280px] snap-center flex-shrink-0 bg-gradient-to-tl from-yellow-950/40 to-transparent rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all group border border-zinc-200 dark:border-zinc-800"
    >
        <div className="h-[240px] w-full relative">
            <img src={item.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                {item.stepsCount} Steps
            </div>
        </div>
        
        <div className="p-4">
            <div className="flex gap-3 mb-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                <span className="flex items-center gap-1"><BarChart size={10}/> {item.difficulty}</span>
                <span className="flex items-center gap-1"><Clock size={10}/> {item.duration}</span>
            </div>

            <h3 className="font-bold text-zinc-900 dark:text-white leading-tight mb-4 group-hover:text-orange-600 transition-colors">
                {item.title}
            </h3>

            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-orange-400 group-hover:w-full transition-all duration-700 ease-out" />
            </div>
            <p className="text-[10px] text-zinc-400 mt-2 text-right">Start Guide</p>
        </div>
    </motion.div>
);

// --- DETAIL (Step-by-Step Layout) ---
const GuideDetail = ({ item, onClose }) => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
        className="w-full bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
    >
        {/* Header */}
        <div className="relative h-48 w-full">
             <img src={item.image} alt="" className="w-full h-full object-cover opacity-50" />
             <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
             <button onClick={onClose} className="absolute top-4 left-4 bg-white/10 hover:bg-white/20 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                 <ChevronLeft size={14}/> All Guides
             </button>
             <div className="absolute bottom-6 left-6 right-6">
                 <h1 className="text-2xl font-bold text-white mb-2">{item.title}</h1>
                 <div className="flex gap-4 text-xs text-zinc-300 font-medium">
                     <span className="bg-orange-600/20 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30">{item.difficulty}</span>
                     <span>{item.duration}</span>
                 </div>
             </div>
        </div>

        {/* Steps List */}
        <div className="p-6">
            <div className="space-y-6">
                {item.steps.map((step, index) => (
                    <div key={index} className="flex gap-4 group">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-sm border-2 border-orange-200 dark:border-orange-900">
                                {index + 1}
                            </div>
                            {index !== item.steps.length - 1 && <div className="w-0.5 h-full bg-zinc-100 dark:bg-zinc-800 my-2" />}
                        </div>
                        <div className="pb-4">
                            <h4 className="font-bold text-zinc-800 dark:text-white mb-1 group-hover:text-orange-500 transition-colors">{step.title}</h4>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <button className="w-full mt-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
                <CheckCircle size={18} /> Mark as Complete
            </button>
        </div>
    </motion.div>
);

export default function GuidesFeed() {
    const [selected, setSelected] = useState(null);

    return (
        <div className="w-full py-8 px-1">
            <div className="flex items-center gap-2 mb-4 px-1">
                <Compass className="text-orange-500" size={18}/>
                <h3 className="font-bold text-zinc-800 dark:text-white">How-To Guides</h3>
            </div>
            <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                    {selected ? (
                        <GuideDetail key="detail" item={selected} onClose={() => setSelected(null)} />
                    ) : (
                        <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                            {MOCK_GUIDES.map(item => (
                                <GuideCard key={item.id} item={item} onClick={() => setSelected(item)} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}