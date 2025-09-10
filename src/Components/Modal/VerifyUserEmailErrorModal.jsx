import { GoXCircle } from "react-icons/go";

function VerifyUserEmailErrorModal({ onClick, message }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 font-sans">
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="p-6 text-center">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <GoXCircle className="h-7 w-7 text-red-600" />
          </div>
          {/* Text */}
          <h3 className="mt-5 text-lg font-semibold text-gray-900">
            Verification Failed
          </h3>
          <div className="mt-2">
            <p className="text-md text-gray-600">
              {message ||
                "Something went wrong. The verification link may be invalid or expired. Please try again."}
            </p>
          </div>
        </div>
        {/* Action Button */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl">
          <button
            type="button"
            onClick={onClick}
            className="cursor-pointer w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyUserEmailErrorModal;
