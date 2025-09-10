import { FaBell } from "react-icons/fa";

function NotificationSettings() {
  return (
    <div className="bg-zinc-200 p-6 md:p-8 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <FaBell className="mr-3 text-emerald-600" />
        Notifications
      </h2>
      <div className="space-y-5">
        <div className="flex justify-between items-center p-4 border border-cyan-400 rounded-lg">
          <div>
            <h4 className="font-semibold">Watering Reminders</h4>
            <p className="text-sm text-gray-500">
              Get push notifications when your plants need water.
            </p>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="flex justify-between items-center p-4 border border-cyan-400 rounded-lg">
          <div>
            <h4 className="font-semibold">Community Updates</h4>
            <p className="text-sm text-gray-500">
              Notify me about new posts and comments.
            </p>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="flex justify-between items-center p-4 border border-cyan-400 rounded-lg">
          <div>
            <h4 className="font-semibold">Promotional Emails</h4>
            <p className="text-sm text-gray-500">
              Receive news, offers, and tips from Kalpavriksha.
            </p>
          </div>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default NotificationSettings;
