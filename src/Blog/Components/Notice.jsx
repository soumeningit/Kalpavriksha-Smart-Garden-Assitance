import { BiInfoCircle } from "react-icons/bi";

export default function Notice() {
  return (
    <div className="bg-emerald-50 border-l-4 border-emerald-400 p-5 rounded-r-lg font-sans">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <BiInfoCircle className="h-6 w-6 text-emerald-500" />
        </div>
        <div>
          <h3 className="text-md font-bold text-emerald-800">
            A Note for Our Community
          </h3>
          <p className="text-sm text-emerald-700 mt-1">
            This space was created to help each other grow. Please keep posts
            relevant to gardening, plants, and our shared passion. Random or
            off-topic content may be removed to keep the community helpful for
            everyone.
          </p>
        </div>
      </div>
    </div>
  );
}
