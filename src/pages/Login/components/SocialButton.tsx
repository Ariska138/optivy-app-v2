import React from 'react';

interface SocialButtonProps {
  provider: string;
  logoSrc: string;
  // Tambahkan prop 'disabled' agar bisa dikontrol dari luar
  disabled?: boolean;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  logoSrc,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={`
        w-full flex items-center justify-center py-3 px-4 border rounded-lg font-semibold transition-all duration-300
        ${
          disabled
            ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed opacity-70' // Style untuk disabled
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 transform hover:scale-105' // Style default/aktif
        }
      `}
      disabled={disabled} // Menggunakan prop disabled
    >
      <img className="w-auto h-6 mr-3" src={logoSrc} alt={`Logo ${provider}`} />
      Masuk dengan {provider}
    </button>
  );
};

export default SocialButton;
