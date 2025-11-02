import React from 'react';
import { ProductFormData } from '../../../types';
import ProductCreationCard from './ProductCreationCard';

const formatCurrency = (value: number | '') => {
    const number = Number(value) || 0;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
};

interface CheckoutPreviewProps {
    formData: ProductFormData;
}
const CheckoutPreview: React.FC<CheckoutPreviewProps> = ({ formData }) => {
    const { checkout, normalPrice, discountPrice, description } = formData;
    const isUniqueCodeActive = checkout.useUniqueCode;
    const uniqueCodeValue = 123;
    let totalPrice = Number(discountPrice) || 0;
    if (isUniqueCodeActive) {
        if(checkout.uniqueCodeOperator === 'increase') totalPrice += uniqueCodeValue;
        else totalPrice -= uniqueCodeValue;
    }

    return (
        <ProductCreationCard className="p-6">
            <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-inner space-y-5">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-900">{checkout.tagline || 'Judul & Tagline Anda'}</h3>
                    {checkout.subheadline && <p className="text-slate-500 mt-1">{checkout.subheadline}</p>}
                </div>

                <div className="w-full aspect-video bg-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
                    {checkout.media[0]?.url ? 
                        <img src={checkout.media[0].url} alt="product preview" className="w-full h-full object-cover"/> 
                        : <i className="fa-solid fa-image text-4xl text-slate-400"></i>}
                </div>

                <div className="text-sm text-slate-500 text-center">{description || 'Deskripsi produk akan ditampilkan di sini...'}</div>
                
                <div className="space-y-3 pt-4 border-t border-slate-100">
                    <h4 className="font-semibold text-slate-800 text-center mb-2">Isi Data Anda:</h4>
                    <div className="space-y-3">
                        {checkout.formFields.filter(f => f.isActive).map(field => (
                            <div key={field.id} className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">{field.label || field.name}{field.isRequired ? '*' : ''}</label>
                                <input type="text" className="bg-slate-50 border border-slate-200 rounded-lg p-3 w-full" placeholder={`Masukkan ${field.name.toLowerCase()}`}/>
                            </div>
                        ))}
                    </div>
                </div>

                {(checkout.paymentMethods.bankTransfer || checkout.paymentMethods.ePayment) && (
                    <div className="pt-4 border-t border-slate-100">
                        <h4 className="font-semibold text-slate-800 text-center mb-3">Pilih Metode Pembayaran</h4>
                        <select className="bg-slate-50 border border-slate-200 rounded-lg p-3 w-full">
                           {checkout.paymentMethods.bankTransfer && <option>Bank Transfer (BCA, Mandiri, BNI)</option>}
                           {checkout.paymentMethods.ePayment && <option>E-Wallet (GoPay, OVO, Dana)</option>}
                        </select>
                    </div>
                )}
                
                {checkout.showSummaryOrder && (
                    <div className="p-4 rounded-lg bg-slate-50 space-y-2">
                        <h4 className="font-semibold text-slate-800">Ringkasan Pesanan</h4>
                        <div className="flex justify-between items-center text-sm"><span className="text-slate-600">Harga Normal</span><span className="text-slate-500 line-through">{formatCurrency(normalPrice)}</span></div>
                        <div className="flex justify-between items-center font-bold"><span className="text-purple-600">Harga Spesial</span><span className="text-purple-600 text-lg">{formatCurrency(discountPrice)}</span></div>
                        {isUniqueCodeActive && (
                           <div className="flex justify-between items-center text-sm"><span className="text-slate-600">Kode Unik</span><span>{checkout.uniqueCodeOperator === 'increase' ? '+':'-'} {formatCurrency(uniqueCodeValue)}</span></div>
                        )}
                        <div className="flex justify-between items-center font-bold pt-2 border-t border-slate-200"><span>Total</span><span className="text-lg">{formatCurrency(totalPrice)}</span></div>
                    </div>
                )}
                
                <button className="w-full text-white font-bold py-3 rounded-lg transition-all" style={{ backgroundColor: checkout.buttonColor }}>{checkout.buttonText}</button>

                <div className="flex justify-center items-center gap-4 pt-3 text-slate-500">
                    {checkout.trustSymbols.guarantee && <div className="flex items-center gap-2 text-xs"><i className="fa-solid fa-shield-halved"></i><span>Garansi 30 Hari</span></div>}
                    {checkout.trustSymbols.securePayment && <div className="flex items-center gap-2 text-xs"><i className="fa-solid fa-lock"></i><span>Pembayaran Aman</span></div>}
                    {checkout.trustSymbols.ssl && <div className="flex items-center gap-2 text-xs"><i className="fa-solid fa-shield-virus"></i><span>Enkripsi SSL</span></div>}
                </div>
                
                {checkout.showOfficialLogo && (
                    <div className="text-center pt-4 mt-4 border-t border-slate-100">
                        <img src="https://placehold.co/150x50/a379d7/ffffff?text=LOGO+ANDA" alt="Official Logo" className="mx-auto h-8" />
                    </div>
                )}
            </div>
        </ProductCreationCard>
    );
};

export default CheckoutPreview;
