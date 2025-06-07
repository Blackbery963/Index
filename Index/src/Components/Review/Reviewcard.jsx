
import React, { useState } from 'react';
import frontbackground from './Images-of-Review/1646895.jpg';
import behindbackground from '/home/swarnadip/Documents/Index/Index/Index/src/Components/Review/Images-of-Review/1177739.jpg';
import { FaFacebookF, FaInstagram, FaStar } from "react-icons/fa";
import {FaXTwitter} from 'react-icons/fa6'

export default function ReviewCard({ Profileimg, Username, Review }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full flex justify-center py-6">
      <div 
        className="relative w-[350px] md:w-[450px] h-[280px] perspective-1000"
        onClick={() => setFlipped(!flipped)}
      >
        {/* Card Inner */}
        <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front Side */}
          <div 
            className="absolute w-full h-full bg-cover bg-center flex flex-col items-center justify-center backface-hidden rounded-xl shadow-xl"
            style={{ backgroundImage: `url(${frontbackground})` }}
          >
            {/* Profile Image */}
            <div className="w-[120px] h-[120px] rounded-full border-4 border-gray-400 overflow-hidden shadow-lg">
              <img src={Profileimg} alt="Profile" className="w-full h-full object-cover" />
            </div>

            {/* Username */}
            <h1 className="mt-3 text-xl font-Playfair text-gray-300">{Username}</h1>

            {/* Star Ratings */}
            <div className="flex mt-2">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="text-yellow-400 text-md mx-[2px]" />
              ))}
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-all duration-300 border border-gray-500 p-1 rounded-md">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-all duration-300 border border-gray-500 p-1 rounded-md">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-all duration-300 border border-gray-500 p-1 rounded-md">
                <FaXTwitter size={20} />
              </a>
            </div>
          </div>
          {/* the Back side of the card */}
            <div
            className="absolute w-full h-full bg-gradient-to-br from-[#FFEBEE] to-[#E6E6FA] dark:from-[#1E1E3F] dark:to-[#2E1B47] flex items-center justify-center backface-hidden rounded-xl shadow-lg rotate-y-180 border border-gray-200/50 dark:border-gray-700/50"
            >
            <div className="lg:h-[80%] lg:w-[80%] w-[90%] h-[90%] bg-white/20 dark:bg-gray-900/30 backdrop-blur-md border border-gray-300/50 dark:border-gray-600/50 rounded-md flex items-center justify-center text-center p-4">
              <p className="text-[20px] font-Newsreader text-center text-gray-800 dark:text-gray-200 leading-relaxed">
                "{Review}"
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}