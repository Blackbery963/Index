import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowLeft, Package, FileCode, HardDrive, ShieldCheck, ChevronLeft } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_RESOURCES = [
  {
    id: 1,
    title: "Essential Oil Brushes Vol. 2",
    author: "StudioCanvas",
    date: "2025-01-10",
    description: "A collection of 20+ high-fidelity oil painting brushes. Perfect for texturing and blending backgrounds in landscape art.",
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600",
    downloads: 1205,
    type: "Brushes",
    fileSize: "45 MB",
    format: ".ABR",
    license: "Personal Use"
  },
  {
    id: 2,
    title: "Cyberpunk Color Palettes",
    author: "NeonDreamer",
    date: "2025-01-12",
    description: "50 curated neon color palettes for digital artists. Includes ACO and ASE files for Photoshop and Procreate.",
    thumbnail: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600",
    downloads: 850,
    type: "Palette",
    fileSize: "2 MB",
    format: ".ACO",
    license: "Commercial"
  },
  {
    id: 3,
    title: "Paper Texture Pack 4K",
    author: "TextureLabs",
    date: "2025-01-08",
    description: "High-resolution scanned paper textures. Watercolor, Canvas, and Rough grain to add analog feel to digital work.",
    thumbnail: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=600",
    downloads: 3200,
    type: "Texture",
    fileSize: "1.2 GB",
    format: ".JPG",
    license: "Commercial"
  }
];

// --- HELPER ---
const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });

// --- CARD COMPONENT ---
const ResourceCard = ({ resource, onClick }) => (
    <motion.div 
        layout
        onClick={onClick}
        className="min-w-[280px] w-[280px] snap-center flex-shrink-0 bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer group shadow-sm flex flex-col h-full"
    >
        {/* Thumbnail */}
        <div className="h-40 w-full relative bg-zinc-100 overflow-hidden">
             <img src={resource.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
             <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10">
                 {resource.type}
             </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
                <div>
                     <h4 className="font-bold text-sm text-zinc-900 dark:text-white line-clamp-1">{resource.title}</h4>
                     <p className="text-[10px] text-zinc-500">{resource.author}</p>
                </div>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4 flex-1">
               {resource.description}
            </p>
            
            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <span className="flex items-center gap-1 text-zinc-400 text-xs">
                    <Download size={12} /> {resource.downloads}
                </span>
                <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                    {resource.format}
                </span>
            </div>
        </div>
    </motion.div>
);

// --- PRODUCT PAGE DETAIL VIEW (Split Layout) ---
const ProductDetailView = ({ resource, onClose }) => (
    <motion.div 
        key="product-detail"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="w-full bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm"
    >
        {/* Top Bar */}
        <div className="flex items-center gap-2 p-4 border-b border-zinc-100 dark:border-zinc-800">
            <button onClick={onClose} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                <ChevronLeft size={20} className="text-zinc-600 dark:text-zinc-400"/>
            </button>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Resource Details</span>
        </div>

        <div className="flex flex-col md:flex-row">
            {/* LEFT: Image */}
            <div className="w-full md:w-5/12 h-64 md:h-auto relative bg-zinc-100 dark:bg-zinc-800 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800">
                 <img src={resource.thumbnail} alt="" className="w-full h-full object-cover absolute inset-0" />
            </div>

            {/* RIGHT: Specs & Actions */}
            <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col">
                 <div className="flex items-center justify-between mb-4">
                     <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold">
                        {resource.type}
                     </span>
                     <span className="text-xs text-zinc-500">{formatDate(resource.date)}</span>
                 </div>

                 <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{resource.title}</h1>
                 <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-medium">By {resource.author}</p>

                 <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">
                    {resource.description}
                 </p>

                 {/* Tech Specs Grid */}
                 <div className="grid grid-cols-3 gap-4 mb-8">
                     <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
                         <div className="flex items-center gap-2 text-zinc-400 mb-1">
                             <HardDrive size={14} />
                             <span className="text-[10px] font-bold uppercase">Size</span>
                         </div>
                         <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{resource.fileSize}</p>
                     </div>
                     <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
                         <div className="flex items-center gap-2 text-zinc-400 mb-1">
                             <FileCode size={14} />
                             <span className="text-[10px] font-bold uppercase">Format</span>
                         </div>
                         <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{resource.format}</p>
                     </div>
                     <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
                         <div className="flex items-center gap-2 text-zinc-400 mb-1">
                             <ShieldCheck size={14} />
                             <span className="text-[10px] font-bold uppercase">License</span>
                         </div>
                         <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{resource.license}</p>
                     </div>
                 </div>

                 {/* Action Button */}
                 <div className="mt-auto">
                     <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                         <Download size={18} /> 
                         <span>Download Now</span>
                         <span className="opacity-60 text-xs font-normal ml-1">({resource.downloads} downloads)</span>
                     </button>
                 </div>
            </div>
        </div>
    </motion.div>
);

// --- MAIN FEED COMPONENT ---
export default function ResourcesFeed() {
    const [selected, setSelected] = useState(null);

    return (
        <div className="w-full py-8">
            <div className="flex items-center justify-between px-4 mb-4">
                <h3 className="font-bold text-zinc-800 dark:text-white flex items-center gap-2">
                    <Package className="text-blue-500" size={18}/> New Resources
                </h3>
            </div>
            
            <div className="min-h-[280px]">
                <AnimatePresence mode="wait">
                    {selected ? (
                        <ProductDetailView 
                            key="detail"
                            resource={selected} 
                            onClose={() => setSelected(null)} 
                        />
                    ) : (
                        <motion.div 
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x hide-scrollbar"
                        >
                            {MOCK_RESOURCES.map(res => (
                                <ResourceCard key={res.id} resource={res} onClick={() => setSelected(res)} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}




