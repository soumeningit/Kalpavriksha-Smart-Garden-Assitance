import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import {
  blogLikesAPI,
  getBlogPostDetailsAPI,
} from "../../Service/Operation/BlogService";
import { useContext, useEffect, useState } from "react";
import BlogSkeleton from "../Components/BlogSkeleton";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";
import defaultThumbnail from "../../assets/post_card_thumbnail.jpg";
import BlogCommentSection from "../Components/BlogCommentSection";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import AuthContext from "../../Context/AuthContext";
import RestrictedAccessModal from "../../Components/Modal/RestrictedAccessModal";

function BlogDetailsPage() {
  const { postId } = useParams();

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authContext = useContext(AuthContext);
  const { user, token } = authContext.data;
  const [showRestrictedModal, setShowRestrictedModal] = useState(false);

  async function handleLikeToggle() {
    if (!token) {
      setShowRestrictedModal(true);
      return;
    }

    try {
      const response = await blogLikesAPI(postId, token);
      console.log("Like/Unlike response:", response);
      if (response.status === 200) {
        setDetails(response?.data?.data || details);
      }
    } catch (error) {
      console.error("Error liking/unliking the post:", error);
      toast.error("Could not update like status. Please try again.");
      return;
    }
  }

  async function getDetails() {
    const toastId = toast.loading("Fetching blog details...");
    try {
      const response = await getBlogPostDetailsAPI(postId);
      console.log("response:", response);
      setLoading(false);
      if (response.status === 200) {
        setDetails(response?.data?.data || {});
        toast.success("Blog details fetched successfully!", { id: toastId });
      }
      toast.dismiss(toastId);
    } catch (error) {
      setLoading(false);
      setError("Could not fetch blog details. Please try again.");
      toast.dismiss(toastId);
      toast.error("Error fetching blog details. Please try again.");
      console.error("Error fetching blog details:", error);
    }
  }

  useEffect(() => {
    getDetails();
  }, [postId]);

  console.log("details:", details);

  if (loading) {
    return (
      <div className="p-8">
        <BlogSkeleton />
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">
          {error || "Could not load the blog post."}
        </p>
      </div>
    );
  }

  // Sanitize the HTML content before rendering
  const cleanContent = DOMPurify.sanitize(details.content);

  return (
    <>
      {showRestrictedModal && <RestrictedAccessModal />}
      <div className="font-sans bg-white py-12">
        <main className="max-w-4xl mx-auto px-4">
          <article>
            {/* Post Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                {details.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center space-x-2">
                  <FiUser />
                  <span>{details.creatorName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCalendar />
                  <span>
                    {new Date(details.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiClock />
                  <span>{details.readTime} min read</span>
                </div>
              </div>
            </header>

            {/* Cover Image */}
            <img
              src={details.thumbnail || defaultThumbnail}
              alt={details.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg mb-8"
            />

            {/* Post Content */}
            <div className="prose lg:prose-xl max-w-none">
              {parse(cleanContent)}
            </div>

            {/* Tags */}
            {details.tags && details.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t">
                <div className="flex flex-wrap gap-2">
                  {details.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full"
                    >
                      # {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Likes Section */}
            <div
              onClick={handleLikeToggle}
              className="mt-6 flex items-center space-x-3"
            >
              {details?.likes?.includes(String(user?.userId)) ? (
                <FaHeart className="w-6 h-6 text-red-600 cursor-pointer" />
              ) : (
                <FaRegHeart className="w-6 h-6 text-gray-600 cursor-pointer" />
              )}
              <span className="text-sm text-gray-600">
                {details.likes.length || 0}{" "}
                {details.likes.length === 1 ? "Like" : "Likes"}
              </span>
            </div>
          </article>

          {/* Comment Section Placeholder */}
          <section className="mt-16">
            <div className="w-full h-px bg-gray-200 mb-8"></div>
            {/* Your BlogCommentSection component would go here */}
            {token ? (
              <div className="text-center text-gray-500">
                <h3 className="text-2xl font-bold mb-4">
                  Join the Conversation
                </h3>
                <BlogCommentSection postId={postId} />
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <h3 className="text-2xl font-bold mb-4">
                  Join the Conversation
                </h3>
                <p className="text-gray-600">
                  Please{" "}
                  <Link
                    to={"/sign-in"}
                    className="text-emerald-600 font-semibold"
                  >
                    log in
                  </Link>{" "}
                  to leave a comment.
                </p>
              </div>
            )}
          </section>
        </main>
        {/* Styles for the rendered HTML content */}
        <style>{`
                .prose h1, .prose h2, .prose h3 { font-weight: 800; color: #111827; }
                .prose a { color: #059669; text-decoration: underline; }
                .prose blockquote { border-left-color: #10B981; font-style: italic; }
                .prose img { border-radius: 0.75rem; }
            `}</style>
      </div>
    </>
  );
}

export default BlogDetailsPage;
