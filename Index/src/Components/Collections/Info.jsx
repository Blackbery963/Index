import { useState } from 'react'

import Close from './Image/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
import { AiOutlineHeart, AiFillHeart, } from "react-icons/ai"; // Import heart icons
import { FaDownload, FaShare, FaThumbsUp } from "react-icons/fa"; // Import download icon
// import img1 from '/home/swarnadip/Documents/Index/Menu/Menu/src/Image/freepik-export-20241117064007hmqY.png'

function Info() {
  const images = [
    "https://images.unsplash.com/photo-1634170380004-3b3b3b3b3b3b",
  ]
  const [lovedImages, setLovedImages] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
    const initialLoved = {};
    images.forEach((img, index) => {
      initialLoved[index] = storedFavorites.includes(img);
    });
    return initialLoved;
  });

  // Function to toggle favorite status
  const toggleLove = (index) => {
    setLovedImages((prevLovedImages) => {
      const isCurrentlyLoved = prevLovedImages[index];
      const updatedLovedImages = { ...prevLovedImages, [index]: !isCurrentlyLoved };
  
      const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
      let updatedFavorites;
  
      if (!isCurrentlyLoved) {
        updatedFavorites = [...new Set([...storedFavorites, images[index]])]; 
      } else {
        updatedFavorites = storedFavorites.filter(img => img !== images[index]);
      }
  
      localStorage.setItem("favoriteImages", JSON.stringify(updatedFavorites));
  
      return updatedLovedImages;
    });
  };

  const downloadImage = () => {
    const link = document.createElement('a'); // Create an anchor element
    link.href = img1; // Set the image URL
    link.download = 'artwork.png'; // Name of the file
    document.body.appendChild(link);
    link.click(); // Simulate click to download
    document.body.removeChild(link); // Remove the element after triggering the download
  };

  return (
    <div className='main-container w-full max-w-[1200px] h-auto mx-auto relative mt-8 pl-4 pb-4'>   
    <div className='lg:w-[95%] md:w-[94%] sm:w-[92%] w-[90%] bg-[#edf2fa] h-full border rounded-md relative'>
      {/* the top section */}
    <div className='flex justify-between items-center h-[80px] px-4'>
      {/* the profile  */}
      <div className='flex gap-2 items-center'>
        <div className='lg:w-[70px] lg:h-[70px] w-[50px] h-[50px] rounded-full bg-black'></div>
        <div>
          <h1 className='lg:text-[25px] text-[20px] font-Playfair font-semibold'>Username</h1>
          <button className=' border border-neutral-600 rounded-lg px-2 font-serif font-medium'>Follow</button>
        </div>
      </div>

    {/* Action bitton */}
    <div className=' flex items-center gap-2'>
      {/* <button className='w-full px-2 py-1 rounded-lg border border-gray-500 flex items-center gap-1'>
      <span className='lg:block hidden'>Favourite</span>  
      <AiFillHeart className='text-[#f50538]'/>
    </button> */}
   <button 
  className='w-full px-2 py-1 rounded-lg border border-gray-500 flex items-center gap-1'
  onClick={() => toggleLove(0)} // Toggles love state for index 0
>
  <span className='lg:block hidden'>Favourite</span>  
  {lovedImages[0] ? (
    <AiFillHeart className="text-[#f50538]" />  // Filled heart when favorited
  ) : (
    <AiOutlineHeart className="text-gray-800" /> // Empty heart when not favorited
  )}
    </button>

      <button className='w-full px-2 py-1 rounded-lg border border-gray-500 flex items-center gap-1'
      onClick={downloadImage}
      >
       <span className='lg:block hidden'>Download</span>
       <FaDownload/>
      </button>
      <button className='w-full px-1 py-1 rounded-lg border border-gray-500'>
        <img src={Close} alt="Close" />
      </button>
    </div>
    </div>
    {/* the image section  */}
    <div className='w-[95%] lg:w-[85%] lg:h-[500px] md:h-[450px] h-[400px] rounded-md mx-auto bg-black/10 mt-3'>
    <img className=' h-full w-full object-contain' src={img1} alt="" />
    </div>
    {/* the bottom section */}
    <div  className=' flex flex-col gap-y-2 mt-2'>
      {/* the upper body */}
      <div className=' flex lg:items-center items-start justify-between lg:flex-row flex-col-reverse lg:px-[7.5%] px-[2.5%]'>
        <div className=' mt-2 lg:mt-0'>
          <h1 className='lg:text-[20px] text-[18px] font-Playfair font-semibold'>Title</h1>
          <p className='lg:text-[18px] text-[16px] font-sans'>Description</p>
        </div>

        <div className='flex gap-2'>
          <div className='w-full lg:px-2 px-1 rounded-md border border-gray-500 flex items-center gap-1'>
          <span className=' lg:block hidden font-serif'>Likes:</span> <span className='lg:block hidden'>{1234}</span>
          <FaThumbsUp className=' lg:hidden block'/><span className=' lg:hidden block'>{1234}</span>
          </div>

          <button className='w-full lg:px-2 px-1 rounded-md border border-gray-500 flex items-center gap-1'
         
          >
            <span className='lg:block hidden font-serif'>Downloads:</span><span className='lg:block hidden'>{1234}</span>
            <FaDownload className=' lg:hidden block'/><span className=' lg:hidden block'>{1234}</span>
          </button>
          <button className='w-full lg:px-2 px-1 rounded-md border border-gray-500 flex items-center gap-1'>
            <span className='lg:block hidden font-serif'>Shares:</span><span className='lg:block hidden'>{1234}</span>
            <FaShare className=' lg:hidden block'/><span className=' lg:hidden block'>{1234}</span>
          </button>
        </div>
      </div>
{/* the lower body */}
     <div className='lg:px-[7.5%] px-[2.5%] pb-4 flex items-center'>
     <h1 className='lg:text-[18px] text-[16px] font-Playfair font-bold'>Updated on:<span className='font-sans font-normal text-[16px] pl-1'>{19}</span></h1>
     </div>
    </div>

  </div>
</div>
  )
}

export default Info
