// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MapPin, Calendar, ArrowLeft, Camera, Image as ImageIcon } from 'lucide-react';

// // --- MOCK DATA ---
// const MOCK_DIARIES = [
//   {
//     id: 1,
//     location: "Kyoto, Japan",
//     title: "Sketching the Golden Pavilion",
//     date: "Autumn 2024",
//     image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80&w=600",
//     journalEntry: "The rain started just as I opened my sketchbook. The gold leaf of Kinkaku-ji reflected perfectly in the pond, creating a double vision of opulence against the grey sky. It is difficult to capture the shimmer without making it look gaudy.",
//     images: [
//        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600",
//        "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&q=80&w=600",
//        "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg",
//        "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg",
//        "https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg",
//        "https://images.pexels.com/photos/1191377/pexels-photo-1191377.jpeg",
//     ]
//   },
//   {
//     id: 2,
//     location: "Reykjavík, Iceland",
//     title: "Chasing Northern Lights",
//     date: "Winter 2023",
//     image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=600",
//     journalEntry: "Green ribbons danced across the sky. It's incredibly hard to capture this with paint, the movement is so fluid. I focused on the contrast between the dark mountains and the neon sky.",
//     images: [
//         "https://images.pexels.com/photos/35641452/pexels-photo-35641452.jpeg",
//         "https://images.pexels.com/photos/6194613/pexels-photo-6194613.jpeg",
//         "https://images.pexels.com/photos/34770958/pexels-photo-34770958.jpeg"
//     ]
//   },
//   {
//     id: 3,
//     location: "Santorini, Greece",
//     title: "Blue Domes & White Walls",
//     date: "Summer 2024",
//     image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=600",
//     journalEntry: "The light here is blindingly bright. Shadows are sharp purple-blue. I spent the afternoon trying to get the specific shade of the Aegean Sea against the whitewashed architecture.",
//     images: [
//         "https://images.pexels.com/photos/30371563/pexels-photo-30371563.jpeg",
//         "https://images.pexels.com/photos/34170269/pexels-photo-34170269.jpeg",
//         "https://images.pexels.com/photos/34424639/pexels-photo-34424639.jpeg",
//         "https://images.pexels.com/photos/34586580/pexels-photo-34586580.jpeg",
//     ]
//   }
// ];

// // --- CARD COMPONENT ---
// const DiaryCard = ({ diary, onClick }) => (
//     <motion.div 
//         layout
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         whileHover={{ y: -5 }}
//         onClick={onClick}
//         className="min-w-[280px] w-[280px] h-[380px] snap-center flex-shrink-0 relative rounded-2xl overflow-hidden cursor-pointer group shadow-md border border-zinc-100 dark:border-zinc-800"
//     >
//         <img src={diary.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
//         <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
//             <MapPin size={10} /> {diary.location}
//         </div>

//         <div className="absolute bottom-0 left-0 p-5 w-full">
//             <div className="w-8 h-1 bg-amber-400 mb-3 rounded-full" />
//             <h3 className="text-white font-bold text-xl leading-tight mb-2 shadow-black drop-shadow-md">{diary.title}</h3>
//             <p className="text-zinc-300 text-xs font-medium flex items-center gap-1">
//                 <Calendar size={12} /> {diary.date}
//             </p>
//         </div>
//     </motion.div>
// );

// // --- IN-CONTAINER DETAIL VIEW ---
// const EmbeddedDetailView = ({ diary, onClose }) => (
//     <motion.div 
//         key="detail"
//         initial={{ opacity: 0, y: 20 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         exit={{ opacity: 0, y: 20 }}
//         className="w-full bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl"
//     >
//         {/* Header Image Section */}
//         <div className="relative h-64 md:h-80 w-full group">
//             <img src={diary.image} alt="" className="w-full h-full object-cover" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
//             <button 
//                 onClick={onClose}
//                 className="absolute top-4 left-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md border border-white/10 transition-colors z-20 flex items-center gap-2 pr-4"
//             >
//                 <ArrowLeft size={18} />
//                 <span className="text-xs font-bold">Back to Diaries</span>
//             </button>

//             <div className="absolute bottom-6 left-0 w-full px-6 md:px-8">
//                 <div className="flex items-center gap-2 text-amber-400 font-bold tracking-widest uppercase text-[10px] mb-2">
//                      <MapPin size={12} /> {diary.location}
//                 </div>
//                 <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">{diary.title}</h1>
//             </div>
//         </div>

//         {/* Content Section */}
//         <div className="p-6 md:p-8">
//             <div className="flex items-start gap-4">
//                 <div className="text-4xl text-zinc-300 dark:text-zinc-600 font-serif">"</div>
//                 <div className="flex-1">
//                      <p className="text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed font-serif italic">
//                         {diary.journalEntry}
//                     </p>
//                     <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400 font-sans not-italic">
//                         <Calendar size={12} /> Posted: {diary.date}
//                     </div>
//                 </div>
//             </div>

//             {/* Additional Images Grid */}
//             {diary.images && diary.images.length > 0 && (
//                 <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
//                     <h4 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 mb-4 flex items-center gap-2">
//                         <ImageIcon size={14}/> Sketches & Snaps
//                     </h4>
//                     <div className="  flex overflow-x-scroll gap-3 hide-scrollbar">
//                         {diary.images.map((img, i) => (
//                             <div key={i} className="rounded-lg overflow-hidden min-w-24 h-40 flex-shrink-0 group cursor-pointer">
//                                 <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     </motion.div>
// );

// // --- MAIN FEED COMPONENT ---
// export default function TravelDiariesFeed() {
//     const [selected, setSelected] = useState(null);

//     return (
//         <div className="w-full py-8 px-1">
//             {/* Header - Only show if not selected to keep UI clean, or keep it. I kept it for context. */}
//             <div className="flex items-center justify-between px-1 mb-4">
//                 <h3 className="font-bold text-zinc-800 dark:text-white flex items-center gap-2">
//                     <Camera className="text-amber-500" size={18}/> Travel Diaries
//                 </h3>
//             </div>
            
//             <div className="w-full min-h-[380px] relative">
//                 <AnimatePresence mode="wait">
//                     {selected ? (
//                         <EmbeddedDetailView 
//                             key="detail-view" 
//                             diary={selected} 
//                             onClose={() => setSelected(null)} 
//                         />
//                     ) : (
//                         <motion.div 
//                             key="list-view"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             className="flex gap-4 overflow-x-auto pb-8 snap-x hide-scrollbar"
//                         >
//                             {MOCK_DIARIES.map(diary => (
//                                 <DiaryCard key={diary.id} diary={diary} onClick={() => setSelected(diary)} />
//                             ))}
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// }


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ArrowLeft, Camera, Image as ImageIcon } from 'lucide-react';

// --- MOCK DATA WITH THEMES ---
const MOCK_DIARIES = [
  {
    id: 1,
    location: "Kyoto, Japan",
    title: "Sketching the Golden Pavilion",
    date: "Autumn 2024",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80&w=600",
    // Warm Stone & Gold Gradient
    gradient: "bg-gradient-to-br from-[#FFFBF0] to-[#E7E5E4] dark:from-[#1c1917] dark:to-[#292524]",
    accent: "text-amber-600 dark:text-amber-500",
    journalEntry: "The rain started just as I opened my sketchbook. The gold leaf of Kinkaku-ji reflected perfectly in the pond, creating a double vision of opulence against the grey sky. It is difficult to capture the shimmer without making it look gaudy.",
    images: [
       "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600",
       "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&q=80&w=600",
       "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg",
       "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg",
       "https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg",
       "https://images.pexels.com/photos/1191377/pexels-photo-1191377.jpeg",
    ]
  },
  {
    id: 2,
    location: "Reykjavík, Iceland",
    title: "Chasing Northern Lights",
    date: "Winter 2023",
    image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=600",
    // Cool Ice & Mist Gradient
    gradient: "bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] dark:from-[#0B1120] dark:to-[#162032]",
    accent: "text-cyan-600 dark:text-cyan-400",
    journalEntry: "Green ribbons danced across the sky. It's incredibly hard to capture this with paint, the movement is so fluid. I focused on the contrast between the dark mountains and the neon sky.",
    images: [
        "https://images.pexels.com/photos/35641452/pexels-photo-35641452.jpeg",
        "https://images.pexels.com/photos/6194613/pexels-photo-6194613.jpeg",
        "https://images.pexels.com/photos/34770958/pexels-photo-34770958.jpeg"
    ]
  },
  {
    id: 3,
    location: "Santorini, Greece",
    title: "Blue Domes & White Walls",
    date: "Summer 2024",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=600",
    // Crisp White & Azure Gradient
    gradient: "bg-gradient-to-br from-[#FAFAFA] to-[#DBEAFE] dark:from-[#0F172A] dark:to-[#1E293B]",
    accent: "text-blue-600 dark:text-blue-400",
    journalEntry: "The light here is blindingly bright. Shadows are sharp purple-blue. I spent the afternoon trying to get the specific shade of the Aegean Sea against the whitewashed architecture.",
    images: [
        "https://images.pexels.com/photos/30371563/pexels-photo-30371563.jpeg",
        "https://images.pexels.com/photos/34170269/pexels-photo-34170269.jpeg",
        "https://images.pexels.com/photos/34424639/pexels-photo-34424639.jpeg",
        "https://images.pexels.com/photos/34586580/pexels-photo-34586580.jpeg",
    ]
  }
];

// --- CARD COMPONENT (Unchanged) ---
const DiaryCard = ({ diary, onClick }) => (
    <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -5 }}
        onClick={onClick}
        className="min-w-[280px] w-[280px] h-[380px] snap-center flex-shrink-0 relative rounded-xl overflow-hidden cursor-pointer group shadow-md border border-zinc-100 dark:border-zinc-800"
    >
        <img src={diary.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <MapPin size={10} /> {diary.location}
        </div>

        <div className="absolute bottom-0 left-0 p-5 w-full">
            <div className="w-8 h-1 bg-amber-400 mb-3 rounded-full" />
            <h3 className="text-white font-bold text-xl leading-tight mb-2 shadow-black drop-shadow-md">{diary.title}</h3>
            <p className="text-zinc-300 text-xs font-medium flex items-center gap-1">
                <Calendar size={12} /> {diary.date}
            </p>
        </div>
    </motion.div>
);

// --- IN-CONTAINER DETAIL VIEW (Themed) ---
const EmbeddedDetailView = ({ diary, onClose }) => (
    <motion.div 
        key="detail"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: 20 }}
        // APPLYING THEME GRADIENT HERE
        className={`w-full rounded-xl overflow-hidden shadow-2xl ${diary.gradient} border border-white/40 dark:border-white/5`}
    >
        {/* Header Image Section */}
        <div className="relative h-64 md:h-80 w-full group">
            <img src={diary.image} alt="" className="w-full h-full object-cover" />
            {/* Soft gradient overlay on image to blend with the body */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            <button 
                onClick={onClose}
                className="absolute top-4 left-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white rounded-full transition-colors z-20 flex items-center gap-2 pr-4 shadow-sm"
            >
                <ArrowLeft size={18} />
                <span className="text-xs font-bold">Back</span>
            </button>

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-2 text-white/90 font-bold tracking-widest uppercase text-[10px] mb-2">
                     <MapPin size={12} className="text-white" /> {diary.location}
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-1 shadow-black drop-shadow-lg">{diary.title}</h1>
            </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8">
            <div className="flex items-start gap-4">
                <div className={`text-4xl font-serif opacity-30 ${diary.accent}`}>"</div>
                <div className="flex-1">
                     <p className="text-zinc-800 dark:text-zinc-100 text-lg leading-loose font-serif italic">
                        {diary.journalEntry}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-sans not-italic border-t border-black/5 dark:border-white/5 pt-4">
                        <Calendar size={12} /> Posted: {diary.date}
                    </div>
                </div>
            </div>

            {/* Additional Images Grid */}
            {diary.images && diary.images.length > 0 && (
                <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5">
                    <h4 className={`text-sm font-bold mb-4 flex items-center gap-2 ${diary.accent}`}>
                        <ImageIcon size={14}/> Sketches & Snaps
                    </h4>
                    <div className="flex overflow-x-scroll gap-3 hide-scrollbar pb-2">
                        {diary.images.map((img, i) => (
                            <div key={i} className="rounded-xl overflow-hidden min-w-[120px] h-40 flex-shrink-0 group cursor-pointer shadow-sm border border-black/5 dark:border-white/5">
                                <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </motion.div>
);

// --- MAIN FEED COMPONENT ---
export default function TravelDiariesFeed() {
    const [selected, setSelected] = useState(null);

    return (
        <div className="w-full py-8 px-1">
            {/* Header */}
            <div className="flex items-center justify-between px-1 mb-4">
                <h3 className="font-bold text-zinc-800 dark:text-white flex items-center gap-2">
                    <Camera className="text-amber-500" size={18}/> Travel Diaries
                </h3>
            </div>
            
            <div className="w-full min-h-[380px] relative">
                <AnimatePresence mode="wait">
                    {selected ? (
                        <EmbeddedDetailView 
                            key="detail-view" 
                            diary={selected} 
                            onClose={() => setSelected(null)} 
                        />
                    ) : (
                        <motion.div 
                            key="list-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex gap-4 overflow-x-auto pb-8 snap-x hide-scrollbar px-1"
                        >
                            {MOCK_DIARIES.map(diary => (
                                <DiaryCard key={diary.id} diary={diary} onClick={() => setSelected(diary)} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}