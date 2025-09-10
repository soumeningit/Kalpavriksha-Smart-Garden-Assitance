import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { FiImage } from "react-icons/fi";
import ImageUploadModal from "./ImageUploadModal";
import CommentModal from "./CommentModal";

import {
  connect,
  sendCommunityMessage,
} from "../../Service/Operation/WebSocketClient";
import {
  fileUploadAPI,
  getCommunityPostsAPI,
} from "../../Service/Operation/CommunityOperation";
import AuthContext from "../../Context/AuthContext";
import CommunityPostReaction from "./CommunityPostReaction";
import PostSkeleton from "./PostSkeleton";
import RightSide from "./RightSide";

export default function Community() {
  const { data } = useContext(AuthContext);
  const { user, token } = data;
  const userId = user?.userId;

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [createPostData, setCreatePostData] = useState({});
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const clientRef = useRef(null);

  // console.log("Posts:", posts);

  /** WebSocket connection */
  useEffect(() => {
    if (!userId || !token) return;

    clientRef.current = connect(
      userId,
      token,
      (client, username) => {
        console.log(`Connected as ${username}`);
        client.subscribe("/topic/public", (message) => {
          const payload = JSON.parse(message.body);
          console.log("Received:", payload);

          if (payload.type && payload.type === "ADD_LIKE") {
            setPosts((prevPosts) =>
              prevPosts.map((post) => {
                if (String(post.id) === String(payload.id)) {
                  return {
                    ...post,
                    likes: post.likes.includes(String(payload.userId))
                      ? post.likes.filter(
                          (id) => String(id) !== String(payload.userId)
                        ) // remove like
                      : [...post.likes, String(payload.userId)], // add like
                  };
                }
                return post;
              })
            );
            console.log("After like posts:", posts);
          }

          if (payload.type && payload.type === "NEW_POST") {
            setPosts((prevPosts) => {
              return [payload?.data, ...prevPosts];
            });
          }
        });
      },
      () => console.error("WebSocket connection error")
    );

    return () => {
      clientRef.current?.deactivate();
      console.log("WebSocket disconnected");
    };
  }, [token, userId]);

  // Ref for the observer
  const observer = useRef();

  // Callback ref to attach to the last post element
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page + 1 < totalPages) {
          fetchPosts(page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, page, totalPages]
  );

  // Fetch posts
  const fetchPosts = async (pageNumber = 0) => {
    if (loading) return; // avoid double fetch
    setLoading(true);

    try {
      const res = await getCommunityPostsAPI(pageNumber, 5, token);

      // console.log("res: ", res);

      setPosts((prev) => [...prev, ...res.data.data.data]);
      setTotalPages(res?.data?.data?.totalPages);
      setPage(res?.data?.data?.currentPageNumber);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  /** Fetch first page on mount */
  useEffect(() => {
    fetchPosts(0);
  }, []);

  /** File upload */
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fileUploadAPI(formData, token, userId);
      if (response.status === 200) {
        const uploaded = response?.data?.data;
        setCreatePostData({ ...createPostData, ...uploaded });
        setImageURL(uploaded?.imageUrl);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  /** Post creation */
  const handleCreatePost = () => {
    if (!text.trim() && !imageURL) return;

    sendCommunityMessage({
      senderId: userId,
      message: text.trim(),
      id: createPostData.id || Date.now(),
      imageUrl: createPostData.imageUrl,
      name: user.name,
      type: "NEW_POST",
    });

    // Reset form
    setText("");
    setImageURL(null);
    setCreatePostData({});
  };

  const handleCommentsFetched = (fetchedComments) => {
    console.log("Fetched comments:", fetchedComments);
    setComments(fetchedComments);
  };

  const handleCommentSubmit = (comment) => {
    console.log("New comment submitted:", comment);
    setComments((prevComments) => [...prevComments, comment]);
  };

  return (
    <>
      <main className="flex-1 p-6 md:p-8 bg-gray-50">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Community Hub</h1>
          <p className="text-gray-600 mt-1">
            Connect, share, and grow with fellow gardeners.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Feed */}
          <section className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-start space-x-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col w-full space-x-2">
                  {imageURL && (
                    <img
                      src={imageURL}
                      alt="Uploaded"
                      loading="lazy"
                      className="w-[55%] h-[45%] rounded-lg"
                    />
                  )}
                  <textarea
                    className="mt-4 w-full border-gray-200 rounded-lg p-2 focus:border focus:border-emerald-400 focus:ring-emerald-500 focus:outline-none resize-none"
                    rows="3"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={`What's growing on, ${user?.name}?`}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-gray-500 hover:text-emerald-600 cursor-pointer"
                >
                  <FiImage size={20} />
                </button>
                <button
                  onClick={handleCreatePost}
                  className="bg-emerald-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-emerald-600 text-sm cursor-pointer"
                >
                  Post
                </button>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post, index) => {
              // console.log("Rendering post:", post);
              // Conditionally apply the ref to the last element
              if (posts.length === index + 1) {
                return (
                  <article
                    ref={lastPostElementRef}
                    key={post.id}
                    className="bg-white p-5 rounded-xl shadow-sm"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={
                          post?.profileUrl ||
                          `https://ui-avatars.com/api/?name=${post.name}&background=random`
                        }
                        alt={post.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold">{post.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="my-4 text-gray-700">{post.content}</p>
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt="Post content"
                        className="rounded-lg w-full max-h-96 object-cover"
                      />
                    )}
                    <CommunityPostReaction post={post} posts={posts} />
                  </article>
                );
              } else {
                return (
                  <article
                    key={post.id}
                    className="bg-white p-5 rounded-xl shadow-sm"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={
                          post?.profileUrl ||
                          `https://ui-avatars.com/api/?name=${post?.name}&background=random`
                        }
                        alt={post?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold">{post.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(post?.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="my-4 text-gray-700">{post.content}</p>
                    {post?.imageUrl && (
                      <img
                        src={post?.imageUrl}
                        alt="Post content"
                        className="rounded-lg w-full max-h-96 object-cover"
                      />
                    )}
                    <CommunityPostReaction
                      post={post}
                      onCommentClick={setSelectedPost}
                    />
                  </article>
                );
              }
            })}

            {/* Show skeleton loaders on initial load */}
            {loading &&
              posts.length === 0 &&
              Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)}

            {/* Show a loading spinner for subsequent loads */}
            {loading && posts.length > 0 && (
              <div className="flex justify-center items-center p-4">
                <div className="w-8 h-8 border-4 border-emerald-500 border-dashed rounded-full animate-spin"></div>
              </div>
            )}
          </section>

          {/* Right Sidebar */}
          {/* It will update later */}
          <RightSide />
        </div>
      </main>

      {/* Modals */}
      {selectedPost && (
        <CommentModal
          post={selectedPost}
          comments={comments}
          onClose={() => setSelectedPost(null)}
          onCommentsFetched={handleCommentsFetched}
          onCommentAdded={handleCommentSubmit}
        />
      )}
      {isModalOpen && (
        <ImageUploadModal
          onUpload={handleImageUpload}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
