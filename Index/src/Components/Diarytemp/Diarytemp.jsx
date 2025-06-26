import React, { useEffect } from 'react';
import DiarytempBack from './Diarytemp-images/people-2587310.jpg';
import mainCenter from './Diarytemp-images/pexels-veeterzy-39811.jpg';
import topleft from './Diarytemp-images/zaki-ahmed-h0NsueWIdzw-unsplash.jpg';
import leftBottom from './Diarytemp-images/medium-shot-senior-painter-indoors.jpg';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Diarytemp() {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <div className="max-w-[95%] mx-auto rounded-md overflow-hidden min-h-[90vh] font-sans">
      <div
        className="h-[90vh] w-full bg-cover bg-center flex flex-col md:flex-row"
        style={{ backgroundImage: `url(${DiarytempBack})` }}
      >
        {/* Left Section */}
        <div className="md:w-[40%] w-full flex flex-col items-center justify-center p-4 md:p-6 2xl:p-8">
          <h1 className='lg:text-left text-center lg:text-[45px] md:text-[30px] text-[25px] font-Playfair px-8 font-semibold text-yellow-100'>Pages of the Soul - A timeless Journey Through Life’s Moments</h1>
          <h5 className='lg:text-left text-center text-white font-Upright lg:text-[25px] font-semibold px-8'>A Diary of Thoughts, Dreams, and Memories Etched in Ink, Captures the Essence of Every Heart, the Whispers of Untold Stories, and the Beauty of Emotions That Shape Our Journey Through Time</h5>
          <div className="flex gap-4 md:gap-8 mt-6">
            <Link to="/Diaryland">
              <button className=" px-3 py-1 md:px-4 md:py-2 2xl:px-5 2xl:py-3 border-2 font-semibold text-slate-100 font-Playfair rounded-md border-gray-100 hover:bg-yellow-600 bg-yellow-700 transition-colors">
                My Diary
              </button>
            </Link>
            <Link to="/Diaries/Diary-Collection">
              <button 
                className="  px-3 py-1 md:px-4 md:py-2 2xl:px-5 2xl:py-3 border-2 font-semibold text-slate-100 font-Playfair rounded-md border-amber-100 hover:bg-white/10 transition-colors">
                Discover More
              </button>
            </Link>
          </div>
        </div>

        {/* Desktop Card Section */}
        <div className="lg:w-[60%] w-full hidden lg:flex backdrop-blur-sm relative items-center justify-center p-4 2xl:p-6">
          {/* Main Center - Recent Entry */}
          <div
            data-aos="fade-in"
            className="h-[50%] w-[60%] max-h-[450px] max-w-[550px] 2xl:max-h-[500px] 2xl:max-w-[600px] absolute top-[15%] left-[20%] rounded-lg overflow-hidden bg-center bg-cover shadow-lg group"
            style={{ backgroundImage: `url(${mainCenter})` }}
          >
            <div className="w-full h-[35%] absolute bottom-0 p-3 2xl:p-4 flex flex-col justify-center transition-all group-hover:h-[40%]">
              <h3 className="text-white font-Playfair text-[clamp(16px,2vw,22px)] 2xl:text-[clamp(18px,1.8vw,24px)]">A Day in the Rain</h3>
              <p className="text-gray-200 font-Upright text-[clamp(12px,1.5vw,16px)] 2xl:text-[clamp(14px,1.3vw,18px)] line-clamp-2">
                "The drops fell like whispers, merging with my thoughts..."
              </p>
            </div>
          </div>

          {/* Top Left - Mood Snapshot */}
          <div
            data-aos="fade-left"
            className="h-[35%] w-[16%] max-h-[280px] max-w-[160px] 2xl:max-h-[320px] 2xl:max-w-[180px] absolute top-[10%] left-[10%] rounded-md overflow-hidden shadow-lg bg-slate-900"
          >
            <div className="w-full h-[60%]">
              <img className="h-full w-full object-cover" src={topleft} alt="Mood" />
            </div>
            <div className="w-full h-[40%] bg-slate-800 flex flex-col items-center justify-center p-2 2xl:p-3">
              <span className="text-[clamp(20px,3vw,30px)] 2xl:text-[clamp(24px,2.5vw,34px)]">🌧️</span>
              <p className="text-white font-Upright text-[clamp(10px,1.2vw,14px)] 2xl:text-[clamp(12px,1vw,16px)] text-center">
                Reflective - April 1
              </p>
            </div>
          </div>

          {/* Right Bottom - Quick Action */}
          <div
            data-aos="fade-up"
            className="h-[60%] w-[22%] max-h-[380px] max-w-[220px] 2xl:max-h-[420px] 2xl:max-w-[240px] border border-gray-600 bg-black/20 backdrop-blur-md absolute bottom-[10%] right-[6%] rounded-md flex flex-col items-center justify-center gap-4 p-3 2xl:p-4"
          >
            <div className="h-[50%] w-[50%] max-h-[120px] max-w-[120px] 2xl:max-h-[140px] 2xl:max-w-[140px] bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white text-[clamp(24px,4vw,36px)] 2xl:text-[clamp(28px,3.5vw,40px)]">✍️</span>
            </div>
            <button className="px-3 py-1 2xl:px-4 2xl:py-2 bg-white/20 text-white font-Playfair rounded-md text-[clamp(12px,1.5vw,16px)] 2xl:text-[clamp(14px,1.3vw,18px)] hover:bg-white/30 transition-colors">
              Write Now
            </button>
          </div>

          {/* Left Bottom - Timeline Snippet */}
          <div
            data-aos="fade-right"
            className="w-[50%] h-[25%] max-w-[450px] max-h-[200px] 2xl:max-w-[500px] 2xl:max-h-[220px] bg-blue-300/50 backdrop-blur-md absolute bottom-[7%] left-[10%] rounded-md flex items-center shadow-md"
          >
            <div className="h-[90%] w-[45%] p-2 2xl:p-3">
              <img className="h-full w-full object-cover rounded-md" src={leftBottom} alt="Timeline" />
            </div>
            <div className="w-[55%] h-full bg-black/70 flex flex-col justify-center p-2 2xl:p-3">
              <p className="font-Playfair text-white text-[clamp(14px,1.8vw,18px)] 2xl:text-[clamp(16px,1.6vw,20px)]">Spring 2025</p>
              <p className="font-Upright text-gray-200 text-[clamp(10px,1.2vw,14px)] 2xl:text-[clamp(12px,1vw,16px)] line-clamp-2">
                A season of renewal and quiet moments.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Card Section */}
        <div className="lg:hidden w-full h-[50vh] relative flex flex-col items-center justify-center p-4">
          {/* Main Center */}
          <div
            data-aos="fade-in"
            className="h-[60%] w-[70%] max-h-[320px] max-w-[400px] absolute top-[10%] rounded-lg overflow-hidden bg-center bg-cover shadow-lg group"
            style={{ backgroundImage: `url(${mainCenter})` }}
          >
            <div className="w-full h-[35%] bg-black/20 backdrop-blur-md absolute bottom-0 p-2 flex flex-col justify-center transition-all group-hover:h-[40%]">
              <h3 className="text-white font-Playfair text-[clamp(14px,2vw,18px)]">A Day in the Rain</h3>
              <p className="text-gray-200 font-Upright text-[clamp(10px,1.5vw,14px)] line-clamp-2">
                "The drops fell like whispers..."
              </p>
            </div>
          </div>

          {/* Top Left */}
          <div
            data-aos="fade-left"
            className="h-[25%] w-[30%] max-h-[160px] max-w-[140px] absolute top-[5%] left-[5%] rounded-md overflow-hidden shadow-lg bg-slate-900"
          >
            <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center p-2">
              <span className="text-[clamp(18px,3vw,24px)]">🌧️</span>
              <p className="text-white font-Upright text-[clamp(8px,1.2vw,12px)] text-center">
                Reflective - April 1
              </p>
            </div>
          </div>

          {/* Bottom Right */}
          <div
            data-aos="fade-up"
            className="h-[35%] w-[35%] max-h-[200px] max-w-[160px] border border-gray-600 bg-black/20 backdrop-blur-md absolute bottom-[5%] right-[5%] rounded-md flex flex-col items-center justify-center gap-2 p-2"
          >
            <div className="h-[40%] w-[60%] max-h-[60px] max-w-[60px] bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white text-[clamp(18px,3vw,24px)]">✍️</span>
            </div>
            <button className="px-2 py-1 bg-white/20 text-white font-Playfair rounded-md text-[clamp(10px,1.5vw,14px)] hover:bg-white/30 transition-colors">
              Write
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diarytemp;

// import React, { useEffect } from 'react';
// import DiarytempBack from './Diarytemp-images/people-2587310.jpg';
// import mainCenter from './Diarytemp-images/pexels-veeterzy-39811.jpg';
// import topleft from './Diarytemp-images/zaki-ahmed-h0NsueWIdzw-unsplash.jpg';
// import leftBottom from './Diarytemp-images/medium-shot-senior-painter-indoors.jpg';
// import { Link } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// function Diarytemp() {
//   useEffect(() => {
//     AOS.init({ 
//       duration: 1000,
//       once: true
//     });
//   }, []);

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 font-sans">
//       {/* Hero Section */}
//       <div className="relative h-screen w-full overflow-hidden">
//         {/* Background with overlay */}
//         <div 
//           className="absolute inset-0 bg-cover bg-center opacity-70"
//           style={{ backgroundImage: `url(${DiarytempBack})` }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent" />
        
//         {/* Content Container */}
//         <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center px-6 lg:px-12 xl:px-24">
//           {/* Left Text Content */}
//           <div 
//             className="lg:w-1/2 w-full text-center lg:text-left mb-12 lg:mb-0"
//             data-aos="fade-right"
//           >
//             <h1 className='font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-amber-100 mb-6 leading-tight'>
//               Pages of the Soul
//             </h1>
//             <h2 className='font-sans text-xl md:text-2xl text-amber-50 mb-8 max-w-2xl mx-auto lg:mx-0'>
//               A timeless journey through life's most precious moments
//             </h2>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <Link to="/Diaryland">
//                 <button className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg">
//                   My Diary
//                 </button>
//               </Link>
//               <Link to="/Diaries/Diary-Collection">
//                 <button className="px-8 py-3 border-2 border-amber-500 text-amber-100 hover:bg-amber-500/10 font-medium rounded-lg transition-all duration-300">
//                   Discover More
//                 </button>
//               </Link>
//             </div>
//           </div>

//           {/* Right Card Grid */}
//           <div 
//             className="lg:w-1/2 w-full h-[60vh] lg:h-[70vh] relative"
//             data-aos="fade-left"
//           >
//             {/* Main Diary Card */}
//             <div className="absolute w-[70%] h-[60%] lg:h-[65%] left-1/2 -translate-x-1/2 top-[10%] rounded-xl overflow-hidden shadow-2xl group">
//               <img 
//                 src={mainCenter} 
//                 alt="Main diary entry" 
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 transition-all duration-500 group-hover:pb-8">
//                 <h3 className="font-serif text-2xl text-white mb-2">A Day in the Rain</h3>
//                 <p className="font-sans text-amber-100 line-clamp-2">
//                   "The drops fell like whispers, merging with my thoughts as I walked through the misty streets..."
//                 </p>
//               </div>
//             </div>

//             {/* Mood Card */}
//             <div className="absolute w-[25%] h-[25%] lg:h-[30%] left-[5%] top-[5%] bg-gray-800/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-gray-700">
//               <div className="h-2/3 w-full">
//                 <img 
//                   src={topleft} 
//                   alt="Mood" 
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="h-1/3 w-full bg-gray-900 flex flex-col items-center justify-center p-2">
//                 <span className="text-2xl">🌧️</span>
//                 <p className="text-xs text-gray-300">Reflective - April 1</p>
//               </div>
//             </div>

//             {/* Write Now Card */}
//             <div className="absolute w-[25%] h-[25%] lg:h-[30%] right-[5%] bottom-[15%] bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-600 flex flex-col items-center justify-center p-4 shadow-lg">
//               <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-3">
//                 <span className="text-3xl">✍️</span>
//               </div>
//               <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded-md transition-all">
//                 Write Now
//               </button>
//             </div>

//             {/* Timeline Card */}
//             <div className="absolute w-[60%] h-[20%] left-[5%] bottom-[5%] bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg flex">
//               <div className="w-2/5 h-full">
//                 <img 
//                   src={leftBottom} 
//                   alt="Timeline" 
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-3/5 h-full bg-gray-900/80 p-4 flex flex-col justify-center">
//                 <h4 className="font-serif text-white text-lg">Spring 2025</h4>
//                 <p className="font-sans text-gray-300 text-sm line-clamp-2">
//                   A season of renewal and quiet moments that shaped my perspective.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile View (simplified) */}
//       <div className="lg:hidden w-full py-12 px-6">
//         <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
//           {/* Mobile Diary Card */}
//           <div className="relative rounded-xl overflow-hidden shadow-lg h-64">
//             <img 
//               src={mainCenter} 
//               alt="Diary entry" 
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4">
//               <h3 className="font-serif text-xl text-white">A Day in the Rain</h3>
//               <p className="font-sans text-amber-100 text-sm line-clamp-2">
//                 "The drops fell like whispers..."
//               </p>
//             </div>
//           </div>

//           {/* Mobile Mood Card */}
//           <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-4">
//             <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
//               <span className="text-2xl">🌧️</span>
//             </div>
//             <div>
//               <h4 className="font-serif text-white">Current Mood</h4>
//               <p className="font-sans text-gray-300 text-sm">Reflective - April 1</p>
//             </div>
//           </div>

//           {/* Mobile Write Card */}
//           <Link to="/Diaryland" className="block">
//             <div className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 text-center transition-all">
//               <div className="w-16 h-16 rounded-full bg-amber-600/20 border border-amber-500 mx-auto mb-4 flex items-center justify-center">
//                 <span className="text-3xl text-amber-400">✍️</span>
//               </div>
//               <button className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-all">
//                 Write Now
//               </button>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Diarytemp;