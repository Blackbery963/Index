import { useState, useEffect } from 'react';
import { FiClock, FiAward, FiBook, FiCheckCircle } from 'react-icons/fi';

const DailyChallenge = () => {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [completed, setCompleted] = useState(false);

  // Sample challenges database
  const challenges = [
    {
      id: 1,
      title: "Perspective Shift",    
      description: "Photograph an ordinary object from an unusual angle to make it look abstract.",
      duration: "1 day",
      category: "Photography",
      badge: "👁️‍🗨️ Perspective Pro"
    },
    {
      id: 2,
      title: "Color Play",
      description: "Create a quick sketch using only 3 colors you rarely work with.",
      duration: "2 hours",
      category: "Drawing",
      badge: "🎨 Color Explorer"
    },
    {
      id: 3,
      title: "Found Poetry",
      description: "Make a poem using only words cut from a magazine or newspaper.",
      duration: "1 day",
      category: "Writing",
      badge: "✂️ Word Alchemist"
    }
  ];

  // Set new challenge daily
  useEffect(() => {
    const today = new Date().getDate();
    const dailyChallenge = challenges[today % challenges.length];
    setCurrentChallenge(dailyChallenge);

    // Calculate time until refresh
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!currentChallenge) return <div className="p-8 text-center text-gray-500">Loading today's challenge...</div>;

  return (

    <div className="max-w-[95%] mx-auto rounded-xl px-4 py-8 bg-white dark:bg-[#0a0f14] text-gray-800 dark:text-gray-100 transition-colors">
  <div className="w-full max-w-7xl mx-auto">
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Challenge Area */}
      <div className="flex-1">
        <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
          <FiBook className="mr-2" /> DAILY CREATIVE CHALLENGE
        </span>

        <div className="flex justify-between items-start mb-2">
          <h2 className="text-3xl font-bold">{currentChallenge.title}</h2>
          <div className="flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <FiClock className="mr-1" /> {timeLeft} left
          </div>
        </div>

        <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
          {currentChallenge.description}
        </p>

        <div className="p-5 rounded-xl border border-blue-100 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                {currentChallenge.category}
              </span>
              <p className="mt-2 text-sm flex items-center text-blue-800 dark:text-blue-200">
                <FiAward className="mr-2" /> Complete to earn: {currentChallenge.badge}
              </p>
            </div>
            <button
              onClick={() => setCompleted(!completed)}
              className={`px-6 py-3 rounded-lg font-medium flex items-center whitespace-nowrap transition-colors ${
                completed
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {completed ? (
                <>
                  <FiCheckCircle className="mr-2" /> Completed!
                </>
              ) : (
                'I Did This!'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:w-80 flex-shrink-0">
        <div className="p-6 rounded-xl border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <h3 className="font-medium mb-4">Coming Tomorrow</h3>
          <div className="mb-4">
            <span className="text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-1 rounded mb-2 inline-block">
              Photography
            </span>
            <h4 className="font-medium mb-1">"Negative Space"</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Create a composition focusing on what's not there
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-medium mb-3">Recent Challenges</h3>
            <ul className="space-y-3">
              {challenges
                .filter(c => c.id !== currentChallenge.id)
                .map(challenge => (
                  <li key={challenge.id} className="text-sm">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {challenge.category}
                    </span>
                    <p className="font-medium text-gray-700 dark:text-gray-200">
                      {challenge.title}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default DailyChallenge;