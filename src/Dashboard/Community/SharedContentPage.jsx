import React, { useState, useEffect } from "react";
import { FiAlertTriangle, FiSun } from "react-icons/fi";
import { GiWaterDrop } from "react-icons/gi";
import { LuSprout } from "react-icons/lu";
import { useParams, Link } from "react-router-dom";

const fetchSharedDataAPI = (postId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a successful API response for a specific ID
      if (postId == "68b5f5ae541b467c35f4a38a") {
        resolve({
          status: 200,
          data: {
            sharedBy: "Aarav S.",
            plantName: "My Prize-Winning Rose Bush",
            imageUrl:
              "https://images.pexels.com/photos/69428/pexels-photo-69428.jpeg",
            description:
              "So proud of how this rose bush has been flowering this season! It gets about 6 hours of direct sunlight and I water it every 2-3 days. This is the result of patience and care.",
            careDetails: {
              sun: "Full Sun",
              water: "Moderate",
            },
          },
        });
      } else {
        // Simulate a "Not Found" error for any other ID
        reject({
          status: 404,
          message: "The shared link is either invalid or has expired.",
        });
      }
    }, 1500); // 1.5-second delay to simulate network
  });
};

const LoadingSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto overflow-hidden animate-pulse">
    <div className="h-64 bg-gray-300"></div>
    <div className="p-8">
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-6"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6 mb-8"></div>
      <div className="flex space-x-8">
        <div className="flex-1 h-16 bg-gray-300 rounded-lg"></div>
        <div className="flex-1 h-16 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 text-center">
    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
      <FiAlertTriangle className="h-7 w-7 text-red-600" />
    </div>
    <h2 className="text-2xl font-bold text-gray-900">Content Not Found</h2>
    <p className="text-gray-600 mt-2 mb-6">{message}</p>
    <Link
      to="/"
      className="inline-block bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors"
    >
      Go to Homepage
    </Link>
  </div>
);

const SuccessDisplay = ({ data }) => (
  <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto overflow-hidden">
    <img
      src={data.imageUrl}
      alt={data.plantName}
      className="w-full h-64 object-cover"
    />
    <div className="p-8">
      <p className="text-sm font-semibold text-emerald-600 mb-1">
        Shared by {data.sharedBy}
      </p>
      <h1 className="text-4xl font-bold text-gray-900">{data.plantName}</h1>
      <p className="text-gray-700 mt-4 leading-relaxed">{data.description}</p>

      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg">
          <FiSun className="w-8 h-8 text-yellow-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-gray-500">Sunlight</p>
            <p className="font-bold text-gray-800">{data.careDetails.sun}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg">
          <GiWaterDrop className="w-8 h-8 text-blue-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-gray-500">Water</p>
            <p className="font-bold text-gray-800">{data.careDetails.water}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-50 p-6 text-center">
      <h3 className="text-xl font-bold text-gray-800">
        Start Your Own Digital Garden!
      </h3>
      <p className="text-gray-600 mt-1 mb-4">
        Join Kalpavriksha to identify, track, and share your plants.
      </p>
      <Link
        to="/sign-up"
        className="inline-block bg-emerald-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-transform transform hover:scale-105"
      >
        Sign Up for Free
      </Link>
    </div>
  </div>
);

export default function SharedContentPage() {
  const { postId } = useParams();
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [content, setContent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  console.log("postId : " + postId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSharedDataAPI(postId);
        setContent(response.data);
        setStatus("success");
      } catch (error) {
        setErrorMessage(error.message || "An unexpected error occurred.");
        setStatus("error");
      }
    };

    fetchData();
  }, [postId]);

  const renderPageContent = () => {
    switch (status) {
      case "loading":
        return <LoadingSkeleton />;
      case "success":
        return <SuccessDisplay data={content} />;
      case "error":
        return <ErrorDisplay message={errorMessage} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="py-4">
        <div className="container mx-auto flex justify-center items-center space-x-2">
          <LuSprout className="w-8 h-8 text-emerald-600" />
          <span className="text-2xl font-bold text-gray-800">Kalpavriksha</span>
        </div>
      </header>
      <main className="py-12 px-4">{renderPageContent()}</main>
    </div>
  );
}
