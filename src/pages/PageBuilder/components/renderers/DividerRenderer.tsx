import React from 'react';
import { ComponentPropsMap } from '../../types.ts';

export const DividerRenderer: React.FC<{ component: { props: ComponentPropsMap['Divider']} }> = ({ component }) => (
  <hr style={component.props.style} />
);
