import React, { useState } from 'react';
import { LeadProduct } from '../../../types';
import {
  ViewIcon,
  CopyIcon,
  EditIcon,
  DuplicateIcon,
  DeleteIcon,
  CheckIcon,
} from './Icons';

interface LeadProductListProps {
  products: LeadProduct[];
}

export const LeadProductList: React.FC<LeadProductListProps> = ({
  products,
}) => {
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopiedUrlId(id);
        setTimeout(() => {
          setCopiedUrlId(null);
        }, 2000);
      })
      .catch((err) => {
        console.error('Gagal menyalin URL: ', err);
      });
  };

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-lg p-5 hover:bg-violet-50 transition-colors duration-200"
        >
          <div className="flex flex-wrap justify-between items-center gap-y-4 gap-x-6">
            <div className="flex-1 min-w-[250px]">
              <h3 className="font-bold text-lg text-gray-900">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Oleh: <span className="font-medium">{product.author}</span> |
                Diubah:{' '}
                <span className="font-medium">{product.lastChanged}</span>
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className="text-gray-600 truncate text-sm"
                  title={product.url}
                >
                  {product.url.replace('https://', '')}
                </span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
                    title="View URL"
                  >
                    <ViewIcon />
                  </a>
                  <button
                    onClick={() => handleCopy(product.url, product.id)}
                    className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
                    title="Copy URL"
                  >
                    {copiedUrlId === product.id ? (
                      <CheckIcon className="text-green-500" />
                    ) : (
                      <CopyIcon />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-700">
                  {product.prospects.toLocaleString('id-ID')}
                </div>
                <div className="text-sm text-gray-500">Prospek</div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
                  title="Edit"
                >
                  <EditIcon />
                </button>
                <button
                  className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
                  title="Duplicate"
                >
                  <DuplicateIcon />
                </button>
                <button
                  className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                  title="Delete"
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

