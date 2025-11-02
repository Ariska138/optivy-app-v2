import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const DetailCard: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export default DetailCard;
