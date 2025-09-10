import { useContext, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import AuthContext from "../../Context/AuthContext";
import {
  addCommentsAPI,
  getCommentsAPI,
} from "../../Service/Operation/CommunityOperation";
import PostSkeleton from "./PostSkeleton";

function CommentModal({
  post,
  comments,
  onClose,
  onCommentsFetched,
  onCommentAdded,
}) {
  console.log("post in comment modal : " + JSON.stringify(post));
  console.log("comments : " + JSON.stringify(comments));

  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);

  const { user, token } = authContext.data;

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await getCommentsAPI(post?.id, token);
      console.log("Fetched comments:", response);
      setLoading(false);
      if (response.status === 200) {
        onCommentsFetched(response?.data?.data);
      }
    } catch (err) {
      setLoading(false);
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post?.id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const response = await addCommentsAPI(
        post?.id,
        newComment,
        user?.userId,
        token,
        user?.name
      );
      console.log("Response from addCommentsAPI:", response);
      if (response.status === 200) {
        console.log("Comment added successfully");
        onCommentAdded(response?.data?.data);
        setNewComment("");
      }
    }
  };

  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-lg">Post by {post?.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {/* Original Post */}
          <div className="flex items-start space-x-4">
            <img
              src={`https://ui-avatars.com/api/?name=${post?.name}&background=random`}
              alt={post?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-bold">{post?.name}</p>
              <p className="text-xs text-gray-500">
                {new Date(post?.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="my-4 text-gray-700">{post?.content}</p>
          {post?.imageUrl && (
            <img
              src={post?.imageUrl}
              alt="Post content"
              className="rounded-lg w-full max-h-72 object-cover"
            />
          )}

          <hr className="my-6" />

          {/* Comments List */}
          {loading ? (
            <PostSkeleton />
          ) : (
            <>
              <h4 className="font-semibold mb-4">
                {comments?.length === 0
                  ? "No comments yet"
                  : `Comments (${comments?.length})`}
              </h4>
              <div className="space-y-5">
                {comments?.map((comment) => (
                  <div key={comment?.id} className="flex items-start space-x-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${comment?.name}&background=random`}
                      alt={comment?.name || user}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="bg-gray-100 p-3 rounded-lg w-full">
                      <p className="font-semibold text-sm">{comment?.name}</p>
                      <p className="text-sm text-gray-700">
                        {comment?.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Comment Input */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t bg-gray-50 rounded-b-xl"
        >
          <div className="flex items-center space-x-3">
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
              alt={user?.name}
              className="w-9 h-9 rounded-full object-cover"
            />
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border-gray-300 rounded-full py-2 px-4 focus:border focus:border-emerald-500 focus:ring-emerald-500 transition focus:outline-none"
            />
            <button
              type="submit"
              className="bg-emerald-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-emerald-600 transition-colors cursor-pointer"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommentModal;
