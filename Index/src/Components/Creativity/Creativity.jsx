import { useState,useEffect } from 'react';
import Background from './Images-of-Creativity/Untitled design.png';
import Creative_autoplay from './Creative_autoplay';
import AOS from "aos";
import "aos/dist/aos.css";

function Creativity() {


    useEffect(() => {
      AOS.init({ duration: 800 });
    }, [])

  return (
    <div className="h-auto w-[95%] mx-auto rounded-md">
      {/* the container for all section */}
      <div className="h-[85vh] w-full rounded-md overflow-hidden">
        {/* the upper section  */}
        {/* starting of upper section */}
        <div
          className="w-full h-[60vh] flex items-center justify-center "
          style={{
            backgroundImage: `url(${Background})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundColor: "#000",
          }}
        >
          <div className="h-[60%] w-[90%] md:w-[70%] lg:w-[50%] flex items-center justify-center flex-col text-center px-4">
            {/* Responsive Heading */}
            <h1 className="text-white font-medium text-[24px] sm:text-[30px] md:text-[40px] lg:text-[50px] leading-tight font-Create">
              Where Vision and Creativity Converge to Create Unique Artistic Journeys.
            </h1>
            
            {/* Responsive Paragraph */}
            <p className="text-gray-200 font-Upright font-medium text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] mt-4 leading-relaxed">
              Immerse yourself in a world where vision meets creativity, offering a collection
               of art that pushes the boundaries of imagination. Each piece is crafted to tell
                a unique story, blending technique and passion to create captivating visual
                 experiences. Whether you're seeking inspiration or a deeper connection, 
                 our art invites you on a journey that resonates beyond the canvas.
            </p>
          </div>
        </div>
        {/* ending of upper section */}

        {/* starting of lower section */}
        <div data-aos="fade-up" className='w-full h-[30vh] bg-gradient-to-t to-transparent from-slate-600 mt-[-5%] px-4 gap-4 flex justify-between  overflow-y-hidden'>
          <Creative_autoplay/>
        </div>
        {/* ending of lower section */}
      </div>
    </div>
  );
}

export default Creativity;


// import { useState, useEffect } from 'react';
// import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// // Background image (replace with your actual path)
// import Background from '/home/swarnadip/Documents/Index/Index/Index/src/Components/Creativity/Images-of-Creativity/Untitled design.png';

// // Custom arrows for the slider
// const NextArrow = ({ onClick }) => (
//   <button 
//     onClick={onClick}
//     className="absolute right-2 top-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transform -translate-y-1/2 transition-all"
//     aria-label="Next slide"
//   >
//     <FiArrowRight />
//   </button>
// );

// const PrevArrow = ({ onClick }) => (
//   <button 
//     onClick={onClick}
//     className="absolute left-2 top-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transform -translate-y-1/2 transition-all"
//     aria-label="Previous slide"
//   >
//     <FiArrowLeft />
//   </button>
// );

// const Creativity = () => {
 
//   useEffect(() => {
//     AOS.init({ duration: 800 });
//   }, []);

//   const slides = [
//     {
//       image: "https://images.pexels.com/photos/29892850/pexels-photo-29892850/free-photo-of-boston-public-garden-winter-wonderland.jpeg",
//       title: "Winter Wonderland",
//       description: "Experience the magic of snowy landscapes",
//     },
//     {
//       image: "https://images.pexels.com/photos/29304914/pexels-photo-29304914/free-photo-of-snow-covered-mountains-and-fishing-boats-in-arctic-waters.jpeg",
//       title: "Arctic Waters",
//       description: "Stunning contrast of mountains and sea",
//     },
//     {
//       image: "https://images.pexels.com/photos/15566467/pexels-photo-15566467/free-photo-of-pavement-along-water-pond-in-city.jpeg",
//       title: "Urban Serenity",
//       description: "Peaceful city water features",
//     },
//     {
//       image: "https://images.pexels.com/photos/3748174/pexels-photo-3748174.jpeg",
//       title: "Mountain Majesty",
//       description: "Breathtaking high-altitude views",
//     },
//     {
//       image: "https://images.pexels.com/photos/1882017/pexels-photo-1882017.jpeg",
//       title: "Ocean Depths",
//       description: "Explore underwater wonders",
//     },
//     {
//       image: "https://images.pexels.com/photos/19226322/pexels-photo-19226322/free-photo-of-forest-landscape-with-ferns.jpeg",
//       title: "Forest Mystique",
//       description: "Lush greenery and hidden paths",
//     },
//     {
//       image: "https://images.pexels.com/photos/30283157/pexels-photo-30283157/free-photo-of-misty-mountain-framed-by-evergreen-trees.jpeg",
//       title: "Misty Peaks",
//       description: "Dramatic mountain scenery",
//     },
//     {
//       image: "https://images.pexels.com/photos/30271337/pexels-photo-30271337/free-photo-of-black-and-white-sea-turtle-swimming-close-up.jpeg",
//       title: "Marine Life",
//       description: "Close encounters with ocean creatures",
//     },
//   ];

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//         }
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//         }
//       }
//     ]
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-50">
//       {/* Hero Section */}
//       <div 
//         className="relative h-[70vh] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${Background})` }}
//       >
//         <div className="max-w-4xl px-6 text-center text-white">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
//             Where Vision and Creativity Converge
//           </h1>
//           <p className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed">
//             Immerse yourself in a world where vision meets creativity, offering a collection
//             of art that pushes the boundaries of imagination.
//           </p>
//           <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg">
//             Explore Gallery
//           </button>
//         </div>
//       </div>

//       {/* Gallery Section */}
//       <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Artworks</h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Each piece is crafted to tell a unique story, blending technique and passion.
//           </p>
//         </div>

//         <div className="relative">
//           <Slider {...sliderSettings}>
//             {slides.map((slide, index) => (
//               <div key={index} className="px-2 focus:outline-none">
//                 <div className="relative group rounded-xl overflow-hidden shadow-lg h-64">
//                   <img
//                     src={slide.image}
//                     alt={slide.title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
//                     <h3 className="text-xl font-semibold text-white">{slide.title}</h3>
//                     <p className="text-gray-200 mt-1">{slide.description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>

//         <div className="flex justify-center mt-12">
//           <button className="px-6 py-2 border-2 border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-all">
//             View All Artworks
//           </button>
//         </div>
//       </div>

//       {/* Inspiration Section */}
//       <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Inspiration</h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Discover techniques, stories, and artists that will spark your creativity.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
//               <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Creative Techniques</h3>
//               <p className="text-gray-600">
//                 Learn innovative methods from professional artists to enhance your skills.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
//               <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//                 <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Artist Stories</h3>
//               <p className="text-gray-600">
//                 Discover the journeys and inspirations behind each masterpiece.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
//               <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//                 <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Art History</h3>
//               <p className="text-gray-600">
//                 Explore the evolution of artistic styles and movements through time.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Creativity;