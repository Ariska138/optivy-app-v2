import React from 'react';
import { useDrag } from 'react-dnd';
import { ComponentType } from '../types.ts';

interface DraggableComponentProps {
  type: ComponentType;
  icon: React.ReactNode;
  name: string;
}

export const DraggableComponent: React.FC<DraggableComponentProps> = ({ type, icon, name }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  drag(ref);

  return (
    <div 
      ref={ref}
      className={`flex flex-col items-center justify-center text-center p-3 border rounded-lg cursor-grab bg-item-bg hover:bg-item-hover-bg hover:border-accent transition-all duration-200 transform hover:-translate-y-1 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {icon}
      <span className="text-xs mt-2 font-medium text-text-tertiary">{name}</span>
    </div>
  );
};
