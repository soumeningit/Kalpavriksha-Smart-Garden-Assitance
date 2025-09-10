import Sidebar from "./Components/SideBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashBoardNavbar from "./Components/DashBoardNavbar";
import { FiMenu, FiX } from "react-icons/fi";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  // Function to toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Main Content Area */}
      {/* The left margin of this container adjusts smoothly based on the sidebar's state */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out
              ${isSidebarOpen ? "lg:ml-64" : "ml-0"} 
              `}
      >
        {/* The Outlet from react-router-dom will render the matched child route component here */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <button
            onClick={toggleSidebar}
            className={`cursor-pointer absolute top-2 rounded-full p-2 shadow-md -translate-x-7 ${
              isSidebarOpen ? "bg-rose-400" : "bg-emerald-300"
            }`}
          >
            {isSidebarOpen ? (
              <FiX className="text-white" />
            ) : (
              <FiMenu className="text-white" />
            )}
          </button>
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile view when sidebar is open, closes sidebar on click */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </div>
  );
}

export default Dashboard;
