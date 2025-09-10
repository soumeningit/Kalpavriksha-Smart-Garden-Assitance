import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import DeleteModal from "./DeleteModal";

function Warning() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mt-8 bg-red-50 p-6 rounded-xl border border-red-200 hover:bg-red-200 hover:transform ease-in-out duration-300 hover:scale-105">
        <h3 className="text-lg font-bold text-red-600 flex items-center">
          <FaTrashAlt className="mr-3" />
          Danger Zone
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Deleting your account is a permanent action and cannot be undone.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 bg-red-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
        >
          Delete My Account
        </button>
      </div>
      {isOpen && <DeleteModal onClose={() => setIsOpen(false)} />}
    </>
  );
}

export default Warning;
