import { type ProductFormData, type ProductFormField, type FollowUpMessage } from '../types';

export const salesAgents = ['Andi', 'Budi', 'Citra', 'Dedi', 'Eka'];

export const META_PIXEL_EVENTS = ['Purchase', 'AddToCart', 'InitiateCheckout', 'Lead', 'ViewContent'];
export const TIKTOK_PIXEL_EVENTS = ['CompletePayment', 'AddToCart', 'InitiateCheckout', 'ViewContent'];
export const GOOGLE_ANALYTICS_EVENTS = ['purchase', 'add_to_cart', 'begin_checkout', 'generate_lead', 'view_item'];

export const INITIAL_FORM_FIELDS: ProductFormField[] = [
  { id: 'name', name: 'Nama', label: '', isActive: true, isRequired: true, isCustom: false, placeholder: 'Teks kustom (misal: Nama Lengkap)' },
  { id: 'email', name: 'Email', label: '', isActive: true, isRequired: true, isCustom: false, placeholder: 'Teks kustom (misal: Alamat Email Aktif)' },
  { id: 'whatsapp', name: 'No. WhatsApp', label: '', isActive: false, isRequired: false, isCustom: false, placeholder: 'Teks kustom (misal: Nomor WhatsApp)' },
];

export const INITIAL_FOLLOW_UP_MESSAGES: FollowUpMessage[] = [
  { id: 'welcome', title: 'Pesan Selamat Datang', message: '', timing: { unit: 'minutes', value: 10, time: '' } },
  { id: 'fu1', title: 'Follow Up 1', message: '', timing: { unit: 'days', value: 1, time: '09:00' } },
  { id: 'fu2', title: 'Follow Up 2', message: '', timing: { unit: 'days', value: 2, time: '09:00' } },
  { id: 'fu3', title: 'Follow Up 3', message: '', timing: { unit: 'days', value: 3, time: '09:00' } },
  { id: 'fu4', title: 'Follow Up 4', message: '', timing: { unit: 'days', value: 5, time: '09:00' } },
  { id: 'complete', title: 'Pesanan Selesai (Complete)', message: '', timing: { unit: 'minutes', value: 5, time: '' } },
  { id: 'upsale', title: 'Pesan Penawaran (Upsale)', message: '', timing: { unit: 'days', value: 7, time: '' } },
];

export const INITIAL_FORM_DATA: ProductFormData = {
  productName: '',
  description: '',
  assetFile: null,
  assetUrl: '',
  normalPrice: '',
  discountPrice: '',
  productStatus: 'active',
  checkout: {
    tagline: '',
    subheadline: '',
    customUrl: '',
    media: [{ id: 1, file: null, url: '' }],
    showSummaryOrder: true,
    useUniqueCode: false,
    uniqueCodeOperator: 'decrease',
    showOfficialLogo: false,
    trustSymbols: {
      guarantee: false,
      securePayment: false,
      ssl: false,
    },
    paymentMethods: {
      bankTransfer: true,
      ePayment: true,
    },
    formFields: INITIAL_FORM_FIELDS,
    buttonText: 'Dapatkan Sekarang!',
    buttonColor: '#a379d7',
  },
  followUp: {
    isEnabled: false,
    provider: '',
    messages: INITIAL_FOLLOW_UP_MESSAGES,
  },
  tracking: {
    meta: { id: '', event: '' },
    tiktok: { id: '', event: '' },
    google: { id: '', event: '' },
  },
  salesTeam: [],
};
