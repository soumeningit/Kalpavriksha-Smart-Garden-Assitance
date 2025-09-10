import { useLocation, Navigate } from "react-router-dom";

function ProtectedBlogRoute({ children }) {
  const location = useLocation();
  if (location.pathname.startsWith("/blog")) {
    return children;
  }
  return <Navigate to="/" replace />;
}

export default ProtectedBlogRoute;
