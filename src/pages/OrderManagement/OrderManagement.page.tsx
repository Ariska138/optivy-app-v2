import React, { useState, useMemo } from 'react';
import { Tabs } from './components/Tabs';
import { SummaryPanel } from './components/SummaryPanel';
import { ActionBar } from './components/ActionBar';
import { OrderTable } from './components/OrderTable';
import { OrderDetailView } from './components/OrderDetailView';
import {
  digitalOrders,
  fisikOrders,
  lmsOrders,
  leadOrders,
} from '../../constants/data';
import type { TabType, Order, Lead } from '../../types';

const OrderManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('digital');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState<string>('');
  const [viewingOrder, setViewingOrder] = useState<Order | Lead | null>(null);

  const dataMap = useMemo(
    () => ({
      digital: digitalOrders,
      fisik: fisikOrders,
      lms: lmsOrders,
      lead: leadOrders,
    }),
    []
  );

  const filteredData = useMemo(() => {
    const sourceData = dataMap[activeTab];
    let data = [...sourceData];
    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      data = data.filter(
        (item) =>
          (item.customer &&
            item.customer.toLowerCase().includes(lowercasedFilter)) ||
          (item.phone && item.phone.toLowerCase().includes(lowercasedFilter)) ||
          (item.email && item.email.toLowerCase().includes(lowercasedFilter)) ||
          (item.id && item.id.toLowerCase().includes(lowercasedFilter)) ||
          ('product' in item &&
            item.product &&
            item.product.toLowerCase().includes(lowercasedFilter))
      );
    }
    if (filterDate) {
      data = data.filter((item) => item.date.split(' ')[0] === filterDate);
    }
    return data as (Order | Lead)[];
  }, [activeTab, searchTerm, filterDate, dataMap]);

  if (viewingOrder) {
    return (
      <OrderDetailView
        order={viewingOrder}
        onBack={() => setViewingOrder(null)}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <SummaryPanel activeTab={activeTab} data={filteredData} />
      <ActionBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />
      <div className="flex-1 overflow-auto bg-violet-50 px-4 pb-4">
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <OrderTable
            activeTab={activeTab}
            data={filteredData}
            onViewDetail={setViewingOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderManagementPage;

