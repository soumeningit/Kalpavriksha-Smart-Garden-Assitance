import { useState } from "react";
import { FaShieldAlt, FaTrashAlt } from "react-icons/fa";

function SecuritySettings() {
  const [data, setData] = useState({
    email: "aarav.sharma@example.com",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-zinc-200 p-6 md:p-8 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <FaShieldAlt className="mr-3 text-emerald-600" />
        Account & Security
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            readOnly
            defaultValue={data.email}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none px-2 py-2"
          />
        </div>
        <div className="pt-6">
          <h3 className="font-semibold mb-2">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={data.password}
                onChange={handleChange}
                className="px-2 py-2 focus:outline-none block w-full border-1 border-zinc-300 rounded-md shadow-sm focus:border focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={data.confirmPassword}
                onChange={handleChange}
                className="px-2 py-2 focus:outline-none block w-full border border-zinc-300 rounded-md shadow-sm focus:border focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
        <div className="text-right pt-6">
          <button
            type="submit"
            className="bg-emerald-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default SecuritySettings;
