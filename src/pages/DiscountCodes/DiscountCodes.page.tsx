import React, { useState, useEffect } from 'react';
import DetailCard from '../../components/ui/DetailCard';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { initialDiscountCodes } from '../../constants/data';
import type { DiscountCode } from '../../types';

// Modal for Creating/Editing Discount Codes
const DiscountCodeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (code: DiscountCode) => void;
  codeData: DiscountCode | null;
}> = ({ isOpen, onClose, onSave, codeData }) => {
  const [code, setCode] = useState<Omit<DiscountCode, 'id' | 'timesUsed'>>({
    code: '',
    type: 'percentage',
    value: 0,
    usageLimit: 100,
    status: 'active',
    expiryDate: '',
  });

  useEffect(() => {
    if (codeData) {
      setCode(codeData);
    } else {
      setCode({
        code: '',
        type: 'percentage',
        value: 0,
        usageLimit: 100,
        status: 'active',
        expiryDate: '',
      });
    }
  }, [codeData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCode((prev) => ({
      ...prev,
      [name]:
        name === 'value' || name === 'usageLimit'
          ? parseInt(value, 10) || 0
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...code,
      id: codeData?.id || `DC${Date.now()}`,
      timesUsed: codeData?.timesUsed || 0,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">
              {codeData ? 'Edit Kode Diskon' : 'Buat Kode Diskon Baru'}
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                Kode Diskon
              </label>
              <input
                type="text"
                name="code"
                value={code.code}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipe Diskon
                </label>
                <select
                  name="type"
                  value={code.type}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
                >
                  <option value="percentage">Persentase (%)</option>
                  <option value="fixed">Nominal Tetap (Rp)</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="value"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nilai Diskon
                </label>
                <input
                  type="number"
                  name="value"
                  value={code.value}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="usageLimit"
                  className="block text-sm font-medium text-gray-700"
                >
                  Batas Penggunaan
                </label>
                <input
                  type="number"
                  name="usageLimit"
                  value={code.usageLimit}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
              <div>
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tanggal Kedaluwarsa
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={code.expiryDate}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                name="status"
                value={code.status}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
            </div>
          </div>
          <div className="bg-gray-50 p-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DiscountCodesPage: React.FC = () => {
  const [codes, setCodes] = useState<DiscountCode[]>(initialDiscountCodes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<DiscountCode | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [codeToDelete, setCodeToDelete] = useState<DiscountCode | null>(null);

  const handleAddNew = () => {
    setEditingCode(null);
    setIsModalOpen(true);
  };

  const handleEdit = (code: DiscountCode) => {
    setEditingCode(code);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (code: DiscountCode) => {
    setCodeToDelete(code);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (codeToDelete) {
      setCodes(codes.filter((c) => c.id !== codeToDelete.id));
    }
    setIsConfirmOpen(false);
    setCodeToDelete(null);
  };

  const handleSave = (codeToSave: DiscountCode) => {
    const exists = codes.some((c) => c.id === codeToSave.id);
    if (exists) {
      setCodes(codes.map((c) => (c.id === codeToSave.id ? codeToSave : c)));
    } else {
      setCodes([codeToSave, ...codes]);
    }
    setIsModalOpen(false);
  };

  const getStatusClass = (status: 'active' | 'inactive') => {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-200 text-gray-800';
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-6 bg-violet-50">
        <DetailCard>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Daftar Kode Diskon
            </h2>
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition shadow-sm"
            >
              + Buat Kode Diskon
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Kode
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tipe
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nilai
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Penggunaan
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Kedaluwarsa
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="table-body">
                {codes.length > 0 ? (
                  codes.map((code) => (
                    <tr key={code.id}>
                      <td className="px-5 py-4 border-b border-gray-200 text-sm">
                        <span className="font-mono bg-gray-100 text-gray-800 py-1 px-2 rounded">
                          {code.code}
                        </span>
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 text-sm">
                        {code.type === 'percentage'
                          ? 'Persentase'
                          : 'Nominal Tetap'}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 text-sm">
                        {code.type === 'percentage'
                          ? `${code.value}%`
                          : `Rp ${code.value.toLocaleString('id-ID')}`}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 text-sm text-center">
                        {code.timesUsed}/{code.usageLimit}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 text-sm">
                        {new Date(code.expiryDate).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 text-sm text-center">
                        <span
                          className={`px-3 py-1 font-semibold leading-tight ${getStatusClass(
                            code.status
                          )} rounded-full text-xs`}
                        >
                          {code.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                        </span>
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 text-sm text-right">
                        <button
                          onClick={() => handleEdit(code)}
                          className="text-gray-500 hover:text-violet-600 transition p-1"
                          title="Edit"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteRequest(code)}
                          className="text-gray-500 hover:text-red-600 transition p-1 ml-2"
                          title="Hapus"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-gray-500">
                      Belum ada kode diskon.{' '}
                      <button
                        onClick={handleAddNew}
                        className="text-violet-600 font-semibold hover:underline"
                      >
                        Buat yang pertama!
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </DetailCard>
      </div>
      <DiscountCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        codeData={editingCode}
      />
      <ConfirmationModal
        isOpen={isConfirmOpen}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus kode diskon "${codeToDelete?.code}"? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

export default DiscountCodesPage;
