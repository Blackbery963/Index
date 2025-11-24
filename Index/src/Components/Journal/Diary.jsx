import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Plus,
  Bookmark,
  Palette,
  Smile,
  Image,
  MapPin,
  Hash,
  Type,
  Clock,
  Calendar,
  Trash2,
  Save,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Diary() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'read', 'write'
  const [customization, setCustomization] = useState({
    mood: '😊',
    weather: '☀️',
    location: '',
    tags: [],
    color: 'amber',
    font: 'serif'
  });

  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    ...customization
  });

  const moods = ['😊', '😢', '😡', '😴', '🤩', '😍', '🤔', '😎', '🥳', '🙏'];
  const weathers = ['☀️', '🌧️', '⛅', '❄️', '🌪️', '🌈', '🌙', '⭐'];
  const colors = [
    { name: 'amber', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900' },
    { name: 'blue', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900' },
    { name: 'rose', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-900' },
    { name: 'emerald', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-900' },
    { name: 'purple', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-900' }
  ];

  const fonts = [
    { name: 'serif', class: 'font-serif' },
    { name: 'handwriting', class: 'font-handwriting' },
    { name: 'modern', class: 'font-sans' }
  ];

  // Load entries
  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) setEntries(JSON.parse(savedEntries));
  }, []);

  // Save entries
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const handleCreateEntry = () => {
    if (newEntry.content.trim()) {
      const entry = {
        id: Date.now(),
        title: newEntry.title || 'Untitled',
        content: newEntry.content,
        date: new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        time: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        ...newEntry,
        bookmark: false
      };
      
      setEntries([entry, ...entries]);
      resetNewEntry();
      setView('read');
      setSelectedEntry(entry);
    }
  };

  const resetNewEntry = () => {
    setNewEntry({
      title: '',
      content: '',
      ...customization
    });
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
    if (selectedEntry && selectedEntry.id === id) {
      setView('list');
      setSelectedEntry(null);
    }
  };

  const toggleBookmark = (id) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, bookmark: !entry.bookmark } : entry
    ));
  };

  const addTag = (tag) => {
    if (tag.trim() && !newEntry.tags.includes(tag.trim())) {
      setNewEntry({
        ...newEntry,
        tags: [...newEntry.tags, tag.trim()]
      });
    }
  };

  const removeTag = (tagToRemove) => {
    setNewEntry({
      ...newEntry,
      tags: newEntry.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const getColorClass = (colorName) => {
    return colors.find(c => c.name === colorName) || colors[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/journal">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="text-gray-600 dark:text-gray-400" size={20} />
                </motion.button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Diary
              </h1>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setView('write');
                setSelectedEntry(null);
                resetNewEntry();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Plus size={18} />
              <span>New Entry</span>
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* List View */}
          {view === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {entries.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="text-6xl mb-4">📖</div>
                  <h3 className="text-xl text-gray-600 dark:text-gray-400">
                    No entries yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500 mt-2">
                    Start writing your first story
                  </p>
                </div>
              ) : (
                entries.map((entry) => {
                  const colorClass = getColorClass(entry.color);
                  return (
                    <motion.div
                      key={entry.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`${colorClass.bg} ${colorClass.border} rounded-2xl border-2 p-6 cursor-pointer hover:shadow-lg transition-all`}
                      onClick={() => {
                        setSelectedEntry(entry);
                        setView('read');
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{entry.mood}</span>
                          <span className="text-lg">{entry.weather}</span>
                        </div>
                        {entry.bookmark && (
                          <Bookmark className="text-yellow-500" size={16} fill="currentColor" />
                        )}
                      </div>

                      <h3 className={`${colorClass.text} font-semibold text-lg mb-2 line-clamp-1`}>
                        {entry.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                        {entry.content}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {entry.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-black/10 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div>{entry.date}</div>
                        {entry.location && (
                          <div className="flex items-center gap-1">
                            <MapPin size={10} />
                            {entry.location}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          )}

          {/* Read View */}
          {view === 'read' && selectedEntry && (
            <motion.div
              key="read"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              {(() => {
                const colorClass = getColorClass(selectedEntry.color);
                const fontClass = fonts.find(f => f.name === selectedEntry.font)?.class || 'font-serif';
                
                return (
                  <div className={`${colorClass.bg} ${colorClass.border} rounded-3xl border-2 p-8`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{selectedEntry.mood}</span>
                        <span className="text-2xl">{selectedEntry.weather}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleBookmark(selectedEntry.id)}
                          className="p-2 hover:bg-black/10 rounded-lg"
                        >
                          <Bookmark 
                            size={20} 
                            className={selectedEntry.bookmark ? "text-yellow-500 fill-current" : "text-gray-400"} 
                          />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteEntry(selectedEntry.id)}
                          className="p-2 hover:bg-red-100 rounded-lg text-red-500"
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h1 className={`${colorClass.text} ${fontClass} text-4xl font-bold mb-2`}>
                        {selectedEntry.title}
                      </h1>
                      
                      <div className="flex items-center gap-4 text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {selectedEntry.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          {selectedEntry.time}
                        </div>
                        {selectedEntry.location && (
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            {selectedEntry.location}
                          </div>
                        )}
                      </div>

                      {selectedEntry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {selectedEntry.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-black/20 rounded-full text-sm">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className={`${fontClass} text-lg leading-relaxed text-gray-700 whitespace-pre-wrap mb-8`}>
                      {selectedEntry.content}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setView('list')}
                      className="px-6 py-2 border-2 border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Back to Diary
                    </motion.button>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* Write View */}
          {view === 'write' && (
            <motion.div
              key="write"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-4xl mx-auto"
            >
              {(() => {
                const colorClass = getColorClass(newEntry.color);
                const fontClass = fonts.find(f => f.name === newEntry.font)?.class || 'font-serif';
                
                return (
                  <div className={`${colorClass.bg} ${colorClass.border} rounded-3xl border-2 p-8`}>
                    {/* Customization Bar */}
                    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white/50 rounded-xl">
                      {/* Mood Selector */}
                      <div className="flex items-center gap-2">
                        <Smile size={20} className="text-gray-600" />
                        <div className="flex gap-1">
                          {moods.map(mood => (
                            <motion.button
                              key={mood}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setNewEntry({ ...newEntry, mood })}
                              className={`text-2xl p-1 rounded-lg ${newEntry.mood === mood ? 'bg-black/20' : 'hover:bg-black/10'}`}
                            >
                              {mood}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Weather Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🌤️</span>
                        <div className="flex gap-1">
                          {weathers.map(weather => (
                            <motion.button
                              key={weather}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setNewEntry({ ...newEntry, weather })}
                              className={`text-xl p-1 rounded-lg ${newEntry.weather === weather ? 'bg-black/20' : 'hover:bg-black/10'}`}
                            >
                              {weather}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Color Selector */}
                      <div className="flex items-center gap-2">
                        <Palette size={20} className="text-gray-600" />
                        <div className="flex gap-1">
                          {colors.map(color => (
                            <motion.button
                              key={color.name}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setNewEntry({ ...newEntry, color: color.name })}
                              className={`w-6 h-6 rounded-full ${color.bg} border-2 ${newEntry.color === color.name ? 'border-gray-600' : 'border-transparent'}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Font Selector */}
                      <div className="flex items-center gap-2">
                        <Type size={20} className="text-gray-600" />
                        <div className="flex gap-1">
                          {fonts.map(font => (
                            <motion.button
                              key={font.name}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setNewEntry({ ...newEntry, font: font.name })}
                              className={`px-2 py-1 rounded-lg text-sm ${font.class} ${newEntry.font === font.name ? 'bg-black/20' : 'hover:bg-black/10'}`}
                            >
                              Aa
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Location Input */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <MapPin size={16} />
                        <input
                          type="text"
                          placeholder="Add location..."
                          className="bg-transparent border-none placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-0"
                          value={newEntry.location}
                          onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Tags Input */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Hash size={16} />
                        <input
                          type="text"
                          placeholder="Add tags (press enter)..."
                          className="bg-transparent border-none placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-0"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addTag(e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {newEntry.tags.map((tag, index) => (
                          <motion.span
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="px-3 py-1 bg-black/20 rounded-full text-sm flex items-center gap-1"
                          >
                            #{tag}
                            <button
                              onClick={() => removeTag(tag)}
                              className="hover:text-red-500"
                            >
                              <X size={12} />
                            </button>
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Title Input */}
                    <input
                      type="text"
                      placeholder="Entry title..."
                      className={`w-full ${fontClass} text-3xl font-bold bg-transparent border-none placeholder-gray-400 ${colorClass.text} focus:outline-none focus:ring-0 mb-4`}
                      value={newEntry.title}
                      onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                    />

                    {/* Content Textarea */}
                    <textarea
                      placeholder="Start writing your story..."
                      className={`w-full h-96 ${fontClass} text-lg bg-transparent border-none placeholder-gray-400 text-gray-700 resize-none focus:outline-none focus:ring-0 leading-relaxed`}
                      value={newEntry.content}
                      onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                    />

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 mt-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCreateEntry}
                        disabled={!newEntry.content.trim()}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-semibold"
                      >
                        <Save size={18} />
                        Save Entry
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setView('list')}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Diary;