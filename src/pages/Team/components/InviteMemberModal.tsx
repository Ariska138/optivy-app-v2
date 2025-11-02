import React, { useState, useEffect } from 'react';
import { TeamRole } from '../../../types';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (name: string, email: string, role: TeamRole) => void;
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
  isOpen,
  onClose,
  onInvite,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<TeamRole>(TeamRole.Sales);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setEmail('');
      setRole(TeamRole.Sales);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onInvite(name, email, role);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md m-4">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Undang Anggota Tim Baru
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Kirim undangan melalui email untuk bergabung.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Peran
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as TeamRole)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
              >
                {Object.values(TeamRole).map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="p-6 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-violet-600 rounded-lg hover:bg-violet-700 disabled:bg-gray-400"
              disabled={!name || !email}
            >
              Kirim Undangan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

