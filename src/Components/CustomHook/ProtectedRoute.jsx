import RestrictedAccessModal from "../Modal/RestrictedAccessModal";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const isAuthenticated = token !== null;

  if (!isAuthenticated) {
    return (
      <>
        <RestrictedAccessModal />
      </>
    );
  }

  return children;
}

export default ProtectedRoute;
