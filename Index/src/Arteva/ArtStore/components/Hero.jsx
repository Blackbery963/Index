import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => (
  <header className="py-12 md:py-20 text-center border-b border-zinc-100 dark:border-zinc-900 mb-8 bg-zinc-50 dark:bg-zinc-950 transition-colors">
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-7xl font-serif font-medium text-zinc-900 dark:text-white mb-4"
    >
      Gallery & Handmade.
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto text-base md:text-lg font-light leading-relaxed"
    >
      Curated fine art, sculptures, and verified handmade artifacts.
    </motion.p>
  </header>
);
export default Hero;