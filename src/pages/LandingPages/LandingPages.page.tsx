import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionBar } from './components/ActionBar';
import { landingPagesData } from './constants';
import { LandingPageTable } from './components/LandingPageTable';
import { LandingPage } from './types';

const LandingPagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return landingPagesData;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return landingPagesData.filter(
      (page: LandingPage) =>
        page.title.toLowerCase().includes(lowercasedFilter) ||
        page.url.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm]);

  const handleAddPage = () => {
    navigate('/products/page-builder');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ActionBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddProduct={handleAddPage}
        buttonText="Buat Landing Page Baru"
      />
      <div className="flex-1 overflow-auto bg-violet-50 px-4 pb-4 pt-4">
        <LandingPageTable pages={filteredData} />
      </div>
    </div>
  );
};

export default LandingPagesPage;
