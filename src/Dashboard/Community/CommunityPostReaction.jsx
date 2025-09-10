import { useContext, useState } from "react";
import { FiHeart, FiMessageCircle, FiShare2 } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import AuthContext from "../../Context/AuthContext";
import { addLikes } from "../../Service/Operation/WebSocketClient";
import { addLikesAPI } from "../../Service/Operation/CommunityOperation";
import ShareModal from "./ShareModal";

function CommunityPostReaction({ post, onCommentClick }) {
  const { data } = useContext(AuthContext);
  const userId = data.user?.userId;
  const token = data.token;

  const [showShareModal, setShowShareModal] = useState(false);
  const [shareURL, setShareURL] = useState("");

  async function handleLike(post) {
    console.log("Liking post:", post);

    if (String(post.senderId) === String(userId)) {
      alert("You cannot like your own post.");
      return;
    }

    const payload = {
      id: post.id,
      userId: userId,
      type: "ADD_LIKE",
    };

    try {
      await addLikesAPI(payload, token); // REST API
      addLikes(payload); // WebSocket broadcast
    } catch (err) {
      console.error("Error liking post:", err);
    }
  }

  function handleShare(data) {
    if (data?.id.length === 0) return;
    const url = `http://localhost:5173/share/${data.id}`;

    setShareURL(url);

    setShowShareModal(true);
    console.log("Sharing post:", data);
  }

  return (
    <>
      <div className="mt-4 flex justify-between items-center text-gray-500 border-t pt-3">
        {/* Like Button */}
        <button
          onClick={() => handleLike(post)}
          className="flex items-center space-x-2 hover:text-red-500 cursor-pointer"
        >
          {post?.likes?.includes(String(userId)) ? (
            <>
              <FaHeart size={20} className="text-red-500" />
              <span>{post?.likes?.length}</span>
            </>
          ) : (
            <>
              <FiHeart size={20} />
              <span>{post?.likes?.length}</span>
            </>
          )}
        </button>

        {/* Comment Button */}
        <button
          onClick={() => onCommentClick(post)}
          className="flex items-center space-x-2 hover:text-blue-500 cursor-pointer"
        >
          <FiMessageCircle size={20} />
        </button>

        {/* Share Button */}
        <button
          onClick={() => handleShare(post)}
          className="flex items-center space-x-2 hover:text-emerald-500 cursor-pointer"
        >
          <FiShare2 size={20} />
          <span>Share</span>
        </button>
      </div>
      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          shareUrl={shareURL}
        />
      )}
    </>
  );
}

export default CommunityPostReaction;
