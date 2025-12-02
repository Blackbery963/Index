import React, { useState, useRef, useEffect } from 'react';
import Header from './DiaryComonents/Header';
import Sidebar from './DiaryComonents/Sidebar';
import Editor from './DiaryComonents/Editor';
import Dashboard from './DiaryComonents/Dashboard';
import entryService from './AppwriteService/entryService';
import authService from './AppwriteService/authService';

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import {
  Sparkles, Send, Image as ImageIcon, Hash, Maximize2, Minimize2, BookOpen,
  Lightbulb, Zap, Coffee, MapPin, Cloud, Eye, EyeOff, Plus, X, CheckCircle2,
  Heart, Smile, Camera, Wand2, CloudSun, ChevronDown, ChevronUp, MessageCircle,
  Bot, Save, Loader2, ToggleLeft, ToggleRight, Wind, SmileIcon, Sun, Flower,
  Star, PenTool, Sprout, Rocket, Feather, Flower2
} from 'lucide-react';

import { MdAutoFixHigh, MdOutlineEmojiEmotions } from "react-icons/md";
import { RiMenuSearchLine } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi2";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { TbPhotoStar } from "react-icons/tb";
import { RiPenNibLine } from "react-icons/ri";

const CreationStudio = () => {
  // State
  const [activeMode, setActiveMode] = useState('journal');
  const [zenMode, setZenMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [aiDropdownOpen, setAiDropdownOpen] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');
  const [emotion, setEmotion] = useState('neutral');
  const [images, setImages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Config
  const emotions = [
    { id: 'happy', icon: <Sun className="w-4 h-4" />, label: 'Joyful', color: 'bg-yellow-100 border-yellow-300' },
    { id: 'calm', icon: <Flower className="w-4 h-4" />, label: 'Peaceful', color: 'bg-blue-100 border-blue-300' },
    { id: 'inspired', icon: <Zap className="w-4 h-4" />, label: 'Inspired', color: 'bg-purple-100 border-purple-300' },
    { id: 'grateful', icon: <Star className="w-4 h-4" />, label: 'Grateful', color: 'bg-green-100 border-green-300' }
  ];

  const entryTypes = [
    { id: 'journal', icon: <BsFillJournalBookmarkFill />, title: 'Journal', desc: 'Daily Reflection', color: 'from-blue-400 to-cyan-400' },
    { id: 'idea', icon: <TbPhotoStar />, title: 'Spark Idea', desc: 'Quick Thought', color: 'from-green-400 to-emerald-400' },
    { id: 'story', icon: <RiPenNibLine />, title: 'Story', desc: 'Creative Writing', color: 'from-purple-400 to-pink-400' }
  ];

  const weatherOptions = ['☀️ Sunny', '⛅ Cloudy', '🌧️ Rainy', '🌙 Clear', '💨 Windy', '🌈 Rainbow'];

  const aiEnhancements = [
    { type: 'grammar', icon:<MdAutoFixHigh />, label: 'Fix Grammar', desc: 'Polish text' },
    { type: 'expand', icon:<RiMenuSearchLine />, label: 'Expand', desc: 'Add depth' },
    { type: 'emotional', icon:<MdOutlineEmojiEmotions />, label: 'Add Emotion', desc: 'More feeling' },
    { type: 'creative', icon:<HiOutlineSparkles />, label: 'Creative', desc: 'Artistic style' }
  ];

  const tips = [
    { icon: <Feather className="w-5 h-5" />, text: "Start with one honest sentence...", quote: "Your words are seeds—plant them without fear." },
    { icon: <Sprout className="w-5 h-5" />, text: "Write for your future self...", quote: "Journaling turns 'what if' into 'what is'." },
    { icon: <Sparkles className="w-5 h-5" />, text: "Embrace the mess. First drafts are sketches...", quote: "Creativity blooms in the soil of imperfection." },
    { icon: <Flower2 className="w-5 h-5" />, text: "Pause and breathe. Let silence invite...", quote: "In quiet writing, your soul whispers loudest." },
    { icon: <Heart className="w-5 h-5" />, text: "End with gratitude. One thankful line...", quote: "Every entry is a step toward your boldest story." }
  ];

  // Effects
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (currentUser) loadDraft();
  }, [currentUser]);

  useEffect(() => {
    if (!autoSave || !content || !currentUser) return;
    const timer = setTimeout(async () => {
      setIsSaving(true);
      try {
        await entryService.saveDraft(currentUser.$id, {
          title, content, type: activeMode, emotion, location, weather,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          images: images.map(img => img.url)
        });
        toast.success("Draft saved!");
      } catch (error) {
        toast.error("Auto-save failed.");
      }
      setIsSaving(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [content, autoSave, currentUser]);

  useEffect(() => {
    const interval = setInterval(() =>
      setCurrentTipIndex(prev => (prev + 1) % tips.length)
    , 10000);
    return () => clearInterval(interval);
  }, []);

  // Auth
  const checkAuth = async () => {
    try {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    } catch {
      toast.error("You are not logged in.");
    }
  };

  // Load Draft
  const loadDraft = async () => {
    try {
      const draft = await entryService.loadDraft(currentUser.$id);
      if (draft) {
        setTitle(draft.title || "");
        setContent(draft.content || "");
        setTags(draft.tags?.join(", ") || "");
        setActiveMode(draft.type || "journal");
        setEmotion(draft.emotion || "neutral");
        setLocation(draft.location || "");
        setWeather(draft.weather || "");
        setImages(draft.images?.map(url => ({
          id: Math.random().toString(),
          url
        })) || []);

        toast.info("Draft loaded!");
      }
    } catch {
      toast.error("Failed to load draft.");
    }
  };

  // AI Enhance
  const handleAIEnhance = async (enhancementType) => {
    if (!content.trim()) {
      toast.error("Add some text first!");
      return;
    }
    setIsThinking(true);
    try {
      const enhanced = await mockGeminiAI.enhanceText(content, { type: enhancementType });
      setContent(enhanced);
      toast.success("Text enhanced!");
    } catch {
      toast.error("AI enhancement failed.");
    }
    setIsThinking(false);
  };

  // Image Upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 5) {
      toast.error("You can upload a maximum of 5 images!");
      return;
    }

    const newImages = [];

    for (const file of files) {
      try {
        const uploadedFile = await entryService.uploadImage(file);
        const previewUrl = entryService.getImagePreview(uploadedFile.$id);

        newImages.push({
          id: uploadedFile.$id,
          url: previewUrl,
          fileId: uploadedFile.$id
        });

        toast.success("Image uploaded!");
      } catch {
        toast.error("Image upload failed.");
      }
    }

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  // Publish
  const handlePublish = async () => {
    if (!currentUser) {
      toast.error("Please login to publish");
      return;
    }
    if (!content.trim()) {
      toast.error("Content is empty!");
      return;
    }

    setIsCreating(true);

    try {
      await entryService.createEntry(currentUser.$id, {
        title, content, type: activeMode, emotion, location, weather,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        images,
        isPublished: true
      });

      toast.success("Entry published!");

      // Reset
      setTitle("");
      setContent("");
      setTags("");
      setImages([]);
      setShowPreview(false);

      localStorage.removeItem(`draft_${currentUser.$id}`);
    } catch {
      toast.error("Failed to publish entry.");
    } finally {
      setIsCreating(false);
    }
  };

  const startNewCreation = () => {
    setIsCreating(true);
    toast.info("Starting a new creation!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 to-amber-50 dark:from-[#000705] dark:to-slate-900 text-slate-800 dark:text-slate-100">

      <Header
        isCreating={isCreating}
        startNewCreation={startNewCreation}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 flex flex-col p-2 sm:p-4 max-w-7xl mx-auto w-full">

        {isCreating ? (
          <div className="flex flex-col flex-1 rounded-xl border shadow-xl overflow-hidden bg-white/90 dark:bg-[#000705]/50 border-rose-200 dark:border-slate-800 backdrop-blur-sm">

            <div className="flex flex-1 overflow-hidden">
              <Sidebar
                activeMode={activeMode}
                setActiveMode={setActiveMode}
                emotion={emotion}
                setEmotion={setEmotion}
                location={location}
                setLocation={setLocation}
                weather={weather}
                setWeather={setWeather}
                weatherOptions={weatherOptions}
                emotions={emotions}
                entryTypes={entryTypes}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                aiDropdownOpen={aiDropdownOpen}
                setAiDropdownOpen={setAiDropdownOpen}
                handleAIEnhance={handleAIEnhance}
                isThinking={isThinking}
                tips={tips}
                currentTipIndex={currentTipIndex}
                aiEnhancements={aiEnhancements}
              />

              <Editor
                showPreview={showPreview}
                setShowPreview={setShowPreview}
                zenMode={zenMode}
                setZenMode={setZenMode}
                autoSave={autoSave}
                setAutoSave={setAutoSave}
                isSaving={isSaving}
                title={title}
                setTitle={setTitle}
                images={images}
                handleImageUpload={handleImageUpload}
                removeImage={removeImage}
                content={content}
                setContent={setContent}
                activeMode={activeMode}
                isThinking={isThinking}
                handleAIEnhance={handleAIEnhance}
                tags={tags}
                setTags={setTags}
                handlePublish={handlePublish}
                isCreating={isCreating}
                fileInputRef={fileInputRef}
              />

            </div>
          </div>
        ) : (
          <Dashboard startNewCreation={startNewCreation} />
        )}
      </main>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={2200}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

    </div>
  );
};

// Mock AI
const mockGeminiAI = {
  async enhanceText(text, context) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const enhancements = {
          grammar: `Improved: ${text.charAt(0).toUpperCase() + text.slice(1)}.`,
          expand: `${text}\n\nAdding more depth to your thoughts...`,
          emotional: `${text}\n\nThis moment holds deep meaning and emotion.`,
          creative: `${text}\n\nA breeze of imagination flows through this idea...`
        };
        resolve(enhancements[context.type] || text);
      }, 1200);
    });
  }
};

export default CreationStudio;
