import { useState, useRef } from 'react';
import Reviewcard from './Reviewcard';
import profile_1 from './Images-of-Review/pr8.jpg';
import profile_2 from './Images-of-Review/pr2.jpg';
import profile_3 from './Images-of-Review/pr3.jpg';
import profile_4 from './Images-of-Review/pr1.jpg';
import profile_5 from './Images-of-Review/pr4.jpg';
import profile_6 from './Images-of-Review/pr5.jpg';
import profile_7 from './Images-of-Review/pr7.jpg';
import profile_8 from './Images-of-Review/pr6.jpg';
import profile_10 from './Images-of-Review/pr10.jpg';
import profile_9 from './Images-of-Review/pr9.jpg'


function Review() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      let newScrollLeft;

      if (direction === 'left') {
        newScrollLeft = Math.max(0, scrollLeft - scrollAmount);
      } else {
        newScrollLeft = Math.min(scrollWidth - clientWidth, scrollLeft + scrollAmount);
      }

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const reviews = [
    {
      Profileimg: profile_1,
      Username: 'Loved One',
      Userdescription: 'Frontend Developer',
      Review: 'Painters Diary beautifully captures the essence of art with its elegant design and thoughtful typography.',
    },
    {
      Profileimg: profile_2,
      Username: 'James Wilson',
      Userdescription: 'Digital Artist',
      Review: 'The perfect platform for artists to showcase their work. The community is incredibly supportive!',
    },
    {
      Profileimg: profile_3,
      Username: ' Sophia Rodriguez',
      Userdescription: 'Art Collector',
      Review: 'I discovered amazing new artists through Painters Diary. The curation is excellent.',
    },
    {
      Profileimg: profile_4,
      Username: 'Emma Chen',
      Userdescription: 'Watercolor Painter',
      Review: 'The daily inspiration feed keeps me motivated to create new artwork every day.',
    },
    {
      Profileimg: profile_5,
      Username: 'Michael Johnson',
      Userdescription: 'Photographer',
      Review: 'Finally a platform that understands the needs of visual artists. Brilliant execution!',
    },
    {
      Profileimg: profile_6,
      Username: 'Olivia Martinez',
      Userdescription: 'Art Teacher',
      Review: 'My students love using Painters Diary for their art research. Highly recommended for educators.',
    },
    {
      Profileimg: profile_7,
      Username: 'Daniel Kim',
      Userdescription: 'Illustrator',
      Review: 'The clean interface puts the focus exactly where it should be - on the artwork.',
    },
    {
      Profileimg: profile_8,
      Username: 'Ava Thompson',
      Userdescription: 'Gallery Owner',
      Review: 'I regularly scout for new talent on Painters Diary. The quality of work is outstanding.',
    },
    {
      Profileimg: profile_9,
      Username: 'Liam Brown',
      Userdescription: 'Art Director',
      Review: 'The best digital art platform I have used in my 10-year career. Simply phenomenal.',
    },
    {
      Profileimg: profile_10,
      Username: 'Isabella Nice',
      Userdescription: 'Muralist',
      Review: 'Painters Diary understands artists needs better than any other platform out there.',
    }
  ];

  return (
    <div className="w-[98%] h-auto overflow-hidden bg-gray-100 dark:bg-[#040d1200] relative py-8">
      <h1 className="md:text-[35px] text-[30px] font-Playfair md:text-left text-center font-semibold text-black dark:text-gray-50 mb-8">
        What People Say About Us
      </h1>
      
      <div className="relative flex items-center w-full">
        {/* Left Arrow */}
        <button
          className="absolute left-0 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-all duration-300 md:block"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-blue-900 dark:text-blue-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-scroll h-full hide-scrollbar scroll-smooth w-full px-12"
        >
          {reviews.map((review, index) => (
            <Reviewcard
              key={index}
              Profileimg={review.Profileimg}
              Username={review.Username}
              Userdescription={review.Userdescription}
              Review={review.Review}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-all duration-300 md:block"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-blue-900 dark:text-blue-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Review;