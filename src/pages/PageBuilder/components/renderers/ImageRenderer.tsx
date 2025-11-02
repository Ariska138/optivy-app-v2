import React from 'react';
import { ComponentPropsMap } from '../../types.ts';

export const ImageRenderer: React.FC<{ component: { props: ComponentPropsMap['Image']} }> = ({ component }) => (
  <img src={component.props.src} alt={component.props.alt} style={component.props.style} />
);
