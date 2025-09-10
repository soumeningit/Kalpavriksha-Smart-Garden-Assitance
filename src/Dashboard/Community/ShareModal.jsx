import { useState, useRef } from "react";
import {
  FaCheck,
  FaCopy,
  FaShare,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { FaFacebook, FaX } from "react-icons/fa6";

function ShareModal({ isOpen, onClose, shareUrl }) {
  const [isCopied, setIsCopied] = useState(false);
  const textAreaRef = useRef(null);

  const copyToClipboard = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand("copy");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }
  };

  if (!isOpen) {
    return null;
  }

  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-emerald-100">
                <FaShare className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Share this Link
                </h3>
                <p className="text-sm text-gray-500">
                  Anyone with this link can view it.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 w-6 h-6 flex items-center justify-center hover:text-gray-600 bg-red-200 hover:bg-red-300 cursor-pointer rounded-full"
            >
              <FaX className="w-3 h-3" />
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center space-x-4 my-6">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:brightness-110 transition-colors"
              style={{ backgroundColor: "#1877F2" }}
              title="Share on Facebook"
            >
              <FaFacebook className="text-white" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:brightness-110 transition-colors"
              style={{ backgroundColor: "#1DA1F2" }}
              title="Share on Twitter"
            >
              <FaTwitter className="text-white" />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full hover:brightness-110 transition-colors"
              style={{ backgroundColor: "#25D366" }}
              title="Share on WhatsApp"
            >
              <FaWhatsapp className="text-white" />
            </a>
          </div>

          {/* Copy Link Section */}
          <div className="flex items-center space-x-2">
            <input
              ref={textAreaRef}
              type="text"
              value={shareUrl}
              readOnly
              className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
            <button
              onClick={copyToClipboard}
              className={`flex-shrink-0 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                isCopied
                  ? "bg-green-500"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {isCopied ? <FaCheck /> : <FaCopy />}
              <span>{isCopied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
