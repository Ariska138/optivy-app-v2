import React from 'react';
import CurrentPlan from './components/CurrentPlan';
import PlanCard from './components/PlanCard';
import Faq from './components/Faq';

const SubscriptionPage: React.FC = () => {
  const handleUpgrade = () => {
    // Handle upgrade logic, e.g., redirect to checkout
    alert('Navigating to upgrade page...');
  };

  const proFeatures = [
    'Unlimited landing pages',
    'Custom domains',
    'Advanced analytics',
    'Priority support',
    'All integrations',
  ];

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-6 space-y-8">
        <CurrentPlan
          planName="Free Trial"
          status="Aktif"
          trialEndDate="1 November 2025"
        />

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Pilih Paket Anda</h2>
          <p className="text-gray-500 mt-1">
            Upgrade ke Pro untuk membuka semua fitur tanpa batas.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <PlanCard
              planName="Pro"
              price={300000}
              trialPeriod="3 bulan"
              features={proFeatures}
              onUpgrade={handleUpgrade}
            />
          </div>
        </div>

        <Faq />
      </div>
    </div>
  );
};

export default SubscriptionPage;
