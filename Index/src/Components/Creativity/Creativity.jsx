import { useState,useEffect } from 'react';
// import Background from './Images-of-Creativity/Untitled design.png';
import Creative_autoplay from './Creative_autoplay';
import AOS from "aos";
import "aos/dist/aos.css";


const Background ="https://images.pexels.com/photos/19931186/pexels-photo-19931186.png"

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
            <h1 className="text-purple-600 font-medium text-[24px] sm:text-[30px] md:text-[40px] lg:text-[50px] leading-tight font-Create">
              Where Vision and Creativity Converge to Create Unique Artistic Journeys.
            </h1>
            
            {/* Responsive Paragraph */}
            <p className="text-gray-800 font-Upright font-semibold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] mt-4 leading-relaxed">
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
// import AOS from "aos";
// import "aos/dist/aos.css";

// function AntiqueGateway() {
//   const [activePeriod, setActivePeriod] = useState('all');
//   const [hoveredItem, setHoveredItem] = useState(null);

//   useEffect(() => {
//     AOS.init({ duration: 800 });
//   }, []);

//   // Antique collection with embedded offers
//   const antiqueCollection = [
//     {
//       link: "https://cdn.pixabay.com/photo/2022/11/27/01/47/boat-7618814_960_720.jpg",
//       id: 1,
//       title: "Ming Dynasty Celadon Vase",
//       era: "14th-17th Century",
//       price: "$28,500",
//       hiddenOffer: "Authenticity guarantee + 0% financing",
//       description: "Ex-Sotheby's collection, lacquer repaired",
//       status: "Last of its kind"
//     },
//     {
//       link:"https://cdn.pixabay.com/photo/2022/11/29/19/27/city-7625204_960_720.jpg",
//       id: 2,
//       title: "Victorian Stereoscope Viewer",
//       era: "1890s",
//       price: "$4,200",
//       hiddenOffer: "Includes 12 original slides",
//       description: "Working condition, rosewood casing",
//       status: "3 available"
//     },
//     {
//       link:"https://cdn.pixabay.com/photo/2025/05/19/13/34/girl-9609522_960_720.jpg",
//       id: 3,
//       title: "Art Deco Platinum Brooch",
//       era: "1925",
//       price: "$9,800",
//       hiddenOffer: "Complimentary appraisal update",
//       description: "European hallmarks, original case",
//       status: "Reserve pending"
//     },
//     {
//       link:"https://cdn.pixabay.com/photo/2025/05/12/18/19/lights-9595813_960_720.jpg",
//       id: 4,
//       title: "Ottoman Calligraphy Quran",
//       era: "1789",
//       price: "$62,000",
//       hiddenOffer: "Private viewing available",
//       description: "Gold-leaf illumination, leather binding",
//       status: "Museum provenance"
//     },
//   ];

//   // Filter by historical period
//   const filteredCollection = activePeriod === 'all' 
//     ? antiqueCollection 
//     : antiqueCollection.filter(item => item.era.includes(activePeriod));

//   return (
//     <div className="min-h-screen w-[95%] mx-auto bg-gradient-to-b from-maroon-100 via-maroon-50 to-gray-50">
//       {/* Hero Section - Dark Maroon Gradient with Texture */}
//       <div className="relative h-[70vh] overflow-hidden">
//         <div 
//           className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2014/07/31/22/56/balls-407081_960_720.jpg')] bg-cover bg-center opacity-100"
//           style={{ backgroundBlendMode: 'overlay' }}
//         />
        
//         <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
//           <h1 
//             className="text-blue-100 font-serif text-4xl md:text-6xl tracking-widest mb-6"
//             style={{ fontFamily: "'Cinzel', serif", textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
//           >
//             THE CURIOSITY CABINET
//           </h1>
//           <div className="w-24 h-1 bg-gold-500 mb-8 relative">
//             <div className="absolute inset-0 border-t border-b border-gold-600 opacity-50"></div>
//           </div>
//           <p className="text-purple-800 font-Quicksand font-semibold max-w-2xl text-lg md:text-xl leading-relaxed italic">
//             A sanctuary of history’s rarest treasures, curated for the discerning collector. 
//             Each artifact whispers tales of bygone eras, awaiting its next guardian.
//           </p>
          
//           {/* Period Filter - Styled with gradient background */}
//           <div className="mt-12 flex flex-wrap justify-center gap-3">
//             {['all', '14th-17th', '18th', '19th', '20th'].map((period) => (
//               <button
//                 key={period}
//                 onClick={() => setActivePeriod(period === 'all' ? 'all' : period)}
//                 className={`px-4 py-2 text-xs md:text-sm font-medium transition-all rounded-sm 
//                   ${activePeriod === (period === 'all' ? 'all' : period) 
//                     ? 'bg-gradient-to-r from-[#493D9E] to-[#b29cee] text-gold-50 shadow-inner rounded-lg' 
//                     : 'bg-gradient-to-r from-[#493D9E] to-[#b29cee] text-maroon-900 hover:from-maroon-300 hover:to-maroon-200 border border-maroon-700 rounded-lg'}`}
//                 style={{ fontFamily: "'Goudy Old Style', serif" }}
//               >
//                 {period === 'all' ? 'ALL ERAS' : `${period} CENTURY`}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Collection Showcase - Gradient Background with Texture Overlay */}
//       <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-[#6A1E55] to-gray-100 rounded-lg shadow-lg mt-[-20px] relative">
//         <div 
//           className="absolute inset-0 bg-[url('https://www.textures.com/system/categories/1287/backgrounds-parchment/hero-image-1.jpg')] bg-cover bg-center opacity-20"
//           style={{ backgroundBlendMode: 'overlay' }}
//         />
//         <div className="relative z-10">
//           <div className="text-center mb-12">
//             <h2 
//               className="text-3xl text-maroon-900"
//               style={{ fontFamily: "'Cinzel', serif" }}
//             >
//               TREASURES OF THE PAST
//             </h2>
//             <div className="w-16 h-0.5 bg-maroon-700 mx-auto mt-2"></div>
//             <p 
//               className="mt-4 text-maroon-800 max-w-2xl mx-auto italic"
//               style={{ fontFamily: "'Goudy Old Style', serif" }}
//             >
//               Timeless artifacts of historical significance, each a masterpiece in its own right, 
//               offered for private acquisition to those who cherish the legacy of the past.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {filteredCollection.map((item) => (
//               <div 
//                 key={item.id}
//                 className="bg-gradient-to-t from-maroon-100 to-maroon-50 shadow-lg hover:shadow-xl transition-all duration-300 relative group border border-maroon-400 rounded-md"
//                 onMouseEnter={() => setHoveredItem(item.id)}
//                 onMouseLeave={() => setHoveredItem(null)}
//               >
//                 {/* Status Ribbon - Styled like an old wax seal */}
//                 <div className={`absolute -top-3 -right-3 w-12 h-12 flex items-center justify-center rounded-full text-xs font-medium z-10 
//                   ${item.status.includes('Last') ? 'bg-red-800 text-gold-100' : 
//                     item.status.includes('available') ? 'bg-green-800 text-gold-100' : 
//                     'bg-maroon-800 text-gold-100'} shadow-md`}>
//                   <span className="text-center text-[10px]">{item.status}</span>
//                 </div>
                
//                 <div className="h-64 bg-gradient-to-b from-maroon-200 to-maroon-100 flex items-center justify-center overflow-hidden relative">
//                   {/* Placeholder for antique image with vintage frame effect */}
//                   <span className="text-maroon-600 italic">Artifact Image</span>
//                   <div className="absolute inset-0 border opacity-100 rounded-md overflow-hidden">
//                     <img
//                       src={item.link}
//                       alt={item.title}
//                       className="w-full h-full object-cover rounded-md"
//                     />
//                   </div>
//                 </div>
                
//                 <div className="p-4 border-t-2 border-maroon-700">
//                   <h3 className="text-xl text-maroon-900" style={{ fontFamily: "'Cinzel', serif" }}>{item.title}</h3>
//                   <p className="text-sm text-maroon-800 mt-1 italic" style={{ fontFamily: "'Goudy Old Style', serif" }}>{item.era}</p>
//                   <p className="text-xs text-maroon-700 mt-2" style={{ fontFamily: "'Goudy Old Style', serif" }}>{item.description}</p>
                  
//                   <div className="mt-4 flex justify-between items-center">
//                     <span className="font-medium text-maroon-900" style={{ fontFamily: "'Cinzel', serif" }}>{item.price}</span>
//                     {hoveredItem === item.id && (
//                       <span className="text-xs bg-maroon-200 text-maroon-900 px-2 py-1 rounded animate-pulse">
//                         {item.hiddenOffer}
//                       </span>
//                     )}
//                   </div>
                  
//                   {/* Subtle CTA styled like an old letter */}
//                   <button 
//                     className="mt-3 w-full text-xs py-1 border border-maroon-600 text-maroon-900 hover:bg-maroon-200 transition-colors"
//                     style={{ fontFamily: "'Goudy Old Style', serif" }}
//                   >
//                     Inquire About This Piece
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Discreet Acquisition Section - Gradient with Texture */}
//           <div className="mt-20 text-center bg-gradient-to-r from-[#670D2F] to-maroon-300 bg-opacity-70 p-8 border border-maroon-500 rounded-md relative">
//             <div 
//               className="absolute inset-0 bg-[url('https://www.textures.com/system/categories/1287/backgrounds-parchment/hero-image-1.jpg')] bg-cover bg-center opacity-10"
//               style={{ backgroundBlendMode: 'overlay' }}
//             />
//             <div className="relative z-10">
//               <h3 
//                 className="text-2xl text-maroon-900 mb-2"
//                 style={{ fontFamily: "'Cinzel', serif" }}
//               >
//                 PRESERVE THE LEGACY
//               </h3>
//               <div className="w-12 h-0.5 bg-maroon-700 mx-auto mb-4"></div>
//               <p 
//                 className="text-maroon-800 max-w-2xl mx-auto mb-6 italic"
//                 style={{ fontFamily: "'Goudy Old Style', serif" }}
//               >
//                 Join an elite circle of collectors who value the stories behind each artifact. 
//                 Enjoy privileged access to new finds and expert curation services.
//               </p>
//               <div className="flex flex-col sm:flex-row justify-center gap-4">
//                 <button 
//                   className="px-6 py-2 bg-gradient-to-r from-maroon-900 to-maroon-800 text-gold-100 hover:from-maroon-800 hover:to-maroon-700 transition-colors text-sm"
//                   style={{ fontFamily: "'Cinzel', serif" }}
//                 >
//                   Become a Custodian
//                 </button>
//                 <button 
//                   className="px-6 py-2 border border-maroon-900 text-maroon-900 hover:bg-maroon-100 transition-colors text-sm"
//                   style={{ fontFamily: "'Cinzel', serif" }}
//                 >
//                   Request a Viewing
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Trust Indicators - Gradient Background */}
//       <div className="bg-gradient-to-t from-[#670D2F] to-[#e9b3c8] t py-12">
//         <div className="max-w-7xl mx-auto px-4">
//           <p 
//             className="text-center text-xs uppercase tracking-widest text-maroon-800 mb-8"
//             style={{ fontFamily: "'Goudy Old Style', serif" }}
//           >
//             ESTEEMED PARTNERS
//           </p>
//           <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-80">
//             {['Sotheby’s', 'Christie’s', 'TEFAF', 'Heritage Auctions'].map((name) => (
//               <div 
//                 key={name} 
//                 className="text-maroon-900 italic"
//                 style={{ fontFamily: "'Cinzel', serif" }}
//               >
//                 {name}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AntiqueGateway;

