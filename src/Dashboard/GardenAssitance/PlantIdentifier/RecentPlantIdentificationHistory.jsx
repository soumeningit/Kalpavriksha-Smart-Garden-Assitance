import { useContext, useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import AuthContext from "../../../Context/AuthContext";
import { getRecentPlantIdentifications } from "../../../Service/Operation/PlantService";
import { useNavigate } from "react-router-dom";

// Helper to format dates
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function RecentPlantIdentificationHistory() {
  const [showAll, setShowAll] = useState(false);
  const [response, setResponse] = useState([]);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { user, token } = authContext.data;

  const getData = async () => {
    try {
      const response = await getRecentPlantIdentifications(token, user?.userId);
      console.log("Response:", response);
      if (response.status === 200) {
        setResponse(response.data.data);
        if (response?.data?.data.length > 2) {
          setData(response?.data?.data.slice(0, 3));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleToggle = () => {
    setShowAll((prevShowAll) => {
      if (prevShowAll) {
        setData(response.slice(0, 3));
      } else {
        setData(response);
      }
      return !prevShowAll;
    });
  };

  if (!response || response.length === 0) {
    return (
      <div className="text-center py-4 text-sm text-gray-500">
        No identification history found.
      </div>
    );
  }

  return (
    <div className="font-sans">
      <ul className="space-y-3">
        {data.map((item) => (
          <li
            key={item.id}
            onClick={() =>
              navigate(`/dashboard/plant-identifier/plant-details/${item.id}`)
            }
            className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          >
            <img
              src={item.images[0].url}
              alt={item.suggestion.plant_name}
              className="w-12 h-12 rounded-md object-cover flex-shrink-0"
            />
            <div className="flex-grow">
              <p className="font-semibold text-gray-800 text-sm">
                {item.suggestion.plant_details.common_names[0]}
              </p>
              <p className="text-xs text-gray-500 italic">
                {item.suggestion.plant_name}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-emerald-600">
                {(item.suggestion.probability * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-400">
                {formatDate(item.createdAt)}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {response.length > 3 && (
        <button
          onClick={handleToggle}
          className="cursor-pointer w-full mt-4 text-sm font-semibold text-emerald-600 hover:text-emerald-800 flex items-center justify-center space-x-1 p-2 rounded-lg hover:bg-emerald-50 transition-colors"
        >
          {showAll ? (
            <div className="flex items-center space-x-1">
              <span>Show Less</span>
              <FaChevronUp />
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <span>Show All ({response.length})</span>
              <FaChevronDown />
            </div>
          )}
        </button>
      )}
    </div>
  );
}
