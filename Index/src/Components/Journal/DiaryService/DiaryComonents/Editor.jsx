// import React, { useRef, useState } from 'react';
// import {
//   Eye, EyeOff, Minimize2, Maximize2, CheckCircle2, Send,
//   Loader2, ToggleLeft, ToggleRight, Camera, X, Sparkles,
//   Hash, PenLine, Check
// } from 'lucide-react';
// import { MdAutoFixHigh, MdOutlineEmojiEmotions } from "react-icons/md";
// import { RiMenuSearchLine } from "react-icons/ri";
// import { HiOutlineSparkles } from "react-icons/hi2";

// const Editor = ({
//   showPreview, setShowPreview,
//   zenMode, setZenMode,
//   autoSave, setAutoSave,
//   isSaving, // True when user types (if autosave on), False when idle
//   title, setTitle,
//   images, handleImageUpload, removeImage,
//   content, setContent,
//   activeMode,
//   isThinking, handleAIEnhance,
//   tags, setTags,
//   weather, location,
//   handlePublish,
//   publishStatus, // 'idle' | 'loading' | 'success'
//   fileInputRef
// }) => {
//   const textareaRef = useRef(null);
  
//   // Helper: Does the user have content?
//   const hasContent = content && content.trim().length > 0;

//   // Local state for image upload loading
//   const [isUploading, setIsUploading] = useState(false);

//   const enhancedImageUpload = async (e) => {
//     try {
//       setIsUploading(true);
//       await handleImageUpload(e);
//     } catch (err) {
//       console.error("Failed to upload image.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const aiEnhancements = [
//     { type: 'grammar', icon: <MdAutoFixHigh />, label: 'Fix Grammar', desc: 'Polish text' },
//     { type: 'expand', icon: <RiMenuSearchLine />, label: 'Expand', desc: 'Add depth' },
//     { type: 'emotional', icon: <MdOutlineEmojiEmotions />, label: 'Add Emotion', desc: 'More feeling' },
//     { type: 'creative', icon: <HiOutlineSparkles />, label: 'Creative', desc: 'Artistic style' }
//   ];

//   // --- RENDER HELPERS ---

//   // 1. Auto Save Indicator Logic
//   const renderAutoSaveIndicator = () => {
//     if (!autoSave) return null;
//     return (
//       <div className="w-24 flex items-center"> 
//         {isSaving ? (
//           <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 animate-pulse">
//             <Loader2 size={12} className="animate-spin" />
//             <span className="text-xs italic">Saving...</span>
//           </div>
//         ) : (
//           <div className="flex items-center gap-1.5 text-green-500 dark:text-green-400 transition-all duration-500">
//             <CheckCircle2 size={12} />
//             <span className="text-xs font-medium">Saved</span>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // 2. Publish Button Logic
//   const renderPublishButton = () => {
//     // State 1: Loading (Spinning)
//     if (publishStatus === 'loading') {
//       return (
//         <button disabled className="px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white opacity-80 cursor-wait">
//           <Loader2 size={16} className="animate-spin" />
//           <span>Publishing...</span>
//         </button>
//       );
//     }

//     // State 2: Success (Green & Checkmark)
//     if (publishStatus === 'success') {
//       return (
//         <button disabled className="px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 bg-green-500 text-white shadow-lg transform scale-105 transition-all">
//           <Check size={18} strokeWidth={3} />
//           <span>Published Successfully!</span>
//         </button>
//       );
//     }

//     // State 3: Content Exists (Active)
//     if (hasContent) {
//       return (
//         <button 
//           onClick={handlePublish}
//           className="px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
//         >
//           <Send size={16} />
//           <span>Publish to Garden</span>
//         </button>
//       );
//     }

//     // State 4: Empty (Disabled "Start Writing")
//     return (
//       <button disabled className="px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed transition-all">
//         <PenLine size={16} />
//         <span>Start Writing...</span>
//       </button>
//     );
//   };

//   return (
//     <div className="flex-1 flex flex-col min-w-0 bg-transparent">

//       {/* Top Bar */}
//       <div className="px-6 py-3 border-b flex items-center justify-between border-rose-100 dark:border-slate-800">
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={() => setAutoSave(!autoSave)}
//             className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-slate-700 transition-colors"
//           >
//             {autoSave ? <ToggleRight size={18} className="text-green-500"/> : <ToggleLeft size={18} className="text-slate-400"/>}
//             {autoSave ? 'Auto-save ON' : 'Auto-save OFF'}
//           </button>
          
//           {/* Render Auto Save Status Here */}
//           {renderAutoSaveIndicator()}
//         </div>

//         <div className="flex items-center gap-2">
//           <button onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-slate-700 transition-colors">
//             {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
//             {showPreview ? 'Edit' : 'Preview'}
//           </button>
//           <button onClick={() => setZenMode(!zenMode)} className="p-2 rounded-lg hover:bg-rose-100 dark:hover:bg-slate-700 transition-colors">
//             {zenMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
//           </button>
//         </div>
//       </div>

//       {/* Scroll area */}
//       <div className="flex-1 overflow-y-auto p-6 md:p-8">
//         <div className="max-w-3xl mx-auto h-full flex flex-col">

//           {showPreview ? (
//             <div className="rounded-2xl p-8 shadow-sm bg-white/60 dark:bg-[#000705]/30">
//               <div className="mb-6 border-b pb-4 border-dashed border-slate-300 dark:border-slate-700">
//                 <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-100">{title || "Untitled Entry"}</h1>
//                 <div className="flex items-center gap-3 text-xs opacity-60 dark:text-slate-400">
//                   <span>{new Date().toLocaleDateString()}</span>
//                   {location && <span>• {location}</span>}
//                   {weather && <span>• {weather}</span>}
//                 </div>
//               </div>
//               {images.length > 0 && (
//                 <div className={`grid gap-2 mb-6 ${images.length < 3 ? 'grid-cols-2' : 'grid-cols-3'}`}>
//                   {images.map((img) => (
//                     <img key={img.id} src={img.url} className="w-full h-40 object-cover rounded-xl shadow-sm" alt="entry attachment" />
//                   ))}
//                 </div>
//               )}
//               <div className="prose prose-lg dark:prose-invert whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300">
//                 {content}
//               </div>
//             </div>
//           ) : (
//             <>
//               {activeMode !== "journal" && (
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   placeholder="Give your story a title..."
//                   className="w-full text-3xl font-bold mb-6 bg-transparent outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 dark:text-white"
//                 />
//               )}

//               <div className="mb-6">
//                 <input type="file" ref={fileInputRef} multiple onChange={enhancedImageUpload} className="hidden" accept="image/*" />
//                 <div className="flex flex-wrap gap-3 mb-2">
//                   {images.map((img) => (
//                     <div key={img.id} className="relative group w-24 h-24">
//                       <img src={img.url} className="w-full h-full object-cover rounded-xl shadow-sm" alt="upload" />
//                       <button onClick={() => removeImage(img.id)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <X size={12} />
//                       </button>
//                     </div>
//                   ))}
//                   {isUploading && (
//                     <div className="w-24 h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 animate-pulse border-slate-300 dark:border-slate-600">
//                       <Loader2 size={22} className="animate-spin opacity-60 text-rose-500" />
//                     </div>
//                   )}
//                   {!isUploading && images.length < 5 && (
//                     <button onClick={() => fileInputRef.current?.click()} className="w-24 h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center hover:border-rose-400 dark:border-slate-700 dark:hover:border-slate-500 transition-colors">
//                       <Camera size={20} className="opacity-50" />
//                       <span className="text-[10px] mt-1 opacity-50">{images.length}/5</span>
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <textarea
//                 ref={textareaRef}
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder={activeMode === 'journal' ? "How was your day?..." : "Start writing here..."}
//                 className="flex-1 w-full resize-none text-lg bg-transparent outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 text-slate-700 dark:text-slate-200"
//               />

//               {content.length > 20 && (
//                 <div className="mt-4 p-3 rounded-xl border bg-purple-50/50 dark:bg-[#000705]/50 border-purple-100 dark:border-slate-700">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Sparkles size={14} className="text-purple-500" />
//                     <span className="text-xs font-bold uppercase text-purple-600 dark:text-purple-400">AI Tools</span>
//                     {isThinking && <Loader2 size={12} className="animate-spin text-purple-500"/>}
//                   </div>
//                   <div className="flex gap-2 overflow-x-auto pb-1">
//                     {aiEnhancements.map((enh) => (
//                       <button key={enh.type} onClick={() => handleAIEnhance(enh.type)} disabled={isThinking} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-purple-100 dark:bg-[#000705]/50 dark:hover:bg-slate-800 border border-transparent hover:border-purple-200 transition-all shadow-sm">
//                         <span className="flex items-center gap-1">{enh.icon} {enh.label}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="px-6 py-3 border-t flex items-center gap-4 border-rose-100 dark:border-slate-800 bg-white/50 dark:bg-[#000705]/50 backdrop-blur-sm">
//         <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 dark:bg-[#000705]/50 border border-transparent focus-within:border-rose-200 dark:focus-within:border-slate-700 transition-colors">
//           <Hash size={14} className="opacity-50" />
//           <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags..." className="bg-transparent text-sm w-full outline-none" />
//         </div>
        
//         {/* Render the Dynamic Publish Button */}
//         {renderPublishButton()}
//       </div>
//     </div>
//   );
// };

// export default Editor;



import React, { useRef, useState } from 'react';
import {
  Eye, EyeOff, Minimize2, Maximize2, CheckCircle2, Send,
  Loader2, ToggleLeft, ToggleRight, X, Sparkles,
  Hash, PenLine, Check, Plus, MapPin, Cloud, Camera, Image as ImageIcon
} from 'lucide-react';
import { MdAutoFixHigh, MdOutlineEmojiEmotions } from "react-icons/md";
import { RiMenuSearchLine } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi2";

const Editor = ({
  showPreview, setShowPreview,
  zenMode, setZenMode,
  autoSave, setAutoSave,
  isSaving,
  title, setTitle,
  images, handleImageUpload, removeImage,
  content, setContent,
  activeMode, // 'travelDiaries' or 'idea'
  isThinking, handleAIEnhance,
  tags, setTags,
  weather, location,
  handlePublish,
  publishStatus,
  fileInputRef
}) => {
  const textareaRef = useRef(null);
  const hasContent = content && content.trim().length > 0;
  const [isUploading, setIsUploading] = useState(false);

  // --- SEASONAL DATE LOGIC ---
  const getSeasonalDate = () => {
    const date = new Date();
    const month = date.getMonth(); // 0-11
    const day = date.getDate();
    const monthName = date.toLocaleString('default', { month: 'long' });
    
    // Simple Northern Hemisphere Season Logic
    let season = "Season";
    if (month === 11 || month === 0 || month === 1) season = "Winter";
    else if (month >= 2 && month <= 4) season = "Spring";
    else if (month >= 5 && month <= 7) season = "Summer";
    else season = "Autumn";

    return `${season}, ${monthName} ${day}`;
  };

  const enhancedImageUpload = async (e) => {
    try {
      setIsUploading(true);
      await handleImageUpload(e);
    } catch (err) {
      console.error("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const aiEnhancements = [
    { type: 'grammar', icon: <MdAutoFixHigh />, label: 'Fix' },
    { type: 'expand', icon: <RiMenuSearchLine />, label: 'Expand' },
    { type: 'emotional', icon: <MdOutlineEmojiEmotions />, label: 'Tone' },
    { type: 'creative', icon: <HiOutlineSparkles />, label: 'Style' }
  ];

  // --- RENDER HELPERS ---

  const renderPublishButton = () => {
    if (publishStatus === 'loading') {
      return (
        <button disabled className="px-5 py-2 rounded-md font-bold text-xs uppercase tracking-wide flex items-center gap-2 bg-zinc-100 text-zinc-400 cursor-wait dark:bg-zinc-800">
          <Loader2 size={14} className="animate-spin" />
          <span>Processing</span>
        </button>
      );
    }
    if (publishStatus === 'success') {
      return (
        <button disabled className="px-5 py-2 rounded-md font-bold text-xs uppercase tracking-wide flex items-center gap-2 bg-zinc-900 text-white dark:bg-white dark:text-black">
          <Check size={14} />
          <span>Done</span>
        </button>
      );
    }
    if (hasContent) {
      return (
        <button 
          onClick={handlePublish}
          className="px-5 py-2 rounded-md font-bold text-xs uppercase tracking-wide flex items-center gap-2 bg-zinc-900 text-white hover:bg-black shadow-lg hover:shadow-xl transition-all dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          <Send size={14} />
          <span>Publish</span>
        </button>
      );
    }
    return (
      <button disabled className="px-5 py-2 rounded-md font-bold text-xs uppercase tracking-wide flex items-center gap-2 bg-zinc-100 text-zinc-300 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed">
        <PenLine size={14} />
        <span>Empty</span>
      </button>
    );
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-black">

      {/* Top Bar */}
      <div className="px-8 py-4 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between bg-white/90 dark:bg-black/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                {activeMode === 'travelDiaries' ? 'Travel Log' : 'Creative Blog'}
             </span>
             {activeMode === 'travelDiaries' && (
                <span className="text-xs font-serif italic text-zinc-500 mt-0.5">
                   {getSeasonalDate()}
                </span>
             )}
             {activeMode === 'idea' && (
                <span className="text-xs font-medium text-zinc-500 mt-0.5">
                   {new Date().toLocaleDateString()}
                </span>
             )}
          </div>
          
          <button 
            onClick={() => setAutoSave(!autoSave)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors ml-4 border-l border-zinc-200 pl-4 dark:border-zinc-800"
          >
            {autoSave ? <ToggleRight size={18} className="text-zinc-800 dark:text-zinc-200"/> : <ToggleLeft size={18} className="text-zinc-300"/>}
            <span>Autosave</span>
          </button>

           {isSaving && <Loader2 size={12} className="animate-spin text-zinc-400" />}
        </div>

        <div className="flex items-center gap-1">
          <button onClick={() => setShowPreview(!showPreview)} className="p-2 rounded-md hover:bg-zinc-100 text-zinc-400 dark:hover:bg-zinc-900 transition-colors">
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          {/* <button onClick={() => setZenMode(!zenMode)} className="p-2 rounded-md hover:bg-zinc-100 text-zinc-400 dark:hover:bg-zinc-900 transition-colors">
            {zenMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button> */}
        </div>
      </div>

      {/* Main Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="max-w-3xl mx-auto h-full flex flex-col">

          {/* PREVIEW MODE */}
          {showPreview ? (
            <div className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
               {/* Preview Header */}
              <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight leading-tight">{title || "Untitled"}</h1>
                
                {/* Specific Travel Details in Preview */}
                {activeMode === 'travelDiaries' ? (
                   <div className="flex justify-center items-center gap-4 text-xs font-medium uppercase tracking-widest text-zinc-500 border-t border-b border-zinc-100 dark:border-zinc-900 py-3 mx-auto max-w-md">
                     <span>{getSeasonalDate()}</span>
                     {location && <span>• {location}</span>}
                     {weather && <span>• {weather}</span>}
                   </div>
                ) : (
                   <div className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                     {new Date().toLocaleDateString()}
                   </div>
                )}
              </div>
              
              {images.length > 0 && (
                <div className={`grid gap-4 mb-12 ${activeMode === 'travelDiaries' ? 'grid-cols-2 rotate-1' : 'grid-cols-1'}`}>
                  {images.map((img) => (
                    <div key={img.id} className={`${activeMode === 'travelDiaries' ? 'p-2 bg-white shadow-lg border border-zinc-100 transform hover:-rotate-1 transition-transform' : ''}`}>
                       <img src={img.url} className="w-full h-auto object-cover grayscale-[10%]" alt="content" />
                    </div>
                  ))}
                </div>
              )}
              
              <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none font-serif leading-loose first-letter:text-5xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                {content}
              </div>
            </div>
          ) : (
            /* EDIT MODE */
            <>
              {/* Title Input */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={activeMode === 'travelDiaries' ? "Journey Title..." : "Blog Headline..."}
                className="w-full text-4xl md:text-5xl font-serif font-bold mb-6 bg-transparent outline-none placeholder:text-zinc-200 dark:placeholder:text-zinc-800 text-zinc-900 dark:text-white tracking-tight"
              />

              {/* Meta Data Display (Visual Only for Editor) */}
              {activeMode === 'travelDiaries' && (
                  <div className="flex items-center gap-4 mb-8 text-zinc-400 text-xs font-medium uppercase tracking-wider">
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-50 dark:bg-zinc-900 rounded-full">
                          <span className="text-zinc-800 dark:text-zinc-300">{getSeasonalDate()}</span>
                      </div>
                      {location && (
                          <div className="flex items-center gap-1">
                              <MapPin size={12}/> {location}
                          </div>
                      )}
                      {weather && (
                          <div className="flex items-center gap-1">
                              <Cloud size={12}/> {weather}
                          </div>
                      )}
                  </div>
              )}

              {/* Differentiated Image Section */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                     <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                        {activeMode === 'travelDiaries' ? <Camera size={14}/> : <ImageIcon size={14}/>}
                        {activeMode === 'travelDiaries' ? "Sketches & Snaps" : "Gallery"}
                     </h3>
                     <span className="text-[10px] text-zinc-300">{images.length} items</span>
                </div>

                <input type="file" ref={fileInputRef} multiple onChange={enhancedImageUpload} className="hidden" accept="image/*" />
                
                <div className="flex flex-wrap gap-4">
                  {images.map((img) => (
                    <div key={img.id} className={`relative group w-32 h-32 ${activeMode === 'travelDiaries' ? 'rotate-1 border-4 border-white shadow-md' : 'rounded-md'}`}>
                      <img src={img.url} className="w-full h-full object-cover" alt="upload" />
                      <button onClick={() => removeImage(img.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all shadow-md">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  
                  {isUploading && (
                    <div className="w-32 h-32 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 animate-pulse">
                      <Loader2 size={20} className="animate-spin text-zinc-400" />
                    </div>
                  )}

                  <button 
                    onClick={() => fileInputRef.current?.click()} 
                    className="w-32 h-32 border border-zinc-300 hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-500 flex flex-col items-center justify-center transition-all bg-zinc-50/30 hover:bg-zinc-50 dark:bg-zinc-900/30"
                  >
                    <Plus size={20} className="text-zinc-300 mb-2" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Add</span>
                  </button>
                </div>
                <p className=' text-[10px] pt-2'> First image will be considered as cover image</p>

              </div>

              {/* Main Editor */}
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={activeMode === 'travelDiaries' ? "Describe the scenery, the people, the feeling..." : "Share your thoughts..."}
                className="flex-1 w-full resize-none text-lg md:text-xl font-serif leading-relaxed bg-transparent outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-800 text-zinc-800 dark:text-zinc-200"
              />

              {/* AI Suggestion Bar */}
              {content.length > 50 && (
                <div className="mt-8 pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <Sparkles size={14} className="text-zinc-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">AI Polish</span>
                    {isThinking && <Loader2 size={12} className="animate-spin text-zinc-500"/>}
                    
                    <div className="flex gap-2">
                      {aiEnhancements.map((enh) => (
                        <button 
                            key={enh.type} 
                            onClick={() => handleAIEnhance(enh.type)} 
                            disabled={isThinking} 
                            className="px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wide bg-zinc-50 hover:bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-all"
                        >
                            {enh.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-8 py-4 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black flex items-center justify-between gap-6">
        <div className="flex-1 flex items-center gap-3 px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-transparent focus-within:border-zinc-300 dark:focus-within:border-zinc-800 transition-colors">
          <Hash size={14} className="text-zinc-400" />
          <input 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
            placeholder="Tags..." 
            className="bg-transparent text-xs w-full outline-none text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400" 
          />
        </div>
        
        {renderPublishButton()}
      </div>
    </div>
  );
};

export default Editor;