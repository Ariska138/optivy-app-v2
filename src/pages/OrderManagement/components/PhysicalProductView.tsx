import React from 'react';
import { Order } from '../../../types';
import DetailCard from '../../../components/ui/DetailCard';

export const PhysicalProductView: React.FC<{ order: Order }> = ({ order }) => (
  <DetailCard>
    <h2 className="text-xl font-bold mb-4">Produk Fisik: {order.product}</h2>
    <p className="text-gray-600">
      Tampilan detail untuk produk fisik sedang dalam pengembangan.
    </p>
    <div className="mt-4 space-y-2">
      <p>
        <strong>Status Pengiriman:</strong> {order.status}
      </p>
      <p>
        <strong>Kurir:</strong> {order.courier}
      </p>
      <p>
        <strong>Kota Tujuan:</strong> {order.city}
      </p>
    </div>
  </DetailCard>
);

