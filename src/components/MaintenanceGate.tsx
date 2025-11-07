import { Navigate, Outlet } from 'react-router-dom';
import { useMaintenanceGate } from '@/hooks/useMaintenanceGate'; // Sesuaikan path

/**
 * Komponen yang memeriksa status kode Maintenance.
 * Jika belum mendapat akses, akan dialihkan ke halaman maintenance.
 */
export default function MaintenanceGate() {
  const { hasAccess, isLoading } = useMaintenanceGate();

  if (isLoading) {
    // Tampilkan loading saat cek localStorage
    return (
      <div className="p-8 text-center">Checking maintenance status...</div>
    );
  }

  // Jika TIDAK punya akses, paksa redirect ke /maintenance
  if (!hasAccess) {
    return <Navigate to="/maintenance" replace />;
  }

  // Jika punya akses, lanjutkan ke rute anak (UI utama)
  return <Outlet />;
}
