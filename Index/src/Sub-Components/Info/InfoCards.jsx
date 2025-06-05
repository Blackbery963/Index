// components/InfoCard.jsx
import { motion } from "framer-motion";

const InfoCard = ({ title, content, gradient, type, delay = 0 }) => {
  return (
    <motion.div
      className="p-6 rounded-xl shadow-lg border border-transparent overflow-hidden relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className={`absolute inset-0 ${gradient} z-0`} />
      <div className="relative z-10">
        <h3 className="text-xl font-bold font-Quicksand text-gray-800 dark:text-white mb-4">
          {title}
        </h3>
        {type === "paragraphs" ? (
          content.map((para, idx) => (
            <p
              key={idx}
              className="text-gray-700 dark:text-white/90 mb-4 last:mb-0"
            >
              {para}
            </p>
          ))
        ) : (
          <ul className="space-y-3 text-gray-700 dark:text-white/90">
            {content.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-amber-500 dark:text-amber-300 mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default InfoCard;
