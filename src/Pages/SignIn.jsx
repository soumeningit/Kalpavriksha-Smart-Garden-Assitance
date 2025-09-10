import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LuLeaf, LuMail, LuEye, LuEyeOff, LuLockKeyhole } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import login_image from "../assets/sign_in.png";
import toast from "react-hot-toast";
import { loginUserAPI } from "../Service/Operation/AuthService";
import AuthContext from "../Context/AuthContext";

export default function LogIn() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const authContext = useContext(AuthContext);

  const { addData } = authContext;

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in...");
    try {
      const response = await loginUserAPI(data);
      toast.dismiss(toastId);
      console.log("response:", response);
      if (response.status === 200) {
        toast.success("Logged in successfully!");
        addData(response.data.data.token, {
          userId: response.data.data.id,
          name: response.data.data.name,
          email: response.data.data.email,
        });
        navigate("/dashboard/profile", {
          state: {
            userId: response.data.data.id,
          },
        });
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Error logging in:", error);
    }
  };

  async function handleGoogleSignIn(e) {
    e.preventDefault();

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectBackendUri = import.meta.env.VITE_REDIRECT_URI;
    const redirectUri = `${redirectBackendUri}/api/auth/google/callback`;
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
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="text-gray-600 mt-2">
              Log in to continue your green journey.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Email Input */}
              <div className="relative">
                <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
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
            </div>

            <div className="mt-4 text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-emerald-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-md cursor-pointer"
              >
                Log In
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
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-emerald-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block relative">
          <img
            src={login_image}
            alt="A person watering plants in an urban garden"
            className="w-full h-[75%] object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x800/10B981/FFFFFF?text=Kalpavriksha";
            }}
          />
          <div className="absolute inset-0 bg-emerald-800/80"></div>
          <div className="absolute bottom-10 left-10 right-10 text-white">
            <h2 className="text-3xl font-bold">
              "To plant a garden is to believe in tomorrow."
            </h2>
            <p className="mt-2 opacity-90">- Audrey Hepburn</p>
          </div>
        </div>
      </div>
    </div>
  );
}
