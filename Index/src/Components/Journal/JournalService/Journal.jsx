import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Loader2, MoreHorizontal, User } from "lucide-react";
import JournalSidebar from "./JournalComponents/JournalSidebar";
import DiaryCard from "./JournalComponents/DiaryCard";
import EmptyState from "./JournalComponents/EmptyState";
import JournalHeader from "./JournalComponents/JournalHeader";
import diaryService from "./diaryService"
import authService from '../DiaryService/AppwriteService/authService'
import { account } from "../../../appwriteConfig";

function JournalGateway() {
  const [activeTab, setActiveTab] = useState("explore");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [diaries, setDiaries] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [user, setUser] = useState(null)

  useEffect(() => {
    account.get()
      .then((res) => setUser(res))
      .catch(() => setUser(null));
  }, []);

  // --- 1. Auth & Initial Load ---
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    fetchDiaries();
  }, [activeTab, currentUser]);

  // --- 2. Search Effect ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        handleSearch(searchQuery);
      } else if (searchQuery.trim() === "") {
        setSearchResults([]);
        if (!isLoading) fetchDiaries(); // Reload grid when search cleared
      }
    }, 500); // 500ms debounce
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // --- 3. Logic Functions ---
  const checkAuth = async () => {
    try {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    } catch {
      console.log('No user logged in');
    }
  };

  const fetchDiaries = async () => {
    setIsLoading(true);
    try {
      let data = [];
      if (activeTab === "explore") {
        const res = await diaryService.getCommunityDiaries(50);
        data = res.documents;
      } else if (activeTab === "my_journals" && currentUser) {
        const res = await diaryService.getUserDiaries(currentUser.$id, 50);
        data = res.documents;
      }
      setDiaries(transformData(data));
    } catch (error) {
      console.error(error);
      toast.error('Could not load journals');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setIsSearching(true);
    try {
      const res = await diaryService.searchDiaries(query, 20);
      setSearchResults(transformData(res.documents));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLike = async (diaryId, isCurrentlyLiked) => {
    if (!currentUser) return toast.error('Login to like');
    try {
      await diaryService.toggleLike(diaryId, currentUser.$id);
      // Optimistic Update
      const updateList = (list) => list.map(d => 
        d.id === diaryId ? { ...d, likes: isCurrentlyLiked ? d.likes - 1 : d.likes + 1, isLiked: !isCurrentlyLiked } : d
      );
      setDiaries(updateList(diaries));
      setSearchResults(updateList(searchResults));
    } catch {
      toast.error('Failed to like');
    }
  };

  // In JournalGateway.jsx, update the transformData function:
  const transformData = (docs) => docs.map(doc => {
  // Determine images array
  let images = [];
  if (doc.images && doc.images.length > 0) {
    images = doc.images;
  }

  // Get the actual diary author (from the diary document)
  // This should be stored when creating the diary
  const diaryAuthor = doc.username || doc.authorName || "Anonymous";

  return {
    id: doc.$id,
    title: doc.title || "Untitled",
    snippet: doc.content || "",
    author: diaryAuthor, // Use the actual diary author from database
    date: new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    images: images, 
    likes: doc.likeCount || 0,
    tags: doc.tags || [],
    isLiked: currentUser && doc.likedBy?.includes(currentUser.$id),
    userId: doc.userId,
    location: doc.location,
    weather: doc.weather
  };
  });

  const displayData = (searchQuery.trim() && searchResults.length > 0) ? searchResults : diaries;

  // --- 4. Render ---
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans selection:bg-emerald-500/30">
      
      <JournalHeader 
        currentUser={currentUser}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        showSearch={showSearch} setShowSearch={setShowSearch}
        isSearching={isSearching}
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        
        <JournalSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          currentUser={currentUser} 
          diaries={diaries} 
        />

        <main className="flex-1 py-4 px-1 lg:p-8 min-h-[calc(100vh-4rem)]">
          {/* Section Title */}
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold tracking-tight">
                {searchQuery ? `Results for "${searchQuery}"` : (activeTab === "explore" ? "Community Gallery" : "Your Collection")}
              </h2>
              <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1">
                {searchQuery ? `${displayData.length} found` : (activeTab === "explore" ? "Curated stories." : "Your personal archive.")}
              </p>
            </div>
            {isLoading && <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />}
          </div>

          {/* Grid Content */}
          <AnimatePresence mode="wait">
            {!isLoading && displayData.length === 0 ? (
              activeTab === "my_journals" && !currentUser ? (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl">
                   <p className="text-slate-500 mb-4">Please log in to view your collection.</p>
                   <Link to="/login" className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium">Login</Link>
                </div>
              ) : (
                <EmptyState isSearch={!!searchQuery} onClear={() => setSearchQuery("")} />
              )
            ) : (
              <motion.div 
                key={activeTab + searchQuery}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {displayData.map((diary) => (
                  <DiaryCard 
                    key={diary.id} 
                    diary={diary} 
                    user={user}
                    currentUser={currentUser} 
                    onLike={handleLike} 
                  
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default JournalGateway;

