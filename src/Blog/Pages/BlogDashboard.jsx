import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getOverviewAPI } from "../../Service/Operation/BlogService";
import AuthContext from "../../Context/AuthContext";
import defaultCover from "../../assets/post_card_thumbnail.jpg";

import {
  FiFileText,
  FiEye,
  FiMessageSquare,
  FiHeart,
  FiTrendingUp,
} from "react-icons/fi";
import BlogCard from "../Components/BlogCard";

const recentComments = [
  {
    id: "c1",
    author: "Priya D.",
    text: "This is so inspiring! I'm going to try this with my tomatoes.",
    onPost: "My Rooftop Tomato Experiment...",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
  },
  {
    id: "c2",
    author: "Rohan S.",
    text: "Great idea for using recycled bottles. Looks amazing!",
    onPost: "How I Built a Vertical Herb Garden...",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  },
];

// --- Reusable Stat Card Component ---
const StatCard = ({ item }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm">
    <div className="flex items-center space-x-4">
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${item.color}`}
      >
        {item.icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{item.label}</p>
        <p className="text-2xl font-bold text-gray-800">{item.value}</p>
      </div>
    </div>
  </div>
);

// --- Main BlogDashboard Component ---
export default function BlogDashboard() {
  const [overviewData, setOverviewData] = useState(null);

  const authContext = useContext(AuthContext);
  const { token, user } = authContext?.data || {};

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const response = await getOverviewAPI(token);
        console.log("Overview Data:", response);
        if (response.status === 200) {
          setOverviewData(response?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };

    fetchOverviewData();
  }, [token]);

  function handlePostClick(postId) {
    navigate(`/blog/details/${postId}`);
  }

  const blogStats = [
    {
      label: "Total Posts",
      value: overviewData ? overviewData.totalPosts : "0",
      icon: <FiFileText className="text-blue-600" size={24} />,
      color: "bg-blue-100",
    },
    {
      label: "Total Views",
      value: overviewData ? overviewData.totalViews : "16",
      icon: <FiEye className="text-purple-600" size={24} />,
      color: "bg-purple-100",
    },
    {
      label: "Total Comments",
      value: overviewData ? overviewData.totalComments : "0",
      icon: <FiMessageSquare className="text-green-600" size={24} />,
      color: "bg-green-100",
    },
    {
      label: "Total Likes",
      value: overviewData ? overviewData.totalLikes : "0",
      icon: <FiHeart className="text-red-600" size={24} />,
      color: "bg-red-100",
    },
  ];

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {user?.name}! Here's how your blog is performing.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {blogStats.map((stat) => (
          <StatCard key={stat.label} item={stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Posts */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h3>
          <div className="overflow-x-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {overviewData && overviewData?.recentPosts?.length > 0 ? (
              overviewData?.recentPosts?.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onClick={() => handlePostClick(post.id)}
                />
              ))
            ) : (
              <p className="text-gray-500">No recent posts available.</p>
            )}
          </div>
        </div>

        {/* Right Column: Top Post & Comments */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <FiTrendingUp className="text-purple-600 mr-2" size={24} /> Top
              Performing Post
            </h3>
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src={overviewData?.mostLikedPost?.thumbnail || defaultCover}
                alt={overviewData?.mostLikedPost?.title || "Top Post"}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 p-4 text-white">
                <p className="font-bold">
                  {overviewData?.mostLikedPost?.title || "Top Post"}
                </p>
                <p className="text-xs">
                  {overviewData?.mostLikedPost?.views || 10} views
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Latest Comments
            </h3>
            <ul className="space-y-4">
              {recentComments.map((comment) => (
                <li key={comment.id} className="flex items-start space-x-3">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="text-sm">
                    <p className="text-gray-700">
                      <span className="font-semibold">{comment.author}</span>{" "}
                      commented: "{comment.text}"
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      on <span className="italic">{comment.onPost}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
