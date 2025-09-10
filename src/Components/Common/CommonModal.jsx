export default function RestrictedModal({
  icon,
  heading,
  showModal,
  text,
  btn1,
  btn2,
  onClick1,
  onClick2,
}) {
  if (!showModal) return null;

  return (
    // Modal Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans"
      onClick={() => onClick2()} // Close modal on overlay click
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm transform transition-all text-center p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4 text-xl">
          {icon}
        </div>

        {/* Text Content */}
        <h3 className="text-xl font-bold text-gray-900">{heading}</h3>
        <div className="text-gray-600 mt-2">{text}</div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
          <button
            type="button"
            onClick={onClick1}
            className="w-full inline-flex justify-center rounded-lg shadow-sm px-4 py-2.5 bg-emerald-600 text-base font-semibold text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors cursor-pointer"
          >
            {btn1}
          </button>
          <button
            type="button"
            onClick={onClick2}
            className="w-full inline-flex justify-center rounded-lg shadow-sm px-4 py-2.5 bg-gray-200 text-base font-semibold text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors cursor-pointer"
          >
            {btn2}
          </button>
        </div>
      </div>
    </div>
  );
}
