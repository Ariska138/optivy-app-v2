import React from 'react';

// Define the component types as a string literal union
export type ComponentType = 
  | 'Button' 
  | 'Text' 
  | 'Headline'
  | 'Image'
  | 'Divider'
  | 'Section'
  | 'Columns2'
  | 'List'
  | 'Video'
  | 'Testimonial'
  | 'FAQ'
  | 'Pricing'
  | 'Countdown';

// --- Prop Interfaces ---

// Base props shared by almost all components
interface BaseProps {
  style: React.CSSProperties;
}

// Props for simple components
interface ButtonProps extends BaseProps { text: string; }
interface TextProps extends BaseProps { text: string; }
interface HeadlineProps extends BaseProps { text: string; level: 'h1' | 'h2' | 'h3'; }
interface ImageProps extends BaseProps { src: string; alt: string; }
interface DividerProps extends BaseProps {}
interface VideoProps extends BaseProps { url: string; }
interface CountdownProps extends BaseProps { targetDate: string; }

// Props for components with dynamic items
export interface ListItem { id: string; text: string; icon: string; }
interface ListProps extends BaseProps { items: ListItem[]; }

export interface FaqItem { id: string; question: string; answer: string; }
interface FaqProps extends BaseProps { items: FaqItem[]; }

export interface PricingFeature { id: string; text: string; }
interface PricingProps extends BaseProps {
  planName: string;
  price: string;
  period: string;
  features: PricingFeature[];
  buttonText: string;
  popular: boolean;
}

// Props for complex components
interface TestimonialProps extends BaseProps {
  quote: string;
  author: string;
  title: string;
  avatarSrc: string;
  rating: number; // 0-5
}

// Props for container components
interface SectionProps extends BaseProps {
  children: CanvasComponent[];
}
interface Columns2Props extends BaseProps {
  children: [CanvasComponent[], CanvasComponent[]]; // Array of two arrays for two columns
}


// Mapped type for the discriminated union
export type ComponentPropsMap = {
  Button: ButtonProps;
  Text: TextProps;
  Headline: HeadlineProps;
  Image: ImageProps;
  Divider: DividerProps;
  Section: SectionProps;
  Columns2: Columns2Props;
  List: ListProps;
  Video: VideoProps;
  Testimonial: TestimonialProps;
  FAQ: FaqProps;
  Pricing: PricingProps;
  Countdown: CountdownProps;
};

// The main CanvasComponent type, a discriminated union of all possible components
export type CanvasComponent = {
  [K in ComponentType]: {
    id: string;
    type: K;
    props: ComponentPropsMap[K];
  }
}[ComponentType];

// A helper type for props, useful for the properties panel
export type AnyComponentProps = ComponentPropsMap[ComponentType];
