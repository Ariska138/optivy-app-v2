import React from 'react';
import { ComponentPropsMap } from '../../types.ts';
import { Canvas } from '../Canvas.tsx';

export const Columns2Renderer: React.FC<{ component: { id: string; props: ComponentPropsMap['Columns2']} }> = ({ component }) => (
  <div style={component.props.style} className="flex flex-col md:flex-row gap-4">
    <div className="w-full md:w-1/2"><Canvas parentId={component.id} columnIndex={0} /></div>
    <div className="w-full md:w-1/2"><Canvas parentId={component.id} columnIndex={1} /></div>
  </div>
);
