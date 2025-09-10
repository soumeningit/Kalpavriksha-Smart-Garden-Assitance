import React from "react";

function ProfileGarden({ plants }) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {plants.map((plant) => (
          <div
            key={plant.name}
            className="bg-white rounded-xl shadow-sm overflow-hidden group"
          >
            <img
              src={plant.image}
              alt={plant.name}
              className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <p className="font-bold text-gray-800">{plant.name}</p>
              <span
                className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                  plant.status === "Needs Water"
                    ? "text-blue-600 bg-blue-200"
                    : "text-green-600 bg-green-200"
                }`}
              >
                {plant.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProfileGarden;
