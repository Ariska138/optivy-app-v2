// File: app/views/Login.tsx

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '@/schemas/auth.schema';
import { toast } from 'sonner';

// Menggunakan komponen UI dari Shadcn untuk konsistensi
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Ikon dari Lucide React
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useOTP } from '@/hooks/useOTP';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { sendOtp } = useOTP();

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!state.loading && state.isAuthenticated) {
  //     if (state.user?.role === 'admin') {
  //       navigate('/dashboard/admin', { replace: true });
  //     } else {
  //       navigate('/dashboard', { replace: true });
  //     }
  //   }
  // }, [state, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const parsed = loginSchema.safeParse({
      username: username.trim(),
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
    // Mengganti warna tema lama dengan tema SaaS (slate)
    <div className="min-h-dvh bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="text-center p-8">
          <img
            src="/icon-192x192.png"
            alt="Optivy.co Logo"
            className="w-16 h-16 mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-bold text-slate-900">
            Masuk ke Akun Anda
          </CardTitle>
          <CardDescription className="text-slate-600">
            Selamat datang kembali! Silakan masuk.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 pt-0">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              {/* Menggunakan komponen Label dari Shadcn */}
              <Label htmlFor="username">Username</Label>
              {/* Menggunakan komponen Input dari Shadcn */}
              <Input
                id="username"
                type="text"
                placeholder="Username Anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  disabled={isLoading}
                />
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
          </form>

          {/* Menambahkan tautan ke halaman Registrasi dan Beranda */}
          <div className="mt-6 text-center text-sm text-slate-600 space-y-2">
            <p>
              Belum punya akun?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/register');
                }}
                className="font-medium text-indigo-600 hover:underline"
              >
                Daftar di sini
              </a>
            </p>
            <p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/home');
                }}
                className="text-slate-500 hover:underline"
              >
                ← Kembali ke Beranda
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
