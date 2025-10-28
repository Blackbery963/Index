import React, { useState, useRef, useEffect } from "react";
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  PlusIcon,
  BookOpenIcon,
  HeartIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

const mockChronicles = [
  {
    id: 1,
    title: "Inkwell Dreams",
    author: "Calliope",
    avatar: "https://i.pravatar.cc/150?img=3",
    era: "Renaissance Reverie",
    coverImage: "https://picsum.photos/seed/inkwell/600/800",
    poeticTeaser: "Where quills dance upon parchment souls...",
    colorTheme: "from-amber-500 to-orange-600",
    likes: 178,
    isLiked: false
  },
  {
    id: 2,
    title: "Starlight's Promise",
    author: "Orion",
    avatar: "https://i.pravatar.cc/150?img=2",
    era: "Celestial Symphony",
    coverImage: "https://picsum.photos/seed/starlight/600/800",
    poeticTeaser: "Stars whisper secrets to wandering hearts...",
    colorTheme: "from-purple-500 to-indigo-600",
    likes: 512,
    isLiked: true
  },
  {
    id: 3,
    title: "The Whispering Woods",
    author: "Elara",
    avatar: "https://i.pravatar.cc/150?img=1",
    era: "Enchanted Grove",
    coverImage: "https://picsum.photos/seed/whisper/600/800",
    poeticTeaser: "Leaves murmur ancient lullabies...",
    colorTheme: "from-emerald-500 to-teal-600",
    likes: 234,
    isLiked: false
  },
  {
    id: 4,
    title: "Echoes of Atlantis",
    author: "Thalassa",
    avatar: "https://i.pravatar.cc/150?img=4",
    era: "Submerged Saga",
    coverImage: "https://picsum.photos/seed/atlantis/600/800",
    poeticTeaser: "Waves cradle lost civilizations' dreams...",
    colorTheme: "from-blue-500 to-cyan-600",
    likes: 421,
    isLiked: false
  },
  {
    id: 5,
    title: "Crimson Horizons",
    author: "Aurora",
    avatar: "https://i.pravatar.cc/150?img=5",
    era: "Dawn's Embrace",
    coverImage: "https://picsum.photos/seed/crimson/600/800",
    poeticTeaser: "Sunrise paints eternity's canvas...",
    colorTheme: "from-pink-500 to-red-600",
    likes: 189,
    isLiked: false
  },
  {
    id: 6,
    title: "Shadow's Waltz",
    author: "Nyx",
    avatar: "https://i.pravatar.cc/150?img=6",
    era: "Midnight Masquerade",
    coverImage: "https://picsum.photos/seed/shadow/600/800",
    poeticTeaser: "Darkness dances with forgotten light...",
    colorTheme: "from-gray-700 to-black",
    likes: 356,
    isLiked: true
  }
];

export default function EchoApp () {
  const [selectedChronicle, setSelectedChronicle] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [chronicles, setChronicles] = useState(mockChronicles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewerAnimation, setViewerAnimation] = useState('enter');
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 280;
    scrollRef.current.scrollBy({ 
      left: direction * scrollAmount, 
      behavior: 'smooth' 
    });
  };

  const openViewer = (chronicle, index) => {
    setSelectedChronicle(chronicle);
    setCurrentIndex(index);
    setViewerAnimation('enter');
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setViewerAnimation('exit');
    setTimeout(() => {
      setIsViewerOpen(false);
      setSelectedChronicle(null);
    }, 300);
  };

  const navigateViewer = (direction) => {
    setViewerAnimation('exit');
    
    setTimeout(() => {
      const newIndex = (currentIndex + direction + chronicles.length) % chronicles.length;
      setCurrentIndex(newIndex);
      setSelectedChronicle(chronicles[newIndex]);
      setViewerAnimation('enter');
    }, 200);
  };

  const openCreate = () => {
    setIsCreateOpen(true);
  };

  const closeCreate = () => {
    setIsCreateOpen(false);
  };

  const toggleLike = (chronicleId, e) => {
    e?.stopPropagation();
    setChronicles(prev => prev.map(chronicle => 
      chronicle.id === chronicleId 
        ? { 
            ...chronicle, 
            likes: chronicle.likes + (chronicle.isLiked ? -1 : 1), 
            isLiked: !chronicle.isLiked 
          }
        : chronicle
    ));
    
    if (selectedChronicle?.id === chronicleId) {
      setSelectedChronicle(prev => ({
        ...prev,
        likes: prev.likes + (prev.isLiked ? -1 : 1),
        isLiked: !prev.isLiked
      }));
    }
  };

  // Keyboard navigation for viewer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isViewerOpen) return;
      
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowLeft') navigateViewer(-1);
      if (e.key === 'ArrowRight') navigateViewer(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isViewerOpen, currentIndex]);

  return (
    <section className="bg-gray-100 dark:bg-[#000705] py-6 border-b border-gray-100 dark:border-gray-800 max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto px-4">
        {/* Single My Stories Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpenIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">My Stories</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              {chronicles.length} stories
            </span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Single Row Horizontal Scroll */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          >
            {/* Create New Card */}
            <div 
              onClick={openCreate}
              className="flex-shrink-0 w-40 h-56 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 group"
            >
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                <PlusIcon className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                New Story
              </p>
            </div>

            {/* Story Cards */}
            {chronicles.map((chronicle, index) => (
              <div
                key={chronicle.id}
                onClick={() => openViewer(chronicle, index)}
                className="flex-shrink-0 w-40 h-56 rounded-xl overflow-hidden cursor-pointer group relative shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <img
                  src={chronicle.coverImage}
                  alt={chronicle.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">
                    {chronicle.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-1">
                    {chronicle.era}
                  </p>
                </div>

                <button 
                  onClick={(e) => toggleLike(chronicle.id, e)}
                  className="absolute top-2 right-2 p-1.5 bg-black/40 rounded-full backdrop-blur-sm hover:bg-black/60 transition-all duration-200 transform hover:scale-110"
                >
                  {chronicle.isLiked ? (
                    <HeartSolid className="w-4 h-4 text-red-400" />
                  ) : (
                    <HeartIcon className="w-4 h-4 text-white" />
                  )}
                </button>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Story Viewer with Navigation */}
      {isViewerOpen && selectedChronicle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeViewer}
        >
          <div 
            className={`bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 ${
              viewerAnimation === 'enter' 
                ? 'scale-100 opacity-100' 
                : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Arrows */}
            <button
              onClick={() => navigateViewer(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigateViewer(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>

            <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex-1">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                  {selectedChronicle.era}
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white leading-tight">
                  {selectedChronicle.title}
                </h2>
              </div>
              <button
                onClick={closeViewer}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-110 ml-4"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedChronicle.avatar}
                  alt={selectedChronicle.author}
                  className="w-12 h-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{selectedChronicle.author}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Story Weaver</div>
                </div>
              </div>

              <div className="text-lg text-gray-700 dark:text-gray-300 mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 italic leading-relaxed">
                "{selectedChronicle.poeticTeaser}"
              </div>

              <div className="relative rounded-xl overflow-hidden mb-6 group">
                <img
                  src={selectedChronicle.coverImage}
                  alt={selectedChronicle.title}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="flex items-center justify-between">
                <button 
                  onClick={(e) => toggleLike(selectedChronicle.id, e)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                >
                  {selectedChronicle.isLiked ? (
                    <HeartSolid className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  )}
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {selectedChronicle.likes}
                  </span>
                </button>
                
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 transform shadow-lg hover:shadow-xl">
                  Continue Reading
                </button>
              </div>

              {/* Progress indicator */}
              <div className="flex justify-center mt-6">
                <div className="flex gap-1.5">
                  {chronicles.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-indigo-600 w-6' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Story Modal */}
      {isCreateOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeCreate}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full shadow-2xl transform transition-all duration-300 scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Create New Story</h2>
              <button
                onClick={closeCreate}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-110"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Story Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your story title"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Era
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Modern Fantasy, Ancient Myth"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Poetic Description
                  </label>
                  <textarea
                    placeholder="Weave your story's essence in poetic words..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-colors resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={closeCreate}
                    className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 transform">
                    Create Story
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}