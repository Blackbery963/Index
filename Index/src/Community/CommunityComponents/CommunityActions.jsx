import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Plus, ArrowRight } from 'lucide-react';

const CommunityActions = () => {
  const actions = [
    {
      icon: Users,
      title: "Join a Community",
      description: "Discover tribes that share your passion. Connect, collaborate, and grow with like-minded artists.",
      link: "/Community/Resources/CommunityHub",
      buttonText: "Explore Groups",
      gradient: "from-blue-500 to-violet-500",
      shadow: "shadow-blue-500/20"
    },
    {
      icon: Plus,
      title: "Start Your Own",
      description: "Create a sanctuary for creativity. Define the rules, host events, and lead your own artistic movement.",
      link: "/community/CreateCommunity",
      buttonText: "Create Now",
      gradient: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/20"
    }
  ];

  return (
    <section className="py-6 px-1 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="
                h-full relative overflow-hidden
                bg-white/40 dark:bg-slate-900/40 
                backdrop-blur-xl
                border border-white/40 dark:border-white/10
                rounded-xl p-8 md:p-10
                transition-all duration-300
                hover:shadow-2xl hover:bg-white/60 dark:hover:bg-slate-900/60
                flex flex-col items-start
              ">
                
                {/* Background Gradient Blob on Hover */}
                <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full pointer-events-none`} />

                {/* Icon */}
                <div className={`
                  w-14 h-14 rounded-2xl 
                  bg-gradient-to-br ${action.gradient} 
                  flex items-center justify-center 
                  shadow-lg ${action.shadow}
                  mb-6 group-hover:scale-110 transition-transform duration-300
                `}>
                  <action.icon size={28} className="text-white" />
                </div>
                
                {/* Text */}
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-slate-800 dark:text-white">
                  {action.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed text-lg">
                  {action.description}
                </p>

                {/* Button */}
                <Link to={action.link} className="mt-auto w-full md:w-auto">
                  <div className="
                    flex items-center justify-center gap-2 px-6 py-3 
                    rounded-xl bg-slate-900 dark:bg-white 
                    text-white dark:text-slate-900 
                    font-semibold transition-all 
                    group-hover:gap-4 group-hover:shadow-lg
                  ">
                    <span>{action.buttonText}</span>
                    <ArrowRight size={18} />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityActions;