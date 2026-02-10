import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, ChevronLeft } from 'lucide-react';

// --- MOCK DATA (Articles) ---
const MOCK_ARTICLES = [
  {
    id: 1,
    title: "Overcoming Creative Block",
    excerpt: "Every artist faces the blank canvas fear. Here are 5 psychological tricks to restart your engine.",
    author: "Sarah Jenkins",
    readTime: "5 min read",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600",
    content: "The blank canvas is terrifying. It represents infinite possibility..."
  },
  {
    id: 2,
    title: "Understanding Color Theory",
    excerpt: "Why do some color combinations vibrate while others fall flat? It's all in the wheel.",
    author: "Davinci Code",
    readTime: "8 min read",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&q=80&w=600",
    content: "Color isn't absolute; it is relative..."
  },
  {
    id: 3,
    title: "The Future of AI Art",
    excerpt: "Tool or Threat? Exploring how Generative AI is changing the landscape for traditional artists.",
    author: "Tech Insider",
    readTime: "12 min read",
    category: "Opinion",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    content: "The debate rages on..."
  }
];

// --- ARTICLE CARD (Horizontal) ---
const ArticleCard = ({ article, onClick }) => (
    <motion.div 
        layout
        onClick={onClick}
        className="min-w-[320px] w-[320px] snap-center flex-shrink-0 bg-white dark:bg-zinc-900 border-l-4 border-l-purple-500 border-y border-r border-zinc-200 dark:border-zinc-800 rounded-r-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
    >
        <div className="flex h-full">
            <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded-sm">
                            {article.category}
                        </span>
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                            <Clock size={10} /> {article.readTime}
                        </span>
                    </div>
                    <h3 className="font-bold text-zinc-900 dark:text-white text-lg leading-tight mb-2 group-hover:text-purple-500 transition-colors">
                        {article.title}
                    </h3>
                    <p className="text-zinc-500 text-xs line-clamp-2">
                        {article.excerpt}
                    </p>
                </div>
                
                <div className="flex items-center gap-2 pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="w-5 h-5 rounded-full bg-zinc-200 flex items-center justify-center text-[10px] font-bold">
                        {article.author[0]}
                    </div>
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{article.author}</span>
                </div>
            </div>
            
            <div className="w-24 h-full relative">
                 <img src={article.image} alt="" className="w-full h-full object-cover absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
        </div>
    </motion.div>
);

// --- ARTICLE DETAIL ---
const ArticleDetail = ({ article, onClose }) => (
    <motion.div 
        key="detail"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        className="w-full bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm"
    >
        <div className="border-b border-zinc-100 dark:border-zinc-800 p-4 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
            <button onClick={onClose} className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <ChevronLeft size={16} /> Back to Articles
            </button>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">{article.category}</span>
        </div>

        <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">{article.title}</h1>
            <div className="flex items-center gap-4 mb-6 text-xs text-zinc-500 dark:text-zinc-400">
                 <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-300">{article.author[0]}</div>
                    <span>{article.author}</span>
                 </div>
                 <span>•</span>
                 <div className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</div>
            </div>
            <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8 relative">
                 <img src={article.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="prose dark:prose-invert prose-zinc max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />
            <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex justify-center">
                 <button onClick={onClose} className="px-6 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">Read More Articles</button>
            </div>
        </div>
    </motion.div>
);

export default function ArticlesFeed() {
    const [selected, setSelected] = useState(null);

    return (
        <div className="w-full py-8 px-1">
            <div className="flex items-center justify-between px-1 mb-4">
                <h3 className="font-bold text-zinc-800 dark:text-white flex items-center gap-2">
                    <BookOpen className="text-purple-500" size={18}/> Latest Articles
                </h3>
            </div>
            <div className="min-h-[200px]">
                <AnimatePresence mode="wait">
                    {selected ? (
                        <ArticleDetail key="detail" article={selected} onClose={() => setSelected(null)} />
                    ) : (
                        <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                            {MOCK_ARTICLES.map(article => (
                                <ArticleCard key={article.id} article={article} onClick={() => setSelected(article)} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}