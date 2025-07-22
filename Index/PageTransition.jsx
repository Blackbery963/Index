// Enhanced PageTransition.jsx
import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const transitionRef = useRef(null);
  const prevLocationRef = useRef(location);
  const coverRef = useRef(null);

  useEffect(() => {
    if (prevLocationRef.current.key !== location.key) {
      // Create a cover element
      const cover = document.createElement('div');
      cover.className = 'page-cover';
      document.body.appendChild(cover);
      
      // Animate the cover down
      gsap.to(cover, {
        duration: 0.6,
        y: '100%',
        ease: 'power3.inOut',
        onComplete: () => {
          // Remove the cover after animation
          document.body.removeChild(cover);
        }
      });

      // Animate the new page in from bottom
      gsap.from(transitionRef.current, {
        duration: 0.8,
        y: '30%',
        opacity: 0,
        ease: 'power3.inOut',
        delay: 0.2
      });
    }

    prevLocationRef.current = location;
  }, [location]);

  return (
    <div ref={transitionRef} className="page-transition">
      {children}
    </div>
  );
};

export default PageTransition;