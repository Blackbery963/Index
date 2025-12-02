import React from 'react';
import { IoImage, IoVideocam, IoPricetag } from 'react-icons/io5';

const TypeStep = ({ uploadType, handleTypeSelect }) => {
  const typeOptions = [
    {
      id: 'normal',
      icon: IoImage,
      title: 'Share with Community',
      description: 'Showcase your artwork to the community',
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'sell',
      icon: IoPricetag,
      title: 'Sell Your Art',
      description: 'List your artwork for sale • Add multiple images',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 'video',
      icon: IoVideocam,
      title: 'Share Video',
      description: 'Upload video content',
      color: 'from-purple-400 to-violet-500',
      bgColor: 'bg-purple-500/10'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-2">
          What are you sharing?
        </h3>
        <p className="text-gray-600 dark:text-gray-400">Choose how you want to share your creation</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {typeOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => handleTypeSelect(option.id)}
              className={`glass-card p-4 rounded-2xl text-left transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
                uploadType === option.id 
                  ? `border-gradient ${option.bgColor} shadow-lg` 
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${option.color} shadow-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 dark:text-white text-lg">
                    {option.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {option.description}
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full transition-colors ${
                  uploadType === option.id ? `bg-gradient-to-r ${option.color}` : 'bg-gray-300 dark:bg-gray-600'
                }`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TypeStep;