import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
// import Maintenance from './Maintenance'; // Pastikan path ini benar

// Nama komponen diubah menjadi IndexPage untuk kejelasan,
// karena ini adalah gerbang utama aplikasi, bukan halaman "home" publik.
// Anda bisa tetap menggunakan nama "Home" jika sesuai struktur proyek Anda.
export default function SplashScreen() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(true);

  useEffect(() => {
    // Logika untuk memeriksa token maintenance saat aplikasi pertama kali dimuat
    const savedToken = localStorage.getItem('maintenanceToken');
    const validToken = 'bismillah';

    if (savedToken === validToken) {
      // Jika token valid ditemukan, matikan mode maintenance
      setIsMaintenanceMode(false);
    }
    // Jika tidak, isMaintenanceMode akan tetap true dan halaman Maintenance ditampilkan
  }, []);

  if (isMaintenanceMode) {
    // Tampilkan halaman maintenance jika mode aktif
    // Berikan fungsi untuk menonaktifkan mode maintenance setelah token valid dimasukkan
    // return <Maintenance setIsMaintenanceMode={setIsMaintenanceMode} />;
  }

  // Jika mode maintenance tidak aktif, tampilkan splash screen
  return <Loading />;
}

// Komponen SplashScreen dipisahkan agar kode lebih rapi
function Loading() {
  const navigate = useNavigate();
  const { state } = useAuth();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Memulai aplikasi...');

  // Efek untuk animasi loading
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) =>
        prev >= 95 ? 95 : prev + Math.random() * 10
      );
    }, 400);

    const textSteps = [
      'Memulai aplikasi...',
      'Memeriksa koneksi...',
      'Memuat komponen...',
      'Menginisialisasi sesi...',
      'Hampir selesai...',
    ];

    let textIndex = 0;
    const textInterval = setInterval(() => {
      if (textIndex < textSteps.length - 1) {
        textIndex++;
        setLoadingText(textSteps[textIndex]);
      }
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  // Efek untuk navigasi setelah loading auth selesai
  useEffect(() => {
    if (!state.loading) {
      // Set progress ke 100% saat auth selesai
      setLoadingProgress(100);
      setLoadingText('Selesai!');

      // Tunggu sejenak agar animasi 100% terlihat, lalu navigasi
      setTimeout(() => {
        if (state.isAuthenticated) {
          navigate('/dashboard', { replace: true });
        } else {
          // Arahkan ke halaman utama publik (landing page)
          navigate('/home', { replace: true });
        }
      }, 500); // Penundaan singkat
    }
  }, [state.loading, state.isAuthenticated, state.user, navigate]);
  //
  // JSX untuk SplashScreen (kode asli Anda)
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* ... sisa kode JSX splash screen Anda tidak perlu diubah ... */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-50 animate-pulse"
          style={{ animationDelay: '4s' }}
        ></div>
      </div>
      <div className="relative z-10 flex flex-col items-center space-y-8 p-8 max-w-md w-full">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <img src="/icon-512x512.png" alt="Logo" className="h-16 w-16" />
          </div>
          <div className="absolute inset-0 rounded-2xl border-4 border-blue-300 dark:border-blue-600 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 dark:border-blue-500 animate-pulse opacity-30"></div>
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Optivy.co
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
            Powered by Finlup.ID
          </p>
        </div>
        <div className="w-full space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
              <div
                className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"
                style={{
                  animationDirection: 'reverse',
                  animationDuration: '1.5s',
                }}
              ></div>
            </div>
          </div>
          <div className="w-full space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {loadingText}
              </span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                {Math.round(loadingProgress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${loadingProgress}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            Mohon tunggu sebentar...
          </p>
        </div>
      </div>
    </div>
  );
}
