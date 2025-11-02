import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import DetailCard from '../../components/ui/DetailCard';
import { PageType } from '../../types';

interface EditProfilePageProps {
  setCurrentPage: (page: PageType) => void;
}

const InputField: React.FC<{
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}> = ({ label, id, type, value, onChange, placeholder }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 bg-white text-gray-900 placeholder-gray-400"
    />
  </div>
);

const EditProfilePage: React.FC<EditProfilePageProps> = ({
  setCurrentPage,
}) => {
  const [profile, setProfile] = useState({
    name: 'Zaenal Suep',
    email: 'zaenalsuep@gmail.com',
    password: '',
    confirmPassword: '',
    avatar: 'https://i.pravatar.cc/150?u=zaenal',
  });

  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.password !== profile.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Profile saved successfully!');
    // Here you would typically handle the API call
    setCurrentPage('dashboard');
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Edit Profile" />
      <div className="flex-1 p-6 bg-violet-50">
        <form onSubmit={handleSave}>
          <DetailCard className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="col-span-1 flex flex-col items-center">
                <img
                  src={avatarPreview}
                  alt="Profile Avatar"
                  className="w-40 h-40 rounded-full object-cover border-4 border-violet-200"
                />
                <label
                  htmlFor="avatarUpload"
                  className="mt-4 cursor-pointer text-sm text-violet-600 font-semibold hover:text-violet-800"
                >
                  Change Photo
                </label>
                <input
                  type="file"
                  id="avatarUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <p className="text-xs text-gray-500 mt-1 text-center">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
              <div className="col-span-2 space-y-4">
                <InputField
                  label="Full Name"
                  id="name"
                  type="text"
                  value={profile.name}
                  onChange={handleChange}
                />
                <InputField
                  label="Email Address"
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                />
                <InputField
                  label="New Password"
                  id="password"
                  type="password"
                  value={profile.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current"
                />
                <InputField
                  label="Confirm New Password"
                  id="confirmPassword"
                  type="password"
                  value={profile.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setCurrentPage('dashboard')}
                className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </DetailCard>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
