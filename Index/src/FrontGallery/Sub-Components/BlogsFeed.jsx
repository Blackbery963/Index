import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, X, User, Sparkles, ChevronLeft } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_STORIES = [
  {
    id: 1,
    title: "The Quiet Art of Solitude",
    excerpt: "Why spending time alone in the studio is not just necessary, but a spiritual practice for creativity.",
    author: "Elena Fisher",
    date: "Jan 15, 2025",
    category: "Reflection",
    image: "https://images.pexels.com/photos/35381580/pexels-photo-35381580.jpeg",
    content: "In a world that shouts, art requires a whisper. I found that my best work comes not when I am pushing, but when I am listening. Solitude is not loneliness. It is the rich soil where ideas grow."
  },
  {
    id: 2,
    title: "Morning Rituals",
    excerpt: "Coffee, light, and the first stroke of the brush. How I start my day determines how I end it.",
    author: "Marcus Chen",
    date: "Jan 12, 2025",
    category: "Lifestyle",
    image: "https://images.pexels.com/photos/35566540/pexels-photo-35566540.jpeg",
    content: "The light at 7 AM has a specific quality—a coolness that promises potential. I don't check my phone. I check the palette."
  },
  {
    id: 3,
    title: "Finding Beauty in Decay",
    excerpt: "A photo walk through the abandoned industrial district taught me about texture and resilience.",
    author: "Sarah J.",
    date: "Jan 05, 2025",
    category: "Inspiration",
    image: "https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=600",
    content: "Rust is nature's way of reclaiming the rigid. The orange hues against the grey sky provided a color palette I never expected to fall in love with."
  }
];

// --- STORY CARD (Zen / Vertical Style) ---
const StoryCard = ({ post, onClick }) => (
    <motion.div 
        layout
        onClick={onClick}
        whileHover={{ y: -8 }}
        className="min-w-[260px] w-[260px] h-[380px] snap-center flex-shrink-0 relative rounded-xl overflow-hidden cursor-pointer group"
    >
        {/* Background Image with Zoom Effect */}
        <img 
            src={post.image} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        
        {/* Soft Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
        
        {/* Floating Category Pill */}
        <div className="absolute top-4 right-4">
             <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-medium tracking-widest uppercase">
                 {post.category}
             </span>
        </div>

        {/* Content Content (Bottom aligned) */}
        <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-2 text-zinc-300 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <Calendar size={12} />
                <span className="text-[10px] font-medium tracking-wide uppercase">{post.date}</span>
            </div>

            <h3 className="font-serif text-2xl text-white leading-tight mb-3 group-hover:text-amber-100 transition-colors">
                {post.title}
            </h3>
            
            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                <p className="text-zinc-300 text-xs line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                    {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                    <span>Read Story</span>
                    <ArrowRight size={14} />
                </div>
            </div>
        </div>
    </motion.div>
);

// --- READING MODE (Embedded) ---
const ReadingView = ({ post, onClose }) => (
    <motion.div 
        key="reading-view"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="w-full bg-[#faf9f6] dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl"
    >
        {/* Header Image Area */}
        <div className="relative h-64 md:h-80 w-full">
            <img src={post.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Navbar Overlay */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start">
                 <button 
                    onClick={onClose}
                    className="flex items-center gap-2 px-4 py-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white text-xs font-bold transition-all border border-white/10"
                 >
                     <ChevronLeft size={14} /> Back to Stories
                 </button>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 bg-gradient-to-t from-black/80 to-transparent">
                 <div className="flex items-center gap-3 mb-2">
                     <span className="px-2 py-0.5 rounded-sm bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
                        {post.category}
                     </span>
                     <span className="text-zinc-300 text-xs font-serif italic">{post.date}</span>
                 </div>
                 <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight">
                    {post.title}
                 </h1>
            </div>
        </div>

        {/* Content Body - Cream Background for Zen Feel */}
        <div className="px-6 py-10 md:px-16 md:py-12 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
                <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    {/* Placeholder Avatar */}
                    <div className="w-full h-full flex items-center justify-center text-zinc-500"><User size={20}/></div>
                </div>
                <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Written By</p>
                    <p className="text-sm font-serif font-bold text-zinc-800 dark:text-zinc-200">{post.author}</p>
                </div>
            </div>

            {/* <div 
                // className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-p:font-serif prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-loose"
                // dangerouslySetInnerHTML={{ __html: post.content }} 
                <p></p>
            /> */}
            <div>
                <p className=' text-zinc-600 dark:text-zinc-300 font-normal text-pretty font-Playfair'>{post.content}</p>
            </div>

            <div className="mt-12 flex justify-center">
                 <div className="flex items-center gap-2 text-zinc-400 text-sm">
                     <Sparkles size={16} className="text-amber-500" />
                     <span className="font-serif italic">Thanks for reading</span>
                 </div>
            </div>
        </div>
    </motion.div>
);

// --- MAIN FEED COMPONENT ---
export default function BlogsFeed() {
    const [selected, setSelected] = useState(null);

    return (
        <div className="w-full py-10">
            <div className="flex items-center justify-between px-2 mb-6">
                <div>
                    <h3 className="font-serif text-2xl text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                        Creators Blog
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-serif italic">
                        Personal stories from the studio
                    </p>
                </div>
                
                <button className="text-xs font-bold text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors uppercase tracking-widest">
                    View Archive
                </button>
            </div>
            
            <div className="min-h-[380px] px-1">
                <AnimatePresence mode="wait">
                    {selected ? (
                        <ReadingView 
                            key="reading" 
                            post={selected} 
                            onClose={() => setSelected(null)} 
                        />
                    ) : (
                        <motion.div 
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex gap-6 overflow-x-auto pb-8 snap-x hide-scrollbar px-2"
                        >
                            {MOCK_STORIES.map(post => (
                                <StoryCard key={post.id} post={post} onClick={() => setSelected(post)} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

