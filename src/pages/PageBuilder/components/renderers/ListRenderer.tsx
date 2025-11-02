import React from 'react';
import { ComponentPropsMap } from '../../types.ts';
import { CheckCircle2, XCircle, ArrowRight, Dot, Star } from 'lucide-react';

const iconMap: { [key: string]: React.ReactNode } = {
    'check-circle': <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />,
    'x-circle': <XCircle size={20} className="text-red-500 flex-shrink-0" />,
    'arrow-right': <ArrowRight size={20} className="text-blue-500 flex-shrink-0" />,
    'dot': <Dot size={20} className="text-gray-500 flex-shrink-0" />,
    'star': <Star size={20} className="text-yellow-500 flex-shrink-0" />,
};

export const ListRenderer: React.FC<{ component: { props: ComponentPropsMap['List']} }> = ({ component }) => (
  <div style={component.props.style} className="space-y-2">
    {component.props.items.map(item => (
      <div key={item.id} className="flex items-start gap-3">
        {iconMap[item.icon] || <Dot size={20} className="text-gray-500" />}
        <span>{item.text}</span>
      </div>
    ))}
  </div>
);
