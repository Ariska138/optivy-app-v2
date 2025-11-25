import React, { useState } from 'react';
import InputWithIcon from './InputWithIcon';
import SocialButton from './SocialButton';

import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '@/schemas/auth.schema';
import { toast } from 'sonner';

import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useOTP } from '@/hooks/useOTP';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { email } from 'zod';

const UserIcon: React.FC = () => (
  <svg
    className="h-5 w-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

const LockIcon: React.FC = () => (
  <svg
    className="h-5 w-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
      clipRule="evenodd"
    />
  </svg>
);

const LoginForm: React.FC = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // <--- TAMBAHKAN INI

  const { login } = useAuth();
  const { sendOtp } = useOTP();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const parsed = loginSchema.safeParse({
      username: loginId.trim(),
      password: password.trim(),
    });

    if (!parsed.success) {
      toast.error('Username atau password tidak valid.');
      setIsLoading(false);
      return;
    }

    try {
      await login(parsed.data.username, parsed.data.password);
      toast.success('Login berhasil!');
      // Navigasi akan di-handle oleh useEffect di atas
      await sendOtp(parsed.data.username);

      // Jika sukses, arahkan ke halaman verifikasi OTP
      navigate(
        `/otp-verification?email=${encodeURIComponent(parsed.data.username)}`
      );
    } catch {
      toast.error('Login gagal. Periksa kembali username atau password Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Masuk ke Akun Anda
        </h2>
        <p className="text-gray-600 mb-8">
          Silakan masukkan detail Anda di bawah.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="login_id"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <InputWithIcon
              type="text"
              id="login_id"
              name="login_id"
              placeholder="Masukkan email"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              icon={<UserIcon />}
              required
            />
          </div>

          <div className="mb-5">
            <Label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Kata Sandi
            </Label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon />
              </span>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={isLoading}
                className="w-full pl-10 pr-3 h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 bg-white"
              />
              {error && (
                <p
                  className="mt-4 p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg transition-all duration-300"
                  role="alert"
                >
                  {error}
                </p>
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-500 hover:bg-slate-100"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword ? 'Sembunyikan password' : 'Tampilkan password'
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded form-checkbox"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Ingat Saya
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:underline">
                Lupa Kata Sandi?
              </a>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full h-11 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                {/* Menggunakan ikon Loader2 untuk konsistensi */}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              'Masuk'
            )}
          </Button>

          {/* <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
          >
            Masuk
          </button> */}
        </form>

        <div className="my-8 flex items-center">
          <div className="grow border-t border-gray-300"></div>
          <span className="shrink mx-4 text-gray-500 text-sm">ATAU</span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        <SocialButton
          provider="Google"
          logoSrc="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
          disabled={true}
        />

        <p className="mt-8 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <a
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

