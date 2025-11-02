import React from 'react';
import { CanvasComponent } from '../../types.ts';

type RendererProps = { 
  component: CanvasComponent & { type: 'Text' };
  isSelected: boolean;
  onBlur: (e: React.FocusEvent<HTMLElement>) => void;
  onFocus: () => void;
};

export const TextRenderer: React.FC<RendererProps> = ({ component, isSelected, onBlur, onFocus }) => {
  return <div style={component.props.style} contentEditable={isSelected} suppressContentEditableWarning onBlur={onBlur} onFocus={onFocus} dangerouslySetInnerHTML={{ __html: component.props.text }} />;
};
