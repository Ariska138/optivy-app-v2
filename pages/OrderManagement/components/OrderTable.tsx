import React, { useState, useEffect, useRef } from 'react';
import type { TabType, Order, Lead } from '../../../types';

// --- Reusable Sub-components ---
const ActionButtons: React.FC<{ onViewDetail?: () => void }> = ({ onViewDetail }) => {
    return (
        <div className="flex items-center space-x-3">
            {onViewDetail && (
                 <button onClick={onViewDetail} className="text-gray-400 hover:text-indigo-600 transition-colors duration-200" title="View Details">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
            )}
            <button className="text-gray-400 hover:text-blue-600 transition-colors duration-200" title="Edit"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg></button>
            <button className="text-gray-400 hover:text-green-600 transition-colors duration-200" title="Ubah Status"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg></button>
            <button className="text-gray-400 hover:text-red-600 transition-colors duration-200" title="Delete"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
            <button className="text-gray-400 hover:text-violet-600 transition-colors duration-200" title="Send Produk"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
        </div>
    );
}

const DropdownMenu: React.FC = () => (
    <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-50">Complete</a>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-50">Cancel</a>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-50">Upsale</a>
    </div>
);

const FollowupButtons: React.FC<{ order: Order | Lead; type?: 'wa' | 'email' }> = ({ order, type = 'wa' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const stage = type === 'wa' ? order.followupStage : (order as Lead).fuEmailStage;
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const icon = type === 'wa'
        ? <button className="w-7 h-7 flex items-center justify-center rounded-md bg-green-100 text-green-700" title="Welcome Message"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943s-.182-.133-.38-.232"/></svg></button>
        : <button className="w-7 h-7 flex items-center justify-center rounded-md bg-blue-100 text-blue-700" title="Welcome Email"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg></button>;

    return (
        <div className="flex items-center gap-1">
            {icon}
            {[...Array(5)].map((_, i) => (
                <button key={i} className={`w-7 h-7 flex items-center justify-center rounded-md font-bold text-xs transition-colors duration-200 ${i < stage ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-700'}`} title={`Follow Up ${i + 1}`}>{i + 1}</button>
            ))}
            <div className="relative" ref={menuRef}>
                <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-full hover:bg-gray-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                </button>
                {isOpen && <DropdownMenu />}
            </div>
        </div>
    );
};

const CSBadge: React.FC<{ cs: string }> = ({ cs }) => (
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-200 text-violet-700 font-bold text-xs">{cs}</div>
);

const getStatusClass = (status: Order['status']) => {
    switch (status) {
        case 'Completed': case 'Shipped': return 'bg-green-100 text-green-800';
        case 'Processing': return 'bg-yellow-100 text-yellow-800';
        case 'Return': return 'bg-pink-100 text-pink-800';
        case 'Canceled': return 'bg-gray-200 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const getPaymentStatusClass = (status: Order['paymentStatus']) => {
    switch (status) {
        case 'Paid': return 'bg-green-100 text-green-800';
        case 'Unpaid': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const TransferProofButton: React.FC = () => (
    <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200" title="Lihat Bukti">
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1a2 2 0 010-2.828l1-1"></path><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
    </button>
);


const Th: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = 'text-left' }) => (
    <th className={`px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider ${className}`}>
        {children}
    </th>
);

const Td: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-900">{children}</td>
);

// --- Table Headers Configuration ---
const TABLE_HEADERS: Record<TabType, string[]> = {
    digital: ['Order ID', 'Customer', 'Status', 'Status Payment', 'Gross Revenue', 'CS', 'Followup', 'Produk', 'Bukti Transfer', 'UTM', 'Action'],
    fisik: ['Order ID', 'Customer', 'Kota', 'Kurir', 'Status', 'Status Payment', 'Gross Revenue', 'CS', 'Followup', 'Produk', 'Bukti Transfer', 'Action'],
    lms: ['Order ID', 'Customer', 'Status', 'Status Payment', 'Gross Revenue', 'CS', 'Followup', 'Produk', 'Bukti Transfer', 'UTM', 'Action'],
    lead: ['Lead ID', 'Customer', 'CS', 'FU WhatsApp', 'FU Email', 'Produk', 'UTM', 'Action'],
};

// --- Main Table Component ---
interface OrderTableProps {
    activeTab: TabType;
    data: (Order | Lead)[];
    onViewDetail: (order: Order | Lead) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({ activeTab, data, onViewDetail }) => {
    const headers = TABLE_HEADERS[activeTab];

    const renderRowCells = (item: Order | Lead) => {
        const [date, time] = item.date.split(' ');
        
        if (activeTab === 'digital' || activeTab === 'lms') {
            const order = item as Order;
            return (
                <>
                    <Td><p className="font-semibold">{order.id}</p><p className="text-gray-600 text-xs">{date} {time}</p></Td>
                    <Td><p className="font-medium">{order.customer}</p><p className="text-gray-600 text-xs">{order.email}</p><p className="text-gray-600 text-xs">WA: {order.phone}</p></Td>
                    <Td><span className={`px-3 py-1 font-semibold leading-tight ${getStatusClass(order.status)} rounded-full text-xs`}>{order.status}</span></Td>
                    <Td><span className={`px-3 py-1 font-semibold leading-tight ${getPaymentStatusClass(order.paymentStatus)} rounded-full text-xs`}>{order.paymentStatus}</span><p className="text-gray-600 text-xs mt-1">{order.paymentMethod}</p></Td>
                    <Td><p className="font-medium">Rp {order.revenue.toLocaleString('id-ID')}</p></Td>
                    <Td><CSBadge cs={order.cs} /></Td>
                    <Td><FollowupButtons order={order} /></Td>
                    <Td><p>{order.product}</p></Td>
                    <Td><div className="text-center">{order.transferProof ? <TransferProofButton /> : '-'}</div></Td>
                    <Td><p>{order.utm}</p></Td>
                    <Td><ActionButtons onViewDetail={() => onViewDetail(order)} /></Td>
                </>
            );
        }

        if (activeTab === 'fisik') {
            const order = item as Order;
            return (
                <>
                    <Td><p className="font-semibold">{order.id}</p><p className="text-gray-600 text-xs">{date} {time}</p></Td>
                    <Td><p className="font-medium">{order.customer}</p><p className="text-gray-600 text-xs">{order.email}</p><p className="text-gray-600 text-xs">WA: {order.phone}</p></Td>
                    <Td><p>{order.city}</p></Td>
                    <Td><p>{order.courier}</p></Td>
                    <Td><span className={`px-3 py-1 font-semibold leading-tight ${getStatusClass(order.status)} rounded-full text-xs`}>{order.status}</span></Td>
                    <Td><span className={`px-3 py-1 font-semibold leading-tight ${getPaymentStatusClass(order.paymentStatus)} rounded-full text-xs`}>{order.paymentStatus}</span><p className="text-gray-600 text-xs mt-1">{order.paymentMethod}</p></Td>
                    <Td><p className="font-medium">Rp {order.revenue.toLocaleString('id-ID')}</p></Td>
                    <Td><CSBadge cs={order.cs} /></Td>
                    <Td><FollowupButtons order={order} /></Td>
                    <Td><p>{order.product}</p></Td>
                    <Td><div className="text-center">{order.transferProof ? <TransferProofButton /> : '-'}</div></Td>
                    <Td><ActionButtons onViewDetail={() => onViewDetail(order)} /></Td>
                </>
            );
        }

        if (activeTab === 'lead') {
            const lead = item as Lead;
            return (
                <>
                    <Td><p className="font-semibold">{lead.id}</p><p className="text-gray-600 text-xs">{date} {time}</p></Td>
                    <Td><p className="font-medium">{lead.customer}</p><p className="text-gray-600 text-xs">{lead.email}</p><p className="text-gray-600 text-xs">WA: {lead.phone}</p></Td>
                    <Td><CSBadge cs={lead.cs} /></Td>
                    <Td><FollowupButtons order={lead} type="wa" /></Td>
                    <Td><FollowupButtons order={lead} type="email" /></Td>
                    <Td><p>{lead.product}</p></Td>
                    <Td><p>{lead.utm}</p></Td>
                    <Td><ActionButtons onViewDetail={() => onViewDetail(lead)} /></Td>
                </>
            );
        }

        return null;
    };

    return (
        <table className="min-w-full leading-normal">
            <thead className="bg-violet-50">
                <tr>
                    <Th className="text-center">
                        <input type="checkbox" className="h-4 w-4 bg-white border-gray-300 rounded focus:ring-violet-500 accent-violet-600" style={{ colorScheme: 'light' }}/>
                    </Th>
                    {headers.map(header => (
                        <Th key={header} className={header === 'Bukti Transfer' ? 'text-center' : 'text-left'}>{header}</Th>
                    ))}
                </tr>
            </thead>
            <tbody className="table-body">
                {data.length === 0 ? (
                    <tr>
                        <td colSpan={headers.length + 1} className="text-center py-10 text-gray-500">
                            Tidak ada data ditemukan.
                        </td>
                    </tr>
                ) : (
                    data.map(item => (
                        <tr key={item.id}>
                           <td className="px-5 py-4 border-b border-gray-200 text-center">
                               <input type="checkbox" className="row-checkbox h-4 w-4 bg-white border-gray-300 rounded focus:ring-violet-500 accent-violet-600" style={{ colorScheme: 'light' }}/>
                           </td>
                           {renderRowCells(item)}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};
