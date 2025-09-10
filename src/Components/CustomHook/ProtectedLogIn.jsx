import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";

function ProtectedLogIn({ children }) {
  const authContext = useContext(AuthContext);
  const { token } = authContext?.data;
  if (!token) {
    return children;
  } else {
    window.location.href = "/dashboard/profile";
  }
}

export default ProtectedLogIn;
