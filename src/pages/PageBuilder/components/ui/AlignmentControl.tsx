import React from 'react';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

type Alignment = 'left' | 'center' | 'right' | 'justify';

interface AlignmentControlProps {
  value: Alignment | undefined;
  onChange: (value: Alignment) => void;
}

const options: { value: Alignment; icon: React.ReactNode; title: string }[] = [
  { value: 'left', icon: <AlignLeft size={16} />, title: 'Align Left' },
  { value: 'center', icon: <AlignCenter size={16} />, title: 'Align Center' },
  { value: 'right', icon: <AlignRight size={16} />, title: 'Align Right' },
  { value: 'justify', icon: <AlignJustify size={16} />, title: 'Justify' },
];

export const AlignmentControl: React.FC<AlignmentControlProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-1 rounded-md">
      {options.map((option) => (
        <button
          key={option.value}
          title={option.title}
          onClick={() => onChange(option.value)}
          className={`p-1.5 rounded-md transition-colors w-full ${
            value === option.value
              ? 'bg-violet-600 text-white'
              : 'text-gray-600 hover:bg-violet-100'
          }`}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
};
