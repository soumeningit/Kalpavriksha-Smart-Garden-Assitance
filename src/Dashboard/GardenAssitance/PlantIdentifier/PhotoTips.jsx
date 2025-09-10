import { FaCamera } from "react-icons/fa";

export default function PhotoTips() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h3 className="font-bold text-lg mb-4 flex items-center">
        <FaCamera className="mr-2 text-emerald-600" />
        Photo Tips
      </h3>
      <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
        <li>Use a clear, in-focus image.</li>
        <li>Isolate a single leaf or flower.</li>
        <li>Use a neutral background if possible.</li>
        <li>Good lighting makes a big difference.</li>
      </ul>
    </div>
  );
}
