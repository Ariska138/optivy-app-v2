import React, { useState } from 'react';
import type { Integration } from '../../../types';
import DetailCard from '../../../components/ui/DetailCard';
import { ConfirmationModal } from '../../../components/ui/ConfirmationModal';

interface ApiIntegrationModalProps {
  integration: Integration;
  initialApiKey: string;
  onClose: () => void;
  onSave: (id: string, apiKey: string) => void;
  suggestion: string;
  isLoadingSuggestion: boolean;
}

const GemIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-violet-500"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10.894 2.022a2.5 2.5 0 00-1.788 0l-6 3.5A2.5 2.5 0 002 7.968v4.064a2.5 2.5 0 001.106 2.132l6 3.5a2.5 2.5 0 001.788 0l6-3.5A2.5 2.5 0 0018 12.032V7.968a2.5 2.5 0 00-1.106-2.132l-6-3.5zM10 12.433L4.817 9.497 10 6.567l5.183 2.93L10 12.433z" />
  </svg>
);

export const ApiIntegrationModal: React.FC<ApiIntegrationModalProps> = ({
  integration,
  initialApiKey,
  onClose,
  onSave,
  suggestion,
  isLoadingSuggestion,
}) => {
  const [apiKey, setApiKey] = useState(initialApiKey);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    if (apiKey) {
      onSave(integration.id, apiKey);
    }
  };

  const handleConfirmDisconnect = () => {
    onSave(integration.id, '');
    setShowConfirm(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 m-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {integration.logo}
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Pengaturan {integration.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Masukkan API Key untuk menghubungkan layanan.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* AI Suggestion Box */}
          {/* <DetailCard className="mb-6 !p-4 bg-violet-50/50 border-violet-200">
            <div className="flex items-start gap-3">
              <div className="pt-0.5">
                <GemIcon />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  Saran AI
                </h4>
                <div className="text-xs text-gray-600 mt-1">
                  {isLoadingSuggestion ? (
                    <div className="animate-pulse flex space-x-2">
                      <div className="h-2 bg-gray-300 rounded-full w-24"></div>
                      <div className="h-2 bg-gray-300 rounded-full w-32"></div>
                      <div className="h-2 bg-gray-300 rounded-full w-16"></div>
                    </div>
                  ) : (
                    suggestion
                  )}
                </div>
              </div>
            </div>
          </DetailCard> */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="apiKey"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  API Key
                </label>
                <input
                  type="text"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Masukkan API Key Anda di sini"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 bg-white text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div>
                {initialApiKey && (
                  <button
                    type="button"
                    onClick={() => setShowConfirm(true)}
                    className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors"
                  >
                    Putuskan
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-4 text-sm font-semibold rounded-lg transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!apiKey}
                  className="py-2 px-4 text-sm font-semibold rounded-lg transition-colors bg-violet-600 text-white hover:bg-violet-700 disabled:bg-violet-300 disabled:cursor-not-allowed"
                >
                  {initialApiKey ? 'Simpan Perubahan' : 'Hubungkan'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ConfirmationModal
        isOpen={showConfirm}
        title={`Putuskan Koneksi ${integration.name}`}
        message="Apakah Anda yakin ingin memutuskan koneksi ini? Anda perlu mengkonfigurasi ulang untuk menggunakannya kembali."
        onConfirm={handleConfirmDisconnect}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};
