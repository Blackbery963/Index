// DiaryTemplate.jsx (simplified)
import { Link } from 'react-router-dom';

const DiaryTemplate = () => {
  return (
    <section className="py-12">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Start Your Creative Diary
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Capture your artistic journey and creative thoughts in your personal space.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/diary/create">
            <button className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl hover:opacity-80 transition-opacity">
              Start Writing
            </button>
          </Link>
          <Link to="/diaries">
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Explore Diaries
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DiaryTemplate;