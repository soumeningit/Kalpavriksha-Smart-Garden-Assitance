import { useContext, useState } from "react";
import { updateUserProfileDetailsAPI } from "../../Service/Operation/ProfileService";
import AuthContext from "../../Context/AuthContext";
import toast from "react-hot-toast";

const InputField = ({ id, label, value, onChange }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
    />
  </div>
);

function UpdateDetailsModal({
  isOpen,
  onClose,
  profileDetails,
  setProfileDetails,
  setData,
}) {
  if (!isOpen) {
    return null;
  }

  const authContext = useContext(AuthContext);
  const { token } = authContext?.data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating profile...");
    try {
      const response = await updateUserProfileDetailsAPI(token, profileDetails);
      toast.dismiss(toastId);
      if (response.status === 200) {
        toast.success("Profile updated successfully!", { id: toastId });
        setData(response?.data?.data || {});
        onClose();
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Error updating profile. Please try again.", { id: toastId });
      console.error("Error updating profile:", err);
    }
  };

  const handleOverlayClick = (e) => {
    // Close modal only if the overlay itself is clicked, not its children
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg m-4 transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Update Your Profile
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Make changes to your address and personal information.
              </p>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="street"
                label="Street Address"
                value={profileDetails.street}
                onChange={handleChange}
              />
              <InputField
                id="landmark"
                label="Landmark"
                value={profileDetails.landmark}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="city"
                label="City"
                value={profileDetails.city}
                onChange={handleChange}
              />
              <InputField
                id="state"
                label="State / Province"
                value={profileDetails.state}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="postalCode"
                label="Postal Code"
                value={profileDetails.postalCode}
                onChange={handleChange}
              />
              <InputField
                id="country"
                label="Country"
                value={profileDetails.country}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={profileDetails.gender || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={profileDetails.dob || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={profileDetails.bio || ""}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="Write something about yourself..."
              />
            </div>

            <div className="flex items-center justify-end pt-6 space-x-3 border-t border-gray-200 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateDetailsModal;
