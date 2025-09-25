// contexts/DarkModeContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      toast.success(`Switched to ${newMode ? 'Dark' : 'Light'} Mode`, {
        position: 'top-right',
        style: { 
          background: newMode ? '#1F2937' : '#F9FAFB',
          color: newMode ? '#F9FAFB' : '#1F2937',
        }
      });
      return newMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};