import React from 'react';
import { ComponentPropsMap } from '../../types.ts';
import { CountdownTimer } from './CountdownTimer.tsx';

export const CountdownRenderer: React.FC<{ component: { props: ComponentPropsMap['Countdown']} }> = ({ component }) => (
  <div style={component.props.style}><CountdownTimer targetDate={component.props.targetDate} /></div>
);
