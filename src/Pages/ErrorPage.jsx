import React from "react";
import { Link } from "react-router-dom";

// A simple SVG icon for the button, to avoid external library issues.
const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 h-5 w-5"
  >
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

// A themed illustration for the error page
const WiltedPlantIcon = () => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-emerald-500 drop-shadow-md"
  >
    <path
      d="M12 14V20M12 20H8M12 20H16"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 14C12 14 14 10.3857 14 8C14 5.61429 12 4 12 4C12 4 10 5.61429 10 8C10 10.3857 12 14 12 14Z"
      fill="#10B981"
      stroke="#059669"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 8C14.5 9 16 9.5 17 9C17 9.5 17.5 11 16.5 12"
      stroke="#059669"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 8C9.5 9 8 9.5 7 9C7 9.5 6.5 11 7.5 12"
      stroke="#059669"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 4C12 3.5 12.5 2 13.5 2"
      stroke="#059669"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ErrorPage() {
  return (
    <div className="bg-emerald-50 font-sans min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="relative w-full max-w-lg">
        <div className="absolute -top-16 -left-4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute -bottom-16 -right-4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>

        <div className="relative bg-white bg-opacity-80 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-xl">
          <div className="mb-4">
            <WiltedPlantIcon />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
            404 - Page Not Found
          </h1>

          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Oops! It seems the page you're looking for has been moved, removed,
            or never existed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-600 transition-colors shadow-md transform hover:scale-105"
            >
              <ArrowLeftIcon />
              Go Back Home
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
      <style>{`
            .animate-blob {
                animation: blob 7s infinite;
            }
            .animation-delay-2000 {
                animation-delay: -2s;
            }
            @keyframes blob {
                0% { transform: translate(0px, 0px) scale(1); }
                33% { transform: translate(30px, -50px) scale(1.1); }
                66% { transform: translate(-20px, 20px) scale(0.9); }
                100% { transform: translate(0px, 0px) scale(1); }
            }
        `}</style>
    </div>
  );
}
