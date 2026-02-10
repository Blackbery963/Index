// import React from 'react';
// import {
//   MapPin, Cloud, Bot, ChevronDown, ChevronUp, X,
//   Sun, Flower, Zap, Star
// } from 'lucide-react';


// const Sidebar = ({
//   activeMode,
//   setActiveMode,
//   emotion,
//   setEmotion,
//   location,
//   setLocation,
//   weather,
//   setWeather,
//   weatherOptions,
//   emotions,
//   entryTypes,
//   isMobileMenuOpen,
//   setIsMobileMenuOpen,
//   aiDropdownOpen,
//   setAiDropdownOpen,
//   handleAIEnhance,
//   isThinking,
//   tips,
//   currentTipIndex,
//   aiEnhancements
// }) => {
//   return (
//     <div className={`lg:w-64 border-r flex-shrink-0 flex flex-col overflow-y-auto border-rose-100 dark:border-slate-800 bg-rose-50/50 dark:bg-[#000705]/30 ${isMobileMenuOpen ? 'fixed inset-0 z-50 bg-white dark:bg-[#000705] lg:static' : 'hidden lg:flex'}`}>
//       {isMobileMenuOpen && (
//         <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 p-2 z-60 hover:bg-rose-100 dark:hover:bg-slate-800 rounded-lg">
//           <X size={24}/>
//         </button>
//       )}
//       <div className="p-5 space-y-6">
//         {/* Mood Selector */}
//         <div>
//           <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 block">Current Mood</label>
//           <div className="grid grid-cols-2 gap-2">
//             {emotions.map((emo) => (
//               <button
//                 key={emo.id}
//                 onClick={() => setEmotion(emo.id)}
//                 className={`p-2 rounded-lg border text-left transition-all ${
//                   emotion === emo.id
//                     ? 'border-rose-400 bg-rose-100 dark:bg-rose-900/30'
//                     : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'
//                 }`}
//               >
//                 <span className="text-xl mr-2">{emo.icon}</span>
//                 <span className="text-xs font-medium">{emo.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//         {/* Type Selector */}
//         <div>
//           <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 block">Entry Format</label>
//           <div className="space-y-2">
//             {entryTypes.map((type) => (
//               <button
//                 key={type.id}
//                 onClick={() => setActiveMode(type.id)}
//                 className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
//                   activeMode === type.id
//                     ? `bg-gradient-to-r ${type.color} text-white shadow-md`
//                     : 'bg-white hover:bg-rose-50 border border-rose-100 dark:bg-[#000705]/50 dark:hover:bg-slate-800 dark:border-slate-700'
//                 }`}
//               >
//                 <span className="text-lg">{type.icon}</span>
//                 <div className="text-left">
//                   <div className="text-sm font-bold">{type.title}</div>
//                   <div className="text-[10px] opacity-80">{type.desc}</div>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//         {/* Context */}
//         <div className="space-y-3">
//           <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 block">Context</label>
//           <div className="flex items-center gap-2 p-2 rounded-lg border bg-white border-rose-100 dark:bg-[#000705]/50 dark:border-slate-700">
//             <MapPin size={14} className="text-rose-400" />
//             <input
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               placeholder="Location"
//               className="bg-transparent text-sm w-full outline-none"
//             />
//           </div>
//           <div className="flex items-center gap-2 p-2 rounded-lg border bg-white border-rose-100 dark:bg-[#000705]/50 dark:border-slate-700">
//             <Cloud size={14} className="text-blue-400" />
//             <select
//               value={weather}
//               onChange={(e) => setWeather(e.target.value)}
//               className="bg-transparent text-sm w-full outline-none appearance-none cursor-pointer"
//             >
//               <option value="">Select Weather</option>
//               {weatherOptions.map(w => <option key={w} value={w}>{w}</option>)}
//             </select>
//           </div>
//         </div>
//         {/* AI Assistant */}
//         <div className="space-y-2">
//           <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">AI Assistant</label>
//           <div className="relative">
//             <button
//               onClick={() => setAiDropdownOpen(!aiDropdownOpen)}
//               className="w-full flex items-center justify-between gap-2 p-2 rounded-lg border bg-white border-rose-100 hover:border-rose-300 dark:bg-[#000705]/50 dark:border-slate-700 dark:hover:border-slate-600 transition-colors"
//             >
//               <div className="flex items-center gap-2">
//                 <Bot size={16} className="text-purple-500" />
//                 <span className="text-xs font-medium">Gemini Enhance</span>
//               </div>
//               {aiDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//             </button>
//             {aiDropdownOpen && (
//               <div className="absolute z-10 w-full mt-1 bg-white dark:bg-[#000705]/50 border border-rose-100 dark:border-slate-700 rounded-lg shadow-lg p-2">
//                 {aiEnhancements.map((enhancement) => (
//                   <button
//                     key={enhancement.type}
//                     onClick={() => { handleAIEnhance(enhancement.type); setAiDropdownOpen(false); }}
//                     disabled={isThinking}
//                     className="w-full px-3 py-2 rounded text-left text-xs font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-50 dark:hover:bg-slate-800"
//                   >
//                     {enhancement.icon}
//                     {enhancement.label}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//         {/* Tips & Motivation */}
//         <div className="space-y-2 pt-4 border-t border-rose-200 dark:border-slate-700">
//           <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">Bloom Tip</label>
//           <div className="p-3 rounded-lg border bg-white/50 dark:bg-[#000705]/30 border-rose-100 dark:border-slate-700 animate-fade-in-slow">
//             <div className="flex items-center gap-2 mb-2">
//               <span className="text-lg">{tips[currentTipIndex].icon}</span>
//               <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">Inspire</span>
//             </div>
//             <p className="text-xs leading-tight text-slate-600 dark:text-slate-300 mb-1">{tips[currentTipIndex].text}</p>
//             <p className="text-[10px] italic text-slate-500 dark:text-slate-400">"{tips[currentTipIndex].quote}"</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



import React from 'react';
import {
  MapPin, Cloud, Bot, ChevronDown, ChevronUp, X
} from 'lucide-react';
import { RiGeminiLine } from 'react-icons/ri';

const Sidebar = ({
  activeMode,
  setActiveMode,
  emotion,
  setEmotion,
  location,
  setLocation,
  weather,
  setWeather,
  weatherOptions,
  emotions,
  entryTypes,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  aiDropdownOpen,
  setAiDropdownOpen,
  handleAIEnhance,
  isThinking,
  tips,
  currentTipIndex,
  aiEnhancements
}) => {
  return (
    <div className={`lg:w-72 border-r flex-shrink-0 flex flex-col overflow-y-auto border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-black ${isMobileMenuOpen ? 'fixed inset-0 z-50 bg-white dark:bg-zinc-950 lg:static' : 'hidden lg:flex'}`}>
      
      {isMobileMenuOpen && (
        <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 p-2 z-60 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md transition-colors">
          <X size={20}/>
        </button>
      )}

      <div className="p-6 space-y-8">
        
        {/* Type Selector */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3 block">Select Canvas</label>
          <div className="space-y-2">
            {entryTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveMode(type.id)}
                className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all border ${
                  activeMode === type.id
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg dark:bg-zinc-100 dark:text-zinc-900'
                    : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
              >
                <span className={`transition-colors ${activeMode === type.id ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-400'}`}>
                    {type.icon}
                </span>
                <div className="text-left">
                  <div className="text-sm font-semibold tracking-tight">{type.title}</div>
                  <div className="text-[10px] opacity-70 font-medium">{type.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mood Selector - Always Visible */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3 block">Vibe & Tone</label>
          <div className="grid grid-cols-2 gap-2">
            {emotions.map((emo) => (
              <button
                key={emo.id}
                onClick={() => setEmotion(emo.id)}
                className={`p-2 rounded-md border text-left transition-all flex items-center gap-2 ${
                  emotion === emo.id
                    ? 'border-zinc-900 bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:border-zinc-100 dark:text-white'
                    : 'border-transparent bg-transparent text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <span className="opacity-70 text-sm">{emo.icon}</span>
                <span className="text-xs font-medium">{emo.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Context - ONLY FOR TRAVEL DIARIES */}
        {activeMode === 'travelDiaries' && (
          <div className="space-y-3 animate-in fade-in slide-in-from-left-2 duration-300">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1 block">Journey Details</label>
            
            <div className="group flex items-center gap-3 px-3 py-2.5 rounded-md border border-zinc-200 bg-white focus-within:border-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:focus-within:border-zinc-500 transition-all">
              <MapPin size={14} className="text-zinc-400" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where are you?"
                className="bg-transparent text-xs font-medium w-full outline-none placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-200"
              />
            </div>

            <div className="group flex items-center gap-3 px-3 py-2.5 rounded-md border border-zinc-200 bg-white focus-within:border-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:focus-within:border-zinc-500 transition-all">
              <Cloud size={14} className="text-zinc-400" />
              <select
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
                className="bg-transparent text-xs font-medium w-full outline-none appearance-none cursor-pointer text-zinc-900 dark:text-zinc-200 "
              >
                <option value="">Current Weather</option>
                {weatherOptions.map(w => <option className='bg-gray-100 dark:bg-zinc-900 mx-2 ' key={w} value={w}>{w}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* AI Assistant */}
        <div className="space-y-2 pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800">
          <div className="relative">
            <button
              onClick={() => setAiDropdownOpen(!aiDropdownOpen)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-500 dark:text-zinc-400"
            >
              <div className="flex items-center gap-2">
                <RiGeminiLine size={14} />
                <span className="text-xs font-semibold">Gemini Assistant</span>
              </div>
              {aiDropdownOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            
            {aiDropdownOpen && (
              <div className="absolute z-10 w-full bottom-full mb-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-2xl p-1">
                {aiEnhancements.map((enhancement) => (
                  <button
                    key={enhancement.type}
                    onClick={() => { handleAIEnhance(enhancement.type); setAiDropdownOpen(false); }}
                    disabled={isThinking}
                    className="w-full px-3 py-2 rounded-sm text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                  >
                    {enhancement.icon}
                    {enhancement.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tip */}
        <div className="pt-2 border border-zinc-800 dark:border-zinc-400 rounded-lg py-4 bg-gradient-to-tl from-transparent to-gray-300 dark:to-gray-900">
          <p className="text-[10px] text-center text-zinc-400 font-serif italic">
            "{tips[currentTipIndex].quote}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;