// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // Importing Link
// import { 
//   LayoutGrid, Moon, Sun, Globe, Download, Sparkles, 
//   ShieldCheck, Smartphone, User, Bell, Lock, 
//   HelpCircle, FileText, Scale, ChevronRight, 
//   ExternalLink, Instagram, Linkedin, Twitter, LogOut,
//   Cookie, LifeBuoy, Info, HardDrive
// } from 'lucide-react';

// const SettingsPage = () => {
//   // --- State ---
//   // Note: specific toggles (Dark Mode) would usually be global context, 
//   // but keeping local here for UI demonstration.
//   const [notifications, setNotifications] = useState(true);
//   const [privateAccount, setPrivateAccount] = useState(false);
//   const [twoFactor, setTwoFactor] = useState(true);
//   const [darkModeToggle, setDarkModeToggle] = useState(false); 

//   // --- Components ---

//   const SectionHeader = ({ title }) => (
//     <h3 className="px-4 mb-2 mt-8 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
//       {title}
//     </h3>
//   );

//   const Toggle = ({ checked, onChange }) => (
//     <button 
//       onClick={(e) => {
//         e.preventDefault(); // Prevent Link navigation if toggle is inside a Link
//         onChange(!checked);
//       }}
//       className={`
//         relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none
//         ${checked 
//           ? 'bg-black dark:bg-white' 
//           : 'bg-zinc-200 dark:bg-zinc-700'
//         }
//       `}
//     >
//       <span 
//         className={`
//           absolute top-1 left-1 w-4 h-4 rounded-full shadow-sm transition-transform duration-200
//           ${checked 
//             ? 'translate-x-5 bg-white dark:bg-black' 
//             : 'translate-x-0 bg-white dark:bg-zinc-400'
//           }
//         `} 
//       />
//     </button>
//   );

//   // Dynamic Item: Renders as <Link> if 'to' is present, otherwise <div>
//   const SettingItem = ({ 
//     icon: Icon, 
//     label, 
//     subLabel, 
//     action, 
//     isDestructive, 
//     hasChevron = true, 
//     onClick, 
//     to // New prop for React Router
//   }) => {
    
//     // Determine the wrapper component
//     const Wrapper = to ? Link : 'div';
//     const wrapperProps = to ? { to } : { onClick };

//     return (
//       <Wrapper 
//         {...wrapperProps}
//         className={`
//           group flex items-center justify-between p-4 
//           bg-white dark:bg-zinc-900                 
//           border-b border-zinc-100 dark:border-zinc-800 
//           last:border-0 
//           cursor-pointer transition-colors
//           hover:bg-zinc-50 dark:hover:bg-zinc-800/50
//         `}
//       >
//         <div className="flex items-center gap-4">
//           <div className={`
//             ${isDestructive 
//               ? 'text-red-600 dark:text-red-400' 
//               : 'text-zinc-900 dark:text-zinc-100'
//             }
//           `}>
//             <Icon size={20} strokeWidth={1.5} />
//           </div>
          
//           <div className="flex flex-col">
//             <span className={`text-sm font-medium ${isDestructive ? 'text-red-600 dark:text-red-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
//               {label}
//             </span>
//             {subLabel && <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{subLabel}</span>}
//           </div>
//         </div>
        
//         <div className="flex items-center gap-3">
//           {action}
//           {hasChevron && !action && <ChevronRight size={16} className="text-zinc-400 dark:text-zinc-600" />}
//         </div>
//       </Wrapper>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-300">
      
//       {/* --- HEADER --- */}
//       <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
//         <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-3">
//             <div className="text-zinc-900 dark:text-white">
//               <LayoutGrid size={24} strokeWidth={2} />
//             </div>
//             <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
//               Painters' Diary
//             </span>
//           </Link>
          
//           <Link to="/profile" className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
//             <User size={16} />
//           </Link>
//         </div>
//       </header>

//       {/* --- CONTENT --- */}
//       <div className="max-w-2xl mx-auto px-4 pb-24 pt-2">
        
//         {/* APP SETTINGS */}
//         <SectionHeader title="App Settings" />
//         <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
//           <SettingItem 
//             icon={Download} 
//             label="Install App" 
//             subLabel="Download the web app"
//             to="/install"
//           />
//            <SettingItem 
//             icon={Sparkles} 
//             label="What's New" 
//             subLabel="Version 2.4.0"
//             to="/whats-new"
//             action={<span className="w-2 h-2 rounded-full bg-blue-500"></span>}
//           />
//           <SettingItem 
//             icon={darkModeToggle ? Moon : Sun} 
//             label="Dark Mode" 
//             action={<Toggle checked={darkModeToggle} onChange={setDarkModeToggle} />} 
//             hasChevron={false}
//           />
//           <SettingItem 
//             icon={Globe} 
//             label="Language" 
//             to="/settings/language"
//             action={<span className="text-xs font-bold text-zinc-900 dark:text-white opacity-60">English</span>} 
//           />
//         </div>

//         {/* ACCOUNT & SECURITY */}
//         <SectionHeader title="Account & Security" />
//         <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
//           <SettingItem 
//             icon={ShieldCheck} 
//             label="Two-Factor Auth" 
//             action={<Toggle checked={twoFactor} onChange={setTwoFactor} />} 
//             hasChevron={false}
//           />
//           <SettingItem 
//             icon={Smartphone} 
//             label="Active Sessions" 
//             subLabel="iPhone 15 Pro • Kolkata" 
//             to="/settings/sessions"
//           />
//            <SettingItem 
//             icon={Lock} 
//             label="Private Account" 
//             action={<Toggle checked={privateAccount} onChange={setPrivateAccount} />} 
//             hasChevron={false}
//           />
//           <SettingItem 
//             icon={HardDrive} 
//             label="Data & Storage" 
//             to="/settings/storage"
//           />
//         </div>

//         {/* PRIVACY & DATA */}
//         <SectionHeader title="Privacy" />
//         <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
//           <SettingItem 
//             icon={Bell} 
//             label="Notifications" 
//             action={<Toggle checked={notifications} onChange={setNotifications} />} 
//             hasChevron={false}
//           />
//            <SettingItem 
//             icon={Cookie} 
//             label="Cookie Preferences" 
//             to="/settings/cookies"
//           />
//           <SettingItem 
//             icon={Download} 
//             label="Download Your Data" 
//             to="/settings/download-data"
//           />
//         </div>

//         {/* SUPPORT */}
//         <SectionHeader title="Support" />
//         <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
//           <SettingItem icon={LifeBuoy} label="Help Center" to="/help" />
//           <SettingItem icon={HelpCircle} label="FAQs" to="/faqs" />
//           <SettingItem icon={Info} label="About Painters' Diary" to="/about" />
//         </div>

//         {/* LEGAL */}
//         <SectionHeader title="Legal" />
//         <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
//           <SettingItem 
//             icon={FileText} 
//             label="Privacy Policy" 
//             to="/legal/privacy"
//             action={<ExternalLink size={14} className="text-zinc-400"/>} 
//             hasChevron={false} 
//           />
//           <SettingItem 
//             icon={Scale} 
//             label="Terms of Service" 
//             to="/legal/terms"
//             action={<ExternalLink size={14} className="text-zinc-400"/>} 
//             hasChevron={false} 
//           />
//         </div>

//         {/* LOGOUT */}
//         <div className="mt-6 rounded-2xl overflow-hidden shadow-sm border border-red-100 dark:border-red-900/30">
//            <SettingItem 
//             icon={LogOut} 
//             label="Log Out" 
//             isDestructive={true}
//             hasChevron={false}
//             to="/logout" // or remove 'to' and use onClick handler for actual logic
//           />
//         </div>

//         {/* FOOTER */}
//         <div className="mt-12 flex flex-col items-center gap-6">
//           <div className="flex items-center gap-6">
//             <SocialLink icon={Instagram} />
//             <SocialLink icon={Twitter} />
//             <SocialLink icon={Linkedin} />
//           </div>
          
//           <div className="text-center space-y-1">
//              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-600">
//                Painter's Diary v2.4.0
//              </p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// // --- Helper: Social Link ---
// const SocialLink = ({ icon: Icon }) => (
//   <button className="
//     p-3 rounded-full
//     bg-zinc-100 dark:bg-zinc-900
//     text-zinc-400 dark:text-zinc-500
//     hover:bg-black hover:text-white
//     dark:hover:bg-white dark:hover:text-black
//     transition-all duration-300
//   ">
//     <Icon size={20} strokeWidth={2} />
//   </button>
// );

// export default SettingsPage;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { 
  LayoutGrid, Moon, Sun, Globe, Download, Sparkles, 
  ShieldCheck, Smartphone, User, Bell, Lock, 
  HelpCircle, FileText, Scale, ChevronRight, 
  ExternalLink, Instagram, Linkedin, Twitter, LogOut,
  Cookie, LifeBuoy, Info, HardDrive, X, Check,
  Youtube
} from 'lucide-react';

const SettingsPage = () => {
  // --- State ---
  const [notifications, setNotifications] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [darkModeToggle, setDarkModeToggle] = useState(false);
  
  // Language State
  const [language, setLanguage] = useState('English (US)');
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  // Available Languages List
  const languages = [
    { code: 'en-US', name: 'English (US)', native: 'English' },
    { code: 'fr', name: 'French', native: 'Français' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  ];

  // Initialize with browser language if possible, otherwise default to English
  useEffect(() => {
    const browserLang = navigator.language;
    // Simple check to set initial state based on browser code
    if (browserLang.includes('fr')) setLanguage('French');
    else if (browserLang.includes('hi')) setLanguage('Hindi');
    else if (browserLang.includes('bn')) setLanguage('Bengali');
    else setLanguage('English (US)');
  }, []);

  // --- Components ---

  const SectionHeader = ({ title }) => (
    <h3 className="px-4 mb-2 mt-8 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
      {title}
    </h3>
  );

  const Toggle = ({ checked, onChange }) => (
    <button 
      onClick={(e) => {
        e.preventDefault(); 
        onChange(!checked);
      }}
      className={`
        relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none
        ${checked 
          ? 'bg-black dark:bg-white' 
          : 'bg-zinc-200 dark:bg-zinc-700'
        }
      `}
    >
      <span 
        className={`
          absolute top-1 left-1 w-4 h-4 rounded-full shadow-sm transition-transform duration-200
          ${checked 
            ? 'translate-x-5 bg-white dark:bg-black' 
            : 'translate-x-0 bg-white dark:bg-zinc-400'
          }
        `} 
      />
    </button>
  );

  const SettingItem = ({ 
    icon: Icon, 
    label, 
    subLabel, 
    action, 
    isDestructive, 
    hasChevron = true, 
    onClick, 
    to 
  }) => {
    const Wrapper = to ? Link : 'div';
    const wrapperProps = to ? { to } : { onClick };

    return (
      <Wrapper 
        {...wrapperProps}
        className={`
          group flex items-center justify-between p-4 
          bg-white dark:bg-zinc-900                 
          border-b border-zinc-100 dark:border-zinc-800 
          last:border-0 
          cursor-pointer transition-colors
          hover:bg-zinc-50 dark:hover:bg-zinc-800/50
        `}
      >
        <div className="flex items-center gap-4">
          <div className={`
            ${isDestructive 
              ? 'text-red-600 dark:text-red-400' 
              : 'text-zinc-900 dark:text-zinc-100'
            }
          `}>
            <Icon size={20} strokeWidth={1.5} />
          </div>
          
          <div className="flex flex-col">
            <span className={`text-sm font-medium ${isDestructive ? 'text-red-600 dark:text-red-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
              {label}
            </span>
            {subLabel && <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{subLabel}</span>}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {action}
          {hasChevron && !action && <ChevronRight size={16} className="text-zinc-400 dark:text-zinc-600" />}
        </div>
      </Wrapper>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-300 relative">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            {/* <div className="text-zinc-900 dark:text-white">
              <LayoutGrid size={24} strokeWidth={2} />
            </div> */}
            <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white font-Eagle">
              Painters' Diary
            </span>
          </Link>
          
          <Link to="/profile" className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
            <User size={16} />
          </Link>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <div className="max-w-2xl mx-auto px-4 pb-24 pt-2">
        
        {/* APP SETTINGS */}
        <SectionHeader title="App Settings" />
        <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
          <SettingItem 
            icon={Download} 
            label="Install App" 
            subLabel="Download the web app"
            to="/install"
          />
           <SettingItem 
            icon={Sparkles} 
            label="What's New" 
            subLabel="Version 2.4.0"
            to="/whats-new"
            action={<span className="w-2 h-2 rounded-full bg-blue-500"></span>}
          />
          <SettingItem 
            icon={darkModeToggle ? Moon : Sun} 
            label="Dark Mode" 
            action={<Toggle checked={darkModeToggle} onChange={setDarkModeToggle} />} 
            hasChevron={false}
          />
          
          {/* LANGUAGE SELECTOR */}
          <SettingItem 
            icon={Globe} 
            label="Language"
            // Opens the modal on click
            onClick={() => setIsLangModalOpen(true)}
            action={
              <span className="text-xs font-bold text-zinc-900 dark:text-white opacity-60 uppercase">
                {language}
              </span>
            } 
          />
        </div>

        {/* ACCOUNT & SECURITY */}
        <SectionHeader title="Account & Security" />
        <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
          <Link to={"/settings/two-factor-auth"}>
          <SettingItem 
            icon={ShieldCheck} 
            label="Two-Factor Auth" 
            action={<Toggle checked={twoFactor} onChange={setTwoFactor} />} 
            hasChevron={false}
          />
          </Link>
          {/* <Link to={"/check-password"}> */}
          <SettingItem 
            icon={Smartphone} 
            label="Active Sessions" 
            subLabel="iPhone 15 Pro • Kolkata" 
            to="/check-password"
          />
          {/* </Link> */}
           <SettingItem 
            icon={Lock} 
            label="Private Account" 
            action={<Toggle checked={privateAccount} onChange={setPrivateAccount} />} 
            hasChevron={false}
          />
          <SettingItem 
            icon={HardDrive} 
            label="Data & Storage" 
            to="/settings/storage"
          />
        </div>

        {/* PRIVACY & DATA */}
        <SectionHeader title="Privacy" />
        <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
          <SettingItem 
            icon={Bell} 
            label="Notifications" 
            action={<Toggle checked={notifications} onChange={setNotifications} />} 
            hasChevron={false}
          />
           <SettingItem 
            icon={Cookie} 
            label="Cookie Preferences" 
            to="/settings/cookies"
          />
          <SettingItem 
            icon={Download} 
            label="Download Your Data" 
            to="/settings/download-data"
          />
        </div>

        {/* SUPPORT */}
        <SectionHeader title="Support" />
        <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
          <SettingItem icon={LifeBuoy} label="Help Center" to="/help" />
          <SettingItem icon={HelpCircle} label="FAQs" to="/faqs" />
          <SettingItem icon={Info} label="About Painters' Diary" to="/about" />
        </div>

        {/* LEGAL */}
        <SectionHeader title="Legal" />
        <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
          <SettingItem 
            icon={FileText} 
            label="Privacy Policy" 
            to="/legal/privacy"
            action={<ExternalLink size={14} className="text-zinc-400"/>} 
            hasChevron={false} 
          />
          <SettingItem 
            icon={Scale} 
            label="Terms of Service" 
            to="/legal/terms"
            action={<ExternalLink size={14} className="text-zinc-400"/>} 
            hasChevron={false} 
          />
        </div>

        {/* LOGOUT */}
        <div className="mt-6 rounded-2xl overflow-hidden shadow-sm border border-red-100 dark:border-red-900/30">
           <SettingItem 
            icon={LogOut} 
            label="Log Out" 
            isDestructive={true}
            hasChevron={false}
            // Add logout logic here
          />
        </div>

        {/* FOOTER */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <SocialLink icon={Instagram} />
            <SocialLink icon={Twitter} />
            <SocialLink icon={Linkedin} />
            <SocialLink icon={Youtube} />
          </div>
          
          <div className="text-center space-y-1">
             <p className="text-xs font-medium text-zinc-400 dark:text-zinc-600">
               Painter's Diary v2.4.0
             </p>
          </div>
        </div>

      </div>

      {/* --- LANGUAGE MODAL OVERLAY --- */}
      {isLangModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsLangModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="
            relative w-full max-w-sm bg-white dark:bg-zinc-900 
            rounded-t-2xl sm:rounded-2xl 
            overflow-hidden shadow-2xl transform transition-all
            flex flex-col max-h-[80vh]
          ">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="font-bold text-zinc-900 dark:text-white">Select Language</h3>
              <button 
                onClick={() => setIsLangModalOpen(false)}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Language List */}
            <div className="overflow-y-auto p-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.name);
                    setIsLangModalOpen(false);
                  }}
                  className="
                    w-full flex items-center justify-between p-4 rounded-xl
                    hover:bg-zinc-50 dark:hover:bg-zinc-800 
                    transition-colors text-left group
                  "
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-zinc-900 dark:text-white">{lang.name}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{lang.native}</span>
                  </div>
                  
                  {/* Show Checkmark if Selected */}
                  {language === lang.name && (
                    <Check size={18} className="text-blue-600 dark:text-blue-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// --- Helper: Social Link ---
const SocialLink = ({ icon: Icon }) => (
  <button className="
    p-3 rounded-full
    bg-zinc-100 dark:bg-zinc-900
    text-zinc-400 dark:text-zinc-500
    hover:bg-black hover:text-white
    dark:hover:bg-white dark:hover:text-black
    transition-all duration-300
  ">
    <Icon size={20} strokeWidth={2} />
  </button>
);

export default SettingsPage;