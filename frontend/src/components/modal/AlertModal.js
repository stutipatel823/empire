import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

function AlertModal({ message, isSuccess = true }) {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 shadow-md  bg-white p-5 rounded-lg z-50">
      <div className="flex items-center space-x-2">
        {isSuccess ? (
          <CheckCircleIcon className="h-7 w-7 text-emerald-400" />
        ) : (
          <XCircleIcon className="h-7 w-7 text-secondary-accent" />
        )}
        <h3 className="text-sm sm:text-lg">{message}</h3>
      </div>
    </div>
  );
}

export default AlertModal;
