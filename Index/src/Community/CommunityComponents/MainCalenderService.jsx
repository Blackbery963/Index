// import { useState } from "react";
// import {
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   addDays,
//   format,
//   isSameMonth,
//   isToday,
//   subMonths,
//   addMonths,
//   parseISO,
//   isSameDay
// } from "date-fns";
// import { motion } from "framer-motion";

// const events = [
//   {
//     date: "2025-08-15",
//     title: "Independence Day Exhibition",
//     time: "10:00 AM - 6:00 PM",
//     location: "Delhi Art Gallery",
//     description: "A special exhibition showcasing works from artists across India."
//   },
//   {
//     date: "2025-08-22",
//     title: "Digital Art Meetup",
//     time: "4:00 PM",
//     location: "Online",
//     description: "A community meetup to discuss trends and tools in digital art."
//   }
// ];

// export default function ModernEventCalendar() {
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   const monthStart = startOfMonth(currentMonth);
//   const monthEnd = endOfMonth(monthStart);
//   const startDate = startOfWeek(monthStart);
//   const endDate = endOfWeek(monthEnd);

//   const days = [];
//   let day = startDate;

//   while (day <= endDate) {
//     for (let i = 0; i < 7; i++) {
//       days.push(day);
//       day = addDays(day, 1);
//     }
//   }

//   const getEventForDate = (date) => {
//     return events.find((event) => isSameDay(parseISO(event.date), date));
//   };

//   return (
//     <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
//       {/* Calendar */}
//       <motion.div
//         className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:col-span-2"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <button
//             onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
//             className="px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
//           >
//             &lt;
//           </button>
//           <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
//             {format(currentMonth, "MMMM yyyy")}
//           </h2>
//           <button
//             onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
//             className="px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
//           >
//             &gt;
//           </button>
//         </div>

//         {/* Day Names */}
//         <div className="grid grid-cols-7 text-center font-medium text-gray-500 dark:text-gray-400 mb-2">
//           {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
//             <div key={d}>{d}</div>
//           ))}
//         </div>

//         {/* Days */}
//         <div className="grid grid-cols-7 gap-2">
//           {days.map((dayDate, idx) => {
//             const inMonth = isSameMonth(dayDate, monthStart);
//             const today = isToday(dayDate);
//             const event = getEventForDate(dayDate);

//             return (
//               <motion.div
//                 key={idx}
//                 whileHover={{ scale: 1.08 }}
//                 onClick={() => event && setSelectedEvent(event)}
//                 className={`p-2 text-center rounded-full cursor-pointer transition ${
//                   today
//                     ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
//                     : inMonth
//                     ? "text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
//                     : "text-gray-400 dark:text-gray-600"
//                 } ${event ? "border-2 border-purple-500" : ""}`}
//               >
//                 {format(dayDate, "d")}
//                 {event && (
//                   <div className="w-2 h-2 bg-purple-500 rounded-full mx-auto mt-1"></div>
//                 )}
//               </motion.div>
//             );
//           })}
//         </div>
//       </motion.div>

//       {/* Event Sidebar */}
//       <motion.div
//         className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl shadow-lg p-6"
//         initial={{ opacity: 0, x: 30 }}
//         animate={{ opacity: 1, x: 0 }}
//       >
//         {selectedEvent ? (
//           <>
//             <h3 className="text-xl font-bold mb-2">{selectedEvent.title}</h3>
//             <p className="text-purple-200 mb-1">{selectedEvent.time}</p>
//             <p className="text-purple-200 mb-4">{selectedEvent.location}</p>
//             <p className="text-sm text-purple-100">
//               {selectedEvent.description}
//             </p>
//           </>
//         ) : (
//           <p className="text-purple-200">
//             Click on a highlighted date to see event details.
//           </p>
//         )}
//       </motion.div>
//     </section>
//   );
// }



import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isToday,
  subMonths,
  addMonths,
  parseISO,
  isSameDay,
  addHours
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";

// Generate some dummy events relative to today for demo purposes
const today = new Date();
const events = [
  {
    date: format(addDays(today, 2), 'yyyy-MM-dd'),
    title: "Digital Art Workshop",
    time: "14:00 - 16:00",
    location: "Live Stream",
    description: "Master the basics of lighting and shading with pro artist Sarah Jenkins.",
    type: "workshop"
  },
  {
    date: format(addDays(today, 5), 'yyyy-MM-dd'),
    title: "Community Sketch Sesh",
    time: "18:00 - 20:00",
    location: "Discord Stage",
    description: "Chill vibes, lo-fi beats, and collective drawing. Open to all skill levels.",
    type: "social"
  },
  {
    date: format(addDays(today, 12), 'yyyy-MM-dd'),
    title: "3D Sculpting Challenge",
    time: "10:00 AM",
    location: "Submission Portal",
    description: "Theme reveal and kick-off for the monthly sculpting contest.",
    type: "contest"
  }
];

export default function ModernEventCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      days.push(day);
      day = addDays(day, 1);
    }
  }

  const getEventForDate = (date) => {
    return events.find((event) => isSameDay(parseISO(event.date), date));
  };

  // Default to showing the first event if nothing is selected
  const displayEvent = selectedEvent || events[0];

  return (
    <section className="py-6 px-1 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-slate-800/40 border border-white/20 mb-6 backdrop-blur-sm"
          >
            <CalendarIcon size={14} className="text-pink-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Community Events</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Upcoming Events
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <motion.div
            className="
              lg:col-span-2
              bg-white/40 dark:bg-slate-900/40 
              backdrop-blur-xl
              border border-white/40 dark:border-white/10
              rounded-xl p-6 md:p-8
              shadow-xl
            "
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Header Controls */}
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white capitalize">
                {format(currentMonth, "MMMM yyyy")}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="p-2 rounded-xl hover:bg-white/50 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="p-2 rounded-xl hover:bg-white/50 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 text-center mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {d}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((dayDate, idx) => {
                const inMonth = isSameMonth(dayDate, monthStart);
                const isCurrentDay = isToday(dayDate);
                const event = getEventForDate(dayDate);
                const isSelected = selectedEvent && isSameDay(parseISO(selectedEvent.date), dayDate);

                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                        if (event) setSelectedEvent(event);
                        else setSelectedEvent(null);
                    }}
                    className={`
                      aspect-square p-2 rounded-2xl cursor-pointer transition-all duration-300 relative flex flex-col items-center justify-center
                      ${!inMonth ? 'opacity-30' : 'opacity-100'}
                      ${isCurrentDay ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : ''}
                      ${isSelected ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-transparent' : ''}
                      ${!isCurrentDay && inMonth ? 'hover:bg-white/50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300' : ''}
                    `}
                  >
                    <span className="text-sm font-medium">{format(dayDate, "d")}</span>
                    
                    {event && (
                      <div className="absolute bottom-2 flex gap-1">
                         <div className={`w-1.5 h-1.5 rounded-full ${isCurrentDay ? 'bg-white' : 'bg-pink-500'}`} />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Event Details Sidebar */}
          <motion.div
            className="
              relative overflow-hidden
              bg-gradient-to-br from-indigo-600 to-purple-700
              text-white rounded-xl p-8
              shadow-2xl flex flex-col justify-between
            "
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 blur-3xl rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-6 border border-white/10">
                {selectedEvent ? 'Selected Event' : 'Next Up'}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={displayEvent ? displayEvent.title : "empty"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {displayEvent ? (
                    <>
                      <h3 className="text-3xl font-bold mb-4 leading-tight">
                        {displayEvent.title}
                      </h3>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-indigo-100">
                          <CalendarIcon size={18} />
                          <span className="font-medium">{format(parseISO(displayEvent.date), "MMMM do, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-3 text-indigo-100">
                          <Clock size={18} />
                          <span className="font-medium">{displayEvent.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-indigo-100">
                          <MapPin size={18} />
                          <span className="font-medium">{displayEvent.location}</span>
                        </div>
                      </div>

                      <p className="text-indigo-100 leading-relaxed bg-white/10 p-4 rounded-xl border border-white/10">
                        {displayEvent.description}
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-indigo-200">No events selected.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <button className="mt-8 w-full py-4 rounded-xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 shadow-lg">
              <span>Register Now</span>
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}