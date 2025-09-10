import { FaHeart } from "react-icons/fa";
import defaultCover from "../../assets/post_card_thumbnail.jpg";

export default function BlogCard({ post, onClick }) {
  return (
    <div
      className="max-w-sm w-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* Thumbnail */}
      {post?.thumbnail ? (
        <img
          src={post?.thumbnail}
          alt={post?.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <>
          {defaultCover && (
            <img
              src={defaultCover}
              alt={post?.title}
              className="w-full h-48 object-cover"
            />
          )}
        </>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3">{post.trimContent}</p>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {post.status}
          </span>

          <div className="flex items-center gap-1">
            <FaHeart className="text-red-500" />
            <span>{post.likes?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
