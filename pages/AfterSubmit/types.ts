
export type AfterSubmitActionType = 
  | 'payment_instructions'
  | 'whatsapp_direct'
  | 'whatsapp_specific'
  | 'landing_page'
  | 'self_hosted'
  | 'custom_url';

export interface ActionDetails {
  instructions: string;
  message: string;
  number: string;
  url: string;
}

export interface AfterSubmitAction {
  type: AfterSubmitActionType;
  details: Partial<ActionDetails>;
}

export type PixelProvider = 'meta' | 'google' | 'tiktok';

export interface PixelConfig {
  id: string;
  event: string;
}

export type TrackingPixels = {
  [key in PixelProvider]: PixelConfig;
};

export interface AppConfig {
  afterSubmitAction: AfterSubmitAction;
  trackingPixels: TrackingPixels;
}

export interface Variable {
  variable: string;
  description: string;
}

export interface VariableCategory {
  [category: string]: Variable[];
}
