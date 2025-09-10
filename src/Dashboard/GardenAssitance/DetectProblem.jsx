import DetectProblemPage from "./DetectProblem/DetectProblemPage";
import RecentProblemDetectHistory from "./DetectProblem/RecentProblemDetectHistory";
import PhotoTips from "./PlantIdentifier/PhotoTips";

function DetectProblem() {
  return (
    <main className="flex-1 p-6 md:p-8 bg-gray-50">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Plant Identifier</h1>
        <p className="text-gray-600 mt-1">
          Upload an image to detect the problem with our AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <DetectProblemPage />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <PhotoTips />
          <RecentProblemDetectHistory />
        </div>
      </div>
    </main>
  );
}

export default DetectProblem;
