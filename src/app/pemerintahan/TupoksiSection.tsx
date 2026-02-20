"use client";

import { useState } from 'react';
import { 
  FaTasks, 
  FaChevronDown, 
  FaGavel, 
  FaFileAlt, 
  FaHandHoldingHeart 
} from "react-icons/fa";

// Data Static
const TUPOKSI_DATA = [
  {
    id: 1,
    jabatan: "Lurah",
    icon: <FaGavel />,
    deskripsi: "Memimpin penyelenggaraan pemerintahan kelurahan, melaksanakan pembangunan, pembinaan kemasyarakatan, dan pemberdayaan masyarakat.",
    rincian: [
      "Pelaksanaan kegiatan pemerintahan kelurahan.",
      "Pemberdayaan masyarakat.",
      "Pelayanan masyarakat.",
      "Penyelenggaraan ketenteraman dan ketertiban umum.",
      "Pemeliharaan prasarana dan fasilitas pelayanan umum.",
      "Pembinaan lembaga kemasyarakatan."
    ]
  },
  {
    id: 2,
    jabatan: "Sekretaris Kelurahan",
    icon: <FaFileAlt />,
    deskripsi: "Membantu Lurah dalam bidang administrasi pemerintahan, pembangunan, dan kemasyarakatan serta memberikan pelayanan administratif kepada seluruh perangkat kelurahan.",
    rincian: [
      "Pengelolaan administrasi umum dan kearsipan.",
      "Pengelolaan administrasi kepegawaian.",
      "Pengelolaan administrasi keuangan.",
      "Penyusunan perencanaan dan pelaporan.",
      "Pelaksanaan tugas lain yang diberikan oleh Lurah."
    ]
  },
  {
    id: 3,
    jabatan: "Seksi Pemerintahan",
    icon: <FaTasks />,
    deskripsi: "Membantu Lurah dalam menyiapkan bahan perumusan kebijakan teknis, pelaksanaan, dan pelayanan administrasi di bidang pemerintahan.",
    rincian: [
      "Pelaksanaan administrasi kependudukan (KTP, KK, Kelahiran, Kematian).",
      "Fasilitasi penyelenggaraan pemilihan umum.",
      "Penyusunan monografi dan profil kelurahan.",
      "Pelaksanaan tugas bidang pertanahan."
    ]
  },
  {
    id: 4,
    jabatan: "Seksi Pemberdayaan Masyarakat",
    icon: <FaHandHoldingHeart />,
    deskripsi: "Membantu Lurah dalam menyiapkan bahan perumusan kebijakan teknis dan pelaksanaan pemberdayaan masyarakat.",
    rincian: [
      "Fasilitasi kegiatan lembaga kemasyarakatan (LPMK, PKK, Karang Taruna).",
      "Pembinaan bidang kesehatan dan keluarga berencana.",
      "Pelaksanaan kegiatan sosial kemasyarakatan.",
      "Pemberdayaan ekonomi masyarakat."
    ]
  }
];

// --- KOMPONEN ITEM ---
function AccordionItem({ item, isOpen, onClick }: { item: any, isOpen: boolean, onClick: () => void }) {
  return (
    <div className={`
      relative border rounded-xl bg-white overflow-hidden transition-all duration-300
      ${isOpen ? 'border-blue-600 shadow-md ring-1 ring-blue-100' : 'border-gray-200 hover:border-blue-300'}
    `}>
      
      {/* Tombol Header */}
      <button 
        type="button"
        onClick={onClick}
        className="w-full relative z-20 flex items-center justify-between p-5 text-left bg-transparent cursor-pointer hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors shrink-0
            ${isOpen ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}
          `}>
            {item.icon}
          </div>
          <div>
            <h4 className={`text-lg font-bold font-poppins ${isOpen ? 'text-blue-900' : 'text-gray-800'}`}>
              {item.jabatan}
            </h4>
            <span className="text-xs text-gray-400 font-medium block mt-0.5">
               {isOpen ? 'Klik untuk menutup' : 'Klik untuk melihat rincian'}
            </span>
          </div>
        </div>
        
        <div className={`text-gray-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-blue-600' : ''}`}>
           <FaChevronDown />
        </div>
      </button>

      {/* Konten Accordion */}
      <div 
        className={`
          relative z-10 transition-all duration-300 ease-in-out overflow-hidden bg-white
          ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="p-6 pt-0 pl-4 md:pl-[5.5rem]">
           <div className="border-t border-dashed border-gray-200 pt-4 mt-2">
              <p className="text-gray-700 text-sm leading-relaxed mb-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                {item.deskripsi}
              </p>
              
              <div className="pl-2">
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Rincian Tugas:</h5>
                <ul className="space-y-2">
                  {item.rincian.map((tugas: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></span>
                      {tugas}
                    </li>
                  ))}
                </ul>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}

// --- MAIN COMPONENT ---
export default function TupoksiSection() {
  const [activeId, setActiveId] = useState<number | null>(1);

  const handleToggle = (id: number) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  return (  
    // PERBAIKAN: Ubah z-50 menjadi z-10 (atau hapus z-index).
    // z-10 cukup untuk overlap shadow ke section sebelumnya tanpa menutupi Navbar (yang biasanya z-40/z-50)
    <section className="py-20 bg-white relative z-10 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-4 md:px-16">
        
        {/* Header */}
        <div className="mb-12 border-b border-gray-100 pb-8">
           <span className="text-blue-600 font-bold text-sm uppercase tracking-wider block mb-2">
             Tanggung Jawab
           </span>
           <h2 className="text-3xl md:text-3xl font-semibold text-gray-800 font-poppins">
             Tugas Pokok & Fungsi
           </h2>
           <p className="text-gray-500 mt-3 max-w-2xl">
             Uraian tugas dan wewenang setiap unit kerja dalam memberikan pelayanan prima.
           </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Sidebar Kiri */}
          <div className="lg:col-span-4">
             <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 relative overflow-hidden">
               {/* Dekorasi Background */}
               <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full blur-3xl -mr-10 -mt-10"></div>
               
               <h3 className="text-lg font-bold text-blue-900 mb-3 relative z-10">Dasar Hukum</h3>
               <p className="text-sm text-gray-700 leading-relaxed mb-4 relative z-10">
                 Mengacu pada Peraturan Bupati tentang Susunan Organisasi dan Tata Kerja Pemerintah Kelurahan.
               </p>
               <div className="bg-white p-3 rounded border-l-4 border-yellow-400 text-xs text-gray-500 italic relative z-10 shadow-sm">
                 "Bekerja sesuai SOP demi tertib administrasi."
               </div>
             </div>
          </div>

          {/* List Kanan */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {TUPOKSI_DATA.map((item) => (
              <AccordionItem 
                key={item.id} 
                item={item} 
                isOpen={activeId === item.id}
                onClick={() => handleToggle(item.id)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}