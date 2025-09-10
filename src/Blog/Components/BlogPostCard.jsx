import { BsClock } from "react-icons/bs";
import { Link } from "react-router-dom";
import post_card_thumbnail from "../../assets/post_card_thumbnail.jpg";

function BlogPostCard({ post }) {
  return (
    <Link
      to={`/blog/details/${post.id}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative">
        <img
          src={post.thumbnail || post_card_thumbnail}
          alt="Blog Post"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {post.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {post.trimContent.length > 100
            ? post.trimContent.slice(0, 100) + "..."
            : post.trimContent}
        </p>
        <div className="flex items-center text-xs text-gray-500">
          <img
            src={
              post.authorAvatar ||
              `https://avatar.iran.liara.run/username?username=${post.creatorName}`
            }
            alt={post.creatorName}
            className="w-8 h-8 rounded-full object-cover mr-3"
          />
          <span className="font-semibold">{post.creatorName}</span>
          <span className="mx-2">•</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="ml-auto flex items-center space-x-1">
            <BsClock />
            <span>{post.readTime} min read</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default BlogPostCard;
