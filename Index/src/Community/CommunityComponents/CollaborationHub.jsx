// Components/CollaborationHub.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Share2, ArrowRight } from 'lucide-react';

const CollaborationHub = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Live Collaboration
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Create together in real-time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 dark:border-gray-600/30 shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Users size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Real-time Co-creation
                </h3>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Invite artists to collaborate on the same canvas, chat via voice/text, and export layered files with version history.
              </p>

              <div className="space-y-3 mb-6">
                {["Multi-user drawing sync", "Version history", "Private sessions"].map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2"
              >
                <span>Start Session</span>
                <ArrowRight size={16} />
              </motion.button>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="inline-block bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-4"
                  >
                    <Share2 size={32} className="text-gray-600 dark:text-gray-400" />
                  </motion.div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Live collaboration preview
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CollaborationHub;