import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

const UploadProgress = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              currentStep >= step.number 
                ? 'bg-gradient-to-br from-teal-400 to-blue-500 text-white shadow-lg shadow-teal-500/25' 
                : 'glass-card text-gray-500 border border-white/20'
            }`}>
              {currentStep > step.number ? <IoCheckmarkCircle className="w-5 h-5" /> : step.number}
            </div>
            <span className={`text-xs mt-2 hidden sm:block font-medium transition-colors ${
              currentStep >= step.number 
                ? 'text-transparent bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text' 
                : 'text-gray-500'
            }`}>
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-1 mx-4 transition-all duration-500 ${
              currentStep > step.number 
                ? 'bg-gradient-to-r from-teal-400 to-blue-500' 
                : 'bg-white/20'
            } rounded-full`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default UploadProgress;