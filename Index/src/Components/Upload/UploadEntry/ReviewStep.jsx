import React from 'react';
import { IoImage, IoVideocam, IoSparkles } from 'react-icons/io5';

const ReviewStep = ({ uploadType, entry, additionalImages, specialReason }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Review Your Creation
        </h3>
        <p className="text-gray-600 dark:text-gray-400">Everything look good?</p>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-6 border border-white/20">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            {uploadType === 'video' ? (
              <IoVideocam className="w-7 h-7 text-white" />
            ) : (
              <IoImage className="w-7 h-7 text-white" />
            )}
          </div>
          <div>
            <div className="font-bold text-lg text-gray-800 dark:text-white">{entry.title || 'Untitled'}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {uploadType === 'sell' ? 'For Sale' : uploadType === 'video' ? 'Video' : 'Community Share'}
            </div>
          </div>
        </div>

        {/* Image Gallery for Sale Items */}
        {uploadType === 'sell' && (
          <div>
            <div className="text-sm text-gray-500 mb-3">
              Product Gallery ({1 + additionalImages.length} image{additionalImages.length !== 1 ? 's' : ''})
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              <div className="flex-shrink-0 w-24 h-24 border-2 border-teal-400 rounded-xl relative glass-card">
                <img
                  src={entry.file ? URL.createObjectURL(entry.file) : ''}
                  alt="Main"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-xs text-center py-1 rounded-b-xl">
                  Main
                </div>
              </div>
              {additionalImages.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-24 h-24 border border-white/20 rounded-xl relative glass-card">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Additional ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-white/20 text-gray-300 text-xs text-center py-1 rounded-b-xl backdrop-blur-sm">
                    Extra {index + 1}
                  </div>
                </div>
              ))}
            </div>
            {additionalImages.length === 0 && (
              <p className="text-xs text-amber-400 mt-3 flex items-center gap-1">
                💡 Consider adding more images to show different angles and details
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Category:</span>
            <div className="font-medium text-gray-800 dark:text-white">{entry.medium || 'Not set'}</div>
          </div>
          <div>
            <span className="text-gray-500">Tags:</span>
            <div className="font-medium text-gray-800 dark:text-white">
              {entry.tag ? entry.tag.split(',').map(t => `#${t.trim()}`).join(' ') : 'No tags'}
            </div>
          </div>
          {uploadType === 'sell' && (
            <div className="col-span-2">
              <span className="text-gray-500">Price:</span>
              <div className="font-bold text-lg bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                ₹{entry.price || '0'}
              </div>
            </div>
          )}
        </div>

        {specialReason && (
          <div className="glass-card bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <IoSparkles className="w-4 h-4 text-amber-400" />
              <div className="text-sm font-medium text-amber-400">Special Feature</div>
            </div>
            <div className="text-sm text-amber-300/80">{specialReason}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewStep;