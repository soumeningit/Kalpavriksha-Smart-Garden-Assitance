import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import toast from "react-hot-toast";

function OAuth() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const token = queryParams.get("token");
  const userId = queryParams.get("userId");
  const name = queryParams.get("userName");

  const context = useContext(AuthContext);
  console.log("AuthContext:", context);
  const addData = context?.addData;

  const user = { userId, name };

  useEffect(() => {
    let toastId;
    if (token) {
      // Show loading toast
      toastId = toast.loading("Logging you in...");

      if (addData) {
        addData(token, user);
      }

      setTimeout(() => {
        toast.dismiss(toastId);
        toast.success("Login successful!");
        navigate("/dashboard/profile");
      }, 1500); // short delay for smoother UX
    } else {
      navigate("/");
    }

    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, []);

  // Centered spinner while waiting
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default OAuth;
