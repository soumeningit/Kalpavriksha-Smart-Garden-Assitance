import { FiPlusCircle } from "react-icons/fi";
import { GiWaterDrop } from "react-icons/gi";
import { LuSprout } from "react-icons/lu";

const map = {
  FiPlusCircle: <FiPlusCircle className="text-emerald-600" />,
  GiWaterDrop: <GiWaterDrop className="text-blue-600" />,
  LuSprout: <LuSprout className="text-green-600" />,
};

function ProfileActivity({ activityFeed }) {
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <ul className="space-y-4">
          {activityFeed.map((item, index) => (
            <li
              key={index}
              className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-b-0"
            >
              <div className="bg-gray-100 p-2 rounded-full">
                {map[item.icon]}
              </div>
              <div>
                <p className="text-gray-700">{item.text}</p>
                <p className="text-xs text-gray-400 mt-1">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ProfileActivity;
