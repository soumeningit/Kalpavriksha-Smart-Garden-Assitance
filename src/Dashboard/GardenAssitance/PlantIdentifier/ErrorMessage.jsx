import { FaExclamationTriangle } from "react-icons/fa";

export default function ErrorMessage({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <FaExclamationTriangle className="text-red-500" size={64} />
      <p className="mt-4 font-semibold text-lg text-red-700">
        Identification Failed
      </p>
      <p className="text-sm text-gray-500 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="bg-emerald-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-emerald-600 cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}
