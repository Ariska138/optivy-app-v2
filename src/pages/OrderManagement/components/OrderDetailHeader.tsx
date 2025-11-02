import React from 'react';
import { Order, Lead } from '../../../types';

interface OrderDetailHeaderProps {
  order: Order | Lead;
  onBack: () => void;
}

export const OrderDetailHeader: React.FC<OrderDetailHeaderProps> = ({
  order,
  onBack,
}) => {
  const lastUpdate =
    new Date(order.date).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WIB';

  return (
    <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="bg-gray-200 text-gray-800 p-2.5 rounded-lg hover:bg-gray-300 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Detail Pesanan (Admin)
          </h1>
          <div className="flex items-center gap-3 text-gray-500 mt-2 text-sm">
            <span>ID: #{order.id}</span>
            <i className="ph ph-dot-outline"></i>
            <span>Last Update: {lastUpdate}</span>
          </div>
        </div>
      </div>
      <button className="bg-[#5E35B1] text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
        <i className="ph ph-floppy-disk text-lg"></i>
        <span>Simpan Perubahan</span>
      </button>
    </header>
  );
};

