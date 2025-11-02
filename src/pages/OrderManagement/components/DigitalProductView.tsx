import React from 'react';
import { Order } from '../../../types';
import DetailCard from '../../../components/ui/DetailCard';
import FollowUpCard from './FollowUpCard';

const StatusBadge: React.FC<{
  text: string;
  type: 'paid' | 'unpaid' | 'completed' | 'processing';
}> = ({ text, type }) => {
  const typeClasses = {
    paid: 'bg-green-100 text-green-800',
    unpaid: 'bg-red-100 text-red-800',
    completed: 'bg-gray-200 text-gray-700',
    processing: 'bg-yellow-100 text-yellow-800',
  };
  return (
    <span
      className={`inline-block py-1 px-3 text-xs font-semibold uppercase rounded-full ${typeClasses[type]}`}
    >
      {text}
    </span>
  );
};

interface DigitalProductViewProps {
  order: Order;
}

export const DigitalProductView: React.FC<DigitalProductViewProps> = ({
  order,
}) => {
  const getStatusBadgeType = (
    status: Order['status']
  ): 'completed' | 'processing' => {
    return status === 'Completed' ? 'completed' : 'processing';
  };

  const getPaymentStatusBadgeType = (
    status: Order['paymentStatus']
  ): 'paid' | 'unpaid' => {
    return status === 'Paid' ? 'paid' : 'unpaid';
  };

  return (
    <React.Fragment>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <h2 className="text-xl font-bold">Status Saat Ini:</h2>
        <StatusBadge
          text={order.status}
          type={getStatusBadgeType(order.status)}
        />
        <StatusBadge
          text={order.paymentStatus}
          type={getPaymentStatusBadgeType(order.paymentStatus)}
        />
      </div>
      <DetailCard>
        <h2 className="text-xl font-bold mb-4">Manajemen Pesanan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="order-status-digi"
            >
              Status Pesanan
            </label>
            <select
              id="order-status-digi"
              defaultValue={order.status}
              className="bg-white text-gray-900 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option>Completed</option>
              <option>Processing</option>
              <option>Canceled</option>
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="payment-status-digi"
            >
              Status Pembayaran
            </label>
            <select
              id="payment-status-digi"
              defaultValue={order.paymentStatus}
              className="bg-white text-gray-900 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option>Paid</option>
              <option>Unpaid</option>
            </select>
          </div>
        </div>
      </DetailCard>
      <FollowUpCard />
      <DetailCard>
        <h2 className="text-xl font-bold mb-4">Akses Produk</h2>
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <img
            src="https://placehold.co/128x128/5E35B1/FFFFFF?text=PRODUK"
            alt="Gambar Produk Digital"
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{order.product}</h3>
            <p className="text-sm text-gray-500 mt-1">Kategori: Kelas Online</p>
            <button className="w-full sm:w-auto mt-4 bg-[#5E35B1] text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm flex items-center justify-center gap-2 hover:bg-opacity-90 transition">
              <i className="ph-fill ph-paper-plane-tilt text-lg"></i>
              <span>Send Akses Produk</span>
            </button>
          </div>
        </div>
      </DetailCard>
      <DetailCard>
        <h2 className="text-xl font-bold mb-4">Bukti Transfer</h2>
        <div className="flex items-center gap-4">
          {order.transferProof ? (
            <img
              src="https://placehold.co/200x100/E5E7EB/4B5563?text=Lihat+Bukti"
              alt="Bukti Transfer"
              className="w-48 h-auto object-cover rounded-lg border-2 border-dashed p-1"
            />
          ) : (
            <p className="text-gray-500 text-sm">
              Bukti transfer belum diupload.
            </p>
          )}
          <button className="bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 py-2 px-4 rounded-lg font-medium">
            Upload/Ganti
          </button>
        </div>
      </DetailCard>
    </React.Fragment>
  );
};

