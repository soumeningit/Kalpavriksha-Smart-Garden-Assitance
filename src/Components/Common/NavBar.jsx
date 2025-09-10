import { LuLeaf } from "react-icons/lu";
import { FiX, FiMenu } from "react-icons/fi";
import navLinks from "../../Constants/navLinks.json";
import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import avtar from "../../assets/boy.png";
import DropDown from "../DropDown";
import AuthContext from "../../Context/AuthContext";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const { token } = authContext?.data;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <LuLeaf className="w-8 h-8 text-emerald-600" />
          <span className="text-2xl font-bold text-gray-800">Kalpavriksha</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.dest}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive
                    ? "text-emerald-600 font-bold"
                    : "text-gray-600 hover:text-emerald-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => navigate("/register")}
            className="bg-emerald-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            Join Now
          </button>

          {token === null && (
            <button
              onClick={() => navigate("/sign-in")}
              className="bg-emerald-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Log In
            </button>
          )}

          {/* FIX: Added a relative container for positioning */}
          {token && (
            <div className="relative">
              <div
                onClick={() => setShowDropDown(!showDropDown)}
                className="w-9 h-9 rounded-full border-2 border-emerald-400 flex items-center justify-center overflow-hidden cursor-pointer"
              >
                <img
                  src={avtar}
                  alt="User Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* The DropDown is now positioned relative to the container above */}
              {showDropDown && (
                <DropDown
                  onClose={() => setShowDropDown(false)}
                  dropdownRef={dropdownRef}
                />
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.dest}
                className={({ isActive }) =>
                  `transition-colors duration-300 ${
                    isActive
                      ? "text-emerald-600 font-bold"
                      : "text-gray-600 hover:text-emerald-600"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <button className="bg-emerald-500 text-white font-semibold w-full mt-4 py-2 rounded-full hover:bg-emerald-600 transition-colors duration-300 cursor-pointer">
              Join Now
            </button>
            {token === null && (
              <button
                onClick={() => navigate("/sign-in")}
                className="bg-emerald-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                Log In
              </button>
            )}

            {/* FIX: Added a relative container for positioning */}
            {token && (
              <div className="relative">
                <div
                  onClick={() => setShowDropDown(!showDropDown)}
                  className="w-9 h-9 rounded-full border-2 border-emerald-400 flex items-center justify-center overflow-hidden cursor-pointer"
                >
                  <img
                    src={avtar}
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                {/* The DropDown is now positioned relative to the container above */}
                {showDropDown && (
                  <DropDown
                    onClose={() => setShowDropDown(false)}
                    dropdownRef={dropdownRef}
                  />
                )}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default NavBar;
