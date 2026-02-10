import React from 'react';
import { FiPlay } from 'react-icons/fi';

const VideoTeaserCard = ({ data }) => {
  return (
    <div className="relative overflow-hidden md:rounded-xl bg-black aspect-[9/16] md:aspect-[3/4] group cursor-pointer">
      <video
        src={data.videoUrl}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-500"
      />
      
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="self-end bg-black/30 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-mono">
          {data.duration}
        </div>
        
        <div>
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
             <FiPlay className="text-white fill-current ml-1" />
          </div>
          <p className="text-xs text-zinc-300 uppercase tracking-widest mb-1">Behind the Scenes</p>
          <h3 className="text-2xl text-white font-serif font-light">{data.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default VideoTeaserCard;