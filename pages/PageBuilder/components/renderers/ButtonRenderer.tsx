import React from 'react';
import { ComponentPropsMap } from '../../types.ts';

export const ButtonRenderer: React.FC<{ component: { props: ComponentPropsMap['Button']} }> = ({ component }) => (
  <button style={component.props.style}>{component.props.text}</button>
);
