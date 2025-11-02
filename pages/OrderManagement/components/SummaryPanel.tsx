import React from 'react';
import type { TabType, Order, Lead } from '../../../types';

interface SummaryPanelProps {
    activeTab: TabType;
    data: (Order | Lead)[];
}

const formatCurrency = (value: number) => `Rp ${value.toLocaleString('id-ID')}`;

const SummaryCard: React.FC<{ title: string; value: string | number; color?: string }> = ({ title, value, color = 'text-violet-600' }) => (
    <div className="summary-card w-48 bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className={`text-2xl font-semibold mt-1 ${color}`}>{value}</p>
    </div>
);

const DigitalSummary: React.FC<{ data: Order[] }> = ({ data }) => {
    const totalOrders = data.length;
    const grossRevenue = data.reduce((sum, o) => sum + o.revenue, 0);
    const unpaidRevenue = data.filter(o => o.paymentStatus === 'Unpaid').reduce((sum, o) => sum + o.revenue, 0);

    return (
        <div className="summary-slider flex overflow-x-auto py-2 space-x-4">
            <SummaryCard title="Total Orders" value={totalOrders} />
            <SummaryCard title="Bump Pesanan" value={Math.floor(totalOrders / 2)} />
            <SummaryCard title="Bump Revenue" value={formatCurrency(grossRevenue * 0.12)} />
            <SummaryCard title="COGS" value={formatCurrency(grossRevenue * 0.3)} />
            <SummaryCard title="Unpaid Revenue" value={formatCurrency(unpaidRevenue)} color="text-red-500" />
            <SummaryCard title="Gross Revenue" value={formatCurrency(grossRevenue)} color="text-green-600" />
            <SummaryCard title="Net Revenue" value={formatCurrency(grossRevenue * 0.95)} color="text-green-600" />
            <SummaryCard title="Gross Profit" value={formatCurrency(grossRevenue * 0.7)} color="text-green-600" />
            <SummaryCard title="Net Profit" value={formatCurrency(grossRevenue * 0.55)} color="text-green-600" />
        </div>
    );
};

const FisikSummary: React.FC<{ data: Order[] }> = ({ data }) => {
    const totalOrders = data.length;
    const paidOrders = data.filter(o => o.paymentStatus === 'Paid').length;
    const unpaidOrders = totalOrders - paidOrders;
    const paidRatio = totalOrders > 0 ? `${((paidOrders / totalOrders) * 100).toFixed(0)}%` : '0%';
    const totalRTS = data.filter(o => o.status === 'Processing').length;
    const totalShipped = data.filter(o => o.status === 'Shipped').length;
    const totalReturn = data.filter(o => o.status === 'Return').length;
    const grossRevenue = data.reduce((sum, o) => sum + o.revenue, 0);
    const unpaidRevenue = data.filter(o => o.paymentStatus === 'Unpaid').reduce((sum, o) => sum + o.revenue, 0);

    return (
        <div className="summary-slider flex overflow-x-auto py-2 space-x-4">
            <SummaryCard title="Total Orders" value={totalOrders} />
            <SummaryCard title="Total Paid" value={paidOrders} />
            <SummaryCard title="Paid Ratio" value={paidRatio} />
            <SummaryCard title="Unpaid Orders" value={unpaidOrders} color="text-red-500" />
            <SummaryCard title="Ordered Items" value={totalOrders} />
            <SummaryCard title="RTS" value={totalRTS} color="text-yellow-600" />
            <SummaryCard title="Shipped" value={totalShipped} color="text-blue-600" />
            <SummaryCard title="Return" value={totalReturn} color="text-pink-600" />
            <SummaryCard title="Bump Pesanan" value={Math.floor(totalOrders / 3)} />
            <SummaryCard title="Bump Revenue" value={formatCurrency(grossRevenue * 0.1)} />
            <SummaryCard title="Discount" value={formatCurrency(grossRevenue * 0.05)} />
            <SummaryCard title="Shipping Cost" value={formatCurrency(data.length * 15000)} />
            <SummaryCard title="COGS" value={formatCurrency(grossRevenue * 0.4)} />
            <SummaryCard title="Unpaid Revenue" value={formatCurrency(unpaidRevenue)} color="text-red-500" />
            <SummaryCard title="Gross Revenue" value={formatCurrency(grossRevenue)} color="text-green-600" />
            <SummaryCard title="Net Revenue" value={formatCurrency(grossRevenue * 0.9)} color="text-green-600" />
            <SummaryCard title="Gross Profit" value={formatCurrency(grossRevenue * 0.6)} color="text-green-600" />
            <SummaryCard title="Expenses" value={formatCurrency(grossRevenue * 0.15)} color="text-red-500" />
            <SummaryCard title="Net Profit" value={formatCurrency(grossRevenue * 0.45)} color="text-green-600" />
        </div>
    );
};

const LmsSummary: React.FC<{ data: Order[] }> = ({ data }) => {
    const totalOrders = data.length;
    const grossRevenue = data.reduce((sum, o) => sum + o.revenue, 0);
    const unpaidRevenue = data.filter(o => o.paymentStatus === 'Unpaid').reduce((sum, o) => sum + o.revenue, 0);

    return (
        <div className="summary-slider flex overflow-x-auto py-2 space-x-4">
            <SummaryCard title="Total Orders" value={totalOrders} />
            <SummaryCard title="Bump Pesanan" value={Math.floor(data.length / 2)} />
            <SummaryCard title="Bump Revenue" value={formatCurrency(grossRevenue * 0.12)} />
            <SummaryCard title="COGS" value={formatCurrency(grossRevenue * 0.3)} />
            <SummaryCard title="Unpaid Revenue" value={formatCurrency(unpaidRevenue)} color="text-red-500" />
            <SummaryCard title="Gross Revenue" value={formatCurrency(grossRevenue)} color="text-green-600" />
            <SummaryCard title="Net Revenue" value={formatCurrency(grossRevenue * 0.95)} color="text-green-600" />
            <SummaryCard title="Gross Profit" value={formatCurrency(grossRevenue * 0.7)} color="text-green-600" />
            <SummaryCard title="Net Profit" value={formatCurrency(grossRevenue * 0.55)} color="text-green-600" />
        </div>
    );
};


const LeadSummary: React.FC<{ data: Lead[] }> = ({ data }) => {
    // FIX: Explicitly type the accumulator to ensure correct type inference for `count`.
    const csLeadCounts = data.reduce((acc: Record<string, number>, lead) => {
        acc[lead.cs] = (acc[lead.cs] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="summary-slider flex overflow-x-auto py-2 space-x-4">
            <SummaryCard title="Total Lead" value={data.length} />
            {Object.entries(csLeadCounts).map(([cs, count]) => (
                <SummaryCard key={cs} title={`Lead CS ${cs}`} value={count} />
            ))}
        </div>
    );
};


export const SummaryPanel: React.FC<SummaryPanelProps> = ({ activeTab, data }) => {
    
    const renderSummary = () => {
        switch (activeTab) {
            case 'digital':
                return <DigitalSummary data={data as Order[]} />;
            case 'fisik':
                return <FisikSummary data={data as Order[]} />;
            case 'lms':
                return <LmsSummary data={data as Order[]} />;
            case 'lead':
                return <LeadSummary data={data as Lead[]} />;
            default:
                return null;
        }
    };
    
    if (data.length === 0 && activeTab !== 'lead') {
        return null;
    }

    return (
        <div className="p-4 bg-violet-50">
            {renderSummary()}
        </div>
    );
};
