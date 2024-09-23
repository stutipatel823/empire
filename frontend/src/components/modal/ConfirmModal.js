import React from "react";
function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center shadow-md w-1/2 sm:w-1/4 bg-white p-5 rounded-lg">
        <h3 className="mb-4">{message}</h3>
        <div className="w-full flex justify-evenly">
          <button className="w-1/3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200" onClick={onCancel}>
            NO
          </button>
          <button className="w-1/3 py-2 border border-primary-dark rounded-lg bg-primary-dark text-white hover:bg-opacity-80" onClick={onConfirm}>
            YES
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
