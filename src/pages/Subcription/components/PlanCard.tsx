import React from 'react';

interface PlanCardProps {
  planName: string;
  price: number;
  trialPeriod: string;
  features: string[];
  onUpgrade: () => void;
}

const CheckIcon: React.FC = () => (
  <svg
    className="w-5 h-5 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    ></path>
  </svg>
);

const PlanCard: React.FC<PlanCardProps> = ({
  planName,
  price,
  trialPeriod,
  features,
  onUpgrade,
}) => {
  return (
    <div className="border border-violet-200 rounded-xl p-6 flex flex-col h-full bg-violet-50/30">
      <h3 className="text-2xl font-bold text-gray-800">{planName}</h3>
      <p className="text-violet-600 font-semibold mt-1">
        Coba gratis selama {trialPeriod}
      </p>

      <div className="my-6">
        <span className="text-5xl font-extrabold text-gray-900">
          Rp{price.toLocaleString('id-ID')}
        </span>
        <span className="text-gray-500 text-lg">/bulan</span>
      </div>

      <ul className="space-y-3 mt-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <CheckIcon />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onUpgrade}
        className="mt-auto w-full bg-violet-600 text-white font-semibold py-3 px-4 rounded-lg shadow-sm hover:bg-violet-700 transition"
      >
        Upgrade ke Pro
      </button>
    </div>
  );
};

export default PlanCard;
