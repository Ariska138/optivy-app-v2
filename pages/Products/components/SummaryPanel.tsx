import React from 'react';
// FIX: Changed import to value import for ProductCategory as it is used in the switch statement.
import { ProductCategory, type Product, type LeadProduct } from '../../../types';

interface SummaryPanelProps {
    activeTab: ProductCategory;
    data: (Product | LeadProduct)[];
}

const SummaryCard: React.FC<{ title: string; value: string | number; color?: string }> = ({ title, value, color = 'text-violet-600' }) => (
    <div className="summary-card w-48 bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className={`text-2xl font-semibold mt-1 ${color}`}>{value}</p>
    </div>
);

const ProductSummary: React.FC<{ data: Product[], categoryName: string }> = ({ data, categoryName }) => {
    const totalProducts = data.length;
    const totalRevenue = data.reduce((sum, p) => sum + p.revenue, 0);
    const averagePrice = totalProducts > 0 ? totalRevenue / totalProducts : 0;

    return (
        <div className="summary-slider flex overflow-x-auto py-2 space-x-4">
            <SummaryCard title={`Total Produk ${categoryName}`} value={totalProducts} />
            <SummaryCard title="Total Pendapatan" value={`Rp ${totalRevenue.toLocaleString('id-ID')}`} color="text-green-600" />
            <SummaryCard title="Harga Rata-rata" value={`Rp ${averagePrice.toLocaleString('id-ID')}`} />
        </div>
    );
};

const LeadSummary: React.FC<{ data: LeadProduct[] }> = ({ data }) => {
    const totalLeads = data.length;
    const totalProspects = data.reduce((sum, p) => sum + p.prospects, 0);

    return (
        <div className="summary-slider flex overflow-x-auto py-2 space-x-4">
            <SummaryCard title="Total Lead Magnet" value={totalLeads} />
            <SummaryCard title="Total Prospek" value={totalProspects.toLocaleString('id-ID')} color="text-blue-600" />
        </div>
    );
};


export const SummaryPanel: React.FC<SummaryPanelProps> = ({ activeTab, data }) => {
    
    const renderSummary = () => {
        switch (activeTab) {
            case ProductCategory.Fisik:
                return <ProductSummary data={data as Product[]} categoryName="Fisik" />;
            case ProductCategory.Digital:
                return <ProductSummary data={data as Product[]} categoryName="Digital" />;
            case ProductCategory.LMS:
                return <ProductSummary data={data as Product[]} categoryName="LMS" />;
            case ProductCategory.Lead:
                return <LeadSummary data={data as LeadProduct[]} />;
            default:
                return null;
        }
    };
    
    return (
        <div className="p-4 bg-violet-50">
            {renderSummary()}
        </div>
    );
};
