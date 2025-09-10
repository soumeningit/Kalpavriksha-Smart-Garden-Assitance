import { FiRefreshCw, FiXCircle } from "react-icons/fi";

function PaymentErrorModal({ onTryAgain, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-sm w-full text-center">
        <FiXCircle className="text-red-500 text-6xl mb-4 mx-auto" />
        <h2 className="text-2xl font-bold text-white mb-2">Payment Failed</h2>
        <p className="text-gray-400 mb-8">
          We couldn't process your payment. Please try again.
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={onTryAgain}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer"
          >
            <FiRefreshCw /> Try Again
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentErrorModal;
