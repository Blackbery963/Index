

import { useState } from 'react';
import { Link } from 'react-router-dom';
import CrImg1 from './CraftsImages/cr1.jpeg'
import CrImg2 from './CraftsImages/cr2.jpeg'
import CrImg3 from './CraftsImages/cr3.jpeg'
import CrImg4 from './CraftsImages/cr4.jpeg'
import CrImg5 from './CraftsImages/cr5.jpeg'
import CrImg6 from './CraftsImages/cr6.jpeg'
import CrImg7 from './CraftsImages/cr7.jpeg'
import CrImg8 from './CraftsImages/cr8.jpeg'






const Items = [
  {
    id: 1,
    title: 'Handwoven Basket',
    price: 45,
    image: CrImg1,
    category: 'basketry',
  },
  {
    id: 2,
    title: 'Ceramic Clay Pot',
    price: 60,
    image: CrImg2,
    category: 'pottery',
  },
  {
    id: 3,
    title: 'Macramé Wall Hanging',
    price: 80,
    image: CrImg3,
    category: 'wall decor',
  },
  {
    id: 4,
    title: 'Hand-Carved Wooden items',
    price: 25,
    image: CrImg4,
    category: 'woodwork',
  },
  {
    id: 5,
    title: 'Natural Dye Textile',
    price: 95,
    image: CrImg5,
    category: 'textile',
  },
  {
    id: 6,
    title: 'Pressed Floral Frame',
    price: 30,
    image: CrImg6,
    category: 'paper craft',
  },
  {
    id: 7,
    title: 'Handcrafted Leather Pouch',
    price: 55,
    image: CrImg7,
    category: 'leather craft',
  },
  {
    id: 8,
    title: 'Beaded Jewelry Set',
    price: 40,
    image: CrImg8,
    category: 'jewelry',
  },
];



const Visual = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="min-h-screen xl:max-w-7xl max-w-full sm:max-w-[85%] rounded-xl bg-white dark:bg-[#0a0f14] mx-auto transition-colors duration-300">
      {/* Header Section */}
      <div className="px-6 py-24 text-center">
        <h1 className="text-5xl md:text-5xl font-Quicksand font-light text-black dark:text-white tracking-tight mb-4">
         The Art of Handmade Elegance
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-light max-w-md mx-auto">
          Handpicked pieces for contemporary living
        </p>
      </div>

      {/* Items Grid */}
      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Items.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative overflow-hidden aspect-square rounded-lg bg-gray-100 dark:bg-gray-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredItem === item.id ? 'scale-105' : 'scale-100'
                  }`}
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-black dark:bg-white transition-opacity duration-300 ${
                    hoveredItem === item.id ? 'opacity-10 dark:opacity-10' : 'opacity-0'
                  }`}
                />

                {/* Content Overlay */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-6 text-white dark:text-black transform transition-all duration-300 ${
                    hoveredItem === item.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                >
                  <div className="text-xs uppercase tracking-wider mb-1 opacity-80">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-light mb-2">{item.title}</h3>
                  <p className="text-sm font-medium">${item.price}</p>
                </div>
              </div>

              {/* Bottom Info */}
              <div
                className={`pt-4 transition-opacity duration-300 ${
                  hoveredItem === item.id ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                  {item.category}
                </div>
                <h3 className="text-lg font-light text-black dark:text-white mb-1">{item.title}</h3>
                <p className="text-black dark:text-white font-medium">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center pb-24">
        <Link to={"/Arteva/Artstore"}>
        <button className="group relative overflow-hidden px-8 py-3 border border-black dark:border-white text-black dark:text-white hover:text-white dark:hover:text-black transition-colors duration-300">
          <span className="relative z-10 text-sm uppercase tracking-wider font-light">
            Explore Collection
          </span>
          <div className="absolute inset-0 bg-black dark:bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Visual;
