import React from 'react';
import { ComponentPropsMap } from '../../types.ts';
import { Canvas } from '../Canvas.tsx';

export const SectionRenderer: React.FC<{ component: { id: string; props: ComponentPropsMap['Section']} }> = ({ component }) => (
  <div style={component.props.style}><Canvas parentId={component.id} /></div>
);
