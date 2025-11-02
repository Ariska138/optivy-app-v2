import React from 'react';
import { ComponentPropsMap } from '../../types.ts';

export const PricingRenderer: React.FC<{ component: { props: ComponentPropsMap['Pricing']} }> = ({ component }) => (
  <div style={component.props.style}>{component.props.popular && <p className="text-sm font-bold text-blue-600 mb-2">MOST POPULAR</p>}<h3 className="text-xl font-bold mb-2">{component.props.planName}</h3><p className="text-4xl font-extrabold mb-1">{component.props.price}<span className="text-base font-normal text-gray-500">{component.props.period}</span></p><ul className="my-6 space-y-2 text-left">{component.props.features.map(feature => <li key={feature.id} className="flex items-center gap-2">✓ {feature.text}</li>)}</ul><button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700">{component.props.buttonText}</button></div>
);
