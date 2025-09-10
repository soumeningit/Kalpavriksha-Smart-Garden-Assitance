import { useContext, useEffect, useState } from "react";
import {
  FiAtSign,
  FiBriefcase,
  FiMail,
  FiMapPin,
  FiUser,
} from "react-icons/fi";
import AuthContext from "../../Context/AuthContext";
import { getProfileDetailsAPI } from "../../Service/Operation/ProfileService";
import UpdateDetailsModal from "./UpdateDetailsModal";

function ProfileDetails() {
  const [data, setData] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    landmark: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    gender: "",
    dob: "",
    bio: "",
  });

  const authContext = useContext(AuthContext);
  const { token } = authContext?.data;

  const getUserDetails = async () => {
    try {
      const response = await getProfileDetailsAPI(token);
      if (response.status === 200) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserDetails();
    }
  }, [token]);

  if (!data) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm font-sans mt-8 text-center text-gray-500 flex flex-col items-center justify-center">
        <p className="mb-4">Profile details not found.</p>
        <button
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
          onClick={() => setShowUpdateModal(true)}
        >
          Please update details
        </button>
        <UpdateDetailsModal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          profileDetails={profileDetails}
          setProfileDetails={setProfileDetails}
          setData={setData}
        />
      </div>
    );
  }

  // Address formatting
  const address = [
    data.street,
    data.landmark,
    data.city,
    data.state,
    data.country,
    data.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm font-sans mt-8">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
        <h2 className="text-xl font-bold text-gray-900">About</h2>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="flex items-start space-x-3">
          <FiUser className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="text-sm font-semibold text-gray-500">Name</p>
            <p className="text-gray-800">{data.name || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <FiMail className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="text-sm font-semibold text-gray-500">Email</p>
            <p className="text-gray-800">{data.email || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <FiBriefcase className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="text-sm font-semibold text-gray-500">Role</p>
            <p className="text-gray-800">{data.role || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <FiMapPin className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="text-sm font-semibold text-gray-500">Address</p>
            <p className="text-gray-800">{address || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <FiAtSign className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="text-sm font-semibold text-gray-500">Gender</p>
            <p className="text-gray-800">{data.gender || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <FiUser className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="text-sm font-semibold text-gray-500">Verified</p>
            <p className="text-gray-800">{data.verified ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-500 mb-2">Bio</p>
        <p className="text-gray-700 text-base leading-relaxed">
          {data.bio || "No bio provided."}
        </p>
      </div>
    </div>
  );
}

export default ProfileDetails;
