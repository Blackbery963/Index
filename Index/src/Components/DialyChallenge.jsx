// import { useState, useEffect } from 'react';
// import { FiClock, FiAward, FiBook, FiCheckCircle } from 'react-icons/fi';

// const DailyChallenge = () => {
//   const [currentChallenge, setCurrentChallenge] = useState(null);
//   const [timeLeft, setTimeLeft] = useState('');
//   const [completed, setCompleted] = useState(false);

//   // Sample challenges database
//   const challenges = [
//     {
//       id: 1,
//       title: "Perspective Shift",    
//       description: "Photograph an ordinary object from an unusual angle to make it look abstract.",
//       duration: "1 day",
//       category: "Photography",
//       badge: "👁️‍🗨️ Perspective Pro"
//     },
//     {
//       id: 2,
//       title: "Color Play",
//       description: "Create a quick sketch using only 3 colors you rarely work with.",
//       duration: "2 hours",
//       category: "Drawing",
//       badge: "🎨 Color Explorer"
//     },
//     {
//       id: 3,
//       title: "Found Poetry",
//       description: "Make a poem using only words cut from a magazine or newspaper.",
//       duration: "1 day",
//       category: "Writing",
//       badge: "✂️ Word Alchemist"
//     }
//   ];

//   // Set new challenge daily
//   useEffect(() => {
//     const today = new Date().getDate();
//     const dailyChallenge = challenges[today % challenges.length];
//     setCurrentChallenge(dailyChallenge);

//     // Calculate time until refresh
//     const updateCountdown = () => {
//       const now = new Date();
//       const midnight = new Date();
//       midnight.setHours(24, 0, 0, 0);
//       const diff = midnight - now;
      
//       const hours = Math.floor(diff / (1000 * 60 * 60));
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       setTimeLeft(`${hours}h ${minutes}m`);
//     };

//     updateCountdown();
//     const timer = setInterval(updateCountdown, 60000);
//     return () => clearInterval(timer);
//   }, []);

//   if (!currentChallenge) return <div className="p-8 text-center text-gray-500">Loading today's challenge...</div>;

//   return (

//     <div className="xl:max-w-7xl max-w-full sm:max-w-[85%] mx-auto rounded-xl px-4 py-8 bg-white dark:bg-[#0a0f14] text-gray-800 dark:text-gray-100 transition-colors">
//   <div className="w-full max-w-7xl mx-auto">
//     <div className="flex flex-col lg:flex-row gap-8">
//       {/* Main Challenge Area */}
//       <div className="flex-1">
//         <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
//           <FiBook className="mr-2" /> DAILY CREATIVE CHALLENGE
//         </span>

//         <div className="flex justify-between items-start mb-2">
//           <h2 className="text-3xl font-bold">{currentChallenge.title}</h2>
//           <div className="flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
//             <FiClock className="mr-1" /> {timeLeft} left
//           </div>
//         </div>

//         <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
//           {currentChallenge.description}
//         </p>

//         <div className="p-5 rounded-xl border border-blue-100 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20 mb-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
//                 {currentChallenge.category}
//               </span>
//               <p className="mt-2 text-sm flex items-center text-blue-800 dark:text-blue-200">
//                 <FiAward className="mr-2" /> Complete to earn: {currentChallenge.badge}
//               </p>
//             </div>
//             <button
//               onClick={() => setCompleted(!completed)}
//               className={`px-6 py-3 rounded-lg font-medium flex items-center whitespace-nowrap transition-colors ${
//                 completed
//                   ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
//                   : 'bg-blue-600 hover:bg-blue-700 text-white'
//               }`}
//             >
//               {completed ? (
//                 <>
//                   <FiCheckCircle className="mr-2" /> Completed!
//                 </>
//               ) : (
//                 'I Did This!'
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Sidebar */}
//       <div className="lg:w-80 flex-shrink-0">
//         <div className="p-6 rounded-xl border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
//           <h3 className="font-medium mb-4">Coming Tomorrow</h3>
//           <div className="mb-4">
//             <span className="text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-1 rounded mb-2 inline-block">
//               Photography
//             </span>
//             <h4 className="font-medium mb-1">"Negative Space"</h4>
//             <p className="text-sm text-gray-600 dark:text-gray-300">
//               Create a composition focusing on what's not there
//             </p>
//           </div>

//           <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
//             <h3 className="font-medium mb-3">Recent Challenges</h3>
//             <ul className="space-y-3">
//               {challenges
//                 .filter(c => c.id !== currentChallenge.id)
//                 .map(challenge => (
//                   <li key={challenge.id} className="text-sm">
//                     <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
//                       {challenge.category}
//                     </span>
//                     <p className="font-medium text-gray-700 dark:text-gray-200">
//                       {challenge.title}
//                     </p>
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//   );
// };

// export default DailyChallenge;

import { useState, useEffect } from 'react';
import { FiClock, FiAward, FiCheckCircle, FiStar } from 'react-icons/fi';

const DailyChallenge = () => {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [completedChallenges, setCompletedChallenges] = useState(new Set());
  const [streak, setStreak] = useState(0);

  // Enhanced challenges database
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
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      {/* Header with Streak */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <FiAward className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">Daily Challenge</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Keep your streak going!</p>
          </div>
        </div>
        
        {/* Streak Counter */}
        <div className="flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-full">
          <FiStar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">
            {streak} day streak
          </span>
        </div>
      </div>

      {/* Current Challenge */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
              {currentChallenge.category}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 ml-2">
              {currentChallenge.difficulty}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FiClock className="w-4 h-4 mr-1" />
            {timeLeft}
          </div>
        </div>

        <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
          {currentChallenge.title}
        </h4>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {currentChallenge.description}
        </p>

        {/* Points and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
              +{currentChallenge.points} pts
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <FiAward className="w-4 h-4" />
              {currentChallenge.badge}
            </span>
          </div>

          <button
            onClick={() => handleComplete(currentChallenge.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
              isCompleted
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {isCompleted ? (
              <>
                <FiCheckCircle className="w-4 h-4" />
                Completed
              </>
            ) : (
              'Mark Complete'
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span>Daily Progress</span>
          <span>{completedChallenges.size} completed</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedChallenges.size / challenges.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {challenges.length}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {completedChallenges.size}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Done</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
            {streak}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;