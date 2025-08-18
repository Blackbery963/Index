import { useState } from "react";
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
  isSameDay
} from "date-fns";
import { motion } from "framer-motion";

const events = [
  {
    date: "2025-08-15",
    title: "Independence Day Exhibition",
    time: "10:00 AM - 6:00 PM",
    location: "Delhi Art Gallery",
    description: "A special exhibition showcasing works from artists across India."
  },
  {
    date: "2025-08-22",
    title: "Digital Art Meetup",
    time: "4:00 PM",
    location: "Online",
    description: "A community meetup to discuss trends and tools in digital art."
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

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
      {/* Calendar */}
      <motion.div
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:col-span-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            &lt;
          </button>
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            &gt;
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 text-center font-medium text-gray-500 dark:text-gray-400 mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((dayDate, idx) => {
            const inMonth = isSameMonth(dayDate, monthStart);
            const today = isToday(dayDate);
            const event = getEventForDate(dayDate);

            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.08 }}
                onClick={() => event && setSelectedEvent(event)}
                className={`p-2 text-center rounded-full cursor-pointer transition ${
                  today
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    : inMonth
                    ? "text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "text-gray-400 dark:text-gray-600"
                } ${event ? "border-2 border-purple-500" : ""}`}
              >
                {format(dayDate, "d")}
                {event && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full mx-auto mt-1"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Event Sidebar */}
      <motion.div
        className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl shadow-lg p-6"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {selectedEvent ? (
          <>
            <h3 className="text-xl font-bold mb-2">{selectedEvent.title}</h3>
            <p className="text-purple-200 mb-1">{selectedEvent.time}</p>
            <p className="text-purple-200 mb-4">{selectedEvent.location}</p>
            <p className="text-sm text-purple-100">
              {selectedEvent.description}
            </p>
          </>
        ) : (
          <p className="text-purple-200">
            Click on a highlighted date to see event details.
          </p>
        )}
      </motion.div>
    </section>
  );
}



