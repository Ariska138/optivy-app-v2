import React, { useState } from 'react';
import InputWithIcon from './InputWithIcon';
import SocialButton from './SocialButton';

import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '@/schemas/auth.schema';
import { toast } from 'sonner';

import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useOTP } from '@/hooks/useOTP';

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

  const { login } = useAuth();
  const { sendOtp } = useOTP();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log({
      loginId,
      password,
      rememberMe,
    });
    alert('Login form submitted! Check console for values.');
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
              Email atau No. WhatsApp
            </label>
            <InputWithIcon
              type="text"
              id="login_id"
              name="login_id"
              placeholder="Masukkan email atau nomor WA"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              icon={<UserIcon />}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Kata Sandi
            </label>
            <InputWithIcon
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<LockIcon />}
              required
            />
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

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
          >
            Masuk
          </button>
        </form>

        <div className="my-8 flex items-center">
          <div className="grow border-t border-gray-300"></div>
          <span className="shrink mx-4 text-gray-500 text-sm">ATAU</span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        <SocialButton
          provider="Google"
          logoSrc="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        />

        <p className="mt-8 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <a href="#" className="font-medium text-primary hover:underline">
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

