import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import { getRecentProblemDetections } from "../../../Service/Operation/PlantService";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

function RecentProblemDetectHistory() {
  const [showAll, setShowAll] = useState(false);
  const [response, setResponse] = useState([]);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { user, token } = authContext.data;

  const getData = async () => {
    try {
      const response = await getRecentProblemDetections(token);
      console.log("Response IN getRecentProblemDetections:", response);
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
        No history found.
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
              navigate(
                `/dashboard/recent-problem-detection/plant-details/${item.id}`
              )
            }
            className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          >
            <img
              src={item?.images[0]?.url}
              alt="name"
              loading="lazy"
              className="w-12 h-12 rounded-md object-cover flex-shrink-0"
            />
            <div className="flex-grow">
              <p className="font-semibold text-gray-800 text-sm">
                {item?.disease?.disease_details?.common_names[0]}
              </p>
              <p className="text-xs text-gray-500 italic">
                {item?.disease?.disease_details?.local_name}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-emerald-600">
                {(item?.disease?.probability * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-400">
                {item.createdAt ? formatDate(item.createdAt) : null}
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

export default RecentProblemDetectHistory;
