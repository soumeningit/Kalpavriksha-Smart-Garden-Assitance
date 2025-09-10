import { useContext, useState } from "react";

import { FiEdit, FiTrash } from "react-icons/fi";

import formatTimeAgo from "../../Utills/FormatTimeAgo";
import AuthContext from "../../Context/AuthContext";
import { useParams } from "react-router-dom";
import { postCommentAPI } from "../../Service/Operation/BlogService";

function Comment({ comment, setComments }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const authContext = useContext(AuthContext);

  const { token, user } = authContext.data;
  const { postId } = useParams();

  const currentUser = {
    name: user.name,
    avatar:
      user?.avatar ||
      `https://ui-avatars.com/api/?name=${user?.name}&background=random&size=128`,

    id: user.userId,
  };

  const handlePostReply = async () => {
    if (!replyText.trim()) return;

    try {
      const data = {
        postId: postId,
        comment: replyText,
        name: user.name,
        parentCommentId: comment.id,
      };
      const response = await postCommentAPI(data, token);
      console.log("reply response:", response);
      if (response.status === 200) {
        setComments(data);
        setIsReplying(false);
        setReplyText("");
      }
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  return (
    <div className="flex items-start space-x-4">
      <img
        src={
          comment?.author?.avatar ||
          `https://ui-avatars.com/api/?name=${comment?.name}&background=random&size=128`
        }
        alt={comment?.author?.name}
        className="w-11 h-11 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-baseline space-x-2">
            <p className="font-bold text-gray-800 text-sm">{comment?.name}</p>
            <p className="text-xs text-gray-400">
              {formatTimeAgo(comment?.createdAt)}
            </p>
          </div>
          <p className="text-gray-700 text-sm mt-1">{comment?.comment}</p>
        </div>

        <div className="flex items-center space-x-4 text-xs font-semibold text-gray-500 mt-2">
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="hover:text-emerald-600 cursor-pointer"
          >
            Reply
          </button>
          {String(comment?.userId) === String(currentUser?.id) && (
            <>
              <button className="cursor-pointer hover:text-blue-600 flex items-center gap-1">
                <FiEdit />
                Edit
              </button>
              <button className="cursor-pointer hover:text-red-600 flex items-center gap-1">
                <FiTrash />
                Delete
              </button>
            </>
          )}
        </div>

        {isReplying && (
          <div className="flex items-start space-x-4 mt-4">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Replying to ${comment?.name}...`}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none resize-none"
                rows="2"
              ></textarea>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handlePostReply}
                  className="cursor-pointer px-4 py-1.5 bg-emerald-600 text-white font-semibold text-xs rounded-lg hover:bg-emerald-700"
                >
                  Post Reply
                </button>
                <button
                  onClick={() => setIsReplying(false)}
                  className="cursor-pointer px-4 py-1.5 bg-gray-200 text-gray-700 font-semibold text-xs rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Replies */}
        <div className="space-y-4 mt-4 pl-6 border-l-2">
          {comment?.replies?.map((reply) => (
            <Comment key={reply.id} comment={reply} setComments={setComments} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Comment;
