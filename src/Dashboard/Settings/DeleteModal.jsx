import { useState } from "react";
import { Link } from "react-router-dom";
import CaptchaGenerate from "../../Utills/CaptchaGenerate";

function DeleteModal({ onClose }) {
  const [showNext, setShowNext] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  function callNext() {
    const captchaValue = CaptchaGenerate();
    setCaptcha(captchaValue);
    setShowNext(true);
    setInputValue("");
    setError("");
  }

  function handleConfirm() {
    if (inputValue === captcha) {
      onClose();
    } else {
      setError("Captcha does not match. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Confirm Deletion
        </h3>
        <p className="text-base text-gray-600 mb-6">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          If you have any problem,{" "}
          <Link
            to="/contact-us"
            className="text-blue-600 underline cursor-pointer"
          >
            contact us
          </Link>
          .
        </p>
        {!showNext && (
          <div className="flex justify-end gap-3">
            <button
              onClick={callNext}
              className="bg-red-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-700 transition-colors shadow cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className="bg-gray-100 text-gray-700 font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors shadow cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
        {showNext && (
          <div className="mt-8 pt-6">
            <label
              htmlFor="captcha-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Please enter the captcha to confirm:{" "}
              <span className="font-bold text-blue-600 tracking-widest">
                {captcha}
              </span>
            </label>
            <input
              type="text"
              id="captcha-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              autoComplete="off"
              placeholder="Enter captcha"
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleConfirm}
                className="bg-red-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-700 transition-colors shadow cursor-pointer"
              >
                Confirm
              </button>
              <button
                onClick={onClose}
                className="bg-gray-100 text-gray-700 font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors shadow cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteModal;
