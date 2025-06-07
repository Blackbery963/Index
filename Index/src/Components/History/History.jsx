
import React, { useRef, useState, useEffect } from 'react';
import image1 from './History-images/pexels-tiana-18128-2964117.jpg';
import Recentitem from './Hirtoryitem';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function History() {
    const scrollRef = useRef(null);
    const [isMediumOrLarger, setIsMediumOrLarger] = useState(window.innerWidth >= 768); // md breakpoint is 768px

    // Track screen size changes
    useEffect(() => {
        const handleResize = () => {
            setIsMediumOrLarger(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8; // Or set a fixed value like 200
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

    const images = Array(8).fill({
        Image: image1,
        Title: 'hello',
        Description: 'hello everyone',
    });

    return (
        <div className="w-screen bg-gray-100 dark:bg-[#040d1200] flex flex-col relative py-6">
            <h1 className="text-blue-900 md:text-[35px] text-[30px] font-Playfair pl-8 md:text-left text-center font-semibold">
                Recently Explored
            </h1>
            <div className="relative flex items-center w-full px-4 mt-4">
                {/* Left Arrow - Only render on md and larger */}
                {isMediumOrLarger && (
                    <button
                        className="absolute left-0 z-20 p-2 bg-white rounded-md shadow-md hover:bg-gray-200"
                        onClick={() => scroll('left')}
                    >
                        <FaChevronLeft size={20} />
                    </button>
                )}
                <div
                    ref={scrollRef}
                    className="w-full flex gap-4 overflow-x-scroll overflow-y-hidden hide-scrollbar scroll-smooth px-4"
                >
                    {images.map((img, index) => (
                        <Recentitem
                            key={index}
                            Image={img.Image}
                            Title={img.Title}
                            Description={img.Description}
                        />
                    ))}
                </div>
                {/* Right Arrow - Only render on md and larger */}
                {isMediumOrLarger && (
                    <button
                        className="absolute right-4 z-20 p-2 bg-white rounded-md shadow-md hover:bg-gray-200"
                        onClick={() => scroll('right')}
                    >
                        <FaChevronRight size={20} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default History;