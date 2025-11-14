import React from 'react';

interface CurrentPlanProps {
  planName: string;
  status: string;
  trialEndDate: string;
}

const CurrentPlan: React.FC<CurrentPlanProps> = ({
  planName,
  status,
  trialEndDate,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800">Paket Saat Ini</h2>
      <div className="mt-4 bg-violet-50 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg text-violet-800">
              {planName}
            </span>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
              {status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Masa coba gratis Anda akan berakhir pada{' '}
            <span className="font-semibold">{trialEndDate}</span>.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="text-sm font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 transition px-4 py-2 rounded-lg">
            Batalkan Langganan
          </button>
          <button className="text-sm font-semibold text-violet-600 bg-violet-100 hover:bg-violet-200 transition px-4 py-2 rounded-lg">
            Riwayat Tagihan
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlan;
