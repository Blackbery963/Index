import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  PenTool,
  Book,
  Sparkles,
  Sun,
  Moon,
  Coffee,
  Sparkle,
  Compass,
  HousePlus,
} from "lucide-react";
import { FiPlus } from "react-icons/fi";

const DiaryTemplate = () => {
  const templates = [
    {
      id: 1,
      title: "Morning Clarity",
      subtitle: "Set your intentions",
      icon: Sun,
      image:
        "https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      title: "Evening Unwind",
      subtitle: "Process the day",
      icon: Moon,
      image:
        "https://images.pexels.com/photos/355887/pexels-photo-355887.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      title: "Creative Spark",
      subtitle: "Brainstorm freely",
      icon: Sparkles,
      image:
        "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      title: "Gratitude Log",
      subtitle: "Simple gratitude notes",
      icon: Coffee,
      image:
        "https://images.pexels.com/photos/1280162/pexels-photo-1280162.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const [index, setIndex] = useState(0);
  const itemsPerPage = 2;

  const handleNext = () => {
    setIndex((prev) => (prev + itemsPerPage < templates.length ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIndex((prev) =>
      prev > 0 ? prev - 1 : templates.length - itemsPerPage
    );
  };

  const visibleTemplates = templates.slice(index, index + itemsPerPage);

  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-sm shadow-sm"
      >
        {/* HEADER */}
        <div className="px-8 py-8 text-center border-b border-slate-200 dark:border-zinc-700">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Your Creative Space
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
            A clean place to write and reflect.
          </p>
        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 py-6">
          <Link to="/Diary">
            <button className="w-full py-3 border border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500 rounded-lg font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition flex items-center justify-center gap-2">
              <FiPlus/>
               Start Writing
            </button>
          </Link>

          <Link to="/Journal">
            <button className="w-full py-3 border border-slate-400 dark:border-zinc-600 text-slate-700 dark:text-zinc-300 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-zinc-800 transition flex items-center justify-center gap-2">
              <HousePlus/>📘
               Explore Journal
            </button>
          </Link>
        </div>

        {/* TEMPLATE SECTION */}
        <div className="px-6 pb-6">
          {/* Top */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-semibold text-slate-600 dark:text-zinc-400">
                Templates
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-1.5 border border-slate-300 dark:border-zinc-700 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 border border-slate-300 dark:border-zinc-700 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* TEMPLATE CARDS */}
          <div className="grid grid-cols-2 gap-4">
            {visibleTemplates.map((t) => (
              <div
                key={t.id}
                className="border border-slate-300 dark:border-zinc-700 rounded-lg overflow-hidden hover:bg-slate-50 dark:hover:bg-zinc-800 transition cursor-pointer"
              >
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <t.icon className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
                  <h3 className="font-semibold text-slate-800 dark:text-white mt-1">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    {t.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DiaryTemplate;
