import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderSummary from './components/OrderSummary';
import PaymentForm from './components/PaymentForm';
import { toast } from 'sonner';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();

  const handlePaymentSuccess = () => {
    toast.success('Pembayaran berhasil!', {
      description: 'Anda telah berhasil upgrade ke Paket Pro.',
    });
    // Redirect to subscription page or dashboard after a delay
    setTimeout(() => navigate('/subscription'), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        <button
          onClick={() => navigate('/subscription')}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Kembali ke Langganan
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side: Payment Details */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">
              Selesaikan Upgrade Anda
            </h1>
            <p className="text-gray-500 mt-2">
              Amankan pembayaran Anda untuk mengaktifkan Paket Pro.
            </p>
            <PaymentForm onSuccess={handlePaymentSuccess} />
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full">
            <OrderSummary planName="Pro" price={300000} trialPeriod="3 bulan" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
