import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pic_1 from "../Category/Category-images/landscape.png";
import Pic_2 from "../Category/Category-images/portrait.jpg";
import Pic_3 from "../Category/Category-images/still life.jpg";
import Pic_4 from "../Category/Category-images/oil.jpg";
import Pic_5 from "../Category/Category-images/water.jpg";
import Pic_6 from "../Category/Category-images/abstract.jpg";
import Pic_7 from "../Category/Category-images/modern.jpg";
import Pic_8 from "../Category/Category-images/historic.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiArrowRight } from 'react-icons/fi';

const CategoryCard = ({ name, image, to }) => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / rect.height) * 10; // Tilt up to 10 degrees
    const rotateY = -(x / rect.width) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.98)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(0.98)';
  };

  return (
    <Link
      to={to}
      className="group relative h-64 w-full overflow-hidden rounded-xl transition-all duration-500 hover:shadow-xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
        <h3 className="text-2xl font-serif font-light text-white tracking-wide transition-all duration-300 group-hover:translate-y-1">
          {name}
        </h3>
      </div>
      {/* Animated Gradient Border */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[length:2px] group-hover:border-gradient-to-r group-hover:from-[#FFDAB9] group-hover:to-[#A9B7A1] dark:group-hover:from-[#374151] dark:group-hover:to-[#1A2A3A] transition-all duration-500"></div>
      {/* Arrow Icon */}
      <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm hidden lg:flex items-center justify-center transition-all duration-300 group-hover:bg-white/40 group-hover:scale-110">
        <FiArrowRight className="text-white text-lg" />
      </div>
    </Link>
  );
};

function Style() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const categories = [
    { name: "Landscape", image: Pic_1, to: "/Landscape" },
    { name: "Portrait", image: Pic_2, to: "/Portrait" },
    { name: "Still Life", image: Pic_3, to: "/Still-life" },
    { name: "Oil Paint", image: Pic_4, to: "/Oil_paint" },
    { name: "Watercolor", image: Pic_5, to: "/Watercolor" },
    { name: "Abstract", image: Pic_6, to: "/Abstract" },
    { name: "Historical Art", image: Pic_8, to: "/Historical" },
    { name: "Modern Art", image: Pic_7, to: "/Modern" },
  ];

  return (
    <div className="w-[95%] mx-auto px-4 py-12 bg-gray-50 dark:bg-[#0a0f14] rounded-xl relative">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('/path/to/canvas-texture.png')] bg-repeat"></div>

      {/* Header */}
      <div className="mb-10 text-center relative z-10">
        <h2 className="text-4xl font-serif font-medium text-gray-800 dark:text-white mb-3 tracking-wide">
          Discover Art Categories
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto font-Quicksand text-[16px]">
          Dive into a world of creativity with our curated collection of artistic styles.
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            name={category.name}
            image={category.image}
            to={category.to}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          />
        ))}
      </div>

      {/* View All Categories Button */}
      <div className="mt-12 text-center relative z-10">
        <Link
          to="/Category"
          className="inline-flex items-center px-4 py-2 rounded-xl text-gray-800 dark:text-gray-200 bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gradient-to-r hover:from-[#FFDAB9] hover:to-[#A9B7A1] dark:hover:from-[#374151] dark:hover:to-[#1A2A3A] transition-all duration-300 group"
        >
          <span className=" text-base group-hover:text-gray-900 dark:group-hover:text-white font-GreatVibes">
            View All Categories
          </span>
          <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300 group-hover:text-gray-900 dark:group-hover:text-white" />
        </Link>
      </div>
    </div>
  );
}

export default Style;
