import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, Brush, Palette, Box, ArrowRight, Package, Sparkles } from 'lucide-react';

const ResourceLibrary = () => {
  const resources = [
    { 
      icon: Brush, 
      title: "Procreate Brushes", 
      downloads: "1.2K",
      desc: "Inking, sketching, and texture sets.",
      gradient: "from-pink-500 to-rose-500",
      shadow: "shadow-pink-500/20"
    },
    { 
      icon: Palette, 
      title: "UI/UX Kits", 
      downloads: "890",
      desc: "Modern landing page components.",
      gradient: "from-violet-500 to-purple-500",
      shadow: "shadow-violet-500/20"
    },
    { 
      icon: Box, 
      title: "3D Assets", 
      downloads: "456",
      desc: "Low-poly models and blender files.",
      gradient: "from-cyan-500 to-blue-500",
      shadow: "shadow-cyan-500/20"
    },
  ];

  return (
    <section className="py-6 px-1 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-slate-800/40 border border-white/20 mb-6 backdrop-blur-sm"
          >
            <Package size={14} className="text-emerald-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Creator Toolkit</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Free Resources
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto"
          >
            High-quality assets to accelerate your workflow, curated by the community.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="
                h-full flex flex-col items-center text-center
                bg-white/40 dark:bg-slate-900/40 
                backdrop-blur-xl
                border border-white/40 dark:border-white/10
                rounded-xl p-8
                shadow-xl hover:shadow-2xl hover:bg-white/60 dark:hover:bg-slate-900/60
                transition-all duration-300
              ">
                
                {/* Icon Blob */}
                <div className={`
                  w-16 h-16 rounded-2xl 
                  bg-gradient-to-br ${resource.gradient} 
                  flex items-center justify-center 
                  shadow-lg ${resource.shadow}
                  mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300
                `}>
                  <resource.icon size={32} className="text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  {resource.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  {resource.desc}
                </p>

                {/* Download Stats */}
                <div className="mt-auto w-full">
                  <div className="flex items-center justify-center gap-1 text-xs font-semibold text-slate-500 mb-4 uppercase tracking-wider">
                    <Download size={12} />
                    {resource.downloads} Downloads
                  </div>

                  <button className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 group/btn">
                    <span>Get It Now</span>
                    <Sparkles size={16} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/Community/Resources/ResourceHub">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                inline-flex items-center gap-2 
                px-8 py-4 rounded-full 
                bg-white/50 dark:bg-slate-800/50 
                border border-slate-200 dark:border-slate-700
                text-slate-700 dark:text-slate-200 font-semibold 
                hover:bg-white hover:shadow-lg transition-all
              "
            >
              <span>Explore All Resources</span>
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourceLibrary;