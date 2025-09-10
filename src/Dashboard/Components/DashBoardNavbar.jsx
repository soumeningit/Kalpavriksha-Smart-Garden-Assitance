import { FiBell, FiMenu, FiX } from "react-icons/fi";

function DashBoardNavbar({ isSidebarOpen, toggleSidebar }) {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm p-4 flex justify-between items-center sticky top-0 z-30">
      {/* Sidebar Toggle Button for all screen sizes */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          aria-label="Toggle sidebar"
        >
          {/* Changes icon based on sidebar state */}
          {isSidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
        <h1 className="text-lg font-semibold text-gray-700 hidden sm:block">
          Welcome, Aarav!
        </h1>
      </div>

      {/* Right-side user icons */}
      <div className="flex items-center space-x-6">
        <button className="relative text-gray-600 hover:text-emerald-600">
          <FiBell size={22} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            2
          </span>
        </button>
        <img
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop"
          alt="User"
          className="w-9 h-9 rounded-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/36x36/EBF4FF/7F9CF5?text=A";
          }}
        />
      </div>
    </header>
  );
}

export default DashBoardNavbar;
