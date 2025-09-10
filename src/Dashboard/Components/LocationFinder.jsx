import React, { useState, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server"; // CHANGE 1: Import ReactDOMServer
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// --- CRITICAL: LEAFLET CSS IMPORT ---
// You MUST import the Leaflet CSS in your main app file (e.g., index.js or App.js)
// for the map to render correctly. Add this line:
// import 'leaflet/dist/leaflet.css';

// --- SVG Icon Components ---
import { LuSprout as SproutIcon } from "react-icons/lu";

const UserDotIcon = () => (
  <div className="p-2 bg-blue-500 rounded-full shadow-lg border-2 border-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="white"
      stroke="white"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  </div>
);

const NurseryMarkerIcon = () => (
  <div className="p-2 bg-emerald-500 rounded-full shadow-lg border-2 border-white">
    <SproutIcon className="w-5 h-5 text-white" />
  </div>
);

// --- Mock Data ---
const userLocation = { position: [22.44, 87.31], name: "Your Location" };

const nurseries = [
  {
    id: "node/7761044774",
    name: "Unnamed Nursery",
    type: "garden_centre",
    lat: 22.9242351,
    lon: 88.4399537,
    address: "",
    position: [22.9242351, 88.4399537],
  },
  {
    id: "node/12637940722",
    name: "Shyama Charan Nursery",
    type: "garden_centre",
    lat: 22.7913533,
    lon: 88.3217263,
    address: "",
    position: [22.7913533, 88.3217263],
  },
  {
    id: "way/1245869656",
    name: "Unnamed Nursery",
    type: "plant_nursery",
    lat: 22.989866,
    lon: 88.4493567,
    address: "",
    position: [22.989866, 88.4493567],
  },
  {
    id: "way/1245869657",
    name: "Unnamed Nursery",
    type: "plant_nursery",
    lat: 22.9899082,
    lon: 88.4496108,
    address: "",
    position: [22.9899082, 88.4496108],
  },
  {
    id: "way/1245869658",
    name: "Unnamed Nursery",
    type: "plant_nursery",
    lat: 22.9894359,
    lon: 88.4504368,
    address: "",
    position: [22.9894359, 88.4504368],
  },
  {
    id: "way/1245869659",
    name: "Unnamed Nursery",
    type: "plant_nursery",
    lat: 22.9895691,
    lon: 88.4500805,
    address: "",
    position: [22.9895691, 88.4500805],
  },
  {
    id: "way/1245869660",
    name: "Unnamed Nursery",
    type: "plant_nursery",
    lat: 22.9891306,
    lon: 88.4505924,
    address: "",
    position: [22.9891306, 88.4505924],
  },
  {
    id: "way/1245869661",
    name: "Unnamed Nursery",
    type: "plant_nursery",
    lat: 22.989028,
    lon: 88.4504144,
    address: "",
    position: [22.989028, 88.4504144],
  },
  {
    id: "way/1245869662",
    name: "Unnamed Nursery",
    type: "plant_nursery",
    lat: 22.9896967,
    lon: 88.4501928,
    address: "",
    position: [22.9896967, 88.4501928],
  },
  {
    id: "way/1245869663",
    name: "Unnamed Nursery",
    type: "plant_nursery",
    lat: 22.9891034,
    lon: 88.4502361,
    address: "",
    position: [22.9891034, 88.4502361],
  },
];

const userIcon = L.divIcon({
  html: ReactDOMServer.renderToString(<UserDotIcon />),
  className: "", // Clear default styles
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const nurseryIcon = L.divIcon({
  html: ReactDOMServer.renderToString(<NurseryMarkerIcon />),
  className: "",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

// Helper component to programmatically change map view and open popups
function MapUpdater({ selectedNursery, markerRefs }) {
  // CHANGE 2: Pass refs to this component
  const map = useMap();

  useEffect(() => {
    if (selectedNursery) {
      map.setView(selectedNursery.position, 15, {
        animate: true,
        pan: { duration: 1 },
      });

      // Open the popup for the selected nursery
      const marker = markerRefs.current[selectedNursery.id];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedNursery, map, markerRefs]);

  return null;
}

export default function LocationFinder() {
  const [selectedNursery, setSelectedNursery] = useState(null);
  const markerRefs = useRef({}); // CHANGE 3: Create a ref to hold marker instances

  return (
    <div className="bg-gray-50 font-sans flex flex-col h-screen">
      <header className="bg-white shadow-sm p-4 z-20">
        <div className="container mx-auto flex items-center space-x-2">
          <SproutIcon className="w-8 h-8 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-800">Nursery Finder</h1>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-1/3 lg:w-1/4 p-6 bg-white overflow-y-auto border-r border-gray-200">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Nurseries Near You
          </h3>
          <div className="space-y-4">
            {nurseries.map((nursery) => (
              <div
                key={nursery.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 ${
                  selectedNursery?.id === nursery.id
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-transparent hover:bg-gray-100"
                }`}
                onClick={() => setSelectedNursery(nursery)}
              >
                <p className="font-bold text-gray-900">{nursery.name}</p>
                <p className="text-sm text-gray-500">{nursery.address}</p>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 h-full w-full">
          <MapContainer
            center={userLocation.position}
            zoom={12}
            scrollWheelZoom={true}
            className="h-full w-full z-10"
          >
            <MapUpdater
              selectedNursery={selectedNursery}
              markerRefs={markerRefs}
            />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={userLocation.position} icon={userIcon}>
              <Popup>
                <span className="font-bold">{userLocation.name}</span>
              </Popup>
            </Marker>

            {nurseries.map((nursery) => (
              <Marker
                key={nursery.id}
                position={nursery.position}
                icon={nurseryIcon}
                ref={(el) => (markerRefs.current[nursery.id] = el)} // CHANGE 4: Assign the ref
                eventHandlers={{ click: () => setSelectedNursery(nursery) }}
              >
                <Popup>
                  <div className="text-center">
                    <p className="font-bold text-base mb-1">{nursery.name}</p>
                    <p className="text-gray-600">{nursery.address}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </main>
      </div>
    </div>
  );
}
