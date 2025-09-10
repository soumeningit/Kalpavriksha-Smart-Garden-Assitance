import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import BlogPostCard from "../Components/BlogPostCard";
import { useState, useEffect, useRef, useCallback } from "react";
import { getAllBlogPostsAPI } from "../../Service/Operation/BlogService";

const popularTags = [
  "monsoon",
  "organic",
  "DIY",
  "rooftop garden",
  "flowers",
  "vegetables",
  "beginner",
];

// Skeleton loader for blog post cards
function BlogPostSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-2xl shadow-sm p-4 flex flex-col space-y-4">
      <div className="h-40 bg-gray-200 rounded-lg w-full" />
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-1/2" />
      <div className="h-4 bg-gray-100 rounded w-1/3" />
    </div>
  );
}

export default function AllPosts() {
  const [allPosts, setAllPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  // Fetch posts for the current page
  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await getAllBlogPostsAPI(page, 5);
      console.log("response:", response);
      if (response.status === 200) {
        const newPosts = response?.data?.data?.content || [];
        setAllPosts((prev) => [...prev, ...newPosts]);
        setHasMore(newPosts.length === 5); // If less than 5, no more data
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false);
      console.error("Error fetching all posts:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // Initial fetch and on page change
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, [page]);

  // Infinite scroll observer
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new window.IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content: Blog Feed */}
        <div className="lg:col-span-2">
          {/* Filter/Sort Buttons */}
          <div className="flex items-center space-x-2 mb-6 border-b pb-4">
            <button className="px-4 py-2 text-sm font-semibold bg-emerald-500 text-white rounded-full shadow-sm">
              Latest
            </button>
            <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-full">
              Popular
            </button>
            <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-full">
              Trending
            </button>
          </div>

          {/* Blog Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allPosts.map((post, idx) => {
              if (idx === allPosts.length - 1) {
                return (
                  <div ref={lastPostRef} key={post.id}>
                    <BlogPostCard post={post} />
                  </div>
                );
              }
              return <BlogPostCard key={post.id} post={post} />;
            })}
            {loading &&
              Array.from({ length: 2 }).map((_, i) => (
                <BlogPostSkeleton key={i} />
              ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-8 sticky top-24">
          {/* Search Bar */}
          <div className="relative">
            <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-12 pr-4 py-3 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Featured Posts */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Featured Posts
            </h3>
            <ul className="space-y-4">
              {featuredPosts.map((post) => (
                <li key={post.id}>
                  <Link
                    to={`/blog/${post.id}`}
                    className="group flex items-center space-x-4"
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div>
                      <p className="font-bold text-sm text-gray-800 group-hover:text-emerald-600">
                        {post.title}
                      </p>
                      <p className="text-xs text-gray-500">{post.author}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tags */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog/tags/${tag}`}
                  className="text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-emerald-100 hover:text-emerald-800 px-3 py-1.5 rounded-full transition-colors"
                >
                  # {tag}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
