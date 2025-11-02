import React from 'react';
import { ProductCreationType } from '../../../types';

interface ProductTypeButtonProps {
    icon: string;
    label: string;
    type: ProductCreationType;
    active?: boolean;
    disabled?: boolean;
    onSelect: (type: ProductCreationType) => void;
}

const ProductTypeButton: React.FC<ProductTypeButtonProps> = ({ icon, label, type, active, disabled, onSelect }) => {
    const baseClasses = "bg-white/60 backdrop-blur-[15px] border border-white/20 shadow-lg shadow-purple-900/10 rounded-2xl p-6 text-center transition-all duration-300 ease-in-out";
    const activeClasses = "transform -translate-y-1.5 border-2 border-purple-600 shadow-2xl shadow-purple-600/20";
    const disabledClasses = "opacity-50 cursor-not-allowed";

    return (
        <button
            onClick={() => !disabled && onSelect(type)}
            className={`${baseClasses} ${active ? activeClasses : ''} ${disabled ? disabledClasses : 'hover:-translate-y-1.5 hover:border-2 hover:border-purple-600 hover:shadow-2xl hover:shadow-purple-600/20'}`}
            disabled={disabled}
        >
            <i className={`fa-solid ${icon} text-4xl mb-3 ${disabled ? 'text-slate-400' : 'text-purple-600'}`}></i>
            <h3 className="font-bold text-slate-800">{label}</h3>
        </button>
    );
};

export default ProductTypeButton;
