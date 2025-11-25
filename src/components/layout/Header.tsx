import React, { useState, useEffect } from 'react';

// Fungsi untuk memformat tanggal ke dalam format yang Anda inginkan (misalnya: Selasa, 25 November 2025)
const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString('id-ID', options);
};

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  onMenuButtonClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  children,
  onMenuButtonClick,
}) => {
  // 1. Inisialisasi state untuk menyimpan tanggal
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));

  // 2. Gunakan useEffect untuk memastikan tanggal diperbarui setiap kali komponen dimuat
  useEffect(() => {
    // Sebenarnya, memanggil formatDate(new Date()) sekali saat komponen dimuat sudah cukup
    // untuk menampilkan tanggal hari ini.
    // Jika Anda ingin tanggal tersebut diperbarui secara real-time setiap detik (seperti jam),
    // Anda akan menggunakan setInterval, tetapi untuk tanggal, sekali panggil sudah memadai.
    // setCurrentDate(formatDate(new Date())); // Ini adalah baris yang dijalankan saat komponen mount
  }, []); // Array dependensi kosong agar hanya berjalan sekali (saat mount)

  return (
    <header className="bg-white border-b border-gray-200 p-4 sm:p-6 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuButtonClick}
            className="text-gray-600 hover:text-gray-900 focus:outline-none sm:hidden mr-4"
            aria-label="Open sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {title}
            </h1>
            {/* 3. Menampilkan tanggal dari state */}
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {currentDate}
            </p>
          </div>
        </div>
        {children}
      </div>
    </header>
  );
};
