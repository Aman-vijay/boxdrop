import React from "react";
import { LucideIcon, TriangleAlert } from "lucide-react";

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
  confirmColor = "default",
  onConfirm,
  isDangerous = false,
  warningMessage,
}) => {
  if (!isOpen) return null;

  const defaultWarningMessage =
    "This action cannot be undone and will permanently remove your data.";

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  const getButtonStyle = (type: string) => {
    const base = "px-5 py-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    switch (type) {
      case "danger":
        return `${base} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`;
      case "primary":
        return `${base} bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500`;
      case "warning":
        return `${base} bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500`;
      case "success":
        return `${base} bg-green-600 text-white hover:bg-green-700 focus:ring-green-500`;
      default:
        return `${base} bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500`;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-lg transition-all duration-300 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 border border-gray-700/50 text-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-700/50">
          <h2 className="text-xl font-semibold flex-1">{title}</h2>
        </div>

        {/* Body */}
        <div className="p-6">
          {isDangerous ? (
            <div className="bg-red-500/10 border border-red-600/30 text-red-400 p-4 rounded-xl flex gap-3 items-start">
              <TriangleAlert className="h-5 w-5 mt-1 text-red-400" />
              <div>
                <p className="font-semibold">Caution: Irreversible Action</p>
                <p className="text-sm mt-1 text-red-300">
                  {warningMessage || defaultWarningMessage}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-300 text-base leading-relaxed">{description}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-5 border-t border-gray-700/50">
          <button
            className="px-5 py-2 rounded-xl font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </button>

          <button
            className={getButtonStyle(confirmColor)}
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
