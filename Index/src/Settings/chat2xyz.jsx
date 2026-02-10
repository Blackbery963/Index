import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Send } from "lucide-react";

function Chat2xyz() {
    // Mock data 
    const notification = {
        senderName: "Sarah Jenkins",
        avatar: "https://i.pravatar.cc/150?u=4",
        count: 5,
        activeAvatars: [
            "https://i.pravatar.cc/150?u=4", 
            "https://i.pravatar.cc/150?u=1", 
            "https://i.pravatar.cc/150?u=8"
        ]
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { type: "spring", stiffness: 400, damping: 25 }
        }
    };

    return (
        <div className="fixed lg:bottom-5 lg:right-5 bottom-[72px] right-2 z-50">
            <Link to="/chat">
                
                {/* ========================================== */}
                {/* MOBILE VERSION (< md) - Liquid Pill        */}
                {/* ========================================== */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    whileTap={{ scale: 0.95 }}
                    className="md:hidden flex items-center gap-3 pr-4 pl-1.5 py-1.5
                               bg-white/30 dark:bg-black/30 backdrop-blur-3xl backdrop-saturate-150
                               border border-white/40 dark:border-white/10
                               rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
                               relative overflow-hidden"
                >
                    {/* Glossy Sheen Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                        <img 
                            src={notification.avatar} 
                            alt="sender" 
                            className="w-9 h-9 rounded-full object-cover border border-white/50 dark:border-white/10" 
                        />
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500 border border-white dark:border-transparent"></span>
                        </span>
                    </div>

                    <div className="flex flex-col relative z-10">
                        <span className="text-xs font-bold text-gray-900 dark:text-white leading-none drop-shadow-sm">
                            {notification.senderName}
                        </span>
                        <span className="text-[10px] font-medium text-purple-700 dark:text-purple-300 mt-0.5">
                            +{notification.count - 1} messages
                        </span>
                    </div>
                </motion.div>


                {/* ========================================== */}
                {/* DESKTOP VERSION (>= md) - Liquid Glass Blade */}
                {/* ========================================== */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="hidden md:flex group relative items-center h-14 pr-1.5
                               bg-white/40 dark:bg-black/40 
                               backdrop-blur-3xl backdrop-saturate-150
                               border border-white/50 dark:border-white/10
                               rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]
                               cursor-pointer overflow-hidden transition-all duration-300"
                >
                    {/* Top Gloss Reflection */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                    
                    {/* Hover Glow (Purple Aura) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* SECTION 1: Counter Pill (Inner Glass) */}
                    <div className="relative z-10 ml-2 flex items-center gap-1.5 px-2 py-1
                                    rounded-full bg-white/40 dark:bg-white/5
                                    border border-white/40 dark:border-white/5
                                    shadow-inner">
                        <div className="w-8 h-8 rounded-full
                                        
                                        flex items-center justify-center text-white ">
                            <MessageCircle size={18} className="drop-shadow-md" />
                        </div>

                        <div className="flex flex-col leading-tight pr-1">
                            <span className="text-[11px] font-bold text-gray-800 dark:text-gray-100">
                                {notification.count} New
                            </span>
                            <span className="text-[9px] text-gray-600 dark:text-gray-400">
                                Messages
                            </span>
                        </div>
                    </div>

                    {/* SECTION 2: Social / Status */}
                    <div className="relative z-10 flex items-center gap-2 px-3">
                        <div className="flex -space-x-2.5">
                            {notification.activeAvatars.slice(0, 3).map((src, i) => (
                                <motion.img
                                    key={i}
                                    src={src}
                                    alt="user"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="w-6 h-6 rounded-full
                                               border-2 border-white/60 dark:border-zinc-800
                                               object-cover shadow-sm"
                                    style={{ zIndex: 10 - i }}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col justify-center leading-tight">
                            <span className="text-[11px] font-semibold text-gray-900 dark:text-white drop-shadow-sm">
                                {notification.senderName}
                            </span>
                            <span className="text-[9px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                Active
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            </span>
                        </div>
                    </div>

                    {/* SECTION 3: Send Action Orb */}
                    <motion.div
                        className="relative z-10 ml-auto mr-1 w-10 h-10 rounded-full
                                   bg-white/60 dark:bg-white/10
                                   backdrop-blur-md border border-white/60 dark:border-white/10
                                   flex items-center justify-center
                                   text-purple-600 dark:text-purple-300 opacity-0 scale-90
                                   group-hover:opacity-100 group-hover:scale-100
                                   shadow-lg
                                   transition-all duration-300"
                    >
                        <Send size={18} className="ml-0.5 mt-0.5" />
                    </motion.div>
                </motion.div>
                
            </Link>
        </div>
    )
}

export default Chat2xyz;





