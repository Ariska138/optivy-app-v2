import React, { useState } from 'react';

const PaymentForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Hapus semua non-digit
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim(); // Tambahkan spasi setiap 4 digit
    setCardNumber(formattedValue.slice(0, 19)); // Batasi 16 digit + 3 spasi
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formattedValue = value;
    if (value.length > 2) {
      formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setExpiryDate(formattedValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!cardholderName || !cardNumber || !expiryDate || !cvc) {
      setError('Semua field harus diisi.');
      return;
    }
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Nomor kartu tidak valid.');
      return;
    }
    if (expiryDate.length !== 5) {
      setError('Format tanggal kedaluwarsa tidak valid (MM/YY).');
      return;
    }
    if (cvc.length < 3) {
      setError('CVC tidak valid.');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div>
        <label
          htmlFor="cardholder-name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nama Pemegang Kartu
        </label>
        <input
          type="text"
          id="cardholder-name"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="John Doe"
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="card-number"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nomor Kartu
        </label>
        <div className="relative">
          <input
            type="text"
            id="card-number"
            inputMode="numeric"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="0000 0000 0000 0000"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            💳
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label
            htmlFor="expiry-date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Kedaluwarsa (MM/YY)
          </label>
          <input
            type="text"
            id="expiry-date"
            value={expiryDate}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="cvc"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            CVC
          </label>
          <input
            type="text"
            id="cvc"
            inputMode="numeric"
            value={cvc}
            onChange={(e) =>
              setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))
            }
            placeholder="123"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-violet-600 text-white font-semibold py-3 px-4 rounded-lg shadow-sm hover:bg-violet-700 transition disabled:bg-violet-400 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Memproses...
            </>
          ) : (
            `Bayar Rp${(300000).toLocaleString('id-ID')} dan Aktifkan Pro`
          )}
        </button>
        <p className="text-xs text-gray-500 text-center mt-4">
          Dengan mengklik, Anda menyetujui{' '}
          <a href="#" className="underline">
            Ketentuan Layanan
          </a>
          .
        </p>
      </div>
    </form>
  );
};

export default PaymentForm;
