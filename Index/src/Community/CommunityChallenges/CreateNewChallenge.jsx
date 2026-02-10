// import React, { useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { 
//   Image as ImageIcon, Trophy, Clock, Upload, 
//   ArrowLeft, ArrowRight, CheckCircle2, X 
// } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import Logo from "../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg";

// // --- PREVIEW CARD COMPONENT (Shared Design) ---
// const ChallengeCardPreview = ({ data, imagePreview }) => (
//   <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-lg h-[220px] flex flex-row relative w-full max-w-md mx-auto">
//     {/* Left: Image (Fixed Width) */}
//     <div className="w-[140px] shrink-0 relative h-full bg-zinc-100 dark:bg-zinc-800 border-r border-zinc-100 dark:border-zinc-800">
//       {imagePreview ? (
//         <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
//       ) : (
//         <div className="flex flex-col items-center justify-center h-full text-zinc-400 p-4 text-center">
//           <ImageIcon size={24} className="mb-2 opacity-50" />
//           <span className="text-[10px] font-bold uppercase">No Cover</span>
//         </div>
//       )}
//       <div className="absolute top-2 left-2">
//          {data.status === 'live' && <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">Live</span>}
//          {data.status === 'upcoming' && <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">Soon</span>}
//       </div>
//     </div>

//     {/* Right: Content */}
//     <div className="flex-1 p-4 flex flex-col justify-between h-full relative">
//       <div>
//          <div className="flex justify-between items-start">
//             <span className="text-xs font-medium text-zinc-500 truncate pr-2">Hosted by You</span>
//             <span className="shrink-0 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded whitespace-nowrap">
//                 {data.prize || 'No Prize'}
//             </span>
//          </div>
//          <h3 className="font-bold text-lg leading-tight mt-1 line-clamp-1 break-words text-left">
//             {data.title || 'Untitled Challenge'}
//          </h3>
//          <p className="text-sm text-zinc-500 mt-2 line-clamp-2 leading-relaxed break-words text-left">
//             {data.description || 'Your description will appear here...'}
//          </p>
//       </div>

//       <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800">
//          <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
//             <span className="flex items-center gap-1"><Clock size={14}/> {data.daysLeft || 7}d left</span>
//          </div>
//          <div className="bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-xs font-bold opacity-50 cursor-not-allowed">
//              Join
//          </div>
//       </div>
//     </div>
//   </div>
// );

// const CreateChallenge = () => {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
  
//   // Steps: 1 = Details, 2 = Image, 3 = Review
//   const [step, setStep] = useState(1);
//   const [imagePreview, setImagePreview] = useState(null);
  
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     prize: '',
//     status: 'upcoming',
//     daysLeft: 7,
//     category: 'individual'
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//         // Create local preview URL
//         const url = URL.createObjectURL(file);
//         setImagePreview(url);
//     }
//   };

//   const handleNext = () => {
//       if (step === 1 && (!formData.title || !formData.description)) {
//           toast.error("Please fill in the title and description.");
//           return;
//       }
//       setStep(prev => prev + 1);
//   };

//   const handleBack = () => setStep(prev => prev - 1);

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const newChallenge = {
//         ...formData,
//         id: Date.now(),
//         host: "You",
//         image: imagePreview || "https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg", // Fallback
//         participants: 0,
//         createdAt: new Date().toISOString(),
//         entries: [] 
//     };

//     // Save to LocalStorage
//     const existing = JSON.parse(localStorage.getItem('createdChallenges') || '[]');
//     const updated = [newChallenge, ...existing];
//     localStorage.setItem('createdChallenges', JSON.stringify(updated));

//     toast.success("Challenge hosted successfully!");
//     setTimeout(() => {
//         navigate('/Community/Challenges/MyEntries'); 
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-100">
//       <ToastContainer position="bottom-right" theme="dark" />
      
//       {/* Navbar */}
//       <nav className="fixed top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 h-16 px-4 flex items-center justify-between">
//          <div className="flex items-center gap-2">
//             <Link to="/" className="w-8 h-8 rounded bg-zinc-200 overflow-hidden"><img src={Logo} className="w-full h-full object-cover"/></Link>
//             <span className="font-bold font-Eagle hidden md:block">Painters' Diary</span>
//          </div>
//          <div className="flex items-center gap-4">
//             <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider hidden sm:block">Step {step} of 3</div>
//             <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
//                 <X size={20} />
//             </button>
//          </div>
//       </nav>

//       <div className="pt-24 pb-20 max-w-6xl mx-auto px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
//             {/* --- LEFT COLUMN: FORM STEPS --- */}
//             <div className="space-y-8">
//                 {/* Step Indicator (Mobile) */}
//                 <div className="flex lg:hidden gap-2 mb-4">
//                     {[1, 2, 3].map(i => (
//                         <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-black dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
//                     ))}
//                 </div>

//                 <div className="space-y-2">
//                     <h1 className="text-3xl font-bold">
//                         {step === 1 && "Challenge Metadata"}
//                         {step === 2 && "Cover Artwork"}
//                         {step === 3 && "Review & Launch"}
//                     </h1>
//                     <p className="text-zinc-500">
//                         {step === 1 && "Let's define the core details of your challenge."}
//                         {step === 2 && "Upload a visual that represents the theme."}
//                         {step === 3 && "Double check everything before going live."}
//                     </p>
//                 </div>

//                 {/* STEP 1: METADATA */}
//                 {step === 1 && (
//                     <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
//                         <div className="space-y-2">
//                             <label className="text-sm font-bold">Challenge Title</label>
//                             <input 
//                                 type="text" name="title" autoFocus
//                                 placeholder="e.g., Cyberpunk CityScapes"
//                                 value={formData.title} onChange={handleChange}
//                                 className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none font-bold"
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <label className="text-sm font-bold">Description</label>
//                             <textarea 
//                                 name="description" 
//                                 placeholder="Describe the rules, theme, and what you are looking for..."
//                                 value={formData.description} onChange={handleChange}
//                                 className="w-full h-32 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none resize-none"
//                             />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                                 <label className="text-sm font-bold">Prize Pool</label>
//                                 <div className="relative">
//                                     <Trophy size={16} className="absolute left-3 top-3.5 text-zinc-400"/>
//                                     <input 
//                                         type="text" name="prize" 
//                                         placeholder="$500 / Mentorship"
//                                         value={formData.prize} onChange={handleChange}
//                                         className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3 outline-none"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="space-y-2">
//                                 <label className="text-sm font-bold">Duration (Days)</label>
//                                 <div className="relative">
//                                     <Clock size={16} className="absolute left-3 top-3.5 text-zinc-400"/>
//                                     <input 
//                                         type="number" name="daysLeft" 
//                                         value={formData.daysLeft} onChange={handleChange}
//                                         className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3 outline-none"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* STEP 2: IMAGE UPLOAD */}
//                 {step === 2 && (
//                     <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
//                         <div 
//                             onClick={() => fileInputRef.current.click()}
//                             className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors h-64"
//                         >
//                              <input 
//                                 type="file" 
//                                 accept="image/*" 
//                                 ref={fileInputRef}
//                                 onChange={handleImageUpload}
//                                 className="hidden"
//                              />
//                              {imagePreview ? (
//                                 <div className="relative w-full h-full">
//                                     <img src={imagePreview} className="w-full h-full object-contain rounded-lg" />
//                                     <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg text-white font-bold">
//                                         Change Image
//                                     </div>
//                                 </div>
//                              ) : (
//                                 <>
//                                     <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
//                                         <Upload size={24} className="text-zinc-400" />
//                                     </div>
//                                     <h3 className="font-bold text-lg">Upload Cover Art</h3>
//                                     <p className="text-sm text-zinc-500 mt-1">Click to browse gallery<br/>JPG or PNG</p>
//                                 </>
//                              )}
//                         </div>
                        
//                         <div className="space-y-2">
//                              <label className="text-sm font-bold">Status</label>
//                              <div className="flex gap-4">
//                                 <label className="flex-1 cursor-pointer">
//                                     <input type="radio" name="status" value="upcoming" checked={formData.status === 'upcoming'} onChange={handleChange} className="peer hidden" />
//                                     <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 peer-checked:bg-black peer-checked:text-white dark:peer-checked:bg-white dark:peer-checked:text-black transition-all text-center font-bold text-sm">
//                                         Upcoming
//                                     </div>
//                                 </label>
//                                 <label className="flex-1 cursor-pointer">
//                                     <input type="radio" name="status" value="live" checked={formData.status === 'live'} onChange={handleChange} className="peer hidden" />
//                                     <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 peer-checked:bg-red-600 peer-checked:text-white peer-checked:border-red-600 transition-all text-center font-bold text-sm">
//                                         Live Now
//                                     </div>
//                                 </label>
//                              </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* STEP 3: REVIEW (Mobile Only View) */}
//                 {step === 3 && (
//                     <div className="lg:hidden animate-in fade-in slide-in-from-right-4 duration-300">
//                          <div className=" rounded-2xl text-center mb-6">
//                             <h3 className="font-bold text-lg mb-4">Preview</h3>
//                             <ChallengeCardPreview data={formData} imagePreview={imagePreview} />
//                          </div>
//                          <p className="text-center text-sm text-zinc-500">Looks good? Hit launch to publish!</p>
//                     </div>
//                 )}

//                 {/* NAVIGATION BUTTONS */}
//                 <div className="flex gap-4 pt-4">
//                     {step > 1 && (
//                         <button onClick={handleBack} className="flex-1 py-4 rounded-xl font-bold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2">
//                             <ArrowLeft size={18} /> Back
//                         </button>
//                     )}
//                     {step < 3 ? (
//                         <button onClick={handleNext} className="flex-[2] bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
//                             Next Step <ArrowRight size={18} />
//                         </button>
//                     ) : (
//                         <button onClick={handleSubmit} className="flex-[2] bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-600/20">
//                             <CheckCircle2 size={18} /> Launch Challenge
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {/* --- RIGHT COLUMN: PREVIEW (Desktop Only) --- */}
//             <div className="hidden lg:block sticky top-32 h-fit animate-in fade-in duration-500 delay-150">
//                  <div className="flex items-center justify-between mb-4">
//                     <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Live Preview</span>
//                     <div className="text-xs text-zinc-500 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">Desktop View</div>
//                  </div>
                 
//                  {/* The Preview Container */}
//                  <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
//                      <div className="w-full scale-110 origin-center transition-transform">
//                         <ChallengeCardPreview data={formData} imagePreview={imagePreview} />
//                      </div>
//                      <p className="mt-8 text-xs text-zinc-400 max-w-xs text-center">
//                         This is exactly how your challenge will appear in the Community Hub feed.
//                      </p>
//                  </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateChallenge;



import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Image as ImageIcon, Trophy, Clock, Upload, 
  ArrowLeft, ArrowRight, CheckCircle2, X 
} from 'lucide-react';
// 1. Import Sonner
import { Toaster, toast } from 'sonner';
import Logo from "../../../file_0000000038dc61f89085a4fc680c94b6 (1)_20250814_101526.jpg";

// Reusing Preview Component (Unchanged)
const ChallengeCardPreview = ({ data, imagePreview }) => (
  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-lg h-[220px] flex flex-row relative w-full max-w-md mx-auto">
    <div className="w-[140px] shrink-0 relative h-full bg-zinc-100 dark:bg-zinc-800 border-r border-zinc-100 dark:border-zinc-800">
      {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : <div className="flex flex-col items-center justify-center h-full text-zinc-400 p-4 text-center"><ImageIcon size={24} className="mb-2 opacity-50" /><span className="text-[10px] font-bold uppercase">No Cover</span></div>}
      <div className="absolute top-2 left-2">
         {data.status === 'live' && <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">Live</span>}
         {data.status === 'upcoming' && <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">Soon</span>}
      </div>
    </div>
    <div className="flex-1 p-4 flex flex-col justify-between h-full relative">
      <div>
         <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-zinc-500 truncate pr-2">Hosted by You</span>
            <span className="shrink-0 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded whitespace-nowrap">{data.prize || 'No Prize'}</span>
         </div>
         <h3 className="font-bold text-lg leading-tight mt-1 line-clamp-1 break-words">{data.title || 'Untitled Challenge'}</h3>
         <p className="text-sm text-zinc-500 mt-2 line-clamp-2 leading-relaxed break-words">{data.description || 'Your description will appear here...'}</p>
      </div>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800">
         <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium"><span className="flex items-center gap-1"><Clock size={14}/> {data.daysLeft || 7}d left</span></div>
         <div className="bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-xs font-bold opacity-50 cursor-not-allowed">Join</div>
      </div>
    </div>
  </div>
);

const CreateChallenge = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', description: '', prize: '', status: 'upcoming', daysLeft: 7, category: 'individual'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        setImagePreview(url);
    }
  };

  const handleNext = () => {
      if (step === 1 && (!formData.title || !formData.description)) {
          toast.error("Incomplete", { description: "Please fill in the title and description." });
          return;
      }
      setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newChallenge = { ...formData, id: Date.now(), host: "You", image: imagePreview || "https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg", participants: 0, createdAt: new Date().toISOString(), entries: [] };

    const existing = JSON.parse(localStorage.getItem('createdChallenges') || '[]');
    const updated = [newChallenge, ...existing];
    localStorage.setItem('createdChallenges', JSON.stringify(updated));

    // Premium Toast
    toast.success("Challenge Launched!", {
        description: "Your challenge is now live in the community hub.",
        duration: 3000,
    });
    
    setTimeout(() => {
        navigate('/Community/Challenges/MyEntries'); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-100">
      <Toaster position="bottom-right" richColors theme="system" />
      
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 h-16 px-4 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <Link to="/" className="w-8 h-8 rounded bg-zinc-200 overflow-hidden"><img src={Logo} className="w-full h-full object-cover"/></Link>
            <span className="font-bold font-Eagle hidden md:block">Painters' Diary</span>
         </div>
         <div className="flex items-center gap-4">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider hidden sm:block">Step {step} of 3</div>
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"><X size={20} /></button>
         </div>
      </nav>

      <div className="pt-24 pb-20 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* FORM STEPS */}
            <div className="space-y-8">
                <div className="flex lg:hidden gap-2 mb-4">
                    {[1, 2, 3].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-black dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'}`} />)}
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">{step === 1 && "Challenge Metadata"}{step === 2 && "Cover Artwork"}{step === 3 && "Review & Launch"}</h1>
                    <p className="text-zinc-500">{step === 1 && "Let's define the core details of your challenge."}{step === 2 && "Upload a visual that represents the theme."}{step === 3 && "Double check everything before going live."}</p>
                </div>

                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                        <div className="space-y-2"><label className="text-sm font-bold">Challenge Title</label><input type="text" name="title" autoFocus placeholder="e.g., Cyberpunk CityScapes" value={formData.title} onChange={handleChange} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none font-bold"/></div>
                        <div className="space-y-2"><label className="text-sm font-bold">Description</label><textarea name="description" placeholder="Describe the rules..." value={formData.description} onChange={handleChange} className="w-full h-32 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none resize-none"/></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><label className="text-sm font-bold">Prize Pool</label><div className="relative"><Trophy size={16} className="absolute left-3 top-3.5 text-zinc-400"/><input type="text" name="prize" placeholder="$500 / Mentorship" value={formData.prize} onChange={handleChange} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3 outline-none"/></div></div>
                            <div className="space-y-2"><label className="text-sm font-bold">Duration (Days)</label><div className="relative"><Clock size={16} className="absolute left-3 top-3.5 text-zinc-400"/><input type="number" name="daysLeft" value={formData.daysLeft} onChange={handleChange} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3 outline-none"/></div></div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors h-64">
                             <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden"/>
                             {imagePreview ? <img src={imagePreview} className="w-full h-full object-contain rounded-lg" /> : <><div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4"><Upload size={24} className="text-zinc-400" /></div><h3 className="font-bold text-lg">Upload Cover Art</h3></>}
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm font-bold">Status</label>
                             <div className="flex gap-4">
                                <label className="flex-1 cursor-pointer"><input type="radio" name="status" value="upcoming" checked={formData.status === 'upcoming'} onChange={handleChange} className="peer hidden" /><div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 peer-checked:bg-black peer-checked:text-white dark:peer-checked:bg-white dark:peer-checked:text-black transition-all text-center font-bold text-sm">Upcoming</div></label>
                                <label className="flex-1 cursor-pointer"><input type="radio" name="status" value="live" checked={formData.status === 'live'} onChange={handleChange} className="peer hidden" /><div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 peer-checked:bg-red-600 peer-checked:text-white peer-checked:border-red-600 transition-all text-center font-bold text-sm">Live Now</div></label>
                             </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="lg:hidden animate-in fade-in slide-in-from-right-4 duration-300">
                         <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-6 text-center mb-6"><h3 className="font-bold text-lg mb-4">Preview</h3><ChallengeCardPreview data={formData} imagePreview={imagePreview} /></div>
                    </div>
                )}

                <div className="flex gap-4 pt-4">
                    {step > 1 && <button onClick={handleBack} className="flex-1 py-4 rounded-xl font-bold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2"><ArrowLeft size={18} /> Back</button>}
                    {step < 3 ? <button onClick={handleNext} className="flex-[2] bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">Next Step <ArrowRight size={18} /></button> : <button onClick={handleSubmit} className="flex-[2] bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"><CheckCircle2 size={18} /> Launch Challenge</button>}
                </div>
            </div>

            {/* PREVIEW (Desktop) */}
            <div className="hidden lg:block sticky top-32 h-fit animate-in fade-in duration-500 delay-150">
                 <div className="flex items-center justify-between mb-4"><span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Live Preview</span><div className="text-xs text-zinc-500 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">Desktop View</div></div>
                 <div className="p-8 bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center min-h-[400px]">
                     <div className="w-full scale-110 origin-center transition-transform"><ChallengeCardPreview data={formData} imagePreview={imagePreview} /></div>
                     <p className="mt-8 text-xs text-zinc-400 max-w-xs text-center">This is exactly how your challenge will appear in the Community Hub feed.</p>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChallenge;