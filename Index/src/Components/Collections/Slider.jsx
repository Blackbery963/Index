import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    image:
      'https://images.pexels.com/photos/29892850/pexels-photo-29892850/free-photo-of-boston-public-garden-winter-wonderland.jpeg',
    title: 'Explore Artistic Creations',
    description: 'Discover unique paintings and illustrations from talented artists.',
  },
  {
    image:
      'https://images.pexels.com/photos/29304914/pexels-photo-29304914/free-photo-of-snow-covered-mountains-and-fishing-boats-in-arctic-waters.jpeg',
    title: 'Join Our Creative Community',
    description: 'Connect with artists and share your passion for art.',
  },
  {
    image:
      'https://images.pexels.com/photos/15566467/pexels-photo-15566467/free-photo-of-pavement-along-water-pond-in-city.jpeg',
    title: 'Showcase Your Masterpieces',
    description: 'Upload your artwork and inspire others.',
  },
  {
    image:
      'https://images.pexels.com/photos/17081487/pexels-photo-17081487/free-photo-of-lake-and-snowy-mountains.jpeg',
    title: 'Collaborate & Grow',
    description: 'Work with fellow artists to create something extraordinary.',
  },
];

const ImageSlider = () => {



const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black border border-gray-400"
    onClick={onClick}
  >
    &#8592; {/* Left Arrow */}
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black border border-gray-400"
    onClick={onClick}
  >
    &#8594; {/* Right Arrow */}
  </button>
);


  const settings = {
    dots: true,
    infinite: true,
    arrows:true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <CustomPrevArrow />, // Adding the custom previous arrow
    nextArrow: <CustomNextArrow />, // Adding the custom next arrow
    customPaging: (i) => (
      <div className="w-3 h-3 bg-gray-400 rounded-full hover:bg-gray-600 transition-all"></div>
    ),
    dotsClass: "slick-dots flex justify-center space-x-2 mt-4",
  };

  return (
    <div className=" h-full w-full overflow-hidden relative mx-auto lg:rounded-lg rounded-md ">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            {/* Slide Background */}
            <div
              className="w-full h-[50vh] bg-cover bg-center"
              style={{
                loading:"lazy",
                backgroundImage: `url(${slide.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            ></div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            {/* Slide Content */}
            <div className="absolute bottom-10 left-10 text-white z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInUp font-Quicksand">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl animate-fadeInUp delay-300 font-Roboto">
                {slide.description}
              </p>
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
          color: #f9c22e; /* Highlighted dot color */
        }
      `}</style>
    </div>
  );
};

export default ImageSlider;
