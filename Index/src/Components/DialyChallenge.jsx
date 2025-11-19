import { useState, useEffect } from 'react';
import { FiClock, FiAward, FiCheckCircle, FiStar } from 'react-icons/fi';

const DailyChallenge = () => {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [completedChallenges, setCompletedChallenges] = useState(new Set());
  const [streak, setStreak] = useState(0);

  // Enhanced challenges database with more entries
  const challenges = [
    {
      id: 1,
      title: "Perspective Shift",    
      description: "Photograph an ordinary object from an unusual angle to make it look abstract.",
      duration: "Quick",
      category: "Photography",
      badge: "👁️ Perspective Pro",
      points: 50,
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Color Play",
      description: "Create a quick sketch using only 3 colors you rarely work with.",
      duration: "2 hours", 
      category: "Drawing",
      badge: "🎨 Color Explorer",
      points: 75,
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Found Poetry",
      description: "Make a poem using only words cut from a magazine or newspaper.",
      duration: "1 day",
      category: "Writing", 
      badge: "✂️ Word Alchemist",
      points: 100,
      difficulty: "Hard"
    },
    {
      id: 4,
      title: "Negative Space",
      description: "Create a composition focusing on what's not there.",
      duration: "Quick",
      category: "Design",
      badge: "⚫ Space Master", 
      points: 60,
      difficulty: "Easy"
    },
    {
      id: 5,
      title: "Texture Study",
      description: "Draw or photograph 5 different textures from your environment.",
      duration: "3 hours",
      category: "Observation",
      badge: "🔍 Texture Hunter",
      points: 80,
      difficulty: "Medium"
    },
    {
      id: 6,
      title: "One-Line Drawing",
      description: "Draw a complete portrait without lifting your pen from the paper.",
      duration: "Quick",
      category: "Drawing",
      badge: "✏️ Line Whisperer",
      points: 45,
      difficulty: "Easy"
    },
    {
      id: 7,
      title: "Emotion Burst",
      description: "Write a 300-word story capturing a single intense emotion.",
      duration: "2 hours",
      category: "Writing",
      badge: "💔 Heart Scribe",
      points: 90,
      difficulty: "Medium"
    },
    {
      id: 8,
      title: "Symmetry Hunt",
      description: "Find and photograph 3 symmetrical patterns in nature.",
      duration: "1 hour",
      category: "Photography",
      badge: "⚖️ Balance Seeker",
      points: 55,
      difficulty: "Easy"
    },
    {
      id: 9,
      title: "Collage Chaos",
      description: "Create a digital collage from 10 random images on your phone.",
      duration: "4 hours",
      category: "Design",
      badge: "🌀 Mix Maestro",
      points: 70,
      difficulty: "Medium"
    },
    {
      id: 10,
      title: "Sound Sketch",
      description: "Record ambient sounds and turn them into a short audio story.",
      duration: "1 day",
      category: "Audio",
      badge: "🔊 Echo Artist",
      points: 110,
      difficulty: "Hard"
    }
  ];

  // Load progress from localStorage
  useEffect(() => {
    const savedCompleted = localStorage.getItem('dailyChallengeCompleted');
    const savedStreak = localStorage.getItem('dailyChallengeStreak');
    const lastCompletedDate = localStorage.getItem('dailyChallengeLastDate');
    
    if (savedCompleted) {
      setCompletedChallenges(new Set(JSON.parse(savedCompleted)));
    }
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }

    // Set today's challenge based on date
    const today = new Date().toDateString();
    const challengeIndex = Math.abs(today.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0)) % challenges.length;
    
    setCurrentChallenge(challenges[challengeIndex]);
  }, []);

  // Update countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleComplete = (challengeId) => {
    const newCompleted = new Set(completedChallenges);
    
    if (newCompleted.has(challengeId)) {
      newCompleted.delete(challengeId);
      setStreak(prev => Math.max(0, prev - 1));
    } else {
      newCompleted.add(challengeId);
      setStreak(prev => prev + 1);
      
      // Save completion date for streak tracking
      localStorage.setItem('dailyChallengeLastDate', new Date().toDateString());
    }
    
    setCompletedChallenges(newCompleted);
    localStorage.setItem('dailyChallengeCompleted', JSON.stringify([...newCompleted]));
    localStorage.setItem('dailyChallengeStreak', streak + (newCompleted.has(challengeId) ? 1 : -1));
  };

  const isCompleted = currentChallenge ? completedChallenges.has(currentChallenge.id) : false;

  if (!currentChallenge) {
    return (
      <div className="w-full rounded-sm border border-gray-300 dark:border-gray-700 p-2 bg-transparent">
        <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-sm border border-gray-300 dark:border-gray-700 p-2 bg-transparent">
      {/* TOP BOX - Header with Streak */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-md">
              <FiAward className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                Daily Challenge
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Keep your streak going!
              </p>
            </div>
          </div>
          
          {/* Streak Counter */}
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-full">
            <FiStar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
              {streak} day streak
            </span>
          </div>
        </div>
      </div>

      {/* MIDDLE BOX - Current Challenge Details */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 mb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
              {currentChallenge.category}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              {currentChallenge.difficulty}
            </span>
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <FiClock className="w-3 h-3 mr-1" />
            {timeLeft}
          </div>
        </div>

        <h4 className="font-bold text-gray-900 dark:text-white text-base mb-2">
          {currentChallenge.title}
        </h4>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
          {currentChallenge.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
              +{currentChallenge.points} pts
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <FiAward className="w-3 h-3" />
              {currentChallenge.badge}
            </span>
          </div>

          <button
            onClick={() => handleComplete(currentChallenge.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium text-xs transition-all duration-300 ${
              isCompleted
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-md'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md'
            }`}
          >
            {isCompleted ? (
              <>
                <FiCheckCircle className="w-3 h-3" />
                Completed
              </>
            ) : (
              'Mark Complete'
            )}
          </button>
        </div>
      </div>

      {/* BOTTOM BOX - Progress & Stats */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3">
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Daily Progress</span>
            <span>{completedChallenges.size} completed</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(completedChallenges.size / challenges.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex justify-between">
          <div className="text-center">
            <div className="text-base font-bold text-gray-900 dark:text-white">
              {challenges.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
          </div>
          <div className="text-center">
            <div className="text-base font-bold text-green-600 dark:text-green-400">
              {completedChallenges.size}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Done</div>
          </div>
          <div className="text-center">
            <div className="text-base font-bold text-amber-600 dark:text-amber-400">
              {streak}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;