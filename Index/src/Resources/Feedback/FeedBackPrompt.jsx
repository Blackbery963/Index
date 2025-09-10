// import React, { useState, useEffect } from 'react';
// import { FaTimes, FaStar, FaComment } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast } from 'react-toastify';
// import { databases, ID } from '../../appwriteConfig';

// const FeedbackPrompt = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [feedback, setFeedback] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   // Check if prompt should be shown
//   useEffect(() => {
//     const checkShouldShowPrompt = () => {
//       const now = Date.now();
//       const feedbackData = JSON.parse(localStorage.getItem('feedbackPromptData') || '{}');
      
//       // If user has never seen the prompt, show it after 30 seconds
//       if (!feedbackData.lastShown) {
//         setTimeout(() => setIsOpen(true), 30000);
//         return;
//       }
      
//       const lastShown = feedbackData.lastShown;
//       const dismissCount = feedbackData.dismissCount || 0;
//       const lastSubmitted = feedbackData.lastSubmitted;
      
//       // If user submitted feedback recently, don't show for a long time
//       if (lastSubmitted && (now - lastSubmitted) < 90 * 24 * 60 * 60 * 1000) { // 90 days
//         return;
//       }
      
//       // Calculate when to show next based on dismiss count
//       const showAgainAfter = calculateNextShowTime(dismissCount);
      
//       if (now - lastShown > showAgainAfter) {
//         setIsOpen(true);
//       }
//     };

//     checkShouldShowPrompt();
    
//     // Also show if user has been on page for 2 minutes
//     const timer = setTimeout(() => {
//       const feedbackData = JSON.parse(localStorage.getItem('feedbackPromptData') || '{}');
//       if (!feedbackData.lastSubmitted || (Date.now() - feedbackData.lastSubmitted) > 30 * 24 * 60 * 60 * 1000) {
//         setIsOpen(true);
//       }
//     }, 120000); // 2 minutes

//     return () => clearTimeout(timer);
//   }, []);

//   // Calculate when to show next based on how many times user dismissed
//   const calculateNextShowTime = (dismissCount) => {
//     switch (dismissCount) {
//       case 0: return 24 * 60 * 60 * 1000; // 1 day later
//       case 1: return 3 * 24 * 60 * 60 * 1000; // 3 days later
//       case 2: return 7 * 24 * 60 * 60 * 1000; // 1 week later
//       case 3: return 30 * 24 * 60 * 60 * 1000; // 1 month later
//       default: return 90 * 24 * 60 * 60 * 1000; // 3 months later
//     }
//   };

//   const updateFeedbackData = (action) => {
//     const data = JSON.parse(localStorage.getItem('feedbackPromptData') || '{}');
    
//     switch (action) {
//       case 'submit':
//         data.lastSubmitted = Date.now();
//         data.dismissCount = 0; // Reset dismiss count after submission
//         break;
//       case 'dismiss':
//         data.lastShown = Date.now();
//         data.dismissCount = (data.dismissCount || 0) + 1;
//         break;
//       default:
//         break;
//     }
    
//     localStorage.setItem('feedbackPromptData', JSON.stringify(data));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (rating === 0) {
//       toast.info('Please select a rating first!');
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await databases.createDocument(
//         import.meta.env.VITE_APPWRITE_DATABASE_ID,
//         import.meta.env.VITE_APPWRITE_FEEDBACK_COLLECTION_ID,
//         ID.unique(),
//         {
//           username,
//           rating,
//           message: feedback,
//           page: 'main',
//           createdAt: new Date().toISOString()
//         }
//       );
      
//       toast.success('Thank you for your feedback! 💫');
//       setRating(0);
//       setFeedback('');
//       updateFeedbackData('submit');
//       setIsOpen(false);
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//       toast.error('Something went wrong. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDismiss = () => {
//     updateFeedbackData('dismiss');
//     setIsOpen(false);
//   };

//   const handleClose = () => {
//     // For the X button, we still count as a dismiss
//     updateFeedbackData('dismiss');
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {/* Feedback Modal */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               className="fixed inset-0 bg-black bg-opacity-50 z-50"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={handleDismiss} // Click outside dismisses
//             />
            
//             {/* Modal */}
//             <motion.div
//               className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-80 max-w-[90vw]"
//               initial={{ opacity: 0, y: 100, scale: 0.9 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 100, scale: 0.9 }}
//               transition={{ type: 'spring', damping: 25 }}
//               onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
//             >
//               <div className="p-4">
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                     How are we doing?
//                   </h3>
//                   <button
//                     onClick={handleClose}
//                     className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//                   >
//                     <FaTimes />
//                   </button>
//                 </div>

//                 {/* Rating Stars */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Rate your experience
//                   </label>
//                   <div className="flex space-x-1">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         key={star}
//                         type="button"
//                         onClick={() => setRating(star)}
//                         className="text-2xl focus:outline-none transition-transform hover:scale-110"
//                       >
//                         <FaStar
//                           className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Feedback Textarea */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Your comments (optional)
//                   </label>
//                   <textarea
//                     value={feedback}
//                     onChange={(e) => setFeedback(e.target.value)}
//                     rows={3}
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
//                     placeholder="What did you like or what can we improve?"
//                   />
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={handleDismiss}
//                     className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     Maybe later
//                   </button>
//                   <button
//                     onClick={handleSubmit}
//                     disabled={isSubmitting || rating === 0}
//                     className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors font-medium"
//                   >
//                     {isSubmitting ? 'Submitting...' : 'Submit'}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default FeedbackPrompt;


import React, { useState, useEffect } from 'react';
import { FaTimes, FaStar, FaComment } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { databases, ID } from '../../appwriteConfig';

const FeedbackPrompt = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if prompt should be shown
  useEffect(() => {
    const checkShouldShowPrompt = () => {
      const now = Date.now();
      const feedbackData = JSON.parse(localStorage.getItem('feedbackPromptData') || '{}');
      
      // If user has never seen the prompt, show it after 60 seconds (improved from 30s for less intrusion)
      if (!feedbackData.lastShown) {
        setTimeout(() => {
          if (!sessionStorage.getItem('feedbackShownThisSession')) {
            setIsOpen(true);
            sessionStorage.setItem('feedbackShownThisSession', 'true');
          }
        }, 60000);
        return;
      }
      
      const lastShown = feedbackData.lastShown;
      const dismissCount = feedbackData.dismissCount || 0;
      const lastSubmitted = feedbackData.lastSubmitted;
      
      // If user submitted feedback recently, don't show for 180 days (improved from 90 for less frequency)
      if (lastSubmitted && (now - lastSubmitted) < 180 * 24 * 60 * 60 * 1000) {
        return;
      }
      
      // Calculate when to show next based on dismiss count (adjusted intervals)
      const showAgainAfter = calculateNextShowTime(dismissCount);
      
      if (now - lastShown > showAgainAfter && !sessionStorage.getItem('feedbackShownThisSession')) {
        setIsOpen(true);
        sessionStorage.setItem('feedbackShownThisSession', 'true');
      }
    };

    checkShouldShowPrompt();
    
    // Removed the fixed 2-minute timer to make it less aggressive
    // Added sessionStorage to prevent showing multiple times in the same browser session

  }, []);

  // Calculate when to show next based on how many times user dismissed (slightly longer intervals)
  const calculateNextShowTime = (dismissCount) => {
    switch (dismissCount) {
      case 0: return 2 * 24 * 60 * 60 * 1000; // 2 days later
      case 1: return 5 * 24 * 60 * 60 * 1000; // 5 days later
      case 2: return 10 * 24 * 60 * 60 * 1000; // 10 days later
      case 3: return 45 * 24 * 60 * 60 * 1000; // 45 days later
      default: return 180 * 24 * 60 * 60 * 1000; // 6 months later
    }
  };

  const updateFeedbackData = (action) => {
    const data = JSON.parse(localStorage.getItem('feedbackPromptData') || '{}');
    
    switch (action) {
      case 'submit':
        data.lastSubmitted = Date.now();
        data.dismissCount = 0; // Reset dismiss count after submission
        data.lastShown = Date.now(); // Update last shown on submit too
        break;
      case 'dismiss':
        data.lastShown = Date.now();
        data.dismissCount = (data.dismissCount || 0) + 1;
        break;
      default:
        break;
    }
    
    localStorage.setItem('feedbackPromptData', JSON.stringify(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.info('Please select a rating first!');
      return;
    }

    setIsSubmitting(true);
    try {
      const submitName = name.trim() || 'Anonymous'; // Use 'Anonymous' if no name provided
      
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_FEEDBACK_COLLECTION_ID,
        ID.unique(),
        {
          name: submitName, // Changed from username to name for clarity
          rating,
          message: feedback,
          page: window.location.pathname, // Improved: Use current page path instead of hardcoded 'main'
          createdAt: new Date().toISOString()
        }
      );
      
      toast.success('Thank you for your feedback! 💫');
      setRating(0);
      setName('');
      setFeedback('');
      updateFeedbackData('submit');
      setIsOpen(false);
      sessionStorage.setItem('feedbackShownThisSession', 'true'); // Ensure not shown again this session
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismiss = () => {
    updateFeedbackData('dismiss');
    setIsOpen(false);
  };

  const handleClose = () => {
    // For the X button, we still count as a dismiss
    updateFeedbackData('dismiss');
    setIsOpen(false);
  };

  return (
    <>
      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleDismiss} // Click outside dismisses
            />
            
            {/* Modal */}
            <motion.div
              className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-80 max-w-[90vw]"
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
            >
              <div className="p-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    How are we doing?
                  </h3>
                  <button
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Name Input (new addition, optional) */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your name (optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Anonymous"
                  />
                </div>

                {/* Rating Stars */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rate your experience
                  </label>
                  <div className="flex space-x-1 justify-center"> {/* Centered for better UX */}
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-2xl focus:outline-none transition-transform hover:scale-110"
                      >
                        <FaStar
                          className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Textarea */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your comments (optional)
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="What did you like or what can we improve?"
                  />
                </div>

                {/* Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={handleDismiss}
                    className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Maybe later
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || rating === 0}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors font-medium"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackPrompt;