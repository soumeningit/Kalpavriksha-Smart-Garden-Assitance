import RecentPlantIdentificationHistory from "./RecentPlantIdentificationHistory";

export default function HistorySection() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h3 className="font-bold text-lg mb-4">Recent Scans</h3>
      <RecentPlantIdentificationHistory />
    </div>
  );
}
