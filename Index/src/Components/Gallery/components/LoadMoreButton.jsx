const LoadMoreButton = ({ loadingMore, handleLoadMore, filter, allMedia }) => {
  // You can implement logic to determine if there's more data to load
  const hasMore = true; // Replace with actual logic based on your pagination

  if (!hasMore) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-8 py-4">
        No more content to load
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={handleLoadMore}
        disabled={loadingMore}
        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50 transition-colors"
      >
        {loadingMore ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
};

export default LoadMoreButton;