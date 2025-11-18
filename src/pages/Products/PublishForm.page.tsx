import React, { useState } from 'react';
import type { Product } from './types';
import { useNavigate } from 'react-router-dom';

interface Props {
  product?: Product | null;
}

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const ClipboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);

const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const PublishFormPage: React.FC<Props> = ({ product = null }) => {
  const navigate = useNavigate();
  const [linkCopied, setLinkCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);

  const formUrl = product?.url || 'https://optivy.co/f/produk-anda';
  const embedCode = `<iframe src="${formUrl}" width="100%" height="600" frameborder="0"></iframe>`;

  const handleCopy = (textToCopy: string, type: 'link' | 'embed') => {
    navigator.clipboard.writeText(textToCopy);
    if (type === 'link') {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } else {
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 antialiased">
      <main className="w-full max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 text-center p-8 sm:p-12">
          <div className="inline-block bg-green-100 text-green-600 rounded-full p-3 mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Produk Anda Telah Tayang!
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Sekarang Anda dapat membagikan formulir produk Anda kepada audiens.
          </p>
        </div>

        <div className="mt-8 space-y-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <LinkIcon />
              <h2 className="text-xl font-semibold text-gray-800 ml-3">
                Bagikan Tautan Langsung
              </h2>
            </div>
            <p className="text-gray-500 mb-5">
              Gunakan tautan ini untuk membagikan formulir Anda secara langsung.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 font-mono text-sm overflow-x-auto">
                {formUrl}
              </div>
              <button
                onClick={() => handleCopy(formUrl, 'link')}
                className={`w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                  linkCopied
                    ? 'bg-green-500 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {linkCopied ? <CheckIcon /> : <ClipboardIcon />}
                <span>{linkCopied ? 'Tersalin!' : 'Salin Tautan'}</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <CodeIcon />
              <h2 className="text-xl font-semibold text-gray-800 ml-3">
                Sematkan di Website Anda
              </h2>
            </div>
            <p className="text-gray-500 mb-5">
              Salin dan tempel kode ini ke dalam halaman website Anda (misalnya
              WordPress).
            </p>
            <div>
              <pre className="bg-gray-800 text-white rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code>{embedCode}</code>
              </pre>
              <button
                onClick={() => handleCopy(embedCode, 'embed')}
                className={`w-full sm:w-auto mt-4 flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-lg transition-colors duration-200 ${
                  embedCopied
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                }`}
              >
                {embedCopied ? <CheckIcon /> : <ClipboardIcon />}
                <span>{embedCopied ? 'Tersalin!' : 'Salin Kode'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => {
              navigate('/products');
            }}
            className="w-full sm:w-auto bg-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Buat Produk Baru
          </button>
        </div>
      </main>
    </div>
  );
};

export default PublishFormPage;
