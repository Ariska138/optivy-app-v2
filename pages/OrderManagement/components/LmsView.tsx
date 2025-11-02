import React from 'react';
import { Order } from '../../../types';
import DetailCard from '../../../components/ui/DetailCard';

export const LmsView: React.FC<{ order: Order }> = ({ order }) => (
    <DetailCard>
        <h2 className="text-xl font-bold mb-4">LMS: {order.product}</h2>
        <p className="text-gray-600">Tampilan detail untuk produk LMS sedang dalam pengembangan.</p>
        <div className="mt-4 space-y-2">
            <p><strong>Status Akses:</strong> {order.status}</p>
        </div>
    </DetailCard>
);
