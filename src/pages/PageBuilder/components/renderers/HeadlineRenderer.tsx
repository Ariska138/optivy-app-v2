import React from 'react';
import { CanvasComponent } from '../../types.ts';

type RendererProps = { 
  component: CanvasComponent & { type: 'Headline' };
  isSelected: boolean;
  onBlur: (e: React.FocusEvent<HTMLElement>) => void;
  onFocus: () => void;
};

const levelSizeClasses: { [key in 'h1' | 'h2' | 'h3']: string } = {
  h1: 'text-4xl',
  h2: 'text-3xl',
  h3: 'text-2xl',
};

export const HeadlineRenderer: React.FC<RendererProps> = ({ component, isSelected, onBlur, onFocus }) => {
  const Tag = component.props.level || 'h2';
  const sizeClass = levelSizeClasses[component.props.level];

  return (
    <Tag 
      style={component.props.style} 
      className={sizeClass}
      contentEditable={isSelected} 
      suppressContentEditableWarning 
      onBlur={onBlur} 
      onFocus={onFocus} 
      dangerouslySetInnerHTML={{ __html: component.props.text }} 
    />
  );
};
