import { FiAlertTriangle } from "react-icons/fi";

function DeleteConfirmationModal({ post, onClose, onConfirm }) {
  if (!post) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="flex items-start p-6">
          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <FiAlertTriangle className="h-6 w-6 text-red-600" size={24} />
          </div>
          <div className="ml-4 text-left">
            <h3 className="text-lg font-bold text-gray-900">Delete Post</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this post?
                <strong className="block mt-1">"{post.title}"</strong>
              </p>
              <p className="text-xs text-red-500 mt-2">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer px-5 py-2.5 rounded-lg bg-white text-gray-800 font-semibold border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(post.id)}
            className="cursor-pointer px-5 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-sm"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
