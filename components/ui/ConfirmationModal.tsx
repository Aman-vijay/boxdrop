import React from "react";
import { LucideIcon, TriangleAlert } from "lucide-react"; // Imported TriangleAlert for default warning icon

interface ConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  description: string;
  icon?: LucideIcon;
  iconColor?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "primary" | "danger" | "warning" | "success" | "default";
  onConfirm: () => void;
  isDangerous?: boolean;
  warningMessage?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "default", // Changed default to 'default' for safer neutral color
  onConfirm,
  isDangerous = false,
  warningMessage,
}) => {
  if (!isOpen) return null;

 
  

  const getConfirmButtonClasses = () => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2";

    switch (confirmColor) {
      case "primary":
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
      case "danger":
        return `${baseClasses} bg-red-600 text-white hover:bg-red-700`;
      case "warning":
        return `${baseClasses} bg-orange-600 text-white hover:bg-orange-700`;
      case "success":
        return `${baseClasses} bg-green-600 text-white hover:bg-green-700`;
      default:
        // Default color for general confirmation, less aggressive than danger
        return `${baseClasses} bg-gray-700 text-white hover:bg-gray-800`;
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  const defaultWarningMessage = "This action cannot be undone and will permanently remove your data."; // A more descriptive default warning

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl max-w-sm w-full mx-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
         
          <h2 id="confirmation-modal-title" className="text-xl font-semibold text-gray-900 flex-1">
            {title}
          </h2>
        </div>

        {/* Body */}
        <div className="p-4">
          {isDangerous && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 flex items-start gap-3">
              <TriangleAlert className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" /> {/* Explicit warning icon */}
              <div>
                <p className="font-semibold">Caution: Irreversible Action!</p>
                <p id="confirmation-modal-description" className="text-sm mt-1">
                  {warningMessage || defaultWarningMessage}
                </p>
              </div>
            </div>
          )}
          {!isDangerous && (
            <p id="confirmation-modal-description" className="text-gray-700 text-base">
              {description}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
          <button
            className="px-5 py-2 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </button>
          <button
            className={`${getConfirmButtonClasses()} focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              confirmColor === "danger" ? "focus:ring-red-500" :
              confirmColor === "primary" ? "focus:ring-blue-500" :
              confirmColor === "warning" ? "focus:ring-orange-500" :
              confirmColor === "success" ? "focus:ring-green-500" :
              "focus:ring-gray-500"
            }`}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;