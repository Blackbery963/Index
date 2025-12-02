import React from 'react';

const Dashboard = ({ startNewCreation }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-xl w-full text-center p-10 rounded-3xl border shadow-xl backdrop-blur-md bg-white/80 dark:bg-[#000705]/50 border-rose-200 dark:border-slate-800">
        <div className="text-6xl mb-6 animate-bounce">🌱</div>
        <h2 className="text-3xl font-bold mb-4">Grow Your Mind</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          "Creativity is the way I share my soul with the world." <br/>
          Your garden is waiting for new seeds.
        </p>
        <button
          onClick={startNewCreation}
          className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          Plant a Thought
        </button>
      </div>
    </div>
  );
};

export default Dashboard;