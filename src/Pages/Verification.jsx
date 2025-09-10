import { FcGoogle } from "react-icons/fc";
import { LuLeaf } from "react-icons/lu";
import { GoCheckCircle } from "react-icons/go";
import { Link } from "react-router-dom";

export default function Verification() {
  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <LuLeaf className="w-8 h-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-800">
              Kalpavriksha
            </span>
          </Link>
        </div>

        {/* Verification Status */}
        <div className="flex flex-col items-center">
          <GoCheckCircle className="w-20 h-20 text-emerald-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Email Verified!</h1>
          <p className="text-gray-600 mt-2 max-w-xs">
            Thank you for verifying your account. You're all set to start your
            green journey with us.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          <button className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-md">
            Continue to Dashboard
          </button>

          {/* Separator */}
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-xs">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              If you have any issues, please{" "}
              <Link
                to={"/contact-us"}
                className="font-semibold text-emerald-600 hover:underline"
              >
                contact support
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
