import { useState } from "react";
import { Link } from "react-router-dom";
import { LuLeaf, LuLockKeyhole, LuEye, LuEyeOff } from "react-icons/lu";
import update_password_image from "../assets/UpdatePasswordImage.png";

export default function UpdatePassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side - Form */}
        <div className="p-8 md:p-12">
          <div className="mb-8 text-center md:text-left">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <LuLeaf className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-800">
                Kalpavriksha
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Set a New Password
            </h1>
            <p className="text-gray-600 mt-2">
              Your new password must be different from previous ones.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* New Password Input */}
              <div className="relative">
                <LuLockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showNewPassword ? (
                    <LuEyeOff className="w-5 h-5" />
                  ) : (
                    <LuEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {/* Confirm New Password Input */}
              <div className="relative">
                <LuLockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm New Password"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <LuEyeOff className="w-5 h-5" />
                  ) : (
                    <LuEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-md cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              <Link
                to="/sign-in"
                className="font-semibold text-emerald-600 hover:underline"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block relative">
          <img
            src={update_password_image}
            alt="A hand holding a small tree, ready for planting"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x800/10B981/FFFFFF?text=New+Beginnings";
            }}
          />
          <div className="absolute inset-0 bg-emerald-800/80"></div>
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <h2 className="text-3xl font-bold">
              "A new password, a fresh start. Secure your green space."
            </h2>
            <p className="mt-2 opacity-90">- Kalpavriksha</p>
          </div>
        </div>
      </div>
    </div>
  );
}
