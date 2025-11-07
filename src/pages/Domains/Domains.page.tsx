import React, { useState } from 'react';
import { CustomDomain } from '../../types';
import { DomainList } from './components/DomainList';

const DomainsPage: React.FC = () => {
  const [customDomains, setCustomDomains] = useState<CustomDomain[]>([
    { id: 1, name: 'toko-keren.com', status: 'verified' },
    { id: 2, name: 'bisnis-saya.id', status: 'pending' },
  ]);
  const freeSubdomain = 'zaenal-suep.optivy.net';
  const domainLimit = 3;

  const addDomain = (domainName: string) => {
    if (customDomains.length < domainLimit) {
      const newDomain: CustomDomain = {
        id: Date.now(),
        name: domainName,
        status: 'unverified',
      };
      setCustomDomains([...customDomains, newDomain]);
    }
  };

  const deleteDomain = (id: number) => {
    setCustomDomains(customDomains.filter((d) => d.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-6 space-y-8">
        {/* Free Subdomain Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Subdomain Gratis Anda
          </h2>
          <p className="text-gray-500 mt-1">
            Ini adalah domain utama Anda yang disediakan secara gratis.
          </p>
          <div className="mt-4 bg-violet-50 p-4 rounded-lg flex items-center justify-between">
            <span className="font-mono text-violet-800">{freeSubdomain}</span>
            <button
              onClick={() => navigator.clipboard.writeText(freeSubdomain)}
              className="text-sm font-semibold text-violet-600 hover:text-violet-800 transition"
            >
              Salin
            </button>
          </div>
        </div>

        {/* Custom Domains Section */}
        <DomainList
          domains={customDomains}
          limit={domainLimit}
          onAddDomain={addDomain}
          onDeleteDomain={deleteDomain}
        />
      </div>
    </div>
  );
};

export default DomainsPage;

