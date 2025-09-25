// hooks/useHeaderData.js
import { useState, useEffect } from 'react';
import { HeaderService } from './headerService';

export const useHeaderData = () => {
  const [headerData, setHeaderData] = useState({
    profile: { username: 'Guest', email: 'No email', profileImage: null },
    isLoggedIn: false,
    cartCount: 0,
    orderCount: 0,
    notificationCount: 0,
    isLoading: true
  });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const loadHeaderData = async () => {
      try {
        const [profile, cartCount, orderCount] = await Promise.all([
          HeaderService.fetchUserProfile(),
          HeaderService.fetchCartCount(),
          profile.isLoggedIn ? HeaderService.fetchOrderCount() : 0
        ]);

        setHeaderData({
          profile,
          isLoggedIn: profile.isLoggedIn,
          cartCount,
          orderCount,
          notificationCount: 0, // You can implement this later
          isLoading: false
        });
      } catch (error) {
        console.error('Error loading header data:', error);
        setHeaderData(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadHeaderData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ...headerData, isScrolled };
};

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const tick = () => {
      const currentScrollY = window.pageYOffset;
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };

    const onScroll = () => {
      window.requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollDirection;
};