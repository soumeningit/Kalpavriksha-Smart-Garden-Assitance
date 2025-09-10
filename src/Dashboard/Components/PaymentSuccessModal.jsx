import { FiCheckCircle } from "react-icons/fi";

function PaymentSuccessModal({ paymentData, onContinue }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-sm w-full text-center">
        <FiCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Payment Successful!
        </h2>
        <div className="text-left bg-gray-700 p-4 rounded-lg my-6 space-y-2">
          <p>
            <strong>Payment ID:</strong> {paymentData?.paymentId}
          </p>
          <p>
            <strong>Gateway ID:</strong> {paymentData?.razorpayPaymentId}
          </p>
        </div>
        <button
          onClick={onContinue}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors w-full cursor-pointer"
        >
          Continue to Next Step
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccessModal;
