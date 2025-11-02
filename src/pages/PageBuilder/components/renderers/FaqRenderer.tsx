import React from 'react';
import { ComponentPropsMap } from '../../types.ts';

export const FaqRenderer: React.FC<{ component: { props: ComponentPropsMap['FAQ']} }> = ({ component }) => (
  <div style={component.props.style}>{component.props.items.map(item => (<details key={item.id} className="mb-2 p-2 border rounded"><summary className="font-semibold cursor-pointer">{item.question}</summary><p className="mt-2 text-gray-700">{item.answer}</p></details>))}</div>
);
