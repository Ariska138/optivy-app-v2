import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from '../../types';
import { productForms } from '../../constants/forms';
import { ActionBar } from './components/ActionBar';
import { FormTable } from './components/FormTable';

const FormsNotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return productForms;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return productForms.filter(
      (form) =>
        form.name.toLowerCase().includes(lowercasedFilter) ||
        form.productName.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm]);

  const handleAddForm = () => {
    navigate('/products/new');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ActionBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddProduct={handleAddForm}
        buttonText="Buat Form Baru"
      />
      <div className="flex-1 overflow-auto bg-violet-50 px-4 pb-4 pt-4">
        <FormTable forms={filteredData} />
      </div>
    </div>
  );
};

export default FormsNotificationsPage;
