import React, { useState, useEffect } from 'react';
import { Order, Lead, ViewType } from '../../../types';
import { OrderDetailHeader } from './OrderDetailHeader';
import { OrderDetailTabs } from './OrderDetailTabs';
import { DigitalProductView } from './DigitalProductView';
import { OrderDetailSidebar } from './OrderDetailSidebar';
import { PhysicalProductView } from './PhysicalProductView';
import { LmsView } from './LmsView';
import { LeadView } from './LeadView';

interface OrderDetailViewProps {
  order: Order | Lead;
  onBack: () => void;
}

const getInitialViewType = (orderId: string): ViewType => {
    if (orderId.startsWith('ORD-F')) return ViewType.Physical;
    if (orderId.startsWith('ORD-D')) return ViewType.Digital;
    if (orderId.startsWith('ORD-LMS')) return ViewType.LMS;
    if (orderId.startsWith('LEAD')) return ViewType.Lead;
    return ViewType.Digital; // Default fallback
}

export const OrderDetailView: React.FC<OrderDetailViewProps> = ({ order, onBack }) => {
  const [activeView, setActiveView] = useState<ViewType>(() => getInitialViewType(order.id));

  // Update view if the order prop changes
  useEffect(() => {
    setActiveView(getInitialViewType(order.id));
  }, [order.id]);

  const renderMainContent = () => {
    switch (activeView) {
      case ViewType.Digital:
        return <DigitalProductView order={order as Order} />;
      case ViewType.Physical:
        return <PhysicalProductView order={order as Order} />;
      case ViewType.LMS:
        return <LmsView order={order as Order} />;
      case ViewType.Lead:
        return <LeadView lead={order as Lead} />;
      default:
        return <p className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">Tampilan untuk tipe '{activeView}' belum diimplementasikan.</p>;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8F7FA] text-[#1F2937]">
        <div className="p-4 sm:p-6 lg:p-8">
            <OrderDetailHeader order={order} onBack={onBack} />
            <OrderDetailTabs activeView={activeView} setActiveView={setActiveView} />
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <main className="lg:col-span-2 space-y-6">
                    {renderMainContent()}
                </main>
                <OrderDetailSidebar viewType={activeView} order={order} />
            </div>
        </div>
    </div>
  );
};
