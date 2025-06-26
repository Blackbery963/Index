// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const slides = [
//   {
//     image: "https://images.pexels.com/photos/29892850/pexels-photo-29892850/free-photo-of-boston-public-garden-winter-wonderland.jpeg",
//     title: "Top Deals on Electronics!",
//     description: "Save big on the latest gadgets. ",
//   },
//   {
//     image: "https://images.pexels.com/photos/29304914/pexels-photo-29304914/free-photo-of-snow-covered-mountains-and-fishing-boats-in-arctic-waters.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     title: "Mega Fashion Sale",
//     description: "Up to 70% off on top fashion brands.",
//   },
//   {
//     image: "https://images.pexels.com/photos/15566467/pexels-photo-15566467/free-photo-of-pavement-along-water-pond-in-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     title: "Home Essentials",
//     description: "Discounts on furniture, kitchenware, .",
//   },
//   {
//     image: "https://images.pexels.com/photos/3748174/pexels-photo-3748174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     title: "Mega Fashion Sale",
//     description: "Up to 70% off on top fashion brands.",
//   },
//   {
//     image: "https://images.pexels.com/photos/1882017/pexels-photo-1882017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     title: "Mega Fashion Sale",
//     description: "Up to 70% off on top fashion brands.",
//   },
//   {
//     image: "https://images.pexels.com/photos/19226322/pexels-photo-19226322/free-photo-of-forest-landscape-with-ferns.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     title: "Mega Fashion Sale",
//     description: "Up to 70% off on top fashion brands.",
//   },
//   {
//     image: "https://images.pexels.com/photos/30283157/pexels-photo-30283157/free-photo-of-misty-mountain-framed-by-evergreen-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     title: "Mega Fashion Sale",
//     description: "Up to 70% off on top fashion brands.",
//   },
//   {
//     image: "https://images.pexels.com/photos/30271337/pexels-photo-30271337/free-photo-of-black-and-white-sea-turtle-swimming-close-up.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     title: "Mega Fashion Sale",
//     description: "Up to 70% off on top fashion brands.",
//   },
// ];

// const CreativeAutoplay = () => {

//   const settings = {
   
//     dots: true,
//     infinite: true,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 2000,
//     autoplaySpeed: 2000,
//     cssEase: "linear",
//      // prevArrow: <CustomPrevArrow />,
//     // nextArrow: <CustomNextArrow />,
//     customPaging: (i) => (
//       <div className="w-1 h-1 bg-gray-400 rounded-full hover:bg-gray-600 transition-all mt-2"></div>
//     ),
//     dotsClass: "slick-dots flex justify-center space-x-2 mt-4",
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="h-full w-full gap-x-8 overflow-hidden relative mx-auto ">
//       <Slider {...settings}>
//         {slides.map((slide, index) => (
//           <div key={index} className="relative px-2 overflow-hidden">
//             {/* Slides background */}
//             <div
//               className=" w-full md:h-[27vh] h-[25vh] bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
//               style={{
//                 backgroundImage: `url(${slide.image})`,
//                 backgroundPosition: 'center',
//                 backgroundSize: 'cover',
//               }}
//               aria-label={`Slide ${index + 1}`}
//             ></div>
//             {/* Slide Content */}
//             <div className="absolute w-fit bottom-4 left-4 text-white z-10 bg-black/15 p-4 rounded-lg backdrop-blur-sm flex flex-col gap-2">
//               <h2 className="text-xl md:text-2xl font-bold animate-fadeInUp">
//                 {slide.title}
//               </h2>
//               <p className="text-sm md:text-base animate-fadeInUp delay-300">
//                 {slide.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </Slider>

//       {/* Custom Styling for Dots */}
//       <style jsx>{`
//         .slick-dots li button:before {
//           color: white;
//           font-size: 10px;
//         }
//         .slick-dots li.slick-active button:before {
//           color: #f9c22e; /* Highlighted dot color */
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CreativeAutoplay;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Updated slides to reflect art pieces with a subtle purchase hint
const slides = [
  {
    image: "https://images.pexels.com/photos/29892850/pexels-photo-29892850/free-photo-of-boston-public-garden-winter-wonderland.jpeg",
    title: "Whispers of Winter",
    description: "A serene piece capturing nature's quiet beauty. $180",
  },
  {
    image: "https://images.pexels.com/photos/29304914/pexels-photo-29304914/free-photo-of-snow-covered-mountains-and-fishing-boats-in-arctic-waters.jpeg",
    title: "Arctic Reflections",
    description: "An ethereal view of icy waters. $220",
  },
  {
    image: "https://images.pexels.com/photos/15566467/pexels-photo-15566467/free-photo-of-pavement-along-water-pond-in-city.jpeg",
    title: "Urban Serenity",
    description: "A tranquil cityscape moment. $150",
  },
  {
    image: "https://images.pexels.com/photos/3748174/pexels-photo-3748174.jpeg",
    title: "Abstract Harmony",
    description: "Vibrant colors in perfect balance. $200",
  },
  {
    image: "https://images.pexels.com/photos/1882017/pexels-photo-1882017.jpeg",
    title: "Ethereal Light",
    description: "A dance of light and shadow. $190",
  },
  {
    image: "https://images.pexels.com/photos/19226322/pexels-photo-19226322/free-photo-of-forest-landscape-with-ferns.jpeg",
    title: "Forest Whispers",
    description: "Nature's embrace in soft hues. $170",
  },
  {
    image: "https://images.pexels.com/photos/30283157/pexels-photo-30283157/free-photo-of-misty-mountain-framed-by-evergreen-trees.jpeg",
    title: "Misty Peaks",
    description: "A mystical mountain vista. $210",
  },
  {
    image: "https://images.pexels.com/photos/30271337/pexels-photo-30271337/free-photo-of-black-and-white-sea-turtle-swimming-close-up.jpeg",
    title: "Ocean Guardian",
    description: "A majestic sea creature in monochrome. $160",
  },
];

const CreativeAutoplay = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000, // Slower speed for a more elegant transition
    cssEase: "ease-in-out",
    customPaging: (i) => (
      <div className="w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-100 transition-all mt-2"></div>
    ),
    dotsClass: "slick-dots flex justify-center space-x-2 mt-4",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="h-full w-full overflow-hidden relative mx-auto">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative px-2 overflow-hidden">
            {/* Slide background with glassmorphic overlay */}
            <div
              className="w-full md:h-[27vh] h-[25vh] bg-cover bg-center rounded-lg shadow-lg overflow-hidden relative group"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              aria-label={`Slide ${index + 1}`}
            >
              {/* Glassmorphic overlay on hover */}
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <div className="text-white flex flex-col gap-1">
                  <h2 className="text-lg md:text-xl font-medium font-Create">
                    {slide.title}
                  </h2>
                  <p className="text-xs md:text-sm font-Upright italic">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom Styling for Dots */}
      <style jsx>{`
        .slick-dots li button:before {
          color: white;
          font-size: 10px;
        }
        .slick-dots li.slick-active button:before {
          color: #d1d5db; /* Soft gray for active dot to match the elegant theme */
        }
      `}</style>
    </div>
  );
};

export default CreativeAutoplay;

