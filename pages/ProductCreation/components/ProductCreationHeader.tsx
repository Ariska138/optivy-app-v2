import React from 'react';

interface ProductCreationHeaderProps {
    onBack: () => void;
}

const ProductCreationHeader: React.FC<ProductCreationHeaderProps> = ({ onBack }) => (
    <header className="mb-10 text-center relative">
        <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors p-2">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="sr-only">Kembali ke Daftar Produk</span>
        </button>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900">Buat Produk Baru</h1>
        <p className="text-slate-500 mt-2">Wujudkan ide produk digital Anda dengan mudah.</p>
    </header>
);

export default ProductCreationHeader;
