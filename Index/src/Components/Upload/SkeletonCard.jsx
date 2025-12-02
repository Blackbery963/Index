// src/components/ui/SkeletonCard.jsx
export default function SkeletonCard() {
  return (
    <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
      </div>
    </div>
  );
}