// import { useState,useEffect } from 'react';
// // import Background from './Images-of-Creativity/Untitled design.png';
// import Creative_autoplay from './Creative_autoplay';
// import AOS from "aos";
// import "aos/dist/aos.css";


// const Background ="https://images.pexels.com/photos/19931186/pexels-photo-19931186.png"

// function Creativity() {


//     useEffect(() => {
//       AOS.init({ duration: 800 });
//     }, [])

//   return (
//     <div className="h-auto w-[95%] mx-auto rounded-md">
//       {/* the container for all section */}
//       <div className="h-[85vh] w-full rounded-md overflow-hidden">
//         {/* the upper section  */}
//         {/* starting of upper section */}
//         <div
//           className="w-full h-[60vh] flex items-center justify-center "
//           style={{
//             backgroundImage: `url(${Background})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "cover",
//             backgroundColor: "#000",
//           }}
//         >
//           <div className="h-[60%] w-[90%] md:w-[70%] lg:w-[50%] flex items-center justify-center flex-col text-center px-4">
//             {/* Responsive Heading */}
//             <h1 className="text-purple-600 font-medium text-[24px] sm:text-[30px] md:text-[40px] lg:text-[50px] leading-tight font-Create">
//               Where Vision and Creativity Converge to Create Unique Artistic Journeys.
//             </h1>
            
//             {/* Responsive Paragraph */}
//             <p className="text-gray-800 font-Upright font-semibold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] mt-4 leading-relaxed">
//               Immerse yourself in a world where vision meets creativity, offering a collection
//                of art that pushes the boundaries of imagination. Each piece is crafted to tell
//                 a unique story, blending technique and passion to create captivating visual
//                  experiences. Whether you're seeking inspiration or a deeper connection, 
//                  our art invites you on a journey that resonates beyond the canvas.
//             </p>
//           </div>
//         </div>
//         {/* ending of upper section */}

//         {/* starting of lower section */}
//         <div data-aos="fade-up" className='w-full h-[30vh] bg-gradient-to-t to-transparent from-slate-600 mt-[-5%] px-4 gap-4 flex justify-between  overflow-y-hidden'>
//           <Creative_autoplay/>
//         </div>
//         {/* ending of lower section */}
//       </div>
//     </div>
//   );
// }

// export default Creativity;


// import { useEffect } from 'react';
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Creativity = () => {
//   useEffect(() => {
//     AOS.init({ duration: 800 });
//   }, []);

//   return (
//     <div className="w-full overflow-hidden">
//       {/* Floating Canvas Section */}
//       <div className="relative h-screen w-full flex items-center justify-center">
//         {/* Dynamic Background Layers */}
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/30 to-blue-900/20 z-0"></div>
        
//         {/* Floating Art Elements */}
//         <div 
//           className="absolute left-10 top-1/4 w-40 h-40 rounded-full bg-purple-600/10 blur-xl animate-float"
//           style={{ animationDelay: '0s' }}
//         ></div>
//         <div 
//           className="absolute right-20 top-1/3 w-32 h-32 rounded-full bg-blue-600/10 blur-xl animate-float"
//           style={{ animationDelay: '1s' }}
//         ></div>
//         <div 
//           className="absolute left-1/4 bottom-1/4 w-48 h-48 rounded-full bg-pink-600/10 blur-xl animate-float"
//           style={{ animationDelay: '2s' }}
//         ></div>

//         {/* Main Content */}
//         <div className="relative z-10 w-full max-w-6xl px-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             {/* Text Content */}
//             <div data-aos="fade-right">
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
//                   Artistic Alchemy
//                 </span><br />
//                 Where Vision Transforms Into Legacy
//               </h1>
              
//               <p className="text-lg text-gray-300 mb-8 max-w-lg">
//                 Step into a dimension where every brushstroke tells a story and each creation 
//                 bridges worlds. Our collective redefines what art can be.
//               </p>
              
//               <div className="flex flex-wrap gap-4">
//                 <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:shadow-lg transition-all">
//                   Begin Your Journey
//                 </button>
//                 <button className="px-8 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all">
//                   Meet the Artists
//                 </button>
//               </div>
//             </div>

//             {/* Interactive Art Preview */}
//             <div 
//               data-aos="fade-left" 
//               className="relative h-96 w-full rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl"
//             >
//               <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 to-blue-900/30 flex items-center justify-center">
//                 <div className="text-center p-6">
//                   <div className="text-6xl mb-4">🎨</div>
//                   <p className="text-white/80">Hover to preview creative works</p>
//                 </div>
//               </div>
//               <div className="absolute inset-0 hover:opacity-0 opacity-100 transition-opacity duration-500 bg-[url('https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Moving Art Showcase */}
//       <div className="relative bg-black py-16 overflow-hidden">
//         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover opacity-5"></div>
        
//         <div className="relative max-w-7xl mx-auto px-6">
//           <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
//               Current Exhibitions
//             </span>
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[1, 2, 3].map((item) => (
//               <div 
//                 key={item}
//                 data-aos="fade-up"
//                 data-aos-delay={item * 100}
//                 className="bg-gradient-to-b from-gray-900/50 to-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-400/30 transition-all group"
//               >
//                 <div className="h-48 bg-gray-800/50 relative overflow-hidden">
//                   <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/600x400/?art')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-white mb-2">Emerging Visions {item}</h3>
//                   <p className="text-gray-400 mb-4">Exploring new creative frontiers</p>
//                   <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
//                     View Collection <span className="ml-1">→</span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Creativity;

// import { useEffect } from 'react';
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Creativity = () => {
//   useEffect(() => {
//     AOS.init({ duration: 800 });
//   }, []);

//   return (
//     <div className=" max-w-[95%] mx-auto bg-white dark:bg-[#040d1200] py-20 px-6 text-center">
//       <h2 
//         className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
//         data-aos="fade-down"
//       >
//         Upcoming Exhibitions
//       </h2>
//       <p 
//         className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-12"
//         data-aos="fade-up"
//       >
//         A curated showcase of masterpieces is on its way. Stay tuned to experience the next wave of creativity.
//       </p>

//       <div 
//         data-aos="zoom-in"
//         className="mx-auto max-w-md rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-10"
//       >
//         <div className="text-5xl mb-4">🕰️</div>
//         <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
//           Coming Soon
//         </h3>
//         <p className="text-gray-500 dark:text-gray-400 text-sm">
//           We're preparing a unique space to showcase exclusive exhibitions from talented artists.
//         </p>
//       </div>
//       <div 
//           className="mt-16"
//           data-aos="fade"
//           data-aos-delay="400"
//         >
//           <button className="text-xs tracking-wider uppercase border-b border-transparent hover:border-gray-500 dark:hover:border-gray-400 pb-1 transition-colors duration-300">
//             Notify me when ready
//           </button>
//         </div>
//     </div>
//   );
// };

// export default Creativity;


import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

const Creativity = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="w-full bg-white dark:bg-black py-16 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        {/* Title with subtle underline effect */}
        <h2 
          className="text-3xl font-light tracking-tight text-gray-900 dark:text-white mb-6 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-px after:bg-gray-300 dark:after:bg-gray-700"
          data-aos="fade"
        >
          Future Exhibitions
        </h2>
        
        {/* Minimal description with small caps */}
        <p 
          className="text-gray-500 dark:text-gray-400 text-sm tracking-wider uppercase mb-16"
          data-aos="fade"
          data-aos-delay="100"
        >
          New perspectives arriving soon
        </p>

        {/* Unique "coming soon" card with subtle animation */}
        <div 
          className="relative max-w-xs mx-auto group"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="absolute inset-0 rounded-lg bg-gray-50 dark:bg-gray-900 transform group-hover:rotate-1 transition duration-500"></div>
          
          <div className="relative p-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
            <div className="text-4xl mb-4">↗</div>
            <h3 className="text-lg font-normal text-gray-800 dark:text-gray-200 mb-2">
              In Preparation
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              We're crafting a space for extraordinary artistic dialogues
            </p>
          </div>
        </div>

        {/* Minimal call-to-action */}
        <div 
          className="mt-16"
          data-aos="fade"
          data-aos-delay="400"
        >
          <button className="text-xs tracking-wider uppercase border-b border-transparent hover:border-gray-500 dark:hover:border-gray-400 pb-1 transition-colors duration-300">
            Notify me when ready
          </button>
        </div>
      </div>
    </div>
  );
};

export default Creativity;