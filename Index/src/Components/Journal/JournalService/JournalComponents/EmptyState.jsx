import React from "react";
import { Link } from "react-router-dom";
import { NotebookPen, Search } from "lucide-react";

const EmptyState = ({ isSearch, onClear }) => (
  <div className="col-span-full py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl bg-slate-50/50 dark:bg-zinc-900/50">
    <div className="w-16 h-16 mb-4 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center">
      {isSearch ? (
        <Search className="w-8 h-8 text-emerald-600 dark:text-emerald-400 opacity-80" />
      ) : (
        <NotebookPen className="w-8 h-8 text-emerald-600 dark:text-emerald-400 opacity-80" />
      )}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100 mb-2">
      {isSearch ? "No Results Found" : "Canvas Empty"}
    </h3>
    <p className="text-slate-500 dark:text-zinc-400 max-w-sm mb-6">
      {isSearch 
        ? "Try adjusting your search terms."
        : "You haven't published any entries yet. Start writing!"}
    </p>
    {isSearch ? (
      <button onClick={onClear} className="px-6 py-2.5 bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium">
        Clear Search
      </button>
    ) : (
      <Link to="/diary">
        <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition">
          Start Writing
        </button>
      </Link>
    )}
  </div>
);

export default EmptyState;