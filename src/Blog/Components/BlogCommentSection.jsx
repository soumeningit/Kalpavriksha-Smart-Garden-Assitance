import { useContext, useEffect, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import Comment from "./Comment";
import AuthContext from "../../Context/AuthContext";
import {
  getCommentsAPI,
  postCommentAPI,
} from "../../Service/Operation/BlogService";

export default function BlogCommentSection({ postId }) {
  const authContext = useContext(AuthContext);

  const { token, user } = authContext.data;

  const currentUser = {
    name: user.name,
    avatar:
      user?.avatar ||
      `https://ui-avatars.com/api/?name=${user?.name}&background=random&size=128`,
  };

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  const getComments = async () => {
    try {
      const response = await getCommentsAPI(postId);
      if (response.status === 200) {
        setComments(response?.data?.data || []);
      }
    } catch (error) {
      setError(
        error?.response?.data?.data?.message ||
          "Could not fetch comments. Please try again."
      );
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getComments();
  }, [postId]);

  const handlePostComment = async () => {
    setError(null);
    if (!newComment.trim()) return;
    const data = {
      postId: postId,
      comment: newComment,
      name: user.name,
    };

    try {
      const response = await postCommentAPI(data, token);
      setComments([data, ...comments]);
      console.log("response:", response);
      if (response.status === 200) {
        setComments([data, ...comments]);
        setNewComment("");
      }
    } catch (error) {
      setError("Could not post comment. Please try again.");
      console.error("Error posting comment:", error);
    }
  };

  function addReplyRecursive(comments, newReply) {
    return comments.map((comment) => {
      if (String(comment.id) === String(newReply.parentCommentId)) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }
      return {
        ...comment,
        replies: addReplyRecursive(comment.replies || [], newReply),
      };
    });
  }

  function updateComments(newReply) {
    setComments((prevComments) => addReplyRecursive(prevComments, newReply));
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 font-sans max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-6 pb-6 border-b">
        <FiMessageSquare className="w-7 h-7 text-emerald-600" />
        <h2 className="text-2xl font-bold text-gray-900">
          {comments?.length || 0 + " "} Comments
        </h2>
      </div>

      {/* New Comment Form */}
      <div className="flex items-start space-x-4 mb-8">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Join the discussion..."
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none resize-none"
            rows="3"
          ></textarea>
          <button
            onClick={handlePostComment}
            disabled={!newComment.trim()}
            className="cursor-pointer mt-2 px-5 py-2 bg-emerald-600 text-white font-semibold text-sm rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 transition-colors shadow-sm"
          >
            Post Comment
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            setComments={updateComments}
          />
        ))}
      </div>
    </div>
  );
}
