import React, { useState } from 'react';
import { Product } from '../../../types';
import {
  ViewIcon,
  CopyIcon,
  EditIcon,
  DuplicateIcon,
  DeleteIcon,
  CheckIcon,
} from './Icons';

interface ProductTableProps {
  products: Product[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
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
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table className="w-full text-sm text-left text-gray-600 table-body">
        <thead className="text-xs text-purple-800 uppercase bg-purple-100/50">
          <tr>
            <th scope="col" className="px-6 py-3 min-w-[200px]">
              Nama Produk
            </th>
            <th scope="col" className="px-6 py-3 min-w-[120px]">
              Harga
            </th>
            <th scope="col" className="px-6 py-3">
              Pesanan
            </th>
            <th scope="col" className="px-6 py-3">
              Dibayar
            </th>
            <th scope="col" className="px-6 py-3">
              Rasio
            </th>
            <th scope="col" className="px-6 py-3 min-w-[150px]">
              Pendapatan Bersih
            </th>
            <th scope="col" className="px-6 py-3 min-w-[250px]">
              URL
            </th>
            <th scope="col" className="px-6 py-3 min-w-[150px]">
              Terakhir Diubah
            </th>
            <th scope="col" className="px-6 py-3 min-w-[150px]">
              Dibuat Oleh
            </th>
            <th scope="col" className="px-6 py-3 min-w-[120px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-purple-100">
              <th
                scope="row"
                className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap"
              >
                {product.name}
              </th>
              <td className="px-6 py-4 font-medium text-purple-700">
                Rp {product.price.toLocaleString('id-ID')}
              </td>
              <td className="px-6 py-4">{product.orders}</td>
              <td className="px-6 py-4">{product.paid}</td>
              <td className="px-6 py-4">{product.paidRatio}</td>
              <td className="px-6 py-4 font-semibold text-green-600">
                Rp {product.revenue.toLocaleString('id-ID')}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 truncate" title={product.url}>
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
              </td>
              <td className="px-6 py-4">{product.lastChanged}</td>
              <td className="px-6 py-4">{product.author}</td>
              <td className="px-6 py-4">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

