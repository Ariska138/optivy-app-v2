import React from 'react';
import { ComponentPropsMap } from '../../types.ts';

export const TestimonialRenderer: React.FC<{ component: { props: ComponentPropsMap['Testimonial']} }> = ({ component }) => (
  <div style={component.props.style}><img src={component.props.avatarSrc} alt={component.props.author} className="w-20 h-20 rounded-full mx-auto mb-4" /><p className="italic text-lg mb-4">{component.props.quote}</p><p className="font-bold">{component.props.author}</p><p className="text-sm text-gray-500">{component.props.title}</p></div>
);
