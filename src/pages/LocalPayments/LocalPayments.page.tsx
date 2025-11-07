import React, { useState, useEffect } from 'react';
import DetailCard from '../../components/ui/DetailCard';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { initialLocalPaymentMethods } from '../../constants/data';
import type { LocalPaymentMethod } from '../../types';

const LocalPaymentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (method: LocalPaymentMethod) => void;
  methodData: LocalPaymentMethod | null;
}> = ({ isOpen, onClose, onSave, methodData }) => {
  const getInitialState = () => ({
    name: '',
    type: 'Bank Transfer' as LocalPaymentMethod['type'],
    accountName: '',
    accountNumber: '',
    qrImageUrl: '',
    status: 'active' as LocalPaymentMethod['status'],
  });

  const [method, setMethod] = useState<
    Omit<LocalPaymentMethod, 'id' | 'logoUrl'>
  >(getInitialState());
  const [qrPreview, setQrPreview] = useState<string | null>(null);

  useEffect(() => {
    if (methodData) {
      setMethod(methodData);
      setQrPreview(methodData.qrImageUrl || null);
    } else {
      setMethod(getInitialState());
      setQrPreview(null);
    }
  }, [methodData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMethod((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrPreview(reader.result as string);
        setMethod((prev) => ({ ...prev, qrImageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...method,
      id: methodData?.id || `PAY${Date.now()}`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">
              {methodData
                ? 'Edit Metode Pembayaran'
                : 'Tambah Metode Pembayaran'}
            </h3>
          </div>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama Metode
                </label>
                <input
                  type="text"
                  name="name"
                  value={method.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tipe
                </label>
                <select
                  name="type"
                  value={method.type}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border bg-white border-gray-300 rounded-md"
                >
                  <option>Bank Transfer</option>
                  <option>QRIS</option>
                  <option>E-Wallet</option>
                </select>
              </div>
            </div>
            {method.type === 'QRIS' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gambar QR Code
                </label>
                <div className="mt-1 flex items-center gap-4">
                  {qrPreview && (
                    <img
                      src={qrPreview}
                      alt="QR Preview"
                      className="h-20 w-20 object-cover rounded-md border"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Akun/Pemilik
                  </label>
                  <input
                    type="text"
                    name="accountName"
                    value={method.accountName}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {method.type === 'Bank Transfer'
                      ? 'Nomor Rekening'
                      : 'Nomor HP'}
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={method.accountNumber}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={method.status}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border bg-white border-gray-300 rounded-md"
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

const LocalPaymentsPage: React.FC = () => {
  const [methods, setMethods] = useState<LocalPaymentMethod[]>(
    initialLocalPaymentMethods
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<LocalPaymentMethod | null>(
    null
  );
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [methodToDelete, setMethodToDelete] =
    useState<LocalPaymentMethod | null>(null);

  const handleAddNew = () => {
    setEditingMethod(null);
    setIsModalOpen(true);
  };

  const handleEdit = (method: LocalPaymentMethod) => {
    setEditingMethod(method);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (method: LocalPaymentMethod) => {
    setMethodToDelete(method);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (methodToDelete) {
      setMethods(methods.filter((m) => m.id !== methodToDelete.id));
    }
    setIsConfirmOpen(false);
    setMethodToDelete(null);
  };

  const handleSave = (methodToSave: LocalPaymentMethod) => {
    const exists = methods.some((m) => m.id === methodToSave.id);
    if (exists) {
      setMethods(
        methods.map((m) => (m.id === methodToSave.id ? methodToSave : m))
      );
    } else {
      setMethods([methodToSave, ...methods]);
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
              Metode Pembayaran
            </h2>
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition shadow-sm"
            >
              + Tambah Metode
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead className="bg-violet-50">
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase">
                    Nama Metode
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase">
                    Tipe
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase">
                    Detail Akun
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-right text-xs font-semibold text-gray-600 uppercase">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="table-body">
                {methods.map((method) => (
                  <tr key={method.id}>
                    <td className="px-5 py-4 border-b border-gray-200 text-sm">
                      <div className="flex items-center">
                        {(method.logoUrl || method.qrImageUrl) && (
                          <img
                            src={method.logoUrl || method.qrImageUrl}
                            alt={method.name}
                            className="w-10 h-10 object-contain mr-3 rounded-md"
                          />
                        )}
                        <span className="font-semibold">{method.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 text-sm">
                      {method.type}
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 text-sm">
                      {method.type !== 'QRIS' ? (
                        <div>
                          <p>{method.accountName}</p>
                          <p className="text-gray-600 text-xs">
                            {method.accountNumber}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">Lihat gambar QR</p>
                      )}
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 text-sm text-center">
                      <span
                        className={`px-3 py-1 font-semibold leading-tight ${getStatusClass(
                          method.status
                        )} rounded-full text-xs`}
                      >
                        {method.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 text-sm text-right">
                      <button
                        onClick={() => handleEdit(method)}
                        className="text-gray-500 hover:text-violet-600 transition p-1"
                        title="Edit"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteRequest(method)}
                        className="text-gray-500 hover:text-red-600 transition p-1 ml-2"
                        title="Hapus"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DetailCard>
      </div>
      <LocalPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        methodData={editingMethod}
      />
      <ConfirmationModal
        isOpen={isConfirmOpen}
        title="Konfirmasi Hapus"
        message={`Anda yakin ingin menghapus metode pembayaran "${methodToDelete?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

export default LocalPaymentsPage;
