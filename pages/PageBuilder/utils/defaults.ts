// utils/defaults.ts
import { nanoid } from 'nanoid';
import { ComponentType, ComponentPropsMap } from '../types.ts';

// Type assertion helper
function createDefaultProps<T extends ComponentType>(
  type: T, 
  props: ComponentPropsMap[T]
): ComponentPropsMap[T] {
  return props;
}

export const getDefaultProps = (type: ComponentType): ComponentPropsMap[ComponentType] => {
  switch (type) {
    case 'Button':
      return createDefaultProps('Button', {
        text: 'Click Me',
        style: {
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%'
        },
      });
    case 'Text':
      return createDefaultProps('Text', {
        text: 'This is a paragraph of text. You can edit it by clicking on it. Use the properties panel to change alignment and other styles.',
        style: { textAlign: 'left', fontSize: '16px', color: '#333', backgroundColor: '#ffffff' },
      });
    case 'Headline':
      return createDefaultProps('Headline', {
        text: 'Important Headline',
        level: 'h2',
        style: { textAlign: 'center', fontWeight: 'bold', backgroundColor: '#ffffff' },
      });
    case 'Image':
      return createDefaultProps('Image', {
        src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww',
        alt: 'Placeholder image',
        style: { width: '100%', height: 'auto', display: 'block' },
      });
    case 'Divider':
      return createDefaultProps('Divider', {
        style: { borderTop: '1px solid #e5e7eb', margin: '16px 0' },
      });
    case 'Section':
      return createDefaultProps('Section', {
        children: [],
        style: { padding: '20px 0' },
      });
    case 'Columns2':
      return createDefaultProps('Columns2', {
        children: [[], []],
        style: {},
      });
    case 'List':
       return createDefaultProps('List', {
        items: [
          { id: nanoid(), text: 'First item', icon: 'check-circle' },
          { id: nanoid(), text: 'Second item', icon: 'check-circle' },
          { id: nanoid(), text: 'Third item', icon: 'check-circle' },
        ],
        style: { paddingLeft: '0' }, // Adjusted for custom icon alignment
      });
    case 'Video':
      return createDefaultProps('Video', {
        url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ', // A placeholder video
        style: { aspectRatio: '16 / 9', width: '100%' },
      });
    case 'Testimonial':
        return createDefaultProps('Testimonial', {
            quote: 'This is a fantastic product that has changed my workflow completely. Highly recommended!',
            author: 'Jane Doe',
            title: 'CEO, Acme Inc.',
            avatarSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww',
            rating: 5,
            style: { textAlign: 'center', padding: '20px' },
        });
    case 'FAQ':
        return createDefaultProps('FAQ', {
            items: [
                { id: nanoid(), question: 'What is the return policy?', answer: 'You can return any item within 30 days of purchase for a full refund.' },
                { id: nanoid(), question: 'Do you ship internationally?', answer: 'Yes, we ship to most countries worldwide. Shipping fees may apply.' },
            ],
            style: {},
        });
    case 'Pricing':
        return createDefaultProps('Pricing', {
            planName: 'Basic Plan',
            price: '$19',
            period: '/mo',
            features: [
                { id: nanoid(), text: '10GB Storage' },
                { id: nanoid(), text: '5 Users Allowed' },
                { id: nanoid(), text: 'Basic Support' },
            ],
            buttonText: 'Choose Plan',
            popular: false,
            style: { border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', textAlign: 'center' },
        });
    case 'Countdown':
        return createDefaultProps('Countdown', {
            // Set target to 7 days from now
            targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            style: {},
        });
    default:
      // This should never be reached if all types are handled
      const exhaustiveCheck: never = type;
      throw new Error(`Unhandled component type: ${exhaustiveCheck}`);
  }
};
