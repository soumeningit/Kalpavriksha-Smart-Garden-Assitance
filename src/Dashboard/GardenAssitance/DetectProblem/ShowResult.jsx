import React, { useState } from "react";
import { FaLeaf, FaFlask, FaShieldAlt, FaPlus, FaTrash } from "react-icons/fa";
import RecentProblemDetectHistory from "./RecentProblemDetectHistory";

// --- Reusable Treatment Section Component ---
const TreatmentSection = ({ icon, title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h4 className="font-bold text-gray-800 mb-3 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h4>
      <ul className="list-disc list-inside text-gray-600 space-y-2 pl-2">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

function ShowResult({ selectedDisease, id, image, handleReset }) {
  console.log("Selected Disease:", selectedDisease);
  console.log("Selected Disease:", JSON.stringify(selectedDisease));

  const [isExpanded, setIsExpanded] = useState(false);
  const { disease_details, probability, name, similar_images } =
    selectedDisease;
  const { common_names, local_name, cause, description, treatment, url } =
    disease_details;

  return (
    <div className="bg-gray-50 p-4 md:p-8 font-sans">
      <div className="animate-fadeIn max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Diagnosis Result
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column for Image and Actions */}
          <div className="lg:col-span-2">
            <img
              src={image}
              alt="Uploaded plant with disease"
              className="rounded-xl w-full h-auto object-cover shadow-lg mb-4"
            />
            <div className="flex space-x-2">
              <button className="flex-1 bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 flex items-center justify-center space-x-2 transition-colors">
                <FaPlus />
                <span>Save to Garden</span>
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-200 text-gray-800 font-semibold p-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          {/* Right Column for Details */}
          <div className="lg:col-span-3 flex flex-col space-y-5">
            <div>
              <p className="font-semibold text-red-600">
                {(probability * 100).toFixed(1)}% CONFIDENCE
              </p>
              <h3 className="text-4xl font-bold mt-1 capitalize text-gray-900">
                {name.replace(/_/g, " ")}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              {common_names && (
                <div>
                  <strong className="block text-gray-500">Common Name</strong>{" "}
                  <span className="text-gray-800">
                    {common_names.join(", ")}
                  </span>
                </div>
              )}
              {local_name && (
                <div>
                  <strong className="block text-gray-500">Local Name</strong>{" "}
                  <span className="text-gray-800 capitalize">{local_name}</span>
                </div>
              )}
              {cause && (
                <div>
                  <strong className="block text-gray-500">Cause</strong>{" "}
                  <span className="text-gray-800">{cause}</span>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-bold text-gray-800">Description</h4>
              <p
                className={`text-gray-700 mt-1 leading-relaxed ${
                  !isExpanded ? "line-clamp-3" : ""
                }`}
              >
                {description}
              </p>
              {description && description.length > 200 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-emerald-600 font-semibold hover:underline mt-1 text-sm"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              )}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-500 hover:underline text-sm ml-2"
              >
                Learn More
              </a>
            </div>
            {similar_images && similar_images.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Similar Images</h4>
                <div className="grid grid-cols-3 gap-3">
                  {similar_images.map((img) => (
                    <img
                      key={img.id}
                      src={img.url}
                      alt="Similar disease"
                      className="rounded-lg w-full h-24 object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 mt-6">
          <div className="w-[70%]">
            {treatment ? (
              <div className="space-y-6 p-6 mt-6 rounded-lg w-full">
                <h4 className="text-xl font-bold text-gray-800">
                  Treatment & Prevention
                </h4>
                <TreatmentSection
                  icon={<FaLeaf className="text-green-600" />}
                  title="Biological"
                  items={treatment.biological}
                />
                <TreatmentSection
                  icon={<FaFlask className="text-orange-600" />}
                  title="Chemical"
                  items={treatment.chemical}
                />
                <TreatmentSection
                  icon={<FaShieldAlt className="text-blue-600" />}
                  title="Prevention"
                  items={treatment.prevention}
                />
              </div>
            ) : (
              <div>
                <h4 className="font-bold text-gray-800">Treatment</h4>
                <p className="text-gray-600">
                  No treatment information available.
                </p>
              </div>
            )}
          </div>
          <div className="w-[20%]">
            <RecentProblemDetectHistory />
          </div>
        </div>
      </div>
      <style>{`.animate-fadeIn { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}

export default ShowResult;
