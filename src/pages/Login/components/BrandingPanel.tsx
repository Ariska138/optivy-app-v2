import React from 'react';

const BrandingPanel: React.FC = () => {
  return (
    // Menggunakan bg-gray-900 atau bg-primary untuk latar belakang gelap
    <div className="hidden lg:flex w-1/2 bg-purple-800 p-12 flex-col items-center justify-center text-white relative">
      {/* Elemen dekoratif abstrak - Dibuat PUTIH MURNI (bg-white) */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-purple-300 rounded-full animate-pulse shadow-xl"></div>
      <div className="absolute bottom-16 right-10 w-32 h-32 bg-purple-300 rounded-xl transform rotate-12 shadow-xl"></div>
      <div className="absolute bottom-24 left-20 w-16 h-16 bg-purple-300 rounded-full shadow-xl"></div>

      <div className="z-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Selamat Datang Kembali!</h1>
        <p className="text-lg leading-relaxed">
          Masuk untuk melanjutkan ke dasbor Anda dan kelola semua aktivitas Anda
          di satu tempat.
        </p>
      </div>
    </div>
  );
};

export default BrandingPanel;

