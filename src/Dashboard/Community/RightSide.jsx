import { FiCalendar, FiMapPin, FiSearch } from "react-icons/fi";
import {
  trendingTopics,
  upcomingEvents,
} from "../../Constants/communityData.json";

function RightSide() {
  return (
    <>
      <aside className="space-y-8">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search community..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h3 className="font-bold text-lg mb-4">Trending Topics</h3>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic) => (
              <span
                key={topic}
                className="bg-emerald-50 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full hover:bg-emerald-100 cursor-pointer"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h3 className="font-bold text-lg mb-4">Upcoming Events</h3>
          <ul className="space-y-4">
            {upcomingEvents.map((event) => (
              <li key={event.name} className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg mt-1">
                  <FiCalendar className="text-blue-600" size={16} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{event.name}</p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <FiMapPin size={12} className="mr-1" />
                    {event.location} • {event.date}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default RightSide;
