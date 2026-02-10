// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Home, Trophy, Target, Upload, Image as ImageIcon, FileText, X, Check } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import Logo from "../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg";

// const MyEntries = () => {
//   const [entries, setEntries] = useState([]);
//   const [selectedChallenge, setSelectedChallenge] = useState(null); // The challenge being submitted to
  
//   // Form State
//   const [imageFile, setImageFile] = useState(null);
//   const [storyText, setStoryText] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     // 1. Retrieve the cached joined challenges
//     const cached = localStorage.getItem('joinedChallenges');
//     if (cached) {
//       setEntries(JSON.parse(cached));
//     }
//   }, []);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) setImageFile(file);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!imageFile || !storyText) {
//       toast.error("Please provide both an image and your story.");
//       return;
//     }

//     setIsSubmitting(true);
    
//     // Simulating API upload delay
//     setTimeout(() => {
//         const updatedEntries = entries.map(entry => {
//             if (entry.id === selectedChallenge.id) {
//                 return { ...entry, status: 'submitted', submissionDate: new Date().toLocaleDateString() };
//             }
//             return entry;
//         });

//         setEntries(updatedEntries);
//         localStorage.setItem('joinedChallenges', JSON.stringify(updatedEntries));
        
//         toast.success("Entry submitted successfully!");
//         setIsSubmitting(false);
//         setSelectedChallenge(null); // Close modal
//         setImageFile(null);
//         setStoryText('');
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-100">
//       <ToastContainer position="bottom-right" theme="dark" />

//       {/* NAVBAR */}
//       <nav className="fixed top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 h-16 px-4 flex items-center justify-between">
//          <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded bg-zinc-200 overflow-hidden"><img src={Logo} className="w-full h-full object-cover"/></div>
//             <span className="font-bold font-Eagle hidden md:block">Painters' Diary</span>
//          </div>
//       </nav>

//       <div className="pt-24 pb-20 max-w-[1600px] mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8">
        
//         {/* SIDEBAR */}
//         <div className="hidden md:block md:col-span-3 lg:col-span-2 space-y-2 sticky top-24 h-fit">
//                <Link to="/" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl"><Home size={20}/> Home</Link>
//                <Link to="/Community/Challenges/Hub" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl"><Trophy size={20}/> Challenges</Link>
//                <Link to="/Community/Challenges/MyEntries" className="flex items-center gap-3 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 font-bold rounded-xl"><Target size={20}/> My Entries</Link>
//         </div>

//         {/* CONTENT */}
//         <div className="col-span-1 md:col-span-9 lg:col-span-7">
//           <h1 className="text-2xl font-bold mb-6">My Entries</h1>

//           {entries.length === 0 ? (
//             <div className="text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
//                <Trophy className="mx-auto h-12 w-12 text-zinc-300 mb-2"/>
//                <p className="text-zinc-500">You haven't joined any challenges yet.</p>
//                <Link to="/Community/Challenges/Hub" className="text-blue-500 font-bold text-sm mt-2 inline-block">Explore Challenges</Link>
//             </div>
//           ) : (
//             <div className="space-y-4">
//                {entries.map(entry => (
//                  <div key={entry.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-5">
//                     <img src={entry.image} className="w-20 h-20 rounded-lg object-cover bg-zinc-100" />
                    
//                     <div className="flex-1 text-center sm:text-left">
//                        <h3 className="font-bold text-lg">{entry.title}</h3>
//                        <p className="text-sm text-zinc-500 mb-2">{entry.description}</p>
//                        <div className="flex justify-center sm:justify-start gap-2">
//                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${entry.status === 'submitted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
//                               {entry.status === 'submitted' ? 'Submitted' : 'Pending Submission'}
//                            </span>
//                        </div>
//                     </div>

//                     {entry.status !== 'submitted' ? (
//                        <button 
//                          onClick={() => setSelectedChallenge(entry)}
//                          className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform"
//                        >
//                          Submit Entry
//                        </button>
//                     ) : (
//                        <div className="text-zinc-400 text-sm font-medium flex flex-col items-center">
//                           <Check size={20} />
//                           <span>Done</span>
//                        </div>
//                     )}
//                  </div>
//                ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- SUBMISSION MODAL --- */}
//       {selectedChallenge && (
//         <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//            <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              
//               {/* Header */}
//               <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
//                  <div>
//                     <h2 className="font-bold text-xl">Submit Entry</h2>
//                     <p className="text-xs text-zinc-500">for {selectedChallenge.title}</p>
//                  </div>
//                  <button onClick={() => setSelectedChallenge(null)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"><X size={20}/></button>
//               </div>

//               {/* Scrollable Body */}
//               <div className="p-6 overflow-y-auto">
//                  <form id="submission-form" onSubmit={handleSubmit} className="space-y-6">
                    
//                     {/* 1. Image Upload Section */}
//                     <div className="space-y-2">
//                        <label className="flex items-center gap-2 font-bold text-sm"><ImageIcon size={16}/> Upload Artwork</label>
//                        <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-8 text-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors relative">
//                           <input 
//                              type="file" 
//                              accept="image/*" 
//                              onChange={handleImageUpload}
//                              className="absolute inset-0 opacity-0 cursor-pointer"
//                           />
//                           {imageFile ? (
//                              <div className="text-green-600 font-medium">{imageFile.name}</div>
//                           ) : (
//                              <div className="text-zinc-500 text-sm">
//                                 <Upload className="mx-auto mb-2 opacity-50"/>
//                                 <span className="font-bold">Click to upload</span> or drag and drop<br/>JPG, PNG up to 10MB
//                              </div>
//                           )}
//                        </div>
//                     </div>

//                     {/* 2. Story Section */}
//                     <div className="space-y-2">
//                        <label className="flex items-center gap-2 font-bold text-sm"><FileText size={16}/> The Story & Process</label>
//                        <p className="text-xs text-zinc-500 mb-2">Tell us how you created this piece. What tools did you use? What was the inspiration?</p>
//                        <textarea 
//                           value={storyText}
//                           onChange={(e) => setStoryText(e.target.value)}
//                           placeholder="I started with a rough sketch using..."
//                           className="w-full h-32 bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white resize-none"
//                        />
//                     </div>
//                  </form>
//               </div>

//               {/* Footer */}
//               <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-3">
//                  <button onClick={() => setSelectedChallenge(null)} className="px-5 py-2 text-sm font-bold text-zinc-500 hover:text-zinc-900">Cancel</button>
//                  <button 
//                     type="submit" 
//                     form="submission-form"
//                     disabled={isSubmitting}
//                     className="bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg text-sm font-bold hover:opacity-90 disabled:opacity-50"
//                  >
//                     {isSubmitting ? 'Uploading...' : 'Submit Entry'}
//                  </button>
//               </div>
//            </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyEntries;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Trophy, Target, Upload, Users, FileText, Check, Plus } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import Logo from "../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg";

const MyEntries = () => {
  const [activeTab, setActiveTab] = useState('joined'); // 'joined' or 'hosted'
  const [joinedEntries, setJoinedEntries] = useState([]);
  const [hostedChallenges, setHostedChallenges] = useState([]);

  useEffect(() => {
    // 1. Load Joined Challenges
    const joined = localStorage.getItem('joinedChallenges');
    if (joined) setJoinedEntries(JSON.parse(joined));

    // 2. Load Hosted Challenges
    const hosted = localStorage.getItem('createdChallenges');
    if (hosted) {
        // Mocking some participants for the demo
        const hostedData = JSON.parse(hosted).map(c => ({
            ...c,
            // Mock entries from other users if none exist
            entries: c.entries && c.entries.length > 0 ? c.entries : [
                { id: 101, user: "AlexArt", status: 'submitted', date: "2 hrs ago", image: "https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg" },
                { id: 102, user: "Sarah_D", status: 'submitted', date: "5 hrs ago", image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg" }
            ] 
        }));
        setHostedChallenges(hostedData);
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-100">
      <ToastContainer position="bottom-right" theme="dark" />

      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 h-16 px-4 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-zinc-200 overflow-hidden"><img src={Logo} className="w-full h-full object-cover"/></div>
            <span className="font-bold font-Eagle hidden md:block">Painters' Diary</span>
         </div>
      </nav>

      <div className="pt-24 pb-20 max-w-[1600px] mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* SIDEBAR */}
        <div className="hidden md:block md:col-span-3 lg:col-span-2 space-y-2 sticky top-24 h-fit">
               <Link to="/" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl"><Home size={20}/> Home</Link>
               <Link to="/Community/Challenges/Hub" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl"><Trophy size={20}/> Challenges</Link>
               <Link to="/Community/Challenges/MyEntries" className="flex items-center gap-3 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 font-bold rounded-xl"><Target size={20}/> My Entries</Link>
        </div>

        {/* MAIN CONTENT */}
        <div className="col-span-1 md:col-span-9 lg:col-span-7">
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Activity</h1>
            <Link to="/Community/Challenges/Create" className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-bold">
                <Plus size={16} /> Create New
            </Link>
          </div>

          {/* TABS */}
          <div className="flex gap-6 border-b border-zinc-200 dark:border-zinc-800 mb-6">
              <button 
                onClick={() => setActiveTab('joined')}
                className={`pb-3 text-sm font-bold transition-colors border-b-2 ${activeTab === 'joined' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-zinc-500 hover:text-zinc-800'}`}
              >
                  Participating ({joinedEntries.length})
              </button>
              <button 
                onClick={() => setActiveTab('hosted')}
                className={`pb-3 text-sm font-bold transition-colors border-b-2 ${activeTab === 'hosted' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-zinc-500 hover:text-zinc-800'}`}
              >
                  Hosted by Me ({hostedChallenges.length})
              </button>
          </div>

          {/* === CONTENT: JOINED TAB === */}
          {activeTab === 'joined' && (
             <div className="space-y-4">
               {joinedEntries.length === 0 ? (
                 <div className="text-center py-20 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700">
                    <Trophy className="mx-auto h-12 w-12 text-zinc-300 mb-2"/>
                    <p className="text-zinc-500">You haven't joined any challenges.</p>
                 </div>
               ) : (
                 joinedEntries.map(entry => (
                   <div key={entry.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex items-center gap-5">
                      <img src={entry.image} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                         <h3 className="font-bold">{entry.title}</h3>
                         <div className="flex gap-2 text-xs mt-1">
                            <span className="text-zinc-500">Host: {entry.host}</span>
                            <span className={`font-bold ${entry.status === 'submitted' ? 'text-green-600' : 'text-orange-500'}`}>
                                • {entry.status === 'submitted' ? 'Submitted' : 'Pending'}
                            </span>
                         </div>
                      </div>
                      <div className="text-right">
                         {entry.status === 'submitted' ? (
                            <span className="flex items-center gap-1 text-green-600 font-bold text-sm"><Check size={16}/> Done</span>
                         ) : (
                            <button className="text-sm font-bold underline decoration-2 decoration-zinc-300 hover:decoration-black dark:hover:decoration-white underline-offset-4">
                               Upload
                            </button>
                         )}
                      </div>
                   </div>
                 ))
               )}
             </div>
          )}

          {/* === CONTENT: HOSTED TAB (Tracking) === */}
          {activeTab === 'hosted' && (
            <div className="space-y-8">
               {hostedChallenges.length === 0 ? (
                 <div className="text-center py-20 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700">
                    <Upload className="mx-auto h-12 w-12 text-zinc-300 mb-2"/>
                    <p className="text-zinc-500">You haven't hosted any challenges yet.</p>
                 </div>
               ) : (
                 hostedChallenges.map(challenge => (
                    <div key={challenge.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
                        {/* Header for Hosted Challenge */}
                        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <img src={challenge.image} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                                <div>
                                    <h3 className="font-bold text-lg">{challenge.title}</h3>
                                    <p className="text-xs text-zinc-500 flex items-center gap-2">
                                        <Users size={12}/> {challenge.entries.length} Submissions • {challenge.status.toUpperCase()}
                                    </p>
                                </div>
                            </div>
                            <button className="text-xs font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-lg shadow-sm">
                                Manage
                            </button>
                        </div>

                        {/* Tracking Submissions (Who Uploaded) */}
                        <div className="p-4">
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Recent Submissions</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {challenge.entries.map((sub, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-200">
                                            <img src={sub.image} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-sm text-zinc-900 dark:text-white">{sub.user}</p>
                                            <p className="text-[10px] text-zinc-400">Uploaded {sub.date}</p>
                                        </div>
                                        <button className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                                            View
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                 ))
               )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MyEntries;