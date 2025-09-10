import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getAdviceAPI,
  getIdentifiedPlantDetailsAPI,
} from "../../../Service/Operation/PlantService";
import AuthContext from "../../../Context/AuthContext";
import { LuSprout } from "react-icons/lu";
import { SiSololearn } from "react-icons/si";
import { GiOpenBook } from "react-icons/gi";
import UpdateProfile from "../../Components/UpdateProfile";
import toast from "react-hot-toast";
import HarvestingTips from "./HarvestingTips";

const DetailsSkeleton = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <div className="w-full h-80 bg-gray-300 rounded-xl mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-3"></div>
        <div className="h-10 bg-gray-300 rounded w-3/4 mb-6"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-12 bg-gray-300 rounded-lg mt-8"></div>
      </div>
      <div className="space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-40 bg-gray-300 rounded-xl"></div>
        <div className="h-40 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  </div>
);

export default function PlantIdentificationDetails() {
  const { id } = useParams();
  const authContext = useContext(AuthContext);
  const { token } = authContext.data;

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUserUpdated, setIsUserUpdated] = useState(true);
  const [crop, setCrop] = useState("");
  const [loadingTips, setLoadingTips] = useState(false);
  const [showHarvestTips, setShowHarvestTips] = useState(false);
  const [harvestingTips, setHarvestingTips] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      if (!id || !token) return;
      setLoading(true);
      setError(null);
      try {
        const response = await getIdentifiedPlantDetailsAPI(token, id);
        if (response.status === 200) {
          // Correctly access the nested data object
          setDetails(response.data.data);
          setCrop(response.data.data.suggestion.plant_name);
        } else {
          throw new Error(response.data.message || "Failed to fetch details.");
        }
      } catch (error) {
        console.error("Error fetching plant details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [id, token]);

  async function handleTipsClick() {
    setLoadingTips(true);
    try {
      const response = await getAdviceAPI(token, crop);
      setLoadingTips(false);
      console.log("Tips fetched:", response);
      if (response.status === 200) {
        const tips = JSON.parse(response?.data?.data);
        console.log("tips : ", tips);
        setHarvestingTips(tips);
        toast.success("Tips fetched successfully!");
        setShowHarvestTips(true);
      }
    } catch (error) {
      setLoadingTips(false);
      toast.error("Failed to fetch tips.");
      if (
        error?.response?.data?.data === 0 ||
        error?.response?.data?.data === 1001
      ) {
        setIsUserUpdated(false);
      }
      console.log("Error fetching tips:", error);
    } finally {
      setLoadingTips(false);
    }
  }

  // Main content render based on state
  const renderContent = () => {
    if (loading) {
      return <DetailsSkeleton />;
    }

    if (error || !details) {
      return (
        <div className="text-center py-10">
          <p className="text-red-500">
            {error || "Could not load plant details."}
          </p>
        </div>
      );
    }

    const { suggestion, images } = details;
    const mainImage = images?.[0]?.url;
    const plantName = suggestion?.plant_name;
    const commonNames = suggestion?.plant_details?.common_names;
    const probability = (suggestion?.probability * 100).toFixed(1);
    const description = suggestion?.plant_details?.wiki_description?.value;
    const wikiUrl = suggestion?.plant_details?.url;
    const similarImages = suggestion?.similar_images;

    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Main Details */}
          <div className="lg:col-span-2">
            <img
              src={mainImage}
              alt={plantName}
              className="w-full h-80 object-cover rounded-2xl shadow-lg mb-6"
            />
            <p className="font-semibold text-emerald-600 text-lg">
              {probability}% Match
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-1">
              {commonNames?.[0] || plantName}
            </h1>
            <p className="italic text-gray-500 mt-1 text-lg">{plantName}</p>

            {commonNames && (
              <div className="mt-4 flex flex-wrap gap-2">
                {commonNames.slice(1).map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-full"
                  >
                    {name}
                  </span>
                ))}
              </div>
            )}

            {description && (
              <p className="text-gray-700 mt-6 leading-relaxed text-base">
                {description}
              </p>
            )}

            <div className="mt-8 bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow">
              <div>
                <h3 className="font-bold text-xl text-gray-800">
                  Ready to Grow?
                </h3>
                <p className="text-gray-600 mt-1 text-base">
                  Learn about cultivation, harvesting, and care for this plant.
                </p>
              </div>
              <>
                <button
                  onClick={handleTipsClick}
                  className="cursor-pointer flex flex-row space-x-2 bg-emerald-600 hover:bg-emerald-700 transition text-white items-center justify-center px-4 py-2 rounded-md shadow w-[15rem] font-semibold"
                  disabled={loadingTips}
                >
                  {loadingTips ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <SiSololearn className="text-lg" />
                      <span>Tips to Harvest</span>
                    </>
                  )}
                </button>
              </>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Similar Images</h3>
            {similarImages?.map((img) => (
              <div
                key={img.id}
                className="overflow-hidden rounded-xl shadow-md border border-gray-200"
              >
                <img
                  src={img.url}
                  alt="Similar plant"
                  className="w-full h-40 object-cover"
                />
              </div>
            ))}
            <a
              href={wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm font-semibold text-emerald-600 hover:underline mt-4"
            >
              <GiOpenBook className="text-lg" />
              <span>View full details on Wikipedia</span>
            </a>
          </div>
        </div>
        {!isUserUpdated && (
          <>
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-md flex flex-col items-center">
              <p className="text-red-600 font-medium mb-2 text-center">
                Your profile seems incomplete. Please update your profile to get
                personalized plant care tips.
              </p>
            </div>
            <UpdateProfile />
          </>
        )}
        {showHarvestTips && <HarvestingTips harvestingTips={harvestingTips} />}
      </>
    );
  };

  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center space-x-2 mb-8">
          <LuSprout className="w-8 h-8 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-800">
            Identification Details
          </h1>
        </div>
        {renderContent()}
      </div>
    </main>
  );
}
