function PostSkeleton() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
      <div className="space-y-3 mt-4">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export default PostSkeleton;
