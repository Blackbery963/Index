import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { X, Sparkles, Lock, Unlock, Star, Zap, Palette } from 'lucide-react';

const CuriosityTeaser = () => {
  const { isAuthenticated, showTeaser, previewFeatures } = useAuth();
  const [visible, setVisible] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);

  const hints = [
    "🎨 There's a whole studio waiting for you...",
    "✨ Imagine what you could create with AI magic",
    "🌟 Your personal art gallery is just one click away",
    "🚀 Premium tools that make art creation effortless",
    "💫 Filters that transform your artwork instantly"
  ];

  useEffect(() => {
    if (showTeaser && !isAuthenticated) {
      setVisible(true);
      const hintInterval = setInterval(() => {
        setCurrentHint((prev) => (prev + 1) % hints.length);
      }, 3000);
      return () => clearInterval(hintInterval);
    }
  }, [showTeaser, isAuthenticated]);

  if (!visible || isAuthenticated) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-float">
      <div className="bg-gradient-to-br from-purple-600 to-blue-500 text-white p-4 rounded-2xl shadow-2xl max-w-sm border border-white/20 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <Sparkles className="flex-shrink-0 mt-1" size={20} />
          <div className="flex-1">
            <p className="font-semibold mb-1">Curious About the Magic? ✨</p>
            <p className="text-sm text-white/90 mb-2 min-h-[40px] flex items-center">
              {hints[currentHint]}
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => window.location.href = '/signup'}
                className="flex-1 bg-white text-purple-600 py-2 px-3 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
              >
                Show Me!
              </button>
              <button 
                onClick={() => setVisible(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureUnlockExperience = () => {
  const { isAuthenticated, showUnlock, previewFeatures } = useAuth();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (showUnlock && !isAuthenticated) {
      const featureInterval = setInterval(() => {
        setCurrentFeature((prev) => {
          if (prev < previewFeatures.length - 1) return prev + 1;
          setRevealed(true);
          return prev;
        });
      }, 800);
      
      return () => clearInterval(featureInterval);
    }
  }, [showUnlock, isAuthenticated, previewFeatures]);

  if (!showUnlock || isAuthenticated) return null;

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-8 max-w-2xl w-full text-center shadow-2xl">
        {/* Animated Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Lock className="text-yellow-400" size={24} />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Unlock Your Creative Potential
          </h2>
          <Unlock className="text-yellow-400" size={24} />
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-800"
            style={{ width: `${((currentFeature + 1) / previewFeatures.length) * 100}%` }}
          ></div>
        </div>

        {/* Feature Reveal Animation */}
        <div className="min-h-[200px] flex items-center justify-center mb-6">
          {!revealed ? (
            <div className="text-center">
              <Zap className="mx-auto mb-4 text-yellow-400 animate-pulse" size={48} />
              <p className="text-xl text-gray-300 mb-2">Unlocking Feature...</p>
              <p className="text-2xl font-bold text-white animate-pulse">
                {previewFeatures[currentFeature]}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <Star className="mx-auto mb-4 text-yellow-400 animate-bounce" size={48} />
              <p className="text-2xl font-bold text-white mb-2">🎉 All Features Unlocked!</p>
              <p className="text-gray-300">Your creative journey begins now</p>
            </div>
          )}
        </div>

        {/* Feature Grid */}
        {revealed && (
          <div className="grid grid-cols-2 gap-3 mb-8">
            {previewFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-3 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => window.location.href = '/signup'}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
          >
            <Palette size={20} />
            Start Creating Now - It's Free!
            <Sparkles size={20} />
          </button>
          
          <p className="text-gray-400 text-sm">
            Join thousands of artists already creating magic ✨
          </p>
        </div>
      </div>
    </div>
  );
};

const MiniPreviewOverlay = () => {
  const { isAuthenticated } = useAuth();
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => setShowPreview(true), 10000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  if (!showPreview || isAuthenticated) return null;

  return (
    <div className="fixed top-4 right-4 z-30">
      <div className="bg-black/80 backdrop-blur-sm text-white p-3 rounded-xl border border-white/20">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Artists Online: 1.2k+</span>
        </div>
      </div>
    </div>
  );
};

// Main export that combines all components
export const CreativeAuthExperience = () => {
  return (
    <>
      <CuriosityTeaser />
      <FeatureUnlockExperience />
      <MiniPreviewOverlay />
    </>
  );
};

export default CreativeAuthExperience;