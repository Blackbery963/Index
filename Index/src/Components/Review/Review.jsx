import { useState, useRef } from 'react';
import Reviewcard from './Reviewcard';
import profile_1 from '/home/swarnadip/Documents/Index/Index/Index/src/Components/Review/Images-of-Review/pexels-jruwa-7421636.jpg';

function Review() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; // Scroll 80% of the visible width
      let newScrollLeft;

      if (direction === 'left') {
        newScrollLeft = Math.max(0, scrollLeft - scrollAmount); // Prevent scrolling past start
      } else {
        newScrollLeft = Math.min(scrollWidth - clientWidth, scrollLeft + scrollAmount); // Prevent scrolling past end
      }

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const images = Array(10).fill({
    Profileimg: profile_1,
    Username: 'Swarnadip Biswas',
    Userdescription: 'Frontend Developer',
    Review: 'Painters Diary beautifully captures the essence of art with its elegant design and thoughtful typography. It’s an inspiring platform for artists to explore, create, and connect.',
  });

  return (
    // Review Section
    <div className="w-[98%] h-auto overflow-hidden bg-gray-100 dark:bg-[#040d1200] relative">
      <h1 className="md:text-[35px] text-[30px] font-Playfair md:text-left text-center font-semibold text-black dark:text-gray-50">
        What People Say About Us
      </h1>
      {/* Scrollable Container with Navigation */}
      <div className="relative flex items-center w-full mt-4">
        {/* Left Arrow */}
        <button
          className="absolute left-0 z-20 w-8 h-8 flex items-center justify-center rounded-md border-2 border-blue-900 text-blue-900 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-600 hover:text-white transition-all duration-300 md:block"
          onClick={() => scroll('left')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-scroll h-full hide-scrollbar scroll-smooth w-full px-4"
        >
          {images.map((img, index) => (
            <Reviewcard
              key={index}
              Profileimg={img.Profileimg}
              Username={img.Username}
              // Userdescription={img.Userdescription} // Uncomment if needed
              Review={img.Review}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-2 z-20 w-8 h-8 flex items-center justify-center rounded-md border-2 border-blue-900 text-blue-900 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-600 hover:text-white transition-all duration-300 md:block"
          onClick={() => scroll('right')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Review;
