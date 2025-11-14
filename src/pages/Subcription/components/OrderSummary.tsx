import React from 'react';

interface OrderSummaryProps {
  planName: string;
  price: number;
  trialPeriod: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  planName,
  price,
  trialPeriod,
}) => {
  return (
    <div className="bg-violet-50 p-6 rounded-2xl border border-violet-200 sticky top-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Ringkasan Pesanan
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Paket {planName}</p>
          <p className="font-semibold text-gray-800">
            Rp{price.toLocaleString('id-ID')}/bulan
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Masa Coba Gratis</p>
          <p className="font-semibold text-gray-800">{trialPeriod}</p>
        </div>
        <div className="flex justify-between items-center text-green-600">
          <p>Diskon Hari Ini</p>
          <p className="font-semibold">-Rp{price.toLocaleString('id-ID')}</p>
        </div>
      </div>
      <div className="border-t border-violet-200 my-4"></div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-gray-800">
          Total Tagihan Hari Ini
        </p>
        <p className="font-bold text-2xl text-violet-700">Rp0</p>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Tagihan pertama Anda sebesar{' '}
        <span className="font-semibold">Rp{price.toLocaleString('id-ID')}</span>{' '}
        akan jatuh tempo setelah masa coba gratis {trialPeriod} Anda berakhir.
      </p>
    </div>
  );
};

export default OrderSummary;
