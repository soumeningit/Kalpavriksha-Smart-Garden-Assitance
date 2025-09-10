import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { LuSprout } from "react-icons/lu";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import RestrictedModal from "./Components/RestrictModal";
import SearchComponent from "./Components/SearchComponent";

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`pb-2 border-b-2 font-semibold transition-colors ${
        isActive
          ? "border-emerald-500 text-emerald-600"
          : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
      }`}
    >
      {children}
    </Link>
  );
};

function BlogMain() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { token } = authContext.data;
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  function handleWritePostClick() {
    if (token) {
      navigate("/blog/create-post");
    } else {
      setShowModal(true);
    }
  }

  function handleChange(e) {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  }

  function resetQuery() {
    setSearchQuery("");
  }

  return (
    <>
      {showModal && (
        <RestrictedModal
          showModal={showModal}
          text="You need to be signed in to write a post."
          btn1="Sign In"
          btn2="Cancel"
          onClick1={() => {
            setShowModal(false);
            navigate("/sign-in");
          }}
          onClick2={() => {
            setShowModal(false);
            navigate("/");
          }}
        />
      )}
      <div className="bg-white min-h-screen font-sans">
        <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Left Side: Title */}
              <Link
                to="/blog/dashboard"
                className="flex items-center space-x-3"
              >
                <LuSprout className="w-8 h-8 text-emerald-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    The Gardener's Log
                  </h1>
                  <p className="text-sm text-gray-500">
                    Community Stories & Tips
                  </p>
                </div>
              </Link>

              {/* Right Side: Navigation & Actions */}
              <div className="flex items-center space-x-4 sm:space-x-6">
                <nav className="hidden md:flex items-center space-x-6 text-sm">
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/blog/dashboard">Dashboard</NavLink>
                  <NavLink to="/blog/all-posts">All Posts</NavLink>
                  <NavLink to="/blog/user-post">My Posts</NavLink>
                </nav>
                <div
                  onClick={() => setShowSearchModal(true)}
                  className="relative hidden sm:block"
                >
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    name="search"
                    value={searchQuery}
                    onChange={handleChange}
                    placeholder="Search posts..."
                    className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full w-40 focus:w-56 transition-all outline-none"
                  />
                </div>
                <button
                  onClick={handleWritePostClick}
                  className="cursor-pointer flex items-center space-x-2 bg-emerald-600 text-white font-bold px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors shadow-sm text-sm"
                >
                  <FiPlus />
                  <span>Write Post</span>
                </button>
              </div>
            </div>
          </div>
        </header>
        {showSearchModal && (
          <SearchComponent
            searchQuery={searchQuery}
            resetQuery={resetQuery}
            onClose={() => {
              setShowSearchModal(false);
              setSearchQuery("");
            }}
            loading={loading}
            setLoading={setLoading}
          />
        )}

        {/* The Outlet is where all child blog routes will be rendered */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-gray-50/50">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default BlogMain;
