import { FaCamera, FaUser } from "react-icons/fa";

import { useState } from "react";
import ImageUploadModal from "../Community/ImageUploadModal";

function ProfileSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("Aarav Sharma");
  const [bio, setBio] = useState("Gardening enthusiast");

  return (
    <>
      <div className="bg-zinc-200 p-6 md:p-8 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <FaUser className="mr-3 text-emerald-600" />
          Profile Settings
        </h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format=fit=crop"
                alt="User"
                loading="lazy"
                className="w-24 h-24 rounded-full object-cover flex items-center justify-center bg-gray-200"
              />
              <button
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 shadow cursor-pointer"
              >
                <FaCamera size={14} />
              </button>
            </div>
            <div>
              <h3 className="font-bold text-lg">Aarav Sharma</h3>
              <p className="text-gray-500 text-sm">Kolkata, West Bengal</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 px-2 py-2 block w-full border-1 border-gray-300 rounded-md shadow-sm focus:border focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about your gardening journey..."
              className="mt-1 block w-full px-2 py-2 border-1 border-gray-300 rounded-md shadow-sm focus:border focus:border-emerald-500 focus:outline-none resize-none"
            ></textarea>
          </div>
          <div className="text-right pt-6">
            <button className="bg-emerald-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer">
              Save Changes
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ImageUploadModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
export default ProfileSettings;
