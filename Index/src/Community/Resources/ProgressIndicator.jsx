const ProgressIndicator = ({ progress }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {progress < 100 ? 'Uploading Your Resource' : 'Upload Complete!'}
      </h2>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-600 dark:text-gray-300">
        {progress < 30 ? 'Preparing files...' : 
         progress < 70 ? 'Uploading content...' : 
         progress < 100 ? 'Finalizing...' : 'All done! Redirecting...'}
      </p>
    </div>
  );
};

export default ProgressIndicator;