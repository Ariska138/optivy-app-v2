import React, { useState } from 'react';
import type { CustomDomain } from '../../../types';

const StatusBadge: React.FC<{ status: CustomDomain['status'] }> = ({
  status,
}) => {
  const styles = {
    verified: 'bg-green-100 text-green-800',
    unverified: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };
  const text = {
    verified: 'Terverifikasi',
    unverified: 'Belum Diverifikasi',
    pending: 'Menunggu',
  };
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}
    >
      {text[status]}
    </span>
  );
};

const DomainItem: React.FC<{
  domain: CustomDomain;
  onDelete: (id: number) => void;
}> = ({ domain, onDelete }) => (
  <div className="flex items-center justify-between p-4 border-b last:border-b-0">
    <div>
      <p className="font-semibold text-gray-800">{domain.name}</p>
      <p className="text-sm text-gray-500">DNS belum terhubung</p>
    </div>
    <div className="flex items-center gap-4">
      <StatusBadge status={domain.status} />
      <button className="text-sm font-medium text-violet-600 hover:underline">
        Verifikasi
      </button>
      <button
        onClick={() => onDelete(domain.id)}
        className="text-gray-400 hover:text-red-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
);

interface DomainListProps {
  domains: CustomDomain[];
  limit: number;
  onAddDomain: (domainName: string) => void;
  onDeleteDomain: (id: number) => void;
}

export const DomainList: React.FC<DomainListProps> = ({
  domains,
  limit,
  onAddDomain,
  onDeleteDomain,
}) => {
  const canAddMore = domains.length < limit;
  const [newDomainName, setNewDomainName] = useState('');

  const handleAddClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDomainName.trim()) {
      onAddDomain(newDomainName.trim());
      setNewDomainName('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Domain Kustom</h2>
          <p className="text-gray-500 mt-1">
            Anda dapat menambahkan hingga {limit - domains.length} domain lagi.
          </p>
        </div>
        <form
          onSubmit={handleAddClick}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <input
            type="text"
            value={newDomainName}
            onChange={(e) => setNewDomainName(e.target.value)}
            placeholder="contoh-domain.com"
            disabled={!canAddMore}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={!canAddMore || !newDomainName.trim()}
            className="bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-violet-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Tambah
          </button>
        </form>
      </div>
      <div className="border rounded-lg overflow-hidden">
        {domains.length > 0 ? (
          domains.map((domain) => (
            <DomainItem
              key={domain.id}
              domain={domain}
              onDelete={onDeleteDomain}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 p-8">
            Anda belum menambahkan domain kustom.
          </p>
        )}
      </div>
    </div>
  );
};

