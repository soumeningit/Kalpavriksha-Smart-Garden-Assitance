import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShieldAlertIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-7 w-7 text-yellow-500"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

export default function RestrictedAccessModal() {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  if (!showModal) return null;

  return (
    // Modal Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans"
      onClick={() => setShowModal(false)} // Close modal on overlay click
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm transform transition-all text-center p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
          <ShieldAlertIcon />
        </div>

        {/* Text Content */}
        <h3 className="text-xl font-bold text-gray-900">Access Denied</h3>
        <p className="text-gray-600 mt-2">
          You need to be logged in to use this feature. Please log in to
          continue.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
          <button
            type="button"
            onClick={() => {
              setShowModal(false);
              navigate("/sign-in");
            }}
            className="w-full inline-flex justify-center rounded-lg shadow-sm px-4 py-2.5 bg-emerald-600 text-base font-semibold text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors cursor-pointer"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setShowModal(false);
              navigate("/");
            }}
            className="w-full inline-flex justify-center rounded-lg shadow-sm px-4 py-2.5 bg-gray-200 text-base font-semibold text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
