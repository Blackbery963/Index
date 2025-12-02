// pages/DiaryView.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Eye, Calendar, MapPin, Cloud, User, Tag } from 'lucide-react';
import diaryService from '@/services/diaryService';
import authService from '@/services/authService';
import toast from 'react-hot-toast';

const DiaryView = () => {
  const { id } = useParams();
  const [diary, setDiary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchDiary();
    checkAuth();
  }, [id]);

  const checkAuth = async () => {
    try {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.log('No user logged in');
    }
  };

  const fetchDiary = async () => {
    setIsLoading(true);
    try {
      const data = await diaryService.getDiaryById(id);
      setDiary(data);
      // Increment view count
      await diaryService.incrementViewCount(id);
    } catch (error) {
      console.error('Error fetching diary:', error);
      toast.error('Failed to load diary');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!currentUser) {
      toast.error('Please log in to like');
      return;
    }
    
    try {
      await diaryService.toggleLike(id, currentUser.$id);
      fetchDiary(); // Refresh data
      toast.success(diary?.isLiked ? 'Unliked' : 'Liked!');
    } catch (error) {
      console.error('Like error:', error);
      toast.error('Failed to update like');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!diary) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100 mb-2">Diary Not Found</h2>
          <Link to="/journals" className="text-emerald-600 hover:text-emerald-700">
            ← Back to Journals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/journals" className="flex items-center gap-2 text-slate-600 dark:text-zinc-400 hover:text-emerald-600">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1 ${diary.isLiked ? 'text-rose-500' : 'text-slate-400'}`}
            >
              <Heart className={`w-5 h-5 ${diary.isLiked ? 'fill-rose-500' : ''}`} />
              <span>{diary.likeCount || 0}</span>
            </button>
            <div className="flex items-center gap-1 text-slate-400">
              <Eye className="w-5 h-5" />
              <span>{diary.viewCount || 0}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <article className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-lg">
          {/* Images */}
          {diary.images && diary.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
              {diary.images.map((img, index) => {
                const imageData = JSON.parse(img);
                return (
                  <img 
                    key={index}
                    src={imageData.url}
                    alt={`${diary.title} - ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                );
              })}
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-slate-500 dark:text-zinc-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(diary.createdAt).toLocaleDateString()}</span>
              </div>
              
              {diary.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{diary.location}</span>
                </div>
              )}
              
              {diary.weather && (
                <div className="flex items-center gap-1">
                  <Cloud className="w-4 h-4" />
                  <span>{diary.weather}</span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{diary.authorName || 'Anonymous'}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-zinc-100 mb-4">
              {diary.title || 'Untitled Entry'}
            </h1>

            {/* Tags */}
            {diary.tags && diary.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {diary.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-zinc-300">
                {diary.content}
              </div>
            </div>

            {/* Emotion & Type */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-zinc-800">
              <div className="flex flex-wrap gap-4">
                {diary.emotion && diary.emotion !== 'neutral' && (
                  <div>
                    <span className="text-xs text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Mood</span>
                    <p className="font-medium text-slate-700 dark:text-zinc-300">{diary.emotion}</p>
                  </div>
                )}
                
                <div>
                  <span className="text-xs text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Type</span>
                  <p className="font-medium text-slate-700 dark:text-zinc-300 capitalize">{diary.type}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default DiaryView;