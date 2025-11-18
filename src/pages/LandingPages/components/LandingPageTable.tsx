import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Copy, Edit, Eye, Trash2 } from 'lucide-react';
import { LandingPage } from '../types';

export const LandingPageTable: React.FC<{ pages: LandingPage[] }> = ({
  pages,
}) => {
  const navigate = useNavigate();

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Link disalin ke clipboard!');
  };

  const handleEdit = (pageId: string) => {
    navigate(`/products/page-builder?id=${pageId}`);
  };

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
            <th scope="col" className="px-6 py-3 min-w-[300px]">
              Judul Landing Page
            </th>
            <th scope="col" className="px-6 py-3">
              Statistik (Visit/Konversi)
            </th>
            <th scope="col" className="px-6 py-3 min-w-[250px]">
              URL
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3 min-w-[120px]">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr
              key={page.id}
              className="border-b border-purple-100 hover:bg-violet-50/50"
            >
              <td scope="row" className="px-6 py-4 font-bold text-gray-900">
                {page.title}
              </td>
              <td className="px-6 py-4">
                <div>
                  <span className="font-semibold">
                    {page.visits.toLocaleString('id-ID')}
                  </span>{' '}
                  visits
                </div>
                <div className="text-xs text-gray-500">
                  {page.submissions.toLocaleString('id-ID')} konversi (
                  {page.visits > 0
                    ? ((page.submissions / page.visits) * 100).toFixed(1)
                    : 0}
                  %)
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <a
                    href={page.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline truncate"
                    title={page.url}
                  >
                    {page.url}
                  </a>
                  <button
                    onClick={() => handleCopyLink(page.url)}
                    className="text-gray-400 hover:text-purple-600 p-1 rounded-md transition-colors duration-200 flex-shrink-0"
                    title="Salin link"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusClass(
                    page.status
                  )}`}
                >
                  {page.status === 'active' ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <a
                    href={page.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                    title="Lihat Halaman"
                  >
                    <Eye size={18} />
                  </a>
                  <button
                    onClick={() => handleEdit(page.id)}
                    className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                    title="Hapus"
                  >
                    <Trash2 size={18} />
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
