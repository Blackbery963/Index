
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import Galleryitem from './Galleryitem';
import Pic_1 from './Category-images/landscape.png';
import Pic_2 from './Category-images/water.jpg';
import Pic_3 from './Category-images/oil.jpg';
import Pic_4 from './Category-images/abstract.jpg';
import Pic_5 from './Category-images/still life.jpg';
import Pic_6 from './Category-images/surreal.png';
import Pic_7 from './Category-images/impression.jpg';
import Pic_8 from './Category-images/realism.jpg';
import Pic_9 from './Category-images/portrait.jpg';
import Pic_10 from './Category-images/express.jpg';
import Pic_11 from './Category-images/minimal.jpg';
import Pic_12 from './Category-images/pop.jpg';
import Pic_13 from './Category-images/nature.jpg';
import Pic_14 from './Category-images/tradition.jpg';
import Pic_15 from './Category-images/historic.jpg';
import Pic_16 from './Category-images/digital.jpg';
import Pic_17 from './Category-images/modern.jpg';
import Pic_18 from './Category-images/Photography.jpg'

function Category() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);const images = [
  {
    name: 'Landscape',
    para: 'A landscape painting portrays natural scenery such as mountains, forests, rivers, or skies, emphasizing light, mood, and atmosphere.',
    backImg: Pic_1,
    link: '/Landscape',
  },
  {
    name: 'Portrait',
    para: 'Portrait art focuses on capturing the personality, expression, and likeness of a person, often emphasizing facial features and emotions.',
    backImg: Pic_9,
    link: '/Portrait',
  },
  {
    name: 'Watercolor',
    para: 'Watercolor painting uses transparent pigments mixed with water, producing soft, luminous effects with delicate layers.',
    backImg: Pic_2,
    link: '/Watercolor',
  },
  {
    name: 'Oil Painting',
    para: 'Oil painting involves pigments mixed with oil, allowing rich textures, vibrant colors, and slow blending for detailed artworks.',
    backImg: Pic_3,
    link: '/Oil_Paint',
  },
  {
    name: 'Abstract',
    para: 'Abstract art expresses ideas or emotions through colors, shapes, and forms without representing specific objects or scenes.',
    backImg: Pic_4,
    link: '/Abstract',
  },
  {
    name: 'Still Life',
    para: 'Still life paintings depict inanimate objects such as fruits, flowers, or everyday items, emphasizing composition and lighting.',
    backImg: Pic_5,
    link: '/Still-Life',
  },
  {
    name: 'Historical Art',
    para: 'Historical art represents significant events or figures from history, often conveying moral, political, or cultural messages.',
    backImg: Pic_15,
    link: '/Historical',
  },
  {
    name: 'Surrealism',
    para: 'Surrealist art blends reality and dreams, creating strange, illogical scenes filled with symbolic and imaginative elements.',
    backImg: Pic_6,
    link: '/Surrealism',
  },
  {
    name: 'Impressionism',
    para: 'Impressionism captures fleeting moments with quick brushstrokes and bright colors, focusing on light and movement.',
    backImg: Pic_7,
    link: '/Impressionism',
  },
  {
    name: 'Realism',
    para: 'Realist art portrays subjects truthfully and accurately, avoiding idealization and emphasizing everyday life and detail.',
    backImg: Pic_8,
    link: '/Realism',
  },
  {
    name: 'Expressionism',
    para: 'Expressionist art uses vivid colors and dramatic distortions to reflect inner emotions and psychological states.',
    backImg: Pic_10,
    link: '/Expressionism',
  },
  {
    name: 'Minimalism',
    para: 'Minimalist art simplifies composition using basic shapes, limited colors, and empty space to create clarity and focus.',
    backImg: Pic_11,
    link: '/Minimalism',
  },
  {
    name: 'Pop Art',
    para: 'Pop Art features bold colors and imagery from mass culture, such as advertisements and celebrities, often with irony.',
    backImg: Pic_12,
    link: '/Pop-Art',
  },
  {
    name: 'Nature',
    para: 'Nature art showcases the beauty of the natural world—plants, animals, and landscapes—often emphasizing harmony and detail.',
    backImg: Pic_13,
    link: '/Nature',
  },
  {
    name: 'Traditional',
    para: 'Traditional art follows established styles and techniques, often representing cultural heritage and historical craftsmanship.',
    backImg: Pic_14,
    link: '/Traditional',
  },
  {
    name: 'Digital',
    para: 'Digital art is created using digital tools and software, offering limitless possibilities in style, texture, and manipulation.',
    backImg: Pic_16,
    link: '/Digital',
  },
  {
    name: 'Modern',
    para: 'Modern art breaks away from classical forms, embracing innovation, abstraction, and new perspectives of expression.',
    backImg: Pic_17,
    link: '/Modern',
  },
  {
    name:'Photography',
    para:'Modern art breaks away from classical forms, embracing innovation, abstraction, and new perspectives of expression.',
    backImg:Pic_18,
    link:'/Photography'
  }
];

  return (
    <div className="min-h-screen max-w-screen bg-gradient-to-br from-[#2D0434] to-[#3A0B4F] flex items-center flex-col justify-center py-8 overflow-x-hidden">
     <button>
      <Link to={"/"}>
      </Link>
     </button>
     <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-semibold mb-6 text-center px-4 font-Quicksand">
     Explore the Spectrum of Artistic Styles
    </h1>
      <div className="h-[90%] w-[85%] backdrop-blur-lg bg-[#ffffff23] rounded-2xl border border-gray-300 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4 sm:p-8 justify-items-center overflow-auto">
        {images.map((img, index) => (
          <motion.div
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {img.link ? (
              <Link to={img.link}>
                <Galleryitem name={img.name} para={img.para} backImg={img.backImg} />
              </Link>
            ) : (
              <Galleryitem name={img.name} para={img.para} backImg={img.backImg} />
            )}
          </motion.div>
        ))}
      </div>
  </div> 
  );
}

export default Category;


