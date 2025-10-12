const LoadingSpinner = ({ small = false }) => {
  return (
    <div className={`flex justify-center items-center ${small ? 'py-4' : 'py-12'}`}>
      <div className="flex flex-col items-center gap-3">
        <div className={`animate-spin rounded-full border-b-2 border-green-500 ${
          small ? 'h-8 w-8' : 'h-12 w-12'
        }`}></div>
        {!small && (
          <p className="text-gray-600 dark:text-gray-400 text-sm">Loading amazing content...</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;