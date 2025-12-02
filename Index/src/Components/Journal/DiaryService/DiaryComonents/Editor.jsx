// import React, { useRef } from 'react';
// import {
//   Eye, EyeOff, Minimize2, Maximize2, CheckCircle2, Send,
//   Loader2, ToggleLeft, ToggleRight, Camera, X, Sparkles,
//   Hash
// } from 'lucide-react';
// import { MdAutoFixHigh, MdOutlineEmojiEmotions } from "react-icons/md";
// import { RiMenuSearchLine } from "react-icons/ri";
// import { HiOutlineSparkles } from "react-icons/hi2";

// const Editor = ({
//   showPreview,
//   setShowPreview,
//   zenMode,
//   setZenMode,
//   autoSave,
//   setAutoSave,
//   isSaving,
//   title,
//   setTitle,
//   images,
//   handleImageUpload,
//   removeImage,
//   content,
//   setContent,
//   activeMode,
//   isThinking,
//   handleAIEnhance,
//   tags,
//   weather,
//   location,
//   setTags,
//   handlePublish,
//   isCreating,
//   fileInputRef
// }) => {
//   const textareaRef = useRef(null);
//   const aiEnhancements = [
//     { type: 'grammar', icon: <MdAutoFixHigh />, label: 'Fix Grammar', desc: 'Polish text' },
//     { type: 'expand', icon: <RiMenuSearchLine />, label: 'Expand', desc: 'Add depth' },
//     { type: 'emotional', icon: <MdOutlineEmojiEmotions />, label: 'Add Emotion', desc: 'More feeling' },
//     { type: 'creative', icon: <HiOutlineSparkles />, label: 'Creative', desc: 'Artistic style' }
//   ];

//   return (
//     <div className="flex-1 flex flex-col min-w-0 bg-transparent">
//       {/* Editor Top Bar */}
//       <div className="px-6 py-3 border-b flex items-center justify-between border-rose-100 dark:border-slate-800">
//         {/* Auto Save Toggle */}
//         <div className="flex items-center gap-3">
//           <button 
//             onClick={() => setAutoSave(!autoSave)}
//             className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-rose-100 dark:hover:bg-slate-700"
//           >
//             {autoSave ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
//             {autoSave ? 'Auto-save ON' : 'Auto-save OFF'}
//           </button>
//           {/* Save Status Indicator */}
//           {autoSave && (
//             <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 transition-opacity duration-300">
//               {isSaving ? <><Loader2 size={12} className="animate-spin"/> Saving...</> : <><CheckCircle2 size={12}/> Saved</>}
//             </span>
//           )}
//         </div>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setShowPreview(!showPreview)}
//             className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:bg-rose-100 dark:hover:bg-slate-700"
//           >
//             {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
//             {showPreview ? 'Edit' : 'Preview'}
//           </button>
//           <button
//             onClick={() => setZenMode(!zenMode)}
//             className="p-2 rounded-lg hover:bg-rose-100 dark:hover:bg-slate-700"
//           >
//             {zenMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
//           </button>
//         </div>
//       </div>
      
//       {/* Editor Scroll Area */}
//       <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
//         <div className="max-w-3xl mx-auto h-full flex flex-col">
//           {showPreview ? (
//             // PREVIEW MODE
//             <div className="rounded-2xl p-8 shadow-sm bg-white/60 dark:bg-[#000705]/30">
//               {/* Title & Meta */}
//               <div className="mb-6 border-b pb-4 border-dashed border-slate-300 dark:border-slate-700">
//                  <h1 className="text-3xl font-bold mb-2">{title || "Untitled Entry"}</h1>
//                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest opacity-60">
//                    <span>{new Date().toLocaleDateString()}</span>
//                    {location && <span>• {location}</span>}
//                    {weather && <span>• {weather}</span>}
//                  </div>
//               </div>
//               {/* Images Grid */}
//               {images.length > 0 && (
//                 <div className={`grid gap-2 mb-6 ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
//                   {images.map((img) => (
//                      <img key={img.id} src={img.url} className="w-full h-40 object-cover rounded-xl shadow-sm" alt="Memory" />
//                   ))}
//                 </div>
//               )}
//               {/* Text */}
//               <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed whitespace-pre-wrap">
//                 {content}
//               </div>
//             </div>
//           ) : (
//             // EDIT MODE
//             <>
//               {/* Title Input */}
//               {activeMode !== 'journal' && (
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   placeholder="Give your story a title..."
//                   className="w-full text-3xl font-bold mb-6 bg-transparent border-none outline-none placeholder-opacity-40 placeholder-slate-300 dark:placeholder-slate-500"
//                 />
//               )}
//               {/* Image Upload Area */}
//               <div className="mb-6">
//                 <input type="file" ref={fileInputRef} multiple onChange={handleImageUpload} className="hidden" accept="image/*" />
                
//                 {/* Image Grid */}
//                 <div className="flex flex-wrap gap-3 mb-2">
//                    {images.map((img) => (
//                      <div key={img.id} className="relative group w-24 h-24">
//                        <img src={img.url} className="w-full h-full object-cover rounded-xl border border-slate-200 dark:border-slate-700" alt="Thumbnail" />
//                        <button onClick={() => removeImage(img.id)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
//                          <X size={12} />
//                        </button>
//                      </div>
//                    ))}
                  
//                   {/* Add Button (Only if < 5) */}
//                   {images.length < 5 && (
//                     <button 
//                       onClick={() => fileInputRef.current?.click()}
//                       className="w-24 h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-colors border-rose-200 dark:border-slate-700 hover:border-rose-400 dark:hover:border-slate-600"
//                     >
//                       <Camera size={20} className="opacity-50" />
//                       <span className="text-[10px] mt-1 font-bold opacity-50">{images.length}/5</span>
//                     </button>
//                   )}
//                 </div>
//               </div>
//               {/* Main Textarea - Expands to fill space */}
//               <textarea
//                 ref={textareaRef}
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder={activeMode === 'journal' ? "How was your day?..." : "Start writing here..."}
//                 className="flex-1 w-full resize-none text-lg leading-relaxed bg-transparent border-none outline-none placeholder-opacity-40 placeholder-slate-400 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200"
//               />
//               {/* Gemini AI Toolbar */}
//               {content.length > 20 && (
//                 <div className="mt-4 p-3 rounded-xl border bg-purple-50/50 dark:bg-[#000705]/50 border-purple-100 dark:border-slate-700">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Sparkles size={14} className="text-purple-500" />
//                       <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Gemini AI Tools</span>
//                       {isThinking && <Loader2 size={12} className="animate-spin text-purple-500"/>}
//                     </div>
//                     <div className="flex gap-2 overflow-x-auto pb-1">
//                       {aiEnhancements.map((enhancement) => (
//                         <button
//                           key={enhancement.type}
//                           onClick={() => handleAIEnhance(enhancement.type)}
//                           disabled={isThinking}
//                           className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors bg-white hover:bg-purple-100 shadow-sm dark:bg-[#000705]/50 dark:hover:bg-slate-800"
//                         >
//                           {enhancement.icon} {enhancement.label}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
      
//       {/* Compact Bottom Action Bar */}
//       <div className="px-6 py-3 border-t flex items-center gap-4 border-rose-100 dark:border-slate-800 bg-white/80 dark:bg-[#000705]/50">
//         {/* Tags */}
//         <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 dark:bg-[#000705]/50">
//           <Hash size={14} className="text-slate-400 dark:text-slate-500" />
//           <input
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//             placeholder="Tags..."
//             className="bg-transparent text-sm w-full outline-none"
//           />
//         </div>
//         {/* Publish Button */}
//         <button
//           onClick={handlePublish}
//           disabled={!content.trim() || isCreating}
//           className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${!content.trim() 
//             ? 'bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500 cursor-not-allowed' 
//             : 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
//           }`}
//         >
//           {isCreating ? <CheckCircle2 size={16} /> : <Send size={16} />}
//           {content.trim() ? "Publish to Garden" : "Start Writing..."}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Editor;






import React, { useRef, useState } from 'react';
import {
  Eye, EyeOff, Minimize2, Maximize2, CheckCircle2, Send,
  Loader2, ToggleLeft, ToggleRight, Camera, X, Sparkles,
  Hash, PenLine, Check
} from 'lucide-react';
import { MdAutoFixHigh, MdOutlineEmojiEmotions } from "react-icons/md";
import { RiMenuSearchLine } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi2";

const Editor = ({
  showPreview, setShowPreview,
  zenMode, setZenMode,
  autoSave, setAutoSave,
  isSaving, // True when user types (if autosave on), False when idle
  title, setTitle,
  images, handleImageUpload, removeImage,
  content, setContent,
  activeMode,
  isThinking, handleAIEnhance,
  tags, setTags,
  weather, location,
  handlePublish,
  publishStatus, // 'idle' | 'loading' | 'success'
  fileInputRef
}) => {
  const textareaRef = useRef(null);
  
  // Helper: Does the user have content?
  const hasContent = content && content.trim().length > 0;

  // Local state for image upload loading
  const [isUploading, setIsUploading] = useState(false);

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
    { type: 'grammar', icon: <MdAutoFixHigh />, label: 'Fix Grammar', desc: 'Polish text' },
    { type: 'expand', icon: <RiMenuSearchLine />, label: 'Expand', desc: 'Add depth' },
    { type: 'emotional', icon: <MdOutlineEmojiEmotions />, label: 'Add Emotion', desc: 'More feeling' },
    { type: 'creative', icon: <HiOutlineSparkles />, label: 'Creative', desc: 'Artistic style' }
  ];

  // --- RENDER HELPERS ---

  // 1. Auto Save Indicator Logic
  const renderAutoSaveIndicator = () => {
    if (!autoSave) return null;
    return (
      <div className="w-24 flex items-center"> 
        {isSaving ? (
          <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 animate-pulse">
            <Loader2 size={12} className="animate-spin" />
            <span className="text-xs italic">Saving...</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-green-500 dark:text-green-400 transition-all duration-500">
            <CheckCircle2 size={12} />
            <span className="text-xs font-medium">Saved</span>
          </div>
        )}
      </div>
    );
  };

  // 2. Publish Button Logic
  const renderPublishButton = () => {
    // State 1: Loading (Spinning)
    if (publishStatus === 'loading') {
      return (
        <button disabled className="px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white opacity-80 cursor-wait">
          <Loader2 size={16} className="animate-spin" />
          <span>Publishing...</span>
        </button>
      );
    }

    // State 2: Success (Green & Checkmark)
    if (publishStatus === 'success') {
      return (
        <button disabled className="px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 bg-green-500 text-white shadow-lg transform scale-105 transition-all">
          <Check size={18} strokeWidth={3} />
          <span>Published Successfully!</span>
        </button>
      );
    }

    // State 3: Content Exists (Active)
    if (hasContent) {
      return (
        <button 
          onClick={handlePublish}
          className="px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <Send size={16} />
          <span>Publish to Garden</span>
        </button>
      );
    }

    // State 4: Empty (Disabled "Start Writing")
    return (
      <button disabled className="px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed transition-all">
        <PenLine size={16} />
        <span>Start Writing...</span>
      </button>
    );
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-transparent">

      {/* Top Bar */}
      <div className="px-6 py-3 border-b flex items-center justify-between border-rose-100 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setAutoSave(!autoSave)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-slate-700 transition-colors"
          >
            {autoSave ? <ToggleRight size={18} className="text-green-500"/> : <ToggleLeft size={18} className="text-slate-400"/>}
            {autoSave ? 'Auto-save ON' : 'Auto-save OFF'}
          </button>
          
          {/* Render Auto Save Status Here */}
          {renderAutoSaveIndicator()}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-slate-700 transition-colors">
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button onClick={() => setZenMode(!zenMode)} className="p-2 rounded-lg hover:bg-rose-100 dark:hover:bg-slate-700 transition-colors">
            {zenMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* Scroll area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-3xl mx-auto h-full flex flex-col">

          {showPreview ? (
            <div className="rounded-2xl p-8 shadow-sm bg-white/60 dark:bg-[#000705]/30">
              <div className="mb-6 border-b pb-4 border-dashed border-slate-300 dark:border-slate-700">
                <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-100">{title || "Untitled Entry"}</h1>
                <div className="flex items-center gap-3 text-xs opacity-60 dark:text-slate-400">
                  <span>{new Date().toLocaleDateString()}</span>
                  {location && <span>• {location}</span>}
                  {weather && <span>• {weather}</span>}
                </div>
              </div>
              {images.length > 0 && (
                <div className={`grid gap-2 mb-6 ${images.length < 3 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {images.map((img) => (
                    <img key={img.id} src={img.url} className="w-full h-40 object-cover rounded-xl shadow-sm" alt="entry attachment" />
                  ))}
                </div>
              )}
              <div className="prose prose-lg dark:prose-invert whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300">
                {content}
              </div>
            </div>
          ) : (
            <>
              {activeMode !== "journal" && (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your story a title..."
                  className="w-full text-3xl font-bold mb-6 bg-transparent outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 dark:text-white"
                />
              )}

              <div className="mb-6">
                <input type="file" ref={fileInputRef} multiple onChange={enhancedImageUpload} className="hidden" accept="image/*" />
                <div className="flex flex-wrap gap-3 mb-2">
                  {images.map((img) => (
                    <div key={img.id} className="relative group w-24 h-24">
                      <img src={img.url} className="w-full h-full object-cover rounded-xl shadow-sm" alt="upload" />
                      <button onClick={() => removeImage(img.id)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {isUploading && (
                    <div className="w-24 h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 animate-pulse border-slate-300 dark:border-slate-600">
                      <Loader2 size={22} className="animate-spin opacity-60 text-rose-500" />
                    </div>
                  )}
                  {!isUploading && images.length < 5 && (
                    <button onClick={() => fileInputRef.current?.click()} className="w-24 h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center hover:border-rose-400 dark:border-slate-700 dark:hover:border-slate-500 transition-colors">
                      <Camera size={20} className="opacity-50" />
                      <span className="text-[10px] mt-1 opacity-50">{images.length}/5</span>
                    </button>
                  )}
                </div>
              </div>

              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={activeMode === 'journal' ? "How was your day?..." : "Start writing here..."}
                className="flex-1 w-full resize-none text-lg bg-transparent outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 text-slate-700 dark:text-slate-200"
              />

              {content.length > 20 && (
                <div className="mt-4 p-3 rounded-xl border bg-purple-50/50 dark:bg-[#000705]/50 border-purple-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-purple-500" />
                    <span className="text-xs font-bold uppercase text-purple-600 dark:text-purple-400">AI Tools</span>
                    {isThinking && <Loader2 size={12} className="animate-spin text-purple-500"/>}
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {aiEnhancements.map((enh) => (
                      <button key={enh.type} onClick={() => handleAIEnhance(enh.type)} disabled={isThinking} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-purple-100 dark:bg-[#000705]/50 dark:hover:bg-slate-800 border border-transparent hover:border-purple-200 transition-all shadow-sm">
                        <span className="flex items-center gap-1">{enh.icon} {enh.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 py-3 border-t flex items-center gap-4 border-rose-100 dark:border-slate-800 bg-white/50 dark:bg-[#000705]/50 backdrop-blur-sm">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 dark:bg-[#000705]/50 border border-transparent focus-within:border-rose-200 dark:focus-within:border-slate-700 transition-colors">
          <Hash size={14} className="opacity-50" />
          <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags..." className="bg-transparent text-sm w-full outline-none" />
        </div>
        
        {/* Render the Dynamic Publish Button */}
        {renderPublishButton()}
      </div>
    </div>
  );
};

export default Editor;