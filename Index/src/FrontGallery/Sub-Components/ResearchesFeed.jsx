import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, CheckCircle, BarChart3, Fingerprint, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';

// --- DATA ---
const MOCK_RESEARCH = [
  {
    id: 1,
    title: "The Quiet Eye in Digital Spaces",
    author: "Dr. Elara Vance",
    affiliation: "Dept. of Cognitive Science, MIT",
    journal: "Journal of HCI",
    doi: "10.1038/s41598-024-555-x",
    date: "Oct 2024",
    readTime: "5 min",
    abstract: "A longitudinal study analyzing how reducing interface density lowers cortisol levels in users by 40%.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1100&auto=format&fit=crop", 
    proofImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1100&auto=format&fit=crop",
    proofCaption: "Fig 1. Cortisol reduction correlation (N=500).",
    content: "In an era defined by the attention economy, our visual cortices are perpetually over-stimulated. Our research followed 500 participants using 'Minimalist' vs 'Maximalist' interfaces over a 6-month period."
  },
  {
    id: 2,
    title: "Organic Algorithms: Biomimicry",
    author: "Prof. J. Cohen",
    affiliation: "Stanford AI Lab",
    journal: "Nature Machine Intelligence",
    doi: "10.1038/s42256-024-009-y",
    date: "Sep 2024",
    readTime: "8 min",
    abstract: "Mimicking root systems to create efficient, decentralized data structures that self-heal.",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1100&auto=format&fit=crop",
    proofImage: "https://images.unsplash.com/photo-1504164996022-09d85834bb60?q=80&w=1100&auto=format&fit=crop",
    proofCaption: "Fig 2. Network latency comparison.",
    content: "Trees communicate via mycelial networks, allocating resources exactly where needed without a central server. We applied this logic to database sharding."
  },
  {
    id: 3,
    title: "Sleep Spindles & Syntax",
    author: "Sarah Jenkins, PhD",
    affiliation: "Oxford Sleep Neuroscience",
    journal: "Sleep Medicine Reviews",
    doi: "10.1016/j.smrv.2024.10.004",
    date: "Aug 2024",
    readTime: "6 min",
    abstract: "Investigating the causal link between Stage 2 NREM sleep spindles and logic syntax.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1100&auto=format&fit=crop",
    proofImage: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1100&auto=format&fit=crop",
    proofCaption: "Fig 3. EEG readout post-learning.",
    content: "We often sacrifice sleep for study. However, this paper argues that the syntax of a new language (coding or spoken) is cemented solely during specific NREM cycles."
  }
];

// --- COMPONENT: CARD (Clean, no extra space below) ---
const Card = ({ item, onClick }) => (
    <motion.div 
        layoutId={`card-${item.id}`}
        onClick={onClick}
        className="group relative flex-shrink-0 w-[280px] cursor-pointer bg-white dark:bg-[#1c1c19] border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden hover:shadow-lg hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-300"
    >
        {/* Compact Header */}
        <div className="px-3 py-2 bg-stone-50 dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center">
            <span className="text-[9px] font-bold uppercase tracking-wider text-stone-500">{item.journal}</span>
            <span className="text-[9px] font-mono text-stone-400">{item.date}</span>
        </div>

        {/* Image */}
        <motion.div layoutId={`image-${item.id}`} className="h-[200px] w-full overflow-hidden grayscale-[30%] group-hover:grayscale-0 transition-all rounded-xl p-2">
             <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
        </motion.div>

        {/* Body */}
        <div className="p-4">
            <motion.h3 layoutId={`title-${item.id}`} className="font-serif text-md font-bold text-stone-900 dark:text-stone-100 leading-tight mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400">
                {item.title}
            </motion.h3>
            <p className="text-xs text-stone-500 line-clamp-2 font-serif italic mb-3">"{item.abstract}"</p>
            
            <div className="flex items-center text-[10px] font-bold text-teal-600 dark:text-teal-500 uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                Read Findings <ChevronRight size={10} />
            </div>
        </div>
    </motion.div>
);

// --- COMPONENT: READER (Fixed Height 600px) ---
const ResearchReader = ({ item, onClose }) => (
    <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        // THE FIX: Fixed height of 600px applied ONLY to this view. 
        // It replaces the cards in the DOM flow, so no huge page jumps.
        className="w-full h-[600px] bg-white dark:bg-[#1c1c19] border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl overflow-hidden flex flex-col"
    >
        {/* Toolbar */}
        <div className="h-14 shrink-0 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between px-4 md:px-6 bg-stone-50 dark:bg-[#151513]">
            <div className="flex items-center gap-3 text-xs">
                {/* <span className="font-mono text-stone-400 hidden sm:inline">DOI: {item.doi}</span> */}
                <span className="flex items-center gap-1 text-teal-600 font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-900/20 px-2 py-1 rounded">
                    <CheckCircle size={10}/> Peer Reviewed
                </span>
            </div>
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded text-xs font-bold hover:opacity-80 transition-opacity">
                    <Download size={12} /> <span className="hidden sm:inline">Download PDF</span>
                </button>
                <button onClick={onClose} className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full transition-colors text-stone-500">
                    <X size={18} />
                </button>
            </div>
        </div>

        {/* Scrollable Paper Area */}
        <div className="flex-1 overflow-y-auto hide-scrollbar">
            <div className="max-w-2xl mx-auto px-6 py-10">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.h1 layoutId={`title-${item.id}`} className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
                        {item.title}
                    </motion.h1>
                    <p className="text-sm text-stone-600 dark:text-stone-400 font-medium">{item.author}</p>
                    <p className="text-xs text-stone-400 uppercase tracking-wider mt-1">{item.affiliation}</p>
                </div>

                {/* Abstract Box */}
                <div className="bg-stone-50 dark:bg-stone-900/50 p-6 rounded-lg border-l-2 border-stone-300 dark:border-stone-700 mb-8">
                    <h4 className="text-[10px] font-bold text-stone-400 uppercase mb-2 flex items-center gap-1"><Fingerprint size={12}/> Abstract</h4>
                    <p className="font-serif italic text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                        {item.abstract}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-stone dark:prose-invert prose-sm font-serif leading-7 text-stone-800 dark:text-stone-200">
                    <p className="first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-[-4px]">
                        {item.content}
                    </p>
                    
                    {/* The "Proof" Section */}
                    <div className="my-8 border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden">
                        <div className="bg-stone-100 dark:bg-stone-900 h-48 relative">
                            {/* Scientific Grid Background */}
                            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]" />
                            <img src={item.proofImage} alt="Chart" className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-screen opacity-90" />
                        </div>
                        <div className="p-3 bg-stone-50 dark:bg-[#151513] border-t border-stone-200 dark:border-stone-700 flex gap-2 items-start">
                             <BarChart3 size={14} className="text-stone-400 mt-0.5 shrink-0"/>
                             <p className="text-xs font-mono text-stone-500">{item.proofCaption}</p>
                        </div>
                    </div>

                    <p>
                        The results shown in Figure 1 demonstrate a clear statistical significance (p &lt; 0.05). Further longitudinal studies are recommended to isolate environmental variables.
                    </p>
                </div>
                
                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-stone-200 dark:border-stone-800 text-center">
                    <p className="text-[10px] font-mono text-stone-400 uppercase">© 2024 {item.journal}. All rights reserved.</p>
                </div>
            </div>
        </div>
    </motion.div>
);

// --- MAIN FEED ---
export default function SmartResearchFeed() {
    const [selectedId, setSelectedId] = useState(null);
    const selectedItem = MOCK_RESEARCH.find(i => i.id === selectedId);

    return (
        <div className="w-full max-w-6xl mx-auto py-12 px-1 min-h-[400px]">
            {/* Header - Always Visible */}
            <div className="mb-6 px-1 border-b border-stone-200 dark:border-stone-800 pb-3 flex justify-between items-end">
                <h2 className="text-xl font-serif italic text-stone-800 dark:text-stone-200">Research Archives</h2>
                {!selectedId && <span className="text-xs font-mono text-stone-400 animate-pulse"> Discover More</span>}
            </div>

            {/* LAYOUT SWITCHER 
               - If NO selection: Renders the simple row (auto height).
               - If selection: Replaces row with the fixed 600px Reader.
               - mode="wait" ensures one fades out before the other fades in.
            */}
            <AnimatePresence mode="wait">
                {selectedId ? (
                    // 1. DETAIL VIEW (Fixed Height)
                    <ResearchReader key="reader" item={selectedItem} onClose={() => setSelectedId(null)} />
                ) : (
                    // 2. FEED VIEW (Auto Height - No extra whitespace)
                    <motion.div 
                        key="feed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar"
                    >
                        {MOCK_RESEARCH.map(item => (
                            <Card key={item.id} item={item} onClick={() => setSelectedId(item.id)} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}