import { useState } from "react";
import { FiPlusCircle, FiFilter, FiSun, FiMoreVertical } from "react-icons/fi";
import { GiDropletSplash } from "react-icons/gi";

const myPlants = [
  {
    id: 1,
    name: "Hibiscus",
    species: "Hibiscus rosa-sinensis",
    image:
      "https://images.unsplash.com/photo-1560093296-531e45e2a265?q=80&w=1887&auto=format=fit=crop",
    status: "Thriving",
    lastWatered: "Today",
    sunlight: "Direct Sun",
  },
  {
    id: 2,
    name: "Tomato Plant",
    species: "Solanum lycopersicum",
    image:
      "https://images.unsplash.com/photo-1598512752271-33f913a5af13?q=80&w=1887&auto=format=fit=crop",
    status: "Needs Water",
    lastWatered: "2 days ago",
    sunlight: "Direct Sun",
  },
  {
    id: 3,
    name: "Snake Plant",
    species: "Dracaena trifasciata",
    image:
      "https://images.unsplash.com/photo-1593482892290-f54935f5865e?q=80&w=1887&auto=format=fit=crop",
    status: "Pest Alert",
    lastWatered: "Yesterday",
    sunlight: "Indirect Sun",
  },
  {
    id: 4,
    name: "Areca Palm",
    species: "Dypsis lutescens",
    image:
      "https://images.unsplash.com/photo-1614594975525-e4d609937a62?q=80&w=1887&auto=format=fit=crop",
    status: "Thriving",
    lastWatered: "Today",
    sunlight: "Indirect Sun",
  },
  {
    id: 5,
    name: "Marigold",
    species: "Tagetes",
    image:
      "https://images.unsplash.com/photo-1566917110739-e5a7a70310b1?q=80&w=1887&auto=format=fit=crop",
    status: "Needs Water",
    lastWatered: "3 days ago",
    sunlight: "Direct Sun",
  },
];

const statusStyles = {
  Thriving: { bg: "bg-green-100", text: "text-green-800" },
  "Needs Water": { bg: "bg-blue-100", text: "text-blue-800" },
  "Pest Alert": { bg: "bg-red-100", text: "text-red-800" },
};

// --- Standalone My Garden Page Component ---
export default function MyGarden() {
  const [filter, setFilter] = useState("All");

  const filteredPlants =
    filter === "All"
      ? myPlants
      : myPlants.filter((plant) => plant.status === filter);

  const filterOptions = ["All", "Thriving", "Needs Water", "Pest Alert"];

  return (
    <main className="flex-1 p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Garden</h1>
          <p className="text-gray-600 mt-1">
            Your personal collection of plants. Nurture them and watch them
            grow!
          </p>
        </div>
        <button className="mt-4 md:mt-0 bg-emerald-500 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-md inline-flex items-center space-x-2">
          <FiPlusCircle size={20} />
          <span>Add New Plant</span>
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center space-x-4">
        <FiFilter size={20} className="text-gray-500" />
        <div className="flex space-x-2">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                filter === option
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Plants Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredPlants.map((plant) => (
          <div
            key={plant.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden group transition-shadow hover:shadow-lg"
          >
            <div className="relative">
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-48 object-cover"
              />
              <div
                className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
                  statusStyles[plant.status].bg
                } ${statusStyles[plant.status].text}`}
              >
                {plant.status}
              </div>
              <button className="absolute top-3 left-3 bg-white/70 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <FiMoreVertical size={16} className="text-gray-700" />
              </button>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800">{plant.name}</h3>
              <p className="text-sm text-gray-500 italic">{plant.species}</p>
              <div className="mt-4 border-t pt-4 space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <GiDropletSplash size={14} className="mr-2 text-blue-500" />
                  <span>
                    Last watered: <strong>{plant.lastWatered}</strong>
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiSun size={14} className="mr-2 text-yellow-500" />
                  <span>
                    Sunlight: <strong>{plant.sunlight}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlants.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">
            No plants found for the "{filter}" filter.
          </p>
        </div>
      )}
    </main>
  );
}
