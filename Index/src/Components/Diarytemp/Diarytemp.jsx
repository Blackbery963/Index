// import React from 'react';
// import { useEffect, useState } from 'react';
// import DiarytempBack from '/home/swarnadip/Documents/Index/Index/Index/src/Components/Diarytemp/Diarytemp-images/people-2587310.jpg';
// import mainCenter from '/home/swarnadip/Documents/Index/Index/Index/src/Components/Diarytemp/Diarytemp-images/pexels-veeterzy-39811.jpg'
// import { Link } from 'react-router-dom';
// import topleft from '/home/swarnadip/Documents/Index/Index/Index/src/Components/Diarytemp/Diarytemp-images/zaki-ahmed-h0NsueWIdzw-unsplash.jpg'
// import leftBottom from '/home/swarnadip/Documents/Index/Index/Index/src/Components/Diarytemp/Diarytemp-images/medium-shot-senior-painter-indoors.jpg'
// import AOS from "aos";
// import "aos/dist/aos.css";



// function Diarytemp() {
   
//         useEffect(() => {
//            AOS.init({ duration: 1500 });
//          }, [])

//     return (
//         <div className='max-w-screen min-h-[90vh]'>
//             <div className='h-[90vh] w-screen bg-cover bg-center flex flex-col md:flex-row' style={{ backgroundImage: `url(${DiarytempBack})` }}>
//                 <div className='md:w-[40%] w-full flex flex-col items-center lg:justify-center p-6'>
//                     <h1 className='lg:text-left text-center lg:text-[45px] md:text-[30px] text-[25px] font-Playfair px-8 font-semibold text-yellow-100'>Pages of the Soul - A timeless Journey Through Life’s Moments</h1>
//                     <h5 className='lg:text-left text-center text-white font-Upright lg:text-[25px] font-semibold px-8'>A Diary of Thoughts, Dreams, and Memories Etched in Ink, Captures the Essence of Every Heart, the Whispers of Untold Stories, and the Beauty of Emotions That Shape Our Journey Through Time</h5>
//                     <div className='flex gap-x-8 mt-6'>
//                         <Link to="/Diary">
//                             <button className='px-4 py-2 border-[2px] font-semibold text-slate-100 font-Playfair rounded-md border-gray-100'>My Diary</button>
//                         </Link>
//                         <Link to={"/Diaryland"}>
//                         <button className='px-4 py-2 border-[2px] font-semibold text-slate-100 font-Playfair rounded-md border-gray-100'>Discover More</button>
//                         </Link>
//                     </div>
//                 </div>

//                 {/* Card floating section */}
//                 <div className='lg:w-[60%] w-full flex backdrop-blur-sm relative flex-col lg:flex-row items-center justify-center'>
//                     {/* the main center */}
//                     <div data-aos="fade-in" className='h-[50%] w-[60%] absolute  top-[15%] left-[20%] rounded-lg overflow-hidden bg-center bg-cover'style={{backgroundImage: `url(${mainCenter})`}}>
//                         <div className=' w-full h-[30%] bg-black/15 backdrop-blur-md absolute bottom-0'>
//                         <h3 className='text-white font-Playfair text-lg md:text-xl pl-2'>A Day in the Rain</h3>
//                         <p className='text-gray-200 font-Upright text-[15px] pr-24 pl-2'>"The drops fell like whispers, merging with the rhythm of my thoughts. Each droplet carried a memory, a longing, a moment of solitude wrapped in nature’s embrace. The rain painted the world anew, washing away yesterday’s worries and filling the air with a scent of renewal and hope."</p>
//                         </div>
//                     </div>

//                     {/* the top left corner */}
//                     <div data-aos="fade-left" className='h-[35%] w-[16%] bg-slate-900 absolute md:top-[10%] top-[5%] left-[10%] rounded-md overflow-hidden shadow-slate-900 shadow-lg'>
//                         <div className=' w-full h-[60%] bg-black'>
//                             <img className=' h-full w-full' src={topleft} alt="" />
//                         </div>
//                     </div>
//                     {/* the right bottom corner */}
//                     <div data-aos="fade-up" className='h-[60%] w-[22%] border border-gray-600 px-4 bg-black/20 backdrop-blur-md absolute md:bottom-[10%] bottom-[5%] right-[6%] rounded-md flex flex-col items-center justify-center gap-6'>
//                     <div className='md:h-[120px] md:w-[120px] bg-black rounded-full'>
//                     </div>
//                     <div  className='w-[95%] h-[50%] bg-white/60 backdrop-blur-md rounded-md'></div>
//                     </div>
//                     {/* the left bottom corner */}
//                     <div data-aos="fade-right" className='w-[50%] h-[25%] bg-blue-300/50 backdrop-blur-md absolute md:bottom-[7%] bottom-[2%] left-[10%] rounded-md flex justify-center items-center'>
//                         <div className=' h-[95%] w-[45%] p-4 rounded-md overflow-hidden'>
//                             <img className=' h-full w-full rounded-md' src={leftBottom} alt="" />
//                         </div>
//                         <div className=' w-[55%] h-full bg-black'>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='lg:hidden w-full h-[50vh] relative flex flex-col items-center justify-center'>
//                         {/* Main center */}
//                         <div 
//                             data-aos="fade-in" 
//                             className='h-[60%] w-[70%] absolute top-[10%] rounded-lg overflow-hidden bg-center bg-cover'
//                             style={{backgroundImage: `url(${mainCenter})`}}
//                         >
//                             <div className='w-full h-[30%] bg-black/15 backdrop-blur-md absolute bottom-0'></div>
//                         </div>

//                         {/* Top left corner */}
//                         <div 
//                             data-aos="fade-left" 
//                             className='h-[25%] w-[30%] bg-slate-900 absolute top-[5%] left-[5%] rounded-md overflow-hidden shadow-slate-900 shadow-lg'
//                         >
//                             <div className='w-full h-full bg-black'>
//                                 <img className='h-full w-full object-cover' src={topleft} alt="" />
//                             </div>
//                         </div>

//                         {/* Bottom right corner */}
//                         <div 
//                             data-aos="fade-up" 
//                             className='h-[35%] w-[35%] border border-gray-600 bg-white/80 backdrop-blur-lg absolute bottom-[5%] right-[5%] rounded-md flex items-center justify-center'
//                         >
//                             <div className='h-[40%] w-[60%] bg-black rounded-full'></div>
//                         </div>
//                     </div>
//             </div>
//         </div>
//     );
// }

// export default Diarytemp;

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
            <Link to="/Diary">
              <button className=" px-3 py-1 md:px-4 md:py-2 2xl:px-5 2xl:py-3 border-2 font-semibold text-slate-100 font-Playfair rounded-md border-gray-100 hover:bg-white/10 transition-colors">
                My Diary
              </button>
            </Link>
            <Link to="/Diaryland">
              <button 
                className="  px-3 py-1 md:px-4 md:py-2 2xl:px-5 2xl:py-3 border-2 font-semibold text-slate-100 font-Playfair rounded-md border-gray-100 hover:bg-white/10 transition-colors">
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
            <div className="w-full h-[35%] bg-black/20 backdrop-blur-md absolute bottom-0 p-3 2xl:p-4 flex flex-col justify-center transition-all group-hover:h-[40%]">
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