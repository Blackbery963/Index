
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import Galleryitem from './Galleryitem';
import Pic_1 from './Category-images/no-1.png';
import Pic_2 from './Category-images/no-2.jpg';
import Pic_3 from './Category-images/no-3.jpg';
import Pic_4 from './Category-images/no-4.jpg';
import Pic_5 from './Category-images/no-5.jpg';
import Pic_6 from './Category-images/no-6.jpg';
import Pic_7 from './Category-images/no-7.jpg';
import Pic_8 from './Category-images/no-8.jpg';
import Pic_9 from './Category-images/no-9.jpg';
import Pic_10 from './Category-images/no-10.jpg';
import Pic_11 from './Category-images/no-11.jpg';
import Pic_12 from './Category-images/no-12.jpg';
import Pic_13 from './Category-images/no-13.jpg';
import Pic_14 from './Category-images/no-14.jpg';
import Pic_15 from './Category-images/no-15.jpg';
import Pic_16 from './Category-images/no-16.jpg';
import Pic_17 from './Category-images/no-17.jpeg';
import { FaHome } from 'react-icons/fa';

function Category() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const images = [
    {
      name: 'Portrait',
      para: 'A portrait painting captures a person’s face, expression, and personality, often focusing on likeness and emotional depth.',
      backImg: 'https://images.pexels.com/photos/29451082/pexels-photo-29451082/free-photo-of-squirrel-in-autumn-tree-with-colorful-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/Portrait',
    },
    {
      name: 'Landscape',
      para: 'A landscape painting portrays natural scenery like mountains, forests, or rivers, emphasizing light and atmosphere.',
      backImg: Pic_1,
      link: '/Landscape',
    },
    {
      name: 'Watercolor',
      para: 'Watercolor painting uses translucent pigments mixed with water, creating soft, luminous effects on textured paper.',
      backImg: Pic_2,
      link: '/Watercolor',
    },
    {
      name: 'Oil Painting',
      para: 'Oil painting uses slow-drying pigments mixed with oil, creating rich textures, vibrant colors, and layered effects.',
      backImg: Pic_3,
      link: '/Oil_Paint',
    },
    {
      name: 'Abstract',
      para: 'Abstract art uses shapes, colors, and textures to express emotions or concepts, often without recognizable forms.',
      backImg: Pic_4,
      link: '/Abstract',
    },
    {
      name: 'Still Life',
      para: 'Still life paintings depict inanimate objects like flowers or food, focusing on composition, light, and detail.',
      backImg: Pic_5,
      link: '/StillLife',
    },
    {
      name: 'Surrealism',
      para: 'Surrealist paintings explore dream-like scenes and illogical imagery, blending reality with imagination.',
      backImg: Pic_6,
      link: '/Surrealism',
    },
    {
      name: 'Impressionism',
      para: 'Impressionist art captures fleeting moments with loose brushstrokes and vibrant colors, emphasizing light.',
      backImg: Pic_7,
      link: '/Impressionism',
    },
    {
      name: 'Realism',
      para: 'Realist paintings aim to depict subjects as they appear in real life, with meticulous detail and accuracy.',
      backImg: Pic_8,
      link: '/Realism',
    },
    {
      name: 'Cubism',
      para: 'Cubist art breaks down objects into geometric shapes, presenting multiple perspectives simultaneously.',
      backImg: Pic_9,
      link: '/Cubism',
    },
    {
      name: 'Expressionism',
      para: 'Expressionist art conveys emotional experiences through bold colors and distorted forms.',
      backImg: Pic_10,
      link: '/Expressionism',
    },
    {
      name: 'Minimalism',
      para: 'Minimalist art uses simple forms and limited colors to create a sense of calm and clarity.',
      backImg: Pic_11,
      link: '/Minimalism',
    },
    {
      name: 'Pop Art',
      para: 'Pop art incorporates popular culture imagery, using bright colors and bold patterns.',
      backImg: Pic_12,
      link: '/Pop-Art',
    },
    {
      name: 'Fauvism',
      para: 'Fauvist paintings use vivid, non-naturalistic colors and fierce brushwork to evoke emotion.',
      backImg: Pic_13,
      link: '/Nature',
    },
    {
      name: 'Baroque',
      para: 'Baroque art emphasizes drama, movement, and rich details, often with religious or mythological themes.',
      backImg: Pic_14,
      link: '/Traditional',
    },
    {
      name: 'Renaissance',
      para: 'Renaissance art focuses on realism, perspective, and humanism, inspired by classical antiquity.',
      backImg: Pic_15,
      link: '/Renaissance',
    },
    {
      name: 'Gothic',
      para: 'Gothic art features elongated figures and intricate details, often in religious contexts.',
      backImg: Pic_16,
      link: '/Digital',
    },
    {
      name: 'Modern',
      para: 'Modern art experiments with new forms and techniques, breaking from traditional styles.',
      backImg: Pic_17,
      link: '/Modern',
    },
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


