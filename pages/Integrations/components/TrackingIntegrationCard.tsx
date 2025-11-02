import React from 'react';
import type { Integration, Pixel } from '../../../types';

interface TrackingIntegrationCardProps {
  integration: Integration;
  onManage: (id: string) => void;
  trackingData: Pixel;
}

export const TrackingIntegrationCard: React.FC<
  TrackingIntegrationCardProps
> = ({ integration, onManage, trackingData }) => {
  const { id, name, logo, description, connected } = integration;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col transition-all hover:shadow-md hover:border-violet-300">
      <div className="flex items-center justify-between">
        {logo}
        <div className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              connected ? 'bg-green-500' : 'bg-gray-400'
            }`}
          ></div>
          <span
            className={`text-sm font-semibold ${
              connected ? 'text-green-700' : 'text-gray-600'
            }`}
          >
            {connected ? 'Terhubung' : 'Tidak Terhubung'}
          </span>
        </div>
      </div>
      <div className="flex-1 mt-4">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mt-1 h-10">{description}</p>
        {connected && trackingData?.id && (
          <div className="mt-2 text-xs bg-gray-100 p-2 rounded-md">
            <p
              className="font-mono truncate text-gray-600"
              title={trackingData.id}
            >
              ID: {trackingData.id}
            </p>
          </div>
        )}
      </div>
      <div className="mt-6">
        <button
          onClick={() => onManage(id)}
          className={`w-full py-2 px-4 text-sm font-semibold rounded-lg transition-colors ${
            connected
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              : 'bg-violet-600 text-white hover:bg-violet-700'
          }`}
        >
          {connected ? 'Kelola' : 'Hubungkan'}
        </button>
      </div>
    </div>
  );
};
