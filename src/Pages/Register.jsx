import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  LuLeaf,
  LuMail,
  LuEye,
  LuEyeOff,
  LuUser,
  LuLockKeyhole,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import registration_image from "../assets/Register.png";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setSuccess("Password matched!");
  };

  async function handleGoogleSignIn(e) {
    e.preventDefault();

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const redirectUri = `${backendUrl}/api/auth/google/callback`; // backend
    const scope = "openid profile email";
    const responseType = "code";

    window.location.href =
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=${responseType}` +
      `&scope=${scope}`;
  }

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
              Create Your Account
            </h1>
            <p className="text-gray-600 mt-2">
              Join our community and start growing today!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Full Name Input */}
              <div className="relative">
                <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
              {/* Email Input */}
              <div className="relative">
                <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
              {/* Password Input */}
              <div className="relative">
                <LuLockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? (
                    <LuEyeOff className="w-5 h-5" />
                  ) : (
                    <LuEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {/* Confirm Password Input */}
              <div className="relative">
                <LuLockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <LuEyeOff className="w-5 h-5" />
                  ) : (
                    <LuEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {/* Error Message */}
              {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
              {/* Password Matched OR Success */}
              {success && (
                <p className="mt-2 text-green-500 text-sm">{success}</p>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={
                  !data.name ||
                  !data.email ||
                  !data.password ||
                  !data.confirmPassword ||
                  data.password !== data.confirmPassword
                }
                className={`w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-md ${
                  !data.name ||
                  !data.email ||
                  !data.password ||
                  !data.confirmPassword ||
                  data.password !== data.confirmPassword
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Separator */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign-in */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="font-semibold text-gray-700">
              Continue with Google
            </span>
          </button>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="font-semibold text-emerald-600 hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block relative">
          <img
            src={registration_image}
            alt="Lush green plants on a balcony"
            className="w-full h-[80%] object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = registration_image;
            }}
          />
          <div className="absolute inset-0 bg-emerald-800/80"></div>
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <h2 className="text-3xl font-bold">
              "The best time to plant a tree was 20 years ago. The second best
              time is now."
            </h2>
            <p className="mt-2 opacity-90">- Chinese Proverb</p>
          </div>
        </div>
      </div>
    </div>
  );
}
