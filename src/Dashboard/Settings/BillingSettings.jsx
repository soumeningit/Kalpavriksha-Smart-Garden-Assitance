import { FaCreditCard } from "react-icons/fa";

function BillingSettings() {
  return (
    <div className="bg-zinc-200 p-6 md:p-8 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <FaCreditCard className="mr-3 text-emerald-600" />
        Subscription & Billing
      </h2>
      <div className="bg-green-100 border border-emerald-200 p-6 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold">Gardener Plan</h3>
            <p className="text-gray-600 text-sm">
              Your plan renews on September 28, 2025.
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">
              ₹299
              <span className="text-base font-normal text-gray-500">/mo</span>
            </p>
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <button className="bg-emerald-500 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-emerald-600 cursor-pointer">
            Upgrade Plan
          </button>
          <button className="text-gray-100 bg-rose-400 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-rose-500 hover:text-gray-50 cursor-pointer">
            Cancel Subscription
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="font-semibold mb-4">Payment Method</h3>
        <div className="flex items-center justify-between p-4 border-1 border-zinc-400 rounded-lg">
          <div className="flex items-center space-x-4">
            <img
              src="https://placehold.co/40x24/cccccc/ffffff?text=VISA"
              alt="Visa"
              className="h-6"
            />
            <p>Visa ending in 1234</p>
          </div>
          <button className="text-emerald-600 font-semibold text-sm hover:underline cursor-pointer">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default BillingSettings;
