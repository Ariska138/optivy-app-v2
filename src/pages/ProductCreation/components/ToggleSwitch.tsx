import React from 'react';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, id }) => (
    <label className="relative inline-block w-11 h-6">
        <input type="checkbox" id={id} checked={checked} onChange={onChange} className="opacity-0 w-0 h-0" />
        <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-3xl transition duration-400 ${checked ? 'bg-purple-600' : 'bg-gray-300'}`}>
            <span className={`absolute content-[''] h-4 w-4 left-1 bottom-1 bg-white rounded-full transition duration-400 ${checked ? 'transform translate-x-5' : ''}`}></span>
        </span>
    </label>
);

export default ToggleSwitch;
