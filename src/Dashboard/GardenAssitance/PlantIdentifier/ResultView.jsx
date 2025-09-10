import React from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

function ResultView({
  result,
  file,
  description,
  isExpanded,
  setIsExpanded,
  onReset,
}) {
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Identification Result
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={result?.images[0]?.url || file.preview}
              alt="Uploaded plant"
              className="rounded-lg w-full h-auto object-cover shadow-md"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-emerald-600">
              MATCH FOUND ({result?.suggestion?.probability.toFixed(2) * 100}%)
            </p>
            <h3 className="text-3xl font-bold mt-1">
              {result?.suggestion?.plant_name}
            </h3>
            <div className="flex flex-col space-y-2">
              <h2 className="font-semibold font-sans mt-2">
                Commonly Known As:
              </h2>
              <div className="flex flex-wrap gap-2">
                {result?.suggestion?.plant_details?.common_names?.map(
                  (name, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-300 text-gray-700 italic rounded-full shadow-sm"
                    >
                      {name}
                    </span>
                  )
                )}
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                {isExpanded
                  ? description
                  : description.slice(0, 100) +
                    (description.length > 100 ? "..." : "")}
              </p>

              {description.length > 100 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-green-600 font-semibold hover:underline cursor-pointer"
                >
                  {isExpanded ? "Read less" : "Read more"}
                </button>
              )}
            </div>
            <a
              href={result?.suggestion?.plant_details?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:underline mt-2"
            >
              Learn in Details
            </a>

            <div className="mt-6 flex space-x-4">
              <button className="flex-1 bg-emerald-500 text-white font-semibold py-2.5 rounded-lg hover:bg-emerald-600 flex items-center justify-center space-x-2 cursor-pointer">
                <FaPlus size={16} />
                <span>Add to My Garden</span>
              </button>
              <button
                onClick={onReset}
                className="bg-red-200 text-gray-700 font-semibold p-3 rounded-lg hover:bg-red-300 cursor-pointer"
              >
                <FaTrashAlt size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultView;
