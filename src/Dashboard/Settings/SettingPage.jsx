import BillingSettings from "./BillingSettings";
import NotificationSettings from "./NotificationSettings";
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";
import Warning from "./Warning";

function SettingPage() {
  return (
    <div className="min-h-screen font-sans">
      <main className="pt-4 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">
              Manage your account, preferences, and subscriptions.
            </p>
          </div>

          <div className="space-y-8">
            <ProfileSettings />
            <SecuritySettings />
            <NotificationSettings />
            <BillingSettings />
            <Warning />
          </div>
        </div>
      </main>
      {/* CSS for the toggle switch */}
      <style>{`
                .switch { position: relative; display: inline-block; width: 40px; height: 24px; }
                .switch input { opacity: 0; width: 0; height: 0; }
                .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; }
                .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 4px; bottom: 4px; background-color: white; transition: .4s; }
                input:checked + .slider { background-color: #10B981; }
                input:checked + .slider:before { transform: translateX(16px); }
                .slider.round { border-radius: 34px; }
                .slider.round:before { border-radius: 50%; }
            `}</style>
    </div>
  );
}

export default SettingPage;
