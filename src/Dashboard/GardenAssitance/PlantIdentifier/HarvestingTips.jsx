import { FaClipboardList } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { TbToolsKitchen } from "react-icons/tb";

const InfoSection = ({ title, icon, items, ordered = false }) => {
  const ListTag = ordered ? "ol" : "ul";
  const ListItem = ({ children }) => (
    <li className="flex items-start">
      {!ordered && (
        <span className="text-emerald-500 mt-1 mr-3 flex-shrink-0">●</span>
      )}
      <span>{children}</span>
    </li>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      <ListTag
        className={`space-y-3 text-gray-600 ${
          ordered ? "list-decimal list-inside" : ""
        }`}
      >
        {items.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </ListTag>
    </div>
  );
};

export default function HarvestingTips({ harvestingTips }) {
  if (!harvestingTips) {
    return <div>No tips available.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {harvestingTips.task}
          </h1>
          <p className="text-gray-600 mt-2">
            Follow these steps for a successful harvest.
          </p>
        </div>

        <div className="space-y-8">
          {/* Steps Section */}
          <InfoSection
            title="Harvesting Steps"
            icon={<FaClipboardList className="text-emerald-600" />}
            items={harvestingTips.steps}
            ordered={true}
          />

          {/* Tools and Precautions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tools Needed Section */}
            <InfoSection
              title="Tools Needed"
              icon={<TbToolsKitchen className="text-blue-600" />}
              items={harvestingTips.tools_needed}
            />

            {/* Precautions Section */}
            <InfoSection
              title="Precautions"
              icon={<FiAlertTriangle className="text-red-600" />}
              items={harvestingTips.precautions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
