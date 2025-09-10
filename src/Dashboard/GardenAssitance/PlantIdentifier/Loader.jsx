import { FaSpinner } from "react-icons/fa";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <FaSpinner className="animate-spin text-emerald-500" size={64} />
      <p className="mt-4 font-semibold text-lg text-gray-700">
        Analyzing your plant...
      </p>
      <p className="text-sm text-gray-500">Our AI is working its magic.</p>
    </div>
  );
}
