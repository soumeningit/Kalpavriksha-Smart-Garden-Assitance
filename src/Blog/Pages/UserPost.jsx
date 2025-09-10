import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import AuthContext from "../../Context/AuthContext";
import {
  getUserBlogPostsAPI,
  updateBlogPostStatusAPI,
} from "../../Service/Operation/BlogService";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import DeleteConfirmationModal from "../Components/DeleteConfirmationModal";

export default function UserPost() {
  const [posts, setPosts] = useState([]);
  const [postToDelete, setPostToDelete] = useState(null);

  const authContext = useContext(AuthContext);
  const { token } = authContext?.data;

  const getUserPosts = async () => {
    const toastId = toast.loading("Fetching your posts...");
    try {
      const response = await getUserBlogPostsAPI(token);
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success("Posts fetched successfully", { id: toastId });
        setPosts(response?.data?.data || []);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to fetch posts", { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (token) {
      getUserPosts();
    }
    // eslint-disable-next-line
  }, [token]);

  async function handleUpdateClick(postId, status) {
    const toastId = toast.loading("Updating post status...");
    try {
      const response = await updateBlogPostStatusAPI(postId, status, token);
      console.log("response:", response);
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success("Post status updated successfully");
        const updatedStatus = response?.data?.data;
        setPosts(
          posts.map((post) =>
            post.id === postId ? { ...post, status: updatedStatus } : post
          )
        );
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error updating post status. Please try again.");
    } finally {
      toast.dismiss(toastId);
    }
  }

  const handleDeleteClick = (post) => {
    console.log("Preparing to delete post:", post);
    setPostToDelete(post);
  };

  const confirmDelete = (postId) => {
    setPosts(posts.filter((p) => p.id !== postId));
    setPostToDelete(null);
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl shadow-sm border-2 border-dashed">
        <h2 className="text-2xl font-bold text-gray-800">Your Story Awaits</h2>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          You haven't shared any posts yet. Why not start today and inspire
          other gardeners in the community?
          <br />
        </p>
        <Link
          to="/blog/create-post"
          className="mt-6 inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-full hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-400 transition-transform transform hover:scale-105 shadow-lg"
        >
          <FiPlus size={20} />
          <span>Write Your First Post</span>
        </Link>

        {!token && (
          <p className="text-sm text-zinc-900 mt-4">
            If you have already written posts, to see them here, please ensure
            you are logged in with the correct account.{" "}
            <Link to="/sign-in" className="text-emerald-600 hover:underline">
              Click here to Sign In
            </Link>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="font-sans">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            My Published Posts
          </h2>
          <p className="text-sm text-gray-500 mt-1 sm:mt-0">
            Manage and review your contributions.
          </p>
        </div>

        {/* Table for Posts */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap max-w-xs">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {post.title}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full transition ${
                        post.status === "PUBLISHED"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.status}
                    </span>
                    <span>
                      {post.status === "DRAFT" && (
                        <button
                          onClick={() =>
                            handleUpdateClick(post.id, "PUBLISHED")
                          }
                          className="cursor-pointer text-[1rem] ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                          title="Publish"
                        >
                          <FaEdit />
                        </button>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Link
                      to={`/blog/edit/${post.id}`}
                      className="text-emerald-600 hover:text-emerald-900 inline-flex items-center gap-1 p-2 rounded-md hover:bg-emerald-100 focus:ring-2 focus:ring-emerald-400 transition"
                    >
                      <FiEdit /> <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(post)}
                      className="cursor-pointer text-red-600 hover:text-red-900 inline-flex items-center gap-1 p-2 rounded-md hover:bg-red-100 focus:ring-2 focus:ring-red-400 transition"
                    >
                      <FiTrash /> <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmationModal
        post={postToDelete}
        onClose={() => setPostToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
