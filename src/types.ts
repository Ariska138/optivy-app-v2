import type { ReactNode, ReactElement } from 'react';

// --- General App Types ---
export type PageType = 'dashboard' | 'orders' | 'products' | 'domains' | 'team' | 'integrations' | 'product-creation' | 'edit-profile' | 'discount-codes' | 'local-payments' | 'after-submit' | 'page-builder' | 'publish';

// --- Dashboard Types ---
export interface Project {
  icon: ReactElement;
  iconBgColor: string;
  title: string;
  category: string;
  description: string;
}

export interface Task {
  icon: ReactElement;
  iconBgColor: string;
  title: string;
  description: string;
}

export interface TeamMember {
  avatarUrl: string;
  name: string;
  role: string;
  status: 'online' | 'offline';
}

// --- Order Management Types ---
export type OrderStatus = 'Completed' | 'Processing' | 'Shipped' | 'Return' | 'Canceled';
export type PaymentStatus = 'Paid' | 'Unpaid';

export interface Order {
  id: string;
  date: string;
  cs: string;
  customer: string;
  email: string;
  phone: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  revenue: number;
  followupStage: number;
  product: string;
  transferProof: boolean;
  utm?: string;
  city?: string;
  courier?: string;
}

export interface Lead {
  id: string;
  date: string;
  cs: string;
  customer: string;
  email: string;
  phone: string;
  followupStage: number;
  fuEmailStage: number;
  product: string;
  utm?: string;
}

export type TabType = 'digital' | 'fisik' | 'lms' | 'lead';

export enum ViewType {
  Physical = 'physical',
  Digital = 'digital',
  LMS = 'lms',
  Lead = 'lead',
}

// --- Product Management Types ---
export enum ProductCategory {
  Fisik = 'Fisik',
  Digital = 'Digital',
  LMS = 'LMS',
  Lead = 'Lead',
}

export interface Product {
  id: string;
  name: string;
  price: number;
  orders: number;
  paid: number;
  paidRatio: string;
  revenue: number;
  author: string;
  lastChanged: string;
  url: string;
}

export interface LeadProduct {
  id: string;
  name: string;
  author: string;
  lastChanged: string;
  url: string;
  prospects: number;
}

// --- Domain Management Types ---
export interface CustomDomain {
  id: number;
  name: string;
  status: 'verified' | 'unverified' | 'pending';
}

// --- Team Management Types ---
export enum TeamRole {
  Admin = 'Admin',
  Sales = 'Sales',
  Gudang = 'Gudang',
  Advertiser = 'Advertiser',
}

export interface ManagedTeamMember {
  id: number;
  name: string;
  email: string;
  role: TeamRole;
  avatarUrl: string;
}

// --- Integrations Management Types ---
export type IntegrationType = 'whatsapp' | 'email' | 'tracking';

export interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  logo: ReactElement;
  description: string;
  connected: boolean;
}

// --- Product Creation Types ---
export type ProductCreationType = 'digital' | 'physical' | 'lms' | 'database';

export interface ProductFormField {
  id: string;
  name: string;
  label: string;
  isActive: boolean;
  isRequired: boolean;
  isCustom: boolean;
  placeholder?: string;
}

export interface CheckoutSettings {
  tagline: string;
  subheadline: string;
  customUrl: string;
  media: { id: number; file: File | null; url: string }[];
  showSummaryOrder: boolean;
  useUniqueCode: boolean;
  uniqueCodeOperator: 'increase' | 'decrease';
  showOfficialLogo: boolean;
  trustSymbols: {
    guarantee: boolean;
    securePayment: boolean;
    ssl: boolean;
  };
  paymentMethods: {
    bankTransfer: boolean;
    ePayment: boolean;
  };
  formFields: ProductFormField[];
  buttonText: string;
  buttonColor: string;
}

export interface FollowUpMessage {
  id: string;
  title: string;
  message: string;
  timing: {
    unit: 'minutes' | 'days';
    value: number;
    time: string;
  };
}

export interface FollowUpAutomation {
  isEnabled: boolean;
  provider: string;
  messages: FollowUpMessage[];
}

export interface Pixel {
  id: string;
  event: string;
}

export interface Tracking {
  meta: Pixel;
  tiktok: Pixel;
  google: Pixel;
}

export interface SalesPerson {
  name: string;
  percentage: number;
}

export interface ProductFormData {
  productName: string;
  description: string;
  assetFile: File | null;
  assetUrl: string;
  normalPrice: number | '';
  discountPrice: number | '';
  productStatus: 'active' | 'draft';
  checkout: CheckoutSettings;
  followUp: FollowUpAutomation;
  tracking: Tracking;
  salesTeam: SalesPerson[];
}

// --- Discount Code Types ---
export interface DiscountCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  usageLimit: number;
  timesUsed: number;
  status: 'active' | 'inactive';
  expiryDate: string;
}

// --- Local Payment Types ---
export interface LocalPaymentMethod {
  id: string;
  name: string;
  type: 'Bank Transfer' | 'QRIS' | 'E-Wallet';
  accountName: string;
  accountNumber: string; // Used for bank/e-wallet number
  qrImageUrl?: string; // For QRIS
  logoUrl?: string; // Optional logo for display
  status: 'active' | 'inactive';
}
