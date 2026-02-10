import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Image as ImageIcon, ChevronRight, ChevronLeft, Camera, 
  Crop, RotateCcw, Trash2, Tag, Trophy, User, Plus,
  Sliders, Monitor, Square, Smartphone, Maximize, Scissors,
  Play, Pause, Volume2, VolumeX
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Cropper from 'react-easy-crop';

// --- Utility: Image Processor (Bakes edits into new Image) ---
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });

const getProcessedImg = async (imageSrc, pixelCrop, rotation = 0, filters = {}) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx || !pixelCrop) return null;

  const rads = (rotation * Math.PI) / 180;
  const safeWidth = Math.abs(image.width * Math.cos(rads)) + Math.abs(image.height * Math.sin(rads));
  const safeHeight = Math.abs(image.width * Math.sin(rads)) + Math.abs(image.height * Math.cos(rads));

  canvas.width = safeWidth;
  canvas.height = safeHeight;

  ctx.translate(safeWidth / 2, safeHeight / 2);
  ctx.rotate(rads);
  ctx.translate(-image.width / 2, -image.height / 2);

  const { brightness = 100, contrast = 100, saturation = 100 } = filters;
  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;

  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    pixelCrop.x + (safeWidth - image.width) / 2,
    pixelCrop.y + (safeHeight - image.height) / 2,
    pixelCrop.width,
    pixelCrop.height
  );

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.putImageData(data, 0, 0);

  return canvas.toDataURL('image/jpeg', 0.95);
};


const UploadWizard = () => {
  // --- Global State ---
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  
  // --- Edit Mode State ---
  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  
  // Image State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(4 / 5);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
  // Video State
  const [videoDuration, setVideoDuration] = useState(0);
  const [trimRange, setTrimRange] = useState({ start: 0, end: 100 }); // Percentage
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const [editTab, setEditTab] = useState('main'); // 'main' (Crop/Trim) | 'adjust'
  const [filters, setFilters] = useState({ brightness: 100, contrast: 100, saturation: 100 });

  // --- Form State ---
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', 
    isForSale: false, category: 'Artwork', tags: [], isAwardWinning: false 
  });

  const fileInputRef = useRef(null);

  // --- Handlers ---
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        url: URL.createObjectURL(file),
        type: file.type.split('/')[0], // 'image' or 'video'
        id: Math.random().toString(36).substr(2, 9),
        // Default metadata
        edits: { trim: { start: 0, end: 100 }, filters: { brightness: 100, contrast: 100, saturation: 100 } }
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id) => setFiles(prev => prev.filter(f => f.id !== id));

  const openEditor = (file) => {
    setEditingFile(file);
    // Reset Edit State
    setRotation(0);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setFilters(file.edits?.filters || { brightness: 100, contrast: 100, saturation: 100 });
    setTrimRange(file.edits?.trim || { start: 0, end: 100 });
    setEditTab('main');
    setIsEditing(true);
  };

  const saveEdits = async () => {
    if (!editingFile) return;

    try {
      if (editingFile.type === 'image' && croppedAreaPixels) {
        // --- IMAGE SAVE (Bake Changes) ---
        const processedUrl = await getProcessedImg(
          editingFile.url,
          croppedAreaPixels,
          rotation,
          filters
        );
        setFiles(prev => prev.map(f => f.id === editingFile.id ? { ...f, url: processedUrl, edits: { filters } } : f));
      } else {
        // --- VIDEO SAVE (Save Metadata Only) ---
        // We don't cut the video in browser (too heavy). We save the trim data.
        setFiles(prev => prev.map(f => f.id === editingFile.id ? { 
          ...f, 
          edits: { trim: trimRange, filters } 
        } : f));
      }
      setIsEditing(false);
    } catch (e) {
      console.error(e);
      alert("Error saving edits.");
    }
  };

  // --- Video Specific Handlers ---
  const handleLoadedMetadata = (e) => {
    setVideoDuration(e.target.duration);
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // --- Render Editor ---
  const renderEditor = () => {
    const isVideo = editingFile.type === 'video';

    return (
      <div className="fixed inset-0 bg-black z-[60] flex flex-col animate-in fade-in duration-200">
        
        {/* 1. Top Bar */}
        <div className="flex justify-between items-center px-6 py-4 bg-zinc-900 border-b border-zinc-800">
          <button onClick={() => setIsEditing(false)} className="text-zinc-400 hover:text-white text-sm font-medium">Cancel</button>
          <span className="text-zinc-100 font-medium">Edit {isVideo ? 'Video' : 'Image'}</span>
          <button onClick={saveEdits} className="bg-white text-black px-5 py-1.5 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors">Done</button>
        </div>

        {/* 2. Canvas Area */}
        <div className="relative flex-1 bg-zinc-950 overflow-hidden flex items-center justify-center">
          {isVideo ? (
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <video 
                ref={videoRef}
                src={editingFile.url}
                className="w-full h-full object-contain"
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                style={{ 
                  filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)` 
                }}
              />
              {/* Play Button Overlay */}
              <button 
                onClick={toggleVideoPlay}
                className="absolute inset-0 flex items-center justify-center group"
              >
                {!isPlaying && (
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play fill="white" className="text-white ml-1" size={32} />
                  </div>
                )}
              </button>
            </div>
          ) : (
            <Cropper
              image={editingFile?.url}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
              style={{ 
                containerStyle: { background: '#09090b' },
                mediaStyle: { 
                  filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)` 
                }
              }}
            />
          )}
        </div>

        {/* 3. Controls Area */}
        <div className="bg-zinc-900 border-t border-zinc-800 p-6 pb-8 space-y-6">
          
          {/* Tabs */}
          <div className="flex justify-center gap-8 mb-4">
             <button 
               onClick={() => setEditTab('main')}
               className={`flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-wide transition-colors ${editTab === 'main' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
               {isVideo ? <Scissors size={20} /> : <Crop size={20} />}
               {isVideo ? 'Trim' : 'Crop'}
             </button>
             <button 
               onClick={() => setEditTab('adjust')}
               className={`flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-wide transition-colors ${editTab === 'adjust' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
               <Sliders size={20} /> Adjust
             </button>
          </div>

          {/* Controls Content */}
          <div className="h-32 flex items-center justify-center">
            {editTab === 'main' ? (
              isVideo ? (
                // --- VIDEO TRIMMER UI ---
                <div className="w-full max-w-lg space-y-4">
                  <div className="flex justify-between text-xs text-zinc-400 font-mono">
                    <span>{((trimRange.start / 100) * videoDuration).toFixed(1)}s</span>
                    <span>{((trimRange.end / 100) * videoDuration).toFixed(1)}s</span>
                  </div>
                  <div className="relative h-12 bg-zinc-800 rounded-lg overflow-hidden cursor-pointer group">
                    {/* Simulated Timeline Track */}
                    <div className="absolute inset-0 flex gap-0.5 opacity-30">
                       {[...Array(20)].map((_, i) => <div key={i} className="flex-1 bg-zinc-600 rounded-sm"/>)}
                    </div>
                    {/* Selection Box */}
                    <div 
                      className="absolute top-0 bottom-0 bg-white/10 border-x-4 border-white cursor-grab active:cursor-grabbing"
                      style={{ 
                        left: `${trimRange.start}%`, 
                        right: `${100 - trimRange.end}%` 
                      }}
                    />
                    {/* Simple Range Inputs for Logic (Invisible but clickable) */}
                    <input 
                      type="range" min="0" max="100" 
                      value={trimRange.start}
                      onChange={(e) => {
                        const val = Math.min(Number(e.target.value), trimRange.end - 5);
                        setTrimRange(p => ({ ...p, start: val }));
                        if(videoRef.current) videoRef.current.currentTime = (val / 100) * videoDuration;
                      }}
                      className="absolute inset-0 w-full opacity-0 z-10 cursor-col-resize"
                    />
                    <input 
                      type="range" min="0" max="100" 
                      value={trimRange.end}
                      onChange={(e) => {
                         const val = Math.max(Number(e.target.value), trimRange.start + 5);
                         setTrimRange(p => ({ ...p, end: val }));
                         if(videoRef.current) videoRef.current.currentTime = (val / 100) * videoDuration;
                      }}
                      className="absolute inset-0 w-full opacity-0 z-20 cursor-col-resize"
                    />
                  </div>
                  <p className="text-center text-xs text-zinc-500">Drag edges to trim video length</p>
                </div>
              ) : (
                // --- IMAGE CROP UI ---
                <div className="space-y-4 w-full max-w-lg">
                  <div className="flex justify-center gap-3">
                    {[
                      { label: 'Free', val: undefined, icon: <Maximize size={14}/> },
                      { label: '1:1', val: 1, icon: <Square size={14}/> },
                      { label: '4:5', val: 4/5, icon: <Smartphone size={14}/> },
                      { label: '16:9', val: 16/9, icon: <Monitor size={14}/> },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setAspect(opt.val)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                          aspect === opt.val 
                            ? 'bg-zinc-100 text-zinc-900 border-zinc-100' 
                            : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500'
                        }`}
                      >
                        {opt.icon} {opt.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <RotateCcw size={16} className="text-zinc-500" />
                    <input
                      type="range" min={0} max={360}
                      value={rotation}
                      onChange={(e) => setRotation(Number(e.target.value))}
                      className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                  </div>
                </div>
              )
            ) : (
              // --- ADJUST UI (Shared) ---
              <div className="w-full max-w-md space-y-5 animate-in slide-in-from-bottom-2">
                {['brightness', 'contrast', 'saturation'].map((f) => (
                  <div key={f} className="space-y-2">
                    <div className="flex justify-between text-xs text-zinc-400 capitalize">
                      <span>{f}</span>
                      <span>{filters[f]}%</span>
                    </div>
                    <input
                      type="range" min={0} max={200}
                      value={filters[f]}
                      onChange={(e) => setFilters({...filters, [f]: Number(e.target.value)})}
                      className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // --- Render Steps ---
  const renderMediaStep = () => (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      {files.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
          <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
            <ImageIcon className="text-zinc-400" size={32} />
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-zinc-200 dark:shadow-none"
          >
            <Camera size={20} />
            Select from Device
          </button>
          <p className="text-xs text-zinc-400 mt-4">Select multiple files at once</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Hero Item */}
          <div className="group relative w-full aspect-[16/9] md:aspect-[2/1] bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm">
             <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs text-white font-medium z-10 flex items-center gap-2">
               <span>Main Cover</span>
               {files[0].type === 'video' && <span className="bg-red-500 px-1.5 rounded-sm text-[10px] uppercase">Video</span>}
             </div>
             
             {files[0].type === 'video' ? (
               <video 
                 src={files[0].url} 
                 className="w-full h-full object-contain bg-black" 
                 // Apply filters to preview even if not playing
                 style={{ filter: `brightness(${files[0].edits?.filters?.brightness || 100}%) contrast(${files[0].edits?.filters?.contrast || 100}%) saturate(${files[0].edits?.filters?.saturation || 100}%)` }}
               />
             ) : (
               <img src={files[0].url} alt="Main" className="w-full h-full object-contain" />
             )}

             {/* Edit Overlay */}
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
               <button 
                 onClick={() => openEditor(files[0])}
                 className="flex flex-col items-center gap-2 text-white hover:text-zinc-200 transition-transform hover:scale-105"
               >
                 <div className="p-3 bg-white/10 backdrop-blur-md rounded-full">
                   {files[0].type === 'video' ? <Scissors size={24} /> : <Crop size={24} />}
                 </div>
                 <span className="text-xs font-medium tracking-wide">Edit</span>
               </button>
               
               <button 
                 onClick={() => removeFile(files[0].id)}
                 className="flex flex-col items-center gap-2 text-red-400 hover:text-red-300 transition-transform hover:scale-105"
               >
                 <div className="p-3 bg-white/10 backdrop-blur-md rounded-full">
                   <Trash2 size={24} />
                 </div>
                 <span className="text-xs font-medium tracking-wide">Remove</span>
               </button>
             </div>
          </div>

          {/* Sub Items */}
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
             {files.slice(1).map((file) => (
               <div key={file.id} className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 group cursor-pointer" onClick={() => openEditor(file)}>
                 {file.type === 'video' ? (
                   <video src={file.url} className="w-full h-full object-cover" />
                 ) : (
                   <img src={file.url} className="w-full h-full object-cover" alt="sub" />
                 )}
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium">Edit</span>
                 </div>
                 <button 
                    onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                    className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100"
                 >
                   <X size={12} />
                 </button>
               </div>
             ))}
             <button 
               onClick={() => fileInputRef.current?.click()}
               className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-600 text-zinc-500 dark:text-zinc-400 hover:border-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors text-xs font-medium gap-1"
             >
               <Plus size={20} />
               <span>Add</span>
             </button>
          </div>
        </div>
      )}
      <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileSelect} />
    </div>
  );

  const renderDetailsStep = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-2xl mx-auto space-y-10">
       <div className="group relative pt-4">
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="Untitled Masterpiece"
          className="w-full text-2xl font-serif bg-transparent border-0 border-b border-zinc-300 dark:border-zinc-700 focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-0 px-0 py-2 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-zinc-100 transition-all outline-none"
        />
        <label className="block text-xs text-zinc-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-1 left-0">Give your work a name *</label>
      </div>

      <div>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="What is the story behind this piece? (Optional)"
          rows={3}
          className="w-full bg-transparent outline-none border-none p-0 text-lg text-zinc-600 dark:text-zinc-300 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:ring-0 resize-none leading-relaxed"
        />
      </div>

      <div>
        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 block">Category</label>
        <div className="flex gap-3 flex-wrap">
          {['Artwork', 'Photography', 'Video', 'Sketch'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFormData({...formData, category: cat})}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all border ${formData.category === cat ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-transparent' : 'bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Tag size={18} className="text-zinc-400" />
             <span className="text-zinc-700 dark:text-zinc-300 font-medium">For Sale?</span>
          </div>
          <div onClick={() => setFormData({...formData, isForSale: !formData.isForSale})} className={`w-10 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${formData.isForSale ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
            <div className={`w-4 h-4 bg-white dark:bg-zinc-900 rounded-full shadow-sm transition-transform ${formData.isForSale ? 'translate-x-5' : 'translate-x-0'}`} />
          </div>
        </div>
        {formData.isForSale && (
          <div className="mt-4 flex items-baseline gap-1 animate-in slide-in-from-top-2">
             <span className="text-2xl text-zinc-400 font-light">₹</span>
             <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="0" className="w-full bg-transparent outline-none border-none p-0 text-3xl font-light focus:ring-0 text-zinc-900 dark:text-white placeholder:text-zinc-200" />
          </div>
        )}
      </div>

      <div className={`relative rounded-xl border p-4 transition-all duration-300 ${formData.isAwardWinning ? 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800' : 'bg-zinc-50 dark:bg-zinc-900 border-transparent'}`}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setFormData({...formData, isAwardWinning: !formData.isAwardWinning})}>
          <Trophy size={18} className={formData.isAwardWinning ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-400'} />
          <span className={`text-sm font-medium ${formData.isAwardWinning ? 'text-amber-900 dark:text-amber-100' : 'text-zinc-500'}`}>This piece has won an award</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-700">
      
      {/* Editor Modal */}
      {isEditing && editingFile && renderEditor()}

      {/* Main Nav */}
      <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to={"/"}>
            <div className="flex items-center gap-2">
              <span className="text-lg lg:text-2xl font-bold tracking-tight font-Eagle">Painters' Diary</span>
            </div>
          </Link>
          <Link to={"/account"}>
            <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-300">
              <User size={20} />
            </button>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10 pb-32">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-light tracking-tight mb-2">
            {step === 1 ? 'Curate your gallery' : 'Tell the story behind your work'}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {step === 1 ? 'Start by selecting your masterpiece' : 'Add details to help people discover your work'}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex gap-2">
             <div className={`h-1.5 w-6 rounded-full transition-colors ${step >= 1 ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
             <div className={`h-1.5 w-6 rounded-full transition-colors ${step >= 2 ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
          </div>
          <button 
            onClick={() => {
              if (window.confirm("Discard current upload?")) {
                setFiles([]);
                setFormData({ title: '', description: '', price: '', isForSale: false, category: 'Artwork', tags: [], isAwardWinning: false });
                setStep(1);
              }
            }}
            className="text-xs font-medium text-red-500 transition-colors uppercase tracking-wider flex items-center gap-1 justify-center"
          >
          <Trash2 size={12}/> Discard
          </button>
        </div>

        <div className="w-full">
           {step === 1 ? renderMediaStep() : renderDetailsStep()}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 z-40">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
          {step === 2 ? (
            <button onClick={() => setStep(1)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 text-sm font-medium">
              <ChevronLeft size={16} /> Back
            </button>
          ) : <div/>}

          {step === 1 ? (
             <button 
               onClick={() => setStep(2)} 
               disabled={files.length === 0}
               className={`px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${files.length > 0 ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:shadow-lg' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'}`}
             >
               Next Step <ChevronRight size={16} />
             </button>
          ) : (
            <button onClick={() => alert("Published!")} className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-2.5 rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2">
              Publish <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadWizard;