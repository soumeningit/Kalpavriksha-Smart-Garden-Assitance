import { useContext, useState } from "react";
import countryCode from "../../Constants/countryCode.json";
import AuthContext from "../../Context/AuthContext";
import { FaCity, FaHome, FaLandmark, FaMap } from "react-icons/fa";
import { MapPin } from "lucide-react";
import { GiGlobe } from "react-icons/gi";
import { updateUserProfileDetailsAPI } from "../../Service/Operation/ProfileService";
import toast from "react-hot-toast";

const FormInput = ({ icon, label, ...props }) => (
  <div>
    <label
      htmlFor={props.id || props.name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
      />
    </div>
  </div>
);

const FormSelect = ({ icon, label, children, ...props }) => (
  <div>
    <label
      htmlFor={props.id || props.name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <select
        {...props}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition appearance-none"
      >
        {children}
      </select>
    </div>
  </div>
);

export default function UpdateProfile() {
  const authContext = useContext(AuthContext);
  const { user, token } = authContext.data;

  const [profileDetails, setProfileDetails] = useState({
    landmark: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProfileDetails({
      ...profileDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateUserProfileDetailsAPI(token, profileDetails);
      setLoading(false);
      console.log("Profile updated successfully:", response);
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update profile.");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Update Your Profile
            </h1>
            <p className="text-gray-600 mt-1">
              Complete your address to help us connect you with local gardeners.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <FormInput
                  icon={<FaHome className="text-gray-400" />}
                  label="Street Address"
                  type="text"
                  name="street"
                  placeholder="e.g., 123 Garden Lane"
                  value={profileDetails.street}
                  onChange={handleChange}
                />
              </div>

              <FormInput
                icon={<FaLandmark className="text-gray-400" />}
                label="Landmark"
                type="text"
                name="landmark"
                placeholder="e.g., Near City Park"
                value={profileDetails.landmark}
                onChange={handleChange}
              />

              <FormInput
                icon={<FaCity className="text-gray-400" />}
                label="City"
                type="text"
                name="city"
                placeholder="e.g., Kolkata"
                value={profileDetails.city}
                onChange={handleChange}
                required
              />

              <FormInput
                icon={<FaMap className="text-gray-400" />}
                label="State / Province"
                type="text"
                name="state"
                placeholder="e.g., West Bengal"
                value={profileDetails.state}
                onChange={handleChange}
                required
              />

              <FormInput
                icon={<MapPin className="text-gray-400" />}
                label="Postal Code"
                type="text"
                name="postalCode"
                placeholder="e.g., 700001"
                value={profileDetails.postalCode}
                onChange={handleChange}
                required
              />

              <div className="md:col-span-2">
                <FormSelect
                  icon={<GiGlobe className="text-gray-400" />}
                  label="Country"
                  name="country"
                  value={profileDetails.country}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select your country
                  </option>
                  {countryCode.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </FormSelect>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 text-base font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
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
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
