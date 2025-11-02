import React, { useState, useEffect } from 'react';
import type { Integration, Pixel } from '../../../types';
import {
  META_PIXEL_EVENTS,
  TIKTOK_PIXEL_EVENTS,
  GOOGLE_ANALYTICS_EVENTS,
} from '../../../constants/productCreation';
import { ConfirmationModal } from '../../../components/ui/ConfirmationModal';

interface TrackingIntegrationModalProps {
  integration: Integration;
  initialData: Pixel;
  onClose: () => void;
  onSave: (id: string, data: Pixel) => void;
}

export const TrackingIntegrationModal: React.FC<
  TrackingIntegrationModalProps
> = ({ integration, initialData, onClose, onSave }) => {
  const [pixelId, setPixelId] = useState(initialData.id);
  const [selectedEvent, setSelectedEvent] = useState(initialData.event);
  const [showConfirm, setShowConfirm] = useState(false);

  const getEventsForIntegration = (id: string): string[] => {
    switch (id) {
      case 'meta-pixel':
        return META_PIXEL_EVENTS;
      case 'tiktok-pixel':
        return TIKTOK_PIXEL_EVENTS;
      case 'google-analytics':
        return GOOGLE_ANALYTICS_EVENTS;
      default:
        return [];
    }
  };

  const events = getEventsForIntegration(integration.id);

  useEffect(() => {
    // Set default event if none is selected and events are available
    if (!selectedEvent && events.length > 0) {
      setSelectedEvent(events[0]);
    }
  }, [selectedEvent, events]);

  const handleSave = () => {
    if (pixelId && selectedEvent) {
      onSave(integration.id, { id: pixelId, event: selectedEvent });
    }
  };

  const handleConfirmDisconnect = () => {
    onSave(integration.id, { id: '', event: '' });
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
                  Masukkan ID pelacakan dan pilih event utama.
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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="pixelId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {integration.name} ID
                </label>
                <input
                  type="text"
                  id="pixelId"
                  value={pixelId}
                  onChange={(e) => setPixelId(e.target.value)}
                  placeholder={`Contoh: ${
                    integration.id === 'google-analytics'
                      ? 'UA-123456-7'
                      : '123456789012345'
                  }`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 bg-white text-gray-900 placeholder-gray-500"
                  required
                />
              </div>

              {events.length > 0 && (
                <div>
                  <label
                    htmlFor="event"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event untuk Pelacakan Pembelian
                  </label>
                  <select
                    id="event"
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 bg-white text-gray-900"
                  >
                    {events.map((event) => (
                      <option key={event} value={event}>
                        {event}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div>
                {initialData.id && (
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
                  disabled={!pixelId}
                  className="py-2 px-4 text-sm font-semibold rounded-lg transition-colors bg-violet-600 text-white hover:bg-violet-700 disabled:bg-violet-300 disabled:cursor-not-allowed"
                >
                  {initialData.id ? 'Simpan Perubahan' : 'Hubungkan'}
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
