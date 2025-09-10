import { useState } from "react";
import { LuLeaf, LuMail } from "react-icons/lu";
import { Link } from "react-router-dom";
import forgot_password_image from "../assets/ForgotPasswordImage.png";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
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
              Forgot Your Password?
            </h1>
            <p className="text-gray-600 mt-2">
              No problem! Enter your email and we'll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Email Input */}
              <div className="relative">
                <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-md cursor-pointer"
              >
                Send Reset Link
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Remembered your password?{" "}
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
            src={forgot_password_image}
            alt="A single green sprout growing from the earth"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x800/10B981/FFFFFF?text=Re-grow";
            }}
          />
          <div className="absolute inset-0 bg-emerald-800/80"></div>
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <h2 className="text-3xl font-bold">
              "Just like a seed, a little help can lead to great growth."
            </h2>
            <p className="mt-2 opacity-90">- Anonymous</p>
          </div>
        </div>
      </div>
    </div>
  );
}
