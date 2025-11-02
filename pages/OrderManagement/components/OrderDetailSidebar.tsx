import React from 'react';
import { Order, Lead, ViewType } from '../../../types';
import DetailCard from '../../../components/ui/DetailCard';

const CustomerInfoCard: React.FC<{ order: Order | Lead }> = ({ order }) => (
    <DetailCard>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Informasi Pelanggan</h3>
            <button className="p-2 rounded-lg hover:bg-gray-100"><i className="ph ph-pencil-simple text-lg"></i></button>
        </div>
        <div className="space-y-2 text-sm">
            <p className="font-semibold">{order.customer}</p>
            <p className="text-gray-500">{order.email}</p>
            <p className="text-gray-500">{order.phone}</p>
        </div>
        <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-gray-500 mb-1">Customer IP Address</p>
            <div className="flex justify-between items-center gap-2">
                <span className="font-mono text-sm text-gray-700 truncate">2405:8180:401:1eac:3d9d:69a9:312:a6f6</span>
                <button className="text-xs text-red-600 border border-red-300 rounded-md px-2 py-1 hover:bg-red-50 flex-shrink-0">Blokir IP</button>
            </div>
        </div>
    </DetailCard>
);

const CsUtmCard: React.FC<{ order: Order | Lead }> = ({ order }) => (
    <DetailCard>
        <h3 className="text-lg font-bold mb-4">CS & UTM Detail</h3>
        <div className="space-y-3 text-sm">
            <div>
                <label className="block text-sm font-medium text-gray-700">CS Bertugas</label>
                <select defaultValue={order.cs} className="bg-white text-gray-900 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option>AN</option>
                    <option>BW</option>
                    <option>CS</option>
                    <option>DN</option>
                </select>
            </div>
            <div>
                <p className="font-medium text-gray-500 mt-4">UTM Detail</p>
                <pre className="bg-gray-100 text-gray-600 text-xs p-3 mt-1 rounded-lg overflow-x-auto"><code>{order.utm?.split('_').join('\n') || 'N/A'}</code></pre>
            </div>
        </div>
    </DetailCard>
);

const PurchaseEventCard: React.FC<{ source: string }> = ({ source }) => (
    <DetailCard>
        <h3 className="text-lg font-bold mb-4">Purchase Event Status</h3>
        <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-center gap-3">
            <i className="ph-fill ph-check-circle text-2xl"></i>
            <div>
                <p className="font-semibold">Triggered Successfully</p>
                <p className="text-xs">Source: {source} | 10 Agu 2025</p>
            </div>
        </div>
        <button className="mt-4 w-full bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2">
            <i className="ph ph-lightning text-base"></i><span>Trigger Manual</span>
        </button>
    </DetailCard>
);

const PaymentMethodCard: React.FC<{ order: Order }> = ({ order }) => (
    <DetailCard>
        <h3 className="text-lg font-bold mb-4">Metode Pembayaran</h3>
        <div className="flex items-center gap-3">
            <img src={`https://placehold.co/40x40/random/FFFFFF?text=${order.paymentMethod.substring(0,3)}`} className="h-10 w-10 rounded-md" alt="Payment Method" />
            <div>
                <p className="font-semibold">{order.paymentMethod}</p>
                <p className="text-xs text-gray-500">No. 1234567890</p>
            </div>
        </div>
    </DetailCard>
);

const OrderSummaryCard: React.FC<{ viewType: ViewType; order: Order }> = ({ viewType, order }) => {
    const format = (num: number) => num.toLocaleString('id-ID');
    const total = order.revenue;
    let shipping = 0;
    let discount = 0;
    let subtotal = total;
    let isSubscription = false;

    if (viewType === ViewType.Physical) {
        shipping = 15000;
        discount = Math.floor(total * 0.1);
        subtotal = total - shipping + discount;
    } else if (viewType === ViewType.Digital) {
        discount = Math.floor(total * 0.1);
        subtotal = total + discount;
    } else if (viewType === ViewType.LMS) {
        isSubscription = true;
    }
    
    return (
        <DetailCard>
            <h3 className="text-lg font-bold mb-4">Ringkasan Pesanan</h3>
            <div className="space-y-2 text-sm text-gray-600">
                {isSubscription 
                    ? <div className="flex justify-between"><span>Harga Langganan</span> <span>Rp {format(total)}</span></div>
                    : <div className="flex justify-between"><span>Subtotal Produk</span> <span>Rp {format(subtotal)}</span></div>
                }
                {shipping > 0 && <div className="flex justify-between"><span>Biaya Pengiriman</span> <span>Rp {format(shipping)}</span></div>}
                {discount > 0 && <div className="flex justify-between"><span>Diskon</span> <span className="text-green-600">- Rp {format(discount)}</span></div>}
                <hr className="my-2 border-dashed" />
                <div className="flex justify-between text-base font-bold text-gray-800"><span>Total</span><span>Rp {format(total)}</span></div>
            </div>
        </DetailCard>
    );
};

const HistoryItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative pl-7 pb-2 border-l-2 border-gray-200 last:pb-0 last:border-l-transparent">
        <div className="absolute left-[-0.4rem] top-1 w-3 h-3 rounded-full bg-[#7E57C2]"></div>
        {children}
    </div>
);

const HistoryLogCard: React.FC<{ viewType: ViewType }> = ({ viewType }) => {
    const historyData = {
        [ViewType.Physical]: [
            { title: "Status History", content: <>Status: <span className="font-bold">Dalam Pengiriman</span>. <span className="text-gray-400">(11/08)</span></> },
            { title: "Payment History", content: <>Status: <span className="font-bold text-green-600">Lunas</span>. <span className="text-gray-400">(10/08)</span></> },
            { title: "Email History", content: <>Email <span className="font-bold">Info Pengiriman</span> dikirim. <span className="text-gray-400">(11/08)</span></> },
        ],
        [ViewType.Digital]: [
            { title: "Status History", content: <>Status: <span className="font-bold">Selesai</span>. <span className="text-gray-400">(10/08)</span></> },
            { title: "Payment History", content: <>Status: <span className="font-bold text-green-600">Lunas</span>. <span className="text-gray-400">(10/08)</span></> },
            { title: "Email History", content: <>Email <span className="font-bold">Akses Produk</span> dikirim. <span className="text-gray-400">(10/08)</span></> },
        ],
        [ViewType.LMS]: [
            { title: "Status History", content: <>Status: <span className="font-bold">Aktif</span>. <span className="text-gray-400">(10/08)</span></> },
            { title: "Payment History", content: <>Status: <span className="font-bold text-green-600">Lunas</span>. <span className="text-gray-400">(10/08)</span></> },
            { title: "Email History", content: <>Email <span className="font-bold">Akses LMS</span> dikirim. <span className="text-gray-400">(10/08)</span></> },
        ],
        [ViewType.Lead]: [
            { title: "Status History", content: <>Status: <span className="font-bold">Baru</span>. <span className="text-gray-400">(10/08)</span></> },
            { title: "Email History", content: <>Email <span className="font-bold">Konfirmasi Lead</span> dikirim. <span className="text-gray-400">(10/08)</span></> },
        ],
    };
    return (
        <DetailCard>
            <h3 className="text-lg font-bold mb-4">Riwayat & Log</h3>
            <div className="space-y-4 text-xs">
                {historyData[viewType].map((section, index) => (
                    <div key={index}>
                        <h4 className="font-semibold mb-2 text-gray-800">{section.title}</h4>
                        <HistoryItem>{section.content}</HistoryItem>
                    </div>
                ))}
            </div>
        </DetailCard>
    );
};

interface SidebarProps {
  viewType: ViewType;
  order: Order | Lead;
}

export const OrderDetailSidebar: React.FC<SidebarProps> = ({ viewType, order }) => {
  const purchaseEventSource = {
      [ViewType.Physical]: "Website",
      [ViewType.Digital]: "Facebook Ads",
      [ViewType.LMS]: "Google Ads",
      [ViewType.Lead]: "Form Submission",
  }
  return (
    <aside className="lg:col-span-1 space-y-6">
      <CustomerInfoCard order={order} />
      {viewType !== ViewType.Lead && <PaymentMethodCard order={order as Order} />}
      {viewType !== ViewType.Lead && <OrderSummaryCard viewType={viewType} order={order as Order} />}
      <CsUtmCard order={order} />
      <HistoryLogCard viewType={viewType} />
      <PurchaseEventCard source={purchaseEventSource[viewType]} />
    </aside>
  );
};
