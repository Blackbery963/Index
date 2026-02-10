import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutTemplate, Download, ChevronLeft, CreditCard, Star } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_TEMPLATES = [
  {
    id: 1,
    title: "Artist Portfolio Notion",
    type: "Notion Template",
    price: "Free",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&q=80&w=600",
    description: "A minimalist dashboard to organize your artworks, galleries, and sales.",
    features: ["Inventory Tracker", "Sales Log", "CV Builder"]
  },
  {
    id: 2,
    title: "Instagram Carousel Kit",
    type: "PSD & Canva",
    price: "$12",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600",
    description: "10 Seamless carousel templates designed for artists to showcase detailed work.",
    features: ["1080x1350px", "Smart Objects", "Free Fonts"]
  }
];

// --- CARD (Asset Thumbnail) ---
const TemplateCard = ({ item, onClick }) => (
    <motion.div 
        layout
        onClick={onClick}
        className="min-w-[260px] w-[260px] snap-center flex-shrink-0 relative rounded-xl overflow-hidden cursor-pointer group shadow-lg"
    >
        <div className="h-40 w-full relative">
            <img src={item.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-indigo-900/20 group-hover:bg-transparent transition-colors duration-300" />
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded">
                {item.type}
            </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 p-3 border-x border-b border-zinc-200 dark:border-zinc-800 rounded-b-xl">
            <h3 className="font-bold text-zinc-900 dark:text-white text-sm mb-2 truncate">{item.title}</h3>
            <div className="flex justify-between items-center">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${item.price === 'Free' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'}`}>
                    {item.price}
                </span>
                <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                    <Star size={10} className="text-amber-400 fill-amber-400" /> {item.rating}
                </div>
            </div>
        </div>
    </motion.div>
);

// --- DETAIL (Marketplace Layout) ---
const TemplateDetail = ({ item, onClose }) => (
    <motion.div 
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
        className="w-full bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row h-auto md:h-80"
    >
        {/* Left: Visual Preview */}
        <div className="w-full md:w-5/12 h-48 md:h-full relative bg-zinc-100">
            <img src={item.image} alt="" className="w-full h-full object-cover" />
            <button onClick={onClose} className="absolute top-4 left-4 bg-white/50 hover:bg-white backdrop-blur p-2 rounded-full text-zinc-900 transition-colors">
                <ChevronLeft size={18} />
            </button>
        </div>

        {/* Right: Info & Purchase */}
        <div className="w-full md:w-7/12 p-6 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">{item.type}</span>
                    <span className="text-lg font-bold text-zinc-900 dark:text-white">{item.price}</span>
                </div>
                
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">{item.title}</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">{item.description}</p>

                <div className="space-y-2 mb-6">
                    {item.features.map(feature => (
                        <div key={feature} className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> {feature}
                        </div>
                    ))}
                </div>
            </div>

            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/30">
                {item.price === 'Free' ? <Download size={18}/> : <CreditCard size={18}/>}
                {item.price === 'Free' ? 'Download for Free' : 'Purchase Template'}
            </button>
        </div>
    </motion.div>
);

export default function TemplatesFeed() {
    const [selected, setSelected] = useState(null);

    return (
        <div className="w-full py-8 px-1">
            <div className="flex items-center gap-2 mb-4 px-1">
                <LayoutTemplate className="text-indigo-500" size={18}/>
                <h3 className="font-bold text-zinc-800 dark:text-white">Featured Templates</h3>
            </div>
            <div className="min-h-[220px]">
                <AnimatePresence mode="wait">
                    {selected ? (
                        <TemplateDetail key="detail" item={selected} onClose={() => setSelected(null)} />
                    ) : (
                        <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                            {MOCK_TEMPLATES.map(item => (
                                <TemplateCard key={item.id} item={item} onClick={() => setSelected(item)} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}