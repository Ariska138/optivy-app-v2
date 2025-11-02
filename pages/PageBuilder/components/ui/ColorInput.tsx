import React from 'react';

interface ColorInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export const ColorInput: React.FC<ColorInputProps> = ({ value = '#000000', onChange }) => {
  return (
    <div className="flex items-center gap-2 w-full p-1.5 border border-border-color rounded bg-input-bg">
      <div className="relative w-6 h-6 rounded overflow-hidden cursor-pointer border border-gray-300">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute -top-1 -left-1 w-8 h-8 cursor-pointer"
        />
        <div style={{ backgroundColor: value }} className="w-full h-full"></div>
      </div>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-sm focus:outline-none"
        placeholder="#ffffff"
      />
    </div>
  );
};
