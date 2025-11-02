import React from 'react';
import { ProductCreationType } from '../../../types';
import ProductTypeButton from './ProductTypeButton';

interface ProductTypeSelectionProps {
  onSelect: (type: ProductCreationType) => void;
}

const ProductTypeSelection: React.FC<ProductTypeSelectionProps> = ({
  onSelect,
}) => (
  <div className="max-w-4xl mx-auto animate-fade-in">
    <div className="text-center mb-6">
      <span className="text-sm font-bold text-slate-500 uppercase">
        Langkah 1: Pilih Tipe Produk
      </span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductTypeButton
        icon="fa-box-open"
        label="Fisik"
        type="physical"
        onSelect={onSelect}
        disabled
      />
      <ProductTypeButton
        icon="fa-mobile-screen-button"
        label="Digital"
        type="digital"
        onSelect={onSelect}
      />
      <ProductTypeButton
        icon="fa-display"
        label="LMS"
        type="lms"
        onSelect={onSelect}
        disabled
      />
      <ProductTypeButton
        icon="fa-database"
        label="Database"
        type="database"
        onSelect={onSelect}
        disabled
      />
    </div>
  </div>
);

export default ProductTypeSelection;

