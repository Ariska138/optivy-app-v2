import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex justify-center items-center"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 m-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-2 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="py-2 px-6 text-sm font-semibold rounded-lg transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="py-2 px-6 text-sm font-semibold rounded-lg transition-colors bg-red-600 text-white hover:bg-red-700"
          >
            Ya, Putuskan
          </button>
        </div>
      </div>
    </div>
  );
};
