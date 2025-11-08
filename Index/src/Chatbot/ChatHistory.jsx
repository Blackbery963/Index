
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2, Check, X, Info, Loader } from 'lucide-react';

const ChatHistory = ({ 
  chatHistory, 
  chatId, 
  loadChatFromHistory, 
  startNewChat, 
  deleteConfirm, 
  setDeleteConfirm, 
  showDeleteSuccess, 
  deleteLocalChat 
}) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (chatIdToDelete) => {
    setDeletingId(chatIdToDelete);
    try {
      await deleteLocalChat(chatIdToDelete);
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-bold text-gray-800 dark:text-gray-100 text-lg flex items-center gap-2">
          <History size={20} />
          Chat History
        </h4>
        <button
          onClick={startNewChat}
          className="text-sm bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl transition-colors shadow-sm font-medium flex items-center gap-2"
        >
          + New Chat
        </button>
      </div>

      {/* Delete Success Notification */}
      <AnimatePresence>
        {showDeleteSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-100/80 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-4 py-3 flex items-center justify-between rounded-xl mb-4 backdrop-blur-sm border border-green-200/50 dark:border-green-700/30"
          >
            <div className="flex items-center gap-2">
              <Check size={16} className="flex-shrink-0" />
              <span className="text-sm font-medium">Chat deleted successfully</span>
            </div>
            <button 
              onClick={() => setShowDeleteSuccess(false)}
              className="text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 p-1 rounded-full hover:bg-green-200/50 dark:hover:bg-green-700/30"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {chatHistory.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-white/70 dark:bg-gray-700/70 p-8 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm">
            <History className="text-gray-400 dark:text-gray-500 text-4xl mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg mb-2">No chat history yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">Start a conversation to see it here!</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {chatHistory.map(chat => (
            <div
              key={chat.$id}
              className={`p-4 rounded-2xl cursor-pointer transition-all flex justify-between items-center group backdrop-blur-sm border
                ${
                  chatId === chat.$id
                    ? 'bg-cyan-50/70 dark:bg-cyan-900/20 border-cyan-200/50 dark:border-cyan-700/30 shadow-md'
                    : 'bg-white/70 dark:bg-gray-700/70 hover:bg-gray-50/70 dark:hover:bg-gray-600/70 shadow-sm border-gray-200/50 dark:border-gray-600/50'
                }`}
            >
              <div 
                onClick={() => loadChatFromHistory(chat)} 
                className="flex-1 min-w-0"
              >
                <h5 className="font-semibold text-gray-800 dark:text-gray-100 truncate text-sm">
                  {chat.title}
                </h5>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(chat.$createdAt).toLocaleDateString()} • {chat.messageCount} messages
                </p>
              </div>
              <div className="flex items-center opacity-100  lg:group-hover:opacity-100 transition-opacity ml-2">
                {deletingId === chat.$id ? (
                  <Loader size={16} className="text-red-500 animate-spin" />
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(chat.$id);
                    }}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-100/50 dark:hover:bg-red-900/20 transition-colors"
                    aria-label="Delete chat"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <Info className="text-red-500" size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete Chat?</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                This chat will be permanently deleted from your history. This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors font-medium text-sm"
                  disabled={deletingId === deleteConfirm}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={deletingId === deleteConfirm}
                  className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors font-medium flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === deleteConfirm ? (
                    <Loader size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                  {deletingId === deleteConfirm ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatHistory;