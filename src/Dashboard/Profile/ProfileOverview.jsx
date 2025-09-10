import { LuSprout } from "react-icons/lu";
import { GiWaterDrop } from "react-icons/gi";
import { GiBugleCall } from "react-icons/gi";
import { HiOutlineSparkles } from "react-icons/hi";
import ProfileDetails from "./ProfileDetails";

function ProfileOverview({ gardenStats }) {
  const map = {
    LuSprout: <LuSprout className="text-green-600" />,
    GiWaterDrop: <GiWaterDrop className="text-blue-600" />,
    GiBugleCall: <GiBugleCall className="text-red-600" />,
    HiOutlineSparkles: <HiOutlineSparkles className="text-yellow-600" />,
  };
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {gardenStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-5 rounded-xl shadow-sm text-center"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color} mb-3 mx-auto`}
            >
              {map[stat.icon]}
            </div>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
      <ProfileDetails />
    </>
  );
}

export default ProfileOverview;
