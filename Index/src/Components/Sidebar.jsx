import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiBook,
  FiUsers,
  FiShoppingBag,
  FiSearch,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
  FiSettings,
  FiMenu,
  FiHelpCircle,
  FiInfo,
  FiShield,
  FiFileText,
} from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";
import { MdOutlineBook, MdOutlineExplore, MdOutlineMoreVert} from "react-icons/md";
import { CiGrid42 } from "react-icons/ci";
import { IoMdGlobe } from "react-icons/io";
import { TbCategory2 } from "react-icons/tb";

const StickyNav = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // Track current page
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("gallery")) setActiveItem("gallery");
    else if (path.includes("category")) setActiveItem("categories");
    else if (path.includes("journal")) setActiveItem("diary");
    else if (path.includes("community")) setActiveItem("community");
    else if (path.includes("artstore")) setActiveItem("artstore");
    else if (path.includes("favourite")) setActiveItem("favorites");
    else if (path.includes("moments") || path.includes("videos")) setActiveItem("moments");
    else if (path.includes("about")) setActiveItem("about");
    else if (path.includes("help")) setActiveItem("help");
    else if (path.includes("privacy")) setActiveItem("privacy");
    else if (path.includes("terms")) setActiveItem("terms");
    else setActiveItem("explore");
  }, [location]);

  // Stick when reaching hero bottom
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 80;
      const heroHeight = window.innerHeight;
      const scrollPos = window.scrollY;
      setIsSticky(scrollPos > heroHeight - headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-collapse on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMoreMenu && !event.target.closest('.more-menu-container')) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMoreMenu]);

  // Main navigation items (most important - always visible)
  const mainNavItems = [
    { id: "explore", label: "Explore", icon: MdOutlineExplore, path: "/" },
    { id: "gallery", label: "Gallery", icon: CiGrid42, path: "/gallery" },
    { id: "moments", label: "Moments", icon: IoSparklesOutline, path: "/videos" },
    { id: "diary", label: "Diary", icon: MdOutlineBook, path: "/journal" },
    { id: "community", label: "Community", icon: FiUsers, path: "/community" },
  ];

  // Additional features for more menu
  const featureItems = [
    { id: "categories", label: "Categories", icon: TbCategory2, path: "/category" },
    { id: "artstore", label: "Art Store", icon: FiShoppingBag, path: "/Arteva/Artstore" },
    { id: "favorites", label: "Favorites", icon: FiHeart, path: "/favourite" },
  ];

  // Legal & support items for more menu
  const supportItems = [
    { id: "about", label: "About", icon: FiInfo, path: "/About" },
    { id: "help", label: "Help & Support", icon: FiHelpCircle, path: "/Resources/Help" },
    { id: "privacy", label: "Privacy Policy", icon: FiShield, path: "/Legal/Privacy_Policy" },
    { id: "terms", label: "Terms & Conditions", icon: FiFileText, path: "/Legal/Terms_Conditions" },
  ];

  return (
    <>
      {/* Desktop/Tablet Sidebar */}
      <aside
        className={`hidden sm:block fixed top-[90px] xl:left-[15px] left-[0px] md:left-[7px] h-[calc(100vh-80px)] z-40 transition-all rounded-lg duration-500 ease-in-out scrollbar-hidden ${
          isSticky ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        } ${isCollapsed ? "w-16" : "w-64"}`}
      >
        <div className="h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/30 dark:border-gray-700/30 rounded-lg">
          {/* Header with controls */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200/30 dark:border-gray-700/30">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Navigation
              </h2>
            )}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <FiChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <FiChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col p-2 space-y-1 more-menu-container">
            {mainNavItems.map((item) => (
              <NavItem 
                key={item.id}
                item={item}
                activeItem={activeItem}
                isCollapsed={isCollapsed}
                onClick={() => setActiveItem(item.id)}
              />
            ))}
            
            {/* More Features Button with Unique Popup */}
            <div className="relative more-menu-container">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className={`group relative flex items-center rounded-xl transition-all duration-200 w-full hide-scrollbar ${
                  isCollapsed ? "p-3 justify-center" : "px-4 py-3"
                } ${
                  showMoreMenu 
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/30"
                }`}
              >
                <FiSettings className={`transition-all duration-200 ${
                  isCollapsed ? "w-5 h-5" : "w-5 h-5 mr-3"
                } ${showMoreMenu ? "scale-110" : "group-hover:scale-105"}`} />
                {!isCollapsed && (
                  <span className="font-medium text-sm truncate">More</span>
                )}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hide-scrollbar">
                    More Features
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900 dark:border-r-gray-100" />
                  </div>
                )}
              </button>

              {/* Unique Popup for Desktop */}
              {showMoreMenu && (
                <div className={`absolute ${
                  isCollapsed ? "left-full ml-2 top-0" : "left-0 right-0 top-full mt-2 hide-scrollbar"
                } bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 min-w-[240px] overflow-hidden`}>
                  {/* Popup Header */}
                  <div className="p-4 border-b border-gray-200/30 dark:border-gray-700/30">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                      More Features & Settings
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Additional tools and resources
                    </p>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {/* Features Section */}
                    <div className="p-3">
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-2">
                        Features
                      </h4>
                      <div className="space-y-1">
                        {featureItems.map((item) => (
                          <NavItem 
                            key={item.id}
                            item={item}
                            activeItem={activeItem}
                            isCollapsed={false}
                            onClick={() => {
                              setActiveItem(item.id);
                              setShowMoreMenu(false);
                            }}
                            isPopup={true}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Support & Legal Section */}
                    <div className="p-3 border-t border-gray-200/30 dark:border-gray-700/30">
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-2">
                        Support & Legal
                      </h4>
                      <div className="space-y-1">
                        {supportItems.map((item) => (
                          <NavItem 
                            key={item.id}
                            item={item}
                            activeItem={activeItem}
                            isCollapsed={false}
                            onClick={() => {
                              setActiveItem(item.id);
                              setShowMoreMenu(false);
                            }}
                            isPopup={true}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="sm:hidden fixed bottom-1 left-1/2 -translate-x-1/2 h-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 z-50 rounded-lg shadow-lg w-[98%] max-w-md more-menu-container">
        <div className="flex justify-around items-center h-full px-2">
          {mainNavItems.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setActiveItem(item.id)}
              className={`group relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 flex-1 ${
                activeItem === item.id
                  ? "text-blue-600 dark:text-blue-400 scale-105"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:scale-105"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              aria-label={item.label}
            >
              <item.icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              <span className="text-xs font-medium text-center truncate w-full mt-1">{item.label}</span>
              
              {/* Active indicator */}
              {activeItem === item.id && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-blue-600 dark:bg-blue-400 rounded-b-full" />
              )}
            </Link>
          ))}
          
          {/* More button for mobile */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 flex-1 ${
              showMoreMenu
                ? "text-blue-600 dark:text-blue-400 scale-105"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:scale-105"
            }`}
          >
            <MdOutlineMoreVert className="w-5 h-5" />
            <span className="text-xs font-medium text-center truncate w-full mt-1">More</span>
          </button>
        </div>

        {/* Mobile More Menu Popup */}
        {showMoreMenu && (
          <div className="absolute bottom-full left-2 right-2 mb-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 max-h-80 overflow-y-auto">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
              More Features
            </h3>
            
            {/* Remaining main nav items */}
            {mainNavItems.slice(4).map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  setActiveItem(item.id);
                  setShowMoreMenu(false);
                }}
                className={`flex items-center p-3 rounded-lg transition-colors text-sm mb-1 ${
                  activeItem === item.id
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            ))}

            {/* Feature items */}
            <div className="border-t border-gray-200/30 dark:border-gray-700/30 mt-2 pt-2">
              {featureItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => {
                    setActiveItem(item.id);
                    setShowMoreMenu(false);
                  }}
                  className={`flex items-center p-3 rounded-lg transition-colors text-sm mb-1 ${
                    activeItem === item.id
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Support items */}
            <div className="border-t border-gray-200/30 dark:border-gray-700/30 mt-2 pt-2">
              {supportItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => {
                    setActiveItem(item.id);
                    setShowMoreMenu(false);
                  }}
                  className={`flex items-center p-3 rounded-lg transition-colors text-sm mb-1 ${
                    activeItem === item.id
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop for mobile popup */}
      {showMoreMenu && (
        <div 
          className="sm:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setShowMoreMenu(false)}
        />
      )}
    </>
  );
};

// Reusable NavItem component
const NavItem = ({ item, activeItem, isCollapsed, onClick, isPopup = false }) => (
  <Link
    to={item.path}
    onClick={onClick}
    className={`group relative flex items-center rounded-xl transition-all duration-200 ${
      isCollapsed && !isPopup ? "p-3 justify-center" : "px-4 py-3"
    } ${
      activeItem === item.id
        ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/30"
    } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0`}
    title={isCollapsed && !isPopup ? item.label : undefined}
  >
    <item.icon
      className={`transition-all duration-200 ${
        isCollapsed && !isPopup ? "w-5 h-5" : "w-5 h-5 mr-3"
      } ${
        activeItem === item.id ? "scale-110" : "group-hover:scale-105"
      }`}
    />
    {(!isCollapsed || isPopup) && (
      <span className="font-medium text-sm truncate">{item.label}</span>
    )}
    
    {/* Active indicator */}
    {activeItem === item.id && !isPopup && (
      <div
        className={`absolute bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-200 ${
          isCollapsed
            ? "top-1 right-1 w-2 h-2"
            : "left-1 top-1/2 -translate-y-1/2 w-1 h-6"
        }`}
      />
    )}

    {/* Tooltip for collapsed state */}
    {isCollapsed && !isPopup && (
      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
        {item.label}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900 dark:border-r-gray-100" />
      </div>
    )}
  </Link>
);

export default StickyNav;                                                                                 