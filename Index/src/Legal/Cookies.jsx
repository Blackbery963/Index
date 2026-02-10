import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCookie, FaLock, FaCheck, FaTimes } from 'react-icons/fa';

const CookiePolicy = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // State for Cookie Preferences
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be changed
    functional: false,
    analytics: false,
    marketing: false,
  });

  const [status, setStatus] = useState(null); // 'saved', 'rejected', 'accepted_all'

  // Handlers
  const togglePreference = (key) => {
    if (key === 'essential') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // Logic to save specific preferences would go here
    setStatus('Preferences Saved');
    setTimeout(() => setStatus(null), 3000);
  };

  const handleRejectAll = () => {
    setPreferences({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
    setStatus('All Non-Essential Cookies Rejected');
    setTimeout(() => setStatus(null), 3000);
  };

  const handleAcceptAll = () => {
    setPreferences({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
    setStatus('All Cookies Accepted');
    setTimeout(() => setStatus(null), 3000);
  };

  // Static Legal Text Content
  const legalSections = [
    {
      title: "1. DEFINITIONS AND INTERPRETATION",
      content: `1.1 "Cookie" refers to a small text file placed on Your device by this Website and/or third parties when You visit the Website. 
1.2 "Session Cookies" are temporary Cookies that remain in the cookie file of Your browser until You leave the Website.
1.3 "Persistent Cookies" remain in the cookie file of Your browser for much longer (though how long will depend on the lifetime of the specific Cookie).`
    },
    {
      title: "2. SCOPE OF CONSENT",
      content: `2.1 By accessing the Platform, You consent to the deployment of Essential Cookies which are strictly necessary for the technical operation of the Service.
2.2 For all non-essential categories (Analytical, Functional, Marketing), explicit opt-in consent is requisite pursuant to the ePrivacy Directive (2002/58/EC) and the General Data Protection Regulation (GDPR).`
    },
    {
      title: "3. DATA RETENTION PROTOCOLS",
      content: `3.1 Cookies shall not be retained longer than legally necessary. 
3.2 Third-party tracking technologies are subject to the privacy policies of their respective providers. We disclaim liability for the persistence of third-party beacons beyond our direct control.`
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-400 font-serif leading-relaxed text-justify selection:bg-zinc-200 dark:selection:bg-zinc-800">
      
      {/* HEADER */}
      <header className="w-full py-12 px-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white uppercase tracking-widest mb-2">
            Cookie Policy & Consent
          </h1>
          <p className="text-xs font-mono text-zinc-500 uppercase">
            Directive Ref: PD-CK-2025-V.1.0 | Effective: {lastUpdated}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        
        {/* SECTION 1: LEGAL TEXT */}
        <div className="mb-16 space-y-12">
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-sm">
            <p className="mb-4 uppercase font-bold text-xs text-zinc-500">Recitals</p>
            <p>
              THIS COOKIE POLICY EXPLAINS HOW PAINTERS' DIARY ("WE", "US", AND "OUR") USES COOKIES AND SIMILAR TECHNOLOGIES TO RECOGNIZE YOU WHEN YOU VISIT OUR WEBSITE. IT EXPLAINS WHAT THESE TECHNOLOGIES ARE AND WHY WE USE THEM, AS WELL AS YOUR RIGHTS TO CONTROL OUR USE OF THEM.
            </p>
          </div>

          {legalSections.map((section, index) => (
            <article key={index} className="border-l-2 border-zinc-300 dark:border-zinc-700 pl-6">
              <h2 className="text-sm font-bold text-black dark:text-zinc-200 uppercase tracking-widest mb-4">
                {section.title}
              </h2>
              <div className="text-zinc-800 dark:text-zinc-400 text-sm whitespace-pre-wrap font-medium">
                {section.content}
              </div>
            </article>
          ))}
        </div>

        {/* SECTION 2: PREFERENCE CENTER (Interactive) */}
        <div className="border-t-4 border-black dark:border-zinc-700 pt-12">
          <h2 className="text-2xl font-bold text-black dark:text-white uppercase tracking-widest mb-2">
            Consent Management Platform
          </h2>
          <p className="text-xs text-zinc-500 mb-8 font-sans">
            Manage your consent preferences for tracking technologies below. Essential cookies cannot be disabled as they are required for system stability.
          </p>

          <div className="space-y-4">
            
            {/* 1. Essential (Locked) */}
            <div className="flex items-start justify-between p-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-black dark:text-white">Strictly Necessary</h3>
                  <FaLock className="text-zinc-400 text-xs" />
                </div>
                <p className="text-xs text-zinc-500 max-w-lg font-sans">
                  Required for authentication, security, and network integrity. These cannot be disabled.
                </p>
              </div>
              <div className="relative">
                <input type="checkbox" checked disabled className="sr-only" />
                <div className="w-10 h-5 bg-zinc-400 dark:bg-zinc-600 rounded-full opacity-50 cursor-not-allowed"></div>
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* 2. Functional */}
            <div className="flex items-start justify-between p-6 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-black dark:text-white mb-2">Functional Preferences</h3>
                <p className="text-xs text-zinc-500 max-w-lg font-sans">
                  Enable persistence of UI settings (language, theme, layout) across sessions.
                </p>
              </div>
              <button 
                onClick={() => togglePreference('functional')}
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${preferences.functional ? 'bg-black dark:bg-zinc-200' : 'bg-zinc-200 dark:bg-zinc-800'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white dark:bg-black rounded-full transition-transform duration-300 ${preferences.functional ? 'left-6' : 'left-1'}`}></div>
              </button>
            </div>

            {/* 3. Analytics */}
            <div className="flex items-start justify-between p-6 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-black dark:text-white mb-2">Analytics & Telemetry</h3>
                <p className="text-xs text-zinc-500 max-w-lg font-sans">
                  Allows collection of anonymized metrics (heatmaps, clickstreams) to optimize performance.
                </p>
              </div>
              <button 
                onClick={() => togglePreference('analytics')}
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${preferences.analytics ? 'bg-black dark:bg-zinc-200' : 'bg-zinc-200 dark:bg-zinc-800'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white dark:bg-black rounded-full transition-transform duration-300 ${preferences.analytics ? 'left-6' : 'left-1'}`}></div>
              </button>
            </div>

            {/* 4. Marketing */}
            <div className="flex items-start justify-between p-6 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-black dark:text-white mb-2">Marketing & Attribution</h3>
                <p className="text-xs text-zinc-500 max-w-lg font-sans">
                  Permits third-party cookies to build interest profiles for ad personalization.
                </p>
              </div>
              <button 
                onClick={() => togglePreference('marketing')}
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${preferences.marketing ? 'bg-black dark:bg-zinc-200' : 'bg-zinc-200 dark:bg-zinc-800'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white dark:bg-black rounded-full transition-transform duration-300 ${preferences.marketing ? 'left-6' : 'left-1'}`}></div>
              </button>
            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-12 flex flex-col md:flex-row items-center gap-4 border-t border-zinc-100 dark:border-zinc-900 pt-8">
            <button 
              onClick={handleSave}
              className="w-full md:w-auto px-8 py-3 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              Save Preferences
            </button>
            
            <button 
              onClick={handleRejectAll}
              className="w-full md:w-auto px-8 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs font-bold uppercase tracking-widest hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Reject All (Cancel)
            </button>

            <button 
              onClick={handleAcceptAll}
              className="w-full md:w-auto px-8 py-3 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ml-auto"
            >
              Accept All
            </button>
          </div>

          {/* Status Notification */}
          <AnimatePresence>
            {status && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-800 text-center text-xs font-bold uppercase tracking-wide text-zinc-600 dark:text-zinc-300"
              >
                STATUS UPDATE: {status}
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* FOOTER */}
        <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-400 font-mono">
          <p className="mb-4">
            CONSENT ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}-{new Date().getFullYear()}
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/contact" className="hover:underline">DPO Contact</Link>
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>

      </main>
    </div>
  );
};

export default CookiePolicy;