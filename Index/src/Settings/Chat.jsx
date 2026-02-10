// import React, { useState, useRef, useEffect } from 'react';
// import EmojiPicker from 'emoji-picker-react';
// import { 
//   Send, Paperclip, Mic, Smile, X, Image as ImageIcon, 
//   FileText, ChevronLeft, ChevronRight,
//   LayoutGrid, Settings, LogOut,
//   Check, CheckCheck, PanelRight,
//   PlayCircle, Film, Phone, Video
// } from 'lucide-react';
// import { Link } from 'react-router-dom';

// // --- Utility: Click Outside Hook ---
// function useClickOutside(ref, handler) {
//   useEffect(() => {
//     const listener = (event) => {
//       if (!ref.current || ref.current.contains(event.target)) return;
//       handler(event);
//     };
//     document.addEventListener("mousedown", listener);
//     document.addEventListener("touchstart", listener);
//     return () => {
//       document.removeEventListener("mousedown", listener);
//       document.removeEventListener("touchstart", listener);
//     };
//   }, [ref, handler]);
// }

// // --- Data ---
// const CONTACTS = [
//   { id: 1, name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', status: 'online', role: 'Art Director', bio: 'Capturing moments 📸 | Design enthusiast', lastMsg: 'Sent the assets!', unread: 2 },
//   { id: 2, name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', status: 'away', role: 'Lead Dev', bio: 'Full stack overflow.', lastMsg: 'Deploying now...', unread: 0 },
//   { id: 3, name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', status: 'online', role: 'Product Owner', bio: 'Coffee first, roadmap second.', lastMsg: 'Meeting at 3?', unread: 0 },
//   { id: 4, name: 'James Rod', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', status: 'offline', role: 'Manager', bio: 'Approved.', lastMsg: 'Approved.', unread: 0 },
//   { id: 5, name: 'Lisa Ray', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop', status: 'online', role: 'Marketing', bio: 'Check email.', lastMsg: 'Check email.', unread: 1 },
//   { id: 6, name: 'Tom Baker', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop', status: 'online', role: 'Sales', bio: 'Call me.', lastMsg: 'Call me.', unread: 0 },
// ];

// const WALLPAPERS = [
//   { id: 'soft-purple', name: 'Lavender Mist', value: 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)' }, 
//   // Using a soft CSS gradient for a cleaner "soft" look as default, or use images below:
//   { id: 'mountains', name: 'Misty Peaks', value: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop)' },
//   { id: 'neon', name: 'Neon City', value: 'url(https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2000&auto=format&fit=crop)' },
//   { id: 'abstract', name: 'Dark Abstract', value: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop)' },
//   { id: 'minimal', name: 'Zinc Gradient', value: 'linear-gradient(to top right, #18181b, #27272a)' },
// ];

// const INITIAL_MESSAGES = [
//   { id: 1, senderId: 2, text: 'Hey! Did you see the new design concepts?', time: '10:30 AM', type: 'text', reactions: [], status: 'read' },
//   { id: 2, senderId: 0, text: 'Yes, looking sharp! ✨', time: '10:32 AM', type: 'text', reactions: ['❤️'], status: 'read' },
//   { id: 3, senderId: 2, text: 'Here is the revised background.', time: '10:35 AM', type: 'text', reactions: [], status: 'read' },
//   { id: 4, senderId: 2, url: 'https://images.unsplash.com/photo-1614850523060-8da1d56ae167?w=600', text: 'design_v2.jpg', time: '10:35 AM', type: 'image', reactions: [], status: 'read' },
// ];

// const ChatApp = () => {
//   // --- State ---
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
//   const [showRightPanel, setShowRightPanel] = useState(false);
//   const [galleryTab, setGalleryTab] = useState('media');
  
//   const [selectedContact, setSelectedContact] = useState(CONTACTS[0]);
//   const [messages, setMessages] = useState(INITIAL_MESSAGES);
//   const [inputText, setInputText] = useState('');
//   const [currentWallpaper, setCurrentWallpaper] = useState(WALLPAPERS[0]);

//   // --- Popups ---
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [showAttachMenu, setShowAttachMenu] = useState(false);
//   const [showWallpaperMenu, setShowWallpaperMenu] = useState(false);

//   // --- Refs ---
//   const scrollRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const emojiRef = useRef(null);
//   const attachRef = useRef(null);
//   const wpMenuRef = useRef(null);

//   useClickOutside(emojiRef, () => setShowEmoji(false));
//   useClickOutside(attachRef, () => setShowAttachMenu(false));
//   useClickOutside(wpMenuRef, () => setShowWallpaperMenu(false));

//   useEffect(() => {
//     if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//   }, [messages]);

//   // --- Handlers ---
//   const handleSend = (e) => {
//     e.preventDefault();
//     if (!inputText.trim()) return;
    
//     const newMsg = {
//       id: Date.now(),
//       senderId: 0,
//       text: inputText,
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       type: 'text',
//       reactions: [],
//       status: 'sent'
//     };
//     setMessages(prev => [...prev, newMsg]);
//     setInputText('');
//     setShowEmoji(false);
//   };

//   const handleDoubleTap = (msgId) => {
//     setMessages(prev => prev.map(msg => {
//       if (msg.id === msgId) {
//         const hasLiked = msg.reactions.includes('❤️');
//         return { ...msg, reactions: hasLiked ? msg.reactions.filter(r => r !== '❤️') : [...msg.reactions, '❤️'] };
//       }
//       return msg;
//     }));
//   };

//   const handleFileUpload = (type) => {
//     if(fileInputRef.current) {
//         fileInputRef.current.click();
//         setShowAttachMenu(false);
//     }
//   };

//   // Glass Morphism Base Class
//   const glassClass = "bg-white/30 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl";

//   return (
//     <div className="fixed inset-0 bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-sans overflow-hidden flex flex-col md:flex-row p-0 md:p-4 gap-3 transition-all duration-300">
      
//       {/* --- BACKGROUND --- */}
//       <div className="absolute inset-0 z-0">
//         <div 
//           className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out scale-105"
//           style={{ backgroundImage: currentWallpaper.value }}
//         />
//         <div className="absolute inset-0 bg-white/30 dark:bg-black/50 backdrop-blur-[2px]" />
//       </div>

//       {/* --- SIDEBAR --- */}
//       <div className={`
//         relative z-20 flex transition-all duration-300 ease-in-out
//         ${glassClass}
//         ${isSidebarExpanded ? 'md:w-80' : 'md:w-20'}
//         /* Mobile: Fixed Height 70px */
//         w-full h-[70px] md:h-auto md:rounded-2xl
//         flex-row md:flex-col items-center md:items-stretch
//       `}>
        
//         {/* 1. Logo Section 
//            Desktop: Top of the column, fixed height.
//            Mobile: Left side, fixed width, border-right separator.
//         */}
//         <div className={`
//           flex items-center justify-center shrink-0 z-20
//           h-full md:h-20 w-[70px] md:w-auto
//           border-r border-white/10 md:border-none md:border-b
//         `}>
//           <Link to="/" className="group flex items-center gap-3">
            //  <div className=" h-10 w-10 rounded-lg overflow-hidden bg-violet-600 dark:bg-zinc-800 shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
            //     {/* <LayoutGrid size={20} className="text-white"/> */}
            //     <img src={Logo} alt="" />
            //  </div>
//              {/* Desktop Text */}
//              {isSidebarExpanded && (
//                <h1 className="hidden md:block font-bold text-xl tracking-tight text-zinc-800 dark:text-white font-Eagle">
//                  Painter' Diary
//                </h1>
//              )}
//           </Link>
//         </div>

//         {/* 2. Contacts List 
//            Desktop: Takes remaining vertical space (flex-1), scrolls vertically.
//            Mobile: Takes remaining horizontal space, scrolls horizontally.
//         */}
//         <div className="
//           flex-1 min-w-0
//           flex md:flex-col 
//           overflow-x-auto md:overflow-x-hidden md:overflow-y-auto 
//           no-scrollbar
//           p-2 gap-2
//         ">
//             {CONTACTS.map(contact => (
//             <button
//                 key={contact.id}
//                 onClick={() => setSelectedContact(contact)}
//                 className={`
//                 group relative flex items-center gap-3 p-2 rounded-xl transition-all duration-200 shrink-0
//                 ${selectedContact.id === contact.id 
//                     ? 'bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/5 shadow-sm' 
//                     : 'hover:bg-white/20 dark:hover:bg-white/5 border border-transparent'}
//                 `}
//             >
//                 <div className="relative">
//                 <img src={contact.avatar} className="w-10 h-10 md:w-11 md:h-11 rounded-xl object-cover shadow-sm" alt={contact.name} />
//                 <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-800 ${contact.status === 'online' ? 'bg-emerald-500' : 'bg-zinc-500'}`} />
//                 </div>
                
//                 {/* Desktop Details */}
//                 <div className={`text-left hidden md:block ${!isSidebarExpanded && 'md:hidden'}`}>
//                 <h3 className="font-semibold text-sm text-zinc-900 dark:text-white truncate max-w-[140px]">{contact.name}</h3>
//                 <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate max-w-[140px] opacity-80">{contact.lastMsg}</p>
//                 </div>

//                 {/* Unread Badge */}
//                 {contact.unread > 0 && (
//                 <div className="absolute top-0 right-0 md:top-auto md:bottom-auto md:static w-4 h-4 md:w-5 md:h-5 bg-violet-600 text-white rounded-full text-[10px] flex items-center justify-center shadow-lg border border-white/20">
//                     {contact.unread}
//                 </div>
//                 )}
//             </button>
//             ))}
//         </div>

//         {/* Desktop Sidebar Toggle (Bottom) */}
//         <div className="hidden md:flex p-4 justify-center border-t border-white/10 shrink-0">
//           <button 
//             onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
//             className="p-2 rounded-xl hover:bg-white/10 text-zinc-500 dark:text-zinc-400 transition-colors"
//           >
//             {isSidebarExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
//           </button>
//         </div>
//       </div>


//       {/* --- CENTER CHAT --- */}
//       <div className={`
//         relative z-10 flex-1 flex flex-col 
//         ${glassClass}
//         md:rounded-2xl overflow-hidden hide-scrollbar
//       `}>
        
//         {/* Chat Header */}
//         <div className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-white/10 bg-white/5 dark:bg-black/20">
//           <div className="flex items-center gap-3">
//              <div className="flex flex-col">
//                <h2 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white">{selectedContact.name}</h2>
//                <div className="flex items-center gap-1.5">
//                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
//                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Online</span>
//                </div>
//              </div>
//           </div>

//           <div className="flex items-center gap-1 md:gap-2">
//             <button className="p-2 rounded-xl hover:bg-white/10 text-zinc-600 dark:text-zinc-300"><Phone size={18}/></button>
//             <button className="p-2 rounded-xl hover:bg-white/10 text-zinc-600 dark:text-zinc-300"><Video size={18}/></button>
            
//             <div className="relative" ref={wpMenuRef}>
//               <button 
//                 onClick={() => setShowWallpaperMenu(!showWallpaperMenu)}
//                 className="p-2 rounded-xl hover:bg-white/10 text-zinc-600 dark:text-zinc-300"
//               >
//                 <Settings size={18}/>
//               </button>
              
//               {showWallpaperMenu && (
//                 <div className="absolute top-12 right-0 w-64 p-3 bg-white/90 dark:bg-zinc-900/95 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-2xl z-50">
//                    <p className="text-xs font-bold text-zinc-500 uppercase px-1 mb-2">Wallpaper</p>
//                    <div className="grid grid-cols-2 gap-2">
//                      {WALLPAPERS.map(wp => (
//                        <button
//                          key={wp.id}
//                          onClick={() => { setCurrentWallpaper(wp); setShowWallpaperMenu(false); }}
//                          className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all ${currentWallpaper.id === wp.id ? 'border-violet-500' : 'border-transparent hover:border-zinc-500'}`}
//                        >
//                          <div className="absolute inset-0" style={{ background: wp.value, backgroundSize: 'cover' }}/>
//                        </button>
//                      ))}
//                    </div>
//                 </div>
//               )}
//             </div>

//             <button 
//               onClick={() => setShowRightPanel(!showRightPanel)} 
//               className={`p-2 rounded-xl transition-colors ${showRightPanel ? 'bg-zinc-800 text-white' : 'hover:bg-white/10 text-zinc-600 dark:text-zinc-300'}`}
//             >
//               <PanelRight size={18}/>
//             </button>
//           </div>
//         </div>

//         {/* Messages List */}
//         <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth hide-scrollbar">
//           {messages.map((msg) => {
//             const isMe = msg.senderId === 0;
//             return (
//               <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
//                 <div className={`flex flex-col max-w-[80%] md:max-w-[65%] ${isMe ? 'items-end' : 'items-start'}`}>
                  
//                   <div 
//                     onDoubleClick={() => handleDoubleTap(msg.id)}
//                     className={`
//                       relative px-4 py-3 shadow-sm cursor-pointer select-none transition-transform active:scale-95 group
//                       /* PREMIUM BUBBLE STYLING */
//                       ${isMe 
//                         ? 'bg-gradient-to-br from-violet-500 to-fuchsia-600 dark:from-indigo-900/80 dark:to-violet-900/80 text-white dark:border dark:border-white/10 rounded-2xl rounded-tr-sm' 
//                         : 'bg-white/80 dark:bg-zinc-800/60 backdrop-blur-md text-zinc-800 dark:text-zinc-100 border border-white/40 dark:border-white/5 rounded-2xl rounded-tl-sm'
//                       }
//                     `}
//                   >
//                     {msg.type === 'image' && (
//                       <div className="mb-2 rounded-lg overflow-hidden">
//                         <img src={msg.url} alt="att" className="max-w-full h-auto object-cover"/>
//                       </div>
//                     )}
                    
//                     <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    
//                     {msg.reactions.length > 0 && (
//                       <div className={`absolute -bottom-2 ${isMe ? '-left-2' : '-right-2'} bg-white dark:bg-zinc-800 p-0.5 px-1.5 rounded-full shadow-md text-[10px] border border-gray-100 dark:border-white/10`}>
//                         {msg.reactions.join('')}
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="flex items-center gap-1 mt-1 px-1 opacity-70">
//                      <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-300 mix-blend-difference">{msg.time}</span>
//                      {isMe && (
//                        msg.status === 'read' ? <CheckCheck size={12} className="text-violet-400"/> : <Check size={12} className="text-zinc-400"/>
//                      )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Floating Input */}
//         <div className="p-3 md:p-5">
//            <form 
//              onSubmit={handleSend}
//              className="relative flex items-end gap-2 bg-white/70 dark:bg-black/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 p-2 rounded-2xl shadow-xl z-30"
//            >
//              <input type="file" ref={fileInputRef} className="hidden" />

//              <div className="relative" ref={attachRef}>
//                 <button 
//                   type="button" 
//                   onClick={() => setShowAttachMenu(!showAttachMenu)}
//                   className={`p-3 rounded-xl transition-all ${showAttachMenu ? 'bg-zinc-800 text-white rotate-45' : 'text-zinc-500 hover:bg-black/5 dark:hover:bg-white/10 dark:text-zinc-400'}`}
//                 >
//                   <Paperclip size={20} />
//                 </button>
                
//                 {showAttachMenu && (
//                   <div className="absolute bottom-16 left-0 flex flex-col gap-2 p-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-xl w-40 animate-in slide-in-from-bottom-4">
//                     <button type="button" onClick={() => handleFileUpload('image')} className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200">
//                       <div className="p-1.5 bg-violet-100 text-violet-600 rounded-md"><ImageIcon size={16}/></div> Photos
//                     </button>
//                     <button type="button" onClick={() => handleFileUpload('video')} className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200">
//                       <div className="p-1.5 bg-pink-100 text-pink-600 rounded-md"><Film size={16}/></div> Video
//                     </button>
//                     <button type="button" onClick={() => handleFileUpload('doc')} className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200">
//                       <div className="p-1.5 bg-blue-100 text-blue-600 rounded-md"><FileText size={16}/></div> File
//                     </button>
//                   </div>
//                 )}
//              </div>

//              <div className="flex-1 relative mb-0.5">
//                 {showEmoji && (
//                   <div ref={emojiRef} className="absolute bottom-14 left-0 shadow-2xl rounded-2xl overflow-hidden border border-white/20 dark:border-white/10">
//                     <EmojiPicker theme="auto" onEmojiClick={(e) => setInputText(prev => prev + e.emoji)} width={300} height={350}/>
//                   </div>
//                 )}
//                 <textarea
//                   value={inputText}
//                   onChange={(e) => setInputText(e.target.value)}
//                   onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend(e)}
//                   placeholder="Type a message..."
//                   rows={1}
//                   className="w-full bg-transparent max-h-32 py-2.5 px-2 text-sm md:text-[15px] text-zinc-800 dark:text-white placeholder-zinc-500 focus:outline-none resize-none no-scrollbar"
//                 />
//              </div>
             
//              <div className="flex items-center gap-1">
//                <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-3 text-zinc-500 hover:text-yellow-500 transition-colors">
//                  <Smile size={20}/>
//                </button>
               
//                {inputText.trim() ? (
//                  <button type="submit" className="p-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl shadow-lg hover:scale-105 transition-all">
//                    <Send size={18} fill="currentColor"/>
//                  </button>
//                ) : (
//                  <button type="button" className="p-3 text-zinc-500 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl">
//                    <Mic size={20}/>
//                  </button>
//                )}
//              </div>
//            </form>
//         </div>
//       </div>


//       {/* --- RIGHT PANEL (Profile) --- */}
//       {showRightPanel && (
//         <div className={`
//           ${glassClass}
//           fixed inset-y-0 right-0 z-50 w-full md:w-80 md:relative md:rounded-2xl 
//           flex flex-col overflow-hidden animate-in slide-in-from-right-10 duration-300
//         `}>
//           <div className="p-4 flex items-center justify-between">
//             <h3 className="font-bold text-zinc-700 dark:text-zinc-200">Profile info</h3>
//             <button onClick={() => setShowRightPanel(false)} className="p-2 hover:bg-white/10 rounded-full"><X size={20} className="text-zinc-500"/></button>
//           </div>

//           <div className="flex flex-col items-center p-6 border-b border-white/10">
//             <div className="relative mb-4 group cursor-pointer">
//               <div className="absolute inset-0 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"/>
//               <img src={selectedContact.avatar} className="relative w-24 h-24 rounded-full object-cover border-4 border-white/20 dark:border-white/10" alt="profile" />
//             </div>
//             <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{selectedContact.name}</h2>
//             <p className="text-sm text-zinc-500 font-medium mb-4">{selectedContact.role}</p>
            
//             <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 bg-white/30 dark:bg-black/20 p-3 rounded-xl backdrop-blur-sm border border-white/10">
//               "{selectedContact.bio}"
//             </p>

//             <div className="flex gap-4 mt-6 w-full">
//                <button className="flex-1 py-2 bg-violet-600 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-violet-500 transition-colors">Message</button>
//                <button className="flex-1 py-2 bg-white/10 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/20">Call</button>
//             </div>
//           </div>

//           <div className="flex p-2 gap-1 bg-black/5 dark:bg-white/5 m-4 rounded-xl">
//              {['media', 'files', 'links'].map(tab => (
//                <button 
//                 key={tab} 
//                 onClick={() => setGalleryTab(tab)}
//                 className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${galleryTab === tab ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500'}`}
//                >
//                  {tab}
//                </button>
//              ))}
//           </div>

//           <div className="flex-1 overflow-y-auto px-4 pb-4 no-scrollbar">
//              <div className="grid grid-cols-3 gap-2">
//                 {[1,2,3,4,5,6].map((item) => (
//                   <div key={item} className="aspect-square rounded-lg bg-zinc-200 dark:bg-zinc-800/50 overflow-hidden cursor-pointer hover:opacity-80">
//                      <img src={`https://images.unsplash.com/photo-${1600000000000 + item}?w=200&fit=crop`} className="w-full h-full object-cover" alt="media"/>
//                   </div>
//                 ))}
//              </div>
             
//              <button className="w-full mt-6 flex items-center gap-3 p-4 rounded-xl text-red-500 bg-red-500/5 hover:bg-red-500/10 transition-colors border border-red-500/10">
//                 <LogOut size={18} />
//                 <span className="font-semibold text-sm">Block Contact</span>
//              </button>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// };

// export default ChatApp;



import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { 
  Send, Paperclip, Mic, Smile, X, Image as ImageIcon, 
  FileText, ChevronLeft, ChevronRight,
  LayoutGrid, Settings, LogOut,
  Check, CheckCheck, PanelRight,
  PlayCircle, Film, Phone, Video
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from "../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg"




// --- Utility: Click Outside Hook ---
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// --- Data ---
const CONTACTS = [
  { id: 1, name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', status: 'online', role: 'Art Director', bio: 'Capturing moments 📸 | Design enthusiast', lastMsg: 'Sent the assets!', unread: 2 },
  { id: 2, name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', status: 'away', role: 'Lead Dev', bio: 'Full stack overflow.', lastMsg: 'Deploying now...', unread: 0 },
  { id: 3, name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', status: 'online', role: 'Product Owner', bio: 'Coffee first, roadmap second.', lastMsg: 'Meeting at 3?', unread: 0 },
  { id: 4, name: 'James Rod', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', status: 'offline', role: 'Manager', bio: 'Approved.', lastMsg: 'Approved.', unread: 0 },
  { id: 5, name: 'Lisa Ray', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop', status: 'online', role: 'Marketing', bio: 'Check email.', lastMsg: 'Check email.', unread: 1 },
  { id: 6, name: 'Tom Baker', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop', status: 'online', role: 'Sales', bio: 'Call me.', lastMsg: 'Call me.', unread: 0 },
];

const WALLPAPERS = [
  { id: 'soft-purple', name: 'Lavender Mist', value: 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)' }, 
  { id: 'mountains', name: 'Misty Peaks', value: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop)' },
  { id: 'neon', name: 'Neon City', value: 'url(https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2000&auto=format&fit=crop)' },
  { id: 'abstract', name: 'Dark Abstract', value: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop)' },
  { id: 'minimal', name: 'Zinc Gradient', value: 'linear-gradient(to top right, #18181b, #27272a)' },
];

const INITIAL_MESSAGES = [
  { id: 1, senderId: 2, text: 'Hey! Did you see the new design concepts?', time: '10:30 AM', type: 'text', reactions: [], status: 'read' },
  { id: 2, senderId: 0, text: 'Yes, looking sharp! ✨', time: '10:32 AM', type: 'text', reactions: ['❤️'], status: 'read' },
  { id: 3, senderId: 2, text: 'Here is the revised background.', time: '10:35 AM', type: 'text', reactions: [], status: 'read' },
  { id: 4, senderId: 2, url: 'https://images.unsplash.com/photo-1614850523060-8da1d56ae167?w=600', text: 'design_v2.jpg', time: '10:35 AM', type: 'image', reactions: [], status: 'read' },
];

const ChatApp = () => {
  // --- State ---
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [galleryTab, setGalleryTab] = useState('media');
  
  const [selectedContact, setSelectedContact] = useState(CONTACTS[0]);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  
  // --- WALLPAPER STATE WITH LOCAL STORAGE CACHING ---
  const [currentWallpaper, setCurrentWallpaper] = useState(() => {
    const saved = localStorage.getItem('chatWallpaper');
    return saved ? JSON.parse(saved) : WALLPAPERS[0];
  });

  // --- Popups ---
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showWallpaperMenu, setShowWallpaperMenu] = useState(false);

  // --- Refs ---
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiRef = useRef(null);
  const attachRef = useRef(null);
  const wpMenuRef = useRef(null);

  useClickOutside(emojiRef, () => setShowEmoji(false));
  useClickOutside(attachRef, () => setShowAttachMenu(false));
  useClickOutside(wpMenuRef, () => setShowWallpaperMenu(false));

  // --- Effects ---
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Save Wallpaper on Change
  useEffect(() => {
    localStorage.setItem('chatWallpaper', JSON.stringify(currentWallpaper));
  }, [currentWallpaper]);

  // --- Handlers ---
  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      senderId: 0,
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      reactions: [],
      status: 'sent'
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setShowEmoji(false);
  };

  const handleDoubleTap = (msgId) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === msgId) {
        const hasLiked = msg.reactions.includes('❤️');
        return { ...msg, reactions: hasLiked ? msg.reactions.filter(r => r !== '❤️') : [...msg.reactions, '❤️'] };
      }
      return msg;
    }));
  };

  const handleFileUpload = (type) => {
    if(fileInputRef.current) {
        fileInputRef.current.click();
        setShowAttachMenu(false);
    }
  };

  // Glass Morphism Base Class
  const glassClass = "bg-white/30 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl";

  return (
    <div className="fixed inset-0 bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-sans overflow-hidden flex flex-col md:flex-row p-0 md:p-4 md:gap-3 gap-1 transition-all duration-300">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out scale-105"
          style={{ backgroundImage: currentWallpaper.value }}
        />
        <div className="absolute inset-0 bg-white/30 dark:bg-black/50 backdrop-blur-[2px]" />
      </div>

      {/* --- SIDEBAR --- */}
      <div className={`
        relative z-20 flex transition-all duration-300 ease-in-out
        ${glassClass}
        ${isSidebarExpanded ? 'md:w-80' : 'md:w-20'}
        /* Mobile: Fixed Height 70px */
        w-full h-[70px] md:h-auto md:rounded-2xl
        flex-row md:flex-col items-center md:items-stretch
      `}>
        
        {/* Logo Section */}
        <div className={`
          flex items-center justify-center shrink-0 z-20
          h-full md:h-20 w-[70px] md:w-auto
          border-r border-white/10 md:border-none md:border-b
        `}>
          <Link to="/" className="group flex items-center gap-3">
                          <div className=" h-10 w-10 rounded-lg overflow-hidden bg-violet-600 dark:bg-zinc-800 shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
                {/* <LayoutGrid size={20} className="text-white"/> */}
                <img src={Logo} alt="" />
             </div>
             {isSidebarExpanded && (
               <h1 className="hidden md:block font-bold text-xl tracking-tight text-zinc-800 dark:text-white font-Eagle">
                 Painter' Diary
               </h1>
             )}
          </Link>
        </div>

        {/* Contacts List */}
        <div className="
          flex-1 min-w-0
          flex md:flex-col 
          overflow-x-auto md:overflow-x-hidden md:overflow-y-auto 
          no-scrollbar
          p-2 gap-2
        ">
            {CONTACTS.map(contact => (
            <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`
                group relative flex items-center gap-3 p-2 rounded-xl transition-all duration-200 shrink-0
                ${selectedContact.id === contact.id 
                    ? 'bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/5 shadow-sm' 
                    : 'hover:bg-white/20 dark:hover:bg-white/5 border border-transparent'}
                `}
            >
                <div className="relative">
                <img src={contact.avatar} className="w-10 h-10 md:w-11 md:h-11 rounded-xl object-cover shadow-sm" alt={contact.name} />
                <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-800 ${contact.status === 'online' ? 'bg-emerald-500' : 'bg-zinc-500'}`} />
                </div>
                
                {/* Desktop Details */}
                <div className={`text-left hidden md:block ${!isSidebarExpanded && 'md:hidden'}`}>
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-white truncate max-w-[140px]">{contact.name}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate max-w-[140px] opacity-80">{contact.lastMsg}</p>
                </div>

                {/* Unread Badge */}
                {contact.unread > 0 && (
                <div className="absolute top-0 right-0 md:top-auto md:bottom-auto md:static w-4 h-4 md:w-5 md:h-5 bg-violet-600 text-white rounded-full text-[10px] flex items-center justify-center shadow-lg border border-white/20">
                    {contact.unread}
                </div>
                )}
            </button>
            ))}
        </div>

        {/* Desktop Sidebar Toggle */}
        <div className="hidden md:flex p-4 justify-center border-t border-white/10 shrink-0">
          <button 
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="p-2 rounded-xl hover:bg-white/10 text-zinc-500 dark:text-zinc-400 transition-colors"
          >
            {isSidebarExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>


      {/* --- CENTER CHAT --- */}
      <div className={`
        relative z-10 flex-1 flex flex-col 
        ${glassClass}
        md:rounded-2xl overflow-hidden
      `}>
        
        {/* Chat Header */}
        <div className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-white/10 bg-white/5 dark:bg-black/20">
          <div className="flex items-center gap-3">
             <div className="flex flex-col">
               <h2 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white">{selectedContact.name}</h2>
               <div className="flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                 <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Online</span>
               </div>
             </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button className="p-2 rounded-xl hover:bg-white/10 text-zinc-600 dark:text-zinc-300"><Phone size={18}/></button>
            <button className="p-2 rounded-xl hover:bg-white/10 text-zinc-600 dark:text-zinc-300"><Video size={18}/></button>
            
            <div className="relative" ref={wpMenuRef}>
              <button 
                onClick={() => setShowWallpaperMenu(!showWallpaperMenu)}
                className="p-2 rounded-xl hover:bg-white/10 text-zinc-600 dark:text-zinc-300"
              >
                <Settings size={18}/>
              </button>
              
              {showWallpaperMenu && (
                <div className="absolute top-12 right-0 w-64 p-3 bg-white/90 dark:bg-zinc-900/95 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-2xl z-50">
                   <p className="text-xs font-bold text-zinc-500 uppercase px-1 mb-2">Wallpaper</p>
                   <div className="grid grid-cols-2 gap-2">
                     {WALLPAPERS.map(wp => (
                       <button
                         key={wp.id}
                         onClick={() => { setCurrentWallpaper(wp); setShowWallpaperMenu(false); }}
                         className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all ${currentWallpaper.id === wp.id ? 'border-violet-500' : 'border-transparent hover:border-zinc-500'}`}
                       >
                         <div className="absolute inset-0" style={{ background: wp.value, backgroundSize: 'cover' }}/>
                       </button>
                     ))}
                   </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setShowRightPanel(!showRightPanel)} 
              className={`p-2 rounded-xl transition-colors ${showRightPanel ? 'bg-zinc-800 text-white' : 'hover:bg-white/10 text-zinc-600 dark:text-zinc-300'}`}
            >
              <PanelRight size={18}/>
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.map((msg) => {
            const isMe = msg.senderId === 0;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex flex-col max-w-[80%] md:max-w-[65%] ${isMe ? 'items-end' : 'items-start'}`}>
                  
                  <div 
                    onDoubleClick={() => handleDoubleTap(msg.id)}
                    className={`
                      relative px-4 py-3 shadow-sm cursor-pointer select-none transition-transform active:scale-95 group
                      /* PREMIUM BUBBLE STYLING */
                      ${isMe 
                        ? 'bg-gradient-to-br from-violet-500 to-fuchsia-600 dark:from-indigo-900/80 dark:to-violet-900/80 text-white dark:border dark:border-white/10 rounded-2xl rounded-tr-sm' 
                        : 'bg-white/80 dark:bg-zinc-800/60 backdrop-blur-md text-zinc-800 dark:text-zinc-100 border border-white/40 dark:border-white/5 rounded-2xl rounded-tl-sm'
                      }
                    `}
                  >
                    {msg.type === 'image' && (
                      <div className="mb-2 rounded-lg overflow-hidden">
                        <img src={msg.url} alt="att" className="max-w-full h-auto object-cover"/>
                      </div>
                    )}
                    
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    
                    {msg.reactions.length > 0 && (
                      <div className={`absolute -bottom-2 ${isMe ? '-left-2' : '-right-2'} bg-white dark:bg-zinc-800 p-0.5 px-1.5 rounded-full shadow-md text-[10px] border border-gray-100 dark:border-white/10`}>
                        {msg.reactions.join('')}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 mt-1 px-1 opacity-70">
                     <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-300 mix-blend-difference">{msg.time}</span>
                     {isMe && (
                       msg.status === 'read' ? <CheckCheck size={12} className="text-violet-400"/> : <Check size={12} className="text-zinc-400"/>
                     )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Input */}
        <div className="p-3 md:p-5">
           <form 
             onSubmit={handleSend}
             className="relative flex items-end gap-2 bg-white/70 dark:bg-black/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 p-2 rounded-2xl shadow-xl z-30 outline-none"
           >
             <input type="file" ref={fileInputRef} className="hidden outline-none " />

             <div className="relative" ref={attachRef}>
                <button 
                  type="button" 
                  onClick={() => setShowAttachMenu(!showAttachMenu)}
                  className={`p-3 rounded-xl transition-all ${showAttachMenu ? 'bg-zinc-800 text-white rotate-45' : 'text-zinc-500 hover:bg-black/5 dark:hover:bg-white/10 dark:text-zinc-400'}`}
                >
                  <Paperclip size={20} />
                </button>
                
                {showAttachMenu && (
                  <div className="absolute bottom-16 left-0 flex flex-col gap-2 p-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-xl w-40 animate-in slide-in-from-bottom-4">
                    <button type="button" onClick={() => handleFileUpload('image')} className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200">
                      <div className="p-1.5 bg-violet-100 text-violet-600 rounded-md"><ImageIcon size={16}/></div> Photos
                    </button>
                    <button type="button" onClick={() => handleFileUpload('video')} className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200">
                      <div className="p-1.5 bg-pink-100 text-pink-600 rounded-md"><Video size={16}/></div> Video
                    </button>
                    <button type="button" onClick={() => handleFileUpload('doc')} className="flex items-center gap-3 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200">
                      <div className="p-1.5 bg-blue-100 text-blue-600 rounded-md"><FileText size={16}/></div> File
                    </button>
                  </div>
                )}
             </div>

             <div className="flex-1 relative mb-0.5">
                {showEmoji && (
                  <div ref={emojiRef} className="absolute bottom-14 left-0 shadow-2xl rounded-2xl overflow-hidden border border-white/20 dark:border-white/10">
                    <EmojiPicker theme="auto" onEmojiClick={(e) => setInputText(prev => prev + e.emoji)} width={300} height={350}/>
                  </div>
                )}
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend(e)}
                  placeholder="Type a message..."
                  rows={1}
                  className="w-full bg-transparent max-h-32 py-2.5 px-2 text-sm md:text-[15px] text-zinc-800 dark:text-white placeholder-zinc-500 focus:outline-none resize-none no-scrollbar"
                />
             </div>
             
             <div className="flex items-center gap-1">
               <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-3 text-zinc-500 hover:text-yellow-500 transition-colors">
                 <Smile size={20}/>
               </button>
               
               {inputText.trim() ? (
                 <button type="submit" className="p-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl shadow-lg hover:scale-105 transition-all">
                   <Send size={18} fill="currentColor"/>
                 </button>
               ) : (
                 <button type="button" className="p-3 text-zinc-500 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl">
                   <Mic size={20}/>
                 </button>
               )}
             </div>
           </form>
        </div>
      </div>


      {/* --- RIGHT PANEL (Profile) --- */}
      {showRightPanel && (
        <div className={`
          ${glassClass}
          fixed inset-y-0 right-0 z-50 w-full md:w-80 md:relative md:rounded-2xl 
          flex flex-col overflow-hidden animate-in slide-in-from-right-10 duration-300
        `}>
          <div className="p-4 flex items-center justify-between">
            <h3 className="font-bold text-zinc-700 dark:text-zinc-200">Profile info</h3>
            <button onClick={() => setShowRightPanel(false)} className="p-2 hover:bg-white/10 rounded-full"><X size={20} className="text-zinc-500"/></button>
          </div>

          <div className="flex flex-col items-center p-6 border-b border-white/10">
            <div className="relative mb-4 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"/>
              <img src={selectedContact.avatar} className="relative w-24 h-24 rounded-full object-cover border-4 border-white/20 dark:border-white/10" alt="profile" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{selectedContact.name}</h2>
            <p className="text-sm text-zinc-500 font-medium mb-4">{selectedContact.role}</p>
            
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 bg-white/30 dark:bg-black/20 p-3 rounded-xl backdrop-blur-sm border border-white/10">
              "{selectedContact.bio}"
            </p>

            <div className="flex gap-4 mt-6 w-full">
               <button className="flex-1 py-2 bg-violet-600 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-violet-500 transition-colors">Message</button>
               <button className="flex-1 py-2 bg-white/10 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/20">Call</button>
            </div>
          </div>

          <div className="flex p-2 gap-1 bg-black/5 dark:bg-white/5 m-4 rounded-xl">
             {['media', 'files', 'links'].map(tab => (
               <button 
                key={tab} 
                onClick={() => setGalleryTab(tab)}
                className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${galleryTab === tab ? 'bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500'}`}
               >
                 {tab}
               </button>
             ))}
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4 no-scrollbar">
             <div className="grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6].map((item) => (
                  <div key={item} className="aspect-square rounded-lg bg-zinc-200 dark:bg-zinc-800/50 overflow-hidden cursor-pointer hover:opacity-80">
                     <img src={`https://images.unsplash.com/photo-${1600000000000 + item}?w=200&fit=crop`} className="w-full h-full object-cover" alt="media"/>
                  </div>
                ))}
             </div>
             
             <button className="w-full mt-6 flex items-center gap-3 p-4 rounded-xl text-red-500 bg-red-500/5 hover:bg-red-500/10 transition-colors border border-red-500/10">
                <LogOut size={18} />
                <span className="font-semibold text-sm">Block Contact</span>
             </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ChatApp;