import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Sliders, Layout, Film, Crop, Check, Plus, Grid, BoxSelect, Trash2 } from 'lucide-react';

const StoryCreator = ({ onClose }) => {
  const [step, setStep] = useState('upload'); 
  const [media, setMedia] = useState([]);
  const [activeMediaId, setActiveMediaId] = useState(null);
  const containerRef = useRef(null);
  
  // --- EDITOR STATE ---
  const [activeTool, setActiveTool] = useState('frame'); 
  const [caption, setCaption] = useState('');
  const [aspectRatio, setAspectRatio] = useState('aspect-[4/5]'); 
  const [adjustments, setAdjustments] = useState({ brightness: 100, contrast: 100, saturate: 100 });
  const [isCinematic, setIsCinematic] = useState(false);
  
  // --- COLLAGE STATE ---
  const [collageBg, setCollageBg] = useState('dark');
  const [collageMode, setCollageMode] = useState('grid'); // 'grid' | 'scatter'

  // --- HELPER: Smart Scatter Position ---
  // Calculates a specific 'zone' for the image based on its index so they don't overlap
  const generateScatterPos = (index) => {
      // We define 9 zones (3x3 grid) for the scatter board
      // zone 0: top-left, zone 4: center, zone 8: bottom-right, etc.
      const zoneRow = Math.floor(index / 3); 
      const zoneCol = index % 3;
      
      // Base positions (in %)
      const baseX = 5 + (zoneCol * 30); // 5%, 35%, 65%
      const baseY = 10 + (zoneRow * 30); // 10%, 40%, 70%
      
      // Add randomness WITHIN the zone (jitter)
      const jitterX = Math.random() * 10 - 5; // -5% to +5%
      const jitterY = Math.random() * 10 - 5;
      
      return { 
          left: baseX + jitterX, 
          top: baseY + jitterY, 
          rotate: Math.random() * 12 - 6, // -6deg to +6deg
          zIndex: index + 1
      };
  };

  // --- HELPER: Grid Layout Logic ---
  const getGridClass = (count) => {
      if (count === 1) return 'grid-cols-1 grid-rows-1';
      if (count === 2) return 'grid-cols-2 grid-rows-1';
      if (count === 3) return 'grid-cols-2 grid-rows-2'; 
      if (count === 4) return 'grid-cols-2 grid-rows-2';
      if (count >= 5 && count <= 6) return 'grid-cols-3 grid-rows-2';
      if (count >= 7 && count <= 9) return 'grid-cols-3 grid-rows-3';
      return 'grid-cols-4 grid-rows-3'; 
  };

  // --- HANDLE FILE UPLOAD ---
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      let files = Array.from(e.target.files);
      
      // Limit logic: strict 10 limit in collage
      if (activeTool === 'collage') {
          files = files.filter(f => f.type.startsWith('image'));
          const slotsLeft = 10 - media.length;
          if (slotsLeft <= 0) return; 
          files = files.slice(0, slotsLeft);
      }

      const newFiles = files.map((file, i) => {
        // Calculate scatter position based on TOTAL index (current length + i)
        // This ensures new images land in empty zones
        const scatter = generateScatterPos(media.length + i);

        return {
            id: Math.random().toString(36).substr(2, 9),
            url: URL.createObjectURL(file),
            type: file.type.startsWith('video') ? 'video' : 'image',
            // Collage Data
            left: scatter.left,
            top: scatter.top,
            rotate: scatter.rotate,
            zIndex: scatter.zIndex
        };
      });
      
      setMedia((prev) => [...prev, ...newFiles]);
      if (!activeMediaId && newFiles.length > 0) setActiveMediaId(newFiles[0].id);
      setStep('studio');
    }
  };

  const removeMedia = (id, e) => {
    e.stopPropagation();
    const updated = media.filter(m => m.id !== id);
    setMedia(updated);
    if (updated.length === 0) setStep('upload');
    else if (activeMediaId === id) setActiveMediaId(updated[0]?.id || null);
  };

  const activeItem = media.find(m => m.id === activeMediaId) || media[0];

  const filterStyle = {
    filter: `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturate}%)`,
  };

  const getCollageBg = () => {
      switch(collageBg) {
          case 'light': return 'bg-slate-100';
          case 'paper': return 'bg-[#f0e6d2]';
          default: return 'bg-[#121212]';
      }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/80 backdrop-blur-md p-0 md:p-6"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="w-full h-full md:max-w-6xl md:h-[85vh] bg-slate-50 dark:bg-[#09090b] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row ring-1 ring-white/10 relative"
      >
        
        {/* CLOSE */}
        <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-black/10 hover:bg-red-500/10 hover:text-red-500 text-slate-500 dark:text-white/50 rounded-full transition-colors">
            <X size={20} />
        </button>

        {/* ================= LEFT: CANVAS ================= */}
        <div className="flex-1 bg-[#050505] relative flex items-center justify-center overflow-hidden p-4 md:p-8">
            
            {/* Ambient Blur (Single Mode Only) */}
            {activeTool !== 'collage' && activeItem && (
                <div className="absolute inset-0 opacity-20 blur-3xl scale-150 pointer-events-none">
                    <img src={activeItem.url} className="w-full h-full object-cover" />
                </div>
            )}

            {step === 'upload' ? (
                // UPLOAD
                <label className="group relative w-64 h-80 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-300">
                    <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileUpload} />
                    <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="text-indigo-400" size={28} />
                    </div>
                    <h3 className="text-white font-medium tracking-wide">Start Creation</h3>
                </label>
            ) : (
                // PREVIEW
                <div 
                    ref={containerRef}
                    className={`relative transition-all duration-500 shadow-2xl overflow-hidden ${
                        activeTool === 'collage' 
                        ? `w-full h-full rounded-xl ${getCollageBg()}` 
                        : `bg-black ${aspectRatio} max-h-full`
                    }`}
                >
                    
                    {/* --- COLLAGE MODE --- */}
                    {activeTool === 'collage' ? (
                         <div className="w-full h-full relative p-6 flex items-center justify-center">
                            
                            {/* OPTION A: PERFECT GRID */}
                            {collageMode === 'grid' && (
                                <div className={`w-full h-full grid gap-2 ${getGridClass(media.length)}`}>
                                    {media.map((item, index) => (
                                        <div 
                                            key={item.id} 
                                            className={`relative overflow-hidden rounded-sm bg-black/10 ${
                                                // Layout improvements for odd numbers
                                                media.length === 3 && index === 0 ? 'col-span-2' : ''
                                            } ${
                                                media.length === 5 && index < 2 ? 'col-span-2' : '' 
                                            }`}
                                        >
                                            <img src={item.url} className="w-full h-full object-cover" style={filterStyle} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* OPTION B: SMART SCATTER (RANDOM) */}
                            {collageMode === 'scatter' && media.map((item) => (
                                <motion.div 
                                    key={item.id}
                                    drag
                                    dragConstraints={containerRef}
                                    dragElastic={0.2}
                                    whileDrag={{ scale: 1.1, zIndex: 100, cursor: 'grabbing' }}
                                    // Use absolute positioning % derived from the slot algorithm
                                    style={{ 
                                        left: `${item.left}%`, 
                                        top: `${item.top}%`, 
                                        zIndex: item.zIndex 
                                    }}
                                    animate={{ 
                                        rotate: item.rotate,
                                        scale: 1
                                    }}
                                    // Smaller width (28%) ensures they fit 3-across without huge overlap
                                    className="absolute w-[28%] h-auto shadow-xl cursor-grab"
                                >
                                     {/* Polaroid Style Border */}
                                     <div className={`p-2 bg-white ${collageBg === 'dark' ? 'border border-white/5' : ''}`}>
                                        <img src={item.url} className="w-full h-auto object-cover pointer-events-none block" style={filterStyle} />
                                     </div>
                                </motion.div>
                            ))}
                         </div>
                    ) : (
                    /* --- SINGLE MODE --- */
                        <>
                            {activeItem?.type === 'video' ? (
                                <video src={activeItem.url} className="w-full h-full object-cover" style={filterStyle} autoPlay loop muted />
                            ) : (
                                <img src={activeItem?.url} className="w-full h-full object-cover" style={filterStyle} />
                            )}
                        </>
                    )}

                    {/* CINEMA OVERLAY (Single Mode Only) */}
                    {isCinematic && activeTool !== 'collage' && (
                        <div className="absolute inset-0 pointer-events-none z-20">
                            <div className="absolute top-0 inset-x-0 h-[12%] bg-black transition-all duration-500" />
                            <div className="absolute bottom-0 inset-x-0 h-[12%] bg-black transition-all duration-500" />
                            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                        </div>
                    )}
                </div>
            )}
        </div>


        {/* ================= RIGHT: CONTROLS ================= */}
        {step === 'studio' && (
            <div className="w-full md:w-[380px] bg-white dark:bg-[#0c0c0e] border-l border-slate-200 dark:border-white/5 flex flex-col h-[50vh] md:h-full relative z-40">
                
                {/* TABS */}
                <div className="grid grid-cols-4 p-2 border-b border-slate-100 dark:border-white/5 gap-2">
                    {[
                        { id: 'frame', icon: Crop, label: 'Frame' },
                        { id: 'adjust', icon: Sliders, label: 'Adjust' },
                        { id: 'cinema', icon: Film, label: 'Cinema' },
                        { id: 'collage', icon: Layout, label: 'Board' },
                    ].map((tab) => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTool(tab.id)}
                            className={`flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all ${activeTool === tab.id ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                        >
                            <tab.icon size={18} strokeWidth={2} />
                            <span className="text-[9px] font-bold uppercase tracking-wider">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* CONTROLS */}
                <div className="flex-1 overflow-y-auto p-6">
                    
                    {/* Frame Tools */}
                    {activeTool === 'frame' && (
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Canvas Ratio</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { name: 'Portrait', class: 'aspect-[4/5]', w: 'w-6', h: 'h-8' },
                                    { name: 'Story', class: 'aspect-[9/16]', w: 'w-5', h: 'h-9' },
                                    { name: 'Square', class: 'aspect-square', w: 'w-7', h: 'h-7' },
                                    { name: 'Landscape', class: 'aspect-video', w: 'w-9', h: 'h-5' },
                                ].map((ratio) => (
                                    <button 
                                        key={ratio.name}
                                        onClick={() => setAspectRatio(ratio.class)}
                                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${aspectRatio === ratio.class ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10' : 'border-slate-200 dark:border-white/10 hover:border-slate-300'}`}
                                    >
                                        <div className={`border-2 rounded-sm ${ratio.w} ${ratio.h} ${aspectRatio === ratio.class ? 'border-indigo-500' : 'border-slate-400'}`} />
                                        <span className={`text-xs font-medium ${aspectRatio === ratio.class ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400'}`}>{ratio.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Adjust Tools */}
                    {activeTool === 'adjust' && (
                        <div className="space-y-6">
                            {['brightness', 'contrast', 'saturate'].map((key) => (
                                <div key={key} className="space-y-3">
                                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                                        <span>{key}</span> <span>{adjustments[key]}%</span>
                                    </div>
                                    <input 
                                        type="range" min="0" max="200" 
                                        value={adjustments[key]} 
                                        onChange={(e) => setAdjustments({...adjustments, [key]: e.target.value})}
                                        className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-full appearance-none accent-indigo-500 cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Cinema Tools */}
                    {activeTool === 'cinema' && (
                         <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                             <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${isCinematic ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                                 <Film size={32} />
                             </div>
                             <div>
                                 <h4 className="text-slate-800 dark:text-white font-medium">Cinematic Look</h4>
                                 <p className="text-slate-400 text-xs mt-1 mb-4">Adds letterbox bars and film grain.</p>
                                 <button onClick={() => setIsCinematic(!isCinematic)} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${isCinematic ? 'bg-slate-800 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300'}`}>
                                     {isCinematic ? 'Disable' : 'Enable'}
                                 </button>
                             </div>
                         </div>
                    )}

                    {/* COLLAGE TOOLS */}
                    {activeTool === 'collage' && (
                        <div className="space-y-8">
                            
                            {/* 1. Layout Mode Switch */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Layout Mode</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => setCollageMode('grid')}
                                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${collageMode === 'grid' ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'border-slate-200 dark:border-white/10 text-slate-500'}`}
                                    >
                                        <Grid size={16} /> <span className="text-xs font-bold">Grid</span>
                                    </button>
                                    <button 
                                        onClick={() => setCollageMode('scatter')}
                                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${collageMode === 'scatter' ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'border-slate-200 dark:border-white/10 text-slate-500'}`}
                                    >
                                        <BoxSelect size={16} /> <span className="text-xs font-bold">Scatter</span>
                                    </button>
                                </div>
                            </div>

                            {/* 2. Background Selector */}
                            <div className="text-center">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Board Mood</h4>
                                <div className="flex justify-center gap-4 mb-6">
                                    <button onClick={() => setCollageBg('dark')} className={`w-10 h-10 rounded-full bg-[#121212] border-2 shadow-sm ${collageBg === 'dark' ? 'border-indigo-500 scale-110' : 'border-slate-200 dark:border-white/10'}`} />
                                    <button onClick={() => setCollageBg('paper')} className={`w-10 h-10 rounded-full bg-[#f0e6d2] border-2 shadow-sm ${collageBg === 'paper' ? 'border-indigo-500 scale-110' : 'border-slate-200 dark:border-white/10'}`} />
                                    <button onClick={() => setCollageBg('light')} className={`w-10 h-10 rounded-full bg-slate-100 border-2 shadow-sm ${collageBg === 'light' ? 'border-indigo-500 scale-110' : 'border-slate-200 dark:border-white/10'}`} />
                                </div>
                            </div>
                            
                            <p className="text-[10px] text-slate-400 text-center px-4">
                                Collage limit: 10 Images. Videos disabled.
                            </p>
                        </div>
                    )}

                    {/* Caption Input */}
                    <div className="mt-8 pt-6 border-t border-dashed border-slate-200 dark:border-white/10">
                        <input 
                            type="text" 
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Add the story behind..." 
                            className="w-full bg-transparent border-b border-slate-300 dark:border-white/20 pb-2 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors font-light"
                        />
                    </div>
                </div>

                {/* BOTTOM: FILMSTRIP */}
                <div className="bg-slate-50 dark:bg-[#050505] p-4 border-t border-slate-200 dark:border-white/5">
                    <div className="mb-4">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Assets ({media.length}/10)</p>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            <label className={`shrink-0 w-14 h-14 rounded-lg border border-dashed flex items-center justify-center transition-colors ${activeTool === 'collage' && media.length >= 10 ? 'opacity-50 cursor-not-allowed border-red-500/30' : 'cursor-pointer border-slate-300 dark:border-white/20 hover:border-indigo-500 hover:text-indigo-500 text-slate-400'}`}>
                                <input type="file" multiple className="hidden" disabled={activeTool === 'collage' && media.length >= 10} onChange={handleFileUpload} />
                                <Plus size={18} />
                            </label>
                            <AnimatePresence>
                                {media.map((item) => (
                                    <motion.div 
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
                                        onClick={() => setActiveMediaId(item.id)}
                                        className={`relative shrink-0 w-14 h-14 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${activeMediaId === item.id ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={item.url} className="w-full h-full object-cover" />
                                        <button onClick={(e) => removeMedia(item.id, e)} className="absolute top-0 right-0 w-4 h-4 bg-red-500 flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                                            <X size={8} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95">
                        Publish Story
                    </button>
                </div>
            </div>
        )}
      </motion.div>
    </motion.div>
  );
};
export default StoryCreator;