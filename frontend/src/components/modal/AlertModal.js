import React, { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

function AlertModal({ message, isSuccess = true, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Set a timer to dismiss the alert after 1 second
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        onClose(); // Call onClose function if provided
      }
    }, 1000);

    // Clean up the timer if the component unmounts or message changes
    return () => clearTimeout(timer);
  }, [message, onClose]);

  // If not visible, do not render anything
  if (!visible) {
    return null;
  }

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 shadow-md bg-white p-5 rounded-lg z-50">
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
