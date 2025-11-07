import { useEffect, useState } from 'react';
import { Button } from './components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/card';
import { ServerCog, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function Maintenance(
  {
    //   setIsMaintenanceMode,
    // }: {
    //   setIsMaintenanceMode: (value: boolean) => void;
  }
) {
  const navigate = useNavigate();

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

  const [maintenanceToken, setMaintenanceToken] = useState('');
  // State `tokenError` tidak lagi diperlukan karena kita pakai toast
  const [isSubmitting, setIsSubmitting] = useState(false); // 👈 2. Tambahkan state untuk loading

  const validToken = 'bismillah';

  const handleMaintenanceToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!maintenanceToken.trim()) {
      toast.error('Token tidak boleh kosong.');
      return;
    }

    setIsSubmitting(true);

    // Simulasi pengecekan token
    setTimeout(() => {
      if (maintenanceToken === validToken) {
        // --- JIKA BERHASIL ---
        toast.success('Akses diberikan! Memuat aplikasi...');
        localStorage.setItem('maintenanceToken', validToken);

        // Beri jeda 1 detik agar pengguna bisa melihat toast
        setTimeout(() => {
          setIsMaintenanceMode(false);
        }, 1000);
      } else {
        // --- JIKA GAGAL ---
        toast.error('Token akses tidak valid. Silakan coba lagi.');
        setIsSubmitting(false); // Set loading kembali ke false
      }
    }, 500); // Penundaan 0.5 detik untuk efek loading
  };

  if (!isMaintenanceMode) {
    navigate('/home');
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl border border-slate-200 mb-20">
        <CardHeader className="text-center p-8 sm:p-12">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-600 p-6 rounded-full shadow-lg">
              <ServerCog className="h-16 w-16 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Sistem Dalam Perawatan
          </CardTitle>
          <CardDescription className="text-lg text-slate-600 mt-2 max-w-md mx-auto">
            Maaf, kami sedang melakukan perawatan terjadwal untuk meningkatkan
            kualitas layanan kami.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8  sm:p-12">
          <div className="space-y-8">
            {/* Informasi Perbaikan */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Peningkatan yang Sedang Dilakukan:
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span>Peningkatan performa dan stabilitas server.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span>Penerapan patch keamanan terbaru.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span>Persiapan infrastruktur untuk fitur baru.</span>
                </li>
              </ul>
              <p className="mt-6 text-sm text-slate-500">
                Butuh bantuan? Hubungi kami di{' '}
                <a
                  href="mailto:support@optivy.co"
                  className="font-medium text-indigo-600 hover:underline"
                >
                  support@optivy.co
                </a>
              </p>
            </div>

            {/* Form Token Akses */}
            <div className="border-t border-slate-200 pt-8">
              <form onSubmit={handleMaintenanceToken} className="space-y-4">
                <label
                  htmlFor="token"
                  className="text-sm font-medium text-slate-700 block text-center"
                >
                  Khusus tim: Masukkan token akses untuk melanjutkan.
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="token"
                    type="password"
                    placeholder="Token Akses"
                    value={maintenanceToken}
                    onChange={(e) => setMaintenanceToken(e.target.value)}
                    className="flex-grow w-full px-4 py-2 text-base border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {/* 👇 3. Perbarui Tampilan Tombol */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-10 px-6 text-white font-semibold bg-slate-800 hover:bg-slate-700 w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memverifikasi...
                      </>
                    ) : (
                      'Akses Sistem'
                    )}
                  </Button>
                </div>
                {/* 👇 4. Alert lama bisa dihapus karena sudah digantikan notifikasi toast
                  {tokenError && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertDescription className="text-center">
                        {tokenError}
                      </AlertDescription>
                    </Alert>
                  )} 
                */}
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white py-4 text-center">
        <p className="text-sm text-slate-300">
          Terima kasih atas kesabaran Anda | Tim Optivy.co
        </p>
      </div>
    </div>
  );
}
