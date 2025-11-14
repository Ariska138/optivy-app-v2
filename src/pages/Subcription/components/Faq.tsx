import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen,
  onClick,
}) => {
  return (
    <div className="border-b">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-4 text-left font-semibold text-gray-800"
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && <div className="pb-4 pr-4 text-gray-600">{children}</div>}
    </div>
  );
};

const faqData = [
  {
    question: 'Apa yang terjadi setelah masa coba gratis 3 bulan berakhir?',
    answer:
      'Setelah masa coba gratis berakhir, kartu kredit Anda akan ditagih sebesar Rp 300,000 setiap bulan untuk melanjutkan langganan Pro. Anda dapat membatalkan kapan saja sebelum masa coba gratis berakhir.',
  },
  {
    question: 'Bisakah saya membatalkan langganan kapan saja?',
    answer:
      'Ya, Anda dapat membatalkan langganan Anda kapan saja melalui halaman ini. Jika Anda membatalkan, Anda akan tetap memiliki akses ke fitur Pro hingga akhir periode penagihan saat ini.',
  },
  {
    question: 'Metode pembayaran apa saja yang diterima?',
    answer:
      'Kami menerima semua kartu kredit utama (Visa, MasterCard, American Express) dan juga pembayaran melalui dompet digital seperti GoPay dan OVO.',
  },
  {
    question: 'Apakah ada kontrak jangka panjang?',
    answer:
      'Tidak, langganan kami berbasis bulan ke bulan. Tidak ada kontrak jangka panjang, dan Anda bebas untuk membatalkan atau mengubah paket Anda kapan pun Anda mau.',
  },
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Pertanyaan yang Sering Diajukan
      </h2>
      <div>
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.question}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          >
            <p>{item.answer}</p>
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};

export default Faq;
