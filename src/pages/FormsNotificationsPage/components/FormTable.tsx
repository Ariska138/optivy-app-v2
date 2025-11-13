import React from 'react';
import { ProductForm } from '../../../types';
import {
  EditIcon,
  DuplicateIcon,
  DeleteIcon,
} from '../../Products/components/Icons';

interface FormTableProps {
  forms: ProductForm[];
}

export const FormTable: React.FC<FormTableProps> = ({ forms }) => {
  const getStatusClass = (status: 'active' | 'draft') => {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-purple-800 uppercase bg-purple-100/50">
          <tr>
            <th scope="col" className="px-6 py-3 min-w-[250px]">
              Nama Form
            </th>
            <th scope="col" className="px-6 py-3 min-w-[200px]">
              Produk Terkait
            </th>
            <th scope="col" className="px-6 py-3">
              Submissions
            </th>
            <th scope="col" className="px-6 py-3 min-w-[150px]">
              Terakhir Diubah
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3 min-w-[120px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr
              key={form.id}
              className="border-b border-purple-100 hover:bg-violet-50/50"
            >
              <th
                scope="row"
                className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap"
              >
                {form.name}
              </th>
              <td className="px-6 py-4">{form.productName}</td>
              <td className="px-6 py-4 font-medium text-purple-700">
                {form.submissions.toLocaleString('id-ID')}
              </td>
              <td className="px-6 py-4">{form.lastChanged}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusClass(
                    form.status
                  )}`}
                >
                  {form.status === 'active' ? 'Aktif' : 'Draf'}
                </span>
              </td>
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
