import { useEffect, useState, useRef, useContext } from "react";
import { items } from "../Constants/dropdownData.json";
import { useNavigate } from "react-router-dom";
import LogOutModal from "./Common/LogOutModal";
import { IoTriangleOutline } from "react-icons/io5";
import AuthContext from "../Context/AuthContext";

function DropDown({ onClose, dropdownRef }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  console.log("AuthContext:", context);

  const { logOutContext } = context;

  async function handleLogout() {
    console.log("Inside handleLogout");
    let resp = await logOutContext();
    console.log("Logout response:", resp);
    navigate("/");
    // setShowModal(false);
  }

  return (
    <div ref={dropdownRef} className="relative">
      <IoTriangleOutline className="absolute top-full right-0 text-2xl text-gray-400" />
      <div className="absolute top-2 right-0 translate-x-12 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
        <ul>
          {items.map((item) => (
            <li
              key={item.label}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                if (item.isDestructive) {
                  setShowModal(true);
                } else {
                  navigate(item.link);
                  onClose();
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <LogOutModal
          onClose={() => setShowModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
}

export default DropDown;
