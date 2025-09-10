import { FiCheckCircle } from "react-icons/fi";

export default function WritingTips() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
      <h3 className="font-bold text-lg text-gray-800">Writing Checklist</h3>
      <ul className="space-y-3 text-sm">
        <li className="flex items-start space-x-3">
          <FiCheckCircle
            className="text-emerald-500 mt-0.5 flex-shrink-0"
            size={20}
          />
          <p>
            <strong className="font-semibold">Catchy Title:</strong> Does your
            title grab attention?
          </p>
        </li>
        <li className="flex items-start space-x-3">
          <FiCheckCircle
            className="text-emerald-500 mt-0.5 flex-shrink-0"
            size={20}
          />
          <p>
            <strong className="font-semibold">Add a Cover Image:</strong> An
            engaging image makes a big difference.
          </p>
        </li>
        <li className="flex items-start space-x-3">
          <FiCheckCircle
            className="text-emerald-500 mt-0.5 flex-shrink-0"
            size={20}
          />
          <p>
            <strong className="font-semibold">Clear Content:</strong> Is your
            story easy to read and understand?
          </p>
        </li>
        <li className="flex items-start space-x-3">
          <FiCheckCircle
            className="text-emerald-500 mt-0.5 flex-shrink-0"
            size={20}
          />
          <p>
            <strong className="font-semibold">Proofread:</strong> Check for any
            spelling or grammar mistakes.
          </p>
        </li>
      </ul>
    </div>
  );
}
