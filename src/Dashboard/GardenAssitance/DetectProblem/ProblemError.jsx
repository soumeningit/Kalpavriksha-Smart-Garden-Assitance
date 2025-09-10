import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import ProblemLoader from "./ProblemLoader";

function ProblemError({ handleReset }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <FiAlertTriangle className="text-red-500" />
      <p className="mt-4 font-semibold text-lg text-red-700">
        Diagnosis Failed
      </p>
      <p className="text-sm text-gray-500 mb-4 max-w-sm">{error}</p>
      <button
        onClick={handleReset}
        className="bg-emerald-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-emerald-600 cursor-pointer"
      >
        Try Again
      </button>
      <ProblemLoader />
    </div>
  );
}

export default ProblemError;
