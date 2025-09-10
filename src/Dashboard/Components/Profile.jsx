import { useContext, useState } from "react";
import { LuSprout } from "react-icons/lu";
import { GiWaterDrop } from "react-icons/gi";
import {
  gardenStats,
  plants,
  userData,
  activityFeed,
} from "../../Constants/profileData.json";
import { FiEdit, FiPlusCircle } from "react-icons/fi";
import ProfileOverview from "../Profile/ProfileOverview";
import ProfileGarden from "../Profile/ProfileGarden";
import ProfileActivity from "../Profile/ProfileActivity";
import { FiUploadCloud } from "react-icons/fi";
import AuthContext from "../../Context/AuthContext";
import { useLocation } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const authContext = useContext(AuthContext);

  const { user, token } = authContext.data;

  const location = useLocation();

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (fileType === "avatar") setAvatarPreview(reader.result);
        else if (fileType === "cover") setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <ProfileOverview gardenStats={gardenStats} />
          </>
        );
      case "my-garden":
        return (
          <>
            <ProfileGarden plants={plants} />
          </>
        );
      case "activity":
        return (
          <>
            <ProfileActivity activityFeed={activityFeed} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans mt-4">
      <main className="pb-16">
        <div className="relative">
          {/* Cover Photo */}
          <label
            htmlFor="coverPhotoInput"
            className="cursor-pointer group block h-48 md:h-64 bg-gray-200"
          >
            <img
              src={userData?.coverPhoto || coverPreview}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
              <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FiUploadCloud size={32} className="mx-auto" />
                <p className="font-semibold">Change Cover Photo</p>
              </div>
            </div>
          </label>
          <input
            type="file"
            id="coverPhotoInput"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "cover")}
          />

          {/* User Info & Actions */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-12">
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                <label
                  htmlFor="avatarInput"
                  className="cursor-pointer group relative"
                >
                  <img
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    src={
                      `https://avatar.iran.liara.run/username?username=${user?.name}` ||
                      avatarPreview ||
                      userData?.avatar
                    }
                    alt="User avatar"
                  />
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center rounded-full">
                    <FiUploadCloud
                      size={24}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </label>
                <input
                  type="file"
                  id="avatarInput"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "avatar")}
                />

                <div className="mt-4 sm:mt-0 sm:ml-6">
                  <h1 className="text-2xl font-bold text-gray-900 mt-8">
                    {user?.name}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {user?.handle || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <button className="bg-white text-gray-700 font-semibold px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors shadow-sm flex items-center space-x-2 cursor-pointer">
                  <FiEdit size={16} />
                  <span>Edit Profile</span>
                </button>
                <button className="bg-emerald-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors shadow-sm flex items-center space-x-2 cursor-pointer">
                  <FiPlusCircle size={20} />
                  <span>Add Plant</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {["overview", "my-garden", "activity"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize cursor-pointer ${
                    activeTab === tab
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.replace("-", " ")}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
