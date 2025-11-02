/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EyeIcon,
  EyeSlashIcon,
  GoogleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  WhatsAppIcon,
} from '../../components/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Pastikan path ke file skema Anda sudah benar
import { registerSchema } from '../../schemas/auth.schema';
import { useOTP } from '@hooks/useOTP';
import { apiPost } from '@/lib/api';

const MakeAccountPage = () => {
  const navigate = useNavigate();

  // State untuk menampung data dari form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    wa: '',
    password: '',
    terms: false,
  });

  // State untuk menampung pesan error dari Zod
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
    {}
  );

  // State UI lainnya
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { sendOtp } = useOTP();
  /**
   * Menangani perubahan pada setiap input.
   * Fungsi ini juga akan membersihkan error pada input yang sedang diubah
   * untuk memberikan pengalaman pengguna yang lebih baik.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    // Hapus error untuk field yang sedang diedit oleh pengguna
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /**
   * Menangani proses submit form.
   * Validasi penuh menggunakan Zod dijalankan di sini.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);

    // 1. Lakukan validasi akhir dengan Zod pada keseluruhan form
    const validationResult = registerSchema.safeParse(formData);

    // 2. Jika validasi gagal, tampilkan semua error dan hentikan proses
    if (!validationResult.success) {
      // `.flatten()` adalah cara standar untuk mendapatkan error per-field
      setErrors(validationResult.error.flatten().fieldErrors);
      return;
    }

    setLoading(true);

    try {
      // Ganti URL dengan endpoint API Hono Anda
      const responseData = await apiPost<any>('/auth/register', {
        ...validationResult.data,
      });

      if (!responseData) {
        throw new Error(
          responseData.error || 'Terjadi kesalahan saat membuat akun.'
        );
      }

      await sendOtp(validationResult.data.email);

      // Jika sukses, arahkan ke halaman verifikasi OTP
      navigate(
        `/otp-verification?email=${encodeURIComponent(
          validationResult.data.email
        )}`
      );
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Buat Akun Baru</h1>
          <p className="text-gray-500">
            Selamat datang! Silakan isi data diri Anda.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {/* Input Nama Lengkap */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Lengkap
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <UserIcon />
              </span>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-800 focus:border-purple-500 focus:ring-0 transition-all"
                placeholder="Masukkan nama lengkap"
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name[0]}</p>
            )}
          </div>

          {/* Input Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Alamat Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <MailIcon />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-800 focus:border-purple-500 focus:ring-0 transition-all"
                placeholder="contoh@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email[0]}</p>
            )}
          </div>

          {/* Input Nomor WhatsApp */}
          <div>
            <label
              htmlFor="wa"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nomor WhatsApp
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <WhatsAppIcon />
              </span>
              <input
                id="wa"
                name="wa"
                type="tel"
                value={formData.wa}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-800 focus:border-purple-500 focus:ring-0 transition-all"
                placeholder="Contoh: 081234567890"
              />
            </div>
            {errors.wa && (
              <p className="text-sm text-red-600 mt-1">{errors.wa[0]}</p>
            )}
          </div>

          {/* Input Kata Sandi */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Kata Sandi
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-gray-800 focus:border-purple-500 focus:ring-0 transition-all"
                placeholder="Minimal 8 karakter"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </span>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password[0]}</p>
            )}
          </div>

          {/* Checkbox Syarat & Ketentuan */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 transition-all"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-600">
                Setujui{' '}
                <a
                  href="#"
                  className="font-medium text-purple-600 hover:underline"
                >
                  syarat dan ketentuan
                </a>{' '}
                dan{' '}
                <a
                  href="#"
                  className="font-medium text-purple-600 hover:underline"
                >
                  kebijakan privasi
                </a>{' '}
                yang berlaku
              </label>
            </div>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-600 mt-1">{errors.terms[0]}</p>
          )}

          {/* Menampilkan error dari API */}
          {apiError && (
            <p className="text-sm text-center text-red-600">{apiError}</p>
          )}

          {/* Tombol Submit */}
          <div>
            <button
              type="submit"
              disabled={loading || !formData.terms}
              className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : 'Buat Akun'}
            </button>
          </div>
        </form>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-sm font-medium text-gray-500">
            ATAU
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Tombol Daftar dengan Google */}
        <div>
          <button
            type="button"
            disabled
            className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GoogleIcon />
            <span className="ml-4 font-medium text-gray-700">
              Daftar dengan Google
            </span>
          </button>
        </div>

        <div className="text-center border-t border-gray-200 pt-6 mt-6">
          <p className="text-sm text-gray-600">
            Sudah punya akun?&nbsp;
            <a
              href="/login"
              className="font-medium text-purple-600 hover:underline"
            >
              Masuk di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MakeAccountPage;
