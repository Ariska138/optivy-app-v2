
import { VariableCategory } from './types';

export const VARIABLES: VariableCategory = {
    "General": [{ variable: '{business}', description: 'Nama bisnis Anda' },{ variable: '{store}', description: 'Nama toko/cabang' },{ variable: '{order_id}', description: 'Nomor unik pesanan' },{ variable: '{order_link}', description: 'Link menuju halaman pesanan' },{ variable: '{items_name}', description: 'Nama semua barang yang dipesan' },{ variable: '{digital_files}', description: 'Link download produk digital' },],
    "Customer": [{ variable: '{name}', description: 'Nama lengkap customer' },{ variable: '{phone}', description: 'Nomor telepon customer' },{ variable: '{email}', description: 'Alamat email customer' },{ variable: '{address}', description: 'Alamat lengkap pengiriman' },{ variable: '{subdistrict_name}', description: 'Kecamatan customer' },{ variable: '{city_name}', description: 'Kota/Kabupaten customer' },{ variable: '{province_name}', description: 'Provinsi customer' },],
    "Finance": [{ variable: '{gross_revenue}', description: 'Total pendapatan kotor' },{ variable: '{net_revenue}', description: 'Total pendapatan bersih' },{ variable: '{product_price}', description: 'Total harga produk' },{ variable: '{product_discount}', description: 'Total diskon produk' },{ variable: '{net_product_price}', description: 'Harga produk setelah diskon' },{ variable: '{shipping_cost}', description: 'Biaya pengiriman' },{ variable: '{shipping_discount}', description: 'Diskon biaya pengiriman' },{ variable: '{payment_fee}', description: 'Biaya COD / Payment Gateway' },{ variable: '{other_income}', description: 'Pendapatan lain-lain' },{ variable: '{unique_code_discount}', description: 'Potongan dari kode unik' },{ variable: '{discount_code_code}', description: 'Kode diskon yang digunakan' },{ variable: '{discount_code_discount}', description: 'Jumlah diskon dari kode' },],
    "Payments": [{ variable: '{payment_method}', description: 'Metode pembayaran yang dipilih' },{ variable: '{epayment_link}', description: 'Link bayar E-Payment (OVO, DANA, dll)' },{ variable: '{bank_accounts}', description: 'Daftar rekening bank atau No. VA' },],
    "Other": [{ variable: '{notes}', description: 'Catatan dari customer' },{ variable: '{handler}', description: 'Nama admin/sales yang menangani' },{ variable: '{advertiser}', description: 'Nama advertiser (jika ada)' },{ variable: '{event_source_url}', description: 'URL sumber pesanan' },]
};

export const SAMPLE_DATA: { [key: string]: string } = {
    '{name}': 'Budi Santoso',
    '{business}': 'Toko Modern',
    '{order_id}': 'ORD-2025-07-22-XYZ',
    '{items_name}': '1x Kemeja Flanel, 2x Celana Chino',
    '{net_revenue}': 'Rp 450.000',
    '{product_price}': 'Rp 450.000',
    '{shipping_cost}': 'Rp 25.000',
    '{product_discount}': 'Rp 25.000',
    '{unique_code_discount}': 'Rp 123',
    '{payment_method}': 'Transfer Bank BCA',
    '{bank_accounts}': '<b>Bank BCA</b><br>No. Rek: 123-456-7890<br>A.N: Toko Modern',
    '{epayment_link}': '<a href="#" class="text-blue-600 font-semibold">Bayar dengan GoPay</a>',
};

export const DEFAULT_PAYMENT_TEMPLATE = `✅ PESANAN DITERIMA!
Halo {name}, terima kasih banyak atas kepercayaan Anda kepada {business}! 🙏

Berikut adalah ringkasan pesanan Anda:
---------------------------------
ID Pesanan: #{order_id}
Produk: {items_name}
---------------------------------

RINCIAN PEMBAYARAN
---------------------------------
Harga Produk: {product_price}
Biaya Kirim: {shipping_cost}
Diskon: -{product_discount}
Kode Unik: -{unique_code_discount}
---------------------------------
💰 TOTAL PEMBAYARAN: {net_revenue}
---------------------------------

Silakan selesaikan pembayaran Anda melalui:
💳 Metode: {payment_method}

{bank_accounts}

Atau gunakan link E-Payment berikut:
{epayment_link}

Mohon lakukan pembayaran sebelum 24 jam agar pesanan Anda dapat segera kami proses.

Jika ada pertanyaan, jangan ragu untuk menghubungi kami.

Hormat kami,
Tim {business}`;

export const META_EVENTS = ['Purchase', 'Lead', 'CompleteRegistration', 'AddToCart', 'InitiateCheckout', 'ViewContent'];
export const TIKTOK_EVENTS = ['CompletePayment', 'SubmitForm', 'PlaceAnOrder', 'ViewContent', 'AddToCart'];
