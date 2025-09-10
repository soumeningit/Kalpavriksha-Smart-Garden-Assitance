import React, { useState } from "react";
import { CiStethoscope } from "react-icons/ci";
import { LuLeaf } from "react-icons/lu";
import PlantIdentifierPage from "./PlantIdentifier/PlantIdentifierPage";
import DetectProblem from "./DetectProblem";

export default function GardenAssistanceMain() {
  const [activeTab, setActiveTab] = useState("identifyPlant");

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header and Instructions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 border-l-4 border-emerald-500">
            <h1 className="text-3xl font-bold text-gray-900">
              AI Garden Assistant
            </h1>
            <p className="text-gray-600 mt-2">
              Use our AI-powered tools to care for your plants. Upload a clear,
              well-lit image for the best results.
            </p>
            <ul className="text-sm text-gray-500 mt-3 space-y-1 list-disc list-inside">
              <li>
                <strong className="font-semibold">Identify Plant:</strong>{" "}
                Discover the species of an unknown plant.
              </li>
              <li>
                <strong className="font-semibold">Detect Disease:</strong>{" "}
                Diagnose issues by uploading a photo of an affected leaf.
              </li>
            </ul>
          </div>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-8">
            <div className="relative flex p-1 bg-gray-200 rounded-full w-full max-w-sm">
              <span
                className={`absolute top-1 bottom-1 w-1/2 cursor-pointer bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                  activeTab === "identifyPlant"
                    ? "translate-x-0"
                    : "translate-x-full"
                }`}
                aria-hidden="true"
              ></span>
              <button
                onClick={() => setActiveTab("identifyPlant")}
                className={`relative z-10 w-1/2 py-2.5 text-sm cursor-pointer font-semibold flex items-center justify-center space-x-2 transition-colors duration-300 rounded-full ${
                  activeTab === "identifyPlant"
                    ? "text-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <LuLeaf />
                <span>Identify Plant</span>
              </button>
              <button
                onClick={() => setActiveTab("detectDisease")}
                className={`relative z-10 w-1/2 py-2.5 cursor-pointer text-sm font-semibold flex items-center justify-center space-x-2 transition-colors duration-300 rounded-full ${
                  activeTab === "detectDisease"
                    ? "text-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <CiStethoscope />
                <span>Detect Disease</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div>
            {activeTab === "identifyPlant" ? (
              <PlantIdentifierPage />
            ) : (
              <DetectProblem />
            )}
          </div>
        </div>
      </main>

      {/* Adding a keyframe for the fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
