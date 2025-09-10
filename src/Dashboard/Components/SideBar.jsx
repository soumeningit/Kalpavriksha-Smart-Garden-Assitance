import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { FiHome, FiLogOut } from "react-icons/fi";
import { GiSprout } from "react-icons/gi";
import { MdQrCodeScanner } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { RiChatPrivateFill } from "react-icons/ri";
import LogOutModal from "../../Components/Common/LogOutModal";
import { sidebarNavItems } from "../../Constants/sidebarData.json";
import AuthContext from "../../Context/AuthContext";
import { TbMessageChatbot } from "react-icons/tb";

function Sidebar({ isSidebarOpen }) {
  const authContext = useContext(AuthContext);
  const { user } = authContext?.data;
  const userName = user?.name || "Guest";

  const navigate = useNavigate();

  const map = {
    FiHome: <FiHome />,
    RxDashboard: <RxDashboard />,
    GiSprout: <GiSprout />,
    MdQrCodeScanner: <MdQrCodeScanner />,
    FaUserSecret: <FaUserSecret />,
    IoSettingsOutline: <IoSettingsOutline />,
    RiChatPrivateFill: <RiChatPrivateFill />,
    TbMessageChatbot: <TbMessageChatbot />,
  };

  const [showModal, setShowModal] = useState(false);

  const logOutContext = authContext?.logOutContext;

  async function handleLogout() {
    console.log("Inside handleLogout");
    let resp = await logOutContext();
    console.log("Logout response:", resp);
    navigate("/");
    // setShowModal(false);
  }

  return (
    <>
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Brand Logo and Name */}
          <div className="p-6 flex items-center space-x-3">
            <GiSprout className="w-10 h-10 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-800">
              Kalpavriksha
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex-grow">
            <div className="flex flex-col space-y-1">
              {sidebarNavItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-6 py-3 mx-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-emerald-500 text-white shadow-md"
                        : "text-gray-600 hover:bg-emerald-50"
                    }`
                  }
                >
                  {map[item.icon]}
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer with User Info and Logout */}
          <div className="p-4 border-t border-zinc-200 mt-auto">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={`https://avatar.iran.liara.run/username?username=${userName}`}
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/40x40/EBF4FF/7F9CF5?text=A";
                }}
              />
              <div>
                <p className="font-semibold text-gray-800">{userName}</p>
                <p className="text-sm text-gray-500">
                  {user?.plan || "Free Plan"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg cursor-pointer"
            >
              <FiLogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
      {showModal && (
        <LogOutModal
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            handleLogout();
          }}
        />
      )}
    </>
  );
}

export default Sidebar;
