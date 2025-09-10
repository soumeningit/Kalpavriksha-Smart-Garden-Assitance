function BlogSkeleton() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="h-10 bg-gray-300 rounded-lg w-3/4 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded-lg w-1/2 mb-8"></div>
      <div className="w-full h-80 bg-gray-300 rounded-2xl mb-8"></div>
      <div className="space-y-4 prose">
        <div className="h-8 bg-gray-300 rounded w-full"></div>
        <div className="h-6 bg-gray-200 rounded w-full"></div>
        <div className="h-6 bg-gray-200 rounded w-5/6"></div>
        <div className="h-6 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
}

export default BlogSkeleton;
