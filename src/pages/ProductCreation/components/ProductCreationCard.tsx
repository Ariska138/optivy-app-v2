import React from 'react';

const cardClasses = "bg-white/60 backdrop-blur-[15px] border border-white/20 shadow-lg shadow-purple-900/10 rounded-2xl";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}
const ProductCreationCard: React.FC<CardProps> = ({ children, className }) => (
    <div className={`${cardClasses} p-8 ${className}`}>
        {children}
    </div>
);

export default ProductCreationCard;
