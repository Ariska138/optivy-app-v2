import React, { useState, useMemo } from 'react';
import { Header } from '../../components/layout/Header';
import { Tabs } from './components/Tabs';
import { SummaryPanel } from './components/SummaryPanel';
import { ActionBar } from './components/ActionBar';
import { ProductTable } from './components/ProductTable';
import { LeadProductList } from './components/LeadProductList';
import { ProductCategory, Product, LeadProduct, PageType } from '../../types';
import {
  authors,
  physicalProducts,
  digitalProducts,
  lmsProducts,
  leadProducts,
} from '../../constants/products';

interface ProductsPageProps {
  setCurrentPage: (page: PageType) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState<ProductCategory>(
    ProductCategory.Fisik
  );
  const [searchTerm, setSearchTerm] = useState('');

  const processedData = useMemo(() => {
    const createProductData = (
      product: { name: string; price: number },
      type: string
    ): Product => {
      const orders = Math.floor(Math.random() * 250) + 20;
      const paid = Math.floor(orders * (Math.random() * 0.2 + 0.8));
      const paidRatio = ((paid / orders) * 100).toFixed(1) + '%';
      const revenue = product.price * paid;
      const author = authors[Math.floor(Math.random() * authors.length)];
      const lastChanged = `${Math.floor(Math.random() * 28) + 1} hari lalu`;
      const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const url = `https://example.com/${type}/${slug}`;
      return {
        id: slug,
        name: product.name,
        price: product.price,
        orders,
        paid,
        paidRatio,
        revenue,
        author,
        lastChanged,
        url,
      };
    };

    const createLeadData = (name: string): LeadProduct => {
      const author = authors[Math.floor(Math.random() * authors.length)];
      const lastChanged = `${Math.floor(Math.random() * 28) + 1} hari lalu`;
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const url = `https://example.com/lead/${slug}`;
      const prospects = Math.floor(Math.random() * 500) + 50;
      return { id: slug, name, author, lastChanged, url, prospects };
    };

    return {
      [ProductCategory.Fisik]: physicalProducts.map((p) =>
        createProductData(p, 'fisik')
      ),
      [ProductCategory.Digital]: digitalProducts.map((p) =>
        createProductData(p, 'digital')
      ),
      [ProductCategory.LMS]: lmsProducts.map((p) =>
        createProductData(p, 'lms')
      ),
      [ProductCategory.Lead]: leadProducts.map(createLeadData),
    };
  }, []);

  const filteredData = useMemo(() => {
    const sourceData = processedData[activeTab];
    if (!searchTerm) {
      return sourceData;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return sourceData.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercasedFilter) ||
        item.author.toLowerCase().includes(lowercasedFilter)
    );
  }, [activeTab, searchTerm, processedData]);

  const renderContent = () => {
    if (activeTab === ProductCategory.Lead) {
      return <LeadProductList products={filteredData as LeadProduct[]} />;
    }
    return <ProductTable products={filteredData as Product[]} />;
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Produk" />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <SummaryPanel activeTab={activeTab} data={processedData[activeTab]} />
      <ActionBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddProduct={() => setCurrentPage('product-creation')}
      />
      <div className="flex-1 overflow-auto bg-violet-50 px-4 pb-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProductsPage;

