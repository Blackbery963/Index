
// import { useEffect } from 'react'
// import Grid from './Grid'
// import Slider from './Slider'
// import { Link } from 'react-router-dom'
// import { FaArrowDown } from 'react-icons/fa'
// import AOS from "aos";
// import "aos/dist/aos.css";

// function Collection() {
//   useEffect(() => {
//     AOS.init({ duration: 800 });
//   }, []);

//   return (
//     <main className='w-screen min-h-screen bg-gray-100 dark:bg-[#040d1200] overflow-x-hidden pb-4 relative'>
//       {/* Header Section */}
//       <section className='w-full '>
//         <h1 className='font-dmserif font-medium lg:text-5xl text-3xl text-red-800 dark:text-red-400 text-center'>
//           Explore Our Collections
//         </h1>
//       </section>

//       {/* Main Content */}
//       <div className='w-[95%] mx-auto flex flex-col gap-8'>
//         {/* Slider Section */}
//         <section className='w-full h-[50vh] rounded-xl overflow shadow-lg dark:shadow-gray-800/50'>
//           <Slider/>
//         </section>

//         {/* Grid Section with Enhanced Foggy Effect */}
//         <section className='w-full relative'>
//           <div className='relative'>
//             <Grid />
//             {/* Darker Foggy Gradient Overlay with Button */}
//             <div className='absolute bottom-0 left-0 w-full h-64 flex items-end justify-center pb-6'>
//               <div className='absolute inset-0 bg-gradient-to-t from-gray-100 via-gray-100/70 to-transparent dark:from-gray-900 dark:via-gray-900/80 pointer-events-none'></div>
//               <Link to='/Gallery' className='relative z-10'>
//                 <button className='py-3 px-8 bg-white/90 dark:bg-gray-800/90 rounded-full font-medium font-Playfair shadow-lg cursor-pointer text-gray-800 dark:text-gray-100 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 group'>
//                   Explore More
//                   <FaArrowDown className='group-hover:translate-y-1 transition-transform duration-300'/>
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   )
// }

// export default Collection


import { useEffect } from 'react'
import Grid from './Grid'
import Slider from './Slider'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaChevronDown } from 'react-icons/fa'
import AOS from "aos";
import "aos/dist/aos.css";

function Collection() {
  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true
    });
  }, []);

  return (
    <main className='w-screen min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#040d1200] dark:to-[#040d1200] overflow-x-hidden pb-16 relative'>
      {/* Hero Section */}
      <section className='w-full py-12 lg:py-20 px-4'>
        <div className='max-w-[95%] mx-auto text-center'>
          <h1 
            className='font-serif font-bold lg:text-6xl text-4xl text-red-700 dark:text-red-400 mb-6'
            data-aos="fade-up"
          >
            Discover Our Collections
          </h1>
          <p 
            className='max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-8 font-Quicksand'
            data-aos="fade-up" data-aos-delay="100"
          >
            Explore our curated selection of premium products, each crafted with exceptional quality and attention to detail.
          </p>
          <div data-aos="fade-up" data-aos-delay="200">
            <Link 
              to='/Gallery' 
              className='inline-flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-all duration-300 group shadow-lg'
            >
              View Gallery
              <FaArrowRight className='ml-2 group-hover:translate-x-1 transition-transform' />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Slider */}
      <section 
        className='w-full max-w-[95%] mx-auto px-4 mb-16 rounded-2xl overflow-hidden shadow-xl dark:shadow-gray-800/30'
        data-aos="fade-up"
      >
        <Slider />
      </section>

      {/* Collections Grid */}
      <section className='w-full max-w-[95%] mx-auto px-4'>
        <div className='flex justify-between items-center mb-8'>
          <h2 
            className='font-serif text-3xl font-semibold text-gray-800 dark:text-white'
            data-aos="fade-right"
          >
            Our Collections
          </h2>
          <Link 
            to='/category' 
            className='text-red-600 dark:text-red-400 hover:underline flex items-center'
            data-aos="fade-left"
          >
            Browse all categories
            <FaChevronDown className='ml-1 transform rotate-90' />
          </Link>
        </div>

        <div className='relative'>
          <Grid />
          <div className='absolute bottom-0 left-0 w-full h-64 flex items-end justify-center pb-8'>
            <div className='absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/70 to-transparent dark:from-gray-900 dark:via-gray-900/80 pointer-events-none'></div>
            <Link 
              to='/Gallery' 
              className='relative z-10'
              data-aos="fade-up"
            >
              <button className='py-3 px-8 bg-white dark:bg-gray-800 rounded-full font-medium shadow-lg cursor-pointer text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 group border border-gray-200 dark:border-gray-700'>
                Load More
                <FaChevronDown className='group-hover:translate-y-1 transition-transform duration-300'/>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className='mt-24 bg-gray-100 dark:bg-gray-800/50 py-16 rounded-3xl mx-4'>
        <div className='max-w-4xl mx-auto text-center px-4'>
          <h2 
            className='font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6'
            data-aos="fade-up"
          >
            Ready to Find Your Perfect Piece?
          </h2>
          <p 
            className='text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto'
            data-aos="fade-up" data-aos-delay="100"
          >
            Our experts are here to help you discover the ideal addition to your collection.
          </p>
          <div data-aos="fade-up" data-aos-delay="200">
            <Link 
              to='/contact' 
              className='inline-flex items-center px-8 py-3 bg-gray-800 hover:bg-gray-700 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-full font-medium transition-all duration-300 group shadow-lg'
            >
              Contact Our Specialists
              <FaArrowRight className='ml-2 group-hover:translate-x-1 transition-transform' />
            </Link>
          </div>
        </div>
      </section> */}
    </main>
  )
}

export default Collection