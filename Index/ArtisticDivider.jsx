import { motion } from 'framer-motion';

const ArtisticDivider = ({ type = 'brushstroke', color = '#6A1E55', height = '50px' }) => {
  const dividerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="w-full flex justify-center my-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={dividerVariants}
    >
      {type === 'brushstroke' && (
        <svg
          width="100%"
          height={height}
          viewBox="0 0 1200 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30 C200 50, 400 10, 600 30 C800 50, 1000 10, 1200 30"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ filter: 'url(#roughpaper)' }}
          />
          <defs>
            <filter id="roughpaper" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.05"
                numOctaves="2"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}
      {type === 'wave' && (
        <svg
          width="100%"
          height={height}
          viewBox="0 0 1200 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30 C300 60, 600 0, 900 30 C1000 45, 1100 15, 1200 30"
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      )}
    </motion.div>
  );
};

export default ArtisticDivider;